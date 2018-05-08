var redPackAlertPlug = {
  data:{
    redPackAlertPlugData:{
      id:0,
      imgUrl:"",
      display:"none",
      nickname:"",
      roomMeet:{
        isRoomMeet:0,
        roomMeetNum:0
      },
      roomProcessMeet:{
        isRoomProcessMeet:0,
        roomProcessMeet:0
      },
      personalProcessMeet:{
        isPersonalProcessMeet:0,
        personalProcessMeet:0
      },

      roomScoreMeet: {
        isRoomScoreMeet: 0,
        roomScoreMeet: 0
      },
      personalScoreMeet: {
        isPersonalProcessMeet: 0,
        personalScoreMeet: 0
      }

    }
  },
  showRedPack:function(redPack){
    //是否需要参与房间
    var isRoomMeet = redPack.isRoomMeet;
    //房间距离
    var isRoomProcessMeet = redPack.isRoomProcessMeet;
    //个人距离
    var isPersonalProcessMeet = redPack.isPersonalProcessMeet;
    var personalProcessMeet = redPack.personalProcessMeet;

    //房间分数
    var isRoomScoreMeet = redPack.isRoomScoreMeet;
    var roomScoreMeet = redPack.roomScoreMeet;

    //个人分数
    var isPersonalScoreMeet = redPack.isPersonalScoreMeet;
    var personalScoreMeet = redPack.personalScoreMeet;

    var index = 0;
    var roomMeetIndex = 0;
    var roomProcessIndex = 0;
    var personalProcessIndex = 0;

    var roomScoreIndex = 0;
    var personalScoreIndex = 0;

    if (isRoomMeet==1){
      index++;
      roomMeetIndex = index;
    }
    if (isRoomProcessMeet==1){
      index++;
      roomProcessIndex = index;
    }

    if (isPersonalProcessMeet==1){
      index++;
      personalProcessIndex = index;
    }

    if (isRoomScoreMeet==1){
      index++;
      roomScoreIndex = index;
    }

    if(isPersonalScoreMeet==1){
      index++;
      personalScoreIndex = index;
    }

    console.log("imgUrl:"+redPack.imgUrl+",nickname:"+redPack.nickname);
    this.setData({
      "redPackAlertPlugData.imgUrl": redPack.senderImg,
      "redPackAlertPlugData.nickname": redPack.senderName,
      "redPackAlertPlugData.roomMeet.isRoomMeet": isRoomMeet,
      "redPackAlertPlugData.roomMeet.roomMeetNum": redPack.roomMeetNum,
      "redPackAlertPlugData.roomMeet.roomMeetIndex": roomMeetIndex,
      "redPackAlertPlugData.roomProcessMeet.isRoomProcessMeet": isRoomProcessMeet,
      "redPackAlertPlugData.roomProcessMeet.roomProcessMeet": redPack.roomProcessMeet,
      "redPackAlertPlugData.roomProcessMeet.roomProcessIndex": roomProcessIndex,
      "redPackAlertPlugData.personalProcessMeet.isPersonalProcessMeet": isPersonalProcessMeet,
      "redPackAlertPlugData.personalProcessMeet.personalProcessMeet": personalProcessMeet,
      "redPackAlertPlugData.personalProcessMeet.personalProcessIndex": personalProcessIndex,


      "redPackAlertPlugData.roomScoreMeet.roomScoreIndex": roomScoreIndex,
      "redPackAlertPlugData.roomScoreMeet.isRoomScoreMeet": isRoomScoreMeet,
      "redPackAlertPlugData.roomScoreMeet.roomScoreMeet": roomScoreMeet,

      "redPackAlertPlugData.personalScoreMeet.personalScoreIndex": personalScoreIndex,
      "redPackAlertPlugData.personalScoreMeet.isPersonalScoreMeet": isPersonalScoreMeet,
      "redPackAlertPlugData.personalScoreMeet.personalScoreMeet": personalScoreMeet,
      "redPackAlertPlugData.id":redPack.id,
      "redPackAlertPlugData.display": "block"
    });
  },
  redPacketAlertCloseClick:function(){
    this.setData({
      "redPackAlertPlugData.display":"none"
    });
  },
  openRedPackClick:function(){
    var outThis = this;
    var id = this.data.redPackAlertPlugData.id;
    outThis.eventListener.receiveRedpackInfo(id);
    this.setData({
      "redPackAlertPlugData.display": "none"
    });
  }
}

module.exports = {
  redPackAlertPlug: redPackAlertPlug
}