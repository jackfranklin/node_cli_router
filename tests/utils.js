var assert = require("assert");
var utils = require("../utils.js");

describe("utility methods", function() {
  describe("removeKeyFromObject", function() {
    it("removes the key from an object", function() {
      var test = { a: 2, b: 3 };
      var res = utils.removeKeyFromObject(test, "b");
      assert(!res.b);
      assert.equal(2, res.a);
    });
  });
});
