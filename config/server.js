const express = require('express'),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session');

let app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign()
    .include('./app/routes')
    .then('./app/controllers')
    .into(app);
module.exports = app;
