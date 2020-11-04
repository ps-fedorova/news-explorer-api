const articlesRouter = require('express').Router();
const { validateArticle, validateId } = require('../middleware/celebrateValidation/celebrateValidation');
const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/controllersArticles');

articlesRouter.get('/', getAllArticles);
articlesRouter.post('/', validateArticle, createArticle);
articlesRouter.delete('/:articleId', validateId, deleteArticle);

module.exports = articlesRouter;
