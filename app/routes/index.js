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
};
