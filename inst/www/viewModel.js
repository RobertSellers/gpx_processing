var vm = {
    session_tmp: ko.observable(),
    gpxFileName: ko.observable(),
    gpxFileNameArray: ko.observableArray(),
    gpxFileArray: ko.observableArray(),
    leafletMap: ko.observable(),
    leafletMinimap: ko.observable(),
    rDataOutput: ko.observable(),
    warningHtml: ko.observable(),
    rDataOutputArray: ko.observableArray(),
    highchart: ko.observable(),
    get_pace_imp: ko.observable(),
    get_duration: ko.observable(),
    get_distance_imp: ko.observable(),
    get_moving_pace_imp: ko.observable(),
    get_elevation_gain_imp: ko.observable(),
    get_elevation_loss_imp: ko.observable(),
    selectedIndex:ko.observable(),
    classArray: ko.observableArray(),
    elevation_net: ko.observable(),
    counter : ko.observable(0),
    downloadAll : function() {
        var data = this.rDataOutput();
        var filename = this.gpxFileName().slice(0, -4);
        var exportData = new CSVExport(data, filename);
        return exportData
    },
    updateClass: function(val) {
        // debugger
    },
    downloadCSV : function() {
        var data = this.rDataOutput();
        var filename = this.gpxFileName().slice(0, -4);
        var exportData = new CSVExport(data, filename);
        return exportData
    },
    highcharts_override: function(){
        // Override the legend symbol creator function
        Highcharts.wrap(Highcharts.Series.prototype, 'drawLegendSymbol', function (proceed, legend) {
            proceed.call(this, legend);

            this.legendLine.attr({
                d: ['M', 0, 10, 'L', 5, 5, 8, 10]
            });
            this.negativeLine = this.chart.renderer.path(
                    ['M', 8, 10, 'L', 11, 15, 16, 10]
                ).attr({
                    stroke: this.options.negativeColor,
                    'stroke-width': this.options.lineWidth
                })
                .add(this.legendGroup);
        });
    },
    highchartOptions : ko.computed(function(){

        var elevationColor = "#76a912"
        var speedColor = "black"
        var gradientColor = "orange"
        
        //custom overrides
        this.highcharts_override();

        return {
            chart: {
                zoomType: 'x',
                polar: false,
				fontFamily: 'monospace',
                color: "#f00",
                borderRadius: 5,
                borderColor: '#aaa',
                borderWidth: 2,

				renderTo: 'container'
            },
            title: {
                text:'GPX Not Loaded',
				style: {
					color: '#F00',
					font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
				}
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        minute: '%H:%M'
                    },
					style: {
						color: '#F00',
						font: '11px Trebuchet MS, Verdana, sans-serif'
					}	
                },
				gridLineWidth: 1,
				lineColor: '#000',
				tickColor: '#000',
                crosshair: true,
                title: {
                    x:15,
                    text: 'Time (hh:mm)',
					style: {
						color: 'black',
						fontWeight: 'bold',
						fontSize: '12px',
						fontFamily: 'Trebuchet MS, Verdana, sans-serif'
					}        
                }
            },
            yAxis: [{ //primary yAxis
                minorTickInterval: 'auto',
                // lineColor: '#000',
				// lineWidth: 1,
				// tickWidth: 1,
				// tickColor: '#000',
                // gridLineWidth: 0,

				lineColor: '#CCCCCC',
				lineWidth: 0.5,
                tickWidth: 0.5,
                tickLength: 5,
				tickColor: '#FFFFFF',
                gridLineWidth: 0.5,
                gridLineColor: '#444444',
                // alternateGridColor: 'rgba(0, 0, 0, .2)',
                tickPosition: 'inside',
                minorTickLength: 2,
                minorTickWidth: 0.5,
                minorTickColor: '#cccccc',
                minorTickPosition: 'outside',
                minorGridLineWidth: 0.5,
                minorGridLineColor: '#333333',
                minRange: 1,
                min: 0,
                title: {
                    text: 'Speed (mph)',
                    style: {
                        color: speedColor,
						fontWeight: 'bold',
						fontSize: '12px',
						fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: speedColor,
						font: '11px Trebuchet MS, Verdana, sans-serif'
                    }
                },
                opposite: true
            }, { // Secondary yAxis
                labels: {
                    format: "{value}",
                    style: {
                        color: elevationColor
                    }
                },
                min: 0,
                title: {
                    text: 'Elevation (feet ASL)',
                    style: {
                        color: elevationColor
                    }
                }
            }, { // Tertiary yAxis
                title: {
                    text: 'Gradient',
                    style: {
                        color: gradientColor
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: gradientColor
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true,
                formatter: function () {
                    return '<b>Time: </b>'+ Highcharts.dateFormat('%H:%M:%S',new Date(this.points[0].x)) + '<br/>'+
                    '<b>Elevation: </b>'+ Math.round(this.y * 100) / 100 + " feet"+'<br/>'+
                    '<b>Gradient: </b>'+  this.points[2].y.toFixed(4) +'<br/>'+
                    '<b>Speed: </b>'+ this.points[1].y.toFixed(2) + " mph";
                }
            },
            plotOptions: {
                series: {
                    marker: {
                        radius: 2
                    },
                    // lineWidth: 1,
                    turboThreshold: 0, //largest series tested is 8012
                    label: {
                        connectorAllowed: false
                    },
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    fillColor: {
                        linearGradient: [0, 0, 0, 300],
                        stops: [
                            [0, Highcharts.getOptions().colors[2]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get('rgba')]
                        ]
                    },
                    cursor: "pointer",
                    events: {
                        click: function(event) {
                            //do nothing
                        }
                    }
                },
            },
            series: [
            {
                name: "Elevation",
                color: elevationColor,
                lineWidth: 1,
                yAxis: 1,
                data: [null, null],
                type: "areaspline",
                tooltip: {
                    valueSuffix: "'"
                }
            }, {
                name: "Speed",
                color: speedColor,
                data: [null, null],
                lineWidth: 0.7,
                type: "spline",
                negativeColor: '#8b0000',
                dashStyle: 'Solid',
                threshold: 5.5, 
                //based on https://watermark.silverchair.com/26-1-15.pdf?token=AQECAHi208BE49Ooan9kkhW_Ercy7Dm3ZL_9Cf3qfKAc485ysgAAAacwggGjBgkqhkiG9w0BBwagggGUMIIBkAIBADCCAYkGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMQJi5w9oAQsXJTMwVAgEQgIIBWqLrGlLTnKTanIvWyA6b3rt8WiRFq8ODZV7flx14OuUxrktqcdM5szRTOkc7nQOt2M-fbTwtg97ieq-JTUwnZO3VGwjwbtEpPeT9R6youn7fRTK2Jfnpbsk2k7Q7yAK7ceAJZEdg4VUyAQQ0y5c13p5-Ox1JJWdz8Y41Acga_wqJ8fczuEQIDlTQDY4xrkxJ4vDDDw16ggyCMB8KyJZt4DuhxDAztVlA_jtlrH-vcBrJHeDQY3X7fNfc-GRDCIACnVBsFvwHQIJM4NKc-AFW_lBS4TIZYDUdGrct6xdw074GqdqtFPpg2S1sU6nzbsdGXQC4ytjAPA4WWrbFswVgRuvBbqlp43KlSaZ9YRRF1q5kTgi_ZMwA7GZrf-SMfHH_hnACqHdf2mEIQJg3gv0P3sa4YAzhaJ0zIDwCzFEC_ykURtEkNJjLMJOOrHsVj0bzCIDBumNIFvz9emA
                tooltip: {
                    valueSuffix: ' mph'
                }
            },
            {
                name: "Gradient",
                color: gradientColor,
                yAxis: 2,
                negativeColor: 'blue',
                threshold: 0,
                lineWidth: 0.7,
                data: [null, null],
                dashStyle: 'shortdot',
                // type: "spline",
                step: 'left',
                tooltip: {
                    valuePrefix: "∇"
                }
            }
            ],
            credits: {
                enabled: false
            },
            legend: {
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'bottom',
                x: -5,
                y: 12,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    }
                }]
            }
        };
    })
}