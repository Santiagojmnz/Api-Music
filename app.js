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
var image = require('./Routes/image');
var playList = require('./Routes/playList');
var addSong = require('./Routes/listSong');
var search = require('./Routes/search');
//Servidor
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));


//Carga de archivos
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));

//CORS cabecera
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});

//Rutas base
app.use('/api', user, artist, album, song, playList, addSong, image, search);


module.exports = app;