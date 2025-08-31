import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter, requireAuth } from './lib/auth.js';
import { itemsRouter } from './routes/items.js';
import { vehicleRouter } from './routes/vehicle.js';
import { startCron } from './lib/cron.js';

const app = express();
const origins = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({ origin: (origin, cb)=> cb(null, !origin || origins.includes(origin)), credentials: true }));
app.use(express.json({limit:'1mb'}));
app.use(cookieParser());

app.get('/', (_req, res)=> res.json({ ok: true, name: 'notifynow-backend' }));
app.use('/api/auth', authRouter);
app.use('/api/items', requireAuth, itemsRouter);
app.use('/api/vehicle', requireAuth, vehicleRouter);

const port = Number(process.env.PORT || 4000);
app.listen(port, ()=> console.log(`API listening on http://localhost:${port}`));

startCron();
