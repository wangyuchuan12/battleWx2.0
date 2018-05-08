var request = require("request.js");

var domain = request.getDomain();
var listUrl = domain + "/api/common/good/list";

function listRequest(type, callback) {
  var params = new Object();
  if(type!=null){
    params.type = type;
  }
  

  request.requestWithLogin(listUrl, params, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);

      } else {
        console.log(resp.errorMsg);
      }

    },
    fail: function () {
      console.log("fail paper answer");
    }
  });
}

module.exports = {
  listRequest: listRequest
}