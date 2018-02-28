library(V8)

# Create a new context
ct <- new_context()

ct$assign("mydata", mtcars)
out <- ct$get("mydata")
all.equal(out, mtcars)

# Use a JavaScript library
ct$source("http://underscorejs.org/underscore-min.js")
ct$call("_.filter", mtcars, I("function(x){return x.mpg < 15}"))


ct$eval("JSON.stringify({x:Math.random()})")