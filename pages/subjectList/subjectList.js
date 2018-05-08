var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var battleSubjectsRequest = require("../../utils/battleSubjectsRequest.js");

var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    subjects:[],
    battleId:null
  },

  subjectItemClick:function(e){
    var id = e.currentTarget.id;
    var subjects = this.data.subjects;

    for (var i = 0; i < subjects.length; i++) {
      var subject = subjects[i];
      if (subject.id == id) {

        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.selectSubject(subject);
        wx.navigateBack({

        });
        return;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var battleId = options.battleId;
    this.setData({
      battleId:battleId
    });
    this.initSubject();
  },

  initSubject:function(){
    var outThis = this;
    var battleId = this.data.battleId;
    battleSubjectsRequest.requestBattleSubjectsByBattleId(battleId,{
      success:function(subjects){
        outThis.setData({
          subjects: subjects
        });
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

layerout.begin();