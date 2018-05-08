var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var battlesRequest = require("../../utils/battlesRequest.js");

var request = require("../../utils/request.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battles:[/*
      {
        imgUrl:"http://otsnwem87.bkt.clouddn.com/user.png",
        name:"动漫知识大赛"
      },
      {
        imgUrl: "http://otsnwem87.bkt.clouddn.com/user.png",
        name: "动漫知识大赛2"
      }*/
    ]
  },

  battleItemClick:function(e){
    var id = e.currentTarget.id;
    var battles = this.data.battles;

    for(var i=0;i<battles.length;i++){
      var battle = battles[i];
      if(battle.id==id){

        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.selectBattle(battle);
        wx.navigateBack({
          
        });
        return;
      }
    }
  },

  initBattles: function () {
    this.showLoading();
    var outThis = this;
    battlesRequest.requestBattles({
      success: function (battles) {
        outThis.hideLoading();
        var items = new Array();
        for (var i = 0; i < battles.length; i++) {
          var battle = battles[i];
          items.push({
            name: battle.name,
            id: battle.id,
            imgUrl: battle.headImg
          });
        }
        outThis.setData({
          battles:items
        });
      },
      fail: function () {
        outThis.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initBattles();
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