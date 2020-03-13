var logger =  require('./logger');
var vars = require('./vars');


module.exports = {
    BuildCore : function () {
        var script = "";
        const Folder = vars.path + '/core/';
        const fs = require('fs');

        fs.readdir(Folder, (err, files) => {
            files.forEach(file => {
                script = script + fs.readFileSync(Folder + file, 'utf8');
                logger.log('jscore_loader',"module " + file + " loaded!");
            });

            logger.ok('jscore_loader','Core Loaded!');

            vars.app.get('/electroniks2k19.js', function(req, res) {
                res.send(script);
            });
        });


    }
}


