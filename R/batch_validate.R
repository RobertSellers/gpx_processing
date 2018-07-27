batch_validate <- function(header, ...){
    gpx_files <- list(...) 
    num_files <- length(gpx_files)
    response <- data.frame(
        error=character(),
        validate_response=character(),
        stringsAsFactors = FALSE
    )
    test <- "NONE"
    for (i in 1:num_files){
        tryCatch({
            test <- TRUE
            plotKML::readGPX(
                gpx_files[i], 
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
    return (response,i)
  }