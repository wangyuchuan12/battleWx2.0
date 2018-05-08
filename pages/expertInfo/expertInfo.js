// pages/expertInfo/expertInfo.js
var battleExpertRequest = require("../../utils/battleExpertRequest.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    identity:"",
    status:"",
    phonenum:"",
    wechat:"",
    userImgUrl:"",
    userName:"",
    battleImgUrl:"",
    battleName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var outThis = this;
    var expertId = params.expertId;
    var battleId = params.battleId;

    battleExpertRequest.info(battleId, expertId, {
      success: function (data) {
        outThis.setData({
          status:data.status,
          phonenum:data.phonenum,
          wechat:data.wechat,
          identity: data.identity,
          userImgUrl: data.userImg,
          userName: data.nickname,
          battleImgUrl: data.headImg,
          battleName: data.name
        });
      },
      fail: function () {

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

layerout.begin();