require('dotenv').config(); // dotenv нужен для чтения переменных из файла .env в Node

const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const { errors } = require('celebrate'); // кастомизированная обработка ошибок (↓)
const celebrateErrorHandler = require('./middleware/celebrateValidation/celebrateErrorHandler');
const errorHandler = require('./middleware/errorHandler');
const { limiter } = require('./middleware/expressRateLimit');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { PORT, MONGO } = require('./config');
const router = require('./routes');

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3001',
  ],
  credentials: true,
};

// const corsOptions = { origin: true, credentials: true };

mongoose.connect(MONGO, { // подключение БД
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter); // для ограничения количества запросов (до 100 раз за 15 минут)
app.use(helmet()); // для простановки security-заголовков для API
app.use(cors(corsOptions)); // получать доступ к моему API

app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата

app.use(requestLogger); // логгер запросов нужно подключить до всех обработчиков роутов

app.use(router); // обработчик роутов

// errorLogger нужно подключить после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger);

// app.use(errors()); // обработка ошибок в из celebrate
app.use(celebrateErrorHandler);

app.use(errorHandler); // "ошибка сервера"

app.listen(PORT);
