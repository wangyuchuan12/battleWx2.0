var request = require("request.js");

var domain = request.getDomain();
var homeIntoUrl = domain + "/api/battleSyncPk/homeInto";
var beatIntoUrl = domain + "/api/battleSyncPk/beatInto";
var readyUrl = domain + "/api/battleSyncPk/ready";
var restartUrl = domain + "/api/battleSyncPk/restart";
var battleRoomPkIntoUrl = domain + "/api/battleSyncPk/battleRoomPkInto";
var beatOutUrl = domain + "/api/battleSyncPk/beatOut";

function beatOutRequest(id, callback) {
  request.requestWithLogin(beatOutUrl, { id: id }, {
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


function battleRoomPkIntoRequest(min, max, callback) {
  request.requestWithLogin(battleRoomPkIntoUrl, { maxinum: max, mininum: min }, {
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
        callback.fail();
      }
    },
    fail: function (resp) {
      console.log("fail");
      callback.fail("网络繁忙");
    }
  });
}

function homeIntoRequest(callback) {
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

function beatIntoRequest(id, callback) {
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

function readyRequest(id, roomId, battleId, role, callback) {
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
  readyRequest: readyRequest,
  restartRequest: restartRequest,
  battleRoomPkIntoRequest: battleRoomPkIntoRequest,
  beatOutRequest: beatOutRequest
}