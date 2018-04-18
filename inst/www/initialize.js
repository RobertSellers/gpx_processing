function loadLibraries(){
    function getScripts(scripts, callback) {
        var progress = 0;
        scripts.forEach(function(script) { 
            $.getScript(script, function () {
                if (++progress == scripts.length) callback();
            }); 
        });
    }
    getScripts(
        [
        "scripts/opencpu-0.4.js", 
        "scripts/jqueryui/jquery-ui-1.10.3.custom.js",
        "scripts/knockout-min.js",
        "scripts/leaflet.js",
        "scripts/gpx.js",
        "scripts/jquery.dataTables.min.js",
        "scripts/dataTables.buttons.min.js",
        "scripts/dataTables.flash.min.js",
        "scripts/pdfmake.min.js",
        "scripts/vfs_font.js",
        "scripts/buttons.html5.min.js",
        "scripts/buttons.print.min.js",
        "https://code.highcharts.com/highcharts.js",
        "https://code.highcharts.com/modules/series-label.js",
        "https://code.highcharts.com/modules/exporting.js",
        "https://code.highcharts.com/modules/export-data.js"
        ], function () {
            callback();  
    });
}