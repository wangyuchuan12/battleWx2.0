var request = require("request.js");
var domain = request.getDomain();
var dekornListRequestUrl = domain + "/api/battle/dekorn/dekornList";
var battleDekornSignUrl = domain + "/api/battle/dekorn/battleDekornSign"
var dekornRoomInfoUrl = domain + "/api/battle/dekorn/dekornRoomInfo"
function dekornList(callback) {
  request.requestWithLogin(dekornListRequestUrl, { }, {
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

function dekornRoomInfo(battleId,roomId,callback) {
  request.requestWithLogin(dekornRoomInfoUrl, {battleId:battleId,roomId:roomId}, {
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

function battleDekornSign(dekornId,callback){
  request.requestWithLogin(battleDekornSignUrl, { dekornId: dekornId}, {
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
  dekornList: dekornList,
  battleDekornSign: battleDekornSign,
  dekornRoomInfo: dekornRoomInfo
}