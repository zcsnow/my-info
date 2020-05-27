// 初始化存储 SDK
/*var appId = 'yUfzkwOSRzbdSriGdSaxQV5S-gzGzoHsz';
var appKey = '1o3UmxdG6ABIOm3ffijsqWen';*/

var appId = '9p6hyhh60av3ukkni3i9z53q1l8yy3cijj6sie3cewft18vm';
var appKey = 'nhqqc1x7r7r89kp8pggrme57i374h3vyd0ukr2z3ayojpvf4';
AV.init({
  appId: appId,
  appKey: appKey,
});

// 用户信息
var user = {
	clientId: "yummy02", // 每个客户端自定义的 id
	name: "Yummy",
	avatar:"images/host_avatar.jpg",
	content: null
};

var roomId = '551a2847e4b04d688d73dc54';//房间的 conversation id（这是服务器端生成的）
var client;
var messageIterator;
var room;// 用来存储创建好的 roomObject
var firstFlag = true;// 监听是否服务器连接成功
var logFlag = false;// 用来标记历史消息获取状态
var msgTime;// 最早一条消息的时间戳

var openBtn = document.getElementById('open-btn');
//var sendBtnAsFile = document.getElementById('send-btn-as-file');
var sendBtn = document.getElementById('send-btn');
var inputName = document.getElementById('input-name');
var inputSend = document.getElementById('input-send');
var printWall = document.getElementById('print-wall');
var fileUploadControl = document.getElementById('photoFileUpload');
var audioBtn = document.getElementById('audio_btn');



bindEvent(sendBtn, 'click', sendMsg);
bindEvent(audioBtn, 'click', sendMsgAsAudio);
bindEvent(fileUploadControl, 'change', sendMsgAsImg);
//bindEvent(sendBtnAsFile, 'click', sendMsgAsFile);

function main() {
  window.scrollTo(0, $(window).height());
  //showTip('正在连接服务器，请等待。。。');
  if (!firstFlag) {
    client.close();
  }
  // 创建实时通信实例
  var realtime = new AV.Realtime({
	appId: appId,
  });
  // 注册文件类型消息  
  realtime.register(AV.FileMessage);
  // 创建聊天客户端  
  realtime.createIMClient(user.clientId)
  .then(function(IMClient) {
	//showTip('正服务器连接成功！'); 
    firstFlag = false;
    client = IMClient;
    client.on('disconnect', function() {
	  showTip('服务器正在重连，请耐心等待。。');
    });
    // 获取对话
    return IMClient.getConversation(roomId);
  })
  .then(function(conversation) {
    if (conversation) {
      return conversation;
    } else {
	  //showTip('服务器不存在这个 conversation，创建一个。');
      return client.createConversation({
        name: '辣妈生萌宝',
        members: [
          // 默认包含当前用户
          'Wallace'
        ],
        // 创建暂态的聊天室（暂态聊天室支持无限人员聊天，但是不支持存储历史）
        transient: true,
      }).then(function(conversation) {
		//showTip('创建新 Room 成功，id 是：'+roomId);
        roomId = conversation.id;
        return conversation;
      });
    }
  })
  .then(function(conversation) {
	/*showTip('当前 Conversation 的成员列表：' + conversation.members);*/
    return conversation;
  })
  .then(function(conversation) {
    return conversation.join();
  })
  .then(function(conversation) {
    // 获取聊天历史
    room = conversation;
    messageIterator = conversation.createMessagesIterator();
    getLog(function() {
      showTip('已经加入，可以开始聊天。');
	  printWall.scrollTop = printWall.scrollHeight;
	  //window.scrollTo(0, printWall.clientHeight);
    });
    // 房间接受消息
    conversation.on('message', function(message) {
      if (!msgTime) {
        // 存储下最早的一个消息时间戳
        msgTime = message.timestamp;
      }
      showMsg(message);
    });
  })
  .catch(function(err) {
    console.error(err);
  });
  
};

//发送文字
function sendMsg() {
  var val = inputSend.value;
  // 不让发送空字符
  if(String(val).replace(/^\s+/, '').replace(/\s+$/, '')){
	// 向这个房间发送消息
	room.send(new AV.TextMessage(val)).then(function(message) {
	  // 发送成功之后的回调
	  inputSend.value = '';
	  showTip(formatTime(message.timestamp));
	  showLog(user.clientId,user.clientId,user.avatar,encodeHTML(message.text));
	});
  }else{
  	alert('发送内容不能为空！');
  }
}

//发送图片
function sendMsgAsImg() {
	var imgVal = fileUploadControl.value;
    var file = new AV.File('image', fileUploadControl.files[0]);
    file.save().then(function() {
      var message = new AV.ImageMessage(file);
      return room.send(message);
    }).then(function(message) {
	  fileUploadControl.value = '';
	  showLog(user.clientId,user.clientId,user.avatar,createImg(message.getFile().url()));
    });
}

//发送语音
function sendMsgAsAudio() {
    var audioUrl = 'sound.mp3';
	var file = new AV.File.withURL('audio',audioUrl);
    file.save().then(function() {
      var message = new AV.AudioMessage(file);
      return room.send(message);
    }).then(function(message) {
	  showLog(user.clientId,user.clientId,user.avatar,createAudio(message.getFile().url()));
	  audio.currentTime;
    });
}

// 发送文件
function sendMsgAsFile() {
  var val = inputSend.value;
  // 不让发送空字符
  if (!String(val).replace(/^\s+/, '').replace(/\s+$/, '')) {
    alert('请输入点文字！');
  }
  new AV.File('message.txt', {
    base64: b64EncodeUnicode(val),
  }).save().then(function(file) {
    return room.send(new AV.FileMessage(file));
  }).then(function(message) {
    // 发送成功之后的回调
    console.log('发送成功！');
    printWall.scrollTop = printWall.scrollHeight;
  }).catch(console.warn);

}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}


// 显示接收到的信息
function showMsg(message, isBefore) {
  var text = message.text;
  var from = message.from;
  var cid = message.cid;
  
  var avatar = "images/avatar03.jpg";
  if(from == user.clientId){
     avatar = "images/host_avatar.jpg";
  }
  
  if (message instanceof AV.TextMessage) {
    if (String(text).replace(/^\s+/, '').replace(/\s+$/, '')) {
	  //showTip(formatTime(message.timestamp));
	  showLog(cid,encodeHTML(from),avatar,encodeHTML(message.text),isBefore);
    }
  } else if (message instanceof AV.FileMessage) {
    //showTip(formatTime(message.timestamp));
	showLog(cid,encodeHTML(from),avatar,createLink(message.content._lcfile.url),isBefore);
  }else if (message instanceof AV.Message) {
	if(message.content._lctype==-2){
		//showTip(formatTime(message.timestamp));
		showLog(cid,encodeHTML(from),avatar,createImg(message.content._lcfile.url),isBefore);
	}else if(message.content._lctype==-3){
		//showTip(formatTime(message.timestamp));
		showLog(cid,encodeHTML(from),avatar,createAudio(message.content._lcfile.url),isBefore);
	}
	
  }

}

// 拉取历史
bindEvent(printWall, 'scroll', function(e) {
  if (printWall.scrollTop < 20) {
    getLog();
  }
});

// 获取消息历史
function getLog(callback) {
  var height = printWall.scrollHeight;
  if (logFlag) {
    return;
  } else {
    // 标记正在拉取
    logFlag = true;
  }
  messageIterator.next().then(function(result) {
    var data = result.value;
    logFlag = false;
    // 存储下最早一条的消息时间戳
    var l = data.length;
    if (l) {
      msgTime = data[0].timestamp;
    }
    for (var i = l - 1; i >= 0; i--) {
      showMsg(data[i],'isBefore');
    }
    if (l) {
      printWall.scrollTop = printWall.scrollHeight - height;
    }
    if (callback) {
      callback();
    }
  }).catch(function(err) {
    console.error(err);
  });
}

// 用户信息输出
function showLog(userId,userName,userAvatar,userMsg,isBefore) {
  var isme = (userName == user.clientId) ? true : false;
  var contentDiv = '<div class="user-content">'+userMsg+'</div>';
  var avatarDiv = '';
	  avatarDiv += '<div class="avatar-box">';
	  avatarDiv += '<span>'+userName+'</span>';
	  avatarDiv += '<img class="avatar" src='+ userAvatar + '>';
	  avatarDiv += '</div>';
  var section = document.createElement('section');
  
  if(isme){
	  section.className = 'user';
	  section.innerHTML = contentDiv + avatarDiv;
  } else {
	  section.className = 'service';
	  section.innerHTML = avatarDiv + contentDiv;
  }
  if (isBefore) {
    printWall.insertBefore(section, printWall.childNodes[0]);
  } else {
    printWall.appendChild(section);
  }
  
  printWall.scrollTop = printWall.scrollHeight;

}

//添加系统消息提示
function showTip(msg) {
	var html = '';
	html += '<div class="msg-system">';
	html += msg;
	html += '</div>';
	var section = document.createElement('div');
	section.className = 'system-tip';
	section.innerHTML = html;
	printWall.appendChild(section);	
	window.scrollTo(0, this.printWall.clientHeight);
}


function encodeHTML(source) {
  return String(source)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\/g,'&#92;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function formatTime(time) {
  var date = new Date(time);
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hh + ':' + mm + ':' + ss;
}

function createLink(url) {
  return '<a target="_blank" href="' + encodeHTML(url) + '">' + encodeHTML(url) + '</a>';
}

function createImg(url) {
  return '<img src=' + encodeHTML(url) + '>';
}

function createAudio(url) {
  return '<div class="audio-box"><audio src=' + encodeHTML(url) + ' ></audio></div>';
}

function bindEvent(dom, eventName, fun) {
  if (window.addEventListener) {
    dom.addEventListener(eventName, fun);
  } else {
    dom.attachEvent('on' + eventName, fun);
  }
}
