const movieRouter = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

// Валидация

const { newMovieValidation, movieIdValidation } = require('../middlewares/validation');

// Роуты
movieRouter.get('/api/movies', getMovies);
movieRouter.post('/api/movies', newMovieValidation, postMovie);
movieRouter.delete('/api/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = movieRouter;
