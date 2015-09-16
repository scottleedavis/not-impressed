var jsonfile = require('jsonfile'),
	path = require('path'),
	util = require('util');

var conf = jsonfile.readFileSync(path.resolve(process.env["NI_TARGET"], process.env["NI_CONF"]))
var target = require('./lib/target')(conf);
var repos = target.discover();

target.build(repos, function(output){
	//console.log(util.inspect(output, {showHidden: false, depth: null}));
	target.scan(repos, function(scan){
		var parsed = target.parse(scan);
		console.log(util.inspect(parsed, {showHidden: false, depth: null}));
		jsonfile.writeFileSync(path.resolve(process.env["NI_TARGET"], conf.output), parsed);
	});
});
