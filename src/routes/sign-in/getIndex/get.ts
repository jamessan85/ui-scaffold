import { RequestHandler } from 'express';
import path from 'path';

const get: RequestHandler = (req, res) => {
  res.render(path.join(__dirname, '/template/index'));
};

export default get;