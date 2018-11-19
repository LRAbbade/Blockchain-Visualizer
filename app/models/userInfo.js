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
    platform: {
        type: String,
        require: true
    },
    platformDetails: {
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