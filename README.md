![Not Impressed](not-impressed.png)

[![Build Status](https://travis-ci.org/scottleedavis/not-impressed.svg)](https://travis-ci.org/scottleedavis/not-impressed)
[![npm version](https://badge.fury.io/js/not-impressed.svg)](http://badge.fury.io/js/not-impressed)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://www.npmjs.com/package/not-impressed)

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

create a *.ni.json* file in your repo that describes how to build and scan things.

*example minimal configuration*
```
{
	"Report": "Your Report Name",
	"output": "results.json"
}
```
*example build and scan configuration*
```
{
	"Report": "Your Report Name",
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

*example of multiple targets configuration*
```
{
	"Report": "Your Report Name",
	"targets": [
		{"some_folder": "*" },
		{"some_other_folder": ["subfolder_1","subfolder_2/project"]}
	],
	"output": "results.json"
}
```


*example of printing debug information during build or scan*
```
{
	"Report": "Your Report Name",
	"build": {
		"maven": {
			"pattern": "pom.xml",
			"command": "mvn package; rm -f target; ln -s dist target"
		},
		"node": {
			"pattern": "package.json",
			"command": "npm install"
		},
		"debug": true
	},
	"scan": {
		"license": {
			"command": "license_finder"
		},
		"debug" true
	}
	"output": "results.json"
}
```

running
-------
*on a command shell*
```
cd <your repo>
ni

```
Results are generated in JSON format, in the current directory.

Here are the [results](results.json) generated when not-impressed runs against itself using it's own [.ni.json](.ni.json).

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
