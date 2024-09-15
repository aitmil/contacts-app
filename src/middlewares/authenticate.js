import createHttpError from 'http-errors';

import { UsersCollection } from '../models/user.js';
import { SessionsCollection } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = authHeader.split(' ', 2);

  if (bearer !== 'Bearer' || !accessToken) {
    return next(createHttpError(401, 'Auth header should be type of Bearer'));
  }

  const session = await SessionsCollection.findOne({ accessToken });

  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  const accessTokenIsExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (accessTokenIsExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findOne({ _id: session.userId });

  if (user === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  req.user = user;

  if (!req.user || !req.user._id) {
    return next(createHttpError(401, 'Invalid user session'));
  }

  next();
};
