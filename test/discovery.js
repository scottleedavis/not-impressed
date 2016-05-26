var assert = require('assert'),
  pubsub = require('node-internal-pubsub'),
  discovery = require('../lib/discovery');

// discovery exports
//     scan


describe('discovery', function() {
  it('has scan', function() {
    assert(typeof discovery.scan !== "undefined");
  });
  it('defaults to NI_TARGET', function() {
    process.env["NI_TARGET"] = process.cwd();
    var target = {};
    assert(discovery.scan(target)[0] === process.cwd());
  });
  it('discovers self "."', function() {
    process.env["NI_TARGET"] = process.cwd();
    var target = {};
    target[process.cwd()] = ".";
    assert(discovery.scan(target)[0] === process.cwd());
  });
  it('discovers directories "*"', function() {
    process.env["NI_TARGET"] = process.cwd();
    var target = {};
    target[process.cwd()] = "*";
    assert(discovery.scan(target).length >= 1)
  });
  it('discovers directory ""', function() {
    var target = {};
    target[process.cwd()] = "";
    assert(discovery.scan(target)[0] === process.cwd());
  });
  it('discovers directory array "[...]"', function() {
    process.env["NI_TARGET"] = process.cwd();
    var target = {};
    target[process.env["NI_TARGET"]] = [
      "lib", "examples", "bin", "test"
    ];
    assert(discovery.scan(target).length === 4);
  });
})