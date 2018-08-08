#percent conversion
percent <- function(x, digits = 2, format = "f", ...) {
  paste0(formatC(100 * x, format = format, digits = digits, ...), "%")
}

the.classif.err.rate <- function(df, predicted, actual="TARGET"){
   #obtaining the confusion matrix
      conf.mat <- the.conf.matrix(df, predicted)
   # Assigning TP, FN, FP and TN using the confusion matrix
      TN <- conf.mat[1,1]
      FN <- conf.mat[1,2]
      FP <- conf.mat[2,1]
      TP <- conf.mat[2,2]
   #computing the classification error rate
      myclasserrate <- (FP + FN) / (TP + FP + TN + FN)
      return(as.numeric(myclasserrate))
}

the.conf.matrix <- function(df, predicted, actual="TARGET"){
   conf.mat <- table(df[,predicted], df[,actual])
#   conf.mat <- as.matrix(table(df[,predicted], df[,actual]))
   return(conf.mat)
}