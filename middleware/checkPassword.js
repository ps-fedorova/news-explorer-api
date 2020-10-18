const { checkPassword } = require('../libs/validationMessages');

module.exports = (req, res, next) => {
  const { password } = req.body;
  const regex = /^\S*$/;

  if (!password || !password.match(regex)) {
    res.status(400)
      .send({ message: checkPassword });
  } else {
    next();
  }
};
