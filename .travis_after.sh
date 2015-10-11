 #!/bin/sh

a=$(node --version)

if [ "$a" == "v0.12.7" ]
then
	echo "reporting coverage.."
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
	echo "done."
fi
