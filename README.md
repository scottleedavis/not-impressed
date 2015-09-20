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

* [example minimal configuration](examples/min.json)
* [example build and scan configuration](examples/multi_build.json)
* [example of multiple targets configuration](examples/multi_target.json)
* [example of printing debug information during build or scan](examples/debug.json)

running
-------
*on a command shell*
```
cd <your repo>
ni

```
[Results](results.json) are generated in JSON format, in the current directory based on it's own [.ni.json](.ni.json) configuration.

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
