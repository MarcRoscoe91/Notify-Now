import cron from 'node-cron';

export function startCron(){
  cron.schedule('0 9 * * *', async ()=>{
    console.log('Daily reminder sweep at 09:00 — wire your DB + email logic here.');
  });
  console.log('Reminder cron scheduled at 09:00 daily');
}
