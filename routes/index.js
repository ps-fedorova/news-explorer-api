const router = require('express').Router();
const { auth } = require('../middleware/auth');
const usersRouter = require('./routerUsers');
const articlesRouter = require('./routerArticles');
const { validateRegister, validateLogin } = require('../middleware/celebrateValidation/celebrateValidation');
const { createUser, login } = require('../controllers/controllersUsers');
const checkPassword = require('../middleware/checkPassword');

router.post('/signup', validateRegister, checkPassword, createUser);
router.post('/signin', validateLogin, checkPassword, login);

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);

module.exports = router;
