var payload = require('./payload'),
	pubsub = require('node-internal-pubsub'),
	_ = require('lodash'),
	exec = require('child_process').exec;

var license_channel = "licenses";

function scan(target) {
	var cmd = payload.license_cmd.replace("{{target}}",target);			   
	console.log(cmd);
	var ps = pubsub.createPublisher();
	exec(cmd, function(error, stdout, stderr) {
		ps.publish(license_channel, {
			target: target.replace(process.env["NI_TARGET"],''),
			licenses: _.without(stdout.split("\n").slice(1),'')
		});
	});
}

module.exports = function() {
	return {
		run: function(target) {
			return scan(target);
		}
	}
}