 #!/bin/sh

a=$(node --version)

if [ "$a" == "v0.12.7" ]
then
	istanbul cover _mocha -- -R spec
fi
