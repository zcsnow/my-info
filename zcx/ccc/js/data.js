Highcharts.setOptions({
    global: {
        useUTC: false
    }
});
var chart;
$('#container1').highcharts({
    chart: {
        height:360,
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 5,
        events: {
            load: function() {
                var series = this.series[0];
                setInterval(function() {
                    var x = (new Date()).getTime(), // current time
                        y = Math.random();
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },
    title: {
        text: '卖价 买价 差点'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function() {
            return '<b>'+ this.series.name +'</b><br/>'+
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: '期货00001',
        data: (function() {
            //这里是加入数据的地方
            var data = [],
                time = (new Date()).getTime(),
                i;
            for (i = -19; i <= 0; i++) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
            }
            return data;
        })()
    }]
});

//第二个
$('#container2').highcharts({
    chart: {
        height: 360,
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 5,
        events: {
            load: function() {
                var series = this.series[0];
                setInterval(function() {
                    var x = (new Date()).getTime(), // current time
                        y = Math.random();
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },
    title: {
        text: '卖价 买价 差点'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function() {
            return '<b>'+ this.series.name +'</b><br/>'+
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: '期货00002',
        data: (function() {
            //这里是加入数据的地方
            var data = [],
                time = (new Date()).getTime(),
                i;
            for (i = -19; i <= 0; i++) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
            }
            return data;
        })()
    }]
});

//第三个
$('#container3').highcharts({
    chart: {
        height: 360,
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 5,
        events: {
            load: function() {
                var series = this.series[0];
                setInterval(function() {
                    var x = (new Date()).getTime(), // current time
                        y = Math.random();
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },
    title: {
        text: '卖价 买价 差点'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function() {
            return '<b>'+ this.series.name +'</b><br/>'+
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: '期货00003',
        data: (function() {
            //这里是加入数据的地方
            var data = [],
                time = (new Date()).getTime(),
                i;
            for (i = -19; i <= 0; i++) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
            }
            return data;
        })()
    }]
});


//第四个
$('#container4').highcharts({
    chart: {
        height: 360,
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 5,
        events: {
            load: function() {
                var series = this.series[0];
                setInterval(function() {
                    var x = (new Date()).getTime(), // current time
                        y = Math.random();
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },
    title: {
        text: '卖价 买价 差点'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },

    yAxis: {
        title: {
            text: 'Value'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function() {
            return '<b>'+ this.series.name +'</b><br/>'+
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: '期货00004',
        data: (function() {
            //这里是加入数据的地方
            var data = [],
                time = (new Date()).getTime(),
                i;
            for (i = -19; i <= 0; i++) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
            }
            return data;
        })()
    }]
});

$(".highcharts-container").css({
    background:"none"
});
