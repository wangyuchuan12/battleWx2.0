var request = require("request.js");

var domain = request.getDomain();
var roomRecordsUrl = domain + "/api/battle/roomRecords";

function roomRecords(roomId, callback) {
  var params = new Object();
  params.roomId = roomId;
  request.requestWithLogin(roomRecordsUrl, params, {
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
  roomRecords: roomRecords
}