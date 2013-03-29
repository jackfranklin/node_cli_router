var assert = require("assert");
var router = require("../cli_router.js");
var sinon = require("sinon");

describe("before all", function() {
  it("runs just before the route callback", function() {
    var callback1 = sinon.spy();
    var callback2 = sinon.spy();
    router.match("*", callback1);
    router.before(callback2);
    router.process("-a");
    assert(callback2.called);
    assert(callback1.called);
    assert(callback2.calledBefore(callback1));
  });
});

describe("after all", function() {
  it("runs after the route callback", function() {
    var callback1 = sinon.spy();
    var callback2 = sinon.spy();
    router.clear().match("*", callback1).after(callback2);
    router.process("-a");
    assert(callback2.called);
    assert(callback1.called);
    assert(callback2.calledAfter(callback1));
  });
});
