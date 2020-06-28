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
      return this.create(record)
        .then(createdRecord => {
          return createdRecord.populate('acl').execPopulate();
        }); 
    }
    return Promise.reject('This user is exists!');
  }
  
  async authenticateBasic(username, password){
    let data = await this.get({username: username});
    let valid = await bcryptjs.compare(password, data[0].password);
    return valid ? data[0] : Promise.reject();
  }

  generateToken(user){
    const userData = {
      exp: Math.floor(Date.now() / 1000) + (15 * 60),
      algorithm: 'ES384',
      username: user.username,
      id: user._id,
      capabilities: user.acl ? user.acl.capabilities : [],
      type: user.type || 'user',
    };
    const token =  jwt.sign(userData, SECRET);
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

  can(user, capability) {
    return user.acl.capabilities.includes(capability);
  }
}

module.exports = new Myusers(schema);
