#! /usr/bin/env node

if (module.parent) {
	process.env['NI_TARGET']=process.cwd();
    var ni = require('./bin/app-child');
	module.exports = {
		run: ni.run
	}
} else {
	process.env['NI_TARGET']=process.cwd();
	process.env['NI_CONF']=".ni.json";
    require('./bin/app');
}
