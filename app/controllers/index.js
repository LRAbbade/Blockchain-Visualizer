const request = require('request');
const endpoint = 'http://localhost:6653';
// const endpoint = 'http://35.237.108.201:6653'

/*module.exports.renderIndex = function (application, req, res, order, numBlocks) {
    request(`${endpoint}/${order}/${numBlocks}`, (err, resp, body) => {
        body = JSON.parse(body);
        res.render("index", {
            blocks: body['blocks'],
            order: order,
            numBlocks: numBlocks
        });
    });
};*/

