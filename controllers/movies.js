const Movie = require('../models/movie');

// Errors

// 400 -> переданы некорректные данные
const RequestError = require('../middlewares/errors/request-error');
// 404 -> карточка/пользователь не найдены
const NotFoundError = require('../middlewares/errors/not-found-error');
// 403 -> доступ запрещен
const AccessError = require('../middlewares/errors/access-error');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        // console.log(error);
        next(new RequestError('Введенные данные некорректны!'));
      } else {
        next(error);
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден с таким id!'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return movie.remove()
          .then(() => res.send({ message: 'Фильм успешно удален!' }));
      }
      throw new AccessError('У вас нет прав на удаление данного фильма!');
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        // console.log(req.params.movieId);
        next(new RequestError('Введенные данные некорректны!'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
