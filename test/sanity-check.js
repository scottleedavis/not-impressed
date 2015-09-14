
module.exports = {
    setUp: function (callback) {
        this.foo = 'bar';
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    sanityCheck: function (test) {
        test.equals(this.foo, 'bar');
        test.done();
    }
}
