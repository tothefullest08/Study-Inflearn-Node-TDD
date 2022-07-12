const express = require('express');
const morgan = require('morgan');
const app = express();

// 로깅
function logger(req, res, next) {
    console.log('I am logger');
    next();
}

function logger2(req, res, next) {
    console.log('I am logger2');
    next();
}

// 일반
function commonmw(req, res, next) {
    console.log('common middleware');
    next(new Error('error occurred'));
}

// 에러
function errormw(err, req, res, next) {
    console.log(err.message);
    next();
}

app.use(logger);
app.use(logger2);
app.use(morgan('dev')); // 써드파티
app.use(commonmw);
app.use(errormw);

app.listen(3000, function() {
    console.log('Server Is Running');
})