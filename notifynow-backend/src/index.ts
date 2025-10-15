import express from "express";
import cookieParser from "cookie-parser";
import cron from "node-cron";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Health check for Render + browser test
app.get("/", (_req, res) => {
  res.json({ ok: true, name: "notifynow-backend" });
});
app.head("/", (_req, res) => res.sendStatus(200));

// Example cron (9am London)
cron.schedule("0 9 * * *", () => {
  console.log("[cron] Daily sweep 09:00 Europe/London");
}, { timezone: "Europe/London" });

const PORT = Number(process.env.PORT) || 10000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));

