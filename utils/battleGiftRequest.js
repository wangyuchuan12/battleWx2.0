var request = require("request.js");

var domain = request.getDomain();
var receiveGiftRequest = domain + "/api/battleGift/receiveGift";

function receiveGift(callback) {
  request.requestWithLogin(receiveGiftRequest, {}, {
    success: function (resp) {
      console.log("resp:"+JSON.stringify(resp));
      if (resp.success) {
        if(resp.code==0||resp.code==1){
          if (callback.isReceive){
            callback.isReceive();
          }
        }else if(resp.code == 3){
          callback.success(resp.data);
        }else if(resp.code==2){
          if (callback.unCondition){
            callback.unCondition();
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

module.exports = {
  receiveGift: receiveGift
}