const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const UnauthorizedError = require('../errors/401_UnauthorizedError');

const {
  CLIENT_ERROR,
} = require('../libs/statusMessages');

const {
  requiredTrue,
  castTypeMessage,
  linkErrorMessage,
} = require('../libs/validationParameters');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
  },
  email: {
    type: String,
    cast: castTypeMessage,
    unique: true,
    required: requiredTrue,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: linkErrorMessage,
    },

  },
  password: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
    // необходимо добавить поле select, чтобы API не возвращал хеш пароля
    select: false,
    // здесь могло быть ограничение длины символов пароля, который хранится в базе, но
    // у нас в базе сохраняется хеш. Проверка не имеет смысла
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError({ message: CLIENT_ERROR.AUTHENTICATION });
      }
      return bcryptjs.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError({ message: CLIENT_ERROR.AUTHENTICATION });
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
