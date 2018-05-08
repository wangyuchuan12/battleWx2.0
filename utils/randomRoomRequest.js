var request = require("request.js");

var domain = request.getDomain();
var randomRoomUrl = domain + "/api/battle/randomRoom";


function randomRoom(battleId,callback) {
  var params = new Object();
  params.battleId = battleId;
  request.requestWithLogin(randomRoomUrl, params, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        if (resp.errorCode==0){
          callback.empty();
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
  randomRoom: randomRoom
}