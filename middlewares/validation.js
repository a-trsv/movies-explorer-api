const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const isUrlValid = (url) => {
  const result = validator.isURL(url);
  if (result) {
    return url;
  }
  throw new Error('Вы ввели некорректную ссылку!');
};

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const newMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(1).max(250),
    image: Joi.string().required().custom(isUrlValid),
    trailer: Joi.string().required().custom(isUrlValid),
    thumbnail: Joi.string().required().custom(isUrlValid),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  signInValidation,
  signUpValidation,
  userUpdateValidation,
  newMovieValidation,
  movieIdValidation,
};
