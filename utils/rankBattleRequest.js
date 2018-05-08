var request = require("request.js");

var domain = request.getDomain();
var myRankBattleRequestUrl = domain + "/api/rankBattle/myRankBattle";

var registRankBattleUrl = domain + "/api/rankBattle/registRankBattle";

var nextMyRankBattleUrl = domain + "/api/rankBattle/nextMyRankBattle";

function myRankBattleRequest(callback){
  var params = new Object();
  request.requestWithLogin(myRankBattleRequestUrl, params, {
    success:function(resp){
      if(resp.success){
        callback.success(resp.data);
      }else{
        callback.fail();
      }
    },  
    fail:function(){
      callback.fail();
    }
  });
}

function registRankBattle(recommendUserId,callback) {
  var params = new Object();
  if (recommendUserId){
    params.recommendUserId = recommendUserId;
  }
  request.requestWithLogin(registRankBattleUrl, params, {
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

function nextMyRankBattle(callback) {
  var params = new Object();

  request.requestWithLogin(nextMyRankBattleUrl, params, {
    success: function (resp) {
      if (resp.success) {
        if(resp.code==0){
          callback.success(resp.data);
        }else if(resp.code==1){
          callback.timeNotReached();
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
  myRankBattleRequest: myRankBattleRequest,
  registRankBattle: registRankBattle,
  nextMyRankBattle: nextMyRankBattle
}