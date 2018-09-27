const UserInfo = require('../models/user');
//const Searches = require('../models/searches');

// module.exports = function (application) {
//     application.post('/register', async (req, res) => {
//         try {
//             console.log('POST user')
//             console.log(json(req.body));
//             const user = await UserInfo.create(req.body);
//
//             return res.send({user});
//         } catch (err) {
//             return res.status(400).send({error: 'Error creating new user'});
//         }
//     });

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
};
