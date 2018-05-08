var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var battleManagerRequest = require("../../../utils/battleManagerRequest.js");
var resourceRequest = require("../../../utils/resourceRequest.js");
var battleMemberInfoRequest = require("../../../utils/battleMemberInfoRequest.js");
var util = require("../../../utils/util.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    battleId:null,
    periodId:null,
    //0表示显示模式 1表示出题模式，2表示关卡管理
    model:0,
    subjects:[],
    questionType:0,
    selectSubjectId:null,
    selectStageId:null,
    question:"",
    answer:"",
    isImg:0,
    imgUrl:"",
    //0表示添加 1表示修改
    saveModel:0,
    stages:[],
    edit:0,
    isManager:0,
    selectOptions:[{
      content:"1",
      isRight:1,
      id:"selectOption1"
    },{
      content:"2",
      isRight:0,
      id:"selectOption2"
    },{
      content:"3",
      isRight:0,
      id:"selectOption3"
    },{
      content:"4",
      isRight:0,
      id:"selectOption4"
    }],
    selectQuestionNum:0,
    questionNums:[{
      num:4,
      id:"questionNum4"
    },{
      num:7,
      id:"questionNum7"
    },{
      num:10,
      id:"questionNum10"
    },{
      num:12,
      id:"questionNum12"
    }],
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
      status:"2"
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
      index:0
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
    }],
    questionNumData:[]
  },

  initQueryQuestionCount:function(){
    var outThis = this;
    var battleId = this.data.battleId;
    var periodId = this.data.periodId;
    battleManagerRequest.requestQueryQuestionCount(battleId,periodId,{
      success:function(data){
        outThis.setData({
          questionNumData:data
        });
      },
      fail:function(){

      }
    })
  },


  startUpPeriodClick:function(){
    var outThis = this;
    var periodId = this.data.periodId;
    battleManagerRequest.requestStartUpPeriod(periodId, {
      success: function () {
        wx.navigateBack({
          
        });
      },
      fail: function (errorMsg) {
        outThis.showToast(errorMsg);
      }
    });
  },

  deleteQuestionClick:function(){
    var outThis = this;
    battleManagerRequest.requestDelQuestion(this.data.questionId,{
        success:function(){
          outThis.initQuestions();
          outThis.setData({
            model:0
          });
        },
        fail:function(){

        }
    });
  },

  addStageClick:function(e){
    var num = 7;
    this.showLoading();
    var outThis = this;
    var periodId = this.data.periodId;
    battleManagerRequest.requestAddStage(periodId,num, {
      success: function (stage) {
        outThis.showToast("成功");
        outThis.hideLoading();
        outThis.initStages({
          success:function(){
            outThis.setData({
              selectStageId: stage.id,
              selectQuestionNum:num,
            });
          }
        });
      },
      fail: function () {
        outThis.hideLoading();
        outThis.showToast("失败");
      }
    });
  },

  addQuestionClick:function(){
    this.setData({
      model:1,
      saveModel:0
    });

    this.emptyContent();
  },

  questionNumClick:function(e){
    this.showLoading();
    var outThis = this;
    var id = e.currentTarget.id;
    var questionNums = this.data.questionNums;
    var selectStageId = this.data.selectStageId;

    var stages = this.data.stages;

    var stage;
    for(var i=0;i<stages.length;i++){
      if(stages[i].id==selectStageId){
        stage = stages[i];
      }
    }
    for (var i = 0; i < questionNums.length; i++) {
      var questionNum = questionNums[i];
      if (questionNum.id == id) {
        battleManagerRequest.requestUpdateStage(this.data.selectStageId, questionNum.num, {
          success: function () {
            outThis.hideLoading();
            stage.questionNum = questionNum.num;
            outThis.setData({
              selectQuestionNum: questionNum.num,
              stages: stages
            });
          },
          fail: function () {
            outThis.hideLoading();
            outThis.showToast("失败");
          }
        });
        break;
      }
    }
  },

  worldMinusClick:function(){
    var worlds = this.data.worlds;
    if(worlds.length>1){
      worlds.splice(worlds.length - 1, 1);
      this.setData({
        worlds: worlds
      });
    }
    
  },

  worldPlusClick: function () {
    var worlds = this.data.worlds;
    if(worlds.length<=5){
      worlds.push({
          id:"world"+worlds.length,
          status:0,
          index:worlds.length
      });
      this.setData({
        worlds:worlds
      });
    }
  },

  itemInfo:function(e){
    var outThis = this;
    var id = e.currentTarget.id;
    var items = this.data.items;

    this.setData({
      edit:1
    });

    for(var i=0;i<items.length;i++){
      var item = items[i];
      if(item.id==id){
        battleManagerRequest.requestQuestionInfo(item.questionId,{
          success:function(question){

            var worldChecks = outThis.data.worldChecks;
            var worlds = outThis.data.worlds;
            if (question.type==2){
              var fillWords = question.fillWords;

              var rightAnswer = question.answer;
              if (rightAnswer){
                worlds = new Array();
                for (var i = 0; i < rightAnswer.length;i++){
                  worlds.push({
                    index:i
                  });
                }
              }

              for (var i = 0; i < rightAnswer.length; i++) {
                if (rightAnswer[i] && worlds[i]) {
                  worlds[i].content = rightAnswer[i];
                  worlds[i].status = 0;
                }
              }

              for(var i=0;i<fillWords.length;i++){
                var fillWord = fillWords[i];
                if(worldChecks[i]){
                  worldChecks[i].content = fillWord,
                  
                  worldChecks[i].status = 1;

                  for(var j=0;j<worlds.length;j++){
                    if (worlds[j].content == fillWord && worlds[j].status==0){
                      worlds[j].targetIndex = worldChecks[i].index;
                      worlds[j].status = 1;
                      worldChecks[i].status=0;
                    }
                  }
                }
              }

            }
            var options = question.options;
            var selectOptions = new Array();
            if(options){
              for (var i = 0; i < options.length; i++) {
                var option = options[i];
                selectOptions.push({
                  id: option.id,
                  content: option.content,
                  isRight: option.isRight
                });
              }
            }
            outThis.setData({
              model: 1,
              questionType: question.type,
              question: question.question,
              answer: question.answer,
              isImg: 1,
              imgUrl: question.imgUrl,
              worldChecks: worldChecks,
              worlds: worlds,
              selectOptions: selectOptions,
              saveModel:1,
              questionId:id
            });
          },
          fail:function(){

          }
        });
      }
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

  fillWorldCheck: function (worlds) {
    var worldChecks = this.data.questionInputData.worldChecks;
    for (var i = 0; i < worldChecks.length; i++) {
      worldChecks[i].content = "";
    }

    var outThis = this;
    for (var i = 0; i < worlds.length; i++) {
      var worldCheck = worldChecks[i];
      if (worldCheck) {
        worldCheck.content = worlds[i];
        worldCheck.status = 1;
      }
    }

    this.setData({
      "questionInputData.worldChecks": worldChecks
    });
  },

  fillWorld: function (worldContents) {
    var worlds = this.data.questionInputData.worlds;

    for (var i = 0; i < worlds.length; i++) {
      var worldContent;

      if (worldContents && worldContents.length > 0) {
        var worldContent = worldContents[i];
      }


      var world = worlds[i];

      if (worldContent) {
        world.content = worldContent;
        world.status = 1;
      } else {
        world.content = "";
        world.status = 0;
      }
    }

    this.setData({
      "questionInputData.worlds": worlds
    });

  },

  worldCheckClick2:function(e){
    var worldChecks = this.data.worldChecks;
    var worlds = this.data.worlds;
    var id = e.currentTarget.id;
    var worldCheck;
    var world;
    for (var i = 0; i < worldChecks.length; i++) {
      var target = worldChecks[i];
      if (target.id == id) {
        worldCheck = target;
        worldCheck.status=2;
      }
    }

    for(var i=0;i<worlds.length;i++){
      if(worlds[i].targetIndex==worldCheck.index){
        worlds[i].status=0;
        worlds[i].content="";
      }
    }

    this.setData({
      worlds:worlds,
      worldChecks: worldChecks
    });
  },

  worldCheckClick: function (e) {
    var worldChecks = this.data.worldChecks;
    var worlds = this.data.worlds;
    console.log("worlds:"+JSON.stringify(worlds));
    var id = e.currentTarget.id;
    console.log("id:"+id);
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

      console.log("worldKey:"+worldKey);
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

  worldCheckInputBlur:function(e){
    var id = e.currentTarget.id;
    var worldChecks = this.data.worldChecks;
    for(var i=0;i<worldChecks.length;i++){
      var worldCheck = worldChecks[i];
      if(worldCheck.id==id&&worldCheck.content){
        worldCheck.status=1;
        var content = worldCheck.content;
        worldCheck.content = content[0];
      }
    }

    this.setData({
      worldChecks:worldChecks
    });
  },

  worldCheckInputChange:function(e){
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

  initQuestions:function(){
    var outThis = this;
    var selectStageId = this.data.selectStageId;
    var selectSubjectId = this.data.selectSubjectId;
    battleManagerRequest.requestQuestions(selectStageId, selectSubjectId,{
      success:function(questions){
        var items = outThis.data.items;
        items = new Array();
        for(var i=0;i<questions.length;i++){
          var question = questions[i];
          items.push({
            id:question.id,
            question:question.question,
            type:question.type,
            rightAnswer:question.answer,
            imgUrl:question.imgUrl,
            questionId:question.questionId
          });
        }
        outThis.setData({
          items:items
        });
      },
      fail:function(){

      }
    });
  },

  selectRightOptionClick:function(e){
    var id = e.currentTarget.id;
    
    var selectOptions = this.data.selectOptions;

    for (var i = 0; i < selectOptions.length; i++) {
      var selectOption = selectOptions[i];
      if (selectOption.id == id) {
        selectOption.isRight = 1
      }else{
        selectOption.isRight = 0
      }
    }
    this.setData({
      "selectOptions": selectOptions
    });
  },

  selectOptionInputChange: function (e) {
    var id = e.currentTarget.id;
    var selectOptions = this.data.selectOptions;

    for(var i=0;i<selectOptions.length;i++){
      var selectOption = selectOptions[i];
      if(selectOption.id==id){
        selectOption.content = e.detail.value;
      }
     
    }
    this.setData({
      "selectOptions":selectOptions
    });
  },

  questionInputChange:function(e){
    this.setData({
      "question": e.detail.value
    });
  },

  answerInputChange:function(e){
    this.setData({
      "answer":e.detail.value
    })
  },

  stageManagerClick:function(){
    this.setData({
      "model":2
    });
    this.initQuestionNum();
  },

  saveQuetionCancelClick:function(){
    this.setData({
      "model":0,
      edit:0
    });

    this.initQuestions();
  },

  saveQuestionClick:function(){
    
    var outThis = this;
    var selectOptions = this.data.selectOptions;
    var stageId = this.data.selectStageId;
    var subjectId = this.data.selectSubjectId;
    var questionType = this.data.questionType;
    var question = this.data.question;
    var imgUrl = this.data.imgUrl;
    var answer = this.data.answer;
    var questionId = this.data.questionId;

    var fillWords="";


    if(!imgUrl){
      imgUrl = "";
    }

    if(!question){
      this.showToast("请输入问题");
      return;
    }

    if (util.isEmojiCharacter(question)){
      this.showToast("问题不能包含表情字符");
      return;
    }

    if(question.length>200){
      this.showToast("问题输入不能超过200个字符");
      return;
    }

    if(questionType=="0"){
      for (var i = 0; i < selectOptions.length;i++){
        var selectOption = selectOptions[i];
        if(!selectOption.content){
          this.showToast("选项请输入完整");
          return;
        }

        if(selectOption.content.length>20){
          this.showToast("选项不能超过20个字节");
          return;
        }


        if (util.isEmojiCharacter(selectOption.content)) {
          this.showToast("选项内容不能包含表情字符");
          return;
        }


      }
    }

    if(questionType=="1"){
      if (!answer){
        this.showToast("请输入答案");
        return;
      }

      if(answer.length>5){
        this.showToast("输入答案不能超过5个字");
        return;
      }

      if (util.isEmojiCharacter(answer)) {
        this.showToast("答案内容不能包含表情字符");
        return;
      }
    }

    if(questionType=="2"){
      var worlds = this.data.worlds;
      var worldChecks = this.data.worldChecks;
      for (var i = 0; i < worlds.length; i++) {
        var world = worlds[i];
        if(!world.content){
          this.showToast("答案请选择完整");
          return;
        }
      }

      for (var i = 0; i < worldChecks.length; i++) {
        var worldCheck = worldChecks[i];
        if (!worldCheck.content) {
          this.showToast("内容请输入完整");
          return;
        }

        if (util.isEmojiCharacter(worldCheck.content)) {
          this.showToast("内容不能包含表情字符");
          return;
        }
      }


    }

    this.showLoading();

    if(questionType==2){
      answer="";
      var worlds = this.data.worlds;
      for(var i=0;i<worlds.length;i++){
        answer = answer+worlds[i].content;
      }

      var worldChecks = this.data.worldChecks;
      for (var i = 0; i < worldChecks.length;i++){
        fillWords = fillWords + worldChecks[i].content;
      }
    }

    var optionsArray= new Array();

    for(var i=0;i<selectOptions.length;i++){
      optionsArray.push({
        content:selectOptions[i].content,
        isRight: selectOptions[i].isRight,
        seq:i+1,
        id: selectOptions[i].id
      });
    }


    var saveModel = this.data.saveModel;

    if(saveModel==0){
      battleManagerRequest.requestAddQuestion(
        {
          stageId: stageId,
          subjectId: subjectId,
          questionType: questionType,
          question: question,
          imgUrl: imgUrl,
          options: JSON.stringify(optionsArray),
          answer: answer,
          fillWords: fillWords

        }, {
          success: function () {
            outThis.hideLoading();
            outThis.showConfirm("添加成功", "是否继续添加", {
              confirm: function () {
                outThis.emptyContent();
              },
              cancel: function () {
                outThis.setData({
                  model: 0
                });
                outThis.initQuestions();
              }
            }, "继续添加", "返回");
          },
          fail: function () {
            outThis.hideLoading();
          }
        });
    }else if(saveModel==1){
      battleManagerRequest.requestUpdateQuestion(
        {
          battleQuestionId:questionId,
          stageId: stageId,
          subjectId: subjectId,
          questionType: questionType,
          question: question,
          imgUrl: imgUrl,
          options: JSON.stringify(optionsArray),
          answer: answer,
          fillWords: fillWords

        }, {
          success: function () {
            outThis.hideLoading();
            outThis.setData({
              model: 0,
              edit:0
            });
            outThis.initQuestions();
          },
          fail: function () {
            outThis.hideLoading();
          }
        });
    }
  },

  emptyContent:function(){
    var worldChecks = this.data.worldChecks;
    var worlds = this.data.worlds;
    var selectOptions = this.data.selectOptions;
    for(var i=0;i<worlds.length;i++){
      var world = worlds[i];
      world.content="";
      world.status=0;
      world.targetIndex = null;
    }
    for(var i=0;i<worldChecks.length;i++){
      var worldCheck = worldChecks[i];
      worldCheck.content="";
      worldCheck.status=2;
    }

    for (var i = 0; i < selectOptions.length;i++){
      var selectOption = selectOptions[i];
      selectOption.content = "";
    }

    this.setData({
      selectOptions: selectOptions,
      question: "",
      answer: "",
      isImg: 0,
      imgUrl: "",
      worldChecks: worldChecks,
      worlds: worlds
    })
  },

  switchSelect:function(){
    this.setData({
      questionType:0
    });
  },

  switchBlank:function(){
    this.setData({
      questionType: 1
    });
  },

  switchFillTerms:function(){
    this.setData({
      questionType: 2
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

  subjectItemClick:function(e){
    var id = e.currentTarget.id;
    var subjects = this.data.subjects;
    for(var i=0;i<subjects.length;i++){
      var subject = subjects[i];
      if(subject.id==id){
        this.setData({
          selectSubjectId:id
        })
      }else{
        
      }
    }

    this.initQuestions();
  },

  stageItemClick:function(e){
    var id = e.currentTarget.id;
    var stages = this.data.stages;

    console.log("stages:"+JSON.stringify(stages));
    
    for(var i=0;i<stages.length;i++){
      var stage = stages[i];
      if(stage.id==id){
        this.setData({
          selectStageId:id,
          selectQuestionNum: stage.questionNum
        });
      }
    }
    if (this.data.model == 0) {
      this.initQuestions();
    }else if(this.data.model == 1){
      console.log("2");
    }else if(this.data.model==2){
      this.initQuestionNum();
    }
    
  },

  initQuestionNum:function(){
    var outThis = this;
    var selectStageId = this.data.selectStageId;
    var stages = this.data.stages;
    for(var i=0;i<stages.length;i++){
      var stage = stages[i];
      if (stage.id == selectStageId){
        var questionNum = stage.questionNum;
        outThis.setData({
          selectQuestionNum:questionNum
        })
      }
    }
  },

  initStages:function(callback){
    var outThis = this;
    var periodId = this.data.periodId;
    battleManagerRequest.requestStages(periodId,{
      success:function(stages){
        if(stages&&stages.length>0){
          outThis.setData({
            selectStageId:stages[0].id
          })
          outThis.initQuestions();
          var stageDataArray = new Array();
          for (var i = 0; i < stages.length; i++) {
            var stage = stages[i];
            stageDataArray.push({
              id: stage.id,
              index: stage.index,
              questionNum:stage.questionCount
            });
          }
          outThis.setData({
            stages: stageDataArray
          });
        }

        if(callback&&callback.success){
          callback.success();
        }
        
      },
      fail:function(){

      }
    });
  },

  initSubjects: function () {
    var outThis = this;
    var battleId = this.data.battleId;
    battleManagerRequest.requestBattleSubjects(battleId, {
      success: function (subjects) {
        if(subjects&&subjects.length>0){
          outThis.setData({
            selectSubjectId:subjects[0].id
          });
          outThis.initQuestions();
          var subjectDataArray = new Array();
          for (var i = 0; i < subjects.length; i++) {
            var subject = subjects[i];
            subjectDataArray.push({
              imgUrl: subject.imgUrl,
              name: subject.name,
              status: 0,
              id: subject.id
            });
          }

          outThis.setData({
            subjects: subjectDataArray
          });
        }
        
      },
      fail: function () {

      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var periodId = options.periodId;
    var battleId = options.battleId;

    this.setData({
      battleId:battleId,
      periodId:periodId
    });

    this.initSubjects();
    this.initStages();

    this.initQueryQuestionCount();
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
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
    console.log("memberInfo:"+JSON.stringify(memberInfo));
    if(memberInfo){
      this.setData({
        isManager:memberInfo.isManager
      });
    }
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