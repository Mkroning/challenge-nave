import JWT from 'jsonwebtoken'
import {
  promisify
} from 'util'
import authConfig from './../Config/auth'

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ Error: 'Token not provided !' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(JWT.verify)(token, authConfig.secret);

    request.userId = decoded.id;

    return next();
  } catch (err) {
    return response.status(401).json({ Error: 'Invalid token' });
  }
};
