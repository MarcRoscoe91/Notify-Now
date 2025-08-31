import { Resend } from 'resend';
import sgMail from '@sendgrid/mail';

export async function sendEmail(to: string, subject: string, html: string){
  if(process.env.RESEND_API_KEY){
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: process.env.EMAIL_FROM || 'NotifyNow <no-reply@example.com>', to, subject, html });
    return;
  }
  if(process.env.SENDGRID_API_KEY){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({ to, from: process.env.SENDGRID_FROM || 'NotifyNow <no-reply@example.com>', subject, html });
    return;
  }
  console.warn('No email provider configured; printing email to console');
  console.log({ to, subject, html });
}
