export const AUTH_METHODS = ['email', 'google'];

export const AUTH_EMAIL_VERIFICATION_SUBJECT = `Your ${process.env.NEXT_PUBLIC_APP_NAME} Login Link`;

export const AUTH_FROM_EMAIL = 'no-reply@resend.tosend.co';

export const AUTH_SMTP_FROM_EMAIL = 'no-reply@mailhog.tosend.co';

export const AUTH_PAGES = {
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
};

export const AUTH_SUCCESS_CALLBACK = '/workspace';

export const AUTH_FLOW_ROUTES = {
  PUBLIC: ['/'],
  AUTH: ['/auth/signin', '/auth/signup'],
  API_PREFIX: '/api/auth',
};
