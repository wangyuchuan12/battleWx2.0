var request = require("request.js");

var domain = request.getDomain();
var syncPapersUrl = domain + "/api/battle/syncPapersData";

function syncPapersData(battleId, roomId, callback,groupId) {
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  if(groupId){
    params.groupId = groupId;
  }

  console.log("......groupId:"+groupId);
  request.requestWithLogin(syncPapersUrl, params, {
    success: function (resp) {
      console.log("resp:"+JSON.stringify(resp));
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
  syncPapersData: syncPapersData
}