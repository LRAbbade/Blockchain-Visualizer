const request = require('request');
const endpoint = 'http://35.237.108.201:6653';

module.exports.renderIndex = function (application, req, res) {
    request(`${endpoint}/lastBlocks`, (err, resp, body) => {
        body = JSON.parse(body);
        res.render("index", {
            blocks: body['blocks']
        });
    });
};
