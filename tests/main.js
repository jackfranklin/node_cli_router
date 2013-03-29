var assert = require("assert");

var sinon = require("sinon");
var router = require("../cli_router.js");

describe("router matching", function() {
  var callback, called;
  beforeEach(function() {
    callback = sinon.spy();
    called = false;
    router.clear();
  });

  it("doesn't call the callback if the route doesn't match", function() {
    router.match(["-a", ["-i", "num"]], callback);
    router.process("-a");
    assert(!callback.called);

    router.process("-a -i");
    assert(!callback.called);
  });

  it("calls the callback if the route matches", function() {
    router.match(["-a", ["-i", "num"]], callback);
    router.process("-a -i 5");
    assert(callback.called);
    var args = callback.args[0][0];
    assert.equal(5, args.num);
    assert.equal(2, Object.keys(args).length);
  });

  it("deals with complex arguments", function() {
    router.match(["-a", ["-i", "num"], ["-p", "pull"], "-y"], callback);
    router.process("-i 5 -a -y -p 6");
    assert(callback.called);
    var args = callback.args[0][0];
    assert.equal(5, args.num);
    assert.equal(6, args.pull);
    assert.equal(4, Object.keys(args).length);
  });

});
describe("router matching with strings", function() {
  var callback;
  beforeEach(function() {
    callback = sinon.spy();
    router.clear();
  });

  it("parses correctly", function() {
    router.match("-a -b <num>", callback);
    router.process("-a -b 5");
    assert(callback.called);
  });

  it("doesn't care about the order", function() {
    router.match("-a -b <num", callback);
    router.process("-b 5 -a");
    assert(callback.called);
  });
});




