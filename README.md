![Not Impressed](not-impressed.png)

[![Build Status](https://travis-ci.org/scottleedavis/not-impressed.svg)](https://travis-ci.org/scottleedavis/not-impressed)
[![npm version](https://badge.fury.io/js/not-impressed.svg)](http://badge.fury.io/js/not-impressed)

A generalized platform build scanner written in nodejs.

dependencies
------------

* [Nodejs >= 0.10.x](https://nodejs.org)

optional dependencies
---------------------

* [apache maven 3](https://maven.apache.org/download.cgi)
* [bundler](http://bundler.io/)
* [license_finder](https://github.com/pivotal/LicenseFinder)


installation
------------
```
npm install -g not-impressed
```

configuration
-------------

*add a .not-impressed.json file to your repo that describes how to build and scan things.*
```
{
	"Report": "Your Report Name",
	"targets": [
		{"some_folder": "*" },
		{"some_other_folder": ["subfolder_1","subfolder_2/project"]}
	],
	"output": "results.json",
	"build": {
		"ruby": {
			"pattern": "Gemfile",
			"command": "bundle install --path vendor/bundle"
		},
		"maven": {
			"pattern": "pom.xml",
			"command": "mvn package; rm -f target; ln -s dist target"
		},
		"node": {
			"pattern": "package.json",
			"command": "npm install"
		}
	},
	"scan": {
		"license": {
			"command": "license_finder"
		}
	}
}
```

running
-------
*on a command shell*
```
cd <your repo>
ni

```
output is then generated in JSON format with the scan results in the current directory.

testing
-------

*[nodeunit](https://github.com/caolan/nodeunit) needs to be installed*
```
npm install -g nodeunit
```
*running tests*
```
nodeunit test/default-check.js
```


