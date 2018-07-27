batch_validate <- function(header, ...){
    gpx_files <- list(...) 
    num_files <- length(gpx_files)
    validate_response <- c()
    error_log<-c()
    for (item in gpx_files){
# #
        tryCatch({
            data_test<-plotKML::readGPX(
                item, 
                metadata = TRUE, 
                bounds = TRUE, 
                waypoints = TRUE, 
                tracks = TRUE, 
                routes = TRUE
            )
                validate_response[i] <- "Success"
                error_log[i] <- "none"
            }, error = function(e){
                validate_response[i] <- "Error"
                error_log[i] <- e
            }, finally = {
                #nothing

        })
    }
    
    return (list("response"=validate_response,"error"=error))
  }

  message <- function (..., domain = NULL, appendLF = TRUE) 
    {
        args <- list(...)
        cond <- if (length(args) == 1L && inherits(args[[1L]], "condition")) {
            if (nargs() > 1L) 
                warning("additional arguments ignored in message()")
            args[[1L]]
        }
        else {
            msg <- .makeMessage(..., domain = domain, appendLF = appendLF)
            call <- sys.call()
            simpleMessage(msg, call)
        }
        defaultHandler <- function(c) {
            cat(conditionMessage(c), file = stdout(), sep = "")
        }
        withRestarts({
            signalCondition(cond)
            defaultHandler(cond)
        }, muffleMessage = function() NULL)
        invisible()
    }