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
    password: '',
    database: 'swiftpay'
});
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root#123',
//     database : 'swiftpay'
// });

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
//
//     var valid = false;
//
//     // var url = 'https://adin.ug/abc2018/api/christian.php?auth=246fb595064db95e76bbdd828cf7207662a6baaf&table=delegates';
//
//     request({
//         url: url,
//         json: true
//     }, function (error, response, body) {
//
//         if (!error && response.statusCode === 200) {
//             body.forEach(function (item) {
//                 if (req.body.email.match(item.email) && req.body.ticket.match(item.ticket)) {
//                     valid = true;
//                 }
//             });
//
//             res.send({feedback: valid});
//         }
//     })
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
        // if (error) throw error;
        if (error) {
            console.log(error);
        } else {
            res.send([{feedback: req.body.reason}]);
        }
    });
    // connection.end();
});


// Listen
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening on', port);
})