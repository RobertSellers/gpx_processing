function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100),
    seconds = parseInt((duration/1000)%60),
    minutes = parseInt((duration/(1000*60))%60),
    hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

Object.prototype.hasOwnProperty = function(property) {
    return this[property] !== undefined;
};

function dateTimeOutputString(x){
    var y = 60;
    var z = y % x;
    return Math.round(x/y) + ":" + z;
}

function setAll(obj, val) {
    Object.keys(obj).forEach(function(k) {
        obj[k] = val
    });
}

function setNull(obj) {
    setAll(obj, null);
}