'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require('express-fileupload');

// cargar rutas
var user = require('./Routes/user');
var artist = require('./Routes/artist');
var album = require('./Routes/album');
var song = require('./Routes/song');
var uploadImage = require('./Routes/uploadImage');

//Servidor
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
//CORS cabecera

//Carga de archivos
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));

app.use(cors());
app.options('*', cors());

//Rutas base
app.use('/api', user, artist, album, song, uploadImage);


module.exports = app;