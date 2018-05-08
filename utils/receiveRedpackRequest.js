var request = require("request.js");

var domain = request.getDomain();
var receiveRedpackUrl = domain + "/api/battle/receiveRedpack";

function receiveRedpack(id,battleId,roomId,callback){
  var params = new Object();
  params.id = id;
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(receiveRedpackUrl, params, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        if(resp.errorCode==1){
          callback.over();
        }else if(resp.errorCode==2){
          callback.roomProcessMeetError();
        }else if(resp.errorCode==3){
          callback.roomScoreMeetError();
        }else if(resp.errorCode==4){
          callback.roomMeetError();
        }else if(resp.errorCode==5){
          callback.personalProcessMeetError();
        } else if (resp.errorCode==6){
          callback.personalScoreMeetError();
        } else if (resp.errorCode==0){
          callback.isReceivedError();
        }else{
          callback.fail();
        }
      }
    },
    fail: function (resp) {
      callback.fail("网络繁忙");
    }
  });
}

module.exports = {
  receiveRedpack: receiveRedpack
}