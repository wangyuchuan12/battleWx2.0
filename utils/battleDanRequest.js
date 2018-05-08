var request = require("request.js");

var battleMemberInfoRequest = require("battleMemberInfoRequest.js");

var domain = request.getDomain();
var listUrl = domain + "/api/battle/dan/list";

var infoUrl = domain + "/api/battle/dan/danInfo";

var tasksUrl = domain + "/api/battle/dan/tasks";
var startPassThroughUrl = domain + "/api/battle/dan/startPassThrough";

var receiveTaskRewardUrl = domain + "/api/battle/dan/receiveTaskReward";

var passThroughTakepartRoomUrl = domain + "/api/battle/dan/passThroughTakepartRoom";

var danRoomInfoUrl = domain + "/api/battle/dan/danRoomInfo";

var battleDanSignUrl = domain + "/api/battle/dan/battleDanSign";
function tasksRequest(danId,callback){
  request.requestWithLogin(tasksUrl, { danId: danId }, {
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

function danRoomInfo(danId,callback){
  request.requestWithLogin(danRoomInfoUrl, { danId: danId }, {
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

function danSign(danId,callback){
  request.requestWithLogin(battleDanSignUrl, { danId: danId }, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        if(resp.errorCode==0){
          callback.beanNotEnough();
        }else{
          callback.fail();
        }
        
      }
    },
    fail: function () {

      callback.fail();
    }
  });
}

function receiveTaskReward(taskId,callback){
  request.requestWithLogin(receiveTaskRewardUrl, { taskId: taskId }, {
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

function startPassThroughRequest(projectId,danId, callback) {
  request.requestWithLogin(startPassThroughUrl, { danId: danId,projectId:projectId }, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
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

function passThroughTakepartRoomRequest(passThroughId,roomId,battleId, callback) {
  request.requestWithLogin(passThroughTakepartRoomUrl, { passThroughId: passThroughId,roomId,battleId}, {
    success: function (resp) {
      if (resp.success) {
        var memberInfo = resp.data;
        battleMemberInfoRequest.setBattleMemberInfoFromCache(memberInfo);
        if (resp.success) {
          callback.success(resp.data);
        } else {
          //正在进行中
          if (resp.errorCode == 0) {
            callback.battleIn();
            //比赛已经结束
          } else if (resp.errorCode == 1) {
            callback.battleEnd();
          } else if (resp.errorCode == 2) {
            callback.roomFull();
          } else if (resp.errorCode == 3) {
            callback.roomEnd();
          } else if (resp.errorCode == 4) {
            callback.beanNotEnough();
          } else if (resp.errorCode == 5) {
            callback.masonryNotEnough();
          } else {
            callback.fail();
          }
        }
      } else {
        callback.fail();
      }
    },
    fail: function () {

      callback.fail();
    }
  });
}


function infoRequest(danId,callback){
  request.requestWithLogin(infoUrl, {danId:danId}, {
    success: function (resp) {
      console.log("resp:"+JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        if (resp.errorCode == 0) {
          callback.reCreate(resp.data);
        } else {
          callback.fail();
        }
      }
    },
    fail: function () {

      callback.fail();
    }
  });
}

function listRequest(callback){
  request.requestWithLogin(listUrl, {}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        if (resp.errorCode == 0) {
          callback.reCreate(resp.data);
        } else {
          callback.fail();
        }
      }
    },
    fail: function () {

      callback.fail();
    }
  });
}

module.exports = {
  listRequest: listRequest,
  infoRequest: infoRequest,
  tasksRequest: tasksRequest,
  startPassThroughRequest: startPassThroughRequest,
  passThroughTakepartRoomRequest: passThroughTakepartRoomRequest,
  receiveTaskReward: receiveTaskReward,
  danRoomInfo: danRoomInfo,
  danSign: danSign
}
