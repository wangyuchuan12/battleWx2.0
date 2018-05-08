//var domain = "http://www.vlingquan.com";
var domain = "https://www.chengxihome.com";
//var domain = "http://www.fisherman7.com";
//var domain = "http://192.168.0.101";
//根据code登陆用户bbin
var loginByJsCodeUrl = domain + "/api/common/login/loginByJsCode";
var registerUserByJsCode = domain + "/api/common/login/registerUserByJsCode";
var wxPayConfigUrl = domain + "/api/battle/wxPayConfig";
var loadFileUrl = domain + "/api/common/resource/upload";

var masonryPayUrl = domain + "/api/battle/masonryPay";

var beanPayUrl = domain + "/api/battle/beanPay";

var createPaymemberVoucherUrl = domain +"/api/battle/createPaymemberVoucher";
var token;
var isLogin;

var openSettingFlag = false;

var openUserSettingCallbacks = new Array();

var loginLuck = false;

//请求总函数，是所有请求的工具


function getDomain() {
  return domain;
}

function requestWithLogin(url, params, callback) {
  if (!isLogin) {
    requestLogin({
      success: function () {
        request(url, params, callback)
      },
      fail: function () {
        callback.fail();
      }
    })
  } else {
    request(url, params, callback)
  }

}

function requestUpload(filePath, callback) {
  var sessionId = wx.getStorageSync("SESSIONID");
  var header;
  if (sessionId) {
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': 'JSESSIONID=' + sessionId
    }
  } else {
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
  wx.uploadFile({
    url: loadFileUrl,
    filePath: filePath,
    name: 'file',
    header: header,
    success: function (resp) {
      if (resp.statusCode == 200) {
        callback.success(JSON.parse(resp.data));
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function request(url, params, callback, data) {
  var sessionId = wx.getStorageSync("SESSIONID");
  var header;
  if (sessionId) {
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cookie': 'JSESSIONID=' + sessionId
    }
  } else {
    header = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }

  token = 'e859df6b-a182-4f8a-8dc2-7059cc77ca3a';
  //token = 'adebd855-6c2c-4bbe-8004-9900c8085b57';
  //token = 'f3cd9d98-7c60-411b-bea2-5c5b85e6fd11';
  //token = 'f16021b7-893f-454a-831f-4c29666e3810';
  params.token = token;
  wx.request({
    url: url,
    data: params,
    header: header,
    method: "post",
    complete: function (res) {
      console.log("complete");
    },
    success: function (res) {
      var header = res.header;
      var setCookie;
      if (header) {
        setCookie = header["Set-Cookie"];
      }
      var sessionStr;
      if (setCookie) {
        var array = setCookie.split(";");
        if (array) {
          for (var i = 0; i < array.length; i++) {
            if (array[i].startsWith("JSESSIONID=")) {
              sessionStr = array[i];
              break;
            }
          }
        }
      }

      var sessionId;
      if (sessionStr) {
        sessionId = sessionStr.substring("JSESSIONID=".length);
      }

      if (sessionId) {
        wx.setStorageSync("SESSIONID", sessionId);
      }

      if (res.errorMsg = "request:ok") {
        callback.success(res.data);
      } else {
        callback.fail(res.data);
      }

    },
    fail: function (err) {
      callback.fail(err);
    }

  });
}

//获取支付配置
function requestWxPayConfig(id, callback) {
  request(wxPayConfigUrl, { goodId: id }, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}


function requestPayMentWithMasonry(goodId, callback) {
  var params = new Object();
  params.goodId = goodId;
  requestWithLogin(masonryPayUrl, params, {
    success: function (resp) {
      callback.success();
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestPayMentWithBean(goodId, callback) {
  var params = new Object();
  params.goodId = goodId;
  requestWithLogin(beanPayUrl, params, {
    success: function (resp) {
      callback.success();
    },
    fail: function () {
      callback.fail();
    }
  });
}

//支付
function requestPayMent(params, callback) {
  var timestamp = params.timestamp;
  requestLogin({
    success: function () {
      wx.requestPayment({
        timeStamp: timestamp,
        nonceStr: params.nonceStr,
        package: params.pack,
        signType: params.signType,
        paySign: params.paySign,
        total_fee: params.cost,
        success: function (resp) {
          if (resp.errMsg == "requestPayment:ok") {
            callback.success();
          }
        },
        fail: function () {
          callback.fail();
        }
      });
    },
    fail: function () {
      callback.fail();
    }
  });
}

function createPaymemberVoucher(costBean,costLove,callback){
  var params = new Object();
  if(costBean){
    params.costBean = costBean;
  }

  if(costLove){
    params.costLove = costLove;
  }
  requestWithLogin(createPaymemberVoucherUrl, params, {
    success: function (resp) {
      if(resp.success){
        callback.success();
      }else{
        callback.fail();
      }
      
    },
    fail: function () {
      callback.fail();
    }
  });
}

function openSetting(callback) {
  wx.openSetting({
    success: function (res) {
      callback.success(res);
    },
    fail: function () {
      callback.fail();
    }
  });
}

function openUserInfoSetting(callback) {

  if (callback) {
    openUserSettingCallbacks.push(callback);
  }

  if (openSettingFlag) {
    return;
  }
  openSettingFlag = true;
  openSetting({
    success: function (res) {
      if (res.authSetting["scope.userInfo"]) {
        for (var i = 0; i < openUserSettingCallbacks.length; i++) {
          var callback = openUserSettingCallbacks[i];
          callback.success();
        }
        openSettingFlag = false;
      } else {
        openSettingFlag = false;
        openUserInfoSetting();
      }
    },
    fail: function () {
      // console.log("fail2");
      // openUserInfoSetting();
    }
  });
}


function testSetUserInfo() {
  /*  wx.setStorageSync("userInfo",{
      "code": "1",
      "nickName": "test", "gender": 1,
      "avatarUrl": "ss",
      "openId":123
    });
  
    var userInfo = wx.getStorageSync("userInfo");
  
    console.log("userInfo:"+JSON.stringify(userInfo));*/
}

//获取用户信息数据
function getUserInfo(callback) {
  /* var userInfo = wx.getStorageSync("userInfo");
   console.log(JSON.stringify(userInfo));
   if (userInfo) {
     callback.success(userInfo);
     return;
   }*/

  wx.getUserInfo({
    withCredentials: false,
    success: function (res) {
      wx.setStorageSync("userInfo", res.userInfo);
      callback.success(res.userInfo);
    },
    fail: function (res) {
      openUserInfoSetting({
        success: function () {
          getUserInfo(callback);
        }
      });
    }
  })
}


function requestRegist(callback, code, userInfo) {
  request(registerUserByJsCode, {
    "code": code,
    "openId": userInfo.openId,
    "nickName": userInfo.nickName, "gender": userInfo.gender,
    "language": userInfo.language, "city": userInfo.city,
    "province": userInfo.province, "country": userInfo.country,
    "avatarUrl": userInfo.avatarUrl
  }, {
      success: function (resp) {
        if (resp.success) {
          //注册成功
          callback.success();
        } else {
          //用户已存在
          if (resp.errorCode == 403) {
            callback.exists();
          } else {
            callback.fail();
          }

        }
      },
      fail: function (resp) {
        //注册失败
        callback.fail();
      }
    });
}

//请求登陆
function requestLogin(callback, time, flag) {
  wx.login({
    success: function (loginCode) {
      getUserInfo({
        success: function (userInfo) {
          var url = loginByJsCodeUrl;
          request(url, {
            "code": loginCode.code
          }, {
              success: function (resp) {
                if (resp.success) {
                  token = resp.data.token;
                  callback.success(resp.data.userInfo);
                } else {
                  if (resp.errorCode == 401) {
                    wx.login({
                      success: function (loginCode) {
                        requestRegist({
                          success: function () {
                            requestLogin(callback, null, true);
                          },
                          fail: function () {
                            callback.fail();
                          },
                          exists: function () {
                            callback.fail();
                          }
                        }, loginCode.code, userInfo);
                      }
                    })
                  } else if (resp.errorCode == 0 || resp.errorCode == 1) {
                    setTimeout(function () {
                      //尝试5次，如果5次都失败就放弃尝试
                      if (!time) {
                        time = 0;
                      }
                      time++;
                      if (time < 5) {
                        requestLogin(callback, time);
                      }
                    }, 100);
                  }
                }

              },
              fail: function () {

                callback.fail(userInfo);
              }
            });
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
}

module.exports = {
  request: request,
  getUserInfo: getUserInfo,
  requestPayMent: requestPayMent,
  requestLogin: requestLogin,
  requestWxPayConfig: requestWxPayConfig,
  getDomain: getDomain,
  testSetUserInfo: testSetUserInfo,
  requestWithLogin: requestWithLogin,
  requestUpload: requestUpload,
  requestPayMentWithMasonry: requestPayMentWithMasonry,
  requestPayMentWithBean: requestPayMentWithBean,
  createPaymemberVoucher: createPaymemberVoucher
}