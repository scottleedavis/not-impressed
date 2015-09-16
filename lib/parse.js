var _ = require('lodash'),
default_conf = require('./defaults');

var parse_config = default_conf.parse;

function strap(scan) {
	switch( scan.command ) {
		case "license_finder":
			//scan.raw = scan.output;
			var s = scan.output.trim().split("\n").slice(1);
			var o = [];
			_.each(s, function(n){
				var ns = n.split(",");
				var t = {
					name: ns[0].trim(),
					version: ns[1].trim(),
					license: ns[2].trim()
				};
				o.push(t);
			});
			return o;
			break;
	}
	return scan.output;
}

function parse(input) {
	_.each(input, function(i){
		i.scan.output = strap(i.scan);
	});
	return input;
}

function setConf(conf) {
	_.each(conf.scan, function(val,key){
		parse_config[key] = val;	
	});
}

module.exports = {
	setConf: function(conf) {
		setConf(conf);
	},
	run: function(target) {
		return parse(target);
	}
}