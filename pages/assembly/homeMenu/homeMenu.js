// pages/assembly/homeMenu/homeMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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

    takeoutClick: function () {
      wx.navigateTo({
        url: '../takeoutMoney/takeoutMoney'
      });
    },
    toPk: function () {
      /*wx.navigateTo({
        url: '../pkRoom/pkRoom'
      });*/
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('toPk', myEventDetail, myEventOption);
    },
    toPlay: function () {
      /*
      wx.navigateTo({
        url: '../luckDraw/luckDraw'
      });*/
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('toPlay', myEventDetail, myEventOption);
    },
    toDanList: function () {
      /*wx.navigateTo({
        url: '../danList/danList'
      });*/
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('toDanList', myEventDetail, myEventOption);
    },
    toRank: function () {
      /*
      wx.navigateTo({
        url: '../rankDanBattle/rankDanBattle'
      });*/
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('toRank', myEventDetail, myEventOption);
    },
    toMall: function () {
      wx.navigateTo({
        url: '../mall/mall',
      });
    }
  }
})
