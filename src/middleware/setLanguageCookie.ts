import { RequestHandler } from 'express';

const languageMiddleware: RequestHandler = (req, res, next) => {
  if (req.query.lang) {
    res.cookie('lang', req.query.lang);
  }
  next();
};

export default languageMiddleware;
