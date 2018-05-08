var beanNotEnoughAlertPlug = {
  data: {
    beanNotEnoughAlertPlugData: {
      isShow:0
    }
  },
  showBeanNotEnoughAlertPlug:function(){
    this.setData({
      "beanNotEnoughAlertPlugData.isShow":1
    });
  },
  rechargeBean:function(){
    this.setData({
      "beanNotEnoughAlertPlugData.isShow": 0
    });
    if (this.beanNotEnoughAlertPlugGiveUpRelay) {
      this.beanNotEnoughAlertPlugGiveUpRelay();
    }
  },
  beanNotEnoughAlertPlugGiveUp:function(){
    this.setData({
      "beanNotEnoughAlertPlugData.isShow": 0
    });
  }
}

module.exports = {
  beanNotEnoughAlertPlug: beanNotEnoughAlertPlug
}