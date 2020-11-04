const { SERVER_ERROR } = require('../libs/statusMessages');

module.exports = (err, req, res, next) => {
  if (err.status !== '500') {
    res.status(err.status)
      .send(err.message);
    return;
  }
  res.status(500)
    .send({ message: `${SERVER_ERROR.INTERNAL_SERVER_ERROR}: ${err.message}` });
  next();
};
