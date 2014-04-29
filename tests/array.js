;(function(undefined) {
  // module( 'Array' );

  test('Array.isArray', function() {
    ok( Array.isArray([]), 'Array.isArray([])' );
    ok( !Array.isArray({}), '!Array.isArray({})' );
  });

  function greaterThan8(element, index, array) {
    return element > 8;
  }

  function testCallback(element, index, array) {
    return element == array[index] && this !== 123 && this == 123;
  }

  var total = 0;
  function sum(element, index, array) {
    total += element;
  }

  function double(element, index, array) {
    return element * 2;
  }

  function join(previousValue, currentValue, index, array) {
    return previousValue + String(currentValue);
  }

  test('Array.prototype.every', function() {
    ok( ![12, 5, 8, 130, 44].every(greaterThan8), '![12, 5, 8, 130, 44].every(greaterThan8)' );
    ok( [12, 54, 18, 130, 44].every(greaterThan8), '[12, 54, 18, 130, 44].every(greaterThan8)' );
    ok( [0, false, undefined, '', [], {}].every(testCallback, 123), 'testCallback' );

    ok( !Array.prototype.every.call({'0': 1, '1': 9, 'length': 2}, greaterThan8), "!Array.prototype.every.call({'0': 1, '1': 9, 'length': 2}, greaterThan8)" );
    ok( Array.prototype.every.call({'length': 2}, greaterThan8), "Array.prototype.every.call({'length': 2}, greaterThan8)" );
    ok( !Array.prototype.every.call('321', greaterThan8), "Array.prototype.every.call('321', greaterThan8)" );
    ok( Array.prototype.every.call('999', greaterThan8), "Array.prototype.every.call('999', greaterThan8)" );
    
    ok( Array.prototype.every.call(false, greaterThan8), "Array.prototype.every.call(false, greaterThan8)" );
    ok( Array.prototype.every.call(-1, greaterThan8), "Array.prototype.every.call(-1, greaterThan8)" );
    ok( Array.prototype.every.call(NaN, greaterThan8), "Array.prototype.every.call(NaN, greaterThan8)" );
    ok( Array.prototype.every.call(Infinity, greaterThan8), "Array.prototype.every.call(Infinity, greaterThan8)" );
  });

  test('Array.prototype.filter', function() {
    equal( [12, 5, 8, 130, 44].filter(greaterThan8).length, 3, '[12, 5, 8, 130, 44].filter(greaterThan8).length, 3' );
    equal( [0, false, undefined, '', [], {}].filter(testCallback, 123).length, 6, 'testCallback' );

    equal( Array.prototype.filter.call({'0': 1, '1': 9, 'length': 2}, greaterThan8).length, 1, "Array.prototype.filter.call({'0': 1, '1': 9, 'length': 2}, greaterThan8).length, 1" );
    equal( Array.prototype.filter.call({'length': 2}, greaterThan8).length, 0, "Array.prototype.filter.call({'length': 2}, greaterThan8).length, 0" );
    equal( Array.prototype.filter.call('321', greaterThan8).length, 0, "Array.prototype.filter.call('321', greaterThan8).length, 0" );
    equal( Array.prototype.filter.call('999', greaterThan8).length, 3, "Array.prototype.filter.call('999', greaterThan8).length, 3" );

    equal( Array.prototype.filter.call(false, greaterThan8).length, 0, "Array.prototype.filter.call(false, greaterThan8).length, 0" );
    equal( Array.prototype.filter.call(9, greaterThan8).length, 0, "Array.prototype.filter.call(9, greaterThan8).length, 0" );
    equal( Array.prototype.filter.call(NaN, greaterThan8).length, 0, "Array.prototype.filter.call(NaN, greaterThan8).length, 0" );
    equal( Array.prototype.filter.call(Infinity, greaterThan8).length, 0, "Array.prototype.filter.call(Infinity, greaterThan8).length, 0" );
  });

  test('Array.prototype.forEach', function() {
    total = 0;
    [12, 5, 8, 130, 44].forEach(sum);
    equal(total, 199, "[12, 5, 8, 130, 44].forEach(sum), 199");

    total = 0;
    Array.prototype.forEach.call({'0': 1, '1': 9, 'length': 2}, sum);
    equal(total, 10, "Array.prototype.forEach.call({'0': 1, '1': 9, 'length': 2}, sum), 10");

    total = 0;
    Array.prototype.forEach.call({'length': 2}, sum);
    equal(total, 0, "Array.prototype.forEach.call({'length': 2}, sum), 0");

    total = 0;
    Array.prototype.forEach.call('321', sum);
    equal(total, '0321', "Array.prototype.forEach.call('321', sum), '0321'");

    total = 0;
    Array.prototype.forEach.call(false, sum);
    equal(total, 0, "Array.prototype.forEach.call(false, sum), 0");

    total = 0;
    Array.prototype.forEach.call(123, sum);
    equal(total, 0, "Array.prototype.forEach.call(123, sum), 0");

    total = 0;
    Array.prototype.forEach.call(NaN, sum);
    equal(total, 0, "Array.prototype.forEach.call(NaN, sum), 0");

    total = 0;
    Array.prototype.forEach.call(Infinity, sum);
    equal(total, 0, "Array.prototype.forEach.call(Infinity, sum), 0");
  });

  test('Array.prototype.indexOf', function() {
    equal([12, 5, 8, 5, 44].indexOf(5), 1, "[12, 5, 8, 5, 44].indexOf(5), 1");
    equal([12, 5, 8, 5, 44].indexOf(5, 2), 3, "[12, 5, 8, 5, 44].indexOf(5, 2), 3");
    equal([12, 5, 8, 5, 44].indexOf(5, 4), -1, "[12, 5, 8, 5, 44].indexOf(5, 4), -1");
    equal([12, 5, 8, 5, 44].indexOf(5, 6), -1, "[12, 5, 8, 5, 44].indexOf(5, 6), -1");
    equal([12, 5, 8, 5, 44].indexOf(5, -1), -1, "[12, 5, 8, 5, 44].indexOf(5, -1), -1");
    equal([12, 5, 8, 5, 44].indexOf(5, -3), 3, "[12, 5, 8, 5, 44].indexOf(5, -3), 3");
    equal([12, 5, 8, 5, 44].indexOf(5, -5), 1, "[12, 5, 8, 5, 44].indexOf(5, -5), 1");
    equal([12, 5, 8, 5, 44].indexOf(5, -7), 1, "[12, 5, 8, 5, 44].indexOf(5, -7), 1");
    equal([12, 5, 8, 5, 44].indexOf(5, 1.5), 1, "[12, 5, 8, 5, 44].indexOf(5, 1.5), 1");
    equal([12, 5, 8, 5, 44].indexOf(5, -3.5), 3, "[12, 5, 8, 5, 44].indexOf(5, -3.5), 3");
    equal([12, 5, 8, 5, 44].indexOf(5, Infinity), -1, "[12, 5, 8, 5, 44].indexOf(5, Infinity), -1");
    equal([12, 5, 8, 5, 44].indexOf(5, -Infinity), 1, "[12, 5, 8, 5, 44].indexOf(5, -Infinity), 1");
    equal([12, 5, 8, 5, 44].indexOf(5, NaN), 1, "[12, 5, 8, 5, 44].indexOf(5, NaN), 1");
    equal([12, 5, 8, 5, 44].indexOf(5, 'A'), 1, "[12, 5, 8, 5, 44].indexOf(5, 'A'), 1");
    equal([12, 5, 8, 5, 44].indexOf(5, false), 1, "[12, 5, 8, 5, 44].indexOf(5, false), 1");
    equal([12, 5, 8, 5, 44].indexOf(5, {}), 1, "[12, 5, 8, 5, 44].indexOf(5, {}), 1");
    equal([12, 5, 8, 5, 44].indexOf(5, []), 1, "[12, 5, 8, 5, 44].indexOf(5, []), 1");

    equal(Array.prototype.indexOf.call({'0': 1, '1': 9, 'length': 2}, 9), 1, "Array.prototype.indexOf.call({'0': 1, '1': 9, 'length': 2}, 9), 1");
    equal(Array.prototype.indexOf.call({'length': 2}, 9), -1, "Array.prototype.indexOf.call({'length': 2}, 9), -1");

    equal(Array.prototype.indexOf.call('321', '1'), 2, "Array.prototype.indexOf.call('321', '1'), 2");
    equal(Array.prototype.indexOf.call('999', 9), -1, "Array.prototype.indexOf.call('999', 9), -1");

    equal(Array.prototype.indexOf.call(false, false), -1, "Array.prototype.indexOf.call(false, false), -1");
    equal(Array.prototype.indexOf.call(123, 123), -1, "Array.prototype.indexOf.call(123, 123), -1");
    equal(Array.prototype.indexOf.call(NaN, NaN), -1, "Array.prototype.indexOf.call(NaN, NaN), -1");
    equal(Array.prototype.indexOf.call(Infinity, Infinity), -1, "Array.prototype.indexOf.call(Infinity, Infinity), -1");
  });

  test('Array.prototype.lastIndexOf', function() {
    equal([12, 5, 8, 5, 44].lastIndexOf(5), 3, "[12, 5, 8, 5, 44].lastIndexOf(5), 3");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, 2), 1, "[12, 5, 8, 5, 44].lastIndexOf(5, 2), ");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, 4), 3, "[12, 5, 8, 5, 44].lastIndexOf(5, 4), 3");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, 6), 3, "[12, 5, 8, 5, 44].lastIndexOf(5, 6), 3");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, -1), 3, "[12, 5, 8, 5, 44].lastIndexOf(5, -1), 3");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, -3), 1, "[12, 5, 8, 5, 44].lastIndexOf(5, -3), 1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, -5), -1, "[12, 5, 8, 5, 44].lastIndexOf(5, -5), -1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, -7), -1, "[12, 5, 8, 5, 44].lastIndexOf(5, -7), -1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, 1.5), 1, "[12, 5, 8, 5, 44].lastIndexOf(5, 1.5), 1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, -3.5), 1, "[12, 5, 8, 5, 44].lastIndexOf(5, -3.5), 1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, Infinity), 3, "[12, 5, 8, 5, 44].lastIndexOf(5, Infinity), 3");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, -Infinity), -1, "[12, 5, 8, 5, 44].lastIndexOf(5, -Infinity), -1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, NaN), -1, "[12, 5, 8, 5, 44].lastIndexOf(5, NaN), -1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, 'A'), -1, "[12, 5, 8, 5, 44].lastIndexOf(5, 'A'), -1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, false), -1, "[12, 5, 8, 5, 44].lastIndexOf(5, false), 1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, {}), -1, "[12, 5, 8, 5, 44].lastIndexOf(5, {}), 1");
    equal([12, 5, 8, 5, 44].lastIndexOf(5, []), -1, "[12, 5, 8, 5, 44].lastIndexOf(5, []), 1");
    

    equal(Array.prototype.lastIndexOf.call({'0': 1, '1': 9, 'length': 2}, 9), 1, "Array.prototype.lastIndexOf.call({'0': 1, '1': 9, 'length': 2}, 9), 1");
    equal(Array.prototype.lastIndexOf.call({'length': 2}, 9), -1, "Array.prototype.lastIndexOf.call({'length': 2}, 9), -1");

    equal(Array.prototype.lastIndexOf.call('321', '1'), 2, "Array.prototype.lastIndexOf.call('321', '1'), 2");
    equal(Array.prototype.lastIndexOf.call('999', 9), -1, "Array.prototype.lastIndexOf.call('999', 9), -1");

    equal(Array.prototype.lastIndexOf.call(false, false), -1, "Array.prototype.lastIndexOf.call(false, false), -1");
    equal(Array.prototype.lastIndexOf.call(123, 123), -1, "Array.prototype.lastIndexOf.call(123, 123), -1");
    equal(Array.prototype.lastIndexOf.call(NaN, NaN), -1, "Array.prototype.lastIndexOf.call(NaN, NaN), -1");
    equal(Array.prototype.lastIndexOf.call(Infinity, Infinity), -1, "Array.prototype.lastIndexOf.call(Infinity, Infinity), -1");
  });

  test('Array.prototype.map', function() {
    equal([12, 5, 8, 130, 44].map(double).join(','), '24,10,16,260,88', "[12, 5, 8, 130, 44].map(double).join(','), '24,10,16,260,88'");

    equal(Array.prototype.map.call({'0': 1, '1': 9, 'length': 2}, double).join(','), '2,18', "Array.prototype.map.call({'0': 1, '1': 9, 'length': 2}, double).join(','), '2,18'");
    equal(Array.prototype.map.call({'length': 2}, double).join(','), ',', "Array.prototype.map.call({'length': 2}, double).join(','), ','");

    equal(Array.prototype.map.call('321', double).join(','), '6,4,2', "Array.prototype.map.call('321', double).join(','), '6,4,2'");

    equal(Array.prototype.map.call(false, double).join(','), '', "Array.prototype.map.call(false, double).join(','), ''");
    equal(Array.prototype.map.call(123, double).join(','), '', "Array.prototype.map.call(123, double).join(','), ''");
    equal(Array.prototype.map.call(NaN, double).join(','), '', "Array.prototype.map.call(NaN, double).join(','), ''");
    equal(Array.prototype.map.call(Infinity, double).join(','), '', "Array.prototype.map.call(Infinity, double).join(','), ''");
  });

  test('Array.prototype.reduce', function() {
    equal([12, 5, 8, 130, 44].reduce(join), '125813044', "[12, 5, 8, 130, 44].reduce(join), '125813044'");
    equal([12, 5, 8, 130, 44].reduce(join, 10), '10125813044', "[12, 5, 8, 130, 44].reduce(join, 10), '10125813044'");

    equal(Array.prototype.reduce.call({'0': 1, '1': 9, 'length': 2}, join), '19', "Array.prototype.reduce.call({'0': 1, '1': 9, 'length': 2}, join), '19'");

    throws(function() {
      Array.prototype.reduce.call({'length': 2}, join);
    }, "throws Array.prototype.reduce.call({'length': 2}, join)");

    equal(Array.prototype.reduce.call('321', join), '321', "Array.prototype.reduce.call('321', join), '321'");

    throws(function() {
      Array.prototype.reduce.call(false, join);
    }, "throws Array.prototype.reduce.call(false, join)");
    throws(function() {
      Array.prototype.reduce.call(123, join);
    }, "throws Array.prototype.reduce.call(123, join)");
    throws(function() {
      Array.prototype.reduce.call(NaN, join);
    }, "throws Array.prototype.reduce.call(NaN, join)");
    throws(function() {
      Array.prototype.reduce.call(Infinity, join);
    }, "throws Array.prototype.reduce.call(Infinity, join)");
  });

  test('Array.prototype.reduceRight', function() {
    equal([12, 5, 8, 130, 44].reduceRight(join), '441308512', "[12, 5, 8, 130, 44].reduceRight(join), '441308512'");
    equal([12, 5, 8, 130, 44].reduceRight(join, 10), '10441308512', "[12, 5, 8, 130, 44].reduceRight(join, 10), '10441308512'");

    equal(Array.prototype.reduceRight.call({'0': 1, '1': 9, 'length': 2}, join), '91', "Array.prototype.reduceRight.call({'0': 1, '1': 9, 'length': 2}, join), '91'");

    throws(function() {
      Array.prototype.reduceRight.call({'length': 2}, join);
    }, "throws Array.prototype.reduceRight.call({'length': 2}, join)");

    equal(Array.prototype.reduceRight.call('321', join), '123', "Array.prototype.reduceRight.call('123', join), '321'");

    throws(function() {
      Array.prototype.reduceRight.call(false, join);
    }, "throws Array.prototype.reduceRight.call(false, join)");
    throws(function() {
      Array.prototype.reduceRight.call(123, join);
    }, "throws Array.prototype.reduceRight.call(123, join)");
    throws(function() {
      Array.prototype.reduceRight.call(NaN, join);
    }, "throws Array.prototype.reduceRight.call(NaN, join)");
    throws(function() {
      Array.prototype.reduceRight.call(Infinity, join);
    }, "throws Array.prototype.reduceRight.call(Infinity, join)");
  });


  test('Array.prototype.some', function() {
    ok( ![2, 5, 8, 1, 4].some(greaterThan8), '![2, 5, 8, 1, 4].some(greaterThan8)' );
    ok( [12, 54, 18, 130, 44].some(greaterThan8), '[12, 54, 18, 130, 44].some(greaterThan8)' );
    ok( [0, false, undefined, '', [], {}].some(testCallback, 123), 'testCallback' );

    ok( Array.prototype.some.call({'0': 1, '1': 9, 'length': 2}, greaterThan8), "Array.prototype.some.call({'0': 1, '1': 9, 'length': 2}, greaterThan8)" );
    ok( !Array.prototype.some.call({'length': 2}, greaterThan8), "!Array.prototype.some.call({'length': 2}, greaterThan8)" );
    ok( !Array.prototype.some.call('321', greaterThan8), "Array.prototype.some.call('321', greaterThan8)" );
    ok( Array.prototype.some.call('999', greaterThan8), "Array.prototype.some.call('999', greaterThan8)" );
    
    ok( !Array.prototype.some.call(false, greaterThan8), "!Array.prototype.some.call(false, greaterThan8)" );
    ok( !Array.prototype.some.call(-1, greaterThan8), "!Array.prototype.some.call(-1, greaterThan8)" );
    ok( !Array.prototype.some.call(NaN, greaterThan8), "!Array.prototype.some.call(NaN, greaterThan8)" );
    ok( !Array.prototype.some.call(Infinity, greaterThan8), "!Array.prototype.some.call(Infinity, greaterThan8)" );
  });
})();