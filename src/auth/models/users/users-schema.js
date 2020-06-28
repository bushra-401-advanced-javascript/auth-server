'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const roles = require('../roles.schema');

const schema = mongoose.Schema({
  username : {type : String , required : true},
  password : { type : String , required : true},
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'writer', 'admin'],
  },
},
{toObject: {virtuals: true}, toJSON: {virtuals: true}});
schema.virtual('acl', {
  ref: 'roles',
  localField: 'role',
  foreignField: 'role',
  justOne: true,
});
schema.pre('save', async function() {
  this.password  = await bcrypt.hash(this.password, 5);
});

module.exports = mongoose.model('schema', schema);
