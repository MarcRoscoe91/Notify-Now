import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cron from "node-cron";

const app = express();
app.use(cors({
  origin: ["https://notify-now.co.uk", "https://www.notify-now.co.uk"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => res.json({ ok: true, name: "notifynow-backend" }));
app.head("/", (_req, res) => res.sendStatus(200));

cron.schedule("0 9 * * *", () => {
  console.log("[cron] Daily sweep 09:00 Europe/London");
}, { timezone: "Europe/London" });

const PORT = Number(process.env.PORT) || 10000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
