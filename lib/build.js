var _ = require('lodash'),
    payload = require('./payload'),
    default_conf = require('./defaults'),
    pubsub = require('node-internal-pubsub'),
    exec = require('child_process').exec;

var build_channel = "builds",
    build_config = default_conf.build;


function determineBuildCommand(dir) {
    var bt = _.find(build_config, function(val, key) {
        return dir.indexOf(val["pattern"]) > -1;
    });
    return bt ? bt.command : default_conf.seperator;
}

function ls(target, callback) {
    exec("ls " + target, function(error, stdout, stderr) {
        var cmd = payload.build_cmd
            .replace("{{target}}", target)
            .replace("{{build_spec}}", determineBuildCommand(stdout));
        callback(cmd);
    });
}

function build(target) {
    ls(target, function(cmd) {
        if (build_config.debug)
            console.log(cmd);
        var ps = pubsub.createPublisher();
        exec(cmd, function(error, stdout, stderr) {
            ps.publish(build_channel, [stdout, stderr]);
        });
    });
}


function setConf(conf) {
    _.each(conf.build, function(val, key) {
        build_config[key] = val;
    });
}

module.exports = {
    setConf: function(conf) {
        setConf(conf);
    },
    run: function(target) {
        return build(target);
    }
}