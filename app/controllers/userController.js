var User = require('../models/user');

exports.save = function (body, callback) {
    new User({
        'user_agent': body.user_agent,
        'plataform': body.plataform,
        'plataform_details': body.plataform_details
    }).save(function (error, user) {
        if (error) {
            callback({error: 'Cannot create user.'});
        } else {
            callback(user);
        }
    });
};

exports.getAll = function (callback) {
    User.find({}, function (error, User) {
        if (error) {
            callback({error: 'No Users Found.'});
        } else {
            callback(User);
        }
    });
};

exports.delete = function (userId, callback) {
    User.findById(id, function (error, user) {
        if (error) {
            callback({error: 'Cannot delete user.'})
        } else {
            user.remove(function (error) {
                if (!error) {
                    callback({resposta: 'User deleted successfully.'})
                }
            })
        }
    })
};