var assert = require("assert");
var router = require("../cli_router.js");
var sinon = require("sinon");

describe("joined flags", function() {
  it("should parse them separately", function() {
    var callback = sinon.spy();
    router.clear().match("-a -b -c", callback);
    router.process("-abc");
    assert(callback.called);
  });
});
