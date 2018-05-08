//获取应用实例
var app = getApp()

var interval;
var varName;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗标题
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '弹窗内容'
    },
    // 弹窗取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toPk:function(){
      /*wx.navigateTo({
        url: '../pkRoom/pkRoom'
      });*/
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('toPk', myEventDetail, myEventOption);
    },
    toPlay:function(){
      /*
      wx.navigateTo({
        url: '../luckDraw/luckDraw'
      });*/
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('toPlay', myEventDetail, myEventOption);
    },
    toDanList:function(){
      /*wx.navigateTo({
        url: '../danList/danList'
      });*/
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('toDanList', myEventDetail, myEventOption);
    },
    toRank:function(){
      /*
      wx.navigateTo({
        url: '../rankDanBattle/rankDanBattle'
      });*/
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('toRank', myEventDetail, myEventOption);
    },
    toMall:function(){
      wx.navigateTo({
        url: '../mall/mall',
      });
    }
  }
})
