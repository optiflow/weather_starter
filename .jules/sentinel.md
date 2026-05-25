## 2024-05-17 - Added basic security headers and JSON payload limits natively
**Vulnerability:** Missing basic security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) and unbounded JSON payload sizes which can lead to DoS.
**Learning:** Native Express middleware can be configured to provide basic security headers and JSON payload size limits without adding external dependencies like Helmet, which might have overly strict defaults (like CSP blocking external maps).
**Prevention:** Always ensure standard security headers are set and consider payload size limits as a base defense against simple DoS attacks.

## 2024-05-18 - Missing Rate Limiting on API Endpoints
**Vulnerability:** The Express backend lacked rate limiting on the `/api` routes, making it susceptible to DoS attacks or excessive abuse of backend functionality.
**Learning:** Native rate limit state (`rateLimitMap` and `setInterval`) must be scoped outside the `createApp` factory in Node.js test environments to prevent memory leaks, and `.unref()` must be called on intervals to avoid hanging test suites. Express instances behind a proxy must also call `app.set('trust proxy', 1)` for accurate IP tracking.
**Prevention:** Always implement native or library-based rate limiting on sensitive API endpoints, and ensure background cleanup tasks are properly unreferenced or handled during application teardown.
