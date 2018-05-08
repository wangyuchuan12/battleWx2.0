var domain = "wss://www.chengxihome.com";
//var domain = "ws://192.168.0.105";
var request = require("request.js");
var token;
var callbacks = new Array();

var openCallback;

var isOpen = 0;

var time = 0;

var userInfo;

function closeSocket(){
  wx.closeSocket();
}

function registerCallback(code,callback){
  removeCallback(code);
  var obj = new Object();
  obj.code = code;
  obj.callback = callback;
  callbacks.push(obj);
  console.log("registerCallback.callbacks:"+callbacks);
}

function removeCallback(code){
  if(!callbacks||!callbacks.length){
    return;
  }
  
  for(var i=0;i<callbacks.length;i++){
    var callback = callbacks[i];
    if(callback.code==code){
      callbacks.splice(i,1);
    }
    console.log("removeCallback:" + callbacks)
  }
}

wx.onSocketMessage(function (resp) {
  data = resp.data;
  data = data.replace(" ", "");
  if (typeof data != 'object') {
    data = data.replace(/\ufeff/g, "");//重点
  }
  var data = JSON.parse(data);
  console.log("callbacks:" + JSON.stringify(callbacks));
  for (var i = 0; i < callbacks.length; i++) {
    var callback = callbacks[i];
    console.log("data.code:" + data.code);
    if (callback.code == data.code) {
      console.log(".............callback.code:"+callback.code);
      callback.callback.call(data.data);
    }
  }
});

function openSocket(callback){
  isOpen = 0;
  request.requestLogin({
    success: function (u) {
      userInfo = u;
      token = userInfo.token;
      console.log("this");
      var url = "/socket";
      wx.closeSocket({
        url: domain + url + "?token=" + token,
        data: {

        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (data) {
          doOpenSocket();
        },
        complete: function (res) {
          console.log('complete: ', res);
        },
        fail: function (err) {
          doOpenSocket();
        }
      });
    }
  })
  openCallback = callback
  
  
  function doOpenSocket(){
    time++;
    if(time>5){
      return;
    }
    var url = "/socket";
    if(isOpen==1){
      return;
    }
    console.log("..............doOpenSocket2");
    wx.connectSocket({
      url: domain + url+"?token=" + token,
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (data) {
        
      },
      complete: function (res) {
        console.log('complete: ', res);
      },
      fail: function (err) {
        console.log("openSocketFail")
        setTimeout(function(){
          //doOpenSocket();
        },5000);
        
      }
    });
  }

  

  wx.onSocketOpen(function (res) {
    console.log("连接打开了");
    isOpen = 1
    if (openCallback){
      openCallback.open(userInfo);
      openCallback = null;
    }
    /*wx.sendSocketMessage({
      data: "你好，我叫王煜川",
      success:function(res){
        console.log("success:"+JSON.stringify(res));
      },
      fail:function(res){
        console.log("fail:" + res);
      }
    });*/
  });

  wx.onSocketClose(function (res) {
    isOpen = 0;
    console.log("onSocketClose");
    setTimeout(function () {
      doOpenSocket();
    }, 5000);
    
  });

  wx.onSocketError(function (res) {
    console.log("onSocketError");
    setTimeout(function () {
      if (isOpen==0){
        doOpenSocket();
      }
    }, 5000);
  });
}

module.exports = {
  openSocket: openSocket,
  registerCallback: registerCallback,
  removeCallback: removeCallback,
  closeSocket: closeSocket
}
