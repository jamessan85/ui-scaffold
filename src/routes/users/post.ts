import { RequestHandler } from 'express';
import path from 'path';
import Users from '../../services/api/Users';

const post: RequestHandler = async (req, res, next) => {
  try {
    if (res.locals.errors) {
      return res.status(400).render(path.join(__dirname, '/template/users'));
    }
    await Users.getUsers();
    return res.redirect('/');
  } catch (error) {
    return next(error);
  }
};

export default post;
