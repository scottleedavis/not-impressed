#!/bin/sh

a=$(node --version)

if [ "$a" == "v0.12.7" ]
then
	npm install istanbul
	npm install coveralls
fi

