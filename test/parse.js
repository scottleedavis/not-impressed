var assert = require('assert'),
  pubsub = require('node-internal-pubsub'),
  parse = require('../lib/parse');

// parse exports
//     setConf
//     run


describe('parse', function() {
  it('has setConf', function() {
    assert(typeof parse.setConf !== "undefined");
  });
  it('has run', function() {
    assert(typeof parse.run !== "undefined");
  });
  it('runs with empty default', function() {
    assert(parse.run("") == "");
  });
  it('runs with input', function() {
    var input = [
      [
        "aaa", "bbb", "ccc"
      ]
    ];
    var output = parse.run(input)
    assert(output[0]['aaa'].bbb === 'ccc');
  });
})