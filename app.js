var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var request = require("request");
var htmlToText = require('html-to-text');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: '',
    password: 'root#123',
    database: 'swiftpay'
});

connection.connect();

// import fetch from 'node-fetch';
app.use(bodyParser.json());

app.use(cors())

// Routes
app.get('/', function (req, res) {
    res.send('Wrong location');
});


//------------------------------------------ login
// app.post('/login', function (req, res) {

// });

//------------------------------------------rest api to get schedules
app.get('/getmerchants', function (req, res) {

    connection.query('SELECT * from merchants', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
    connection.end();
});
app.post('/savereason', function (req, res) {
    // res.send([{name: req.body.reason}]);
    connection.query("INSERT INTO reason (reason) VALUES ('" + req.body.reason + "')", function (error, results, fields) {
        if (error) throw error;
        if (!error) throw results;
        // if (error) {
            // console.log(error);
            // res.send([{error: 'failed'}]);
        // } else {
        //     res.send([{feedback: 'success'}]);
        // }
    });
    connection.end();
});

// Listen
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening on', port);
})