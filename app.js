require('dotenv').config(); // dotenv нужен для чтения переменных из файла .env в Node

const express = require('express');

const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const { errors } = require('celebrate');
const celebrateErrorHandler = require('./middleware/celebrateValidation/celebrateErrorHandler'); // кастомизированная обработка ошибок

const { NotFoundError } = require('./errors');

const { limiter } = require('./middleware/expressRateLimit');
const { requestLogger, errorLogger } = require('./middleware/logger');
const router = require('./routes');

const { SERVER_ERROR, CLIENT_ERROR } = require('./libs/statusMessages');

const app = express();
const { PORT = 3000 } = process.env; // const PORT = process.env.PORT || 3000;

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/diplomadb', { // подключение БД
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(helmet()); // для простановки security-заголовков для API
app.use(limiter); // для ограничения количества запросов (до 100 раз за 15 минут)

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: false })); // для приёма веб-страниц внутри POST-запроса

app.get('/crash-test', () => { // краш-тест сервера
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router); // обработчик роутов

// errorLogger нужно подключить после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger);

// app.use(errors()); // обработка ошибок в из celebrate
app.use(celebrateErrorHandler);

app.use(() => {
  throw new NotFoundError({ message: CLIENT_ERROR.RESOURCE_NOT_FOUND });
});

app.use((err, req, res, next) => {
  if (err.status !== '500') {
    res.status(err.status)
      .send(err.message);
    return;
  }
  res.status(500)
    .send({ message: `${SERVER_ERROR.INTERNAL_SERVER_ERROR}: ${err.message}` });
  next();
});

app.listen(PORT);
