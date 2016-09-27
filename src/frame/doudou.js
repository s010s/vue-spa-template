/*
 * doudou.js 
 * version: V1.1
 * update date: 2016.02.23
 * author: qi.li5
 */

var doudou = {};

/*
 * 退出兜兜轻应用
 */
doudou.exitLightApp = function() {
  Cordova.exec(null, null, "ExtendApp", "ExitLightApp", []);
};

/* 
 * 获取兜兜服务器日期时间
 * 
 * OUTPUT
 * _callback(res<json object>)
 * res = {
 *   "date": "2015/08/15",
 *   "hours": "23",
 *   "minutes": "34",
 *   "seconds": "02",
 *   "fullDate": "2015/08/15 23:34:02"
 * }
 */
doudou.getServerDateTime = function(_callback) {
  eking.invoke(function(res) {
    var domParser = new DOMParser();
    var xmlDoc = domParser.parseFromString(res, 'text/xml');
    var jsonString = xmlDoc.getElementsByTagName('date')[0].childNodes[0].nodeValue;
    var jsonObj = $.parseJSON(jsonString);
    _callback(jsonObj);
  }, null, 'GetServerDateTime', '');
};

/* 
 * 获取兜兜登录账号信息
 *
 * OUTPUT
 * _callback(res<json object>)
 * res = 
 * {
 *   "account" : "zhang.san",
 *   "name" : "张三",
 *   "number" : "1000123456"
 * }
 */
doudou.getLoginInfo = function(_callback) {
  Cordova.exec(_callback, null, "Page", "getLoginInfo", []);
};

/*
 * 获取兜兜头像图片文件Base64字符串，后缀为png
 *
 * INPUT
 * _account: 用户账号
 * 
 * OUTPUT
 * _callback(res<string>)
 * res: 图片Base64字符串
 */
doudou.getAvatarBase64Old = function(_account, _callback) {
  if (_account && _account !== null && _account.length > 0) {
    Cordova.exec(_callback, null, "Page", "getAvatarBase64", [_account]);
  }
};

/*
 * 获取兜兜头像图片文件Base64字符串，后缀为png
 * [INPUT]
 * _account<string>: 域账号或员工编号
 * _accountType<string>:标识_account的类别。
 *   枚举值(2种)："account"-域账号类别；"number"-员工编号类别；
 * [OUTPUT]
 * callback(res<json object>)
 * res={
 *   "account" : "域账号/员工编号",
 *   "Base64String" : "Base64字符串" // 没有头像为空串
 * }
 */
doudou.getAvatarBase64 = function(_account, _accountType, _callback) {
  _account = _account || "";
  _accountType = _accountType || "account";
  if (_account.length > 0) {
    if (_accountType.length > 0) {
      Cordova.exec(_callback, null, "Page", "getAvatarBase64", [_account, _accountType]);
    }
  }
};

/*
 * 一键拉起群组聊天
 *
 * INPUT
 * _params: 聊天初始化参数
 * _params = 
 * {
 *   amount: "3",  >> 账号总数
 *   accounts:     >> 账号列表
 *   {
 *     account: "qi.li5",   >> 第一个账号为发起人
 *     account: "zhang_san4",
 *     account: "li-si",
 *     ...
 *   },
 *   title:"此处为聊天群组标题，最多20字",
 *   description: "此处为文字描述，最多200字",
 *   type: "群组类型"
 * }
 *
 * 群组类型type枚举值：
 * TYPE_TEXT  聊天群（纯文本）
 * TYPE_VIDEO 聊天群（视频）
 * TYPE_AUDIO 聊天群（语音）
 */
doudou.startDoudouGroupChat = function(_params, _callback) {
  Cordova.exec(_callback, null, "Doudou", "startDoudouGroupChat", [_params]);
};

doudou.startDoudouGroup = function(_params, _callback) {
  Cordova.exec(_callback, null, "Doudou", "startDoudouGroup", [_params]);
};

/*
 * 弹出个人信息原生界面
 *
 * INPUT
 * _account: 用户账号
 */
doudou.showPersonalInfoPanel = function(_account) {
  Cordova.exec(null, null, "Doudou", "showPersonalInfoPanel", [_account]);
};

/*
 * 打开海航文件
 *
 * INPUT
 * paramJson<json object>=
 * {
 *   "id": "", // 文件ID
 *   "title" : "",  // 文件标题
 *   "source" : "1" // 文件来源，枚举： 1：文件 2：通告 3：今日海航
 * }
 */
doudou.openHnaDoc = function(_id, _title, _source, _callback) {
  var paramJson = {
    "id": _id, // 文件ID
    "title": _title, // 文件标题
    "source": _source // 文件来源，枚举： 1：文件 2：通告 3：今日海航
  };
  Cordova.exec(_callback, null, "Doudou", "openHnaDoc", [paramJson]);
};

/*
 * 获取当前轻应用信息
 *
 * OUTPUT
 * res<json object>=
 * {
 *   "lightAppID":"XX-XXX-XX",// 当前轻应用ID
 *   "lightAppVersionNo":"1.2.1.8" // 当前轻应用版本号
 * }
 */
doudou.getLightAppInfo = function(_callback) {
  Cordova.exec(_callback, null, "Doudou", "getLightAppInfo", []);
};

/*
 * 兜兜消息转发
 *
 * INPUT
 * _msgType<string>: 消息类型,收藏夹中的聊天记录消息: "1001"
 * _msg<string>: 消息内容
 */
doudou.msgForward = function(_msgType, _msg, _callback) {
  var request = {
      "msgType": _msgType, // 转发类型，不同的msgType，对应不同的消息_msg内容格式
      "msg": _msg // 要转发的消息内容
    }
    // alert(JSON.stringify(request));
  Cordova.exec(_callback, null, "Doudou", "msgForward", [request]);
};

/*
 * 获取兜兜登录密码(加密)
 *
 * OUTPUT
 * 回调 callback(res<json object>)
 * res = {
 *   "pwd": "" // 动态加密后的密码串
 * }
 */
doudou.getLoginPassword = function(_callback) {
  Cordova.exec(_callback, null, "Doudou", "getEncryptedLoginPassword", []);
};

/*
 * 打开兜兜人员,机构选择面板
 *
 * INPUT
 * _enablePerson<bool>  true:可选人员;false不可选人员
 * _personArray<array>  人员列表,元素:
 *                                  [{
 *                                    "id": "qi.li5" // 人员域账号
 *                                    "name": "李奇", // 人员中文名
 *                                  }, {...}, ...]
 * _enableOrgan<bool>   true:可选机构;false不可选机构
 * _organArray<array>   机构列表,元素:
 *                                  [{
 *                                    "id": "60134" // 机构ID
 *                                    "name": "云服务事业部", // 机构中文名
 *                                  }, {...}, ...]
 */
doudou.openSelectPanel = function(_enablePerson, _personArray, _enableOrgan, _organArray, _callback) {
  _enablePerson = _enablePerson || false;
  _personArray = _personArray || [];
  _enableOrgan = _enableOrgan || false;
  _organArray = _organArray || [];

  var option = {
    "limit": "100",
    "hnaPerson": {
      "enable": _enablePerson ? "1" : "0",
      "list": _enablePerson ? _personArray : []
    },
    "hnaOrgan": {
      "enable": _enableOrgan ? "1" : "0",
      "list": _enableOrgan ? _organArray : []
    }
  };

  Cordova.exec(_callback, null, "Doudou", "selectPanel", [option]);
};

/*
 * 打开人员选择界面
 * 
 */
doudou.openPersonSelectPanel = function(_personArray, _callback) {
  doudou.openSelectPanel(true, _personArray, false, [], _callback);
};

/*
 * 打开机构选择界面
 * 
 */
doudou.openOrganSelectPanel = function(_organArray, _callback) {
  doudou.openSelectPanel(false, [], true, _organArray, _callback);
};

/*
 * 打开人员和机构选择界面
 * 
 */
doudou.openPersonOrganSelectPanel = function(_personArray, _organArray, _callback) {
  doudou.openSelectPanel(true, _personArray, true, _organArray, _callback);
};

/**
 * 根据类型刷新对应的兜兜消息列表
 */
doudou.updateMessagePanel = function(_key) {
  var option = {
    key: _key
  };
  Cordova.exec(null, null, "Doudou", "updateMessagePanel", [option]);
};

// 刷新工作台中日历列表
doudou.updateCalendarMessage = function() {
doudou.updateMessagePanel("WORKBENCH_CALENDAR");
};

module.exports = doudou