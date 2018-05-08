var request = require("request.js");

var domain = request.getDomain();
var addRequestUrl = domain + "/api/battleRedpacket/add";
var typesRequestUrl = domain + "/api/battleRedpacket/types";
var listRequestUrl = domain + "/api/battleRedpacket/listByRoomId"
function addRequest(params,callback){
  request.requestWithLogin(addRequestUrl, params, {
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

function typesRequest(callback){
  var params = new Object();
  request.requestWithLogin(typesRequestUrl, params, {
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

function listByRoomIdRequest(roomId,callback){
  var params = new Object();
  params.roomId = roomId;
  request.requestWithLogin(listRequestUrl, params, {
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
  addRequest: addRequest,
  typesRequest: typesRequest,
  listByRoomIdRequest: listByRoomIdRequest
}