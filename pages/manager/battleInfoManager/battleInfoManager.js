var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var battleManagerRequest = require("../../../utils/battleManagerRequest.js");
var resourceRequest = require("../../../utils/resourceRequest.js");
var layerout = new baseLayerout.BaseLayerout({
  data:{
    battleId:"",
    isImg:0,
    battleInfoName:"",
    battleInfoContent:"",
    subjects:[/*{
      imgUrl:"http://7xlw44.com1.z0.glb.clouddn.com/09660159-7c00-4b10-9add-42d00d2e7c46",
      name:"火影忍者"
    },{
      imgUrl: "http://7xlw44.com1.z0.glb.clouddn.com/09660159-7c00-4b10-9add-42d00d2e7c46",
      name: "火影忍者"
    }*/],
    periods:[/*{
      num:"10",
      total:"50",
      status:0
    }, {
      num: "10",
      total: "50",
      status: 0
    }*/]
  },

  updateBattleInfoClick:function(){
    wx.navigateTo({
      url: '../battleInfoSave/battleInfoSave?battleId='+this.data.battleId+"&saveModel=1",
    })
  },

  imgClick: function () {
    /*
    var outThis = this;
    resourceRequest.openLoadFile({
      success: function (path) {
        battleManagerRequest.requestBattleImgUpdate(outThis.data.battleId,path,{
          success:function(){
            outThis.setData({
              isImg: 1,
              imgUrl: path
            });
          },
          fail:function(){
            outThis.showToast("更换主题图片失败");
          }
        });
        
      },
      fail: function () {
        console.log("fail");
      }
    });*/
  },

  subjectDelPre:function(e){
    this.otherClick();
    var id = e.currentTarget.id;
    var index = id.substring("pre_".length);
    var key = "subjects["+index+"].status";
    this.setData({
      [key]:1
    });
  },

  otherClick:function(){
    var subjects = this.data.subjects;
    for(var i=0;i<subjects.length;i++){
      var subject = subjects[i];
      subject.status=0;
    }
    this.setData({
      subjects:subjects
    });
  },

  auditClick:function(){
    var battleId = this.data.battleId;
    wx.navigateTo({
      url: '../../questionFactory/questionFactoryAudit/questionFactoryAudit?battleId='+battleId
    });
  },

  subjectDelDo:function(e){
    var outThis = this;
    var id = e.currentTarget.id;
    var index = id.substring("do_".length);
    var subjectId = this.data.subjects[index].id;
    battleManagerRequest.requestDelSubject(subjectId,{
      success:function(){
        outThis.initSubjects();
      },
      fail:function(){

      }
    });
  },

  initBattleInfo:function(){
    var outThis = this;
    var battleId = this.data.battleId;
    battleManagerRequest.requestBattleInfo(battleId,{
      success:function(battleInfo){
          if(battleInfo.headImg){
            outThis.setData({
              isImg:1,
              imgUrl:battleInfo.headImg,
              battleInfoName:battleInfo.name,
              battleInfoContent: battleInfo.instruction
            });
          }
      },
      fail:function(resp){
        console.log(JSON.stringify(resp));
      }
    });
  },

  initPeriods:function(){
    var outThis = this;
    battleManagerRequest.requestBattlePeriods(this.data.battleId,{
      success:function(periods){
        var periodDataArray = new Array();
        for(var i=0;i<periods.length;i++){
          var period = periods[i];
          periodDataArray.push({
            takepartCount: period.takepartCount,
            ownerNickname: period.ownerNickname,
            id:period.id,
            isDefault: period.isDefault,
            ownerImg: period.ownerImg
          });
        }

        outThis.setData({
          periods: periodDataArray
        })
      },
      fail:function(){
        console.log("fail");
      }
    });
  },

  initSubjects:function(){
    var outThis = this;
    battleManagerRequest.requestBattleSubjects(this.data.battleId,{
      success:function(subjects){
        var subjectDataArray = new Array();
        for(var i=0;i<subjects.length;i++){
          var subject = subjects[i];
          subjectDataArray.push({
            imgUrl:subject.imgUrl,
            name:subject.name,
            status:0,
            id:subject.id
          });
        }

        outThis.setData({
          subjects: subjectDataArray
        })
      },
      fail:function(){

      }
    });
  },

  addSubjectClick:function(){
    wx.navigateTo({
      url: '../addSubject/addSubject?battleId='+this.data.battleId
    });
  },

  addPeriodClick:function(){

    var outThis = this;
    this.showLoading();

    battleManagerRequest.requestAddPeriod(this.data.battleId,{
      success:function(period){
        outThis.hideLoading();
        
        wx.navigateTo({
          url: '../battlePeriodManager/battlePeriodManager?periodId='+period.id+"&battleId="+outThis.data.battleId,
        });
      },
      fail:function(){
        outThis.showToast("新建失败");
        outThis.hideLoading();
      }
    });
    
  },

  periodInfoClick:function(e){
    var id = e.currentTarget.id;

    wx.navigateTo({
      url: '../battlePeriodManager/battlePeriodManager?periodId='+id+"&battleId="+this.data.battleId,
    });
  },

  onLoad: function (options) {
    var battleId = options.battleId;
    console.log("...battleId:"+battleId);
    this.setData({
      battleId:battleId
    });
  },
  onShow:function(){
    this.initSubjects();
    this.initPeriods();
    this.initBattleInfo();
  }
});

layerout.begin();