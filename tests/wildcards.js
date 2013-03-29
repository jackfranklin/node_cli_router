var assert = require("assert");

var router = require("../cli_router.js");
var sinon = require("sinon");

describe("wildcard matching", function() {
  var callback;
  beforeEach(function() {
    router.clear();
    callback = sinon.spy();
  });

  it("lets user define a wildcard", function() {
    router.match("-a *", callback);
    router.process("-a -b -c");
    assert(callback.called);
  });

  it("deals with arguments", function() {
    router.match("-a -b <num> *", callback);
    router.process("-a -b 5 -c -d");
    assert(callback.called);
    var args = callback.args[0][0];
    assert.equal(5, args.num)
    assert(args.a);
    assert(args.c);
    assert(args.d);
  });

  it("passes in params that were in wildcard", function() {
    router.match("-a *", callback);
    router.process("-a -b 5");
    assert(callback.called);
    var args = callback.args[0][0];
    assert.equal(5, args.b);
    assert(true, args.a);
  });
});
