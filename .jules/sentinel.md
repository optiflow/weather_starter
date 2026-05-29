## 2024-05-17 - Added basic security headers and JSON payload limits natively
**Vulnerability:** Missing basic security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) and unbounded JSON payload sizes which can lead to DoS.
**Learning:** Native Express middleware can be configured to provide basic security headers and JSON payload size limits without adding external dependencies like Helmet, which might have overly strict defaults (like CSP blocking external maps).
**Prevention:** Always ensure standard security headers are set and consider payload size limits as a base defense against simple DoS attacks.

## 2024-05-18 - Implemented Native Rate Limiting
**Vulnerability:** Missing rate limiting on backend API routes leaves the service vulnerable to DoS attacks via unbounded request volumes.
**Learning:** Rate limiting can be achieved natively without introducing external dependencies (like `express-rate-limit`). Crucially, when implementing background intervals for state cleanup in Node.js (e.g. `setInterval`), appending `.unref()` is required to prevent keeping the Node process alive indefinitely and hanging the test suite. The state should be scoped outside the `createApp` factory to avoid memory leaks during testing, and `app.set('trust proxy', 1)` is essential for correct IP resolution when running behind reverse proxies.
**Prevention:** Ensure native background intervals always use `.unref()` in testing or ephemeral environments, scope shared cache/limit states carefully outside application instances, and configure proxy trusts correctly.
