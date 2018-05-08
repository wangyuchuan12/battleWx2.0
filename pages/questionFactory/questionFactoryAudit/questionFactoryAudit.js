var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var battleFactoryRequest = require("../../../utils/battleFactoryRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battleId:2,
    question: null,
    options:[],
    answer: null,
    isImg: 0,
    questionType: 0,
    imgUrl:"",
    selectOptions: [{
      content: "",
      isRight: 1,
      id: "selectOption1"
    }, {
      content: "",
      isRight: 0,
      id: "selectOption2"
    }, {
      content: "",
      isRight: 0,
      id: "selectOption3"
    }, {
      content: "",
      isRight: 0,
      id: "selectOption4"
    }],
    worldChecks: [{
      index: 0,
      id: "worldCheck0",
      status: "2"
    }, {
      index: 1,
      id: "worldCheck1",
      status: "2"
    }, {
      index: 2,
      id: "worldCheck2",
      status: "2"
    }, {
      index: 3,
      id: "worldCheck3",
      status: "2"
    }, {
      index: 4,
      id: "worldCheck4",
      status: "2"
    }, {
      index: 5,
      id: "worldCheck5",
      status: "2"
    }, {
      index: 6,
      id: "worldCheck6",
      status: "2"
    }, {
      index: 7,
      id: "worldCheck7",
      status: "2"
    }, {
      index: 8,
      id: "worldCheck8",
      status: "2"
    }, {
      index: 9,
      id: "worldCheck9",
      status: "2"
    }, {
      index: 10,
      id: "worldCheck10",
      status: "2"
    }, {
      index: 11,
      id: "worldCheck11",
      status: "2"
    }, {
      index: 12,
      id: "worldCheck12",
      status: "2"
    }, {
      index: 13,
      id: "worldCheck13",
      status: "2"
    }, {
      index: 14,
      id: "worldCheck14",
      status: "2"
    }, {
      index: 15,
      id: "worldCheck15",
      status: "2"
    }, {
      index: 16,
      id: "worldCheck16",
      status: "2"
    }, {
      index: 17,
      id: "worldCheck17",
      status: "2"
    }],
    worlds: [{
      id: "world0",
      status: 0,
      index: "0"
    }, {
      id: "world1",
      index: 1,
      status: 0
    }, {
      id: "world2",
      index: 2,
      status: 0
    }, {
      id: "world3",
      index: 3,
      status: 0
    }]
  },


  initQuestion:function(){
    var outThis =this;
    var battleId = this.data.battleId;
    var worldChecks = outThis.data.worldChecks;
    var question = null;
    var worlds = new Array();
    this.showLoading();
    battleFactoryRequest.randomAuditQuestion(battleId,{
      success:function(data){
        outThis.hideLoading();
        question = data.question;
        var type = data.type;
        var answer = data.answer;
        var imgUrl = data.imgUrl;
        var auditUsername = data.auditUsername;
        var subjectName = data.subjectName;
        var battleName = data.battleName;
        var stageIndexes = data.stageIndexes;
        var rewardBean = data.rewardBean;
        var reviewId = data.reviewId;
        var id = data.id;
        var options = new Array();
        if(type==0){
          var optionsContents = data.options.split(",");
          for (var i = 0; i < optionsContents.length;i++){
            var option = optionsContents[i];
            var isRight = 0;
            if(option==answer){
              isRight = 1;
            }
            options.push({
              isRight: isRight,
              content:option
            });
          }
        }else if(type==1){

        }else if(type==2){
          var fillWords = data.fillWords;
          
          for(var i=0;i<fillWords.length;i++){
            worldChecks[i].content = fillWords[i];
          }

  

          for(var i=0;i<answer.length;i++){
            worlds.push({
              id: "world"+i,
              status: 0,
              index: i,
              content:answer[i]
            });
          }
        
        }
       
        outThis.setData({
          question:question,
          selectOptions: options,
          answer: answer,
          questionType:type,
          worldChecks: worldChecks,
          worlds: worlds,
          battleName: battleName,
          auditUsername: auditUsername,
          subjectName: subjectName,
          stageIndexes: stageIndexes,
          rewardBean:rewardBean,
          reviewId: reviewId,
          id: id,
          imgUrl: imgUrl
        });
      },
      fail:function(){
        outThis.hideLoading();
        console.log("fail");
      }
    });
  },

  agreeClick:function(){
    var outThis =this;
    this.showLoading();
    var id = this.data.id;
    var reviewId = this.data.reviewId;
    this.showConfirm("提示", "是否审核通过", {
      confirm:function(){
        battleFactoryRequest.agree(id, reviewId, {
          success: function () {
            outThis.hideLoading();
            outThis.initQuestion();
          },
          fail: function () {
            outThis.hideLoading();
          }
        });
      },
      cancel:function(){
        outThis.hideLoading();
      }
    }); 
  },

  rejectClick:function(){
    var ouThis = this;
    this.showLoading();
    var id = this.data.id;
    battleFactoryRequest.reject(id, {
      success: function () {
        ouThis.hideLoading();
        ouThis.initQuestion();
      },
      fail: function () {
        ouThis.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var battleId = options.battleId;
    if(battleId){
      this.setData({
        battleId: battleId
      });
    }
    this.initQuestion();
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