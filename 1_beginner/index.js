const http = require('http');

http.createServer();

const math = require('./math.js');
const result = math.sum(1,2);

// console.log(result); // 3


const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf-8');
console.log(data);

const data1 = fs.readFile('./data.txt', 'utf-8', function (err, data) {
    console.log(data, "async");
});

