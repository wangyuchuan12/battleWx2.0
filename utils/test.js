var request = require("request.js");

var domain = request.getDomain();

var testGetUrl = domain + "/api/common/login/testGet";

var testSaveUrl = domain + "/api/common/login/testSave";

function testSave(){
  var outThis = this;
  request.request(testSaveUrl, {}, {
    success:function(data){
      console.log("data:"+JSON.stringify(data));
      outThis.testGet();
    },
    fail:function(){

    }
  });
}

function testGet() {
  request.request(testGetUrl, {}, {
    success: function (data) {
      console.log("data:" + JSON.stringify(data));
    },
    fail: function () {

    }
  });
}

module.exports = {
  testSave: testSave,
  testGet: testGet
}