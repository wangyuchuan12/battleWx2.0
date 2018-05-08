var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var request = require("../../utils/battleMembersRequest.js");
var membersRankUtil = require("../../utils/membersRankUtil.js");
var layerout = new baseLayerout.BaseLayerout({
  data:{
    rankMembers:[/*{
      nickname:"王煜川",
      process:100,
      consumeHour:32,
      consumeMinute:20,
      isFirst:1,
      imgUrl:"http://ooe8ianrr.bkt.clouddn.com/znm123.png",
      stageIndex:0,
      loveCount:5,
      loveResidule:0
    }, {
      nickname: "王煜川",
      process: 100,
      consumeHour: 32,
      consumeMinute: 20,
      isFirst: 1,
      imgUrl: "http://ooe8ianrr.bkt.clouddn.com/znm123.png",
      stageIndex:0,
      loveCount:5,
      loveResidule:0
      }, {
        nickname: "王煜川",
        process: 100,
        consumeHour: 32,
        consumeMinute: 20,
        isFirst: 1,
        imgUrl: "http://ooe8ianrr.bkt.clouddn.com/znm123.png",
        stageIndex:0,
        loveList:[{
          type:0
        },{
          type:0
        },{
          type:1
        }]
    }, {
      nickname: "王煜川",
      process: 100,
      consumeHour: 32,
      consumeMinute: 20,
      isFirst: 1,
      imgUrl: "http://ooe8ianrr.bkt.clouddn.com/znm123.png",
      stageIndex:0,
      loveCount:5,
      loveResidule:2
    }*/]
  },
  initRankData: function (battleId, roomId, groupId) {
    var outThis = this;
    request.getBattleMembers(battleId, roomId,{
      success: function (data) {
        if (data) {
          var members = new Array();
          for (var i = 0; i < data.length; i++) {
            var loveCount = data[i].loveCount;
            var loveResidule = data[i].loveResidule;
            if (!loveResidule || loveResidule<0){
              loveResidule = 0;
            }
            var loveList = new Array();
            for(var j=0;j<loveResidule;j++){
              loveList.push({
                type:1
              });
            }
            for(var j=0;j<loveCount-loveResidule;j++){
              loveList.push({
                type: 0
              });
            }
            members.push({
              nickname: data[i].nickname,
              process: data[i].process,
              imgUrl: data[i].headImg,
              stageIndex: data[i].stageIndex,
              stageCount: data[i].stageCount,
              loveList: loveList,
              status:data[i].status,
              loveResidule: loveResidule,
              score:data[i].score
            });
          }
          membersRankUtil.rankByProcess(members);
          outThis.setData({
            rankMembers:members
          });
        }
      },
      fail: function () {

      }
    }, null, groupId);
  },
  onLoad: function (options) {
    var battleId = options.battleId;
    var roomId = options.roomId;
    var groupId = options.groupId;
    this.initRankData(battleId, roomId, groupId);
  },
  onUnload: function () {
    console.log("........likai");
  }
});


layerout.begin();