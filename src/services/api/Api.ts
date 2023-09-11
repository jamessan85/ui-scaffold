import { Request } from 'express';
import fetch from 'node-fetch';
import { inspect } from 'util';
import config from '../../config';
import { logger } from '../../logger';

class Api {
  body: Request;

  constructor(req: Request) {
    this.body = req.body;
  }

  static async makeRequest({
    path,
    method = 'GET',
    body = null,
    headers = {},
  }: {
    path: string;
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    body?: { [key: string]: string } | null;
    headers?: { [key: string]: string };
  }): Promise<{ [key: string]: string | number | object }> {
    const url = config.apiURL + path;

    const options: {
      method: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body?: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headers?: any;
    } = {
      body,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      method,
    };

    if (
      ['POST', 'PATCH', 'PUT'].includes(method) &&
      options.headers['Content-Type'] === 'application/json'
    ) {
      options.body = JSON.stringify(body);
    }

    logger.debug(
      `API ${method} ${url}${
        options.body ? ` ${inspect(options, { colors: true })}` : ''
      }`
    );

    const start = process.hrtime.bigint();

    const response = await fetch(url, options);

    const end = process.hrtime.bigint();
    const duration = (Number(end - start) / 1000000000.0).toFixed(4);

    logger.info(
      '[API]: [%s] [%s], DURATION: %s seconds, STATUS: [%s]',
      method,
      url,
      duration,
      response.status
    );

    const json = await response.json();

    return { data: json, status: response.status };
  }
}

export default Api;
