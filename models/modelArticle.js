const mongoose = require('mongoose');
const validator = require('validator');

const {
  requiredTrue,
} = require('../libs/validationParameters');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: requiredTrue,
  },
  title: {
    type: String,
    required: requiredTrue,
  },
  text: {
    type: String,
    required: requiredTrue,
  },
  date: {
    type: String,
    required: requiredTrue,
  },
  source: {
    type: String,
    required: requiredTrue,
  },
  link: {
    type: String,
    required: requiredTrue,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  image: {
    type: String,
    required: requiredTrue,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: requiredTrue,
  },
});

module.exports = mongoose.model('article', articleSchema);
