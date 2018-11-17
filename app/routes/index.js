const UserInfoController = require('../controllers/userInfoController');
const SearchesController = require('../controllers/searchesController');

module.exports = function (application) {
    function renderIndex(req, res, route, blocks) {
        application.app.controllers.index.renderIndex(application, req, res, route, blocks);
    }

    application.get('/', (req, res) => {
        renderIndex(req, res, "lastBlocks", "20");
    });

    application.get('/lastBlocks/:amount', (req, res) => {
        const numBlocks = req.params.amount;
        renderIndex(req, res, "lastBlocks", numBlocks);
    });

    application.get('/blocks/:amount', (req, res) => {
        const numBlocks = req.params.amount;
        renderIndex(req, res, "blocks", numBlocks);
    });

    application.get('/statistics', (req, res) => {
        application.app.controllers.index.renderStatistics(application, req, res);
    });

    application.get('/', function (req, res) {
        res.send('Blockchain Visualizer');
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
