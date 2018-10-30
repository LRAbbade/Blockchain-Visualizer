const mongoose = require('mongoose');

const SearchesSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        require: true,
    },
    blockHash: {
        type: String,
        require: true
    },
    result: {
        type: Boolean,
        require: true
    },
    userInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }]
});

const Searches = mongoose.model('Searches', SearchesSchema);

module.exports = Searches;