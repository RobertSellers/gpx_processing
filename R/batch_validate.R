batch_validate <- function(header, ...){
    gpx_files <- list(...) 
    num_files <- length(gpx_files)
    response <- data.frame(
        error=character(num_files),
        validate_response=character(num_files),
        stringsAsFactors = FALSE
    )
    stop(cat(gpx_files[i][0]))
    test <- "NONE"
    for (i in 1:num_files){
        tryCatch({
            test <- TRUE
            plotKML::readGPX(
                gpx_files[i][0], 
                metadata = TRUE, 
                bounds = TRUE, 
                waypoints = TRUE, 
                tracks = TRUE, 
                routes = TRUE
            )
            response$validate_response[i] <- "Success"
            response$error[i] <- "none"
        }, error = function(e){
            test <- FALSE
            response$validate_response[i] <- "Error"
            response$error[i] <- e
        })
    }
    return (gpx_files[1])
  }