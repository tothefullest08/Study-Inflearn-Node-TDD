const express = require('express');
const morgan = require('morgan');
const app = express();
const user = require('./3_apis_refactoring/user/index.js')

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

app.use('/users', user);

module.exports = app;