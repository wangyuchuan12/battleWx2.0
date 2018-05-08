var request = require("request.js");

var domain = request.getDomain();
var currentLoveCoolingUrl = domain + "/api/battle/currentLoveCooling";
var speedCoolBeanUrl = domain + "/api/battle/speed_cool_bean";
function currentLoveCooling(battleId,roomId,callback) {
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(currentLoveCoolingUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function (resp) {
      callback.fail("网络繁忙");
    }
  });
}

function speedCoolRequest(battleId,roomId,callback){
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(speedCoolBeanUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function (resp) {
      callback.fail("网络繁忙");
    }
  });
}

module.exports = {
  currentLoveCooling: currentLoveCooling,
  speedCoolRequest: speedCoolRequest
}