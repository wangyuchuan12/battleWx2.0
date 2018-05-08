var request = require("request.js");

var domain = request.getDomain();
var url = domain + "/api/battle/battleSubjects";

var battleSubjectByBattleIdUrl = domain + "/api/battle/battleSubjectByBattleId";



function requestBattleSubjectsByBattleId(battleId,callback){
  var params = new Object();
  params.battleId = battleId;
  request.requestWithLogin(battleSubjectByBattleIdUrl, params, {
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


function getBattleSubjects(battleId,roomId,callback){
  requestBattleSubjects(battleId, roomId,{
      success:function(data){
        callback.success(data);

        if(data.isLast==1){
          callback.isLast();
        }
      },
      fail:function(resp){
        console.log("resp:"+JSON.stringify(resp));
        callback.fail();
      }
  })
}

function requestBattleSubjects(battleId, roomId,callback){
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
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
  getBattleSubjects: getBattleSubjects,
  requestBattleSubjectsByBattleId: requestBattleSubjectsByBattleId
}

