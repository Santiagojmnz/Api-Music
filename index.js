'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var dbRoute = 'mongodb+srv://admin:123Admin@apistreaming.aucokzq.mongodb.net/apiStreaming';
// 'mongodb://localhost:27017/apiStreaming';
mongoose.Promise = global.Promise;
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB conectada'))
    .catch(error => console.log(error))

app.listen(process.env.PORT || 8000)

'use strict'