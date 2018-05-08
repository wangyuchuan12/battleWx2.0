var request = require("request.js");

var domain = request.getDomain();

var intoUrl = domain +"/api/battle/battleWait/into";

var readyUrl = domain + "/api/battle/battleWait/ready";

var outUrl = domain + "/api/battle/battleWait/out";

var waitUsersUrl = domain + "/api/battle/battleWait/waitUsers";

function requestInto(waitId,danUserId,callback) {
  var params = new Object();
  params.waitId = waitId;
  if (danUserId){
    params.danUserId = danUserId;
  }
  request.requestWithLogin(intoUrl, params, {
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

function requestReady(waitId,callback) {
  var params = new Object();
  params.waitId = waitId;
  request.requestWithLogin(readyUrl, params, {
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


function requestWaitUsers(waitId, callback) {
  var params = new Object();
  params.waitId = waitId;
  request.requestWithLogin(waitUsersUrl, params, {
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

function requestOut(waitId,callback) {
  var params = new Object();
  params.waitId = waitId;
  request.requestWithLogin(outUrl, params, {
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
  requestInto: requestInto,
  requestReady: requestReady,
  requestOut: requestOut,
  requestWaitUsers: requestWaitUsers
}