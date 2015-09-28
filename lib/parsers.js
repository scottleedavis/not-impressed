var _ = require('lodash');


//license_finder from pivotal labs (https://github.com/pivotal/LicenseFinder)
function license_finder(scan) {
	var key = scan[1];
	var ret = {};
	switch(key) {
		case "license_finder":
			var s = scan[2].trim().split("\n").slice(1);
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
			ret[key] = o;
			break;
		case "license_finder report --format csv --columns=name version homepage licenses":
			var s = scan[2].trim().split("\n");
			var o = [];
			_.each(s, function(n) {
			    var ns = n.split(",");
			    if( ns.length >= 4 ){
				    var t = {
				        name: ns[0].trim(),
				        version: ns[1].trim(),
				        homepage: ns[2].trim(),
				        license: ns.slice(3).join(" ").trim()
				    };
				    o.push(t);
			    } else {
			    	console.log('ERROR PARSING: '+n);
			    }

			});
			ret[key] = o;
			break;
		default:
			ret[key] = [];
			break;
	}

	return ret;

}

//todo dependency-check
// [DependencyCheck] OWASP Dependency-Check Plugin v1.3.0
// [DependencyCheck] Executing Dependency-Check with the following options:
// [DependencyCheck]  -name = data-lookup-svc-testing
// [DependencyCheck]  -scanPath = /home/jenkins/workspace/data-lookup-svc-testing
// [DependencyCheck]  -outputDirectory = /home/jenkins/workspace/data-lookup-svc-testing
// [DependencyCheck]  -dataDirectory = /home/jenkins/workspace/data-lookup-svc-testing/dependency-check-data
// [DependencyCheck]  -dataMirroringType = none
// [DependencyCheck]  -isQuickQueryTimestampEnabled = true
// [DependencyCheck]  -useMavenArtifactsScanPath = false
// [DependencyCheck]  -jarAnalyzerEnabled = true
// [DependencyCheck]  -javascriptAnalyzerEnabled = true
// [DependencyCheck]  -pythonAnalyzerEnabled = true
// [DependencyCheck]  -archiveAnalyzerEnabled = true
// [DependencyCheck]  -assemblyAnalyzerEnabled = true
// [DependencyCheck]  -centralAnalyzerEnabled = true
// [DependencyCheck]  -nuspecAnalyzerEnabled = true
// [DependencyCheck]  -nexusAnalyzerEnabled = false
// [DependencyCheck]  -autoconfAnalyzerEnabled = true
// [DependencyCheck]  -cmakeAnalyzerEnabled = true
// [DependencyCheck]  -opensslAnalyzerEnabled = true
// [DependencyCheck]  -showEvidence = true
// [DependencyCheck]  -format = XML
// [DependencyCheck]  -autoUpdate = true
// [DependencyCheck]  -updateOnly = false

function strap(scan) {
	var key = scan[1];
	var ret = {};
    switch ( key.split(" ")[0] ) {
        case "license_finder":
        	ret[scan[0]] = license_finder(scan)
            break;
        default:
        	var unfound = {};
        	unfound[key] = scan[2];
        	ret[scan[0]] = unfound;
        	break;
    }
    return ret;
}

module.exports = {
	strap: strap
}