import sendViaNodeMailer from './send-via-nodemailer';

type option = {
  email: string;
  from?: string;
  html?: string;
  subject?: string;
};

export default async function sendEmail(options: option) {
  if (process.env.NODE_ENV === 'production') {
    return console.log('Sending email via Resend:', options);
  }

  return await sendViaNodeMailer(options);
}
