// One-off cron runner for Render Cron Jobs
import 'dotenv/config';
const mod = await import('../dist/lib/cron.js');
if (typeof mod.runReminderSweep === 'function') {
  await mod.runReminderSweep();
  console.log('[cron] one-off sweep complete');
} else {
  console.warn('[cron] runReminderSweep() not found — did the build run?');
}
