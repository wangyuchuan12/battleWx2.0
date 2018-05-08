var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var resourceRequest = require("../../../utils/resourceRequest.js");

var battleFactoryRequest = require("../../../utils/battleFactoryRequest.js");

var util = require("../../../utils/util.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battle:null,
    subject:null,
    question:null,
    answer:null,
    isImg:0,
    questionType:0,
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


  init:function(){
    this.setData({
      battle: null,
      subject: null,
      question: null,
      answer: null,
      isImg: 0,
      questionType: 0,
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
    });
  },

  saveQuestionClick: function () {
    var outThis = this;
    var selectOptions = this.data.selectOptions;
    var questionType = this.data.questionType;
    var question = this.data.question;
    var imgUrl = this.data.imgUrl;
    var answer = this.data.answer;

    var fillWords = "";

    var battle = this.data.battle;

    var subject = this.data.subject;

    var isImg = this.data.isImg;

    this.showLoading();
    if (!battle) {
      this.hideLoading();
      this.showToast("请输入一级主题");
      return;
    }

    if(!subject){
      this.hideLoading();
      this.showToast("请输入二级主题");
      return;
    }

    if (isImg && !imgUrl){
      this.hideLoading();
      this.showToast("请选择一张图片");
      return;
    }


    if (!imgUrl) {
      imgUrl = "";
    }

    if (!question) {
      this.hideLoading();
      this.showToast("请输入问题");
      return;
    }

    if (util.isEmojiCharacter(question)) {
      this.hideLoading();
      this.showToast("问题不能包含表情字符");
      return;
    }

    if (question.length > 200) {
      this.hideLoading();
      this.showToast("问题输入不能超过200个字符");
      return;
    }

    if (questionType == "0") {
      for (var i = 0; i < selectOptions.length; i++) {
        var selectOption = selectOptions[i];
        if (!selectOption.content) {
          this.hideLoading();
          this.showToast("选项请输入完整");
          return;
        }

        if (selectOption.content.length > 20) {
          this.hideLoading();
          this.showToast("选项不能超过20个字节");
          return;
        }


        if (util.isEmojiCharacter(selectOption.content)) {
          this.hideLoading();
          this.showToast("选项内容不能包含表情字符");
          return;
        }


      }
    }

    if (questionType == "1") {
      if (!answer) {
        this.hideLoading();
        this.showToast("请输入答案");
        return;
      }

      if (answer.length > 5) {
        this.hideLoading();
        this.showToast("输入答案不能超过5个字");
        return;
      }

      if (util.isEmojiCharacter(answer)) {
        this.hideLoading();
        this.showToast("答案内容不能包含表情字符");
        return;
      }
    }

    if (questionType == "2") {
      var worlds = this.data.worlds;
      var worldChecks = this.data.worldChecks;
      for (var i = 0; i < worlds.length; i++) {
        var world = worlds[i];
        if (!world.content) {
          this.hideLoading();
          this.showToast("答案请选择完整");
          return;
        }
      }

      for (var i = 0; i < worldChecks.length; i++) {
        var worldCheck = worldChecks[i];
        if (!worldCheck.content) {
          this.hideLoading();
          this.showToast("内容请输入完整");
          return;
        }

        if (util.isEmojiCharacter(worldCheck.content)) {
          this.hideLoading();
          this.showToast("内容不能包含表情字符");
          return;
        }
      }
    }

    this.showLoading();

    if (questionType == 2) {
      answer = "";
      var worlds = this.data.worlds;
      for (var i = 0; i < worlds.length; i++) {
        answer = answer + worlds[i].content;
      }

      var worldChecks = this.data.worldChecks;
      for (var i = 0; i < worldChecks.length; i++) {
        fillWords = fillWords + worldChecks[i].content;
      }
    }

    var options = "";


    if (questionType==0&&selectOptions && selectOptions.length>0){
      for (var i = 0; i < selectOptions.length; i++) {
        options = options + selectOptions[i].content + ",";
        if (selectOptions[i].isRight) {
          answer = selectOptions[i].content;
        }
      }
      options = options.substring(0, options.length - 1);
    }

    var params = new Object();
    params.question = question;
    params.imgUrl = imgUrl;
    params.answer = answer;
    params.fillWords = fillWords;
    params.battleId = battle.id;
    params.subjectId = subject.id;
    params.type = questionType;
    params.options = options;
    battleFactoryRequest.applyRequest(params,{
      success:function(){
        outThis.hideLoading();
        wx.navigateTo({
          url: '../questionList/questionList'
        });
      },
      fail:function(){
       outThis.hideLoading();
       outThis.showToast("发生错误");
      }
    });



   
  },


  switchSelect: function () {
    this.setData({
      questionType: 0
    });
  },

  switchBlank: function () {
    this.setData({
      questionType: 1
    });
  },

  switchFillTerms: function () {
    this.setData({
      questionType: 2
    });
  },

  questionInputChange: function (e) {
    this.setData({
      "question": e.detail.value
    });
  },

  answerInputChange: function (e) {
    this.setData({
      "answer": e.detail.value
    })
  },

  worldMinusClick: function () {
    var worlds = this.data.worlds;
    if (worlds.length > 1) {
      worlds.splice(worlds.length - 1, 1);
      this.setData({
        worlds: worlds
      });
    }

  },

  worldPlusClick: function () {
    var worlds = this.data.worlds;
    if (worlds.length <= 5) {
      worlds.push({
        id: "world" + worlds.length,
        status: 0,
        index: worlds.length
      });
      this.setData({
        worlds: worlds
      });
    }
  },

  selectRightOptionClick: function (e) {
    /*var id = e.currentTarget.id;

    var selectOptions = this.data.selectOptions;

    for (var i = 0; i < selectOptions.length; i++) {
      var selectOption = selectOptions[i];
      if (selectOption.id == id) {
        selectOption.isRight = 1
      } else {
        selectOption.isRight = 0
      }
    }
    this.setData({
      "selectOptions": selectOptions
    });*/
  },

  worldCheckInputBlur: function (e) {
    var id = e.currentTarget.id;
    var worldChecks = this.data.worldChecks;
    for (var i = 0; i < worldChecks.length; i++) {
      var worldCheck = worldChecks[i];
      if (worldCheck.id == id && worldCheck.content) {
        worldCheck.status = 1;
        var content = worldCheck.content;
        worldCheck.content = content[0];
      }
    }

    this.setData({
      worldChecks: worldChecks
    });
  },

  worldCheckInputChange: function (e) {
    var id = e.currentTarget.id;
    var worldChecks = this.data.worldChecks;
    for (var i = 0; i < worldChecks.length; i++) {
      var worldCheck = worldChecks[i];
      var value = e.detail.value;
      if (worldCheck.id == id) {
        //   worldCheck.status = 1;
        worldCheck.content = value;
      }
    }

    this.setData({
      worldChecks: worldChecks
    });

    //  this.worldCheckInputBlur(e);
  },

  worldCheckClick2: function (e) {
    var worldChecks = this.data.worldChecks;
    var worlds = this.data.worlds;
    var id = e.currentTarget.id;
    var worldCheck;
    var world;
    for (var i = 0; i < worldChecks.length; i++) {
      var target = worldChecks[i];
      if (target.id == id) {
        worldCheck = target;
        worldCheck.status = 2;
      }
    }

    for (var i = 0; i < worlds.length; i++) {
      if (worlds[i].targetIndex == worldCheck.index) {
        worlds[i].status = 0;
        worlds[i].content = "";
      }
    }

    this.setData({
      worlds: worlds,
      worldChecks: worldChecks
    });
  },

  worldCheckClick: function (e) {
    var worldChecks = this.data.worldChecks;
    var worlds = this.data.worlds;
    var id = e.currentTarget.id;
    var worldCheck;
    var world;
    for (var i = 0; i < worldChecks.length; i++) {
      var target = worldChecks[i];
      if (target.id == id) {
        worldCheck = target;
      }
    }

    if (worldCheck.status == 1) {
      worldCheck.status = 0;
      this.setData({
        worldChecks: worldChecks
      });
      for (var i = 0; i < worlds.length; i++) {
        var target = worlds[i];
        if (target.status == 0) {
          world = target;
          break;
        }
      }

      if (!world) {
        world = worlds[worlds.length - 1];
      }

      var worldKey = "worlds[" + world.index + "]";
      this.setData({
        [worldKey]: {
          id: world.id,
          index: world.index,
          status: 1,
          content: worldCheck.content,
          targetIndex: worldCheck.index
        }
      });
    }
    var worlds = this.data.worlds;
    var flag = true;
    var worldStr = "";
    for (var i = 0; i < worlds.length; i++) {
      var world = worlds[i];
      if (world.status == 0) {
        flag = false;
      } else {
        worldStr = worldStr + world.content;
      }
    }

    if (flag) {
      //   this.eventListener.fillSubmit(this.data.questionInputData.questionId, worldStr);
    }

  },

  worldClick: function (e) {
    var id = e.currentTarget.id;
    var world;
    var worlds = this.data.worlds;
    var worldChecks = this.data.worldChecks;
    for (var i = 0; i < worlds.length; i++) {
      var target = worlds[i];
      if (target.id == id) {
        world = target;
        break;
      }
    }

    var worldCheck;
    for (var i = 0; i < worldChecks.length; i++) {
      var target = worldChecks[i];
      if (target.index == world.targetIndex) {
        worldCheck = target;
        break;
      }
    }

    if (world.status == 1) {
      var worldKey = "worlds[" + world.index + "]";

      var worldCheckKey = "worldChecks[" + worldCheck.index + "]";

      this.setData({
        [worldKey]: {
          id: world.id,
          index: world.index,
          status: 0,
          content: ""
        }
      });

      this.setData({
        [worldCheckKey]: {
          id: worldCheck.id,
          index: worldCheck.index,
          status: 1,
          content: world.content
        }
      });
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  selectBattle:function(battle){
    this.setData({
      battle:battle,
      subject:null
    });
  },

  selectSubject:function(subject){
    this.setData({
      subject:subject
    });
  },

  worldTypeClick:function(){
    this.setData({
      isImg:0
    });
  },


  selectOptionInputChange: function (e) {
    var id = e.currentTarget.id;
    var selectOptions = this.data.selectOptions;

    for (var i = 0; i < selectOptions.length; i++) {
      var selectOption = selectOptions[i];
      if (selectOption.id == id) {
        selectOption.content = e.detail.value;
      }

    }
    this.setData({
      "selectOptions": selectOptions
    });
  },

  imgTypeClick: function () {
    this.setData({
      isImg: 1
    });
  },

  imgClick: function () {
    var outThis = this;
    resourceRequest.openLoadFile({
      success: function (path) {
        outThis.setData({
          isImg: 1,
          imgUrl: path
        });
      },
      fail: function () {
        console.log("fail");
      }
    });
  },


  subjectItemClick:function(){
    var battle = this.data.battle;
    if(battle){
      wx.navigateTo({
        url: '../../subjectList/subjectList?battleId=' + battle.id
      });
    }else{
      this.showConfirm("未选择一级主题", "请选择一级主题", {
        confirm:function(){

        },
        cancel:function(){

        }
      }, "确定", "取消");
    }
   
  },

  questionItem1Click:function(){
    wx.navigateTo({
      url: '../../battleList/battleList'
    });
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

layerout.addSelectInput();

layerout.begin();