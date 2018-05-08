var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var resourceRequest = require("../../../utils/resourceRequest.js");

var battleFactoryRequest = require("../../../utils/battleFactoryRequest.js");

var util = require("../../../utils/util.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    status:0,
    items: [/*{
        question: "你的名字",
        type: 0,
        answer: "答案",
        rightAnswer: "呼呼",
        options: ["回答", "呼呼", "花花"],
        imgUrl:"http://7xlw44.com1.z0.glb.clouddn.com/0042aeda-d8a5-4222-b79d-1416ab222898"
      },{
        question: "你的名字",
        type: 1,
        answer: "答案",
        rightAnswer: "答案",
        imgUrl:""
      },{
        question:"你的名字",
        type:2,
        answer:"答案",
        rightAnswer:"呼呼",
        imgUrl:""
      }*/],
  },

  auditCheck:function(){
    this.setData({
      status:0
    });
    this.initAuditQuestions();
  },

  passCheck:function(){
    this.setData({
      status: 1
    });
    this.initAuditQuestions();
  },

  upPassCheck:function(){
    this.setData({
      status: 2
    });
    this.initAuditQuestions();
  },

  makeQuestionClick: function () {
    wx.navigateTo({
      url: '../editQuestion/editQuestion'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initAuditQuestions();
  },

  initAuditQuestions:function(){
    var outThis = this;
    var status = this.data.status;
    var items = new Array();
    battleFactoryRequest.myQuestionsRequest(status,{
      success:function(questions){
        for(var i=0;i<questions.length;i++){
          var question = questions[i];

          var options = null;
          if(question.options){
            options = question.options.split(",");
          }
          
          items.push({
            question: question.question,
            type: question.type,
            answer: question.answer,
            rightAnswer: question.answer,
            options: options,
            imgUrl: question.imgUrl,
            status:question.status
          });
        }
        outThis.setData({
          items:items
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
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    if (prevPage.init){
      prevPage.init();
    }
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