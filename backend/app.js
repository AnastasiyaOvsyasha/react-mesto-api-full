require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); //
const cors = require('cors'); //
const rateLimit = require('express-rate-limit'); //
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const {
  createUser, login, logout, checkToken,
} = require('./controllers/users');

const ErrorNotFound = require('./errors/ErrorNotFound');

const { PORT = 3001 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.get('/logout', logout);
app.get('/checktoken', checkToken);
app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string().required().email(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(
        /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/,
      ),
      password: Joi.string().required(),
      email: Joi.string().required().email(),
    }),
  }),
  createUser,
);

app.use(auth);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use(errorLogger);

app.use(errors());

app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// подключаемся к серверу mongo
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });
  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}
main();
