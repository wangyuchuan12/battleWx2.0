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
    "roundProgress.remainSecord": 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    stopRoundProgress: function () {
      clearInterval(varName);
    },
    drawCircle: function (secord, callback) {
      var ctx = wx.createCanvasContext('canvasArcCir',this);
      var outThis = this;
      this.setData({
        "roundProgress.remainSecord": secord
      });
      clearInterval(varName);
      function drawArc(s, e) {
        ctx.setFillStyle('white');
        ctx.clearRect(0, 0, 200, 200);
        ctx.draw();
        var x = 100, y = 43, radius = 30;
        ctx.setLineWidth(5);
        ctx.setStrokeStyle('#d81e06');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(x, y, radius, s, e, false);
        ctx.stroke()
        ctx.draw()
      }
      var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
      var animation_interval = 1000, n = secord;
      endAngle = 0 * 2 * Math.PI / n + 1.5 * Math.PI;
      drawArc(startAngle, endAngle);
      var animation = function () {
        if (step <= n) {
          endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
          drawArc(startAngle, endAngle);
          step++;
          var remainSecord = outThis.data.roundProgress.remainSecord;
          remainSecord--;
          outThis.setData({
            "roundProgress.remainSecord": remainSecord
          });
        } else {
          clearInterval(varName);
          if (callback) {
            callback.end();
          }
        }
      };
      varName = setInterval(animation, animation_interval);
    },
    startCoundDown: function (secord, callback) {
      //创建并返回绘图上下文context对象。
      var cxt_arc = wx.createCanvasContext('canvasCircle',this);
      cxt_arc.setLineWidth(6);
      cxt_arc.setStrokeStyle('#eaeaea');
      cxt_arc.setLineCap('round');
      cxt_arc.beginPath();
      cxt_arc.arc(100, 43, 30, 0, 2 * Math.PI, false);
      cxt_arc.stroke();
      cxt_arc.draw();
      this.drawCircle(secord, callback);
    }
  }
})
