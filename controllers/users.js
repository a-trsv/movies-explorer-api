const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

// Errors
// 400 -> переданы некорректные данные
// const ERROR_REQUEST = 400
const RequestError = require('../middlewares/errors/request-error');
// 404 -> карточка/пользователь не найдены
// const ERROR_CODE = 404
const NotFoundError = require('../middlewares/errors/not-found-error');
// 401 -> ошибка аутентификации/авторизации
const UnauthorizedError = require('../middlewares/errors/error-unathorized');
// const ERROR_UNAUTHORIZED = 401
// 409 -> ошибка совпадени E-Mail при регистрации
const ExistEmailError = require('../middlewares/errors/exist-error');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден с таким id!');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        next(new RequestError('Введенные данные некорректны!'));
      } else if (error.code === 11000) {
        next(new ExistEmailError('Данный E-Mail уже зарегистрирован!'));
      } else {
        next(error);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, password, email } = req.body;
  bcrypt.hash(password, 10)
    // console.log(req.body)
    .then((hash) => User.create({
      name, password: hash, email,
    }))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new RequestError('Введенные данные некорректны!'));
      } else if (error.code === 11000) {
        next(new ExistEmailError('Данный E-Mail уже зарегистрирован!'));
      } else {
        next(error);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Неправильная почта или пароль!')));
};

module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  login,
};
