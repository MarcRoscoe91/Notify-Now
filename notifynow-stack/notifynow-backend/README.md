# notifynow-backend (Node + TypeScript)

Starter API for **notifynow.co.uk**:
- Magic-link email auth (console fallback if no provider configured)
- Items CRUD (in-memory; swap to Prisma/Postgres)
- Vehicle lookup endpoints (DVSA/DVLA keys optional)
- Daily 09:00 cron placeholder

## Quick start
```bash
npm i
cp .env.example .env
npm run dev
```
API at `http://localhost:4000`
