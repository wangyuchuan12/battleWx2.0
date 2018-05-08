var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var redPackRequest = require("../../../utils/redPackRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    typeId:"",
    roomId:"",
    battleId:"",
    takepartType:0,
    isTakepartBean:0,
    isTakepartMasonry:0,
    takepartBean:0,
    takepartMasonry:0,
    isRoom: 1,
    stage:{
      index:0,
      data: ['无关卡要求', '1关', '2关', '3关', '4关', '5关', '6关', '7关', '8关', '9关', '10关', '11关', '12关', '13关', '14关', '15关', '16关', '17关', '18关', '19关', '20关', '21关', '22关', '23关', '24关', '25关', '26关', '27关', '28关', '29关', '30关']
    },
    redPacks:[{

    }],
    roomMeet:{
      isRoomMeet:0,
      roomMeetNum:0
    },
    roomProcessMeet:{
      isRoomProcessMeet:0,
      roomProcessMeet:0
    },
    roomScoreMeet:{
      isRoomScoreMeet:0,
      roomScoreMeet:0
    },
    personalProcessMeet:{
      isPersonalProcessMeet:0,
      personalProcessMeet:0
    },
    personalScoreMeet:{
      isPersonalScoreMeet:0,
      personalScoreMeet:0
    }
  },

  bindPickerChange:function(e){
    var index = e.detail.value;
    this.setData({
      "stage.index":index
    });
  },

  takepartMasonryChange:function(e){
    var isTakepartMasonry = e.detail.value;
    if (isTakepartMasonry){
      isTakepartMasonry = 1;
    }else{
      isTakepartMasonry = 0;
    }
    this.setData({
      "isTakepartMasonry": isTakepartMasonry
    });
  },

  takepartMasonryInputChange:function(e){
    this.setData({
      takepartMasonry:e.detail.value
    });
  },

  takepartBeanChange:function(e){
    var isTakepartBean = e.detail.value;
    if (isTakepartBean){
      isTakepartBean = 1;
    }else{
      isTakepartBean = 0;
    }
    this.setData({
      isTakepartBean: isTakepartBean
    })
  },
  takepartBeanInputChange(e){
    this.setData({
      takepartBean:e.detail.value
    })
  },

  personalProcessMeetChange:function(e){
    var isPersonalProcessMeet = e.detail.value;
    if (isPersonalProcessMeet){
      isPersonalProcessMeet = 1;
    }else{
      isPersonalProcessMeet = 0;
    }
    this.setData({
      "personalProcessMeet.isPersonalProcessMeet": isPersonalProcessMeet
    });
  },

  personalProcessMeetInputChange: function (e) {
    this.setData({
      "personalProcessMeet.personalProcessMeet": e.detail.value
    });
  },

  personalScoreMeetChange:function(e){
    var isPersonalScoreMeet = e.detail.value;
    if (isPersonalScoreMeet){
      isPersonalScoreMeet = 1;
    }else{
      isPersonalScoreMeet = 0;
    }
    this.setData({
      "personalScoreMeet.isPersonalScoreMeet": isPersonalScoreMeet
    });
  },

  personalScoreMeetInputChange(e){
    this.setData({
      "personalScoreMeet.personalScoreMeet": e.detail.value
    });
  },

  roomScoreMeetChange:function(e){
    var isRoomScoreMeet = e.detail.value;
    if (isRoomScoreMeet){
      isRoomScoreMeet = 1;
    }else{
      isRoomScoreMeet = 0;
    }
    this.setData({
      "roomScoreMeet.isRoomScoreMeet": isRoomScoreMeet
    })
  },

  roomScoreMeetInputChange:function(e){
    this.setData({
      "roomScoreMeet.roomScoreMeet": e.detail.value
    });
  },

  roomMeetNumInputChange: function (e) {
    this.setData({
      "roomMeet.roomMeetNum": e.detail.value
    })
  },

  roomProcessMeetInputChange:function(e){
    this.setData({
      "roomProcessMeet.roomProcessMeet": e.detail.value
    })
  },

  roomMeetChange:function(e){
    var isRoomMeet = e.detail.value;
    if(isRoomMeet){
      isRoomMeet =1;
    }else{
      isRoomMeet = 0;
    }
    this.setData({
      "roomMeet.isRoomMeet":isRoomMeet
    });
  },

  roomProcessMeetChange: function (e) {
    var isRoomProcessMeet = e.detail.value;
    if (isRoomProcessMeet) {
      isRoomProcessMeet = 1;
    } else {
      isRoomProcessMeet = 0;
    }
    console.log("isRoomProcessMeet:" + isRoomProcessMeet);
    this.setData({
      "roomProcessMeet.isRoomProcessMeet": isRoomProcessMeet
    });
  },

  redPackClick:function(e){
    var id = e.currentTarget.id;
    var redPacks = this.data.redPacks;
    for(var i=0;i<redPacks.length;i++){
      var redPack = redPacks[i];
      if(redPack.id==id){
        redPack.status=1;
      }else{
        redPack.status = 0;
      }
    }
    this.setData({
      redPacks:redPacks,
      typeId:id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var roomId = options.roomId;
    var battleId = options.battleId;
    this.setData({
      roomId:roomId,
      battleId: battleId
    });
    var outThis = this;
    redPackRequest.typesRequest({
      success:function(types){
        var redPacks = new Array();
        for(var i=0;i<types.length;i++){
          redPacks.push({
            "id":types[i].id,
            "name": types[i].name,
            "costBean": types[i].costBean,
            "costMasonry": types[i].costMasonry,
            "costAmount": types[i].costAmount,
            "beanNum": types[i].beanNum,
            "masonryNum": types[i].masonryNum,
            "amount": types[i].amount,
            "status":0,
            "num":types[i].num
          });
        }
        outThis.setData({
          redPacks: redPacks
        });
      },
      fail:function(){

      }
    }); 
  },

  submit:function(){
    
    var outThis = this;
    this.showLoading();
    var roomId = this.data.roomId;
    var takepartBean = this.data.takepartBean;
    var takepartMasonry = this.data.takepartMasonry;
    var takepartType = this.data.takepartType;
    var isRoom = this.data.isRoom;
    var isRoomMeet = this.data.roomMeet.isRoomMeet;
    var roomMeetNum = this.data.roomMeet.roomMeetNum;
    var typeId = this.data.typeId;

    var isTakepartMasonry = this.data.isTakepartMasonry;
    var takepartMasonry = this.data.takepartMasonry;

    var isPersonalProcessMeet = this.data.personalProcessMeet.isPersonalProcessMeet;
    var isPersonalScoreMeet = this.data.personalScoreMeet.isPersonalScoreMeet;
    var isRoomProcessMeet = this.data.roomProcessMeet.isRoomProcessMeet;
    var isRoomScoreMeet = this.data.roomScoreMeet.isRoomScoreMeet;
    var personalProcessMeet = this.data.personalProcessMeet.personalProcessMeet;
    var personalScoreMeet = this.data.personalScoreMeet.personalScoreMeet;
    var roomProcessMeet = this.data.roomProcessMeet.roomProcessMeet;
    var roomScoreMeet = this.data.roomScoreMeet.roomScoreMeet;

    var isTakepartBean = this.data.isTakepartBean;
    var takepartBean = this.data.takepartBean;

    var battleId = this.data.battleId;

    var index = this.data.stage.index;

    if(!roomId){
      this.showToast("房间Id不能为空");
      return;
    }
    if (!typeId){
      this.showToast("请选择发送的红包大小");
      return;
    }
    if(isRoomMeet){
      if (!roomMeetNum){
        this.showToast("请输入房间需要满足人数");
        return;
      }
    }

    if (isRoomProcessMeet){
      if (!roomProcessMeet){
        this.showToast("请输入房间需要进程数值");
        return;
      }
    }

    if (isRoomScoreMeet){
      if (!roomScoreMeet) {
        this.showToast("请输入房间需要分数数值");
        return;
      }
    }

    if (isPersonalScoreMeet){
      if (!personalScoreMeet){
        this.showToast("请输入个人需要分数数值");
        return;
      }
    }

    if (isPersonalProcessMeet){
      if (!personalProcessMeet){
        this.showToast("请输入个人需要进程数值");
        return;
      }
    }

    if (isTakepartBean){
      if (!takepartBean){
        this.showToast("请输入参加支付智慧豆数量");
        return;
      }
    }

    if (isTakepartMasonry){
      if (!takepartMasonry){
        this.showToast("请输入参加支付砖石数量");
        return;
      }
    }

    var params = new Object();
    params.takepartBean = takepartBean;
    params.takepartMasonry = takepartMasonry;
    params.takepartType = takepartType;
    params.isRoom = 1;
    params.isRoomMeet = isRoomMeet;
    params.roomId = roomId;
    params.typeId = typeId;
    params.isPersonalProcessMeet = isPersonalProcessMeet;
    params.isPersonalScoreMeet = isPersonalScoreMeet;
    params.isRoomProcessMeet = isRoomProcessMeet;
    params.isRoomScoreMeet = isRoomScoreMeet;
    params.personalProcessMeet = personalProcessMeet;
    params.personalScoreMeet = personalScoreMeet;
    params.roomProcessMeet = roomProcessMeet;
    params.roomScoreMeet = roomScoreMeet;
    params.roomMeetNum = roomMeetNum;
    params.battleId = battleId;
    params.stageIndex = index;

    redPackRequest.addRequest(params,{
      success:function(){
        outThis.hideLoading();
        wx.navigateBack({
          
        });
      },
      fail:function(){
        console.log("fail");
      }
    });


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