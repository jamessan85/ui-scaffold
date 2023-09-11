import helmet from 'helmet';
import express from 'express';

const responseHeadersSetup = (app: express.Application) => {
  app.use(helmet());
};

export default responseHeadersSetup;
