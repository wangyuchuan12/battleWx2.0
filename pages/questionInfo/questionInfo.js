var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var request = require("../../utils/request.js");
var questionRequest = require("../../utils/questionRequest.js");
var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var questionAnswerRequest = require("../../utils/questionAnswerRequest.js");

var questionSelector;
var battleMemberQuestionAnswerId;
var battleMemberPaperAnswerId;
var outThis;
var interval;
var layerout = new baseLayerout.BaseLayerout({
  data:{
    imgUrl:"",
    content:"答题开始",
    percent:0,
    questionId:0,
    rightCount:0,
    wrongCount:0,
    process:0,
    rewardBean:0
  },

  eventListener:{
    inputSubmit: function (questionId,answer){
      if (interval){
        clearInterval(interval);
      }
      outThis.showLoading();
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      questionAnswerRequest.requestBattleQuestionAnswer({
        id: questionId,
        type: 0,
        memberId: memberInfo.id,
        battleId:memberInfo.battleId,
        stageIndex:memberInfo.stageIndex,
        answer: answer,
        roomId:memberInfo.roomId
      }, {
          success: function (data) {
            var rightCount = outThis.data.rightCount;
            var wrongCount = outThis.data.wrongCount;
            var process = outThis.data.process;
            if(data.right){
              rightCount++;
              //process = process+data.process;
            }else{
              wrongCount++;
            }
            outThis.setData({
              rightCount:rightCount,
              wrongCount:wrongCount,
              process: data.process,
              rewardBean: data.rewardBean,
              isPass:data.isPass
            });
            outThis.hideLoading();
            questionSelector.next();
            outThis.empty();
          },
          fail: function () {
            outThis.hideLoading();
          }
        });
    },
    fillSubmit: function (questionId,answer){
      if (interval) {
        clearInterval(interval);
      }
      outThis.showLoading();
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      questionAnswerRequest.requestBattleQuestionAnswer({
        id: questionId,
        type: 0,
        memberId: memberInfo.id,
        battleId: memberInfo.battleId,
        stageIndex: memberInfo.stageIndex,
        answer: answer,
        roomId: memberInfo.roomId
      }, {
          success: function (data) {
            var process = outThis.data.process;
            var rightCount = outThis.data.rightCount;
            var wrongCount = outThis.data.wrongCount;
            if (data.right) {
              rightCount++;
              //process = process + data.process;
            } else {
              wrongCount++;
            }
            outThis.setData({
              rightCount: rightCount,
              wrongCount: wrongCount,
              process: data.process,
              rewardBean: data.rewardBean,
              isPass: data.isPass
            })
            outThis.hideLoading();
            questionSelector.next();
            outThis.empty();
          },
          fail: function () {
            outThis.hideLoading();
          }
        });
    },
    selectSubmit: function (questionId,optionId){
      if (interval) {
        clearInterval(interval);
      }
      outThis.showLoading();
      var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
      questionAnswerRequest.requestBattleQuestionAnswer({
        id: questionId,
        type:0,
        memberId: memberInfo.id,
        battleId: memberInfo.battleId,
        stageIndex: memberInfo.stageIndex,
        optionId: optionId,
        roomId: memberInfo.roomId
      },{
        success:function(data){
          var rightCount = outThis.data.rightCount;
          var wrongCount = outThis.data.wrongCount;
          var process = outThis.data.process;
          console.log("process:"+process);
          if (data.right) {
            rightCount++;
            //process = process + data.process;
          } else {
            wrongCount++;
          }
          outThis.setData({
            rightCount: rightCount,
            wrongCount: wrongCount,
            process: data.process,
            rewardBean: data.rewardBean,
            isPass: data.isPass
          })
          outThis.hideLoading();
          questionSelector.next();
          outThis.empty();
        },
        fail:function(){
          outThis.hideLoading();
        }
      });
      
    }
  },

  setSelectData:function(data){

    this.setData({
      imgUrl:data.imgUrl,
      content:data.question
    });
    this.hideLoading();

    this.setQuestionId(data.id);
    this.setType(0);
    var array = new Array();
    var options = data.options;
    if(options){
      for(var i=0;i<options.length;i++){
        var option = options[i];
        array.push({
          id:option.id,
          content:option.content,
          isRight: option.isRight
        });
      }
      this.setOptions(array);
    }
  },

  setFillData:function(data){

    var answer = data.answer;
    this.hideLoading();
    this.setQuestionId(data.id);
    this.setData({
      imgUrl: data.imgUrl,
      content: data.question
    });
    this.fillWorld(null,answer.length);
    this.fillWorldCheck(data.fillWords);
    this.setType(2);
  },

  setInputData:function(data){

    this.hideLoading();
    this.setQuestionId(data.id);
    this.setRightAnswer(data.answer);
    this.setData({
      imgUrl: data.imgUrl,
      content: data.question,
      "questionInputData.answer":""
    });
    this.setType(1);
  },

  initView:function(ids,roomId){
    var outThis = this;

    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
   
    var battleId = memberInfo.battleId;


    questionSelector = new questionRequest.QuestionSelector(battleId, ids,roomId,{
      success: function (id,stageIndex){
        battleMemberPaperAnswerId = id
        memberInfo.stageIndex = stageIndex;
        battleMemberInfoRequest.setBattleMemberInfoFromCache(memberInfo);
        questionSelector.next();
      },
      fail:function(){

      }
    },{
      step:function(data){
        if(data.type==0){
          outThis.setSelectData(data);
        }
        else if(data.type==1){
          outThis.setInputData(data);
        }
        else if(data.type==2){
          outThis.setFillData(data);
        }

        var percent = 0;
        var allUnit = 200;
        var unit = 0;

        outThis.setData({
          percent: percent
        });

        if(interval){
          clearInterval(interval);
        }

        interval = setInterval(function(){
          unit++;
          percent = parseInt(unit/allUnit*100);
          outThis.setData({
            percent: percent
          });
          if(percent>=100){
            clearInterval(interval);
            var questionId = outThis.getQuestionId();
            outThis.eventListener.inputSubmit(questionId,"");
          }
        },100);
        
        
      },
      complete: function (){
        /*wx.navigateTo({
          url: '../progressScore/progressScore?battleMemberPaperAnswerId=' + battleMemberPaperAnswerId
        });*/

        if (interval) {
          clearInterval(interval);
        }

        wx.navigateBack({

        });

      },
      fail:function(){
        console.log("...............fail");
      }
    });

   
  },

  onUnload: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.startResult(outThis.data.rightCount, outThis.data.wrongCount, outThis.data.process, battleMemberPaperAnswerId,outThis.data.rewardBean,outThis.data.isPass);
  },

  onLoad: function (options) {
    var questionIds = options.questionIds;
    var roomId = options.roomId;

    var questionsArray = questionIds.split(",");

    outThis = this;
    this.showLoading();
    this.initView(questionsArray,roomId);
  }
});

layerout.addQuestionInputPlug();

layerout.begin();