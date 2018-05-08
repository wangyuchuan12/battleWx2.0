var request = require("request.js");

var domain = request.getDomain();
var homeIntoUrl = domain + "/api/battlePk/homeInto";
var beatIntoUrl = domain + "/api/battlePk/beatInto";
var immediateDataUrl = domain + "/api/battlePk/immediateData";
var readyUrl = domain + "/api/battlePk/ready";

var restartUrl = domain + "/api/battlePk/restart";

var battleRoomPkIntoUrl = domain + "/api/battlePk/battleRoomPkInto";

var pkMainUrl = domain + "/api/battlePk/pkMain";

var beatOutUrl = domain + "/api/battlePk/beatOut";

function pkMainRequest(callback){
  request.requestWithLogin(pkMainUrl, {}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}


function beatOutRequest(id,callback){
  request.requestWithLogin(beatOutUrl, {id:id}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}


function battleRoomPkIntoRequest(min,max,callback){
  request.requestWithLogin(battleRoomPkIntoUrl, { maxinum: max, mininum:min}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}

function immediateRequest(id,callback) {
  var params = new Object();
  params.id = id;
  request.requestWithLogin(immediateDataUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}

function restartRequest(callback) {
  var params = new Object();
  request.requestWithLogin(restartUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        console.log("resp:"+resp);
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}

function homeIntoRequest(callback){
  var params = new Object();
  request.requestWithLogin(homeIntoUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}

function beatIntoRequest(id,callback) {
  var params = new Object();
  params.id = id;
  request.requestWithLogin(beatIntoUrl, params, {
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

function immediateDataRequest(id,callback) {
  var params = new Object();
  params.id = id;
  request.requestWithLogin(immediateDataUrl, params, {
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

function readyRequest(id,roomId,battleId,role,callback) {
  var params = new Object();
  params.id = id;
  params.role = role;
  params.roomId = roomId;
  params.battleId = battleId;
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

module.exports = {
  homeIntoRequest: homeIntoRequest,
  beatIntoRequest: beatIntoRequest,
  immediateDataRequest: immediateDataRequest,
  readyRequest: readyRequest,
  restartRequest: restartRequest,
  immediateRequest: immediateRequest,
  battleRoomPkIntoRequest: battleRoomPkIntoRequest,
  pkMainRequest: pkMainRequest,
  beatOutRequest: beatOutRequest
}