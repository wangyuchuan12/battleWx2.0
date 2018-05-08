var request = require("request.js");
var domain = request.getDomain();
var shareInProgressUrl = domain +"/api/battle/share/shareInProgress";
function shareInProgress(battleId,roomId,callback){
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(shareInProgressUrl, params, {
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
  shareInProgress: shareInProgress
}