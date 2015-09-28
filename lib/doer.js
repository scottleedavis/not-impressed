var _ = require('lodash'),
    payload = require('./payload'),
    defaults = require('./defaults'),
    pubsub = require('node-internal-pubsub'),
    exec = require('child_process').exec;

var channel = defaults.channel,
    step_channel = defaults.channel + "_step",
    config = defaults.config;

var group_keys = [];
var final_output = [];


function determinePattern(dir, pattern) {
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
    _.each(groups, function(s, group) {
        var steps = steplist(s);
        count += _.keys(steps).length;
    });
    return count;
}

function runlist() {
    var runs = _.omit(config, "Report");
    runs = _.omit(runs, "output");
    runs = _.omit(runs, "targets");
    return runs;
}

function steplist(s) {
    var steps = _.omit(s, "debug");
    return steps;
}

function createPayload(target, command) {
    return payload.cmd
        .replace("{{target}}", target)
        .replace("{{spec}}", command);
}

function publishStep(target, cmd, debug) {
    var command = createPayload(target, cmd);
    if (debug)
        console.log(command);
    var ps = pubsub.createPublisher();
    exec(command, function(error, stdout, stderr) {
        if (debug) {
            console.log(stdout);
        }
        ps.publish(step_channel, [target, cmd, stdout, stderr]);
    });
}


function run(target) {
    var groups = runlist();
    group_keys = _.keys(groups);
    var curGroup = group_keys.shift();
    step(target, groups[curGroup]);
}

function step(target, steps) {
    waitStep(target, steps, function(output) {
        _.each(output, function(o) {
            final_output.push(o);
        });
        var curGroup = group_keys.shift();
        if (curGroup) {
            var groups = runlist();
            step(target, groups[curGroup]);
        } else {
            var ps = pubsub.createPublisher();
            _.each(final_output, function(o) {
                ps.publish(channel, o);
            });
        }
    });
}

function waitStep(target, p, callback) {

    var steps = steplist(p);
    var step_keys = _.keys(steps);
    var ps = pubsub.createSubscriber();
    var ctr = 0;
    var output = [];
    ps.subscribe(step_channel);
    ps.on('message', function(channel, message) {
        switch (channel) {
            case step_channel:
                ctr++;
                output.push(message);
                if (ctr === step_keys.length)
                    callback(output);
                break;
        }
    });

    _.each(steps, function(val, key) {
        if ('pattern' in val && 'command' in val) {
            examine(target, val, function(cmd) {
                publishStep(target, cmd, p.debug);
            })
        } else if ('command' in val) {
            publishStep(target, val.command, p.debug);
        }
    });

}


function setConf(c) {
    _.each(c, function(val, key) {
        config[key] = val;
    });
}

module.exports = {
    setConf: setConf,
    actionCount: actionCount,
    run: run
}