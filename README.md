# not-impressed
a third party component scanner supporting .NET, maven, nodejs, and ruby builds. 

focused on:
* license information
* (TODO) vulnerability information


dependencies
------------

Ruby >= 1.9.3
RubyGems (license_finder)
Nodejs >= 0.10.x
apache maven 3  (tested with 3.3.3)


usage
-----

*todo*

todo
----

* license & vuln info for ios
* gradle license & vuln info for android
* windows phone license & vuln info
* extract license info for .NET (a10)


notes
-----
```
license finder notes

on each run, make sure you have bundle install, npm install, or mvn install'ed

note... on each run of license_finder on a mvn build...  need a symbolic lync to target/ instead of dist/
i.e.  ln -s dist target
```

