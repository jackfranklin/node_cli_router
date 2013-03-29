
exports.removeKeyFromObject = function(obj, keyToRemove) {
  var newObj = {}
  for(var key in obj) {
    if(key !== keyToRemove) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
