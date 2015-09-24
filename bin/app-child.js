var jsonfile = require('jsonfile'),
    path = require('path'),
    defaults = require('../lib/defaults'),
    util = require('util');

function fun(conf, callback) {
    var target = require('../lib/target')(conf),
        repos = target.discover();

    target.build(repos, function(output) {
        target.scan(repos, function(scan) {
            var parsed = target.parse(scan);
            callback(parsed);
        });
    });
}

module.exports = {
    run: fun
}
