var resourceRequest = require("../../../utils/resourceRequest.js");
var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var battleManagerRequest = require("../../../utils/battleManagerRequest.js");
var battleMemberInfoRequest = require("../../../utils/battleMemberInfoRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    editModel:0,
    id:0,
    battleId:"",
    imgUrl:"",
    name:"",
    instruction:"",
    editFormLabel:"",
    editType:-1,
    editFormValue:0,
    isSearchInit:0,
    isDisplayInit:0,
    maxinum:0,
    num:0,
    redPackNum:0,
    isManager:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var battleId = options.battleId;
    this.setData({
      id:id,
      battleId:battleId
    });
    this.initData();
  },


  editFormValueChange: function (e) {
    this.setData({
      "editFormValue": e.detail.value
    })
  },
  initData:function(){
    var outThis = this;
    var id = this.data.id;
    battleManagerRequest.requestRoomInfo(id,{
      success:function(roomInfo){
        var redPackNum = roomInfo.redPackNum;
        if (!redPackNum){
          redPackNum = 0;
        }
        outThis.setData({
          imgUrl:roomInfo.imgUrl,
          name:roomInfo.name,
          instruction: roomInfo.instruction,
          isSearchInit: roomInfo.isSearchAble,
          isDisplayInit: roomInfo.isDisplay,
          maxinum: roomInfo.maxinum,
          num: roomInfo.num,
          redPackNum: redPackNum
        });
      },
      fail:function(){
        console.log("fail");
      }
    });
  },

  nameClick:function(){
    var name = this.data.name;
    this.setData({
      editModel:1,
      editFormLabel:"房间名称",
      editType:0,
      editFormValue:name
    });
  },

  instructionClick:function(){
    var instruction = this.data.instruction;
    this.setData({
      editModel: 1,
      editFormLabel: "房间简介",
      editType: 1,
      editFormValue: instruction
    });
  },

  editSubmitClick:function(){
    var outThis = this;
    var editType = this.data.editType;
    var id = this.data.id;
    var editFormValue = this.data.editFormValue;
    if(editType==0){
      battleManagerRequest.requestEditRoomName(id, editFormValue,{
        success: function () {
          outThis.setData({
            editModel: 0,
            name: editFormValue
          });
        },
        fail: function () {
          console.log("fail");
        }
      });
    }else if(editType==1){
      battleManagerRequest.requestEditRoomInstruction(id, editFormValue, {
        success: function () {
          outThis.setData({
            editModel: 0,
            instruction: editFormValue
          });
        },
        fail: function () {
          console.log("fail");
        }
      });
    }
  },

  searchSwitch:function(e){
    var value = e.detail.value;
    if(value==true){
      value = 1;
    }else{
      value = 0;
    }
    var id = this.data.id;
    battleManagerRequest.requestEditRoomSearchAble(id, value, {
      success: function () {
        console.log("success");
      },
      fail: function () {
        console.log("fail");
      }
    });
  },

  displaySwitch:function(e){
    var value = e.detail.value;
    if(value==true){
      value = 1;
    }else{
      value = 0;
    }
    var id = this.data.id;
    battleManagerRequest.requestEditRoomIsDisplay(id, value, {
      success: function () {
        console.log("success");
      },
      fail: function () {
        console.log("fail");
      }
    });
  },

  skipToRoom:function(){
    var id = this.data.id;
    var battleId = this.data.battleId;
    wx.redirectTo({
      url: '../../battleTakepart/battleTakepart?roomId='+id+"&battleId="+battleId
    })
  },

  imgClick: function () {
    var outThis = this;
    var id = this.data.id;
    resourceRequest.openLoadFile({
      success: function (path) {

        battleManagerRequest.requestEditRoomImgUrl(id, path, {
          success: function () {
            outThis.setData({
              imgUrl: path
            });
          },
          fail: function () {
            console.log("fail");
          }
        });
        
      },
      fail: function () {
        console.log("fail");
      }
    });
  },

  redPackListClick:function(){
    var id = this.data.id;
    var battleId = this.data.battleId;
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
    if(memberInfo.openId=="o6hwf0S9JT_Ff0LVBORFsBrhAtpM"){
      wx.navigateTo({
        url: '../roomRedpacks/roomRedpacks?roomId=' + id + "&battleId=" + battleId
      });
    }
  },

  membersClick:function(){
    var id = this.data.id;
    var battleId = this.data.battleId;
    wx.navigateTo({
      url: '../../battleRank/battleRank?roomId='+id+"&battleId="+battleId
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();
    this.setData({
      isManager:memberInfo.isManager
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

layerout.begin();