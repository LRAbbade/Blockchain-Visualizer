const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

exports.login = function (req, callback) {
    User.findOne({username: req.body.username}, function (error, user) {
        if (error) {
            callback({status: 500, auth: false, error: "An error occurred."});
        } else if (!user) {
            callback({status: 500, auth: false, error: "Incorrect username or password."});
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, res) {
                if (!res) {
                    callback({status: 500, auth: false, error: "Incorrect username or password."});
                } else {
                    req.session.user = {
                        username: user.username,
                    };
                    callback({status: 200, auth: true});
                }
            });
        }
    });
};

exports.insert = function (body, callback) {
    const username = body.username;
    const password = body.password;
    const confirmPassword = body.confirmPassword;

    if (username && password && confirmPassword) {
        if (password === confirmPassword) {
            User.findOne({'username': username}, function (AuthUser) {
                if (AuthUser) {
                    callback({success: false, error: 'Username already in use'});
                } else {
                    bcrypt.hash(password.toString(), null, null, function (err, hash) {
                        if (err) {
                            callback({success: false, error: err});
                        } else {
                            new User({
                                'username': body.username,
                                'password': hash
                            }).save(function (error, user) {
                                if (error) {
                                    callback({error: 'Cannot create user.'});
                                } else {
                                    callback(user);
                                }
                            });
                        }
                    });
                }
            });
        } else {
            callback({success: false, error: 'Password and confirmation does not match.'})
        }
    } else {
        callback({success: false, error: 'Invalid user or password.'})
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
    User.findById(userId, body, function (error, user) {
        if (error) {
            callback({error: 'No users found with the specified id.'})
        } else {
            bcrypt.compare(body.currentPassword, user.password, function (err, res) {
                if (!res) {
                    callback({success: false, error: "Passwords should match."});
                } else {
                    bcrypt.hash(body.password.toString(), null, null, function (err, hash) {
                        if (err) {
                            callback({success: false, error: err});
                        } else {
                            User.update({}, {
                                'username': body.username,
                                'password': hash
                            }, function (error, userUpdated) {
                                if (error) {
                                    callback({success: false, error: 'Cannot update user.'});
                                } else {
                                    callback(userUpdated);
                                }
                            });

                        }
                    });
                }
            });
            /*
            bcrypt.compare(body.currentPassword, user.password, function (err, res) {
                if (err) {
                    callback({success: false, error: "Passwords should match."});
                } else {

                    bcrypt.hash(body.password.toString(), null, null, function (err, hash) {
                        if (err) {
                            callback({success: false, error: err});
                        } else {
                            user.updateOne({}, {
                                'username': body.username,
                                'password': hash
                            }, function (error, user) {
                                if (error) {
                                    callback({success: false, error: 'Cannot update user.'});
                                } else {
                                    callback(user);
                                }
                            });

                        }
                    });
                }
            });
*/
        }
    });
};

exports.delete = function (userId, callback) {
    User.findById(userId, function (error, user) {
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