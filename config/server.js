const express = require('express'),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session');

let app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

// function changeUndefined(req, res, next) {
//     if (typeof req.session.data === "undefined") {
//         req.session.data = {
//             autorizado: false,
//             _id: ""
//         };
//     }
//     next();
// }

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
//
// app.use(expressSession({
//     secret: 'hijiodsasdiisai2sjado',
//     resave: false,
//     saveUninitialized: false
// }));

consign()
    .include('app/routes')
    // .then('config/dbConnection.js')
    // .then('app/models')
    .then('app/controllers')
    .into(app);
module.exports = app;
