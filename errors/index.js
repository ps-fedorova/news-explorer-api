const BadRequestError = require('./400_BadRequestError');
const UnauthorizedError = require('./401_UnauthorizedError');
const ForbiddenError = require('./403_ForbiddenError');
const NotFoundError = require('./404_NotFoundError');
const ConflictError = require('./409_ConflictError');

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
