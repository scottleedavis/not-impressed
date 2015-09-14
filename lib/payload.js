var path = require('path');

function payload(cmd) {
	if( Array.isArray(cmd) )
		return cmd.join("; ")
	else if( typeof cmd === 'string' || cmd instanceof String )
		return cmd;
	else
		throw "unsupported payload cmd type";
}

var begn = process.env["NI_SELF"] ? path.resolve(process.env["NI_TARGET"]) : path.resolve(process.env["NI_TARGET"],"not-impressed")
var dest = path.resolve(process.env["NI_TARGET"]);

var base_env_cmd = [
	"cd "+begn,
	"source env.sh",
	"cd "+dest
];

var target_cmd = [
	payload(base_env_cmd),
	"cd {{target}}"
];

module.exports = {
	license_cmd: payload([
		payload(target_cmd),
		'license_finder'
	]),
	build_cmd: payload([
		payload(target_cmd),
		"{{build_spec}}"
	]),
	pack: function(cmd){
		return payload(cmd);
	}
};