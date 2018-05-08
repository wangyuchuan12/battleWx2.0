function addReceived(id){
  var redPacks = wx.getStorageSync("redPackes");
  if(!redPacks){
    redPacks = new Array();
  }
  redPacks.push(id);
  wx.setStorageSync("redPackes", redPacks);
}

function isReceived(id){
  var redPacks = wx.getStorageSync("redPackes");
  if(!redPacks){
    return false;
  }

  for(var i=0;i<redPacks.length;i++){
    var redPack = redPacks[i];
    if(redPack==id){
      return true;
    }
  }

  return false;
}

module.exports = {
  addReceived: addReceived,
  isReceived: isReceived
}