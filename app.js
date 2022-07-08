'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// cargar rutas
var user = require('./Routes/user');
var artist = require('./Routes/artist');
var album = require('./Routes/album');

//Servidor
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
//CORS cabecera

app.use(cors());
app.options('*', cors());

//Rutas base
app.use('/api', user, artist, album);


module.exports = app;