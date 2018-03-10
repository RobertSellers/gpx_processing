require(plotKML)


test_gpx<-'C:/Users/rober/Desktop/gpx_processing/data_backup/14-05.gpx'
data_test<-readGPX(test_gpx, metadata = TRUE, bounds = TRUE, 
                   waypoints = TRUE, tracks = TRUE, routes = TRUE)
