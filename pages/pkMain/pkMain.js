var battlePkRequest = require("../../utils/battlePkRequest.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var takepartRequest = require("../../utils/takepartRequest.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    createAlert: 0,
    battlePk:null,
    battleRoomPk:null,
    roomTemplates:[{
      min:4,
      max:4,
      id:0
    },{
      min:8,
      max:8,
      id:1
    },{
      min:16,
      max:16,
      id:2
    },{
      min:20,
      max:20,
      id:3
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  initMain:function(){
    var outThis = this;
    battlePkRequest.pkMainRequest({
      success:function(data){
        outThis.loadPreProgress();
        var battlePk = data.battlePk;
        var battleRoomPk = data.battleRoomPk;
        outThis.setData({
          battlePk: battlePk,
          battleRoomPk: battleRoomPk
        });
      },
      fail:function(){

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
    this.setData({
      createAlert:0
    });
    this.initMain();
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


  pkRoomNumClick:function(e){
    var outThis = this;
    var id = e.currentTarget.id;
    var roomTemplates = this.data.roomTemplates;
    outThis.showLoading();
    for (var i = 0; i < roomTemplates.length;i++){
      var roomTemplate = roomTemplates[i];
      if (roomTemplate.id==id){
        battlePkRequest.battleRoomPkIntoRequest(roomTemplate.min, roomTemplate.max,{
          success: function (room) {
            outThis.hideLoading();
            takepartRequest.battleTakepart(room.battleId, room.id, {
              success: function (member) {
                outThis.hideLoading();
                wx.navigateTo({
                  url: '../battleTakepart/battleTakepart?roomId=' + room.id + "&battleId=" + room.battleId
                });
              },
              beanNotEnough: function () {

              },
              masonryNotEnough: function () {

              },
              fail: function (errorMsg) {
                outThis.hideLoading();
                if (!errorMsg) {
                  outThis.showToast("网络繁忙");
                } else {
                  outThis.showToast(errorMsg);
                }
              },
              battleIn: function () {
                wx.navigateTo({
                  url: '../danInfo/daninfo3?danId=' + alertDan.id
                });
              },
              battleEnd: function () {

              },
              roomEnd: function () {

              },
              roomFull: function () {

              }
            });
          },
          fail: function () {

          }
        });
        return;
      }
    }
  },

  pkClick: function () {
    /*this.setData({
      shareCreate: 1,
      shareAlert: 1
    });*/
    wx.navigateTo({
      url: '../pkRoom/pkRoom'
    });
  },

  pkRoomClick:function(){

    var battleRoomPk = this.data.battleRoomPk;
    if (battleRoomPk && battleRoomPk.roomId) {
      this.showConfirm("你已经创建了一个房间", "是否跳转到该房间", {
        confirm: function () {
          wx.navigateTo({
            url: '../battleTakepart/battleTakepart?battleId=' + battleRoomPk.battleId + "&roomId=" + battleRoomPk.roomId
          });
        },
        cancel: function () {

        }
      });

      return;
    }

    this.setData({
      createAlert: 1
    });
    /*battlePkRequest.battleRoomPkIntoRequest({
        success:function(room){
          wx.navigateTo({
            url: '../battleTakepart/battleTakepart?roomId=' + room.id + "&battleId=" + room.battleId
          });
        },
        fail:function(){

        }
    });*/
  },

  closeShareAlertPlug: function () {
    this.setData({
      createAlert:0
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
});

layerout.begin();