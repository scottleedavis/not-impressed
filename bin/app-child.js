var jsonfile = require('jsonfile'),
    path = require('path'),
    defaults = require('../lib/defaults'),
    util = require('util');

function fun(conf, callback) {
    var target = require('../lib/target')(conf),
        repos = target.discover();

    target.run(repos, function(output) {
        var parsed = target.parse(output);
        callback(parsed);
    });

}

module.exports = {
    run: fun
}
