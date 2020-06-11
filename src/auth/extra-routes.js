'use strict';

//for the routes used for testing...

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./middleware/bearer');

router.get('/secret', bearerMiddleware, (req,res) => {} );

router.post('/add', bearerAuth, permissions('create'), (req,res)=>{
  res.status(201).send('created ..');
});
  
router.get('/read', bearerAuth, permissions('read'),(req,res)=>{
  res.status(201).send('Allowed reading ');
});
  
router.put('/change', bearerAuth, permissions('update'), (req,res)=>{
  res.status(201).send('changed ..');
});
router.delete('/remove', bearerAuth, permissions('delete'),(req,res)=>{
  res.status(201).send('removed  ..');
});
  

module.exports = router;
