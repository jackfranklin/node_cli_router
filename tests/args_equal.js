var assert = require("assert");
var router = require("../cli_router.js");

describe("comparing argument objects", function() {
  it("returns true for matches", function() {
    var arg1 = {
      "-a": true,
      "-i": "5"
    }

    var arg2 = {
      "-a": true,
      "-i": "num"
    }

    assert(router.argsEqual(arg1, arg2));
  });


  it("returns false for non matches", function() {
    var arg3 = {
      "-i": "5"
    }

    var arg4 = {
      "-a": true,
      "-i": "num"
    }

   assert(!router.argsEqual(arg3, arg4));

   var res = router.argsEqual({
     "-a": true,
     "-i": true
   }, {
     "-a": true,
     "-i": "num"
   });

   assert.equal(false, res);
  });
});

