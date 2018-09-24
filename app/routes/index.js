module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controllers.index.renderIndex(application, req, res, "lastBlocks", "20");
    });

    application.get('/lastBlocks/:amount', (req, res) => {
        const numBlocks = req.params.amount;
        application.app.controllers.index.renderIndex(application, req, res, "lastBlocks", numBlocks);
    });

    application.get('/blocks/:amount', (req, res) => {
        const numBlocks = req.params.amount;
        application.app.controllers.index.renderIndex(application, req, res, "blocks", numBlocks);
    });
};
