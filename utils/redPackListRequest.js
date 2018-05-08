var request = require("request.js");

var domain = request.getDomain();
var redPacksUrl = domain + "/api/battle/redPacks";
function redPacks(roomId,callback){
  var params = new Object();
  params.roomId = roomId;
  request.requestWithLogin(redPacksUrl, params, {
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
  redPacks: redPacks
}