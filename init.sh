#!/bin/sh


#init ni project
npm install;

#build and link to dependency-check submodule...
# cd DependencyCheck;
# mvn package;
# cd ../bin;
# ln -s ../DependencyCheck/dependency-check-cli/target/release/bin/dependency-check.sh;
# cd ..;

#install gem brakeman
# sudo gem install brakeman


#install license_finder
# sudo gem install license_finder
gem install license_finder

