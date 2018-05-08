var battleDekornRequest = require("../../utils/battleDekornRequest.js");
var takepartRequest = require("../../utils/takepartRequest.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var initRoomInfoInterval;
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    room:null,
    reward:[],
    battleId:null,
    roomId:null,
    status:0,
    isEnd:0,
    costBean:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var outThis = this;
    var roomId = options.roomId;
    var battleId = options.battleId;
    this.initAccountInfo({
      success: function () {
        outThis.loadPreProgress();
      }
    });
    this.setData({
      roomId:roomId,
      battleId:battleId
    });

    outThis.initRoomInfo();
    initRoomInfoInterval = setInterval(function(){
      outThis.initRoomInfo();
    },5000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  takepartClick:function(){
    var outThis = this;
    var roomId = this.data.roomId;
    var battleId = this.data.battleId;
    takepartRequest.battleTakepart(battleId,roomId, {
        success: function (member) {
          outThis.hideLoading();
          outThis.initRoomInfo();
          outThis.initAccountInfo();
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
          outThis.initRoomInfo();
        },
        battleEnd: function () {

        },
        roomEnd: function () {

        },
        roomFull: function () {

        }
    });
  },

  initRoomInfo:function(){
    var outThis = this;
    var roomId = this.data.roomId;
    var battleId = this.data.battleId;
    battleDekornRequest.dekornRoomInfo(battleId,roomId,{
        success:function(data){
          console.log("data:"+JSON.stringify(data));
          outThis.setData({
            room:data.room,
            status:data.status,
            rewards:data.rewards,
            costBean:data.costBean
          });
          var room = data.room;
          if(room.num>=room.mininum&&data.status!=0){
            outThis.skipToProgress();
          }
        },
        fail:function(){

        }
    });
  },

  skipToProgress:function(){
    var isEnd = this.data.isEnd;
    if(isEnd==0){
      this.setData({
        isEnd: 1
      });
      var roomId = this.data.roomId;
      var battleId = this.data.battleId;
      wx.redirectTo({
        url: '../progressScore/progressScore?roomId=' + roomId + "&battleId=" + battleId+ "&againButton=确定"
      });
    }
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
    if (initRoomInfoInterval){
      clearInterval(initRoomInfoInterval);
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

layerout.addAttrPlug();

layerout.begin();