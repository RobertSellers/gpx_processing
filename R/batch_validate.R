batch_validate <- function(header, ...){
    gpx_files <- list(...) 
    num_files <- length(gpx_files)
    response <- data.frame(
        error=character(num_files),
        validate_response=character(num_files),
        stringsAsFactors = FALSE
    )
for (item in gpx_files){
    test<-plotKML::readGPX(
        item, 
        metadata = TRUE, 
        bounds = TRUE, 
        waypoints = TRUE, 
        tracks = TRUE, 
        routes = TRUE
    )
}
    
    return (test)
  }