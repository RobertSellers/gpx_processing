function initLeaflet(){
    //////////////////////////////////
    //Prime Leaflet Map
    var map = new L.map('plotdiv')
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data &copy; OpenStreetMap contributors';        var mapLink = '<a href="http://www.esri.com/">Esri</a>';
    var wholink =  'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    
    var esri = new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; ' + mapLink + ', ' + wholink,
        maxZoom: 19});

    map.addLayer(esri);
    map.setView(new L.LatLng(39.8283, -98.5795),3)
    var osm2 = new L.TileLayer(osmUrl, {minZoom: 3, maxZoom: 19, attribution: osmAttrib });
    var miniMap = new L.Control.MiniMap(
        osm2, {
         toggleDisplay: true,
         minimized: true
        });
    vm.leafletMinimap(miniMap);
    vm.leafletMinimap().addTo(map);
    vm.leafletMap(map);
    vm.leafletMinimap()._minimize()
}

function updateLeaflet(){
    //////////////////////////////////
    //Update Leaflet
    vm.leafletMap().eachLayer(function (layer) {
        if (layer.hasOwnProperty('_gpx') || layer.hasOwnProperty('_path') || layer.hasOwnProperty('_latlng')){
            vm.leafletMap().removeLayer(layer);
        }
    });

    var gpx_file = vm.session_tmp() +'files/'+ vm.gpx_file_name(); 
    var gpx_layer = new L.GPX(gpx_file, {async: true})
    .on('loaded', function(e) {
        var gpx = e.target;
        vm.leafletMap().fitBounds(gpx.getBounds());
        vm.gpxjs_vars({
            get_duration: gpx.get_duration_string(gpx.get_moving_time()),
            get_pace: gpx.get_duration_string(gpx.get_moving_pace_imp(), true),
            get_distance_imp: gpx.get_distance_imp().toFixed(2),
            get_elevation_gain: gpx.to_ft(gpx.get_elevation_gain()).toFixed(0),
            get_elevation_loss: gpx.to_ft(gpx.get_elevation_loss()).toFixed(0),
            elevation_net: gpx.to_ft(gpx.get_elevation_gain() - gpx.get_elevation_loss()).toFixed(0)
        });
        
        //update highchart
        vm.highchart().setTitle({text: vm.gpx_file_name()});
        if( vm.highchart().resetZoomButton ) {
            vm.highchart().zoomOut();
        }
        vm.highchart().xAxis[0].setExtremes(null,null)
        vm.highchart().yAxis[1].update({ max: Math.max.apply(Math,vm.rDataOutput().map(function(o){return o.Elevation;})) });
        vm.highchart().yAxis[0].update({ max: Math.max.apply(Math,vm.rDataOutput().map(function(o){return o.Speed;})) });
        vm.highchart().redraw();

        var circleMarkerStyle_start = {
            radius: 6,
            fillColor: "#00ff00",
            color: "#000",
            weight: 2, 
            opacity: 1,
            fillOpacity: 0.8
        };

        var circleMarkerStyle_end = {
            radius: 6,
            fillColor: "#ff0000",
            color: "#000",
            weight: 2, 
            opacity: 1,
            fillOpacity: 0.8
        };

        // start/end markers and popups
        var base = gpx._layers[Object.keys(gpx._layers)[0]];
        if (base.hasOwnProperty('_layers')){
            var base = gpx._layers[Object.keys(gpx._layers)[0]]._layers;
            for (var key in base) {
                var lat_lngs = base[key]._latlngs;
                var nL = lat_lngs.length-1
                var start = [lat_lngs[0].lat, lat_lngs[0].lng]
                var end = [lat_lngs[nL].lat, lat_lngs[nL].lng]
                var start_marker = new L.circleMarker(start, circleMarkerStyle_start)
                start_marker.addTo(vm.leafletMap());
                var end_marker = new L.circleMarker(end, circleMarkerStyle_end)
                end_marker.addTo(vm.leafletMap());
            }
        }else{
            var lat_lngs = base._latlngs;
            var nL = lat_lngs.length-1
            var start = [lat_lngs[0].lat, lat_lngs[0].lng]
            var end = [lat_lngs[nL].lat, lat_lngs[nL].lng]

            //New Circle Makers
            var start_marker = new L.circleMarker(start, circleMarkerStyle_start)
            start_marker.addTo(vm.leafletMap());
            var end_marker = new L.circleMarker(end, circleMarkerStyle_end)
            end_marker.addTo(vm.leafletMap());
        }
    });
    gpx_layer.addTo(vm.leafletMap());
    map_lock('unlock');
}

function map_lock(toggle){
    if (toggle=='unlock'){
        vm.leafletMap()._handlers.forEach(function(handler) {
            handler.enable();
        });
        vm.leafletMinimap()._restore()
    if (vm.leafletMap().tap) vm.leafletMap().tap.enable();
        document.getElementById('plotdiv').style.cursor='grab';
    }if (toggle=='lock'){
        vm.leafletMinimap()._minimize()
        vm.leafletMap()._handlers.forEach(function(handler) {
            handler.disable();
        });
    if (vm.leafletMap().tap) vm.leafletMap().tap.disable();
        document.getElementById('plotdiv').style.cursor='default';
    }
}