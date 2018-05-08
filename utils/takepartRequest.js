var request = require("request.js");

var domain = request.getDomain();
var takepartUrl = domain + "/api/battle/takepart";

var roomSignoutUrl = domain + "/api/battle/roomSignout";


function battleSignout(battleId,roomId,callback){
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(roomSignoutUrl, params, {
    success: function (resp) {
      if(resp.success){
        callback.success();
      }else{
        callback.fail(resp.errorMsg);
      }
    },
    fail: function (resp) {
      callback.fail("网络繁忙");
    }
  });
}


function battleTakepart(battleId,roomId,callback,danId) {
  requestBattleTakepart(battleId,roomId, {
    success: function (member) {
      callback.success(member);
    },
    fail: function (errorMsg) {
      console.log("fail");
      callback.fail(errorMsg);
    },
    battleIn:function(){

      callback.battleIn();
    },
    battleEnd:function(){
      callback.battleEnd();
    },
    roomEnd:function(){
      callback.roomEnd();
    },
    roomFull:function(){
      callback.roomFull();
    },
    beanNotEnough:function(){
      callback.beanNotEnough();
    },
    masonryNotEnough:function(){
      callback.masonryNotEnough();
    }
  },danId);
}

function requestBattleTakepart(battleId, roomId,callback,danId) {
  var params = new Object();
  params.battleId = battleId;
  params.roomId = roomId;
  if(danId){
    params.danId = danId;
  }
  request.requestWithLogin(takepartUrl, params, {
    success: function (resp) {
      console.log("resp:"+JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        //正在进行中
        if(resp.errorCode==0){
          callback.battleIn();
        //比赛已经结束
        }else if(resp.errorCode==1){
          callback.battleEnd();
        }else if(resp.errorCode==2){
          callback.roomFull();
        }else if(resp.errorCode==3){
          callback.roomEnd();
        } else if (resp.errorCode==4){
          callback.beanNotEnough();
        } else if (resp.errorCode == 5){
          callback.masonryNotEnough();
        }else{
          callback.fail();
        }
      }
    },
    fail: function (resp) {
      console.log("fail:"+JSON.stringify(resp));
      callback.fail("网络繁忙");
    }
  });
}

module.exports = {
  battleTakepart: battleTakepart,
  battleSignout: battleSignout
}