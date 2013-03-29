var router = {
  matches: [],
  processMatch: function(args) {
    var res = { WILDCARD: false }
    if(args.route instanceof Array) {
      args.route.forEach(function(item) {
        if(item instanceof Array) {
          res[item[0]] = item[1];
        } else {
          res[item] = true;
        }
      });
    } else {
      var str = args.route;
      if(str.indexOf("*") > -1) {
        str = str.split("*")[0];
        res.WILDCARD = true;
      }
      var split = str.split("-")
        .filter(function(item) { return !!item; })
        .map(function(item) {
          return item.trim();
        });
      split.forEach(function(item) {
        if(item.indexOf(" ") > -1) {
          var arrayArg = item.split(" ");
          var params = arrayArg.splice(1).join(" ");
          params = params.replace(/<|>/g, "");
          var flag = arrayArg[0];
          res["-" + flag] = params;
        } else {
          res["-" + item] = true;
        }
      });
    }
    return res;
  },
  match: function(match, callback, context) {
    this.matches.push({ route: match, cb: callback, context: context });
  },
  processArgString: function(str) {
    var res = {}
    var split = str.split("-")
      .filter(function(item) { return !!item; })
      .map(function(item) {
        return item.trim();
      });

    split.forEach(function(item) {
      if(item.indexOf(" ") > -1) {
        var arrayArg = item.split(" ");
        var params = arrayArg.splice(1)
        var flag = arrayArg[0]
        res["-" + flag] = params.join(" ");
      } else {
        res["-" + item] = true;
      }
    });
    return res;
  },
  removeKeyFromObject: function(obj, keyToRemove) {
    var newObj = {}
    for(var key in obj) {
      if(key !== keyToRemove) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  },
  argsEqual: function(userArg, matchArg) {
    if(matchArg.WILDCARD === true) {
      matchArg = this.removeKeyFromObject(matchArg, "WILDCARD");
      for(var key in matchArg) {
        if(userArg[key]){
          if(typeof matchArg[key] !== typeof userArg[key]) {
            return false;
          }
        } else {
          return false;
        }
      }

      return true;

    } else {
      matchArg = this.removeKeyFromObject(matchArg, "WILDCARD");
      if(Object.keys(userArg).length !== Object.keys(matchArg).length) {
        return false;
      }
      for(var key in userArg) {
        if(matchArg[key]) {
          if(typeof matchArg[key] !== typeof userArg[key]) {
            return false;
          }
        } else {
          return false;
        }
      };
      return true;
    }

  },
  getParams: function(user, match) {
    var res = {};
    for(var key in user) {
      if(match[key] === true) {
        continue;
      }
      res[match[key]] = user[key];
    };

    return res;
  },
  process: function(str) {
    var argString = this.processArgString(str);
    for(var i = 0; i < router.matches.length; i++) {
      var item = router.matches[i];
      var argMatch = router.processMatch(item);
      var doMatch = this.argsEqual(argString, argMatch);
      if(doMatch) {
        var params = this.getParams(argString, argMatch);
        item.cb.call(item.context || this, params);
        return true;
      }
    }
  },
  processArgv: function(argv) {
    return argv.slice(2).join(" ");
  },
  go: function(argsAry) {
    var processed = this.processArgv(argsAry);
    this.process(processed);
  }
};

module.exports = router;




