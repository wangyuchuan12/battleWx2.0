// pages/assembly/selectInput/selectInput.js
var selectInputPlug = {

  /**
   * 页面的初始数据
   */
  data: {

  },

  inputClick:function(){
    this.setData({
      "selectInputData.status":1
    });
  },

  itemClick:function(e){
    var outThis = this;
    var id = e.currentTarget.id;
    var items = this.data.selectInputData.items;
    for(var i=0;i<items.length;i++){
      var item = items[i];
      if(item.id==id){
        item.status=1;
        this.setData({
          "selectInputData.items": items,
          "selectInputData.id":id
        });
        setTimeout(function(){
          item.status=0
          outThis.setData({
            "selectInputData.items":items,
            "selectInputData.status": 0
          });
          outThis.eventListener.selectItem(item.id);
        },100);
        break;
      }
    }
  }
}

module.exports = {
  selectInputPlug: selectInputPlug
}