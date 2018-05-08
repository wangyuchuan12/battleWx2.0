// pages/assembly/toastOutPlug/toastOutPlug.js
var toastOutPlug = {

  /**
   * 页面的初始数据
   */
  data: {
    toastOutPlugData:{
      fontSize: 10,
      content: "",
      toastOutAnimation: null,
      isShow: 1
    }
  },

  startToastOutAnim:function(content){
    this.setData({
      "toastOutPlugData.isShow":1,
      "toastOutPlugData.content": content,
      "toastOutPlugData.fontSize":10
    });

    var height = wx.getSystemInfoSync().windowHeight;
    height = height/2;
    var outThis = this;

    var animation = wx.createAnimation({
      duration: 1,
      timingFunction: 'ease'
    });

    animation.top(height).step();
    outThis.setData({
      "toastOutPlugData.toastOutAnimation": animation.export()
    });
    
    var interval = setInterval(function(){
      var fontSize = outThis.data.toastOutPlugData.fontSize;
      
      if(fontSize<50){
        fontSize++;
        outThis.setData({
          "toastOutPlugData.fontSize":fontSize
        })
      }else{
        clearInterval(interval);
        var animation = wx.createAnimation({
          duration: 2000,
          timingFunction: 'ease'
        });

        animation.translateY(-100).step();
        outThis.setData({
          "toastOutPlugData.toastOutAnimation": animation.export()
        });

        setTimeout(function(){
          outThis.setData({
            "toastOutPlugData.isShow":0
          });
        },2500);
      }
    },10);
  }
}

module.exports = {
  toastOutPlug: toastOutPlug
}