gpx_validation <- function(gpxfile, ...){
  if(substring(tolower(gpxfile), nchar(gpxfile)-3) != ".gpx"){
    stop('Uploaded data needs to be .zip file. ');
  }else{
    options(stringsAsFactors = FALSE)
    require(plotKML)
    tryCatch({
      data <- readGPX(gpxfile, metadata = TRUE, bounds = TRUE, 
                    waypoints = TRUE, tracks = TRUE, routes = TRUE)
    }, error = function(e){
      stop(cat(paste("GPX loading error", e)))
    }, finally = {
      return (data)
    })
  }
}
