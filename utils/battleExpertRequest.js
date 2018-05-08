var request = require("request.js");
var domain = request.getDomain();
var applyUrl = domain + "/api/battleExpert/apply";
var qualifiedUrl = domain + "/api/battleExpert/qualified";
var expertInfoUrl = domain + "/api/battleExpert/info";

var confirmPeriodsUrl = domain + "/api/battleExpert/confirmPeriods";

function confirmPeriods(battleId,callback){
  var params = new Object();
  params.battleId = battleId;
  request.requestWithLogin(confirmPeriodsUrl, params, {
    success: function (resp) {
      console.log("resp:"+JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        console.log(JSON.stringify(resp));
        callback.fail();
      }
    },
    fail: function () {

      callback.fail();
    }
  });
}

function apply(params,callback){
  request.requestWithLogin(applyUrl, params, {
    success: function (resp) {
      console.log("resp:"+JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        console.log(JSON.stringify(resp));
        callback.fail();
      }
    },
    fail: function () {
      
      callback.fail();
    }
  });
}

function qualified(battleId,callback){
  var params = new Object();
  params.battleId = battleId;
  request.requestWithLogin(qualifiedUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {

      callback.fail();
    }
  });
}

function info(battleId,id,callback){
  var params = new Object();
  params.id = id;
  params.battleId = battleId;
  request.requestWithLogin(expertInfoUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {

      callback.fail();
    }
  });
}

module.exports = {
  apply: apply,
  qualified: qualified,
  info:info,
  confirmPeriods: confirmPeriods
}