import 'dotenv/config';

export default {
  apiURL: process.env.API_URL || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
};
