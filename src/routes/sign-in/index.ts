import app from 'express';
import getIndex from './getIndex/get';
import getCallback from './getCallback/get';

const router = app.Router();

router.get('/', getIndex);
router.get('/callback', getCallback);

export default router;
