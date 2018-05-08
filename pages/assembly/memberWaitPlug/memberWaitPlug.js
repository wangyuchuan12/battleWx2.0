var battleMembersRequest = require("../../../utils/battleMembersRequest.js");
var luckDrawRequest = require("../../../utils/luckDrawReqeust.js");
var battleWaitRequest = require("../../../utils/battleWaitRequest.js");
var baseLayerout = require("../baseLayerout/baseLayerout.js");
var requestTarget = null;
var socketUtil = require("../../../utils/socketUtil.js");
var flushMembersInterval = null;
var animation1;
var animation2;
var interval;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData1: {},
    animationData2: {},
    members: [/*{
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png",
      index: 1
    }, {
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png",
      index: 2
    }, {
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png",
      index: 3
    }*/],
    waitId:"",
    danUserId:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    startWait: function (waitId, danUserId){

      console.log("waitId:"+waitId);
      var outThis = this;
      this.setData({
        waitId:waitId,
        danUserId: danUserId
      });

      this.into({
        success:function(){
          outThis.waitUsers();
        },
        fail:function(){
          console.log("fail");
        }
      });

      this.registerWaitStatusCallback();

      this.registerWaitEndCallback();

      interval = setInterval(function(){
        outThis.luying();
      },1000);
    },

    waitUsers:function(){
      var outThis = this;
      var waitId = this.data.waitId;
      battleWaitRequest.requestWaitUsers(waitId, {
        success: function (waitUsers) {
          var members = outThis.getWaitMembers();
          for (var i = 0; i < waitUsers.length;i++){
            members.push({
              imgUrl: waitUsers[i].imgUrl
            });
          }
          outThis.setWaitMembers(members);
        },
        fail: function () {
          console.log("into.fail");
        }
      });
    },

    into:function(callback){
      var waitId = this.data.waitId;
      var danUserId = this.data.danUserId;
      battleWaitRequest.requestInto(waitId, danUserId,{
        success:function(){
          callback.success();
        },
        fail:function(){
          callback.fail();
        }
      });
    },

    registerWaitEndCallback: function () {
      var outThis = this;
      socketUtil.registerCallback("waitEndCode", {
        call: function (battleRoom) {
          outThis.stopLuying();
          console.log("battleRoom:"+JSON.stringify(battleRoom));
          var myEventDetail = { battleId: battleRoom.battleId, roomId: battleRoom.id } // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          outThis.triggerEvent('waitEnd', myEventDetail, myEventOption);
        }
      });
    },

    registerWaitStatusCallback:function(){
      var outThis = this;
      socketUtil.registerCallback("waitStatusCode", {
        call: function (battleWaitUser) {
          var members = outThis.getWaitMembers();
          members.push({
            imgUrl:battleWaitUser.imgUrl
          });
          outThis.setWaitMembers(members);
        }
      });
    },

    setWaitMembers: function (members) {
      var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      for (var i = 0; i < arr.length; i++) {
        var index = arr[i];
        for (var j = 0; j < members.length; j++) {
          var member = members[j];
          if (index == member.index) {
            arr.splice(i, 1);
          }
        }
      }
      arr.sort(function () { return 0.5 - Math.random() });
      for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (member.index != 0 && !member.index) {
          member.index = arr[i]
        }
      }
      this.setData({
        "members": members
      });
    },

    getWaitMembers: function () {
      var members = this.data.members;
      return members;
    },

    stopLuying: function () {
      if (animation1) {
        clearInterval(animation1);
      }
      if (animation2) {
        clearInterval(animation2);
      }
      if (interval){
        clearInterval(interval);
      }
    },

    luying: function () {
      console.log("luying");
      //创建一个动画对象，设置它的属性  
      animation1 = wx.createAnimation({
        //动画的持续时长  
        duration: 100,
        //动画的效果从快到慢还是从慢到快or其他，linear代表始终一致  
        timingFunction: "linear",
        //动画的延迟时间ms为单位  
        delay: 0,
        //旋转中心  
        transformOrigin: "50% 50 % 0"
      })
      //animation(动画对象) 的方法  
      //动画可以是样式的改变，如背景色backgroundColor的改变，透明度opacity的改变，和长宽高的改变等等  
      //或者是物体的旋转rotate，rotate方法代表从原点（我们设置的transformOrigin属性）开始旋转，当然还有rotateX,rotateY,rotateZ。  
      //缩放scale,scale(1)表示在x，y轴上同时缩放1倍，scale(x,y)两个参数时表示在X轴缩放x倍数，在Y轴缩放y倍数  
      //偏移translate,translate(tx,ty)一个参数时，表示在X轴偏移tx，单位px(如果传入 Number 则默认使用 px)；两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。  
      //倾斜：skew，skew(x)一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜x度  
      //矩阵变形：matrix.matrix(a,b,c,d,tx,ty)  

      // 调用动画操作方法后要调用 step() 来表示一组动画完成，  
      // 可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，  
      // 一组动画完成后才会进行下一组动画。step 可以传入一个跟  wx.createAnimation() 一样的配置参数用于指定当前组动画的配置。  

      //录音按钮的图片放大1.05倍再缩小1.05倍  
      animation1.scale(1.05).step().scale(0.95).step()
      //再创建一个一圈水纹扩散出去  
      animation2 = wx.createAnimation({
        //时长  
        duration: 100,
        //动画的效果从快到慢还是从慢到快or其他，step - start代表从第一帧直接跳到结束位置  
        timingFunction: "linear",
        //动画的延迟时间ms为单位  
        delay: 0,
        //旋转中心  
        transformOrigin: "50% 50 % 0"
      })
      //波纹扩散，动画顺序播放，delay:20设置每组动画的持续时间  
      animation2.scale(1.2).opacity(0.6).step({ delay: 20 })
        .scale(1.4).opacity(0.6).step({ delay: 20 })
        .scale(1.6).opacity(0.6).step({ delay: 20 })
        .scale(1.8).opacity(0.6).step({ delay: 20 })
        .scale(2).opacity(0.6).step({ delay: 20 })
        .scale(2.2).opacity(0.4).step({ delay: 20 })
        .scale(2.4).opacity(0.4).step({ delay: 20 })
        .scale(2.6).opacity(0.3).step({ delay: 20 })
        .scale(2.8).opacity(0.3).step({ delay: 20 })
        .scale(3).opacity(0.2).step({ delay: 20 })
        .scale(3.2).opacity(0.2).step({ delay: 20 })
        .scale(3.4).opacity(0.2).step({ delay: 20 })
        .scale(3.6).opacity(0.2).step({ delay: 20 })
        .scale(0.3).opacity(0.1).step({ delay: 20, timingFunction: "step-start" })
      this.setData({
        "animationData1": animation1.export(),
        "animationData2": animation2.export()
      })
    }
  }
})
