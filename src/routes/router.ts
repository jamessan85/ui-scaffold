import app from 'express';
import indexGet from './index/get';
import signInRoutes from './sign-in/index';

const router = app.Router();

router.get('/', indexGet);
router.use('/sign-in', signInRoutes);

export default router;
