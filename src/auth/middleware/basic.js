'use strict';

const base64 = require('base-64');
const users = require('../models/users/users-model');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');
  users.authenticateBasic(user, pass).then(validUser => {
    req.token = users.generateToken(validUser);
    req.user = validUser;
    next();
  })
    .catch(err => next('Invalid Login!!'));
};
