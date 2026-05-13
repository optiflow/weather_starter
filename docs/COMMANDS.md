# Common Commands

Run all commands from the **root directory**.

## Development & Build
- `npm run dev`: Starts the development server (orchestrates frontend and backend via `scripts/dev.mjs`).
- `npm run build`: Builds both frontend and backend workspaces.
- `npm run start`: Starts the production server.

## Testing & Quality
- `npm test` or `npm run test:watch`: Runs Vitest test suite.
- `npx eslint .`: Lints the codebase.
- `npx prettier --write .`: Formats code.

## Database Operations
- `npm run db:generate`: Generates Drizzle migrations.
- `npm run db:migrate`: Runs pending migrations.

## Troubleshooting
- `npm run reset` / `npm run doctor`: Cleans or troubleshoots local state.
