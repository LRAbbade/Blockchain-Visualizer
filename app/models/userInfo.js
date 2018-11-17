const mongoose = require('mongoose');

const UserInfo = new mongoose.Schema({
    user_agent: {
        type: String,
        require: true,
    },
    plataform: {
        type: String,
        require: true,
    },
    plataform_details: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('UserInfo', UserInfo);