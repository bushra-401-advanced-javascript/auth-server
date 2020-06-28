'use strict';

const {server} = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mock = supergoose(server);

describe('Router',()=>{
  it('/signup to create a new user', ()=>{
    let userData = {
      username: 'bushrabilal',
      password: '12345'};
    return mock.post('/signup').send(userData).then(user=>{
      expect(user.status).toEqual(200);
    });
  });

  it('/signup to create a new user and return the username', ()=>{
    let userData = {
      username: 'bushrabilal12',
      password: '12345'};
    return mock.post('/signup').send(userData).then(user=>{
      expect(user.body.user.username).toEqual(userData.username);
    });
  });

  it('/signup to create a new user and return a token', ()=>{
    let userData = {
      username: 'bushrabilal123',
      password: '12345'};
    return mock.post('/signup').send(userData).then(user=>{
      expect(user.body.token).toBeTruthy();
    });
  });
}); 

