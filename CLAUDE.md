# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Duo is a React SPA for exploring traditional Chinese calligraphy and paintings. It features content browsing (artworks, artists, editorials, masterclasses, services), JWT authentication, an AI art generation playground, and an enquiry system. The backend is a separate service deployed on Railway.

## Commands

- **Dev server**: `npm run dev` (Vite)
- **Build**: `npm run build` (Vite production build)
- **Lint**: `npm run lint` (ESLint, zero warnings allowed)
- **Preview**: `npm run preview` (serve production build locally)

No test framework is configured.

## Architecture

**Stack**: React 19 + React Router 7 + Vite 6 + Tailwind CSS 4. Plain JavaScript/JSX (no TypeScript).

### Key Directories

- `src/components/` — All React components (pages, forms, layout)
- `src/contexts/` — React Context providers (ModalContext, UserContext)
- `src/services/` — API service modules, one per domain (fetch-based)

### Routing

Flat route structure defined in `src/App.jsx`. Key routes: `/`, `/artists`, `/artworks`, `/masterclasses`, `/services`, `/editorials`, `/playground`, `/profile`, `/about`. Detail routes use `:id` params (e.g., `/artists/:id`).

### State Management

Two React Contexts handle global state:
- **UserContext** — Authenticated user data, decoded from JWT stored in localStorage
- **ModalContext** — Controls modal overlays for auth forms and enquiry forms. Persists enquiry form data when a user needs to authenticate mid-flow (save form → sign in → reopen form with saved data)

### API Layer

Each service module in `src/services/` exports async functions that call the backend via `fetch`. The backend URL comes from `import.meta.env.VITE_BACK_END_SERVER_URL`. Authenticated requests send a Bearer token from localStorage in the Authorization header.

### Authentication Flow

Sign-in/sign-up forms are modals managed by ModalContext. On auth success, the JWT token is stored in localStorage, and UserContext updates by decoding the token payload client-side.

### Styling

Tailwind CSS utility classes with custom CSS variables defined in `src/index.css`:
- `--color-red: #96272D` (primary accent)
- `--color-green: #9ED3C6` (hover/secondary)
- `--color-gold: #D6B84D` (tertiary)
- `--color-black: #101010`, `--color-white: #ffffff`, `--color-gray: #e8e6e1`

Fonts: Barlow, Pontano Sans, Tinos (loaded via Google Fonts in `index.html`).

### Deployment

Deployed to Vercel. `vercel.json` rewrites all routes to `index.html` for SPA routing.

## Environment Variables

Set `VITE_BACK_END_SERVER_URL` in `.env` to point at the backend API.
