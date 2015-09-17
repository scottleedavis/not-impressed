
var build_config = {
	"ruby": {
		pattern: "Gemfile",
		command: "bundle install --path vendor/bundle"
	},
	"maven": {
		pattern: "pom.xml",
		command: "mvn package; rm -f target; ln -s dist target"
	},
	"node": {
		pattern: "package.json",
		command: "npm install"
	},
	"debug": false
};

var scan_config = {
	"license": {
		"command": "license_finder"
	},
	"debug": false
};

var parse_config = {};

var target_config = {};

module.exports = {
	parse: parse_config,
	build: build_config,
	scan: scan_config,
	target: target_config
}