var request = require("request.js");

var domain = request.getDomain();
var battleNoticeUrl = domain + "/api/battleNotice/receiveNotice";


function receiveMemberNoticeLoop(roomId,callback){
  var flagObject = new Object();
  flagObject.flag = false;
  requestReceiveNotice(roomId,0,{
    success:function(data){
      callback.success(data);
    },
    fail:function(){
      callback.fail();
     
    }
  });
  var funCallback = new Object();
  funCallback.next = function(){
    receiveMemberNoticeLoop(roomId, callback);
  }
  return funCallback;
}

function receiveRoomNoticeLoop(roomId, callback) {
  var flagObject = new Object();
  flagObject.flag = false;
  requestReceiveNotice(roomId, 1, {
    success: function (data) {
      callback.success(data);
    },
    fail: function () {
      callback.fail();

    }
  });

  var funCallback = new Object();

  var funCallback = new Object();
  funCallback.next = function () {
    receiveRoomNoticeLoop(roomId, callback);
  }
  return funCallback;
}


function requestReceiveNotice(roomId, type, callback) {
  request.requestWithLogin(battleNoticeUrl,
   {roomId:roomId,type:type}, {
    success:function(resp){
      console.log("..................1");
      if(resp.success){
        callback.success(resp.data);
      }else{
        callback.fail();
      }
    },
    fail:function(){
      console.log("..................2");
      callback.fail();
    }
  });
}

module.exports = {
  requestReceiveNotice: requestReceiveNotice,
  receiveMemberNoticeLoop: receiveMemberNoticeLoop,
  receiveRoomNoticeLoop: receiveRoomNoticeLoop
}