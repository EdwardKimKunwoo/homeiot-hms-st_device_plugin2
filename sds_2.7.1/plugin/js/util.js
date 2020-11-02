/*
Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information").
You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.
SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/* for generator
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg)
{
	try {
		var info = gen[key](arg);
		var value = info.value;
	} catch (error) {
		reject(error); return;
	}

	if (info.done) {
		resolve(value);
	} else {
		Promise.resolve(value).then(_next, _throw);
	}
}

function _asyncToGenerator(fn) {
	return function () {
		var self = this, args = arguments;
		return new Promise(function (resolve, reject) {
			var gen = fn.apply(self, args);
			function _next(value) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
			}
			function _throw(err) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
			}

			_next(undefined);
		});
	};
}
*/
var _isString = function(obj) {
    return typeof obj === 'string';
};

var _isFunction = function(obj) {
    return typeof obj === 'function';
};

var _isArray = function(obj) {
    return Array.isArray(obj);
};

var _isObject = function(obj) {
    return (null !== obj && typeof obj === 'object' && !_isArray(obj));
};

function _isUndefined(obj) {
    return obj === void 0;
}

function _isNumber(obj) {
    return typeof obj === 'number';
}

function _isElement(obj){
    return (
      typeof HTMLElement === "object" ? obj instanceof HTMLElement :
      obj && typeof obj === "object" && obj != null && obj.nodeType === 1 && typeof obj.nodeName==="string"
  );
}

function _isJQuery(obj) {
    return obj instanceof jQuery;
}

function isFHub() {
    if (navigator.userAgent.match(/Family Hub/))
        return true;
    return false;
}

function isSmartTV() {
    return navigator.userAgent.match(/SMART-TV/);
}

function isPC() {
    return navigator.userAgent.match(/Windows/);
}

function getHTMLElementFromJQuery(obj) {
    if (_isJQuery(obj))
        return obj[0];
    else if (_isElement(obj)) {
        return obj;
    }
    return null;
}

function setDataAttr(obj, key, value) {

    let dom = undefined;
    if (_isJQuery(obj))
        dom = obj[0];
    else if (_isElement(obj)) {
        dom = obj;
    }

    if(dom)
        dom.dataset[toCamelCase(key.replace(/^dataset/, ''))] = value;
}

var cloneObject = function(obj, dest) {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    var copy = (dest) ? dest : {};
    var attrList = Object.getOwnPropertyNames(obj);
    for (var i in attrList) {
        if (obj.hasOwnProperty(attrList[i])) {
            copy[attrList[i]] = obj[attrList[i]];
        }
    }
    return copy;
}

function capitalizeFirstLetter(string) {
    if (typeof string === 'string') {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
}

function getUrlParams(url) {
    var obj = new Object();
    if (url) {
        url = url.substring(url.indexOf('?')+1);
        url = url.split('#')[0];
        var token = url.split('&');

        for (var i = 0; i < token.length; i++) {
            var item = token[i].split('=');
            var key = item[0];
            var val = typeof (item[1]) === 'undefined' ? "" : item[1];
            if (!obj[key]) {
                obj[key] = val;
            } else if (obj[key] && typeof obj[key] === 'string'){
                obj[key] = [obj[key]];
                obj[key].push(val);
            } else {
                obj[key].push(val);
            }
        }
    }
    return obj;
}

var getTimeString = function(d) {
    let prependZero = function(num) {
        if (num < 10) {
            return "0" + String(num);
        }
        return String(num);
    }

    var monthFlag = false;
    if (typeof d === "object") {
        d = new Date();
    } else if (typeof d === "number") {
        monthFlag = true;
        d = new Date(d);
    } else {
        throw Error('no Date Type!!');
    }

    return prependZero(d.getFullYear()) + "/" + prependZero(d.getMonth() + (monthFlag ? 1 : 0)) + "/"
        + prependZero(d.getDate()) + " " + prependZero(d.getHours()) + ":" + prependZero(d.getMinutes()) + ":"
        + prependZero(d.getSeconds()) + "." + d.getMilliseconds();
}

function getIOSVersion() {
    return parseFloat(+('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1])
        .replace('undefined', '3_2').replace('_', '.').replace('_', '')
    ) || false;
}

function isItIPhone() {
    return !(navigator.userAgent.match(/iPhone/i) === null);
}

function isItIOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
}

function isAndroid() {
    return (navigator.userAgent.match(/Android/));
}

function isTablet() {
    if (document.body.offsetWidth > 500) {
        return true;
    }

    return false;
}

function getIOSVersion() {
    return parseFloat(+('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1])
        .replace('undefined', '3_2').replace('_', '.').replace('_', '')
    ) || false;
}

function isWinPlatform() {
    var pt = navigator.platform;
    if (pt.indexOf("Win") != -1) {
        return true;
    }
    return false;
}

function isLinuxPCPlatform() {
    var pt = navigator.platform;
    console.info(pt);
    if (pt.indexOf("Linux") != -1 && pt.indexOf("x86") != -1 ) {
        return true;
    }
    return false;
}

function promiseWithTimeout(promise, timeout) {
    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`[promiseWithTimeout] Timeout [${timeout}ms]`));
            }, timeout);
        })
    ]);
};

function PromiseTransitionEnd(ele, { propertyName, triggerFunc, immediate }) {
    return new Promise(resolve => {
        if (immediate) {

            // disable animation
            ele.style.transition = 'none';
            // reflow
            (() => ele.offsetHeight)();

            triggerFunc(); // trigger function is necessary

            // reflow
            (() => ele.offsetHeight)();
            // enable animation
            ele.style.transition = '';

            resolve();
        } else {
            const handler = e => {
                if (e.target !== ele) {
                    return;
                }

                if (propertyName && propertyName !== e.propertyName) {
                    return;
                }
                e.stopPropagation();
                ele.removeEventListener('transitionend', handler);
                resolve(e);
            };

            const getTransitionTime = function (dom, property) {
                const toMilli = function (str) {
                    if (!str) {
                        return 0;
                    }

                    str = str.trim().toLowerCase();
                    if (str.endsWith('ms')) {
                        return parseFloat(str);
                    } else if (str.endsWith('s')) {
                        return parseFloat(str) * 1000;
                    }

                    return 0;
                };

                const transitionProperty = document.defaultView.getComputedStyle(dom, null).getPropertyValue('transition-property');
                const transitionDelay = document.defaultView.getComputedStyle(dom, null).getPropertyValue('transition-delay');
                const transitionDuration = document.defaultView.getComputedStyle(dom, null).getPropertyValue('transition-duration');
                if (!transitionProperty) {
                    return 0;
                }

                const properties = transitionProperty.replace(new RegExp(' ', 'g'), '').split(',');
                let index = properties.indexOf(property);
                if (index < 0) {
                    index = properties.indexOf('all');
                    if (index < 0) {
                        return 0;
                    }
                }

                const delay = toMilli(transitionDelay.split(',')[index]);
                const duration = toMilli(transitionDuration.split(',')[index]);

                return delay + duration;
            };

            ele.addEventListener('transitionend', handler);

            if (triggerFunc) {
                triggerFunc();
            }

            if (propertyName) {
                const value = getTransitionTime(ele, propertyName);
                if (value) {
                    promiseDelay(value + 20/* guard time */).then(() => {
                        ele.removeEventListener('transitionend', handler);
                        resolve('TRANSITION_CANCELED');
                    });
                } else {
                    resolve('NO_TRANSITION');
                }
            }
        }
    });
};

function promiseDelay(millisecond) {
    return new Promise(resolve => setTimeout(resolve, millisecond));
}

function promiseAnimationEnd(ele, animationClass) {
    return new Promise((resolve, reject) => {
        const event = () => {
            ele.removeClass(animationClass);
            ele[0].removeEventListener('animationend', event);

            resolve();
        };

        ele.addClass(animationClass);
        ele[0].addEventListener('animationend', event);
    });
}

// ### Log
const LoggerFilterName = "HomeNet";
const PRINT_CONSOLE = 1;

function getLineInfo(line) {
    var funcName = undefined;
    var lineNum = undefined;

    if (line) {
        if (getIOSVersion()) {
            var sidx = line.indexOf("@");
            funcName = line.slice(0, sidx);
            var lidx = line.lastIndexOf("/");
            lineNum = line.slice(lidx + 1, line.length - 1);
        } else {
            var sidx = line.indexOf("at ");
            var eidx = line.indexOf(" (");
            funcName = line.slice(sidx + 3, eidx);
            var lidx = line.lastIndexOf("/");
            lineNum = line.slice(lidx + 1, line.length - 1);
        }
        return { "funcName": funcName, "lineNum": lineNum };
    } else {
        LoggerW("line is not defined")
        return { "funcName": undefined, "lineNum": undefined };
    }
}

function Logger() { //msg
    var showCallStack = false; //display Back Trace
    var err = null;
    var msg = null;
    var point = null;
    var callStack = "";
    var err = null;
    var print_console = false;

    if (typeof arguments[0] === 'string') {
        msg = arguments[0];
    }

    if (typeof arguments[1] === 'boolean') {
        showCallStack = arguments[1];
    } else if (typeof arguments[1] === 'object') {
        err = arguments[1];
    } else if (typeof arguments[1] === 'number') {
        if ( arguments[1] === PRINT_CONSOLE) {
            print_console = true;
        }
    }

    if (!err && showCallStack) {
        try {
            throw Error('');
        } catch (e) {
            err = e;
        }
    }

    if (err) {
        let readIdx = 0;
        if (showCallStack) {
            //var readIdx = window.isTestMode ? 3 : 2;
            if (window.testMode && window.testMode.isTestMode()) {
                readIdx = 3;
            } else {
                readIdx = 2;
            }
        } else {
            //var readIdx = window.isTestMode ? 1 : 0;
            if (window.testMode && window.testMode.isTestMode()) {
                readIdx = 1;
            } else {
                readIdx = 0;
            }
        }

        var lines = err.stack.split("\n");
        lines.forEach(function(val, idx) {
            if (idx >= readIdx) {
                var cs = getLineInfo(val);
                if (cs) {
                    if (idx == readIdx) {
                        point = cs;
                    }

                    callStack += (cs.funcName + " " + cs.lineNum + "\n");
                }
            }
        });
    }
    return { 'callStack': callStack, 'msg': msg, 'point': point, 'print_console': print_console };
}

window.LoggerV = function(msg, opt) {
    if (window.VERBOSE_LOG_FLAG) {
        var log = Logger(msg, opt);
        if (window.scplugin.log.verbose) {
            window.scplugin.log.verbose(LoggerFilterName, log && log.point ? log.point.funcName + "(" + log.point.lineNum + ")" : "",
                msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
        }
        if (window.CONSOLE_LOG_FLAG || log.print_console) {
            console.log((log && log.point ? "[" + log.point.funcName + " (" + log.point.lineNum + ")]" : "") +
                msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
        }
    } else {
        return;
    }
}

window.LoggerD = function(msg, opt) {
    if (window.VERBOSE_LOG_FLAG) {
        var log = Logger(msg, opt);
        if (window.scplugin.log.debug) {
            window.scplugin.log.debug(LoggerFilterName, log && log.point ? log.point.funcName + "(" + log.point.lineNum + ")" : "",
                log.msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
        }
        if (window.CONSOLE_LOG_FLAG || log.print_console) {
            console.log((log && log.point ? "[" + log.point.funcName + " (" + log.point.lineNum + ")]" : "") +
                log.msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
        }
    } else {
        return;
    }
}

window.LoggerJ = function(opt) {
    if (window.VERBOSE_LOG_FLAG) {
        try {
            if (opt && typeof arguments[0] === 'object') {
                var printJson = function(obj, parent, depth) {
                    var prefix = "";
                    for (var i = 0; i < depth; i++) {
                        prefix += "    ";
                    }
                    if (parent) {
                        prefix += "[" + parent + "] ";
                    }
                    if (typeof obj !== 'object') {
                        LoggerD(prefix + obj);
                        return;
                    }

                    Object.keys(obj).forEach(function(key) {
                        if (typeof obj[key] === 'object') {
                            if (obj[key] === null) {
                                LoggerD(prefix + key + ': null');
                                return;
                            }
                            var subDepth = depth + 1;
                            printJson(obj[key], key, subDepth);
                        } else if (typeof obj[key] === 'number' || typeof obj[key] === 'string' || typeof obj[key] === 'boolean') {
                            LoggerD(prefix + key + ': ' + obj[key]);
                        } else {
                            LoggerD(prefix + key + ': unknown');
                        }
                    });
                }
                printJson(opt, "", 0);
            }
        } catch (err) {
            LoggerW("json data error! ", err);
        }

    } else {
        return;
    }
}

window.LoggerI = function(msg, opt) {
    var log = Logger(msg, opt);
    if (window.scplugin.log.info) {
        window.scplugin.log.info(LoggerFilterName, log && log.point ? log.point.funcName + "(" + log.point.lineNum + ")" : "",
            msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
    }
    if (window.CONSOLE_LOG_FLAG || log.print_console) {
        console.info((log && log.point ? "[" + log.point.funcName + " (" + log.point.lineNum + ")]" : "") +
            msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
    }
}

window.LoggerW = function(msg, opt) {
    var log = Logger(msg, opt);
    if (window.scplugin.log.warning) {
        window.scplugin.log.warning(LoggerFilterName, log && log.point ? log.point.funcName + "(" + log.point.lineNum + ")" : "",
            msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
    }
    if (window.CONSOLE_LOG_FLAG || log.print_console) {
        console.warn((log && log.point ? "[" + log.point.funcName + " (" + log.point.lineNum + ")]" : "") +
            msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
    }
}

window.LoggerE = function(msg, opt) {
    var log = Logger(msg, opt);
    if (window.scplugin.log.error) {
        window.scplugin.log.error(LoggerFilterName, log && log.point ? log.point.funcName + "(" + log.point.lineNum + ")" : "",
            msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
    }
    if (window.CONSOLE_LOG_FLAG || log.print_console) {
        console.error((log && log.point ? "[" + log.point.funcName + " (" + log.point.lineNum + ")]" : "") +
            msg + "\n" + ((log && log.callStack) ? log.callStack : ""));
    }
}

// ### Exception
var PLUGINException = function(name, message) {
    var _name = 0;
    var _message = "Unknown error";

    if (name) {
        _name = name;
    }

    if (message) {
        _message = message;
    }

    // attributes
    Object.defineProperties(this, {
        name: { value: _name, writable: false, enumerable: true },
        message: { value: _message, writable: false, enumerable: true }
    });
};

PLUGINException.prototype = new Error();
PLUGINException.prototype.constructor = PLUGINException;

// ### Orientation
const SCREEN_ORIENTATION_PORTRAIT = "portrait";
const SCREEN_ORIENTATION_LANDSCAPE = "landscape";

function getScreenOrientation() {
    let currentOrientation = window.orientation;

    if (currentOrientation == 90 || currentOrientation == -90) {
        return SCREEN_ORIENTATION_LANDSCAPE;
    } else {
        return SCREEN_ORIENTATION_PORTRAIT;
    }
}

// ### sprintf
(function(window) {
    var re = {
        not_string: /[^s]/,
        number: /[diefg]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf() {
        var key = arguments[0], cache = sprintf.cache
        if (!(cache[key] && cache.hasOwnProperty(key))) {
            cache[key] = sprintf.parse(key)
        }
        return sprintf.format.call(null, cache[key], arguments)
    }

    sprintf.format = function(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = "", arg, output = [], i, k, match, pad, pad_character, pad_length, is_positive = true, sign = ""
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i])
            if (node_type === "string") {
                output[output.length] = parse_tree[i]
            }
            else if (node_type === "array") {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf("[sprintf] property '%s' does not exist", match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (get_type(arg) == "function") {
                    arg = arg()
                }

                if (re.not_string.test(match[8]) && re.not_json.test(match[8]) && (get_type(arg) != "number" && isNaN(arg))) {
                    throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case "b":
                        arg = arg.toString(2)
                    break
                    case "c":
                        arg = String.fromCharCode(arg)
                    break
                    case "d":
                    case "i":
                        arg = parseInt(arg, 10)
                    break
                    case "j":
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                    break
                    case "e":
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential()
                    break
                    case "f":
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                    break
                    case "g":
                        arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg)
                    break
                    case "o":
                        arg = arg.toString(8)
                    break
                    case "s":
                        arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg)
                    break
                    case "u":
                        arg = arg >>> 0
                    break
                    case "x":
                        arg = arg.toString(16)
                    break
                    case "X":
                        arg = arg.toString(16).toUpperCase()
                    break
                }
                if (re.json.test(match[8])) {
                    output[output.length] = arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? "+" : "-"
                        arg = arg.toString().replace(re.sign, "")
                    }
                    else {
                        sign = ""
                    }
                    pad_character = match[4] ? match[4] === "0" ? "0" : match[4].charAt(1) : " "
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? str_repeat(pad_character, pad_length) : "") : ""
                    output[output.length] = match[5] ? sign + arg + pad : (pad_character === "0" ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output.join("")
    }

    sprintf.cache = {}

    sprintf.parse = function(fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = match[0]
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = "%"
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list[field_list.length] = field_match[1]
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else {
                                throw new SyntaxError("[sprintf] failed to parse named argument key")
                            }
                        }
                    }
                    else {
                        throw new SyntaxError("[sprintf] failed to parse named argument key")
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")
                }
                parse_tree[parse_tree.length] = match
            }
            else {
                throw new SyntaxError("[sprintf] unexpected placeholder")
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return parse_tree
    }

    var vsprintf = function(fmt, argv, _argv) {
        _argv = (argv || []).slice(0)
        _argv.splice(0, 0, fmt)
        return sprintf.apply(null, _argv)
    }

    /**
     * helpers
     */
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
    }

    function str_repeat(input, multiplier) {
        return Array(multiplier + 1).join(input)
    }

    /**
     * export to either browser or node.js
     */
    if (typeof exports !== "undefined") {
        exports.sprintf = sprintf
        exports.vsprintf = vsprintf
    }
    else {
        window.sprintf = sprintf
        window.vsprintf = vsprintf

        if (typeof define === "function" && define.amd) {
            define(function() {
                return {
                    sprintf: sprintf,
                    vsprintf: vsprintf
                }
            })
        }
    }
})(typeof window === "undefined" ? this : window);

// ### DOM
var createScript = function(path){
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.src = path;
      script.async = true;
      script.type = "text/javascript";
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(new PLUGINException("Script Load Error", "Can't create script element"));
      };
      document.head.appendChild(script);
  });
}

var createDeviceScript = function(path){
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.src = path;
      script.async = true;
      script.type = "text/javascript";
      script.onload = () => {
        resolve(window.deviceTemplate);
      };
      script.onerror = () => {
        reject(new PLUGINException("Script Load Error", "Can't create script element"));
      };
      document.head.appendChild(script);
  });
}

var createCss = function(path){
    return new Promise((resolve, reject) => {
      let css = document.createElement('link');
      css.setAttribute('rel', 'stylesheet');
      css.setAttribute('type', 'text/css');
      css.setAttribute('href', path);

      css.onload = () => {
        resolve();
      };
      css.onerror = () => {
        reject(new PLUGINException("CSS Load Error", "Can't create Style element"));
      };
      document.head.appendChild(css);
  });
}

const attributeExceptions = ['role', 'tabindex'];

function appendText(el, text) {
    const textNode = document.createTextNode(text);
    el.appendChild(textNode);
}

function toCamelCase(str) {
    return str
        .replace(/-([a-z])/g, $1 => $1.toUpperCase())
        .replace(/\s([a-z])/g, $1 => $1.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, $1 => $1.toLowerCase());
}

function appendArray(el, children) {
    children.forEach(child => {
        if (Array.isArray(child)) {
            appendArray(el, child);
        } else if (child instanceof window.Element) {
            el.appendChild(child);
        } else if (typeof child === 'string') {
            appendText(el, child);
        } else if (child instanceof jQuery) {
            Object.keys(child).forEach ((val) => {
                if (val !== "length") { // ignore key : length
                    el.appendChild(child[val]);
                }
            });
        }
    });
}

function setStyles(el, styles) {
    if (!styles) {
        el.removeAttribute('styles');
        return;
    }

    Object.keys(styles).forEach(styleName => {
        if (styleName in el.style) {
            el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
        } else {
            LoggerW(styleName + " is not a valid style for a " + el.tagName.toLowerCase());
        }
    });
}

function makeElement(type, textOrPropsOrChild, ...otherChildren) {
    const el = document.createElement(type);

    if (Array.isArray(textOrPropsOrChild)) {
        appendArray(el, textOrPropsOrChild);
    } else if (textOrPropsOrChild instanceof window.Element) {
        el.appendChild(textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === 'string') {
        appendText(el, textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === 'object') {
        Object.keys(textOrPropsOrChild).forEach(propName => {
            if (propName in el || attributeExceptions.includes(propName)) {
                const value = textOrPropsOrChild[propName];
                if (propName === 'style') {
                    setStyles(el, value);
                } else if (attributeExceptions.includes(propName)) {
                    el.setAttribute(propName, value);
                } else if (value) {
                    el[propName] = value;
                }
            } else if (propName.startsWith('aria-')) {
                const value = textOrPropsOrChild[propName];
                el.setAttribute(propName, value);
            } else if (propName.startsWith('dataset')) {
                const value = textOrPropsOrChild[propName];
                el.dataset[toCamelCase(propName.replace(/^dataset/, ''))] = value;
            } else {
                LoggerW(propName + " is not a valid property of a " + type);
            }
        });
    }

    if (otherChildren) {
        appendArray(el, otherChildren);
    }

    return el;
}

const Dom = {
    build: (fn, ...args) => fn(Dom, ...args),
    a: (...args) => makeElement('a', ...args),
    div: (...args) => makeElement('div', ...args),
    header: (...args) => makeElement('header', ...args),
    p: (...args) => makeElement('p', ...args),
    span: (...args) => makeElement('span', ...args),
    ul: (...args) => makeElement('ul', ...args),
    li: (...args) => makeElement('li', ...args),
    img: (...args) => makeElement('img', ...args),
    svg: (...args) => makeElement('svg', ...args),
    circle: (...args) => makeElement('circle', ...args),
    input: (...args) => makeElement('input', ...args),
    canvas:(...args) => makeElement('canvas', ...args),
    video:(...args) => makeElement('video', ...args)
};

// SCPlugin System Info
async function is24HoursFormat() {
    //return true;
    if (window.scplugin.systemInfo && window.scplugin.systemInfo.getInfo) {
        const getHoursFormat = () => {
            return new Promise((resolve, reject) => {
                window.scplugin.systemInfo.getInfo("TIME", result => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(new Error('INVALID RESPONSE'));
                    }
                }, e => reject(new Error(e.message)));
            });
        }

        const result = await getHoursFormat();
        if (result) {
            return result.hoursClockType === '24h';
        } else {
            return false;
        }
    } else {
        return false;
    }
}