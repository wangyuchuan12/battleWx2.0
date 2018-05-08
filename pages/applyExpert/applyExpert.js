var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");

var smsRequest = require("../../utils/smsRequest.js");

var battleExpertRequest = require("../../utils/battleExpertRequest.js");

var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");

var layerout = new baseLayerout.BaseLayerout({
  /**
   * 页面的初始数据
   */
  data: {
    phonenum:null,
		
    code:null,
    
    wechat:null,
		
    battleId:0,
		
    introduce:"",

    vEnable:1,

    remainingTime:0,

    backModel:0
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var battleId = options.battleId;
    this.setData({
      battleId: battleId
    });
  },

  submitClick:function(){
    var outThis = this;
    var phonenum = this.data.phonenum;
    var code = this.data.code;
    var wechat = this.data.wechat;
    var battleId = this.data.battleId;
    var introduce = this.data.introduce;
    
    if(!wechat){
      this.showToast("微信账号不能为空");
      return;
    }
    if(!phonenum){
      this.showToast("手机号码不能为空");
      return;
    }

    if (!code) {
      this.showToast("验证码不能为空");
      return;
    }

    if (!introduce) {
      this.showToast("简介不能为空");
      return;
    }

    if (wechat.length>20) {
      this.showToast("微信账号不能超过20个字符");
      return;
    }
    if (phonenum.length>20) {
      this.showToast("手机号码不能超过20个字符");
      return;
    }

    if (code.length>20) {
      this.showToast("验证码不能超过20个字符");
      return;
    }

    if (introduce.length>200) {
      this.showToast("简介不能超过100个字符");
      return;
    }
    var outThis = this;
    this.showLoading();
    battleExpertRequest.apply({
      phonenum: phonenum,
      code: code,
      wechat: wechat,
      battleId: battleId,
      introduce: introduce
    },{
      success:function(data){
        
        outThis.hideLoading();
        if(data.status==0){
          wx.navigateTo({
            url: '../expertInfo/expertInfo?battleId=' + data.battleId + "&expertId=" + data.id
          });
        }else if(data.status==1){

          outThis.showConfirm("申请成功", "快去出题目吧", {
            confirm:function(){
              wx.navigateBack({
                
              });
            },
            cancel:function(){
              wx.navigateBack({

              });
            }
          }, "确定", "取消");
        }
        
      },
      fail:function(){
        outThis.showToast("验证码不通过或发生错误");
        outThis.hideLoading();
        console.log("fail");
      }
    });
  },

  codeInputChange:function(e){
    this.setData({
      "code": e.detail.value
    });
  },

  wechatInputChange:function(e){
    this.setData({
      "wechat": e.detail.value
    });
  },

  introduceInputChange:function(e){
    this.setData({
      "introduce": e.detail.value
    });
  },

  phonenumberInputChange: function (e) {
    this.setData({
      "phonenum": e.detail.value
    });
  },

  vPhonenumberClick:function(){
    var outThis = this;
    var phonenum = this.data.phonenum;
    var project = "YoDyb";
    smsRequest.authCode(phonenum, project,{
      success:function(){
        console.log("vsuccess");
      },
      fail:function(){
        console.log("fail");
      }
    });
    this.setData({
      vEnable:0,
      remainingTime: 120
    });

    var interval = setInterval(function(){
      var remainingTime = outThis.data.remainingTime;
      remainingTime--;
      if (remainingTime<=0){
          clearInterval(interval);
          outThis.setData({
            vEnable: 1
          });
      }else{
        outThis.setData({
          remainingTime: remainingTime
        });
      }
    },1000);
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
   /* var backModel = this.data.backModel;
    if (backModel==1){
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.customClick();
    }*/
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