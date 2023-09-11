import supertest from 'supertest';
import { expect } from '@jest/globals';
import express from 'express';
import start from '../../server';

const app = express();

const request = supertest(start(app));

describe('GET', () => {
  it('Should render the index page', async () => {
    const { text } = await request.get('/').expect(200);
    expect(text).toMatchSnapshot();
  });
});
