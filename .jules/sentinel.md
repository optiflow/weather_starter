## 2024-05-17 - Added basic security headers and JSON payload limits natively
**Vulnerability:** Missing basic security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) and unbounded JSON payload sizes which can lead to DoS.
**Learning:** Native Express middleware can be configured to provide basic security headers and JSON payload size limits without adding external dependencies like Helmet, which might have overly strict defaults (like CSP blocking external maps).
**Prevention:** Always ensure standard security headers are set and consider payload size limits as a base defense against simple DoS attacks.

## 2024-05-21 - Native Rate Limiting implementation without test blocking
**Vulnerability:** Missing rate limiting on backend `/api` endpoints could lead to DoS or abuse of the external API limits.
**Learning:** We can implement a native in-memory Map rate limiter instead of relying on external dependencies like `express-rate-limit`. When doing so, using `setInterval` for cleanup must include a `.unref()` call, otherwise the interval keeps the Node.js event loop alive and causes test suites to hang indefinitely.
**Prevention:** Always append `.unref()` to background intervals (like `setInterval`) used for cleanup or cache invalidation in backend code.
