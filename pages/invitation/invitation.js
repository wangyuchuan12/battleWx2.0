var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"http://otsnwem87.bkt.clouddn.com/user.png",
    qcodeImgUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var outThis = this;
    request.request("http://192.168.1.100/api/common/resource/createwxaqrcode?path=pages/battleHome/battleHome",{},{
      success:function(resp){
          if(resp.success){
            var url = resp.data.url;
            console.log("url:"+url);

            outThis.setData({
              qcodeImgUrl:url
            });
          }
         
      },
      fail:function(){

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
})