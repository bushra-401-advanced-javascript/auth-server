'use strict';

require('dotenv').config();
const schema = require('./users-schema');
const Model = require('../mongo');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const SECRET = process.env.SECRET || 'Secret';
class Myusers extends Model {
  constructor(){
    super(schema);
  }
  async save(record){
    let data = await this.get({username: record.username});
    if (!data[record.username]) {
      return this.create(record);
    }
    return Promise.reject('This user is exists!');
  }
  async authenticateBasic(username, password){
    let data = await this.get({username: username});
    let valid = await bcryptjs.compare(password, data[0].password);
    return valid ? data[0] : Promise.reject();
  }
  generateToken(user){
    const token =  jwt.sign({username: user.username}, SECRET);
    return token;
  }
  async authenticateToken(token) {
    try {
      const tokenObject = await jwt.verify(token, SECRET);
      const result = await this.get({username : tokenObject.username});
      if (result.length != 0) {
        return Promise.resolve(result[0]);
      } else {
        return Promise.reject('User is not found!');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
}
module.exports = new Myusers();
