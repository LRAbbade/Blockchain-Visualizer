const User = require('../models/user');
//const Searches = require('../models/searches');
const UserController = require('../controllers/userController');

module.exports = function (application) {

    application.get('/', function (req, res) {
        res.send('Blockchain Visualizer');
    });

    application.get('/users', function (req, res) {

        UserController.getAll(function (resp) {
            res.json(resp);
        });
    });

    application.post('/register', function (req, res) {

        UserController.insert(req.body, function (resp) {
            res.json(resp);
        })
    });

    application.delete('/remove/:id', function (req, res) {
        var userId = req.params.id;

        UserController.delete(userId, function (resp) {
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
