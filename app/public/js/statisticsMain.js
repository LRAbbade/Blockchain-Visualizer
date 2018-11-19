var reqGraphs = document.querySelector('#reqTimeSeries');

$.get("http://localhost:5000/statisticsJson", (data, status) => {
    Plotly.plot(reqGraphs, [data.numRequests], {
        margin: { t: 0 }
    });

    var graphData = [
        {
            x: data.statistics.platform.x,
            y: data.statistics.platform.y,
            name: "Platform",
            type: 'bar'
        },
        {
            x: data.statistics.browser.x,
            y: data.statistics.browser.y,
            name: "Browser",
            type: 'bar'
        }
    ];

    var layout = {
        grid: { rows: 1, columns: 2, pattern: 'independent' },
    };

    Plotly.newPlot('platformDetails', graphData, layout);
});
