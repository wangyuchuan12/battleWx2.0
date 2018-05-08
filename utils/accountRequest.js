var request = require("request.js");

var domain = request.getDomain();

var accountInfoUrl = domain + "/api/common/login/accountInfo";

var accountResultInfoUrl = domain + "/api/battle/dan/accountResultInfo";


function accountInfo(callback){
  request.requestWithLogin(accountInfoUrl, {}, {
    success: function (resp) {
      if(resp.success){
        callback.success(resp.data);
      }else{
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function accountResultInfo(callback) {
  request.requestWithLogin(accountResultInfoUrl, {}, {
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

function payGood(good,callback){
  var id = good.id;
  if (good.costType == 2) {
    request.requestPayMentWithMasonry(id, {
      success: function () {
        callback.success();
      },
      fail: function () {
        console.log("requestMasonry fail");
        callback.fail();
      }
    });
  } else if (good.costType == 0) {
    request.requestWxPayConfig(id, {
      success: function (params) {
        request.requestPayMent(params, {
          success: function () {
            callback.success();
          },
          fail: function () {
            callback.fail();
          }
        });
      },
      fail: function () {
        callback.fail();
      }
    })
  }else if(good.costType==1){
    request.requestPayMentWithBean(id,{
      success: function () {
        callback.success();
      },
      fail: function () {
        callback.fail();
      }
    });
  }
}


module.exports = {
  accountInfo: accountInfo,
  accountResultInfo: accountResultInfo,
  payGood: payGood
}