/*
 * js-polyfill v0.1.0
 * https://github.com/emn178/js-polyfill
 *
 * Copyright 2014, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function(undefined) {
  'use strict';

  function validateNotNull(arg) {
    if(arg === undefined || arg === null)
      throw new TypeError('"this" is null or not defined');
  }

  function validateFunc(arg) {
    if(typeof arg !== 'function')
      throw new TypeError(arg + ' is not a function');
  }

  function toObject(arg)
  {
    validateNotNull(arg);
    return Object(arg);
  }

  function isString(arg)
  {
    return Object.prototype.toString.call(arg) === '[object String]';
  }

  if(!Array.isArray)
  {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  if (!Array.prototype.every)
  {
    Array.prototype.every = function(callback, thisArg) {
      var thisObj = toObject(this);
      validateFunc(callback);
      for (var i = 0, len = this.length >>> 0, isStr = isString(this); i < len; i++)
      {
        if(!(i in this || isStr))
          continue;
        var value = isStr ? this.charAt(i) : this[i];
        if (!callback.call(thisArg, value, i, thisObj))
          return false;
      }
      return true;
    };
  }

  if (!Array.prototype.filter)
  {
    Array.prototype.filter = function(callback, thisArg) {
      var thisObj = toObject(this);
      validateFunc(callback);
      var result = [];
      for (var i = 0, len = this.length >>> 0, isStr = isString(this); i < len; i++)
      {
        if(!(i in this || isStr))
          continue;
        var value = isStr ? this.charAt(i) : this[i];
        if (callback.call(thisArg, value, i, thisObj))
          result.push(value);
      }
      return result;
    };
  }

  if (!Array.prototype.forEach)
  {
    Array.prototype.forEach = function(callback, thisArg ) {
      var thisObj = toObject(this);
      validateFunc(callback);
      for (var i = 0, len = this.length >>> 0, isStr = isString(this); i < len; i++)
      {
        if(!(i in this || isStr))
          continue;
        var value = isStr ? this.charAt(i) : this[i];
        callback.call(thisArg, value, i, thisObj);
      }
    };
  }

  if (!Array.prototype.indexOf) 
  {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      validateNotNull(this);

      var len = this.length >>> 0;
      if(fromIndex != Infinity)
        fromIndex = parseInt(Number(fromIndex)) || 0;
      if(fromIndex < -len)
        fromIndex = 0;
      else if(fromIndex < 0)
        fromIndex += len;

      for (var isStr = isString(this);fromIndex < len; fromIndex++)
      {
        var value = isStr ? this.charAt(fromIndex) : this[fromIndex];
        if (value === searchElement)
          return fromIndex;
      }
      return -1;
    };
  }

  if (!Array.prototype.lastIndexOf) 
  {
    Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
      validateNotNull(this);

      var len = this.length >>> 0;
      if(fromIndex === undefined)
        fromIndex = len - 1;
      if(fromIndex != Infinity)
        fromIndex = parseInt(Number(fromIndex)) || 0;
      if(fromIndex > len)
        fromIndex = len;
      else if(fromIndex < 0)
        fromIndex += len;

      for (var isStr = isString(this);fromIndex >= 0; fromIndex--)
      {
        var value = isStr ? this.charAt(fromIndex) : this[fromIndex];
        if (value === searchElement)
          return fromIndex;
      }
      return -1;
    };
  }

  if (!Array.prototype.map)
  {
    Array.prototype.map = function(callback, thisArg) {
      var thisObj = toObject(this);
      validateFunc(callback);
      var result = Array(this.length >>> 0);
      for (var i = 0, len = this.length >>> 0, isStr = isString(this); i < len; i++)
      {
        if(!(i in this || isStr))
          continue;
        var value = isStr ? this.charAt(i) : this[i];
        result[i] = callback.call(thisArg, value, i, thisObj);
      }
      return result;
    };
  }

  if (!Array.prototype.reduce)
  {
    Array.prototype.reduce = function(callback, initialValue) {
      var thisObj = toObject(this);
      validateFunc(callback);
      var init = initialValue !== undefined;
      for (var i = 0, len = this.length >>> 0, isStr = isString(this); i < len; i++)
      {
        if(!(i in this || isStr))
          continue;
        var value = isStr ? this.charAt(i) : this[i];
        if(init)
          initialValue = callback(initialValue, value, i, thisObj);
        else
        {
          init = true;
          initialValue = value;
        }
      }
      if(!init)
        throw new TypeError('Reduce of empty array with no initial value');
      return initialValue;
    };
  }

  if (!Array.prototype.reduceRight)
  {
    Array.prototype.reduceRight = function(callback, initialValue) {
      var thisObj = toObject(this);
      validateFunc(callback);
      var init = initialValue !== undefined;
      for (var i = (this.length >>> 0) - 1, isStr = isString(this);i >= 0; i--)
      {
        if(!(i in this || isStr))
          continue;
        var value = isStr ? this.charAt(i) : this[i];
        if(init)
          initialValue = callback(initialValue, value, i, thisObj);
        else
        {
          init = true;
          initialValue = value;
        }
      }
      if(!init)
        throw new TypeError('Reduce of empty array with no initial value');
      return initialValue;
    };
  }

  if (!Array.prototype.some)
  {
    Array.prototype.some = function(callback, thisArg) {
      var thisObj = toObject(this);
      validateFunc(callback);
      for (var i = 0, len = this.length >>> 0, isStr = isString(this); i < len; i++)
      {
        if(!(i in this || isStr))
          continue;
        var value = isStr ? this.charAt(i) : this[i];
        if (callback.call(thisArg, value, i, thisObj))
          return true;
      }
      return false;
    };
  }

  // https://www.cs.tut.fi/~jkorpela/chars/spaces.html
  // U+200B only work in webkit
  if (!String.prototype.trim)
  {
    var space = '\\s\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF';
    var reg = new RegExp('^[' + space + ']+|[' + space + ']+$', 'g');
    String.prototype.trim = function(callback) {
      validateNotNull(this);
      return String(this).replace(reg, '');
    };
  }

  if (!Function.prototype.bind)
  {
    var emptyFunc = function Empty() {};
    Function.prototype.bind = function(thisArg) {
      validateFunc(this);
      var bindingArgs = Array.prototype.slice.call(arguments, 1);
      var thisFunc = this;
      var boundFunc = function() {
        return thisFunc.apply(
          this instanceof emptyFunc ? this : thisArg,
          bindingArgs.concat(Array.prototype.slice.call(arguments))
        );
      };
      emptyFunc.prototype = this.prototype;
      boundFunc.prototype = new emptyFunc();
      return boundFunc;
    };
  }
})();