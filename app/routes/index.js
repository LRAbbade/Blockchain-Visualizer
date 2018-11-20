const index = require('../controllers/index');

function checkSession(req, res) {
    if (req.session.user && req.session.user.username) {
        return true;
    }
    res.redirect('/login');
    // return true;
}

function renderIndex(application, req, res, route, blocks) {
    if (checkSession(req, res)) {
        index.renderIndex(application, req, res, route, blocks);
    }
}

function renderStatistics(application, req, res) {
    if (checkSession(req, res)) {
        index.renderStatistics(application, req, res);
    }
}

function renderProfile(application, req, res) {
    if (checkSession(req, res)) {
        index.renderProfile(application, req, res);
    }
}

module.exports = function (application) {
    application.get('/', (req, res) => {
        renderIndex(application, req, res, "lastBlocks", "20");
    });

    application.get('/lastBlocks/:amount', (req, res) => {
        const numBlocks = req.params.amount;
        renderIndex(application, req, res, "lastBlocks", numBlocks);
    });

    application.get('/blocks/:amount', (req, res) => {
        const numBlocks = req.params.amount;
        renderIndex(application, req, res, "blocks", numBlocks);
    });

    //Statistics
    application.get('/statistics', (req, res) => {
        renderStatistics(application, req, res);

    });

    application.get('/statisticsJson', (req, res) => {
        application.app.controllers.index.getStatistics(application, req, res);
    });

    //Profile
    application.get('/profile', (req, res) => {
        renderProfile(application, req, res);
    });

    //Users route
    application.get('/users', function (req, res) {

        UserInfoController.getAll(function (resp) {
            res.json(resp);
        });
    });

    application.post('/register-user', function (req, res) {
        UserInfoController.insert(req.body, function (resp) {
            res.json(resp);
        })
    });

    application.put('/update-user/:id', function (req, res) {
        var userId = req.params.id;

        UserInfoController.update(userId, req.body, function (resp) {
            res.json(resp);
        });
    });

    application.delete('/remove-user/:id', function (req, res) {
        var userId = req.params.id;

        UserInfoController.delete(userId, function (resp) {
            res.json(resp);
        })
    });

    //Searches route
    application.get('/searches', function (req, res) {
        SearchesController.getAll(function (resp) {
            res.json(resp);
        })
    });

    application.post('/register-search', function (req, res) {
        SearchesController.insert(req.body, function (resp) {
            res.json(resp);
        });
    });

    application.put('/update-search/:searchId', function (req, res) {
        SearchesController.update(req.params.searchId, req.body, function (resp) {
            res.json(resp);
        });
    });

    application.delete('/remove-search/:searchId', function (req, res) {
        SearchesController.delete(req.params.searchId, function (resp) {
            res.json(resp);
        });
    });
};
