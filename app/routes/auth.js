const UserController = require('../controllers/userController');

module.exports = function (application) {

    application.get('/login', (req,res) => {
        res.render('login')
    });

};
