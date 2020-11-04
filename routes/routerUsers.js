const usersRouter = require('express').Router();
const { getCurrentUser } = require('../controllers/controllersUsers');

usersRouter.get('/me', getCurrentUser);

module.exports = usersRouter;
