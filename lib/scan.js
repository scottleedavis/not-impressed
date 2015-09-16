var payload = require('./payload'),
	default_conf =require('./defaults'),
	pubsub = require('node-internal-pubsub'),
	_ = require('lodash'),
	exec = require('child_process').exec;

var scan_config = default_conf.scan;
var scan_channel = "scans";

function scan(target) {
	_.each(scan_config, function(val,key){
		var scan_cmd = val.command;
		var cmd = payload.scan_cmd
							.replace("{{target}}",target)
							.replace("{{scan_spec}}",val.command)	   
		console.log(cmd);
		var ps = pubsub.createPublisher();
		exec(cmd, function(error, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			ps.publish(scan_channel, {
				target: process.env["NI_SELF"] ? "Not Impressed" : target.replace(process.env["NI_TARGET"],''),
				scan: {
					command: val.command,
					output: stdout
				}
			});
		});
	});
}

function setConf(conf) {
	_.each(conf.scan, function(val,key){
		scan_config[key] = val;	
	});
}

module.exports = {
	setConf: function(conf) {
		setConf(conf);
	},
	run: function(target) {
		scan(target);
	}
}