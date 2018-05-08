var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleRoomsRequest = require("../../utils/battleRoomsRequest.js");
var accountRequest = require("../../utils/accountRequest.js");
var randomRoomRequest = require("../../utils/randomRoomRequest.js");
var battlesRequest = require("../../utils/battlesRequest.js");

var battleMembersRequest = require("../../utils/battleMembersRequest.js");

var battleTakepartCache = require("../../utils/cache/battleTakepartCache.js");

var request = require("../../utils/request.js");

var battleDanRequest = require("../../utils/battleDanRequest.js");

var takepartRequest = require("../../utils/takepartRequest.js");


var requestTarget;

var flushMembersInterval;

var dotAnFunInterval;

var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    danId: 0,
    danName: "",
    name: "",
    imgUrl: "",
    roomId: "",
    battleId: "",
    maxinum: 0,
    mininum: 0,
    num: 0,
    remainderHour: 0,
    remainderMin: 0,
    remainderSecond: 0,
    timeDiffer: 1,
    projects: [{
      isOpen: 1
    }],
    members: [{
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
    }, {
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
    }, {
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
    }],

    rewards: []
  },

  reckonTime: function () {
    var outThis = this;
    var flag = false;
    var num = this.data.num;
    var mininum = this.data.mininum;
    var interval = setInterval(function () {
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

  showCircleDo: function () {
    var outThis = this;
    var i = 0
    var width = wx.getSystemInfoSync().windowWidth;
    var left = width / 2 - 97.5;
    var dotAnData = wx.createAnimation({
      duration: 1000,
      transformOrigin: "85px 140px",
    });
    var dotAnData2 = wx.createAnimation({
      duration: 1000,
      transformOrigin: "80px 80px",
    });

    dotAnFunInterval = setInterval(function () {
      i = i + 1;
      dotAnData.rotate(10 * i).step();
      outThis.setData({
        dotAnData1: dotAnData.export()
      });

      dotAnData2.rotate(6 * i).step();
      outThis.setData({
        dotAnData2: dotAnData2.export()
      });
    }.bind(outThis), 50);
  },


  initDanRoomInfo: function () {
    var outThis = this;
    var danId = this.data.danId;
    outThis.showLoading();
    battleDanRequest.danRoomInfo(danId, {
      success: function (room) {
        outThis.hideLoading();
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
            outThis.hideLoading();
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var outThis = this;
    var danId = options.danId;
    this.setData({
      danId: danId
    });

    this.initDanRoomInfo();

    flushMembersInterval = setInterval(function () {
      outThis.initBattleMembers({
        success: function () {
          outThis.takepartClick(null, 1, 1);
        },
        fail: function () {

        }
      });
    }, 10000);

    this.showCircleDo();
  },

  showMembers: function (ms) {
    var members = new Array();
    var maxinum = this.data.maxinum;

    if (ms && ms.length > 0) {
      for (var i = 0; i < ms.length; i++) {
        members.push({
          imgUrl: ms[i].headImg,
          index:i
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
    battleTakepartCache.members = ms;
  },

  takepartClick: function (e, toastFlag, isAsk) {
    var outThis = this;
    var members = outThis.data.members;
    var num = this.data.num;
    var mininum = this.data.mininum;
    var maxinum = this.data.maxinum;
    var status = this.data.status;
    this.showLoading();
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var status = this.data.status;


    var roomStatus = this.data.roomStatus;

    if (roomStatus == 3) {
      wx.navigateBack({

      });
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];

      var danId = this.data.danId;
      prevPage.restart(danId);
      return;
    }

    if (status == 1) {
      this.hideLoading();
      var remainder = outThis.data.timeDiffer;
      if (remainder > 0) {
        if (!toastFlag) {
          outThis.showToast("比赛未开始");
        }
        return;
      }

      if (mininum > num) {
        if (!toastFlag) {
          this.showToast("人数最少为" + mininum + "人，请等待...");
        }
        return;
      }

      if (isAsk) {
        this.showConfirm("跳转到游戏", "是否确定挑战", {
          confirm: function () {
            wx.redirectTo({
              url: '../progressScore/progressScore2?roomId=' + roomId + "&battleId=" + battleId + "&againButton=返回"
            });
          },
          cancel: function () {

          }
        });
      } else {
        wx.redirectTo({
          url: '../progressScore/progressScore2?roomId=' + roomId + "&battleId=" + battleId + "&againButton=返回"
        });
      }

      return;
    }




    takepartRequest.battleTakepart(battleId, roomId, {
      success: function (member) {
        outThis.setData({
          status: 1
        });
        outThis.hideLoading();
        outThis.initBattleMembers();
        console.log("fail");
      },
      beanNotEnough: function () {
        outThis.hideLoading();
        outThis.showConfirm("智慧豆不足", "智慧豆不足，是否充值智慧豆", {
          confirm: function () {
            wx.navigateTo({
              url: '../mall/mall'
            });
          },
          cancel: function () {

          }

        }, "充值", "取消");
      },
      masonryNotEnough: function () {
        outThis.hideLoading();
        outThis.showToast("砖石不足");
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
        outThis.hideLoading();
      },
      battleEnd: function () {
        outThis.hideLoading();
      },
      roomEnd: function () {
        outThis.hideLoading();
        outThis.showToast("比赛已经结束");
      },
      roomFull: function () {
        outThis.hideLoading();
        outThis.showConfirm("房间人数已满", "是否创建新房间", {
          confirm: function () {
            outThis.createClick();
          },
          cancel: function () {

          }

        }, "创建", "取消");
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
        battleTakepartCache.members = battleMembers;
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

  restart: function () {
    var outThis = this;
    this.showLoading();
    setTimeout(function () {
      outThis.hideLoading();
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      wx.navigateBack({});
      var danId = outThis.data.danId;
      if (prevPage.restart) {
        prevPage.restart();
      }
    }, 2000);
  },

  backListener: function () {
    /*var outThis = this;
    this.showLoading();
    setTimeout(function () {
      outThis.hideLoading();
      wx.navigateBack({});
    }, 1000);*/
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
    /*if (flushMembersInterval) {
      clearInterval(flushMembersInterval);
    }*/
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (flushMembersInterval) {
      clearInterval(flushMembersInterval);
    }
    if (dotAnFunInterval){
      clearInterval(dotAnFunInterval);
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
    var path = "pages/battleHome/battleHome3";
    return {
      path: path,
      success: function () {
      }
    }
  }
});

layerout.begin();