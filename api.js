require('dotenv').config();

const clc = require('cli-color');
const logOk = clc.green.bold;

const createError = require('http-errors');
const express = require('express');
const app = express();
const parser = require('body-parser');
const logger = require('morgan');

const database = require('./utils/db');

const car = require('./routes/car');
const annonce = require('./routes/annonces');
const user = require('./routes/users');

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(express.static(__dirname + 'public'));

app.get('/', (req, res, next) => {
    res.status(200);
    res.json({"message": "Annonces-auto API"})
});

app.use('/car', car);
app.use('/annonce', annonce);
app.use('/user', user);

database.connect();


app.listen(2727, () => {
    console.log(logOk('Server running on 2727'))
});



