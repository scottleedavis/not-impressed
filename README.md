![Not Impressed](not-impressed.png)
an automated multiplatform build runner leveraging [license_finder](https://github.com/pivotal/LicenseFinder) , written in nodejs.

focused on:
* license information
* (TODO) vulnerability information


dependencies
------------

* [LicenseFinder](https://rubygems.org/gems/license_finder/versions/2.0.4)
* [Nodejs >= 0.10.x](https://nodejs.org)

optional dependencies
---------------------

* [apache maven 3](https://maven.apache.org/download.cgi)
* [bundler](http://bundler.io/)


installation
-----

* add a .not-impressed.json file to your repo
```
{
	"Report": "Your Report Name",
	"targets": [
		{"some_folder": "*" },
		{"some_other_folder": ["subfolder_1","subfolder_2/project"]}
	],
	"license_output_file": "license_results.json"
}
```
*git add as a submodule to your project*
```
git submodule add git@github.com:scottleedavis/not-impressed.git)
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


todo
----

* license & vuln info for ios
* gradle license & vuln info for android
* windows phone license & vuln info
* extract license info for .NET (a10)


notes
-----


