/**
 * Samsung SmartThings HomeNet System by HomeIoT R&D Team.
 * Light and Dimmer Device Plugin
 *
 * Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved
 *
 * PROPRIETARY/CONFIDENTIAL
 *
 * This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information").
 * You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.
 * SAMSUNG makes no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
 * SAMSUNG shall not be liable for any damages suffered by a licensee as a result of using, modifying, or distributing this software or its derivatives.
 */

(function(window, document) {

    const LIGHT_UNDO_TIMEOUT_VALUE = 10000;

    class _Light {
        constructor() {
            this.deviceType = "oic.d.light";
        }

        createDevice(_device_, _dpResourceList_) { //"x.com.st.light"
            var power = undefined;
            var dimmer = undefined;
            var colorTemperature = undefined;

            for (var key in _dpResourceList_) {
                if (_dpResourceList_.hasOwnProperty(key)) {
                    switch (_dpResourceList_[key].uri) {
                        case "/capability/switch/main/0":           // x.com.st.powerswitch
                            power = _dpResourceList_[key];
                            break;
                        case "/capability/switchLevel/main/0":      // oic.r.light.dimming
                            dimmer = _dpResourceList_[key];
                            break;
                        case "/capability/colorTemperature/main/0": // x.com.st.color.temperature
                            colorTemperature = _dpResourceList_[key];
                            break;
                        default:
                            LoggerW("[Error] Undefined uri on this device : " + _dpResourceList_[key].uri);
                    }
                }
            }

            return new Light(_device_, { power, dimmer, colorTemperature });
        }
    }

    class Light {
        constructor(_device_, { power, dimmer, colorTemperature } = {}) {
            LoggerI("Create Light Device");
            this.device = _device_; // it is device object.
            this.device_type = 'light';

            this.value = {};
            this.undoCtrl = new UndoController(this.device, LIGHT_UNDO_TIMEOUT_VALUE);

            this.dpRscList = new Object();

            this.range = [0, 100];
            this.step = 1;
            this.dimmerValue = 0;

            // Get Resources
            if (arguments.length > 1) {
                this.dpRscList = arguments[1];
                let keys = Object.keys(this.dpRscList);
                keys.forEach((key) => {
                    if (this.dpRscList[key]) {
                        this.dpRscList[key].key = key;
                    }
                });
            }

            if (this.dpRscList.dimmer) {
                this.device_type = 'lightDimmer';

                if (this.dpRscList.dimmer.hasOwnProperty("range")) {
                    this.range[0] = this.dpRscList.dimmer.range[0];
                    this.range[1] = this.dpRscList.dimmer.range[1];
                }
                if (this.dpRscList.dimmer.hasOwnProperty("step")) {
                    this.step = this.dpRscList.dimmer.step;
                }
                if (this.dpRscList.dimmer.hasOwnProperty("dimmingSetting")) {
                    this.dimmerValue = this.dpRscList.dimmer.dimmingSetting;
                }
            }

            this.add();
        }

        async add() {
            // Main Feature Card
            if (this.dpRscList.power) {
                this.lightCardView = new LightCard(this.device_type, {
                    'parent': $("#heroCardArea"),
                    'range': {
                        from:this.range[0],
                        to: this.range[1]
                    },
                    'step': this.step,
                    'unit': "%",
                    'style' : (this.dpRscList.dimmer) ? 'SWITCH_WHEEL' : 'SWITCH',
                    'dimmerTitle': (this.dpRscList.dimmer) ? GetStringByPoCode(this.dpRscList.dimmer.label) : undefined,
                    'powerStatusText': {on: capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.power.alternatives['on'])), off:capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.power.alternatives['off']))},
                    'dlgType': DIALOG_TYPE_VALUE});
                this.lightCardView.init();
                this.lightCardView.setEvent("off", this.setLightPower.bind(this, "off"));
                this.lightCardView.setEvent("on", this.setLightPower.bind(this, "on"));
                this.lightCardView.setEvent("dimmer", this.setDimmerValue.bind(this));
            }

            // CS Card
            this.CSInforCardView = new DeviceInformationCard(this.device_type + "_CSCard", {
                'parent': $("#heroCardArea"),
                'message': C_('CS_CARD_DESCRIPTION', window.provider.name, window.provider.name, window.provider.contact)
            });
            this.CSInforCardView.init();

            const latestContainer = $("#heroCardArea .iot_Card_Container").last(); //for automation card.

            // Color Temperature Card
            if (this.dpRscList.colorTemperature) {
                let colorCodes = ["#ff8b14", "#ffb869", "#ffc786", "#ffd4a0", "#ffd8aa", "#ffe7cb", "#ffeedd", "#fefbf4", "#ffffff", "#fbfbff"];
                let dimmedColorCodes = ["#cacaca", "#cfcfcf", "#d5d5d5", "#d8d8d8", "#dfdfdf", "#e2e2e2", "#e7e7e7", "#eeeeee", "#f2f2f2", "#f8f8f8"];

                this.lightColorTemperature = new ColorTemperatureCard("ColorTemperature", {
                    'parent': $("#heroCardArea"),
                    'style' : 'palette',
                    'title': capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.colorTemperature.label)),
                    colorCodes,
                    dimmedColorCodes
                });
                this.lightColorTemperature.init();
                this.lightColorTemperature.setEvent("colorTemperature", this.setColorTemperature.bind(this));
            }

            // Bibxy Card
            this.bixbyCardView = new BixbyCard(this.device_type + "_bixby", {
                'parent': $("#heroCardArea"),
                'message':C_('LIGHT_BIXBY'),
            });
            this.bixbyCardView.init();

            //Automation
            if (window.provider.id === "samsung" && window.scplugin.automationManager && this.dpRscList.power && isEnableAutomationDevice(this.device.deviceType)) {
                //get QC Device ID
                const getQCDeviceId = () => {
                    return new Promise((resolve, reject) => {
                        LoggerD(`scplugin getDevice >>>`);
                        window.scplugin.manager.getDevice(device => {
                            LoggerD(`scplugin.getDevice <<< device ID ['${device.deviceId}']`);
                            if (!device || !device.deviceId) {
                                reject(new Error('GET DEVICE FAILED'));
                            }

                            resolve(device.deviceId);
                        }, e => reject(new Error(e.message)));
                    });
                }
                const qcDeviceId = await getQCDeviceId();

                const createTimerAndScheduleAutomationCard = (_parent) => {
                    return new TimerAndScheduleAutomationCard(this.device_type+"_Automation", {
                        parent: _parent,
                        automations: ['Timer', 'PowerOn', 'PowerOff'],
                        locationId: this.device.locationId,
                        //deviceId: this.device.deviceHandle,
                        deviceId: qcDeviceId,
                        capabilityUri: this.dpRscList.power.uri,
                        propertyName: this.dpRscList.power.property,
                        rt: this.dpRscList.power.rt,
                        value: this.value
                        //value: this.value[this.dpRscList.power.property]
                    });
                }
                //load automation.js
                createScript("./js/automation.js")
                .then(() => {
                    this.AutomationCardView = createTimerAndScheduleAutomationCard(undefined);
                    this.AutomationCardView.container.insertAfter(latestContainer); //insert
                }).catch((e) => {
                    LoggerE(e.name + " : " + e.message);
                })
            }

            // Activity
            this.activityCardView = new ActivityListCard("activityId", {
                'parent': $("#heroCardArea"),
                'title': C_('ACTIVITY_LOG_HISTORY')
            });

            this.activityDatas = new DeviceActivities(HNCtrl.device);
            this.activityDatas.getActivities(4)
                .then((r) => {
                    this.activityCardView.updateList(r)
                });

            HNCtrl.addVisibilityEventListener(this.onVisibilityChange.bind(this));
        }

        getValue() {
            return this.value;
        }

        update(_uri_, _val_) {
            LoggerI("update!!! : " + _uri_);
            LoggerI(">>> Received: " + JSON.stringify(_val_));
            LoggerI("<<< Old Value: "+ JSON.stringify(this.value));

            if (this.dpRscList.power && (this.dpRscList.power.uri === _uri_)) {
                LoggerD("Update Light");
                var currentLightState = undefined;
                var property = this.dpRscList.power.property;
                if (this.value) {
                    currentLightState = this.value[property];
                }
                var newLightState = _val_[property];
                let immediateFlag = false;
                if (currentLightState != newLightState) {
                    LoggerD("change light state!!");
                    //update value
                    if (this.value[this.dpRscList.power.property] === undefined) {
                        immediateFlag = true;
                    }
                    this.value[this.dpRscList.power.property] = newLightState;
                } else {
                    LoggerD("value is same");
                }

                if (this.lightCardView) {
                    this.lightCardView.setPower(newLightState, immediateFlag);
                    this.lightCardView.noEventDuringProcessing(false);
                }

                if (this.lightColorTemperature) {
                    if (newLightState === "on") {
                        this.lightColorTemperature.setDimmed(false);
                        this.lightColorTemperature.noEventDuringProcessing(false);
                    } else {
                        this.lightColorTemperature.setDimmed(true);
                        this.lightColorTemperature.noEventDuringProcessing(true);
                    }
                }

            } else if (this.dpRscList.dimmer && (this.dpRscList.dimmer.uri === _uri_)) {
                LoggerD("Update Dimmer");
                if (_val_.hasOwnProperty("isStateChange") && _val_.isStateChange === false) {
                    LoggerI("No state change, skip update UI");
                    return;
                }
                let property = this.dpRscList.dimmer.property;
                let newDimmerValue = _val_[property];
                if (this.lightCardView) {
                    this.lightCardView.setDimmer(newDimmerValue, this.value[this.dpRscList.dimmer.property] === undefined);
                    this.lightCardView.noEventDuringProcessing(false);
                }
                this.value[this.dpRscList.dimmer.property] = newDimmerValue;
            } else if (this.dpRscList.colorTemperature && (this.dpRscList.colorTemperature.uri === _uri_)) {
                LoggerD("Update Color Temperature");

                let property = this.dpRscList.colorTemperature.property;
                let newColorTempValue = _val_[property];

                if (this.lightColorTemperature) {
                    if (_val_[property] > this.lightColorTemperature._colorCodes.length) {
                        LoggerW("ColorTemperature value(" + _val_[property] +  ") exceeds colorCodes array length! " + this.lightColorTemperature._colorCodes.length);
                        _val_[property] = this.lightColorTemperature._colorCodes.length;
                    }
                    this.lightColorTemperature.setColorTemperature(newColorTempValue);
                }

                this.value[this.dpRscList.colorTemperature.property] = newColorTempValue;
            }
        }

        onSubscribe(_uri_, _val_) {
            LoggerI("--- onSubscribe ---");
            if (this.undoCtrl.done(_uri_, _val_)) {
                this.update(_uri_, _val_);
            } else {
                LoggerI("Invalid Subscribe, skip update device");
            }
        }

        onReceive(_result_, _deviceHandle_, _uri_, _rcs_) {
            LoggerI("--- onSetValue ---");
            LoggerI("result:" + _result_ , " uri:" + _uri_);
            if (_result_ !== "OCF_OK" && _result_ !== "OCF_RESOURCE_CHANGED") {
                LoggerE("Failed setRemoteRepresentation," + _result_);
                this.undoCtrl.undo(_uri_);
            } else {
                this.undoCtrl.mark(_uri_);
            }
        }

        onDone(_uri_) {
            LoggerI("----- Request Success -----");
        }

        onUndo(_uri_, _val_) {
            LoggerW("----- Request Fail. Try Undo -----");
            this.update(_uri_, _val_); // undo
        }

        setLightPower(_value_) {
            LoggerI("[LIGHT] send value:" + _value_);
            if (this.value && this.value.hasOwnProperty(this.dpRscList.power.property)) {
                var _curVal = this.value[this.dpRscList.power.property];
                LoggerI("[LIGHT] current value:" + _curVal);
                if (_value_ !== _curVal) {
                    var previousLightValue = cloneObject(this.value);
                    var newLightValue = {};

                    if (_curVal === "on") {
                        newLightValue[this.dpRscList.power.property] = "off";
                    } else {
                        newLightValue[this.dpRscList.power.property] = "on";
                    }

                    this.undoCtrl.start(this.dpRscList.power.uri,
                        this.onDone.bind(this),
                        this.onUndo.bind(this),
                        previousLightValue, newLightValue);

                    if (newLightValue.hasOwnProperty(this.dpRscList.power.property)) {
                        this.lightCardView.noEventDuringProcessing(true);
                        this.device.setRemoteRepresentation(this.dpRscList.power.uri, newLightValue, this.onReceive.bind(this));
                    }

                    this.value[this.dpRscList.power.property] = _value_; //set value.
                }
            }
        }

        setDimmerValue(_value_) {
            LoggerI("[LIGHT] send dimming value:" + _value_);
            if(this.value.hasOwnProperty(this.dpRscList.dimmer.property)) {
                var previousDimmerValue = {};
                previousDimmerValue[this.dpRscList.dimmer.property] = this.value[this.dpRscList.dimmer.property];
                var newDimmerValue = {};
                newDimmerValue[this.dpRscList.dimmer.property] = _value_;
                this.undoCtrl.start(this.dpRscList.dimmer.uri,
                    this.onDone.bind(this),
                    this.onUndo.bind(this),
                    previousDimmerValue, newDimmerValue);
                if (newDimmerValue.hasOwnProperty(this.dpRscList.dimmer.property)) {
                    this.lightCardView.noEventDuringProcessing(true);
                    this.device.setRemoteRepresentation(this.dpRscList.dimmer.uri, newDimmerValue, this.onReceive.bind(this));
                }

                this.value[this.dpRscList.dimmer.property] = _value_; //set value.
            }
        }

        setColorTemperature(_value_) {
            LoggerI("[LIGHT] send color temperature value:" + _value_);
            if(this.value.hasOwnProperty(this.dpRscList.colorTemperature.property)) {
                var prevColorTempValue = {};
                prevColorTempValue[this.dpRscList.colorTemperature.property] = this.value[this.dpRscList.colorTemperature.property];
                var newColorTempValue = {};
                newColorTempValue[this.dpRscList.colorTemperature.property] = _value_;
                this.undoCtrl.start(this.dpRscList.colorTemperature.uri,
                    this.onDone.bind(this),
                    this.onUndo.bind(this),
                    prevColorTempValue, newColorTempValue);
                if (newColorTempValue.hasOwnProperty(this.dpRscList.colorTemperature.property)) {
                    this.device.setRemoteRepresentation(this.dpRscList.colorTemperature.uri, newColorTempValue, this.onReceive.bind(this));
                }

                this.value[this.dpRscList.colorTemperature.property] = _value_; //set value.
            }
        }

        refreshActivityCard() {
            if (this.activityCardView && this.activityDatas) {
                this.activityDatas.getActivities(4)
                .then((r) => {
                    this.activityCardView.updateList(r);
                });
            }
        }

        onVisibilityChange(state) {
            if (state) {
                this.refreshActivityCard();
                if (this.value[this.dpRscList.power.property] === "off") {
                    this.lightCardView.setPower("off");
                }
            }
        }

        resize() {
            if (this.lightCardView && _isFunction(this.lightCardView.resize)) {
                this.lightCardView.resize();
            }
        }

        onRotate() {
            if (this.lightCardView && _isFunction(this.lightCardView.onRotate)) {
                this.lightCardView.onRotate();
            }
        }

        onRefresh() {
            this.refreshActivityCard();
        }
    };

    window.deviceTemplate = new _Light();

})(window, document)
