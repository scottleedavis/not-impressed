#! /usr/bin/env node

process.env['NI_TARGET']=process.cwd();
process.env['NI_CONF']=".ni.json";

require('./app');