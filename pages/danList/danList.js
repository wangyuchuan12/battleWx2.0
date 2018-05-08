
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");


var battleDanRequest = require("../../utils/battleDanRequest.js");

var accountRequest = require("../../utils/accountRequest.js");

var takepartRequest = require("../../utils/takepartRequest.js");

var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    headimgurl:"",
    nickname:"",
    level:1,
    exp:0,
    currentDanId:"",
    scrollTop:0,
    dans:[/*{
      id:0,
      status:0,
      danName:"原始人",
      danId:"",
      imgUrl:""
    }*/],
    thisDan:null,
    alertDan:null,
    isDanAlert:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  initAccountResult: function () {
    var outThis = this;
    accountRequest.accountResultInfo({
      success: function (accountResult) {
        outThis.setData({
          headimgurl: accountResult.headimgurl,
          nickname: accountResult.nickname,
          level: accountResult.level,
          exp: accountResult.exp,
          danName:accountResult.danName
        });
        outThis.initBattleDans();
      },
      fail: function () {

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  initBattleDans:function(){
    var outThis = this;
    battleDanRequest.listRequest({
      success:function(dans){
        outThis.setData({
          dans:dans
        });

        var thisDan;
        for(var i=0;i<dans.length;i++){
          if(dans[i].status==1){
            thisDan = dans[i];
          }
        }

        outThis.setData({
          thisDan: thisDan
        });

        outThis.loadPreProgress({
          complite: function () {
            setTimeout(function(){
              outThis.setData({
                currentDanId: "dan_" + thisDan.id
              });
            },500);
            
          }
        });
      },
      fail:function(){

      }
    });
  },

  danListAlertMaskClick:function(){
    this.setData({
      isDanAlert: 0
    });
  },

  danItemClick:function(e){
    var id = e.currentTarget.id;
    var dans = this.data.dans;
    for(var i=0;i<dans.length;i++){
      var dan = dans[i];
      if(dan.id==id){
        if (dan.status==0){
          this.showConfirm("该段位未开启", "请先完成上一个段位", {
            confirm:function(){

            },
            cancel:function(){

            }
          });
          return;
        }
        var isSign = dan.isSign;
        if(isSign==1){
          outThis.setData({
            roomId: data.roomId,
            battleId: data.battleId
          });
          outThis.startTo();
        }else{
          this.setData({
            isDanAlert: 1,
            alertDan: dan
          });
        }
        return;
      }
    }
    
  },

  restart:function(danId){
    var dans = this.data.dans;
    for (var i = 0; i < dans.length; i++) {
      var dan = dans[i];
      if(dan.id = danId){
        
        this.setData({
          isDanAlert: 1,
          alertDan: dan
        });
        return;
      }
    }
  },

  startTo:function(){
    var roomId = this.data.roomId;
    var battleId = this.data.battleId;
    wx.navigateTo({
      url: '../progressScore/progressScore2?roomId=' + roomId + "&battleId=" + battleId + "&againButton=返回"
    });
  },

  signClick:function(){
    var outThis = this;
    var alertDan = this.data.alertDan;

    this.showConfirm("报名该关卡","是否确定",{
      confirm:function(){
        outThis.showLoading();
        outThis.setData({
          isDanAlert: 0
        });
        battleDanRequest.danSign(alertDan.id, {
          success: function (data) {
            takepartRequest.battleTakepart(data.battleId, data.roomId, {
              success: function (member) {
                outThis.hideLoading();
                outThis.setData({
                  roomId:data.roomId,
                  battleId:data.battleId
                });
                outThis.startTo();
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
                outThis.setData({
                  roomId: data.roomId,
                  battleId: data.battleId
                });
                outThis.startTo();
              },
              battleEnd: function () {
                
              },
              roomEnd: function () {
                
              },
              roomFull: function () {
                
              }
            }, alertDan.id);
          },
          beanNotEnough: function () {
            outThis.hideLoading();
            outThis.showConfirm("智慧豆不足", "是否去充值", {
              confirm:function(){
                wx.navigateTo({
                  url: '../mall/mall'
                });
              },
              cancel:function(){

              }
            });
          },
          fail: function () {
            outThis.hideLoading();
            outThis.showToast("网络繁忙，请稍后再试");
          }
        });
      },
      cancel:function(){

      }
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initAccountInfo();
    this.initAccountResult();
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

layerout.addAttrPlug();
layerout.begin();