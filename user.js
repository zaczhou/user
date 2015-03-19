var later = require('later');
var uuid = require('node-uuid');
var model = require('./channel');

function User(options) {
  var channels = new Array();
  var chSize = 5000;
  var expireTIme = 3600000;
  var textSched = later.parse.text('every 5 min');
  var timer;
  var self = this;
}

exports.User = User;

User.prototype.createChannle = function(userIds) {
  if (self.channels.length < self.chSize) {
    if (userIds.length >= 3) {
      var channel = {'uid': uuid.v1(), 'date': Date.now(), users: userIds};
      self.channels.add(channel);
    } else {
      console.error("wrong userId list!");
    }
  } else {
    console.error("channels size is over!");
  }
};

User.prototype.getChUID = function(chUID) {
  var channels = self.channels;
  channels.forEach(function(ch) {
    if (ch.uid == chUID) {
      return ch;
    }
  });
};

//如果有人使用channel 更新时间戳，以防被过滤掉
User.prototype.resetCHTime = function(chUID) {
  var channels = self.channels;
  channels.forEach(function(ch) {
    if (ch.uid == chUID) {
      ch.date = Date.now();
    }
  });
};

//根据过期规则过滤channel
User.prototype.checkTime = function() {
  var channels = self.channels;
  channels.forEach(function(ch, i) {
    if ((Date.now() - ch.date) > this.expireTIme) {
      channels.remove(i);
    }
  });
};

//启动定时任务
User.prototype.startTimer = function() {
  self.timer = later.setInterval(checkTime, textSched);
};

//关闭定时任务
User.prototype.stopTimer = function() {
  self.timer.clear();
};


//服务器关闭是，持久化
User.prototype.dump = function () {
  var channels = self.channels;
  channels.forEach(function(ch) {
    var cModel = new model.Channel(data);
    cModel.save(function (err) {
      if (err) {
        console.error(err.stack);
      }
    });
  });
};

//服务器启动时，初始化
User.prototype.load = function () {
  var cModel = new model.Channel();
  cModel.find(function (err, channels) {
    if (err) {

    } else {
      channels.forEach(function (ch) {
        var channel = {'uid': ch.uid, 'date': Date.now(), users: ch.users};
        self.channels.add(channel);
      });
    }
  });
};