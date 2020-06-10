'use strict';

//for the routes used for testing...

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./middleware/bearer');

router.get('/secret', bearerMiddleware, (req,res) => {} );


module.exports = router;
