var UserInfo = require('../models/userInfo');

exports.insert = function (body, callback) {
    new UserInfo({
        'user_agent': body.user_agent,
        'plataform': body.plataform,
        'plataform_details': body.plataform_details
    }).save(function (error, UserInfo) {
        if (error) {
            callback({error: 'Cannot create user information.'});
        } else {
            callback(UserInfo);
        }
    });
};

exports.getAll = function (callback) {
    UserInfo.find({}, function (error, UserInfo) {
        if (error) {
            callback({error: 'No user information found.'});
        } else {
            callback(UserInfo);
        }
    });
};

exports.update = function (userId, body, callback) {
    UserInfo.findOneAndUpdate(userId, body, function (error, user) {
        if (error) {
            callback({error: 'No user information found with the specified id.'})

        } else {
            callback(user);
        }
    });
};

exports.delete = function (userId, callback) {
    UserInfo.findById(userId, function (error, user) {
        if (error) {
            callback({error: 'No user information found with the specified id.'})
        } else {
            user.remove(function (error) {
                if (!error) {
                    callback({resposta: 'User information deleted successfully.'})
                }
            });
        }
    })
};