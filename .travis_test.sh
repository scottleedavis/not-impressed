 #!/bin/sh

a=$(node --version)

if [[ "$a" == v0.12* ]]
then
	npm install istanbul ;
	npm install coveralls ; 
	istanbul cover _mocha -- -R spec;
	echo "reporting coverage..";
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js ;
	echo "done.";

fi
