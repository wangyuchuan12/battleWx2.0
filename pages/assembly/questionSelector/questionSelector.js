var request = require("../../../utils/battleSubjectsRequest.js");
var roomId;
var drawSelectInterval;
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
    display: "none",
    questionSelectorHeaderCount: 4,
    questionSelectorHeaderList: [],
    questionSelectorContentList: [],
    type: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setHeaderCount: function (count) {

      var questionSelectorHeaderList = new Array();
      for (var i = 0; i < count; i++) {
        questionSelectorHeaderList.push({
          imgUrl: "http://ovqk5bop3.bkt.clouddn.com/question2.png",
          status: 0,
          index: 0
        });
      }

      this.setData({
        "questionSelectorHeaderCount": count,
        "questionSelectorHeaderList": questionSelectorHeaderList
      });
    },

    isQuestionSelectorHeaderReady: function () {
      var array = this.data.questionSelectorHeaderList;
      for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item.status == 0) {
          return false;
        }
      }
      return true;
    },

    setQuestionSelectorHeader: function (index, item, callback) {
      var imgUrl = item.imgUrl;
      var targetId = item.id;
      var count = this.data.questionSelectorHeaderCount;
      var outThis = this;
      var array = this.data.questionSelectorHeaderList;
      var item = array[index];
      if (item == null) {
        return;
      }
      if (item.status == 1 && index < count - 1) {
        index++;
        this.setQuestionSelectorHeader(index, item, callback);
        return;
      }
      array.splice(index, 1, {
        imgUrl: imgUrl,
        status: 1,
        targetId: targetId,
        index: index
      });
      this.setData({
        "questionSelectorHeaderList": array
      });


      if (index < count - 1) {
        index++;
        this.setData({
          "questionSelectorHeaderIndex": index
        });

        if (this.isQuestionSelectorHeaderReady()) {
          if (callback) {
            setTimeout(function () {
              callback.complete();
            }, 100);

          }
        }
      } else {
        var flag = true;
        for (var i = 0; i < array.length; i++) {
          var item = array[i];
          if (item.status == 0) {
            flag = false;
            outThis.setData({
              "questionSelectorHeaderIndex": item.index
            });
            break;
          }

        }
        if (callback && flag) {
          setTimeout(function () {
            callback.complete();
          }, 300);

        }

      }
    },

    selectBattleHeader: function (e) {
      console.log("selectBattleHeader");
      var outThis = this;
      var index = e.currentTarget.id;
      this.setData({
        "questionSelectorHeaderIndex": index
      });
      var list = this.data.questionSelectorHeaderList;
      var questionSelectorContentList = this.data.questionSelectorContentList;
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.index == index) {
          if (item.status == 1) {
            for (var i = 0; i < questionSelectorContentList.length; i++) {
              var contentItem = questionSelectorContentList[i];
              console.log("item.targetId:" + item.targetId);
              if (contentItem.id == item.targetId) {
                var num = contentItem.num;
                num++;
                contentItem.num = num;
                outThis.setData({
                  "questionSelectorContentList": questionSelectorContentList
                });
              }
            }
            list.splice(index, 1, {
              imgUrl: "http://ovqk5bop3.bkt.clouddn.com/question2.png",
              status: 0,
              index: index
            });
            outThis.setData({
              "questionSelectorHeaderList": list
            });
            break;
          }

        }
      }
    },

    selectComplete: function () {
      console.log("................zheshishenmema");
      var outThis = this;
      var selectContentList = outThis.data.questionSelectorHeaderList;
      var type = outThis.data.type;
      if (type == 0) {
        wx.showModal({
          title: "提示",
          content: "确定开始吗",
          success: function (sm) {
            if (sm.confirm) {

              console.log("这是什么鬼");
              /** 这里需要处理的 */
              //outThis.eventListener.selectComplete(selectContentList);

              var myEventDetail = {selectContentList:selectContentList} // detail对象，提供给事件监听函数
              var myEventOption = {} // 触发事件的选项
              this.triggerEvent('selectComplete', myEventDetail, myEventOption);

            } else if (sm.cancel) {
              console.log("cancel");
            }
          }
        });
      } else if (type == 1) {


        /**这里需要处理的 */
        //outThis.eventListener.selectComplete(selectContentList);
        var myEventDetail = { selectContentList: selectContentList } // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('selectComplete', myEventDetail, myEventOption);
    
      }
    },

    questinSelectorClose: function () {
      //this.eventListener.questinSelectorClose();
    },

    getFirstHeaderIndex: function () {
      var list = this.data.questionSelectorHeaderList;
      for (var index = 0; index < list.length; index++) {
        var item = list[index];
        if (item.status == 0) {
          return index;
        }
      }
      return -1;
    },

    stopDrawSelectInterval: function () {
      clearInterval(drawSelectInterval);
      this.setData({
        "display": "none"
      });
    },

    drawSelect: function () {
      var outThis = this;

      var index = 0;
      var time = 0;
      drawSelectInterval = setInterval(function () {
        var questionSelectorContentList = outThis.data.questionSelectorContentList;

        if (!questionSelectorContentList || questionSelectorContentList.length == 0) {
          return;
        }

        if (questionSelectorContentList.length == 2 && index == 1) {
          index = 0;
        } else if (questionSelectorContentList.length == 2 && index == 0) {
          index = 1;
        } else if (questionSelectorContentList.length == 3 && index == 2) {
          index = 0;
        } else if (index == 2) {
          index = 5;
        } else if (index == 3) {
          index = 0;
        } else if (index == 0 || index == 1) {
          index++;
        } else if (index == 5 || index == 4) {
          index--;
        }

        for (var i = 0; i < questionSelectorContentList.length; i++) {
          var item = questionSelectorContentList[i];
          item.background = "none";
        }
        var item = questionSelectorContentList[index];
        time++;
        if (item) {
          item.background = "red";

        }
        if (time > 20) {
          time = 0;
        }
        outThis.setData({
          "questionSelectorContentList": questionSelectorContentList
        });

        if (item) {
          var num = Math.ceil(Math.random() * 2);
          if (time == num + 10) {
            time = 0;
            outThis.doSelectBattleSubject(item.id);
          }
        }
      }, 100);
    },

    doSelectBattleSubject: function (id) {
      var outThis = this;
      var questionSelectorContentList = this.data.questionSelectorContentList;
      if (id != "random") {

        for (var i = 0; i < questionSelectorContentList.length; i++) {
          var item = questionSelectorContentList[i];
          if (item.id == id) {
            var num = item.num;

            console.log("*********num:" + num);
            if (num > 0) {
              var index = outThis.getFirstHeaderIndex();
              if (index != -1) {
                num--;
                item.num = num;
                outThis.setQuestionSelectorHeader(index, item, {
                  complete: function () {
                    outThis.selectComplete();
                    if (drawSelectInterval) {
                      clearInterval(drawSelectInterval);
                    }
                  }
                });
              }

            }

          }
        }
        outThis.setData({
          "questionSelectorContentList": questionSelectorContentList
        });
      } else {
        var selectItems = new Array();
        for (var i = 1; i < questionSelectorContentList.length; i++) {
          var item = questionSelectorContentList[i];
          var num = item.num;
          if (num > 0) {
            selectItems.push(item);
          }
        }
        selectItems = this.shuffle(selectItems);
        var index = 0;
        var headerCount = this.data.questionSelectorHeaderList.length;
        for (var i = 0; i < headerCount; i++) {
          var item = selectItems[index];
          var headerItem = this.data.questionSelectorHeaderList[i];
          if (item != null && headerItem.status == 0) {
            index++;
            outThis.setQuestionSelectorHeader(i, item, {
              complete: function () {
                outThis.selectComplete();
              }
            });
            var num = item.num;
            num--;
            item.num = num;
          }
        }

        outThis.setData({
          "questionSelectorContentList": questionSelectorContentList
        });

      }
    },

    selectBattleSubjectClick: function (e) {
      var outThis = this;
      var id = e.currentTarget.id;

      this.doSelectBattleSubject(id);
    },

    shuffle: function (array) {
      var tmp, current, top = array.length;
      if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    },

    hideSelector: function () {
      this.setData({
        "display": "none"
      });
    },
    showSelector: function () {

      this.setData({
        "display": "block"
      });
    },

    initBattleSubjects: function (count, battleId, roomId, callback, type) {
      this.setHeaderCount(count);
      var outThis = this;

      console.log("...........initBattleSubjects");

      if (type) {
        this.setData({
          "type": type
        });
      }

      console.log("battleId:"+battleId+",roomId:"+roomId);

      request.getBattleSubjects(battleId, roomId, {
        success: function (data) {
          console.log("data:"+JSON.stringify(data));
          if (callback) {
            callback.success();
          }
          var array = new Array();
          if (type == 0) {
            array.push({
              id: "random",
              name: "一键开始",
              imgUrl: "http://ovqk5bop3.bkt.clouddn.com/random.png",
              num: 1
            });
          }
          for (var i = 0; i < data.length; i++) {

            array.push({
              name: data[i].name,
              imgUrl: data[i].imgUrl,
              id: data[i].id,
              num: data[i].num,
              questions: data[i].questions,
              background: "none"
            });
          }

          outThis.setData({
            "questionSelectorContentList": array
          });

          if (type == 1) {
            outThis.drawSelect();
          }

        },

        isLast: function () {
          callback.isLast();
        },

        fail: function () {
          console.log("fail");
        }
      });
    }
  }
})
