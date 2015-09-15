var _ = require('lodash'),
	discovery = require('./discovery'),
	default_conf = require('./defaults'),
	pubsub = require('node-internal-pubsub'),
	scanner = require('./scan'),	
	builder = require('./build');

var conf = default_conf.target;

var build_channel = "builds";
var scan_channel = "scans";


function scan(projects) {
	scanner.setConf(conf);
	_.each(projects, function(p){
		scanner.run(p);
	});
}

function build(projects) {
	builder.setConf(conf);
	_.each(projects, function(p){
		builder.run(p);
	});
}

function discover() {
	var lic_info = [];
	_.each(conf.targets, function(t){
		lic_info.push(discovery.scan(t));
	});
	return _.flatten(lic_info);
}

function waitBuild(p,callback) {
	
	var ps = pubsub.createSubscriber();
  	var ctr = 0;
  	var output = [];
  	ps.subscribe(build_channel);
	ps.on('message', function(channel, message) {
		switch(channel) {
			case build_channel: 
				ctr++;
				output.push(message);
				if( ctr === p.length ) 
					callback(output);
			break;		
		}
	});

	build(p);
}

function waitScan(p,callback) {
	var ps = pubsub.createSubscriber();
  	var ctr = 0;
  	var output = [];
  	ps.subscribe(scan_channel);
	ps.on('message', function(channel, message) {
		switch(channel) {
			case scan_channel: 
				ctr++;
				output.push(message);
				if( ctr === p.length ) 
					callback(output);
			break;		
		}
	});

	scan(p);
}

module.exports = function(c) {
	conf = c;
	return {
		discover: function() {
			return discover();
		},
		build: function(p,callback) {
			return waitBuild(p,callback);
		},
		scan: function(p,callback) {
			return waitScan(p,callback);
		}
	}
}