var User = require('../models/user');

exports.insert = function (body, callback) {
    new User({
        'user_agent': body.user_agent,
        'plataform': body.plataform,
        'plataform_details': body.plataform_details
    }).save(function (error, User) {
        if (error) {
            callback({error: 'Cannot create user.'});
        } else {
            callback(User);
        }
    });
};

exports.getAll = function (callback) {
    User.find({}, function (error, User) {
        if (error) {
            callback({error: '0 Users Found.'});
        } else {
            callback(User);
        }
    });
};

exports.update = function (userId, body, callback) {
    User.findOneAndUpdate(userId, body, function (error, user) {
        if (error) {
            callback({error: '0 users found with the specified id.'})

        } else {
            callback(user);
        }
    });
};

exports.delete = function (userId, callback) {
    User.findById(userId, function (error, user) {
        if (error) {
            callback({error: 'No user found with the specified id.'})
        } else {
            user.remove(function (error) {
                if (!error) {
                    callback({resposta: 'User deleted successfully.'})
                }
            });
        }
    })
};