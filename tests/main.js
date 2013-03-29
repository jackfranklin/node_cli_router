var assert = require("assert");

var router = require("../cli_router.js");

describe("router matching", function() {
  var called;
  beforeEach(function() {
    called = false;
    router.match(["-a", ["-i", "num"]], function(params) {
      called = true;
      assert.equal(5, params.num);
    });
  });

  it("doesn't call the callback if the route doesn't match", function() {
    router.process("-a");
    assert(!called);

    router.process("-a -i");
    assert(!called);
  });

  it("calls the callback if the route matches", function() {
    router.process("-a -i 5");
    assert(called);
  });

  it("deals with complex arguments", function() {
    router.match(["-a", ["-i", "num"], ["-p", "pull"], "-y"], function(params) {
      called = true;
      assert.equal(5, params.num);
      assert.equal(6, params.pull);
    });
    router.process("-i 5 -a -y -p 6");
    assert(called);
  });

});
describe("router matching with strings", function() {
  var called;
  beforeEach(function() {
    called = false;
    router.match("-a -b <num>", function(params) {
      called = true;
      assert.equal(5, params.num);
    });
  });

  it("parses correctly", function() {
    router.process("-a -b 5");
    assert(called);
  });

  it("doesn't care about the order", function() {
    router.process("-b 5 -a");
    assert(called);
  });
});




