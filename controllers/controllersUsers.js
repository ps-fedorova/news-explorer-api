const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/modelUser');
const { BadRequestError, NotFoundError, ConflictError } = require('../errors');
const { SUCCESS, CLIENT_ERROR } = require('../libs/statusMessages');
const { JWT_SECRET } = require('../config');

// 1. контроллер createUser создаёт пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      res.status(201).send({ _id: user._id, email, name });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` }));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError(({ message: CLIENT_ERROR.CONFLICT })));
      }
      return next(err);
    });
};

// 2. контроллер login получает из запроса почту и пароль и проверяет их
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: SUCCESS.AUTHORIZATION, token });
    })
    .catch(next);
};

// 3. контроллер getCurrentUser возвращает информацию о пользователе (email и имя)
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: CLIENT_ERROR.USER_NOT_FOUND });
    })
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
