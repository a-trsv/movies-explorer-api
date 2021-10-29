const userRouter = require('express').Router();

const {
  // getUsers,
  // getUserById,
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

// Валидация
const {
  userUpdateValidation,
} = require('../middlewares/validation');

// Роуты
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', userUpdateValidation, updateUser);

module.exports = userRouter;
