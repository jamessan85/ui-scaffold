import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fetchCIS2AccessToken, fetchCIS2UserInfo } from '../../../lib/cis2';

const getCallback: RequestHandler = async (req, res, next) => {
  try {
    const code = req.query.code as string;
    const accessToken = JSON.parse(await fetchCIS2AccessToken(code));
    const userData = await fetchCIS2UserInfo(accessToken.access_token);
    const decodedJWT = jwt.decode(userData);
    if (!decodedJWT) {
      return res.render(path.join(__dirname, 'template/index'), {
        error: true,
      });
    }
    res.render(path.join(__dirname, 'template/index'), {
      userData: JSON.stringify(decodedJWT, null, 4),
    });
  } catch (error) {
    next(error);
  }
};

export default getCallback;
