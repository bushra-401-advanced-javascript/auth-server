'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

const router = require('./auth/router');
const extraRoutes = require('./auth/extra-routes');

app.use(router);
app.use(extraRoutes);

const notFound = require('./middleware/404');
const serverError = require('./middleware/500');

app.use('*', notFound); 
app.use(serverError); 


module.exports = {
  server: app,
  start: (port, mongodb_uri) => {
    app.listen(port, () => {
      console.log('Server is up and running on port', port);
    });
    let options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(mongodb_uri, options);
  },
};
