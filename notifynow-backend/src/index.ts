import express from "express";
import cookieParser from "cookie-parser";
import cron from "node-cron";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Health check route
app.get("/", (_req, res) => {
  res.json({ ok: true, name: "notifynow-backend" });
});

// Example cron job
cron.schedule("0 9 * * *", () => {
  console.log("Daily cron job running at 9:00 AM");
}, { timezone: "Europe/London" });

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
