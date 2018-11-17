const AuthController = require('../controllers/authController');

module.exports = function (application) {

    application.get('/login', (req, res) => {
        res.render('login')
    });

    application.post('/auth/register', (req, res) => {
        AuthController.insert(req.body, function (resp) {
            res.json(resp);
        })
    });

    application.get("/auth/list", (req, res) => {
        AuthController.getAll(function (resp) {
            res.json(resp);
        })
    });

    application.put("/auth/update/:id", function (req, res) {
        var userId = req.params.id;

        AuthController.update(userId, req.body, function (resp) {
            res.json(resp);
        });
    });

    application.delete("/auth/remove/:id", function (req, res) {
        var userId = req.params.id;

        AuthController.delete(userId, function (resp) {
            res.json(resp);
        })
    });
};
