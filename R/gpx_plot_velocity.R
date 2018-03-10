gpx_plot_velocity <- function(gpxfile){

  if(substring(tolower(gpxfile), nchar(gpxfile)-3) != ".zip"){
    stop('Uploaded data needs to be a .zip file. ');
  }

  tryCatch({

    plot_title = substr(basename(gpxfile),0,nchar(basename(gpxfile))-8)
    p1<-ggplot(data, aes(x = data$"Depth (ft)")) +
      geom_line(aes(y = data$"Hydrostatic Pressure (psi)", color = "Hydrostatic Pressure"), linetype = "longdash") +
      geom_line(aes(y = data$"HPT Press. Avg (psi)", color="HPT Press. Avg (psi)")) +
      geom_line(aes(y = data$"Corr HPT Press (psi)", color = "Corrected Pressure")) +
      scale_color_manual(values = c("red","lightblue","black","blue" )) +
      scale_y_continuous(breaks=seq(0,max(data$"HPT Press. Avg (psi)",na.rm=TRUE),10)) +
      scale_x_continuous(breaks=seq(0,max(data$"Depth (ft)",na.rm=TRUE),10)) +
      ggtitle(basename(gsub('.{4}$', '', gpxfile))) +
      xlab("Depth (ft)") +
      ylab("Pressure (psi)") +
      coord_flip()  +
      scale_x_reverse() +
      theme(legend.position="left")+
      geom_vline(aes(xintercept = water_level), linetype = "dashed", colour="blue",show.legend=FALSE)+
      geom_text(aes(x=water_level, label="\nDepth  to  Water  (ft)", y=10), colour="blue", angle=0, text=element_text(size=13))

      p2<-ggplot(data, aes(x = data$"Depth (ft)")) +
        geom_line(aes(y=data$"Est K (cm/sec)", color = "orange"),linetype = "longdash") +
        scale_y_continuous(breaks=seq(0,max(data$"Est K (cm/sec)",na.rm=TRUE),0.002)) +
        scale_x_continuous(breaks=seq(0,max(data$"Depth (ft)",na.rm=TRUE),10)) +
        ggtitle("Est K") +
        xlab("Depth (ft)") +
        ylab("Est K (cm/sec)") +
        coord_flip()  +
        scale_x_reverse() +
        theme(legend.position="none")

      plot_grid(p1, p2, align = "h", ncol = 2, rel_widths = c(1/2, 1/2))

  }, error = function(e){
      stop(e);
  })
}