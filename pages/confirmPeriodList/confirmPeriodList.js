
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var battleExpertRequest = require("../../utils/battleExpertRequest.js");

var battleManagerRequest = require("../../utils/battleManagerRequest.js");

var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battleId:1,
     periods:[
       /*{
         id: "1",
         ownerNickname: "sss",
         takepartCount: "4",
         percent: 20,
         ownerImg: "",
         isDefault: 1,
         status: 0
       },
       {
         id: "2",
         ownerNickname: "sss",
         takepartCount: "4",
         percent: 20,
         ownerImg: "",
         isDefault: 1,
         status: 0
       },
       {
         id: "2",
         ownerNickname: "sss",
         takepartCount: "4",
         percent: 20,
         ownerImg: "",
         isDefault: 1,
         status: 0
       },
       {
         id: "2",
         ownerNickname: "sss",
         takepartCount: "4",
         percent: 20,
         ownerImg: "",
         isDefault: 1,
         status: 0
       },
       {
         id: "2",
         ownerNickname: "sss",
         takepartCount: "4",
         percent: 20,
         ownerImg: "",
         isDefault: 1,
         status: 0
       },
       {
         id: "2",
         ownerNickname: "sss",
         takepartCount: "4",
         percent: 20,
         ownerImg: "",
         isDefault: 1,
         status: 0
       }*/
     ]
  },

  periondItemClick:function(e){
    var id = e.currentTarget.id;
    var battleId = this.data.battleId;
    wx.navigateTo({
      url: '../manager/battlePeriodManager/battlePeriodManager?periodId=' + id + "&battleId=" + battleId,
    });
  },

  addPeriodClick: function () {

    var battleId = this.data.battleId;
    var outThis = this;
    this.showLoading();

    battleManagerRequest.requestAddPeriod(battleId, {
      success: function (period) {
        outThis.hideLoading();

        wx.navigateTo({
          url: '../manager/battlePeriodManager/battlePeriodManager?periodId=' + period.id + "&battleId=" + battleId,
        });
      },
      fail: function () {
        outThis.showToast("新建失败");
        outThis.hideLoading();
      }
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var battleId = options.battleId;
    this.setData({
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
    var battleId = this.data.battleId;
    var outThis = this;
    battleExpertRequest.confirmPeriods(battleId, {
      success: function (periods) {
        if(!periods||periods.length==0){
          outThis.addPeriodClick();
          return;
        }
        var array = new Array();
        for (var i = 0; i < periods.length; i++) {
          var period = periods[i];

          array.push({
            id: period.id,
            ownerNickname: period.ownerNickname,
            takepartCount: "4",
            percent: 20,
            ownerImg: period.ownerImg,
            isDefault: period.isDefault,
            status: period.status
          });
        }

        outThis.setData({
          periods: array
        });

      },
      fail: function () {

      }
    });
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