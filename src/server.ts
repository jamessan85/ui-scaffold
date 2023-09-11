import express, { NextFunction, Request, Response } from 'express';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { i18nSetup, csrfSetup } from './setup/index';
import router from './routes/router';
import config from './config';
import { errorLogger, loggerMiddleware } from './logger';

const app = express();

const start = (application: express.Application) => {
  application.use(express.static('public'));
  application.use(express.static('node_modules/nhsuk-frontend/dist'));
  application.use(
    express.static('node_modules/nhsuk-frontend/packages/assets')
  );

  application.set('view engine', 'njk');

  nunjucks.configure(['/', 'node_modules/nhsuk-frontend/packages/components'], {
    autoescape: true,
    express: application,
  });

  application.use(cookieParser());
  // parse application/x-www-form-urlencoded
  application.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  application.use(bodyParser.json());

  application.use(loggerMiddleware);

  i18nSetup(application);
  csrfSetup(application);

  // entry point into the application
  application.use('/', router);

  // 404 Handler
  application.use((req: Request, res: Response) => {
    res.status(404).render(path.join(__dirname, '/views/error.njk'), {
      error: 'Page not found',
    });
  });

  // any other unhandled errors
  application.use(
    errorLogger,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    (err: any, req: Request, res: Response, _next: NextFunction) => {
      res.status(500).render(path.join(__dirname, '/views/error.njk'), {
        error:
          config.nodeEnv === 'development'
            ? err.message
            : 'Sorry, there is a problem with the service',
      });
    }
  );
  if (config.nodeEnv !== 'test') {
    application.listen(config.port, () => {
      console.log(`Server started listening on ${config.port}`);
    });
  }
  return application;
};

start(app);

export default start;
