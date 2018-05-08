var request = require("request.js");

var domain = request.getDomain();
var listUrl = domain + "/api/battleRoomStepIndex/list";

var receiveUrl = domain + "/api/battleRoomStepIndex/receive";

function list(battleId,roomId,callback) {
  request.requestWithLogin(listUrl, {battleId:battleId,roomId:roomId}, {
    success: function (resp) {

      console.log("......step:"+JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}

function receive(battleId,roomId,callback){
  request.requestWithLogin(receiveUrl, {battleId:battleId,roomId:roomId}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}

module.exports = {
  list: list,
  receive: receive
}