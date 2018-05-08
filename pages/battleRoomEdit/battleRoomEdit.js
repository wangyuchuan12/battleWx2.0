var battlePeriodsRequest = require("../../utils/battlePeriodsRequest.js");
var battlesRequest = require("../../utils/battlesRequest.js");
var battleAddRoomRequest = require("../../utils/battleAddRoomRequest.js");
var cacheUtil = require("../../utils/cacheUtil.js");
var battleExpertRequest = require("../../utils/battleExpertRequest.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var outThis;
var battleId;
var layerout = new baseLayerout.BaseLayerout({
  eventListener:{
    selectItem:function(id){
      outThis.initPeriods(id);
    }
  },
  data: {
    enablePublic:1,
    isPublic:0,
    selectPeriodId:null,
    periods:[],
    rooms:[{
      id:"room0",
      maxinum:4,
      mininum:4,
      status:0
    }, {
      id: "room1",
      maxinum: 8,
      mininum: 8,
      status: 0
      }, {
        id: "room2",
        maxinum: 12,
        mininum: 12,
        status: 0
    }, {
      id: "room3",
      maxinum: 16,
      mininum: 16,
      status: 0
      }, {
        id: "room50",
        maxinum: 48,
        mininum: 2,
        status: 0
    }, {
      id: "room100",
      maxinum: 100,
      mininum: 2,
      status: 0
    }],
    selectInputData: {
      id: null,
      status: 0,
      items: [/*
        {
          content: "动漫",
          id: 1,
          status: 0
        }, {
          content: "诗歌就是如此",
          id: 2,
          status: 0
        }, {
          content: "童年",
          id: 3,
          status: 0
        }, {
          content: "成语",
          id: 4,
          status: 0
        }*/
      ]
    }
  },

  selectPeriod:function(id){
    var periods = this.data.periods;
    for(var i=0;i<periods.length;i++){
      var period = periods[i];
      if(period.id==id){
        if (period.isPublic == 0) {
          outThis.setData({
            isPublic: 0,
            enablePublic: 0
          });
        } else {
          outThis.setData({
            isPublic: 0,
            enablePublic: 1
          });
        }
      }  
    }
    this.setData({
      "selectPeriodId":id
    });
  },

  applyExpertSuccess:function(){
    wx.navigateTo({
      url: '../expertInfo/expertInfo'
    });
  },

  customClick:function(){
    var battleId = this.data.selectInputData.id;
    battleExpertRequest.qualified(battleId, {
      success: function (data) {
        console.log(JSON.stringify(data));
        if (data.qualified) {
          wx.navigateTo({
            url: '../confirmPeriodList/confirmPeriodList?battleId='+battleId
          });
        } else {
          if (data.status == 0) {
            outThis.showConfirm("申请出题资格", "对不起，您目前还没有该题库的出题资格，是否申请出题资格", {
              confirm: function () {
                wx.navigateTo({
                  url: '../applyExpert/applyExpert?battleId='+battleId
                });
              },
              cancel: function () {

              }
            }, "确定", "取消");
          } else {
            var expertId = data.expertId;
            wx.navigateTo({
              url: '../expertInfo/expertInfo?expertId='+expertId+"&battleId="+battleId
            });
          }
        }
      },
      fail: function () {

      }
    });
  },

  isPublicSwitch:function(e){
    var value = e.detail.value;
    if (value) {
      this.setData({
        isPublic: 1
      });
    } else {
      this.setData({
        isPublic: 0
      });
    }

    console.log(this.data.isPublic);
    
  },

  addRoomAction:function(room){
    var outThis = this;
    
    var maxinum = room.maxinum;
    var mininum = room.mininum;
    var battleId = this.data.selectInputData.id;
    var periodId = this.data.selectPeriodId;
    var isPublic = this.data.isPublic;

    if(!battleId){
      this.showToast("请选中一场比赛");
      return;
    }
    if(!periodId){
      console.log("sssss");
      this.showToast("请选中一个题库");
      return;
    }

    this.showLoading();

    battleAddRoomRequest.requestAddRoom({
      battleId: battleId,
      periodId: periodId,
      maxinum: maxinum,
      mininum: mininum,
      isPublic: isPublic
    }, {
        success: function (room) {
          wx.redirectTo({
            url: '../battleTakepart/battleTakepart?battleId=' + room.battleId + "&roomId=" + room.id
          });
          outThis.hideLoading();
        },
        fail: function () {
          console.log("fail");
        },
        reCreate: function (room) {
          outThis.hideLoading();
          outThis.showConfirm("重复创建提示", "该题库的房间您已经创建过了，不能重复创建", {
            confirm: function () {
              wx.redirectTo({
                url: '../battleTakepart/battleTakepart?battleId=' + room.battleId + "&roomId=" + room.id
              });
            },
            cancel: function () {

            }
          }, "跳转");
        }
      });
  },

  roomItemClick:function(e){
    var outThis = this;
    var id = e.currentTarget.id;
    var rooms = this.data.rooms;
    var selectRoom;
    for(var i=0;i<rooms.length;i++){
      var room = rooms[i];
      if(room.id==id){
        room.status=1;
        selectRoom = room;
      }
    }
    this.setData({
      rooms:rooms
    });
    setTimeout(function(){
      for (var i = 0; i < rooms.length; i++) {
        var room = rooms[i];
        if (room.id == id) {
          room.status = 0;
        }
      }
      outThis.setData({
        rooms: rooms
      });

    },100);
    this.addRoomAction(selectRoom);
  },

  periondItemClick:function(e){
    var id = e.currentTarget.id;
    
    this.selectPeriod(id);
    
  },

  initPeriods:function(battleId){
    var outThis = this;
    battlePeriodsRequest.periodsRequest(battleId,{
      success:function(periods){
        var array = new Array();
        for(var i=0;i<periods.length;i++){
          var period = periods[i];
          array.push({
            id:period.id,
            ownerNickname: period.ownerNickname,
            takepartCount: period.takepartCount,
            percent:20,
            ownerImg:period.ownerImg,
            isDefault:period.isDefault,
            status:0,
            isPublic:period.isPublic
          });
        }
        outThis.setData({
          periods:array,
          selectPeriodId:null
        })
      },
      fail:function(){

      }
    });
  },

  initBattles:function(battleId){
    this.showLoading();
    var outThis = this;
    battlesRequest.requestBattles({
      success:function(battles){
        outThis.hideLoading();
        var items = new Array();
        for(var i=0;i<battles.length;i++){
          var battle = battles[i];
          items.push({
            content:battle.name,
            id:battle.id,
            status:0
          });
        }
        if (!battleId&&items.length>0){
          outThis.setData({
            "selectInputData.id":items[0].id,
            "selectInputData.items": items,
            selectPeriodId:null
          });
          outThis.initPeriods(items[0].id);
          
        }else if(battleId&&items.length>0){
          outThis.setData({
            "selectInputData.id": battleId,
            "selectInputData.items": items,
            selectPeriodId: null
          });
          outThis.initPeriods(battleId);
        }
      },
      fail:function(){
        outThis.hideLoading();
      }
    });
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    outThis = this;
    var battleId = options.battleId;

    this.setData({
      "selectInputData.id":battleId
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("...................onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var battleId = this.data.selectInputData.id;
    if(!battleId){
      battleId = cacheUtil.battleId;
    }

    console.log("battleId:"+battleId);
    if (battleId){
      this.initBattles(battleId);
    }else{
      this.initBattles();
    }

    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
    if (memberInfo) {
      this.setData({
        isManager: memberInfo.isManager
      });
    }
    
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

layerout.addSelectInput();


layerout.begin();