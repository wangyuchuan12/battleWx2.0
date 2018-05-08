var request = require("request.js");
var domain = request.getDomain();

var battleRankDanRankUrl = domain+"/api/battleRankDan/ranks";

function ranks(callback) {
  var params = new Object();
  request.requestWithLogin(battleRankDanRankUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
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
  ranks: ranks
}