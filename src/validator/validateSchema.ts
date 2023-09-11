/* eslint-disable no-underscore-dangle */
import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const checkValid: RequestHandler = (req, res, next) => {
  const error = validationResult(req);
  if (error && !error.isEmpty()) {
    const errors = <
      {
        type: string;
        value?: string;
        msg: string;
        path: string;
        location: string;
      }[]
    >error.array();

    const formatter = errors.reduce(
      (
        acc: {
          errorSummary: { href: string; text: string }[];
          fields: { [key: string]: string };
        },
        nextVal
      ) => {
        acc.fields[nextVal.path] = res.__(nextVal.msg);
        acc.errorSummary.push({
          href: `#${nextVal.path}`,
          text: res.__(nextVal.msg),
        });
        return acc;
      },
      { errorSummary: [], fields: {} }
    );
    res.locals.errors = formatter;
  }
  next();
};

export default checkValid;
