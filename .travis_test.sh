 #!/bin/sh

a=$(node --version)

if [ "$a" == "v0.12.7" ]
then
	istanbul cover _mocha -- -R spec;
	npm install coveralls
	echo "reporting coverage.."
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
	echo "done."

fi
