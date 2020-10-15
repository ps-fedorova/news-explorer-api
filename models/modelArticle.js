const mongoose = require('mongoose');
const validator = require('validator');

const {
  requiredTrue,
  castTypeMessage,
  linkErrorMessage,
} = require('../libs/validationParameters');

const articleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      cast: castTypeMessage,
      required: requiredTrue,
    },
    title: {
      type: String,
      cast: castTypeMessage,
      required: requiredTrue,
    },
    text: {
      type: String,
      cast: castTypeMessage,
      required: requiredTrue,
    },
    date: {
      type: String,
      cast: castTypeMessage,
      required: requiredTrue,
    },
    source: {
      type: String,
      cast: castTypeMessage,
      required: requiredTrue,
    },
    link: {
      type: String,
      cast: castTypeMessage,
      required: requiredTrue,
      validate: {
        validator: (link) => validator.isURL(link),
        message: linkErrorMessage,
      },
    },
    image: {
      type: String,
      cast: castTypeMessage,
      required: requiredTrue,
      validate: {
        validator: (link) => validator.isURL(link),
        message: linkErrorMessage,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      cast: castTypeMessage,
      ref: 'user',
      required: requiredTrue,
    },
  },
);

module.exports = mongoose.model('article', articleSchema);
