// pages/assembly/aircraftPlug/aircraftPlug.js
var aircraftPlug = {

  /**
   * 页面的初始数据
   */
  data: {
    aircraftPlugData:{
      aircraftAnimation: null,
      isDisplay:0
    }
  },

  startAnim:function(){
    this.setData({
      "aircraftPlugData.isDisplay":1
    });
    var outThis = this;
    var aircraftAnimation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'linear'
    });

    var height = wx.getSystemInfoSync().windowHeight;
    var width = wx.getSystemInfoSync().windowWidth;

    aircraftAnimation.translate(-width,height).step();

    this.setData({
      "aircraftPlugData.aircraftAnimation": aircraftAnimation.export()
    });

    setTimeout(function(){
      var recoveryAnimation = wx.createAnimation({
        duration: 1,
        timingFunction: 'linear'
      });
      recoveryAnimation.left(width).top(-100).step();

      outThis.setData({
        "aircraftPlugData.aircraftAnimation": recoveryAnimation.export()
      });

    },2000);
  },

};

module.exports = {
  aircraftPlug: aircraftPlug
}