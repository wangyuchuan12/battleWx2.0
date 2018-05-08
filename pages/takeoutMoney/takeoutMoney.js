var amountRequest = require("../../utils/amountRequest.js");

var accountRequest = require("../../utils/accountRequest.js");

var battleMemberInfoRequest = require("../../utils/battleMemberInfoRequest.js");
var baseLayerout = require("../assembly/baseLayerout/baseLayerout.js");
var layerout = new baseLayerout.BaseLayerout({

  /**
   * 页面的初始数据
   */
  data: {
    headImg:"",
    entries:[],
    records:[],
    account:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  initTakeoutRecords:function(){
    var outThis = this;
    amountRequest.takeoutRecords({
      success: function (records) {
        console.log("records:"+JSON.stringify(records));
        outThis.setData({
          records:records
        })
      },
      fail: function () {

      }
    });
  },

  initAccountInfo:function(){
    var outThis = this;
    var memberInfo = battleMemberInfoRequest.getBattleMemberInfoFromCache();

    this.setData({
      headImg:memberInfo.headImg
    });

    accountRequest.accountInfo({
      success:function(account){
        outThis.setData({
          account:account
        });
      },
      fail:function(){

      }
    });
  },

  initEnties:function(){
    var outThis = this;
    amountRequest.entiesRequest({
      success: function (entries){
        outThis.setData({
          entries: entries
        });
      },
      fail:function(){

      }
    });
  },

  entryClick:function(e){
    var id = e.currentTarget.id;
    this.takeout(id);
  },

  takeout:function(id){
    var outThis = this;
    var account = this.data.account;
    if (account.canTakeOutCount<1){
      this.showToast("本月可提现次数已经用完");
      return;
    }

    var entries = this.data.entries;

    for (var i = 0; i < entries.length;i++){
      var entry = entries[i];

      if (entry.id==id&&entry.amount > account.amountBalance){
        this.showToast("金额不足");
        return;
      }
    }

    outThis.showLoading();
    amountRequest.takeoutRequest(id,{
      success:function(){
        outThis.hideLoading();
        outThis.showConfirm("提现成功", "金额已转到零钱，如未到账，可能有延迟", {
          confirm:function(){

          },
          cancel:function(){
            
          }
        });
        outThis.initAccountInfo();
        outThis.initTakeoutRecords();
      },
      fail: function (errorMsg){
        outThis.hideLoading();
        outThis.showToast("提现失败");
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initEnties();
    this.initAccountInfo();
    this.initTakeoutRecords();
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