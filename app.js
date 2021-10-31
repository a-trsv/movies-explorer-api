require('dotenv').config();
const express = require('express');

const { PORT = 3000 } = process.env;
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const expressRateLimiter = require('./middlewares/expressRateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');
const { MONGO_DATEBASE_LINK, ALLOWED_CORS_LINKS } = require('./utils/constants');

mongoose.connect(MONGO_DATEBASE_LINK, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});
const app = express();

app.use(cors({
  origin: ALLOWED_CORS_LINKS,
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUTP, PATCH, POST, DELETE, OPTIONS');
  next();
});

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(expressRateLimiter);
app.use(cookieParser());
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
