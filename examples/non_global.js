var ni = require('..')


var conf = {
    "Report": "Your Report Name",
    "output": "results.json"   ,
    "targets": [
        {"..": "" }
    ]
}
console.log(ni.run(conf))



//if (!module.parent) {
//    console.log("I'm parent");
//} else {
//    console.log("I'm child");
//}
