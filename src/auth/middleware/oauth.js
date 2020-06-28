'use strict';

const users = require('../models/users/users-model');
require('dotenv').config();
const superagent = require('superagent');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const tokenServerUrl = process.env.TOKEN_SERVER_URL;
const remoteUserApi = process.env.REMOTE_USER_API;
const API_SERVER = process.env.API_SERVER;

module.exports = async (req, res, next) => {
  //login with superagent
  //get token
  //take the token and get the user obj
  //add the user obj to the DB
  //the form
  try {
    let code = req.query.code;
    let remoteToken = await exchangeCodeForToken(code);
    let remoteUser = await getRemoteUserInfo(remoteToken);
    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    next();
  } catch(e) {
    console.log('Error: ', e);
    next('Error');
  }

};
//the first step is filling the form, then we come here
//after filling the form you will receive a code

//to get the token
async function exchangeCodeForToken(code) {
  let tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id : CLIENT_ID,
    client_secret : CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });
  let access_token = tokenResponse.body.access_token;
  return access_token;
}
//to get the user details using the token in the authorization header
async function getRemoteUserInfo(token) {
  let userResponse = await superagent
    .get(remoteUserApi)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app');

  let user = userResponse.body;
  return user;
}

//to exctract the information I want from the user obj
async function getUser(remoteUserObj) {
  let userRecord = {
    username: remoteUserObj.login,
    password: 'aouthpassword',
  };
  //check if the user is already saved, if it is grab it, if not, continue and save it    
  let savedUser = await users.save(userRecord);
  //return user record with a generated token
  let myServerToken = users.generateToken(userRecord);
  return [savedUser, myServerToken]; //{user: user, token:token}
}
