# chainbuilder-lodash

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
