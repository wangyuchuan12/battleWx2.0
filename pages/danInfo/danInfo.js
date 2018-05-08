var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleRoomsRequest = require("../../utils/battleRoomsRequest.js");
var accountRequest = require("../../utils/accountRequest.js");
var randomRoomRequest = require("../../utils/randomRoomRequest.js");
var battlesRequest = require("../../utils/battlesRequest.js");

var battleTakepartCache = require("../../utils/cache/battleTakepartCache.js");

var request = require("../../utils/request.js");

var battleDanRequest = require("../../utils/battleDanRequest.js");

var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    danId:0,
    danName:"",
    imgUrl:"",
    projects:[{
      isOpen:1
    }],
    tasks:[/*{
      name:"完成挑战",
      instruction:"提示",
      rewardBean:10,
      rewardExp:100,
      buttonName:"去完成"
    },
    {
      name: "完成挑战",
      instruction: "提示",
      rewardBean: 10,
      rewardExp: 100,
      buttonName: "去完成"
    }*/]
  },



  battleItemClick: function (e) {
    var id = e.currentTarget.id;
    var projects = this.data.projects;
    for (var i = 0; i < projects.length; i++) {
      var project = projects[i];

      if (project.isOpen == 0) {
        if (project.id == id) {
          project.isOpen = 1;
        } else {
          project.isOpen = 0;
        }
      } else {
        if (project.id == id) {
          project.isOpen = 0;
        } else {
          project.isOpen = 0;
        }
      }

    }

    this.setData({
      projects: projects
    });
  },

  receiveTaskRewardClick:function(taskId){
    battleDanRequest.receiveTaskReward(taskId,{
      success:function(){
        console.log("success");
      },
      fail:function(){

      }
    });

  },

  taskItemClick:function(e){
    var id = e.currentTarget.id;
    var tasks = this.data.tasks;
    var task;
    for(var i=0;i<tasks.length;i++){
      if(tasks[i].id==id){
        task = tasks[i];
        break;
      }
    }
    if(task){
      if(task.type==0){
        if(task.status!=2){
          this.startPassThrough(task.projectId, task.danId);
        }else{
          this.receiveTaskRewardClick(task.id);
        }
        
      }
    }
  },

  passThroughTakepartRoom: function (battleId, roomId, passThroughId){

    battleDanRequest.passThroughTakepartRoomRequest(passThroughId, roomId, battleId, {
      success:function(memberInfo){

        var members = new Array();
        members.push(memberInfo);
        battleTakepartCache.members = members;
        wx.redirectTo({
          url: '../progressScore/progressScore?battleId=' + battleId + "&roomId=" + roomId
        });
      },
      fail:function(){
        console.log("fail");
      },
      battleIn:function(){
        console.log("battleIn");
      },
      roomFull:function(){
        console.log("roomFull");
      },
      roomEnd:function(){
        console.log("roomEnd");
      },
      beanNotEnough:function(){
        console.log("beanNotEnough");
      },
      masonryNotEnough:function(){
        console.log("masonryNotEnough");
      },
    });
  },

  initAccountResult:function(){
    accountRequest.accountResultInfo({
      success:function(accountResult){
        console.log("accountResult:"+JSON.stringify(accountResult));
      },
      fail:function(){

      }
    });
  },

  startPassThrough: function (projectId,danId) {
    var outThis = this;
    battleDanRequest.startPassThroughRequest(projectId,danId,{
      success:function(data){
        var battleId = data.battleId;
        var roomId = data.roomId;
        var passThroughId = data.id;
        outThis.passThroughTakepartRoom(battleId, roomId, passThroughId);
      },
      fail:function(){

      }
    });
  },

  initDanTasks:function(callback){
    var outThis = this;
    var danId = this.data.danId;
    battleDanRequest.tasksRequest(danId,{
      success:function(tasks){
        var taskData = new Array();
        for(var i=0;i<tasks.length;i++){
          taskData.push({
            name: tasks[i].name,
            status: tasks[i].status,
            instruction: tasks[i].instruction,
            rewardBean: tasks[i].rewardBean,
            rewardExp: tasks[i].rewardExp,
            buttonName: tasks[i].buttonName,
            type:tasks[i].type,
            id:tasks[i].id,
            battleId: tasks[i].battleId,
            periodId:tasks[i].periodid,
            projectId:tasks[i].projectId,
            danId:tasks[i].danId
          })
        }
        outThis.setData({
          tasks: taskData
        });
      },
      fail:function(){

      }
    });
  },

  initBattles: function (battleId, flag) {
    this.showLoading();
    var outThis = this;
    battlesRequest.requestBattles({
      success: function (battles) {
        outThis.hideLoading();
        var items = new Array();
        for (var i = 0; i < battles.length; i++) {
          var battle = battles[i];
          items.push({
            content: battle.name,
            id: battle.id,
            status: 0,
            headImg: battle.headImg,
            isOpen: 0
          });
        }
        if (!battleId && items.length > 0 && flag) {
          outThis.setData({
            "battleId": items[0].id,
            "battles": items,
            selectStatus: 0
          });
        } else if (battleId && items.length > 0) {
          outThis.setData({
            "battleId": battleId,
            "battles": items,
            selectStatus: 0
          });
        } else {
          outThis.setData({
            "battles": items,
            selectStatus: 1
          });
        }
      },
      fail: function () {
        outThis.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var danId = options.danId;
    this.setData({
      danId:danId
    });
  //  this.initBattles();
    this.initAccountResult();
  },

  initDanInfo:function(){
    var outThis = this;
    var danId = this.data.danId;
    battleDanRequest.infoRequest(danId,{
      success:function(danInfo){
        var projects = danInfo.projects;
        var projectData = new Array();
        for(var i=0;i<projects.length;i++){
          projectData.push({
            id:projects[i].id,
            battleName: projects[i].battleName,
            battleImg: projects[i].battleImg,
            isOpen:0
          });
        }
        outThis.setData({
          projects: projectData
        });
        var danName = danInfo.battleDanUser.danName;
        var imgUrl = danInfo.battleDanUser.imgUrl;
        outThis.setData({
          danName:danName,
          danImg:imgUrl
        });
      },
      fail:function(){

      }
    })
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
    this.initDanInfo();
    this.initDanTasks();
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