var baseLayerout = require("../baseLayerout/baseLayerout.js");

var luckDrawRequest = require("../../../utils/luckDrawReqeust.js");

var takepartRequest = require("../../../utils/takepartRequest.js");

//获取应用实例
var app = getApp()

var interval;
var varName;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗标题
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '弹窗内容'
    },
    // 弹窗取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    luckDraws: [],
    currentLevel: 1,
    bufferLevel: 10,
    targetLevel: 20,
    isRun: 0,
    isStop: 0
  },
  methods: {
    showCurrent: function () {
      var currentLevel = this.data.currentLevel;
      var luckDraws = this.data.luckDraws;
      for (var i = 0; i < luckDraws.length; i++) {
        var luckDraw = luckDraws[i];
        if (luckDraw.level == currentLevel) {
          luckDraw.color = "red";
        } else {
          luckDraw.color = "RGBA(82,82,82,0.3)";
        }
      }
      this.setData({
        luckDraws: luckDraws
      });
    },
    startDrawClick: function () {
      var outThis = this;
      this.showConfirm("参加需要消耗一颗爱心", "是否继续", {
        confirm: function () {
          luckDrawRequest.drawTakepart({
            success: function () {
              outThis.startDraw();
            },
            loveNotEnough: function () {
              outThis.showConfirm("爱心不够", "是否要充值", {
                confirm: function () {
                  wx.navigateTo({
                    url: '../mall/mall?type=3'
                  });
                },
                cancel: function () {

                }
              }, "确定", "取消");
            }
          });

        },
        cancel: function () {

        }
      });
    },
    

    startDraw: function (e, flag) {
      var outThis = this;
      if (!flag) {
        this.startRun({
          end: function () {
            var waitId = outThis.data.waitId;
            var isStop = outThis.data.isStop;
            if (!isStop) {
              var myEventDetail = { waitId: waitId } // detail对象，提供给事件监听函数
              var myEventOption = {} // 触发事件的选项

              console.log("drawStop1");
              outThis.triggerEvent('drawStop', myEventDetail, myEventOption);
            }
          }
        });
      }

      luckDrawRequest.randomLevelRequest({
        success: function (data) {
          console.log("success.data:"+JSON.stringify(data));
          outThis.setData({
            targetLevel: data.level,
            waitId:data.waitId
          });
        },
        fail: function () {
          setTimeout(function () {
            console.log("isStop:" + outThis.data.isStop);
            if(!outThis.data.isStop){
              outThis.startDraw(e, true);
            }
          }, 2000);
        }
      });
    },

    stopRun:function(){
      clearInterval(interval);

      this.setData({
        bufferLevel:0,
        isStop:1
      });
    },

    startRun: function (callback) {
      var outThis = this;
      var currentLevel = this.data.currentLevel;
      var time = 0;
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(function () {
        var targetLevel = outThis.data.targetLevel;
        outThis.setData({
          isRun: 1
        });
        if (currentLevel < 12) {
          currentLevel++;
          outThis.setData({
            currentLevel: currentLevel
          });
        } else {
          time++;
          currentLevel = 1;
          outThis.setData({
            currentLevel: currentLevel
          });
        }
        outThis.showCurrent();

        if (time >= 10) {
          var diffLevel = targetLevel - currentLevel;
          if (diffLevel == 5) {
            console.log("......diffLevel:" + diffLevel);
            clearInterval(interval);
            outThis.setData({
              bufferLevel: 5
            });
            outThis.bufferRun(callback);
          } else if (diffLevel == -5) {
            var currentLevel2 = outThis.data.currentLevel;
            console.log("......diffLevel2:" + diffLevel + ",currentLevel:" + currentLevel2);
            clearInterval(interval);
            outThis.setData({
              bufferLevel: 7
            });
            outThis.bufferRun(callback);
          }
        }
      }, 50);
    },


    bufferRun: function (callback) {
      var outThis = this;
      var currentLevel = this.data.currentLevel;
      var bufferLevel = this.data.bufferLevel;

      var time = 100;
      if (bufferLevel == 10) {
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
      } else {
        currentLevel = 1;
      }
      if (bufferLevel > 0) {
        bufferLevel--;
        this.setData({
          currentLevel: currentLevel,
          bufferLevel: bufferLevel
        });
        setTimeout(function () {
          outThis.bufferRun(callback);
          outThis.showCurrent();

          if (bufferLevel == 0) {
            if (callback) {
              callback.end();
            }
          }
        }, time);
      } else {
        outThis.setData({
          isRun: 0
        });
      }

    },


    initDraws: function () {
      var outThis = this;
      luckDrawRequest.luckDrawsRequest({
        success: function (lucks) {
          var myEventDetail = {} // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          outThis.triggerEvent('initDraws', myEventDetail, myEventOption);
          var array = new Array();
          for (var i = 0; i < lucks.length; i++) {
            array.push({
              imgUrl: lucks[i].imgUrl,
              name: lucks[i].name,
              color: "rgba(24,149,165,1)",
              level: lucks[i].level
            });
          }
          outThis.setData({
            luckDraws: array
          });
          outThis.showCurrent();

          setTimeout(function () {
            //outThis.startDraw();
          }, 1000);
        },
        fail: function () {

        }
      });
    }



  }
});
