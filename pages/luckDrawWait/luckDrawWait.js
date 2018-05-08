var battleMembersRequest = require("../../utils/battleMembersRequest.js");
var luckDrawRequest = require("../../utils/luckDrawReqeust.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var requestTarget = null;
var flushMembersInterval = null;
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    animationData1: {},
    animationData2: {},
    members: [{
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png",
      index:1
    }, {
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png",
      index:2
    }, {
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png",
      index:3
    }],
    battleId:"",
    roomId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var roomId = options.roomId;
    var battleId = options.battleId;
    this.setData({
      roomId: roomId,
      battleId: battleId,
    });

    this.initDanRoomInfo();
    var outThis = this;
    var interval = setInterval(function(){
      outThis.luying();
    },1500);

    flushMembersInterval = setInterval(function () {
      outThis.initBattleMembers({
        success: function () {
        },
        fail: function () {

        }
      });
    }, 10000);
  },


  showMembers: function (ms) {
    var members = new Array();
    var maxinum = this.data.maxinum;

    if (ms && ms.length > 0) {
      for (var i = 0; i < ms.length; i++) {
        members.push({
          imgUrl: ms[i].headImg,
          index: i
        });
      }
    }

    if (maxinum) {
      for (var i = 0; i < maxinum - ms.length; i++) {
        members.push({
          imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
        });
      }
    }

    this.setData({
      members: members
    });
  },


  reckonTime: function () {
    var outThis = this;
    var flag = false;
   
    var mininum = this.data.mininum;
    var interval = setInterval(function () {
      var num = outThis.data.num;
      var timeDiffer = outThis.data.timeDiffer;
      var hour = parseInt(timeDiffer / 3600);
      var min = parseInt((timeDiffer - hour * 3600) / 60);
      var second = timeDiffer - (hour * 3600 + min * 60);

      if (hour < 10) {
        hour = "0" + hour;
      }

      if (min < 10) {
        min = "0" + min;
      }

      if (second < 10) {
        second = "0" + second;
      }

      timeDiffer--;
      outThis.setData({
        timeDiffer: timeDiffer,
        remainderHour: hour,
        remainderMin: min,
        remainderSecond: second
      });

      if (timeDiffer <= 0 && num >= mininum) {
        clearInterval(interval);
        if (!flag) {
          wx.redirectTo({
            url: '../progressScore/progressScore2?roomId=' + outThis.data.roomId + "&battleId=" + outThis.data.battleId + "&againButton=返回"
          });
          flag = true;
          return;
        }
      }

      flag = false;
    }, 1000);
  },


  initDanRoomInfo: function () {
    var outThis = this;
    var roomId = this.data.roomId;
    luckDrawRequest.roomInfoRequest(roomId, {
      success: function (room) {
        outThis.loadPreProgress();
        outThis.setData({
          name: room.name,
          places: room.places,
          roomId: room.roomId,
          battleId: room.battleId,
          maxinum: room.maxinum,
          mininum: room.mininum,
          rewards: room.rewards,
          status: room.status,
          roomStatus: room.roomStatus,
          num: room.num,
          timeDiffer: room.timeDiffer
        });
        var num = outThis.data.num;
        var mininum = outThis.data.mininum;
        outThis.reckonTime();
        outThis.showMembers(room.members);
        outThis.initBattleMembers({
          success: function () {
            console.log("room.roomStatus:" + room.roomStatus + ",room.timeDiffer:" + room.timeDiffer + ",num:" + num + ",mininum:" + mininum);

            return;
            if ((room.roomStatus == 3 || room.timeDiffer <= 0) && num >= mininum) {


              outThis.showConfirm("跳转到游戏", "是否确定挑战", {
                confirm: function () {
                  wx.redirectTo({
                    url: '../progressScore/progressScore2?roomId=' + room.roomId + "&battleId=" + room.battleId + "&againButton=返回"
                  });
                },
                cancel: function () {

                }
              });

            }
          }
        });

      },
      fail: function () {
        console.log("fail");
      }
    });
  },


  
  initBattleMembers: function (callback) {
    var members = new Array();
    for (var i = 0; i < 40; i++) {
      members.push({
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
      });
    }
    this.setData({
      members: members
    });
    var outThis = this;
    var roomId = this.data.roomId;
    var maxinum = this.data.maxinum;
    var battleId = this.data.battleId;
    var num = 0;
    requestTarget = battleMembersRequest.getBattleMembers(battleId, roomId, {
      cache: function (battleMembers) {
        /*var members = new Array();
        var length = 0;
        if (battleMembers != null && battleMembers.length > 0) {
          length = battleMembers.length;
          num = length;
          for (var i = 0; i < battleMembers.length; i++) {
            members.push({
              imgUrl: battleMembers[i].headImg
            });

          }
        }
        for (var i = 0; i < maxinum - length; i++) {
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }

        outThis.setData({
          members: members,
          num: num
        });*/
      },
      success: function (battleMembers) {
        var length = battleMembers.length;
        var num = length;
        var members = new Array();
        for (var i = 0; i < battleMembers.length; i++) {
          members.push({
            imgUrl: battleMembers[i].headImg
          });
        }
        for (var i = 0; i < maxinum - length; i++) {
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }

        outThis.setData({
          num: num
        });

        outThis.showMembers(battleMembers);

        var mininum = outThis.data.mininum;

        if (mininum <= num) {
          requestTarget.stop();
        }
        if (callback && callback.success) {
          callback.success();
        }
      },
      fail: function () {
        callback.fail();
      }
    }, 0);
  },

  luying: function () {
    //创建一个动画对象，设置它的属性  
    var animation1 = wx.createAnimation({
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
    var animation2 = wx.createAnimation({
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
      animationData1: animation1.export(),
      animationData2: animation2.export()
    })

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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (flushMembersInterval){
      clearInterval(flushMembersInterval);
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