var _ = require('lodash'),
    payload = require('./payload'),
    defaults = require('./defaults'),
    pubsub = require('node-internal-pubsub'),
    exec = require('child_process').exec;

var channel = defaults.channel,
    config = defaults.config;


function determinePattern(dir,pattern) {
    return dir.indexOf(pattern) > -1;
}

function examine(target, p, callback) {
    exec(defaults.dir + target, function(error, stdout, stderr) {
        determinePattern(stdout, p.pattern) ? callback(p.command) : callback("");
    });
}

function actionCount() {
    var count = 0;
    var groups = runlist();
    _.each(groups, function(s, group){
        var steps = steplist(s);
        count += _.keys(steps).length;
    });
    return count;
}

function runlist() {
    var runs = _.omit(config,"Report");
    runs = _.omit(runs,"output");
    runs = _.omit(runs,"targets");
    return runs;
}

function steplist(s) {
    var steps = _.omit(s, "debug");
    return steps;
}

function createPayload(target,command) {
    return payload.cmd
        .replace("{{target}}", target)
        .replace("{{spec}}", command);
}

function publishRun(target,cmd,debug) {
    var command = createPayload(target,cmd);
    if (debug)
        console.log(command);
    var ps = pubsub.createPublisher();
    exec(command, function(error, stdout, stderr) {
        if(debug){
            console.log(stdout);
        }
        ps.publish(channel, [target, cmd, stdout, stderr]);
    });
}

function run(target) {
    var groups = runlist();
    _.each(groups, function(s, group){
        var steps = steplist(s);
        _.each(steps, function(val,key){
            if( 'pattern' in val && 'command' in val ) {
                examine(target, val, function(cmd) {
                    publishRun(target,cmd,s.debug);
                })
            } else if ( 'command' in val ) {
                publishRun(target,val.command,s.debug);
            }
        })
    })
}

function waitRun(p, callback) {
    var ps = pubsub.createSubscriber();
    var ctr = 0;
    var output = [];
    ps.subscribe(channel);
    ps.on('message', function(channel, message) {
        switch (channel) {
            case channel:
                ctr++;
                output.push(message);
                if (ctr === p.length)
                    callback(output);
                break;
        }
    });

    run(p);

}


function setConf(c) {
    _.each(c, function(val, key) {
        config[key] = val;
    });
}

module.exports = {
    setConf: function(conf) {
        setConf(conf);
    },
    actionCount: actionCount,
    run: run
}