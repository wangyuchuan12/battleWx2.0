var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var battleRoomRequest = require("../../utils/battleRoomRequest.js");

var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");

var battleMembersRequest = require("../../utils/battleMembersRequest.js");

var membersRankUtil = require("../../utils/membersRankUtil.js");

var redPackListRequest = require("../../utils/redPackListRequest.js");

var receiveRedPackRequest = require("../../utils/receiveRedpackRequest.js");

var battleRoomRecordsRequest = require("../../utils/battleRoomRecordsRequest.js");

var redPackCache = require("../../utils/cache/redPackCache.js");

var stageRankUtil = require("../../utils/stageRankUtil.js");

var outThis = this;
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battleId:0,
    roomId:0,
    loveCount:0,
    loveResidule:0,
    nickname:"",
    periodId:"",
    process:0,
    stageCount:0,
    stageIndex:0,
		
    status:0,
		
    isCreater:0,
    isManager:0,
    openId:"",
    userId:"",
		
    roomId:"",
		
    speedCoolBean:0,
    speedCoolSecond:0,
		
    roomProcess:0,
    roomScore:0,
		
    num:0,
		
    maxinum:0,
		
    mininum:0,

    amount:0,
    
    stages:[{
      stageIndex:0,
      redPacks:[]
    }],

    roomRecords:[]
  },

  eventListener: {
    skipToRedpackInfo: function (id) {
      var battleId = outThis.data.battleId;
      var roomId = outThis.data.roomId;
      wx.navigateTo({
        url: '../redPackInfo/redPackInfo?id='+id+"&battleId="+battleId+"&roomId="+roomId
      });
    },
    redPackOpen:function(id){

      var stages = outThis.data.stages;
      for(var i=0;i<stages.length;i++){
        var stage = stages[i];
        var redpacks = stage.redpacks;
        for (var j = 0; j < redpacks.length; j++) {
          var redPack = redpacks[j];
          if (redPack.id == id) {
            if (redPack.receiveNum<redPack.num){
              outThis.showRedPack(redPack);
            }else{
              outThis.eventListener.skipToRedpackInfo(id);
            }
           
            return;
          }
        }
      }
      
    },
    receiveRedpackInfo:function(id){
      receiveRedPackRequest.receiveRedpack(id,outThis.data.battleId,outThis.data.roomId,{
        success:function(){
          outThis.redPacketAlertCloseClick();
          outThis.eventListener.skipToRedpackInfo(id);
          redPackCache.addReceived(id);
        },
        fail:function(){
          outThis.showToast("网络繁忙，稍后再试",5000);
        },
        over:function(){
          outThis.showToast("红包已领完",5000);
        },
        roomProcessMeetError:function(){
          outThis.showToast("对不起，房间距离不足，不能领取",5000);
        },
        roomScoreMeetError:function(){
          outThis.showToast("对不起，房间总分数不足，不能领取",5000);
        },
        roomMeetError:function(){
          outThis.showToast("对不起，房间人数不够，不能领取",5000);
        },
        personalProcessMeetError:function(){
          outThis.showToast("对不起，您的进程不足，不能领取",5000);
        },
        personalScoreMeetError:function(){
          outThis.showToast("对不起，您的积分不足，不能领取",5000);
        },
        isReceivedError:function(){
          if (!redPackCache.isReceived()){
            redPackCache.addReceived(id);
          }
          outThis.eventListener.skipToRedpackInfo(id);
        }
      });
    }
  },

  initRoomRecords:function(){
    var outThis = this;
    var roomId = this.data.roomId;
    battleRoomRecordsRequest.roomRecords(roomId,{
      success:function(records){
        outThis.setData({
          roomRecords:records
        })
      },
      fail:function(){

      }
    });
  },

  initRank:function(){
    var rank = 1;
    var battleMembers = battleMembersRequest.battleMembers;
    battleMembers = membersRankUtil.rankByProcess(battleMembers);
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
    for(var i=0;i<battleMembers.length;i++){
      if (battleMembers[i].id == memberInfo.id){
          rank = i+1;
      }
    }
    this.setData({
      rank:rank
    });
  },

  initRoomInfoFromRequest:function(){
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    battleMemberInfoRequest.getBattleMemberInfo(battleId,roomId,{
      success:function(){
        outThis.initRoomInfo();
      },
      fail:function(){

      }
    });
  },

  initRoomInfo:function(){
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();

    var score = memberInfo.score;
    if (!score){
      score = 0;
    }

    var roomScore = memberInfo.roomScore;
    if(!roomScore){
      roomScore = 0;
    }

    this.setData({
      loveCount: memberInfo.loveCount,
      loveResidule: memberInfo.loveResidule,
      nickname: memberInfo.nickname,
      periodId: memberInfo.periodId,
      process: memberInfo.process,
      stageCount: memberInfo.stageCount,
      stageIndex: memberInfo.stageIndex,

      status: memberInfo.status,

      isCreater: memberInfo.isCreater,
      isManager: memberInfo.isManager,
      openId: memberInfo.openId,
      userId: memberInfo.userId,

      speedCoolBean: memberInfo.speedCoolBean,
      speedCoolSecond: memberInfo.speedCoolSecond,

      roomProcess: memberInfo.roomProcess,
      roomScore: roomScore,

      num: memberInfo.num,

      maxinum: memberInfo.maxinum,

      mininum: memberInfo.mininum,
      score:score
    });

    this.initRank();
  },

  initRedPacks:function(){
    var outThis = this;
    var roomId = this.data.roomId;
    redPackListRequest.redPacks(roomId,{
      success: function (stages){
        stages = stageRankUtil.rankByIndex(stages);
        for (var j = 0; j < stages.length;j++){
          var redPacks = stages[j].redpacks;
          for (var i = 0; i < redPacks.length; i++) {
            var redPack = redPacks[i];
            if (redPackCache.isReceived(redPack.id)) {
              redPack.isReceived = true;
            } else {
              redPack.isReceived = false;
            }
          }
        }
        
        outThis.setData({
          stages: stages
        });
      },
      fail:function(){
        console.log("fail");
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    outThis = this;
    var battleId = options.battleId;
    var roomId = options.roomId;
    this.setData({
      battleId:battleId,
      roomId:roomId
    });

    this.initAccountInfo({
      success:function(){
        outThis.setData({
          amount: outThis.getMoney()
        });
      }
    });
    
  },

  startClick:function(){
    wx.navigateTo({
      url: '../progressScore/progressScore?battleId='+this.data.battleId+"&roomId="+this.data.roomId
    });
  },

  welfareTakeoutClick:function(){
    wx.navigateTo({
      url: '../takeoutMoney/takeoutMoney'
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
    this.initRoomInfo();
    this.initRedPacks();
    //this.initRoomRecords();
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

  redPackClick: function (e) {
    var id = e.currentTarget.id;
    var isReceived = redPackCache.isReceived(id);
    if(!isReceived){
      this.eventListener.redPackOpen(id);
    }else{
      this.eventListener.skipToRedpackInfo(id);
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
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var path = "pages/battleTakepart/battleTakepart?battleId=" + battleId + "&roomId=" + roomId
    return {
      title: "问答闯关比赛",
      desc: "问答闯关比赛抢红包",
      path: path
    }
  },
});
layerout.addRedPackAlertPlug();
layerout.addAttrPlug();
layerout.begin();