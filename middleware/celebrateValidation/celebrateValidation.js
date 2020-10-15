const { celebrate, Joi } = require('celebrate');
const {
  email, password, link, name, keyword, title, text, date, source, image, articleId, excessObjects,
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

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword, title, text, date, source, link, image,
  })
    .messages(excessObjects),
});

const validateId = celebrate({
  params: Joi.object().keys({ articleId })
    .messages(excessObjects),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateArticle,
  validateId,
};
