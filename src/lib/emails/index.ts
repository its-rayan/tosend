import { env } from '@/env';
import sendViaNodeMailer from './send-via-nodemailer';
import sendViaResend from './send-via-resend';

type option = {
  email: string;
  from?: string;
  html?: string;
  subject?: string;
};

export default async function sendEmail(options: option) {
  if (env.NODE_ENV === 'production') {
    return await sendViaResend(options);
  }

  return await sendViaNodeMailer(options);
}
