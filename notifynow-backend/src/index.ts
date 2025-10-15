import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter, requireAuth } from "./lib/auth";
import { startCron } from "./lib/cron";
import { itemsRouter } from "./routes/items";
import { vehicleRouter } from "./routes/vehicle";

const app = express();

const defaultOrigins = [
  "https://notify-now.co.uk",
  "https://www.notify-now.co.uk",
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5173",
  "http://localhost:4173"
];

const configuredOrigins = (process.env.APP_ORIGIN || "")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...configuredOrigins]));

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => res.json({ ok: true, name: "notifynow-backend" }));
app.head("/", (_req, res) => res.sendStatus(200));

app.use("/api/auth", authRouter);
app.use("/api/items", requireAuth, itemsRouter);
app.use("/api/vehicle", requireAuth, vehicleRouter);

startCron();

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
