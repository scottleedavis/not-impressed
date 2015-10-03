var _ = require('lodash'),
    default_conf = require('./defaults'),
    parsers = require('./parsers');

var parse_config = default_conf.parse;

function strap(scan) {
    return parsers.strap(scan); 
}

function parse(input) {
    var output = [];
    _.each(input, function(i) {
        output.push(strap(i));
    });
    return output;
}

function setConf(conf) {
    _.each(conf.scan, function(val, key) {
        parse_config[key] = val;
    });
}

module.exports = {
    setConf: setConf,
    run: parse
}