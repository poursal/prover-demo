const requestTimeGraph = echarts.init(document.getElementById('requestTimeGraph'));
requestTimeGraph.setOption({
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value',
        name: 'Duration in millis'
    },
    series: [
        {
            data: [],
            type: 'line',
        }
    ]
});

function updateRequestTimeGraph(requestTimeInMillisData, requestTimeInMillisSeries) {

    requestTimeGraph.setOption({
        xAxis: {
            data: requestTimeInMillisData
        },
        series: [
            {
                data: requestTimeInMillisSeries
            }
        ]
    });
}
