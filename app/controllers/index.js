const request = require('request');
const UserInfo = require('../models/userInfo');
// const endpoint = 'http://localhost:6653';
const endpoint = 'http://35.237.108.201:6653'

function getReqDetails(req) {
    function getReqDetail(headers, regex) {
        try {
            return headers.match(regex)[1].trim();
        } catch (err) {
            console.log(`error getting information from headers: ${headers}`);
            return "";
        }
    }

    const reqUserAgent = req.headers['user-agent'];

    return {
        ip: req.ip,
        userAgent: reqUserAgent,
        platform: getReqDetail(reqUserAgent, /\(([^;]+);/i),
        platformDetails: getReqDetail(reqUserAgent, /\([^;]+;([^)]+)\)/i),
        browser: getReqDetail(reqUserAgent, /(\w+)\/[0-9.]+$/i),
        timestamp: new Date()
    }
}

function insertStatisticsInMongo(reqDetails) {
    new UserInfo(reqDetails).save((err, userInfo) => {
        // console.log(`new userInfo created: ${JSON.stringify(userInfo)}`);        // for debugging
    });
}

module.exports.renderIndex = function (application, req, res, order, numBlocks) {
    insertStatisticsInMongo(getReqDetails(req));

    request(`${endpoint}/${order}/${numBlocks}`, (err, resp, body) => {
        body = JSON.parse(body);
        res.render("index", {
            blocks: body['blocks'],
            order: order,
            numBlocks: numBlocks
        });
    });
};

module.exports.renderStatistics = function (application, req, res) {
    insertStatisticsInMongo(getReqDetails(req));
    res.render("statistics");
};

module.exports.renderProfile = function (application, req, res) {
    res.render("profile");
};

function getDateRange(start, finish) {
    var r = [];
    var aux = start;

    function getNextDay() {
        r.push(new Date(aux.getFullYear(), aux.getMonth(), aux.getDate()));
        aux.setDate(aux.getDate() + 1);
    }

    while (aux < finish) {
        getNextDay();
    }
    getNextDay();
    getNextDay();
    return r;
}

function formatAsTimeSeries(aggregationResult) {
    var x = [];
    var y = [];

    aggregationResult.forEach(document => {
        x.push(document['_id']);
        y.push(document['count']);
    });

    return {x, y};
}

module.exports.getStatistics = function (application, req, response) {
    function getDateEdge(oldest, call) {
        UserInfo.aggregate([{
            $project: {
                timestamp: 1,
                _id: 0
            }
        }, {
            $sort: {
                timestamp: oldest ? 1 : -1
            }
        }, {
            $limit: 1
        }
        ]).then(res => {
            const day = res[0]["timestamp"];
            call(new Date(day.getFullYear(), day.getMonth(), day.getDate()));
        }).catch(err => {
            console.log(`getDateEdge error: ${err}`);
            call(new Date());
        });
    }

    getDateEdge(true, oldestDay => {
        getDateEdge(false, newestDay => {
            UserInfo.aggregate([{
                $bucket: {
                    groupBy: "$timestamp",
                    boundaries: getDateRange(oldestDay, newestDay),
                    default: "Other",
                    output: {
                        "count": {$sum: 1}
                    }
                }
            }
            ]).then(numRequestsRes => {
                UserInfo.aggregate([{
                    $group: {
                        _id: "$platform",
                        count: {$sum: 1}
                    }
                }
                ]).then(platformRes => {
                    UserInfo.aggregate([{
                        $group: {
                            _id: "$browser",
                            count: {$sum: 1}
                        }
                    }
                    ]).then(browserRes => {
                        response.send({
                            numRequests: formatAsTimeSeries(numRequestsRes),
                            statistics: {
                                platform: formatAsTimeSeries(platformRes),
                                browser: formatAsTimeSeries(browserRes)
                            }
                        });
                    }).catch(browserErr => {
                        console.log(`browser group err: ${browserErr}`);
                    });
                }).catch(platformErr => {
                    console.log(`platform group err: ${platformErr}`);
                });
            }).catch(numReqErr => {
                console.log(`bucket aggregation err: ${numReqErr}`);
            });
        });
    });
}
