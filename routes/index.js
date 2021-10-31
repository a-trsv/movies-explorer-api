const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../middlewares/errors/not-found-error');
const auth = require('../middlewares/auth');
const { signInValidation, signUpValidation } = require('../middlewares/validation');

router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);
router.use(auth, userRouter);
router.use(auth, movieRouter);

router.all('*', () => { throw new NotFoundError('Запрашиваемый адрес не найден'); });

module.exports = router;
