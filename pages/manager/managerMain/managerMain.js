var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var battlesRequest = require("../../../utils/battlesRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battles:[/*{
      name:"wyc",
      instruction:"haha",
      id:"1",
      imgUrl:"http://7xlw44.com1.z0.glb.clouddn.com/0042aeda-d8a5-4222-b79d-1416ab222898"
    }*/]
  },

  roomManagerClick:function(){
    wx.redirectTo({
      url: '../roomManager/roomManager'
    })
  },

  itemClick:function(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../battleInfoManager/battleInfoManager?battleId='+id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var outThis = this;
    battlesRequest.requestBattles({
      success:function(battles){
        var array = new Array();
        for(var i=0;i<battles.length;i++){
          var battle = battles[i];
          array.push({
            id:battle.id,
            name:battle.name,
            instruction:battle.instruction,
            imgUrl:battle.headImg
          });
        }
        outThis.setData({
          battles:array
        });
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
});

layerout.begin();