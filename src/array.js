/*
 * protocompa v0.0.1
 * https://github.com/emn178/protocompa
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
      var length = this.length >>> 0;
      for (var i = 0; i < length; i++)
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
      var length = this.length >>> 0;
      for (var i = 0; i < length; i++)
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
      var length = this.length >>> 0;
      for (var i = 0; i < length; i++)
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

      var length = this.length >>> 0;
      var isString = Object.prototype.toString.call(this) === '[object String]';
      if(fromIndex != Infinity)
        fromIndex = parseInt(fromIndex) || 0;
      if(fromIndex < -length)
        fromIndex = 0;
      else if(fromIndex < 0)
        fromIndex += length;

      for (;fromIndex < length; fromIndex++)
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

      var length = this.length >>> 0;
      var isString = Object.prototype.toString.call(this) === '[object String]';
      if(fromIndex === undefined)
        fromIndex = length;
      if(fromIndex != Infinity)
        fromIndex = parseInt(fromIndex) || 0;
      if(fromIndex > length)
        fromIndex = length;
      else if(fromIndex < 0)
        fromIndex += length;

      for (;fromIndex >= 0; fromIndex--)
      {
        var value = isString ? this.charAt(fromIndex) : this[fromIndex];
        if (value === searchElement)
          return fromIndex;
      }
      return -1;
    };
  }
})();