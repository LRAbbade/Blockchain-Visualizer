var reqGraphs = document.querySelector('#reqTimeSeries');

// TODO:
// request number of requests over time from mongo and plot
$.get("http://localhost:5000/statisticsJson", (data, status) => {
    Plotly.plot(reqGraphs, [data.numRequests], {
        margin: { t: 0 }
    });
})

// TODO:
// Mongo aggregate group by platform and browser
var trace1 = {
    x: ['Windows', 'Mac', 'Linux'],
    y: [20, 14, 23],
    name: "Platform",
    type: 'bar'
};

var trace2 = {
    x: ['Chrome', 'Firefox', 'Safari'],
    y: [50, 15, 30],
    name: "Browser",
    type: 'bar'
};

var data = [trace1, trace2];

var layout = {
    grid: { rows: 1, columns: 2, pattern: 'independent' },
};

Plotly.newPlot('platformDetails', data, layout);
