import express from 'express';
import { I18n } from 'i18n';
import path from 'path';
import {
  LOCALE_OPTIONS,
  buildLocaleJSONFiles,
} from '../locales/populateLocaleFiles';
import { languageMiddleware } from '../middleware/index';

const i18nSetup = (app: express.Application) => {
  buildLocaleJSONFiles();

  const i18n = new I18n({
    cookie: 'lang',
    defaultLocale: 'en',
    directory: path.join(__dirname, '..', 'locales'),
    locales: LOCALE_OPTIONS,
    queryParameter: 'lang',
  });
  app.use(languageMiddleware);
  app.use(i18n.init);
};

export default i18nSetup;
