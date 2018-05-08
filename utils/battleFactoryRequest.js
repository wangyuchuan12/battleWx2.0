var request = require("request.js");
var domain = request.getDomain();

var applyUrl = domain + "/api/battleFactory/apply";

var myQuestionsUrl = domain + "/api/battleFactory/myQuestions";

var randomAuditQuestionUrl = domain + "/api/battleFactory/randomAuditQuestion";

var agreeUrl = domain + "/api/battleFactory/agree";

var rejectUrl = domain + "/api/battleFactory/reject";


function reject(itemId,callback){
  request.requestWithLogin(rejectUrl, {itemId: itemId}, {
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

function agree(itemId,reviewId,callback){
  request.requestWithLogin(agreeUrl, { itemId: itemId, reviewId: reviewId}, {
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

function randomAuditQuestion(battleId,callback){
  request.requestWithLogin(randomAuditQuestionUrl, {battleId:battleId}, {
    success: function (resp) {
      console.log("resp:"+JSON.stringify(resp));
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

function applyRequest(params,callback){
  request.requestWithLogin(applyUrl, params, {
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

function myQuestionsRequest(status,callback){
  request.requestWithLogin(myQuestionsUrl, {status:status}, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
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
  applyRequest: applyRequest,
  myQuestionsRequest: myQuestionsRequest,
  randomAuditQuestion: randomAuditQuestion,
  agree: agree,
  reject: reject
}