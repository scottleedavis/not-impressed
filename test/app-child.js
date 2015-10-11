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
    process.env["NI_TARGET"] = ".."
    var conf = {
        "Report": "",
        "targets": [
            {"": "" }
        ],
        "dummy": {
            "test": {
                "pattern": "<not-found>",
                "command": ""
            }
        }
    };
    
    app_child.run(conf, function(output){
      assert(typeof output != "undefined")
      done();
    });


  });
})