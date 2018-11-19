const mongoose = require('mongoose');

const UserInfo = new mongoose.Schema({
    ip: {
        type: String,
        require: true
    },
    userAgent: {
        type: String,
        require: true
    },
    plataform: {
        type: String,
        require: true
    },
    plataformDetails: {
        type: String,
        require: true
    },
    browser: {
        type: String,
        require: true
    }, 
    timestamp: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('UserInfo', UserInfo);