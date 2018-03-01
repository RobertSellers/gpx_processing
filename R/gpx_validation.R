gpx_validation <- function(gpxfile, ...){
  if(substring(tolower(gpxfile), nchar(gpxfile)-3) != ".gpx"){
    stop('Uploaded data needs to be .zip file. ');
  }
}
