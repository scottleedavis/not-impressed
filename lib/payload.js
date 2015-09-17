var path = require('path')
default_conf = require('./defaults');

function payload(cmd) {
    if (Array.isArray(cmd))
        return cmd.join(default_conf.seperator);
    else if (typeof cmd === 'string' || cmd instanceof String)
        return cmd;
    else
        throw "unsupported payload cmd type";
}

var target_cmd = [
    "cd {{target}}"
];

module.exports = {
    scan_cmd: payload([
        payload(target_cmd),
        '{{scan_spec}}'
    ]),
    build_cmd: payload([
        payload(target_cmd),
        "{{build_spec}}"
    ])
};