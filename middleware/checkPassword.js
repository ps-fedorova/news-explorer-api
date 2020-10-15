module.exports = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim()) {
    res.status(400)
      .send({ message: 'password - поле должно содержать значащие символы' });
  } else {
    next();
  }
};
