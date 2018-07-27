batch_validate <- function(gpx_files, ...){
  
    num_files <- length(gpx_files)

    response <- data.frame(
        error=character(num_files),
        validate_response=character(num_files),
        stringsAsFactors = FALSE
    )
    i <- 1
    for (gpx in gpx_files){
        if(substring(tolower(gpx), nchar(gpx)-3) != ".gpx"){
            response$error[i] <- "Improper Data Format"
            response$validate_response[i] <- "Error"
        }else{
            tryCatch({
                data <- plotKML::readGPX(
                    gpx_files, 
                    metadata = TRUE, 
                    bounds = TRUE, 
                    waypoints = TRUE, 
                    tracks = TRUE, 
                    routes = TRUE
                )
            }, error = function(e){
                response$validate_response[i] <- "Error"
                response$error[i] <- e
            }, finally = {
                response$validate_response[i] <- "Success"
                response$error[i] <- "none"
            })
        }
        i<-i+1
    }
    return (i)
  }