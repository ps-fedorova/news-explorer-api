const { celebrate, Joi } = require('celebrate');
const {
  email, password, link, name, _id, excessObjects,
} = require('./celebrateParametres');

//
const validateRegister = celebrate({
  body: Joi.object().keys({
    name, email, password,
  })
    .messages(excessObjects),
});

const validateLogin = celebrate({
  body: Joi.object().keys({ email, password })
    .messages(excessObjects),
});

const validateCard = celebrate({
  body: Joi.object().keys({ name, link })
    .messages(excessObjects),
});

const validateId = celebrate({
  params: Joi.object().keys({ _id })
    .messages(excessObjects),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({ name })
    .messages(excessObjects),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateUserUpdate,
  validateCard,
  validateId,
};
