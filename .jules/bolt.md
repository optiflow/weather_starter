## 2024-05-30 - Staggered Promise.all Execution
**Learning:** The `api-open.data.gov.sg` weather API enforces strict rate limiting (HTTP 429). When making concurrent requests, execution should be staggered (e.g., using a delay in Promise.all) to avoid hitting the rate limit. Staggering execution maximizes performance while respecting the API rate limits.
**Action:** When making multiple external API calls, implement a staggered execution (e.g. using delay thunks) to stagger requests and avoid rate limits.
