import { jest, expect } from '@jest/globals';
import setLanguageCookie from './setLanguageCookie';

describe('setLanguageCookie', () => {
  it('Should set the cookie value', () => {
    const req: any = {
      query: {
        lang: 'cat',
      },
    };
    const res: any = {
      cookie: jest.fn(),
    };

    const next = jest.fn();
    setLanguageCookie(req, res, next);
    expect(res.cookie).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith('lang', 'cat');
    expect(next).toHaveBeenCalled();
  });
  it('Should not call cookie function, query.lang is empty', () => {
    const req = {
      query: {
        lang: '',
      },
    } as any;
    const res = {
      cookie: jest.fn(),
    } as any;

    const next = jest.fn();
    setLanguageCookie(req, res, next);
    expect(res.cookie).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalledWith('lang', 'cat');
    expect(next).toHaveBeenCalled();
  });
});
