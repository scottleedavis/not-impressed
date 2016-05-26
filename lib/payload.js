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

var target_cmd = payload([
  "cd {{target}}"
]);

module.exports = {
  cmd: payload([
    target_cmd,
    "{{spec}}"
  ])
};