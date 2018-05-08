var alertPlug = {
  data: {
    alertPlugData: {
      isShow:0,
      content:"送您100豆"
    }
  },
  alertPlugConfirmClick:function(){
    this.setData({
      "alertPlugData.isShow":0
    });
  },
  showAlertPlug: function (content){
    this.setData({
      "alertPlugData.isShow": 1,
      "alertPlugData.content": content
    });
  }
}

module.exports = {
  alertPlug: alertPlug
}