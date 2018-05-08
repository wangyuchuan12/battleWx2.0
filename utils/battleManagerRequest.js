var request = require("request.js");
var subjectUrl = request.getDomain()+"/api/manager/subjects";
var periodUrl = request.getDomain()+"/api/manager/periods";
var addSubjectUrl = request.getDomain()+"/api/manager/addSubject";
var delSubjectUrl = request.getDomain() + "/api/manager/delSubject";
var stagesUrl = request.getDomain()+"/api/manager/stages";
var questionsUrl = request.getDomain()+"/api/manager/questions";
var questionInfoUrl = request.getDomain() + "/api/question/info";
var addStageUrl = request.getDomain() + "/api/manager/addStage";
var addQuestionsUrl = request.getDomain() + "/api/manager/addQuestion";
var updateQuestionsUrl = request.getDomain() + "/api/manager/updateQuestion";
var delQuestionsUrl = request.getDomain() + "/api/manager/delQuestion";
var updateStageUrl = request.getDomain() + "/api/manager/updateStage";

var addPeriodUrl = request.getDomain() + "/api/manager/addPeriod";

var battleImgUpdateUrl= request.getDomain() + "/api/manager/addPeriod";

var battleInfoUrl = request.getDomain() + "/api/manager/battleInfo";

var updateBattleInfoUrl = request.getDomain() + "/api/manager/updateBattleInfo";

var addBattleInfoUrl = request.getDomain() + "/api/manager/addBattleInfo";

var startUpPeriodUrl = request.getDomain() + "/api/manager/startUpPeriod";

var roomsUrl = request.getDomain() + "/api/manager/rooms";
var roomInfoUrl = request.getDomain() + "/api/manager/roomInfo";
var editRoomNameUrl = request.getDomain() + "/api/manager/roomNameEdit";

var editRoomInstructionUrl = request.getDomain() + "/api/manager/roomInstructionEdit";

var editRoomImgUrl = request.getDomain() + "/api/manager/roomImgEdit";

var editRoomSearchAble = request.getDomain() + "/api/manager/roomSearchAbleEdit";

var editRoomIsDisplay = request.getDomain() + "/api/manager/roomIsDisplayEdit";

var queryQuestionCountUrl = request.getDomain() + "/api/manager/queryQuestionCount";


function requestQueryQuestionCount(battleId,periodId, callback) {
  request.request(queryQuestionCountUrl, {
    battleId: battleId,
    periodId: periodId
  }, {
      success: function (resp) {
        if (resp.success) {
          callback.success(resp.data);
        } else {
          callback.fail();
        }
      },
      fail: function () {
        callback.fail();
      }
    });
}

function requestAddBattleInfo(params,callback){
  request.request(addBattleInfoUrl, {
    name: params.name,
    instruction: params.instruction,
    headImg: params.headImg
  }, {
      success: function (resp) {
        if (resp.success) {
          callback.success(resp.data);
        } else {
          callback.fail();
        }
      },
      fail: function () {
        callback.fail();
      }
    });
}

function requestUpdateBattleInfo(params,callback){
  request.request(updateBattleInfoUrl, { 
            battleId: params.battleId,
            name: params.name,
            instruction: params.instruction,
            headImg: params.headImg
    }, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestBattleInfo(battleId,callback){
  request.request(battleInfoUrl,{battleId: battleId}, {
    success: function (resp) {
      console.log("requestBattleInfo:"+JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestBattleImgUpdate(battleId, imgUrl, callback) {
  request.request(battleImgUpdateUrl,{battleId:battleId,imgUrl:imgUrl}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}


function requestAddPeriod(battleId,callback){
  request.request(addPeriodUrl, {battleId:battleId}, {
    success: function (resp) {
      console.log("resp:"+JSON.stringify(resp));
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}


function requestDelQuestion(id,callback){
  request.request(delQuestionsUrl, { id: id}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestAddStage(periodId,num,callback){
  request.request(addStageUrl,{periodId: periodId, num: num}, {
    success: function (resp) {
      if (resp.success) {
        console.log("resp.data:"+JSON.stringify(resp.data));
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestUpdateStage(stageId,num,callback){
  request.request(updateStageUrl, { stageId: stageId, num: num }, {
    success: function (resp) {
      if (resp.success) {
        callback.success();
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestQuestionInfo(id,callback){
  request.request(questionInfoUrl, { id: id}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestQuestions(stageId,subjectId,callback){
  request.request(questionsUrl, {stageId:stageId, subjectId:subjectId}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestBattleSubjects(battleId,callback){
  request.request(subjectUrl,{battleId:battleId},{
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

function requestBattlePeriods(battleId,callback){
  request.request(periodUrl, { battleId: battleId }, {
    success: function (resp) {
      if (resp.success) {

        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}


function requestAddSubject(battleId,name,imgUrl,callback){
  request.request(addSubjectUrl, { battleId: battleId,name:name,imgUrl:imgUrl}, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestStages(periodId,callback){
  request.request(stagesUrl, { periodId: periodId }, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestDelSubject(subjectId,callback){
  request.request(delSubjectUrl,{subjectId:subjectId},{
      success:function(resp){
        if(resp.success){
          callback.success();
        }else{
          callback.fail();
        }
      },
      fail:function(){
        callback.fail();
      }
  });
}

function requestUpdateQuestion(params,callback){
  request.request(updateQuestionsUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success();
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestAddQuestion(params,callback){
  request.request(addQuestionsUrl,params, {
    success: function (resp) {
      if (resp.success) {
        callback.success();
      } else {
        callback.fail();
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestStartUpPeriod(periodId,callback){
  var params = new Object();
  params.periodId = periodId;
  request.request(startUpPeriodUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success();
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestRooms(callback){
  var params = new Object();

  request.requestWithLogin(roomsUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestRoomInfo(id,callback){
  var params = new Object();
  params.id = id;
  request.requestWithLogin(roomInfoUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestEditRoomName(id,name,callback){
  var params = new Object();
  params.id = id;
  params.name = name;
  request.requestWithLogin(editRoomNameUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestEditRoomInstruction(id, instruction, callback) {
  var params = new Object();
  params.id = id;
  params.instruction = instruction;
  request.requestWithLogin(editRoomInstructionUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestEditRoomImgUrl(id, imgUrl, callback) {
  var params = new Object();
  params.id = id;
  params.imgUrl = imgUrl;
  request.requestWithLogin(editRoomImgUrl, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestEditRoomSearchAble(id, isSearchAble, callback) {
  var params = new Object();
  params.id = id;
  params.isSearchAble = isSearchAble;
  request.requestWithLogin(editRoomSearchAble, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

function requestEditRoomIsDisplay(id, isDisplay, callback) {
  var params = new Object();
  params.id = id;
  params.isDisplay = isDisplay;
  request.requestWithLogin(editRoomIsDisplay, params, {
    success: function (resp) {
      if (resp.success) {
        callback.success(resp.data);
      } else {
        callback.fail(resp.errorMsg);
      }
    },
    fail: function () {
      callback.fail();
    }
  });
}

module.exports = {
  requestBattleSubjects: requestBattleSubjects,
  requestBattlePeriods: requestBattlePeriods,
  requestAddSubject: requestAddSubject,
  requestDelSubject: requestDelSubject,
  requestStages: requestStages,
  requestQuestions: requestQuestions,
  requestAddQuestion: requestAddQuestion,
  requestUpdateQuestion: requestUpdateQuestion,
  requestAddStage: requestAddStage,
  requestUpdateStage: requestUpdateStage,
  requestQuestionInfo: requestQuestionInfo,
  requestDelQuestion: requestDelQuestion,
  requestAddPeriod: requestAddPeriod,
  requestBattleImgUpdate: requestBattleImgUpdate,
  requestBattleInfo: requestBattleInfo,
  requestUpdateBattleInfo: requestUpdateBattleInfo,
  requestAddBattleInfo: requestAddBattleInfo,
  requestStartUpPeriod: requestStartUpPeriod,
  requestRooms: requestRooms,
  requestRoomInfo: requestRoomInfo,
  requestEditRoomName: requestEditRoomName,
  requestEditRoomInstruction: requestEditRoomInstruction,
  requestEditRoomImgUrl: requestEditRoomImgUrl,
  requestEditRoomIsDisplay: requestEditRoomIsDisplay,
  requestEditRoomSearchAble: requestEditRoomSearchAble,
  requestQueryQuestionCount: requestQueryQuestionCount
}