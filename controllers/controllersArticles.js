const Article = require('../models/modelArticle');
const { NotFoundError, ForbiddenError } = require('../errors');

const {
  SUCCESS,
  CLIENT_ERROR,
} = require('../libs/statusMessages');

// 1. контроллер getAllArticles возвращает все статьи
const getAllArticles = (req, res, next) => {
  Article.find({})
    .populate('user')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

// 2. контроллер createArticle создает статью
const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400)
          .send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else next();
    });
};

// 3. контроллер deleteCard удаляет карточку по идентификатору
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: CLIENT_ERROR.CARD_NOT_FOUND });
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError({ message: CLIENT_ERROR.FORBIDDEN });
      }
      Article.findByIdAndDelete(req.params.articleId)
        .then(() => res.send({ message: SUCCESS.REMOVE_CARD }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};