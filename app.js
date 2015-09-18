var jsonfile = require('jsonfile'),
    path = require('path'),
    util = require('util');

var conf = jsonfile.readFileSync(path.resolve(process.env["NI_TARGET"], process.env["NI_CONF"])),
    target = require('./lib/target')(conf),
    repos = target.discover();

target.build(repos, function(output) {
    target.scan(repos, function(scan) {
        var parsed = target.parse(scan);
        console.log(util.inspect(parsed, {
            showHidden: false,
            depth: null
        }));
        jsonfile.writeFileSync(path.resolve(process.env["NI_TARGET"], conf.output), parsed);
    });
});
