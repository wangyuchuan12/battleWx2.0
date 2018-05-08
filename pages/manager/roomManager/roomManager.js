var baseLayerout = require("../../assembly/baseLayerout/baseLayerout.js");
var battleManagerRequest = require("../../../utils/battleManagerRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    rooms:[/*{
      id:0,
      imgUrl:"http://7xlw44.com1.z0.glb.clouddn.com/fa16b518-4e1d-4e46-8f5c-4c35f51923ee",
      name:"趣味",
      smallImgUrl:""
    }*/]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initRooms();
  },

  roomItemClick:function(e){
    var id = e.currentTarget.id;
    var rooms = this.data.rooms;
    for(var i=0;i<rooms.length;i++){
      var room = rooms[i];
      if(room.id==id){
        wx.navigateTo({
          url: '../roomEdit/roomEdit?id=' + id+"&battleId="+room.battleId
        })
        return;
      }
    }
   
  },

  initRooms:function(){
    var outThis = this;
    battleManagerRequest.requestRooms({
      success:function(rooms){
        var roomArray = new Array();
        for(var i=0;i<rooms.length;i++){
          roomArray.push({
            id:rooms[i].id,
            imgUrl:rooms[i].imgUrl,
            name:rooms[i].name,
            smallImgUrl: rooms[i].smallImgUrl,
            battleId:rooms[i].battleId
          });
        }
        outThis.setData({
          rooms: roomArray
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