'use strict';

const express = require('express');
const router = express.Router();
const users = require('./models/users/users-model');
const basic = require('./middleware/basic');
const oauth = require('../auth/middleware/oauth');
// const bearer = require('../auth/middleware/bearer');

router.post('/signup',signupHandler);
router.post('/signin', basic , signinHandler);
router.get('/users', listHandler);
router.get('/oauth', oauth, oauthHandler);
// router.get('/secret', bearer, bearerHandler);

function oauthHandler(req, res) {
  res.cookie('token', req.token, {
    expires  : new Date(Date.now() + 100000),
    httpOnly: false,
  });
  res.status(200).send(req.token);
}

// function bearerHandler(req, res) {
//   res.cookie('token', req.token, {
//     httpOnly: false,
//     expires: new Date(Date.now() + 100000),
//   });
//   res.status(200).json(req.user);
// }

async function signupHandler (req,res){
  users.save(req.body)
    .then((userData) => { 
      req.token = users.generateToken(userData);
      req.user = {
        username: userData.username,
        role: userData.role,
      };
      res.cookie('token', req.token, {
        expires  : new Date(Date.now() + 100000),
        httpOnly: false,
      });
      res.set('token', req.token);
      res.status(200).json({user: req.user, token: req.token});        
    }).catch((err) => res.status(403).send(err.message));
}

function signinHandler(req,res){
  res.cookie('token', req.token, {
    expires  : new Date(Date.now() + 100000),
    httpOnly: false,
  });
  res.status(200).json({token:req.token, user:req.user});
}

async function listHandler(req,res){
  const result = await users.get({});
  res.json(result);
}

module.exports = router;
