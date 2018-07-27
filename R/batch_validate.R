batch_validate <- function(header, ...){
    gpx_files <- list(...) 
    num_files <- length(gpx_files)
    response <- data.frame(
        error=character(num_files),
        validate_response=character(num_files),
        stringsAsFactors = FALSE
    )
    for (i in 1:num_files){
        tryCatch({
            data <- plotKML::readGPX(
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
            response$validate_response[i] <- "Error"
            response$error[i] <- e
        })
    }
    return (response)
  }