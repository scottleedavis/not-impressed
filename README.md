![Not Impressed](not-impressed.png)

[![Build Status](https://travis-ci.org/scottleedavis/not-impressed.svg)](https://travis-ci.org/scottleedavis/not-impressed)
[![Coverage Status](https://coveralls.io/repos/scottleedavis/not-impressed/badge.svg?branch=master&service=github)](https://coveralls.io/github/scottleedavis/not-impressed?branch=master)
[![npm version](https://badge.fury.io/js/not-impressed.svg)](http://badge.fury.io/js/not-impressed)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://www.npmjs.com/package/not-impressed)

A generalized multi-stage build scanner written in nodejs

Provides a simple structure for discovering, building, scanning, and parsing the various groupings of build systems with tools that analyze them.

dependencies
------------

* [Nodejs >= 0.8.x](https://nodejs.org)

optional dependencies
---------------------

Any.

Some dependencies that have been used with success.
* [maven](https://maven.apache.org/download.cgi), [java](https://java.com/en/download/)
* [bundler](http://bundler.io/), [ruby](https://www.ruby-lang.org/en/), [rubygems](https://rubygems.org/)
* [license_finder](https://github.com/pivotal/LicenseFinder)
* [OWASP Dependency Check](https://www.owasp.org/index.php/OWASP_Dependency_Check)


installation
------------
```
npm install -g not-impressed
```
*or as a dependency in your package.json*


configuration
-------------

Create a configuration object that describes how to build and/or scan things.

When using a globally installed ni, this takes the form of a a *.ni.json* file in root path of your project.  (see examples for more useful configurations)

```
{
    "Report": "Your Report Name",
    "output": "results.json"
}

```

When requiring this module in your own project, specify at least one target.

```
{
    "Report": "Your Report Name",
    "targets": [
        {"/some/interesting/build": "" }
    ]
}

```

configuration examples 
----------------------

* [build and scan](examples/config/multi_build.json)
* [running a scan only](examples/config/scan_only.json)
* [arbitrary phases](examples/config/multi_phase.json)
* [multiple targets](examples/config/multi_target.json)
* [displaying debug information](examples/config/debug.json)
* [running license_finder](examples/config/license_finder.json)


usage
-----
*on a command shell*
```
cd <your repository with a .ni.json file>
ni
```

[Results](results.json) are generated in JSON format based on [.ni.json](.ni.json) configuration.


To include not-impressed in your [Travis](https://travis-ci.org/) build, add the following to .travis.yml.
```
before_script:
  - npm install -g not-impressed
script:
 - ni
```


[Here is an example](examples/non_global.js) of including not-impressed in your node application directly.
```
var ni = require('not-impressed'),
	util = require('util');


var conf = {
    "Report": "Your Report Name",
    "targets": [
        {"..": "" }
    ],
    ...
}

ni.run(conf, function(output){
	console.log(util.inspect(output, true, null));
});

``` 


You can also leverage a webservice docker container (for play only!) at [not-impressed-docker](https://github.com/scottleedavis/not-impressed-docker)


testing
-------


*[Mochajs](https://mochajs.org/) needs to be installed*
```
npm install -g mocha
```
*running tests*
```
mocha test
```


