const User = require('../models/user');
const bcrypy = require('bcrypt-nodejs');

exports.insert = function (body, callback) {
    const username = body.username;
    const password = body.password;
    const confirmPassword = body.confirmPassword;

    if (username && password && confirmPassword) {
        if (password === confirmPassword) {
            User.findOne({'username': username}, function (User) {
                if (User) {
                    callback({sucess: false, message: 'Username already in use'});
                } else {
                    bcrypy.hash(password, 10, null, function (err, hash) {
                        if (err) {
                            callback({sucess: false, error: err});
                        } else {
                            new User({
                                'username': body.username,
                                'password': hash,
                            }).save(function (error, User) {
                                if (error) {
                                    callback({error: 'Cannot create user.'});
                                } else {
                                    callback(User);
                                }
                            });
                        }
                    });
                }
            });
        }
    }


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

exports.update = function (userId, body, callback) {
    User.findOneAndUpdate(userId, body, function (error, user) {
        if (error) {
            callback({error: 'No users found with the specified id.'})

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