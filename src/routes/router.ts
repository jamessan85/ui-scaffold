import app from 'express';
import indexGet from './index/get';
import usersValidator from './users/validator/usersValidator';
import validateSchema from '../validator/validateSchema';
import userGet from './users/get';
import userPost from './users/post';

const router = app.Router();

router.get('/', indexGet);

router.get('/users', userGet);
router.post('/users', usersValidator, validateSchema, userPost);

export default router;
