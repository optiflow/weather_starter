## 2024-05-17 - Added basic security headers and JSON payload limits natively
**Vulnerability:** Missing basic security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) and unbounded JSON payload sizes which can lead to DoS.
**Learning:** Native Express middleware can be configured to provide basic security headers and JSON payload size limits without adding external dependencies like Helmet, which might have overly strict defaults (like CSP blocking external maps).
**Prevention:** Always ensure standard security headers are set and consider payload size limits as a base defense against simple DoS attacks.

## 2024-05-28 - Native Express Rate Limiting Implementation
**Vulnerability:** Missing rate limiting on backend API routes allowed potential brute force, credential stuffing, and DoS attacks due to unconstrained request frequency.
**Learning:** External dependencies like `express-rate-limit` are not strictly required for basic rate limiting. A native implementation using an in-memory `Map` provides a lightweight solution, avoiding extra overhead. However, the state (`Map` and cleanup `setInterval`) must be kept outside the application factory (`createApp`) to prevent memory leaks during testing, and the interval must be `.unref()`ed so it doesn't hang test runners. Additionally, `app.set('trust proxy', 1)` is crucial for identifying client IPs correctly when behind a proxy.
**Prevention:** Implement native rate limiting early on sensitive and high-traffic endpoints, ensuring careful handling of interval lifecycles (`.unref()`) and IP extraction (`trust proxy`) to maintain security and testability.
