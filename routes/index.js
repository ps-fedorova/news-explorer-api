const router = require('express').Router();
const { auth } = require('../middleware/auth');
const usersRouter = require('./routerUsers');
const articlesRouter = require('./routerArticles');
const { validateRegister, validateLogin } = require('../middleware/celebrateValidation/celebrateValidation');
const { createUser, login } = require('../controllers/controllersUsers');
const checkPassword = require('../middleware/checkPassword');
const { CLIENT_ERROR } = require('../libs/statusMessages');
const { NotFoundError } = require('../errors');

router.post('/signup', validateRegister, checkPassword, createUser);
router.post('/signin', validateLogin, checkPassword, login);

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError({ message: CLIENT_ERROR.RESOURCE_NOT_FOUND }));
});

module.exports = router;
