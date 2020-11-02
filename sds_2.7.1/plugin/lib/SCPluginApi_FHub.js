/*
 * Copyright (c) 2017 Samsung Electronics Co., Ltd All Rights Reserved
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

/******************************************************************************
 * Based on SCPluginApi version 1.2.1
 *******************************************************************************/

var SCPluginApiFHubVersion = "1.2.1.5";
var TEST = false;

function __onOCFDeviceCallback(devices) {
    //*** To be implemented ***//
}

function __onNMOCFDeviceCallback(json) {
    var cmd = "scclient_requestDeviceInfo";
    var f = window.scplugin._scPluginNative.getCallbackByKey(cmd + arguments.callee.name + "");
    if (f) {
        setTimeout(function() {
            try {
                var deviceList = window.scplugin._getOCFDevices(json);
                f.callFunction(deviceList);

            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMRepresentCallback(result, uri, representation) {
    var cmd = "scclient_subscribe";
    var f = window.scplugin._scPluginNative.getCallbackByKey(cmd + arguments.callee.name + uri);
    if (f) {
        setTimeout(function() {
            try {
                f.callFunction(result, f.deviceId, uri, JSON.parse(representation));
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMgetRepresentationCallback(result, uri, representation) {
    var cmd = "scclient_getRemoteRepresentation";
    var f = window.scplugin._scPluginNative.getCallbackByKey(cmd + arguments.callee.name + uri);
    if (f) {
        setTimeout(function() {
            try {
                f.callFunction(result, f.deviceId, uri, JSON.parse(representation));
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMsetRepresentationCallback(result, uri, representation) {
    var cmd = "scclient_setRemoteRepresentation";
    var f = window.scplugin._scPluginNative.getCallbackByKey(cmd + arguments.callee.name + uri);
    if (f) {
        setTimeout(function() {
            try {
                f.callFunction(result, f.deviceId, uri, JSON.parse(representation));
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMStateCallback(json) {
    //*** To be implemented ***//
}

function __onNMMonitoringStateCallback(result, state) {
    var cmd = "scclient_startMonitoringConnectionState";
    var f = window.scplugin._scPluginNative.getCallbackByKey(cmd + arguments.callee.name + "");
    if (f) {
        setTimeout(function() {
            try {
                f.callFunction(result, f.deviceId, state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMProdGetDeviceActivityHistoryCallback(json) {
    var f = window.scplugin._scPluginNative.getCallback(json);
    if (f) {
        setTimeout(function() {
            try {
                f(json.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMPluginDataCallback(key, value) {
    var cmd = "scclient_getPluginData";
    var f = window.scplugin._scPluginNative.getCallbackByKey(cmd + arguments.callee.name + key);
    if (f) {
        setTimeout(function() {
            try {
                f.callFunction(key, value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMCloseAdditionalPageCallback() {
    try {
        exitPluginPage();
    } catch (e) {
        console.error(e);
    }
}

function __onNMSAAuthCodeCallback(json) {
    //*** To be implemented ***//
}

function __onNMServiceCallback(json) {
    var cmd = "scclient_getService";
    var f = window.scplugin._scPluginNative.getCallback(json);
    if (f) {
        setTimeout(function() {
            try {
                var serviceObj = window.scplugin._getService(json);
                f(serviceObj);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMServiceEventCallback(json) {
    //*** To be implemented ***//
}

function __onNMServiceResponseCallback(json) {
    var cmd = "scclient_sendRequest";
    var f = window.scplugin._scPluginNative.getCallback(json);
    if (f) {
        setTimeout(function() {
            try {
                f(json.result, json.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onLaunchPluginCallback(json) {
    window.scplugin.log.info("SCPluginApi", arguments.callee.name, json.name + " plugin launched successfully");
}

function __onNMServiceConfigurationCallback(json) {
    //*** To be implemented ***//
}

function __onNMProdIsApplicationInstalledCallback(json) {
    //*** To be implemented ***//
}

function __onNMProdLaunchApplicationCallback(json) {
    //*** To be implemented ***//
}

function __onNMProdLaunchPluginCallback(json) {
    //*** To be implemented ***//
}

function __onNMProdLocationNicknameCallback(json) {
    //*** To be implemented ***//
}

function __onNMProdAnalyticsLogInsert(json) {
    //*** To be implemented ***//
}

function __onNMServiceShareTextCallback(json) {
    //*** To be implemented ***//
}

(function(window, document, undefined) {
    var isPlatform = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Tizen: function() {
            return navigator.userAgent.match(/Tizen/i);
        },
        Simulator: function() {
            return navigator.userAgent.match(/Simulator/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/Windows/i);
        },
        any: function() {
            return (isPlatform.Android() || isPlatform.iOS() || isPlatform.Tizen());
        }
    };
    var NativeManager = function() {
        this.CALLBACK_ID_KEY = "callbackId";
        this.LISTENER_ID_KEY = "listenerId";
        var _replyId = 0;
        this._callbacks = {};
        this._listeners = {};
        this.callbackMap = new Map();
        Object.defineProperties(this, {
            nextReplyId: {
                get: function() {
                    return ++_replyId;
                },
                enumerable: false
            }
        });
    };

    NativeManager.prototype = {
        insertMap: function(args, callbackId) {
            var obj = new Object();
            obj.deviceId = args.id;
            obj.callbackId = args[callbackId];

            if (callbackId == this.CALLBACK_ID_KEY) {
                obj.callbackType = "callback"
            }
            else if (callbackId == this.LISTENER_ID_KEY) {
                obj.callbackType = "listener";
            }

            var key = "";
            if (args.hasOwnProperty("cmd")) {
                key += args.cmd;
            }

            if (args.hasOwnProperty("callbackName")) {
                key += args.callbackName;
            }

            if (args.hasOwnProperty("key")) {
                key += args.key;
            }

            if (args.hasOwnProperty("uris")) {
                for (var i in args.uris) {
                    this.callbackMap.set(key + args.uris[i], obj);
                }
            }
            else if (args.hasOwnProperty("uri")) {
                key += args.uri;
            }

            if (!this.callbackMap.has(key)) {
                obj.cnt = 1;
                this.callbackMap.set(key, obj);
            }
            else {
                var target = this.callbackMap.get(key);
                ++(target.cnt);
            }
        },
        call: function(cmd, args, callback, onerror) {
            args = args || {};
            var replyId = this.nextReplyId;
            args[this.CALLBACK_ID_KEY] = replyId;
            this._callbacks[replyId] = callback;
            if (onerror) { this._callbacks[replyId + "err"] = onerror; }
            this.insertMap(args, this.CALLBACK_ID_KEY);
            this.callNative(cmd, args);
        },
        addListener: function(cmd, name, args, callback) {
            args = args || {};
            args[this.LISTENER_ID_KEY] = name;
            this._listeners[name] = callback;
            this.insertMap(args, this.LISTENER_ID_KEY);
            this.callNative(cmd, args);
        },
        removeListener: function(cmd, name, args) {
            args = args || {};
            if (this._listeners.hasOwnProperty(name)) {
                delete this._listeners[name];
            }
            this.callNative(cmd, args);
        },
        callNative: function(cmd, args) {
            args = args || {};
            if (isPlatform.iOS()) {
                window.webkit.messageHandlers[cmd].postMessage(args);
            } else if (isPlatform.Android() || isPlatform.Simulator()) {
                if (Object.keys(args).length == 0) {
                    eval("SC_PLUGIN." + cmd + "()");
                } else {
                    eval("SC_PLUGIN." + cmd + ".apply(SC_PLUGIN,[JSON.stringify(args)])");
                }
            } else if (isPlatform.Tizen()) {
                eval("window." + cmd + ".postMessage(args)");
            } else {
                console.log("Not supported platform - " + navigator.userAgent);
            }
        },
        getCallback: function(result) {
            var id;

            if (result.hasOwnProperty(this.CALLBACK_ID_KEY)) {
                id = result[this.CALLBACK_ID_KEY];
                if (typeof this._callbacks[id] !== 'function') {
                    console.error('Wrong callback identifier. Ignoring message.');
                    return null;
                }
                var f = this._callbacks[id];
                delete this._callbacks[id];
                return f;
            }

            if (result.hasOwnProperty(this.LISTENER_ID_KEY)) {
                id = result[this.LISTENER_ID_KEY];
                if (typeof this._listeners[id] !== 'function') {
                    console.error('Wrong callback identifier. Ignoring message.');
                    return null;
                }
                var f = this._listeners[id];
                return f;
            }
        },
        getCallbackByKey: function(key) {
            if(this.callbackMap.has(key)) {
                var target = this.callbackMap.get(key);
                id = target.callbackId;

                if (target.callbackType == "callback") {
                    if (typeof this._callbacks[id] !== 'function') {
                        console.error('Wrong callback identifier. Ignoring message.');
                        return null;
                    }

                    target.callFunction = this._callbacks[id];

                    if (target.cnt == 1) {
                        delete this._callbacks[id];
                        this.callbackMap.delete(key);
                    }
                    else {
                        --(target.cnt);
                    }
                }
                else if (target.callbackType == "listener") {
                    if (typeof this._listeners[id] !== 'function') {
                        LoggerE('Wrong callback identifier. Ignoring message.');
                        return null;
                    }

                    target.callFunction = this._listeners[id];
                }
                return target;
            }
            else {
                LoggerE("[getCallback] The key is not available");
                return null;
            }
        },
        getErrorCallback: function(result) {
            var id;

            if (result.hasOwnProperty(this.CALLBACK_ID_KEY)) {
                id = result[this.CALLBACK_ID_KEY] + "err";

                if (typeof this._callbacks[id] !== 'function') {
                    console.error('Wrong callback identifier. Ignoring message.');
                    return null;
                }
                var f = this._callbacks[id];
                delete this._callbacks[id];
                return f;
            }
        }
    };

    var manager = function() {
        this.getDeviceDetailFunc = null;
    };

    manager.prototype = {
        /**
         * @api window.scplugin.manager.setCloudConnectionStateListener(onCloudConnectionStateCallback) void setCloudConnectionStateListener()
         * @apiName setCloudConnectionStateListener()
         * @apiGroup Plugin manager
         * @apiDescription Sets cloud Connection changes callback and monitors its state changes.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onCloudConnectionStateCallback Receives the state of TCP connection with cloud server.
         *
         * @apiExample {js} Example usage:
         * function onCloudConnectionStateCallback(state) {
         *     if (state == "CONNECTED") {
         *         // Do something...
         *     } else if (state == "DISCONNECTED") {
         *         // Do something...
         *     }
         * }
         *
         * window.scplugin.manager.setCloudConnectionStateListener(onCloudConnectionStateCallback);
         *
         */
        setCloudConnectionStateListener: function(callback) {
            //*** To be implemented ***//
        },
        /**
         * @api window.scplugin.manager.setApplicationStateListener(onApplicationStateCallback) void setApplicationStateListener()
         * @apiName setApplicationStateListener()
         * @apiGroup Plugin manager
         * @apiDescription Sets application state changes callback and monitors its state changes.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onApplicationStateCallback Receives the state of application.
         *
         * @apiExample {js} Example usage:
         * function onApplicationStateCallback(state) {
         *    if (state == "ACTIVE") {
         *       // Application become active.
         *    } else if (state == "BACKGROUND") {
         *       // Application enter background.
         *    }
         * }
         *
         * scplugin.manager.setApplicationStateListener(onApplicationStateCallback);
         *
         */
        setApplicationStateListener: function(callback) {
            //*** To be implemented ***//
        },
        /**
         * @api window.scplugin.manager.getOCFDevices(onOCFDevicesCallback,onErrorCallback) void getOCFDevices()
         * @apiName getOCFDevices()
         * @apiGroup Plugin manager
         * @apiDescription Gets OCF device object of available device selected when launching plugin.
         * This method can only be used on Device plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onOCFDevicesCallback Receives the OCF device object list.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported. This feature is only supported on Device plugin.
         *
         * @apiExample {js} Example usage: Device plugin
         * function onOCFDevicesCallback(devices) {
         *     for (var i in devices) {
         *         console.log("deviceHandle: " + devices[i].deviceHandle);
         *         console.log("deviceName: " + devices[i].deviceName);
         *         console.log("deviceType: " + devices[i].deviceType);
         *         console.log("metadata: " + devices[i].metadata);
         *     }
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.getOCFDevices(onOCFDevicesCallback, onErrorCallback);
         */
        getOCFDevices: function(onsuccess, onerror) {
            var cmd = "scclient_requestDeviceInfo"
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMOCFDeviceCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new _APIError("NotSupportedError", "This feature is not supported on Service plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.getService(onServiceCallback,onErrorCallback) void getService()
         * @apiName getService()
         * @apiGroup Plugin manager
         * @apiDescription Gets service object. This method can only be used on Service plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {Function} onServiceCallback Receives the Service object.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported. This feature is only supported on Service plugin.
         *
         * @apiExample {js} Example usage: Service plugin
         * function onServiceCallback(service) {
         *    console.log("serviceHandle: " + service.serviceHandle);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getService(onServiceCallback, onErrorCallback);
         */
        getService: function(onsuccess, onerror) {
            var cmd = "scclient_getService";
            var args = {};
            args.callbackName = "__onNMServiceCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new _APIError("NotSupportedError", "This feature is not supported on Service plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.getPluginData(handle,key,onPluginDataCallback) void getPluginData()
         * @apiName getPluginData()
         * @apiGroup Plugin manager
         * @apiDescription Gets the value of key from data table.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} handle Unique local ID. Each device handle has its own data table.
         * @apiParam {String} key Name of key to retrieve.

         * @apiParam {Function} onPluginDataCallback Receives value from the data table.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onPluginDataCallback(key, value) {
         *    if (value != null) {
         *       console.log(" key: " + key + " value: " + value );
         *    } else {
         *       console.log(" key: " + key + " > NOT FOUND VALUE");
         *    }
         * }
         *
         * scplugin.manager.getPluginData(ocfdevice.deviceHandle, "key_1", onPluginDataCallback);
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onPluginDataCallback(key, value) {
         *    if (value != null) {
         *       console.log(" key: " + key + " value: " + value );
         *    } else {
         *       console.log(" key: " + key + " > NOT FOUND VALUE");
         *    }
         * }
         *
         * scplugin.manager.getPluginData(service.serviceHandle, "key_a", onPluginDataCallback);
         *
         */
        getPluginData: function(handle, key, callback) {
            var cmd = "scclient_getPluginData";
            var args = {};
            args.id = handle;
            args.callbackName = "__onNMPluginDataCallback";
            args.key = key;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.setPluginData(handle,key,value) void setPluginData()
         * @apiName setPluginData()
         * @apiGroup Plugin manager
         * @apiDescription Sets the value and key to data table.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} handle Unique local ID. Each device handle has its own data table.
         * @apiParam {String} key Name of key to set.
         * @apiParam {String} value The value to add to the data table by the key.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * scplugin.manager.setPluginData(ocfdevice.deviceHandle, "key_1", "1234567890");
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * scplugin.manager.setPluginData(service.serviceHandle, "key_a", "abcdefghighk");
         *
         */
        setPluginData: function(handle, key, value) {
            var cmd = "scclient_setPluginData";
            var args = {};
            args.id = handle;
            args.key = key;
            args.value = value.toString();
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.deletePluginData(handle,key) void deletePluginData()
         * @apiName deletePluginData()
         * @apiGroup Plugin manager
         * @apiDescription Deletes key from data table.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} handle Unique local ID. Each device handle has its own data table.
         * @apiParam {String} key Name of key to delete.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * scplugin.manager.deletePluginData(ocfdevice.deviceHandle, "key_1");
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * scplugin.manager.deletePluginData(service.serviceHandle, "key_a");
         *
         */
        deletePluginData: function(handle, key) {
            var cmd = "scclient_deletePluginData";
            var args = {};
            args.id = handle;
            args.key = key;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.getSAAuthCode(clientId,codeVerifier,state,onSAAuthCodeCallback,scope,duid) void getSAAuthCode()
         * @apiName getSAAuthCode()
         * @apiGroup Plugin manager
         * @apiDescription Gets the auth code from Samsung Account.
         * @apiVersion 1.1.0
         * @apiPermission platform
         * @apiProfile common
         *
         * @apiParam {String} clientId Client id to be authorized.
         * @apiParam {String} codeVerifier Value to be sent to server for code challenge. It is necessary for server to recognize application.
         * It is required using the unreserved characters [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~" from Section 2.3 of [RFC3986], with a minimum length of 43 characters and a maximum length of 128 characters.
         * @apiParam {String} state The value to be sent to server so that it can send back the state value such that the response can be validated. (length : 16~32 character)
         * @apiParam {Function} onSAAuthCodeCallback Receives auth code from the account server.
         * @apiParam {String} [scope] Optional. The resource to be authorized.
         * @apiParam {String} [duid] Optional. The Device Unique Identifier of device to be authorized. It is required to issue a token for IoT device.
         *
         * @apiExample {js} Example usage:
         * function onSAAuthCodeCallback(result, authCode, authUrl, apiUrl, state) {
         *    if (result == "SUCCESS") {
         *       console.log("authCode: " + authCode + " authUrl: " + authUrl + " apiUrl: " + apiUrl + " state: " + state);
         *    }
         * }
         *
         * scplugin.manager.getSAAuthCode(clientId, codeVerifier, state, onSAAuthCodeCallback);
         *
         */
        getSAAuthCode: function(clientId, codeVerifier, state, callback, scope, duid) {
            //*** To be implemented ***//
        },
        /**
         * @api window.scplugin.manager.close() void close()
         * @apiName close()
         * @apiGroup Plugin manager
         * @apiDescription Closes the web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         * // Execute command
         * scplugin.manager.close();
         *
         */
        close: function() {
            window.scplugin.log.warning("", "close", "closeView");
        },
        /**
         * @api window.scplugin.manager.setFlag() void setFlag()
         * @apiName setFlag()
         * @apiGroup Plugin manager
         * @apiDescription Set flags of the web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         * // Execute command
         * scplugin.manager.setFlag("openAdditionalPage");
         *
         */
        setFlag: function(state) {
            window.scplugin.log.warning("", "setFlag", state);
        },
        /**
         * @api window.scplugin.manager.launchApplication(appLinkType,onLaunchApplicationCallback) void launchApplication()
         * @apiName launchApplication()
         * @apiGroup Plugin manager
         * @apiDescription Launches specific application page.
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {AppLinkType} appLinkType AppLink type to launch.
         * @apiParam {Function} onLaunchApplicationCallback Receives finish state of launching application page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse APP_LINK_TYPE
         *
         * @apiExample {js} Example usage: SAMSUNGPAY_REWARD_MAIN
         * function onLaunchApplicationCallback(appLinkType) {
         *     console.log("The application has launched successfully. : " + appLinkType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.launchApplication("SAMSUNGPAY_REWARD_MAIN", onLaunchApplicationCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: PLAYSTORE_SAMSUNGPAY
         * function onLaunchApplicationCallback(appLinkType) {
         *     console.log("The application has launched successfully. : " + appLinkType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.launchApplication("PLAYSTORE_SAMSUNGPAY", onLaunchApplicationCallback, onErrorCallback);
         */
        launchApplication: function(appLinkType, onsuccess, onerror) {
            //*** To be implemented ***//
        },
        /**
         * @api window.scplugin.manager.isApplicationInstalled(appNameType,onIsApplicationInstalledCallback,onErrorCallback) void isApplicationInstalled()
         * @apiName isApplicationInstalled()
         * @apiGroup Plugin manager
         * @apiDescription Checkes whether the application is installed.
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {AppNameType} appNameType The name of the application to retrieve.
         * @apiParam {Function} onIsApplicationInstalledCallback Receives installation state of application
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiUse APP_NAME_TYPE
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: SAMSUNGPAY
         * function onIsApplicationInstalledCallback(appNameType, state) {
         *    console.log("isApplicationInstalled : " + state);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.isApplicationInstalled("SAMSUNGPAY", onIsApplicationInstalledCallback, onErrorCallback);
         */
        isApplicationInstalled: function(appNameType, onsuccess, onerror) {
            //*** To be implemented ***//
        }
    };

    var log = function() {}

    log.prototype = {
        /**
         * @api window.scplugin.log.debug(className,functionName,msg) void debug()
         * @apiName debug()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.debug(className, functionName, msg);
         *
         */
        debug: function(className, functionName, msg) {
            var cmd = "scclient_debugLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scclient_debugLog.postMessage(args);
            } catch (e) {}
            //console.log(className +":"+ functionName +":"+ msg );
        },
        /**
         * @api window.scplugin.log.error(className,functionName,msg) void error()
         * @apiName error()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.error(className, functionName, msg);
         *
         */
        error: function(className, functionName, msg) {
            var cmd = "scclient_errorLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scclient_errorLog.postMessage(args);
            } catch (e) {}
            //console.log(className +":"+ functionName +":"+ msg );
        },
        /**
         * @api window.scplugin.log.info(className,functionName,msg) void info()
         * @apiName info()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.info(className, functionName, msg);
         *
         */
        info: function(className, functionName, msg) {
            var cmd = "scclient_infoLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scclient_infoLog.postMessage(args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.log.verbose(className,functionName,msg) void verbose()
         * @apiName verbose()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.verbose(className, functionName, msg);
         *
         */
        verbose: function(className, functionName, msg) {
            var cmd = "scclient_verboseLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scclient_verboseLog.postMessage(args);
            } catch (e) {}
            //console.log(className +":"+ functionName +":"+ msg );
        },
        /**
         * @api window.scplugin.log.warning(className,functionName,msg) void warning()
         * @apiName warning()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.warning(className, functionName, msg);
         *
         */
        warning: function(className, functionName, msg) {
            var cmd = "scclient_warningLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scclient_warningLog.postMessage(args)
            } catch (e) {}
           // console.log(className +":"+ functionName +":"+ msg );
        }
    };

    var AnalyticsLog = function() {}

    AnalyticsLog.prototype = {
        /**
         * @api window.scplugin.analyticsLog.insert(screenId,event,detail,onErrorCallback) void insert()
         * @apiName insert()
         * @apiGroup AnalyticsLog
         * @apiDescription Samsung analytics logging utility for web plugin.
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} screenId Screen ID for log message formatting.
         * @apiParam {String} event Event for log message formatting.
         * @apiParam {String} detail Detail message for log.
         * @apiParam {Function} [onErrorCallback] Optional. Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * window.scplugin.analyticsLog.insert(screenId, event, detail, onErrorCallback);
         *
         */
        insert: function(screenId, event, detail, onerror) {
            //*** to be implemented ***//
        }
    };

    /**
     * @api Service
     * @apiName Service
     * @apiGroup Service
     * @apiDescription The Service object contains information about service and interface for a plugin to interact with the endpoint app.
     * @apiVersion 1.1.0
     * @apiPermission public
     * @apiProfile service
     *
     * @apiSuccess (Property) {String} serviceHandle Unique local ID.
     * @apiSuccess (Property) {JSON} extraData Extra data received from launcher.
     *
     * @apiExample {js} Example usage:
     * // Assume service object has been obtained by using scplugin.manager.getService() method.
     * var handle = service.serviceHandle;
     * var extraData = service.extraData;
     *
     */
    var Service = function(args) {
        Object.defineProperties(this, {
            serviceHandle: {
                value: args.serviceHandle,
                writable: false,
                enumerable: true
            },
            extraData: {
                value: args.extraData,
                writable: false,
                enumerable: true
            }
        });
    }

    Service.prototype = {
        /**
         * @api Service.subscribe(onServiceEventCallback) void subscribe()
         * @apiName subscribe()
         * @apiGroup Service
         * @apiDescription Subscribes for data changes of endpoint app.
         * Note that Only one callback can be registered. If a callback reference is registered several times, only the last registered callback is available.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {Function} onServiceEventCallback Receive updates event from the endpoint app.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onServiceEventCallback(result, event) {
         *     if (result == "SUCCESS") {
         *         // Do something...
         *     }
         * }
         *
         * service.subscribe(onServiceEventCallback);
         *
         */
        subscribe: function(callback) {
            //*** To be implemented ***//
        },
        /**
         * @api Service.unsubscribe() void unsubscribe()
         * @apiName unsubscribe()
         * @apiGroup Service
         * @apiDescription Unsubscribes to endpoint app event changes.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * service.unsubscribe();
         *
         */
        unsubscribe: function() {
            //*** To be implemented ***//
        },
        /**
         * @api Service.sendRequest(payload,onServiceResponseCallback) void sendRequest()
         * @apiName sendRequest()
         * @apiGroup Service
         * @apiDescription Requests operation to endpoint app.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {JSON} payload Data to be requested to endpoint app
         * @apiParam {Function} onServiceResponseCallback Receives response from endpoint app.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onServiceResponseCallback(result, response) {
         *     if (result == "SUCCESS") {
         *         console.log("received data : " + response);
         *     }
         * }
         *
         * var payload = { "method":"GET",
         *     "uri":"/devices/8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0/consumption?from=1519199156000&to=1520411667000",
         *     "locale":"en-US"
         * };
         * service.sendRequest(payload, onServiceResponseCallback);
         *
         */
        sendRequest: function(payload, callback) {
            var cmd = "scclient_sendRequest";
            var args = {};
            args.callbackName = "__onNMServiceResponseCallback";
            args.cmd = cmd;
            args.restMethod = "POST";
            args.serviceHandle = this.serviceHandle;
            args.payload = payload;
            args.id = this.serviceHandle;

            if (args.payload.payload.parameters.hasOwnProperty("uri"))
                args.uri = payload.payload.parameters.uri;

            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api Service.launchConfiguration(onServiceConfigurationCallback) void launchConfiguration()
         * @apiName launchConfiguration()
         * @apiGroup Service
         * @apiDescription Launches configuration page.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {Function} onServiceConfigurationCallback Receives finish state of configuration.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onServiceConfigurationCallback(result) {
         *     if (result == "SUCCESS") {
         *         // Do something...
         *     }
         * }
         *
         * service.launchConfiguration(onServiceConfigurationCallback);
         *
         */
        launchConfiguration: function(callback) {
            //*** To be implemented ***//
        },
        /**
         * @api Service.launchDevicePlugin(deviceId,onLaunchPluginCallback,onErrorCallback,extraData) void launchDevicePlugin()
         * @apiName launchDevicePlugin()
         * @apiGroup Service
         * @apiDescription Launches device detail page.
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile service
         * @apiPrivate
         *
         * @apiParam {String} deviceId Unique device ID.
         * @apiParam {Function} onLaunchPluginCallback Receives finish state of launching device detail page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {JSON} [extraData] Optional. Extra data to send.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onLaunchPluginCallback(deviceId) {
         *     console.log("The Device plugin has launched successfully. : " + deviceId);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * service.launchDevicePlugin(deviceId, onLaunchPluginCallback, onErrorCallback, extraData);
         */
        launchDevicePlugin: function(deviceId, onsuccess, onerror, extraData) {
            var cmd = "scclient_launchDevicePlugin";
            var args = {};
            args.callbackName = "__onLaunchPluginCallback";
            args.cmd = cmd;
            args.deviceId = deviceId;

            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess);
            } catch (e) {}
        },
        /**
         * @api Service.getLocationNickname(onLocationNicknameCallback,onErrorCallback) void getLocationNickname()
         * @apiName getLocationNickname()
         * @apiGroup Service
         * @apiDescription Gets location nickname
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile service
         * @apiPrivate
         *
         * @apiParam {Function} onLocationNicknameCallback Receives Location nickname.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onLocationNicknameCallback(nickname) {
         *     console.log("Location nickname: " + nickname);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * service.getLocationNickname(onLocationNicknameCallback, onErrorCallback);
         */
        getLocationNickname: function(onsuccess, onerror) {
            //*** To be implemented ***//
        },
        /**
         * @api Service.shareText(text,onShareTextCallback,onErrorCallback) void shareText()
         * @apiName shareText()
         * @apiGroup Service
         * @apiDescription Shares text data to other application.
         * @apiVersion 1.2.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {String} text The text data to be shared.
         * @apiParam {Function} onShareTextCallback Invokes when text sharing request has been completed.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onShareTextCallback() {
         *     console.log("Text sharing request has been sent successfully");
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * service.shareText("Hello, I'm granting you access to my Home's Front door. Here are the details. 50845646",
         *     onShareTextCallback, onErrorCallback);
         */
        shareText: function(text, onsuccess, onerror) {
            //*** To be implemented ***//
        },
    }

    /**
     * @api OCFDevice
     * @apiName OCFDevice
     * @apiGroup OCFDevice
     * @apiDescription The OCFDevice object contains information about devices and interface for a plugin to interact with the cloud server.
     * @apiVersion 1.1.0
     * @apiPermission public
     * @apiProfile device
     *
     * @apiSuccess (Property) {String} deviceHandle Unique local ID.
     * @apiSuccess (Property) {String} deviceType DeviceType Uri.
     * @apiSuccess (Property) {String} deviceName Device name.
     * @apiSuccess (Property) {[String]} resourceUris All resource URIs of device.
     * @apiSuccess (Property) {String} locationId Location Id of device.
     * @apiSuccess (Property) {String} locationName Location name of device.
     * @apiSuccess (Property) {String} owner Device permission of user. ("me" or "others")
     * @apiSuccess (Property) {String} firmwareVersion Device firmware version.
     * @apiSuccess (Property) {JSON} metaData UIMetadata of device.
     * @apiSuccess (Property) {JSON} extraData Extra data received from launcher. The extraData is supported since v1.1.0.
     *
     * @apiExample {js} Example usage: Device plugin
     * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
     * var handle = ocfdevice.deviceHandle;
     * var uris = ocfdevice.resourceUris;
     *
     */
    var OCFDevice = function(args) {
        Object.defineProperties(this, {
            deviceHandle: {
                // value: args.deviceHandle,
                value: args.deviceId,
                writable: false,
                enumerable: true
            },
            deviceType: {
                value: args.deviceType,
                writable: false,
                enumerable: true
            },
            deviceName: {
                value: args.deviceName,
                writable: false,
                enumerable: true
            },
            resourceUris: {
                value: args.resourceUris,
                writable: false,
                enumerable: true
            },
            locationId: {
                value: args.locationId,
                writable: false,
                enumerable: true
            },
            locationName: {
                value: args.locationName,
                writable: false,
                enumerable: true
            },
            roomId: {
                value: args.roomId,
                writable: false,
                enumerable: true
            },
            roomName: {
                value: args.roomName,
                writable: false,
                enumerable: true
            },
            owner: {
                value: args.owner,
                writable: false,
                enumerable: true
            },
            firmwareVersion: {
                value: args.firmwareVersion,
                writable: false,
                enumerable: true
            },
            metaData: {
                value: "{\"code\":2000000,\"message\":\"SUCCESS\",\"data\":" + JSON.stringify(args.metadata) + "}",
                enumerable: true
            },
            extraData: {
                value: args.extraData,
                writable: false,
                enumerable: true
            }
        });
    };

    OCFDevice.prototype = {
        /**
         * @api OCFDevice.subscribe(onRepresentCallback,uris) void subscribe()
         * @apiName subscribe()
         * @apiGroup OCFDevice
         * @apiDescription Subscribes for data changes of the device.
         * Note that Only one callback per OCFDevice object can be registered. If a callback reference is registered several times, only the last registered callback is available.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onRepresentCallback Receives updates from the server.
         * @apiParam {[String]} [uris] Optional. Resource URI for subscription. By default this parameter is set to all resources URIs.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onRepresentCallback(result, deviceHandle, uri, representation) {
         *     if (result == "OCF_OK") {
         *         if (uri == "/switch/main/0") {
         *             // Do something...
         *         }
         *     }
         * }
         *
         * // All the resources URIs
         * ocfdevice.subscribe(onRepresentCallback);
         *
         * // Given resource URIs
         * var uris = ["/switch/main/0", "/thermostatSetpoint/main/0"];
         * ocfdevice.subscribe(onRepresentCallback, uris);
         *
         */
        subscribe: function(callback, uris) {
            var cmd = "scclient_subscribe";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMRepresentCallback";
            if (uris == undefined) {
                args.uris = this.resourceUris;
            }
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.deviceHandle, args, callback);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.unsubscribe() void unsubscribe()
         * @apiName unsubscribe()
         * @apiGroup OCFDevice
         * @apiDescription Unsubscribes to device attribute changes. All resource URIs are unsubscribed.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * ocfdevice.unsubscribe();
         *
         */
        unsubscribe: function() {
            var cmd = "scclient_unsubscribe";
            var args = {};
            args.id = this.deviceHandle;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scclient_subscribe" + this.deviceHandle, args);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.getRemoteRepresentation(uri,onRepresentCallback) void getRemoteRepresentation()
         * @apiName getRemoteRepresentation()
         * @apiGroup OCFDevice
         * @apiDescription Gets representation from resource of the device.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {String} uri Resource URI.
         * @apiParam {Function} onRepresentCallback Receives updated representation from the server.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onRepresentCallback(result, deviceHandle, uri, representation) {
         *     if (result == "OCF_OK") {
         *         if (representation["power"] == "on") {
         *             // Do something...
         *         }
         *     }
         * }
         *
         * ocfdevice.getRemoteRepresentation("/switch/main/0", onRepresentCallback);
         *
         */
        getRemoteRepresentation: function(uri, callback) {
            var cmd = "scclient_getRemoteRepresentation";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMgetRepresentationCallback";
            args.uri = uri;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.setRemoteRepresentation(uri,jsonObject,onRepresentCallback) void setRemoteRepresentation()
         * @apiName setRemoteRepresentation()
         * @apiGroup OCFDevice
         * @apiDescription Sets resource representation on the device.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {String} uri Resource URI.
         * @apiParam {Object} jsonObject Representation to be set on device.
         * @apiParam {Function} onRepresentCallback Receives updated representation from the server.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onRepresentCallback(result, deviceHandle, uri, representation) {
         *     if (result == "OCF_RESOURCE_CHANGED") {
         *         if (representation["power"] == "off") {
         *             console.log("Switch Off : OK");
         *         }
         *     }
         * }
         *
         * var setRcsJson = {};
         * setRcsJson.power = "off";
         * ocfdevice.setRemoteRepresentation("/switch/main/0", setRcsJson, onRepresentCallback);
         *
         */
        setRemoteRepresentation: function(uri, jsonObject, callback) {
            var cmd = "scclient_setRemoteRepresentation";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMsetRepresentationCallback";
            args.uri = uri;
            args.rcsRepJson = jsonObject;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.startMonitoringConnectionState(onMonitoringStateCallback) void startMonitoringConnectionState()
         * @apiName startMonitoringConnectionState()
         * @apiGroup OCFDevice
         * @apiDescription Monitors device connection state [CONNECTED/DISCONNECTED] on cloud.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onMonitoringStateCallback Receives updates from the server.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onMonitoringStateCallback(result, deviceHandle, state) {
         *     if (result == "OCF_OK") {
         *         if (state == "CONNECTED") {
         *             // Do something...
         *         } else if (state == "DISCONNECTED") {
         *             // Do something...
         *         } else if (state == "INACTIVE") {
         *             // Do something...
         *         } else if (state == "UNKNOWN") {
         *             // Do something...
         *         }
         *     }
         * }
         *
         * ocfdevice.startMonitoringConnectionState(onMonitoringStateCallback);
         */
        startMonitoringConnectionState: function(callback) {
            var cmd = "scclient_startMonitoringConnectionState";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMMonitoringStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.deviceHandle, args, callback);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.stopMonitoringConnectionState() void stopMonitoringConnectionState()
         * @apiName stopMonitoringConnectionState()
         * @apiGroup OCFDevice
         * @apiDescription Stops monitoring device state on cloud.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * ocfdevice.stopMonitoringConnectionState();
         *
         */
        stopMonitoringConnectionState: function() {
            var cmd = "scclient_stopMonitoringConnectionState";
            var args = {};
            args.id = this.deviceHandle;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scclient_startMonitoringConnectionState" + this.deviceHandle, args);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.getActivityHistory(onDeviceActivityHistoryCallback,onErrorCallback,requestBody) void getActivityHistory()
         * @apiName getActivityHistory()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Gets device activity history.
         * @apiVersion 1.2.5
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Function} onDeviceActivityHistoryCallback Receives activity history.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [requestBody] Optional. The object of Request body
         * @apiParam {Number} [requestBody.before] Optional. Paging parameter for going to previous page. Before epoch time(millisecond).
         * @apiParam {Number} [requestBody.beforeHash] Optional. Paging parameter for going to previous page. This needs to be specified when 'before' is specified. Please put in associated hash value of the record specified by the 'before' parameter.
         * @apiParam {Number} [requestBody.after] Optional. Paging parameter for going to next page. After epoch time(millisecond).
         * @apiParam {Number} [requestBody.afterHash] Optional. Paging parameter for going to next page. This needs to be specified when 'after' is specified. Please put in associated hash value of the record specified by the 'after' parameter.
         * @apiParam {Number} [requestBody.limit] Optional. Number of records to return. Default: 20
         * @apiParam {Boolean} [requestBody.oldestFirst] Optional. This controls ordering of results. When ont specified or 'oldestFirst=false', server will list newest history first, aka descending order.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Device activity history
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onDeviceActivityHistoryCallback(response) {
         *     console.log("Activity history : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var requestBody = {"oldestFirst": true, "limit": 10};
         * ocfdevice.getActivityHistory(onDeviceActivityHistoryCallback, onErrorCallback, requestBody);
         *
         */
        getActivityHistory: function(onsuccess, onerror, requestBody) {
            var cmd = "scclient_getActivityHistory";
            var args = {};
            args.callbackName = "__onNMProdGetDeviceActivityHistoryCallback";
            args.requestBody = requestBody;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    /**
     * @api APIError
     * @apiName APIError
     * @apiGroup APIError
     * @apiDescription Generic error interface
     * @apiVersion 1.1.0
     *
     * @apiSuccess (Property) {String} name An error type.
     * @apiSuccess (Property) {String} message An error message that describes the details of the error encountered.
     */
    var _APIError = function(name, message) {
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
        return this;
    };

    _APIError.prototype = new Error();
    _APIError.prototype.constructor = _APIError;

    var _scplugin = function() {
        this.manager = new manager();
        this.log = new log();
        this._scPluginNative = new NativeManager();
        this._APIError = new _APIError();
        this.analyticsLog = new AnalyticsLog();
    }
    _scplugin.prototype._getOCFDevices = function(devices) {
        var deviceList = new Array();
        deviceList.push(new OCFDevice(devices));
        return deviceList;
    };
    _scplugin.prototype._getService = function(service) {
        return new Service(service);
    };

    window.scplugin = new _scplugin();
})(window, document);

/**
 * @apiDefine OCF_RESULT OCF_RESULT
 * @apiError (result) OCF_OK Success status code
 * @apiError (result) OCF_ERROR Operation failed
 * @apiError (result) OCF_RESOURCE_CHANGED Resource has been changed successfully
 * @apiError (result) OCF_INVALID_PARAM Invalid parameter
 */

/**
 * @apiDefine REQUEST_RESULT REQUEST_RESULT
 * @apiError (result) SUCCESS Successful
 * @apiError (result) SECURITY_ERR Permission denied
 * @apiError (result) INVALID_PARAM_ERR Invalid parameter
 * @apiError (result) NOT_SUPPORTED_ERR Not supported feature
 * @apiError (result) UNKNOWN_ERR Unknown error
 */

/**
 * @apiDefine APP_LINK_TYPE APP_LINK_TYPE
 * @apiError (AppLinkType) {String} SAMSUNGPAY_REWARD_MAIN For reward main page of SamsungPay
 * @apiError (AppLinkType) {String} PLAYSTORE_SAMSUNGPAY For SamsungPay page of Play Store
 */

/**
 * @apiDefine APP_NAME_TYPE APP_NAME_TYPE
 * @apiError (AppNameType) {String} SAMSUNGPAY The application name of SamsungPay
 */

// For Callback Function Definition
/**
 * @api onRepresentCallback(result,deviceHandle,uri,representation) void onRepresentCallback()
 * @apiName onRepresentCallback
 * @apiGroup Device Callback Function
 * @apiDescription Gets response from cloud.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} result Result of the request. "OCF_OK" when there is no problem, appropriate error code otherwise.
 * @apiParam {String} deviceHandle Unique local device ID from which representation received.
 * @apiParam {String} uri URI of resource from which representation received.
 * @apiParam {JSON} representation Representation received from server.
 *
 * @apiUse OCF_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Device plugin
 * function onRepresentCallback(result, deviceHandle, uri, representation) {
 *     if (result == "OCF_OK") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onMonitoringStateCallback(result,deviceHandle,state) void onMonitoringStateCallback()
 * @apiName onMonitoringStateCallback
 * @apiGroup Device Callback Function
 * @apiDescription Gets device connection state from cloud.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} result Result of the request. "OCF_OK" when there is no problem, appropriate error code otherwise.
 * @apiParam {String} deviceHandle Unique local device ID from which representation received.
 * @apiParam {String} state Device connection state from device.
 *                                "CONNECTED" / "DISCONNECTED" / "UNKNOWN" / "INACTIVE"
 *
 * @apiUse OCF_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Device plugin
 * function onMonitoringStateCallback(result, deviceHandle, state) {
 *     if (result == "OCF_OK") {
 *         if (state == "CONNECTED") {
 *             // Do something...
 *         } else if (state == "DISCONNECTED") {
 *             // Do something...
 *         } else if (state == "INACTIVE") {
 *             // Do something...
 *         } else if (state == "UNKNOWN") {
 *             // Do something...
 *         }
 *     }
 * }
 *
 */

/**
 * @api onPluginDataCallback(key,value) void onPluginDataCallback()
 * @apiName onPluginDataCallback
 * @apiGroup Common Callback Function
 * @apiDescription Gets plugin data from data table.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} key The key to search mapped data.
 * @apiParam {String} value The value assigned to the requested key. Note that if the key is not found, null is passed.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onPluginDataCallback(key, value) {
 *    if (value != null) {
 *       console.log(" key: " + key + " value: " + value );
 *    } else {
 *       console.log(" key: " + key + " > NOT FOUND VALUE");
 *    }
 * }
 *
 */

/**
 * @api onApplicationStateCallback(state) void onApplicationStateCallback()
 * @apiName onApplicationStateCallback
 * @apiGroup Common Callback Function
 * @apiDescription Gets application state.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} state Current state of the application.
 *                                "ACTIVE" / "BACKGROUND"
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onApplicationStateCallback(state) {
 *     if (state == "ACTIVE") {
 *         // Do something...
 *     } else if (state == "BACKGROUND") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onCloudConnectionStateCallback(state) void onCloudConnectionStateCallback()
 * @apiName onCloudConnectionStateCallback
 * @apiGroup Common Callback Function
 * @apiDescription Gets cloud connection state.(Sign in/Sign out).
 * @apiVersion 1.0.0
 *
 * @apiParam {String} state Cloud connection state. If the connection state is 'DISCONNECTED', the OCFDevice and Service api will not work.
 *                                "CONNECTED" / "DISCONNECTED"
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onCloudConnectionStateCallback(state) {
 *     if (state == "CONNECTED") {
 *         // Do something...
 *     } else if (state == "DISCONNECTED") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onOCFDevicesCallback(devices) void onOCFDevicesCallback()
 * @apiName onOCFDevicesCallback
 * @apiGroup Device Callback Function
 * @apiDescription Gets device list.
 * @apiVersion 1.0.0
 *
 * @apiParam {[OCFDevice]} devices The OCFDevice object list.
 *
 * @apiExample {js} Callback Function - Example usage: Device plugin
 * function onOCFDevicesCallback(devices) {
 *    for (var i in devices) {
 *       console.log("deviceHandle: " + devices[i].deviceHandle);
 *       console.log("deviceName: " + devices[i].deviceName);
 *       console.log("deviceType: " + devices[i].deviceType);
 *       console.log("metadata: " + devices[i].metadata);
 *    }
 * }
 *
 * scplugin.manager.getOCFDevices(onOCFDevicesCallback);
 */

/**
 * @api onServiceCallback(service) void onServiceCallback()
 * @apiName onServiceCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets service object.
 * @apiVersion 1.1.0
 *
 * @apiParam {Service} service The Service object.
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onServiceCallback(service) {
 *    console.log("serviceHandle: " + service.serviceHandle);
 * }
 *
 * scplugin.manager.getService(onServiceCallback);
 */

/**
 * @api onServiceEventCallback(result,event) void onServiceEventCallback()
 * @apiName onServiceEventCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets event data from endpoint app.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 * @apiParam {JSON} event Event receives from endpoint app.
 *
 * @apiUse REQUEST_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onServiceEventCallback(result, event) {
 *     if (result == "SUCCESS") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onServiceResponseCallback(result,response) void onServiceResponseCallback()
 * @apiName onServiceResponseCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets the response data from endpoint app.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 * @apiParam {JSON} response Response User defined data received from endpoint app.
 *
 * @apiUse REQUEST_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onServiceResponseCallback(result, response) {
 *     if (result == "SUCCESS") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onServiceConfigurationCallback(result) void onServiceConfigurationCallback()
 * @apiName onServiceConfigurationCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets the state of configuration.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 *
 * @apiUse REQUEST_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onServiceConfigurationCallback(result) {
 *     if (result == "SUCCESS") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onSAAuthCodeCallback(result,authCode,authUrl,apiUrl,state) void onSAAuthCodeCallback()
 * @apiName onSAAuthCodeCallback
 * @apiGroup Common Callback Function
 * @apiDescription Gets authCode and URL.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 * @apiParam {String} authCode The auth code.
 * @apiParam {String} authUrl Auth Server URI of endpoint to exchange access token.
 * @apiParam {String} apiUrl API Server URI of endpoint for HTTP request.
 * @apiParam {String} state The state send back from account server.
 *
 * @apiUse REQUEST_RESULT
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onSAAuthCodeCallback(result, authCode, authUrl, apiUrl, state) {
 *     if (result == "SUCCESS") {
 *         console.log("authCode: " + authCode + " authUrl: " + authUrl + " apiUrl: " + apiUrl + " state: " + state);
 *     }
 * }
 *
 */

/**
 * @api onErrorCallback(error) void onErrorCallback()
 * @apiName onErrorCallback
 * @apiGroup Common Callback Function
 * @apiDescription Method that is invoked when an error occurs.
 * @apiVersion 1.1.0
 *
 * @apiParam {APIError} error Generic error.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onErrorCallback(error) {
 *     console.log("error name: " + error.name + " message: " + error.message);
 * }
 *
 */

/**
 * @api onIsApplicationInstalledCallback(appNameType,state) void onIsApplicationInstalledCallback()
 * @apiName onIsApplicationInstalledCallback
 * @apiGroup Common Callback Function
 * @apiDescription Method invoked when the invocation ends successfully.
 * @apiVersion 1.1.1
 * @apiPrivate
 *
 * @apiParam {AppNameType} appNameType Application name of the corresponding operation.
 * @apiParam {Boolean} state true if application is installed, otherwise false if the application is not installed.
 *
 * @apiUse APP_NAME_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onIsApplicationInstalledCallback(appNameType, state) {
 *     console.log("isApplicationInstalled : " + state);
 * }
 *
 */

/**
 * @api onLaunchApplicationCallback(appLinkType) void onLaunchApplicationCallback()
 * @apiName onLaunchApplicationCallback
 * @apiGroup Common Callback Function
 * @apiDescription Method invoked when the invocation ends successfully.
 * @apiVersion 1.1.1
 * @apiPrivate
 *
 * @apiParam {AppLinkType} appLinkType AppLink Type of the corresponding operation.
 *
 * @apiUse APP_LINK_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onLaunchApplicationCallback(appLinkType) {
 *     console.log("The application has launched successfully. : " + appLinkType);
 * }
 *
 */

/**
 * @api onLocationNicknameCallback(nickname) void onLocationNicknameCallback()
 * @apiName onLocationNicknameCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets Location nickname.
 * @apiVersion 1.1.1
 * @apiPrivate
 *
 * @apiParam {String} nickname The Location nickname.
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onLocationNicknameCallback(nickname) {
 *     console.log("Location nickname: " + nickname);
 * }
 *
 */

/**
 * @api onShareTextCallback() void onShareTextCallback()
 * @apiName onShareTextCallback
 * @apiGroup Service Callback Function
 * @apiDescription Method invoked when text sharing request has been completed.
 * @apiVersion 1.2.0
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onShareTextCallback() {
 *     console.log("Text sharing request has been sent successfully");
 * }
 *
 */
