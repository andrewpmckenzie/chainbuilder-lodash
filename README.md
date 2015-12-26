# chainbuilder-lodash [![Build Status](https://travis-ci.org/andrewpmckenzie/chainbuilder-lodash.svg)](https://travis-ci.org/andrewpmckenzie/chainbuilder-lodash)

A [lodash](http://lodash.com) mixin for [chainbuilder](https://www.npmjs.com/package/chainbuilder). 

**Installation** `npm install chainbuilder chainbuilder-lodash --save`

**Usage**  
```javascript
var chainBuilder = require('chainbuilder');

module.exports = chainBuilder({
  methods: {/* ... your methods ... */},
  mixins: [
    require('chainbuilder-lodash')()
  ]
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
