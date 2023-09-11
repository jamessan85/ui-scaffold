/* eslint-disable no-underscore-dangle */
import { check } from 'express-validator';

const usersValidator = [check('name').isAlpha().withMessage('isAlpha')];

export default usersValidator;
