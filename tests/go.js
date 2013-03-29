var assert = require("assert");

var router = require("../cli_router.js");

var fakeArgs = ["node", "/users/jackf/fake.js", "-a", "5", "-b"];

describe("processing the argv array", function() {
  it("removes first two and joins into string", function() {
    var res = router.processArgv(fakeArgs);
    assert.equal("-a 5 -b", res);
  });
});


describe("processing raw process.argv", function() {
  var called = false;
  beforeEach(function() {
    router.match([["-a", "num"], "-b"], function(params) {
      called = true;
      assert("5", params.num);
    });

  });
  it("processes and matches correctly", function() {
    router.go(fakeArgs);
    assert(called);
  });
});


