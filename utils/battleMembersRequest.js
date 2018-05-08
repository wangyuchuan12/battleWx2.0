var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/members";
var battleMembers = wx.getStorageSync("battleMembers");
var flag = false;

function setBattleMembersCache(members){
  battleMembers = members;
}

function getBattleMembers(battleId,roomId, callback,time,groupId) {
  requestBattleMembers(battleId, roomId, groupId, {
    success: function (members) {
      callback.success(members);
    },
    fail: function () {
      callback.fail();
    }
  });

}

function requestBattleMembers(battleId,roomId,groupId,callback){
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  if(groupId){
    params.groupId = groupId;
  }
  request.requestWithLogin(url, params, {
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
  getBattleMembers: getBattleMembers,
  battleMembers: battleMembers,
  setBattleMembersCache: setBattleMembersCache
}