import { env } from '@/env';
import { AUTH_SMTP_FROM_EMAIL } from '@/util/constants/auth';
import nodemailer from 'nodemailer';

type options = {
  email: string;
  from?: string;
  html?: string;
  subject?: string;
};

export default async function sendViaNodeMailer({
  email,
  from,
  html,
  subject,
}: options) {
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });

  console.log('✉️ Sending email via Nodemailer to:', email);

  const result = await transporter.sendMail({
    from: from || AUTH_SMTP_FROM_EMAIL,
    to: email,
    subject: subject,
    html: html,
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
  console.log(
    '✅ ✉️ Email successfully sent via Nodemailer:',
    result.messageId,
  );
}
