var payload = require('./payload'),
	pubsub = require('node-internal-pubsub'),
	exec = require('child_process').exec;

var build_channel = "builds";

function determineBuildType(dir) {
	if( dir.indexOf("pom.xml") > -1 ) { //maven
		return "mvn package; rm -f target; ln -s dist target"
	} else if( dir.indexOf("Gemfile") > -1 ) { //ruby
		return "bundle install --path vendor/bundle";
	} else if( dir.indexOf("package.json") > -1 ) {  //node
		return "npm install";
	} else {  //uncrecognized project type...
		return "";
	}
}

function ls(target, callback) {
	exec("ls "+target, function(error, stdout, stderr) {
		var cmd = payload.build_cmd.replace("{{target}}",target)
								   .replace("{{build_spec}}",determineBuildType(stdout));
		callback(cmd);
	});
}

function build(target) {
	ls(target, function(cmd){
		console.log(cmd);
		var ps = pubsub.createPublisher();
		exec(cmd, function(error, stdout, stderr) {
			ps.publish(build_channel, [stdout,stderr]);
		});
	});
}

module.exports = {
	run: function(target) {
			return build(target);
	}
}