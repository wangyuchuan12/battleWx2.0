var request = require("request.js");
var domain = request.getDomain();
var supperLoveUrl = domain + "/api/battle/supperLove";

function syncPapersData(battleId, roomId, callback) {
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(supperLoveUrl, params, {
    success: function (resp) {
      console.log("..sdsds:resp:"+JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        if (resp.errorCode==1){
          callback.loveIsFull();
        } else if (resp.errorCode == 0){
          callback.superloveNotEnough();
        }
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

module.exports = {
  syncPapersData: syncPapersData
}