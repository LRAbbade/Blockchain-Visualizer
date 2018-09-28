const UserController = require('../controllers/userController');
const SearchesController = require('../controllers/searchesController');

module.exports = function (application) {

    application.get('/', function (req, res) {
        res.send('Blockchain Visualizer');
    });

    //Users route
    application.get('/users', function (req, res) {

        UserController.getAll(function (resp) {
            res.json(resp);
        });
    });

    application.post('/register-user', function (req, res) {

        UserController.insert(req.body, function (resp) {
            res.json(resp);
        })
    });

    application.put('/update-user/:id', function (req, res) {
        var userId = req.params.id;

        UserController.update(userId, req.body, function (resp) {
            res.json(resp);
        });
    });

    application.delete('/remove-user/:id', function (req, res) {
        var userId = req.params.id;

        UserController.delete(userId, function (resp) {
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
        })
    });
};

// module.exports = function (application) {

// application.get('/', function (req, res) {
//     application.app.controllers.index.renderIndex(application, req, res, "lastBlocks", "20");
// });
//
// application.get('/lastBlocks/:amount', (req, res) => {
//     const numBlocks = req.params.amount;
//     application.app.controllers.index.renderIndex(application, req, res, "lastBlocks", numBlocks);
// });
//
// application.get('/blocks/:amount', (req, res) => {
//     const numBlocks = req.params.amount;
//     application.app.controllers.index.renderIndex(application, req, res, "blocks", numBlocks);
// });
// };
