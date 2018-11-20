const express = require('express'),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session');

let app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(expressSession({
    key: 'user_sid',
    secret: '2c7aea4237e25b4f8ee3b0bf77d6fed0',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign()
    .include('./app/routes')
    .then('./app/controllers')
    .into(app);
module.exports = app;
