var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var redPackRequest = require("../../../utils/redPackRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    redPacks: [{
      senderImg:"",
      amount:0,
      masonryNum:0,
      beanNum:0,
      num:0,
      receiveNum:0
    }],
    roomId:"",
    battleId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var roomId = options.roomId;
    var battleId = options.battleId;
    this.setData({
      roomId:roomId,
      battleId:battleId
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
    this.initRedpacks();
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
  
  },

  sendRedpack: function () {
    var roomId = this.data.roomId;
    var battleId = this.data.battleId;
    wx.navigateTo({
      url: '../redPackEdit/redPackEdit?roomId=' + roomId + "&battleId=" + battleId
    });
  },

  initRedpacks: function () {
    var roomId = this.data.roomId;
    var outThis = this;
    redPackRequest.listByRoomIdRequest(roomId, {
      success: function (data) {

        console.log(JSON.stringify(data));
        var array = new Array();
        for (var i = 0; i < data.length; i++) {
          array.push({
            senderImg: data[i].senderImg,
            amount: data[i].amount,
            masonryNum: data[i].masonryNum,
            beanNum: data[i].beanNum,
            num: data[i].num,
            receiveNum: data[i].receiveNum
          });
        }
        outThis.setData({
          redPacks: array
        })
        console.log("data:" + JSON.stringify(data));
      },
      fail: function () {

      }
    });
  },
});

layerout.begin();