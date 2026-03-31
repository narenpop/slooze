# slooze

Commodities Management feature scaffold covering:

- Authentication (`POST /auth/login`) for Manager and Store Keeper.
- Role-based dashboard access (Manager only).
- Products listing and add/edit endpoints for Manager and Store Keeper.
- Next.js UI pages for login, dashboard, and products.
- Light/Dark theme toggle persisted with `localStorage`.
- Role-based menu restrictions and route-level guards on front-end pages.

## Folders

- `backend/src`: NestJS-style controller/guard/service implementation.
- `frontend/src`: Next.js app routes, auth context, UI components.
