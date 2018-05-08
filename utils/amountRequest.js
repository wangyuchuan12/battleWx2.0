var request = require("request.js");

var domain = request.getDomain();

var entiesUrl = domain + "/api/common/amount/takeoutEnties";

var takeoutUrl = domain + "/api/common/amount/takeout";

var takeoutRecordsUrl = domain + "/api/common/amount/takeoutRecords";

function entiesRequest(callback){
  request.requestWithLogin(entiesUrl, {}, {
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

function takeoutRequest(entryId,callback){
  request.requestWithLogin(takeoutUrl, {entryId:entryId}, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function takeoutRecords(callback){
  request.requestWithLogin(takeoutRecordsUrl, { }, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

module.exports = {
  entiesRequest: entiesRequest,
  takeoutRequest: takeoutRequest,
  takeoutRecords: takeoutRecords
}