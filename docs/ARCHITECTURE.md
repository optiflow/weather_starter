# Project Architecture

The `weather-starter` project is a monorepo managed via npm workspaces.

## Workspaces

- **`frontend/`**: A React single-page application.
  - **Tooling**: Vite
  - **Styling**: Tailwind CSS
  - **Mapping**: Leaflet (`react-leaflet`) for interactive weather maps.

- **`backend/`**: A Node.js/Express server.
  - **Database**: SQLite
  - **ORM**: Drizzle ORM (`drizzle-orm`, `drizzle-kit`) for schema management.

- **`scripts/`**: Custom Node.js scripts that manage the development lifecycle (e.g., dev server orchestration, state resets).
