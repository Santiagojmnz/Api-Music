'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// cargar rutas
var user = require('./Routes/user')

//Servidor
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
//CORS cabecera

app.use(cors());
app.options('*', cors());

//Rutas base
app.use('/api', user);


module.exports = app;