 #!/bin/sh

a=$(node --version)

if [ "$a" == "v0.12.7" ]
then
	npm run coverage
else
	mocha test
fi
