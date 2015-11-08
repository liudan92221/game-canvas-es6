'use strict';
function isType(type) {
  return function (value) {
    return Object.prototype.toString.call(value) === '[object ' + type + ']';
  }
}

function merge(defaults) {
  var _obj = {};
  for (let key in defaults) {
    if (module.exports.isObject(defaults[key])) {
      _obj[key] = merge(defaults[key]);
    } else {
      _obj[key] = defaults[key];
    }
  }
  return _obj;
}
export var Util = {
  isObject: isType('Object'),
  isNumber: isType('Number'),
  isString: isType('String'),
  isArray: Array.isArray ? Array.isArray : isType('Array'),
  isFunction: isType('Function'),

  isNode: function (node) {
    return node.nodeType;
  },

  merge: merge
};
