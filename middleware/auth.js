const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/401_UnauthorizedError');
const { CLIENT_ERROR } = require('../libs/statusMessages');
const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError({ message: CLIENT_ERROR.AUTHORIZATION });
  }
  req.user = payload;

  next();
};

module.exports = {
  auth,
};
