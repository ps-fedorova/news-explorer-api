// выводить ошибки в JSON формате

const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err) && err.details.get('body')) {
    return res.status(400).send({
      message: err.details.get('body').message.replace(/"/g, ''),
    });
  }
  if (isCelebrateError(err) && err.details.get('params')) {
    return res.status(400).send({
      message: err.details.get('params').message.replace(/"/g, ''),
    });
  }
  return next(err);
};
