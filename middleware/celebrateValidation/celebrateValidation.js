const { celebrate, Joi } = require('celebrate');
const {
  email, password, link, name, keyword, title, text, date, source, image, articleId, excessObjects,
} = require('./celebrateParametres');

//
const validateRegister = celebrate({
  body: Joi.object().options({ abortEarly: false }).keys({
    name, email, password,
  })
    .messages(excessObjects),
});

const validateLogin = celebrate({
  body: Joi.object().options({ abortEarly: false }).keys({ email, password })
    .messages(excessObjects),
});

const validateArticle = celebrate({
  body: Joi.object().options({ abortEarly: false }).keys({
    keyword, title, text, date, source, link, image,
  })
    .messages(excessObjects),
});

const validateId = celebrate({
  params: Joi.object().options({ abortEarly: false }).keys({ articleId })
    .messages(excessObjects),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateArticle,
  validateId,
};
