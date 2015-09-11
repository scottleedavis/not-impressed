#!/bin/sh


#add /bin to path
SCRIPT_LOC="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PATH=$SCRIPT_LOC/bin:$PATH