module.exports = {
    debug : function (modulename,msg) {
        console.log(getdate() + " ["+FgMagenta+"DEBUG:"+Reset+modulename+"] " + " : "  + msg);
    },

    log : function (modulename,msg) {
        console.log(getdate() + " ["+FgBlue+"LOG:"+Reset+modulename+"] " + " : "  + msg);
    },

    err : function (modulename,msg) {
        console.log(getdate() + " ["+BgRed+"ERROR"+Reset+':'+modulename+"] " + " : "  + msg);
    },

    ok : function (modulename,msg) {
        console.log(getdate() + " ["+BgGreen+"OK"+Reset+ ":" + modulename+"] " + " : "  + msg);
    }
}

function getdate() {
    //22.01.2020 00:00
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    return (curr_date + "." + curr_month + "." + curr_year + " " + curr_hour+":"+curr_min);
}


Reset = "\x1b[0m"
FgCyan = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"