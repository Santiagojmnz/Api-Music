'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var dbRoute = 'mongodb://localhost:27017/apiStreaming';
mongoose.Promise = global.Promise;
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB conectada'))
    .catch(error => console.log(error))

app.listen(process.env.PORT || 8080)