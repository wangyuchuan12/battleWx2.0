var request = require("request.js");
var domain = request.getDomain();
var shareImg = domain+"/api/common/resource/shareImg";

var shareRoomImgUrl = domain+"/api/img/roomImg";

function loadFile(filePath,callback){
  request.requestUpload(filePath,{
    success:function(resp){
      if (resp.success){
        var data = resp.data;
        if(data){
          callback.success(data.url);
        }else{
          callback.fail();
        }
      }else{
        callback.fail();
      }
    },
    fail:function(){
      callback.fail();
    }
  });
}

function openLoadFile(callback){
  wx.chooseImage({
    success: function (res) {
      var path = res.tempFilePaths[0];

      loadFile(path,{
        success:function(url){
          callback.success(url)
        },
        fail:function(){
          callback.fail();
        }
      });
    },
    fail:function(){
      callback.fail();
    }
  });
}

function previewImage(url){
  wx.previewImage({
    current: '', // 当前显示图片的http链接
    urls: [url] // 需要预览的图片http链接列表
  })
}

function previewShareImage(path,callback){
  request.request(shareImg, {path:path},{
    success:function(resp){
      if (resp.success){
        var data = resp.data;
        var url = data.url;
        previewImage(url);
        callback.success();
      }else{
        callback.fail();
      }
    },
    fail:function(){
      callback.fail();
    }
  });
}

function previewShareRoomImage(roomId,callback){
  request.request(shareRoomImgUrl, { roomId: roomId }, {
    success: function (resp) {
      console.log(JSON.stringify(resp));
      if (resp.success) {
        var data = resp.data;
        var url = data.url;
        previewImage(url);
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
  loadFile: loadFile,
  openLoadFile: openLoadFile,
  previewImage: previewImage,
  previewShareImage: previewShareImage,
  previewShareRoomImage: previewShareRoomImage
}