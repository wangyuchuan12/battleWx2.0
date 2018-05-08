function rankByIndex(stages) {
  var len = stages.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (stages[j].stageIndex > stages[j + 1].stageIndex) {        //相邻元素两两对比
        var temp = stages[j + 1];        //元素交换
        stages[j + 1] = stages[j];
        stages[j] = temp;
      }
    }
  }
  return stages;
}

module.exports = {
  rankByIndex: rankByIndex
}