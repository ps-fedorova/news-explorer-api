const { Joi } = require('celebrate');

const {
  string, empty, regex, min, max, required, emailMessage, uri, excess, alphanum, length, hex,
} = require('../../libs/joiMessages');

// user
const email = Joi
  .string()
  .required()
  .email()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.email': emailMessage,
    'any.required': required,
  });

//
const password = Joi
  .string()
  .required()
  .regex(/^\S*$/)
  .min(8)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.pattern.base': regex,
    'string.min': min,
    'any.required': required,
  });

//
const name = Joi
  .string()
  .required()
  .min(2)
  .max(30)
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.min': min,
    'string.max': max,
    'any.required': required,
  });

// article
const keyword = Joi
  .string()
  .required()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'any.required': required,
  });

//
const title = Joi
  .string()
  .required()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'any.required': required,
  });

//
const text = Joi
  .string()
  .required()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'any.required': required,
  });

const date = Joi
  .string()
  .required()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'any.required': required,
  });

//
const source = Joi
  .string()
  .required()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'any.required': required,
  });

//
const link = Joi
  .string()
  .required()
  .uri()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.uri': uri,
    'any.required': required,
  });

//
const image = Joi
  .string()
  .required()
  .uri()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.uri': uri,
    'any.required': required,
  });

//
const articleId = Joi
  .string()
  .alphanum()
  .length(24)
  .hex()
  .messages({
    'string.base': string,
    'string.empty': empty,
    'string.alphanum': alphanum,
    'string.length': length,
    'string.hex': hex,
    'any.required': required,
  });

//
const excessObjects = {
  'object.unknown': excess,
};

module.exports = {
  email,
  password,
  name,
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
  articleId,
  excessObjects,
};
