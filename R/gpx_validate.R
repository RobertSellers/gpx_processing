gpx_validate <- function(gpxfile, ...){

    response <- data.frame(
        error=character(1),
        validate_response=character(1),
        stringsAsFactors = FALSE
    )

    if(substring(tolower(gpxfile), nchar(gpxfile) - 3) != ".gpx"){
        response$error <- "Improper Data Format"
        response$validate_response <- "Error"
    }else{
        tryCatch({
            data <- plotKML::readGPX(
                gpxfile, 
                metadata = TRUE, 
                bounds = TRUE, 
                waypoints = TRUE, 
                tracks = TRUE, 
                routes = TRUE
            )
        }, error = function(e){
            response$validate_response <- "Error"
            response$error <- e
        }, finally = {
            response$validate_response <- "Success"
            response$error <- "none"
        })
    }
    return (response)
  }