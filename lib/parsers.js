var _ = require('lodash');


//license_finder from pivotal labs (https://github.com/pivotal/LicenseFinder)
function license_finder(scan) {

	switch(scan.command) {
		case "license_finder":
			var s = scan.output.trim().split("\n").slice(1);
			var o = [];
			_.each(s, function(n) {
			    var ns = n.split(",");
			    var t = {
			        name: ns[0].trim(),
			        version: ns[1].trim(),
			        license: ns.slice(2).join(" ").trim()
			    };
			    o.push(t);
			});
			return o;
			break;
		case "license_finder report --format csv --columns=name version homepage licenses":
			var s = scan.output.trim().split("\n");
			var o = [];
			_.each(s, function(n) {
			    var ns = n.split(",");
			    var t = {
			        name: ns[0].trim(),
			        version: ns[1].trim(),
			        homepage: ns[2].trim(),
			        license: ns.slice(3).join(" ").trim()
			    };
			    o.push(t);
			});
			return o;
			break;
		default:
			return scan.output;
	}

}

function strap(scan) {
    switch (scan.command.split(" ")[0]) {
        case "license_finder":
        	return license_finder(scan)
            break;
    }
    return scan.output;
}

module.exports = {
	strap: strap
}