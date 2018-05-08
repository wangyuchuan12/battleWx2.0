var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var rankBattleRequest = require("../../utils/rankBattleRequest.js");

var rankDanBattleRequest = require("../../utils/rankDanBattleRequest.js");
var takepartRequest = require("../../utils/takepartRequest.js");
var battleMembersRequest = require("../../utils/battleMembersRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    frendMembers: [],
    allMembers: [],
    memberInfo: null,
    firstMemberInfo: null,
    battleId: null,
    roomId: null,
    periodId: null,
    userId: null,
    groupId: null,
    type: 0
  },

  initRanks:function(){
    var outThis = this;
    rankDanBattleRequest.ranks({
      success:function(data){
        console.log("data:"+JSON.stringify(data));
        outThis.loadPreProgress();
        var allMembers = data.allMembers;
        var frendMembers = data.frendMembers;
        var memberInfo = data.memberInfo;
        outThis.setData({
          frendMembers: frendMembers,
          allMembers: allMembers,
          memberInfo: memberInfo,
          userId: memberInfo.userId
        });
        outThis.frendRank();
      },
      fail:function(){
        console.log("fail");
      }
    });
  },

  initMyRankBattleRequest: function () {
    var outThis = this;
    rankBattleRequest.myRankBattleRequest({
      success: function (data) {
        outThis.loadPreProgress();
        var members = data.members;
        var memberInfo = data.memberInfo;
        var groupInfo = data.groupInfo;
        var firstMemberInfo = data.firstMemberInfo;
        var frendRank = data.frendRank;
        var allRank = data.allRank;
        var frendMembers = data.frendMembers;
        var allMembers = data.allMembers;
        outThis.setData({
          members: members,
          memberInfo: memberInfo,
          firstMemberInfo: firstMemberInfo,
          periodId: groupInfo.periodId,
          battleId: groupInfo.battleId,
          roomId: groupInfo.roomId,
          frendRank: frendRank,
          allRank: allRank,
          userId: groupInfo.createrUserId,
          groupId: groupInfo.id,
          frendMembers: frendMembers,
          allMembers: allMembers
        });
      },
      fail: function () {

      }
    });
  },

  restart: function (data) {
    var outThis = this;
    rankBattleRequest.nextMyRankBattle({
      success: function (groupInfo) {
        outThis.setData({
          battleId: groupInfo.battleId,
          roomId: groupInfo.roomId,
          groupId: groupInfo.id
        });
        var frendRank = outThis.data.frendRank;
        var allRank = outThis.data.allRank;
        wx.showModal({
          title: "好友排名:" + frendRank + "名,总排名:" + allRank,
          content: '是否确定重新开始',
          success: function () {
            outThis.takepartClick();
          }
        });
      },
      timeNotReached: function () {
        var frendRank = outThis.data.frendRank;
        var allRank = outThis.data.allRank;
        setTimeout(function () {
          outThis.showConfirm("好友排名:" + frendRank + "名,总排名:" + allRank, "今天的比赛已经结束,请明天再来一决高下吧");
        }, 1000);
      },
      fail: function () {

      }
    });
  },

  takepartClick: function () {
   wx.navigateTo({
     url: '../danList/danList'
   });
  },

  frendRank: function () {
    var firstMemberInfo;
    var frendMembers = this.data.frendMembers;
    if (frendMembers && frendMembers.length > 0) {
      firstMemberInfo = frendMembers[0]
      firstMemberInfo.coverUrl = frendMembers[0].headImg
    }
    this.setData({
      type: 0,
      firstMemberInfo: firstMemberInfo
    });

  },
  allRank: function () {
    var firstMemberInfo;
    var allMembers = this.data.allMembers;
    if (allMembers && allMembers.length > 0) {
      firstMemberInfo = allMembers[0];
      firstMemberInfo.coverUrl = allMembers[0].headImg
    }
    this.setData({
      type: 1,
      firstMemberInfo: firstMemberInfo
    });
  },

  initMembers: function () {
    var outThis = this;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    var time = 0;
    var groupId = this.data.groupId;
    var type = this.data.type;
    if (type == 0) {
      battleMembersRequest.getBattleMembers(battleId, roomId, {
        success: function (members) {
          outThis.setData({
            members: members
          });
          if (members && members.length > 0) {
            members[0].coverUrl = members[0].headImg
            outThis.setData({
              firstMemberInfo: members[0]
            });

          }
        },
        fail: function () {

        }
      }, time, groupId);
    } else if (type == 1) {
      battleMembersRequest.getBattleMembers(battleId, roomId, {
        success: function (members) {
          outThis.setData({
            members: members
          });

          if (members && members.length > 0) {
            members[0].coverUrl = members[0].headImg
            outThis.setData({
              firstMemberInfo: members[0]
            });
          }
        },
        fail: function () {

        }
      }, time);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   // this.initMyRankBattleRequest();
    this.initRanks();
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
    var userId = this.data.userId;
    var path = "pages/battleHome/battleHome3?registUserId=" + userId + "&skipType=4";
    return {
      path: path,
      success: function () {

      }
    }
  }
});

layerout.begin();