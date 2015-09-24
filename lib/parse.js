var _ = require('lodash'),
    default_conf = require('./defaults'),
    parsers = require('./parsers');

var parse_config = default_conf.parse;

function strap(scan) {
    return parsers.strap(scan); 
}

function parse(input) {
    _.each(input, function(i) {
        i.scan.output = strap(i.scan);
    });
    return input;
}

function setConf(conf) {
    _.each(conf.scan, function(val, key) {
        parse_config[key] = val;
    });
}

module.exports = {
    setConf: function(conf) {
        setConf(conf);
    },
    run: function(target) {
        return parse(target);
    }
}