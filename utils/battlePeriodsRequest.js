var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/periodsByBattleId";

function periodsRequest(battleId,callback){
  var params = new Object();
  params.battleId = battleId;
  request.requestWithLogin(url, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      callback.fail("网络繁忙");
    }
  });
}

module.exports = {
  periodsRequest: periodsRequest
}