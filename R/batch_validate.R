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