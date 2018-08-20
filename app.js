var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var request = require("request");
var htmlToText = require('html-to-text');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root#123',
    database : 'swiftpay'
});

connection.connect();



// import fetch from 'node-fetch';
app.use(bodyParser.json());

app.use(cors())

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'xtianm4@gmail.com',
        pass: ''
    },
    tls: {
        rejectUnauthorized: false
    }
});

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

    // var merchants = require('./merchants.json');
    // res.send(merchants.reverse());
    connection.query('SELECT * from merchants', function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results[0].solution);
        res.send(results);

    });
    connection.end();
});


app.post('/sendmail', function (req, res) {

    console.log(req.body);

    var mailOptions = {
        from: req.body.email_from,
        to: req.body.email_to,
        subject: 'Swiftpay feedback',
        text: req.body.no_html,
        html: "<p>" + req.body.no_html + "</p>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({feedback: 'failed'});
        } else {
            // console.log('Email sent: ' + info.response);
            res.json({feedback: 'success'});
        }
    });

});

// Listen
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening on', port);
})