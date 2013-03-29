var assert = require("assert");
var router = require("../cli_router.js");
var sinon = require("sinon")

describe("chaining", function() {
  it("lets match(), clear() and before() be chained", function() {
    var callback1 = sinon.spy();
    var callback2 = sinon.spy();
    router.clear().match("*", callback1).before(callback2).process("-a");
    assert(callback2.called);
    assert(callback1.called);
    assert(callback2.calledBefore(callback1));
  });
});
