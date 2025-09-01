// src/index.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// ---- import your routers/middleware (adjust paths if different)
import { itemsRouter } from './routes/items.js';
import { authRouter, requireAuth } from './routes/auth.js';
import { startCron } from './lib/cron.js';

const app = express();

// ---- middleware
app.use(cors({
  origin: (process.env.CORS_ORIGINS || '').split(',').filter(Boolean),
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ---- health routes (Render verifies custom domains by hitting `/`)
app.get('/', (_req, res) => {
  res.json({ ok: true, name: 'notifynow-backend' });
});
app.head('/', (_req, res) => res.sendStatus(200));

// ---- API routes
app.use('/api/auth', authRouter);
app.use('/api/items', requireAuth, itemsRouter);

// (optional) secure manual trigger for cron sweeps if you use external schedulers
app.post('/internal/run-sweep', async (req, res) => {
  if (req.headers['x-cron-secret'] !== process.env.CRON_SECRET) return res.sendStatus(401);
  const mod = await import('./lib/cron.js');
  await mod.runReminderSweep?.();
  res.json({ ok: true });
});

// ---- start cron scheduler inside the web service (harmless if you also use Render Cron)
startCron();

// ---- bind to Render's PORT
const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
