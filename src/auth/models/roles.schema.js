'use strict';

const mongoose = require('mongoose');

const roles = mongoose.Schema({
  role: {type:String, required: true},
  capabilities: {type: Array, required: true},
});


module.exports = mongoose.model('roles', roles);
