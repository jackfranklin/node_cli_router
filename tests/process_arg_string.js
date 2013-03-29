var assert = require("assert");
var router = require("../cli_router.js");

describe("processing the argument string", function() {
  it("sets passed in flags to true", function() {
    var res1 = router.processArgString("-a -b -c");
    assert(res1["-a"])
    assert(res1["-b"])
    assert(res1["-c"])
  });

  it("sets values for flags with a value", function() {
    var res2 = router.processArgString("-a 5 -b -c -d 4");
    assert.equal("5", res2["-a"]);
    assert.equal("4", res2["-d"]);
    assert(res2["-b"])
    assert(res2["-c"])
  });
});




