var assert = require("assert");
var router = require("../cli_router.js");
var sinon = require("sinon");

describe("else", function() {
  it("runs if no route is matched", function() {
    var callback = sinon.spy();
    router.clear().match("-a -b", callback);
    var elseCallback = sinon.spy();
    router.else(elseCallback);
    router.process("-c");
    assert(!callback.called);
    assert(elseCallback.called);
  });
});
