![Not Impressed](not-impressed.png)

[![Build Status](https://travis-ci.org/scottleedavis/not-impressed.svg)](https://travis-ci.org/scottleedavis/not-impressed)
[![npm version](https://badge.fury.io/js/not-impressed.svg)](http://badge.fury.io/js/not-impressed)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://www.npmjs.com/package/not-impressed)

A generalized platform build scanner written in nodejs.

Provides a simple structure for discovering, building, scanning, and parsing the various groupings of build systems with tools that analyze them.

dependencies
------------

* [Nodejs >= 0.8.x](https://nodejs.org)

optional dependencies
---------------------

Any.

Some dependencies that have been used with success.
* [apache maven 3](https://maven.apache.org/download.cgi)
* [bundler](http://bundler.io/)
* [license_finder](https://github.com/pivotal/LicenseFinder)


installation
------------
```
npm install -g not-impressed
```

To include not-impressed in your [Travis](https://travis-ci.org/) build, add the following to .travis.yml in the before_script section.
```
before_script:
  - npm install -g not-impressed
script:
 - ni
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
		{"another_folder": ""},
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
[Results](results.json are generated in JSON format, in the current directory based on it's own [.ni.jon](.ni.json) configuration.

You can also leverage a webservice docker container (for play only!) at [not-impressed-docker](https://github.com/scottleedavis/not-impressed-docker)


testing
-------

*undergoing a redesign*

*[nodeunit](https://github.com/caolan/nodeunit) needs to be installed*
```
npm install -g nodeunit
```
*running tests*
```
nodeunit test/default-check.js
```
