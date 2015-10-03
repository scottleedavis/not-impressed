var assert = require('assert'),
    pubsub = require('node-internal-pubsub'),
    target = require('../lib/target')({});

// target exports
//     discover
//     run
//     parse


describe('target', function(){
  it('has discover', function(){
  	assert(typeof target.discover !== "undefined");
  });
  it('has run', function(){
    assert(typeof target.run !== "undefined");
  });
  it('has parse', function(){
    assert(typeof target.parse !== "undefined");
  });
  it('runs discover', function(){
    assert(target.discover().length >= 1);
  })
  it('runs run', function(done){
    target.run(target.discover(),function(output){
      assert(Array.isArray(output))
      done();
    })
  });
  it('runs parse', function(){
    var input = [
      [
        "aaa","bbb","ccc"
      ]
    ];
    var output = target.parse(input) 
    assert(output[0]['aaa'].bbb === 'ccc');
  });
})