const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/error-unathorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // проверка на наличие и корректность токена
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Отказ в авторизации!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    throw new UnauthorizedError('Отказ в авторизации!');
  }
  req.user = payload;
  next();
};
