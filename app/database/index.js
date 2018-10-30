const mongoose = require('mongoose');
const url = 'mongodb://localhost/blockchain_visualizer';


mongoose.connect( url, { useNewUrlParser: true }, function (err, res) {
    if (err) {
        console.log('Connection failed: ' + url);
    } else {
        console.log('Connected to: ' + url);
    }
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
