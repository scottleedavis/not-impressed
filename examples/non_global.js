var ni = require('not-impressed'),
	util = require('util');


var conf = {
    "Report": "Your Report Name",
    "targets": [
        {"..": "" }
    ],
    "build": {
        "node": {
            "pattern": "package.json",
            "command": "npm install"
        },
        "debug": false
    },
    "scan": {
        "license": {
            "command": "license_finder"
        },
        "debug": false
    }
}

ni.run(conf, function(output){
	console.log(util.inspect(output, true, null));
});

