var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var battleManagerRequest = require("../../../utils/battleManagerRequest.js");
var resourceRequest = require("../../../utils/resourceRequest.js");
var layerout = new baseLayerout.BaseLayerout({
  data:{
    isImg:0,
    imgUrl:"",
    name:"",
    instruction:"",
    battleId:"",
    //0表示新增 1表示修改
    saveModel:0
  },
  nameInputChange:function(e){
    var name = e.detail.value;
    this.setData({
      name:name
    });
  },
  instructionInputChange:function(e){
    var instruction = e.detail.value;
    this.setData({
      instruction:instruction
    });
  },

  initBattleInfo:function(){
    var outThis = this;
    battleManagerRequest.requestBattleInfo(this.data.battleId,{
      success:function(battleInfo){
        console.log(JSON.stringify(battleInfo));
        var isImg = 0;
        if(battleInfo.headImg){
          isImg = 1;
        }
        outThis.setData({
          isImg: isImg,
          imgUrl: battleInfo.headImg,
          name: battleInfo.name,
          instruction:battleInfo.instruction
        });
      },
      fail:function(){

      }
    });
  },
  submitClick:function(){
    var saveModel = this.data.saveModel;
    var outThis = this;

    if(saveModel==1){
      battleManagerRequest.requestUpdateBattleInfo({
        headImg: this.data.imgUrl,
        name: this.data.name,
        instruction: this.data.instruction,
        battleId: this.data.battleId
      }, {
          success: function () {
            wx.navigateTo({
              url: '../battleInfoManager/battleInfoManager?battleId=' + outThis.data.battleId
            });
          },
          fail: function () {

          }
        });
    }else if(saveModel==0){
      battleManagerRequest.requestAddBattleInfo({
        headImg: this.data.imgUrl,
        name: this.data.name,
        instruction: this.data.instruction
      }, {
          success: function (battle) {
            wx.navigateTo({
              url: '../battleInfoManager/battleInfoManager?battleId=' + battle.id
            });
          },
          fail: function () {

          }
        });
    }
    
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
  onLoad: function (options) {
    var battleId = options.battleId;
    var saveModel = options.saveModel;
    this.setData({
      battleId:battleId,
      saveModel:saveModel
    });

    this.initBattleInfo();
    
  }
});

layerout.begin();