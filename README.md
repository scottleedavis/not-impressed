![Not Impressed](not-impressed.png)

[![Build Status](https://travis-ci.org/scottleedavis/not-impressed.svg)](https://travis-ci.org/scottleedavis/not-impressed)

A generalized multiplatform build scanner written in nodejs.

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

* add a .not-impressed.json file to your repo
```
{
	"Report": "Your Report Name",
	"targets": [
		{"some_folder": "*" },
		{"some_other_folder": ["subfolder_1","subfolder_2/project"]}
	],
	"output: "results.json",
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
*git add as a submodule to your project*
```
git submodule add git@github.com:scottleedavis/not-impressed.git
```

usage
-----

*from terminal (/bin/sh)*
```
#from your-repo root
source ./not-impressed/env.sh

#for debug mode
ni -d

#for normal mode
ni

```

*jenkins*
* todo setup

*travis*
* todo setup

testing
-------

*[nodeunit](https://github.com/caolan/nodeunit) needs to be installed*
```
npm install -g nodeunit
```

*running tests*
```
nodeunit test/sanity-check.js
```

todo
----

* license info for ios
* license info for android
* license info for windows phone
* license info for .NET


