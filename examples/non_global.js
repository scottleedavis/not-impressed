var ni = require('not-impressed'),
	util = require('util');


var conf = {
    "Report": "Your Report Name",
    "targets": [
        {"..": "" }
    ]
}

ni.run(conf, function(output){
	console.log(util.inspect(output, true, null));
});

