var assert = require("assert");

var router = require("../cli_router.js");
var sinon = require("sinon");

describe("wildcard matching", function() {
  var callback = sinon.spy();

  beforeEach(function() {
    router.match("-a *", callback);
  });

  it("lets user define a wildcard", function() {
    router.process("-a -b -c");
    assert(callback.called);
  });
});
