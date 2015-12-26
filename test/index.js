var assert = require('chai').assert;
var chainBuilder = require('chainbuilder');

describe('chainbuilder-lodash', function () {
  it('should mix in lodash methods', function (done) {
    var myChain = chainBuilder({
      methods: {
        testArray: function (done) { done(null, ['one', 'two', 'three']); }
      },
      mixins: [
        require('..')()
      ]
    });

    myChain()
      .testArray()

      // map + reduce
      .map(function (v) { return v + v.length; })
      .reduce(function (memo, v) { return memo + (memo ? '-' : '') + v; }, '')
      .tap(function (err, result) {
        if (err) return;
        assert.equal(result, 'one3-two3-three5');
      })

      // isString
      .testArray()
      .isString()
      .tap(function (err, result) {
        if (err) return;
        assert.equal(result, false);
      })

      .testArray()
      .isArray()
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
    assert.equal(typeof myChain().indexBy, 'function');
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
});
