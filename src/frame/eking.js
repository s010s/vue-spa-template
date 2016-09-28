
/*
 * 禁用所有alert
 *
 * 生产发布要开启下行代码
 * 需要用alert调试时可暂时注释掉此处
 */
/*if (config.getIsPorduction()) {
  window.alert = function() {
    return;
  };
}*/
//TODO

/*//页面dom结构完成后的事件
eking.page.onReady = function() {};

// cordova加载完成后执行的事件
eking.page.onLoad = function() {};

//页面遇到脚本错误时候的事件
eking.page.onError = function(_msg, _url, _line) {
  alert("Error:" + _msg + _url + "     Line:" + _line);
};

//Dom结构加载完成
$(function() {
  //页面报错时候执行
  window.onerror = function(_msg, _url, _line) {
    eking.page.onError(_msg, _url, _line);
  };

  //dom结构加载完成执行
  eking.page.onReady();
});*/

/*//页面完整加载完成
window.onload = function() {
  // 监听cordova准备设备事件
  document.addEventListener("deviceready", function() {
    // cordova核心已加载完成
    eking.page.onLoad();
  }, false);
};

// cordova加载完成事件
eking.deviceready = function(_callback) {
  document.addEventListener("deviceready", function() {
    return _callback();
  });
};*/

/*=========================== 页面加载 结束 ===========================*/

/************************************************************************
 *                              API 定义                                *
 ***********************************************************************/
/*=============================== Page ================================*/
/*
 *  页面切换
 * 
 * _url<string>: 要切换页面的相对路径
 * _params<json object>: 页面传递的参数
 * _slideType<string>: 页面切换动画选项
 *             right: 向右侧滑出
 *             bottom: 从底部弹出
 * _ifPreLoad<boolean>: 切换页面是否需要提前加载
 *             false: 先切换再加载页面，可能有闪白；
 *             true<默认值>: 先加载再切换页面，可能有顿挫；
 */

var eking = {};

var loadUrlLocker = false; // 连击锁，false为关闭，true为开启
eking.loadUrl = function(_url, _params, _slideType, _ifPreLoad) {
  if (!loadUrlLocker) {
    loadUrlLocker = true; // 先锁住
    if (typeof(_url) == "undefined") {
      alert("url is necessary!");
      return;
    }
    _params = _params || {};
    _slideType = _slideType || "right";
    if (_url.startWith("http://") || _url.startWith("https://") || _url.startWith(
        "file://") || _url.startWith("/")) {
      // 绝对路径不做处理，直接用
    } else {
      // 处理相对路径
      var selfUrl = window.location.href;
      var lio = selfUrl.lastIndexOf("/");
      _url = selfUrl.substring(0, lio) + "/" + _url;
    }

    // ifPreLoad默认值为true：先加载再切换页面
    if (typeof(ifPreLoad) == "undefined") {
      _ifPreLoad = true;
    }

    Cordova.exec(null, null, "Page", "loadUrl", [_url, _params, _slideType, _ifPreLoad]);
    // 触发后一定时间内停止对loadUrl的响应，防止连击
    setTimeout(function() {
      loadUrlLocker = false; // 解除锁
    }, 1500);
  }

};

/*
 * 返回上级页面，并可以在目标页面执行javascript代码
 *
 * INPUT
 * _callBackJs<string>: 回调执行javascript代码，所有引用必须在目标页面提前定义
 * _jumpPage<int>: 返回页面层级数
 *                 0: 只跳转到上一级页面
 *                 1: 跳转到上两级页面，以此类推...
 *
 * 可以只传第二个参数，会自动转换为跳转层级数目，
 * 如eking.back(1)，即向上返回两级页面不执行javascript代码;
 */
eking.back = function(_callBackJs, _jumpPage) {
  // 如果第一个参数为数字，则设置为回调页面个数
  if (typeof _callBackJs == "number") {
    _jumpPage = _callBackJs;
    _callBackJs = "";
  }
  if (typeof _callBackJs == "undefined") {
    _callBackJs = "";
  }
  if (typeof _jumpPage == "undefined") {
    _jumpPage = 0;
  }
  if ($.isFunction(_callBackJs)) {
    _callBackJs = "(" + _callBackJs.toString() + ")()";
  }

  Cordova.exec(null, null, "Page", "back", [_callBackJs, _jumpPage]);
};

/*
 * 获取页面传递的参数
 *
 * OUTPUT
 * _callback(jsonObj): 返回上个页面传递参数
 */
eking.getPageParams = function(_callback) {
  var success = function(result) {
    if (typeof result === "string") {
      // 将返回值转换成json对象
      _callback($.parseJSON(result));
    } else {
      _callback(result);
    }
  };
  Cordova.exec(success, null, "Page", "getPageParams", []);
};

/*
 * 刷新当前页面
 * 
 * 刷新时页面会闪白，不推荐使用
 */
eking.refresh = function() {
  Cordova.exec(null, null, "Page", "refresh", []);
};

/*
 * 清除页面堆栈
 */
eking.clearPageStack = function() {
  Cordova.exec(null, null, "Page", "clearPageStack", []);
};

/*============================ ExtendApp ==============================*/
/*
 * 显示悬浮提示信息
 */
eking.hint = function(_message) {
  _message = _message || "";
  Cordova.exec(null, null, "ExtendApp", "hint", [_message, "bottom"]);
};

/*
 * 保存运行时变量
 */
eking.setRuntimeVariable = function(_key, _value) {
  _key = _key || "";
  _value = _value || "";
  var appId = config.getAppId();
  Cordova.exec(null, null, "ExtendApp", "setRuntimeVariable", [appId + _key, _value]);
};

/*
 * 读取运行时变量
 */
eking.getRuntimeVariable = function(_key, _callback) {
  _key = _key || "";
  var appId = config.getAppId();
  Cordova.exec(_callback, null, "ExtendApp", "getRuntimeVariable", [appId + _key]);
};

/*
 * 根据key移除某个运行时变量
 */
eking.removeRuntimeVariable = function(_key) {
  _key = _key || "";
  var appId = config.getAppId();
  Cordova.exec(null, null, "ExtendApp", "removeRuntimeVariable", [appId + _key]);
};

/*
 * 保存持久变量
 */
eking.setPersistentVariable = function(_key, _value) {
  _key = _key || "";
  _value = _value || "";
  var appId = config.getAppId();
  Cordova.exec(null, null, "ExtendApp", "setPersistentVariable", [appId + _key, _value]);
};

/*
 * 读取持久变量
 */
eking.getPersistentVariable = function(_key, _callback) {
  _key = _key || "";
  var appId = config.getAppId();
  Cordova.exec(_callback, null, "ExtendApp", "getPersistentVariable", [appId + _key]);
};

/*
 * 根据key移除某个持久变量
 */
eking.removePersistentVariable = function(_key) {
  _key = _key || "";
  var appId = config.getAppId();
  Cordova.exec(null, null, "ExtendApp", "removePersistentVariable", [appId + _key]);
};

/*
 * 对话框控件
 *
 * INPUT
 * _jsonString<string>: 备选项,必须为json对象格式的字符串
 * 例如：
 *   {"key":"apple", "value":"苹果"},
 *   {"key":"banana", "value":"香蕉"},
 *   {"key":"orange", "value":"橘子"}
 */
eking.getSelect = function(_jsonString, _success) {
  _jsonString = _jsonString || "";
  Cordova.exec(_success, null, "ExtendApp", "getSelect", ['{"Select":[' + _jsonString + ']}']);
};

/*
 * 获取app相关信息
 * 
 * OUTPUT
 * _callback(res<json object>)
 * res={
 *   "id":"com.hna.eking",
 *   "versionCode":"1.0.1"
 * }
 */
eking.getAppInfo = function(_callback) {
  Cordova.exec(_callback, null, "ExtendApp", "getInfo", []);
};

/*
 * 获取设备相关信息
 * 
 * OUTPUT
 * _callback(res<json object>)
 * res={
 *   "id":"设备ID"
 * }
 */
eking.getDeviceInfo = function(_callback) {
  Cordova.exec(_callback, null, "ExtendApp", "getDeviceInfo", []);
};

/*
 * 获取设备的尺寸
 * 
 * OUTPUT
 * _callback(res<json object>)
 * res = {
 *   "width":"320",
 *   "height":"568"
 * }
 */
eking.getScreenSize = function(_success) {
  Cordova.exec(_success, null, "ExtendApp", "getSize", []);
};

/*
 * 判断文件是否存在
 * 
 * INPUT
 * _fileName: 文件名
 * _extension: 文件后缀名，如"doc"
 */
eking.ifFileExist = function(_fileName, _extension, _callback) {
  _fileName = _fileName || "";
  _extension = _extension || "";
  Cordova.exec(_callback, null, "ExtendApp", "ifFileExist", [_fileName, _extension]);
};

/*
 * 打开文件
 * 
 * INPUT
 * _fileName<string>: 文件名
 * _extension<string>: 文件后缀名，如"doc"
 * _title<string>: 界面显示标题文字
 * _titleColor<string>: 界面标题文字颜色，如"#3aa44d"
 * _headerColor<string>: header底色，如"#3aa44d"
 */
eking.openFile = function(_fileName, _extension, _title, _titleColor, _headerColor) {
  _fileName = _fileName || "";
  _extension = _extension || "";
  _title = _title || "";
  _titleColor = _titleColor || "";
  _headerColor = _headerColor || "";
  Cordova.exec(null, null, "ExtendApp", "openFile", [_fileName, _extension, _title, _titleColor, _headerColor]);
};

/*
 * 保存文件
 * 
 * INPUT
 * _fileName<string>: 文件名，该文件名必须唯一，否则会覆盖，建议使用GUID命名
 * _extension<string>: 文件后缀名，如"doc"
 * _base64String<string>: 文件base64串
 */
eking.saveFile = function(_fileName, _extension, _base64String, _callback) {
  _fileName = _fileName || "";
  _extension = _extension || "";
  _base64String = _base64String || "";
  Cordova.exec(_callback, null, "ExtendApp", "saveFile", [_fileName, _extension, _base64String]);
};

/*
 * 移除文件
 * 
 * INPUT
 * _fileName<string>: 文件名
 * _extension<string>: 文件后缀名，如"doc"
 */
eking.removeFile = function(_fileName, _extension, _callback) {
  _fileName = _fileName || "";
  _extension = _extension || "";
  Cordova.exec(_callback, null, "ExtendApp", "removeFile", [_fileName, _extension]);
};

/* 
 * 移除所有文件
 */
eking.clearFiles = function(_callback) {
  Cordova.exec(_callback, null, "ExtendApp", "clearFiles", []);
};

/*
 * 弹出二维码扫描界面
 * 
 * OUTPUT
 * _callback(res<string>)
 * res:扫描出的内容字符串
 */
eking.QRCodeScan = function(_callback) {
  Cordova.exec(_callback, null, "ExtendApp", "QRCodeScan", []);
};

/*============================ PhonePlugin ==============================*/
/*
 * 打开发送短信界面
 *
 * INPUT
 * _phoneNum: 对方电话号码
 * _message: 要填写的短信内容
 */
eking.sendSms = function(_phoneNum, _message) {
  _phoneNum = _phoneNum || "";
  _message = _message || "";
  Cordova.exec(null, null, "PhonePlugin", "sms", [_phoneNum, _message]);
};

/*
 * 拨打电话
 *
 * INPUT
 * _phoneNum: 对方电话号码
 */
eking.dial = function(_phoneNum) {
  _phoneNum = _phoneNum || "";
  Cordova.exec(null, null, "PhonePlugin", "dial", [_phoneNum]);
};

/*
 * 获取定位信息
 * 
 * OUTPUT
 * _callback(res<json object>)
 * res = {
 *         "Longitude":20.12552,
 *         "Latitude":135.125431,
 *         "CityCode":"125",
 *         "Time":"2015-09-25 11:24:38",
 *         "City":"海口市"
 *       }
 */
eking.getLocation = function(_callback) {
  Cordova.exec(_callback, null, "PhonePlugin", "getLocation", []);
};

/*
 * 打开原生定位信息界面，并获取定位信息
 * 
 * OUTPUT
 * _callback(res<json object>)
 * res = {
 *         "city":"海口市",
 *         "landmark":"苏荷酒吧海口店",
 *         "address":"龙华区国贸路36号嘉陵大厦1楼"
 *       }
 */
eking.openLocationPage = function(_callback) {
  Cordova.exec(_callback, null, "PhonePlugin", "openLocationPage", []);
};

/*============================ DateTimePicker ==============================*/

/*
 * 弹出日期选择控件
 * 
 * INPUT
 * _defaultDate<string>: 弹出时默认显示日期(yyyy-mm-dd)，如"2015-04-14"
 * 
 * OUTPUT
 * _callback(res<string>)
 * res = "2015-05-21"
 */
eking.selectDate = function(_callback, _defaultDate) {
  var toDate = new Date();
  var year = toDate.getFullYear();
  var month = toDate.getMonth() + 1;
  var day = toDate.getDate();
  _defaultDate = _defaultDate || year + "-" + month + "-" + day;
  Cordova.exec(_callback, null, "DateTimePicker", "selectDate", [_defaultDate]);
};

/*
 * 时间选择
 * 
 * INPUT
 * _defaultTime<string>: 弹出时默认显示时间(hh:mm)，如"18:43"
 * 
 * OUTPUT
 * _callback(res<string>)
 * res = "20:45"
 */
eking.selectTime = function(_callback, _defaultTime) {
  var toDate = new Date();
  var hour = toDate.getHours();
  var minute = toDate.getMinutes();
  _defaultTime = _defaultTime || hour + ":" + minute;
  Cordova.exec(_callback, null, "DateTimePicker", "selectTime", [_defaultTime]);
};

/*============================ HNANetWorkPlugin ==============================*/
// 调用微平台接口
eking.invoke = function(_successCallback, _errorCallback, _RTNo, _Params) {
  _RTNo = _RTNo || "";
  _Params = _Params || "";

  Cordova.exec(function(res) {
    // 需要更新工作台的接口名列表
    var workBenchUpdateList = {
      "Add_Schedule": "新增日程",
      "Revise_Schedule": "修改日程",
      "ReviseScheduleIsDeketed": "删除日程",
      "SetExchangeMeetingStatus": "设置会议状态(接受,拒绝,取消)"
    };
    if (_RTNo in workBenchUpdateList) {
      doudou.updateCalendarMessage(); // 更新工作台
    }

    return _successCallback(res);
  }, _errorCallback, "HNANetWorkPlugin", "invoke", [_RTNo, _Params]);
};

/* ===========================utils=================================== */
/*
 * 判断是否在PC上
 */
eking.isPC = function() {
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

/**
 * 获取平台类型：
 * 
 * OUTPUT
 * res<int>:
 *   1: Android
 *   2: iOS
 */
eking.getPlatformType = function() {
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array("Android", "iPhone", "iPad", "iPod", "SymbianOS", "Windows Phone");
  if (userAgentInfo.indexOf(Agents[0]) > 0) {
    // Android
    return 1;
  } else if (userAgentInfo.indexOf(Agents[1]) > 0 || userAgentInfo.indexOf(Agents[2]) > 0 || userAgentInfo.indexOf(Agents[3]) > 0) {
    // iOS
    return 2;
  }
};

/*
 * 判断原字符串是否以所传字符串为起始
 */
String.prototype.startWith = function(_str) {
  if (_str == "undefined") {
    return false;
  }
  var reg = new RegExp("^" + _str);
  return reg.test(this);
};

/*
 * 用浏览器打开超链接，链接必须以http或https开头
 */
eking.openBrowser = function(_url) {
  _url = _url || "";
  if (_url.length > 1) {
    _url = _url.toLowerCase();
    // 强制加上http前缀,不推荐
    if ((!_url.startWith('http://')) && (!_url.startWith('https://'))) {
      _url = "http://" + _url;
    }
    window.open(_url, "_system", "location=yes");
  }
};

/* ========================= navigator ============================== */
/*
 * 弹出提示框
 * 
 * INPUT
 * _title: 标题文字
 * _message: 提示信息文字
 * _buttonName: 按钮显示文字
 */
eking.alert = function(_title, _message, _buttonName, _callback) {
  _title = _title || "提示";
  _title = _title.toString();
  _buttonName = _buttonName || "确定";
  _buttonName = _buttonName.toString();
  if (typeof(_message) == "object") {
    _message = JSON.stringify(_message);
  }
  _message = _message || "";
  _message = _message.toString();

  navigator.notification.alert(_message, _callback, _title, _buttonName);
};

/*
 * 弹出确认框
 * 
 * INPUT
 * _title: 标题文字
 * _message: 提示信息文字
 * _buttonNames: 按钮显示文字，多个按钮用英文逗号分隔，如："撤回,取消"
 *
 * OUTPUT
 * _callback(res<string>)
 * res: 所点击的按钮下标，从左至右，从1开始
 */
eking.confirm = function(_title, _message, _buttonNames, _callback) {
  _title = _title || "提示";
  _message = _message || "";
  _buttonNames = _buttonNames || "确认,取消";
  navigator.notification.confirm(_message, _callback, _title, _buttonNames);
};

/*
 * 拍照，并返回照片Base64字符串
 *
 * OUTPUT
 * _success(res<string>): 照片Base64字符串
 */
eking.getFromCamera = function(_success, _error) {
  navigator.camera.getPicture(_success, _error, {
    destinationType: navigator.camera.DestinationType.DATA_URL,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    targetWidth: $(window).width(),
    targetHeight: $(window).height(),
    encodingType: Camera.EncodingType.PNG,
    quality: 50
  });
};

/*
 * 从相册/相片库获取，并返回照片Base64字符串
 *
 * OUTPUT
 * _success(res<string>): 照片Base64字符串
 */
eking.getFromPhotoLibrary = function(_success, _error) {
  navigator.camera.getPicture(_success, _error, {
    destinationType: navigator.camera.DestinationType.DATA_URL,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    quality: 50
  });
};

/*
 * 设备声音提醒
 * 
 * INPUT
 * _times: 鸣响次数，缺省为1
 */
eking.beep = function(_times) {
  _times = _times || 1;
  navigator.notification.beep(_times);
};

/*
 * 设备震动提醒
 * 
 * INPUT
 * _mills: 震动时长，单位为毫秒，缺省为300
 */
eking.vibrate = function(_mills) {
  _mills = _mills || 300;
  navigator.notification.vibrate(_mills);
};


module.exports = eking
