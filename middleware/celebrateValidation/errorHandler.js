// выводить ошибки в JSON формате

const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).send({
      message: err.details.get('body').message.replace(/['"]/g, ''),
    });
  }
  return next(err);
};
