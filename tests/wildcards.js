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
    assert.equal(1, Object.keys(callback.args[0][0]).length);
    assert.equal(5, callback.args[0][0].num)
  });
});
