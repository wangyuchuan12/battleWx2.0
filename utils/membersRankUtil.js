function rankByProcess(members){
  var len = members.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (members[j].score < members[j + 1].score) {        //相邻元素两两对比
        var temp = members[j + 1];        //元素交换
        members[j + 1] = members[j];
        members[j] = temp;
      }
    }
  }
  return members;
}

module.exports = {
  rankByProcess: rankByProcess
}