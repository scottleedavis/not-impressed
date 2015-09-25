var assert = require('assert'),
    defaults = require('../lib/defaults');

// defaults exports
//     parse
//     build
//     scan
//     target
//     seperator
//     file_opts

describe('Sane defaults', function(){
  it('contain a defaults module', function(){
    assert(typeof defaults != "undefined");
  });
  it('contains parse', function(){
    assert(typeof defaults.parse != "undefined");
  });
  it('contains build', function(){
    assert(typeof defaults.build != "undefined");
  });
  it('contains scan', function(){
    assert(typeof defaults.scan != "undefined");
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
})