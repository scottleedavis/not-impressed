#!/bin/sh

echo "starting up...  Not Impressed!!!"

export NI_TARGET="$PWD"
export NI_CONF=".not-impressed.json"

if [[ "$@" == "-d" ]]
then
    node-debug app.js
else
	npm start
fi


echo "shut down.  Not Impressed!!!"