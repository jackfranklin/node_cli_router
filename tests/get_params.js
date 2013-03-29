var assert = require("assert");
var router = require("../cli_router.js");


describe("forming the params for the callback", function() {
  var p = router.getParams({
    "-a": true,
    "-i": 5
  }, {
    "-a": true,
    "-i": "num"
  });
  assert.equal(5, p.num);
});
