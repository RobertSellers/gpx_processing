var vm = {
    session_tmp: ko.observable(),
    gpxFileName: ko.observable(),
    gpxFileNameArray: ko.observableArray(['Select File']),
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
    elevation_net: ko.observable(),
    downloadAll : function() {
        var data = this.rDataOutput();
        var filename = this.gpxFileName().slice(0, -4);
        var exportData = new CSVExport(data, filename);
        return exportData
    },
    downloadCSV : function() {
        var data = this.rDataOutput();
        var filename = this.gpxFileName().slice(0, -4);
        var exportData = new CSVExport(data, filename);
        return exportData
    },
    highchartOptions : ko.computed(function(){

        var elevationColor = "#76a912"
        var speedColor = "red"
        var gradientColor = "purple"
    
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
				lineColor: '#000',
				lineWidth: 1,
				tickWidth: 1,
				tickColor: '#000',
                gridLineWidth: 0,
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
                    '<b>Elevation: </b>'+ Math.round(this.y) + " feet"+'<br/>'+
                    '<b>Gradient: </b>'+  this.points[2].y.toFixed(4) +'<br/>'+
                    '<b>Speed: </b>'+ this.points[1].y.toFixed(2) + " m/s";
                }
            },
            plotOptions: {
                series: {
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
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
                type: "spline",
                tooltip: {
                    valueSuffix: ' m/s'
                }
            },
            {
                name: "Gradient",
                color: gradientColor,
                yAxis: 2,
                data: [null, null],
                dashStyle: 'shortdot',
                type: "spline",
                tooltip: {
                    valuePrefix: "∇"
                }
            }
            ],
            credits: {
                enabled: false
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 70,
                y: 40,
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