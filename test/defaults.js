var assert = require('assert'),
    defaults = require('../lib/defaults');

// defaults exports
//     parse
//     build
//     scan
//     target
//     seperator
//     file_opts
//     dir

describe('defaults', function(){
  it('contain a defaults module', function(){
    assert(typeof defaults == "undefined");
  });
  it('contains config', function(){
    assert(typeof defaults.config != "undefined");
  });
  it('contains parse', function(){
    assert(typeof defaults.parse != "undefined");
  });
  it('contains target', function(){
    assert(typeof defaults.target != "undefined");
  });
  it('contains seperator', function(){
    assert(typeof defaults.seperator != "undefined");
  });
  it('contains file_opts', function(){
    assert(typeof defaults.file_opts != "undefined");
  });
  it('contains dir', function(){
    assert(typeof defaults.dir != "undefined");
  });
  it('contains channel', function(){
    assert(typeof defaults.channel != "undefined");
  });
})