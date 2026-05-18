## 2025-02-20 - Global Security Headers and Payload Limit
**Vulnerability:** Missing basic security headers (MIME-sniffing, Clickjacking, XSS) and missing limit on JSON body payload size (DoS).
**Learning:** The Express application lacked native security protections out of the box, exposing basic vectors like clickjacking and potential DoS by heavy JSON bodies, since it relied on the default express.json() settings which could be large, and didn't set any global security headers.
**Prevention:** Ensured security headers are manually set in `app.use` at the very beginning, and specifically configured `express.json({ limit: '100kb' })` to reject oversized bodies.
