;(function(undefined) {
  test('Function.prototype.bind', function() {
    function A()
    {
      this.value = this.toString() + Array.prototype.join.call(arguments, '');
      return this.value;
    }

    function B()
    {
      return this.toString() + Array.prototype.join.call(arguments, '');
    }
    B.prototype = new A();

    equal(A.bind(1, 2, 3)(4), '1234', "A.bind(1, 2, 3)(4), '1234'");
    equal(A.bind(undefined, 2, 3)(4), '[object Window]234', "A.bind(undefined, 2, 3)(4), '[object Window]234'");
    equal(A.bind(1, 2, 3).call(4, 5), '1235', "A.bind(1, 2, 3).call(4, 5), '1235'");
    equal(new (A.bind(1, 2, 3))().value, '[object Object]23', "new (A.bind(1, 2, 3))().value, '[object Object]23'");
    equal(new (A.bind(undefined, 2, 3))().value, '[object Object]23', "new (A.bind(undefined, 2, 3))().value, '[object Object]23'");
    equal(B.bind(1, 2, 3)(), '123', "B.bind(1, 2, 3)(), '123'");
    equal(new (B.bind(1, 2, 3))().value, '[object Object]', "new (B.bind(1, 2, 3))().value, '[object Object]'");
    equal(new (B.bind(undefined, 2, 3))().value, '[object Object]', "new (B.bind(undefined, 2, 3))().value, '[object Object]'");

    var b = B.bind(1, 2, 3);
    var a = A.bind(1, 2, 3);
    equal(new b().value, '[object Object]', "new (B.bind(1, 2, 3))().value, '[object Object]'");


    throws(function() {
      Function.prototype.bind.call({}, 1, 2, 3);
    }, "throws Function.prototype.bind.call({}, 1, 2, 3)");
  });
})();