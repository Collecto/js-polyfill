;(function(undefined) {
  test('String.prototype.trim', function() {
    equal( '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF\u000A test \x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF\u000A'.trim(), 'test', "'    test    '.trim(), 'test'" );

    equal( String.prototype.trim.call({}), '[object Object]', "String.prototype.trim.call({}), '[object Object]'" );
    equal( String.prototype.trim.call([]), '', "String.prototype.trim.call([]), ''" );
    equal( String.prototype.trim.call(false), 'false', "String.prototype.trim.call(false), 'false'" );
    equal( String.prototype.trim.call(9), '9', "String.prototype.trim.call(9), '9'" );
    equal( String.prototype.trim.call(NaN), 'NaN', "String.prototype.trim.call(NaN), 'NaN'" );
    equal( String.prototype.trim.call(Infinity), 'Infinity', "String.prototype.trim.call(Infinity), 'Infinity'" );
  });
})();