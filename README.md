![Not Impressed](not-impressed.png)

a third party component scanner supporting .NET, maven, nodejs, and ruby builds. 

focused on:
* license information
* (TODO) vulnerability information


dependencies
------------

* Ruby >= 1.9.3
* RubyGems (license_finder)
* Nodejs >= 0.10.x
* apache maven 3  (tested with 3.3.3)


installation
-----

* add a .not-impressed.json file to your repo
* add not impressed as a submodule to your project (git submodule add git@github.com:scottleedavis/not-impressed.git)


usage
-----

```
#from your-repo root
source ./not-impressed/env.sh

#for debug mode
ni -d

#for normal mode
ni

```

todo
----

* license & vuln info for ios
* gradle license & vuln info for android
* windows phone license & vuln info
* extract license info for .NET (a10)


notes
-----


