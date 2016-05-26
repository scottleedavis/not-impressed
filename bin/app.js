var jsonfile = require('jsonfile'),
  path = require('path'),
  defaults = require('../lib/defaults'),
  util = require('util');

var conf = jsonfile.readFileSync(path.resolve(process.env["NI_TARGET"], process.env["NI_CONF"]), defaults.file_opts),
  target = require('../lib/target')(conf),
  repos = target.discover();

target.run(repos, function(output) {
  var parsed = target.parse(output);
  console.log(util.inspect(parsed, true, null));
  jsonfile.writeFileSync(path.resolve(process.env["NI_TARGET"], conf.output), parsed, defaults.file_opts);
});