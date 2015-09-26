var assert = require('assert'),
    payload = require('../lib/payload');

// // defaults exports
// //     scan_cmd
// //     build_cmd
// //     cmd

describe('Empty Payload', function(){
  it('exports cmd', function(){
    assert(typeof payload.cmd != "undefined");
  });

})