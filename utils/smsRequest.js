var request = require("request.js");

var domain = request.getDomain();

var authCodeUrl = domain + "/api/common/sms/authCode"
function authCode(phonenumber,project,callback){
  var params = new Object();
  params.phonenumber = phonenumber;
  params.project = project;
  request.requestWithLogin(authCodeUrl, params, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
      if (resp.success) {
        callback.success();
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
  authCode: authCode
}