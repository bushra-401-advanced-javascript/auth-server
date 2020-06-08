'use strict';

function notFoundHandler(req, res, next) {
  res.status(404);
  res.send({err: 'not found'});
}
module.exports = notFoundHandler;
