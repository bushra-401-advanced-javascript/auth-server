'use strict';

const users = require('../models/users/users-model');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login, No Auth Headers');
  }
  else {
    const [auth, token] = req.headers.authorization.split(' ');
    if (auth === 'Bearer') {
      users
        .authenticateToken(token)
        .then((validUser) => {
          req.user = validUser;
          next();
        })
        .catch((e) => next('Invalid Login', e.message));
    }
    else {
      next('Invalid Authorization Header');
    }
  }
};
