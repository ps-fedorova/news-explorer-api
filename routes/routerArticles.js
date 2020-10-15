const articlesRouter = require('express').Router();
const { validateArticle, validateId } = require('../middleware/celebrateValidation/celebrateValidation');
const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/controllersArticles');

articlesRouter.get('/', getAllArticles);
articlesRouter.post('/', createArticle);
articlesRouter.delete('/:articleId', deleteArticle);

module.exports = articlesRouter;
