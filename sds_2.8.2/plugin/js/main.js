/*
Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information").
You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.
SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/******************************************************************************
 * Configure Value
 *******************************************************************************/
var HNDevicePluginVersion = "2.8.2"; // plugin : 2.8.2, ST app : 1.7.57, Date : Apr 21 2021
var LocaleCode = getPreferredLocaleCode(navigator.language);

window.VERBOSE_LOG_FLAG = false;    //debug log option

var openAdditionalPages = 0;    //count additional page

//plugin load state. start -> loading -> loaded,  reloading -> loaded
const PLUGIN_LOAD_STATE_START = "start";
const PLUGIN_LOAD_STATE_LOADING = "loading";
const PLUGIN_LOAD_STATE_RELOADING = "reloading";
const PLUGIN_LOAD_STATE_LOADED = "loaded";

//Timeout values
const GET_ALL_CAPA_TIMEOUT_VALUE = 6000;
const LOADING_TIMEOUT_VALUE = 15000;
const UNDO_TIMEOUT_VALUE = 10000;
const RETRY_TIMEOUT_VALUE = 3000;

const DEVICE_CONNECTED = "CONNECTED";
const DEVICE_DISCONNECTED = "DISCONNECTED";
const DEVICE_INACTIVE = "INACTIVE";
const NETWORK_DISCONNECTED = "NETWORK_DISCONNECTED";

//loading error.
const PLUGIN_UNKNOWN_ERROR = "PLUGIN_UNKNOWN_ERROR";
const ST_API_DOES_NOT_WORK = "ST_API_DOES_NOT_WORK";
const CANT_CREATE_DEVICE = "CANT_CREATE_DEVICE";
const INVALID_DEVICE_DATA = "INVALID_DEVICE_META_DATA";
const MOBILE_NETWORK_DISCONNECT = "MOBILE_NETWORK_DISCONNECTED";

//Navigate View Type
const NAVIGATE_VIEW_TYPE_EDIT = "EDIT_DEVICE_DETAIL_VIEW";

// ### Elapsed Time ###
window.elapsedTimeLog = {};
const ELAPSED_TIME_KEY = "ElapsedTimeKey";
// ### Test Mode Key ###
const TEST_MODE_KEY = "TestModeKey";

//Set Hash & Page initial value.
var historyLen = window.history.length;
var hashHistory = [window.location.hash];

//Scrollbar
var tScrollBarHandle = undefined;

//For Log
window.VERBOSE_LOG_FLAG = true;
window.CONSOLE_LOG_FLAG = true; //set false when it is released.

// ### important
//Supported HomeNet (Home Automation System) Device List
window.supportDeviceList = {
    "Light" : {deviceType: "oic.d.light"/*, vid: "B2B_BANPO"*/},
    "Airconditioner": {deviceType: "oic.d.airconditioner"},
    "Elevator": {deviceType: "x.com.st.d.elevator"},
    "GasValve": {deviceType: "x.com.st.d.gasvalve"},
    "Thermostat": {deviceType: "oic.d.thermostat"},
    "Vent": {deviceType: "x.com.st.d.vent", rtList: ["x.com.st.powerswitch", "x.com.st.fanspeed"]},
    "WindowShade": {deviceType: "oic.d.blind"},
    "IntegratedSwitch": {deviceType: "oic.d.switch"},
    "SmartLock": {deviceType: "oic.d.smartlock"},
    "VideoIntercom":{deviceType: "x.com.st.d.doorbell", rtList: ["x.com.st.r.homenet.videoIntercom"]},
    "SmartPlug": {deviceType: "oic.d.smartplug"}
};

window.noStateCapability = ["/capability/momentary", "/capability/refresh"];

/********* Common Function  *********/

// internationalization function.
var C_ = function(_id_, ...arg) {
    if (window.LanguageSet && window.LanguageSet.hasOwnProperty(_id_)) {
        return window.sprintf(window.LanguageSet[_id_], ...arg).replace(/\n/g, '<br>');
    } else {
        return _id_;
    }
};

// find locale string from PO Code list -> Language Set (local) -> default (en_US) PO Code List
function GetStringByPoCode(_code_) {
    if (HNCtrl && _code_) {
        var text = undefined;
        //1. check PO Code list
        if (HNCtrl.hasOwnProperty("poCodeList")) {
            text = HNCtrl.poCodeList[_code_];
        }

        //2. check user language set ( it defined in <your_devce.js> )
        if (text === undefined && window.LanguageSet) {
            text = window.LanguageSet[_code_];
        }

        //3. check default PO code list ( en_US ).
        if (text === undefined && HNCtrl.hasOwnProperty("defaultPoCodeList")) {
            text = HNCtrl.defaultPoCodeList[_code_];
        }

        return text;
    }
    return undefined;
}

function exitPluginPage() {
    LoggerI("Close View!!!");

    if (!isFHub()) {
        try {
            scplugin.manager.close();
        } catch (e) {
            LoggerE("close view error", true, e);
        }
    } else {
        if (openAdditionalPages > 0) {
            openAdditionalPages--;
            HNView.pageCtrl.pop();
        } else {
            try {
                scplugin.manager.close();
            } catch (e) {
                LoggerE("close view error", true, e);
            }
        }
    }
}

function moreOption() {
    LoggerI("Open More Option");
    /*
    if (HNCtrl && HNCtrl.pluginLoadState === PLUGIN_LOAD_STATE_LOADED) {
         if (HNView) {
             HNView.showMoreOptDlg();
         }
    } else {
        LoggerI("stil loading...");
    }
    */
   if (HNView) {
       HNView.showMoreOptDlg();
   }
}

// Display Resource
function DPResource(n, o, u, r, p, a, l, ra, st, c, ct, iu) {
    var al = {};
    var al_type = {};
    if (a != null) {
        for (var i = 0; i < a.length; i++) {
            al[a[i].key] = a[i].value;
            if (a[i].type == "inactive") {
                al_type[false] = a[i].key;
                al_type[a[i].key] = false;
            } else {
                al_type[true] = a[i].key;
                al_type[a[i].key] = true;
            }
        }
    }

    Object.defineProperties(this, {
        name: {
            value: n,
            writable: false,
            enumerable: true
        },
        order: {
            value: o,
            writable: false,
            enumerable: true
        },
        uri: {
            value: (u) ? u.trim() : undefined,
            writable: false,
            enumerable: true
        },
        rt: {
            value: (r) ? r.trim() : undefined,
            writable: false,
            enumerable: true
        },
        property: {
            value: (p) ? p.trim() : undefined,
            writable: false,
            enumerable: true
        },
        alternatives: {
            value: al,
            writable: false,
            enumerable: true
        },
        alternative_type: {
            value: al_type,
            writable: false,
            enumerable: true
        },
        label: {
            value: l,
            writable: false,
            enumerable: true
        },
        range: {
            value: (ra) ? ra : undefined,
            writable: false,
            enumerable: true
        },
        step: {
            value: (st) ? st : undefined,
            writable: false,
            enumerable: true
        },
        controllable: {
            value: c,
            writable: false,
            enumerable: true
        },
        controlType: {
            value: (ct) ? ct : undefined,
            writable: false,
            enumerable: true
        },
        iconUrl: {
            value: (iu) ? iu : undefined,
            writable: false,
            enumerable: true
        }
    });
}

/******************************************************************************
 * Main Controller
 *******************************************************************************/

var MainController = function(_view_) {
        this.view = _view_;
        this.device = undefined;
        this.HNDevice = null;
        this.metaData = undefined;
        this.dpResourceList = new Object();   // Display Resource list from meta data.
        this.poCodeList = new Object();     // lable(poCode) list from meta data.
        this.defaultPoCodeList = new Object(); //default (en_US) lable(poCode) list from meta data.  you can change DefaultLocaleCode in language.js
        this.requestedURIs = new Array();   // uri array of getRemoteRepresentation
        this.capabilityValues = new Object();    //capability's value list from ST Cloud.

        this.getAllCapaDataCallback = null;
        this.getAllCapaDataTimeout = 0;

        this.loadingScreenTimer = undefined;
        this.pluginLoadState = PLUGIN_LOAD_STATE_START;   // default is load
        this.deviceConnectionState = DEVICE_CONNECTED;  // default is 'connected'.
        this.prevOnlineStatus = navigator.onLine;
        this.onlineHandle = undefined;
        this.displayInfo = {
            deviceName: undefined,
            locationName: undefined,
            roomName: undefined
        };

        var _listenerId = 0;
        this._listeners = {};
        Object.defineProperties(this, {
            nextListenerId: {
                get: function() {
                    return ++_listenerId;
                },
                enumerable: false
            }
        });

        this._checkDisconnected = false;  // Request Subscribe Again

        this.naviConnection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        this.orientation = getScreenOrientation();
        //set page visibility
        document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this));
        window.addEventListener("orientationchange", this.onOrientationChanged.bind(this));
        if (this.naviConnection && !isFHub()) {
            this.naviConnection.addEventListener('change', this.onNetworkStateChanged.bind(this));
        } else {
            this.onlineHandle = setInterval(this.onNetworkStateChanged.bind(this), 3000);
        }

        // For SVG images which are converted to JS scripts
        document.loadedSVG = {};

        //check network status.
        LoggerI("Internet Connection:" + navigator.onLine);
        if (!navigator.onLine) {
            //remove no network timer
            if (this.loadingScreenTimer) {
                clearTimeout(this.loadingScreenTimer);
                this.loadingScreenTimer = 0;
            }
            this.view.showNetworkErrDlg(MOBILE_NETWORK_DISCONNECT, true);
        }
    };

MainController.prototype = {
    setDevice: function(_devices_) {
        //console.log(_devices_);
        // !! important, index 0 is main device
        if (_devices_.length > 0) {
            if (_devices_[0]) {
                this.device = _devices_[0];

                this.displayInfo.deviceName = this.device.deviceName;
                this.displayInfo.locationName = this.device.locationName;
                this.displayInfo.roomName = this.device.roomName;

                this.view.mainPage.init();
                this.view.mainPage.onCreate({
                    deviceName: this.displayInfo.deviceName,
                    deviceLocation: this.displayInfo.locationName + (_isString(this.displayInfo.roomName) && this.displayInfo.roomName !== ""  ? (" - " + this.displayInfo.roomName) : "")
                });
                this.view.mainPage.addEvent('back', () => {LoggerI("Click Back Icon on MainPage"); history.back()});
                this.view.pageCtrl.push(this.view.mainPage);

                if (this.device.metaData) {
                    let metaData = null;
                    if (typeof this.device.metaData === 'string') {
                        metaData = JSON.parse(this.device.metaData);
                    } else if (typeof this.device.metaData === 'object') {
                        metaData = this.device.metaData;
                    }

                    try {
                        this.parseMetaData(metaData);
                    } catch (e) {
                        LoggerE("Can't parse MetaData", e);
                    }
                }

                setTimeout(this.startPlugin.bind(this), 0); // exit main thread.

                // Monitoring ST Cloud Connection
                try {
                    scplugin.manager.setCloudConnectionStateListener(this.onCloudConnectionState.bind(this));
                } catch (e) {
                    LoggerE("setCloudConnectionStateListener is failed..", e);
                }

                // Monitoring device connection
                try {
                    this.device.startMonitoringConnectionState(this.onMonitoringState.bind(this));
                } catch (e) {
                    LoggerE("startMonitoringConnectionState is failed..", e);
                }

                if (!isFHub()) { //it's only supported in mobile
                    try {
                        this.device.setDeviceInfoChangeListener(this.onDeviceInfoChange.bind(this));
                    } catch (e) {
                        LoggerE("setDeviceInfoChangeListener is failed..", e);
                    }
                }
                //Load Test Mode Data
                createScript("./js/test/testMode.js")
                .then(()=>{
                    scplugin.manager.getPluginData(this.device.deviceHandle, TEST_MODE_KEY, (key, value) => {
                        console.log("===== key: " + key + " value: " + value  + " typeof: " + typeof value);
                        try {
                            if (value === "" || !value) {
                                value = "{}";
                            } else {
                                value = value.replace(/\'/g, '"');
                            }
                            window.testMode = new TestMode(this.device.deviceHandle);
                            window.testMode.loadTestModeData(value);
                        } catch (e) {
                            window.testMode = undefined;
                           LoggerE("Test Mode is failed...!!");
                        }
                    });
                })
                .catch(()=>{LoggerI("It is Release Mode");})
            }
        } else {
            LoggerE("Empty Device!!!");
        }
    },

    parseMetaData: function(_metaData_) {
        if (_metaData_) {
            let metaData = null;
            // PLM P181211-05917
            if (_metaData_.hasOwnProperty("data")) {
                metaData = _metaData_.data;
            } else {
                metaData = _metaData_;
            }

            let _dpResources = metaData.dpResources;
            if (metaData.vid) {
                this.device.vid = metaData.vid;
            }
            _dpResources.sort( function (a, b) { return a.order < b.order ? -1: a.order > b.order ? 1 : 0; });  //sort resource order
            let idx = 0;
            _dpResources.forEach(v => {
                if (v.ruleEvent == false && v.ruleAction == false) {
                    let foundInDevice = false;
                    this.device.resourceUris.forEach(uri => {
                        if (uri === v.link.href) {
                            foundInDevice = true;
                        }
                    });
                    if (foundInDevice) {
                        this.dpResourceList[idx] =  new DPResource(v.name, v.order, v.link.href, v.link.rt, v.property, v.alternatives,
                            v.label.label, v.range, v.step, v.controllable, v.controlType, v.iconUrl);
                        idx ++;
                    }
                }
            });
            //loading language code from meta data. just save current locale data.
            if (metaData.language != undefined) {
                let _language = metaData.language;
                _language.forEach(code => {
                    if (code.locale == LocaleCode) {
                        code.poCodes.forEach( item => {
                            this.poCodeList[item.po] = item.label;
                        });
                    }
                });
            } else {
                LoggerE("Language code is invalid in metadata!!");
            }

        } else {
            LoggerE("Invalid meta data!!!");
        }
    },

    startLoadingScreen: function(_transparency_) {
        LoggerD("start loading screen...");
        if (this.loadingScreenTimer) {
            clearTimeout(this.loadingScreenTimer);
            this.loadingScreenTimer = 0;
        }

        this.view.showLoadingScreen(_transparency_);
        var _that = this;
        this.loadingScreenTimer = setTimeout(function() {
            _that.view.showNetworkErrDlg(PLUGIN_UNKNOWN_ERROR, true);
            _that.loadingScreenTimer = 0;
        },  LOADING_TIMEOUT_VALUE);
    },

    stopLoadingScreen: function() {
        LoggerD("stop loading screen...");
        if (this.deviceConnectionState == DEVICE_DISCONNECTED) {
            // if device is disconnted from st cloud, we should do show network error popup.
            // so that we ignore stop loading screen. network error popup is displayed by loading screen timer.
            return false;
        }

        if (this.loadingScreenTimer) {
            clearTimeout(this.loadingScreenTimer);
            this.loadingScreenTimer = 0;
        }
        this.view.hideLoadingScreen();

        return true;
    },

    navigateToEdit : function() {
        if (this.device && _isFunction(this.device.navigateTo)) {
            try {
                this.device.navigateTo(NAVIGATE_VIEW_TYPE_EDIT, this.onDeviceNavigateToCallback.bind(this), ()=>{LoggerE(e);});
            } catch (e) {
                LoggerE(e);
            }
        }
    },

    onDeviceNavigateToCallback(navigationViewType, resultData) {
        if (navigationViewType === NAVIGATE_VIEW_TYPE_EDIT) {
            console.log(resultData);

        } else {
            LoggerE("Wrong return value");
        }
    },

    onGetAllCapaDataTimeout: function() {
        LoggerW("all capability timer is expired, " + getTimeString(new Date()));
        if (this.getAllCapaDataTimeout) {
            clearTimeout(this.getAllCapaDataTimeout);
            this.getAllCapaDataTimeout = 0;
        }

        this.requestedURIs.forEach(function(val) {
            LoggerW("no response, uri:" + val);
        });

        if (typeof this.getAllCapaDataCallback === 'function') {
            this.getAllCapaDataCallback(this.capabilityValues, this.requestedURIs.length);
            this.getAllCapaDataCallback = null; //remove callback function...
        }
    },

    onMonitoringState: function(_result_, _deviceHandle_, _state_) {
        if (_result_ == "OCF_OK") {
            LoggerI("Monitoring state:" + _state_);
            if (_state_ == "CONNECTED") {
                this.deviceConnectionState = DEVICE_CONNECTED;
            } else {
                this.deviceConnectionState = DEVICE_DISCONNECTED;
            }
            this.view.showNotificationCard(this.displayInfo.deviceName, this.deviceConnectionState);
        } else {
            LoggerW("The device connnection is invalid :" + _result_);
        }
    },

    onDeviceInfoChange: function(deviceInfo) {
        let info = undefined;
        if (_isString(deviceInfo)) {
            info = JSON.parse(deviceInfo);
        } else {
            info = deviceInfo;
        }

        if (_isObject(info)) {
            this.displayInfo.deviceName = info.deviceName;
            this.displayInfo.locationName = info.locationName;
            this.displayInfo.roomName = info.roomName;

            this.view.setDeviceName(info.deviceName);
            this.view.setLocationName(info.locationName + ((_isString(info.roomName) && info.roomName !== "") ? (" - " + info.roomName) : ""));
        } else {
            LoggerW("Invaild Data");
        }
    },

    addVisibilityEventListener: function(callback) {
        var listenerId = this.nextListenerId;
        this._listeners[listenerId] = callback;
        return listenerId;
    },

    removeVisibilityEventListener: function(handle) {
        if(_isNumber(handle) && _isFunction(this._listeners[handle])) {
            delete this._listeners[handle];
        }
    },

    _visibilityChange: function(state) {
        let keys = Object.keys(this._listeners);
        if (keys.length > 0) {
            keys.forEach((v) => {
                if (_isFunction(this._listeners[v])) {
                    this._listeners[v](state);
                }
            });
        }
    },

    onNetworkStateChanged: function() {
        if (this.prevOnlineStatus !== navigator.onLine) {
            LoggerI("Internet Connection:" + navigator.onLine);
            this.prevOnlineStatus = navigator.onLine;

            if (!navigator.onLine)
                this.view.showNetworkErrDlg(MOBILE_NETWORK_DISCONNECT, false);
        }
    },

    onSubscribe: function(_result_, _deviceHandle_, _uri_, _rcsValue_) {
        LoggerI("--- subscribe ---"); // OCF_OK
        console.log("result:" + _result_ + ", handle:" + _deviceHandle_ + " uri:" + _uri_);
        console.log("rcsValue:" + JSON.stringify(_rcsValue_));

        if (_result_ === "OCF_OK") {
            if (this.HNDevice) {
                /*if (_isFunction(this.HNDevice.onSubscribe)
                        && _rcsValue_ && _rcsValue_.hasOwnProperty("isStateChange") && _rcsValue_.isStateChange === true ) {
                    this.HNDevice.onSubscribe(_uri_, _rcsValue_);
                }*/
                if (_isFunction(this.HNDevice.onSubscribe)) {
                    this.HNDevice.onSubscribe(_uri_, _rcsValue_);
                }
            } else {
                LoggerI("Invalid Device Instance");
            }
        } else {
            LoggerI("subscribe invalid return code:" + _result_);
        }
    },

    onCloudConnectionState: function(state) {
        LoggerI("ST Connection state : " + state);
        if (state == "CONNECTED") {
            // Re-subscribe if the state is disconnected before
            if (this._checkDisconnected) {
                //The subscribe is called after connected callback.
                try {
                    if (this.device.deviceHandle && Array.isArray(this.device.resourceUris)) {
                        LoggerI("Re-request Subscribe");
                        this.device.unsubscribe();
                        this.device.subscribe(this.onSubscribe.bind(this));
                        this._checkDisconnected = false;
                    }
                } catch (e) {
                    console.log(e);
                    LoggerE("Re-request subscribe is failed..", e);
                }
            }
        } else if (state == "DISCONNECTED") {
            // Ask to re-subscribe
            this._checkDisconnected = true;
        }
    },

    onGetAttributesData: function(_result_, _deviceHandle_, _uri_, _rcsValue_) {
        if (_result_ === "OCF_OK") {
            LoggerD("received attribute uri:" + _uri_ + " rcsValue:" + JSON.stringify(_rcsValue_));
            var idx = this.requestedURIs.find(function(val) {
                return val === _uri_;
            });

            //ignore another data.
            if (idx !== undefined) {
                if (typeof _rcsValue_ === 'object') {
                    this.capabilityValues[_uri_] = _rcsValue_;
                }

                this.requestedURIs.splice(this.requestedURIs.indexOf(idx), 1); //remove uri from request list.
                if (this.requestedURIs.length === 0) {
                    LoggerI("all capability data is received, " + getTimeString(new Date()));
                    if (this.getAllCapaDataTimeout) {   //remove timeout function.
                        clearTimeout(this.getAllCapaDataTimeout);
                        this.getAllCapaDataTimeout = 0;
                    }

                    if (typeof this.getAllCapaDataCallback === 'function') {
                        this.getAllCapaDataCallback(this.capabilityValues, 0);
                        this.getAllCapaDataCallback = null; //remove callback function...
                    }
                }
            }
        }
    },

    getAllCapabilityData: function(_uris_, _callback_, _timeout_) {
        LoggerI("request all Capability data, " + getTimeString(new Date()));
        //remove old data.
        for (var key in this.capabilityValues) {
            if (this.capabilityValues.hasOwnProperty(key)) {
                delete this.capabilityValues[key];
            }
        }

        if (typeof this.getAllCapaDataCallback === 'function') {
            LoggerE('Already runnig....');
            return;
        }

        if ( _uris_.length == 0 ) {
            LoggerE("uri is empty");
            return;
        }

        //remove old uri
        this.requestedURIs.splice(0, this.requestedURIs.length);

        if (typeof _callback_ === 'function') {
            this.getAllCapaDataCallback = _callback_;
        } else {
            LoggerE('callback is not function');
            return;
        }

        if (this.getAllCapaDataTimeout) {
            //remove old timeout
            clearTimeout(this.getAllCapaDataTimeout);
            this.getAllCapaDataTimeout = 0;
        }
        //set timeout function.
        const DEFAULT_TIMEOUT_VALUE = 3000;
        this.getAllCapaDataTimeout = setTimeout(this.onGetAllCapaDataTimeout.bind(this), _timeout_ ? _timeout_ : DEFAULT_TIMEOUT_VALUE);

        _uris_.forEach(uri => {
            //check duplicated request.
            let foundFlag = false;
            this.requestedURIs.forEach(val => {
                console.log("val:" + val + ", uri:" + uri)
                if (val === uri) {
                    foundFlag = true;
                }
            });

            if (!foundFlag) {
                LoggerD("reqeust capability uri:" + uri);
                this.requestedURIs.push(uri);
                this.device.getRemoteRepresentation(uri, this.onGetAttributesData.bind(this)); //for update.
            }
        });
    },

    startPlugin: function() {
        LoggerI("loading... HomeNet Plugin");
        this.pluginLoadState = PLUGIN_LOAD_STATE_LOADING;
        var uris = new Array();

        for (var idx in this.dpResourceList) {
            if (this.dpResourceList.hasOwnProperty(idx)) {
                let skipFlag = false;
                for (let key in window.noStateCapability) {
                    if (window.noStateCapability.hasOwnProperty(key)) {
                        let capa = window.noStateCapability[key];
                        if (capa && this.dpResourceList[idx].uri.indexOf(capa) > -1) {
                            skipFlag = true;
                        }
                    }
                }

                if (!skipFlag) {
                    uris.push(this.dpResourceList[idx].uri);
                }
            }
        }

        //get all capability data from ST Cloud.
        var getCapabilityDataCB = function(capaValues, remainCnt) {
            LoggerI("create device instance");
            if (remainCnt > 0) {
                LoggerE(remainCnt + " capability could not be fetched from ST Cloud.");
                return;
            } else {
                const fileName = getDeviceJSFileName(this.device.deviceType, {vid:this.device.vid});
                if (fileName) {
                    createDeviceScript("./js/device/" + fileName + ".js")
                    .then((tDev)=>{
                        if (tDev && this.checkPropertyValue(capaValues, this.dpResourceList)) {
                            if (_isFunction(tDev.createDevice)) {
                                let device = tDev.createDevice(this.device, this.dpResourceList);
                                if (device) {
                                    let uris = Object.keys(capaValues);
                                    uris.forEach((_uri_) => {
                                        device.update(_uri_, capaValues[_uri_]);
                                    });
                                    this.HNDevice = device;
                                }
                            }
                        } else {
                            this.view.showNetworkErrDlg(INVALID_DEVICE_MATA_DATA, true);
                        }

                        //hide Loading Screen
                        if (this.stopLoadingScreen()) {
                            this.pluginLoadState = PLUGIN_LOAD_STATE_LOADED;
                        }
                    }).catch((e) => {
                        LoggerE(e);
                        this.view.showNetworkErrDlg(CANT_CREATE_DEVICE, true);
                    });
                } else {
                    LoggerE("No Device Type!!");
                    this.view.showNetworkErrDlg(PLUGIN_UNKNOWN_ERROR, true);
                }
            }
        };

        if (uris.length > 0 ) {
            this.getAllCapabilityData(uris, getCapabilityDataCB, 6000);
        } else {
            this.getAllCapaDataCallback = getCapabilityDataCB;
            setTimeout(() => {
                this.getAllCapaDataCallback({},0);
            }, 1000);
        }

        //The subscribe is called after connected callback.
        try {
            if (this.device.deviceHandle && Array.isArray(this.device.resourceUris))
            {
                this.device.subscribe(this.onSubscribe.bind(this));
            }
        } catch (e) {
            console.log(e);
            LoggerE("subscribe is failed..");
        }
    },

    refresh: async function() {
        LoggerI("refresh!!");
        this.pluginLoadState = PLUGIN_LOAD_STATE_RELOADING;

        var uris = new Array();
        for (var idx in this.dpResourceList) {
            if (this.dpResourceList.hasOwnProperty(idx)) {
                let skipFlag = false;
                for (let key in window.noStateCapability) {
                    if (window.noStateCapability.hasOwnProperty(key)) {
                        let capa = window.noStateCapability[key];
                        if (capa && this.dpResourceList[idx].uri.indexOf(capa) > -1) {
                            skipFlag = true;
                        }
                    }
                }

                if (!skipFlag) {
                    uris.push(this.dpResourceList[idx].uri);
                }
            }
        }

        //refresh
        if (_isFunction(this.HNDevice.onRefresh)) {
            this.HNDevice.onRefresh();
        }

        if (uris.length === 0) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
            return;
        }

        const getAllData = new Promise((resolve, reject) => {
            const dataCB = (_values_, _remainCnt_) => {
                if (_remainCnt_ === 0 ) {
                    resolve(_values_);
                } else {
                    reject(new Error('Could not get all the capability.'));
                }
            }
            this.getAllCapabilityData(uris, dataCB, GET_ALL_CAPA_TIMEOUT_VALUE);
        });

        await getAllData
        .then((v) => {
            for (var uri in v) {
                if (this.HNDevice && typeof this.HNDevice.update === "function") {
                    this.HNDevice.update(uri, v[uri]);
                }
            }
            this.pluginLoadState = PLUGIN_LOAD_STATE_LOADED;
        }).catch((e) => {
            this.pluginLoadState = PLUGIN_LOAD_STATE_LOADED;
            HNView.showNetworkErrDlg(ST_API_DOES_NOT_WORK, false);
            LoggerW(e);
        });
    },

    checkPropertyValue: function(val, dpResList) {
        let propertyList = [];
        for (var idx in dpResList) {
            if (dpResList.hasOwnProperty(idx)) {
                const dpRes = dpResList[idx];
                if (dpRes) {
                    const uri = dpRes.uri;
                    let obj = {};
                    obj[dpRes.uri] = dpRes.property;
                    propertyList.push(obj);
                }
            }
        }

        let nullFlag = false;
        propertyList.forEach(property => {
            let keys = Object.keys(property);
            if(keys[0]) {
                const propertyName = property[keys[0]];
                let capa = val[keys[0]];
                if (capa && capa.hasOwnProperty(propertyName)) {
                    if (capa[propertyName] === null || capa[propertyName] === undefined) {
                        LoggerE(propertyName + " is NULL value!!");
                        nullFlag = true;
                    }
                } else {
                    LoggerW("The capability value does not have " + propertyName + " property");
                }
            }
        });

        if (nullFlag) {
            return false;
        }

        return true;
    },

    findDPResourceByURI: function(_uri_) {
        for (var idx in this.dpResourceList) {
            if (this.dpResourceList[idx] && this.dpResourceList[idx].uri === _uri_) {
                return this.dpResourceList[idx];
            }
        }
        return undefined;
    },

    onVisibilityChange: function() {
        if (document.hidden !== undefined) {
            if (document.hidden) {
                LoggerI("Background : " + getTimeString(new Date()));
                this._visibilityChange(false);
            } else {
                LoggerI("Activate : " + getTimeString(new Date()));
                this._visibilityChange(true);
                if (this.pluginLoadState === PLUGIN_LOAD_STATE_LOADED) {
                    //this.reloadingPlugin();
                }
            }
        }
    },

    onOrientationChanged: function(_event_) {
        this.orientation = getScreenOrientation();
        console.log("Current orientation:" + this.orientation);
        if (this.view) {
            this.view.setScrollArea(); //re-resize
        }
        // For the Change without timeout delay
        if (this.HNDevice && _isFunction(this.HNDevice.resize_immediate) ) {
            this.HNDevice.resize_immediate();
        }

        // wait orientation changed.
        setTimeout(() => {
            if (this.HNDevice && _isFunction(this.HNDevice.resize) ) {
                this.HNDevice.resize();
                if (_isFunction(this.HNDevice.onRotate)) {
                    this.HNDevice.onRotate(getScreenOrientation());
                }
            }
            // set orientation all page
            if (this.view && this.view.pageCtrl) {
                let pages = this.view.pageCtrl.pages;
                pages.forEach((page)=> {
                    if (page && _isFunction(page.setOrientation)) {
                        page.setOrientation(this.orientation);
                    }
                });
            }
        }, 300);
    }
};

/******************************************************************************
 * Main View
 *******************************************************************************/

var MainView = function(_actionBar_, _heroArea_, _funcArea_) {
        this.actionBar = _actionBar_;
        this.heroArea = _heroArea_;
        this.funcArea = _funcArea_;
        this.loadingScreen = undefined;
        this.networkErrorDlg = undefined;
        this.moreOpt = undefined;
        this.infoPage = undefined;
        this.activityPage = undefined;
        //this.pageCtrl = new PageController("page_controller", this.onPushPage.bind(this), this.onPopPage.bind(this));
        this.pageCtrl = new PageController();
        this.mainPage = new MainPage('main');
        this._notifications = {};
        this.setScrollArea();
    }

MainView.prototype = {
    setDeviceName: function(_deviceName_) {
        $("#actionBarDeviceName").html(_deviceName_.replace(/ /g, '&nbsp;'));
    },

    setLocationName: function(_locationName_) {
        $("#actionBarLocation").html(_locationName_);
    },

    setScrollArea: function() {
        /*
        setTimeout(function() {
            $("#scrollableArea").css("height", (document.body.offsetHeight - $('#actionBar').height()) + 'px');
        }, 3000);
       */
    },

    showLoadingScreen: function(_transparency_) {
        console.log("show loading screen!!");
        if (this.loadingScreen === undefined) {
            this.loadingScreen = new Splash($('#messageDiv'), "loadingScr_01", C_("LOADING") );
        }

        this.loadingScreen.show(_transparency_);
    },

    hideLoadingScreen: function() {
        console.log("Stop Loading Screen!!");
        setTimeout(this.loadingScreen.hide.bind(this.loadingScreen), 100); // why 100 ms? because prevent blink.
    },

    showNotificationCard: function(deviceName, state) {
        LoggerD("notification card state:" + state);
        const candidates = {
            INACTIVE: {
                title: C_('DEVICE_INACTIVE_TITLE'), message: C_('DEVICE_INACTIVE_MESSAGE', deviceName)
            },
            NETWORK_DISCONNECTED: {
                title: C_('NETWORK_DISCONNECTED_TITLE'), message: C_('NETWORK_DISCONNECTED_MESSAGE', deviceName)
            },
            DISCONNECTED: {
                title: C_('DEVICE_DISCONNECTED_TITLE'), message: C_('DEVICE_DISCONNECTED_MESSAGE', deviceName)
            }
        };

        for (const key in candidates) {
            if (state !== key) {
                if (this._notifications[key]) {
                    // hide
                    this._notifications[key].show(false);
                }

                continue;
            }

            if (!this._notifications[key]) {
                const card = new NotificationCard(key+"_Noti", {title : candidates[key].title, message : candidates[key].message});
                card.init();
                $("#notificationArea").append(card.container);
                this._notifications[key] = card;
            }

            this._notifications[key].show(true);
        }
    },

    showNetworkErrDlg: function(type, exit) {
        LoggerI("Error Popup Type:" + type);
        if (this.networkErrorDlg) {
            // MOBILE_NETWORK_DISCONNECT has a higher priority than any othersn
            if (this.networkErrorDlg.type === MOBILE_NETWORK_DISCONNECT) {
                LoggerI("MOBILE_NETWORK_DISCONNECT error popup has higher priority. So, don't show more.")
				if (exit) {
					LoggerI("Set 'exit' flag, so If the ok button is pressed, the plugin detail page will be exit.");
					this.networkErrorDlg.exit = true; // forced exit.
				}
                return this.networkErrorDlg;
            } else {
                this.networkErrorDlg.finalize();
            }
        }

        let contents = undefined;
        if (type === MOBILE_NETWORK_DISCONNECT) {
            contents = C_("MOBILE_NETWORK_DISCONNECTED");
        } else {
            contents = C_("NETWORK_ERROR_MESSAGE");
        }

        this.networkErrorDlg = new Dialog("networkDlg_01", {
            parent: $("body"),
            description: contents,
            modal: true,
			exit: exit,
            btnArr: {
                [C_("DIALOG_BUTTON_OK")](dlg) {
                    dlg.hide();
                    dlg.type = undefined;
                    if (dlg.exit) {
                        LoggerI("Exit by Network Dialog");
                        exitPluginPage();
                    }
                }
            }
        });

        this.networkErrorDlg.type = type;
        this.networkErrorDlg.init();
        this.networkErrorDlg.show();

        return this.networkErrorDlg;
    },

    showInformationPage: function() {
        let infoPage = new InformationPage("info");
        infoPage.init();
        let bundle = { deviceType: HNCtrl.device.deviceType,
            deviceName: HNCtrl.displayInfo.deviceName,
            version: HNDevicePluginVersion };

        if (window.provider) {
            let name = undefined;
            if (window.provider.locale) {
                let localeDatas = window.provider.locale[LocaleCode];
                if (localeDatas && localeDatas.language) {
                    if (localeDatas.language['info_name']) {
                        name = localeDatas.language['info_name'];
                    } else {
                        name = localeDatas.language['name'];
                    }
                }
            }

            if (name === undefined) {
                name = window.provider.name;
            }

            if(name) {
                bundle['providerName'] = name;
            }

            if(window.provider.contact) {
                bundle['providerContact'] = window.provider.contact;
            }

        }
        infoPage.onCreate(bundle);
        infoPage.addEvent('back', () => {
                history.back();
            });
        infoPage.addEvent('license', () => {
            this.showLicensePage();
            }
        );

        this.pageCtrl.push(infoPage);
    },

    showActivityPage: function(replaceKeywords) {
        if (isFHub()) {
            openAdditionalPages++;
            scplugin.manager.setFlag("openAdditionalPage");
        }

        let activityPage = new ActivityPage("activity", replaceKeywords);
        activityPage.init();
        activityPage.onCreate({});
        activityPage.addEvent('back', () => {
                history.back();
            });

        this.pageCtrl.push(activityPage);
    },

    showStatisticsPage: function() {

        let statisticPage = new StatisticPage("statistic");
        statisticPage.init();
        statisticPage.onCreate({});
        statisticPage.addEvent('back', () => {
                history.back()
            });

        this.pageCtrl.push(statisticPage);
    },

    showLicensePage: function() {
        let licensePage = new LicensePage("license");
        licensePage.init();
        licensePage.onCreate({});
        licensePage.addEvent('back', () => {
            history.back();
        });
        this.pageCtrl.push(licensePage);
    },

    showMoreOptDlg: function() {
        if (!this.moreOpt) {
            var items = {};
            var that = this;

            if (!isFHub()) {
                // ### FamilyHub Not Yet.
                items[[C_('DEVICE_EDIT')]] = () => {
                    LoggerI('clicked Device Edit Screen!!');
                    this.moreOpt.hide();
                    HNCtrl.navigateToEdit();
                };
            }
            items[[C_('INFORMATION')]] = () => {
                LoggerI('clicked Information option!');
                this.moreOpt.hide();
                this.showInformationPage();
            };
            if (window.testMode && window.testMode.isStatisticsMode()) {
                items[[C_('STATISTICS')]] = () => {
                    LoggerI('clicked Statistics option!');
                    this.showStatisticsPage();
                    this.moreOpt.hide();
                }
            }
            this.moreOpt = new moreOptionDialog($('body'), 'more_opt_popup', items);
        }
        this.moreOpt.show();
    },
};

function getDeviceJSFileName(_deviceType_, {vid, rtList} = {}) {
    for (var key in supportDeviceList) {
        if (supportDeviceList.hasOwnProperty(key)) {
            let device = supportDeviceList[key];
            let foundFlag = true;
            if (device && device.hasOwnProperty("deviceType") && device.deviceType == _deviceType_) {
                //check Vendor ID
                if (vid && device.vid) {
                    if (vid === device.vid) {
                        return key;
                    }
                } else {
                    //check resource list
                    if (rtList && device.rtList) {
                        if (device.hasOwnProperty("rtList") && Array.isArray(device.rtList)) {
                            device.rtList.forEach( function(_val_) {
                                var matchingRTFlag = false;
                                for (var idx in rtList) {
                                    if (rtList[idx] && rtList[idx].hasOwnProperty("rt") && rtList[idx].rt == _val_) {
                                        matchingRTFlag = true;
                                    }
                                }

                                if (!matchingRTFlag) {
                                    LoggerW("Can't find " + _val_ + " in Display Resource List");
                                    foundFlag = false;
                                }
                            });

                            if (foundFlag) {
                                LoggerI(key + " device file name found to load!!");
                                return key;
                            }
                        }
                    } else {
                        return key;
                    }
                }
            }
        }
    }
    LoggerW("Can't find device file name for " + _deviceType_);
    return undefined;
}

async function loadSCPluginAPI() {
    let scPluginApiPath = "";
    const TEST_DEVICE_TYPE = "testDeviceType";
    // for test
    var params = getUrlParams(window.location.search);
    if (params.hasOwnProperty(TEST_DEVICE_TYPE)) {
        scPluginApiPath = "./js/test/test.js";
    } else {
        if (isFHub()) {
            scPluginApiPath = "lib/SCPluginApi_FHub.js";
        } else {
            console.log("Loading New SCPluginApi.js");
            scPluginApiPath = "lib/SCPluginApi.js";
        }
    }

    return await createScript(scPluginApiPath);
}

//### Scrollbar
window.addEventListener('scroll', e => {
    let target = $(e.target);
    if (target.hasClass("scrollable")) {
        clearTimeout(tScrollBarHandle);
        target.addClass("show-scrollbar");
        tScrollBarHandle = setTimeout(()=> {
            target.removeClass("show-scrollbar");
        }, 1000);
    }
}, true);

window.onhashchange = function() {
    let hash = window.location.hash;
    let len = window.history.length;

    LoggerI("---------------[HASH]---------------");
    LoggerI("      hash : " + hash);
    LoggerI("       len = " + len);
    LoggerI("historyLen = " + historyLen);
    LoggerI("   history : " + hashHistory);

    if (hashHistory.length && historyLen == len) {
        if (hashHistory[hashHistory.length - 2] == hash) {
            hashHistory = hashHistory.slice(0, -1);
            if (HNView) {
                LoggerI("has hashHistory");
                HNView.pageCtrl.onHistoryBack();
            }
        } else if (hashHistory[hashHistory.length - 2] === undefined) {
            // Case for entering the device plugin not from the dashboard
            if (hashHistory[0] != "" && hashHistory.length >= 1 && hash) {
                hashHistory.push(hash);
                historyLen = len;
            }
            // Case for exit the device plugin
            else {
                if (HNView) {
                    LoggerI("empty hashHistory");
                    HNView.pageCtrl.onHistoryBack();
                }
            }
        } else {
            hashHistory.push(hash);
        }
    } else {
      hashHistory.push(hash);
      historyLen = len;
    }
};

window.onload = function () {
    try {
        LoadLanguageSet(LocaleCode);    //loading locale code.
        //set title
        document.title = C_('VA_DOCUMENT_TITLE');
        loadSCPluginAPI()
        .then(() =>
            {
                LoggerI("Enter HN Device Plugin (" + HNDevicePluginVersion + "), time:" + getTimeString(new Date()));
                try {
                    window.HNView = new MainView($('#actionBar'), $('#heroCardArea'), $('#funcCardArea'));
                    window.HNCtrl = new MainController(window.HNView);
                    window.HNCtrl.startLoadingScreen();
                } catch (e) {
                    LoggerI("Create HN Device Controller failed...", e);
                }
                scplugin.manager.getOCFDevices(HNCtrl.setDevice.bind(window.HNCtrl), () =>{ $("#funcCardArea").html('<b> Can not get Device</b>'); });
            }
        )
        .catch(() => { $("#funcCardArea").html('<b> Can not load API</b>'); });
    } catch (e) {
        console.log("Get Device Data failed..." + e);
    }
};