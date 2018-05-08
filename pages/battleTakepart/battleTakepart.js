// battleTakepart.js
var request = require("../../utils/request.js");
var battleRequest = require("../../utils/battleInfoRequest.js");
var battleRoomRequest = require("../../utils/battleRoomRequest.js");
var battleRoomsRequest = require("../../utils/battleRoomsRequest.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var battleMembersRequest = require("../../utils/battleMembersRequest.js");
var takepartRequest = require("../../utils/takepartRequest.js");

var battleAddRoomRequest = require("../../utils/battleAddRoomRequest.js");
var resourceRequest = require("../../utils/resourceRequest.js");
var test = require("../../utils/test.js");
var util = require("../../utils/util.js");
var cacheUtil = require("../../utils/cacheUtil.js");
var battleTakepartCache = require("../../utils/cache/battleTakepartCache.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var app = getApp();
var headImg = "http://ovcnyik4l.bkt.clouddn.com/d89f42d36c18e16d9900a5cd43e8edf2.png";
var battleId = null;
var roomId = null;
var requestTarget;
var layerout = new baseLayerout.BaseLayerout({
  /**
   * 页面的初始数据
   */
  data: {
    autoTakepart:0,
    owner:"",
    imgUrl:"",

    roomInfoContent:"",

    roomInfoName:"",

    isFull:0,
    
    chat:"wangyuchuan12",

    members:[{
      imgUrl:"http://otsnwem87.bkt.clouddn.com/user.png"
    },{
      imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png" 
      }],

    isManager:0,

    isOwner:0,

    status:0,

    maxinum:8,

    mininum:1,

    num:0,

    shareAlert:0,

    shareCreate:0

  },

  closeShareAlertPlug:function(){
    this.setData({
      shareAlert:0,
      shareCreate:0
    });
  },

  createClick:function(){
    this.setData({
      shareCreate:1,
      shareAlert:1
    });
    /*wx.navigateTo({
      url: '../battleRoomEdit/battleRoomEdit?battleId='+battleId
    });*/
  },
  

  skipToRank:function(){
    wx.navigateTo({
      url: '../battleRank/battleRank?battleId='+battleId+"&roomId="+roomId
    });
  },

  signOutClick:function(){
    var outThis = this;
    this.showLoading();
    takepartRequest.battleSignout(battleId,roomId,{
      success:function(){
        outThis.hideLoading();        
        wx.redirectTo({
          url: 'battleTakepart?battleId=' + battleId + "&roomId=" + roomId
        });
      },
      fail:function(errorMsg){
        console.log("errorMsg:"+errorMsg);
      }
    });
  },
  

  //初始化数据
  init:function(){

    var outThis = this;
    this.setData({
      imgUrl: battleRequest.battleInfo.headImg,
      battleInfoContent: battleRequest.battleInfo.instruction,
      battleInfoName: battleRequest.battleInfo.name
    });
    this.showLoading();
  
    this.initBattleInfo({
      success:function(){
        outThis.initMemberInfo({
          success:function(){
            outThis.loadPreProgress();
            var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
            if(outThis.data.owner==memberInfo.battleUserId){
              outThis.setData({
                isOwner:1
              });
            }else{
              outThis.setData({
                isOwner: 0
              });
            }
            outThis.initBattleMembers({
              success:function(){
                outThis.hideLoading();
              },
              fail:function(){
                outThis.showToast("网络异常");
                outThis.hideLoading();
              }
            });
          },
          fail:function(){
            outThis.showToast("网络异常");
            outThis.hideLoading();
          }
        })
      },
      fail:function(){

      }
    });
  },

  //吃石化比赛信息数据
  initBattleInfo:function(callback){
    var outThis = this;
    battleRoomRequest.info(roomId,{
      success: function (roomInfo) {
        callback.success();
       
        wx.setNavigationBarTitle({
          title: roomInfo.name
        })
        outThis.setData({
          imgUrl: roomInfo.imgUrl,
          smallImgUrl: roomInfo.smallImgUrl,
          roomInfoName: roomInfo.name,
          roomInfoContent: roomInfo.instruction,
          maxinum: roomInfo.maxinum,
          mininum: roomInfo.mininum,
          owner:roomInfo.owner,
          costBean:roomInfo.costBean,
          costMasonry: roomInfo.costMasonry
        });
      },
      fail: function () {
        callback.fail();
      }
    });
  },

  login:function(callback){
    request.requestLogin({
      success:function(){
        callback.success();
      },
      fail:function(){
        callback.fail();
      }
    });
  },

  copyChat:function(){
    var outThis = this;
    wx.setClipboardData({
      data: outThis.data.chat,
      success:function(){
        outThis.showToast("复制成功");
      }
    })
  },

  myPersonalRoomClick:function(){
    var outThis = this;
    outThis.showLoading();
    battleRoomsRequest.myPersonalRoomRequest(battleId, {
      success: function (battleRoom) {
        outThis.hideLoading();
        outThis.skipToRoom(battleRoom.id, battleRoom.battleId);
      },
      fail: function () {
        outThis.hideLoading();
        console.log("失败");
      }
    });
  },

  skipToRoom: function (roomId, battleId) {
    wx.navigateTo({
      url: '../battleTakepart/battleTakepart?roomId=' + roomId + "&battleId=" + battleId
    });
  },

  initMemberInfo:function(callback){
    var outThis = this;
    battleMemberInfoRequest.getBattleMemberInfo(battleId,roomId,{
      success:function(memberInfo){
        outThis.setData({
          status:memberInfo.status,
          isManager:memberInfo.isManager,
          roomId:roomId
        });
        battleMemberInfoRequest.setBattleMemberInfoFromCache(memberInfo);
        callback.success();

        if(memberInfo.status==2||memberInfo.roomStatus==3){
          outThis.skipToProgress();
        }
      },
      fail:function(){
        callback.fail();
      }
    });
  },

 //初始化参赛人员列表数据
  initBattleMembers:function(callback){
    var members = new Array();
    for(var i=0;i<40;i++){
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
    var num = 0;
    requestTarget = battleMembersRequest.getBattleMembers(battleId,roomId,{
      cache: function (battleMembers){
        var members = new Array();
        var length = 0;
        if (battleMembers != null && battleMembers.length>0){
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
          num:num
        });
      },
      success: function (battleMembers) {
       battleTakepartCache.members = battleMembers;
       callback.success(battleMembers);
       
        var length = battleMembers.length;
        var num =  length; 
        var members = new Array();
        for (var i = 0; i < battleMembers.length;i++){
          members.push({
            imgUrl: battleMembers[i].headImg
          });
        }
        for (var i = 0; i < maxinum-length;i++){
          members.push({
            imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png"
          });
        }

        outThis.setData({
          members: members,
          num:num
        });

        var mininum = outThis.data.mininum;

        if (mininum <= num) {
          requestTarget.stop();
        }

      },
      fail: function () {
        callback.fail();
      }
    },15000);
  },

  managerClick:function(){
    wx.navigateTo({
      url: '../manager/roomEdit/roomEdit?id='+roomId+"&battleId="+battleId
    });
  },

  skipToProgress:function(){
    wx.redirectTo({
      url: '../progressScore/progressScore2?battleId=' + battleId + "&roomId=" + roomId
    });
  },

  doTakepart:function(){
    var outThis = this;
    var members = outThis.data.members;
    var num = this.data.num;
    var mininum = this.data.mininum;
    var maxinum = this.data.maxinum;
    var status = this.data.status;
    /*if(num>=maxinum&&status==0){
      outThis.showConfirm("房间人数已满", "是否创建新房间", {
        confirm: function () {
          outThis.createClick();
        },
        cancel: function () {

        }

      }, "创建", "取消");
      return;
    }*/
    if(status==2||status==1){
      outThis.skipToProgress();
      return;
    }
    this.showLoading();
    takepartRequest.battleTakepart(battleId, roomId, {
      success: function (member) {
        num++;
        outThis.hideLoading();
        outThis.showToast("报名成功");
        members.splice(num - 1, 1, {
          imgUrl: member.headImg
        });
        outThis.setData({
          members: members,
          num: num,
          status: 1
        });
        if (mininum <= num) {
          requestTarget.stop();
        }
        var battleMembers = battleTakepartCache.members;

        battleMembers.push(member);

        battleTakepartCache.members = battleMembers;


        if (num >= mininum){
          outThis.skipToProgress();
        }else{
          if (maxinum>2){
            outThis.showConfirm("还差" + (mininum - num) + "个人", "分享一下，马上组团成功", {
              confirm: function () {
                outThis.shareRoomClick();
              },
              cancel: function () {
                outThis.shareRoomClick();
              }

            }, "确定", "取消");
          }
        }
      },
      beanNotEnough:function(){
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
      masonryNotEnough:function(){
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
        outThis.skipToProgress();
      },
      battleEnd: function () {
        outThis.hideLoading();
        outThis.skipToProgress();
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

  //点击参赛请求
  takepartClick:function(){
    var outThis = this;
    var status = this.data.status;
    var costBean = this.data.costBean;
    var costMasonry = this.data.costMasonry;
    if ((status == 0 || status == 3) && (costBean > 0 || costMasonry>0)){
      var str = "创建该房间需要花费"
      if(costBean>0){
        str=str+costBean+"颗智慧豆";
        if (costMasonry>0){
          str = str + ","+costMasonry + "颗砖石";
        }
      } else if (costMasonry>0){
        str = str + costMasonry + "颗砖石";
      }
      console.log("str:"+str);
      this.showConfirm("是否参与", str, {
        confirm:function(){
          outThis.doTakepart();
        },
        cancel:function(){

        }
      }, "参与", "取消")
    }else{
      outThis.doTakepart();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var key = options.key;
    var outThis = this;
    var autoTakepart = options.autoTakepart;
    if(key){
      battleRoomRequest.roomEntryInfo(key,{
        success:function(entryInfo){
          roomId = entryInfo.roomId;
          battleId = entryInfo.battleId;
          outThis.init();
        },
        fail:function(){

        }
      });
    }else{
      roomId = options.roomId;
      battleId = options.battleId;
      cacheUtil.battleId = battleId;
      request.requestLogin({
        success: function () {
          outThis.init();
        },
        fail: function () {
        }
      })
    }

    if (autoTakepart == 1) {
      this.showConfirm("对战房间创建成功", "邀请同伴一起来PK一下吧", {
        confirm: function () {
          outThis.doTakepart();
        },
        cancel: function () {
          outThis.doTakepart();
        }
      }, "确定", "取消");
    }
    
  },

  shareRoomClick:function(){
    var outThis = this;
    this.showLoading();
    resourceRequest.previewShareRoomImage(roomId,{
      success:function(){
        outThis.hideLoading();
      },
      fail:function(){
        outThis.hideLoading();
        outThis.showToast("加载失败");
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 //   requestTarget.stop();
  },



  onUnload: function () {
    requestTarget.stop();
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

    var shareCreate = this.data.shareCreate;

    this.setData({
      shareAlert:0
    });

    if(shareCreate==1){
      this.setData({
        shareCreate:0
      });
      var uuid = util.uuid();
      return {
        title: this.data.battleInfoName,
        desc: this.data.battleInfoContent,
        path: 'pages/battleTakepart/battleTakepart?key=' + uuid,
        success: function () {
          battleAddRoomRequest.requestAddRoomWithShare(roomId, uuid, 2,24,{
            success: function (battleRoom) {
              wx.redirectTo({
                url: 'battleTakepart?battleId=' + battleRoom.battleId + "&roomId=" + battleRoom.id
              });
            },
            fail: function () {

            },
            createEntry: function (battleRoom){
              outThis.showConfirm("您已经创建过该房间,不能重复创建", "是否跳转到该房间", {
                confirm: function () {
                  wx.redirectTo({
                    url: 'battleTakepart?battleId=' + battleRoom.battleId + "&roomId=" + battleRoom.id
                  });
                },
                cancel: function () {

                }
              }, "跳转", "取消");
            },
            reCreate: function (battleRoom) {
              outThis.showConfirm("您已经创建过该房间,不能重复创建", "是否跳转到该房间", {
                confirm: function () {
                  wx.redirectTo({
                    url: 'battleTakepart?battleId=' + battleRoom.battleId + "&roomId=" + battleRoom.id
                  });
                },
                cancel: function () {

                }
              }, "跳转", "取消");
            }
          });
        }
      }
    }else{
      return {
        title: this.data.battleInfoName,
        desc: this.data.battleInfoContent,
        path: 'pages/battleTakepart/battleTakepart?battleId=' + battleId+"&roomId="+roomId
      }
    }
  }
});
layerout.begin();