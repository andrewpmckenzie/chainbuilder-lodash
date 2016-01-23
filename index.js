var lodash = require('lodash');

module.exports = function (options) {
  options = options || {};
  var manualExclude = options.exclude;
  var onlyInclude = options.include;

  var excludes = ['chain', 'support', 'tap', 'templateSettings', 'transform', 'clone', 'inject'].concat(manualExclude);

  var includeMap = onlyInclude && lodash.keyBy(onlyInclude);
  var excludeMap = lodash.keyBy(excludes);

  var wrappedMethods = {};
  var wrap = function (methodName, method) {
    return function () {
      var done = arguments[arguments.length - 1];
      var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
      args.unshift(this.previousResult());
      args = lodash.map(args, function (arg) {
        return typeof arg === 'function' ? arg.bind(this) : arg;
      }.bind(this));
      var result = method.apply(lodash, args);
      done(null, result);
    }
  };

  lodash.keys(lodash).forEach(function (methodName) {
    var exclude = (includeMap && !includeMap[methodName]) || excludeMap[methodName] || methodName.indexOf('_') === 0;
    if (!exclude) wrappedMethods[methodName] = wrap(methodName, lodash[methodName]);
  });

  return wrappedMethods;
};
