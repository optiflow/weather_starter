import 'dotenv/config';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import express from 'express';
import pinoHttpModule from 'pino-http';
import { logger } from './logger.js';
import { createLocationsRouter, type WeatherClient } from './routes/locations.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pinoHttp = pinoHttpModule.default ?? pinoHttpModule;
const FRONTEND_EVENT_PATTERN = /^[a-z][a-z0-9_.:-]{1,63}$/;

interface AppOptions {
  serveFrontend?: boolean;
  enableRequestLogging?: boolean;
  weatherClient?: WeatherClient;
}

// Rate Limiting Map
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute

// Cleanup interval to avoid memory leak, unref to not block tests
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref();

export async function createApp(options: AppOptions = {}) {
  const app = express();

  // Set trust proxy to correctly resolve IPs behind reverse proxy
  app.set('trust proxy', 1);

  const serveFrontend = options.serveFrontend ?? process.env.NODE_ENV !== 'test';
  const enableRequestLogging = options.enableRequestLogging ?? process.env.NODE_ENV !== 'test';

  // Security enhancement: Basic Rate Limiter
  app.use('/api', (request, response, next) => {
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    const ip = request.ip || request.connection.remoteAddress || 'unknown';
    const now = Date.now();

    const record = rateLimitMap.get(ip);
    if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.set(ip, { count: 1, windowStart: now });
      next();
    } else {
      record.count += 1;
      if (record.count > RATE_LIMIT_MAX_REQUESTS) {
        response.status(429).json({ detail: 'Too many requests, please try again later.' });
        return;
      }
      next();
    }
  });

  if (enableRequestLogging) {
    app.use(pinoHttp({ logger }));
  }

  // Security enhancements: add basic headers natively
  app.use((_request, response, next) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('X-Frame-Options', 'DENY');
    response.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  app.use((request, response, next) => {
    if (request.path.startsWith('/frontman')) {
      next();
      return;
    }

    // Security enhancements: add payload size limit to prevent DoS
    express.json({ limit: '10kb' })(request, response, next);
  });

  app.get('/health', (_request, response) => {
    response.json({ status: 'healthy' });
  });

  app.post('/api/logs', (request, response) => {
    const event = request.body?.event;
    const metadata = request.body?.metadata;
    if (typeof event !== 'string' || !FRONTEND_EVENT_PATTERN.test(event)) {
      response.status(422).json({ detail: 'event is required' });
      return;
    }
    logger.info(
      {
        source: 'frontend',
        event,
        metadata: metadata && typeof metadata === 'object' ? metadata : undefined,
        page: typeof request.body?.page === 'string' ? request.body.page : undefined,
      },
      'frontend interaction',
    );
    response.status(204).end();
  });

  app.use('/api', createLocationsRouter({ weatherClient: options.weatherClient }));

  if (serveFrontend) {
    if (process.env.NODE_ENV === 'production') {
      const staticPath = resolve(__dirname, '..', '..', 'frontend', 'dist');
      app.use(express.static(staticPath));
      app.get('*', (_request, response) => {
        response.sendFile(resolve(staticPath, 'index.html'));
      });
    } else {
      const { createServer } = await import('vite');
      const vite = await createServer({
        root: resolve(__dirname, '..', '..', 'frontend'),
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }
  }

  app.use(
    (
      error: unknown,
      _request: express.Request,
      response: express.Response,
      _next: express.NextFunction,
    ) => {
      logger.error({ err: error }, 'request failed');
      response.status(500).json({ detail: 'Internal server error' });
    },
  );

  return app;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? 3000);
  const app = await createApp();

  app.listen(port, '127.0.0.1', () => {
    logger.info({ url: `http://127.0.0.1:${port}` }, 'Weather Starter listening');
  });
}
