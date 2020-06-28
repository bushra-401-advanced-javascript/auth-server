'use strict';

const users = require('../auth/models/users/users-model');

function getModel(req, res, next) {
  const model = req.params.model;
  switch (model){
  case 'signin':
    req.model = users;
    next();
    return;
  case 'signup':
    req.model = users;
    next();
    return;
  case 'oauth':
    req.model = users;
    next();
    return;
  default: 
    next('Invalid Model');
    return;
  }
}

module.exports = getModel;
