const router = require('express').Router();
const { auth } = require('../middleware/auth');
const usersRouter = require('./routerUsers');
const { validateRegister, validateLogin } = require('../middleware/celebrateValidation/celebrateValidation');
const { createUser, login } = require('../controllers/controllersUsers');

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', auth, usersRouter);

module.exports = router;
