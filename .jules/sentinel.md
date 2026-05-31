## 2024-05-17 - Added basic security headers and JSON payload limits natively
**Vulnerability:** Missing basic security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) and unbounded JSON payload sizes which can lead to DoS.
**Learning:** Native Express middleware can be configured to provide basic security headers and JSON payload size limits without adding external dependencies like Helmet, which might have overly strict defaults (like CSP blocking external maps).
**Prevention:** Always ensure standard security headers are set and consider payload size limits as a base defense against simple DoS attacks.

## 2025-02-18 - Native Rate Limiting Implementation
**Vulnerability:** Missing rate limiting on sensitive API endpoints, allowing potential brute force and DoS attacks.
**Learning:** Rate limiting can be implemented natively using an in-memory Map in `backend/src/server.ts` to avoid introducing external dependencies like `express-rate-limit`. Key considerations: the state (`rateLimitMap` and `setInterval`) must be scoped outside the `createApp` factory to prevent memory leaks during testing, `app.set('trust proxy', 1)` is required to correctly resolve IPs behind reverse proxies, the middleware should explicitly bypass checks when `process.env.NODE_ENV === 'test'` to avoid test failures, and the background `setInterval` must use `.unref()` to avoid keeping the Node process alive unnecessarily.
**Prevention:** Always implement rate limiting on API endpoints to protect against automated abuse. When building custom rate limiters in Node.js, carefully manage memory and background timers to ensure stability and testability.
