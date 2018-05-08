var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var battleDekornRequest = require("../../utils/battleDekornRequest.js");

var takepartRequest = require("../../utils/takepartRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    dekorns:[]
  },


 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDekornList();
  },

  battleDekornItemClick:function(e){
    var outThis = this;
    var id = e.currentTarget.id;
    var dekorns = this.data.dekorns;
    var dekornId;
    for (var i = 0; i < dekorns.length;i++){
      var dekorn = dekorns[i];
      if(dekorn.id == id){
        dekornId = id;
      }
    }
    if (dekornId){
      battleDekornRequest.battleDekornSign(dekornId,{
        success:function(data){
          wx.navigateTo({
            url: '../battleDekorn/battleDekorn?roomId=' + data.roomId+"&battleId="+data.battleId
          });
          /*takepartRequest.battleTakepart(data.battleId, data.roomId, {
            success: function (member) {
              outThis.hideLoading();
              wx.navigateTo({
                url: '../battleDekorn/battleDekorn?roomId=' + data.roomId
              });
            },
            beanNotEnough: function () {

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
              wx.navigateTo({
                url: '../battleDekorn/battleDekorn?roomId=' + data.roomId
              });
            },
            battleEnd: function () {

            },
            roomEnd: function () {

            },
            roomFull: function () {

            }
          });*/
        },
        fail:function(){
          console.log("fail");
        }
      });
    }
  },

  initDekornList:function(){
    var outThis = this;
    battleDekornRequest.dekornList({
        success:function(dekorns){
          console.log("dekorns:"+JSON.stringify(dekorns));
          outThis.setData({
            dekorns: dekorns
          });
          outThis.loadPreProgress();
        },
        fail:function(){
          console.log("fail");
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

layerout.addAttrPlug();

layerout.begin();