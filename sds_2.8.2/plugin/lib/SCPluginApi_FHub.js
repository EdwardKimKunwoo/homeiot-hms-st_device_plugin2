/*
 *    SCPlginApi for Family Hub
 *
 *    Copyright (c) 2017-2019 Samsung Electronics Co., Ltd  Ltd All Rights Reserved
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
 * Based on SCPluginApi version 1.3.5
 *******************************************************************************/

var SCPluginApiFHubVersion = "1.3.5.1";
var TEST = false;

window.__onNMOCFDeviceCallback = function (json) {
    const key = "scclient_requestDeviceInfo" + "__onNMOCFDeviceCallback";
    const f = window.scplugin._scPluginNative.getCallbackByKey(key);
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
};

window.__onNMDeviceCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    f(new window.scplugin._APIError("NotSupportedError", "This feature is not supported on Service plugin."));
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.device);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitRuleCommon = function (json) {
    var result = JSON.parse(json);
    try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {
        result.result = "UNKNOWN_ERR";
    }
    window.scplugin.handleApiResult(result, result.response);
};

window.__onNMProdSmartkitCommon = function (json) {
    var result = JSON.parse(json);
    try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {
        result.result = "UNKNOWN_ERR";
    }
    window.scplugin.handleApiResult(result, result.response);
};

window.__onNMProdSmartkitGetDevice = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitGetDevices = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitGetLocation = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitGetRoom = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitGetDeviceHealthData = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitSetSTDeviceHealthChangeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {if (typeof result.event === "string") { result.event = JSON.parse(result.event); }} catch(e) {}
            try {
                f(result.result, result.event);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitSetSTDeviceLifecycleChangeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {if (typeof result.event === "string") { result.event = JSON.parse(result.event); }} catch(e) {}
            try {
                f(result.result, result.event);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitSetSTInstalledAppLifecycleChangeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {if (typeof result.event === "string") { result.event = JSON.parse(result.event); }} catch(e) {}
            try {
                f(result.result, result.event);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitGetDeviceStatus = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitExecuteCommands = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitGroupExecuteCommandsCallback = function (json) {
    var result = JSON.parse(json);
    window.scplugin.handleApiResult(result, result.result);
};

window.__onNMProdSmartkitSubscribe = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {if (typeof result.event === "string") { result.event = JSON.parse(result.event); }} catch(e) {}
            try {
                f(result.result, result.event);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitGetTrackersGeoLocations = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitPostTrackersKeys = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitGetTrackersMetadataMaps = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSmartkitGetDevicePresentation = function (json) {
    var result = JSON.parse(json);
    try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {
        result.result = "UNKNOWN_ERR";
    }
    window.scplugin.handleApiResult(result, result.response);
};

window.__onNMProdSmartkitTrackers = function (json) {
    var result = JSON.parse(json);
    window.scplugin.handleApiResult(result, result.response);
};

window.__onNMRepresentCallback = function (result, uri, representation) {
    const key = "scclient_subscribe" + "__onNMRepresentCallback" + uri;
    var f = window.scplugin._scPluginNative.getCallbackByKey(key);
    if (f) {
        setTimeout(function() {
            try {
                f.callFunction(result, f.deviceId, uri, JSON.parse(representation));
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMgetRepresentationCallback = function (result, uri, representation) {
    const key = "scclient_getRemoteRepresentation" + "__onNMgetRepresentationCallback" + uri;
    var f = window.scplugin._scPluginNative.getCallbackByKey(key);
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

window.__onNMsetRepresentationCallback = function (result, uri, representation) {
    const key = "scclient_setRemoteRepresentation" + "__onNMsetRepresentationCallback" + uri;
    var f = window.scplugin._scPluginNative.getCallbackByKey(key);
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

window.__onNMStateCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMMonitoringStateCallback = function (result, state) {
    const key = "scclient_startMonitoringConnectionState" + "__onNMMonitoringStateCallback";
    var f = window.scplugin._scPluginNative.getCallbackByKey(key);
    if (f) {
        setTimeout(function() {
            try {
                f.callFunction(result, f.deviceId, state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdHubDeviceMonitoringStateCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMPluginDataCallback = function (json) {
    var result = (typeof json === Object) ? JSON.parse(json) : json;
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.key, result.value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSecurePluginDataCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.key, result.value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSAAuthCodeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.status, result.authCode, result.authUrl, result.apiUrl, result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSAAuthCodeForServiceCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.status, result.authCode, result.authUrl, result.apiUrl, result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMLaunchAccountLinkingCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.status, result.clientId, result.redirectUri, result.state, result.errorCode, result.errorDescription);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMServiceCallback = function (json) {
    var result = (typeof json === Object) ? JSON.parse(json) : json;
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    f(new window.scplugin._APIError("NotSupportedError", "This feature is not supported on Device plugin."));
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                var serviceObj = window.scplugin._getService(result);
                f(serviceObj);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMServiceEventCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {if (typeof result.event === "string") { result.event = JSON.parse(result.event); }} catch(e) {}
            try {
                f(result.result, result.event);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMServiceResponseCallback = function (json) {
    var result = (typeof json === Object) ? JSON.parse(json) : json;
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.result, result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMServiceConfigurationCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.result);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdIsApplicationInstalledCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError('InvalidValuesError', 'Any of the input parameters contain an invalid value.');
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.appNameType, result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdLaunchApplicationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError('InvalidValuesError', 'Any of the input parameters contain an invalid value.');
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.appLinkType);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdLaunchPluginCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.deviceId);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdLaunchManagedServicePluginCallback = function (json) {
    var result = JSON.parse(json);
    window.scplugin.handleApiResult(result, result.managedServiceType);
};

window.__onNMProdLaunchServicePluginCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.pluginId);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdLocationNicknameCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.locationNickname);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGeoLocationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.geoLocation);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGpsLocationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.gpsLocation);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdIsUsePhoneLocationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.IsUsePhoneLocation);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdAnalyticsLogInsert = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
};

window.__onNMProdAnalyticsLogInsertScreen = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
};

window.__onNMServiceShareTextCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMServiceSMCSInfoCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdCreateShortcutCallback = function (json) {
    var result = JSON.parse(json);
    window.scplugin.handleApiResult(result);
};

window.__onNMProdRequestSsoToCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdNavigateToCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.extraData === "string") { result.extraData = JSON.parse(result.extraData); }} catch(e) {}
            try {
                f(result.navigationViewType, result.extraData);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdAutomationNavigateToCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.extraData === "string") { result.extraData = JSON.parse(result.extraData); }} catch(e) {}
            try {
                f(result.navigationViewType, result.extraData);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetCountryCodeCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.sourceType, result.countryCode);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSetKeepScreenOnCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdClearKeepScreenOnCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetSAUserIdCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.saUserId);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetSACountryCodeCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.saCountryCode);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdInstalledAppIdCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.installedAppId);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetRegisteredDeviceInfo = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.deviceList);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};
window.__onNMProdGetDeviceActivityHistoryCallback = function (json) {
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
};

window.__onNMProdGetDeviceStatisticsCallback = function (json) {
    var result = (typeof json === Object) ? JSON.parse(json) : json;
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response.devices[0].statistics);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdDeviceNavigateToCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.resultData === "string") { result.resultData = JSON.parse(result.resultData); }} catch(e) {}
            try {
                f(result.navigationViewType, result.resultData);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdDeviceInfoChangeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {if (typeof result.deviceInfo === "string") { result.deviceInfo = JSON.parse(result.deviceInfo); }} catch(e) {}
            try {
                f(result.deviceInfo);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};


window.__onNMProdVideoGetClips = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {if (typeof result.response.clips === "string") { result.response.clips = JSON.parse(result.response.clips); }} catch(e) {}
            try {
                if (!!result.response.clips) { result.response.clips = window.scplugin._getVideoClips(result.response.clips); }
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};


window.__onNMProdVideoGetSourcesCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                if (typeof result.response === "string") {
                    result.response = JSON.parse(result.response);
                }
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};


window.__onNMProdVideoClearClips = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }

    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdVideoClearClip = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }

    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};
window.__onNMProdVideoDownloadMedia = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else if (result.result == "ALREADY_EXISTS_ERR") {
                        err = new window.scplugin._APIError("AlreadyExistsError", "This content already exists.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.mediaUrl, result.filePath);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdVideoDownloadThumbnail = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else if (result.result == "ALREADY_EXISTS_ERR") {
                        err = new window.scplugin._APIError("AlreadyExistsError", "This content already exists.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.thumbUrl, result.filePath, result.resultData);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMBLEAdapterGetDevice = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "SERVICE_NOT_AVAILABLE_ERR") {
                        err = new window.scplugin._APIError("ServiceNotAvailableError", "Bluetooth device is turned off.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }
    if (f) {
        setTimeout(function() {
            try {if (typeof result.device === "string") { result.device = JSON.parse(result.device); }} catch(e) {}
            try {
                var deviceObj = window.scplugin._getBluetoothLEDevice(result.device);
                f(deviceObj);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dGetBLEDevice = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "SERVICE_NOT_AVAILABLE_ERR") {
                        err = new window.scplugin._APIError("ServiceNotAvailableError", "Bluetooth device is turned off.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }
    if (f) {
        setTimeout(function() {
            try {if (typeof result.bleDevice === "string") { result.bleDevice = JSON.parse(result.bleDevice); }} catch(e) {}
            try {
                var deviceObj = window.scplugin._getBLEDevice(result.bleDevice);
                f(deviceObj);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMBLEDeviceConnect = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result !== "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDevicePutLog = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDeviceConnect = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "NOT_AVAILABLE_ERR" || result.result == "NOT_AVAILABLE") {
                        err = new window.scplugin._APIError("NotAvailableError", "Could not connect, max connections reached.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMBLEDeviceDisconnect = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "INVALID_STATE_ERR") {
                        err = new window.scplugin._APIError("InvalidStateError", "Device is currently not connected.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDeviceDisconnect = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "INVALID_STATE_ERR") {
                        err = new window.scplugin._APIError("InvalidStateError", "Device is currently not connected.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMBLEDeviceGetConfiguration = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.configuration);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDeviceGetConfiguration = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.configuration);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMBLEDeviceGetUuids = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.uuids);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMBLEDeviceGetGATTServices = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "INVALID_STATE_ERR") {
                        err = new window.scplugin._APIError("InvalidStateError", "GATT service is not available.");
                    } else if (result.result == "NOT_FOUND_ERR") {
                        err = new window.scplugin._APIError("NotFoundError", "There is no service with the given UUID.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                var serviceObject = window.scplugin._getBluetoothGATTService(result.services);
                f(serviceObject);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMBLEDeviceSetConnectStateChangeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDeviceSetBleScanCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.result);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDeviceSetConnectStateChangeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDeviceSetNotificationListener = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMBLEDeviceGetRssi = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.rssi);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTServiceGetCharacteristics = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                var characteristicsObject = window.scplugin._getBluetoothGATTCharacteristics(result.characteristics);
                f(characteristicsObject);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTCharacteristicGetDescriptors = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                var descriptorsObject = window.scplugin._getBluetoothGATTDescriptors(result.descriptors);
                f(descriptorsObject);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTCharacteristicReadValue = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTCharacteristicWriteValue = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTCharacteristicSecureReadValue = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid or null value.");
                    } else if (result.result == "INSUFFICIENT_AUTHORIZATION_ERR") {
                        err = new window.scplugin._APIError("InsufficientAuthorizationError", "Disconnect GATT connection when encrypted nonce is wrong.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTCharacteristicSecureWriteValue = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid or null value.");
                    } else if (result.result == "INSUFFICIENT_AUTHORIZATION_ERR") {
                        err = new window.scplugin._APIError("InsufficientAuthorizationError", "Disconnect GATT connection when encrypted nonce is wrong.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTCharacteristicSetValueChangeListener = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTDescriptorReadValue = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTDescriptorWriteValue = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};


window.__onNMGATTDescriptorSecureReadValue = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid or null value.");
                    } else if (result.result == "INSUFFICIENT_AUTHORIZATION_ERR") {
                        err = new window.scplugin._APIError("InsufficientAuthorizationError", "Disconnect GATT connection when encrypted nonce is wrong.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDeviceExecuteCommand = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDeviceFetchAttribute = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                if (typeof result.response === "string") {
                    result.response = JSON.parse(result.response);
                }
                f(result.attribute);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMD2dBLEDeviceSetNotificationIndicator = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }

};

window.__onNMD2dBLEDeviceGetConnectedState = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                if (typeof result.response === "string") {
                    result.response = JSON.parse(result.response);
                }
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdSetAutomationStateListenerCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                if (result.automation) {
                    var automation = window.scplugin._getAutomationObject(result.automation);
                    f(result.automationId, result.state, automation);
                } else {
                    f(result.automationId, result.state);
                }
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdCreateAutomationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }
    if (f) {
        setTimeout(function() {
            try {
                var automation = window.scplugin._getAutomationObject(result.automation);
                f(automation);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetAutomationListCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_PARAM") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                var automationList = [];
                for(var i in result.automationList) {
                    automationList.push(window.scplugin._getAutomationObject(result.automationList[i]));
                }
                f(automationList);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdEditAutomationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_PARAM") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.automationBody);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};
window.__onNMProdDeleteAutomationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.automationId);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};
window.__onNMProdGetAutomationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.automationInfo);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};
window.__onNMProdEnableAutomationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.automationId);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};
window.__onNMProdDisableAutomationCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.automationId);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};
window.__onNMProdSetDeviceStateListenerCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};
window.__onNMProdGetResourceTypesByResourceURICallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.resourceTypes);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetDevicePreferencesCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.preferences);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};
window.__onNMProdSetDevicePreferencesCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdHubDeviceGetStatusCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.hubStatusType, result.value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdHubDeviceNavigateToCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_PARAM") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.extraData === "string") { result.extraData = JSON.parse(result.extraData); }} catch(e) {}
            try {
                f(result.navigationViewType, result.extraData);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdHubDeviceGetFirmwareUpdateStatusCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_PARAM") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.status);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdHubDeviceGetSecureModeCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_PARAM") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.status);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdHubDeviceSetFirmwareUpdateStatusCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_PARAM") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdHubDeviceSetSecureModeCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_PARAM") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMDeviceRequestFirmwareUpdateCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_PARAM") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.status);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMDeviceGetFirmwareInfoCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_PARAM") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.resultData);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMGATTDescriptorSecureWriteValue = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "INVALID_VALUE_ERR") {
                        err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid or null value.");
                    } else if (result.result == "INSUFFICIENT_AUTHORIZATION_ERR") {
                        err = new window.scplugin._APIError("InsufficientAuthorizationError", "Disconnect GATT connection when encrypted nonce is wrong.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetHubDeviceInterfaceCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "NOT_FOUND_ERR") {
                        err = new window.scplugin._APIError("NotFoundError", "if the device is not a hub device or cannot get information about the hub device.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                var hubDevice = window.scplugin._getHubDeviceInterface(result.hubDevice);
                f(hubDevice);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemGetTimeInfoCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else if (result.result == "NOT_FOUND_ERR") {
                        err = new window.scplugin._APIError("NotFoundError", "if the device is not a hub device or cannot get information about the hub device.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.resultData);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemIsDarkModeEnabledCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemIsNightModeEnabledCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemIsInversionModeEnabledCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemSetDarkModeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemSetNightModeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemSetInversionModeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemSetStatusBarContentThemeCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemIsDexModeEnabledCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemGetDexModeTypeCallback = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.type);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMSystemIsTabletModeCallback = function (json) {
    var result = JSON.parse(json);
    window.scplugin.handleApiResult(result, result.state);
};

window.__onNMSystemIsTabletDevice = function (json) {
    var result = JSON.parse(json);
    window.scplugin.handleApiResult(result, result.state);
};

window.__onNMProdGetLDConfigCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetAddressFromPositionCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.address);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdDecryptTextCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.plainTexts);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetAppPreferenceData = function (json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result == "SECURITY_ERR") {
                        err = new window.scplugin._APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result.result == "NOT_SUPPORTED_ERR") {
                        err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new window.scplugin._APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {if (typeof result.response === "string") { result.response = JSON.parse(result.response); }} catch(e) {}
            try {
                f(result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMProdGetSettingConfigCallback = function (json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
};

window.__onNMCloseAdditionalPageCallback = function () {
    try {
        window.history.back();
    } catch (e) {
        console.error(e);
    }
};

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
            if (callback) {
                var replyId = this.nextReplyId;
                args[this.CALLBACK_ID_KEY] = replyId;
                this._callbacks[replyId] = callback;
                if (onerror) { this._callbacks[replyId + "err"] = onerror; }
            } else if (onerror) {
                var replyId = this.nextReplyId;
                args[this.CALLBACK_ID_KEY] = replyId;
                this._callbacks[replyId + "err"] = onerror;
            }
            this.insertMap(args, this.CALLBACK_ID_KEY);
            this.callNative(cmd, args);
        },
        addListener: function(cmd, name, args, callback, onerror) {
            args = args || {};
            if(callback) {
                args[this.LISTENER_ID_KEY] = name;
                this._listeners[name] = callback;
                if(onerror) { this._callbacks[name + "err"] = onerror;}
            } else if (onerror) {
                args[this.LISTENER_ID_KEY] = name;
                this._callbacks[name + "err"] = onerror;
            }
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
                eval(cmd + ".postMessage(args)");
            } else {
                console.log("Not supported platform - " + navigator.userAgent);
            }
        },
        getCallback: function(result) {
            var id, errorCallbackId;

            if (result.hasOwnProperty(this.CALLBACK_ID_KEY)) {
                id = result[this.CALLBACK_ID_KEY];
                errorCallbackId = result[this.CALLBACK_ID_KEY] + "err";

                if (typeof this._callbacks[id] !== 'function') {
                    console.error('Wrong callback identifier. Ignoring message.');
                    return null;
                }
                var f = this._callbacks[id];
                delete this._callbacks[id];
                if(!!this._callbacks[errorCallbackId]) {
                    delete this._callbacks[errorCallbackId];
                }
                return f;
            }

            if (result.hasOwnProperty(this.LISTENER_ID_KEY)) {
                var id = result[this.LISTENER_ID_KEY];
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
                var id = target.callbackId;

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
            var id, successCallbackId;

            if (result.hasOwnProperty(this.CALLBACK_ID_KEY)) {
                id = result[this.CALLBACK_ID_KEY] + "err";
                successCallbackId = result[this.CALLBACK_ID_KEY];

                if (typeof this._callbacks[id] !== 'function') {
                    console.error('Wrong callback identifier. Ignoring message.');
                    return null;
                }
                var f = this._callbacks[id];
                delete this._callbacks[id];
                if(!!this._callbacks[successCallbackId]) {
                    delete this._callbacks[successCallbackId];
                }
                return f;
            }

            if (result.hasOwnProperty(this.LISTENER_ID_KEY)) {
                id = result[this.LISTENER_ID_KEY] + "err";
                successCallbackId = result[this.LISTENER_ID_KEY];
                if (typeof this._listeners[id] !== 'function') {
                    console.error('Wrong callback identifier. Ignoring message.');
                    return null;
                }
                var f = this._listeners[id];
                delete this._listeners[id];
                if(!!this._listeners[successCallbackId]) {
                    delete this._listeners[successCallbackId];
                }
                return f;
            }
        },
        removeListenerCallback: function(result) {
            var id, errorCallbackId;
            if (result.hasOwnProperty(this.LISTENER_ID_KEY)) {
                id = result[this.LISTENER_ID_KEY];
                errorCallbackId = result[this.CALLBACK_ID_KEY] + "err";
                delete this._listeners[id];
                if(!!this._listeners[errorCallbackId]) {
                    delete this._listeners[errorCallbackId];
                }
                return;
            }
        }
    };
    function convertStringToObject(string) {
        var object = string;
        try {
            if (typeof object == "string") object = JSON.parse(object)
        } catch(e) {}
        return object;
    }

    var manager = function() {
        this.getDeviceDetailFunc = null;
    };

    manager.prototype = {
        /**
         * @api window.scplugin.manager.setBluetoothStateListener(onBluetoothStateCallback) void setBluetoothStateListener()
         * @apiName setBluetoothStateListener()
         * @apiGroup Plugin manager
         * @apiDescription Sets Bluetooth Connection changes callback and monitors its state changes.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onBluetoothStateCallback Receives the state of connection with Bluetooth.
         *
         * @apiExample {js} Example usage:
         * function onBluetoothStateCallback(state) {
         *     if (state == "ON") {
         *         // Do something...
         *     } else if (state == "OFF") {
         *         // Do something...
         *     }
         * }
         *
         * window.scplugin.manager.setBluetoothStateListener(onBluetoothStateCallback);
         *
         */
        setBluetoothStateListener: function(callback) {
            var cmd = "scpluginSetBluetoothStateListener";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.setGPSStateListener(onGPSStateCallback) void setGPSStateListener()
         * @apiName setGPSStateListener()
         * @apiGroup Plugin manager
         * @apiDescription Sets GPS Connection changes callback and monitors its state changes.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onGPSStateCallback Receives the state of connection with GPS.
         *
         * @apiExample {js} Example usage:
         * function onGPSStateCallback(state) {
         *     if (state == "ON") {
         *         // Do something...
         *     } else if (state == "OFF") {
         *         // Do something...
         *     }
         * }
         *
         * window.scplugin.manager.setGPSStateListener(onGPSStateCallback);
         *
         */
        setGPSStateListener: function(callback) {
            var cmd = "scpluginSetGPSStateListener";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.setNetworkReachabilityStateListener(onNetworkReachabilityStateCallback) void setNetworkReachabilityStateListener()
         * @apiName setNetworkReachabilityStateListener()
         * @apiGroup Plugin manager
         * @apiDescription Sets Network Reachability Connection changes callback and monitors its state changes.
         * @apiVersion 1.3.2
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onNetworkReachabilityStateCallback Receives the state of connection with mobile or wifi network.
         *
         * @apiExample {js} Example usage:
         * function onNetworkReachabilityStateCallback(state) {
         *     if (state == "CONNECTED") {
         *         // Do something...
         *     } else if (state == "DISCONNECTED") {
         *         // Do something...
         *     }
         * }
         *
         * window.scplugin.manager.setNetworkReachabilityStateListener(onNetworkReachabilityStateCallback);
         *
         */
        setNetworkReachabilityStateListener: function(callback) {
            var cmd = "scpluginSetNetworkReachabilityStateListener";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
        },
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
            var cmd = "scpluginSetCloudConnectionStateListener";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
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
            var cmd = "scpluginSetChangeApplicationStateListener";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
        },

        /**
         * @api window.scplugin.manager.deleteCloudDevice(onDeleteCloudDeviceCallback,onErrorCallback) void deleteCloudDevice()
         * @apiName deleteCloudDevice()
         * @apiGroup Plugin manager
         * @apiDescription delete cloud device selected when launching plugin.
         * This method can only be used on Device plugin.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile device
         *
         * @apiParam {Function} onDeleteCloudDeviceCallback Receives Flag to indicate if delete the cloud device
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported. This feature is only supported on Device plugin.
         *
         * @apiExample {js} Example usage: Device plugin
         * function onDeleteCloudDeviceCallback(state) {
         *    if (state) {
         *       console.log("The cloud device was deleted successfully.");
         *    }
         *
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.deleteCloudDevice(onDeleteCloudDeviceCallback, onErrorCallback);
         */
        deleteCloudDevice: function(onsuccess, onerror) {
            var cmd = "scpluginDeleteCloudDevice";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on Service plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.enableMobileBluetooth(onEnableMobileBluetoothCallback,onErrorCallback) void enableMobileBluetooth()
         * @apiName enableMobileBluetooth()
         * @apiGroup Plugin manager
         * @apiDescription Enable bluetooth in Mobile
         * @apiVersion 1.3.5
         * @apiPermission public
         *
         * @apiProfile device
         *
         * @apiParam {Function} onEnableMobileBluetoothCallback Receives Flag to indicate if enable the mobile bluetooth
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported. This feature is only supported on Device plugin.
         *
         * @apiExample {js} Example usage: Device plugin
         * function onEnableMobileBluetoothCallback(state) {
         *    if (state) {
         *       console.log("The mobile bluetooth was enabled successfully.");
         *    }
         *
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.enableMobileBluetooth(onEnableMobileBluetoothCallback, onErrorCallback);
         */
        enableMobileBluetooth: function(onsuccess, onerror) {
            var cmd = "scpluginEnableMobileBluetooth";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on Service plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.disableMobileBluetooth(onDisableMobileBluetoothCallback,onErrorCallback) void disableMobileBluetooth()
         * @apiName disableMobileBluetooth()
         * @apiGroup Plugin manager
         * @apiDescription Disable bluetooth in Mobile
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onDisableMobileBluetoothCallback Receives Flag to indicate if disable the mobile bluetooth
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported. This feature is only supported on Device plugin.
         *
         * @apiExample {js} Example usage: Device plugin
         * function onDisableMobileBluetoothCallback(state) {
         *    if (!state) {
         *       console.log("The mobile bluetooth was disabled successfully.");
         *    }
         *
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.disableMobileBluetooth(onDisableMobileBluetoothCallback, onErrorCallback);
         */
        disableMobileBluetooth: function(onsuccess, onerror) {
            var cmd = "scpluginDisableMobileBluetooth";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on Service plugin.");
                onerror(err);
            }
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
            var cmd = "scclient_requestDeviceInfo";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMOCFDeviceCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on Service plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.getDevice(onDeviceCallback,onErrorCallback) void getDevice()
         * @apiName getDevice()
         * @apiGroup Plugin manager
         * @apiDescription Gets device object of available device selected when launching plugin.
         * This method can only be used on Device plugin.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onDeviceCallback Receives the device object.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported. This feature is only supported on Device plugin.
         *
         * @apiExample {js} Example usage: Device plugin
         * function onDeviceCallback(device) {
         *    console.log("deviceId: " + device.deviceId);
         *    console.log("deviceType: " + device.deviceType);
         *    console.log("deviceOwner: " + device.deviceOwner);
         *    console.log("firmwareVersion: " + device.firmwareVersion);
         *    console.log("metadata: " + device.metadata);
         *    console.log("deviceName: " + device.deviceName);
         *    console.log("roomId: " + device.roomId);
         *    console.log("roomName: " + device.roomName);
         *    console.log("locationId: " + device.locationId);
         *    console.log("locationName: " + device.locationName);
         *    console.log("deviceHandle: " + device.deviceHandle);
         *    console.log("packageHandle: " + device.packageHandle);
         *    console.log("extraData: " + device.extraData);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.getDevice(onDeviceCallback, onErrorCallback);
         */
        getDevice: function(onsuccess, onerror) {
            var cmd = "scpluginGetDevice";
            var args = {};
            args.callbackName = "__onNMDeviceCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on Service plugin.");
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
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on Device plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.getPluginData(handle,key,onPluginDataCallback) void getPluginData()
         * @apiName getPluginData()
         * @apiGroup Plugin manager
         * @apiDescription Gets the value of key from data table.
         * @apiVersion 1.3.1
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} handle Unique local ID. Each handle has its own data table.
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
            var cmd = "scpluginGetPluginData";
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
         * @apiVersion 1.3.1
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} handle Unique local ID. Each handle has its own data table.
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
            args.value = value;
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
         * @apiVersion 1.3.1
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} handle Unique local ID. Each handle has its own data table.
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
         * @api window.scplugin.manager.getSecurePluginData(id,key,onSecurePluginDataCallback) void getSecurePluginData()
         * @apiName getSecurePluginData()
         * @apiGroup Plugin manager
         * @apiDescription Gets the value of key from data table. (In secure mode supported)
         * @apiVersion 1.3.2
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} id Unique local ID. Each ID has its own data table.
         * @apiParam {String} key Name of key to retrieve.
         * @apiParam {Function} onSecurePluginDataCallback Receives value from the data table.
         *
         * @apiExample {js} Example usage:
         * function onSecurePluginDataCallback(key, value) {
         *    if (value != null) {
         *       console.log(" key: " + key + " value: " + value );
         *    } else {
         *       console.log(" key: " + key + " > NOT FOUND VALUE");
         *    }
         * }
         *
         * scplugin.manager.getSecurePluginData(deviceId, "key_1", onSecurePluginDataCallback);
         *
         */
        getSecurePluginData: function(id, key, callback) {
            var cmd = "scpluginGetSecurePluginData";
            var args = {};
            args.id = id;
            args.callbackName = "__onNMSecurePluginDataCallback";
            args.key = key;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.setSecurePluginData(id,key,value) void setSecurePluginData()
         * @apiName setSecurePluginData()
         * @apiGroup Plugin manager
         * @apiDescription Sets the value and key to data table. (In secure mode supported)
         * @apiVersion 1.3.2
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} id Unique local ID. Each ID has its own data table.
         * @apiParam {String} key Name of key to set.
         * @apiParam {String} value The value to add to the data table by the key.
         *
         * @apiExample {js} Example usage:
         * scplugin.manager.setSecurePluginData(deviceId, "key_1", "1234567890");
         *
         */
        setSecurePluginData: function(id, key, value) {
            var cmd = "scpluginSetSecurePluginData";
            var args = {};
            args.id = id;
            args.key = key;
            args.value = value;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.deleteSecurePluginData(id,key) void deleteSecurePluginData()
         * @apiName deleteSecurePluginData()
         * @apiGroup Plugin manager
         * @apiDescription Deletes key from data table.
         * @apiVersion 1.3.2
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} id Unique local ID. Each ID has its own data table.
         * @apiParam {String} key Name of key to delete.
         *
         * @apiExample {js} Example usage:
         * scplugin.manager.deleteSecurePluginData(deviceId, "key_1");
         *
         */
        deleteSecurePluginData: function(id, key) {
            var cmd = "scpluginDeleteSecurePluginData";
            var args = {};
            args.id = id;
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
         * It is required using the unreserved characters [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~" from Section 2.3 of [RFC3986], with a minimum length of 43 characters and a maximum length of 128 characters.
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
            var cmd = "scpluginGetSAAuthCode";
            var args = {};
            args.clientId = clientId;
            args.codeVerifier = codeVerifier;
            args.state = state;
            args.scope = scope;
            args.duid = duid;
            args.callbackName = "__onNMSAAuthCodeCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.getSAAuthCodeForService(clientId,codeVerifier,state,onSAAuthCodeForServiceCallback,scope,duid) void getSAAuthCodeForService()
         * @apiName getSAAuthCodeForService()
         * @apiGroup Plugin manager
         * @apiDescription Gets the auth code from Samsung Account for Service.
         * @apiVersion 1.3.1
         * @apiPermission platform
         * @apiProfile common
         *
         * @apiParam {String} clientId Client id to be authorized.
         * @apiParam {String} codeVerifier Value to be sent to server for code challenge. It is necessary for server to recognize application.
         * It is required using the unreserved characters [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~" from Section 2.3 of [RFC3986], with a minimum length of 43 characters and a maximum length of 128 characters.
         * @apiParam {String} state The value to be sent to server so that it can send back the state value such that the response can be validated. (length : 16~32 character)
         * @apiParam {Function} onSAAuthCodeForServiceCallback Receives auth code from the account server.
         * @apiParam {String} [scope] Optional. The resource to be authorized.
         * @apiParam {String} [duid] Optional. The Device Unique Identifier of device to be authorized. It is required to issue a token for IoT device.
         *
         * @apiExample {js} Example usage:
         * function onSAAuthCodeForServiceCallback(result, authCode, authUrl, apiUrl, state) {
         *    if (result == "SUCCESS") {
         *       console.log("authCode: " + authCode + " authUrl: " + authUrl + " apiUrl: " + apiUrl + " state: " + state);
         *    }
         * }
         *
         * scplugin.manager.getSAAuthCodeForService(clientId, codeVerifier, state, onSAAuthCodeForServiceCallback);
         *
         */
        getSAAuthCodeForService: function(clientId, codeVerifier, state, callback, scope, duid) {
            var cmd = "scpluginGetSAAuthCodeForService";
            var args = {};
            args.clientId = clientId;
            args.codeVerifier = codeVerifier;
            args.state = state;
            args.scope = scope;
            args.duid = duid;
            args.callbackName = "__onNMSAAuthCodeForServiceCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.launchAccountLinking(requestBody,onLaunchAccountLinkingCallback) void launchAccountLinking()
         * @apiName launchAccountLinking()
         * @apiGroup Plugin manager
         * @apiDescription Launch Account Linking page using value from requestBody
         * @apiVersion 1.3.2
         * @apiPermission platform
         * @apiProfile common
         *
         * @apiParam {Object} [requestBody] The object of Request body
         * @apiParam {String} [requestBody.clientId] AppId issued from Partner
         * @apiParam {String} [requestBody.serviceId] Service AppId issued from Samsung Account
         * @apiParam {String} [requestBody.disclaimerYNFlag] Boolen setting that agreed value of disclaimer identified('Y', 'N', 'M')
         * @apiParam {String} [requestBody.state] An opaque value used by the client to maintain state between the request and callback (use new maximum 32byte random characters)
         * @apiParam {String} [requestBody.returnType] There are 4 integration types('WEB', 'SDK', 'APK', 'XTN')
         * @apiParam {String} [requestBody.authServerUrl] URL of the samsung account server that issues an access token and refresh token
         * @apiParam {String} [requestBody.xOspCode] Authorization code issues by using serviceId
         * @apiParam {Function} onLaunchAccountLinkingCallback Receives response.
         *
         * @apiExample {js} Example usage:
         * function onLaunchAccountLinkingCallback(status, clientId, redirectUri, state, errorCode, errorDescription) {
         *    if (status == "SUCCESS") {
         *       console.log("clientId: " + clientId + " redirectUri: " + redirectUri + " state: " + state);
         *    } else {
         *       console.log("state: " + state + " errorCode: " + errorCode + " errorDescription: " + errorDescription);
         *    }
         * }
         *
         * scplugin.manager.launchAccountLinking(requestBody, onLaunchAccountLinkingCallback);
         *
         */
        launchAccountLinking: function(requestBody, callback) {
            var cmd = "scpluginGetLaunchAccountLinking";
            var args = {};
            args.requestBody = requestBody;
            args.callbackName = "__onNMLaunchAccountLinkingCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
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
            var cmd = "scpluginClose";
            try {
                window.scplugin.log.warning("", "close", "closeView");
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.launchApplication(id,onLaunchApplicationCallback,onErrorCallback) void launchApplication()
         * @apiName launchApplication()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Launches specific application page.
         * @apiVersion 1.3.4
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} id Identifier to launch. The input values can use Package name (Android only) and URL scheme to launch application store and AppLinkType enum.
         * (e.g. "com.samsung.android.testapp", "market://details?id=com.samsung.android.testapp", "itms-apps://itunes.apple.com/kr/app/apple-store/id12341234123")
         * @apiParam {Function} onLaunchApplicationCallback Receives finish state of launching application page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse APP_LINK_TYPE
         *
         * @apiExample {js} Example usage: Launch by Package name
         * function onLaunchApplicationCallback(id) {
         *     console.log("The application has launched successfully. : " + id);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.launchApplication("com.xxxx.yyyy.testapp", onLaunchApplicationCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: Launch market app
         * function onLaunchApplicationCallback(id) {
         *     console.log("The application has launched successfully. : " + id);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.launchApplication("market://details?id=com.xxx.yyy.testapp", onLaunchApplicationCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: SAMSUNGPAY_REWARD_MAIN
         * function onLaunchApplicationCallback(id) {
         *     console.log("The application has launched successfully. : " + id);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.launchApplication("SAMSUNGPAY_REWARD_MAIN", onLaunchApplicationCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: Launch Petcare app through URL scheme
         * function onLaunchApplicationCallback(id) {
         *     console.log("The application has launched successfully. : " + id);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.launchApplication("samsungcardpet://com.samsungcard.pet", onLaunchApplicationCallback, onErrorCallback);
         */
        launchApplication: function(id, onsuccess, onerror) {
            var cmd = "scpluginProdLaunchApplication";
            var args = {};
            args.callbackName = "__onNMProdLaunchApplicationCallback";
            args.appLinkType = id;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.launchServicePlugin(installedAppId,onLaunchServicePluginCallback,onErrorCallback,extraData) void launchServicePlugin()
         * @apiName launchServicePlugin()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Launches service detail page.
         * @apiVersion 1.3.2
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} installedAppId Unique Installed App ID.
         * @apiParam {Function} onLaunchServicePluginCallback Receives finish state of launching service detail page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [extraData] Optional. Extra data to send. JSON Object.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onLaunchServicePluginCallback(pluginId) {
         *     console.log("The Service plugin has launched successfully. : " + pluginId);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.launchServicePlugin(installedAppId, onLaunchServicePluginCallback, onErrorCallback, extraData);
         */
        launchServicePlugin: function(installedAppId, onsuccess, onerror, extraData) {
            var cmd = "scpluginProdLaunchServicePlugin";
            var args = {};
            args.callbackName = "__onNMProdLaunchServicePluginCallback";
            args.installedAppId = installedAppId;
            args.extraData = extraData;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.launchManagedServicePlugin(managedServiceType,onLaunchManagedServicePluginCallback,onErrorCallback,extraData) void launchManagedServicePlugin()
         * @apiName launchManagedServicePlugin()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Launches managed service.
         * @apiVersion 1.3.4
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {ManagedServiceType} managedServiceType ManagedServiceType to launch.
         * @apiParam {Function} onLaunchManagedServicePluginCallback Receives finish state of launching service detail page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [extraData] Optional. Extra data to send. JSON Object.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotInstalled if target plugin is not installed.
         * @apiError (Error) {APIError} InvalidParamError, if there is any ommited parameter
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse MANAGED_SERVICE_TYPE
         *
         * @apiExample {js} Example usage: CAMERA_CLIP
         * function onLaunchManagedServicePluginCallback(managedServiceType) {
         *     console.log("The Managed Service plugin has launched successfully. : " + managedServiceType);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * service.launchManagedServicePlugin("CAMERA_CLIP", onLaunchManagedServicePluginCallback, onErrorCallback, extraData);
         *
         * @apiExample {js} Example usage: CAMERA_MY_INFO
         * function onLaunchManagedServicePluginCallback(managedServiceType) {
         *     console.log("The Managed Service plugin has launched successfully. : " + managedServiceType);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * service.launchManagedServicePlugin("CAMERA_MY_INFO", onLaunchManagedServicePluginCallback, onErrorCallback, extraData);
         */
        launchManagedServicePlugin: function(managedServiceType, onsuccess, onerror, extraData) {
            var cmd = "scpluginProdLaunchManagedServicePlugin";
            var args = {};
            args.callbackName = "__onNMProdLaunchManagedServicePluginCallback";
            args.managedServiceType = managedServiceType;
            args.extraData = extraData;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.isApplicationInstalled(id,onIsApplicationInstalledCallback,onErrorCallback) void isApplicationInstalled()
         * @apiName isApplicationInstalled()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Checkes whether the application is installed.
         * @apiVersion 1.2.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} id The identifier of the application to retrieve. The input values can use Package name (Android only) and URL scheme (iOS only).
         * @apiParam {Function} onIsApplicationInstalledCallback Receives installation state of application
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Package name
         * function onIsApplicationInstalledCallback(id, state) {
         *    console.log("isApplicationInstalled : " + state);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.isApplicationInstalled("com.xxxx.yyyy.testapp", onIsApplicationInstalledCallback, onErrorCallback);
         */
        isApplicationInstalled: function(id, onsuccess, onerror) {
            var cmd = "scpluginProdIsApplicationInstalled";
            var args = {};
            args.callbackName = "__onNMProdIsApplicationInstalledCallback";
            args.appNameType = id;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.requestSsoTo(redirectUrl,onRequestSsoToCallback,onErrorCallback) void requestSsoTo()
         * @apiName requestSsoTo()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Requests SSO token for plugin to Web SSO.
         * @apiVersion 1.2.2
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} redirectUrl URL of Service page to be redirected after SSO.
         * @apiParam {Function} onRequestSsoToCallback Receives finish state of launching web view to request SSO token.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onRequestSsoToCallback() {
         *    console.log("The web view to get SSO token has been launched successfully.");
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.requestSsoTo(redirectUrl, onRequestSsoToCallback, onErrorCallback);
         *
         */
        requestSsoTo: function(redirectUrl, onsuccess, onerror) {
            var cmd = "scpluginProdRequestSsoTo";
            var args = {};
            args.redirectUrl = redirectUrl;
            args.callbackName = "__onNMProdRequestSsoToCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.navigateTo(navigationViewType,onNavigateToCallback,onErrorCallback,extraData) void navigateTo()
         * @apiName navigateTo()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Navigates specific view page.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {NavigationViewType} navigationViewType Navigation view type to navigate.
         * @apiParam {Function} onNavigateToCallback Receives finish state of navigating view page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [extraData] Optional. Extra data to send. JSON Object.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse NAVIGATION_VIEW_TYPE
         *
         * @apiExample {js} Example usage: SETTINGAPPS_LOCATION_SOURCE
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.navigateTo("SETTINGAPPS_LOCATION_SOURCE", onNavigateToCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: SETTINGAPPS_BLUETOOTH
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.navigateTo("SETTINGAPPS_BLUETOOTH", onNavigateToCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: GEOLOCATION_SETTING_VIEW
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.navigateTo("GEOLOCATION_SETTING_VIEW", onNavigateToCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: HUB_MIGRATION_VIEW
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.navigateTo("HUB_MIGRATION_VIEW", onNavigateToCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: MAIN_DASHBOARD_VIEW
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.navigateTo("MAIN_DASHBOARD_VIEW", onNavigateToCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: ONLINE_MALL_VIEW
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var extraData = {};
         * extraData.brandIds = ["66588569-bac9-4989-b2c6-7555afa866b6"];
         * extraData.categoryIds = ["73ecae1f-fe53-4bdd-9800-e26e2f3d64cf"];
         * scplugin.manager.navigateTo("ONLINE_MALL_VIEW", onNavigateToCallback, onErrorCallback, extraData);
         * @apiSuccessExample {js} extraData
         * // ONLINE_MALL_VIEW
         *
         * {
         *    // brand : brand name to retrieve purchasing the device.
         *    // for example, "samsung", "samrtthings"
         *    // in case of "samsung",
         *    "brandIds" : ["66588569-bac9-4989-b2c6-7555afa866b6"],
         *
         *    // category : category to retrieve purchasing the device.
         *    // for example, "air conditioner", "robot vacuum", "air purifier", "locks", "light bulbs", "tv", "cameras", "outlets", "refrigerator", "water leak sensors"
         *    // in case of "air purifier",
         *    "categoryIDs" : ["73ecae1f-fe53-4bdd-9800-e26e2f3d64cf"]
         * }
         *
         * @apiExample {js} Example usage: BARCODE_SCAN_VIEW (only iOS)
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.navigateTo("BARCODE_SCAN_VIEW", onNavigateToCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: USE_PHONE_LOCATION
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.navigateTo("USE_PHONE_LOCATION", onNavigateToCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: EDIT_DEVICE_DETAIL_VIEW
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * @apiExample {js} Example usage: BUY_DEVICE_VIEW
         * function onNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * var extraData = {};
         * extraData.brand = "samsung";
         * extraData.category = "tv";
         * scplugin.manager.navigateTo("BUY_DEVICE_VIEW", onNavigateToCallback, onErrorCallback, extraData);
         * @apiSuccessExample {js} extraData
         * // BUY_DEVICE_VIEW
         *
         * {
         *    // brand : brand name to retrieve purchasing the device.
         *    // "samsung", "samrtthings"
         *    "brand" : "smartthings",
         *
         *    // category : category to retrieve purchasing the device.
         *    // "air conditioner", "robot vacuum", "air purifier", "locks", "light bulbs", "tv", "cameras", "outlets", "refrigerator", "water leak sensors"
         *    "category" : "light bulbs"
         * }
         */
        navigateTo: function(navigationViewType, onsuccess, onerror, extraData) {
            var cmd = "scpluginProdNavigateTo";
            var args = {};
            args.callbackName = "__onNMProdNavigateToCallback";
            args.navigationViewType = navigationViewType;
            args.extraData = extraData;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.getCountryCode(sourceType,onCountryCodeCallback,onErrorCallback) void getCountryCode()
         * @apiName getCountryCode()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Gets the current country code from a specified source.
         * @apiVersion 1.2.4
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {CountryCodeSourceType} sourceType The source types to retrieve country code.
         * @apiParam {Function} onCountryCodeCallback Receives country code.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse COUNTRYCODE_SOURCE_TYPE
         *
         * @apiExample {js} Example usage: ST_GEOLOCATION
         * function onCountryCodeCallback(sourceType, countryCode) {
         *     console.log("Country code type : " + sourceType + " value : " + countryCode);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getCountryCode("ST_GEOLOCATION", onCountryCodeCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: GPS
         * function onCountryCodeCallback(sourceType, countryCode) {
         *     console.log("Country code type : " + sourceType + " value : " + countryCode);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getCountryCode("GPS", onCountryCodeCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: LOCALE
         * function onCountryCodeCallback(sourceType, countryCode) {
         *     console.log("Country code type : " + sourceType + " value : " + countryCode);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getCountryCode("LOCALE", onCountryCodeCallback, onErrorCallback);
         */
        getCountryCode: function(sourceType, onsuccess, onerror) {
            var cmd = "scpluginProdGetCountryCode";
            var args = {};
            args.callbackName = "__onNMProdGetCountryCodeCallback";
            args.sourceType = sourceType;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.setKeepScreenOn(onSetKeepScreenOnCallback,onErrorCallback) void setKeepScreenOn()
         * @apiName setKeepScreenOn()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] set FLAG_KEEP_SCREEN_ON to keep the screen on mode
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onSetKeepScreenOnCallback Invokes when the request is established successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSetKeepScreenOnCallback() {
         *     console.log("FLAG_KEEP_SCREEN_ON set successfully.")
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.setKeepScreenOn(onSetKeepScreenOnCallback, onErrorCallback);
         */
        setKeepScreenOn: function(onsuccess, onerror) {
            var cmd = "scpluginProdSetKeepScreenOn";
            var args = {};
            args.callbackName = "__onNMProdSetKeepScreenOnCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.clearKeepScreenOn(onClearKeepScreenOnCallback,onErrorCallback) void clearKeepScreenOn()
         * @apiName clearKeepScreenOn()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] clear FLAG_KEEP_SCREEN_ON flag to clear keep the screen on mode
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onClearKeepScreenOnCallback Invokes when the request is established successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onClearKeepScreenOnCallback() {
         *     console.log("FLAG_KEEP_SCREEN_ON clear successfully.")
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.clearKeepScreenOn(onClearKeepScreenOnCallback, onErrorCallback);
         */
        clearKeepScreenOn: function(onsuccess, onerror) {
            var cmd = "scpluginProdClearKeepScreenOn";
            var args = {};
            args.callbackName = "__onNMProdClearKeepScreenOnCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.getGpsLocation(onGpsLocationCallback,onErrorCallback) void getGpsLocation()
         * @apiName getGpsLocation()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Gets Gps Location of Mobile device
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onGpsLocationCallback Receives Gps Location.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onGpsLocationCallback(gpsLocation) {
         *     if (gpsLocation != null) {
         *         console.log("GpsLocation latitude" + gpsLocation.latitude);
         *         console.log("GpsLocation longitude" + gpsLocation.longitude);
         *     } else {
         *         console.log("GpsLoaction is not available")
         *     }
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.getGpsLocation(onGpsLocationCallback, onErrorCallback);
         */
        getGpsLocation: function(onsuccess, onerror) {
            var cmd = "scpluginProdGetGpsLocation";
            var args = {};
            args.callbackName = "__onNMProdGpsLocationCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.getSAUserId(onSAUserIdCallback,onErrorCallback) void getSAUserId()
         * @apiName getSAUserId()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Gets global user id of samsung account.
         * @apiVersion 1.2.6
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onSAUserIdCallback Receives global user id of samsung account.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSAUserIdCallback(saUserId) {
         *     console.log("User id of samsung account : " + saUserId);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getSAUserId(onSAUserIdCallback, onErrorCallback);
         */
        getSAUserId: function(onsuccess, onerror) {
            var cmd = "scpluginProdGetSAUserId";
            var args = {};
            args.callbackName = "__onNMProdGetSAUserIdCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.getSACountryCode(onSACountryCodeCallback,onErrorCallback) void getSACountryCode()
         * @apiName getSACountryCode()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Gets Country code of samsung account.
         * @apiVersion 1.3.6
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onSACountryCodeCallback Receives global Country code of samsung account.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSACountryCodeCallback(saCountryCode) {
         *     console.log("Country code of samsung account : " + saCountryCode);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getSACountryCode(onSACountryCodeCallback, onErrorCallback);
         */
        getSAUserCountryCode: function(onsuccess, onerror) {
            var cmd = "scpluginProdGetSACountryCode";
            var args = {};
            args.callbackName = "__onNMProdGetSACountryCodeCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    /**
         * @api window.scplugin.manager.getInstalledAppId(appId,onInstalledAppIdCallback,onErrorCallback,locationId) void getInstalledAppId()
         * @apiName getInstalledAppId()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Gets Installed App Id.
         * @apiVersion 1.3.2
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
     *
         * @apiParam {String} appId App Id for get the InstalledAppId.
         * @apiParam {Function} onInstalledAppIdCallback Receives Installed App Id.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {String} locationId Location Id for get the InstalledAppId.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onInstalledAppIdCallback(installedAppId) {
         *     console.log("Installed App Id : " + installedAppId);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getInstalledAppId(appId, onInstalledAppIdCallback, onErrorCallback, locationId);
         */
        getInstalledAppId: function(appId, onsuccess, onerror, locationId) {
            var cmd = "scpluginProdGetInstalledAppId";
            var args = {};
            args.appId = appId;
            args.callbackName = "__onNMProdInstalledAppIdCallback";
            args.cmd = cmd;
            args.locationId = locationId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.getRegisteredDeviceInfo(onGetRegisteredDeviceInfoCallback,onErrorCallback,filter) void getRegisteredDeviceInfo()
         * @apiName getRegisteredDeviceInfo()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Get all device local unique id and name list of this account.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onGetRegisteredDeviceInfoCallback Callback function name to receive response from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [filter] Optional. Filter object to get registered device information.
         * @apiParam {String} filter.deviceId Device global unique id.
         * @apiParam {String} filter.deviceType DeviceType Uri.
         * @apiParam {String} filter.locationId Location Id of device.
         * @apiParam {String} filter.roomId Room Id of device.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onGetRegisteredDeviceInfoCallback(deviceList) {
         *   console.log("List of device id and name : " + JSON.stringify(deviceList));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var filter = {
         *   "locationId" : "locationId",
         *   "deviceType" : "oic.d.switch"
         * }
         * scplugin.manager.getRegisteredDeviceInfo(onGetRegisteredDeviceInfoCallback, onErrorCallback, filter);
         *
         * @apiExample {js} Example usage: Case without filter device
         * function onGetRegisteredDeviceInfoCallback(deviceList) {
         *   console.log("List of device id and name : " + JSON.stringify(deviceList));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * // If there is no filter device, get the entire device list.
         * scplugin.manager.getRegisteredDeviceInfo(onGetRegisteredDeviceInfoCallback, onErrorCallback);
         */
        getRegisteredDeviceInfo: function(onsuccess, onerror, filter) {
            var cmd = "scpluginProdGetRegisteredDeviceInfo";
            var args = {};
            args.callbackName = "__onNMProdGetRegisteredDeviceInfo";
            args.cmd = cmd;
            args.filter = null;
            try {
                if(undefined !== filter && !!filter) {
                    args.filter = {
                        deviceId : filter.deviceId || null,
                        locationId : filter.locationId || null,
                        deviceType : filter.deviceType || null,
                        roomId : filter.roomId || null
                    }
                }
            } catch (e) {
                var err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                onerror(err);
            }
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.getLDConfig(featureKey,onLDConfigCallback,onErrorCallback) void getLDConfig()
         * @apiName getLDConfig()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Gets state of Launch Darkly Configuration.
         * @apiVersion 1.3.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} featureKey Feature Key for Launch Darkly
         * @apiParam {Function} onLDConfigCallback Receives state of Launch Darkly Configuration.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onLDConfigCallback(ldConfig) {
         *     console.log("State of Launch Darkly Configuration : " + ldConfig);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getLDConfig(featureKey, onLDConfigCallback, onErrorCallback);
         */
        getLDConfig: function(featureKey, onsuccess, onerror) {
            var cmd = "scpluginProdGetLDConfig";
            var args = {};
            args.callbackName = "__onNMProdGetLDConfigCallback";
            args.cmd = cmd;
            args.featureKey = featureKey;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.getAddressFromPosition(latitude,longitude,onAddressFromPositionCallback,onErrorCallback) void getAddressFromPosition()
         * @apiName getAddressFromPosition()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Gets Address from position(latitude, longitude)
         * @apiVersion 1.3.4
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} latitude Latitude for getting address
         * @apiParam {String} longitude Longitude for getting address
         * @apiParam {Function} onAddressFromPositionCallback Gets Address from position
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onAddressFromPositionCallback(address) {
         *     console.log("Address : " + address.fullText);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getAddressFromPosition(latitude, longitude, onAddressFromPositionCallback, onErrorCallback);
         */
        getAddressFromPosition: function(latitude, longitude, onsuccess, onerror) {
            var cmd = "scpluginProdGetAddressFromPosition";
            var args = {};
            args.callbackName = "__onNMProdGetAddressFromPositionCallback";
            args.cmd = cmd;
            args.latitude = latitude;
            args.longitude = longitude;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.getSettingConfig(featureKey,onSettingConfigCallback,onErrorCallback) void getSettingConfig()
         * @apiName getSettingConfig()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Gets state of Setting Configuration.
         * @apiVersion 1.3.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {SettingConfigType} configType Configuration Type for Setting
         * @apiParam {Function} onSettingConfigCallback Receives state of Setting Configuration.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse SETTING_CONFIG_TYPE
         *
         * @apiExample {js} Example usage: USE_PHONE_LOCATION
         * function onSettingConfigCallback(state) {
         *     if(state == true) {
         *         console.log("Use Phone location is enabled"");
         *     } else {
         *         console.log("Use Phone location is disabled"");
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getSettingConfig('USE_PHONE_LOCATION', onSettingConfigCallback, onErrorCallback);
         */
        getSettingConfig: function(configType, onsuccess, onerror) {
            var cmd = "scpluginProdGetSettingConfig";
            var args = {};
            args.callbackName = "__onNMProdGetSettingConfigCallback";
            args.cmd = cmd;
            args.configType = configType;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.decryptText(onDecryptCallback,onErrorCallback,encryptedTarget,sourceId,devicdId) void decryptText()
         * @apiName decryptText()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Decrypt input text using Key in KeyStore.
         * @apiVersion 1.3.4
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onDecryptCallback Receives plain Text of encrypted Text
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {[Object]} encryptedTarget List of Pairs of Encrypted Text, Initial value
         * @apiParam {String} encryptedTarget.encryptedText Encrypted Text
         * @apiParam {String} encryptedTarget.iv Initial value for encrypted Text
         * @apiParam {String} sourceId Source Identifier
         * @apiParam {String} [deviceId] Device Identifier, To be developed
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onDecryptCallback(plainTexts) {
         *     for (var i in plainTexts) {
         *         console.log("This is Plain Text : " + plainTexts[i]);
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * var encryptedTarget = [{
         *   "encryptedText": "uY31U3/fKRZhK4avi50cNPPVXjP1RnMJiBYkaR4Au0340x1NrS2VPl9712345gg",
         *   "iv": "qNM0F1234viD9kb"
         * }];
         *
         * scplugin.manager.decryptText(onDecryptCallback, onErrorCallback, encryptedTarget, sourceId, null);
         */
        decryptText: function(onsuccess, onerror, encryptedTarget, sourceId, deviceId) {
            var cmd = "scpluginProdDecryptText";
            var args = {};
            args.callbackName = "__onNMProdDecryptTextCallback";
            args.cmd = cmd;
            args.encryptedTarget = encryptedTarget;
            args.sourceId = sourceId;
            args.deviceId = deviceId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.manager.getAppPreferenceData(key,onAppPreferenceDataCallback,onErrorCallback) void getAppPreferenceData()
         * @apiName getAppPreferenceData()
         * @apiGroup Plugin manager
         * @apiDescription [In-House] Share app preference datas by key, example key) IOT_SERVER_POS : This key indicates which iot server now app is heading to.
         * @apiVersion 1.3.4
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} key registered preference's key
         * @apiParam {Function} onAppPreferenceDataCallback Receives jsonObject
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onAppPreferenceDataCallback(response) {
         *     console.log("Received AppPreferenceData successfully");
         *     console.log("Requested AppPreferenceData : " + JSON.stringify(response));
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getAppPreferenceData('IOT_SERVER_POS', onAppPreferenceDataCallback, onErrorCallback);
         */
        getAppPreferenceData: function(key, onsuccess, onerror) {
            var cmd = "scpluginGetAppPreferenceData";
            var args = {};
            args.callbackName = "__onNMProdGetAppPreferenceData";
            args.cmd = cmd;
            args.key = key;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    var automationManager = function() {

    }

    automationManager.prototype = {

        /**
         * @api window.scplugin.automationManager.createAutomation(locationId,automationBody,onCreateAutomationCallback,onErrorCallback) void createAutomation()
         * @apiName createAutomation()
         * @apiGroup Automation manager
         * @apiDescription Creates automation.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} locationId Location id to create.
         * @apiParam {Object} automationBody Information needed to create automation.
         * @apiParam {Function} onCreateAutomationCallback Callback function name to receive response from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *

         * @apiExample {js} Create Automation - Example usage:
         * function onCreateAutomationCallback(automation) {
         *   console.log("ID of created automation is : " + automation.automationId);
         * }
         *
         * window.scplugin.automationManager.createAutomation("locationId", {
         *    "hidden": true,
         *    "pluginDeviceId": "11111111-2222-3333-4444-555555555555",
         *    "enabled": "Enabled",
         *    "customTag": "API TEST CUSTOM TAG",
         *    "timeCondition": {
         *        "cType": "ScheduleCondition",
         *        "time": "44 13",
         *        "days": "MON,TUE,WED"
         *    },
         *    "deviceActions": [
         *        {
         *            "rt": "oic.r.switch.binary",
         *            "did": "9a2311da-9da4-4ac6-b4c5-afd3db4d1489",
         *            "href": "/capability/switch/0",
         *            "property": "value",
         *            "value": "false",
         *            // Enum type : string, boolean, integer, double
         *            "valueType": "string",
         *            "aType": "Action"
         *        }
         *    ],
         *    "name": "Unknown device+1561632526",
         *    "locationId": "2e56df23-9ac4-46bb-a418-6ca92a53130a"
         * }, onCreateAutomationCallback, onErrorCallback);
         *
         *
         * @apiExample {js} Automation Body - Example usage:
         * {
         *    "hidden": true,
         *    "automationId" : "by2311da-9da4-4ac6-b4c5-afd3db4d1489",
         *    "pluginDeviceId": "11111111-2222-3333-4444-555555555555",
         *    "enabled": "Enabled",
         *    "customTag": "API TEST CUSTOM TAG",
         *    "timeCondition": {
         *        "cType": "ScheduleCondition",
         *        "time": "44 13",
         *        "days": "MON,TUE,WED"
         *    },
         *    "deviceActions": [
         *        {
         *            "rt": "oic.r.switch.binary",
         *            "did": "9a2311da-9da4-4ac6-b4c5-afd3db4d1489",
         *            "href": "/capability/switch/0",
         *            "property": "value",
         *            "value": "false",
         *            // Enum type : string, boolean, integer, double
         *            "valueType": "string",
         *            "aType": "Action"
         *        }
         *    ],
         *    "name": "Unknown device+1561632526",
         *    "locationId": "2e56df23-9ac4-46bb-a418-6ca92a53130a"
         * }
         *
         */
        createAutomation: function(locationId, automationBody, onCreateAutomationCallback, onErrorCallback) {
            var cmd = "scpluginProdCreateAutomation";
            var args = {};
            args.callbackName = "__onNMProdCreateAutomationCallback";
            args.cmd = cmd;
            args.locationId = locationId;
            args.automationBody = automationBody;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onCreateAutomationCallback, onErrorCallback);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onErrorCallback(err);
            }
        },

        /**
         * @api window.scplugin.automationManager.getAutomationList(locationId,onGetAutomationListCallback,onErrorCallback,filter) void getAutomationList()
         * @apiName getAutomationList()
         * @apiGroup Automation manager
         * @apiDescription Gets list of automation.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} locationId Location to get registered automation.
         * @apiParam {Function} onGetAutomationListCallback Callback function name to receive response from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [filter] Optional. Filter object to get registered automation information.
         * @apiParam {String} filter.customTag Custom tag to get registered automation.
         * @apiParam {String} filter.deviceId Device id to get registered automation.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onGetAutomationListCallback(automationList) {
         *      console.log("automation list is : " + JSON.stringify(automationList));
         * }
         *
         * var filter = {
         *  customTag : "/capability/switch/0/2aadd397-a71f-40c5-8556-1717ed1855e7/PowerOn"
         *  deviceId : "9a2311da-9da4-4ac6-b4c5-afd3db4d1489"
         * }
         *
         * window.scplugin.automationManager.getAutomationList("locationId", onGetAutomationListCallback, onErrorCallback, filter);
         *
         */
        getAutomationList: function(locationId, onGetAutomationListCallback, onErrorCallback, filter) {
            var cmd = "scpluginProdGetAutomationList";
            var args = {};
            args.callbackName = "__onNMProdGetAutomationListCallback";
            args.cmd = cmd;
            args.locationId = locationId;
            args.customTag = null;
            args.deviceId = null;

            if(undefined !== filter && !!filter) {
                args.customTag = filter.customTag;
                args.deviceId = filter.deviceId;
            }
            try {
                window.scplugin._scPluginNative.call(cmd, args, onGetAutomationListCallback, onErrorCallback);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onErrorCallback(err);
            }
        },
        /**
         * @api window.scplugin.automationManager.setAutomationStateListener(onSetAutomationStateListenerCallback,onErrorCallback) void setAutomationStateListener()
         * @apiName setAutomationStateListener()
         * @apiGroup Automation manager
         * @apiDescription [In-House] Sets automation state listener.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onSetAutomationStateListenerCallback Callback function name to receive response from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSetAutomationStateListenerCallback(automationId, state, automation) {
         *   console.log("Automation id is " + automationId)
         *   if (state == "add") {
         *     // Automation was added
         *   } else if (state == "update") {
         *     // Automation was updated
         *   } else if (state == "delete") {
         *     // Automation was removed
         *   }
         * }
         *
         * window.scplugin.automationManager.setAutomationStateListener(onSetAutomationStateListenerCallback, onErrorCallback);
         *
         */
        setAutomationStateListener: function(onSetAutomationStateListenerCallback, onErrorCallback) {
            var cmd = "scpluginProdSetAutomationStateListener";
            var args = {};
            args.callbackName = "__onNMProdSetAutomationStateListenerCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, onSetAutomationStateListenerCallback);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on plugin.");
                onErrorCallback(err);
            }
        },

        /**
         * @api window.scplugin.automationManager.unsetAutomationStateListener() void unsetAutomationStateListener()
         * @apiName unsetAutomationStateListener()
         * @apiGroup Automation manager
         * @apiDescription [In-House] Unsets automation state listener.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         *
         * @apiExample {js} Example usage:
         *
         * window.scplugin.automationManager.unsetAutomationStateListener();
         *
         */
        unsetAutomationStateListener: function() {
            var cmd = "scpluginProdUnsetAutomationStateListener";
            var args = {};
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginProdUnsetAutomationStateListener" + this.deviceHandle, args);
            } catch (e) {}
        },

        /**
         * @api window.scplugin.automationManager.navigateTo(navigationViewType,onAutomationNavigateToCallback,onErrorCallback,extraData) void navigateTo()
         * @apiName navigateTo()
         * @apiGroup Automation manager
         * @apiDescription [In-House] Navigates specific automation view page.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {AutomationNavigationViewType} navigationViewType Navigation view type to navigate.
         * @apiParam {Function} onNavigateToCallback Receives finish state of navigating view page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [extraData] Optional. Extra data to send. JSON Object.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse AUTOMATION_NAVIGATION_VIEW_TYPE
         *
         * @apiExample {js} Example usage: ADD_AUTOMATION_VIEW
         * function onAutomationNavigateToCallback(automationNavigationViewType, resultData) {
         *     console.log("Navigate to the specific add automation page successfully. : " + automationNavigationViewType);
         *     console.log("Added automation is " + resultData.automation);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.automationManager.navigateTo("ADD_AUTOMATION_VIEW", onAutomationNavigateToCallback, onErrorCallback, {
         *    "locationId" : "8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0",
         *    "uri" : "/capability/button/0",
         *    "attr" : "button",
         *    "value" : "pushed",
         *    "tag" : "x.com.st.button.pushed"
         * });
         *
         * @apiExample {js} Example usage: EDIT_AUTOMATION_VIEW
         * function onAutomationNavigateToCallback(automationNavigationViewType, resultData) {
         *     console.log("Navigate to the specific edit automation page successfully. : " + automationNavigationViewType);
         *     console.log("Edited automation is " + resultData.automation);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.automationManager.navigateTo("EDIT_AUTOMATION_VIEW", onAutomationNavigateToCallback, onErrorCallback, {
         *    "locationId" : "8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0",
         *    "automationId" : "automation-id-1"
         *    "uri" : "/capability/button/0",
         *    "attr" : "button",
         *    "value" : "pushed",
         *    "tag" : "x.com.st.button.pushed"
         * });
         *
         * @apiSuccessExample {js} extraData
         * // ADD_AUTOMATION_VIEW
         *
         * {
         *    // locationId : Location ID to make automation. "8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0"
         *    "locationId" : "8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0",
         *
         *    // uri : Resource URI to make automation. "/capability/button/0"
         *    "uri" : "/capability/button/0",
         *
         *    // attr : Resource Attribute to make automation. "button"
         *    "attr" : "button",
         *
         *    // value : 1."pushed" 2."double" 3."held"
         *    "value" : "pushed",
         *
         *    // tag : 1."x.com.st.button.pushed" 2."x.com.st.button.double" 3."x.com.st.button.held"
         *    "tag" : "x.com.st.button.pushed"
         * }
         *
         * // EDIT_AUTOMATION_VIEW
         *
         * {
         *    // locationId : Location ID to edit automation. "8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0"
         *    "locationId" : "8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0",
         *
         *    // Automation id value to edit automation.
         *    "automationId" : "automation-id-1",
         *
         *    // uri : Resource URI to edit automation. "/capability/button/0"
         *    "uri" : "/capability/button/0",
         *
         *    // attr : Resource Attribute to make automation. "button"
         *    "attr" : "button",
         *
         *    // value : 1."pushed" 2."double" 3."held"
         *    "value" : "pushed",
         *
         *    // tag : 1."x.com.st.button.pushed" 2."x.com.st.button.double" 3."x.com.st.button.held"
         *    "tag" : "x.com.st.button.pushed"
         * }
         */
        navigateTo: function(navigationViewType, onsuccess, onerror, extraData) {
            var cmd = "scpluginProdAutomationNavigateTo";
            var args = {};
            args.callbackName = "__onNMProdAutomationNavigateToCallback";
            args.navigationViewType = navigationViewType;
            args.extraData = extraData;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.automationManager.editAutomation(automationId,locationId,automationBody,onEditAutomationCallback,onErrorCallback) void editAutomation()
         * @apiName editAutomation()
         * @apiGroup Automation manager
         * @apiDescription [In-House] Edit automation.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} automationId Automation ID to edit.
         * @apiParam {String} locationId Location ID to edit automation.
         * @apiParam {Object} automationBody Information needed to edit automation.
         * @apiParam {Function} onEditAutomationCallback Callback function name to receive response from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         *
         * function onEditAutomationCallback(automation) {
         *   console.log("This is information of automation : " + JSON.stringify(automation));
         * }
         *
         * scplugin.automationManager.editAutomation("c004a14f-ed7c-4ee3-944b-3d9db2742305", "2e56df23-9ac4-46bb-a418-6ca92a53130a", {
         *     "hidden": true,
         *     "pluginDeviceId": "11111111-2222-3333-4444-555555555555",
         *     "enabled": "Enabled",
         *     "customTag": "API TEST CUSTOM TAG",
         *     "timeCondition": {
         *         "cType": "ScheduleCondition",
         *         "time": "44 13",
         *         "days": "MON,TUE,WED"
         *     },
         *     "deviceActions": [
         *         {
         *             "rt": "oic.r.switch.binary",
         *             "did": "9a2311da-9da4-4ac6-b4c5-afd3db4d1489",
         *             "href": "/capability/switch/0",
         *             "property": "value",
         *             "value": "false",
         *             // Enum type : string, boolean, integer, double
         *             "valueType": "string",
         *             "aType": "Action"
         *         }
         *     ],
         *     "name": "Unknown device+1561632526",
         *     "locationId": "2e56df23-9ac4-46bb-a418-6ca92a53130a"
         * }, onEditAutomationCallback, onErrorCallback);
         *
         */
        editAutomation: function(automationId, locationId, automationBody, onEditAutomationCallback, onErrorCallback) {
            var cmd = "scpluginProdEditAutomation";
            var args = {};
            args.callbackName = "__onNMProdEditAutomationCallback";
            args.cmd = cmd;
            args.automationId = automationId;
            args.locationId = locationId;
            args.automationBody = automationBody;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onEditAutomationCallback, onErrorCallback);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onErrorCallback(err);
            }
        },

        /**
         * @api window.scplugin.automationManager.deleteAutomation(automationId,locationId,onDeleteAutomationCallback,onErrorCallback) void deleteAutomation()
         * @apiName deleteAutomation()
         * @apiGroup Automation manager
         * @apiDescription [In-House] Deletes automation.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} automationId Automation ID to delete.
         * @apiParam {String} locationId Location ID to delete automation.
         * @apiParam {Function} onDeleteAutomationCallback Callback function name to receive response from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onDeleteAutomationCallback(automationId) {
         *      console.log('Automation id is ' + automationId)
         * }
         *
         * scplugin.automationManager.deleteAutomation("c004a14f-ed7c-4ee3-944b-3d9db2742305", "aaaaa14f-ed7c-3333-944b-3d9db2742305", onDeleteAutomationCallback, onErrorCallback);
         *
         */
        deleteAutomation: function(automationId, locationId, onDeleteAutomationCallback, onErrorCallback) {
            var cmd = "scpluginProdDeleteAutomation";
            var args = {};
            args.callbackName = "__onNMProdDeleteAutomationCallback";
            args.cmd = cmd;
            args.automationId = automationId;
            args.locationId = locationId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onDeleteAutomationCallback, onErrorCallback);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onErrorCallback(err);
            }
        },
        /**
         * @api window.scplugin.automationManager.getAutomation(automationId,locationId,onGetAutomationCallback,onErrorCallback) void getAutomation()
         * @apiName getAutomation()
         * @apiGroup Automation manager
         * @apiDescription [In-House] Gets information of automation.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} automationId Automation ID to get information.
         * @apiParam {String} locationId Location ID to get information.
         * @apiParam {Function} onGetAutomationCallback Callback function name to receive response from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onGetAutomationCallback(automation) {
         *   console.log("This is information of automation : " + JSON.stringify(automation));
         * }
         *
         * scplugin.automationManager.getAutomation("c004a14f-ed7c-4ee3-944b-3d9db2742305", "aaaaa14f-ed7c-3333-944b-3d9db2742305", onGetAutomationCallback, onErrorCallback);
         *
         */
        getAutomation: function(automationId, locationId, onGetAutomationCallback, onErrorCallback) {
            var cmd = "scpluginProdGetAutomation";
            var args = {};
            args.callbackName = "__onNMProdGetAutomationCallback";
            args.cmd = cmd;
            args.automationId = automationId;
            args.locationId = locationId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onGetAutomationCallback, onErrorCallback);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onErrorCallback(err);
            }
        },
        /**
         * @api window.scplugin.automationManager.enableAutomation(automationId,locationId,onEnableAutomationCallback,onErrorCallback) void enableAutomation()
         * @apiName enableAutomation()
         * @apiGroup Automation manager
         * @apiDescription [In-House] Enable automation.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} automationId Automation ID to enable.
         * @apiParam {String} locationId Location ID to enable automation.
         * @apiParam {Function} onEnableAutomationCallback Callback function name to receive response from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onEnableAutomationCallback(automationId) {
         *      console.log('Automation id is ' + automationId)
         * }
         *
         * scplugin.automationManager.enableAutomation("c004a14f-ed7c-4ee3-944b-3d9db2742305", "aaaaa14f-ed7c-3333-944b-3d9db2742305", onEnableAutomationCallback, onErrorCallback);
         *
         */
        enableAutomation: function(automationId, locationId, onEnableAutomationCallback, onErrorCallback) {
            var cmd = "scpluginProdEnableAutomation";
            var args = {};
            args.callbackName = "__onNMProdEnableAutomationCallback";
            args.cmd = cmd;
            args.automationId = automationId;
            args.locationId = locationId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onEnableAutomationCallback, onErrorCallback);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onErrorCallback(err);
            }
        },
        /**
         * @api window.scplugin.automationManager.disableAutomation(automationId,locationId,onDisableAutomationCallback,onErrorCallback) void disableAutomation()
         * @apiName disableAutomation()
         * @apiGroup Automation manager
         * @apiDescription [In-House] Disable automation.
         * @apiVersion 1.3.5
         * @apiPermission partner
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} automationId Automation ID to disable.
         * @apiParam {String} locationId Location ID to disable automation.
         * @apiParam {Function} onDisableAutomationCallback Callback function name to receive response from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onDisableAutomationCallback(automationId) {
         *      console.log('Automation id is ' + automationId)
         * }
         *
         * scplugin.automationManager.disable("c004a14f-ed7c-4ee3-944b-3d9db2742305", "aaaaa14f-ed7c-3333-944b-3d9db2742305", onDisableAutomationCallback, onErrorCallback);
         *
         */
        disableAutomation: function(automationId, locationId, onDisableAutomationCallback, onErrorCallback) {
            var cmd = "scpluginProdDisableAutomation";
            var args = {};
            args.callbackName = "__onNMProdDisableAutomationCallback";
            args.cmd = cmd;
            args.automationId = automationId;
            args.locationId = locationId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onDisableAutomationCallback, onErrorCallback);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onErrorCallback(err);
            }
        },
    }

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
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
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
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
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
                window.scplugin._scPluginNative.callNative(cmd, args);
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
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
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
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        }
    };

    var AnalyticsLog = function() {}

    AnalyticsLog.prototype = {
        /**
         * @api window.scplugin.analyticsLog.insert(screenId,event,detail,value,onErrorCallback) void insert()
         * @apiName insert()
         * @apiGroup AnalyticsLog
         * @apiDescription [In-House] Samsung analytics logging utility for web plugin.
         * @apiVersion 1.3.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} screenId Screen ID for log message formatting.
         * @apiParam {String} event Event for log message formatting.
         * @apiParam {String} detail Detail message for log.
         * @apiParam {Number} [value] Optional. event value for log.
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
         * window.scplugin.analyticsLog.insert(screenId, event, detail, value, onErrorCallback);
         *
         */
        insert: function(screenId, event, detail, value, onerror) {
            var cmd = "scpluginProdAnalyticsLogInsert";
            var args = {};
            args.callbackName = "__onNMProdAnalyticsLogInsert";
            args.screenId = screenId;
            args.event = event;
            args.detail = detail;
            args.value = value;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, null, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.analyticsLog.insertScreen(screenId,onErrorCallback) void insertScreen()
         * @apiName insertScreen()
         * @apiGroup AnalyticsLog
         * @apiDescription [In-House] Samsung analytics logging utility for web plugin.
         * @apiVersion 1.3.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} screenId Screen ID for log message formatting.
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
         *
         * window.scplugin.analyticsLog.insertScreen(screenId, onErrorCallback);
         *
         */
        insertScreen: function(screenId, onerror) {
            var cmd = "scpluginProdAnalyticsLogInsertScreen";
            var args = {};
            args.callbackName = "__onNMProdAnalyticsLogInsertScreen";
            args.screenId = screenId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, null, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        }
    };

    /**
    * @api SmartKitRule
    * @apiName SmartKitRule
    * @apiGroup SmartKitRule
    * @apiDescription SmartKitRule object. <br />This object can be getted from the SmartKit object.
    * @apiVersion 1.3.5
    * @apiPermission public
    * @apiProfile common
    */
    var SmartKitRule = function() {}

    SmartKitRule.prototype = {
        /**
         * @api window.scplugin.smartkit.rule.createRule(locationId,rulePayload,onCreateRuleCallback,onErrorCallback) void createRule()
         * @apiName createRule()
         * @apiGroup SmartKitRule
         * @apiDescription [In-House] Create Rule.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} locationId Location ID.
         * @apiParam {Object} rulePayload Information needed to create rule.
         * @apiParam {Function} onCreateRuleCallback Receives the Rule Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onCreateRuleCallback(response) {
         *     console.log("createRule : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.rule.createRule(locationId, rulePayload, onCreateRuleCallback, onErrorCallback);
         *
         */
        createRule: function(locationId, rulePayload, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitCreateRule";
            var args = {};
            args.callbackName = "__onNMProdSmartkitRuleCommon";
            args.locationId = locationId;
            args.rulePayload = rulePayload;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.rule.deleteRule(locationId,ruleId,onDeleteRuleCallback,onErrorCallback) void deleteRule()
         * @apiName deleteRule()
         * @apiGroup SmartKitRule
         * @apiDescription [In-House] Delete Rule.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} locationId Location ID.
         * @apiParam {String} ruleId Rule ID.
         * @apiParam {Function} onDeleteRuleCallback Receives the response from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onDeleteRuleCallback(response) {
         *     console.log("deleteRule : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.rule.deleteRule(locationId, ruleId, onDeleteRuleCallback, onErrorCallback);
         *
         */
        deleteRule: function(locationId, ruleId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitDeleteRule";
            var args = {};
            args.callbackName = "__onNMProdSmartkitRuleCommon";
            args.locationId = locationId;
            args.ruleId = ruleId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.rule.updateRule(ruleId,locationId,rulePayload,onUpdateRuleCallback,onErrorCallback) void updateRule()
         * @apiName updateRule()
         * @apiGroup SmartKitRule
         * @apiDescription [In-House] Update Rule.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} ruleId Rule ID.
         * @apiParam {String} locationId Location ID.
         * @apiParam {Object} rulePayload Information needed to create rule.
         * @apiParam {Function} onUpdateRuleCallback Receives the Rule Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onUpdateRuleCallback(response) {
         *     console.log("updateRule : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.rule.updateRule(ruleId, locationId, rulePayload, onUpdateRuleCallback, onErrorCallback);
         *
         */
        updateRule: function(ruleId, locationId, rulePayload, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitUpdateRule";
            var args = {};
            args.callbackName = "__onNMProdSmartkitRuleCommon";
            args.ruleId = ruleId;
            args.locationId = locationId;
            args.rulePayload = rulePayload;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.rule.getRule(ruleId,locationId,onGetRuleCallback,onErrorCallback) void getRule()
         * @apiName getRule()
         * @apiGroup SmartKitRule
         * @apiDescription [In-House] Get Rule.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} ruleId Rule ID.
         * @apiParam {String} locationId Location ID.
         * @apiParam {Function} onGetRuleCallback Receives the Rule Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onGetRuleCallback(response) {
         *     console.log("getRule : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.rule.getRule(ruleId, locationId, onGetRuleCallback, onErrorCallback);
         *
         */
        getRule: function(ruleId, locationId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetRule";
            var args = {};
            args.callbackName = "__onNMProdSmartkitRuleCommon";
            args.ruleId = ruleId;
            args.locationId = locationId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.rule.getRuleList(locationId,onGetRuleListCallback,onErrorCallback) void getRuleList()
         * @apiName getRuleList()
         * @apiGroup SmartKitRule
         * @apiDescription [In-House] Get Rule List.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} locationId Location ID.
         * @apiParam {Function} onGetRuleListCallback Receives the List of Rule Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onGetRuleListCallback(response) {
         *     console.log("getRuleList : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.rule.getRuleList(locationId, onGetRuleListCallback, onErrorCallback);
         *
         */
        getRuleList: function(locationId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetRuleList";
            var args = {};
            args.callbackName = "__onNMProdSmartkitRuleCommon";
            args.locationId = locationId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.rule.subscribe(locationId,onRuleSubscribeEventCallback,onErrorCallback) void subscribe()
         * @apiName subscribe()
         * @apiGroup SmartKitRule
         * @apiDescription [In-House] Subscribes for data changes of rule.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} locationId The unique identifier of the location.
         *
         * @apiParam {Function} onRuleSubscribeEventCallback Receives update event from smartKit endpoint
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onRuleSubscribeEventCallback(result, event) {
         *     if (result == "SUCCESS") {
         *         console.log("subscribe : " + JSON.stringify(event));
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.rule.subscribe(locationId, onRuleSubscribeEventCallback, onErrorCallback);
         *
         */
        subscribe: function(locationId, callback, onerror) {
            var cmd = "scpluginProdSmartkitRuleSubscribe";
            var args = {};
            args.callbackName = "__onNMProdSmartkitRuleCommon";
            args.locationId = locationId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + locationId, args, callback)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.rule.unsubscribe(locationId) void unsubscribe()
         * @apiName unsubscribe()
         * @apiGroup SmartKitRule
         * @apiDescription [In-House] Unsubscribes to event changes.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} locationId The Unique Identifier
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         *
         * @apiExample {js} Example usage:
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var locationId = '0905b229-8a50-a7cf-f849-ca53ea563194';
         * window.scplugin.smartkit.rule.unsubscribe(locationId, onErrorCallback);
         *
         */
        unsubscribe: function(locationId, onerror) {
            var cmd = "scpluginProdSmartkitRuleUnsubscribe";
            var args = {};
            args.locationId = locationId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginProdSmartkitRuleSubscribe" + locationId, args)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.rule.updateRuleStatus(ruleId,locationId,status,onUpdateRuleStatusCallback,onErrorCallback) void updateRuleStatus()
         * @apiName updateRuleStatus()
         * @apiGroup SmartKitRule
         * @apiDescription [In-House] Update Rule.
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} ruleId Rule ID.
         * @apiParam {String} locationId Location ID.
         * @apiParam {Object} status The status of a Behavior. This value only allowed 'Enable' or 'Disable' with case insensitive
         * @apiParam {Function} onUpdateRuleStatusCallback Receives the Rule Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onUpdateRuleStatusCallback(response) {
         *     console.log("updateRuleStatus : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.rule.updateRuleStatus(ruleId, locationId, status, onUpdateRuleStatusCallback, onErrorCallback);
         *
         */
        updateRuleStatus: function(ruleId, locationId, status, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitUpdateRuleStatus";
            var args = {};
            args.callbackName = "__onNMProdSmartkitRuleCommon";
            args.ruleId = ruleId;
            args.locationId = locationId;
            args.status = status;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
    }

    /**
    * @api SmartKitTracker
    * @apiName SmartKitTracker
    * @apiGroup SmartKitTracker
    * @apiDescription SmartKitTracker object. <br />This object can be getted from the SmartKit object.
    * @apiVersion 1.3.5
    * @apiPermission public
    * @apiProfile common
    */
   var SmartKitTracker = function() {}

   SmartKitTracker.prototype = {
       /**
         * @api window.scplugin.smartkit.tracker.getGeoLocationsHistory(deviceId,onTrackerGeoLocationsHistoryCallback,onErrorCallback,extraData) void getGeoLocationsHistory()
         * @apiName getGeoLocationsHistory()
         * @apiGroup SmartKitTracker
         * @apiDescription [In-House] Get geo-location history of tracker
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId Device ID.
         * @apiParam {Object} [extraData] Optional. The object of extraData
         * @apiParam {String} [extraData.latest] Optional. Whether to fetch the latest location. Returns the latest location when this flag is true, or time series data set based on paging parameters when it's false. (default : false)
         * @apiParam {String} [extraData.order] Optional. The order to fetch the location based on stored time. It can be desc or asc. This parameter is ignored if latest is true. "DESCENDING" or "ASCENDING"(default : "DESCENDING")
         * @apiParam {String} [extraData.limit] Optional. The size of location to fetch. default limit is 100, max limit is 500. This parameter is ignored if latest is true. (default : 100)
         * @apiParam {String} [extraData.offset] Optional. The key of the item where the operation stopped, inclusive of the previous result. Use this value to fetch next result. This parameter is ignored if latest is true.
         * @apiParam {Function} onTrackerGeoLocationsHistoryCallback Receives the result from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onTrackerGeoLocationsHistoryCallback(response) {
         *     console.log("getGeoLocationsHistory : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var extraData = {"latest": true, "order": "ASCENDING", "limit": 100};
         * window.scplugin.smartkit.tracker.getGeoLocationsHistory(deviceId, onTrackerGeoLocationsHistoryCallback, onErrorCallback, requestBody);
         *
         */
        getGeoLocationsHistory: function(deviceId, onsuccess, onerror, extraData) {
            var cmd = "scpluginProdSmartkitTrackersGetGeoLocationsHistory";
            var args = {};
            args.callbackName = "__onNMProdSmartkitTrackers";
            args.deviceId = deviceId;
            args.extraData = extraData;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.tracker.getGeoLocations(deviceIds,onTrackerGeoLocationsCallback,onErrorCallback) void getGeoLocations()
         * @apiName getGeoLocations()
         * @apiGroup SmartKitTracker
         * @apiDescription [In-House] Get geo-location of trackers
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {[String]} deviceIds List of Device ID.
         * @apiParam {Function} onTrackerGeoLocationsCallback Receives the result from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onTrackerGeoLocationsCallback(response) {
         *     console.log("getGeoLocations : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.tracker.getGeoLocations(deviceIds, onTrackerGeoLocationsCallback, onErrorCallback);
         *
         */
        getGeoLocations: function(deviceIds, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitTrackersGetGeoLocations";
            var args = {};
            args.callbackName = "__onNMProdSmartkitTrackers";
            args.deviceIds = deviceIds;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.tracker.setSearchingStatus(deviceId,searchingStatus,onTrackerSetSearchingStatusCallback,onErrorCallback) void setSearchingStatus()
         * @apiName setSearchingStatus()
         * @apiGroup SmartKitTracker
         * @apiDescription [In-House] Update Searching Status
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId Device ID.
         * @apiParam {String} searchingStatus Searching Status
         * @apiParam {Function} onTrackerSetSearchingStatusCallback Receives the result from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onTrackerSetSearchingStatusCallback(response) {
         *     //response is empty
         *     console.log("Success to setSearchingStatus");
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.tracker.setSearchingStatus(deviceId, searchingStatus, onTrackerSetSearchingStatusCallback, onErrorCallback);
         *
         */
        setSearchingStatus: function(deviceId, searchingStatus, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitTrackersSetSearchingStatus";
            var args = {};
            args.callbackName = "__onNMProdSmartkitTrackers";
            args.deviceId = deviceId;
            args.searchingStatus = searchingStatus;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
   }

    /**
    * @api SmartKit
    * @apiName SmartKit
    * @apiGroup SmartKit
    * @apiDescription [In-House] SmartKit object. Gets response object from the SmartThingsCore Library.
    * @apiVersion 1.3.5
    * @apiPermission public
    * @apiProfile common
    *
    */
    var SmartKit = function() {
        Object.defineProperties(this, {
            rule: {
                value: new SmartKitRule(),
                writable: false,
                enumerable: true
            },
            tracker: {
                value: new SmartKitTracker(),
                writable: false,
                enumerable: true
            }
        });
    }

    SmartKit.prototype = {
        /**
         * @api window.scplugin.smartkit.getDevice(deviceId,onSTDeviceCallback,onErrorCallback) void getDevice()
         * @apiName getDevice()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets device object from SmartKit
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId Device ID.
         * @apiParam {Function} onSTDeviceCallback Receives the Device Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTDeviceCallback(response) {
         *     console.log("getDevice : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getDevice(deviceId, onSTDeviceCallback, onErrorCallback);
         *
         */
        getDevice: function(deviceId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetDevice";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGetDevice";
            args.deviceId = deviceId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getDevices(locationIds,onSTDevicesCallback,onErrorCallback) void getDevices()
         * @apiName getDevices()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets List of device object from SmartKit
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {[String]} locationIds List of Location ID.
         * @apiParam {Function} onSTDevicesCallback Receives the List of Device Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTDevicesCallback(response) {
         *     console.log("getDevices : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getDevices(locationIds, onSTDevicesCallback, onErrorCallback);
         *
         */
        getDevices: function(locationIds, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetDevices";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGetDevices";
            args.locationIds = locationIds;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getLocation(locationId,onSTLocationCallback,onErrorCallback) void getLocation()
         * @apiName getLocation()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets Location object from SmartKit
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} locationId Location ID.
         * @apiParam {Function} onSTLocationCallback Receives the Location Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTLocationCallback(response) {
         *     console.log("getLocation : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getLocation(locationId, onSTLocationCallback, onErrorCallback);
         *
         */
        getLocation: function(locationId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetLocation";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGetLocation";
            args.locationId = locationId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getLocationUsers(locationId,onSTLocationUsersCallback,onErrorCallback) void getLocationUsers()
         * @apiName getLocationUsers()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets Location Users object from SmartKit
         * @apiVersion 1.3.6
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} locationId Location ID.
         * @apiParam {Function} onSTLocationUsersCallback Receives the Location Users Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTLocationUsersCallback(response) {
         *     console.log("getLocationUsers : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {`
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getLocationUsers(locationId, onSTLocationUsersCallback, onErrorCallback);
         *
         */
        getLocationUsers: function(locationId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetLocationUsers";
            var args = {};
            args.callbackName = "__onNMProdSmartkitCommon";
            args.locationId = locationId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getRoom(locationId,roomId,onSTRoomCallback,onErrorCallback) void getRoom()
         * @apiName getRoom()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets room object from SmartKit
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate

         * @apiParam {String} locationId Location ID.
         * @apiParam {String} roomId Room ID.
         * @apiParam {Function} onSTRoomCallback Receives the Room Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTRoomCallback(response) {
         *     console.log("getRoom : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getRoom(locationId, roomId, onSTRoomCallback, onErrorCallback);
         *
         */
        getRoom: function(locationId, roomId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetRoom";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGetRoom";
            args.locationId = locationId;
            args.roomId = roomId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getDeviceHealthData(deviceId,onSTDeviceHealthDataCallback,onErrorCallback) void getDeviceHealthData()
         * @apiName getDeviceHealthData()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets DeviceHealthData object from SmartKit
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId device ID.
         * @apiParam {Function} onSTDeviceHealthDataCallback Receives the DeviceHealthData Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTDeviceHealthDataCallback(response) {
         *     console.log("getDeviceHealthData : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getDeviceHealthData(deviceId, onSTDeviceHealthDataCallback, onErrorCallback);
         *
         */
        getDeviceHealthData: function(deviceId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetDeviceHealthData";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGetDeviceHealthData";
            args.deviceId = deviceId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.setSTDeviceHealthChangeListener(deviceId,onSTDeviceHealthChangeCallback,onErrorCallback) void setSTDeviceHealthChangeListener()
         * @apiName setSTDeviceHealthChangeListener()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Sets device health data changes callback and monitors its data changes.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId device ID.
         * @apiParam {Function} onSTDeviceHealthChangeCallback Receives update health data event from smartKit endpoint
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTDeviceHealthChangeCallback(result, event) {
         *     if (result == "SUCCESS") {
         *         console.log("subscribe : " + JSON.stringify(event));
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.setSTDeviceHealthChangeListener(deviceId, onSTDeviceHealthChangeCallback, onErrorCallback);
         *
         */
        setSTDeviceHealthChangeListener: function(deviceId, callback, onerror) {
            var cmd = "scpluginProdSmartkitSetSTDeviceHealthChangeListener";
            var args = {};
            args.callbackName = "__onNMProdSmartkitSetSTDeviceHealthChangeCallback";
            args.deviceId = deviceId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + deviceId, args, callback)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.unsetSTDeviceHealthChangeListener(deviceId) void unsetSTDeviceHealthChangeListener()
         * @apiName unsetSTDeviceHealthChangeListener()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Unsets STDeviceHealthChangeListener.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId The Unique Identifier
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         *
         * @apiExample {js} Example usage:
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var deviceId = '0905b229-8a50-a7cf-f849-ca53ea563194';
         * window.scplugin.smartkit.unsetSTDeviceHealthChangeListener(deviceId, onErrorCallback);
         *
         */
        unsetSTDeviceHealthChangeListener: function(deviceId, onerror) {
            var cmd = "scpluginProdSmartkitUnsetSTDeviceHealthChangeListener";
            var args = {};
            args.deviceId = deviceId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginProdSmartkitSetSTDeviceHealthChangeListener" + deviceId, args)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.setSTDeviceLifecycleChangeListener(deviceId,onSTDeviceLifecycleChangeListener,onErrorCallback) void setSTDeviceLifecycleChangeListener()
         * @apiName setSTDeviceLifecycleChangeListener()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Sets device Lifecycle data changes callback and monitors its data changes.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId device ID.
         * @apiParam {Function} onSTDeviceLifecycleChangeListener Receives update Lifecycle data event from smartKit endpoint
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTDeviceLifecycleChangeListener(result, event) {
         *     if (result == "SUCCESS") {
         *         console.log("subscribe : " + JSON.stringify(event));
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.setSTDeviceLifecycleChangeListener(deviceId, onSTDeviceLifecycleChangeListener, onErrorCallback);
         *
         */
        setSTDeviceLifecycleChangeListener: function(deviceId, callback, onerror) {
            var cmd = "scpluginProdSmartkitSetSTDeviceLifecycleChangeListener";
            var args = {};
            args.callbackName = "__onNMProdSmartkitSetSTDeviceLifecycleChangeCallback";
            args.deviceId = deviceId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + deviceId, args, callback)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.unsetSTDeviceLifecycleChangeListener(deviceId) void unsetSTDeviceLifecycleChangeListener()
         * @apiName unsetSTDeviceLifecycleChangeListener()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Unsets STDeviceLifecycleChangeListener.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId The Unique Identifier
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         *
         * @apiExample {js} Example usage:
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var deviceId = '0905b229-8a50-a7cf-f849-ca53ea563194';
         * window.scplugin.smartkit.unsetSTDeviceLifecycleChangeListener(deviceId, onErrorCallback);
         *
         */
        unsetSTDeviceLifecycleChangeListener: function(deviceId, onerror) {
            var cmd = "scpluginProdSmartkitUnsetSTDeviceLifecycleChangeListener";
            var args = {};
            args.deviceId = deviceId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginProdSmartkitSetSTDeviceLifecycleChangeListener" + deviceId, args)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.setSTInstalledAppLifecycleChangeListener(installedAppId,onSTInstalledAppLifecycleChangeListener,onErrorCallback) void setSTInstalledAppLifecycleChangeListener()
         * @apiName setSTInstalledAppLifecycleChangeListener()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Sets Installed App Lifecycle data changes callback and monitors its data changes.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} installedAppId The Installed App Id.
         * @apiParam {Function} onSTInstalledAppLifecycleChangeListener Receives update Lifecycle data event from smartKit endpoint
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTInstalledAppLifecycleChangeListener(result, event) {
         *     if (result == "SUCCESS") {
         *         console.log("subscribe : " + JSON.stringify(event));
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.setSTInstalledAppLifecycleChangeListener(installedAppId, onSTInstalledAppLifecycleChangeListener, onErrorCallback);
         *
         */
        setSTInstalledAppLifecycleChangeListener: function(installedAppId, callback, onerror) {
            var cmd = "scpluginProdSmartkitSetSTInstalledAppLifecycleChangeListener";
            var args = {};
            args.callbackName = "__onNMProdSmartkitSetSTInstalledAppLifecycleChangeCallback";
            args.installedAppId = installedAppId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + installedAppId, args, callback)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.unsetSTInstalledAppLifecycleChangeListener(installedAppId) void unsetSTInstalledAppLifecycleChangeListener()
         * @apiName unsetSTInstalledAppLifecycleChangeListener()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Unsets STInstalledAppLifecycleChangeListener.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} installedAppId The Unique Identifier
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         *
         * @apiExample {js} Example usage:
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var installedAppId = '0905b229-8a50-a7cf-f849-ca53ea563194';
         * window.scplugin.smartkit.unsetSTInstalledAppLifecycleChangeListener(installedAppId, onErrorCallback);
         *
         */
        unsetSTInstalledAppLifecycleChangeListener: function(installedAppId, onerror) {
            var cmd = "scpluginProdSmartkitUnsetSTInstalledAppLifecycleChangeListener";
            var args = {};
            args.installedAppId = installedAppId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginProdSmartkitSetSTInstalledAppLifecycleChangeListener" + installedAppId, args)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.getDeviceStatus(deviceId,onSTDeviceStatusCallback,onErrorCallback) void getDeviceStatus()
         * @apiName getDeviceStatus()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets Device Status object from SmartKit
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId device ID.
         * @apiParam {Function} onSTDeviceStatusCallback Receives the DeviceStatus Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTDeviceStatusCallback(response) {
         *     console.log("getDeviceStatus : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getDeviceStatus(deviceId, onSTDeviceStatusCallback, onErrorCallback);
         *
         */
        getDeviceStatus: function(deviceId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetDeviceStatus";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGetDeviceStatus";
            args.deviceId = deviceId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.executeCommands(deviceId,commands,onSTExecuteCommandsCallback,onErrorCallback) void executeCommands()
         * @apiName executeCommands()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Execute the given command
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId device ID.
         * @apiParam {Object} commands Commands for execute. JSON Object (Please refer this link : https://librarian-regionals.smartthingsgdev.com/api/api.smartthings.com.v1#operation/executeDeviceCommands)
         * @apiParam {Function} onSTExecuteCommandsCallback Receives the result from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTExecuteCommandsCallback(result) {
         *     if (result == 'SUCCESS') {
         *          console.log("executeCommands Successful");
         *     } else {
         *          console.log("Failed to executeCommands");
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.executeCommands(deviceId, onSTExecuteCommandsCallback, onErrorCallback);
         *
         */
        executeCommands: function(deviceId, commands, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitExecuteCommands";
            var args = {};
            args.callbackName = "__onNMProdSmartkitExecuteCommands";
            args.deviceId = deviceId;
            args.commands = commands
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.groupExecuteCommands(groupId,commands,onSTGroupExecuteCommandsCallback,onErrorCallback) void groupExecuteCommands()
         * @apiName groupExecuteCommands()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Execute the given command to th device group
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} groupId group ID.
         * @apiParam {Object} commands Commands for execute. JSON Object (Please refer this link : https://librarian-regionals.smartthingsgdev.com/sdk/android/4.108.0/com/smartthings/smartclient/restclient/operation/device/group/DeviceGroupOperations.html#executeDeviceGroupCommands-deviceGroupId-command-additionalCommands-)
         * @apiParam {Function} onSTGroupExecuteCommandsCallback Receives the result from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTGroupExecuteCommandsCallback(result) {
         *     if (result == 'SUCCESS') {
         *          console.log("groupExecuteCommands Successful");
         *     } else {
         *          console.log("Failed to groupExecuteCommands");
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.groupExecuteCommands(groupId, commands, onSTGroupExecuteCommandsCallback, onErrorCallback);
         *
         */
        groupExecuteCommands: function(groupId, commands, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGroupExecuteCommands";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGroupExecuteCommandsCallback";
            args.groupId = groupId;
            args.commands = commands
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.subscribe(deviceId,filters,onSTSubscribeEventCallback,onErrorCallback) void subscribe()
         * @apiName subscribe()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Subscribes for data changes of device.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId The unique identifier of the device.
         * @apiParam {[Object]} [filters] Object containing a list of The filter of subscription Object
         * @apiParam {String} [filters.attribute] The name of an attribute for a device.
         * @apiParam {String} [filters.capabilityId] The unique identifier of the capability of the device.
         * @apiParam {String} [filters.componentId] The unique identifier of the grouping of capabilities provided by a device.
         * @apiParam {String} [filters.deviceId] The unique identifier of the device.
         *
         * @apiParam {Function} onSTSubscribeEventCallback Receives update event from smartKit endpoint
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTSubscribeEventCallback(result, event) {
         *     if (result == "SUCCESS") {
         *         console.log("subscribe : " + JSON.stringify(event));
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var filters = { event: [{
         *     attribute: 'level',
         *     capabilityId: 'switchLevel',
         *     componentId: 'main',
         *     deviceId: '0905b229-8a50-a7cf-f849-ca53ea563194' }]
         * };
         * window.scplugin.smartkit.subscribe(deviceId, filters, onSTSubscribeEventCallback, onErrorCallback);
         *
         */
        subscribe: function(deviceId, filters, callback, onerror) {
            var cmd = "scpluginProdSmartkitSubscribe";
            var args = {};
            args.callbackName = "__onNMProdSmartkitSubscribe";
            args.deviceId = deviceId;
            args.filters = filters;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + deviceId, args, callback)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.unsubscribe(deviceId) void unsubscribe()
         * @apiName unsubscribe()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Unsubscribes to endpoint event changes.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId The Unique Identifier
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         *
         * @apiExample {js} Example usage:
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var deviceId = '0905b229-8a50-a7cf-f849-ca53ea563194';
         * window.scplugin.smartkit.unsubscribe(deviceId, onErrorCallback);
         *
         */
        unsubscribe: function(deviceId, onerror) {
            var cmd = "scpluginProdSmartkitUnsubscribe";
            var args = {};
            args.deviceId = deviceId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginProdSmartkitSubscribe" + deviceId, args)
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.getTrackersGeoLocations(deviceIds,latest,onSTTrackersGeoLocationsCallback,onErrorCallback) void getTrackersGeoLocations()
         * @apiName getTrackersGeoLocations()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Get trackers geo-location (Temporary support)
         * @apiVersion 1.3.2
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {[String]} deviceIds Array of Device ID.
         * @apiParam {Boolean} latest This Field must be set as true(Phase 1)
         * @apiParam {Function} onSTTrackersGeoLocationsCallback Receives the result from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTTrackersGeoLocationsCallback(response) {
         *     console.log("getTrackersGeoLocations : " + response);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getTrackersGeoLocations(deviceIds, onSTTrackersGeoLocationsCallback, onErrorCallback);
         *
         */
        getTrackersGeoLocations: function(deviceIds, latest, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetTrackersGeoLocations";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGetTrackersGeoLocations";
            args.deviceIds = deviceIds;
            args.latest = latest;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.postTrackersKeys(deviceId,pubKey,encPrivKey,onSTTrackersKeysCallback,onErrorCallback) void postTrackersKeys()
         * @apiName postTrackersKeys()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Post trackers keys (Temporary support)
         * @apiVersion 1.3.2
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId Device ID.
         * @apiParam {String} pubKey Public Key.
         * @apiParam {String} encPrivKey Encrypted Private Key with PIN Code.
         * @apiParam {Function} onSTTrackersKeysCallback Receives the result from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTTrackersKeysCallback(response) {
         *     console.log("postTrackersKeys : " + response);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.postTrackersKeys(deviceId, pubKey, encPrivKey, onSTTrackersKeysCallback, onErrorCallback);
         *
         */
        postTrackersKeys: function(deviceId, pubKey, encPrivKey, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitPostTrackersKeys";
            var args = {};
            args.callbackName = "__onNMProdSmartkitPostTrackersKeys";
            args.deviceId = deviceId;
            args.pubKey = pubKey;
            args.encPrivKey = encPrivKey;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.smartkit.getTrackersMetadataMaps(onSTTrackersMetadataMapsCallback,onErrorCallback,serviceProvider) void getTrackersMetadataMaps()
         * @apiName getTrackersMetadataMaps()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Get trackers metadata/maps (Temporary support)
         * @apiVersion 1.3.2
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onSTTrackersMetadataMapsCallback Receives the result from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {String} Optional. serviceProvider service provider name (naver or here)
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTTrackersMetadataMapsCallback(response) {
         *     console.log("getTrackersMetadataMaps : " + response);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getTrackersMetadataMaps(onSTTrackersMetadataMapsCallback, onErrorCallback, serviceProvider);
         *
         */
        getTrackersMetadataMaps: function(onsuccess, onerror, serviceProvider) {
            var cmd = "scpluginProdSmartkitGetTrackersMetadataMaps";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGetTrackersMetadataMaps";
            args.serviceProvider = serviceProvider;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getDevicePresentation(deviceId,onSTDevicePresentationCallback,onErrorCallback) void getDevicePresentation()
         * @apiName getDevicePresentation()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets Device presentation object from SmartKit
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate

         * @apiParam {String} deviceId Device ID.
         * @apiParam {Function} onSTDevicePresentationCallback Receives the Device presentation Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTDevicePresentationCallback(response) {
         *     console.log("getDevicePresentation : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getDevicePresentation(deviceId, onSTDevicePresentationCallback, onErrorCallback);
         *
         */
        getDevicePresentation: function(deviceId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetDevicePresentation";
            var args = {};
            args.callbackName = "__onNMProdSmartkitGetDevicePresentation";
            args.deviceId = deviceId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getZigbeeGraph(deviceId,hubId,onSTZigbeeGraphCallback,onErrorCallback) void getZigbeeGraph()
         * @apiName getZigbeeGraph()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets Zigbee Graph object from SmartKit
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate

         * @apiParam {String} locationId Location ID.
         * @apiParam {String} hubId Hub ID.
         * @apiParam {Function} onSTZigbeeGraphCallback Receives the Zigbee Graph Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTZigbeeGraphCallback(response) {
         *     console.log("getZigbeeGraph : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getZigbeeGraph(deviceId, hubId, onSTZigbeeGraphCallback, onErrorCallback);
         *
         */
        getZigbeeGraph: function(locationId, hubId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetZigbeeGraph";
            var args = {};
            args.callbackName = "__onNMProdSmartkitCommon";
            args.locationId = locationId;
            args.hubId = hubId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getZwaveGraph(deviceId,hubId,onSTZwaveGraphCallback,onErrorCallback) void getZwaveGraph()
         * @apiName getZwaveGraph()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets Zwave Graph object from SmartKit
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate

         * @apiParam {String} locationId Location ID.
         * @apiParam {String} hubId Hub ID.
         * @apiParam {Function} onSTZwaveGraphCallback Receives the Zwave Graph Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTZwaveGraphCallback(response) {
         *     console.log("getZwaveGraph : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getZwaveGraph(deviceId, hubId, onSTZwaveGraphCallback, onErrorCallback);
         *
         */
        getZwaveGraph: function(locationId, hubId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetZwaveGraph";
            var args = {};
            args.callbackName = "__onNMProdSmartkitCommon";
            args.locationId = locationId;
            args.hubId = hubId;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getMQTTLogURL(key,onSTMQTTLogURLCallback,onErrorCallback,requestBody) void getMQTTLogURL()
         * @apiName getMQTTLogURL()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Send MQTT logs to data platform piper service. Pre-signed URL returned to client for uploading the logs
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate

         * @apiParam {String} key A key that is identified by client as a searching option (<= 100 characters)
         * @apiParam {Function} onSTMQTTLogURLCallback Receives the MQTT Log URL Object from smartKit
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [requestBody] Optional.Device ID.
         * @apiParam {String} [requestBody.deviceId] Optional.Device ID.
         * @apiParam {String} [requestBody.locationId] Optional. Location ID.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTMQTTLogURLCallback(response) {
         *     console.log("getMQTTLogURL : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var requestBody = {"deviceId": "1528a36g-c1ca-4256-1111-a6a32fa776d8", "locationId": "a911d884-1111-45be-8dc1-b56fe1bf6e7k"};
         * window.scplugin.smartkit.getMQTTLogURL(key, onSTMQTTLogURLCallback, onErrorCallback, requestBody);
         *
         */
        getMQTTLogURL: function(key, onsuccess, onerror, requestBody) {
            var cmd = "scpluginProdSmartkitGetMQTTLogURL";
            var args = {};
            args.callbackName = "__onNMProdSmartkitCommon";
            args.key = key;
            args.requestBody = requestBody;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getActivityHistory(onSTActivityHistoryCallback,onErrorCallback,requestBody) void getActivityHistory()
         * @apiName getActivityHistory()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets device activity history.
         * @apiVersion 1.3.6
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate

         * @apiParam {Function} onSTActivityHistoryCallback Receives activity history.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [requestBody] Optional. The object of Request body
         * @apiParam {Number} [requestBody.before] Optional. Paging parameter for going to previous page. Before epoch time(millisecond).
         * @apiParam {Number} [requestBody.beforeHash] Optional. Paging parameter for going to previous page. This needs to be specified when 'before' is specified. Please put in associated hash value of the record specified by the 'before' parameter.
         * @apiParam {Number} [requestBody.after] Optional. Paging parameter for going to next page. After epoch time(millisecond).
         * @apiParam {Number} [requestBody.afterHash] Optional. Paging parameter for going to next page. This needs to be specified when 'after' is specified. Please put in associated hash value of the record specified by the 'after' parameter.
         * @apiParam {Number} [requestBody.limit] Optional. Number of records to return. Default: 20
         * @apiParam {Boolean} [requestBody.oldestFirst] Optional. This controls ordering of results. When ont specified or 'oldestFirst=false', server will list newest history first
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTActivityHistoryCallback(response) {
         *     console.log("Activity History : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var requestBody = {"oldestFirst": true, "limit": 10};
         * window.scplugin.smartkit.getActivityHistory(onSTActivityHistoryCallback, onErrorCallback, requestBody);
         *
         */
        getActivityHistory: function(onsuccess, onerror, requestBody) {
            var cmd = "scpluginProdSmartkitGetActivityHistory";
            var args = {};
            args.callbackName = "__onNMProdSmartkitCommon";
            args.requestBody = requestBody;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getDeviceStatistics(onSTDeviceStatisticsCallback,onErrorCallback,requestBody) void getDeviceStatistics()
         * @apiName getDeviceStatistics()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets device statistics. Results will be listed in ascending order by time.
         * Each bucket in the response represents data in time period within an hour, a week, a month, or 5 mins etc, depending on the aggregation type
         * @apiVersion 1.3.6
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate

         * @apiParam {Object} requestBody The object of Request body
         * @apiParam {[String]} [requestBody.components] Optional. The array of component name. If not provided, it defaults to "main".
         * @apiParam {[String]} requestBody.capabilities The array of capability name
         * @apiParam {Number} requestBody.startTime Start of the time range in epoch milliseconds. Note, inclusive check is used here. That is, >= startTime.
         * @apiParam {Number} requestBody.endTime End of the itme range in epoch milliseconds. Note, exclusive check is used here. That is, < endTime.
         * @apiParam {String} requestBody.aggregate Aggregation type. Enum : "FIVE_MINUTES" "TEN_MINUTES" "FIFTEEN_MINUTES" "THITRY_MINUTES" "HOURLY" "THREE_HOURS" "DAILY" "WEEKLY" "MONTHLY"
         * @apiParam {String} [requestBody.timezone] Optional. Requested timezone. This is used to bucket the data correctly using client's timezone. If not provided, data will be bucketed using UTC time.
         * Most of the timezones from Intl.DateTimeFormat().resolvedOptions().timeZone are supported. If timezone is not supported, result will be empty.
         * e.g. "Etc/GMT+9", "Asia/Seoul", "America/Los_Angeles"
         * @apiParam {Function} onSTDeviceStatisticsCallback Receives activity history.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTDeviceStatisticsCallback(response) {
         *     console.log("Device Statistics : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var requestBody = {
         *   "components": ["main", "sub"],
         *   "capabilities": ["temperatureMeasurement", "switch"],
         *   "startTime": 1533896779000,
         *   "endTime": 1533896799060,
         *   "aggregate": "DAILY",
         *   "timezone": "Asia/Seoul"
         * };
         * window.scplugin.smartkit.getDeviceStatistics(onSTDeviceStatisticsCallback, onErrorCallback, requestBody);
         *
         */
        getDeviceStatistics: function(onsuccess, onerror, requestBody) {
            var cmd = "scpluginProdSmartkitGetDeviceStatistics";
            var args = {};
            args.callbackName = "__onNMProdSmartkitCommon";
            args.requestBody = requestBody;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getHubDeviceInterface(onSTHubDeviceInterfaceCallback,onErrorCallback) void getHubDeviceInterface()
         * @apiName getHubDeviceInterface()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets the object of hub device interface.
         * @apiVersion 1.3.6
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate

         * @apiParam {Function} onSTHubDeviceInterfaceCallback Receives the object of Hub device interface.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSTHubDeviceInterfaceCallback(response) {
         *     console.log(Getted object of hub device interface : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getHubDeviceInterface(onSTHubDeviceInterfaceCallback, onErrorCallback);
         *
         */
        getHubDeviceInterface: function(onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetHubDeviceInterface";
            var args = {};
            args.callbackName = "__onNMProdSmartkitCommon";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getPreferences(deviceId,locationId,onSTGetDevicePreferencesCallback,onErrorCallback) void getPreferences()
         * @apiName getPreferences()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Get the preferences for a device.
         * @apiVersion 1.3.6
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId Device ID.
         * @apiParam {String} locationId Location ID.
         * @apiParam {Function} onSTGetDevicePreferencesCallback Receives list of resource types.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Get device preferences
         *
         * function onSTGetDevicePreferencesCallback(response) {
         *      console.log("preference is : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getPreferences(deviceId, locationId, onSTGetDevicePreferencesCallback, onErrorCallback);
         */
        getPreferences: function(deviceId, locationId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetDevicePreferences";
            var args = {};
            args.deviceId = deviceId;
            args.callbackName = "__onNMProdSmartkitCommon";
            args.cmd = cmd;
            args.locationId = locationId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.setPreferences(deviceId,locationId,preferences,onSTSetDevicePreferencesCallback,onErrorCallback) void setPreferences()
         * @apiName setPreferences()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Set the preferences for a device. Must include complete set of preferences, existing set of preferences are overridden.
         * @apiVersion 1.3.6
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId Device ID.
         * @apiParam {String} locationId Location ID.
         * @apiParam {[Object]} preferences The Array object of device preferences.
         * @apiParam {String} preferences.name The name of the device preference.
         * @apiParam {String} preferences.value The value of the device preference.
         * @apiParam {Function} onSTSetDevicePreferencesCallback Receives list of resource types.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Set device preferences
         *
         * function onSTSetDevicePreferencesCallback() {
         *
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var updateData = [
         *   {
         *      "name": "tempOffset",
         *      "value": "-5"
         *   },
         *   {
         *      "name": "ledIndicator",
         *      "value": "false"
         *   }
         * ];
         *
         * window.scplugin.smartkit.setPreferences(deviceId, locationId, updateData, onSTSetDevicePreferencesCallback, onErrorCallback);
         */
        setPreferences: function(deviceId, locationId, preferences, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitSetDevicePreferences";
            var args = {};
            args.deviceId = deviceId;
            args.callbackName = "__onNMProdSmartkitCommon";
            args.cmd = cmd;
            args.preferences = preferences;
            args.locationId = locationId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.requestFirmwareUpdate(deviceId,locationId,onSTRequestFirmwareUpdateCallback,onErrorCallback) void requestFirmwareUpdate()
         * @apiName requestFirmwareUpdate()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Requests the firmware update information of devices connected by hub.
         * @apiVersion 1.3.6
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId Device ID.
         * @apiParam {String} locationId Location ID.
         * @apiParam {Function} onSTRequestFirmwareUpdateCallback Receives requested update status of this device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         *
         * function onSTRequestFirmwareUpdateCallback(response) {
         *     if (response.status == true) {
         *        console.log("Requested update status is true.");
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.requestFirmwareUpdate(deviceId, locationId, onSTRequestFirmwareUpdateCallback, onErrorCallback);
         *
         *
         */
        requestFirmwareUpdate: function(deviceId, locationId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitRequestFirmwareUpdate";
            var args = {};
            args.deviceId = deviceId;
            args.locationId = locationId;
            args.callbackName = "__onNMProdSmartkitCommon";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.smartkit.getFirmwareInfo(deviceId,locationId,onSTGetFirmwareInfoCallback,onErrorCallback) void getFirmwareInfo()
         * @apiName getFirmwareInfo()
         * @apiGroup SmartKit
         * @apiDescription [In-House] Gets the firmware information of zigbee device. (Only Zigbee Device)
         * @apiVersion 1.3.6
         * @apiPermission public
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} deviceId Device ID.
         * @apiParam {String} locationId Location ID.
         * @apiParam {Function} onSTGetFirmwareInfoCallback Receives checked update status of this device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         *
         * function onSTGetFirmwareInfoCallback(response) {
         *  if(response.supported == true && response.updateAvailable == "YES")
         *     console.log("Your device can be updated.");
         *  }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * window.scplugin.smartkit.getFirmwareInfo(deviceId, locationId, onSTGetFirmwareInfoCallback, onErrorCallback);
         *
         *
         */

        getFirmwareInfo: function(deviceId, locationId, onsuccess, onerror) {
            var cmd = "scpluginProdSmartkitGetFirmwareInfo";
            var args = {};
            args.deviceId = deviceId;
            args.locationId = locationId;
            args.callbackName = "__onNMProdSmartkitCommon";
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
     * @api Service
     * @apiName Service
     * @apiGroup Service
     * @apiDescription The Service object contains information about service and interface for a plugin to interact with the endpoint app.
     * @apiVersion 1.1.0
     * @apiPermission public
     * @apiProfile service
     *
     * @apiSuccess (Property) {String} serviceHandle Unique local ID.
     * @apiSuccess (Property) {Object} extraData Extra data received from launcher. JSON Object
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
                value: convertStringToObject(args.extraData),
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
            var cmd = "scpluginServiceSubscribe";
            var args = {};
            args.id = this.serviceHandle;
            args.callbackName = "__onNMServiceEventCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.serviceHandle, args, callback);
            } catch (e) {}
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
            var cmd = "scpluginServiceUnsubscribe";
            var args = {};
            args.id = this.serviceHandle;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginServiceSubscribe" + this.serviceHandle, args);
            } catch (e) {}
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
         * @apiParam {Object} payload Data to be requested to endpoint app. JSON Object
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
            args.id = this.serviceHandle;
            args.payload = payload;
            args.callbackName = "__onNMServiceResponseCallback";
            args.cmd = cmd;
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
            var cmd = "scpluginServiceLaunchConfiguration";
            var args = {};
            args.id = this.serviceHandle;
            args.callbackName = "__onNMServiceConfigurationCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api Service.launchDevicePlugin(deviceId,onLaunchPluginCallback,onErrorCallback,extraData) void launchDevicePlugin()
         * @apiName launchDevicePlugin()
         * @apiGroup Service
         * @apiDescription [In-House] Launches device detail page.
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile service
         * @apiPrivate
         *
         * @apiParam {String} deviceId Unique device ID.
         * @apiParam {Function} onLaunchPluginCallback Receives finish state of launching device detail page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [extraData] Optional. Extra data to send. JSON Object.
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
         * service.launchDevicePlugin(deviceId, onLaunchPluginCallback, onErrorCallback);
         */
        launchDevicePlugin: function(deviceId, onsuccess, onerror, extraData) {
            var cmd = "scpluginProdLaunchDevicePlugin";
            var args = {};
            args.callbackName = "__onNMProdLaunchPluginCallback";
            args.deviceId = deviceId;
            args.extraData = extraData;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api Service.getLocationNickname(onLocationNicknameCallback,onErrorCallback) void getLocationNickname()
         * @apiName getLocationNickname()
         * @apiGroup Service
         * @apiDescription [In-House] Gets location nickname
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
            var cmd = "scpluginProdGetLocationNickname";
            var args = {};
            args.callbackName = "__onNMProdLocationNicknameCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api Service.getGeoLocation(onGeoLocationCallback,onErrorCallback) void getGeoLocation()
         * @apiName getGeoLocation()
         * @apiGroup Service
         * @apiDescription [In-House] Gets Geolocation of ST location
         * @apiVersion 1.3.2
         * @apiPermission platform
         * @apiProfile service
         * @apiPrivate
         *
         * @apiParam {Function} onGeoLocationCallback Receives GeoLocation.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onGeoLocationCallback(geoLocation) {
         *     if (geoLocation != null) {
         *         console.log("GeoLocation latitude" + geoLocation.latitude);
         *         console.log("GeoLocation longitude" + geoLocation.longitude);
         *     } else {
         *         console.log("GeoLoaction is not available")
         *     }
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * service.getGeoLocation(onGeoLocationCallback, onErrorCallback);
         */
        getGeoLocation: function(onsuccess, onerror) {
            var cmd = "scpluginProdGetGeoLocation";
            var args = {};
            args.callbackName = "__onNMProdGeoLocationCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api Service.isUsePhoneLocation(onUsePhoneLocationCallback,onErrorCallback) void isUsePhoneLocation()
         * @apiName isUsePhoneLocation()
         * @apiGroup Service
         * @apiDescription [In-House] Gets Flag to indicate if Use phone location
         * @apiVersion 1.3.2
         * @apiPermission platform
         * @apiProfile service
         * @apiPrivate
         *
         * @apiParam {Function} onUsePhoneLocationCallback Receives Flag to indicate if Use phone location.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onUsePhoneLocationCallback(IsUsePhoneLocation) {
         *     if (IsUsePhoneLocation) {
         *         console.log("This Location use phone location");
         *     } else {
         *         console.log("This Location do not use phone location")
         *     }
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * service.IsUsePhoneLocation(onUsePhoneLocationCallback, onErrorCallback);
         */
        isUsePhoneLocation: function(onsuccess, onerror) {
            var cmd = "scpluginProdIsUsePhoneLocation";
            var args = {};
            args.callbackName = "__onNMProdIsUsePhoneLocationCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
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
            var cmd = "scpluginServiceShareText";
            var args = {};
            args.callbackName = "__onNMServiceShareTextCallback";
            args.cmd = cmd;
            args.text = text;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api Service.SMCSInfo(onSMCSInfoCallback,onErrorCallback) void SMCSInfo()
         * @apiName SMCSInfo()
         * @apiGroup Service
         * @apiDescription Shares SMCSInfo(Samsung Mobile Content System) to other application.
         * @apiVersion 1.3.2
         * @apiPermission platform
         * @apiProfile service
         * @apiPrivate
         *
         * @apiParam {Function} onSMCSInfoCallback Invokes when SMCSInfo request has been completed.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onSMCSInfoCallback(response) {
         *     console.log("SMCSInfo request has been sent successfully");
         *     console.log("SMCSInfo : " + JSON.stringify(response));
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         */
        SMCSInfo: function(onsuccess, onerror) {
            var cmd = "scpluginServiceSmcsInfo";
            var args = {};
            args.callbackName = "__onNMServiceSMCSInfoCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },

        /**
         * @api Service.createShortcut(installedAppId, onCreateShortcutCallback,onErrorCallback) void createShortcut()
         * @apiName createShortcut()
         * @apiGroup Service
         * @apiDescription [In-House] Create Shortcut for plugin (Only Android)
         * @apiVersion 1.3.5
         * @apiPermission platform
         * @apiProfile service
         * @apiPrivate
         *
         * @apiParam {String} installedAppId The Unique Identifier
         * @apiParam {Function} onCreateShortcutCallback It will be called if shortcut is created successfully
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onCreateShortcutCallback() {
         *     console.log("A Shortcut has been created");
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * service.createShortcut(installedAppId, onCreateShortcutCallback, onErrorCallback);
         */
        createShortcut: function(installedAppId, onsuccess, onerror) {
            var cmd = "scpluginProdCreateShortcut";
            var args = {};
            args.installedAppId = installedAppId
            args.callbackName = "__onNMProdCreateShortcutCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
    }

    /**
     * @api OCFDevice
     * @apiName OCFDevice
     * @apiGroup OCFDevice
     * @apiDescription The OCFDevice object contains information about devices and interface for a plugin to interact with the cloud server.
     * Note, roomId and roomName are supported since 1.2.6 version.
     * Note, packageHandle is supported since 1.3.1 version.
     * @apiVersion 1.3.1
     * @apiPermission public
     * @apiProfile device
     *
     * @apiSuccess (Property) {String} deviceHandle Unique local ID.
     * @apiSuccess (Property) {String} packageHandle Unique local package ID.
     * @apiSuccess (Property) {String} deviceId Nullable. Unique global ID that supports platform level only
     * @apiSuccess (Property) {String} deviceType DeviceType Uri.
     * @apiSuccess (Property) {String} deviceName Device name.
     * @apiSuccess (Property) {[String]} resourceUris All resource URIs of device.
     * @apiSuccess (Property) {String} locationId Location Id of device.
     * @apiSuccess (Property) {String} locationName Location name of device.
     * @apiSuccess (Property) {String} roomId Room Id of device.
     * @apiSuccess (Property) {String} roomName Room name of device.
     * @apiSuccess (Property) {String} owner Device permission of user. ("me" or "others")
     * @apiSuccess (Property) {String} firmwareVersion Device firmware version.
     * @apiSuccess (Property) {Object} metaData UIMetadata of device. JSON Object.
     * @apiSuccess (Property) {Object} extraData Extra data received from launcher. The extraData is supported since v1.1.0. JSON Object.

     * @apiExample {js} Example usage: Device plugin
     * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
     * var handle = ocfdevice.deviceHandle;
     * var uris = ocfdevice.resourceUris;
     *
     */
    var OCFDevice = function(args) {
        Object.defineProperties(this, {
            deviceHandle: {
                value: args.deviceId,
                writable: false,
                enumerable: true
            },
            packageHandle: {
                value: args.packageHandle,
                writable: false,
                enumerable: true
            },
            deviceId: {
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
                value: {
                    code: 2000000,
                    message: "SUCCESS",
                    data: convertStringToObject(args.metadata)
                },
                writable: false,
                enumerable: true
            },
            extraData: {
                value: convertStringToObject(args.extraData),
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
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginSubscribe" + this.deviceHandle, args);
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
            var cmd = "scpluginStopMonitoringConnectionState";
            var args = {};
            args.id = this.deviceHandle;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginStartMonitoringConnectionState" + this.deviceHandle, args);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.getActivityHistory(onDeviceActivityHistoryCallback,onErrorCallback,requestBody) void getActivityHistory()
         * @apiName getActivityHistory()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Gets device activity history.
         * @apiVersion 1.2.6
         * @apiPermission partner
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
        /**
         * @api OCFDevice.getDeviceStatistics(requestBody,onDeviceStatisticsCallback,onErrorCallback) void getDeviceStatistics()
         * @apiName getDeviceStatistics()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Gets device statistics. Results will be listed in ascending order by time.
         * Each bucket in the response represents data in time period within an hour, a week, a month, or 5 mins etc, depending on the aggregation type.
         * Max request time period is 3 months.
         * @apiVersion 1.2.6
         * @apiPermission partner
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Object} requestBody The object of Request body
         * @apiParam {[String]} [requestBody.components] Optional. The array of component name. If not provided, it defaults to "main".
         * @apiParam {[String]} requestBody.capabilities The array of capability name
         * @apiParam {Number} requestBody.startTime Start of the time range in epoch milliseconds. Note, inclusive check is used here. That is, >= startTime.
         * @apiParam {Number} requestBody.endTime End of the itme range in epoch milliseconds. Note, exclusive check is used here. That is, < endTime.
         * @apiParam {String} requestBody.aggregate Aggregation type. Enum : "FIVE_MINUTES" "TEN_MINUTES" "FIFTEEN_MINUTES" "THITRY_MINUTES" "HOURLY" "THREE_HOURS" "DAILY" "WEEKLY" "MONTHLY"
         * @apiParam {String} [requestBody.timezone] Optional. Requested timezone. This is used to bucket the data correctly using client's timezone. If not provided, data will be bucketed using UTC time.
         * Most of the timezones from Intl.DateTimeFormat().resolvedOptions().timeZone are supported. If timezone is not supported, result will be empty.
         * e.g. "Etc/GMT+9", "Asia/Seoul", "America/Los_Angeles"
         * @apiParam {Function} onDeviceStatisticsCallback Receives device statistics.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onDeviceStatisticsCallback(response) {
         *     console.log("Device statistics response : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var requestBody = {
         *   "components": ["main", "sub"],
         *   "capabilities": ["temperatureMeasurement", "switch"],
         *   "startTime": 1533896779000,
         *   "endTime": 1533896799060,
         *   "aggregate": "DAILY",
         *   "timezone": "Asia/Seoul"
         * };
         * ocfdevice.getDeviceStatistics(requestBody, onDeviceStatisticsCallback, onErrorCallback);
         *
         */
        getDeviceStatistics: function(requestBody, onsuccess, onerror) {
            var cmd = "scclient_getDeviceStatistics";
            var args = {};
            args.callbackName = "__onNMProdGetDeviceStatisticsCallback";
            requestBody.locationId = this.locationId;
            requestBody.devices = [ {deviceId: this.deviceId} ];
            requestBody.aggregation = requestBody.aggregate;
            args.requestBody = requestBody;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api OCFDevice.navigateTo(navigationViewType,onDeviceNavigateToCallback,onErrorCallback,extraData) void navigateTo()
         * @apiName navigateTo()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Navigates specific view page.
         * @apiVersion 1.2.6
         * @apiPermission partner
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {DeviceNavigationViewType} navigationViewType Navigation view type to navigate.
         * @apiParam {Function} onDeviceNavigateToCallback Receives finish state of navigating view page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [extraData] Optional. Extra data to send. JSON Object.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse DEVICE_NAVIGATION_VIEW_TYPE
         *
         * @apiExample {js} Example usage: EDIT_DEVICE_DETAIL_VIEW
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onDeviceNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * ocfdevice.navigateTo("EDIT_DEVICE_DETAIL_VIEW", onDeviceNavigateToCallback, onErrorCallback);
         */
        navigateTo: function(navigationViewType, onsuccess, onerror, extraData) {
            var cmd = "scpluginProdDeviceNavigateTo";
            var args = {};
            args.callbackName = "__onNMProdDeviceNavigateToCallback";
            args.locationId = this.locationId;
            args.navigationViewType = navigationViewType;
            args.extraData = extraData;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api OCFDevice.setDeviceInfoChangeListener(onDeviceInfoChangeCallback) void setDeviceInfoChangeListener()
         * @apiName setDeviceInfoChangeListener()
         * @apiGroup OCFDevice
         * @apiDescription Sets a listener to allow tracking changes in editable device detail information. e.g. Device name, Location ID, Location Name, Room ID, Room Name.
         * @apiVersion 1.2.6
         * @apiPermission partner
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Function} onDeviceInfoChangeCallback Receives device detail information change notifications.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onDeviceInfoChangeCallback(deviceInfo) {
         *     console.log("Updated device detail information : " + JSON.stringify(deviceInfo));
         * }
         *
         * ocfdevice.setDeviceInfoChangeListener(onDeviceInfoChangeCallback);
         */
        setDeviceInfoChangeListener: function(callback) {
            var cmd = "scpluginProdSetDeviceInfoChangeListener";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMProdDeviceInfoChangeCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.deviceHandle, args, callback);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.getHubDeviceInterface(onDeviceHubDeviceInterfaceCallback,onErrorCallback) void getHubDeviceInterface()
         * @apiName getHubDeviceInterface()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Gets the object of hub device interface.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Function} onDeviceHubDeviceInterfaceCallback Receives the object of Hub device interface.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         * @apiError (Error) {APIError} NotFoundError if the device is not a hub device or cannot get information about the hub device.
         *
         * @apiExample {js} Example usage: Hub device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onDeviceHubDeviceInterfaceCallback(hubDeviceInterface) {
         *     console.log("Getted object of hub device interface : " + JSON.stringify(hubDeviceInterface));
         * }
         *
         * ocfdevice.getHubDeviceInterface(onDeviceHubDeviceInterfaceCallback);
         */
        getHubDeviceInterface: function(onsuccess, onerror) {
            var cmd = "scpluginProdGetHubDeviceInterface";
            var args = {};
            args.id = this.deviceHandle;
            args.locationId = this.locationId;
            args.callbackName = "__onNMProdGetHubDeviceInterfaceCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on plugin.");
                onerror(err);
            }
        },

        /**
         * @api OCFDevice.setDeviceStateListener(onSetDeviceStateListener,onErrorCallback) void setDeviceStateListener()
         * @apiName setDeviceStateListener()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Event to receive device state from device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Function} onSetDeviceStateListener Callback function name to receive the state of device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         *
         * @apiExample {js} Example usage: Hub device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onSetDeviceStateListener(deviceState) {
         *     if (deviceState == "add") {
         *       // Device was added
         *     } else if (deviceState == "update") {
         *       // Device was updated
         *     } else if (deviceState == "delete") {
         *       // Device was removed
         *     }
         * }
         *
         * ocfdevice.setDeviceStateListener(onSetDeviceStateListener, onErrorCallback);
         */
        setDeviceStateListener: function(callback, onErrorCallback) {
            var cmd = "scpluginProdSetDeviceStateListener";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMProdSetDeviceStateListenerCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.deviceHandle, args, callback);
            }  catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on plugin.");
                onErrorCallback(err);
            }
        },
        /**
         * @api OCFDevice.unsetDeviceStateListener() void unsetDeviceStateListener()
         * @apiName unsetDeviceStateListener()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Unset device state.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiExample {js} Example usage: Hub device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         *
         * ocfdevice.unsetDeviceStateListener();
         */
        unsetDeviceStateListener: function() {
            var cmd = "scpluginProdUnsetDeviceStateListener";
            var args = {};
            args.id = this.deviceHandle;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginProdUnsetDeviceStateListener" + this.deviceHandle, args);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.getResourceTypesByResourceURI(resourceUri,onGetResourceTypesByResourceURICallback,onErrorCallback) void getResourceTypesByResourceURI()
         * @apiName getResourceTypesByResourceURI()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Get the list of resource types given the resource URI.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Function} resourceUri resource URI to get the resource types.
         * @apiParam {Function} onGetResourceTypesByResourceURICallback Receives list of resource types.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Get resource types by resourceURI
         *
         * function onGetResourceTypesByResourceURICallback(resourceTypes) {
         *    console.log("resourceTypes is : " + JSON.stringify(resourceTypes));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * ocfdevice.getResourceTypesByResourceURI("/thermostatSetpoint/main/0",onGetResourceTypesByResourceURICallback, onErrorCallback);
         */
        getResourceTypesByResourceURI: function(resourceUri, onsuccess, onerror) {
            var cmd = "scpluginProdGetResourceTypesByResourceURI";
            var args = {};
            args.id = this.deviceHandle;
            args.resourceUri = resourceUri;
            args.callbackName = "__onNMProdGetResourceTypesByResourceURICallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on plugin.");
                onerror(err);
            }
        },
        /**
         * @api OCFDevice.getPreferences(onGetDevicePreferencesCallback,onErrorCallback) void getPreferences()
         * @apiName getPreferences()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Get the preferences for a device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Function} onGetDevicePreferencesCallback Receives list of resource types.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Get device preferences
         *
         * function onGetDevicePreferencesCallback(preferences) {
         *      console.log("preference is : " + JSON.stringify(preferences));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * ocfdevice.getPreferences(onGetDevicePreferencesCallback, onErrorCallback);
         */
        getPreferences: function(onsuccess, onerror) {
            var cmd = "scpluginProdGetDevicePreferences";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMProdGetDevicePreferencesCallback";
            args.cmd = cmd;
            args.locationId = this.locationId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on plugin.");
                onerror(err);
            }
        },
        /**
         * @api OCFDevice.setPreferences(preferences,onSetDevicePreferencesCallback,onErrorCallback) void setPreferences()
         * @apiName setPreferences()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Set the preferences for a device. Must include complete set of preferences, existing set of preferences are overridden.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {[Object]} preferences The Array object of device preferences.
         * @apiParam {String} preferences.name The name of the device preference.
         * @apiParam {String} preferences.value The value of the device preference.
         * @apiParam {Function} onSetDevicePreferencesCallback Receives list of resource types.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Set device preferences
         *
         * function onSetDevicePreferencesCallback() {
         *
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var updateData = [
         *   {
         *      "name": "tempOffset",
         *      "value": "-5"
         *   },
         *   {
         *      "name": "ledIndicator",
         *      "value": "false"
         *   }
         * ];
         *
         * ocfdevice.setPreferences(updateData, onSetDevicePreferencesCallback, onErrorCallback);
         */
        setPreferences: function(preferences, onsuccess, onerror) {
            var cmd = "scpluginProdSetDevicePreferences";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMProdSetDevicePreferencesCallback";
            args.cmd = cmd;
            args.preferences = preferences;
            args.locationId = this.locationId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on plugin.");
                onerror(err);
            }
        },
        /**
         * @api OCFDevice.requestFirmwareUpdate(onDeviceRequestFirmwareUpdateCallback,onErrorCallback) void requestFirmwareUpdate()
         * @apiName requestFirmwareUpdate()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Requests the firmware update information of devices connected by hub.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onDeviceRequestFirmwareUpdateCallback Receives requested update status of this device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         *
         * function onDeviceRequestFirmwareUpdateCallback(status) {
         *     if (status == true) {
         *        console.log("Requested update status is true.");
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * ocfDevice.requestFirmwareUpdate(onDeviceRequestFirmwareUpdateCallback, onErrorCallback);
         *
         *
         */

        requestFirmwareUpdate: function(onsuccess, onerror) {
            var cmd = "scpluginDeviceRequestFirmwareUpdate";
            var args = {};
            args.id = this.deviceHandle;
            args.locationId = this.locationId;
            args.callbackName = "__onNMDeviceRequestFirmwareUpdateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api OCFDevice.getFirmwareInfo(onDeviceGetFirmwareInfoCallback,onErrorCallback) void getFirmwareInfo()
         * @apiName getFirmwareInfo()
         * @apiGroup OCFDevice
         * @apiDescription [In-House] Gets the firmware information of zigbee device. (Only Zigbee Device)
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onDeviceGetFirmwareInfoCallback Receives checked update status of this device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         *
         * function onDeviceGetFirmwareInfoCallback(resultData) {
         *  if(resultData.supported == true && resultData.updateAvailable == "YES")
         *     console.log("Your device can be updated.");
         *  }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * ocfDevice.getFirmwareInfo(onDeviceGetFirmwareInfoCallback, onErrorCallback);
         *
         *
         */

        getFirmwareInfo: function(onsuccess, onerror) {
            var cmd = "scpluginDeviceGetFirmwareInfo";
            var args = {};
            args.id = this.deviceHandle;
            args.locationId = this.locationId;
            args.callbackName = "__onNMDeviceGetFirmwareInfoCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    var Video = function() {}

    Video.prototype = {
        /**
         * @api window.scplugin.video.getClips(onVideoClipsCallback,onErrorCallback,requestBody) void getClips()
         * @apiName getClips()
         * @apiGroup Video
         * @apiDescription [In-House] Gets a list of clips for a given user. Clips are returned most recent first.
         * The result may be a partial set, the max field determines the results-per-page.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onVideoClipsCallback Receives video clips.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [requestBody] Optional. The object of Request body.
         * @apiParam {[String]} [requestBody.source_id] Optional. Filter by source ID. Accepts multiple source IDs.
         * @apiParam {Number} [requestBody.start] Optional. clips requested after a Unix Time(seconds since epoch)
         * @apiParam {Number} [requestBody.end] Optional. clips requested before a Unix Time(seconds since epoch)
         * @apiParam {Number} [requestBody.max] Optional. Max results per page, between 1 and 250.
         * @apiParam {Number} [requestBody.page] Optional. The page number.
         * @apiParam {String} [requestBody.location] Optional. Filter by location identifier.
         * @apiParam {String} [requestBody.room_id] Optional. Filter by room identifier.
         * @apiParam {Boolean} [requestBody.external] Optional. Include clips from non AVP devices. Defaults to False.
         * @apiParam {Boolean} [requestBody.source_archived] Optional. "true" returns clips for archived sources only. "false" returns un-archived only. Omitting this option returns both.
         * @apiParam {String} [requestBody.trigger_type] Optional. Type of the event that triggered the clip. e.g. "SecuritySOSEvent", "motion"
         * @apiParam {String} [requestBody.trigger_id] Optional. Unique ID of the event that triggered the clip request.
         * @apiParam {Boolean} [requestBody.pinned] Optional. "true" returns clips in permanent storage. "false" returns clips in rolling storage. Omitting this option returns both.
         * @apiParam {Boolean} [requestBody.audio_only] Optional. Filter for audio only clips. Defaults to false.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onVideoClipsCallback(response) {
         *     console.log("Clips : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var requestBody = {
         *   "source_id": ["1528a36g-c1ca-4256-8a04-a6a32fa776d8", "a911d884-39d2-45be-8dc1-b56fe1bf6e7k"],
         *   "trigger_type": "motion"
         * };
         * scplugin.video.getClips(onVideoClipsCallback, onErrorCallback, requestBody);
         *
         */
        getClips: function(onsuccess, onerror, requestBody) {
            var cmd = "scpluginProdVideoGetClips";
            var args = {};
            args.callbackName = "__onNMProdVideoGetClips";
            args.requestBody = requestBody;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.video.clearClips(onClearVideoClipsCallback,onErrorCallback,filter) void clearClips()
         * @apiName clearClips()
         * @apiGroup Video
         * @apiDescription [In-House] Clears the downloaded media and thumbnail of all clip.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onClearVideoClipsCallback Callback function that calls if media or thumbnail clear is successful.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [filter] Optional. Filter object to clear clip.
         * @apiParam {Number} [filter.date] Optional. Filter to clear clips before a specific date. ex) 1574089200000
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Clear all clip.
         * function onClearVideoClipsCallback() {
         *
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var filter = {
         *     date : new Date("11/19/2019").getTime() //You can get a timestamp using a date object.
         * }
         *
         *
         * scplugin.video.clearClips(onClearVideoClipsCallback, onErrorCallback, filter);
         *
         */
        clearClips: function(onsuccess, onerror, filter) {
            var cmd = "scpluginProdVideoClearClips";
            var args = {};
            args.callbackName = "__onNMProdVideoClearClips";
            args.cmd = cmd;
            if(undefined !== filter && !!filter) {
                args.filter = {
                    date : date || null
                }
            }
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api window.scplugin.video.getVideoSources(onVideoSourcesCallback,onErrorCallback,requestBody) void getVideoSources()
         * @apiName getVideoSources()
         * @apiGroup Video
         * @apiDescription [In-House] Gets a list of video sources.
         * @apiVersion 1.3.4
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onVideoSourcesCallback Receives video sources.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [requestBody] Optional. The object of Request body.
         * @apiParam {[String]} [requestBody.location] Optional. The location identifier used to filter a user's sources.
         * @apiParam {Number} [requestBody.max] Optional. Max results per page, between 1 and 250. Default is 50.
         * @apiParam {Number} [requestBody.page] Optional. Page Number. Default is 1.
         * @apiParam {[String]} [requestBody.serial_number] Optional. The serial_number identifier used to filter sources.
         * @apiParam {Boolean} [requestBody.archived] Optional. Include archived sources in response. Defaults to false.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onVideoSourcesCallback(response) {
         *     console.log("Sources : " + JSON.stringify(response));
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var requestBody = {
         *   "location": "501a458f-3f2c-49e3-b59d-ecca09b71c0c",
         * };
         * scplugin.video.getVideoSources(onVideoSourcesCallback, onErrorCallback, requestBody);
         *
         */
        getVideoSources: function(onsuccess, onerror, requestBody) {
            var cmd = "scpluginProdVideoGetSources";
            var args = {};
            args.callbackName = "__onNMProdVideoGetSourcesCallback";
            args.requestBody = requestBody;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        }
    };

    /**
     * @api VideoClip
     * @apiName VideoClip
     * @apiGroup VideoClip
     * @apiDescription The VideoClip represents a video clip object.
     * @apiVersion 1.3.3
     * @apiPermission platform
     * @apiProfile common
     * @apiPrivate
     *
     * @apiSuccess (Property) {String} id Clip ID.
     * @apiSuccess (Property) {String} sourceId Source ID.
     * @apiSuccess (Property) {Number} start Start time.
     * @apiSuccess (Property) {Number} duration Duration.
     * @apiSuccess (Property) {Number} fileSize File size of clip.
     * @apiSuccess (Property) {Number} expiresAt Expired time.
     * @apiSuccess (Property) {String} state State.
     * @apiSuccess (Property) {String} mediaUrl Media url
     * @apiSuccess (Property) {String} thumbUrl Thumbnail url
     * @apiSuccess (Property) {String} triggerType Trigger type
     * @apiSuccess (Property) {String} triggerId Trigger ID
     * @apiSuccess (Property) {Boolean} pinned "true" returns clips in permanent storage. "false" returns clips in rolling storage.
     * @apiSuccess (Property) {String} location Location ID
     * @apiSuccess (Property) {String} roomId Room ID
     * @apiSuccess (Property) {String} encryptKey Encrypt Key
     * @apiSuccess (Property) {String} encryptIv Encrypt Iv
     *
     * @apiExample {js} Example usage:
     * // Assume clip object has been obtained by using scplugin.video.getClips() method.
     * var mediaUrl = clip.mediaUrl;
     * var thumbUrl = clip.thumbUrl;
     *
     */
    var VideoClip = function(args) {
        Object.defineProperties(this, {
            id: {
                value: args.id,
                writable: false,
                enumerable: true
            },
            sourceId: {
                value: args.source_id,
                writable: false,
                enumerable: true
            },
            start: {
                value: args.start,
                writable: false,
                enumerable: true
            },
            duration: {
                value: args.duration,
                writable: false,
                enumerable: true
            },
            fileSize: {
                value: args.file_size,
                writable: false,
                enumerable: true
            },
            expiresAt: {
                value: args.expires_at,
                writable: false,
                enumerable: true
            },
            state: {
                value: args.state,
                writable: false,
                enumerable: true
            },
            mediaUrl: {
                value: args.media_url,
                writable: false,
                enumerable: true
            },
            thumbUrl: {
                value: args.thumb_url,
                writable: false,
                enumerable: true
            },
            triggerType: {
                value: args.trigger_type,
                writable: false,
                enumerable: true
            },
            triggerId: {
                value: args.trigger_id,
                writable: false,
                enumerable: true
            },
            pinned: {
                value: args.pinned,
                writable: false,
                enumerable: true
            },
            location: {
                value: args.location,
                writable: false,
                enumerable: true
            },
            roomId: {
                value: args.room_id,
                writable: false,
                enumerable: true
            },
            encryptKey: {
                value: args.encrypt_key,
                writable: false,
                enumerable: true
            },
            encryptIv: {
                value: args.encrypt_iv,
                writable: false,
                enumerable: true
            },
        });
    }
    VideoClip.prototype = {
        /**
         * @api VideoClip.downloadMedia(onVideoDownloadMediaCallback,onErrorCallback) void downloadMedia()
         * @apiName downloadMedia()
         * @apiGroup VideoClip
         * @apiDescription [In-House] Downloads media file with the specified media url of clip. <br />If there is already downloaded media, only the exist information is returned.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onVideoDownloadMediaCallback The method to invoke when the download completed.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         *
         * @apiExample {js} Example usage:
         * // Assume videoClip object has been obtained by using scplugin.video.getClips() method.
         * function onVideoDownloadMediaCallback(mediaUrl, filePath) {
         *     console.log("Media clip download completed : " + filePath);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * videoClip.downloadMedia(onVideoDownloadMediaCallback, onErrorCallback);
         *
         */
        downloadMedia: function(onsuccess, onerror) {
            var cmd = "scpluginProdVideoDownloadMedia";
            var args = {};
            args.callbackName = "__onNMProdVideoDownloadMedia";
            args.clipId = this.id;
            args.sourceId = this.sourceId;
            args.mediaUrl = this.mediaUrl;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api VideoClip.downloadThumbnail(onVideoDownloadThumbnailCallback,onErrorCallback,width,height) void downloadThumbnail()
         * @apiName downloadThumbnail()
         * @apiGroup VideoClip
         * @apiDescription [In-House] Downloads thumbnail file with the specified thumbnail url of clip. <br />If there is already downloaded thumbnail, only the exist information is returned.
         * @apiVersion 1.3.4
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onVideoDownloadThumbnailCallback The method to invoke when the download completed.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Number} [width] Optional. width of thumbnail image.
         * @apiParam {Number} [height] Optional. height of thumbnail image.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Callback Function - Example usage:
         * function onVideoDownloadThumbnailCallback(thumbUrl,filePath,resultData){
         *      console.log("Thumbnail clip download completed : " + filePath);
         *      console.log("ResultData.thumbnailEncryptKey: " + resultData.thumbnailEncryptKey);
         *      console.log("ResultData.thumbnailEncryptIv: " + resultData.thumbnailEncryptIv);
         *      console.log("ResultData.isCached: " + resultData.isCached);
         * }
         *
         * @apiExample {js} Example usage:
         * // Assume videoClip object has been obtained by using scplugin.video.getClips() method.
         * // https://librarian-regionals.smartthingsgdev.com/avp/images.html
         * function onVideoDownloadThumbnailCallback(thumbUrl,filePath,thumbnailEncryptKey,thumbnailEncryptKeyIv) {
         *     console.log("Thumbnail clip download completed : " + filePath);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * videoClip.downloadThumbnail(onVideoDownloadThumbnailCallback, onErrorCallback, 224, 128);
         *
         */
        downloadThumbnail: function(onsuccess, onerror, width, height) {
            var cmd = "scpluginProdVideoDownloadThumbnail";
            var args = {};
            args.callbackName = "__onNMProdVideoDownloadThumbnail";
            args.clipId = this.id;
            args.sourceId = this.sourceId;
            args.thumbUrl = this.thumbUrl;
            args.width = width;
            args.height = height;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api VideoClip.clearClip(onClearVideoClipCallback,onErrorCallback,clipType) void clearClip()
         * @apiName clearClip()
         * @apiGroup VideoClip
         * @apiDescription [In-House] Clears the downloaded file of this clip.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {Function} onClearVideoClipCallback Callback function that calls if media or thumbnail clear is successful.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {VideoClipType} [clipType] Optional. Type of clip. <br />If the parameter is empty, clear all types of downloaded files.
         *
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse VIDEO_CLIP_TYPE
         *
         * @apiExample {js} Example usage: Clear all types
         * function onClearVideoClipCallback() {
         *
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         *
         * videoClip.clearClip(onClearVideoClipCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: Clear thumbnail file.
         * function onClearVideoClipCallback() {
         *
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         *
         * videoClip.clearClip(onClearVideoClipCallback, onErrorCallback, "THUMBNAIL");
         *
         */
        clearClip: function(onsuccess, onerror, clipType) {
            var cmd = "scpluginProdVideoClearClip";
            var args = {};
            args.callbackName = "__onNMProdVideoClearClip";
            args.cmd = cmd;
            args.clipId = this.id;
            args.clipType = clipType;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    /**
     * @api BluetoothGATTDescriptor
     * @apiName BluetoothGATTDescriptor
     * @apiGroup BluetoothGATTDescriptor
     * @apiDescription The interface of GATT descriptor. The GATT descriptor interface can be retrieved with BluetoothGATTCharacteristic.getDescriptors().
     * @apiVersion 1.3.0
     * @apiPermission public
     * @apiProfile common
     *
     * @apiSuccess (Property) {String} uuid UUID of the descriptor
     *
     * @apiExample {js} Example usage:
     * // Assume descriptor object has been obtained by using BluetoothGATTCharacteristic.getDescriptors() method.
     * var uuid = descriptor.uuid;
     * var serviceUuid = descriptor.serviceUuid;
     * var characteristicUuid = descriptor.characteristicUuid;
     *
     */
    var BluetoothGATTDescriptor = function(args) {
        Object.defineProperties(this, {
            uuid: {
                value: args.uuid,
                writable: false,
                enumerable: true
            },
            serviceUuid: {
                value: args.serviceUuid,
                writable: false,
                enumerable: true
            },
            characteristicUuid: {
                value: args.characteristicUuid,
                writable: false,
                enumerable: true
            }
        });
    }

    BluetoothGATTDescriptor.prototype = {
        /**
         * @api BluetoothGATTDescriptor.readValue(onGATTDescriptorReadValueCallback,onErrorCallback) void readValue()
         * @apiName readValue()
         * @apiGroup BluetoothGATTDescriptor
         * @apiDescription Reads the descriptor value from the remote device.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onGATTDescriptorReadValueCallback Invokes when the descriptor value is read successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume gattDescriptor object has been obtained by using BluetoothGATTCharacteristic.getDescriptors() method.
         * function onGATTDescriptorReadValueCallback(value) {
         *   console.log("Value : " + value);
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * gattDescriptor.readValue(onGATTDescriptorReadValueCallback, onErrorCallback);
         *
         */
        readValue: function(onsuccess, onerror) {
            var cmd = "scpluginGATTDescriptorReadValue";
            var args = {};
            args.callbackName = "__onNMGATTDescriptorReadValue";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.characteristicUuid;
            args.descriptorUuid = this.uuid;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothGATTDescriptor.writeValue(value,onGATTDescriptorWriteValueCallback,onErrorCallback) void writeValue()
         * @apiName writeValue()
         * @apiGroup BluetoothGATTDescriptor
         * @apiDescription Writes the descriptor value to the remote device.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {[byte]} value The descriptor value to write.
         * @apiParam {Function} onGATTDescriptorWriteValueCallback Invokes when the descriptor value is written successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume gattDescriptor object has been obtained by using BluetoothGATTCharacteristic.getDescriptors() method.
         * function onGATTDescriptorWriteValueCallback() {
         *   console.log("Descriptor value written.");
         * }
         *
         *
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * gattDescriptor.writeValue(value, onGATTDescriptorWriteValueCallback, onErrorCallback);
         *
         */
        writeValue: function(value, onsuccess, onerror) {
            var cmd = "scpluginGATTDescriptorWriteValue";
            var args = {};
            args.callbackName = "__onNMGATTDescriptorWriteValue";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.characteristicUuid;
            args.descriptorUuid = this.uuid;
            args.value = value;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothGATTDescriptor.secureReadValue(encryptionObject,onGATTDescriptorEncryptedReadValueCallback,onErrorCallback) void secureReadValue()
         * @apiName secureReadValue()
         * @apiGroup BluetoothGATTDescriptor
         * @apiDescription Reads the descriptor enctypted value from the remote device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {EncryptionObject} encryptionObject Object containing encryption information.
         * @apiParam {Function} onGATTDescriptorSecureReadValueCallback Invokes when the descriptor value is read successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid or null value.
         * @apiError (Error) {APIError} InsufficientAuthorizationError Disconnect GATT connection when encrypted nonce is wrong.
         *
         * @apiExample {js} Example usage:
         * // Assume gattDescriptor object has been obtained by using BluetoothGATTCharacteristic.getDescriptors() method.
         * function onGATTDescriptorSecureReadValueCallback(value) {
         *   console.log("Value : " + value);
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var encryptionObject = device.getEncryptionObject(encryption[0].key, encryption[0].cipher, "nonceValue");
         *
         * gattDescriptor.secureReadValue(encryptionObject, onGATTDescriptorEncryptedSecureReadValueCallback, onErrorCallback);
         *
         */
        secureReadValue: function(encryptionObject, onsuccess, onerror) {
            var cmd = "scpluginGATTDescriptorSecureReadValue";
            var args = {};
            args.callbackName = "__onNMGATTDescriptorSecureReadValue";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.characteristicUuid;
            args.descriptorUuid = this.uuid;
            try {
                args.encryptionKey = encryptionObject.key;
                args.encryptionCipher = encryptionObject.cipher;
                args.encryptionNonce = encryptionObject.nonce;
            } catch (e) {
                var err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid or null value.");
                onerror(err);
            }
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothGATTDescriptor.secureWriteValue(encryptionObject,value,onGATTDescriptorWritValueToEncryptCallback,onErrorCallback) void secureWriteValue()
         * @apiName secureWriteValue()
         * @apiGroup BluetoothGATTDescriptor
         * @apiDescription Write descriptor values to encrypt on the remote device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {EncryptionObject} encryptionObject Object containing encryption information.
         * @apiParam {[byte]} value The descriptor value to write.
         * @apiParam {Function} onGATTDescriptorSecureWriteValueCallback Invokes when the descriptor value is written successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid or null value.
         * @apiError (Error) {APIError} InsufficientAuthorizationError Disconnect GATT connection when encrypted nonce is wrong.
         *
         * @apiExample {js} Example usage:
         * // Assume gattDescriptor object has been obtained by using BluetoothGATTCharacteristic.getDescriptors() method.
         * function onGATTDescriptorSecureWriteValueCallback() {
         *   console.log("Descriptor value written.");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var encryptionObject = device.getEncryptionObject(encryption[0].key, encryption[0].cipher, "nonceValue");
         *
         * gattDescriptor.secureWriteValue(encryptionObject, value, onGATTDescriptorSecureWritValueToEncryptCallback, onErrorCallback);
         *
         */
        secureWriteValue: function(encryptionObject, value, onsuccess, onerror) {
            var cmd = "scpluginGATTDescriptorSecureWriteValue";
            var args = {};
            args.callbackName = "__onNMGATTDescriptorSecureWriteValue";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.characteristicUuid;
            args.descriptorUuid = this.uuid;
            args.value = value;
            try {
                args.encryptionKey = encryptionObject.key;
                args.encryptionCipher = encryptionObject.cipher;
                args.encryptionNonce = encryptionObject.nonce;
            } catch (e) {
                var err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid or null value.");
                onerror(err);
            }
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    /**
     * @api BluetoothGATTCharacteristic
     * @apiName BluetoothGATTCharacteristic
     * @apiGroup BluetoothGATTCharacteristic
     * @apiDescription The interface of GATT characteristic. The characteristic interface can be retrieved with BluetoothGATTService.getCharacteristics().
     * @apiVersion 1.3.0
     * @apiPermission public
     * @apiProfile common
     *
     * @apiSuccess (Property) {String} uuid UUID of the characteristic
     *
     * @apiExample {js} Example usage:
     * // Assume characteristic object has been obtained by using BluetoothGATTService.getCharacteristics() method.
     * var uuid = characteristic.uuid;
     * var serviceUuid = characteristic.serviceUuid;
     *
     */
    var BluetoothGATTCharacteristic = function(args) {
        Object.defineProperties(this, {
            uuid: {
                value: args.uuid,
                writable: false,
                enumerable: true
            },
            serviceUuid: {
                value: args.serviceUuid,
                writable: false,
                enumerable: true
            }
        });
    }

    BluetoothGATTCharacteristic.prototype = {
        /**
         * @api BluetoothGATTCharacteristic.getDescriptors(onGATTCharacteristicDescriptorCallback,onErrorCallback,uuid) void getDescriptors()
         * @apiName getDescriptors()
         * @apiGroup BluetoothGATTCharacteristic
         * @apiDescription Gets a list of descriptors or a descriptor with a given UUID in this characteristic.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onGATTCharacteristicDescriptorCallback Receives a list of descriptors or a descriptor with a given UUID in this characteristic.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {String} [uuid] Optional. UUID of the characteristic.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume gattCharacteristic object has been obtained by using BluetoothGATTService.getCharacteristics() method.
         * function onGATTCharacteristicDescriptorCallback(descriptors) {
         *   console.log("GATT Descriptors got");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * gattCharacteristic.getDescriptors(onGATTCharacteristicDescriptorCallback, onErrorCallback);
         *
         */
        getDescriptors: function(onsuccess, onerror, uuid) {
            var cmd = "scpluginGATTCharacteristicGetDescriptors";
            var args = {};
            args.callbackName = "__onNMGATTCharacteristicGetDescriptors";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.uuid;
            args.descriptorUuid = uuid;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api BluetoothGATTCharacteristic.secureReadValue(encryptionObject,onGATTCharacteristicReadValueCallback,onErrorCallback) void secureReadValue()
         * @apiName secureReadValue()
         * @apiGroup BluetoothGATTCharacteristic
         * @apiDescription Reads the characteristic enctypted value from the remote device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {EncryptionObject} encryptionObject Object containing encryption information.
         * @apiParam {Function} onGATTCharacteristicSecureReadValueCallback Invokes when the characteristic value is read successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid or null value.
         * @apiError (Error) {APIError} InsufficientAuthorizationError Disconnect GATT connection when encrypted nonce is wrong.
         *
         * @apiExample {js} Example usage:
         * // Assume gattCharacteristic object has been obtained by using BluetoothGATTService.getCharacteristics() method.
         * function onGATTCharacteristicSecureReadValueCallback(value) {
         *   console.log("Value : " + value);
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var encryptionObject = device.getEncryptionObject(encryption[0].key, encryption[0].cipher, "nonceValue");
         *
         * gattCharacteristic.secureReadValue(encryptionObject, onGATTCharacteristicSecureReadValueCallback, onErrorCallback);
         *
         */
        secureReadValue: function(encryptionObject, onsuccess, onerror) {
            var cmd = "scpluginGATTCharacteristicSecureReadValue";
            var args = {};
            args.callbackName = "__onNMGATTCharacteristicSecureReadValue";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.uuid;
            try {
                args.encryptionKey = encryptionObject.key;
                args.encryptionCipher = encryptionObject.cipher;
                args.encryptionNonce = encryptionObject.nonce;
            } catch (e) {
                var err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid or null value.");
                onerror(err);
            }
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothGATTCharacteristic.readValue(onGATTCharacteristicReadValueCallback,onErrorCallback) void readValue()
         * @apiName readValue()
         * @apiGroup BluetoothGATTCharacteristic
         * @apiDescription Reads the characteristic value from the remote device.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onGATTCharacteristicReadValueCallback Invokes when the characteristic value is read successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume gattCharacteristic object has been obtained by using BluetoothGATTService.getCharacteristics() method.
         * function onGATTCharacteristicReadValueCallback(value) {
         *   console.log("Value : " + value);
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * gattCharacteristic.readValue(onGATTCharacteristicReadValueCallback, onErrorCallback);
         *
         */
        readValue: function(onsuccess, onerror) {
            var cmd = "scpluginGATTCharacteristicReadValue";
            var args = {};
            args.callbackName = "__onNMGATTCharacteristicReadValue";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.uuid;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothGATTCharacteristic.secureWriteValue(encryptionObject,value,onGATTCharacteristicSecureWriteValueCallback,onErrorCallback) void secureWriteValue()
         * @apiName secureWriteValue()
         * @apiGroup BluetoothGATTCharacteristic
         * @apiDescription Writes the characteristic value to encrypt on the remote device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {EncryptionObject} encryptionObject Object containing encryption information.
         * @apiParam {[byte]} value The characteristic value to write.
         * @apiParam {Function} onGATTCharacteristicSecureWriteValueCallback Invokes when the characteristic value is written successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid or null value.
         * @apiError (Error) {APIError} InsufficientAuthorizationError Disconnect GATT connection when encrypted nonce is wrong.
         *
         * @apiExample {js} Example usage:
         * // Assume gattCharacteristic object has been obtained by using BluetoothGATTService.getCharacteristics() method.
         * function onGATTCharacteristicSecureWriteValueCallback() {
         *   console.log("Characteristic value written");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var encryptionObject = device.getEncryptionObject(encryption[0].key, encryption[0].cipher, "nonceValue");
         *
         * gattCharacteristic.secureWriteValue(encryptionObject, value, onGATTCharacteristicSecureWriteValueCallback, onErrorCallback);
         *
         */
        secureWriteValue: function(encryptionObject, value, onsuccess, onerror) {
            var cmd = "scpluginGATTCharacteristicSecureWriteValue";
            var args = {};
            args.callbackName = "__onNMGATTCharacteristicSecureWriteValue";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.uuid;
            args.value = value;
            try {
                args.encryptionKey = encryptionObject.key;
                args.encryptionCipher = encryptionObject.cipher;
                args.encryptionNonce = encryptionObject.nonce;
            } catch (e) {
                var err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid or null value.");
                onerror(err);
            }
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api BluetoothGATTCharacteristic.writeValue(value,onGATTCharacteristicWriteValueCallback,onErrorCallback) void writeValue()
         * @apiName writeValue()
         * @apiGroup BluetoothGATTCharacteristic
         * @apiDescription Writes the characteristic value to the remote device.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {[byte]} value The characteristic value to write.
         * @apiParam {Function} onGATTCharacteristicWriteValueCallback Invokes when the characteristic value is written successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume gattCharacteristic object has been obtained by using BluetoothGATTService.getCharacteristics() method.
         * function onGATTCharacteristicWriteValueCallback() {
         *   console.log("Characteristic value written");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * gattCharacteristic.writeValue(value, onGATTCharacteristicWriteValueCallback, onErrorCallback);
         *
         */
        writeValue: function(value, onsuccess, onerror) {
            var cmd = "scpluginGATTCharacteristicWriteValue";
            var args = {};
            args.callbackName = "__onNMGATTCharacteristicWriteValue";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.uuid;
            args.value = value;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api BluetoothGATTCharacteristic.setValueChangeListener(onGATTCharacteristicValueChangeCallback) void setValueChangeListener()
         * @apiName setValueChangeListener()
         * @apiGroup BluetoothGATTCharacteristic
         * @apiDescription Sets a listener to be called when characteristic value of the characteristic changes.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onGATTCharacteristicValueChangeCallback Listener functions that are called when the characteristic value changes.
         *
         * @apiExample {js} Example usage:
         * // Assume gattCharacteristic object has been obtained by using BluetoothGATTService.getCharacteristics() method.
         * function onGATTCharacteristicValueChangeCallback(value) {
         *   console.log("Value : " + value);
         * }
         *
         * gattCharacteristic.setValueChangeListener(onGATTCharacteristicValueChangeCallback);
         */
        setValueChangeListener: function(callback) {
            var cmd = "scpluginGATTCharacteristicSetValueChangeListener";
            var args = {};
            args.callbackName = "__onNMGATTCharacteristicSetValueChangeListener";
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.uuid;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.uuid, args, callback);
            } catch (e) {}
        },
        /**
         * @api BluetoothGATTCharacteristic.unsetValueChangeListener() void unsetValueChangeListener()
         * @apiName unsetValueChangeListener()
         * @apiGroup BluetoothGATTCharacteristic
         * @apiDescription Unsets a characteristic value change listener.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         * // Assume gattCharacteristic object has been obtained by using BluetoothGATTService.getCharacteristics() method.
         * gattCharacteristic.unsetValueChangeListener();
         *
         */
        unsetValueChangeListener: function() {
            var cmd = "scpluginGATTCharacteristicUnsetValueChangeListener";
            var args = {};
            args.cmd = cmd;
            args.serviceUuid = this.serviceUuid;
            args.characteristicUuid = this.uuid;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginGATTCharacteristicSetValueChangeListener" + this.uuid, args);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    /**
     * @api BluetoothGATTService
     * @apiName BluetoothGATTService
     * @apiGroup BluetoothGATTService
     * @apiDescription The interface of GATT service. The service can be retrieved with BluetoothLEDevice.getService().
     * @apiVersion 1.3.0
     * @apiPermission public
     * @apiProfile common
     *
     * @apiSuccess (Property) {String} uuid UUID of the service
     * @apiSuccess (Property) {String} nonce Nonce value for encryption.
     *
     * @apiExample {js} Example usage:
     * // Assume service object has been obtained by using BluetoothLEDevice.getService() method.
     * var uuid = service.uuid;
     *
     */
    var BluetoothGATTService = function(args) {
        Object.defineProperties(this, {
            uuid: {
                value: args.uuid,
                writable: false,
                enumerable: true
            },
        });
    }

    BluetoothGATTService.prototype = {
        /**
         * @api BluetoothGATTService.getCharacteristics(onGATTServiceCharacteristicsCallback,onErrorCallback,uuid) void getCharacteristics()
         * @apiName getCharacteristics()
         * @apiGroup BluetoothGATTService
         * @apiDescription Gets a list of characteristics or a characteristic with a given UUID in this service.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onGATTServiceCharacteristicsCallback Receives a list of characteristics or a characteristic with a given UUID in this service.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {String} [uuid] Optional. UUID of the characteristic.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume gattService object has been obtained by using BluetoothLEDevice.getService() method.
         * function onGATTServiceCharacteristicsCallback(characteristics) {
         *   console.log("GATT Characteristics got");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * gattService.getCharacteristics(onGATTServiceCharacteristicsCallback, onErrorCallback);
         *
         */
        getCharacteristics: function(onsuccess, onerror, uuid) {
            var cmd = "scpluginGATTServiceGetCharacteristics";
            var args = {};
            args.callbackName = "__onNMGATTServiceGetCharacteristics";
            args.cmd = cmd;
            args.serviceUuid = this.uuid;
            args.characteristicUuid = uuid;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    /**
     * @api BluetoothLEDevice
     * @apiName BluetoothLEDevice
     * @apiGroup BluetoothLEDevice
     * @apiDescription The BluetoothLEDevice represents a remote Bluetooth LE device.
     * @apiVersion 1.3.0
     * @apiPermission public
     * @apiProfile common
     *
     * @apiSuccess (Property) {String} handle The handle of the Bluetooth LE device from the scan result information.
     * @apiSuccess (Property) {String} [name] Nullable. The name of the Bluetooth LE device form the scan result information.
     * @apiSuccess (Property) {[Object]} encryption The Array object of encryption.
     * @apiSuccess (Property) {String} encryption.key encryption key.
     * @apiSuccess (Property) {String} encryption.cipher Type of encryption algorithm. ex) "AES_128-CBC-PKCS7Padding"
     *
     * @apiExample {js} Example usage:
     * // Assume device object has been obtained by using BluetoothLEAdapter.getDevice() method.
     * var handle = device.handle;
     * var name = device.name;
     * var encryption = device.encryption;
     *
     */
    var BluetoothLEDevice = function(args) {
        Object.defineProperties(this, {
            handle: {
                value: args.handle,
                writable: false,
                enumerable: true
            },
            name: {
                value: args.name,
                writable: false,
                enumerable: true
            },
            encryption: {
                value: args.encryption,
                writable: false,
                enumerable: true
            }
        });
    }

    BluetoothLEDevice.prototype = {

        /**
         * @api BluetoothLEDevice.getEncryptionObject(key,cipher,nonce) EncrytionObject getEncryptionObject()
         * @apiName getEncryptionObject()
         * @apiGroup BluetoothLEDevice
         * @apiDescription Return the encryption object for this GATTService. It includes key, cipher and nonce information.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} key encryption key.
         * @apiParam {String} cipher Type of encryption algorithm. ex) "AES_128-CBC-PKCS7Padding".
         * @apiParam {String} nonce Nonce value for encryption.
         *
         * @apiSuccess (Property) {Object} EncryptionObject Encryption object for this GATTService.
         * @apiSuccess (Property) {String} EncryptionObject.key encryption key.
         * @apiSuccess (Property) {String} EncryptionObject.cipher Type of encryption algorithm. ex) "AES_128-CBC-PKCS7Padding".
         * @apiSuccess (Property) {String} EncryptionObject.nonce Nonce value for encryption.
         *
         * @apiSuccessExample {JSON} Object Information (example)
         * {
         *   "key" : "KEY_1",
         *   "cipher" : "AES_128-CBC-PKCS7Padding",
         *   "nonce" : "nonceValue"
         * }
         *
         * @apiExample {js} Example usage:
         * var EncryptionObject = device.getEncryptionObject(encryption[0].key, encryption[0].cipher, "nonceValue");
         * console.log(EncryptionObject);
         *
         */
        getEncryptionObject: function(key, cipher, nonce) {
            return {
                uuid : this.uuid,
                nonce : nonce,
                key : key,
                cipher : cipher
            }
        },
        /**
         * @api BluetoothLEDevice.connect(onBLEDeviceConnectCallback,onErrorCallback) void connect()
         * @apiName connect()
         * @apiGroup BluetoothLEDevice
         * @apiDescription Establishes Low Energy connection to the device.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onBLEDeviceConnectCallback Invokes when the connection is established successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume device object has been obtained by using BluetoothLEAdapter.getDevice() method.
         * function onBLEDeviceConnectCallback() {
         *   console.log("Connected to device");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * device.connect(onBLEDeviceConnectCallback, onErrorCallback);
         *
         */
        connect: function(onsuccess, onerror) {
            var cmd = "scpluginBLEDeviceConnect";
            var args = {};
            args.callbackName = "__onNMBLEDeviceConnect";
            args.cmd = cmd;
            args.handle = this.handle;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothLEDevice.disconnect(onBLEDeviceDisconnectCallback,onErrorCallback) void disconnect()
         * @apiName disconnect()
         * @apiGroup BluetoothLEDevice
         * @apiDescription Disconnects form the device.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onBLEDeviceDisconnectCallback Invokes when the connection is finished successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} InvalidStateError if device is currently not connected.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume device object has been obtained by using BluetoothLEAdapter.getDevice() method.
         * function onBLEDeviceDisconnectCallback() {
         *   console.log("Disconnected");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * device.disconnect(onBLEDeviceDisconnectCallback, onErrorCallback);
         *
         */
        disconnect: function(onsuccess, onerror) {
            var cmd = "scpluginBLEDeviceDisconnect";
            var args = {};
            args.callbackName = "__onNMBLEDeviceDisconnect";
            args.cmd = cmd;
            args.handle = this.handle;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothLEDevice.getConfiguration(onBLEDeviceConfigurationCallback,onErrorCallback) void getConfiguration()
         * @apiName getConfiguration()
         * @apiGroup BluetoothLEDevice
         * @apiDescription Gets Configuration of the remote device.
         * @apiVersion 1.3.1
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onBLEDeviceConfigurationCallback Receives Configuration
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume device object has been obtained by using BluetoothLEAdapter.getDevice() method.
         * function onBLEDeviceConfigurationCallback(configuration) {
         *   console.log("BLE configuration : " + configuration);
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * device.getConfiguration(onBLEDeviceConfigurationCallback, onErrorCallback);
         *
         */
        getConfiguration: function(onsuccess, onerror) {
            var cmd = "scpluginBLEDeviceGetConfiguration";
            var args = {};
            args.callbackName = "__onNMBLEDeviceGetConfiguration";
            args.cmd = cmd;
            args.handle = this.handle;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothLEDevice.getUuids(onBLEDeviceUuidCallback,onErrorCallback) void getUuids()
         * @apiName getUuids()
         * @apiGroup BluetoothLEDevice
         * @apiDescription Gets UUID list of the remote device.
         * This method does not start a service discovery procedure to retrieve the UUIDs from the remote device. Instead, the local cached copy of the service UUIDs are returned.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onBLEDeviceUuidCallback Receives UUID list
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume device object has been obtained by using BluetoothLEAdapter.getDevice() method.
         * function onBLEDeviceUuidCallback(uuids) {
         *   console.log("service uuids : " + uuids);
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * device.getUuids(onBLEDeviceUuidCallback, onErrorCallback);
         *
         */
        getUuids: function(onsuccess, onerror) {
            var cmd = "scpluginBLEDeviceGetUuids";
            var args = {};
            args.callbackName = "__onNMBLEDeviceGetUuids";
            args.cmd = cmd;
            args.handle = this.handle;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothLEDevice.getRssi(onBLEDeviceRssiCallback,onErrorCallback) void getRssi()
         * @apiName getRssi()
         * @apiGroup BluetoothLEDevice
         * @apiDescription Gets the rssi value on the remote device.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onBLEDeviceRssiCallback Receives the rssi value on the remote device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume device object has been obtained by using BluetoothLEAdapter.getDevice() method.
         * function onBLEDeviceRssiCallback(rssi) {
         *   console.log("device rssi : " + rssi);
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * device.getRssi(onBLEDeviceRssiCallback, onErrorCallback);
         *
         */
        getRssi: function(onsuccess, onerror) {
            var cmd = "scpluginBLEDeviceGetRssi";
            var args = {};
            args.callbackName = "__onNMBLEDeviceGetRssi";
            args.cmd = cmd;
            args.handle = this.handle;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothLEDevice.getGATTServices(onBLEDeviceGATTServiceCallback,onErrorCallback,uuid) void getGATTServices()
         * @apiName getGATTServices()
         * @apiGroup BluetoothLEDevice
         * @apiDescription Gets a list of GATT services or a GATT service with a given UUID from this device.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onBLEDeviceGATTServiceCallback Gets a list of GATT services or a GATT service with a given UUID from this device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {String} [uuid] Optional. UUID of the service.
         *
         * @apiError (Error) {APIError} InvalidStateError if the GATT service is not available.
         * @apiError (Error) {APIError} NotFoundError if there is no service with the given UUID.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume device object has been obtained by using BluetoothLEAdapter.getDevice() method.
         * function onBLEDeviceGATTServiceCallback(services) {
         *   console.log("Service got");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * device.getGATTServices(onBLEDeviceGATTServiceCallback, onErrorCallback);
         *
         */
        getGATTServices: function(onsuccess, onerror, uuid) {
            var cmd = "scpluginBLEDeviceGetGATTServices";
            var args = {};
            args.callbackName = "__onNMBLEDeviceGetGATTServices";
            args.cmd = cmd;
            args.handle = this.handle;
            args.uuid = uuid;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BluetoothLEDevice.setConnectStateChangeListener(onBLEDeviceConnectChangeCallback) void setConnectStateChangeListener()
         * @apiName setConnectStateChangeListener()
         * @apiGroup BluetoothLEDevice
         * @apiDescription Sets a listener to be called when the device connects or disconnects.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onBLEDeviceConnectChangeCallback Listener functions that are called when the connection state changes.
         *
         * @apiExample {js} Example usage:
         * // Assume device object has been obtained by using BluetoothLEAdapter.getDevice() method.
         * function onBLEDeviceConnectChangeCallback(state) {
         *   if (state == "CONNECTED") {
         *     // Do something...
         *   } else if (state == "DISCONNECTED") {
         *     // Do something...
         *   }
         * }
         *
         * device.setConnectStateChangeListener(onBLEDeviceConnectChangeCallback);
         */
        setConnectStateChangeListener: function(callback) {
            var cmd = "scpluginBLEDeviceSetConnectStateChangeListener";
            var args = {};
            args.callbackName = "__onNMBLEDeviceSetConnectStateChangeCallback";
            args.cmd = cmd;
            args.handle = this.handle;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.handle, args, callback);
            } catch (e) {}
        },
        /**
         * @api BluetoothLEDevice.unsetConnectStateChangeListener() void unsetConnectStateChangeListener()
         * @apiName unsetConnectStateChangeListener()
         * @apiGroup BluetoothLEDevice
         * @apiDescription Unsets a Bluetooth device connection listener.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         * // Assume device object has been obtained by using BluetoothLEAdapter.getDevice() method.
         * device.unsetConnectStateChangeListener();
         *
         */
        unsetConnectStateChangeListener: function() {
            var cmd = "scpluginBLEDeviceUnsetConnectStateChangeListener";
            var args = {};
            args.cmd = cmd;
            args.handle = this.handle;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginBLEDeviceSetConnectStateChangeListener" + this.handle, args);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    var BluetoothLEAdapter = function() {}

    BluetoothLEAdapter.prototype = {
        /**
         * @api BluetoothLEAdapter.getDevice(onBLEAdapterDeviceCallback,onErrorCallback) void getDevice()
         * @apiName getDevice()
         * @apiGroup BluetoothLEAdapter
         * @apiDescription Gets bluetooth LE device registered in device plugin.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onBLEAdapterDeviceCallback Receives BluetoothLEDevice object.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} ServiceNotAvailableError if a Bluetooth device is turned off.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onBLEAdapterDeviceCallback(device) {
         *   console.log("Device got");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var adapter = scplugin.bluetooth.getLEAdapter();
         * adapter.getDevice(onBLEAdapterDeviceCallback, onErrorCallback);
         */
        getDevice: function(onsuccess, onerror) {
            var cmd = "scpluginBLEAdapterGetDevice";
            var args = {};
            args.callbackName = "__onNMBLEAdapterGetDevice";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    var Bluetooth = function() {}

    Bluetooth.prototype = {
        /**
         * @api window.scplugin.bluetooth.getLEAdapter() BluetoothLEAdapter getLEAdapter()
         * @apiName getLEAdapter()
         * @apiGroup Bluetooth
         * @apiDescription Gets the Low Energy Bluetooth adapter
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         * var adapter = scplugin.bluetooth.getLEAdapter();
         *
         */
        getLEAdapter: function() {
            return new BluetoothLEAdapter();
        },
    };

    /**
     * @api BLEDevice
     * @apiName BLEDevice
     * @apiGroup BLEDevice
     * @apiDescription The BLEDevice represents a remote BLE device.
     * @apiVersion 1.3.3
     * @apiPermission public
     * @apiProfile common
     *
     * @apiSuccess (Property) {String} deviceId The device Id of the BLE device from the scan result information.
     * @apiSuccess (Property) {String} [name] Nullable. The name of the BLE device form the scan result information.
     *
     * @apiExample {js} Example usage:
     * // Assume device object has been obtained by using D2dManager.getDevice() method.
     * var deviceId = device.deviceId;
     * var name = device.name;
     * var encryption = device.encryption;
     *
     */
    var BLEDevice = function(args) {
        Object.defineProperties(this, {
            deviceId: {
                value: args.deviceId,
                writable: false,
                enumerable: true
            },
            name: {
                value: args.name,
                writable: false,
                enumerable: true
            },
            encryption: {
                value: args.encryption,
                writable: false,
                enumerable: true
            }
        });
    }

    BLEDevice.prototype = {
        /**
         * @api BLEDevice.getConnectedState(onD2dBLEDeviceGetConnectedStateCallback,onErrorCallback) void getConnectedState()
         * @apiName getConnectedState()
         * @apiGroup BLEDevice
         * @apiDescription Gets Connected state of BLE Device
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onD2dBLEDeviceGetConnectedStateCallback Receive Connected state of BLE Device ("CONNECTED", "NEARBY", "OUTOFRANGE")
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceGetConnectedStateCallback(state) {
         *   if (state == "CONNECTED") {
         *     // Connected GATT
         *   } else if (state == "NEARBY") {
         *     // Received Advertising Packet
         *   } else if (state == "OUTOFRANGE") {
         *     // Can't Received Advertising Packet
         *   }
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * bleDevice.getConnectedState(onD2dBLEDeviceGetConnectedStateCallback, onErrorCallback);
         *
         */
        getConnectedState: function(onsuccess, onerror) {
            var cmd = "scpluginD2dBLEDeviceGetConnectedState";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceGetConnectedState";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BLEDevice.connect(onD2dBLEDeviceConnectCallback,onErrorCallback) void connect()
         * @apiName connect()
         * @apiGroup BLEDevice
         * @apiDescription Establishes Low Energy connection to the bleDevice.
         * @apiVersion 1.3.3
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onD2dBLEDeviceConnectCallback Invokes when the connection is established successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceConnectCallback() {
         *   console.log("Connected to device");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * bleDevice.connect(onD2dBLEDeviceConnectCallback, onErrorCallback);
         *
         */
        connect: function(onsuccess, onerror) {
            var cmd = "scpluginD2dBLEDeviceConnect";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceConnect";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BLEDevice.disconnect(onD2dBLEDeviceDisconnectCallback,onErrorCallback) void disconnect()
         * @apiName disconnect()
         * @apiGroup BLEDevice
         * @apiDescription Disconnects form the bleDevice.
         * @apiVersion 1.3.3
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onD2dBLEDeviceDisconnectCallback Invokes when the connection is finished successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} InvalidStateError if bleDevice is currently not connected.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceDisconnectCallback() {
         *   console.log("Disconnected");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * bleDevice.disconnect(onD2dBLEDeviceDisconnectCallback, onErrorCallback);
         *
         */
        disconnect: function(onsuccess, onerror) {
            var cmd = "scpluginD2dBLEDeviceDisconnect";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceDisconnect";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BLEDevice.getConfiguration(onD2dBLEDeviceConfigurationCallback,onErrorCallback) void getConfiguration()
         * @apiName getConfiguration()
         * @apiGroup BLEDevice
         * @apiDescription Gets Configuration of the remote Device.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onD2dBLEDeviceConfigurationCallback Receives Configuration
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume BLEDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceConfigurationCallback(configuration) {
         *   console.log("BLE configuration : " + configuration);
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * bleDevice.getConfiguration(onD2dBLEDeviceConfigurationCallback, onErrorCallback);
         *
         */
        getConfiguration: function(onsuccess, onerror) {
            var cmd = "scpluginD2dBLEDeviceGetConfiguration";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceGetConfiguration";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api BLEDevice.setConnectStateChangeListener(onD2dBLEDeviceConnectChangeCallback) void setConnectStateChangeListener()
         * @apiName setConnectStateChangeListener()
         * @apiGroup BLEDevice
         * @apiDescription Sets a listener to be called when the bleDevice connects or disconnects.
         * @apiVersion 1.3.3
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onD2dBLEDeviceConnectChangeCallback Listener functions that are called when the connection state changes.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceConnectChangeCallback(state) {
         *   if (state == "CONNECTED") {
         *     // Connected GATT
         *   } else if (state == "NEARBY") {
         *     // Received Advertising Packet
         *   } else if (state == "OUTOFRANGE") {
         *     // Can't Received Advertising Packet
         *   }
         * }
         *
         * bleDevice.setConnectStateChangeListener(onD2dBLEDeviceConnectChangeCallback);
         */
        setConnectStateChangeListener: function(callback) {
            var cmd = "scpluginD2dBLEDeviceSetConnectStateChangeListener";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceSetConnectStateChangeCallback";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.deviceId, args, callback);
            } catch (e) {}
        },
        /**
         * @api BLEDevice.unsetConnectStateChangeListener() void unsetConnectStateChangeListener()
         * @apiName unsetConnectStateChangeListener()
         * @apiGroup BLEDevice
         * @apiDescription Unsets a Bluetooth bleDevice connection listener.
         * @apiVersion 1.3.3
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * bleDevice.unsetConnectStateChangeListener();
         *
         */
        unsetConnectStateChangeListener: function() {
            var cmd = "scpluginD2dBLEDeviceUnsetConnectStateChangeListener";
            var args = {};
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginD2dBLEDeviceSetConnectStateChangeListener" + this.deviceId, args);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api BLEDevice.executeCommand(capability,command,onD2dBLEDeviceExecuteCommandCallback,onErrorCallback,value) void executeCommand()
         * @apiName executeCommand()
         * @apiGroup BLEDevice
         * @apiDescription Execute command of connection to the bleDevice.
         * @apiVersion 1.3.3
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} capability Capability Name
         * @apiParam {String} command Command Name
         * @apiParam {Function} onD2dBLEDeviceExecuteCommandCallback Invokes when the execute is established successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {String} value Value As a Byte that can be used directly on the BLE device.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceExecuteCommandCallback() {
         *   console.log("Successfully execute command");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * // Set Volume
         * // If Volume is 36, HexString is 0x24. Caller should be use value as HexString
         * bleDevice.executeCommand("VolumeLevel", "SetVolume", onD2dBLEDeviceExecuteCommandCallback, onErrorCallback, "24");
         *
         * // Ring
         * bleDevice.executeCommand("trackerRing", "On", onD2dBLEDeviceExecuteCommandCallback, onErrorCallback);
         *
         */
        executeCommand: function(capability, command, onsuccess, onerror, value) {
            var cmd = "scpluginD2dBLEDeviceExecuteCommand";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceExecuteCommand";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            args.capability = capability;
            args.command = command;
            args.value = value;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api BLEDevice.fetchAttribute(capability,attribute,onD2dBLEDeviceFetchAttributeCallback,onErrorCallback) void fetchAttribute()
         * @apiName fetchAttribute()
         * @apiGroup BLEDevice
         * @apiDescription Fetch attribute of connection to the bleDevice.
         * @apiVersion 1.3.4
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} capability Capability Name
         * @apiParam {String} attribute attribute Name
         * @apiParam {Function} onD2dBLEDeviceFetchAttributeCallback Invokes when the execute is established successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceFetchAttributeBatteryCallback(attribute) {
         *   console.log("Value of attribute : " + attribute.value);
         *   console.log("Unit of attribute : " + attribute.unit);
         *   console.log("Min of attribute : " + attribute.min);
         *   console.log("Max of attribute : " + attribute.max);
         *   // attribute is { value : "40", unit : "%", min : "0", max : "100"}
         * }
         *
         * function onD2dBLEDeviceFetchAttributeTagButtonCallback(attribute) {
         *   console.log("Value of attribute : " + attribute.value);
         *   // attribute is { value : "pushed"}
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * bleDevice.fetchAttribute("tag.tagButton", "tagButton", onD2dBLEDeviceFetchAttributeTagButtonCallback, onErrorCallback);
         *
         * bleDevice.fetchAttribute("battery", "battery", onD2dBLEDeviceFetchAttributeBatteryCallback, onErrorCallback);
         *
         */
        fetchAttribute: function(capability, attribute, onsuccess, onerror) {
            var cmd = "scpluginD2dBLEDeviceFetchAttribute";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceFetchAttribute";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            args.capability = capability;
            args.attribute = attribute;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api BLEDevice.setNotificationListener(capability,attribute,onD2dBLEDeviceNotificationCallback) void setNotificationListener()
         * @apiName setNotificationListener()
         * @apiGroup BLEDevice
         * @apiDescription Sets a listener to be called when receive notification.
         * @apiVersion 1.3.4
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} capability Capability Name
         * @apiParam {String} attribute attribute Name
         * @apiParam {Function} onD2dBLEDeviceNotificationCallback Listener functions that are called when receive notification.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceNotificationCallback(state) {
         *   console.log("Notification state :" + state);
         * }
         *
         * bleDevice.setNotificationListener(capability, attribute, onD2dBLEDeviceNotificationCallback);
         */
        setNotificationListener: function(capability, attribute, callback) {
            var cmd = "scpluginD2dBLEDeviceSetNotificationListener";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceSetNotificationListener";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            args.capability = capability;
            args.attribute = attribute;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.deviceId + capability + attribute, args, callback);
            } catch (e) {}
        },
        /**
         * @api BLEDevice.unsetNotificationListener(capability,attribute) void unsetNotificationListener()
         * @apiName unsetNotificationListener()
         * @apiGroup BLEDevice
         * @apiDescription Unsets a Bluetooth bleDevice Notification listener.
         * @apiVersion 1.3.4
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} capability Capability Name
         * @apiParam {String} attribute attribute Name
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * bleDevice.unsetNotificationListener(capability, attribute);
         *
         */
        unsetNotificationListener: function(capability, attribute) {
            var cmd = "scpluginD2dBLEDeviceUnsetNotificationListener";
            var args = {};
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            args.capability = capability;
            args.attribute = attribute;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginD2dBLEDeviceSetNotificationListener" + this.deviceId + capability + attribute, args);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api BLEDevice.setNotificationIndicator(state,capability,attribute,onD2dBLEDeviceSetNotificationIndicatorCallback,onErrorCallback) void setNotificationIndicator()
         * @apiName setNotificationIndicator()
         * @apiGroup BLEDevice
         * @apiDescription Sets a Notification indicator about attribute
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Boolean} state State of NotificationIndicator
         * @apiParam {String} capability Capability Name
         * @apiParam {String} attribute attribute Name
         *
         * @apiParam {Function} onD2dBLEDeviceSetNotificationIndicatorCallback Invokes when the execute is established successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceSetNotificationIndicatorCallback(state) {
         *   console.log("Notification Indicator state :" + state);
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * bleDevice.setNotificationIndicator(state, capability, attribute, onD2dBLEDeviceSetNotificationIndicatorCallback, onErrorCallback);
         */
        setNotificationIndicator: function(state, capability, attribute, onsuccess, onerror) {
            var cmd = "scpluginD2dBLEDeviceSetNotificationIndicator";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceSetNotificationIndicator";
            args.cmd = cmd;
            args.state = state;
            args.deviceId = this.deviceId;
            args.capability = capability;
            args.attribute = attribute;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api BLEDevice.putLog(name,value,onD2dBLEDevicePutLogCallback,onErrorCallback) void putLog()
         * @apiName putLog()
         * @apiGroup BLEDevice
         * @apiDescription Put Log of connected BLE Device to Log folder (Android Only)
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} name Name As a Text that can be used storing file name.
         * @apiParam {String} value Value As a Byte that can be write to file.
         * @apiParam {Function} onD2dBLEDevicePutLogCallback Invokes when the putting is established successfully.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDevicePutLogCallback() {
         *   console.log("Put Log of BLE Device to Log folder");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * bleDevice.putLog(name, value, onD2dBLEDevicePutLogCallback, onErrorCallback);
         *
         */
        putLog: function(name, value, onsuccess, onerror) {
            var cmd = "scpluginD2dBLEDevicePutLog";
            var args = {};
            args.callbackName = "__onNMD2dBLEDevicePutLog";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            args.name = name;
            args.value = value;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api BLEDevice.setBleScanListener(onD2dBLEDeviceScanCallback) void setBleScanListener()
         * @apiName setBleScanListener()
         * @apiGroup BLEDevice
         * @apiDescription Sets a listener to be called for bleDevice scanning.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onD2dBLEDeviceScanCallback Listener functions that are called.
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * function onD2dBLEDeviceScanCallback(result) {
         *      console.log("Scan result :" + result);
         * }
         *
         * bleDevice.setBleScanListener(onD2dBLEDeviceScanCallback);
         */
        setBleScanListener: function(callback)
        {
            var cmd = "scpluginD2dBLEDeviceSetBleScanListener";
            var args = {};
            args.callbackName = "__onNMD2dBLEDeviceSetBleScanCallback";
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.deviceId, args, callback);
            } catch (e) {
            }
        },
        /**
         * @api BLEDevice.unsetBleScanListener() void unsetBleScanListener()
         * @apiName unsetBleScanListener()
         * @apiGroup BLEDevice
         * @apiDescription Unsets a Bluetooth bleDevice scan listener.
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         * // Assume bleDevice object has been obtained by using D2dManager.getBleDevice() method.
         * bleDevice.unsetBleScanListener();
         *
         */
        unsetBleScanListener: function()
        {
            var cmd = "scpluginD2dBLEDeviceUnsetBleScanListener";
            var args = {};
            args.cmd = cmd;
            args.deviceId = this.deviceId;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginD2dBLEDeviceSetBleScanListener" + this.deviceId, args);
            } catch (e) {
                var err = new window.scplugin._APIError ("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        }
    };

    var D2dManager = function() {}

    D2dManager.prototype = {
        /**
         * @api window.scplugin.d2dManager.getBLEDevice(onD2dBLEDeviceCallback,onErrorCallback) void getBLEDevice()
         * @apiName getBLEDevice()
         * @apiGroup D2dManager
         * @apiDescription Gets BLE device registered in device plugin.
         * @apiVersion 1.3.3
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onD2dBLEDeviceCallback Receives BLEDevice object.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} ServiceNotAvailableError if a Bluetooth device is turned off.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onD2dBLEDeviceCallback(bleDevice) {
         *   console.log("BLE Device got");
         * }
         *
         * function onErrorCallback(error) {
         *   console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * var d2dManager = scplugin.d2dManager.getBLEDevice(onD2dBLEDeviceCallback, onErrorCallback);
         */
        getBLEDevice: function(onsuccess, onerror) {
            var cmd = "scpluginD2dGetBLEDevice";
            var args = {};
            args.callbackName = "__onNMD2dGetBLEDevice";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    };

    var HubData = function(args) {
        Object.defineProperties(this, {
            id: {
                value: args.id,
                writable: false,
                enumerable: true
            },
            locationId: {
                value: args.locationId,
                writable: false,
                enumerable: true
            },
            name: {
                value: args.name,
                writable: false,
                enumerable: true
            },
            type: {
                value: convertStringToObject(args.type),
                writable: false,
                enumerable: true
            },
            status: {
                value: args.status,
                writable: false,
                enumerable: true
            },
            firmwareVersion: {
                value: args.firmwareVersion,
                writable: false,
                enumerable: true
            },
            zigbeeId: {
                value: args.zigbeeId,
                writable: false,
                enumerable: true
            },
            onlineSince: {
                value: args.onlineSince,
                writable: false,
                enumerable: true
            },
            onlineSinceDate: {
                value: args.onlineSinceDate,
                writable: false,
                enumerable: true
            },
            isZwaveUtilEnabled: {
                value: args.isZwaveUtilEnabled,
                writable: false,
                enumerable: true
            },
            firmwareUpdateAvailable: {
                value: args.firmwareUpdateAvailable,
                writable: false,
                enumerable: true
            },
            hardwareId: {
                value: args.hardwareId,
                writable: false,
                enumerable: true
            },
            hardwareDescription: {
                value: args.hardwareDescription,
                writable: false,
                enumerable: true
            },
            signalStrength: {
                value: args.signalStrength,
                writable: false,
                enumerable: true
            },
            role: {
                value: args.role,
                writable: false,
                enumerable: true
            },
            hardwareType: {
                value: args.hardwareType,
                writable: false,
                enumerable: true
            },
            features: {
                value: args.features,
                writable: false,
                enumerable: true
            },
            data: {
                value: convertStringToObject(args.data),
                writable: false,
                enumerable: true
            }
        });
    };
    /**
     * @api HubDeviceInterface
     * @apiName HubDeviceInterface
     * @apiGroup HubDeviceInterface
     * @apiDescription [In-House] Gets interface of Hub Device.
     * @apiVersion 1.3.0
     * @apiPermission platform
     * @apiProfile device
     * @apiPrivate
     *
     * @apiParam {Object} hub Information of hub.
     * @apiParam {Object} hub.data Additional configuration and capability information for the hub.
     * @apiParam {String} hub.features The supported features of hub.
     * @apiParam {String} hub.firmwareVersion The current version of the firmware on the hub.
     * @apiParam {Boolean} hub.firmwareUpdateAvailable A Flag to indicate if the hub has an update available.
     * @apiParam {String} hub.hardwareDescription The Human Description for the hub hardware.
     * @apiParam {String} hub.hardwareId The Specific Hardware ID for the hub.
     * @apiParam {String} hub.hardwareType The hardware type of hub.
     * @apiParam {String} hub.id Unique global ID that supports platform level only.
     * @apiParam {Boolean} hub.isZwaveUtilEnabled Flag to indicate if Zwave utilities is supported.
     * @apiParam {String} hub.locationId location ID.
     * @apiParam {String} hub.name Device name.
     * @apiParam {String} hub.onlineSince The date last reported online in iso8601 format.
     * @apiParam {String} hub.onlineSinceDate The date that last reported it was online in milliseconds converted to a Date.
     * @apiParam {String} hub.role Device permission of user.
     * @apiParam {String} hub.signalStrength Signal strength.
     * @apiParam {String} hub.status The last current status of the hub.
     * @apiParam {Object} hub.type The type of hub, inferred by the hardwareType in JSON.
     * @apiParam {String} hub.zigbeeId The unique zigbee id for the hub.
     * @apiParam {[Object]} devices Child device list in hub.
     *
     * @apiExample {js} Example usage: hubDeviceObject (example)
     *   {
     *       hub: {
     *           id: 'fecbf85e-aa32-42af-9a66-9c49d835d709',
     *           name: 'SmartThings hub',
     *           locationId: 'dcccd228-01ad-4320-9282-cb8ea87dc300',
     *           firmwareVersion: '000.017.00055',
     *           zigbeeId: 'D052A8AB872E0001',
     *           status: 'ACTIVE',
     *           onlineSince: '2018-12-02T03:06:17.758Z',
     *           firmwareUpdateAvailable: false,
     *           hardwareId: '001D',
     *           hardwareDescription: 'SmartThings WiFi Pro, Vodafone (UK)',
     *           isZwaveUtilEnabled: true,
     *           hardwareType: 'V3_HUB',
     *           role: owner,
     *           onlineSinceDate: 1543719977758,
     *           signalStrength: '0',
     *           features: [{
     *               name: 'zigbee3',
     *               enabled: true
     *           }, {
     *               name: 'zwaveS2',
     *               enabled: true
     *           }],
     *           data: {
     *               appengineConnected: 'false',
     *               appengineEnabled: 'false',
     *               appengineVersion: '0.0.0',
     *               backupVersion: '0.0.0',
     *               batteryInUse: 'false',
     *               batteryVoltage: '65535 mV',
     *               bluetoothRadioDetected: 'false',
     *               bluetoothRadioEnabled: 'false',
     *               bluetoothRadioFunctional: 'false',
     *               bootloaderVersion: '0',
     *               emmcHealth: '1',
     *               emmcLifeTypeA: '1',
     *               emmcLifeTypeB: '1',
     *               hardwareID: '001D',
     *               hubcoreVersion: '000.017.00055',
     *               leeEnabled: 'false',
     *               localIP: '192.168.1.176',
     *               localSrvPortTCP: '39500',
     *               localSrvPortUDP: '0',
     *               macAddress: '94:8B:C1:A7:5A:92',
     *               originalZigbeeEui: '000B57FFFE9EFC7C',
     *               presenceTimeout: '2',
     *               updaterVersion: '0',
     *               videocoreVersion: '0.0.0',
     *               zigbeeChannel: '20',
     *               zigbeeEui: '000B57FFFE9EFC7C',
     *               zigbeeFirmware: '2.5.0',
     *               zigbeeNcpFirmware: '0.3.11',
     *               zigbeeNodeID: '0000',
     *               zigbeeOta: '2',
     *               zigbeePanID: '8521',
     *               zigbeePowerLevel: '10',
     *               zigbeeRadioDetected: 'true',
     *               zigbeeRadioEnabled: 'true',
     *               zigbeeRadioFunctional: 'true',
     *               zigbeeType: '15',
     *               zigbeeUnsecureRejoin: 'false',
     *               zwaveControllerStatus: '01',
     *               zwaveHomeID: 'C7821F21',
     *               zwaveNodeID: '01',
     *               zwavePowerLevel: 'full',
     *               zwaveRadioDetected: 'true',
     *               zwaveRadioEnabled: 'true',
     *               zwaveRadioFunctional: 'true',
     *               zwaveRegion: 'EU',
     *               zwaveSerialVersion: '4',
     *               zwaveSucID: '01',
     *               zwaveVersion: '4.38'
     *           },
     *           type: {
     *               name: 'Hub'
     *           }
     *       },
     *       devices: [{
     *           id: '094d99d6-1331-47b6-bbd1-5e8ec0e24435',
     *           name: 'Hue 6FCA46 (Hue Bridge)',
     *           hubId: 'fecbf85e-aa32-42af-9a66-9c49d835d709',
     *           locationId: 'dcccd228-01ad-4320-9282-cb8ea87dc300',
     *           label: 'Hue 6FCA46',
     *           status: 'OFFLINE',
     *           typeId: '95ec7fac-5f27-4bb5-989b-1f6fcc477642',
     *           typeName: 'LAN Hue Bridge',
     *           deviceNetworkId: '0017886FCA46',
     *           virtual: false,
     *           primaryTileName: null,
     *           completedSetup: true,
     *           network: 'u',
     *           stateOverrides: [],
     *           role: 'none',
     *           parentSmartAppId: 'c413915e-4a90-4af0-b133-8c38a509dd58',
     *           parentDeviceId: null,
     *           isComponent: false,
     *           componentName: null,
     *           componentLabel: null,
     *           isExecutingLocally: false,
     *           lastActivityTime: 1543379563751
     *       }, {
     *           id: 'a81725b9-9fb6-4b96-b3f8-b6506cf32bcc',
     *           name: 'Hue color lamp 1 (Hue Extended Color)',
     *           hubId: 'fecbf85e-aa32-42af-9a66-9c49d835d709',
     *           locationId: 'dcccd228-01ad-4320-9282-cb8ea87dc300',
     *           label: 'Hue color lamp 1',
     *           status: 'OFFLINE',
     *           typeId: '960b7098-9512-4262-9540-893e9905f508',
     *           typeName: 'LAN Hue Extended Color',
     *           deviceNetworkId: '0017886FCA46/1',
     *           virtual: false,
     *           primaryTileName: null,
     *           completedSetup: true,
     *           network: 'u',
     *           stateOverrides: [],
     *           role: 'none',
     *           parentSmartAppId: null,
     *           parentDeviceId: '094d99d6-1331-47b6-bbd1-5e8ec0e24435',
     *           isComponent: false,
     *           componentName: null,
     *           componentLabel: null,
     *           isExecutingLocally: false,
     *           lastActivityTime: null
     *       }]
     *   }
     *
     * @apiExample {js} Example usage: getHubDeviceInterface
     * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
     * function onDeviceHubDeviceInterfaceCallback(hubDeviceObject) {
     *   console.log("Hub Device Name : " hubDeviceObject.name);
     *
     *   for (var i in hubDeviceObject.devices) {
     *     var device = hubDeviceObject.devices[i];
     *     console.log("Device Name: " + device.hub.name);
     *     console.log("Device Status: " + device.hub.status);
     *   }
     * }
     * function onErrorCallback(error) {
     *   console.log("error name: " + error.name + " message: " + error.message);
     * }
     * ocfdevice.getHubDeviceInterface(onDeviceHubDeviceInterfaceCallback, onErrorCallback);
     *
     *
     */

    var HubDeviceInterface = function(args) {
        Object.defineProperties(this, {
            hub : {
                writable: false,
                enumerable: true,
                value: new HubData(args.hub)
            },
            devices: {
                value: args.devices,
                writable: false,
                enumerable: true
            },
        });
    };

    HubDeviceInterface.prototype = {
        /**
         * @api HubDeviceInterface.getStatus(hubStatusType,onHubDeviceGetStatusCallback,onErrorCallback) void getStatus()
         * @apiName getStatus()
         * @apiGroup HubDeviceInterface
         * @apiDescription [In-House] Gets the specific status of hub device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiUse HUB_STATUS_TYPE
         *
         * @apiParam {String} hubStatusType Information type to get the status.
         * @apiParam {Function} onHubDeviceGetStatusCallback Receives specific status of hub device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * // Assume hubdeviceinterface object has been obtained by using OCFDevice.getHubDeviceInterface() method.
         * function onHubDeviceGetStatusCallback(hubStatusType, result) {
         *     if (hubStatusType== "HUB_PRIMARY_ZWAVE_CONTROLLER" && result == true) {
         *        console.log("Status of hub primary zwave controller is enable.);
         *     } else if (hubStatusType== "ZWAVE_ENABLED" && result == true) {
         *        console.log("Status of Zwave is enable.");
         *     } else if (hubStatusType== "ZWAVE_ADDED" && result == true) {
         *        console.log("Zwave is added.");
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * hubdeviceinterface.getStatus("HUB_PRIMARY_ZWAVE_CONTROLLER", onHubDeviceGetStatusCallback, onErrorCallback);
         *
         *
         */

        getStatus: function(hubStatusType, onsuccess, onerror) {
            var cmd = "scpluginProdHubDeviceGetStatus";
            var args = {};
            args.id = this.hub.id;
            args.locationId = this.hub.locationId;
            args.hubStatusType = hubStatusType;
            args.callbackName = "__onNMProdHubDeviceGetStatusCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api HubDeviceInterface.navigateTo(navigationViewType,onHubDeviceNavigateToCallback,onErrorCallback,extraData) void navigateTo()
         * @apiName navigateTo()
         * @apiGroup HubDeviceInterface
         * @apiDescription [In-House] Navigates specific view page.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {HubDeviceViewType} navigationViewType Navigation view type to navigate.
         * @apiParam {Function} onHubDeviceNavigateToCallback Receives finish state of navigating view page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {Object} [extraData] Optional. Extra data to send. JSON Object.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse HUB_DEVICE_NAVIGATION_VIEW_TYPE
         *
         * @apiExample {js} Example usage: JOIN_ZWAVE_NETWORK_VIEW
         * // Assume hubdeviceinterface object has been obtained by using OCFDevice.getHubDeviceInterface() method.
         * function onHubDeviceNavigateToCallback(navigationViewType, resultData) {
         *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * hubdeviceinterface.navigateTo("JOIN_ZWAVE_NETWORK_VIEW", onHubDeviceNavigateToCallback, onErrorCallback);
         */
        navigateTo: function(navigationViewType, onsuccess, onerror, extraData) {
            var cmd = "scpluginProdHubDeviceNavigateTo";
            var args = {};
            args.id = this.hub.id;
            args.locationId = this.hub.locationId;
            args.navigationViewType = navigationViewType;
            args.callbackName = "__onNMProdHubDeviceNavigateToCallback";
            args.cmd = cmd;
            args.extraData = extraData;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api HubDeviceInterface.getFirmwareUpdateStatus(onHubDeviceGetFirmwareUpdateStatusCallback,onErrorCallback) void getFirmwareUpdateStatus()
         * @apiName getFirmwareUpdateStatus()
         * @apiGroup HubDeviceInterface
         * @apiDescription [In-House] Gets the firmware update status of hub device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Function} onHubDeviceGetFirmwareUpdateStatusCallback Receives firmware update status of hub device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         *
         * function onHubDeviceGetFirmwareUpdateStatusCallback(status) {
         *     if (status.enabled == true && status.lightsEnabled == true) {
         *        console.log("Status of firmware update is ALL");
         *     } else if (status.enabled == true && status.lightsEnabled == false) {
         *        console.log("Status of firmware update is NO_LIGHTBULBS");
         *     } else if (status.enabled == false) {
         *        console.log("Status of firmware update is NEVER");
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * hubdeviceinterface.getFirmwareUpdateStatus(onHubDeviceGetFirmwareUpdateStatusCallback, onErrorCallback);
         *
         *
         */

        getFirmwareUpdateStatus: function(onsuccess, onerror) {
            var cmd = "scpluginProdHubDeviceGetFirmwareUpdateStatus";
            var args = {};
            args.id = this.hub.id;
            args.locationId = this.hub.locationId;
            args.callbackName = "__onNMProdHubDeviceGetFirmwareUpdateStatusCallback";
            args.cmd = cmd;
            args.zigbeeId = this.hub.zigbeeId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api HubDeviceInterface.getSecureMode(onHubDeviceGetSecureModeCallback,onErrorCallback) void getSecureMode()
         * @apiName getSecureMode()
         * @apiGroup HubDeviceInterface
         * @apiDescription [In-House] Get the secure mode status of hub device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Function} onHubDeviceGetSecureModeCallback Receives secure mode status of hub device.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         *
         * function onHubDeviceGetSecureModeCallback(status) {
         *     if (status == true) {
         *        console.log("Status of secure mode is true.");
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * hubdeviceinterface.getSecureMode(onHubDeviceGetSecureModeCallback, onErrorCallback);
         *
         *
         */

        getSecureMode: function(onsuccess, onerror) {
            var cmd = "scpluginProdHubDeviceGetSecureMode";
            var args = {};
            args.id = this.hub.id;
            args.locationId = this.hub.locationId;
            args.callbackName = "__onNMProdHubDeviceGetSecureModeCallback";
            args.cmd = cmd;
            args.zigbeeId = this.hub.zigbeeId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api HubDeviceInterface.setFirmwareUpdateStatus(status,onHubDeviceSetFirmwareUpdateStatusCallback,onErrorCallback) void setFirmwareUpdateStatus()
         * @apiName setFirmwareUpdateStatus()
         * @apiGroup HubDeviceInterface
         * @apiDescription [In-House] Set the firmware update status of hub device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Object} status Firmware update status of hub device.
         * @apiParam {Boolean} status.enabled Status of enabled.
         * @apiParam {Boolean} status.lightsEnabled Status of lights enabled.
         * @apiParam {Function} onHubDeviceSetFirmwareUpdateStatusCallback Firmware update status callback function.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         *
         * function onHubDeviceSetFirmwareUpdateStatusCallback() {
         *
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * hubdeviceinterface.setFirmwareUpdateStatus({
         *  "enabled" : true,
         *  "lightsEnabled" : false
         * },onHubDeviceSetFirmwareUpdateStatusCallback, onErrorCallback);
         *
         *
         */

        setFirmwareUpdateStatus: function(status, onsuccess, onerror) {
            var cmd = "scpluginProdHubDeviceSetFirmwareUpdateStatus";
            var args = {};
            args.id = this.hub.id;
            args.locationId = this.hub.locationId;
            args.callbackName = "__onNMProdHubDeviceSetFirmwareUpdateStatusCallback";
            args.cmd = cmd;
            args.zigbeeId = this.hub.zigbeeId;
            args.status = status;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api HubDeviceInterface.setSecureMode(status,onHubDeviceSetSecureModeCallback,onErrorCallback) void setSecureMode()
         * @apiName setSecureMode()
         * @apiGroup HubDeviceInterface
         * @apiDescription [In-House] Set the secure mode status of hub device.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Boolean} status Status to set the secure mode.
         * @apiParam {Function} onHubDeviceSetSecureModeCallback Set secure mode callback function.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         *
         * function onHubDeviceSetSecureModeCallback() {
         *
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * hubdeviceinterface.setSecureMode(true, onHubDeviceSetSecureModeCallback, onErrorCallback);
         *
         *
         */

        setSecureMode: function(status, onsuccess, onerror) {
            var cmd = "scpluginProdHubDeviceSetSecureMode";
            var args = {};
            args.id = this.hub.id;
            args.locationId = this.hub.locationId;
            args.callbackName = "__onNMProdHubDeviceSetSecureModeCallback";
            args.cmd = cmd;
            args.status = status;
            args.zigbeeId = this.hub.zigbeeId;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
         * @api HubDeviceInterface.startMonitoringConnectionState(onHubDeviceMonitoringStateCallback,onErrorCallback) void startMonitoringConnectionState()
         * @apiName startMonitoringConnectionState()
         * @apiGroup HubDeviceInterface
         * @apiDescription Monitors hub device connection state [CONNECTED/DISCONNECTED] on cloud.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiParam {Function} onHubDeviceMonitoringStateCallback Receives updates from the server.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Hub device plugin
         *
         * function onHubDeviceMonitoringStateCallback(state) {
         *    if (state == "CONNECTED") {
         *        // Do something...
         *    } else if (state == "DISCONNECTED") {
         *        // Do something...
         *    } else if (state == "INACTIVE") {
         *        // Do something...
         *    } else if (state == "UNKNOWN") {
         *        // Do something...
         *    }
         * }
         *
         * hubdeviceinterface.startMonitoringConnectionState(onHubDeviceMonitoringStateCallback);
         */
        startMonitoringConnectionState: function(onHubDeviceMonitoringStateCallback, onErrorCallback) {
            var cmd = "scpluginProdHubDeviceStartMonitoringConnectionState";
            var args = {};
            args.id = this.hub.id;
            args.locationId = this.hub.locationId;
            args.callbackName = "__onNMProdHubDeviceMonitoringStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.id, args, onHubDeviceMonitoringStateCallback);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on plugin.");
                onErrorCallback(err);
            }
        },
        /**
         * @api HubDeviceInterface.stopMonitoringConnectionState() void stopMonitoringConnectionState()
         * @apiName stopMonitoringConnectionState()
         * @apiGroup HubDeviceInterface
         * @apiDescription Stops monitoring hub device state on cloud.
         * @apiVersion 1.3.0
         * @apiPermission platform
         * @apiProfile device
         * @apiPrivate
         *
         * @apiExample {js} Example usage: Hub device plugin
         *
         * hubdeviceinterface.stopMonitoringConnectionState();
         *
         */
        stopMonitoringConnectionState: function() {
            var cmd = "scpluginProdHubDeviceStopMonitoringConnectionState";
            var args = {};
            args.id = this.hub.id;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginProdHubDeviceStartMonitoringConnectionState" + this.id, args);
            } catch (e) {}
        },
    };

    /**
     * @api Automation
     * @apiName Automation
     * @apiGroup Automation
     * @apiDescription [In-House] Automation object. This object has only automation information.
     * @apiVersion 1.3.0
     * @apiPermission platform
     * @apiProfile common
     * @apiPrivate
     *
     * @apiParam {String} name  Name of this automation.
     * @apiParam {String} automationId Id of automation
     * @apiParam {String} locationId Current location id.
     * @apiParam {String} hidden Marking rule to hidden, should be set by true.
     * @apiParam {String} pluginDeviceId Device id of this device for checking this automation's owner.
     * @apiParam {String} customTag Custom tag for checking this automation's owner.
     * @apiParam {Object} timeCondition It should be need one Time or Schedule condition.
     * @apiParam {[Object]} deviceConditions Device conditions object array.
     * @apiParam {[Object]} deviceActions Device actions object array.
     * @apiParam {String} [enabled] Optional. Automation is created first default : "Enabled".<br />When status changed: "Enabled" or "Disabled".
     *
     * @apiExample {js} Example usage: Create Automation
     * function onCreateAutomationCallback(automation) {
     *   console.log("Properties of automation is : " + JSON.stringify(automation))
     * }
     *
     * window.scplugin.automationManager.createAutomation("2e56df23-9ac4-46bb-a418-6ca92a53130a", {
     *    "hidden": true,
     *    "automationId" : "by2311da-9da4-4ac6-b4c5-afd3db4d1489",
     *    "pluginDeviceId": "11111111-2222-3333-4444-555555555555",
     *    "enabled": "Enabled",
     *    "customTag": "API TEST CUSTOM TAG",
     *    "timeCondition": {
     *        "cType": "ScheduleCondition",
     *        "time": "44 13",
     *        "days": "MON,TUE,WED"
     *    },
     *    "deviceActions": [
     *        {
     *            "rt": "oic.r.switch.binary",
     *            "did": "9a2311da-9da4-4ac6-b4c5-afd3db4d1489",
     *            "href": "/capability/switch/0",
     *            "property": "value",
     *            "value": "false",
     *            "aType": "Action",
     *            // Enum type : string, boolean, integer, double
     *            "valueType": "string",
     *        }
     *    ],
     *    "name": "Unknown device+1561632526",
     *    "locationId": "2e56df23-9ac4-46bb-a418-6ca92a53130a"
     * }, onCreateAutomationCallback, onErrorCallback);
     *
     *
     */
    var automation = function(args) {
        Object.defineProperties(this, {
            automationId: {
                value: args.automationId,
                writable: false,
                enumerable: true
            },
            name: {
                value: args.name,
                writable: false,
                enumerable: true
            },
            locationId: {
                value: args.locationId,
                writable: false,
                enumerable: true
            },
            hidden: {
                value: args.hidden,
                writable: false,
                enumerable: true
            },
            pluginDeviceId: {
                value: args.pluginDeviceId,
                writable: false,
                enumerable: true
            },
            customTag: {
                value: args.customTag,
                writable: false,
                enumerable: true
            },
            timeCondition: {
                value: args.timeCondition,
                writable: false,
                enumerable: true
            },
            deviceConditions: {
                value: args.deviceConditions,
                writable: false,
                enumerable: true
            },
            deviceActions: {
                value: args.deviceActions,
                writable: false,
                enumerable: true
            },
            enabled: {
                value: args.enabled,
                writable: false,
                enumerable: true
            }
        });
    };

   /**
    * @api SystemInfo
    * @apiName SystemInfo
    * @apiGroup SystemInfo
    * @apiDescription [In-House] System information object. Gets information object from the parent device or register event listener.
    * @apiVersion 1.3.0
    * @apiPermission public
    * @apiProfile common
    *
    */
    var systemInfo = function() {
        Object.defineProperties(this, {
            theme: {
                value: new systemTheme(),
                writable: false,
                enumerable: true
            },
            mode: {
                value: new systemMode(),
                writable: false,
                enumerable: true
            }
        });
    };

    systemInfo.prototype = {
       /**
        * @api SystemInfo.getInfo(getInfoType,onGetInfoCallback,onErrorCallback) void getInfo()
        * @apiName getInfo()
        * @apiGroup SystemInfo
        * @apiDescription [In-House] Gets the time information of parent device (setting).
        * @apiVersion 1.3.1
        * @apiPermission public
        * @apiProfile common
        *
        * @apiParam {GetInfoType} getInfoType Type for getting information.
        * @apiParam {Function} onGetInfoCallback Get information type callback function.
        * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
        *
        * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
        * @apiError (Error) {APIError} InvalidValuesError if any of the input parameters contain an invalid value.
        * @apiError (Error) {APIError} UnknownError if any other error occurs.
        *
        * @apiUse GET_INFO_TYPE
        *
        * @apiExample {js} Example usage: "Time" type
        *
        * function onGetInfoCallback(resultData) {
        *   if(resultData.hoursClockType == "24h") {
        *       // 24 Clock Hours Type
        *   } else {
        *       // 12 Clock Hours Type
        *   }
        * }
        *
        * function onErrorCallback(error) {
        *     console.log("error name: " + error.name + " message: " + error.message);
        * }
        *
        * scplugin.systemInfo.getInfo("TIME", onGetInfoCallback, onErrorCallback);
        *
        * @apiExample {js} Example usage: "Theme" type
        *
        * scplugin.systemInfo.getInfo("THEME", function(systemTheme){
        *    systemTheme.isDarkModeEnabled(function(state){
        *      if(state == true) {
        *          console.log('Dark mode is on');
        *      } else {
        *          console.log('Dark mode is off');
        *      }
        *    }, function(e){
        *      console.log(e);
        *    });
        * });
        *
        * @apiExample {js} Example usage: "Mode" type
        *
        * scplugin.systemInfo.getInfo("MODE", function(systemMode){
        *    systemMode.isDexModeEnabled(function(state){
        *      if(state == true) {
        *          console.log('Dex mode is Enabled');
        *      } else {
        *          console.log('Dex mode is Disabled');
        *      }
        *    }, function(e){
        *      console.log(e);
        *    });
        * });
        *
        */

        getInfo: function(getInfoType, onsuccess, onerror) {
            getInfoType = getInfoType.toUpperCase();
            if(getInfoType == "THEME") {
                onsuccess(this.theme);
                return;
            }
            if(getInfoType == "MODE") {
                onsuccess(this.mode);
                return;
            }
            var getInfoEnum = {
                "TIME" : {
                    cmd : "scpluginSystemGetTimeInfo",
                    callback : "__onNMSystemGetTimeInfoCallback"
                }
            }
            if (undefined == getInfoEnum[getInfoType] || !!!getInfoEnum[getInfoType]) {
                var err = new window.scplugin._APIError("InvalidValuesError", "The input parameter contain an invalid value.");
                onerror(err);
            } else {
                var cmd = getInfoEnum[getInfoType].cmd;
                var args = {};
                args.callbackName = getInfoEnum[getInfoType].callback;
                args.cmd = cmd;
                try {
                    window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
                } catch (e) {
                    var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    onerror(err);
                }
            }
        }
    }

   /**
    * @api SystemTheme
    * @apiName SystemTheme
    * @apiGroup SystemTheme
    * @apiDescription System theme object. Gets current theme mode from mobile device or registers event listener. <br />This object can be getted from the SystemInfo object.
    * @apiVersion 1.3.0
    * @apiPermission public
    * @apiProfile common
    *
    * @apiSuccessExample {js} Gets "SystemTheme" object from "SystemInfo"
    *
    * scplugin.systemInfo.getInfo("THEME", function(systemTheme){
    *
    *    // systemTheme
    *    systemTheme.isDarkModeEnabled(function(state){
    *      if(state == true) {
    *          console.log('Dark mode is on');
    *      } else {
    *          console.log('Dark mode is off');
    *      }
    *    }, function(e){
    *      console.log(e);
    *    });
    *
    * });
    */
    var systemTheme = function(){

    }

    systemTheme.prototype = {
       /**
        * @api SystemTheme.isDarkModeEnabled(onIsDarkModeEnabledCallback,onErrorCallback) void isDarkModeEnabled()
        * @apiName isDarkModeEnabled()
        * @apiGroup SystemTheme
        * @apiDescription Gets information about dark mode. Returns true if dark mode.
        * @apiVersion 1.3.0
        * @apiPermission public
        * @apiProfile common
        *
        * @apiParam {Function} onIsDarkModeEnabledCallback Gets information about dark mode.
        * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
        *
        * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
        * @apiError (Error) {APIError} UnknownError if any other error occurs.
        *
        * @apiExample {js} Example usage:
        *
        * function onIsDarkModeEnabledCallback(state) {
        *   if(state == true) {
        *       console.log('Theme is dark mode.');
        *   }
        * }
        *
        * function onErrorCallback(error) {
        *     console.log("error name: " + error.name + " message: " + error.message);
        * }
        *
        * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
        *   systemTheme.isDarkModeEnabled(onIsDarkModeEnabledCallback, onErrorCallback);
        * }
        *
        *
        */

       isDarkModeEnabled: function(onsuccess, onerror) {
            var cmd = "scpluginSystemIsDarkModeEnabled";
            var args = {};
            args.callbackName = "__onNMSystemIsDarkModeEnabledCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
        * @api SystemTheme.isNightModeEnabled(onIsNightModeEnabledCallback,onErrorCallback) void isNightModeEnabled()
        * @apiName isNightModeEnabled()
        * @apiGroup SystemTheme
        * @apiDescription Gets information about night mode. Returns true if night mode.
        * @apiVersion 1.3.0
        * @apiPermission public
        * @apiProfile common
        *
        * @apiParam {Function} onIsNightModeEnabledCallback Gets information about night mode.
        * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
        *
        * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
        * @apiError (Error) {APIError} UnknownError if any other error occurs.
        *
        * @apiExample {js} Example usage:
        *
        * function onIsNightModeEnabledCallback(state) {
        *   if(state == true) {
        *       console.log('Theme is night mode.');
        *   }
        * }
        *
        * function onErrorCallback(error) {
        *     console.log("error name: " + error.name + " message: " + error.message);
        * }
        *
        * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
        *   systemTheme.isNightModeEnabled(onIsNightModeEnabledCallback, onErrorCallback);
        * }
        *
        *
        */
       isNightModeEnabled: function(onsuccess, onerror) {
            var cmd = "scpluginSystemIsNightModeEnabled";
            var args = {};
            args.callbackName = "__onNMSystemIsNightModeEnabledCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
        * @api SystemTheme.isInversionModeEnabled(onIsInversionModeEnabledCallback,onErrorCallback) void isInversionModeEnabled()
        * @apiName isInversionModeEnabled()
        * @apiGroup SystemTheme
        * @apiDescription Gets information about inversion mode. Returns true if inversion mode.
        * @apiVersion 1.3.0
        * @apiPermission public
        * @apiProfile common
        *
        * @apiParam {Function} onIsInversionModeEnabledCallback Gets information about inversion mode.
        * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
        *
        * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
        * @apiError (Error) {APIError} UnknownError if any other error occurs.
        *
        * @apiExample {js} Example usage:
        *
        * function onIsInversionModeEnabledCallback(state) {
        *   if(resultData == state) {
        *       console.log('Theme is inversion mode.');
        *   }
        * }
        *
        * function onErrorCallback(error) {
        *     console.log("error name: " + error.name + " message: " + error.message);
        * }
        *
        * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
        *   systemTheme.isInversionModeEnabled(onIsInversionModeEnabledCallback, onErrorCallback);
        * }
        *
        */
       isInversionModeEnabled: function(onsuccess, onerror) {
            var cmd = "scpluginSystemIsInversionModeEnabled";
            var args = {};
            args.callbackName = "__onNMSystemIsInversionModeEnabledCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api SystemTheme.setDarkModeListener(onDarkModeChangeCallback) void setDarkModeListener()
         * @apiName setDarkModeListener()
         * @apiGroup SystemTheme
         * @apiDescription Sets dark mode changes callback and monitors its state changes.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onDarkModeChangeCallback  Receives the state of dark mode theme change.
         *
         * @apiExample {js} Example usage:
         * function onDarkModeChangeCallback(state) {
         *  if(state == true) {
         *      console.log("Changed! Dark mode is on");
         *  } else {
         *      console.log("Changed! Dark mode is off");
         *  }
         * }
         *
         * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
         *   systemTheme.setDarkModeListener(onDarkModeChangeCallback);
         * }
         *
         */
        setDarkModeListener: function(callback) {
            var cmd = "scpluginSetDarkModeListener";
            var args = {};
            args.callbackName = "__onNMSystemSetDarkModeCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api SystemTheme.unsetDarkModeListener() void unsetDarkModeListener()
         * @apiName unsetDarkModeListener()
         * @apiGroup SystemTheme
         * @apiDescription Unsets dark mode state listener.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         *
         * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
         *   systemTheme.unsetDarkModeListener();
         * }
         *
         */
        unsetDarkModeListener: function() {
            var cmd = "scpluginUnsetDarkModeListener";
            var args = {};
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginSetDarkModeListener", args);
            } catch (e) {}
        },
        /**
         * @api SystemTheme.setNightModeListener(onNightModeChangeCallback) void setNightModeListener()
         * @apiName setNightModeListener()
         * @apiGroup SystemTheme
         * @apiDescription Sets night mode changes callback and monitors its state changes.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onNightModeChangeCallback Receives the state of night mode theme change.
         *
         * @apiExample {js} Example usage:
         * function onNightModeChangeCallback(state) {
         *  if(state == true) {
         *      console.log("Changed! Night mode is on");
         *  } else {
         *      console.log("Changed! Night mode is off");
         *  }
         * }
         *
         * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
         *   systemTheme.setNightModeListener(onNightModeChangeCallback);
         * }
         *
         */
        setNightModeListener: function(callback) {
            var cmd = "scpluginSetNightModeListener";
            var args = {};
            args.callbackName = "__onNMSystemSetNightModeCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api SystemTheme.unsetNightModeListener() void unsetNightModeListener()
         * @apiName unsetNightModeListener()
         * @apiGroup SystemTheme
         * @apiDescription Unsets night mode state listener.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         *
         * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
         *   systemTheme.unsetNightModeListener();
         * }
         *
         */
        unsetNightModeListener: function() {
            var cmd = "scpluginUnsetNightModeListener";
            var args = {};
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginSetNightModeListener", args);
            } catch (e) {}
        },
        /**
         * @api SystemTheme.setInversionModeListener(onInversionModeChangeCallback) void setInversionModeListener()
         * @apiName setInversionModeListener()
         * @apiGroup SystemTheme
         * @apiDescription Sets inversion mode changes callback and monitors its state changes.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onInversionModeChangeCallback Receives the state of inversion mode theme change.
         *
         * @apiExample {js} Example usage:
         * function onInversionModeChangeCallback(state) {
         *  if(state == true) {
         *      console.log("Changed! Inversion mode is on");
         *  } else {
         *      console.log("Changed! Inversion mode is off");
         *  }
         * }
         *
         * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
         *   systemTheme.setInversionModeListener(onInversionModeChangeCallback);
         * }
         *
         */
        setInversionModeListener: function(callback) {
            var cmd = "scpluginSetInversionModeListener";
            var args = {};
            args.callbackName = "__onNMSystemSetInversionModeCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api SystemTheme.unsetInversionModeListener() void unsetInversionModeListener()
         * @apiName unsetInversionModeListener()
         * @apiGroup SystemTheme
         * @apiDescription Unsets inversion mode state listener.
         * @apiVersion 1.3.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         *
         * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
         *   systemTheme.unsetInversionModeListener();
         * }
         *
         */
        unsetInversionModeListener: function() {
            var cmd = "scpluginUnsetInversionModeListener";
            var args = {};
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginUnsetInversionModeListener", args);
            } catch (e) {}
        },

        /**
         * @api SystemTheme.setStatusBarContentTheme() void setStatusBarContentTheme()
         * @apiName setStatusBarContentTheme()
         * @apiGroup SystemTheme
         * @apiDescription Change the theme of contents on status bar. This changes char and icon color
         * @apiVersion 1.3.5
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} theme Theme information
         * @apiParam {Function} onSetStatusBarContentThemeCallback Receives whether the theme has been changed.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onSetStatusBarContentThemeCallback(state) {
         *     // if iOS is 13 or above we can send back true instantly , otherwise false
         *     if (state) {
         *         console.log("The theme has been changed successfully.");
         *     } else {
         *         console.log("Theme change failed.");
         *     }
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.systemInfo.getInfo("THEME",function(systemTheme){
         *   var theme = "LIGHT" // or "DARK"
         *   systemTheme.setStatusBarContentTheme(theme, onSetStatusBarContentThemeCallback, onErrorCallback);
         * }
         *
         */
        setStatusBarContentTheme: function(theme, onsuccess, onerror) {
            var cmd = "scpluginSetStatusBarContentTheme";
            var args = {};
            args.callbackName = "__onNMSystemSetStatusBarContentThemeCallback"
            args.cmd = cmd;
            args.theme = theme
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
    }

    /**
    * @api SystemMode
    * @apiName SystemMode
    * @apiGroup SystemMode
    * @apiDescription System mode object. Gets current mode from mobile device or registers event listener. <br />This object can be getted from the SystemInfo object.
    * @apiVersion 1.3.1
    * @apiPermission public
    * @apiProfile common
    *
    * @apiSuccessExample {js} Gets "SystemMode" object from "SystemInfo"
    *
    * scplugin.systemInfo.getInfo("MODE", function(systemMode){
    *
    *    // systemMode
    *    systemMode.isDexModeEnabled(function(state){
    *      if(state == true){
    *          console.log('Dex mode is Enabled');
    *      } else {
    *          console.log('Dex mode is Disabled');
    *      }
    *    }, function(e){
    *      console.log(e);
    *    });
    *
    * });
    */
    var systemMode = function(){

    }

    systemMode.prototype = {
       /**
        * @api SystemMode.isDexModeEnabled(onIsDexModeEnabledCallback,onErrorCallback) void isDexModeEnabled()
        * @apiName isDexModeEnabled()
        * @apiGroup SystemMode
        * @apiDescription Gets information about dex mode. Returns state of dex mode.
        * @apiVersion 1.3.1
        * @apiPermission public
        * @apiProfile common
        *
        * @apiParam {Function} onIsDexModeEnabledCallback Gets information about dex mode.
        * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
        *
        * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
        * @apiError (Error) {APIError} UnknownError if any other error occurs.
        *
        * @apiExample {js} Example usage:
        *
        * function onIsDexModeEnabledCallback(state) {
        *   if(state == true) {
        *       console.log('Dex mode is Enabled');
        *   } else {
        *       console.log('Dex mode is Disabled');
        *   }
        * }
        *
        * function onErrorCallback(error) {
        *     console.log("error name: " + error.name + " message: " + error.message);
        * }
        *
        * scplugin.systemInfo.getInfo("MODE",function(systemMode){
        *   systemMode.isDexModeEnabled(onIsDexModeEnabledCallback, onErrorCallback);
        * }
        *
        *
        */

       isDexModeEnabled: function(onsuccess, onerror) {
            var cmd = "scpluginSystemIsDexModeEnabled";
            var args = {};
            args.callbackName = "__onNMSystemIsDexModeEnabledCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },

        /**
        * @api SystemMode.getDexModeType(onGetDexModeTypeCallback,onErrorCallback) void getDexModeType()
        * @apiName getDexModeType()
        * @apiGroup SystemMode
        * @apiDescription Gets type about dex mode. Returns type of dex mode.
        * @apiVersion 1.3.1
        * @apiPermission public
        * @apiProfile common
        *
        * @apiParam {Function} onGetDexModeTypeCallback Gets type about dex mode.
        * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
        *
        * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
        * @apiError (Error) {APIError} UnknownError if any other error occurs.
        *
        * @apiExample {js} Example usage:
        *
        * function onGetDexModeTypeCallback(type) {
        *   if(type == 'STANDALONE') {
        *       console.log('Dex mode is Standalone');
        *   } else if(type == 'DUAL') {
        *       console.log('Dex mode is dual')
        *   } else if(type == 'NONE') {
        *       console.log('Dex mode return NONE')
        *   }
        * }
        *
        * function onErrorCallback(error) {
        *     console.log("error name: " + error.name + " message: " + error.message);
        * }
        *
        * scplugin.systemInfo.getInfo("MODE",function(systemMode){
        *   systemMode.getDexModeType(ongetDexModeTypeCallback, onErrorCallback);
        * }
        *
        *
        */

       getDexModeType: function(onsuccess, onerror) {
        var cmd = "scpluginSystemGetDexModeType";
        var args = {};
        args.callbackName = "__onNMSystemGetDexModeTypeCallback";
        args.cmd = cmd;
        try {
            window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
        } catch (e) {
            var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
            onerror(err);
        }
    },

    /**
        * @api SystemMode.isTabletMode(onIsTabletModeCallback,onErrorCallback) void isTabletMode()
        * @apiName isTabletMode()
        * @apiGroup SystemMode
        * @apiDescription Gets Flag to indicate if tablet mode. Returns state of tablet mode.
        * @apiVersion 1.3.4
        * @apiPermission public
        * @apiProfile common
        *
        * @apiParam {Function} onIsTabletModeCallback Gets Flag to indicate if tablet mode.
        * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
        *
        * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
        * @apiError (Error) {APIError} UnknownError if any other error occurs.
        *
        * @apiExample {js} Example usage:
        *
        * function onIsTabletModeCallback(state) {
        *   if(state == true) {
        *       console.log("It is Tablet mode");
        *   }
        * }
        *
        * function onErrorCallback(error) {
        *   console.log("error name: " + error.name + " message: " + error.message);
        * }
        *
        * scplugin.systemInfo.getInfo("MODE", function(systemMode){
        *   systemMode.isTabletMode(onIsTabletModeCallback, onErrorCallback);
        * }
        *
        */

       isTabletMode: function(onsuccess, onerror) {
        var cmd = "scpluginSystemIsTabletMode";
        var args = {};
        args.callbackName = "__onNMSystemIsTabletModeCallback";
        args.cmd = cmd;
        try {
            window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
        } catch (e) {
            var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
            onerror(err);
        }
    },

    /**
        * @api SystemMode.isTabletDevice(onIsTabletDeviceCallback,onErrorCallback) void isTabletDevice()
        * @apiName isTabletDevice()
        * @apiGroup SystemMode
        * @apiDescription Gets Flag to indicate if tablet device. Returns state of tablet device.
        * @apiVersion 1.3.4
        * @apiPermission public
        * @apiProfile common
        *
        * @apiParam {Function} onIsTabletDeviceCallback Gets Flag to indicate if tablet device.
        * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
        *
        * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
        * @apiError (Error) {APIError} UnknownError if any other error occurs.
        *
        * @apiExample {js} Example usage:
        *
        * function onIsTabletDeviceCallback(state) {
        *   if(state == true) {
        *       console.log('It is Tablet Device');
        *   }
        * }
        *
        * function onErrorCallback(error) {
        *     console.log("error name: " + error.name + " message: " + error.message);
        * }
        *
        * scplugin.systemInfo.getInfo("MODE",function(systemMode){
        *   systemMode.isTabletDevice(onIsTabletDeviceCallback, onErrorCallback);
        * }
        *
        *
        */

       isTabletDevice: function(onsuccess, onerror) {
        var cmd = "scpluginSystemIsTabletDevice";
        var args = {};
        args.callbackName = "__onNMSystemIsTabletDevice";
        args.cmd = cmd;
        try {
            window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
        } catch (e) {
            var err = new window.scplugin._APIError("NotSupportedError", "This feature is not supported on this plugin.");
            onerror(err);
        }
    },
}

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
    };

    _APIError.prototype = new _APIError();
    _APIError.prototype.constructor = _APIError;

    var _scplugin = function() {
        this.manager = new manager();
        // this.automationManager = new automationManager();
        this.systemInfo = new systemInfo();
        this.log = new log();
        this._scPluginNative = new NativeManager();
        this.analyticsLog = new AnalyticsLog();
        this.smartKit = new SmartKit();
        this.video = new Video();
        this.bluetooth = new Bluetooth();
        this.d2dManager = new D2dManager();
        Object.defineProperties(this, {
            apiVersion: {
                value: "1.3.5_201026",
                writable: false,
                enumerable: true
            }
        });

        const errors = {
            SECURITY_ERR: new _APIError('SecurityError', 'This plugin does not have the permission to call this method.'),
            NOT_SUPPORTED_ERR: new _APIError('NotSupportedError', 'This feature is not supported on this plugin.'),
            NOT_INSTALLED: new _APIError('NotInstalled', 'The target plugin is not installed.'),
            INVALID_VALUE_ERR: new _APIError('InvalidValuesError', 'Any of the input parameters contain an invalid value.'),
            INVALID_PARAM_ERR: new _APIError('InvalidParamError', 'There is any ommited parameter.'),
            INTERNAL_ERROR: new _APIError('InternalError', 'Internal error.'),
            NOT_FOUND_ERR: new _APIError('NotFoundError', 'Not found error.'),
            INVALID_STATE_ERR: new _APIError('InvalidStateError', 'Invalid state.'),
            FAILED: new _APIError('FailedError', 'Operation is Failed.'),
            UNKNOWN_ERR: new _APIError('UnknownError', 'Unknown error.')
        };

        const invokeApiCallback = function(apiCallback, ...args) {
            const timerCallback = function() {
                try {
                    apiCallback(...args);
                } catch (e) {
                    console.log(e);
                }
            };
            setTimeout(timerCallback, 0);
        };

        this.handleApiResult = (result, ...args) => {
            try {
                if (result.result !== 'SUCCESS') {
                    const f = this._scPluginNative.getErrorCallback(result);
                    const error = errors[result.result];
                    invokeApiCallback(f, error ? error : errors['UNKNOWN_ERR']);
                } else {
                    const f = this._scPluginNative.getCallback(result);
                    invokeApiCallback(f, ...args);
                }
            } catch (e) {
                console.error(e);
            }
        };
    }
    _scplugin.prototype._APIError = _APIError;
    _scplugin.prototype._getOCFDevices = function(devices) {
        var deviceList = new Array();
        deviceList.push(new OCFDevice(devices));
        return deviceList;
    };
    _scplugin.prototype._getService = function(service) {
        return new Service(service);
    };
    _scplugin.prototype._getVideoClips = function(clips) {
        var clipList = new Array();
        for (var i in clips) {
            clipList.push(new VideoClip(clips[i]));
        }
        return clipList;
    };
    _scplugin.prototype._getBLEDevice = function(device) {
        return new BLEDevice(device);
    };
    _scplugin.prototype._getBluetoothLEDevice = function(device) {
        return new BluetoothLEDevice(device);
    };
    _scplugin.prototype._getBluetoothGATTService = function(services) {
        var serviceList = new Array();
        for (var i in services) {
            serviceList.push(new BluetoothGATTService(services[i]));
        }
        return serviceList;
    };
    _scplugin.prototype._getBluetoothGATTCharacteristics = function(characteristics) {
        var characteristicList = new Array();
        for (var i in characteristics) {
            characteristicList.push(new BluetoothGATTCharacteristic(characteristics[i]));
        }
        return characteristicList;
    };
    _scplugin.prototype._getBluetoothGATTDescriptors = function(descriptors) {
        var descriptorList = new Array();
        for (var i in descriptors) {
            descriptorList.push(new BluetoothGATTDescriptor(descriptors[i]));
        }
        return descriptorList;
    };
    _scplugin.prototype._getHubDeviceInterface = function(properties) {
        return new HubDeviceInterface(properties);
    };
    _scplugin.prototype._getAutomationObject = function(properties) {
        return new automation(properties);
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
 * @apiDefine NAVIGAETE_RESULT NAVIGAETE_RESULT
 * @apiError (result) USER_OK Success status code
 * @apiError (result) USER_CANCEL Cancel status code by user
 */

 /**
 * @apiDefine CHANGED_DEVICE_STATE CHANGED_DEVICE_STATE
 * @apiError (deviceState) add Device was added
 * @apiError (deviceState) update Device was updated
 * @apiError (deviceState) delete Device was removed
 */

 /**
 * @apiDefine CHANGED_AUTOMATION_STATE CHANGED_AUTOMATION_STATE
 * @apiError (deviceState) add Automation was added
 * @apiError (deviceState) update Automation was updated
 * @apiError (deviceState) delete Automation was removed
 */

 /**
 * @apiDefine HUB_STATUS_TYPE HUB_STATUS_TYPE
 * @apiError (HubStatusType) {String} HUB_PRIMARY_ZWAVE_CONTROLLER The status of primary Z-Wave controller is enable.
 * @apiError (HubStatusType) {String} ZWAVE_ENABLED The status of Z-Wave(Add/Remove/Repair/Replace) feature is enable.
 * @apiError (HubStatusType) {String} ZWAVE_ADDED The status of Z-Wave devices added to SmartThings hub.
 */

/**
 * @apiDefine REQUEST_RESULT REQUEST_RESULT
 * @apiError (result) SUCCESS Successful
 * @apiError (result) SECURITY_ERR Permission denied
 * @apiError (result) INVALID_VALUE_ERR Invalid parameter
 * @apiError (result) NOT_SUPPORTED_ERR Not supported feature
 * @apiError (result) NOT_AVAILABLE_ERR Not Available
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

/**
 * @apiDefine NAVIGATION_VIEW_TYPE NAVIGATION_VIEW_TYPE
 * @apiError (NavigationViewType) {String} GEOLOCATION_SETTING_VIEW For geolocation setting page. Since v1.2.3.
 * @apiError (NavigationViewType) {String} HOW_TO_USE_VIEW For How to use page. Since v1.3.0.
 * @apiError (NavigationViewType) {String} NOTICES_VIEW For Notices page. Since v1.3.0.
 * @apiError (NavigationViewType) {String} CONTACT_US_VIEW For Contact us page. Since v1.3.0.
 * @apiError (NavigationViewType) {String} COMMUNITY_VIEW For Community page. Since v1.3.0.
 * @apiError (NavigationViewType) {String} BUY_DEVICE_VIEW For Buy device page. Since v1.3.0.
 * @apiError (NavigationViewType) {String} HUB_MIGRATION_VIEW For Hub Migration Tool page. Since v1.3.1.
 * @apiError (NavigationViewType) {String} USE_PHONE_LOCATION For Use Phone Location page. Since v1.3.1.
 * @apiError (NavigationViewType) {String} EDIT_DEVICE_DETAIL_VIEW To edit device details Since v1.3.4.
 * @apiError (NavigationViewType) {String} BARCODE_SCAN_VIEW For Barcode Scan page Since v1.3.4.
 * @apiError (NavigationViewType) {String} ONLINE_MALL_VIEW For Online Mall page Since v1.3.4.
 * @apiError (NavigationViewType) {String} MAIN_DASHBOARD_VIEW For Main Dashboard page Since v1.3.5.
 * @apiError (NavigationViewType) {String} SETTINGAPPS_LOCATION_SOURCE For GPS in Setting App page. Since v1.3.5.
 * @apiError (NavigationViewType) {String} SETTINGAPPS_BLUETOOTH For BT in Setting App page. Since v1.3.5.
 */

 /**
 * @apiDefine SETTING_CONFIG_TYPE SETTING_CONFIG_TYPE
 * @apiError (SettingConfigType) {String} USE_PHONE_LOCATION For Use Phone Location value. Since v1.3.1.
 */

 /**
 * @apiDefine AUTOMATION_NAVIGATION_VIEW_TYPE AUTOMATION_NAVIGATION_VIEW_TYPE
 * @apiError (NavigationViewType) {String} ADD_AUTOMATION_VIEW For add automation page. <br />It should has the extraData : { "locationId" : "", "uri" : "", "attr" : "", "value" : "", "tag" : ""}
 * @apiError (NavigationViewType) {String} EDIT_AUTOMATION_VIEW For edit automation page
 */


/**
 * @apiDefine DEVICE_NAVIGATION_VIEW_TYPE DEVICE_NAVIGATION_VIEW_TYPE
 * @apiError (DeviceNavigationViewType) {String} EDIT_DEVICE_DETAIL_VIEW To edit device details
 */

/**
 * @apiDefine HUB_DEVICE_NAVIGATION_VIEW_TYPE HUB_DEVICE_NAVIGATION_VIEW_TYPE
 * @apiError (HubDeviceViewType) {String} ZWAVE_SETTING_VIEW launch the Z-Wave setting page.
 * @apiError (HubDeviceViewType) {String} JOIN_ZWAVE_NETWORK_VIEW launch the Join Z-Wave network page.
 * @apiError (HubDeviceViewType) {String} LEAVE_ZWAVE_NETWORK_VIEW launch the Leave Z-Wave network page.
 * @apiError (HubDeviceViewType) {String} REPAIR_ZWAVE_NETWORK_VIEW launch the Repair Z-Wave network page.
 * @apiError (HubDeviceViewType) {String} ZWAVE_EXCLUSION_VIEW launch the Exclusion Z-Wave network page.
 */
/**
 * @apiDefine COUNTRYCODE_SOURCE_TYPE COUNTRYCODE_SOURCE_TYPE
 * @apiError (CountryCodeSourceType) {String} ST_GEOLOCATION Based on user-set Geolocation in SmartThings app
 * @apiError (CountryCodeSourceType) {String} GPS Based on GPS coordinates
 * @apiError (CountryCodeSourceType) {String} LOCALE Based on locale setting
 */

 /**
 * @apiDefine VIDEO_CLIP_TYPE VIDEO_CLIP_TYPE
 * @apiError (VideoClipType) {string} MEDIA Media type
 * @apiError (VideoClipType) {string} THUMBNAIL Thumbnail type
 */

 /**
 * @apiDefine FIRMWARE_AVAILABLE_TYPE FIRMWARE_AVAILABLE_TYPE
 * @apiError (FirmwareAvailableType) {string} YES Available type
 * @apiError (FirmwareAvailableType) {string} NO Unavailable type
 * @apiError (FirmwareAvailableType) {string} UNKNOWN Unknown type
 */

/**
 * @apiDefine GET_INFO_TYPE GET_INFO_TYPE
 * @apiError (GetInfoType) {String} TIME Get system setting about hours clock type.
 * @apiError (GetInfoType) {String} THEME Get system theme object.<br />(This is not request call, Only theme objects get it.)
 * @apiError (GetInfoType) {String} MODE Get system mode object.<br />(This is not request call, Only mode objects get it.)
 */

/**
 * @apiDefine MANAGED_SERVICE_TYPE MANAGED_SERVICE_TYPE
 * @apiError (ManagedServiceType) {String} CAMERA_CLIP Camera Clip Service
 * @apiError (ManagedServiceType) {String} CAMERA_MY_INFO Camera MyInfo Service
 */


// For Callback Function Definition
/**
 * @api onRepresentCallback(result,deviceHandle,uri,representation) void onRepresentCallback()
 * @apiName onRepresentCallback
 * @apiGroup OCFDevice
 * @apiDescription Gets response from cloud.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "OCF_OK" when there is no problem, appropriate error code otherwise.
 * @apiParam {String} deviceHandle Unique local device ID from which representation received.
 * @apiParam {String} uri URI of resource from which representation received.
 * @apiParam {Object} representation Representation received from server. JSON Object.
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
 * @apiGroup OCFDevice
 * @apiDescription Gets device connection state from cloud.
 * @apiVersion 1.1.0
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
 * @apiGroup Plugin manager
 * @apiDescription Gets plugin data from data table.
 * @apiVersion 1.1.0
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
 * @api onSecurePluginDataCallback(key,value) void onSecurePluginDataCallback()
 * @apiName onSecurePluginDataCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets plugin data from data table. (In secure mode supported)
 * @apiVersion 1.3.2
 *
 * @apiParam {String} key The key to search mapped data.
 * @apiParam {String} value The value assigned to the requested key. Note that if the key is not found, null is passed.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onSecurePluginDataCallback(key, value) {
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
 * @apiGroup Plugin manager
 * @apiDescription Gets application state.
 * @apiVersion 1.1.0
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
 * @api onDeleteCloudDeviceCallback(state) void onDeleteCloudDeviceCallback()
 * @apiName onDeleteCloudDeviceCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets flag to indicate if delete the cloud device.
 * @apiVersion 1.3.5
 *
 * @apiParam {Bool} state Fag to indicate if delete the cloud device.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onDeleteCloudDeviceCallback(state) {
 *    if (state) {
 *       console.log("The cloud device was deleted successfully.");
 *    }
 * }
 *
 */

/**
 * @api onEnableMobileBluetoothCallback(state) void onEnableMobileBluetoothCallback()
 * @apiName onEnableMobileBluetoothCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets flag if enabled mobile bluetooth.
 * @apiVersion 1.3.5
 *
 * @apiParam {Bool} state State of mobile bluetooth. if bluetoooth is turn on, state is true. else state is false
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onEnableMobileBluetoothCallback(state) {
 *    if (state) {
 *       console.log("The mobile bluetooth was enabled successfully.");
 *    }
 * }
 *
 */

/**
 * @api onDisableMobileBluetoothCallback(state) void onDisableMobileBluetoothCallback()
 * @apiName onDisableMobileBluetoothCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets flag if disabled mobile bluetooth.
 * @apiVersion 1.3.5
 *
 * @apiParam {Bool} state State of mobile bluetooth. if bluetoooth is turn on, state is true. else state is false
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onDisableMobileBluetoothCallback(state) {
 *    if (!state) {
 *       console.log("The mobile bluetooth was disabled successfully.");
 *    }
 * }
 *
 */

/**
 * @api onCloudConnectionStateCallback(state) void onCloudConnectionStateCallback()
 * @apiName onCloudConnectionStateCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets cloud connection state.(Sign in/Sign out).
 * @apiVersion 1.1.0
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
 * @api onBluetoothStateCallback(state) void onBluetoothStateCallback()
 * @apiName onBluetoothStateCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets Bluetooth connection state.
 * @apiVersion 1.3.5
 *
 * @apiParam {String} state Bluetooth connection state. ("CONNECTED" / "DISCONNECTED")
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onBluetoothStateCallback(state) {
 *     if (state == "ON") {
 *         // Do something...
 *     } else if (state == "OFF") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onGPSStateCallback(state) void oGPSStateCallback()
 * @apiName onGPSStateCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets GPS connection state.
 * @apiVersion 1.3.5
 *
 * @apiParam {String} state GPS connection state. ("CONNECTED" / "DISCONNECTED")
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGPSStateCallback(state) {
 *     if (state == "ON") {
 *         // Do something...
 *     } else if (state == "OFF") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onNetworkReachabilityStateCallback(state) void onNetworkReachabilityStateCallback()
 * @apiName onNetworkReachabilityStateCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets network connection state.
 * @apiVersion 1.3.2
 *
 * @apiParam {String} state network connection state. ("CONNECTED" / "DISCONNECTED")
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onNetworkReachabilityStateCallback(state) {
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
 * @apiGroup Plugin manager
 * @apiDescription Gets device list.
 * @apiVersion 1.1.0
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
 * @api onDeviceCallback(devices) void onDeviceCallback()
 * @apiName onDeviceCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets device.
 * @apiVersion 1.3.5
 *
 * @apiParam {Object} device The Device object.
 * @apiParam {String} device.deviceId Unique global ID that supports platform level only
 * @apiParam {String} device.deviceName Device name.
 * @apiParam {String} device.deviceType DeviceType Uri.
 * @apiParam {String} device.deviceOwner Device permission of user. ("me" or "others")
 * @apiParam {String} device.firmwareVersion Device firmware version.
 * @apiParam {Object} device.metaData UIMetadata of device. JSON Object.
 * @apiParam {String} device.roomId Room Id of device.
 * @apiParam {String} device.roomName Room name of device.
 * @apiParam {String} device.locationId Location Id of device.
 * @apiParam {String} device.locationName Location name of device.
 * @apiParam {String} device.deviceHandle Unique local ID.
 * @apiParam {String} device.packageHandle Unique local ID of Package.
 * @apiParam {Object} device.extraData Extra data received from launcher. The extraData is supported since v1.1.0. JSON Object.
 *
 * @apiExample {js} Callback Function - Example usage: Device plugin
 * function onDeviceCallback(device) {
 *    console.log("deviceId: " + device.deviceId);
 *    console.log("deviceName: " + device.deviceName);
 *    console.log("deviceType: " + device.deviceType);
 *    console.log("deviceOwner: " + device.deviceOwner);
 *    console.log("firmwareVersion: " + device.firmwareVersion);
 *    console.log("metadata: " + device.metadata);
 *    console.log("roomId: " + device.roomId);
 *    console.log("roomName: " + device.roomName);
 *    console.log("locationId: " + device.locationId);
 *    console.log("locationName: " + device.locationName);
 *    console.log("deviceHandle: " + device.deviceHandle);
 *    console.log("packageHandle: " + device.packageHandle);
 *    console.log("extraData: " + device.extraData);
 * }
 *
 * scplugin.manager.getDevice(onDeviceCallback);
 */

/**
 * @api onServiceCallback(service) void onServiceCallback()
 * @apiName onServiceCallback
 * @apiGroup Plugin manager
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
 * @apiGroup Service
 * @apiDescription Gets event data from endpoint app.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 * @apiParam {Object} event Event receives from endpoint app. JSON Object.
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
 * @apiGroup Service
 * @apiDescription Gets the response data from endpoint app.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 * @apiParam {Object} response Response User defined data received from endpoint app. JSON Object.
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
 * @apiGroup Service
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
 * @api onSMCSInfoCallback void onSMCSInfoCallback()
 * @apiName onSMCSInfoCallback
 * @apiGroup Service
 * @apiDescription get the SMCSInfo(Samsung Mobile Content System)
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} SMCSInformation JSON Object.
 *
 * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
 * @apiError (Error) {APIError} UnknownError if any other error occurs.
 *
 * @apiExample {js} Example usage: Service plugin
 * // Assume service object has been obtained by using scplugin.manager.getService() method.
 * function onSMCSInfoCallback(response) {
 *     console.log("SMCSInfo request has been sent successfully");
 *     console.log("SMCSInfo : " + JSON.stringify(response));
 * }
 * function onErrorCallback(error) {
 *     console.log("error name: " + error.name + " message: " + error.message);
 * }
 *
 */

/**
 * @api onCreateShortcutCallback void onCreateShortcutCallback()
 * @apiName onCreateShortcutCallback
 * @apiGroup Service
 * @apiDescription It will be called if shortcut is created successfully (Only Android)
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
 * @apiError (Error) {APIError} UnknownError if any other error occurs.
 *
 * @apiExample {js} Example usage: Service plugin
 * // Assume service object has been obtained by using scplugin.manager.getService() method.
 * function onCreateShortcutCallback() {
 *     console.log("Shortcut created successed");
 * }
 */

/**
 * @api onSAAuthCodeCallback(result,authCode,authUrl,apiUrl,state) void onSAAuthCodeCallback()
 * @apiName onSAAuthCodeCallback
 * @apiGroup Plugin manager
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
 * @api onSAAuthCodeForServiceCallback(result,authCode,authUrl,apiUrl,state) void onSAAuthCodeForServiceCallback()
 * @apiName onSAAuthCodeForServiceCallback
 * @apiGroup Plugin manager
 * @apiDescription Gets authCode and URL.
 * @apiVersion 1.3.1
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
 * function onSAAuthCodeForServiceCallback(result, authCode, authUrl, apiUrl, state) {
 *     if (result == "SUCCESS") {
 *         console.log("authCode: " + authCode + " authUrl: " + authUrl + " apiUrl: " + apiUrl + " state: " + state);
 *     }
 * }
 *
 */

/**
 * @api onErrorCallback(error) void onErrorCallback()
 * @apiName onErrorCallback
 * @apiGroup Plugin manager
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
 * @api onIsApplicationInstalledCallback(id,state) void onIsApplicationInstalledCallback()
 * @apiName onIsApplicationInstalledCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Method invoked when the invocation ends successfully.
 * @apiVersion 1.2.5
 * @apiPrivate
 *
 * @apiParam {String} id Identifier of the corresponding operation.
 * @apiParam {Boolean} state true if application is installed, otherwise false if the application is not installed.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onIsApplicationInstalledCallback(id, state) {
 *     console.log("isApplicationInstalled : " + state);
 * }
 *
 */

/**
 * @api onLaunchServicePluginCallback(pluginId) void onLaunchServicePluginCallback()
 * @apiName onLaunchServicePluginCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Method invoked when the invocation ends successfully.
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {String} pluginId Unique Plugin ID. of the corresponding operation.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onLaunchServicePluginCallback(pluginId) {
 *     console.log("The Service plugin has launched successfully. : " + pluginId);
 * }
 *
 */

/**
 * @api onLaunchApplicationCallback(id) void onLaunchApplicationCallback()
 * @apiName onLaunchApplicationCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Method invoked when the invocation ends successfully.
 * @apiVersion 1.2.5
 * @apiPrivate
 *
 * @apiParam {String} id Identifier of the corresponding operation.
 *
 * @apiUse APP_LINK_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onLaunchApplicationCallback(id) {
 *     console.log("The application has launched successfully. : " + id);
 * }
 *
 */

/**
 * @api onLaunchPluginCallback(deviceId) void onLaunchPluginCallback()
 * @apiName onLaunchPluginCallback
 * @apiGroup Service
 * @apiDescription [In-House] Method invoked when the invocation ends successfully.
 * @apiVersion 1.1.1
 * @apiPrivate
 *
 * @apiParam {String} deviceId Unique device ID of the corresponding operation.
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onLaunchPluginCallback(deviceId) {
 *     console.log("The Device plugin has launched successfully. : " + deviceId);
 * }
 *
 */

/**
 * @api onLocationNicknameCallback(nickname) void onLocationNicknameCallback()
 * @apiName onLocationNicknameCallback
 * @apiGroup Service
 * @apiDescription [In-House] Gets Location nickname.
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
 * @api onGeoLocationCallback(geoLocation) void onGeoLocationCallback()
 * @apiName onGeoLocationCallback
 * @apiGroup Service
 * @apiDescription [In-House] Gets Geolocation
 * @apiVersion 1.3.1
 * @apiPrivate
 *
 * @apiParam {String} geoLocation The Geo location.
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onGeoLocationCallback(geoLocation) {
 *     if (geoLocation != null) {
 *         console.log("GeoLocation latitude" + geoLocation.latitude);
 *         console.log("GeoLocation longitude" + geoLocation.longitude);
 *     } else {
 *         console.log("GeoLoaction is not available")
 *     }
 * }
 *
 */

/**
 * @api onUsePhoneLocationCallback(IsUsePhoneLocation) void onUsePhoneLocationCallback()
 * @apiName onUsePhoneLocationCallback
 * @apiGroup Service
 * @apiDescription [In-House] Gets Flag to indicate if Use phone location.
 * @apiVersion 1.3.1
 * @apiPrivate
 *
 * @apiParam {String} IsUsePhoneLocation Flag to indicate if Use phone location.
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onUsePhoneLocationCallback(IsUsePhoneLocation) {
 *     if (IsUsePhoneLocation) {
 *         console.log("This Location use phone location");
 *     } else {
 *         console.log("This Location do not use phone location")
 *     }
 * }
 *
 */

/**
 * @api onShareTextCallback() void onShareTextCallback()
 * @apiName onShareTextCallback
 * @apiGroup Service
 * @apiDescription Method invoked when text sharing request has been completed.
 * @apiVersion 1.2.0
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onShareTextCallback() {
 *     console.log("Text sharing request has been sent successfully");
 * }
 *
 */

/**
 * @api onRequestSsoToCallback() void onRequestSsoToCallback()
 * @apiName onRequestSsoToCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Method invoked when the web view launches to get Web SSO token successfully.
 * @apiVersion 1.2.2
 * @apiPrivate
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onRequestSsoToCallback() {
 *     console.log("The web view to get SSO token has been launched successfully.");
 * }
 *
 */

/**
 * @api onNavigateToCallback(NavigationViewType,resultData) void onNavigateToCallback()
 * @apiName onNavigateToCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Method invoked when the invocation ends successfully.
 * @apiVersion 1.2.3
 * @apiPrivate
 *
 * @apiParam {NavigationViewType} navigationViewType Navigation Link Type of the corresponding operation.
 * @apiParam {Object} [resultData] Optional. Result data received from view page. JSON Object.
 *
 * @apiSuccessExample {JSON} resultData of GEOLOCATION_SETTING_VIEW
 *   // Success response
 *   "USER_OK"
 *
 *   // User canceled response
 *   "USER_CANCEL"
 *
 * @apiUse NAVIGATION_VIEW_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onNavigateToCallback(navigationViewType, resultData) {
 *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
 * }
 *
 */

/**
 * @api onCountryCodeCallback(sourceType,countryCode) void onCountryCodeCallback()
 * @apiName onCountryCodeCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Receives country code.
 * @apiVersion 1.2.4
 * @apiPrivate
 *
 * @apiParam {CountryCodeSourceType} sourceType Country code source Type of the corresponding operation.
 * @apiParam {String} countryCode The country code based on specified source.
 * The value of country code is in the ISO 3166-1 alpha-2 format. for example "US", "KR", or null if it is unknown.
 *
 * @apiUse COUNTRYCODE_SOURCE_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onCountryCodeCallback(sourceType, countryCode) {
 *     console.log("Country code type : " + sourceType + " value : " + countryCode);
 * }
 *
 */

/**
 * @api onSetKeepScreenOnCallback() void onSetKeepScreenOnCallback()
 * @apiName onSetKeepScreenOnCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Invokes when the request is established successfully.
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onSetKeepScreenOnCallback() {
 *     console.log("FLAG_KEEP_SCREEN_ON set successfully.")
 * }
 *
 */

/**
 * @api onClearKeepScreenOnCallback() void onClearKeepScreenOnCallback()
 * @apiName onClearKeepScreenOnCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Invokes when the request is established successfully.
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onClearKeepScreenOnCallback() {
 *     console.log("FLAG_KEEP_SCREEN_ON clear successfully.")
 * }
 *
 */

/**
 * @api onGpsLocationCallback(geoLocation) void onGpsLocationCallback()
 * @apiName onGpsLocationCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Gets Gps location
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiParam {String} gpsLocation The Gps location.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGeoLocationCallback(gpsLocation) {
 *     if (gpsLocation != null) {
 *         console.log("GpsLocation latitude" + gpsLocation.latitude);
 *         console.log("GpsLocation longitude" + gpsLocation.longitude);
 *     } else {
 *         console.log("GpsLoaction is not available")
 *     }
 * }
 *
 */

/**
 * @api onSAUserIdCallback(saUserId) void onSAUserIdCallback()
 * @apiName onSAUserIdCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Gets global user id of samsung account.
 * @apiVersion 1.2.6
 * @apiPrivate
 *
 * @apiParam {String} saUserId The user id of samsung account.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onSAUserIdCallback(saUserId) {
 *     console.log("User id of samsung account : " + saUserId);
 * }
 *
 */

/**
 * @api onSACountryCodeCallback(saUserId) void onSACountryCodeCallback()
 * @apiName onSACountryCodeCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Gets Country code of samsung account.
 * @apiVersion 1.3.6
 * @apiPrivate
 *
 * @apiParam {String} saCountryCode The Country code of samsung account.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onSACountryCodeCallback(saCountryCode) {
 *     console.log("Country code of samsung account : " + saCountryCode);
 * }
 *
 */

/**
 * @api onInstalledAppIdCallback(installedAppId) void onInstalledAppIdCallback()
 * @apiName onInstalledAppIdCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Gets Installed App Id.
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {String} installedAppId The Installed App Id.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onInstalledAppIdCallback(installedAppId) {
 *     console.log("Installed App Id : " + installedAppId);
 * }
 *
 */


/**
 * @api onDeviceActivityHistoryCallback(response) void onDeviceActivityHistoryCallback()
 * @apiName onDeviceActivityHistoryCallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Gets device activity history.
 * @apiVersion 1.2.6
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 * @apiParam {Array} response.items The list of items
 * @apiParam {String} response.items.text Translated human readable string(localized)
 * @apiParam {Number} response.items.epoch History timestamp in epoch(millisecond)
 * @apiParam {Number} response.items.hash The hash value of this record.
 * @apiParam {String} response.items.timestamp The value of timestamp. Will always be 0 timezone offset.
 * @apiParam {String} response.items.activityType The type of activity. Enum : "DEVICE"
 * @apiParam {Object} response.items.deviceActivity The object data of device activity
 * @apiParam {String} response.items.deviceActivity.deviceId Device ID
 * @apiParam {String} response.items.deviceActivity.deviceName Device name
 * @apiParam {String} response.items.deviceActivity.deviceType Device type
 * @apiParam {String} response.items.deviceActivity.locationId Location ID
 * @apiParam {String} response.items.deviceActivity.locationName Location name
 * @apiParam {String} response.items.deviceActivity.roomId Room ID
 * @apiParam {String} response.items.deviceActivity.roomName Room name
 * @apiParam {String} response.items.deviceActivity.capability Capability name
 * @apiParam {String} response.items.deviceActivity.attributeName Attribute name
 * @apiParam {String} response.items.deviceActivity.attributeValue Attribute value
 * @apiParam {String} response.items.deviceActivity.unit Attribute unit
 * @apiParam {Object} response._links The object data for paging
 * @apiParam {Object} response._links.next The object data for next paging
 * @apiParam {String} response._links.next.href An absolute URL linking to a resource
 * @apiParam {Object} response._links.previous The object data for previous paging
 * @apiParam {String} response._links.previous.href An absolute URL linking to a resource
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onDeviceActivityHistoryCallback(response) {
 *     console.log("Activity history : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "items": [{
 *       "text": "switch of smart plug is Off",
 *       "epoch": 1511913638679,
 *       "hash" : 4080908847,
 *       "timestamp": "2017-12-18T22:14:52.714Z",
 *       "activityType": "DEVICE",
 *       "deviceActivity": {
 *         "deviceId": "ee5d412d",
 *         "deviceName": "smart plug",
 *         "locationId": "60153b003390",
 *         "locationName": "Home",
 *         "roomId": "b0d53b102373",
 *         "roomName": "living room",
 *         "capability": "switch",
 *         "attributeName": "switch",
 *         "attributeValue": "on",
 *         "unit": null
 *       }
 *     }
 *   ],
 *   "_links": {
 *     "next": {
 *       "href": "https://..."
 *     },
 *     "previous": {
 *       "href": "https://..."
 *     }
 *   }
 * }
 */

/**
 * @api onDeviceStatisticsCallback(response) void onDeviceStatisticsCallback()
 * @apiName onDeviceStatisticsCallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Gets device statistics.
 * @apiVersion 1.2.6
 * @apiPrivate
 *
 * @apiParam {[Object]} response The Array object of response data.
 * @apiParam {String} response.capability Capability name. Note that this is always in lower case. This will always have a value, not nullable.
 * @apiParam {String} response.type Statisitic type. Enum : "scalar" "enum"
 * @apiParam {String} response.component Component name. This will always have a value, not nullable.
 * @apiParam {Number} response.startTime Start time of the statistics period. The minimum time value of the data in this bucket.
 * This will always have a value, not nullable.
 * @apiParam {Number} response.endTime End time of the statistics period. The maximum time value of the data in this bucket.
 * This will always have a value, not nullable.
 * @apiParam {Object} [response.propertyName] Optional. The Object containing the statistic values of the associated time period.
 * The key name of propertyName is determined by capability and can be changed according to each capability. (e.g. switch, temperature)
 * This whole object is nullable, and will only happen for capability that we do not yet support.
 * @apiParam {Number} [response.propertyName.avg] Optional. Average value of data in the same group. This is not nullable if 'type' is a 'scalar'.
 * This is null and won't be present if 'type' is an 'enum'. Value is a Float.
 * @apiParam {Number} [response.propertyName.sum] Optional. Sum of data in the same group. This is not nullable if 'type' is a 'scalar'.
 * This is null and won't be present if 'type' is an 'enum'. Value is a Float.
 * @apiParam {Number} [response.propertyName.max] Optional. Max value of data grouped in the same group. This is not nullable if 'type' is a 'scalar'.
 * This is null and won't be present if 'type' is an 'enum'. Value is a Float.
 * @apiParam {Number} [response.propertyName.min] Optional. Min value of data grouped in the same group. This is not nullable if 'type' is a 'scalar'.
 * This is null and won't be present if 'type' is an 'enum'. Value is a Float.
 * @apiParam {Object} [response.propertyName.last] Optional. Last reported value of the data in the same group.
 * This could hold a String value, or a Float value. e.g. 'on', 13
 * @apiParam {String} [response.propertyName.unit] Optional. Unit. This is nullable, and won't be returned when this is null.
 * Capability schema supports null unit event.
 * @apiParam {Object} [response.propertyName.count] Optional. The object of Count. The number of times the specified capability and attribute value within 'starttime' and 'endtime'.
 * Note, this only applies to capability with enum type values(e.g. 'on', 'off') and won't be present for other types.
 * @apiParam {Object} [response.propertyName.duration] Optional. The object of Duration. The number of millisecs the capability has the specified attribute value within 'starttime' and 'endtime'.
 * Note, this only applies to capability with enum type values(e.g. 'on', 'off') and won't be present for other types.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onDeviceStatisticsCallback(response) {
 *     console.log("Device Statistics : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * [
 *   {
 *     "capability": "switch",
 *     "type": "enum",
 *     "component": "main",
 *     "startTime": 1531438674000,
 *     "endTime": 1544225108000,
 *     "switch": {
 *       "avg": null,
 *       "sum": null,
 *       "max": null,
 *       "min": null,
 *       "last": "on",
 *       "unit": null,
 *       "count": {
 *         "on": 370,
 *         "off": 369
 *       },
 *       "duration": {
 *         "on": 3600897,
 *         "off": 3599103
 *       }
 *     }
 *   },
 *   {
 *     "capability": "temperaturemeasurement",
 *     "type": "scalar",
 *     "component": "main",
 *     "startTime": 1531438674000,
 *     "endTime": 1544225108000,
 *     "temperature": {
 *       "avg": 13.1,
 *       "sum": 26.2,
 *       "max": 20.2,
 *       "min": 11.1,
 *       "last": 13.2,
 *       "unit": "C",
 *       "count": null,
 *       "duration": null
 *     }
 *   }
 * ]
 */

/**
 * @api onCreateRuleCallback(response) void onCreateRuleCallback()
 * @apiName onCreateRuleCallback
 * @apiGroup SmartKitRule
 * @apiDescription [In-House] Gets created rule object
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/client.smartthings.com.v1#operation/createRule
 * function onCreateRuleCallback(response) {
 *     console.log("createRule : " + JSON.stringify(response));
 * }
 */

/**
 * @api onSTDeviceCallback(response) void onSTDeviceCallback()
 * @apiName onSTDeviceCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets device object.
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/api.smartthings.com.v1#tag/devices
 * function onSTDeviceCallback(response) {
 *     console.log("getDevice : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "items": [
 *     {
 *       "deviceId": "6f5ea629-4c05-4a90-a244-cc129b0a80c3",
 *       "name": "color.light.100x",
 *       "label": "color.light.100x",
 *       "deviceManufacturerCode": "010F-0B01-2002",
 *       "locationId": "0c0b935d-0616-4441-a0bf-da7aeec3dc0a",
 *       "roomId": "0fd2b1ef-1b33-4a54-9153-65aca91e9660",
 *       "deviceTypeId": "Deprecated please look under \"dth\".",
 *       "deviceTypeName": "Deprecated please look under \"dth\".",
 *       "deviceNetworkType": "Deprecated please look under \"dth\".",
 *       "components": [
 *         {
 *           "id": "main",
 *           "label": "string",
 *           "capabilities": [
 *             {
 *               "id": "switch",
 *               "version": 1
 *             }
 *           ]
 *         }
 *       ],
 *       "childDevices": [
 *         {}
 *       ],
 *       "profile": {
 *         "id": "a7b3c264-2d22-416e-bca1-ca4b59a60aee"
 *       },
 *       "app": {
 *         "installedAppId": "0c0b935d-0616-4441-a0bf-da7aeec3dc0a",
 *         "externalId": "Th13390",
 *         "profile": {
 *           "id": "a7b3c264-2d22-416e-bca1-ca4b59a60aee"
 *         }
 *       },
 *       "dth": {
 *         "deviceTypeId": "7b8514e6-230d-41cc-b3c2-512bca15abf0",
 *         "deviceTypeName": "x.com.samsung.da.fridge",
 *         "deviceNetworkType": "ZWAVE",
 *         "completedSetup": true,
 *         "networkSecurityLevel": "UNKNOWN",
 *         "hubId": "f7239728-edb3-48e9-b588-a27f30b968a0"
 *       },
 *       "ir": {
 *         "parentDeviceId": "string",
 *         "profileId": "0c0b875r-0213-6479-a0bf-da7aeec3dc0a",
 *         "ocfDeviceType": "oic.d.tv",
 *         "irCode": "006C",
 *         "functionCodes": {
 *           "statelessPowerToggleButton.powerToggle": "power",
 *           "statelessAudioMuteButton.muteToggle": "mute",
 *           "statelessAudioVolumeButton.volumeUp": "volume_up",
 *           "statelessAudioVolumeButton.volumeDown": "volume_down",
 *           "statelessChannelButton.channelUp": "channel_up",
 *           "statelessChannelButton.channelDown": "channel_down",
 *           "statelessCustomButton.green": "green",
 *           "statelessCustomButton.right": "right",
 *           "statelessCustomButton.3": 3,
 *           "statelessCustomButton.exit": "exit",
 *           "statelessCustomButton.playback": "playback"
 *         },
 *         "childDevices": [
 *           {}
 *         ],
 *         "metadata": {}
 *       },
 *       "irOcf": {
 *         "parentDeviceId": "string",
 *         "profileId": "0c0b875r-0213-6479-a0bf-da7aeec3dc0a",
 *         "ocfDeviceType": "oic.d.tv",
 *         "irCode": "006C",
 *         "functionCodes": {
 *           "statelessPowerToggleButton.powerToggle": "power",
 *           "statelessAudioMuteButton.muteToggle": "mute",
 *           "statelessAudioVolumeButton.volumeUp": "volume_up",
 *           "statelessAudioVolumeButton.volumeDown": "volume_down",
 *           "statelessChannelButton.channelUp": "channel_up",
 *           "statelessChannelButton.channelDown": "channel_down",
 *           "statelessCustomButton.green": "green",
 *           "statelessCustomButton.right": "right",
 *           "statelessCustomButton.3": 3,
 *           "statelessCustomButton.exit": "exit",
 *           "statelessCustomButton.playback": "playback"
 *         },
 *         "childDevices": [
 *           {}
 *         ],
 *         "metadata": {}
 *       },
 *       "viper": {
 *         "uniqueIdentifier": "1a-74",
 *         "manufacturerName": "TP-Link",
 *         "modelName": "HS101",
 *         "swVersion": "23.123.231",
 *         "hwVersion": "v1 US bulb"
 *       },
 *       "type": "DTH"
 *     }
 *   ],
 *   "_links": {
 *     "next": {
 *       "href": "https://..."
 *     },
 *     "previous": {
 *       "href": "https://..."
 *     }
 *   }
 * }
 */

/**
 * @api onSTDevicesCallback(response) void onSTDevicesCallback()
 * @apiName onSTDevicesCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets List of the device object.
 * @apiVersion 1.3.4
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/gizmo.st.internal.v20170916#tag/devices
 * function onSTDevicesCallback(response) {
 *     console.log("getDevices : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 * "items": [
 *   {
 *     "deviceId": "6f5ea629-4c05-4a90-a244-cc129b0a80c3",
 *     "ownerId": "1c75f712-2c3e-4e51-970c-a42ae7aedbdc",
 *     "name": "color.light.100x",
 *     "label": "color.light.100x",
 *     "deviceManufacturerCode": "010F-0B01-2002",
 *     "manufacturerName": "SmartThings",
 *     "presentationId": "VD-STV_2018_K",
 *     "locationId": "0c0b935d-0616-4441-a0bf-da7aeec3dc0a",
 *     "roomId": "0fd2b1ef-1b33-4a54-9153-65aca91e9660",
 *     "components": [
 *       {
 *         "id": "main",
 *         "label": "string",
 *         "capabilities": [
 *           {
 *             "id": "switch",
 *             "version": 1,
 *             "status": {
 *               "switch": {
 *                 "value": "on"
 *               }
 *             }
 *           }
 *         ],
 *         "categories": [
 *           {
 *             "name": "Light"
 *           }
 *         ]
 *       }
 *     ],
 *     "childDevices": [
 *       {
 *         "id": "1c75f712-2c3e-4e51-970c-a42ae7aedbdc"
 *       }
 *     ],
 *     "profile": {
 *       "id": "a7b3c264-2d22-416e-bca1-ca4b59a60aee"
 *     },
 *     "app": {
 *       "installedAppId": "0c0b935d-0616-4441-a0bf-da7aeec3dc0a",
 *       "externalId": "Th13390",
 *       "profile": {
 *         "id": "a7b3c264-2d22-416e-bca1-ca4b59a60aee"
 *       }
 *     },
 *     "ble": {},
 *     "bleD2D": {},
 *     "dth": {
 *       "deviceTypeId": "7b8514e6-230d-41cc-b3c2-512bca15abf0",
 *       "deviceTypeName": "x.com.samsung.da.fridge",
 *       "deviceNetworkType": "ZWAVE",
 *       "completedSetup": true,
 *       "networkSecurityLevel": "UNKNOWN",
 *       "hubId": "f7239728-edb3-48e9-b588-a27f30b968a0",
 *       "installedGroovyAppId": "8f5ra619-4c05-4a90-a245-cc129b0a8098"
 *     },
 *     "hub": {},
 *     "mobile": {},
 *     "ir": {
 *       "parentDeviceId": "string",
 *       "profileId": "0c0b875r-0213-6479-a0bf-da7aeec3dc0a",
 *       "ocfDeviceType": "oic.d.tv",
 *       "irCode": "006C",
 *       "functionCodes": {
 *         "statelessPowerToggleButton.powerToggle": "power",
 *         "statelessAudioMuteButton.muteToggle": "mute",
 *         "statelessAudioVolumeButton.volumeUp": "volume_up",
 *         "statelessAudioVolumeButton.volumeDown": "volume_down",
 *         "statelessChannelButton.channelUp": "channel_up",
 *         "statelessChannelButton.channelDown": "channel_down",
 *         "statelessCustomButton.green": "green",
 *         "statelessCustomButton.right": "right",
 *         "statelessCustomButton.3": 3,
 *         "statelessCustomButton.exit": "exit",
 *         "statelessCustomButton.playback": "playback"
 *       },
 *       "childDevices": [
 *         {}
 *       ],
 *       "metadata": {}
 *     },
 *     "irOcf": {
 *       "parentDeviceId": "string",
 *       "profileId": "0c0b875r-0213-6479-a0bf-da7aeec3dc0a",
 *       "ocfDeviceType": "oic.d.tv",
 *       "irCode": "006C",
 *       "functionCodes": {
 *         "statelessPowerToggleButton.powerToggle": "power",
 *         "statelessAudioMuteButton.muteToggle": "mute",
 *         "statelessAudioVolumeButton.volumeUp": "volume_up",
 *         "statelessAudioVolumeButton.volumeDown": "volume_down",
 *         "statelessChannelButton.channelUp": "channel_up",
 *         "statelessChannelButton.channelDown": "channel_down",
 *         "statelessCustomButton.green": "green",
 *         "statelessCustomButton.right": "right",
 *         "statelessCustomButton.3": 3,
 *         "statelessCustomButton.exit": "exit",
 *         "statelessCustomButton.playback": "playback"
 *       },
 *       "childDevices": [
 *         {}
 *       ],
 *       "metadata": {}
 *     },
 *     "viper": {
 *       "uniqueIdentifier": "1a-74",
 *       "manufacturerName": "TP-Link",
 *       "modelName": "HS101",
 *       "swVersion": "23.123.231",
 *       "hwVersion": "v1 US bulb"
 *     },
 *     "type": "APP",
 *     "externalId": "Th13390",
 *     "vid": "string",
 *     "mnmn": "string",
 *     "ocfDeviceType": "string",
 *     "restrictionTier": 0
 *   }
 * ],
 * "_links": {
 *   "next": {
 *     "href": "https://..."
 *   },
 *   "previous": {
 *     "href": "https://..."
 *   }
 * }
 * }
 */

/**
 * @api onSTLocationCallback(response) void onSTLocationCallback()
 * @apiName onSTLocationCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets Location object.
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/api.smartthings.com.v1#tag/locations
 *
 * function onSTLocationCallback(response) {
 *     console.log("getLocation : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "items": [
 *     {
 *       "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
 *       "name": "Home"
 *     }
 *   ],
 *   "_links": {
 *     "next": {
 *       "href": "https://..."
 *     },
 *     "previous": {
 *       "href": "https://..."
 *     }
 *   }
 * }
 */

/**
 * @api onSTLocationUsersCallback(response) void onSTLocationUsersCallback()
 * @apiName onSTLocationUsersCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets Location Users object.
 * @apiVersion 1.3.6
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 *
 * function onSTLocationUsersCallback(response) {
 *     console.log("getLocationUsers : " + JSON.stringify(response));
 * }
 *
 */

/**
 * @api onSTRoomCallback(response) void onSTRoomCallback()
 * @apiName onSTRoomCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets Room object.
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/api.smartthings.com.v1#tag/rooms
 *
 * function onSTRoomCallback(response) {
 *     console.log("getLocation : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "items": [
 *     {
 *       "roomId": "bdd8a15f-33d4-41fc-b33c-75ce85e99d24",
 *       "locationId": "6b3d1909-1e1c-43ec-adc2-5f941de4fbf9",
 *       "name": "Living Room"
 *     }
 *   ],
 *   "_links": {
 *     "next": {
 *       "href": "https://..."
 *     },
 *     "previous": {
 *       "href": "https://..."
 *     }
 *   }
 * }
 */

/**
 * @api onSTDeviceHealthDataCallback(response) void onSTDeviceHealthDataCallback()
 * @apiName onSTDeviceHealthDataCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets Health data object.
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 *
 * function onSTDeviceHealthDataCallback(response) {
 *     console.log("getDeviceHealthData : " + JSON.stringify(response));
 * }
 *
 */

 /**
  * @api onSTDeviceHealthChangeCallback(response, event) void onSTDeviceHealthChangeCallback()
  * @apiName onSTDeviceHealthChangeCallback
  * @apiGroup SmartKit
  * @apiDescription [In-House] Gets Health data change events.
  * @apiVersion 1.3.4
  * @apiPrivate
  *
  * @apiParam {Object} response The object of device health event data.
  *
  *
  * @apiExample {js} Callback Function - Example usage:
  *
  * Response event data, please refere linke below,
  * https://librarian-regionals.smartthingsgdev.com/sdk/android/4.96.0/com/smartthings/smartclient/restclient/model/sse/event/device/DeviceHealthEventData.html
  * Response Parameters:
  * id - The ID of this event.
  * locationId - The ID of the location in which the event was triggered.
  * deviceId - The ID of the device associated with this event.
  * hubId - The ID of the hub associated with this event.
  * reason - The reason the device is offline.
  * status - The status of the device.
  *
  * function onSTDeviceHealthChangeCallback(result, event) {
  *     if (result == "SUCCESS") {
  *         console.log("subscribe : " + JSON.stringify(event));
  *     }
  * }
  *
  */

  /**
   * @api onSTDeviceLifecycleChangeListener(response, event) void onSTDeviceLifecycleChangeListener()
   * @apiName onSTDeviceLifecycleChangeListener
   * @apiGroup SmartKit
   * @apiDescription [In-House] Gets Lifecycle data change events.
   * @apiVersion 1.3.5
   * @apiPrivate
   *
   * @apiParam {Object} response The object of device Lifecycle event data.
   *
   *
   * @apiExample {js} Callback Function - Example usage:
   *
   * Response event data, please refere linke below,
   * https://librarian-regionals.smartthingsgdev.com/sdk/android/4.96.0/com/smartthings/smartclient/restclient/model/sse/event/device/DeviceLifecycleEventData.html
   * Response Parameters:
   * DeviceId - The ID of the device associated with this event.
   * DeviceName - The name of the device associated with this event.
   * EventId - The ID of this event.
   * Lifecycle - Contains data associated with the specific point in the Lifecycle this device is at.
   * LocationId - The ID of the location in which the event was triggered.
   * Principal - The principal that made the change.
   *
   * function onSTDeviceLifecycleChangeListener(result, event) {
   *     if (result == "SUCCESS") {
   *         console.log("subscribe : " + JSON.stringify(event));
   *     }
   * }
   *
   */

   /**
    * @api onSTInstalledAppLifecycleChangeListener(response, event) void onSTInstalledAppLifecycleChangeListener()
    * @apiName onSTInstalledAppLifecycleChangeListener
    * @apiGroup SmartKit
    * @apiDescription [In-House] Gets Lifecycle data change events.
    * @apiVersion 1.3.5
    * @apiPrivate
    *
    * @apiParam {Object} response The object of InstalledApp Lifecycle event data.
    *
    *
    * @apiExample {js} Callback Function - Example usage:
    *
    * Response event data, please refere linke below,
    * https://librarian-regionals.smartthingsgdev.com/sdk/android/4.96.0/com/smartthings/smartclient/restclient/model/sse/event/app/InstalledAppLifecycleEventData.html
    * Response Parameters:
    * id - The ID of this event.
    * locationId - The ID of the location in which the event was triggered.
    * installedAppId - The ID of the installed application.
    * templateAppId - The ID of the installed application's template.
    * lifecycle - Enum String of Lifecycle.Type.
    *
    * function onSTInstalledAppLifecycleChangeListener(result, event) {
    *     if (result == "SUCCESS") {
    *         console.log("subscribe : " + JSON.stringify(event));
    *     }
    * }
    *
    */

/**
 * @api onSTDeviceStatusCallback(response) void onSTDeviceStatusCallback()
 * @apiName onSTDeviceStatusCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets device status object.
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/api.smartthings.com.v1#operation/getDeviceStatus
 *
 * function onSTDeviceStatusCallback(response) {
 *     console.log("getDeviceHealthData : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *  "subscriptionId": "33c78a39-9145-4cd9-9b9e-4ae538111e94",
 *  "registrationUrl": "https://example.smartthings.com/sse",
 *  "version": 1,
 *  "name": "my-subscription-name",
 *  "subscriptionFilters": [
 *      {
 *          "type": "LOCATIONIDS"
 *      }
 *  ]
 * }
 */

/**
 * @api onSTExecuteCommandsCallback(response) void onSTExecuteCommandsCallback()
 * @apiName onSTExecuteCommandsCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets result about execute commands.
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} result The result of POST API.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/api.smartthings.com.v1#operation/executeDeviceCommands
 *
 * function onSTExecuteCommandsCallback(result) {
 *     if (result == 'SUCCESS') {
 *          console.log("executeCommands Successful");
 *     } else {
 *          console.log("Failed to executeCommands");
 *     }
 * }
 */

 /**
  * @api onSTGroupExecuteCommandsCallback(response) void onSTGroupExecuteCommandsCallback()
  * @apiName onSTGroupExecuteCommandsCallback
  * @apiGroup SmartKit
  * @apiDescription [In-House] Gets result about group execute commands.
  * @apiVersion 1.3.4
  * @apiPrivate
  *
  * @apiParam {Object} result The result of POST API.
  *
  *
  * @apiExample {js} Callback Function - Example usage:
  * Please refer this Link :
  * https://librarian-regionals.smartthingsgdev.com/sdk/android/4.108.0/com/smartthings/smartclient/restclient/operation/device/group/DeviceGroupOperations.html#executeDeviceGroupCommands-deviceGroupId-command-additionalCommands-
  *
  * function onSTGroupExecuteCommandsCallback(result) {
  *     if (result == 'SUCCESS') {
  *          console.log("groupExecuteCommands Successful");
  *     } else {
  *          console.log("Failed to groupExecuteCommands");
  *     }
  * }
  */

/**
 * @api onSTTrackersGeoLocationsCallback(response) void onSTTrackersGeoLocationsCallback()
 * @apiName onSTTrackersGeoLocationsCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets trackers geo-location object(Temporary support)
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://smartthings.atlassian.net/wiki/spaces/FP/pages/939398267/API+Spec+WIP#GET-/geolocations--%E2%86%92-CAPI,-INTERNAL--(MMVP)
 *
 * function onSTTrackersGeoLocationsCallback(response) {
 *     console.log("getTrackersGeoLocations : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *  "items": [{
 *      "deviceId": "89fb2335-725d-4f31-a8cd-865fa6b5434e",
 *      "geolocations": [{
 *          "encryption": {
 *              "encObjs": ["latitude", "longitude"],
 *              "encPrivKey": "Ek3SJxM7etLnUsDEKbofI789uML6XwE7eTZrbj0WAeQ="
 *          },
 *          "latitude": "wJMcXFwazt4n7uHQ3ZKi9g==",
 *          "longitude": "Uko5CMFXNmmTfWfPU+D+zQ==",
 *          "method": "GPS",
 *          "accuracy": 19.284,
 *          "heading": 1,
 *          "speed": 5.00000,
 *          "lastUpdateTime": 1588555616000
 *      }]}, {
 *      "deviceId": "fde86335-725d-4f31-a8cd-865fa6fe864g1",
 *      "geolocations": [
 *          "latitude": "37.258795",
 *          "longitude": "127.056193",
 *          "method": "GPS",
 *          "accuracy": 19.284,
 *          "heading": 42.6,
 *          "speed": 20.21000,
 *          "lastUpdateTime": 1588555616111
 *      }]}
 *    ]
 * }
 */

/**
 * @api onSTTrackersKeysCallback(response) void onSTTrackersKeysCallback()
 * @apiName onSTTrackersKeysCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets trackers keys object(Temporary support)
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://smartthings.atlassian.net/wiki/spaces/FP/pages/939398267/API+Spec+WIP#POST-/keys--%E2%86%92-CAPI
 *
 * function onSTTrackersKeysCallback(response) {
 *     console.log("postTrackersKeys : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *  "result": true
 * }
 */

/**
 * @api onSTTrackersMetadataMapsCallback(response) void onSTTrackersMetadataMapsCallback()
 * @apiName onSTTrackersMetadataMapsCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets trackers metadata/maps object(Temporary support)
 * @apiVersion 1.3.2
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/client.smartthings.com.v2#operation/getMapKeysByServiceProvider
 *
 * function onSTTrackersMetadataMapsCallback(response) {
 *     console.log("getTrackersMetadataMaps : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * [
 *  {
 *     "serviceProvider": "naver",
 *     "clientId": "naverid1;naverid2",
 *     "secret": "secret1;secret2"
 *  }
 * ]
 */

/**
 * @api onSTDevicePresentationCallback(response) void onSTDevicePresentationCallback()
 * @apiName onSTDevicePresentationCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets Device presentation object from SmartKit
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/canvas.samsungiotcloud.com.v1#tag/Device-Presentation
 *
 * function onSTDevicePresentationCallback(response) {
 *     console.log("getDevicePresentation : " + JSON.stringify(response));
 * }
 */

/**
 * @api onSTZigbeeGraphCallback(response) void onSTZigbeeGraphCallback()
 * @apiName onSTZigbeeGraphCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets Zigbee Graph object from SmartKit
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/cerberus.st.internal.v20190819#operation/getZigbeeGraph
 *
 * function onSTZigbeeGraphCallback(response) {
 *     console.log("getZigbeeGraph : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "devices": [
 *     {
 *       "deviceId": "6496be9a-aa23-4320-b60f-904e472db962",
 *       "repeater": true,
 *       "route": [
 *         {
 *           "properties": {
 *             "type": {
 *               "type": "string",
 *               "enum": [
 *                 "DEVICE"
 *               ]
 *             },
 *             "deviceId": {
 *               "type": "string",
 *               "format": "uuid",
 *               "example": "6496be9a-aa23-4320-b60f-904e472db962"
 *             }
 *           }
 *         }
 *       ],
 *       "connectionQuality": 0,
 *       "updatedTime": "2020-02-05T17:28:26.1234Z"
 *     }
 *   ]
 * }
 */

/**
 * @api onSTZwaveGraphCallback(response) void onSTZwaveGraphCallback()
 * @apiName onSTZwaveGraphCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Gets Zwave Graph object from SmartKit
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/cerberus.st.internal.v20190819#operation/getZWaveGraph
 *
 * function onSTZwaveGraphCallback(response) {
 *     console.log("getZwaveGraph : " + JSON.stringify(response));
 * }
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "devices": [
 *     {
 *       "deviceId": "6496be9a-aa23-4320-b60f-904e472db962",
 *       "repeater": true,
 *       "route": [
 *         {
 *           "properties": {
 *             "type": {
 *               "type": "string",
 *               "enum": [
 *                 "DEVICE"
 *               ]
 *             },
 *             "deviceId": {
 *               "type": "string",
 *               "format": "uuid",
 *               "example": "6496be9a-aa23-4320-b60f-904e472db962"
 *             }
 *           }
 *         }
 *       ],
 *       "connectionQuality": 0,
 *       "updatedTime": "2020-02-05T17:28:26.1234Z"
 *     }
 *   ]
 * }
 */

/**
 * @api onSTMQTTLogURLCallback(response) void onSTMQTTLogURLCallback()
 * @apiName onSTMQTTLogURLCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Send MQTT logs to data platform piper service. Pre-signed URL returned to client for uploading the logs
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://librarian-regionals.smartthingsgdev.com/api/piper.st.internal.v20200210#operation/postPiperMqttLogs
 *
 * function onSTMQTTLogURLCallback(response) {
 *     console.log("getMQTTLogURL : " + JSON.stringify(response));
 * }
 * @apiSuccessExample {JSON} Response (example)
 * {
 *  "id": "5d08f99d-6f62-4250-b4a8-5541f8afa07d",
 *  "key": "string",
 *  "deviceId": "1b6322df-0b94-4659-8df3-928c37bf5c44",
 *  "locationId": "6b3d77a7-1a93-43a9-a25c-67b55317fae1",
 *  "fileUrl": "http://example.com"
 * }
 */

/**
 * @api onSTActivityHistoryCallback(response) void onSTActivityHistoryCallback()
 * @apiName onSTActivityHistoryCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Receives activity history.
 * @apiVersion 1.3.6
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Example usage:
 * function onSTActivityHistoryCallback(response) {
 *     console.log("Activity History : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "items": [{
 *       "text": "switch of smart plug is Off",
 *       "epoch": 1511913638679,
 *       "hash" : 4080908847,
 *       "timestamp": "2017-12-18T22:14:52.714Z",
 *       "activityType": "DEVICE",
 *       "deviceActivity": {
 *         "deviceId": "ee5d412d",
 *         "deviceName": "smart plug",
 *         "locationId": "60153b003390",
 *         "locationName": "Home",
 *         "roomId": "b0d53b102373",
 *         "roomName": "living room",
 *         "capability": "switch",
 *         "attributeName": "switch",
 *         "attributeValue": "on",
 *         "unit": null
 *       }
 *     }
 *   ],
 *   "_links": {
 *     "next": {
 *       "href": "https://..."
 *     },
 *     "previous": {
 *       "href": "https://..."
 *     }
 *   }
 * }
 */

/**
 * @api onSTDeviceStatisticsCallback(response) void onSTDeviceStatisticsCallback()
 * @apiName onSTDeviceStatisticsCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Receives device statistics
 * @apiVersion 1.3.6
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Example usage:
 * function onSTDeviceStatisticsCallback(response) {
 *     console.log("Device Statistics : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * [
 *   {
 *     "capability": "switch",
 *     "type": "enum",
 *     "component": "main",
 *     "startTime": 1531438674000,
 *     "endTime": 1544225108000,
 *     "switch": {
 *       "avg": null,
 *       "sum": null,
 *       "max": null,
 *       "min": null,
 *       "last": "on",
 *       "unit": null,
 *       "count": {
 *         "on": 370,
 *         "off": 369
 *       },
 *       "duration": {
 *         "on": 3600897,
 *         "off": 3599103
 *       }
 *     }
 *   },
 *   {
 *     "capability": "temperaturemeasurement",
 *     "type": "scalar",
 *     "component": "main",
 *     "startTime": 1531438674000,
 *     "endTime": 1544225108000,
 *     "temperature": {
 *       "avg": 13.1,
 *       "sum": 26.2,
 *       "max": 20.2,
 *       "min": 11.1,
 *       "last": 13.2,
 *       "unit": "C",
 *       "count": null,
 *       "duration": null
 *     }
 *   }
 * ]
 */

/**
 * @api onSTGetDevicePreferencesCallback(response) void onSTGetDevicePreferencesCallback()
 * @apiName onSTGetDevicePreferencesCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Receives device preference.
 * @apiVersion 1.3.6
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Example usage:
 * function onSTGetDevicePreferencesCallback(response) {
 *     console.log("Preference is : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * [
 *   {
 *    "description": "Section Title Description",
 *    "multiple": false,
 *    "title": "Section Title",
 *    "required": false,
 *    "displayDuringSetup": false,
 *    "type": "paragraph",
 *    "element": "paragraph",
 *    "value": ""
 *   },
 *   {
 *    "description": "Text Description",
 *    "multiple": false,
 *    "title": "Text Title",
 *    "required": false,
 *    "defaultValue": "title",
 *    "type": "text",
 *    "value": ""
 *  },
 *  {
 *    "description": "Enum Description",
 *    "multiple": false,
 *    "title": "Enum Title",
 *    "required": false,
 *    "options": {
 *      "Option1Key": "Option 1 Value",
 *      "Option2Key": "Option 2 Value"
 *    },
 *    "defaultValue": "Option1Key",
 *    "name": "enumInput",
 *    "type": "enum",
 *    "value": ""
 *  },
 *  {
 *   "description": "Enum Description",
 *   "multiple": false,
 *   "title": "Enum Title with alternative options style",
 *   "required": false,
 *   "options": [
 *     "Option1",
 *     "Option2"
 *   ],
 *   "defaultValue": "Option1",
 *   "name": "enumInput",
 *   "type": "enum",
 *   "value": ""
 *  }
 * ]
 */

/**
 * @api onSTSetDevicePreferencesCallback(response) void onSTSetDevicePreferencesCallback()
 * @apiName onSTSetDevicePreferencesCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Receives list of resource types.
 * @apiVersion 1.3.6
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Example usage:
 * function onSTSetDevicePreferencesCallback() {
 *    // Success Callback
 * }
 *
 */

/**
 * @api onSTRequestFirmwareUpdateCallback(response) void onSTRequestFirmwareUpdateCallback()
 * @apiName onSTRequestFirmwareUpdateCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Receives requested update status of this device
 * @apiVersion 1.3.6
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Example usage:
 * function onSTRequestFirmwareUpdateCallback(response) {
 *     if (response.status == true) {
 *        console.log("Requested update status is true.");
 *     }
 * }
 *
 */

/**
 * @api onSTGetFirmwareInfoCallback(response) void onSTGetFirmwareInfoCallback()
 * @apiName onSTGetFirmwareInfoCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Receives checked update status of this device.
 * @apiVersion 1.3.6
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Example usage:
 * function onSTGetFirmwareInfoCallback(response) {
 *  if(response.supported == true && response.updateAvailable == "YES") {
 *     console.log("Your device can be updated.");
 *  }
 * }
 *
 */

/**
 * @api onSTHubDeviceInterfaceCallback(response) void onSTHubDeviceInterfaceCallback()
 * @apiName onSTHubDeviceInterfaceCallback
 * @apiGroup SmartKit
 * @apiDescription [In-House] Receives the object of Hub device interface.
 * @apiVersion 1.3.6
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Example usage:
 * function onSTHubDeviceInterfaceCallback(response) {
 *     console.log(Getted object of hub device interface : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {Object} hubDeviceObject (example)
 *   {
 *       hub: {
 *           id: 'fecbf85e-aa32-42af-9a66-9c49d835d709',
 *           name: 'SmartThings hub',
 *           locationId: 'dcccd228-01ad-4320-9282-cb8ea87dc300',
 *           firmwareVersion: '000.017.00055',
 *           zigbeeId: 'D052A8AB872E0001',
 *           status: 'ACTIVE',
 *           onlineSince: '2018-12-02T03:06:17.758Z',
 *           firmwareUpdateAvailable: false,
 *           hardwareId: '001D',
 *           hardwareDescription: 'SmartThings WiFi Pro, Vodafone (UK)',
 *           isZwaveUtilEnabled: true,
 *           onlineSinceDate: 1543719977758,
 *           data: {
 *               appengineConnected: 'false',
 *               appengineEnabled: 'false',
 *               appengineVersion: '0.0.0',
 *               backupVersion: '0.0.0',
 *               batteryInUse: 'false',
 *               batteryVoltage: '65535 mV',
 *               bluetoothRadioDetected: 'false',
 *               bluetoothRadioEnabled: 'false',
 *               bluetoothRadioFunctional: 'false',
 *               bootloaderVersion: '0',
 *               emmcHealth: '1',
 *               emmcLifeTypeA: '1',
 *               emmcLifeTypeB: '1',
 *               hardwareID: '001D',
 *               hubcoreVersion: '000.017.00055',
 *               leeEnabled: 'false',
 *               localIP: '192.168.1.176',
 *               localSrvPortTCP: '39500',
 *               localSrvPortUDP: '0',
 *               macAddress: '94:8B:C1:A7:5A:92',
 *               originalZigbeeEui: '000B57FFFE9EFC7C',
 *               presenceTimeout: '2',
 *               updaterVersion: '0',
 *               videocoreVersion: '0.0.0',
 *               zigbeeChannel: '20',
 *               zigbeeEui: '000B57FFFE9EFC7C',
 *               zigbeeFirmware: '2.5.0',
 *               zigbeeNcpFirmware: '0.3.11',
 *               zigbeeNodeID: '0000',
 *               zigbeeOta: '2',
 *               zigbeePanID: '8521',
 *               zigbeePowerLevel: '10',
 *               zigbeeRadioDetected: 'true',
 *               zigbeeRadioEnabled: 'true',
 *               zigbeeRadioFunctional: 'true',
 *               zigbeeType: '15',
 *               zigbeeUnsecureRejoin: 'false',
 *               zwaveControllerStatus: '01',
 *               zwaveHomeID: 'C7821F21',
 *               zwaveNodeID: '01',
 *               zwavePowerLevel: 'full',
 *               zwaveRadioDetected: 'true',
 *               zwaveRadioEnabled: 'true',
 *               zwaveRadioFunctional: 'true',
 *               zwaveRegion: 'EU',
 *               zwaveSerialVersion: '4',
 *               zwaveSucID: '01',
 *               zwaveVersion: '4.38'
 *           },
 *           type: {
 *               name: 'Hub'
 *           }
 *       },
 *       devices: [{
 *           id: '094d99d6-1331-47b6-bbd1-5e8ec0e24435',
 *           name: 'Hue 6FCA46 (Hue Bridge)',
 *           hubId: 'fecbf85e-aa32-42af-9a66-9c49d835d709',
 *           locationId: 'dcccd228-01ad-4320-9282-cb8ea87dc300',
 *           label: 'Hue 6FCA46',
 *           status: 'OFFLINE',
 *           typeId: '95ec7fac-5f27-4bb5-989b-1f6fcc477642',
 *           typeName: 'LAN Hue Bridge',
 *           deviceNetworkId: '0017886FCA46',
 *           virtual: false,
 *           primaryTileName: null,
 *           completedSetup: true,
 *           network: 'u',
 *           stateOverrides: [],
 *           role: 'none',
 *           parentSmartAppId: 'c413915e-4a90-4af0-b133-8c38a509dd58',
 *           parentDeviceId: null,
 *           isComponent: false,
 *           componentName: null,
 *           componentLabel: null,
 *           isExecutingLocally: false,
 *           lastActivityTime: 1543379563751
 *       }, {
 *           id: 'a81725b9-9fb6-4b96-b3f8-b6506cf32bcc',
 *           name: 'Hue color lamp 1 (Hue Extended Color)',
 *           hubId: 'fecbf85e-aa32-42af-9a66-9c49d835d709',
 *           locationId: 'dcccd228-01ad-4320-9282-cb8ea87dc300',
 *           label: 'Hue color lamp 1',
 *           status: 'OFFLINE',
 *           typeId: '960b7098-9512-4262-9540-893e9905f508',
 *           typeName: 'LAN Hue Extended Color',
 *           deviceNetworkId: '0017886FCA46/1',
 *           virtual: false,
 *           primaryTileName: null,
 *           completedSetup: true,
 *           network: 'u',
 *           stateOverrides: [],
 *           role: 'none',
 *           parentSmartAppId: null,
 *           parentDeviceId: '094d99d6-1331-47b6-bbd1-5e8ec0e24435',
 *           isComponent: false,
 *           componentName: null,
 *           componentLabel: null,
 *           isExecutingLocally: false,
 *           lastActivityTime: null
 *       }]
 *   }
 */

/**
 * @api onTrackerGeoLocationsHistoryCallback(response) void onTrackerGeoLocationsHistoryCallback()
 * @apiName onTrackerGeoLocationsHistoryCallback
 * @apiGroup SmartKitTracker
 * @apiDescription [In-House] Gets Geolocations History of a Tag
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://smartthings.atlassian.net/wiki/spaces/FP/pages/1187022215/Retrieve+Geolocations+History+of+a+Tag
 *
 * function onTrackerGeoLocationsHistoryCallback(response) {
 *     console.log("getTrackerGeoLocationsHistory : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *     "geolocations": [
 *         {
 *             "encryption": {
 *               "encObjs": ["latitude", "longitude"]
 *             }
 *             "latitude": "asdfgafgdf......",
 *             "longitude": "fds89jlsdf........",
 *             "method": "GPS",
 *             "accuracy": "19.284",
 *             "heading": "1",
 *             "speed": "5.00000",
 *             "lastUpdateTime": "1591755507194"
 *         },
 *         {
 *             "latitude": "222.266139",
 *             "longitude": "222.999873",
 *             "method": "GPS",
 *             "accuracy": "19.284",
 *             "heading": "1",
 *             "speed": "5.00000",
 *             "lastUpdateTime": "1591755506515"
 *         }
 *     ],
 *     "offset": "1591755506515"
 * }
 */

/**
 * @api onTrackerGeoLocationsCallback(response) void onTrackerGeoLocationsCallback()
 * @apiName onTrackerGeoLocationsCallback
 * @apiGroup SmartKitTracker
 * @apiDescription [In-House] Gets Most Recent Geolocations of a Tags
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://smartthings.atlassian.net/wiki/spaces/FP/pages/1187055014/Retrieve+Most+Recent+Geolocations+of+Tags
 *
 * function onTrackerGeoLocationsCallback(response) {
 *     console.log("getTrackerGeoLocations : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *  "items": [{
 *          "deviceId": "89fb2335-725d-4f31-a8cd-865fa6b5434e",
 *          "geolocations": [{
 *                  "encryption": {
 *                      "encObjs": ["latitude", "longitude"]
 *                  },
 *                  "latitude": "wJMcXFwazt4n7uHQ3ZKi9g==",
 *                  "longitude": "Uko5CMFXNmmTfWfPU+D+zQ==",
 *                  "method": "GPS",
 *                  "accuracy": "19.284",
 *                  "heading": "1",
 *                  "speed": "5.00000",
 *                  "lastUpdateTime": "1588555616000"
 *              }
 *          ]
 *      }, {
 *          "deviceId": "fde86335-725d-4f31-a8cd-865fa6fe864g1",
 *          "geolocations": [{
 *                  "latitude": "37.258795",
 *                  "longitude": "127.056193",
 *                  "method": "GPS",
 *                  "accuracy": "19.284",
 *                  "heading": "42.6",
 *                  "speed": "20.21000",
 *                  "lastUpdateTime": "1588555616111"
 *              }
 *          ]
 *      }
 *  ]
 * }
 */

/**
 * @api onTrackerSetSearchingStatusCallback(response) void onTrackerSetSearchingStatusCallback()
 * @apiName onTrackerSetSearchingStatusCallback
 * @apiGroup SmartKitTracker
 * @apiDescription [In-House] Gets Most Recent Geolocations of a Tags
 * @apiVersion 1.3.5
 * @apiPrivate
 *
 * @apiParam {Object} response The object of response data.
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * Please refer this Link :
 * https://smartthings.atlassian.net/wiki/spaces/FP/pages/1177138606/Update+Searching+Status
 *
 * function onTrackerSetSearchingStatusCallback(response) {
 *     //response is empty
 *     console.log("Success to setSearchingStatus");
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * 200 OK with the following
 * {
 * }
 */

/**
 * @api onDeviceNavigateToCallback(NavigationViewType,resultData) void onDeviceNavigateToCallback()
 * @apiName onDeviceNavigateToCallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Method invoked when the invocation ends successfully.
 * @apiVersion 1.2.6
 * @apiPrivate
 *
 * @apiParam {DeviceNavigationViewType} navigationViewType Navigation Link Type of the corresponding operation.
 * @apiParam {Object} [resultData] Optional. Result data received from view page. JSON Object.
 *
 * @apiSuccessExample {JSON} resultData of EDIT_DEVICE_DETAIL_VIEW
 *   // Success response
 *   "USER_OK"
 *
 *   // User canceled response
 *   "USER_CANCEL"
 *
 * @apiUse DEVICE_NAVIGATION_VIEW_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onDeviceNavigateToCallback(navigationViewType, resultData) {
 *     console.log("Navigate to the specific view page successfully. : " + navigationViewType);
 * }
 *
 */

/**
 * @api onDeviceInfoChangeCallback(deviceInfo) void onDeviceInfoChangeCallback()
 * @apiName onDeviceInfoChangeCallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Gets device detail information changes.
 * @apiVersion 1.2.6
 * @apiPrivate
 *
 * @apiParam {Object} deviceInfo Changed editable device detail information.
 * @apiParam {String} deviceInfo.deviceName Device name.
 * @apiParam {String} deviceInfo.locationId Location ID.
 * @apiParam {String} deviceInfo.locationName Location name.
 * @apiParam {String} deviceInfo.roomId Room ID.
 * @apiParam {String} deviceInfo.roomName Room name.
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "deviceName": "Roller Shade",
 *   "locationId": "s21f39cd-dwb9-4fb8-aba1-43f3d98282af",
 *   "locationName": "Home",
 *   "roomId": "0n7f1881-694a-45c1-b877-5740f55c6dbe",
 *   "roomName": "living room"
 * }
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onDeviceInfoChangeCallback(deviceInfo) {
 *     console.log("Updated device detail information : " + JSON.stringify(deviceInfo));
 * }
 *
 */
/**
 * @api onVideoClipsCallback(response) void onVideoClipsCallback()
 * @apiName onVideoClipsCallback
 * @apiGroup Video
 * @apiDescription [In-House] Gets video clips.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {Object} response The response data.
 * @apiParam {Number} response.current_page Current page number
 * @apiParam {String} response.next Url of next page
 * @apiParam {String} response.previous Url of previous page
 * @apiParam {Number} response.total_results Count of total results
 * @apiParam {[VideoClip]} response.clips The Array object of clips data.
 * @apiParam {String} response.clips.id Clip ID.
 * @apiParam {String} response.clips.source_id Source ID.
 * @apiParam {Number} response.clips.start Start time.
 * @apiParam {Number} response.clips.duration Duration.
 * @apiParam {Number} response.clips.file_size File size of clip.
 * @apiParam {String} response.clips.expires_at Expired time.
 * @apiParam {String} response.clips.state State.
 * @apiParam {String} response.clips.media_url Media url
 * @apiParam {String} response.clips.thumb_url Thumbnail url
 * @apiParam {String} response.clips.trigger_type Trigger type
 * @apiParam {String} response.clips.trigger_id Trigger ID
 * @apiParam {Boolean} response.clips.pinned "true" returns clips in permanent storage. "false" returns clips in rolling storage.
 * @apiParam {String} response.clips.location Location ID
 * @apiParam {String} response.clips.room_id Room ID
 * @apiParam {String} response.clips.encryptKey Encrypt Key
 * @apiParam {String} response.clips.encryptIv Encrypt Iv
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onVideoClipsCallback(response) {
 *     console.log("Clips info : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "current_page" : 1,
 *   "next" : "https://api.st-av.net/v1/clips?source_id=56f3d971-daf2-4e43-b3d4-bd3da730f8a1&max=2&page=2",
 *   "previous" : null,
 *   "total_results" : 12,
 *   "clips" : [
 *     {
 *       "id": "mYKXzOcEIpiMApRsAHQHJ",
 *       "source_id": "56f3d971-daf2-4e43-b3d4-bd3da730f8a1",
 *       "start": "2017-06-05T15:55:51.0Z",
 *       "duration": 8.002,
 *       "file_size": 14945304,
 *       "expires_at": "2017-06-12T15:55:51.0Z",
 *       "state": "pending",
 *       "media_url": "https://media21.ec2.st-av.net/v1/clip/media?source_id=56f3d971-daf2-4e43-b3d4-bd3da730f8a1&clip_id=mYKXzOcEIpiMApRsAHQHJ",
 *       "thumb_url": "https://media21.ec2.st-av.net/v1/image/media?source_id=56f3d971-daf2-4e43-b3d4-bd3da730f8a1&clip_id=mYKXzOcEIpiMApRsAHQHJ",
 *       "trigger_type": "SecuritySOSEvent",
 *       "trigger_id": "56f3d971-daf2-4e43-b3d4-bd3da730f8a1",
 *       "pinned": false,
 *       "location": "ca496b5f-4142-47d6-92a3-060afa3c05da",
 *       "room_id": null
 *     },
 *     {
 *       "id": "0dB_Qt-LT5b_Psy_BswMJ",
 *       "source_id": "56f3d971-daf2-4e43-b3d4-bd3da730f8a1",
 *       "start": "2017-06-05T15:55:49.0Z",
 *       "duration": 59.924,
 *       "file_size": 14951240,
 *       "expires_at": "2017-06-12T15:55:49.0Z",
 *       "state": "present",
 *       "media_url": "https://media21.ec2.st-av.net/v1/clip/media?source_id=56f3d971-daf2-4e43-b3d4-bd3da730f8a1&clip_id=0dB_Qt-LT5b_Psy_BswMJ",
 *       "thumb_url": "https://media21.ec2.st-av.net/v1/image/media?source_id=56f3d971-daf2-4e43-b3d4-bd3da730f8a1&clip_id=0dB_Qt-LT5b_Psy_BswMJ",
 *       "trigger_type": "motion",
 *       "trigger_id": "56f3d971-daf2-4e43-b3d4-bd3da730f8a2",
 *       "pinned": true,
 *       "location": "ca496b5f-4142-47d6-92a3-060afa3c05da",
 *       "room_id": null
 *     }
 *   ]
 * }
 */

 /**
 * @api onVideoSourcesCallback(response) void onVideoSourcesCallback()
 * @apiName onVideoSourcesCallback
 * @apiGroup Video
 * @apiDescription [In-House] Gets video sources.
 * @apiVersion 1.3.4
 * @apiPrivate
 *
 * @apiParam {Object} response The response data.
 * Server Api Reference https://librarian-regionals.smartthingsgdev.com/avp/sources.html#get-sources
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onVideoSourcesCallback(response) {
 *     console.log("Sources info : " + JSON.stringify(response));
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * {
 *   "current_page": 2,
 *   "next": "https://api.st-av.net/v2/sources?location=501a458f-3f2c-49e3-b59d-ecca09b71c0c&max=1&page=3",
 *   "previous": "https://api.st-av.net/v2/sources?location=501a458f-3f2c-49e3-b59d-ecca09b71c0c&max=1&page=1",
 *   "sources": [
 *       {
 *           "id": "56f3d971-daf2-4e43-b3d4-bd3da730f8a1",
 *           "name": "Front Door",
 *           "user_id": "bob",
 *           "location": "501a458f-3f2c-49e3-b59d-ecca09b71c0c",
 *           "created": "2017-04-05T18:33:01.0Z",
 *           "modified": "2017-04-05T18:33:01.0Z",
 *           "profiles": {
 *               "high": {
 *                   "media": {"bit_rate": 1000000, "tracks": [{"type": "video", "codec": "H264", "width": 1280, "height": 720, "frame_rate": 30, "bit_rate": 1000000}]}
 *               },
 *               "constrained": {
 *                   "media": {"bit_rate": 128000, "tracks": [{"type": "video", "codec": "H264", "width": 640, "height": 480, "frame_rate": 15, "bit_rate": 128000}]}
 *               },
 *               "medium quality": {
 *                   "media": {"bit_rate": 512000, "tracks": [{"type": "video", "codec": "H264", "width": 640, "height": 480, "frame_rate": 15, "bit_rate": 512000}]}, "max_clip_duration": 120
 *               }
 *           },
 *           "default_profile": "high",
 *           "properties": {
 *               "clip_retention": 7,
 *               "RSSI": -46,
 *               "signal_strength": 5
 *           },
 *           "online": false,
 *           "motion_enabled": false,
 *           "disabled": false,
 *           "clip_duration": 15,
 *           "vendor": "carrierA",
 *           "model": "modelB",
 *           "manufacturer": "sercomm",
 *           "clip_retention_days": 7,
 *           "encryption": true,
 *           "features": ["clip_stop", "recv_audio"]
 *       }
 *   ],
 *   "total_results": 10
 * }
 */

/**
 * @api onVideoDownloadMediaCallback(mediaUrl,filePath) void onVideoDownloadMediaCallback()
 * @apiName onVideoDownloadMediaCallback
 * @apiGroup VideoClip
 * @apiDescription [In-House] Defines notification callbacks for a download complete.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {String} mediaUrl Media URL of the corresponding download operation.
 * @apiParam {String} filePath The final file path for the downloaded file.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onVideoDownloadMediaCallback(mediaUrl, filePath) {
 *     console.log("Media clip download completed : " + filePath);
 * }
 *
 */

/**
 * @api onVideoDownloadThumbnailCallback(thumbUrl,filePath,resultData) void onVideoDownloadThumbnailCallback()
 * @apiName onVideoDownloadThumbnailCallback
 * @apiGroup VideoClip
 * @apiDescription [In-House] Defines notification callbacks for a download complete.
 * @apiVersion 1.3.4
 * @apiPrivate
 *
 * @apiParam {String} thumbUrl Thumbnail URL of the corresponding download operation.
 * @apiParam {String} filePath The final file path for the downloaded file.
 * @apiParam {Object} [resultData] Optional. Result data received from view page. JSON Object.
 * @apiParam {String} [resultData.thumbnailEncryptKey] Optional. Encryption key of thumbnail
 * @apiParam {String} [resultData.thumbnailEncryptIv] Optional. Initialization vector of thumbnail.
 * @apiParam {Boolean} [resultData.isCached] Optional. Downloaded by this api call(false). Already downloaded by previous api call(true)
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onVideoDownloadThumbnailCallback(thumbUrl,filePath,resultData){
 *     console.log("Thumbnail clip download completed : " + filePath);
 *     console.log("ResultData.thumbnailEncryptKey: " + resultData.thumbnailEncryptKey);
 *     console.log("ResultData.thumbnailEncryptIv: " + resultData.thumbnailEncryptIv);
 *     console.log("ResultData.isCached: " + resultData.isCached);
 * }
 *
 */

/**
 * @api onBLEAdapterDeviceCallback(device) void onBLEAdapterDeviceCallback()
 * @apiName onBLEAdapterDeviceCallback
 * @apiGroup BluetoothLEAdapter
 * @apiDescription Gets bluetooth LE device registered in device plugin.
 * @apiVersion 1.3.0
 *
 * @apiParam {BluetoothLEDevice} device Device registered in device plugin.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onBLEAdapterDeviceCallback(device) {
 *     console.log("Device name : " + device.name);
 * }
 *
 */

/**
 * @api onBLEDeviceConnectCallback() void onBLEDeviceConnectCallback()
 * @apiName onBLEDeviceConnectCallback
 * @apiGroup BluetoothLEDevice
 * @apiDescription Method invoked when the connection is established successfully.
 * @apiVersion 1.3.0
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onBLEDeviceConnectCallback() {
 *     console.log("Connected to device");
 * }
 *
 */

/**
 * @api onBLEDeviceDisconnectCallback() void onBLEDeviceDisconnectCallback()
 * @apiName onBLEDeviceDisconnectCallback
 * @apiGroup BluetoothLEDevice
 * @apiDescription Method invoked when the connection is finished successfully.
 * @apiVersion 1.3.0
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onBLEDeviceDisconnectCallback() {
 *     console.log("Disconnected");
 * }
 *
 */

/**
 * @api onBLEDeviceGATTServiceCallback(services) void onBLEDeviceGATTServiceCallback()
 * @apiName onBLEDeviceGATTServiceCallback
 * @apiGroup BluetoothLEDevice
 * @apiDescription Gets a GATT service offered by the remote device.
 * @apiVersion 1.3.0
 *
 * @apiParam {[BluetoothGATTService]} services Retrieved list of services for the given UUID.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onBLEDeviceGATTServiceCallback(services) {
 *     console.log("Service got");
 * }
 *
 */

/**
 * @api onBLEDeviceUuidCallback(uuids) void onBLEDeviceUuidCallback()
 * @apiName onBLEDeviceUuidCallback
 * @apiGroup BluetoothLEDevice
 * @apiDescription Gets list of service UUID.
 * @apiVersion 1.3.0
 *
 * @apiParam {[String]} uuids The list of Service UUID.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onBLEDeviceUuidCallback(uuids) {
 *     console.log("Service uuids : " + uuids);
 * }
 *
 */

/**
 * @api onBLEDeviceConfigurationCallback(configuration) void onBLEDeviceConfigurationCallback()
 * @apiName onBLEDeviceConfigurationCallback
 * @apiGroup BluetoothLEDevice
 * @apiDescription Gets BLE Configuration.
 * @apiVersion 1.3.1
 *
 * @apiParam {Object} configuration The object of BLE Configuration.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onBLEDeviceConfigurationCallback(configuration) {
 *     console.log("BLE Configuration : " + configuration);
 * }
 *
 */

/**
 * @api onBLEDeviceConnectChangeCallback(state) void onBLEDeviceConnectChangeCallback()
 * @apiName onBLEDeviceConnectChangeCallback
 * @apiGroup BluetoothLEDevice
 * @apiDescription Gets BLE device connection state.
 * @apiVersion 1.3.0
 *
 * @apiParam {String} state BLE device connection state. If the connection state is 'DISCONNECTED', the BluetoothLEDevice api will not work.
 *                                "CONNECTED" "DISCONNECTED"
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onBLEDeviceConnectChangeCallback(state) {
 *     if (state == "CONNECTED") {
 *         // Do something...
 *     } else if (state == "DISCONNECTED") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onBLEDeviceRssiCallback(rssi) void onBLEDeviceRssiCallback()
 * @apiName onBLEDeviceRssiCallback
 * @apiGroup BluetoothLEDevice
 * @apiDescription Gets the rssi value on the device connection.
 * @apiVersion 1.3.0
 *
 * @apiParam {Number} rssi The rssi value for the remote device.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onBLEDeviceRssiCallback(rssi) {
 *     console.log("device rssi : " + rssi);
 * }
 *
 */

/**
 * @api onGATTServiceCharacteristicsCallback(characteristics) void onGATTServiceCharacteristicsCallback()
 * @apiName onGATTServiceCharacteristicsCallback
 * @apiGroup BluetoothGATTService
 * @apiDescription Gets a GATT characteristic offered by the remote device.
 * @apiVersion 1.3.0
 *
 * @apiParam {[BluetoothGATTCharacteristic]} characteristics Retrieved a list of characteristics or a characteristic with a given UUID.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTServiceCharacteristicsCallback(characteristics) {
 *     console.log("GATT characteristics got");
 * }
 *
 */

/**
 * @api onGATTCharacteristicDescriptorCallback(descriptors) void onGATTCharacteristicDescriptorCallback()
 * @apiName onGATTCharacteristicDescriptorCallback
 * @apiGroup BluetoothGATTCharacteristic
 * @apiDescription Gets a GATT descriptor offered by the remote device.
 * @apiVersion 1.3.0
 *
 * @apiParam {[BluetoothGATTDescriptor]} descriptors Retrieved a list of descriptors or a descriptor with a given UUID.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTCharacteristicDescriptorCallback(descriptors) {
 *     console.log("GATT descriptors got");
 * }
 *
 */

/**
 * @api onGATTCharacteristicReadValueCallback(value) void onGATTCharacteristicReadValueCallback()
 * @apiName onGATTCharacteristicReadValueCallback
 * @apiGroup BluetoothGATTCharacteristic
 * @apiDescription Invoked when a characteristic value has been read.
 * @apiVersion 1.3.0
 *
 * @apiParam {[byte]} val Characteristic value.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTCharacteristicReadValueCallback(value) {
 *     console.log("Characteristic value : " + value);
 * }
 *
 */

/**
 * @api onGATTCharacteristicWriteValueCallback() void onGATTCharacteristicWriteValueCallback()
 * @apiName onGATTCharacteristicWriteValueCallback
 * @apiGroup BluetoothGATTCharacteristic
 * @apiDescription Invoked when a characteristic value is written successfully.
 * @apiVersion 1.3.0
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTCharacteristicWriteValueCallback() {
 *     console.log("Characteristic value written");
 * }
 *
 */

/**
 * @api onGATTCharacteristicSecureReadValueCallback(value) void onGATTCharacteristicSecureReadValueCallback()
 * @apiName onGATTCharacteristicSecureReadValueCallback
 * @apiGroup BluetoothGATTCharacteristic
 * @apiDescription Invoked when a characteristic value has been read.
 * @apiVersion 1.3.0
 *
 * @apiParam {[byte]} val Characteristic value.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTCharacteristicSecureReadValueCallback(value) {
 *     console.log("Characteristic value : " + value);
 * }
 *
 */

/**
 * @api onGATTCharacteristicSecureWriteValueCallback() void onGATTCharacteristicSecureWriteValueCallback()
 * @apiName onGATTCharacteristicSecureWriteValueCallback
 * @apiGroup BluetoothGATTCharacteristic
 * @apiDescription Invoked when a characteristic value is written successfully.
 * @apiVersion 1.3.0
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTCharacteristicSecureWriteValueCallback() {
 *     console.log("Characteristic value written");
 * }
 *
 */

/**
 * @api onGATTCharacteristicValueChangeCallback(value) void onGATTCharacteristicValueChangeCallback()
 * @apiName onGATTCharacteristicValueChangeCallback
 * @apiGroup BluetoothGATTCharacteristic
 * @apiDescription Invoked when a characteristic value has been changed.
 * @apiVersion 1.3.0
 *
 * @apiParam {[byte]} val Characteristic value.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTCharacteristicValueChangeCallback(value) {
 *     console.log("Characteristic value : " + value);
 * }
 *
 */

/**
 * @api onGATTDescriptorReadValueCallback(value) void onGATTDescriptorReadValueCallback()
 * @apiName onGATTDescriptorReadValueCallback
 * @apiGroup BluetoothGATTDescriptor
 * @apiDescription Invoked when a descriptor value has been read.
 * @apiVersion 1.3.0
 *
 * @apiParam {[byte]} val Descriptor value.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTDescriptorReadValueCallback(value) {
 *     console.log("Descriptor value : " + value);
 * }
 *
 */

/**
 * @api onGATTDescriptorWriteValueCallback() void onGATTDescriptorWriteValueCallback()
 * @apiName onGATTDescriptorWriteValueCallback
 * @apiGroup BluetoothGATTDescriptor
 * @apiDescription Invoked when a descriptor value is written successfully.
 * @apiVersion 1.3.0
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTDescriptorWriteValueCallback() {
 *     console.log("Descriptor value written");
 * }
 *
 */

/**
 * @api onGATTDescriptorSecureReadValueCallback(value) void onGATTDescriptorSecureReadValueCallback()
 * @apiName onGATTDescriptorSecureReadValueCallback
 * @apiGroup BluetoothGATTDescriptor
 * @apiDescription Invoked when a descriptor value has been read.
 * @apiVersion 1.3.0
 *
 * @apiParam {[byte]} val Descriptor value.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTDescriptorSecureReadValueCallback(value) {
 *     console.log("Descriptor value : " + value);
 * }
 *
 */

/**
 * @api onGATTDescriptorSecureWriteValueCallback() void onGATTDescriptorSecureWriteValueCallback()
 * @apiName onGATTDescriptorSecureWriteValueCallback
 * @apiGroup BluetoothGATTDescriptor
 * @apiDescription Invoked when a descriptor value is written successfully.
 * @apiVersion 1.3.0
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGATTDescriptorSecureWriteValueCallback() {
 *     console.log("Descriptor value written");
 * }
 *
 */

/**
 * @api onD2dBLEDeviceCallback(bleDevice) void onD2dBLEDeviceCallback()
 * @apiName onD2dBLEDeviceCallback
 * @apiGroup D2dManager
 * @apiDescription Gets BLE device registered in device plugin.
 * @apiVersion 1.3.3
 *
 * @apiParam {BLEDevice} bleDevice Device registered in device plugin.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceCallback(bleDevice) {
 *     console.log("Device name : " + bleDevice.name);
 * }
 *
 */

/**
 * @api onD2dBLEDeviceConnectCallback() void onD2dBLEDeviceConnectCallback()
 * @apiName onD2dBLEDeviceConnectCallback
 * @apiGroup BLEDevice
 * @apiDescription Method invoked when the connection is established successfully.
 * @apiVersion 1.3.3
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceConnectCallback() {
 *     console.log("Connected to device");
 * }
 *
 */

/**
 * @api onD2dBLEDeviceDisconnectCallback() void onD2dBLEDeviceDisconnectCallback()
 * @apiName onD2dBLEDeviceDisconnectCallback
 * @apiGroup BLEDevice
 * @apiDescription Method invoked when the connection is finished successfully.
 * @apiVersion 1.3.3
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceDisconnectCallback() {
 *     console.log("Disconnected");
 * }
 *
 */

/**
 * @api onD2dBLEDeviceConfigurationCallback(configuration) void onD2dBLEDeviceConfigurationCallback()
 * @apiName onD2dBLEDeviceConfigurationCallback
 * @apiGroup BLEDevice
 * @apiDescription Gets BLE Configuration.
 * @apiVersion 1.3.3
 *
 * @apiParam {Object} configuration The object of BLE Configuration.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceConfigurationCallback(configuration) {
 *     console.log("BLE Configuration : " + configuration);
 * }
 *
 */

/**
 * @api onD2dBLEDeviceConnectChangeCallback(state) void onD2dBLEDeviceConnectChangeCallback()
 * @apiName onD2dBLEDeviceConnectChangeCallback
 * @apiGroup BLEDevice
 * @apiDescription Gets BLE Core device connection state.
 * @apiVersion 1.3.3
 *
 * @apiParam {String} state BLE device connection state. "CONNECTED" "NEARBY" "OUTOFRANGE"
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceConnectChangeCallback(state) {
 *   if (state == "CONNECTED") {
 *     // Connected GATT
 *   } else if (state == "NEARBY") {
 *     // Received Advertising Packet
 *   } else if (state == "OUTOFRANGE") {
 *     // Can't Received Advertising Packet
 *   }
 *
 */

/**
 * @api onD2dBLEDeviceGetConnectedStateCallback(state) void onD2dBLEDeviceGetConnectedStateCallback()
 * @apiName onD2dBLEDeviceGetConnectedStateCallback
 * @apiGroup BLEDevice
 * @apiDescription Receive Connected state of BLE Device
 * @apiVersion 1.3.5
 *
 * @apiParam {String} state State of BLE Device ("CONNECTED", "NEARBY", "OUTOFRANGE")
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceGetConnectedStateCallback(state) {
 *   if (state == "CONNECTED") {
 *     // Connected GATT
 *   } else if (state == "NEARBY") {
 *     // Received Advertising Packet
 *   } else if (state == "OUTOFRANGE") {
 *     // Can't Received Advertising Packet
 *   }
 * }
 *
 */

/**
 * @api onD2dBLEDeviceNotificationCallback(state) void onD2dBLEDeviceNotificationCallback()
 * @apiName onD2dBLEDeviceNotificationCallback
 * @apiGroup BLEDevice
 * @apiDescription Gets BLE Core device Notification state.
 * @apiVersion 1.3.4
 *
 * @apiParam {String} state BLE device Notification state.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceNotificationCallback(state) {
 *   console.log("Notification state :" + state)
 * }
 *
 */

/**
 * @api onD2dBLEDevicePutLogCallback() void onD2dBLEDevicePutLogCallback()
 * @apiName onD2dBLEDevicePutLogCallback
 * @apiGroup BLEDevice
 * @apiDescription Invokes when the putting is established successfully.
 * @apiVersion 1.3.5
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDevicePutLogCallback() {
 *   console.log("Put Log of BLE Device to Log folder");
 * }
 *
 */

/**
 * @api onD2dBLEDeviceExecuteCommandCallback() void onD2dBLEDeviceExecuteCommandCallback()
 * @apiName onD2dBLEDeviceExecuteCommandCallback
 * @apiGroup BLEDevice
 * @apiDescription Method invoked when the execute is established successfully.
 * @apiVersion 1.3.3
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceExecuteCommandCallback(state) {
 *   if (state == 'SUCCESS') {
 *     console.log("Successfully execute command");
 *   } else {
 *     console.log("Failed to execute command");
 *   }
 * }
 *
 */

 /**
 * @api onD2dBLEDeviceFetchAttributeCallback() void onD2dBLEDeviceFetchAttributeCallback()
 * @apiName onD2dBLEDeviceFetchAttributeCallback
 * @apiGroup BLEDevice
 * @apiDescription Method invoked when the execute is established successfully.
 * @apiVersion 1.3.4
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceFetchAttributeBatteryCallback(attribute) {
 *   console.log("Value of attribute : : attribute.value);
 *   console.log("Unit of attribute : : attribute.unit);
 *   console.log("Min of attribute : : attribute.min);
 *   console.log("Max of attribute : : attribute.max);
 *   // attribute is { value : "40", unit : "%", min : "0", max : "100"}
 * }
 *
 * function onD2dBLEDeviceFetchAttributeTagButtonCallback(attribute) {
 *   console.log("Value of attribute : : attribute.value);
 *   // attribute is { value : "pushed"}
 * }
 *
 */

/**
 * @api onD2dBLEDeviceSetNotificationIndicatorCallback() void onD2dBLEDeviceSetNotificationIndicatorCallback()
 * @apiName onD2dBLEDeviceSetNotificationIndicatorCallback
 * @apiGroup BLEDevice
 * @apiDescription Method invoked when the execute is established successfully.
 * @apiVersion 1.3.6
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onD2dBLEDeviceSetNotificationIndicatorCallback(state) {
 *   console.log("Notification Indicator state :" + state);
 * }
 *
 */

/**
 * @api onDeviceHubDeviceInterfaceCallback(hubDeviceObject) void onDeviceHubDeviceInterfaceCallback()
 * @apiName onDeviceHubDeviceInterfaceCallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Gets the object of hub device interface.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {HubDeviceInterface} hubDeviceObject The hub device interface.
 *
 * @apiExample {js} Callback Function Example usage:
 *   function onDeviceHubDeviceInterfaceCallback(hubDeviceObject) {
 *      console.log("Hub Device Name : " hubDeviceObject.name);
 *
 *       for (var i in hubDeviceObject.devices) {
 *           var device = hubDeviceObject.devices[i];
 *           console.log("Device Name: " + device.hub.name);
 *           console.log("Device Status: " + device.hub.status);
 *       }
 *   }
 *
 * @apiSuccessExample {Object} hubDeviceObject (example)
 *   {
 *       hub: {
 *           id: 'fecbf85e-aa32-42af-9a66-9c49d835d709',
 *           name: 'SmartThings hub',
 *           locationId: 'dcccd228-01ad-4320-9282-cb8ea87dc300',
 *           firmwareVersion: '000.017.00055',
 *           zigbeeId: 'D052A8AB872E0001',
 *           status: 'ACTIVE',
 *           onlineSince: '2018-12-02T03:06:17.758Z',
 *           firmwareUpdateAvailable: false,
 *           hardwareId: '001D',
 *           hardwareDescription: 'SmartThings WiFi Pro, Vodafone (UK)',
 *           isZwaveUtilEnabled: true,
 *           onlineSinceDate: 1543719977758,
 *           data: {
 *               appengineConnected: 'false',
 *               appengineEnabled: 'false',
 *               appengineVersion: '0.0.0',
 *               backupVersion: '0.0.0',
 *               batteryInUse: 'false',
 *               batteryVoltage: '65535 mV',
 *               bluetoothRadioDetected: 'false',
 *               bluetoothRadioEnabled: 'false',
 *               bluetoothRadioFunctional: 'false',
 *               bootloaderVersion: '0',
 *               emmcHealth: '1',
 *               emmcLifeTypeA: '1',
 *               emmcLifeTypeB: '1',
 *               hardwareID: '001D',
 *               hubcoreVersion: '000.017.00055',
 *               leeEnabled: 'false',
 *               localIP: '192.168.1.176',
 *               localSrvPortTCP: '39500',
 *               localSrvPortUDP: '0',
 *               macAddress: '94:8B:C1:A7:5A:92',
 *               originalZigbeeEui: '000B57FFFE9EFC7C',
 *               presenceTimeout: '2',
 *               updaterVersion: '0',
 *               videocoreVersion: '0.0.0',
 *               zigbeeChannel: '20',
 *               zigbeeEui: '000B57FFFE9EFC7C',
 *               zigbeeFirmware: '2.5.0',
 *               zigbeeNcpFirmware: '0.3.11',
 *               zigbeeNodeID: '0000',
 *               zigbeeOta: '2',
 *               zigbeePanID: '8521',
 *               zigbeePowerLevel: '10',
 *               zigbeeRadioDetected: 'true',
 *               zigbeeRadioEnabled: 'true',
 *               zigbeeRadioFunctional: 'true',
 *               zigbeeType: '15',
 *               zigbeeUnsecureRejoin: 'false',
 *               zwaveControllerStatus: '01',
 *               zwaveHomeID: 'C7821F21',
 *               zwaveNodeID: '01',
 *               zwavePowerLevel: 'full',
 *               zwaveRadioDetected: 'true',
 *               zwaveRadioEnabled: 'true',
 *               zwaveRadioFunctional: 'true',
 *               zwaveRegion: 'EU',
 *               zwaveSerialVersion: '4',
 *               zwaveSucID: '01',
 *               zwaveVersion: '4.38'
 *           },
 *           type: {
 *               name: 'Hub'
 *           }
 *       },
 *       devices: [{
 *           id: '094d99d6-1331-47b6-bbd1-5e8ec0e24435',
 *           name: 'Hue 6FCA46 (Hue Bridge)',
 *           hubId: 'fecbf85e-aa32-42af-9a66-9c49d835d709',
 *           locationId: 'dcccd228-01ad-4320-9282-cb8ea87dc300',
 *           label: 'Hue 6FCA46',
 *           status: 'OFFLINE',
 *           typeId: '95ec7fac-5f27-4bb5-989b-1f6fcc477642',
 *           typeName: 'LAN Hue Bridge',
 *           deviceNetworkId: '0017886FCA46',
 *           virtual: false,
 *           primaryTileName: null,
 *           completedSetup: true,
 *           network: 'u',
 *           stateOverrides: [],
 *           role: 'none',
 *           parentSmartAppId: 'c413915e-4a90-4af0-b133-8c38a509dd58',
 *           parentDeviceId: null,
 *           isComponent: false,
 *           componentName: null,
 *           componentLabel: null,
 *           isExecutingLocally: false,
 *           lastActivityTime: 1543379563751
 *       }, {
 *           id: 'a81725b9-9fb6-4b96-b3f8-b6506cf32bcc',
 *           name: 'Hue color lamp 1 (Hue Extended Color)',
 *           hubId: 'fecbf85e-aa32-42af-9a66-9c49d835d709',
 *           locationId: 'dcccd228-01ad-4320-9282-cb8ea87dc300',
 *           label: 'Hue color lamp 1',
 *           status: 'OFFLINE',
 *           typeId: '960b7098-9512-4262-9540-893e9905f508',
 *           typeName: 'LAN Hue Extended Color',
 *           deviceNetworkId: '0017886FCA46/1',
 *           virtual: false,
 *           primaryTileName: null,
 *           completedSetup: true,
 *           network: 'u',
 *           stateOverrides: [],
 *           role: 'none',
 *           parentSmartAppId: null,
 *           parentDeviceId: '094d99d6-1331-47b6-bbd1-5e8ec0e24435',
 *           isComponent: false,
 *           componentName: null,
 *           componentLabel: null,
 *           isExecutingLocally: false,
 *           lastActivityTime: null
 *       }]
 *   }
 *
 */

/**
 * @api onHubDeviceGetStatusCallback(hubStatusType,result) void onHubDeviceGetStatusCallback()
 * @apiName onHubDeviceGetStatusCallback
 * @apiGroup HubDeviceInterface
 * @apiDescription [In-House] Gets specific status type of hub device.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {String} hubStatusType Type of information.
 * @apiParam {Boolean} result Result of the request.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onHubDeviceGetStatusCallback(hubStatusType, result) {
 *     if (hubStatusType== "HUB_PRIMARY_ZWAVE_CONTROLLER" && result == true) {
 *        console.log("Status of hub primary zwave controller is enable.);
 *     } else if (hubStatusType== "ZWAVE_ENABLED" && result == true) {
 *        console.log("Status of Zwave is enable.");
 *     } else if (hubStatusType== "ZWAVE_ADDED" && result == true) {
 *        console.log("Zwave is added.");
 *     }
 * }
 *
 */

/**
 * @api onHubDeviceNavigateToCallback(NavigationViewType,resultData) void onHubDeviceNavigateToCallback()
 * @apiName onHubDeviceNavigateToCallback
 * @apiGroup HubDeviceInterface
 * @apiDescription [In-House] Method invoked when the invocation ends successfully.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {String} NavigationViewType Type name of native view
 * @apiParam {String} resultData Result of the request.
 *
 * @apiSuccessExample {JSON} Result data of detail views.
 *   // Success response
 *   "USER_OK"
 *
 *   // User canceled response
 *   "USER_CANCEL"
 *
 * @apiUse NAVIGAETE_RESULT
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onHubDeviceNavigateToCallback(NavigationViewType, resultData) {
 *     console.log("Navigate to the specific hub device page successfully. : " + navigationViewType);
 * }
 *
 */

/**
 * @api onHubDeviceGetFirmwareUpdateStatusCallback(status) void onHubDeviceGetFirmwareUpdateStatusCallback()
 * @apiName onHubDeviceGetFirmwareUpdateStatusCallback
 * @apiGroup HubDeviceInterface
 * @apiDescription [In-House] Gets the firmware update status of hub device.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {Object} status Firmware update status of hub device.
 * @apiParam {Boolean} status.enabled Status of enabled.
 * @apiParam {Boolean} status.lightsEnabled Status of lights enabled.
 *
 * @apiExample {js} Callback Function - Example usage:
 *
 * function onHubDeviceGetFirmwareUpdateStatusCallback(status) {
 *     if (status.enabled == true && status.lightsEnabled == true) {
 *        console.log("Status of firmware update is ALL");
 *     } else if (status.enabled == true && status.lightsEnabled == false) {
 *        console.log("Status of firmware update is NO_LIGHTBULBS");
 *     } else if (status.enabled == false) {
 *        console.log("Status of firmware update is NEVER");
 *     }
 * }
 *
 */

/**
 * @api onHubDeviceGetSecureModeCallback(status) void onHubDeviceGetSecureModeCallback()
 * @apiName onHubDeviceGetSecureModeCallback
 * @apiGroup HubDeviceInterface
 * @apiDescription [In-House] Gets the secure mode status of hub device.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {Boolean} status Secure mode status of hub device.
 *
 * @apiExample {js} Callback Function - Example usage:
 *
 * function onHubDeviceGetSecureModeCallback(status) {
 *   if (result == true) {
 *     console.log("Status of secure mode is true.");
 *   }
 * }
 *
 */
/**
 * @api onHubDeviceSetFirmwareUpdateStatusCallback() void onHubDeviceSetFirmwareUpdateStatusCallback()
 * @apiName onHubDeviceSetFirmwareUpdateStatusCallback
 * @apiGroup HubDeviceInterface
 * @apiDescription [In-House] Set the firmware update status of hub device.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 *
 * function onHubDeviceSetFirmwareUpdateStatusCallback() {
 *
 * }
 *
 */

/**
 * @api onHubDeviceSetSecureModeCallback() void onHubDeviceSetSecureModeCallback()
 * @apiName onHubDeviceSetSecureModeCallback
 * @apiGroup HubDeviceInterface
 * @apiDescription [In-House] Set the secure mode status of hub device.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 *
 * function onHubDeviceSetSecureModeCallback() {
 *
 * }
 *
 */

/**
 * @api onDeviceRequestFirmwareUpdateCallback(status) void onDeviceRequestFirmwareUpdateCallback()
 * @apiName onDeviceRequestFirmwareUpdateCallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Requests to enable firmware update of this device.
 * @apiVersion 1.3.0
 *
 * @apiParam {Boolean} status Status of firmware updated status of this device.
 *
 * @apiExample {js} Callback Function - Example usage:
 *
 * function onDeviceRequestFirmwareUpdateCallback(status) {
 *   if (result == true) {
 *     console.log("Status of Requested firmware update is true.");
 *   }
 * }
 *
 */

/**
 * @api onSetDeviceStateListener(deviceState) void onSetDeviceStateListener()
 * @apiName onSetDeviceStateListener
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Callback to receive device state from device.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {String} deviceState Status of device.
 *
 * @apiSuccessExample {JSON} Result data of detail views.
 *   // Device was added
 *   "add"
 *
 *   // Device was updated
 *   "updated"
 *
 *   // Device was deleted
 *   "delete"
 *
 * @apiUse CHANGED_DEVICE_STATE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onSetDeviceStateListener(deviceState) {
 *     if (deviceState == "add") {
 *       // Device was added
 *     } else if (deviceState == "update") {
 *       // Device was updated
 *     } else if (deviceState == "delete") {
 *       // Device was removed
 *     }
 * }
 *
 */

/**
 * @api onGetResourceTypesByResourceURICallback(resourceTypes) void onGetResourceTypesByResourceURICallback()
 * @apiName onGetResourceTypesByResourceURICallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Callback to receive device state from device.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {Array} resourceTypes Array of resourced type.
 *
 * @apiSuccessExample {JSON} Result data of detail views.
 *
 *   // Array of resourced type.
 *   ["oic.r.sensor.threeaxis"]
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGetResourceTypesByResourceURICallback(resourceTypes) {
 *   console.log("resourceTypes is : " + JSON.stringify(resourceTypes));
 * }
 *
 */
/**
 * @api onGetRegisteredDeviceInfoCallback(deviceList) void onGetRegisteredDeviceInfoCallback()
 * @apiName onGetRegisteredDeviceInfoCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Callback to receive device information.
 * @apiVersion 1.3.0
 * @apiPrivate
 * @apiParam {Array} deviceList Array of device.
 *
 * @apiSuccess (Property) {[Object]} deviceList List of device.
 * @apiSuccess (Property) {String} deviceList.deviceId Global id of device.
 * @apiSuccess (Property) {String} deviceList.deviceName Name of device.
 * @apiSuccess (Property) {String} deviceList.deviceType Type uri of device.
 * @apiSuccess (Property) {String} deviceList.locationId Location id of device.
 * @apiSuccess (Property) {String} deviceList.locationName Location name of device.
 * @apiSuccess (Property) {String} deviceList.roomId Room id of device.
 * @apiSuccess (Property) {String} deviceList.roomName Room name of device.
 * @apiSuccess (Property) {[String]} deviceList.resourceUris All resource URIs of device.
 * @apiSuccess (Property) {Object} deviceList.metadata UIMetadata of device. JSON Object.
 *
 * @apiSuccessExample {JSON} Result data of detail views.
 *
 *   // Array of device in this location
 *   [
 *     {
 *      "deviceId" : "device-01",
 *      "deviceName" : "전등 01",
 *      "deviceType" : "oic.d.light",
 *      "locationName" : "사무실",
 *      "locationId" : "f0ef728e-aaea-4e58-ba9a-8e3e9efde2ca",
 *      "roomName" : "책상",
 *      "roomId" : "3bf4648c-2ff5-46cc-9fa2-dc9681efc1d6",
 *      "metadata" : {"ma":[{"controlType":"StandbyPowerSwitch","name":"Switch","property":"value","range":null,"step":0,"type":"main","order":1}],"ms":[{"name":"Switch","emphasis":false,"label":{"arguments":[{"property":"value","alternatives":[{"value":"___PO_CODE_SMARTTHINGS_DREAM_SAC_SBODY_ON_T_SAMSUNG_CONNECT","key":"true"},{"type":"inactive","value":"___PO_CODE_SMARTTHINGS_DREAM_SAC_SBODY_OFF_T_SAMSUNG_CONNECT","key":"false"}],"href":"/capability/switch/0","n":"var1"}], ...
 *     },
 *     {
 *      "deviceId" : "device-02",
 *      "deviceName" : "안방 전등",
 *      "deviceType" : "oic.d.light",
 *      "locationName" : "사무실",
 *      "locationId" : "f0ef728e-aaea-4e58-ba9a-8e3e9efde2ca",
 *      "roomName" : "책상",
 *      "roomId" : "3bf4648c-2ff5-46cc-9fa2-dc9681efc1d6",
 *      "metadata" : {"ma":[{"controlType":"StandbyPowerSwitch","name":"Switch","property":"value","range":null,"step":0,"type":"main","order":1}],"ms":[{"name":"Switch","emphasis":false,"label":{"arguments":[{"property":"value","alternatives":[{"value":"___PO_CODE_SMARTTHINGS_DREAM_SAC_SBODY_ON_T_SAMSUNG_CONNECT","key":"true"},{"type":"inactive","value":"___PO_CODE_SMARTTHINGS_DREAM_SAC_SBODY_OFF_T_SAMSUNG_CONNECT","key":"false"}],"href":"/capability/switch/0","n":"var1"}], ...
 *     }
 *    ]
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGetRegisteredDeviceInfoCallback(deviceList) {
 *   console.log("List of device id and name : " + JSON.stringify(deviceList));
 * }
 *
 */


/**
 * @api onGetDevicePreferencesCallback(preferences) void onGetDevicePreferencesCallback()
 * @apiName onGetDevicePreferencesCallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Get the preferences for a device.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {[Object]} preferences Object Array about device preference.
 * @apiParam {String} preferences.name The name/id of the preference.
 * @apiParam {String} preferences.description A description of what the preference does.
 * @apiParam {Boolean} preferences.multiple Allow multiple instances of this setting, always set to false for Device Preferences.
 * @apiParam {String} preferences.title An optional header for the preference.
 * @apiParam {Boolean} preferences.required Whether this setting is required to be set.
 * @apiParam {String} preferences.type Type of preference. <br />Enum:"bool" "boolean" "enum" "text" "number" "decimal" "password" "paragraph".
 * @apiParam {Object} preferences.defaultValue Default preference value.
 * @apiParam {Object} preferences.value Preference value. Can be string, integer, number, boolean or list. Stored in database as varchar(255).
 * @apiParam {Object} preferences.options List of options; either list of strings or map of key/value pairs.
 * @apiParam {Boolean} preferences.displayDuringSetup Display this setting during device setup.
 * @apiParam {String} preferences.element Element name.
 *
 *
 *
 * @apiSuccessExample {JSON} Result data of detail views.
 *  [
 *   {
 *    "description": "Section Title Description",
 *    "multiple": false,
 *    "title": "Section Title",
 *    "required": false,
 *    "displayDuringSetup": false,
 *    "type": "paragraph",
 *    "element": "paragraph",
 *    "value": ""
 *   },
 *   {
 *    "description": "Text Description",
 *    "multiple": false,
 *    "title": "Text Title",
 *    "required": false,
 *    "defaultValue": "title",
 *    "type": "text",
 *    "value": ""
 *  },
 *  {
 *    "description": "Enum Description",
 *    "multiple": false,
 *    "title": "Enum Title",
 *    "required": false,
 *    "options": {
 *      "Option1Key": "Option 1 Value",
 *      "Option2Key": "Option 2 Value"
 *    },
 *    "defaultValue": "Option1Key",
 *    "name": "enumInput",
 *    "type": "enum",
 *    "value": ""
 *  },
 *  {
 *   "description": "Enum Description",
 *   "multiple": false,
 *   "title": "Enum Title with alternative options style",
 *   "required": false,
 *   "options": [
 *     "Option1",
 *     "Option2"
 *   ],
 *   "defaultValue": "Option1",
 *   "name": "enumInput",
 *   "type": "enum",
 *   "value": ""
 *  }
 * ]
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGetDevicePreferencesCallback(preferences) {
 *    console.log("preference is : " + JSON.stringify(preferences));
 * }
 *
 */

/**
 * @api onSetDevicePreferencesCallback() void onSetDevicePreferencesCallback()
 * @apiName onSetDevicePreferencesCallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Set the preferences for a device. Must include complete set of preferences, existing set of preferences are overridden.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onSetDevicePreferencesCallback() {
 *   // Success Callback
 * }
 *
 */


/**
 * @api onCreateAutomationCallback(automation) void onCreateAutomationCallback()
 * @apiName onCreateAutomationCallback
 * @apiGroup Automation manager
 * @apiDescription [In-House] Creates automation.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {Automation} automation Automation Object.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onCreateAutomationCallback(automation) {
 *   console.log("Properties of created automation is : " + JSON.stringify(automation));
 * }
 *
 * @apiExample {js} Automation - Example usage:
 * {
 *    "hidden": true,
 *    "automationId" : "by2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *    "pluginDeviceId": "11111111-2222-3333-4444-555555555555",
 *    "enabled": "Enabled",
 *    "customTag": "API TEST CUSTOM TAG",
 *    "timeCondition": {
 *        "cType": "ScheduleCondition",
 *        "time": "44 13",
 *        "days": "MON,TUE,WED"
 *    },
 *    "deviceActions": [
 *        {
 *            "rt": "oic.r.switch.binary",
 *            "did": "9a2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *            "href": "/capability/switch/0",
 *            "property": "value",
 *            "value": "false",
 *            "aType": "Action",
 *            // Enum type : string, boolean, integer, double
 *            "valueType": "string"
 *        }
 *    ],
 *    "name": "Unknown device+1561632526",
 *    "locationId": "2e56df23-9ac4-46bb-a418-6ca92a53130a"
 * }
 */

/**
 * @api onGetAutomationListCallback(automationList) void onGetAutomationListCallback()
 * @apiName onGetAutomationListCallback
 * @apiGroup Automation manager
 * @apiDescription [In-House] Gets list of automation.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {[Automation]} automationList Array of Automation Object.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onGetAutomationListCallback(automationList) {
 *      console.log("automation list is : " + JSON.stringify(automationList));
 * }
 *
 */

/**
 * @api onEditAutomationCallback(automation) void onEditAutomationCallback()
 * @apiName onEditAutomationCallback
 * @apiGroup Automation manager
 * @apiDescription [In-House] Edit automation.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {Automation} automation Automation json body.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onEditAutomationCallback(automation) {
 *   console.log("This is information of automation : " + JSON.stringify(automation));
 * }
 *
 * @apiExample {js} Automation - Example usage:
 * {
 *     {
 *       "hidden": true,
 *       "automationId" : "by2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *       "pluginDeviceId": "11111111-2222-3333-4444-555555555555",
 *       "enabled": "Enabled",
 *       "customTag": "API TEST CUSTOM TAG",
 *       "timeCondition": {
 *         "cType": "ScheduleCondition",
 *         "time": "44 13",
 *         "days": "MON,TUE,WED"
 *       },
 *       "deviceActions": [
 *         {
 *           "rt": "oic.r.switch.binary",
 *           "did": "9a2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *           "href": "/capability/switch/0",
 *           "property": "value",
 *           "value": "false",
 *           // Enum type : string, boolean, integer, double
 *           "valueType": "string",
 *           "aType": "Action"
 *         }
 *       ],
 *       "name": "Unknown device+1561632526",
 *       "locationId": "2e56df23-9ac4-46bb-a418-6ca92a53130a"
 *     }
 * }
 *
 *
 */

/**
 * @api onDeleteAutomationCallback(automationId) void onDeleteAutomationCallback()
 * @apiName onDeleteAutomationCallback
 * @apiGroup Automation manager
 * @apiDescription [In-House] Deletes automation.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {String} automationId Id of automation.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onDeleteAutomationCallback(automationId) {
 *      console.log('Automation id is ' + automationId)
 * }
 *
 */

/**
 * @api onGetAutomationCallback(automation) void onGetAutomationCallback()
 * @apiName onGetAutomationCallback
 * @apiGroup Automation manager
 * @apiDescription [In-House] Gets information of automation.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {Automation} automation Automation json body.
 *
 * @apiExample {js} Automation - Example usage:
 * {
 *     {
 *       "hidden": true,
 *       "automationId" : "by2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *       "pluginDeviceId": "11111111-2222-3333-4444-555555555555",
 *       "enabled": "Enabled",
 *       "automationId": "c004a14f-ed7c-4ee3-944b-3d9db2742305",
 *       "customTag": "API TEST CUSTOM TAG",
 *       "timeCondition": {
 *         "cType": "ScheduleCondition",
 *         "time": "44 13",
 *         "days": "MON,TUE,WED"
 *       },
 *       "deviceActions": [
 *         {
 *           "rt": "oic.r.switch.binary",
 *           "did": "9a2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *           "href": "/capability/switch/0",
 *           "property": "value",
 *           "value": "false",
 *           "aType": "Action",
 *           // Enum type : string, boolean, integer, double
 *           "valueType": "string"
 *         }
 *       ],
 *       "name": "Unknown device+1561632526",
 *       "locationId": "2e56df23-9ac4-46bb-a418-6ca92a53130a"
 *     }
 * }
 *
 */

/**
 * @api onEnableAutomationCallback(automationId) void onEnableAutomationCallback()
 * @apiName onEnableAutomationCallback
 * @apiGroup Automation manager
 * @apiDescription [In-House] Enable automation.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {String} automationId Id of automation.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onEnableAutomationCallback(automationId) {
 *      console.log('Automation id is ' + automationId)
 * }
 *
 */

/**
 * @api onDisableAutomationCallback(automationId) void onDisableAutomationCallback()
 * @apiName onDisableAutomationCallback
 * @apiGroup Automation manager
 * @apiDescription [In-House] Disable automation.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {String} automationId Id of automation.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onDisableAutomationCallback(automationId) {
 *      console.log('Automation id is ' + automationId)
 * }
 *
 */


/**
 * @api onSetAutomationStateListenerCallback(automationId,state,automation) void onSetAutomationStateListenerCallback()
 * @apiName onSetAutomationStateListenerCallback
 * @apiGroup Automation manager
 * @apiDescription [In-House] Sets automation state listener.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {String} automationId Id of automation.
 * @apiParam {String} state State of automation.
 * @apiParam {Automation} [automation] Optional. Automation object. Returns only if the state value is "add" and "update".
 *
 * @apiUse CHANGED_AUTOMATION_STATE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onSetAutomationStateListenerCallback(automationId, state, automation) {
 *   console.log("Automation id is " + automationId)
 *   if (state == "add") {
 *     // Automation was added
 *   } else if (state == "update") {
 *     // Automation was updated
 *   } else if (state == "delete") {
 *     // Automation was removed
 *   }
 * }
 *
 */


/**
 * @api onHubDeviceMonitoringStateCallback(state) void onHubDeviceMonitoringStateCallback()
 * @apiName onHubDeviceMonitoringStateCallback
 * @apiGroup HubDeviceInterface
 * @apiDescription Gets hub device connection state from cloud.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {String} state Hub device connection state from device.
 *                                "CONNECTED" / "DISCONNECTED" / "UNKNOWN" / "INACTIVE"
 *
 * @apiExample {js} Callback Function - Example usage: Hub device plugin
 * function onHubDeviceMonitoringStateCallback(state) {
 *    if (state == "CONNECTED") {
 *        // Do something...
 *    } else if (state == "DISCONNECTED") {
 *        // Do something...
 *    } else if (state == "INACTIVE") {
 *        // Do something...
 *    } else if (state == "UNKNOWN") {
 *        // Do something...
 *    }
 * }
 *
 */

/**
 * @api onAutomationNavigateToCallback(NavigationViewType,resultData) void onAutomationNavigateToCallback()
 * @apiName onAutomationNavigateToCallback
 * @apiGroup Automation manager
 * @apiDescription [In-House] Method invoked when the invocation ends successfully.
 * @apiVersion 1.3.0
 * @apiPrivate
 *
 * @apiParam {NavigationViewType} navigationViewType Navigation Link Type of the corresponding operation.
 * @apiParam {Object} [resultData] Optional. Result data received from view page. JSON Object.
 *
 * @apiExample {js} Example usage: ADD_AUTOMATION_VIEW
 * function onAutomationNavigateToCallback(automationNavigationViewType, resultData) {
 *     console.log("Navigate to the specific add automation page successfully. : " + automationNavigationViewType);
 *     console.log("Added automation is " + JSON.stringify(resultData.automation));
 * }
 *
 * function onErrorCallback(error) {
 *     console.log("error name: " + error.name + " message: " + error.message);
 * }
 *
 * scplugin.automationManager.navigateTo("ADD_AUTOMATION_VIEW", onAutomationNavigateToCallback, onErrorCallback, {
 *    "locationId" : "8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0",
 *    "uri" : "/capability/button/0",
 *    "attr" : "button",
 *    "value" : "pushed",
 *    "tag" : "x.com.st.button.pushed"
 * });
 *
 * @apiExample {js} Example usage: EDIT_AUTOMATION_VIEW
 * function onAutomationNavigateToCallback(automationNavigationViewType, resultData) {
 *     console.log("Navigate to the specific edit automation page successfully. : " + automationNavigationViewType);
 *     console.log("Added automation is " + JSON.stringify(resultData.automation));
 * }
 *
 * function onErrorCallback(error) {
 *     console.log("error name: " + error.name + " message: " + error.message);
 * }
 *
 * scplugin.automationManager.navigateTo("EDIT_AUTOMATION_VIEW", onAutomationNavigateToCallback, onErrorCallback, {
 *    "locationId" : "8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0",
 *    "automationId" : "automation-id-1"
 *    "uri" : "/capability/button/0",
 *    "attr" : "button",
 *    "value" : "pushed",
 *    "tag" : "x.com.st.button.pushed"
 * });
 *
 *
 * @apiSuccessExample {js} resultData
 * // ADD_AUTOMATION_VIEW
 *
 * {
 *    // status : Result of the request.
 *    "status" : "USER_OK",
 *
 *    // automation: body of the created automation.
 *    "automation" : {
 *      "hidden": true,
 *      "automationId" : "by2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *      "pluginDeviceId": "11111111-2222-3333-4444-555555555555",
 *      "enabled": "Enabled",
 *      "customTag": "API TEST CUSTOM TAG",
 *      "timeCondition": {
 *          "cType": "ScheduleCondition",
 *          "time": "44 13",
 *          "days": "MON,TUE,WED"
 *      },
 *      "deviceActions": [
 *        {
 *              "rt": "oic.r.switch.binary",
 *              "did": "9a2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *              "href": "/capability/switch/0",
 *              "property": "value",
 *              "value": "false",
 *              // Enum type : string, boolean, integer, double
 *              "valueType": "string",
 *              "aType": "Action"
 *          }
 *      ],
 *      "name": "Unknown device+1561632526",
 *      "locationId": "2e56df23-9ac4-46bb-a418-6ca92a53130a"
 *    }
 * }
 *
 * // EDIT_AUTOMATION_VIEW
 *
 * {
 *    // status : Result of the request.
 *    "status" : "USER_OK",
 *
 *    // automation: body of the edited automation.
 *    "automation" : {
 *      "hidden": true,
 *      "automationId" : "by2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *      "pluginDeviceId": "11111111-2222-3333-4444-555555555555",
 *      "enabled": "Enabled",
 *      "customTag": "API TEST CUSTOM TAG",
 *      "timeCondition": {
 *          "cType": "ScheduleCondition",
 *          "time": "44 13",
 *          "days": "MON,TUE,WED"
 *      },
 *      "deviceActions": [
 *        {
 *              "rt": "oic.r.switch.binary",
 *              "did": "9a2311da-9da4-4ac6-b4c5-afd3db4d1489",
 *              "href": "/capability/switch/0",
 *              "property": "value",
 *              "value": "false",
 *              // Enum type : string, boolean, integer, double
 *              "valueType": "string",
 *              "aType": "Action"
 *          }
 *      ],
 *      "name": "Unknown device+1561632526",
 *      "locationId": "2e56df23-9ac4-46bb-a418-6ca92a53130a"
 *    }
 * }
 *
 * // EDIT_AUTOMATION_VIEW
 * // In edit automation case, If the automation is deleted, only the automationId is getted.
 * {
 *    // status : Result of the request.
 *    "status" : "USER_OK",
 *
 *    // automation: body of the edited automation.
 *    "automation" : {
 *      "automationId" : "by2311da-9da4-4ac6-b4c5-afd3db4d1489"
 *    }
 * }
 */
/**
 * @api onDeviceGetFirmwareInfoCallback(resultData) void onDeviceGetFirmwareInfoCallback()
 * @apiName onDeviceGetFirmwareInfoCallback
 * @apiGroup OCFDevice
 * @apiDescription [In-House] Gets the firmware information of zigbee device. (Only Zigbee Device)
 * @apiVersion 1.3.0
 *
 * @apiParam {Object} resultData Firmware information of zigbee device.
 * @apiParam {Boolean} resultData.supported Boolean value to check if firmware information can be supported.
 * @apiParam {FirmwareAvailableType} resultData.updateAvailable Status of updateable.
 * @apiParam {String} [resultData.lastCheckedDate] Optional. The latest time to check firmware. (Timestamp form) ex)1565881765475
 * @apiParam {String} [resultData.lastUpdatedDate] Optional. The latest time to update firmware. (Timestamp form) ex)1565881765475
 * @apiParam {String} [resultData.currentVersion] Optional. Firmware version of current device. ex) 00001234
 * @apiParam {String} [resultData.targetVersion] Optional. Updateable latest firmware version of device. ex) 00005678

 *
 * @apiUse FIRMWARE_AVAILABLE_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 *
 * function onDeviceGetFirmwareInfoCallback(resultData) {
 *  if(resultData.supported == true && resultData.updateAvailable == "YES") {
 *     console.log("Your device can be updated.");
 *  }
 * }
 */
/**
 * @api onGetInfoCallback(resultData) void onGetInfoCallback()
 * @apiName onGetInfoCallback
 * @apiGroup SystemInfo
 * @apiDescription [In-House] Gets the information of parent device (setting).
 * @apiVersion 1.3.0
 *
 *
 * @apiUse GET_INFO_TYPE
 *
 *
 * @apiParam {Object} resultData Result data of system
 *
 * @apiSuccessExample {js} resultData
 *
 * // Get info "TIME" type
 * // 12-hours clock type.
 * {
 *    // hoursClockType : Get system setting about hours clock type. (It is returned to 12h or 24h.)
 *    "hoursClockType" : "12h"
 * }
 *
 * @apiExample {js} Example usage: "Time" type
 *
 * function onGetInfoCallback(resultData) {
 *   if(resultData.hoursClockType == "24h") {
 *       // 24 Clock Hours Type
 *   } else {
 *       // 12 Clock Hours Type
 *   }
 * }
 *
 * @apiExample {js} Example usage: "Theme" type
 *
 * scplugin.systemInfo.getInfo("THEME", function(systemTheme){
 *    systemTheme.isDarkModeEnabled(function(state){
 *      if(state == true) {
 *          console.log('Dark mode is on');
 *      } else {
 *          console.log('Dark mode is off');
 *      }
 *    }, function(e){
 *      console.log(e);
 *    });
 * });
 *
 */


/**
 * @api onIsDarkModeEnabledCallback(state) void onIsDarkModeEnabledCallback()
 * @apiName onIsDarkModeEnabledCallback
 * @apiGroup SystemTheme
 * @apiDescription Gets information about dark mode.
 * @apiVersion 1.3.0
 *
 * @apiParam {Boolean} state state of dark mode. Returns true if dark mode.
 *
 * @apiExample {js} Example usage:
 *
 * function onIsDarkModeEnabledCallback(state) {
 *   if(state == true) {
 *       console.log('Theme is dark mode.');
 *   }
 * }
 */

/**
 * @api onIsNightModeEnabledCallback(state) void onIsNightModeEnabledCallback()
 * @apiName onIsNightModeEnabledCallback
 * @apiGroup SystemTheme
 * @apiDescription Gets information about night mode.
 * @apiVersion 1.3.0
 *
 * @apiParam {Boolean} state State of night mode. Returns true if night mode.
 *
 * @apiExample {js} Example usage:
 *
 * function onIsNightModeEnabledCallback(state) {
 *   if(state == true) {
 *       console.log('Theme is night mode.');
 *   }
 * }
 */

/**
 * @api onIsInversionModeEnabledCallback(state) void onIsInversionModeEnabledCallback()
 * @apiName onIsInversionModeEnabledCallback
 * @apiGroup SystemTheme
 * @apiDescription Gets information about inversion mode.
 * @apiVersion 1.3.0
 *
 * @apiParam {Boolean} state State of inversion mode. Returns true if inversion mode.
 *
 * @apiExample {js} Example usage:
 *
 * function onIsInversionModeEnabledCallback(state) {
 *   if(state == true) {
 *       console.log('Theme is inversion mode.');
 *   }
 * }
 */

/**
 * @api onDarkModeChangeCallback(state) void onDarkModeChangeCallback()
 * @apiName onDarkModeChangeCallback
 * @apiGroup SystemTheme
 * @apiDescription  Receives the state of dark mode theme change.
 * @apiVersion 1.3.0
 *
 * @apiParam {Boolean} state State of dark mode theme. Returns true if dark mode.
 *
 * @apiExample {js} Example usage:
 *
 * function onDarkModeChangeCallback(state) {
 *  if(state == true) {
 *      console.log("Changed! Dark mode is on");
 *  } else {
 *      console.log("Changed! Dark mode is off");
 *  }
 * }
 */

/**
 * @api onNightModeChangeCallback(state) void onNightModeChangeCallback()
 * @apiName onNightModeChangeCallback
 * @apiGroup SystemTheme
 * @apiDescription Receives the state of night mode theme change.
 * @apiVersion 1.3.0
 *
 * @apiParam {Boolean} state State of night mode theme. Returns true if night mode.
 *
 * @apiExample {js} Example usage:
 *
 * function onNightModeChangeCallback(state) {
 *  if(state == true) {
 *      console.log("Changed! Night mode is on");
 *  } else {
 *      console.log("Changed! Night mode is off");
 *  }
 * }
 */

/**
 * @api onInversionModeChangeCallback(state) void onInversionModeChangeCallback()
 * @apiName onInversionModeChangeCallback
 * @apiGroup SystemTheme
 * @apiDescription Receives the state of inversion mode theme change.
 * @apiVersion 1.3.0
 *
 * @apiParam {Boolean} state State of inversion mode theme. Returns true if inversion mode.
 *
 * @apiExample {js} Example usage:
 *
 * function onInversionModeChangeCallback(state) {
 *  if(state == true) {
 *      console.log("Changed! Inversion mode is on");
 *  } else {
 *      console.log("Changed! Inversion mode is off");
 *  }
 * }
 */

/**
 * @api onSetStatusBarContentThemeCallback(state) void onSetStatusBarContentThemeCallback()
 * @apiName onSetStatusBarContentThemeCallback
 * @apiGroup SystemTheme
 * @apiDescription Receives whether the theme has been changed.
 * @apiVersion 1.3.5
 *
 * @apiParam {Boolean} state Returns true if when the changed status bar theme.
 *
 * @apiExample {js} Example usage:
 *
 * function onSetStatusBarContentThemeCallback(state) {
 *  if(state == true) {
 *      console.log("The theme has been changed successfully.");
 *  } else {
 *      console.log("Theme change failed.");
 *  }
 * }
 */

/**
 * @api onLDConfigCallback(state) void onLDConfigCallback()
 * @apiName onLDConfigCallback
 * @apiGroup Plugin manager
 * @apiDescription Receives the state of Launch Darkly Configuration.
 * @apiVersion 1.3.1
 * @apiPrivate
 *
 * @apiParam {Boolean} state State of Launch Darkly Configuration. Returns true if Feature is ON.
 *
 * @apiExample {js} Example usage:
 *
 * function onLDConfigCallback(state) {
 *  if(state == true) {
 *      console.log("ON! This LD Config is ON");
 *  } else {
 *      console.log("OFF! This LD Config is OFF");
 *  }
 * }
 */

/**
 * @api onAddressFromPositionCallback(address) void onAddressFromPositionCallback()
 * @apiName onAddressFromPositionCallback
 * @apiGroup Plugin manager
 * @apiDescription Receives address from position(latitude, longitude).
 * @apiVersion 1.3.4
 * @apiPrivate
 *
 * @apiParam {String} address Address from position(latitude, longitude).
 *
 * @apiExample {js} Example usage:
 *
 * function onAddressFromPositionCallback(address) {
 *     console.log("Address : " + address.fullText);
 * }
 *
 * @apiSuccessExample {JSON} Response (example)
 * If position is (37.497923, 127.026085),
 * "address" : {
 *   "fullText": "1317-26 Seocho 4(sa)-dong, Seocho-gu, Seoul, South Korea"
 * }
 *
 */

 /**
  * @api onDecryptCallback(plainTexts) void onDecryptCallback()
  * @apiName onDecryptCallback
  * @apiGroup Plugin manager
  * @apiDescription Receives Array Array of result plainText
  * @apiVersion 1.3.4
  * @apiPrivate
  *
  * @apiParam {[String]} Array Result plainText array
  *
  * @apiExample {js} Example usage:
  * function onDecryptCallback(plainTexts) {
  *     for (var i in plainTexts) {
  *         console.log("This is Plain Text : " + plainTexts[i]);
  *     }
  * }
  *
  * function onErrorCallback(error) {
  *     console.log("error name: " + error.name + " message: " + error.message);
  * }
  * var encryptedTarget = [{
  *   "encryptedText": "uY31U3/fKRZhK4avi50cNPPVXjP1RnMJiBYkaR4Au0340x1NrS2VPl9712345gg",
  *   "iv": "qNM0F1234viD9kb"
  * }];
  *
  * scplugin.manager.decryptText(onDecryptCallback, onErrorCallback, encryptedTarget, sourceId, null);
  */

 /**
  * @api onAppPreferenceDataCallback(resultData) void onAppPreferenceDataCallback()
  * @apiName onAppPreferenceDataCallback
  * @apiGroup Plugin manager
  * @apiDescription Receives jsonObject({"key":"keyString","value":"valueSting" })
  * @apiVersion 1.3.4
  * @apiPrivate
  *
  * @apiParam {String} handle and key (handle, key).
  *
  * @apiExample {js} Example usage:
  * function onAppPreferenceDataCallback(resultData) {
  *     console.log("AppPreferenceDataInfo : " + JSON.stringify(resultData));
  * }
  * example result json object
  *  {
  *    "key" : "IOT_SERVER_POS",
  *    "value": "0" //type integer .. DEV(0) / STG(1) / PROD(2) / ACC(3)
  *  }
  *  {
  *    "key" : "GET_APP_NAME",
  *    "value": "Samsung Connect" //type string
  *  }
  *  {
  *    "key" : "GET_APP_VERSION",
  *    "value": "1.6.53-027" //type string
  *  }
  * function onErrorCallback(error) {
  *     console.log("error name: " + error.name + " message: " + error.message);
  * }
  *
  */

/**
 * @api onLaunchManagedServicePluginCallback(managedServiceType) void onLaunchManagedServicePluginCallback()
 * @apiName onLaunchManagedServicePluginCallback
 * @apiGroup Plugin manager
 * @apiDescription [In-House] Method invoked when the invocation ends successfully.
 * @apiVersion 1.3.4
 * @apiPrivate
 *
 * @apiParam {MANAGED_SERVICE_TYPE} managedServiceType Managed service type launched.
 *
 * @apiUse MANAGED_SERVICE_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onLaunchManagedServicePluginCallback(managedServiceType) {
 *     console.log("The Service plugin has launched successfully. : " + managedServiceType);
 * }
 *
 */
