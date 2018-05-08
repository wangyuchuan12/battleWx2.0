var currentLoveCoolingRequest = require("../../../utils/currentLoveCoolingRequest.js");
var battleMemberInfoRequest = require("../../../utils/battleMemberInfoRequest.js");
var supperLoveRequest = require("../../../utils/supperLoveRequest.js");
var imgResource = require("../../../utils/imgResource.js");
var interval;
var progressScorePlug = {
data: {
  logs: [],
  progressScoreData:{
    //总距离
    distance:0,
    //进度
    progress:0,
    score:0,
    scrollGogal:0,
    currentDom: 0,
    loveList: [],
    isIncrease:0,
    //冷却数据
    loveCooling:{
      schedule:200,
      upperLimit:1000,
      coolLoveSeq:0,
      status:0,
      hour:0,
      min:0,
      second:0,
      speedCoolBean:0,
      speedCoolSecond:0
    },
    positions:[/*{
      id:"myDom",
      begin:10,
      end:20,
      animationData: {},
      imgUrl:"http://on3s1z2us.bkt.clouddn.com/target.png",
      isMy:1
    }*/],
    targets: [{
      left: 12.5,
      top: 1900,
      bgUrl: "",
      index: 0,
      isBig: 0,
      //type:0,
      beanNum:1
    }, {
      left: 21,
      top: 1870,
      bgUrl: "",
      index: 1,
      isBig: 1,
      //type: 0,
      beanNum: 2
    }, {
      left: 30,
      top: 1865,
      bgUrl: "",
      index: 2,
      isBig:0,
      //type: 0,
      beanNum: 3
    }, {
      left: 38,
      top: 1865,
      bgUrl: "",
      index: 3,
      isBig: 0,
      //type: 0,
      beanNum: 4
    }, {
      left: 46,
      top: 1867,
      bgUrl: "",
      index: 4,
      isBig: 0,
      //type: 0,
      beanNum: 5
    }, {
      left: 53,
      top: 1874,
      bgUrl: " ",
      index: 5,
      isBig: 0,
      //type: 0,
      beanNum: 6
    }, {
      left: 60,
      top: 1879,
      bgUrl: " ",
      index: 6,
      isBig: 0,
      //type: 0,
      beanNum: 7
    }, {
      left: 68,
      top: 1880,
      bgUrl: " ",
      index: 7,
      isBig: 0
    }, {
      left: 75,
      top: 1875,
      bgUrl: " ",
      index: 8,
      isBig: 0
    }, {
      left: 83,
      top: 1860,
      bgUrl: " ",
      index: 9,
      isBig: 0
    }, {
      left: 88,
      top: 1834,
      bgUrl: " ",
      index: 10,
      isBig: 0
    }, {
      left: 89,
      top: 1805,
      bgUrl: " ",
      index: 11,
      isBig: 0
    }, {
      left: 84,
      top: 1787,
      bgUrl: " ",
      index: 12,
      isBig: 0
    }, {
      left: 77,
      top: 1780,
      bgUrl: " ",
      index: 13,
      isBig: 0
    }, {
      left: 69,
      top: 1780,
      bgUrl: " ",
      index: 14,
      isBig: 0
    }, {
      left: 60,
      top: 1775,
      bgUrl: " ",
      index: 15,
      isBig: 0
    }, {
      left: 50,
      top: 1775,
      bgUrl: " ",
      index: 16,
      isBig: 0
    }, {
      left: 40,
      top: 1770,
      bgUrl: " ",
      index: 17,
      isBig: 0
    }, {
      left: 33,
      top: 1760,
      bgUrl: " ",
      index: 18,
      isBig: 0
    }, {
      left: 25,
      top: 1730,
      bgUrl: " ",
      index: 19,
      isBig: 0
    }, {
      left: 26,
      top: 1695,
      bgUrl: " ",
      index: 20,
      isBig: 0
    }, {
      left: 35,
      top: 1663,
      bgUrl: " ",
      index: 21,
      isBig: 0
    }, {
      left: 43.5,
      top: 1655,
      bgUrl: " ",
      index: 22,
      isBig: 0
    }, {
      left: 54,
      top: 1670,
      bgUrl: " ",
      index: 23,
      isBig: 0
    }, {
      left: 67.5,
      top: 1670,
      bgUrl: " ",
      index: 24,
      isBig: 0
    }, {
      left: 79.5,
      top: 1670,
      bgUrl: " ",
      index: 25,
      isBig: 0
    }, {
      left: 82,
      top: 1620,
      bgUrl: " ",
      index: 26,
      isBig: 0
    }, {
      left: 80,
      top: 1590,
      bgUrl: " ",
      index: 27,
      isBig: 0
    }, {
      left: 70,
      top: 1578,
      bgUrl: " ",
      index: 28,
      isBig: 0
    }, {
      left: 60,
      top: 1573,
      bgUrl: " ",
      index: 29,
      isBig: 0
    }, {
      left: 53,
      top: 1567,
      bgUrl: " ",
      index: 30,
      isBig: 0
    }, {
      left: 45,
      top: 1570,
      bgUrl: " ",
      index: 31,
      isBig: 0
    }, {
      left: 35,
      top: 1560,
      bgUrl: " ",
      index: 32,
      isBig: 0
    }, {
      left: 28,
      top: 1555,
      bgUrl: " ",
      index: 33,
      isBig: 0
    }, {
      left: 22,
      top: 1530,
      bgUrl: " ",
      index: 34,
      isBig: 0
    }, {
      left: 27,
      top: 1500,
      bgUrl: " ",
      index: 35,
      isBig: 0
    }, {
      left: 36,
      top: 1500,
      bgUrl: " ",
      index: 36,
      isBig: 0
    }, {
      left: 45,
      top: 1500,
      bgUrl: " ",
      index: 37,
      isBig: 0
    }, {
      left: 53,
      top: 1510,
      bgUrl: " ",
      index: 38,
      isBig: 0
    }, {
      left: 61,
      top: 1510,
      bgUrl: " ",
      index: 39,
      isBig: 0
    }, {
      left: 70,
      top: 1490,
      bgUrl: " ",
      index: 40,
      isBig: 0
    }, {
      left: 70,
      top: 1460,
      bgUrl: " ",
      index: 41,
      isBig: 0
    }, {
      left: 70,
      top: 1430,
      bgUrl: " ",
      index: 42,
      isBig: 0
    }, {
      left: 70,
      top: 1400,
      bgUrl: " ",
      index: 43,
      isBig: 0
    }, {
      left: 70,
      top: 1370,
      bgUrl: " ",
      index: 44,
      isBig: 0
    }, {
      left: 70,
      top: 1340,
      bgUrl: " ",
      index: 45,
      isBig: 0
    }, {
      left: 70,
      top: 1310,
      bgUrl: " ",
      index: 46,
      isBig: 0
    }, {
      left: 70,
      top: 1280,
      bgUrl: " ",
      index: 47,
      isBig: 0
    }, {
      left: 70,
      top: 1250,
      bgUrl: " ",
      index: 48,
      isBig: 0
    }, {
      left: 70,
      top: 1220,
      bgUrl: " ",
      index: 49,
      isBig: 0
    }, {
      left: 73,
      top: 1160,
      bgUrl: " ",
      index: 50,
      isBig: 0
    }, {
      left: 77,
      top: 1080,
      bgUrl: " ",
      index: 51,
      isBig: 0
    }, {
      left: 69,
      top: 1070,
      bgUrl: " ",
      index: 52,
      isBig: 0
    }, {
      left: 62,
      top: 1060,
      bgUrl: " ",
      index: 53,
      isBig: 0
    }, {
      left: 55,
      top: 1050,
      bgUrl: " ",
      index: 54,
      isBig: 0
    }, {
      left: 50,
      top: 1030,
      bgUrl: " ",
      index: 55,
      isBig: 0
    }, {
      left: 60,
      top: 1010,
      bgUrl: " ",
      index: 56,
      isBig: 0
    }, {
      left: 68,
      top: 993,
      bgUrl: " ",
      index: 57,
      isBig: 0
    }, {
      left: 77,
      top: 980,
      bgUrl: " ",
      index: 58,
      isBig: 0
    }, {
      left: 85,
      top: 950,
      bgUrl: " ",
      index: 59,
      isBig: 0
    }, {
      left: 87,
      top: 900,
      bgUrl: " ",
      index: 60,
      isBig: 0
    }, {
      left: 80,
      top: 870,
      bgUrl: " ",
      index: 61,
      isBig: 0
    }, {
      left: 70,
      top: 880,
      bgUrl: " ",
      index: 62,
      isBig: 0
    }, {
      left: 63,
      top: 885,
      bgUrl: " ",
      index: 63,
      isBig: 0
    }, {
      left: 54,
      top: 895,
      bgUrl: " ",
      index: 64,
      isBig: 0
    }, {
      left: 45,
      top: 911,
      bgUrl: " ",
      index: 65,
      isBig: 0
    }, {
      left: 35,
      top: 912,
      bgUrl: " ",
      index: 66,
      isBig: 0
    }, {
      left: 25,
      top: 905,
      bgUrl: " ",
      index: 67,
      isBig: 0
    }, {
      left: 17,
      top: 890,
      bgUrl: " ",
      index: 68,
      isBig: 0
    }, {
      left: 12,
      top: 865,
      bgUrl: " ",
      index: 69,
      isBig: 0
    }, {
      left: 12,
      top: 830,
      bgUrl: " ",
      index: 70,
      isBig: 0
    }, {
      left: 14,
      top: 800,
      bgUrl: " ",
      index: 71,
      isBig: 0
    }, {
      left: 18,
      top: 770,
      bgUrl: " ",
      index: 72,
      isBig: 0
    }, {
      left: 25,
      top: 760,
      bgUrl: " ",
      index: 73,
      isBig: 0
    }, {
      left: 33,
      top: 747,
      bgUrl: " ",
      index: 74,
      isBig: 0
    }, {
      left: 41,
      top: 743,
      bgUrl: " ",
      index: 75,
      isBig: 0
    }, {
      left: 50,
      top: 743,
      bgUrl: " ",
      index: 76,
      isBig: 0
    }, {
      left: 58,
      top: 744,
      bgUrl: " ",
      index: 77,
      isBig: 0
    }, {
      left: 66,
      top: 744,
      bgUrl: " ",
      index: 78,
      isBig: 0
    }, {
      left: 75,
      top: 747,
      bgUrl: " ",
      index: 79,
      isBig: 0
    }, {
      left: 75,
      top: 720,
      bgUrl: " ",
      index: 80,
      isBig: 0
    }, {
      left: 65,
      top: 710,
      bgUrl: " ",
      index: 81,
      isBig: 0
    }, {
      left: 55,
      top: 703,
      bgUrl: " ",
      index: 82,
      isBig: 0
    }, {
      left: 45,
      top: 694,
      bgUrl: " ",
      index: 83,
      isBig: 0
    }, {
      left: 38,
      top: 670,
      bgUrl: " ",
      index: 84,
      isBig: 0
    }, {
      left: 45,
      top: 647,
      bgUrl: " ",
      index: 85,
      isBig: 0
    }, {
      left: 55,
      top: 642,
      bgUrl: " ",
      index: 86,
      isBig: 0
    }, {
      left: 65,
      top: 638,
      bgUrl: " ",
      index: 87,
      isBig: 0
    }, {
      left: 75,
      top: 632,
      bgUrl: " ",
      index: 88,
      isBig: 0
    }, {
      left: 85,
      top: 615,
      bgUrl: " ",
      index: 89,
      isBig: 0
    }, {
      left: 92,
      top: 580,
      bgUrl: " ",
      index: 90,
      isBig: 0
    }, {
      left: 85,
      top: 540,
      bgUrl: " ",
      index: 91,
      isBig: 0
    }, {
      left: 77,
      top: 520,
      bgUrl: " ",
      index: 92,
      isBig: 0
    }, {
      left: 67,
      top: 513,
      bgUrl: " ",
      index: 93,
      isBig: 0
    }, {
      left: 57,
      top: 513,
      bgUrl: " ",
      index: 94,
      isBig: 0
    }, {
      left: 47,
      top: 519,
      bgUrl: " ",
      index: 95,
      isBig: 0
    }, {
      left: 37,
      top: 530,
      bgUrl: " ",
      index: 96,
      isBig: 0
    }, {
      left: 27,
      top: 539,
      bgUrl: " ",
      index: 97,
      isBig: 0
    }, {
      left: 18,
      top: 519,
      bgUrl: " ",
      index: 98,
      isBig: 0
    }, {
      left: 14,
      top: 495,
      bgUrl: " ",
      index: 99,
      isBig: 0
    }, {
      left: 20,
      top: 465,
      bgUrl: " ",
      index: 100,
      isBig: 0
    }, {
      left: 30,
      top: 452,
      bgUrl: " ",
      index: 101,
      isBig: 0
    }, {
      left: 40,
      top: 450,
      bgUrl: " ",
      index: 102,
      isBig: 0
    }, {
      left: 50,
      top: 450,
      bgUrl: " ",
      index: 103,
      isBig: 0
    }, {
      left: 60,
      top: 450,
      bgUrl: " ",
      index: 104,
      isBig: 0
    }, {
      left: 68,
      top: 450,
      bgUrl: " ",
      index: 105,
      isBig: 0
    }, {
      left: 77,
      top: 450,
      bgUrl: " ",
      index: 106,
      isBig: 0
    }, {
      left: 87,
      top: 438,
      bgUrl: " ",
      index: 107,
      isBig: 0
    }, {
      left: 91,
      top: 410,
      bgUrl: " ",
      index: 108,
      isBig: 0
    }, {
      left: 88,
      top: 380,
      bgUrl: " ",
      index: 109,
      isBig: 0
    }, {
      left: 80,
      top: 374,
      bgUrl: " ",
      index: 110,
      isBig: 0
    }, {
      left: 73,
      top: 364,
      bgUrl: " ",
      index: 111,
      isBig: 0
    }, {
      left: 67,
      top: 360,
      bgUrl: " ",
      index: 112,
      isBig: 0
    }, {
      left: 60,
      top: 360,
      bgUrl: " ",
      index: 113,
      isBig: 0
    }, {
      left: 53,
      top: 360,
      bgUrl: " ",
      index: 114,
      isBig: 0
    }, {
      left: 47,
      top: 358,
      bgUrl: " ",
      index: 115,
      isBig: 0
    }, {
      left: 40,
      top: 358,
      bgUrl: " ",
      index: 116,
      isBig: 0
    }, {
      left: 33,
      top: 352,
      bgUrl: " ",
      index: 117,
      isBig: 0
    }, {
      left: 25,
      top: 340,
      bgUrl: " ",
      index: 118,
      isBig: 0
    }, {
      left: 25,
      top: 310,
      bgUrl: " ",
      index: 119,
      isBig: 0
    }, {
      left: 32,
      top: 280,
      bgUrl: " ",
      index: 120,
      isBig: 0
    }
    ]
  },
},

addStep:function(index,type,imgUrl,beanNum,isBig){
  var targets = this.data.progressScoreData.targets;
  for (var i = 0; i < targets.length;i++){
    var target = targets[i];
    if (target.index==index){
      target.bgUrl = imgUrl;
      target.type = type;
      target.isReward = 1;
      target.beanNum = beanNum;
      target.isBig = isBig;
      var key = "progressScoreData.targets["+index+"]";
      this.setData({
        [key]:target
      });
    }
  }
},

setTarget:function(target){
  var index = target.index;
  var key = "progressScoreData.targets["+index+"]";
  this.setData({
    [key]:target
  });
},

getTarget:function(index){
  var targets = this.data.progressScoreData.targets;
  for(var i=0;i<targets.length;i++){
    if(targets[i].index==index){
      return targets[i];
    }
  }
  return null;
},

toBean:function(index){
  var outThis = this;
  var targets = this.data.progressScoreData.targets;
  var target;
  for(var i=0;i<targets.length;i++){
    if(targets[i].index==index){
      
      target = targets[i];
      var animation = wx.createAnimation();
      var top = 20;
      var left = 35;

      animation.rotate(20).step().translate(100, 100).step();
      var key = "progressScoreData.targets[" + i + "].animation";

      outThis.setData({
        [key]: animation.export()
      });
    }
  }
  
},

setIncrease: function (increase){
  this.setData({
    "progressScoreData.isIncrease": increase
  });
},

supplyLoveClick:function(callback){
  var outThis = this;
  var battleId = this.data.battleId;
  var roomId = this.data.roomId;
  this.showLoading();
  supperLoveRequest.syncPapersData(battleId,roomId,{
    loveIsFull:function(){
      outThis.hideLoading();
      outThis.showToast("爱心已满，无需补充");
    },
    superloveNotEnough:function(){
      outThis.hideLoading();
      outThis.showConfirm("爱心库存不足，请充值", "是否充值", {
        confirm: function () {
          wx.navigateTo({
            url: '../mall/mall?type=3'
          });
        },
        cancel: function () {

        }
      }, "充值", "取消");
    },
    success:function(memberInfo){
      outThis.hideLoading();
      outThis.setLove(memberInfo.loveCount, memberInfo.loveResidule);
      outThis.initAccountInfo();

      var members = outThis.getMembers();
      for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (member.id == memberInfo.id) {
          member.loveResidule = memberInfo.loveResidule;
        }
      }
     
      outThis.setMembers(members);
      if(callback&&callback.success){
        callback.success();
      }
    },
    fail:function(){
      outThis.hideLoading();
      if (callback && callback.fail) {
        callback.fail();
      }
    }
  });
},

speedCoolClick:function(){
  var outThis = this;
  this.showLoading();
  var battleMemberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
  var speedCoolBean = this.data.progressScoreData.loveCooling.speedCoolBean;
  var beanCount = this.getBeanCount();
  if (beanCount < speedCoolBean){
    this.showConfirm("智慧豆不足，请充值", "是否充值", {
      confirm:function(){
        wx.navigateTo({
          url: '../mall/mall?type=1'
        });
      },
      cancel:function(){

      }
    }, "充值", "取消");
    return;
  }
  currentLoveCoolingRequest.speedCoolRequest(battleMemberInfo.battleId, battleMemberInfo.roomId,{
    success:function(data){
      outThis.showLoveCooling(data);
      var speedCoolBean = data.speedCoolBean;
      outThis.subBean(speedCoolBean);
      outThis.setLove(data.loveCount,data.loveResidule);

      outThis.hideLoading();
    },
    fail:function(){
      console.log(".................fail");
      outThis.hideLoading();
    }
  });
},

getLoveCoolHour:function(){
  var loveCoolHour = this.data.progressScoreData.loveCooling.hour;
  return loveCoolHour;
},

getLoveCoolMin:function(){
  var loveCoolMin = this.data.progressScoreData.loveCooling.min;
  return loveCoolMin;
},

getLoveCoolSecond: function () {
    var loveCoolSecond = this.data.progressScoreData.loveCooling.second;
    return loveCoolSecond;
},

setDistance:function(distance){
  this.setData({
    "progressScoreData.distance": distance
  });
},

getProcess:function(){
  var process = this.data.progressScoreData.progress;

  return process;
},

setProgress:function(progress){
  this.setData({
    "progressScoreData.progress": progress
  });
},

setScore:function(score){
  this.setData({
    "progressScoreData.score": score
  });
},

getScore:function(){
  var score = this.data.progressScoreData.score;
  return score;
},

setScrollGogal: function (score) {
  this.setData({
    "progressScoreData.scrollGogal": score
  });
},

getScrollGogal:function(){
  var scrollGogal = this.data.progressScoreData.scrollGogal;
  return scrollGogal;
},

addProcess:function(process){
  var oldProcess = this.data.progressScoreData.progress;
  var newProcess = oldProcess + process;
  this.setProcess(newProcess);
},

setLove: function(limit, residule) {

  var loveList = new Array();
  if(!residule||residule<0){
    residule = 0;
  }
  for (var i = 0; i < residule; i++) {
    loveList.push({
      type: 1
    });
  }

  for (var i = 0; i < limit - residule; i++) {
    loveList.push({
      type: 0
    });
  }

  this.setData({
    "progressScoreData.loveList": loveList
  })

},


getLoveLimit:function(){
  var loveList = this.data.progressScoreData.loveList;
  if(!loveList){
    return 0;
  }else{
    return loveList.length;
  }
},

getLoveCount:function(){
  var loveCount = 0;
  var loveList = this.data.progressScoreData.loveList;
  for(var i=0;i<loveList.length;i++){
    var love = loveList[i];
    if(love.type==1){
      loveCount++;
    }
  }
  return loveCount;
},

getPosition:function(id){
  var positions = this.data.progressScoreData.positions;
  for(var i=0;i<positions.length;i++){
    var position = positions[i];
    if(position.id==id){
      return position;
    }
  }
  return null;
},

getPostions:function(){
  var positions = this.data.progressScoreData.positions;
  return positions;
},

containerScrollToDom: function(index) {
  var outThis = this;
  this.domRes(index, {
    success: function (res) {
      if(!res){
        return;
      }
      var top = res.top;
      outThis.containerRes({
        success: function (res) {
          if(!res){
            return;
          }
          var scrollTop = res.scrollTop;
          wx.getSystemInfo({
            success: function (res) {
              var winHeight = res.windowHeight;
              outThis.setData({
                "progressScoreData.containerScrollTop": top + scrollTop - winHeight / 2
              });
            },
          });

        }
      });

    }
  });
},


/*
initDomRes:function(){
  var outThis = this;

  outThis.containerRes({
    success: function (res) {
      if (!res) {
        return;
      }
      var scrollTop = res.scrollTop;
      var scrollLeft = res.scrollLeft;
      var targets = outThis.data.progressScoreData.targets;
      for (var i = 0; i < targets.length; i++) {
        outThis.domRes(i, {
          success: function (res) {
            var target;
          
            console.log("top:"+res.top+",left:"+res.left);
            target = targets[i];
            var animation = wx.createAnimation();
            var top = res.top + scrollTop - 10;
            var left = res.left + scrollLeft;
            var animation = wx.createAnimation();
            animation.translate(100, 100).step();
            var topKey = "progressScoreData.targets[" + i + "].fixedTop";
            var leftKey = "progressScoreData.targets[" + i + "].fixedLeft";
            outThis.setData({
              topKey:200,
              leftKey:200
            });
            
          }
        })
      }
    }
  })
},*/

//容器的位置状态
containerRes: function(callback) {
  var outThis = this;
  wx.createSelectorQuery().select('#progressScoreContainer').fields({
    dataset: true,
    size: true,
    scrollOffset: true,
    rect: true,
    id: true,
    properties: ['scrollX', 'scrollY']
  }, function (res) {
    callback.success(res);
  }).exec();
},

//节点位置
domRes: function(index, callback) {
  var id = "#toDom"+index;
  this.doDomRes(id,callback);
},

doDomRes:function(id,callback){
  console.log("......doDomRes:id:"+id);
  wx.createSelectorQuery().select(id).fields({
    dataset: true,
    size: true,
    scrollOffset: true,
    rect: true,
    id: true,
    properties: ['scrollX', 'scrollY']
  }, function (res) {
    callback.success(res);
  }).exec();
},


location:function(id,index){
  var positions = this.data.progressScoreData.positions;
  var position;
  var positionIndex = 0;
  for (var i = 0; i < positions.length; i++) {
    var p = positions[i];
    if (p.id == id) {
      position = p;
      positionIndex = i;
    }
  }

  var outThis = this;
  outThis.containerRes({
    success: function (res) {
      /*if(!res){
        return;
      }*/
      console.log("containerRes:"+res);
      var scrollTop = res.scrollTop;
      var scrollLeft = res.scrollLeft;
      outThis.domRes(index, {
        success: function (res) {
          /*if(!res){
            return;
          }*/
          console.log("domRes:" + res);
          var top = res.top + scrollTop - 10;
          var left = res.left + scrollLeft;
          var leftKey = "progressScoreData.positions[" + positionIndex+"].left";
          var topKey = "progressScoreData.positions[" + positionIndex + "].top";
          outThis.setData({
            [leftKey]:left,
            [topKey]:top
          });
        }
      })
    }
  })
},

//运行到某个节点
toPosition: function(id,index, callback){
  var outThis = this;
  var positions = this.data.progressScoreData.positions;
  var position;
  var positionIndex = 0;
  for(var i=0;i<positions.length;i++){
    var p = positions[i];
    if(p.id==id){
      position = p;
      positionIndex = i;
    }
  }

  if(!position){
    return;
  }

  position.begin = index;

  var duration = 500;
  var outThis = this;
  outThis.containerRes({
    success: function (res) {
      if(!res){
        return;
      }
      var scrollTop = res.scrollTop;
      var scrollLeft = res.scrollLeft;
      outThis.domRes(index, {
        success: function (res) {
          if(!res){
            return;
          }
          var animation = wx.createAnimation({
            duration: duration,
            timingFunction: 'linear'
          });
          setTimeout(function () {
            if (callback && callback.success) {
              callback.success(index);
            }
          }, duration-10);
          var top = res.top + scrollTop - 10;
          var left = res.left + scrollLeft;
          animation.top(top).left(left).step();
          var animationKey = "progressScoreData.positions[" + positionIndex + "].animationData";
          var beginKey = "progressScoreData.positions[" + positionIndex + "].begin";
          outThis.setData({
            [animationKey]: animation.export(),
            [beginKey]: index
          });
        }
      })
    }
  })
},

showLoveCooling:function(loveCooling){

  if (interval){
    clearInterval(interval);
  }
  var outThis = this;
  //每次执行的最小单位
  var unit = loveCooling.unit;

  //上限是多少
  var upperLimit = loveCooling.upperLimit;

  //执行周期 1000表示1秒钟执行一次
  var millisec = loveCooling.millisec;

  //已经积累的数量
  var schedule = loveCooling.schedule;

  var coolLoveSeq = loveCooling.coolLoveSeq;

  var status = loveCooling.status;
  var battleMemberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
  this.setData({
    "progressScoreData.loveCooling.upperLimit":upperLimit,
    "progressScoreData.loveCooling.status": status,
    "progressScoreData.loveCooling.speedCoolBean": battleMemberInfo.speedCoolBean,
    "progressScoreData.loveCooling.speedCoolSecond": battleMemberInfo.speedCoolSecond,
  });

  interval = setInterval(function () {
    var loveCount = outThis.getLoveCount();
    var loveLimit = outThis.getLoveLimit();
    if (loveLimit > loveCount) {
      schedule = schedule + unit;
      if (schedule >= upperLimit) {
        schedule = 0;
        loveCount++;
        outThis.setLove(loveLimit, loveCount);
        coolLoveSeq++;
      }
      var second = (upperLimit - schedule) / millisec*1000;
      var hour = parseInt(second/3600);
      var min = parseInt((second - hour*3600)/60);
      second = parseInt(second-hour*3600-min*60);
      outThis.setData({
        "progressScoreData.loveCooling.schedule": schedule,
        "progressScoreData.loveCooling.coolLoveSeq": loveCount+1,
        "progressScoreData.loveCooling.status": 1,
        "progressScoreData.loveCooling.hour": hour,
        "progressScoreData.loveCooling.min": min,
        "progressScoreData.loveCooling.second": second
      });
      
    }else{
      outThis.setData({
        "progressScoreData.loveCooling.status": 2
      });
    }
  }, millisec);

  
},

setPositions:function(positions){
  this.setData({
    "progressScoreData.positions":positions
  });

  for(var i=0;i<positions.length;i++){
    var position = positions[i];
    this.location(position.id,position.begin);
  }
},

getPositions:function(){
  return this.data.progressScoreData.positions;
},

startTravel:function(id){
  var positions = this.data.progressScoreData.positions;
  var position;
  for(var i=0;i<positions.length;i++){
     if(positions[i].id==id){
       position = positions[i];
     }
  }
  this.trendBetween(id,position.begin,position.end);
},

trendBetween: function(id,begin, end,callback,flag) {
  var outThis = this;
  if (begin <= end) {
    this.toPosition(id,begin, {
      success: function (index) {
        var index = index + 1;
        
        if(flag){
          outThis.containerScrollToDom(index);
          setTimeout(function(){
            outThis.trendBetween(id, index, end, callback);
          },1000);
        }else{
          outThis.trendBetween(id, index, end, callback);
        }
        if(begin>=end){
          callback.success();
        }else{
          console.log(callback.step);
          if(callback.step){
            callback.step(index);
          }
        }
      }
    });
  }
}


}

module.exports = {
  progressScorePlug: progressScorePlug
}