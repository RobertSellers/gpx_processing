gpx_validation <- function(mipfile, ...){
  if(substring(tolower(mipfile), nchar(mipfile)-3) != ".gpx"){
    stop('Uploaded data needs to be .zip file. ');
  }else{
    fname = unzip(mipfile, list=TRUE)$Name
    mhp_filename = fname[grep(".mhp", fname)]
    if(identical(mhp_filename, character(0))){
      stop('Zip file does not contain .mhp file');
    }
  }
}
