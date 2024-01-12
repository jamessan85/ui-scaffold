import 'dotenv/config';

export default {
  apiURL: process.env.API_URL || '',
  cis2ClientID: process.env.CIS2_CLIENT_ID || '',
  cis2ClientSecret: process.env.CIS2_CLIENT_SECRET || '',
  cis2Host: process.env.CIS2_HOST || '',
  cis2RedirectURI: process.env.CIS2_REDIRECT_URI || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
};
