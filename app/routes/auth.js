const AuthController = require('../controllers/authController');
const index = require('../controllers/index');

function checkSession(req, res) {
    if (req.session.user.username) {
        return true;
    }
    res.redirect('/login');
}

function renderIndex(application, req, res, route, blocks) {
    if (checkSession(req, res)) {
        index.renderIndex(application, req, res, route, blocks);
    }
}

module.exports = function (application) {

    application.get('/login', (req, res) => {
        res.render('login', {status: 200})
    });

    application.get('/logout', (req, res) => {
        req.session.destroy(function () {
            res.redirect('/login');
        })
    });

    application.post('/auth', (req, res) => {
        AuthController.login(req, function (resp) {
            if (resp.status === 200) {
                renderIndex(application, req, res, "lastBlocks", "20");
            } else {
                res.render("login", {status: resp.status});
            }
        })
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
