var assert = require("assert");
var sinon = require("sinon");
var router = require("../cli_router.js");

var fakeArgs = ["node", "/users/jackf/fake.js", "-a", "5", "-b"];

router.clear();

describe("processing the argv array", function() {
  it("removes first two and joins into string", function() {
    var res = router.processArgv(fakeArgs);
    assert.equal("-a 5 -b", res);
  });
});


describe("processing raw process.argv", function() {
  var callback;
  beforeEach(function() {
    callback = sinon.spy();
    router.clear();
  });
  it("processes and matches correctly", function() {
    router.match([["-a", "num"], "-b"], callback);
    router.go(fakeArgs);
    assert(callback.called);
  });
});


