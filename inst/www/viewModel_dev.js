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

    highchartOptions : ko.computed(function(){

        var elevationColor = "#76a912"
        var speedColor = "red"
        var gradientColor = "blue"
        
        //custom overrides
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
					// color: '#F00',
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
						// color: '#F00',
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
                tickPosition: 'outside',
                minorTickLength: 2,
                minorTickWidth: 0.5,
                minorTickColor: '#cccccc',
                minorTickPosition: 'outside',
                minorGridLineWidth: 0.5,
                minorGridLineColor: '#333333',
                // minRange: 1,
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
                minRange: -1,
                maxRange: 1,
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
                showInLegend: false,
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
                negativeColor: '#ff0000',
                dashStyle: 'Solid',
                threshold: 5.5, 
                tooltip: {
                    valueSuffix: ' mph' //based on https://academic.oup.com/ageing/article-pdf/26/1/15/78378/26-1-15.pdf
                }
            },
            {
                name: "Gradient",
                color: gradientColor,
                yAxis: 2,
                negativeColor: 'purple',
                threshold: 0,
                lineWidth: 0.7,
                data: [null, null],
                // dashStyle: 'shortdot',
                dashStyle: 'Solid',
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