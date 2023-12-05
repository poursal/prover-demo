const mixGaugeSetting = 420;
let maxGaugeSetting = mixGaugeSetting;
const requestsPerSecondGauge = echarts.init(document.getElementById('requestsPerSecondGauge'));
requestsPerSecondGauge.setOption({
    series: [
        {
            type: 'gauge',
            max: mixGaugeSetting,
            progress: {
                show: true,
                width: 18
            },
            axisLine: {
                lineStyle: {
                    width: 18
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                length: 15,
                lineStyle: {
                    width: 2,
                    color: '#999'
                }
            },
            axisLabel: {
                distance: 25,
                color: '#999',
                fontSize: 15
            },
            anchor: {
                show: true,
                showAbove: true,
                size: 25,
                itemStyle: {
                    borderWidth: 10
                }
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                fontSize: 60,
                offsetCenter: [0, '75%']
            },
            data: [
                {
                    value: 0
                }
            ]
        }
    ]
});

function updateRequestsPerSecondGauge(rps) {
    maxGaugeSetting = Math.max(maxGaugeSetting, rps - rps%10 + 20);

    requestsPerSecondGauge.setOption({
        series: [
            {
                max: maxGaugeSetting,
                data: [
                    {
                        value: rps
                    }
                ]
            }
        ]
    });
}
