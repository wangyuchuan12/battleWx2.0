var request = require("request.js");

var domain = request.getDomain();
var redPackDistributionsUrl = domain + "/api/battle/redPackDistributions";
function redPackDistributions(id,battleId,roomId,callback){
  var params = new Object();
  params.redPackId = id;
  params.battleId = battleId;
  params.roomId = roomId;
  request.requestWithLogin(redPackDistributionsUrl, params, {
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
  redPackDistributions: redPackDistributions
}