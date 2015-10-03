var assert = require('assert'),
    payload = require('../lib/payload');

// // defaults exports
// //     cmd

describe('payload', function(){
  it('has cmd', function(){
    assert(typeof payload.cmd != "undefined");
  });
  it('contains a {{target}}', function(){
  	assert(payload.cmd.indexOf("{{target}}") > -1);
  });
  it('contains a {{spec}}', function(){
  	assert(payload.cmd.indexOf("{{spec}}") > -1);
  });
})