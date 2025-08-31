/**
 * One-off cron runner for Render Cron Jobs
 * Command on Render Cron: `node scripts/run-cron.js`
 */
import 'dotenv/config';

const mod = await import('../dist/lib/cron.js');
if (typeof mod.runReminderSweep === 'function') {
  await mod.runReminderSweep();
  console.log('[cron] One-off sweep complete');
} else {
  console.warn('[cron] runReminderSweep() not found — did the build include dist/lib/cron.js?');
}
