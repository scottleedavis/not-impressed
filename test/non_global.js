var assert = require('assert'),
    pubsub = require('node-internal-pubsub'),
    non_global = require('../examples/non_global');


describe('examples/non_global', function(){
  it('runs', function(){
    assert(typeof non_global != "undefined");
  });

});