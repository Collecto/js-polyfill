/*
 * js-polyfill v0.0.1
 * https://github.com/emn178/js-polyfill
 *
 * Copyright 2014, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function(undefined) {
  'use strict';

  function validateThis(t) {
    if(t === undefined || t === null)
      throw new TypeError('"this" is null or not defined');
  }

  function validateFunc(func) {
    if(typeof func !== 'function')
      throw new TypeError(func + ' is not a function');
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
      validateThis(this);
      validateFunc(callback);

      var isString = Object.prototype.toString.call(this) === '[object String]';
      for (var i = 0, len = this.length >>> 0; i < len; i++)
      {
        if(!(i in this || isString))
          continue;
        var value = isString ? this.charAt(i) : this[i];
        if (!callback.call(thisArg, value, i, this))
          return false;
      }
      return true;
    };
  }

  if (!Array.prototype.filter)
  {
    Array.prototype.filter = function(callback, thisArg) {
      validateThis(this);
      validateFunc(callback);

      var result = [];
      var isString = Object.prototype.toString.call(this) === '[object String]';
      for (var i = 0, len = this.length >>> 0; i < len; i++)
      {
        if(!(i in this || isString))
          continue;
        var value = isString ? this.charAt(i) : this[i];
        if (callback.call(thisArg, value, i, this))
          result.push(value);
      }
      return result;
    };
  }

  if (!Array.prototype.forEach)
  {
    Array.prototype.forEach = function(callback, thisArg ) {
      validateThis(this);
      validateFunc(callback);

      var isString = Object.prototype.toString.call(this) === '[object String]';
      for (var i = 0, len = this.length >>> 0; i < len; i++)
      {
        if(!(i in this || isString))
          continue;
        var value = isString ? this.charAt(i) : this[i];
        callback.call(thisArg, value, i, this);
      }
    };
  }

  if (!Array.prototype.indexOf) 
  {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      validateThis(this);

      var len = this.length >>> 0;
      var isString = Object.prototype.toString.call(this) === '[object String]';
      if(fromIndex != Infinity)
        fromIndex = parseInt(fromIndex) || 0;
      if(fromIndex < -len)
        fromIndex = 0;
      else if(fromIndex < 0)
        fromIndex += len;

      for (;fromIndex < len; fromIndex++)
      {
        var value = isString ? this.charAt(fromIndex) : this[fromIndex];
        if (value === searchElement)
          return fromIndex;
      }
      return -1;
    };
  }

  if (!Array.prototype.lastIndexOf) 
  {
    Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
      validateThis(this);

      var len = this.length >>> 0;
      var isString = Object.prototype.toString.call(this) === '[object String]';
      if(fromIndex === undefined)
        fromIndex = len;
      if(fromIndex != Infinity)
        fromIndex = parseInt(fromIndex) || 0;
      if(fromIndex > len)
        fromIndex = len;
      else if(fromIndex < 0)
        fromIndex += len;

      for (;fromIndex >= 0; fromIndex--)
      {
        var value = isString ? this.charAt(fromIndex) : this[fromIndex];
        if (value === searchElement)
          return fromIndex;
      }
      return -1;
    };
  }

  if (!Array.prototype.map)
  {
    Array.prototype.map = function(callback, thisArg) {
      validateThis(this);
      validateFunc(callback);

      var isString = Object.prototype.toString.call(this) === '[object String]';
      var result = Array(this.length >>> 0);
      for (var i = 0, len = result.length; i < len; i++)
      {
        if(!(i in this || isString))
          continue;
        var value = isString ? this.charAt(i) : this[i];
        result[i] = callback.call(thisArg, value, i, this);
      }
      return result;
    };
  }

  if (!Array.prototype.reduce)
  {
    Array.prototype.reduce = function(callback, initialValue) {
      validateThis(this);
      validateFunc(callback);

      var isString = Object.prototype.toString.call(this) === '[object String]';
      var init = initialValue !== undefined;
      for (var index = 0, len = this.length >>> 0;index < len; index++)
      {
        if(!(index in this || isString))
          continue;
        var value = isString ? this.charAt(index) : this[index];
        if(init)
          initialValue = callback(initialValue, value, index, this);
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
      validateThis(this);
      validateFunc(callback);

      var isString = Object.prototype.toString.call(this) === '[object String]';
      var init = initialValue !== undefined;
      for (var index = (this.length >>> 0) - 1;index >= 0; index--)
      {
        if(!(index in this || isString))
          continue;
        var value = isString ? this.charAt(index) : this[index];
        if(init)
          initialValue = callback(initialValue, value, index, this);
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
      validateThis(this);
      validateFunc(callback);

      var isString = Object.prototype.toString.call(this) === '[object String]';
      for (var i = 0, len = this.length >>> 0; i < len; i++)
      {
        if(!(i in this || isString))
          continue;
        var value = isString ? this.charAt(i) : this[i];
        if (callback.call(thisArg, value, i, this))
          return true;
      }
      return false;
    };
  }
})();