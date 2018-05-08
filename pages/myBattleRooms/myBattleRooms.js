var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var battleRoomsRequest = require("../../utils/battleRoomsRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    rooms: [/*{
      imgUrl:"http://7xlw44.com1.z0.glb.clouddn.com/0042aeda-d8a5-4222-b79d-1416ab222898",
      name:"火影忍者",
      instruction:"这是一个忍者的故事",
      num:3,
      maxNum:4,
      id:0,
      battleId:0
    }, {
      imgUrl: "http://7xlw44.com1.z0.glb.clouddn.com/0042aeda-d8a5-4222-b79d-1416ab222898",
      name: "火影忍者",
      instruction: "这是一个忍者的故事",
      num: 3,
      maxNum: 4,
      id:0,
      battleId:0
    }*/]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var outThis = this;
    battleRoomsRequest.myRoomsRequest({
      success:function(rs){
        console.log(JSON.stringify(rs));
        var rooms = new Array();
        for (var i = 0; i < rs.length; i++) {
          var r = rs[i];
          rooms.push({
            name: r.name,
            instruction: r.instruction,
            num: r.num,
            maxNum: r.maxinum,
            id: r.id,
            imgUrl: r.imgUrl,
            battleId: r.battleId,
            smallImgUrl: r.smallImgUrl,
            isRedpack: r.isRedpack,
            redpackAmount: r.redpackAmount,
            redpackMasonry: r.redpackMasonry,
            redpackBean: r.redpackBean,
            redPackNum: r.redPackNum
          });
        }
        outThis.setData({
          rooms: rooms
        });

      },
      fail:function(){

      }
    });
  },

  itemClick:function(e){
    var id = e.currentTarget.id;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    var rooms = this.data.rooms;
    for(var i=0;i<rooms.length;i++){
      var room = rooms[i];
      if(room.id==id){
        wx.navigateBack({
          
        });
        setTimeout(function(){
          prevPage.skipToRoom(id, room.battleId);
        },1000);
        
        return;
      }
    }
    
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