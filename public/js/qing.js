/* generated @ 2018-10-31 15:09:08*/
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* exports provided: log, warn */
/* exports used: warn, log */
/*!*************************************!*\
  !*** ./src/entrys/qing/libs/log.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return warn; });
var log = function log(_log) {
  console && console.log("[Qing] " + _log);
};

var warn = function warn(log) {
  console && console.warn("[Qing] " + log);
};

/***/ }),
/* 1 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./src/entrys/qing/client/api/getTicket.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_ajax__ = __webpack_require__(/*! ../../libs/ajax */ 3);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var ERR_PARAM = '参数错误';
var ERR_GET_TICKET = '鉴权失败';
var ERR_GET_SIGN = '获取签名失败';
var ERR_INVALID_SIGN = '签名信息错误';

/* harmony default export */ __webpack_exports__["a"] = (function (global, opt) {
  function getTicketBySign(sign, _success, _error) {
    if (!sign || !sign.appId || !sign.timeStamp || !sign.nonceStr || !sign.signature) return _error(ERR_INVALID_SIGN);

    global.call('runtime.auth', _extends({}, sign, {
      success: function success(res) {
        if (typeof res.success === 'string') {
          res.success = res.success === 'true';
        }
        if (res.success) {
          _success && _success(res);
        } else {
          _error && _error(ERR_GET_TICKET);
        }
      },
      error: function error(e) {
        _error && _error(ERR_GET_TICKET);
      }
    }));
  }

  if (typeof opt.success !== 'function') return;

  if (opt.appId && opt.timeStamp && opt.nonceStr && opt.signature) {
    getTicketBySign(opt, opt.success, opt.error);
  } else if (opt.signUrl) {
    var currentUrl = encodeURIComponent(location.href.split('#')[0]);

    if (/^file:/.test(location.href)) {
      currentUrl = encodeURIComponent(location.href.replace(/file:\/\//, ''));
    }

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libs_ajax__["a" /* default */])({
      url: opt.signUrl.replace(/\?|$/, '?url=' + currentUrl + '&').replace(/\&$/, ''),
      method: opt.signMethod || 'post',
      success: function success(res) {
        if (!res || !res.success || !res.data) {
          opt.error && opt.error(ERR_GET_SIGN);
          return;
        }

        var sign = res.data;

        if (typeof opt.signFormat === 'function') {
          sign = opt.signFormat(sign);
        }

        getTicketBySign(sign, opt.success, opt.error);
      },
      error: function error(_error2) {
        opt.error && opt.error(ERR_GET_SIGN);
      }
    });
  } else {
    opt.error && opt.error(ERR_PARAM);
  }
});

/***/ }),
/* 2 */
/* exports provided: default */
/* exports used: default */
/*!***********************************************!*\
  !*** ./src/entrys/qing/client/api/storage.js ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_encode__ = __webpack_require__(/*! ../../libs/encode */ 15);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["a"] = (function (global, bridge, method, params) {
  params = params || {};

  var success = params.success;
  var error = params.error;

  delete params.success;
  delete params.error;

  if (typeof success !== 'function') {
    success = function success() {};
  }

  if (typeof error !== 'function') {
    error = function error() {};
  }

  if (global.checkJsApi('storage')) {
    if (method === 'storage.setItem') {
      params = _extends({}, params, {
        value: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libs_encode__["a" /* encode */])(params.value)
      });
    }

    bridge.call(method, params, function (e) {
      e = e || {};
      e.data = e.data || {};
      if (e.success === 'true' || e.success === true) {
        if (method === 'storage.getItem') {
          e.data.value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libs_encode__["b" /* decode */])(e.data.value);
        }

        success(e.data.value);
      } else {
        error();
      }
    });
  } else if (window.localStorage) {
    var key = 'clientStorage_' + params.key;

    switch (method) {
      case 'storage.getItem':
        success(localStorage.getItem(key));
        break;
      case 'storage.setItem':
        localStorage.setItem(key, params.value);
        success();
        break;
      case 'storage.removeItem':
        localStorage.removeItem(key);
        success();
        break;
    }
  } else {
    error();
  }
});

/***/ }),
/* 3 */
/* exports provided: default */
/* exports used: default */
/*!**************************************!*\
  !*** ./src/entrys/qing/libs/ajax.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ERR_JSON_PARSE = 'JSON解析失败';

/* harmony default export */ __webpack_exports__["a"] = (function (opt) {
  var xhr = new XMLHttpRequest();
  var reg = /^(2\d{2}|304)$/;
  var postData;
  var encode = function encode(data) {
    var e = encodeURIComponent;
    if (typeof data === 'string' || !data) return data;
    return Object.keys(data).map(function (k) {
      return e(k) + '=' + e(data[k]);
    }).join('&');
  };

  opt.method || (opt.method = 'GET');
  opt.error || (opt.error = function () {});
  opt.success || (opt.success = function () {});

  xhr.open(opt.method, opt.url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (reg.test(xhr.status)) {
        try {
          opt.success(JSON.parse(xhr.responseText), xhr);
        } catch (e) {
          opt.error(ERR_JSON_PARSE);
        }
      } else {
        opt.error(xhr.responseText);
      }
    }
  };

  opt.headers = opt.headers || {};

  if (opt.serializer === 'json') {
    postData = JSON.stringify(opt.data);
    opt.headers['Content-type'] = 'application/json; charset=utf-8';
  } else {
    postData = encode(opt.data);
    opt.headers['Content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';
  }

  opt.headers && Object.keys(opt.headers).forEach(function (key) {
    xhr.setRequestHeader(key, opt.headers[key]);
  });

  xhr.send(postData);
});

/***/ }),
/* 4 */
/* exports provided: extend */
/* exports used: extend */
/*!****************************************!*\
  !*** ./src/entrys/qing/libs/object.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extend;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function extend() {
    var args = arguments,
        deep = false,
        dest;
    if (typeof args[0] === 'boolean') {
        deep = Array.prototype.shift.call(args);
    };
    dest = Array.prototype.shift.call(args);
    Array.prototype.forEach.call(args, function (src) {
        Object.keys(src).forEach(function (key) {
            if (deep && _typeof(src[key]) === 'object' && _typeof(dest[key]) === 'object') {
                extend(true, dest[key], src[key]);
            } else if (typeof src[key] !== 'undefined') {
                dest[key] = src[key];
            };
        });
    });
    return dest;
}

/***/ }),
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/entrys/qing/npm.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

;(function (global, undefined) {
  if (global.qing && global.qing.version) {
    return;
  }

  var qing = global.qing || (global.qing = {});

  qing.version = "0.0.8";
  qing.isReady = false;
  qing.debug = false;

  var ua = navigator.userAgent.toLowerCase();

  var dmatcher = ua.match(/Qing\/(\d+(?:\.\d+)*)/i) || ua.match(/App\/cloudhub \d+\/(\d+(?:\.\d+)*)/i);

  var isSupportNativeJsBridge = dmatcher;

  if (isSupportNativeJsBridge) {
    qing.nativeJsBridgeVersion = dmatcher[1];
  }

  qing.isSupportNativeJsBridge = !!isSupportNativeJsBridge;

  __webpack_require__(/*! ./api */ 6).init(qing);
  __webpack_require__(/*! ./browser-detect */ 7).init(qing);
  __webpack_require__(/*! ./xuntong */ 16).init(qing);

  if (isSupportNativeJsBridge) {
    if (qing.isDesktop) {
      if (parseInt(qing.nativeJsBridgeVersion.replace(/\./g, '')) > 3) {
        if (!global.__hasQingDesktop) {
          __webpack_require__(/*! ./client/desktop */ 9);
        }
      } else {
        if (!global.__hasQingDesktopLE3) {
          __webpack_require__(/*! ./client/desktop-le-0.0.3 */ 8);
        }
      }
    } else if (qing.checkVersion('0.9.50')) {
      if (!global.__hasQingMobile) {
        __webpack_require__(/*! ./client/mobile */ 11);
      }
    } else {
      if (!global.__hasQingMobile) {
        __webpack_require__(/*! ./client/mobile-early */ 10);
      }
    }
  } else if (qing.isWX) {} else {
    if (!global.__hasQingWeb) {
      __webpack_require__(/*! ./client/web */ 12);
    }
  }
})(window);

/***/ }),
/* 6 */
/* exports provided: init */
/* all exports used */
/*!********************************!*\
  !*** ./src/entrys/qing/api.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_log__ = __webpack_require__(/*! ./libs/log */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_args__ = __webpack_require__(/*! ./libs/args */ 13);
/* harmony export (immutable) */ __webpack_exports__["init"] = init;



var dispatchEvent = function dispatchEvent(name, params) {
  var event = document.createEvent('HTMLEvents');
  if (params) {
    for (var k in params) {
      event[k] = params[k];
    }
  }
  event.initEvent(name);
  document.dispatchEvent(event);
};

function init(global) {
  var doc = document;
  var hasListenJsEventList = [];

  global.once = function (name, callback) {
    var fn = function fn() {
      global.off(name, fn);
      callback && callback();
    };
    global.on(name, fn);
  };

  var ready = global.ready = global._bridge ? function (cb) {
    cb && cb();
  } : function (callback) {
    var fun = function fun() {
      callback();
      doc.removeEventListener('QingReady', fun);
    };
    doc.addEventListener('QingReady', fun);
  };

  global.config = function (data) {
    global.debug = !!data.debug;

    ready(function () {
      global._bridge.config(data);
    });(data.jsEventList || []).forEach(function (name) {
      if (hasListenJsEventList.indexOf(name) != -1) return;

      hasListenJsEventList.push(name);
      global.on(name, function (data) {
        dispatchEvent(name, {
          data: data
        });
      });
    });
  };

  global.error = function (cb) {
    global.on('error', cb);
  };

  var apis = ['call', 'off', 'on', 'checkJsApi', 'trigger'];
  apis.forEach(function (name) {
    global[name] = function () {
      var _args = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__libs_args__["a" /* default */])(arguments);
      ready(function () {
        global[name].apply(global, _args);
        _args = null;
      });
    };
  });

  ready(function () {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libs_log__["b" /* log */])('Ready');
    global.isReady = true;
    var _bridge = global._bridge;

    var mapApi = function mapApi(name) {
      global[name] = _bridge[name];
    };
    apis.forEach(mapApi);

    global.ready = function (cb) {
      cb && cb();
    };
  });

  global.error = function (cb) {
    global.on('error', cb);
  };

  global.checkVersion = function (target) {
    var source = global.nativeJsBridgeVersion;
    if (source == target) return true;
    var currVerArr = source.split('.');
    var promoteVerArr = target.split('.');
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i],
          curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
  };
}

/***/ }),
/* 7 */
/* exports provided: init */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/entrys/qing/browser-detect.js ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });


function removeDeviceName(s) {
  return s.replace(/(^|;|\s*)deviceName\s*:[^;]*(;|$)/i, ';');
}

var init = function init(global) {
  var ua = removeDeviceName(navigator.userAgent.toLowerCase() || ''),
      vendor = navigator.vendor && navigator.vendor.toLowerCase() || '',
      appVersion = navigator.appVersion.toLowerCase() || '';
  var isWX = global.isWX = /micromessenger/i.test(ua);
  var isChrome = global.isChrome = /chrome|chromium/i.test(ua) && /google inc/.test(vendor);
  var isFirefox = global.isFirefox = /firefox/i.test(ua);
  var isOpera = global.isOpera = /^Opera\//.test(ua) || /\x20OPR\//.test(ua);
  var isSafari = global.isSafari = /safari/i.test(ua) && /apple computer/i.test(vendor);
  var isIe = global.isIe = function (version) {
    if (!version) {
      return (/msie/i.test(ua) || 'ActiveXObject' in window
      );
    }
    if (version >= 11) {
      return 'ActiveXObject' in window;
    }
    return new RegExp('msie ' + version).test(ua);
  };
  var isIphone = global.isIphone = /iphone/i.test(ua);
  var isIpad = global.isIpad = /ipad/i.test(ua);
  var isIpod = global.isIpod = /ipod/i.test(ua);
  var isIos = global.isIos = isIphone || isIpad || isIpod;
  var isAndroid = global.isAndroid = /android/i.test(ua);
  var isAndroidPhone = global.isAndroidPhone = isAndroid && /mobile/i.test(ua);
  var isAndroidTablet = global.isAndroidTablet = isAndroid && !/mobile/i.test(ua);
  var isBlackberry = global.isBlackberry = /blackberry/i.test(ua);
  var isCoolpad = global.isCoolpad = /coolpad/i.test(ua);
  var isMac = global.isMac = /mac/i.test(appVersion);
  var isWindows = global.isWindows = /win/i.test(appVersion);
  var isWindowsPhone = global.isWindowsPhone = isWindows && /phone/i.test(ua);
  var isWindowsTablet = global.isWindowsTablet = isWindows && !isWindowsPhone && /touch/i.test(ua);
  var isMobile = global.isMobile = isIphone || isIpod || isAndroidPhone || isBlackberry || isWindowsPhone || isCoolpad;
  var isTablet = global.isTablet = isIpad || isAndroidTablet || isWindowsTablet;
  var isDesktop = global.isDesktop = !isMobile && !isTablet;
  var isTouchDevice = global.isTouchDevice = 'ontouchstart' in window || 'DocumentTouch' in window && document instanceof DocumentTouch;
};

/***/ }),
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./src/entrys/qing/client/desktop-le-0.0.3.js ***!
  \****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_log__ = __webpack_require__(/*! ../libs/log */ 0);

(function (doc, win, qing) {
  if (win.__hasQingDesktopLE3) return;
  win.__hasQingDesktopLE3 = true;

  var callbacks = {};
  var _callbackIndex = 0;

  var call = function call(name) {
      console.log('xx:' + name)
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var success = params.success,
        complete = params.complete;

    delete params.success;
    delete params.error;
    delete params.complete;

    var callback = function callback(data) {
      if (data.success === 'true') {
        data.success = true;
      } else if (data.success === 'false') {
        data.success = false;
      }
      success && success(data, {
        code: 200,
        data: data
      });
      complete && complete(data, {
        code: 200,
        data: data
      });
    };

    var callbackId = ++_callbackIndex;
    callbacks[callbackId] = callback;

    var iframe = document.createElement('IFRAME');
    iframe.setAttribute('src', 'xuntong:' + name + ':' + callbackId + ':' + encodeURIComponent(JSON.stringify(params)));

    iframe.setAttribute('height', '1px');
    iframe.setAttribute('width', '1px');
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
  };

  var handleMessageFromXT = function handleMessageFromXT(callbackId, message) {
    try {
      var callback = callbacks[callbackId];
      if (!callback) return;
      callback.apply(null, [JSON.parse(message)]);
    } catch (e) {
      alert(e);
    }
  };

  var registJsApi = {
    'share': true,
    'chat': true,
    'personInfo': true,
    'getPersonInfo': true,
    'gotoLightApp': true,
    'selectPersons': true,
    'setWebViewTitle': true,
    'closeWebView': true,
    'close': true,
    'hideWebViewTitle': true,
    'defback': true,
    'showOptionMenu': true,
    'hideOptionMenu': true,
    'selectOrgs': true,
    'closePop': true,
    'createPop': true
  };
  var checkJsApi = function checkJsApi(_ref) {
    var jsApiList = _ref.jsApiList,
        success = _ref.success,
        complete = _ref.complete;

    var map = {};(jsApiList || []).forEach(function (name) {
      map[name] = !!registJsApi[name];
    });

    var ret = {
      success: true,
      data: map
    };
    success && success(ret);
    complete && complete(ret);
  };

  win.XuntongJSBridge.handleMessageFromXT = handleMessageFromXT;

  var noop = function noop(name) {
    return function () {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libs_log__["a" /* warn */])('method [' + name + '] not support');
    };
  };

  qing._bridge = {
    call: call,
    on: noop,
    off: noop,
    checkJsApi: checkJsApi,
    config: noop,
    trigger: noop
  };

  doc.dispatchEvent(new Event('QingReady'));
})(document, window, window.qing || (window.qing = {}));

/***/ }),
/* 9 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/entrys/qing/client/desktop.js ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_getTicket__ = __webpack_require__(/*! ./api/getTicket */ 1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (doc, win, qing) {
  if (win.__hasQingDesktop) return;
  win.__hasQingDesktop = true;

  var _CloudHubJSBridge = win._CloudHubJSBridge;

  function call(name, data) {
    if (name === 'getTicket') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_getTicket__["a" /* default */])(qing, data);
      return;
    }

    _CloudHubJSBridge.emit(name, data);
  }

  var registJsApi = {
    getTicket: true
  };

  var checkJsApi = function checkJsApi(_ref) {
    var jsApiList = _ref.jsApiList,
        _success = _ref.success,
        complete = _ref.complete;

    var map = {};(jsApiList || []).forEach(function (name) {
      if (registJsApi[name]) {
        map[name] = true;
      }
    });

    _CloudHubJSBridge.checkJsApi({
      jsApiList: jsApiList,
      success: function success(ret1) {
        map = _extends(ret1, map);

        var ret = {
          success: true,
          data: map
        };
        var raw = {
          code: 200,
          data: ret
        };
        _success && _success(ret, raw);
        complete && complete(ret, raw);
      }
    });
  };

  qing._bridge = {
    call: call,
    on: _CloudHubJSBridge.on,
    off: _CloudHubJSBridge.off,
    checkJsApi: checkJsApi,
    trigger: _CloudHubJSBridge.trigger,
    config: function config() {}
  };
  doc.dispatchEvent(new Event('QingReady'));
})(document, window, window.qing || (window.qing = {}));

/***/ }),
/* 10 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./src/entrys/qing/client/mobile-early.js ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_log__ = __webpack_require__(/*! ../libs/log */ 0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function (doc, win, qing) {
  if (win.__hasQingMobile) return;
  win.__hasQingMobile = true;

  var noop = function noop(name) {
    return function () {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libs_log__["a" /* warn */])('method [' + name + '] not support');
    };
  };

  var callbacks = {
    index: 1,

    map: {},

    register: function register(callback) {
      this.index += 2;
      var id = '' + this.index;

      if (typeof callback == 'function') {
        this.map[id] = function (message) {
          this.cb.call(null, message);
        }.bind({ map: this.map, id: id, cb: callback });
      };

      return id;
    },

    invoke: function invoke(id, message) {
      var cb = this.map[id + ''];

      if (typeof cb === 'function') {
        cb(message);
      }
    }
  };

  var XTBridge = {
    invoke: function invoke(method, message, callback) {
      var cid = callbacks.register(callback);
      var url;

      if (typeof message === 'undefined') {
        message = '';
      } else {
        message = encodeURIComponent(JSON.stringify(message));
      }

      url = 'xuntong:' + method + ':' + cid + ':' + message;

      var iframes = window.XTBridgeIframes = window.XTBridgeIframes || function () {
        var fs = [],
            iframe,
            i;
        for (i = 0; i < 9; i++) {
          iframe = document.createElement('IFRAME');
          iframe.setAttribute('height', '1px');
          iframe.setAttribute('width', '1px');
          iframe.style.display = 'none';
          document.documentElement.appendChild(iframe);
          fs.push(iframe);
        }
        return fs;
      }();

      XTBridge.callbackIndex = XTBridge.callbackIndex || 0;
      var index = XTBridge.callbackIndex;
      XTBridge.callbackIndex += 1;
      var iframeIndex = index % 9;
      var iframe = iframes[iframeIndex];
      iframe.setAttribute('src', url);
    },

    callback: function callback(callbackid, message) {
      if (typeof message === 'string' && message.match(/^\s*\{/)) {
        try {
          message = JSON.parse(message);

          if (message && typeof message.success === 'string') {
            message.success = message.success === 'true';
          }
        } catch (e) {
          console.error(e);
        }
      };
      callbacks.invoke(callbackid, message);
    }
  };

  window.XuntongJSBridge = _extends({
    invoke: XTBridge.invoke,
    call: XTBridge.invoke,
    handleMessageFromXT: XTBridge.callback
  }, window.XuntongJSBridge);

  qing._bridge = {
    call: function call(name, params) {
        console.log('yy:' + name)
      var success = params.success;
      var complete = params.complete;
      delete params.success;
      delete params.error;
      delete params.complete;

      XTBridge.invoke(name, params, function () {
        if (typeof success === 'function') {
          success.apply(null, arguments);
        }
        if (typeof complete === 'function') {
          complete.apply(null, arguments);
        }
      });
    },

    on: noop,
    off: noop,
    checkJsApi: noop,
    config: noop,
    trigger: noop
  };

  doc.dispatchEvent(new Event('QingReady'));
})(document, window, window.qing || (window.qing = {}));

/***/ }),
/* 11 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./src/entrys/qing/client/mobile.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_array__ = __webpack_require__(/*! ../libs/array */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_object__ = __webpack_require__(/*! ../libs/object */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_getTicket__ = __webpack_require__(/*! ./api/getTicket */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_storage__ = __webpack_require__(/*! ./api/storage */ 2);





(function (doc, win, qing) {
  if (win.__hasQingMobile) return;
  win.__hasQingMobile = true;

  var dispatchEvent = function dispatchEvent(name, params) {
    var event = document.createEvent('HTMLEvents');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__libs_object__["a" /* extend */])(event, params);
    event.initEvent(name);
    document.dispatchEvent(event);
  };

  var callbacks = {
    map: {},

    index: 1,
    indexStep: 2,

    register: function register(callback) {
      this.index += this.indexStep;
      var id = '' + this.index;

      if (typeof callback == 'function') {
        this.map[id] = function (message) {
          this.cb.call(null, message);
        }.bind({
          map: this.map,
          id: id,
          cb: callback
        });
      };

      return id;
    },
    // 调用对象列表中的fn
    invoke: function invoke(id, message) {
      var cb = this.map[id + ''];

      if (typeof cb === 'function') {
        cb(message);
      }
    }
  };

  var XTBridge = {
    call: function call(method, message, callback) {
        console.log('zz2')
      // cid 为注册事件对应的id
      var cid = callbacks.register(callback);
      var url;
        console.log(JSON.stringify(message))
      if (typeof message === 'undefined') {
        message = '';
      } else {
        message = encodeURIComponent(JSON.stringify(message));
      }


      url = 'xuntong:' + method + ':' + cid + ':' + message;
      console.log(url)

      var isAndroid = qing.isAndroid;
      // 客户端版本
      var clientVersion = function () {
        var qingUA = navigator.userAgent.split('qing;')[0];
        var qingVersion = qingUA.slice(qingUA.indexOf('Qing/') + 5);
        return parseFloat(qingVersion.slice(2));
      }();

      var isNewAndroidClient = isAndroid && clientVersion >= 9.59;
      if (isNewAndroidClient) {
        window.prompt(url);
        return;
      }

      var iframes = window.XTBridgeIframes = window.XTBridgeIframes || function () {
        var fs = [],
            iframe,
            i;
        for (i = 0; i < 9; i++) {
          iframe = document.createElement('IFRAME');
          iframe.setAttribute('height', '1px');
          iframe.setAttribute('width', '1px');
          iframe.style.display = 'none';
          document.documentElement.appendChild(iframe);
          fs.push(iframe);
        }
        return fs;
      }();

      XTBridge.callbackIndex = XTBridge.callbackIndex || 0;
      var index = XTBridge.callbackIndex;
      XTBridge.callbackIndex += 1;
      var iframeIndex = index % 9;
      var iframe = iframes[iframeIndex];
      console.log('zz3')
        console.log(url)
      iframe.setAttribute('src', url);
    },

    handleMessageFromXT: function handleMessageFromXT(callbackid, message) {
      if (typeof message === 'string' && message.match(/^\s*\{/)) {
        try {
          message = JSON.parse(message);

          if (message && typeof message.success === 'string') {
            message.success = message.success === 'true';
          }
        } catch (e) {
          console.error(e);
        }
      };
      callbacks.invoke(callbackid, message);
    }
  };

  var cloudofficeMethodList = ['runtime.auth', 'runtime.jsReady', 'cloudoffice.request', 'cloudoffice.showCardNotify', 'cloudoffice.clearCardNotify', 'cloudoffice.getRoleType', 'cloudoffice.checkAppAuth', 'cloudoffice.shareText', 'cloudoffice.downloadPic', 'cloudoffice.checkWorkbenchUpdate', 'cloudoffice.textShareClosed', 'cloudoffice.dataReport', 'ui.changeNavBarStyle', 'ui.changeNavStyle', 'ui.toast', 'ui.webViewScrollTo', 'ui.webViewPaddingTop', 'ui.navigate', 'storage.getItem', 'storage.setItem', 'storage.removeItem', 'storage.clear', 'bluetooth.openBluetoothAdapter', 'bluetooth.closeBluetoothAdapter', 'bluetooth.getBluetoothAdapterState', 'bluetooth.onBluetoothAdapterStateChange', 'bluetooth.startBluetoothDevicesDiscovery', 'bluetooth.stopBluetoothDevicesDiscovery', 'bluetooth.getBluetoothDevices', 'bluetooth.onBluetoothDeviceFound', 'bluetooth.getConnectedBluetoothDevices', 'bluetooth.createBLEConnection', 'bluetooth.closeBLEConnection', 'bluetooth.getBLEDeviceServices', 'bluetooth.getBLEDeviceCharacteristic', 'bluetooth.readBLECharacteristicValue', 'bluetooth.writeBLECharacteristicValue', 'bluetooth.notifyBLECharacteristicValueChange', 'bluetooth.onBLEConnectionStateChange', 'bluetooth.onBLECharacteristicValueChange', 'bluetooth.getBLEDeviceCharacteristics', 'bluetooth.BLEPrint', 'bluetooth.getBondDevice', 'bluetooth.connectBluetoothDevice', 'bluetooth.writeBluetoothDevice', 'bluetooth.closeBluetoothConnection', 'video.startRecord', 'video.upload', 'video.download', 'video.play', 'video.select'];

  function ready(CHBridge) {
    var bridge = {
      call: function call(method) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libs_array__["a" /* includes */])(cloudofficeMethodList, method)) {
            console.log('zz0')
          CHBridge.invoke.apply(null, arguments);
        } else {
            console.log('zz1')
          XTBridge.call.apply(null, arguments);
        }
      },

      on: CHBridge.on,
      handleMessageFromXT: XTBridge.handleMessageFromXT
    };
    bridge.invoke = bridge.call;
    win.XuntongJSBridge = bridge;

    var eventPrefix = 'eventPrefix_';
    var rigistedEvent = {};

    var registerEvent = function registerEvent(name) {
      if (!rigistedEvent[name]) {
        rigistedEvent[name] = true;
        bridge.on(name, function (data) {
          dispatchEvent(eventPrefix + name, { eventData: data });
        });
      }
    };

    qing._bridge = {
      call: function call(name, params) {
          console.log('zz:' + name)
        params = params || {};
        if (name === 'getTicket') {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api_getTicket__["a" /* default */])(qing, params);
        } else if (name.match(/^storage\./)) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_storage__["a" /* default */])(qing, bridge, name, params);
        } else {
          var success = params.success;
          var complete = params.complete;
          delete params.success;
          delete params.error;
          delete params.complete;

          if (name === 'toast') {
            name = 'ui.toast';
            params.message = params.msg;
            delete params.msg;
          }

          if (name === 'request') {
            name = 'cloudoffice.request';
          }

          if (name === 'ui.changeNavBarStyle' || name === 'ui.changeNavStyle') {
            if (qing.checkVersion('0.9.71')) {
              name = 'ui.changeNavStyle';
            } else {
              name = 'ui.changeNavBarStyle';
            }
          }

          bridge.call(name, params, function () {
            if (typeof success === 'function') {
              success.apply(null, arguments);
            }
            if (typeof complete === 'function') {
              complete.apply(null, arguments);
            }
          });
        }
      },

      on: function on(name, handler) {
        if (!handler) return;

        registerEvent(name);

        if (typeof handler === 'function') {
          handler = {
            success: handler
          };
        }

        document.addEventListener(eventPrefix + name, function (e) {
          if (typeof handler.success === 'function') {
            handler.success(e.eventData);
          }

          if (typeof handler.complete === 'function') {
            handler.complete(e.eventData);
          }
        });
      },
      off: function off(name, handler) {
        document.removeEventListener(eventPrefix + name, handler);
      },
      checkJsApi: function checkJsApi(name) {
        if (name === 'storage' || /^storage\./.test(name)) {
          return (qing.isAndroid || qing.isIos) && qing.checkVersion('0.9.76');
        }

        return true;
      },
      config: function config(cfg) {},
      trigger: function trigger(name, params) {
        CHBridge.trigger(name, params);
      }
    };

    dispatchEvent('QingReady', qing._bridge);
  }

  var CHBridge = window.CloudHubJSBridge;
  if (!CHBridge || !CHBridge.isReady) {
    window.__onJSBridgeReady = ready;
  } else {
    ready(CHBridge);
  }
})(document, window, window.qing || (window.qing = {}));

/***/ }),
/* 12 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/entrys/qing/client/web.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_object__ = __webpack_require__(/*! ../libs/object */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_storage__ = __webpack_require__(/*! ./api/storage */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_ajax__ = __webpack_require__(/*! ../libs/ajax */ 3);




(function (doc, win, qing) {
  if (win.__hasQingWeb) return;
  win.__hasQingWeb = true;

  var dispatchEvent = function dispatchEvent(name, params) {
    var event = document.createEvent('HTMLEvents');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libs_object__["a" /* extend */])(event, params);
    event.initEvent(name);
    document.dispatchEvent(event);
  };

  function ready() {
    var bridge = {
      call: function call(name, params, success, error) {
        switch (name) {
          case 'ui.toast':
            alert(params.message);
            break;
          case 'cloudoffice.request':
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__libs_ajax__["a" /* default */])({
              url: params.url,
              data: params.data,
              method: params.method,
              headers: params.headers,
              serializer: params.serializer,
              success: success,
              error: error
            });
            break;

          default:
            console.error('Web端暂时不支持该桥：' + name);
            break;
        }
      },
      on: function on() {},
      handleMessageFromXT: function handleMessageFromXT() {}
    };
    bridge.invoke = bridge.call;
    win.XuntongJSBridge = bridge;

    qing._bridge = {
      call: function call(name, params) {
          console.log('jj:' + name)
        params = params || {};
        if (name.match(/^storage\./)) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_storage__["a" /* default */])(qing, bridge, name, params);
        } else {
          var success = params.success;
          var complete = params.complete;
          delete params.success;
          delete params.error;
          delete params.complete;

          if (name === 'toast') {
            name = 'ui.toast';
            params.message = params.msg;
            delete params.msg;
          }

          if (name === 'request') {
            name = 'cloudoffice.request';
          }

          bridge.call(name, params, function () {
            if (typeof success === 'function') {
              success.apply(null, arguments);
            }
            if (typeof complete === 'function') {
              complete.apply(null, arguments);
            }
          });
        }
      },

      on: function on(name, handler) {},
      off: function off(name, handler) {},
      checkJsApi: function checkJsApi(name) {
        if (name === 'storage' || /^storage\./.test(name)) {
          return (qing.isAndroid || qing.isIos) && qing.checkVersion('0.9.76');
        }

        return true;
      },
      config: function config(cfg) {},
      trigger: function trigger(name, params) {}
    };

    dispatchEvent('QingReady', qing._bridge);
  }

  ready();
})(document, window, window.qing || (window.qing = {}));

/***/ }),
/* 13 */
/* exports provided: default */
/* exports used: default */
/*!**************************************!*\
  !*** ./src/entrys/qing/libs/args.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ArrayFrom = Array.from;

/* harmony default export */ __webpack_exports__["a"] = (ArrayFrom ? ArrayFrom : function (args) {
  var len = args.length;
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(args[i]);
  }
  return arr;
});

/***/ }),
/* 14 */
/* exports provided: includes */
/* exports used: includes */
/*!***************************************!*\
  !*** ./src/entrys/qing/libs/array.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = includes;
function includes(array, item) {
  if (array && array.some) {
    return array.some(function (n) {
      return n === item;
    });
  } else {
    return false;
  }
}

/***/ }),
/* 15 */
/* exports provided: encode, decode */
/* exports used: encode, decode */
/*!****************************************!*\
  !*** ./src/entrys/qing/libs/encode.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = encode;
/* harmony export (immutable) */ __webpack_exports__["b"] = decode;
function encode(s) {
    if (typeof s === 'string') {
        s = s.replace(/'/gm, '▴▴').replace(/"/gm, '▾▾');
        return escape(s);
    } else {
        return s;
    }
}

function decode(s) {
    if (typeof s === 'string') {
        s = unescape(s);
        return s.replace(/▴▴/gm, '\'').replace(/▾▾/gm, '"');
    } else {
        return s;
    }
}

/***/ }),
/* 16 */
/* exports provided: init */
/* all exports used */
/*!************************************!*\
  !*** ./src/entrys/qing/xuntong.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;

var win = window;

function init(global) {

  var call = function call(name) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var cb = arguments[2];

    cb && (params.complete = cb);
    global.call(name, params);
  };

  win.XuntongJSBridge = {
    call: call
  };
}

/***/ }),
/* 17 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** multi ./src/entrys/qing/npm.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Git\qing\src\entrys\qing\npm.js */5);


/***/ })
/******/ ]);