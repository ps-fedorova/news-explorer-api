const { checkPassword } = require('../libs/validationMessages');
const { BadRequestError } = require('../errors');

module.exports = (req, res, next) => {
  const { password } = req.body;
  const regex = /^\S*$/;

  if (!password || !password.match(regex)) {
    next(new BadRequestError({ message: checkPassword }));
  } else {
    next();
  }
};
