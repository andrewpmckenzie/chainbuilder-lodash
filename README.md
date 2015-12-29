# chainbuilder-lodash [![Build Status](https://travis-ci.org/andrewpmckenzie/chainbuilder-lodash.svg)](https://travis-ci.org/andrewpmckenzie/chainbuilder-lodash)

A [lodash](http://lodash.com) mixin for [chainbuilder](https://www.npmjs.com/package/chainbuilder). 

**Installation** `npm install chainbuilder chainbuilder-lodash --save`

**Usage**  
```javascript
var chainBuilder = require('chainbuilder');

var myChain = chainBuilder({
  methods: {
    inject: function (val, done) { done(null, val); },
    /* ... your methods ... */
  },
  mixins: [
    require('chainbuilder-lodash')()
  ]
});

myChain()
  .inject(['one', 'two', 'three'])
  .map(function (val) { return val + ' mississippi'; }) // < from lodash
  .end(function (err, result) {
    console.log(result); /* > ["one mississippi", "two mississippi", "three mississippi" */
  });
```

#### including / excluding functions
You can provide 'include' and 'exclude' options to limit the methods mixed in. e.g:

```javascript
module.exports = chainBuilder({
  methods: {/* ... your methods ... */},
  mixins: [
    require('chainbuilder-lodash')({
      include: ['map', 'reduce'] // only the map and reduce functions will be mixed in
    })
  ]
});

module.exports = chainBuilder({
  methods: {/* ... your methods ... */},
  mixins: [
    require('chainbuilder-lodash')({
      exclude: ['map', 'reduce'] // everything except the map and reduce functions will be mixed in
    })
  ]
});
```
