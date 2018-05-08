var battlePkRequest = require("../../../utils/battleSyncPkRequest.js");
var socketUtil = require("../../../utils/socketUtil.js");
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
    id: 0,
    homeUserId: "",
    homeUsername: "",
    homeUserImgurl: "",
    beatUserId: "",
    beatUsername: "",
    beatUserImgurl: "",
    roomId: "",
    homeStatus: 0,
    beatStatus: 0,
    roomStatus: 0,
    battleCount: 0,
    //0是主场，1是客场
    role: 0,
    isObtain: 0,
    battleId: "",
    periodId: "",
    isEnd: 0,
    isBack: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showLoading:function(){
      wx.showLoading({
      });
    },
    hideLoading:function(){
      wx.hideLoading();
    },

    init: function () {
      var role = this.data.role;
      if (role == 0) {
        this.homeInto();
      } else {
        this.beatInto();
      }
    },
    doReady: function () {
      var outThis = this;
      this.showLoading();
      var id = this.data.id;
      var role = this.data.role;
      var battleId = this.data.battleId;
      var periodId = this.data.periodId;
      var roomId = this.data.roomId;

      console.log("role:"+role);
      battlePkRequest.readyRequest(id, roomId, battleId, role, {
        success: function (data) {
          outThis.hideLoading();
          /*
          outThis.setData({
            homeUserId: data.homeUserId,
            homeUsername: data.homeUsername,
            homeUserImgurl: data.homeUserImgurl,
            beatUserId: data.beatUserId,
            beatUsername: data.beatUsername,
            beatUserImgurl: data.beatUserImgurl,
            roomId: data.roomId,
            homeStatus: data.homeStatus,
            beatStatus: data.beatStatus,
            roomStatus: data.roomStatus,
            battleCount: data.battleCount
          });*/
        },
        fail: function () {
          outThis.showToast("网络繁忙，请稍后再试");
          outThis.hideLoading();
        }
      });
    },

    signOut: function () {
      var outThis = this;
      battlePkRequest.restartRequest({
        success: function () {
          outThis.setData({
            isEnd: 0
          });
          outThis.init();
        },
        fail: function () {
          outThis.init();
          outThis.showToast("网路繁忙");
        }
      });
    },

    restart: function () {
      var outThis = this;
      var role = this.data.role;
      if (role == 0) {
        /*battlePkRequest.restartRequest({
          success: function () {
            //outThis.homeInto();
            outThis.setData({
              isEnd:0
            });
            outThis.init();
          },
          fail: function () {
            outThis.init();
            outThis.showToast("网路繁忙");
          }
        });*/
        /*this.setData({
          role: 0,
          isEnd: 0,
          errorCount: 0,
          roomStatus: 0,
          roomId: ""
        });*/
        this.beatInto();
      } else if (role == 1) {
        /*this.setData({
          role: 1,
          isEnd: 0,
          errorCount: 0,
          roomStatus: 0,
          roomId: ""
        });*/
        this.beatInto();
      }
    },

    beatOut: function () {
      var id = this.data.id;
      battlePkRequest.beatOutRequest(id, {
        success: function () {
          wx.redirectTo({
            url: '../battleHome/battleHome3'
          });
        }
      });
    },

    signoutListener: function () {
      var role = this.data.role;
      if (role == 0) {
        this.signOut();
      } else if (role == 1) {
        this.beatOut();
      }

    },

    homeInto: function () {
      var outThis = this;
      battlePkRequest.homeIntoRequest({
        success: function (data) {
          outThis.setData({
            id: data.id,
            homeUserId: data.homeUserId,
            homeUsername: data.homeUsername,
            homeUserImgurl: data.homeUserImgurl,
            beatUserId: data.beatUserId,
            beatUsername: data.beatUsername,
            beatUserImgurl: data.beatUserImgurl,
            homeStatus: data.homeStatus,
            beatStatus: data.beatStatus,
            roomStatus: data.roomStatus,
            battleCount: data.battleCount,
            isObtain: data.isObtain,
            battleId: data.battleId,
            periodId: data.periodId,
            roomId: data.roomId,
            role: data.role
          });

          outThis.registerRoomStartCodeCallback();
          outThis.skipToProgress();
        },
        fail: function () {
          console.log("fail");
        }
      });
    },

    skipToProgress: function () {
      var roomStatus = this.data.roomStatus;
      var isEnd = this.data.isEnd;
      console.log("roomStatus:"+roomStatus);
      if (roomStatus == 2) {
        var battleId = this.data.battleId;
        var roomId = this.data.roomId;
        if (this.data.isEnd == 0) {
          /*wx.navigateTo({
            url: '../progressScore/progressScore2?battleId=' + battleId + "&roomId=" + roomId + "&noWait=1"
          });*/
          var myEventDetail = {battleId:battleId,roomId: roomId} // detail对象，提供给事件监听函数
          console.log(".............这里有没有进来");
          var myEventOption = {} // 触发事件的选项
          this.triggerEvent('pkRoomStart', myEventDetail, myEventOption);
          this.setData({
            isEnd: 1
          });
        }
      }
    },

    registerRoomStartCodeCallback: function () {
      var outThis = this;
      console.log("pkStatusCode");
      socketUtil.registerCallback("pkStatusCode", {
        call: function (data) {
          outThis.setData({
            battleId: data.battleId,
            roomId: data.roomId,
            homeStatus: data.homeStatus,
            homeUserImgurl: data.homeImg,
            homeUsername: data.homeNickname,
            //homeUserId: data.homeUserId,
            // beatUserId: data.beatUserId,
            roomStatus: data.roomStatus,
            beatUsername: data.beatNickname,
            beatUserImgurl: data.beatImg,
            beatStatus: data.beatStatus,
          });

          outThis.skipToProgress();
        }
      });
    },

    beatInto: function (id) {
      var outThis = this;
      if(!id){
        id = outThis.data.id;
      }
      battlePkRequest.beatIntoRequest(id, {
        success: function (data) {
          outThis.setData({
            id: data.id,
            homeUserId: data.homeUserId,
            homeUsername: data.homeUsername,
            homeUserImgurl: data.homeUserImgurl,
            beatUserId: data.beatUserId,
            beatUsername: data.beatUsername,
            beatUserImgurl: data.beatUserImgurl,
            homeStatus: data.homeStatus,
            beatStatus: data.beatStatus,
            roomStatus: data.roomStatus,
            battleCount: data.battleCount,
            isObtain: data.isObtain,
            battleId: data.battleId,
            periodId: data.periodId,
            roomId: data.roomId,
            role: data.role
          });
          
          outThis.registerRoomStartCodeCallback();
          outThis.skipToProgress();
        },
        fail: function () {
          console.log("fail");
        }
      });
    },

    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var role = this.data.role;
    var userId = "";
    if(role==0){
      userId = this.data.homeUserId;
    }else if(role==1){
      userId = this.data.beatUserId;
    }

    console.log("roomId:" + this.data.id);

    var path = 'pages/progressScore/progressScore2?registUserId=' + userId+"&id="+this.data.id+"&skipType=2";
    //var path = "pages/pkRoom/pkRoom?role=1&id="+this.data.id;
    return {
      path: path,
      success: function () {
      
      }
    }
  }
  }
})
