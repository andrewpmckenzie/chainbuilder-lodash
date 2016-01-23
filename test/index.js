var assert = require('chai').assert;
var chainBuilder = require('chainbuilder');

describe('chainbuilder-lodash', function () {
  it('should mix in lodash methods', function (done) {
    var myChain = chainBuilder({
      mixins: [
        require('..')()
      ]
    });

    myChain(['one', 'two', 'three'])

      // map + reduce
      .map(function (v) { return v + v.length; })
      .reduce(function (memo, v) { return memo + (memo ? '-' : '') + v; }, '')
      .tap(function (err, result) {
        if (err) return;
        assert.equal(result, 'one3-two3-three5');
      })

      // isString
      .inject(1)
      .isString()
      .tap(function (err, result) {
        if (err) return;
        assert.equal(result, false);
      })

      .inject(1)
      .isNumber()
      .tap(function (err, result) {
        if (err) return;
        assert.equal(result, true);
      })
      .end(done);
  });

  it('lets you customize what\'s excluded', function () {
    var myChain = chainBuilder({
      mixins: [
        require('..')({ exclude: ['reduce'] })
      ]
    });

    assert.equal(typeof myChain().map, 'function');
    assert.equal(typeof myChain().keyBy, 'function');
    assert.equal(typeof myChain().isArray, 'function');
    assert.equal(typeof myChain().reduce, 'undefined');
  });

  it('lets you limit included functions to those specified', function () {
    var myChain = chainBuilder({
      mixins: [
        require('..')({ include: ['reduce', 'isArray'] })
      ]
    });

    assert.equal(typeof myChain().map, 'undefined');
    assert.equal(typeof myChain().indexBy, 'undefined');
    assert.equal(typeof myChain().isArray, 'function');
    assert.equal(typeof myChain().reduce, 'function');
  });

  it('runs passed functions with context', function (done) {
    var myChain = chainBuilder({
      mixins: [
        require('..')()
      ]
    });

    myChain([10, 20])
      .map(function () { return this.previousResult(); })
      .tap(function (err, result) {
        if (err) return err;
        assert.deepEqual(result, [[10, 20], [10, 20]]);
      })
      .end(done);
  });
});
