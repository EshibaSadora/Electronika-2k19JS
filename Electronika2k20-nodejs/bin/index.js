var vars = require('./vars');


module.exports = {
    build_body : function () {

        var fs = require('fs');
        var data = fs.readFileSync(vars.path +"/html/index.html", 'utf8');

        return data;
    }
}