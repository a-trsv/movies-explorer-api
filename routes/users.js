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
// userRouter.get('/users', getUsers);
userRouter.get('/api//users/me', getCurrentUser);
// userRouter.get('/users/:userId', userIdValidation, getUserById);
userRouter.patch('/api/users/me', userUpdateValidation, updateUser);

module.exports = userRouter;
