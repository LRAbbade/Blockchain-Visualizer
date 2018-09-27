const mongoose = require('mongoose');

const SearchesSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        require: true,
    },
    blockHash: {
        type: String,
        require: true,
    },
    userInfo: {
        type: mongoose.Schema.Types.objectId,
        ref: 'UserInfo',
        require: true,
    },
    result: {
        type: Boolean,
        require: true,
    }
});

const Searches = mongoose.model('Searches', SearchesSchema);

module.exports = Searches;