#!/bin/sh

a=$(node --version)

if [ "$a" == "v0.12.7" ]
then
	npm install -g istanbul
	npm install coveralls
fi

