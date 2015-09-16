
module.exports = {
    setUp: function (callback) {
        this.defaults = require('../lib/defaults');
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    defaultCheck: function (test) {
        test.ok(this.defaults, "defaults module exists");
        test.done();
    }
}
