var assert = require('assert'),
    pubsub = require('node-internal-pubsub'),
    doer = require('../lib/doer');

// doer exports
//     setConf
//     run


describe('Sane doer', function(){
  it('contain a defaults module', function(){
    assert(typeof doer != "undefined");
  });
  it('contains setConf', function(){
    assert(typeof doer.setConf != "undefined");
  });
  it('contains run', function(){
    assert(typeof doer.run != "undefined");
  });
  it('runs', function(done){
    var steps = {
      phase1: {
        "do_it": {
            "pattern": "README.md",
            "command": "echo 'foo'"
        },
        "other": {
            "pattern": "package.json",
            "command": "echo $PATH"
        },
        "default": {
          "command": "cd"
        },
        debug: false
      },
      phase2: {
        "reduce": {
            "command": "pwd"
        },
        debug: false
      },
      "Report": "Test",
      "output": "test.json",
      "targets": [
        {".": ""}
      ]
    };
    var target = ".";

    doer.setConf(steps);


    var ps = pubsub.createSubscriber();
    var ctr = 0;
    var channel = "not-impressed";
    var message_count = doer.actionCount();
    ps.subscribe(channel);
    ps.on('message', function(channel, message) {
        switch (channel) {
            case channel:
                ctr++;
                if (ctr === message_count) {
                  assert(typeof message != "undefined");
                  done();
                }
                break;
        }
    });

    doer.run(target);

  }); 
})