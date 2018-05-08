var request = require("request.js");

var domain = request.getDomain();
var addRoomUrl = domain + "/api/battle/addRoom";

var addRoomWidthShareUrl = domain + "/api/battle/addRoomWidthShare";

function requestAddRoom(params, callback) {
  request.requestWithLogin(addRoomUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        if(resp.errorCode==0){
          callback.reCreate(resp.data);
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

function requestAddRoomWithShare(roomId,key,mininum,maxinum,callback){
  var params = new Object();
  params.roomId = roomId;
  params.key = key;
  params.mininum = mininum;
  params.maxinum = maxinum;
  console.log("mininum:" + mininum+",maxinum:"+maxinum);
  request.requestWithLogin(addRoomWidthShareUrl, params, {
    success: function (resp) {
      console.log("resp:" + JSON.stringify(resp));
      if (resp.success) {
        if(resp.code==0){
          callback.createEntry(resp.data);
        }else{
          callback.success(resp.data);
        }
       
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
  requestAddRoom: requestAddRoom,
  requestAddRoomWithShare: requestAddRoomWithShare
}