## 2024-05-13 - Security Headers Configuration
**Vulnerability:** Missing security headers on backend API.
**Learning:** Adding `helmet` adds various security headers out of the box, but `helmet` also includes a strict `Content-Security-Policy` which blocks external images.
**Prevention:** Make sure to set `{ contentSecurityPolicy: false }` or carefully configure `helmet` when adding it to the Express application if the frontend application uses maps or other external image sources.
