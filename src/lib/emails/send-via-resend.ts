import { env } from '@/env';
import { AUTH_FROM_EMAIL } from '@/util/constants/auth';
import { Resend } from 'resend';

export const resend = env.RESEND_API_KEY
  ? new Resend(env.RESEND_API_KEY)
  : null;

type options = {
  email: string;
  from?: string;
  html?: string;
  subject?: string;
};

export default async function sendViaResend({
  email,
  from,
  html,
  subject,
}: options) {
  if (!resend) {
    throw new Error('RESEND_API_KEY is not defined');
  }

  const { data } = await resend.emails.send({
    to: email,
    from: from || AUTH_FROM_EMAIL,
    replyTo: 'support@tosend.co',
    subject: subject || 'Your Login Link',
    html,
    text: 'Please use an HTML compatible email viewer to see this message.',
  });

  if (!data?.id) {
    throw new Error('Resend email could not be sent');
  }
}
