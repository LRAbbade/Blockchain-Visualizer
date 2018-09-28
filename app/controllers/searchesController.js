var Searches = require('../models/searches');

exports.insert = function (body, callback) {
    new Searches({
        'timestamp': Date(),
        'blockHash': body.blockHash,
        'userInfo': body.userInfo,
        'result': body.result
    }).save(function (error, searches) {
        if (error) {
            callback({error: 'Cannot create search.'});
        } else {
            callback(searches);
        }
    })

};

exports.getAll = function (callback) {
    Searches.find({}, function (error, searches) {
        if (error) {
            callback(error, '0 Searches found');
        } else {
            callback(searches);
        }
    })
};

exports.update = function (searchId, body, callback) {
    Searches.findOneAndUpdate(searchId, body, function (error, search) {
        if (error) {
            callback({error: '0 searches found with the specified id.'});

        } else {
            callback(search);
        }
    });
};

exports.delete = function (userId, callback) {
    Searches.findOneAndDelete(userId, function (error, search) {
        if (error) {
            callback({error: '0 searches found with the specified id.'});
        } else {
            callback({search});
        }
    })
};