const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/modelUser');
const { NotFoundError, ConflictError } = require('../errors');
const { SUCCESS, CLIENT_ERROR } = require('../libs/statusMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

// 1. контроллер createUser создаёт пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError({ message: CLIENT_ERROR.CONFLICT });
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        name: user.name,
        email: user.email,
      },
    }))
    .catch(next);
};

// 2. контроллер login получает из запроса почту и пароль и проверяет их
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: SUCCESS.AUTHORIZATION });
    })
    .catch(next);
};

// 3. контроллер getCurrentUser возвращает пользователя по _id
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: CLIENT_ERROR.USER_NOT_FOUND });
    })
    .then((user) => res.send({
      data: {
        name: user.name,
        email: user.email,
      },
    }))
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
