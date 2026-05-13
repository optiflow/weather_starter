# Agent Instructions (AGENTS.md)

Welcome! This file contains essential information for AI agents working on the `weather-starter` project. Please read this before making any changes.

## Code Architecture

This project is a monorepo structured using npm workspaces.

- **`frontend/`**: A React single-page application built with Vite. It uses Tailwind CSS for styling and Leaflet (`react-leaflet`) for interactive weather maps.
- **`backend/`**: A Node.js/Express server. It uses SQLite for its database, managed by Drizzle ORM (`drizzle-orm`, `drizzle-kit`).
- **`scripts/`**: Custom Node.js scripts for managing the development lifecycle (e.g., dev server, resetting state).

## Common Commands

Run these commands from the **root directory**:

- **Start Development Server:** `npm run dev` (Runs `scripts/dev.mjs`, which orchestrates both frontend and backend dev servers).
- **Build Production Assets:** `npm run build` (Builds both workspaces).
- **Start Production Server:** `npm run start` (Runs `scripts/start.mjs`).
- **Run Tests:** `npm test` or `npm run test:watch` (Uses Vitest).
- **Database Operations:**
  - Generate migrations: `npm run db:generate`
  - Run migrations: `npm run db:migrate`
- **Linting & Formatting:** 
  - Lint: `npx eslint .`
  - Format: `npx prettier --write .`
- **Reset/Doctor:** 
  - `npm run reset` or `npm run doctor` to clean/troubleshoot local state.

## Rules & Guidelines

- **Documentation Updates:** When finishing up any task, check if there are any documents in `/docs` that need updating; update them as necessary.
- **Root Context:** Most scripts should be run from the root directory unless specifically targeting a sub-workspace.
