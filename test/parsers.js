var assert = require('assert'),
  pubsub = require('node-internal-pubsub'),
  parsers = require('../lib/parsers');

// parse exports
//     strap


describe('parsers', function() {
  it('has strap', function() {
    assert(typeof parsers.strap !== "undefined");
  });
  it('handles empty input', function() {
    assert(parsers.strap(["", "", ""]) !== null)
  });
  it('parses to object key/val', function() {
    var input = [
      "aaa", "bbb", "ccc"
    ];
    var output = parsers.strap(input)
    assert(output['aaa'].bbb === 'ccc');
  });
})