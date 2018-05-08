var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var battleRedPackDistributionsRequest = require("../../utils/battleRedPackDistributionsRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    distributions:[],
    senderImg:"",
    senderName:"",
    num:0,
    receiveNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var battleId = options.battleId;
    var roomId = options.roomId;
    this.setData({
      id:id,
      battleId:battleId,
      roomId:roomId
    });

    this.initDistributions();
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
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  initDistributions:function(){
    var outThis = this;
    var id = this.data.id;
    var battleId = this.data.battleId;
    var roomId = this.data.roomId;
    battleRedPackDistributionsRequest.redPackDistributions(id,battleId,roomId,{
      success:function(data){
        outThis.setData({
          distributions: data.distributions,
          senderImg: data.senderImg,
          senderName: data.senderName,
          num:data.num,
          receiveNum:data.receiveNum
        })
      },
      fail:function(){
        console.log("fail");
      }
    });
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

layerout.begin();