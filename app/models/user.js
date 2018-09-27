const mongoose = require('mongoose');

const user = new mongoose.Schema({
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

const User = mongoose.model('User', user);

module.exports = User;