var vars = require('./vars');
var index = require('./index');
var logger =  require('./logger');
var ElectronikaCore  = require('./ElectronikaCore');

vars.Init();
ElectronikaCore.BuildCore();

vars.app.get("/", vars.urlencodedParser, function (request, response) {
    response.send(index.build_body());
});

vars.app.listen(vars.serverport, function () {
    logger.ok("core","Project Start! listening on port:" + vars.serverport);
});
