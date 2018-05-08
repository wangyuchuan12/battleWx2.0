var request = require("request.js");

var questionAnswerRequest = require("questionAnswerRequest.js");

var domain = request.getDomain();
var battleQuestionUrl = domain + "/api/battle/battleQuestions";

var questionInfoUrl = domain + "/api/question/info";

var questionIds;

function QuestionSelector(battleId, ids, roomId,callback,stepCallback){
  var selector = new Object();
  /*
  requestBattleQuestions(subjectIds,{
    success:function(data){
      questionIds = data;
      questionAnswerRequest.requestCreatePaperAnswer(battleId, questionIds,{
        success:function(data){
          callback.success(data.battleMemberPaperAnswerId);
        }
      });
    },
    fail:function(){
      callback.fail();
    }
  });*/

  questionIds = ids;


  questionAnswerRequest.requestCreatePaperAnswer(battleId, questionIds,roomId,{
    success: function (data) {
      callback.success(data.battleMemberPaperAnswerId,data.stageIndex);
    }
  });

  


  var index = 0;
  this.next = function(){
    console.log("nexg1");
    if (index <= questionIds.length-1){
      console.log("nexg2");
      var id = questionIds[index];
      index++;
      requestQuestionInfo(id,{
        success:function(data){
          console.log("requestQuestionInfo");
          stepCallback.step(data)
        },
        fail:function(){
          console.log("fail");
          stepCallback.fail();
        }
      });
    }else{
      stepCallback.complete();
    }
    
  }
}

function requestQuestionInfo(id,callback){
  request.request(questionInfoUrl,{id:id},{
      success:function(resp){
         if(resp.success){
           callback.success(resp.data);
         }else{
           console.log("requestQuestionInfo.fail:"+JSON.stringify(resp));
           callback.fail();
         }
      },
      fail:function(){
        callback.fail();
      }
  });
}

function requestBattleQuestions(subjectIds,callback){
  var subjectIdStr = "";
  for (var i = 0; i < subjectIds.length;i++){
    subjectIdStr = subjectIdStr + subjectIds[i];
    if (i < subjectIds.length-1){
      subjectIdStr = subjectIdStr + ",";
    }
   
  }

  request.request(battleQuestionUrl, { subjectIds: subjectIdStr},{
      success:function(resp){
          if(resp.success){
            callback.success(resp.data);
          }else{
            callback.fail();
          }
      },
      fail:function(){
        callback.fail();
      }
  });
}

module.exports = {
  QuestionSelector: QuestionSelector
}