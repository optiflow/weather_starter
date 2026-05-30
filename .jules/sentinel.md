## 2024-05-24 - Rate Limiting Added
**Vulnerability:** Missing rate limiting on API endpoints (DoS/brute force risk)
**Learning:** Adding a rate limiter requires `app.set('trust proxy', 1)` when deploying behind a proxy. Also, an interval needs `.unref()` to avoid tests from hanging, and the middleware should skip tests (`NODE_ENV === 'test'`).
**Prevention:** Implement basic, native rate limiting on all API boundaries moving forward and handle test environments.
