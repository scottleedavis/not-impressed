var _ = require('lodash'),
  discovery = require('./discovery'),
  default_conf = require('./defaults'),
  pubsub = require('node-internal-pubsub'),
  doer = require('./doer'),
  parser = require('./parse');

var conf = default_conf.target,
  build_channel = "builds",
  scan_channel = "scans",
  channel = default_conf.channel;

function run(projects) {
  _.each(projects, function(p) {
    doer.run(p);
  });
}

function parse(input) {
  parser.setConf(conf);
  return parser.run(input);
}

function discover() {
  var info = [];
  if (conf.targets) {
    _.each(conf.targets, function(t) {
      info.push(discovery.scan(t));
    });
  } else {
    info.push(discovery.scan([]));
  }
  return _.flatten(info);
}

function waitRun(p, callback) {

  doer.setConf(conf);
  var message_count = doer.actionCount();

  var ps = pubsub.createSubscriber();
  var ctr = 0;
  var output = [];
  ps.subscribe(channel);
  ps.on('message', function(channel, message) {
    switch (channel) {
      case channel:
        ctr++;
        output.push(message);
        if (ctr === message_count) {
          callback(_.filter(output, function(o) {
            return o[1] !== "";
          }));
        }
        break;
    }
  });

  run(p);
}

module.exports = function(c) {
  conf = c;
  return {
    discover: discover,
    run: waitRun,
    parse: parse
  }
}