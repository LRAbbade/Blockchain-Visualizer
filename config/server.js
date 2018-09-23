const express = require('express'),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session');

let app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));

consign({ cwd: process.cwd() + "/app" })
    .include('/routes')
    .then('/controllers')
    .into(app);
module.exports = app;
