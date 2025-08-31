import cron from 'node-cron';

export async function runReminderSweep() {
  console.log(`[cron] Running reminder sweep at ${new Date().toISOString()}`);
  // TODO: replace this with real DB + email/SMS logic
}

export function startCron() {
  cron.schedule('0 9 * * *', async () => {
    await runReminderSweep();
  }, { timezone: 'Europe/London' });

  console.log('[cron] Scheduled daily sweep at 09:00 Europe/London');
}
