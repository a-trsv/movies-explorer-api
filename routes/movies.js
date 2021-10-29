const movieRouter = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

// Валидация
const { newMovieValidation, movieIdValidation } = require('../middlewares/validation');

// Роуты
movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', newMovieValidation, postMovie);
movieRouter.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = movieRouter;
