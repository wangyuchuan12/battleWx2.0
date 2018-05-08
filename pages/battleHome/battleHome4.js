var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleRoomsRequest = require("../../utils/battleRoomsRequest.js");
var randomRoomRequest = require("../../utils/randomRoomRequest.js");
var battlesRequest = require("../../utils/battlesRequest.js");

var request = require("../../utils/request.js");

var util = require("../../utils/util.js");

var battleAddRoomRequest = require("../../utils/battleAddRoomRequest.js");

var resourceRequest = require("../../utils/resourceRequest.js");


var rankBattleRequest = require("../../utils/rankBattleRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battleId: 0,
    battles: [],
    selectStatus: 0,
    isManager: 0,
    userImgUrl: "",
    shareAlert: 0,
    userId: null,
    rooms: [/*{
      imgUrl:"http://7xlw44.com1.z0.glb.clouddn.com/0042aeda-d8a5-4222-b79d-1416ab222898",
      name:"火影忍者",
      instruction:"这是一个忍者的故事",
      num:3,
      maxNum:4,
      id:1,
      battleId:1
    }, {
      imgUrl: "http://7xlw44.com1.z0.glb.clouddn.com/0042aeda-d8a5-4222-b79d-1416ab222898",
      name: "火影忍者",
      instruction: "这是一个忍者的故事",
      num: 3,
      maxNum: 4,
      id:1,
      battleId:1
    }*/]
  },


  followClick: function () {
    // resourceRequest.previewImage("http://ovqk5bop3.bkt.clouddn.com/qrcode_for_gh_32c73b133282_1280.jpg");
  },

  closeShareAlertPlug: function () {
    this.setData({
      shareAlert: 0,
      shareCreate: 0
    });
  },

  pkClick: function () {
    /*this.setData({
      shareCreate: 1,
      shareAlert: 1
    });*/
    wx.navigateTo({
      url: '../pkRoom/pkRoom'
    });
  },

  factoryClick: function () {
    wx.navigateTo({
      url: '../questionFactory/questionFactoryMain/questionFactoryMain'
    });
  },

  danClick: function () {
    wx.navigateTo({
      url: '../rankDanBattle/rankDanBattle'
    });
  },

  selectClick: function (e) {
    this.initBattles();
  },

  selectItemClick: function (e) {
    var id = e.currentTarget.id;
    this.setData({
      battleId: id,
      selectStatus: 0
    });
  },

  mallClick: function () {
    wx.navigateTo({
      url: '../mall/mall',
    });
  },

  rankBattleClick: function () {
    wx.navigateTo({
      url: '../rankBattle/rankBattle'
    });
  },

  dekornBattleClick: function () {
    wx.navigateTo({
      url: '../battleDekornList/battleDekornList'
    });
  },


  registRankBattle: function (recommendUserId, callback) {
    rankBattleRequest.registRankBattle(recommendUserId, callback);
  },

  quickStart:function(){
    wx.navigateTo({
      url: '../luckDraw/luckDraw'
    });
  },

  initBattles: function (battleId, flag) {
    this.showLoading();
    var outThis = this;
    battlesRequest.requestBattles({
      success: function (battles) {
        outThis.hideLoading();
        var items = new Array();
        for (var i = 0; i < battles.length; i++) {
          var battle = battles[i];
          items.push({
            content: battle.name,
            id: battle.id,
            status: 0
          });
        }
        if (!battleId && items.length > 0 && flag) {
          outThis.setData({
            "battleId": items[0].id,
            "battles": items,
            selectStatus: 0
          });
        } else if (battleId && items.length > 0) {
          outThis.setData({
            "battleId": battleId,
            "battles": items,
            selectStatus: 0
          });
        } else {
          outThis.setData({
            "battles": items,
            selectStatus: 1
          });
        }
      },
      fail: function () {
        outThis.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    /*var outThis = this;

    request.requestLogin({
      success: function () {
        outThis.init();
      },
      fail: function () {
      }
    });*/

    var skipType = options.skipType;
    var registUserId = options.registUserId;


    console.log("registUserId:" + registUserId);

    var outThis = this;
    request.requestLogin({
      success: function (userInfo) {
        outThis.setData({
          userId: userInfo.id
        });
        outThis.registRankBattle(registUserId, {
          success: function () {
            //这里跳转到排位赛
            if (skipType == 0) {
              wx.navigateTo({
                url: '../rankBattle/rankBattle'
              });
              //跳转到闯关
            } else if (skipType == 1) {
              /*wx.navigateTo({
                url: '../danList/danList'
              });*/
            } else if (skipType == 2) {
              var roomId = options.roomId;
              wx.navigateTo({
                url: '../pkRoom/pkRoom?role=1&id=' + roomId
              });
              //挑战赛
            } else if (skipType == 3) {

            }else if(skipType==4){
              wx.navigateTo({
                url: '../rankDanBattle/rankDanBattle'
              });
            }
          },
          fail: function () {

          }
        });
        if (userInfo.openid == "o6hwf0S9JT_Ff0LVBORFsBrhAtpM") {
          outThis.setData({
            isManager: 1
          });
        } else {

        }
      },
      fail: function () {

      }
    });
  },

  init: function () {
    var outThis = this;
    this.initBattles(null, true);
    request.getUserInfo({
      success: function (userInfo) {
        console.log("")
        if (userInfo) {
          outThis.setData({
            userImgUrl: userInfo.avatarUrl
          });
        }
      }
    });
    battleRoomsRequest.roomsRequest({
      success: function (rs) {
        var rooms = new Array();
        for (var i = 0; i < rs.length; i++) {
          var r = rs[i];
          rooms.push({
            name: r.name,
            instruction: r.instruction,
            num: r.num,
            maxNum: r.maxinum,
            id: r.id,
            imgUrl: r.imgUrl,
            battleId: r.battleId,
            smallImgUrl: r.smallImgUrl,
            isRedpack: r.isRedpack,
            redpackAmount: r.redpackAmount,
            redpackMasonry: r.redpackMasonry,
            redpackBean: r.redpackBean,
            redPackNum: r.redPackNum
          });
        }
        outThis.setData({
          rooms: rooms
        });
      },
      fail: function () {

      }
    });
  },

  battleManagerClick: function () {
    var outThis = this;
    var isManager = this.data.isManager;

    if (isManager == 1) {
      wx.navigateTo({
        url: '../manager/managerMain/managerMain'
      });
    } else {
      outThis.showToast("没有权限");
    }
  },

  skipToRoom: function (roomId, battleId) {
    wx.navigateTo({
      url: '../battleTakepart/battleTakepart?roomId=' + roomId + "&battleId=" + battleId
    });
  },

  skipToMyRooms: function () {
    wx.navigateTo({
      url: "../myBattleRooms/myBattleRooms"
    });
  },

  createRoomClick: function () {
    wx.navigateTo({
      url: '../battleRoomEdit/battleRoomEdit'
    });
  },

  itemClick: function (e) {
    var outThis = this;
    var rooms = this.data.rooms;
    var id = e.currentTarget.id;
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      if (room.id == id) {
        outThis.skipToRoom(room.id, room.battleId);
        break;
      }
    }
  },

  takeoutClick: function () {
    wx.navigateTo({
      url: '../takeoutMoney/takeoutMoney'
    });
  },

  randomRoom: function () {
    var outThis = this;
    var battleId = this.data.battleId;
    randomRoomRequest.randomRoom(battleId, {
      success: function (room) {
        outThis.skipToRoom(room.id, room.battleId);
      },
      fail: function () {

      },
      empty: function () {
        outThis.showToast("没有进行中比赛");
      }
    });
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
    var outThis = this;
    this.initAccountInfo({
      success: function () {
        outThis.loadPreProgress();
      }
    });
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
    var outThis = this;
    var userId = this.data.userId;
    return {
      path: 'pages/battleHome/battleHome3?registUserId=' + userId,
      success: function () {
      }
    }
  }
});

layerout.addAttrPlug();

layerout.begin();