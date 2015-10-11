 #!/bin/sh

./ni-self


a=$(node --version)

if [ "$a" == "v0.12.7" ]
then
	npm run coverage
fi
