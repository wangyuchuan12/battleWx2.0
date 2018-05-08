var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var luckDrawRequest = require("../../utils/luckDrawReqeust.js");

var takepartRequest = require("../../utils/takepartRequest.js");

var interval;
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    luckDraws:[],
    currentLevel:1,
    bufferLevel:10,
    targetLevel:20,
    isRun:0,
    isStop:0
  },

  showCurrent:function(){
    var currentLevel = this.data.currentLevel;
    var luckDraws = this.data.luckDraws;
    for (var i = 0; i < luckDraws.length;i++){
      var luckDraw = luckDraws[i];
      if (luckDraw.level == currentLevel){
        luckDraw.color = "red";
      }else{
        luckDraw.color = "rgba(24,149,165,1)";
      }
    }
    this.setData({
      luckDraws: luckDraws
    });
  },

  startDrawClick:function(){
    var outThis = this;
    this.showConfirm("参加需要消耗一颗爱心", "是否继续", {
      confirm:function(){
        luckDrawRequest.drawTakepart({
            success:function(){
              outThis.startDraw();
            },
            loveNotEnough:function(){
              outThis.showConfirm("爱心不够", "是否要充值", {
                confirm:function(){
                  wx.navigateTo({
                    url: '../mall/mall?type=3'
                  });
                },
                cancel:function(){

                }
              }, "确定", "取消");
            }
        });
        
      },
      cancel:function(){

      }
    });
  },

  startDraw:function(e,flag){
    var outThis = this;
    if(!flag){
      this.startRun({
        end:function(){
          var roomId = outThis.data.roomId;
          var battleId = outThis.data.battleId;
          var isStop = outThis.data.isStop;
          if(!isStop){
            takepartRequest.battleTakepart(battleId, roomId, {
              success: function (member) {
                wx.redirectTo({
                  url: '../progressScore/progressScore2?roomId=' + roomId + "&battleId=" + battleId + "&againButton=返回"
                });
              },
              beanNotEnough: function () {

              },
              masonryNotEnough: function () {

              },
              fail: function (errorMsg) {
                outThis.hideLoading();
                if (!errorMsg) {
                  outThis.showToast("网络繁忙");
                } else {
                  outThis.showToast(errorMsg);
                }
              },
              battleIn: function () {
                wx.redirectTo({
                  url: '../progressScore/progressScore2?roomId=' + roomId + "&battleId=" + battleId + "&againButton=返回"
                });
              },
              battleEnd: function () {

              },
              roomEnd: function () {

              },
              roomFull: function () {

              }
            });
          }
        }
      });
    }
    
    luckDrawRequest.randomLevelRequest({
      success:function(data){
        outThis.setData({
          targetLevel:data.level,
          roomId:data.roomId,
          battleId:data.battleId
        });
      },
      fail:function(){
        setTimeout(function(){
          outThis.startDraw(e,true);
        },2000);
      }
    });
  },

  startRun:function(callback){
    var outThis = this;
    var currentLevel = this.data.currentLevel;
    var time = 0;
    if(interval){
      clearInterval(interval);
    }
    interval = setInterval(function(){
      var targetLevel = outThis.data.targetLevel;
      outThis.setData({
        isRun:1
      });
      if(currentLevel<12){
        currentLevel++;
        outThis.setData({
          currentLevel: currentLevel
        });
      }else{
        time++;
        currentLevel  = 1;
        outThis.setData({
          currentLevel: currentLevel
        });
      }
      outThis.showCurrent();

      if (time >= 10){
        var diffLevel = targetLevel - currentLevel;
        if (diffLevel==5){
          console.log("......diffLevel:" + diffLevel);
          clearInterval(interval);
          outThis.setData({
            bufferLevel:5
          });
          outThis.bufferRun(callback);
        } else if (diffLevel==-5){
          var currentLevel2 = outThis.data.currentLevel;
          console.log("......diffLevel2:" + diffLevel + ",currentLevel:" + currentLevel2);
          clearInterval(interval);
          outThis.setData({
            bufferLevel: 7
          });
          outThis.bufferRun(callback);
        }
      }
    },50);
  },


  bufferRun: function (callback){
    var outThis = this;
    var currentLevel = this.data.currentLevel;
    var bufferLevel = this.data.bufferLevel;

    var time = 100;
    if (bufferLevel==10){
      time = 100;
    }
    if (bufferLevel == 9) {
      time = 150;
    }
    if (bufferLevel == 8) {
      time = 200;
    }

    if (bufferLevel == 7) {
      time = 250;
    }

    if (bufferLevel == 6) {
      time = 300;
    }

    if (bufferLevel == 5) {
      time = 350;
    }

    if (bufferLevel == 4) {
      time = 400;
    }

    if (bufferLevel == 3) {
      time = 450;
    }

    if (bufferLevel == 2) {
      time = 500;
    }

    if (bufferLevel == 1) {
      time = 550;
    }

    if (currentLevel < 12) {
      currentLevel++;
    }else{
      currentLevel = 1;
    }
    if (bufferLevel>0){
      bufferLevel--;
      this.setData({
        currentLevel: currentLevel,
        bufferLevel: bufferLevel
      });
      setTimeout(function () {
        outThis.bufferRun(callback);
        outThis.showCurrent();
        
        if (bufferLevel==0){
          if(callback){
            callback.end();
          }
        }
      }, time);
    }else{
      outThis.setData({
        isRun:0
      });
    }
    
  },

  initDraws:function(){
    var outThis = this;
    luckDrawRequest.luckDrawsRequest({
      success:function(lucks){
        var array = new Array();
        for(var i = 0;i<lucks.length;i++){
          array.push({
            imgUrl: lucks[i].imgUrl,
            name: lucks[i].name,
            color:"rgba(24,149,165,1)",
            level:lucks[i].level
          });
        }
        outThis.setData({
          luckDraws: array
        });
        outThis.showCurrent();

        setTimeout(function(){
          outThis.loadPreProgress();
          //outThis.startDraw();
        },1000);
      },
      fail:function(){

      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDraws();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      currentLevel: 1,
      bufferLevel: 10,
      targetLevel: 20,
      isRun: 0,
      isStop:0
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isStop: 1
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (interval){
      clearInterval(interval);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
});

layerout.begin();