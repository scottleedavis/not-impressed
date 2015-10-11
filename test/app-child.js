var assert = require('assert'),
    app_child = require('../bin/app-child');

// app-child exports
//     run

describe('app-child', function(){
  it('has a run', function(){
    assert(typeof app_child.run != "undefined");
  });
  it('runs', function(done){
    this.timeout(10000);
    var conf = {
        "Report": "Your Report Name",
        "targets": [
            {"..": "" }
        ],
        "build": {
            "node": {
                "pattern": "package.json",
                "command": "npm install"
            },
            "debug": false
        },
        "scan": {
            "license": {
                "command": "license_finder"
            },
            "debug": false
        }
    };
    
    app_child.run(conf, function(output){
      assert(typeof output != "undefined")
      done();
    });


  });
})