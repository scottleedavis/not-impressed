var assert = require('assert'),
    payload = require('../lib/payload');

// // defaults exports
// //     scan_cmd
// //     build_cmd
// //     cmd

describe('payload', function(){
  it('has cmd', function(){
    assert(typeof payload.cmd != "undefined");
  });

})