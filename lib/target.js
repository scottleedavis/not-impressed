var _ = require('lodash'),
	discovery = require('./discovery'),
	pubsub = require('node-internal-pubsub'),
	licenser = require('./license'),	
	builder = require('./build');

var conf = null;
var build_channel = "builds";
var license_channel = "licenses";


function license(projects) {
	_.each(projects, function(p){
		licenser.run(p);
	});
}

function build(projects) {
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

function waitLicense(p,callback) {
	var ps = pubsub.createSubscriber();
  	var ctr = 0;
  	var output = [];
  	ps.subscribe(license_channel);
	ps.on('message', function(channel, message) {
		switch(channel) {
			case license_channel: 
				ctr++;
				output.push(message);
				if( ctr === p.length ) 
					callback(output);
			break;		
		}
	});

	license(p);
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
		license: function(p,callback) {
			return waitLicense(p,callback);
		}
	}
}