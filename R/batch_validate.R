batch_validate <- function(header, ...){
    gpx_files <- list(...) 
    num_files <- length(gpx_files)
    validate_response <- c()
    error_log<-c()
    df_list <- list()
    i <- 1
    for (item in gpx_files){
       name <- paste('gpx:',i,sep='')
        tryCatch({
            df_list[[name]] <- gpx_df_construct(gpxfile)
            validate_response[i] <- "Success"
            error_log[i] <- "none"
            }, error = function(e){
                validate_response[i] <- "Error"
                error_log[i] <- e
                df_list[[name]] <- NULL
            }, finally = {
                #nothing

        })
        i <- i + 1
    }
    return (RJSONIO::toJSON(df_list))
  }
