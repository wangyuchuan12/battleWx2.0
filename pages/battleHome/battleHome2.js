var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleRoomsRequest = require("../../utils/battleRoomsRequest.js");
var randomRoomRequest = require("../../utils/randomRoomRequest.js");
var battlesRequest = require("../../utils/battlesRequest.js");

var request = require("../../utils/request.js");
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

  battleItemClick:function(e){
    var id = e.currentTarget.id;
    var battles = this.data.battles;
    for(var i=0;i<battles.length;i++){
      var battle = battles[i];

      if(battle.isOpen==0){
        if (battle.id == id) {
          battle.isOpen = 1;
        } else {
          battle.isOpen = 0;
        }
      }else{
        if (battle.id == id) {
          battle.isOpen = 0;
        } else {
          battle.isOpen = 0;
        }
      }
      
    }

    this.setData({
      battles:battles
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
            status: 0,
            headImg:battle.headImg,
            isOpen:0
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
    var outThis = this;
    this.initBattles(null, true);
    request.getUserInfo({
      success: function (userInfo) {
        if (userInfo) {
          outThis.setData({
            userImgUrl: userInfo.avatarUrl
          });
        }
      }
    });
    /*
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
    });*/
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

  quickStart: function (e) {
    var id = e.currentTarget.id;

    console.log("id:"+id);

    this.setData({
      battleId:id
    });

    this.randomRoom();
  },


  myRoomClick:function(e){
    var id = e.currentTarget.id;
    this.skipToMyRooms();
  },

  myPersonalRoomClick:function(e){
    var id = e.currentTarget.id;
    this.setData({
      battleId:id
    });

    this.skiptToPersonalRoom();
  },
  
  skiptToPersonalRoom:function(){
    var outThis = this;
    var battleId = this.data.battleId;
    outThis.showLoading();
    battleRoomsRequest.myPersonalRoomRequest(battleId,{
      success:function(battleRoom){
        outThis.hideLoading();
        outThis.skipToRoom(battleRoom.id, battleRoom.battleId);
      },
      fail:function(){
        outThis.hideLoading();
        console.log("失败");
      }
    });
  },

  takeoutClick: function () {
    wx.navigateTo({
      url: '../takeoutMoney/takeoutMoney'
    });
  },

  randomRoom: function () {
    var outThis = this;
    var battleId = this.data.battleId;
    console.log(".........battleId:"+battleId);
    randomRoomRequest.randomRoom(battleId, {
      success: function (room) {
        outThis.skipToRoom(room.id, room.battleId);
      },
      fail: function () {
        console.log("fail");
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
    var outThis = this;
    request.requestLogin({
      success: function (userInfo) {
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initAccountInfo();
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

  }
});

layerout.addAttrPlug();

layerout.begin();