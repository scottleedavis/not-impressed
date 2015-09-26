var _ = require('lodash'),
    payload = require('./payload'),
    default_conf = require('./defaults'),
    pubsub = require('node-internal-pubsub'),
    exec = require('child_process').exec;

var channel = default_conf.channel,
    build_config = default_conf.build;


function determinePattern(dir) {
    var bt = _.find(build_config, function(val, key) {
        return dir.indexOf(val["pattern"]) > -1;
    });
    return bt ? bt.command : default_conf.seperator;
}

function examine(target, callback) {
    exec(default_conf.dir + target, function(error, stdout, stderr) {
        // var cmd = payload.cmd
        //     .replace("{{target}}", target)
        //     .replace("{{spec}}", determinePattern(stdout));
        // callback(cmd);
        callback(determinePattern(stdout));
    });
}

function run(target) {
    examine(target, function(cmd) {
        if (build_config.debug)
            console.log(cmd);
        // var ps = pubsub.createPublisher();
        // exec(cmd, function(error, stdout, stderr) {
        //     ps.publish(channel, [stdout, stderr]);
        // });
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
        return run(target);
    }
}