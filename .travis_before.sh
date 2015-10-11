#!/bin/sh

gem install license_finder
npm install -g mocha

a=$(node --version)

if [ "$a" == "v0.12.7" ]
then
	npm install istanbul
	npm install coveralls
fi

