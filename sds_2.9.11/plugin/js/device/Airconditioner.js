/**
 * Samsung SmartThings HomeNet System by HomeIoT R&D Team.
 * System Airconditioner Device Plugin
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
    const AIRCONDITIONER_UNDO_TIMEOUT_VALUE = 10000;

    // Variable for Drawing Gauge
    const GAUGE_DEFAULT_MINIMUM_RANGE = 5;    // 5℃
    const GAUGE_DEFAULT_MAXIMUM_RANGE = 35;   // 35℃

    class _Airconditioner {
        constructor() {
            this.deviceType = "oic.d.airconditioner";
        }

        createDevice (_device_, _dpResourceList_) {
            var power = undefined;
            var mode = undefined;
            var measure = undefined;
            var cooling = undefined;
            var fanspeed = undefined;
            var fanOscil = undefined;

            for (var key in _dpResourceList_) {
                if (_dpResourceList_.hasOwnProperty(key)) {
                    switch (_dpResourceList_[key].uri) {
                        case "/capability/switch/main/0":                       // x.com.st.powerswitch
                            power = _dpResourceList_[key];
                            break;
                        case "/capability/airConditionerMode/main/0":           // x.com.st.mode.airconditioner
                            mode = _dpResourceList_[key];
                            break;
                        case "/capability/temperatureMeasurement/main/0":       // x.com.st.temperature.measured
                            measure = _dpResourceList_[key];
                            break;
                        case "/capability/thermostatCoolingSetpoint/main/0":    // x.com.st.temperature.cooling
                            cooling = _dpResourceList_[key];
                            break;
                        case "/capability/fanSpeed/main/0":                     // x.com.st.temperature.cooling
                            fanspeed = _dpResourceList_[key];
                            break;
                        case "/capability/fanOscillationMode/main/0":           // x.com.st.temperature.cooling
                            fanOscil = _dpResourceList_[key];
                            break;
                        default:
                            LoggerW("[Error] Undefined uri on this device : " + _dpResourceList_[key].uri);
                    }
                }
            }

            return new Airconditioner(_device_, { power, mode, measure, cooling, fanspeed, fanOscil });
        }
    };

    class Airconditioner {
        constructor(_device_, { power, mode, measure, cooling, fanspeed, fanOscil } = {}) {
            LoggerI("Create Airconditioner Widget");
            this.device = _device_; // it is device object.
            this.device_type = 'system_airconditioner';

            this.value = {};
            this.undoCtrl = new UndoController(this.device, AIRCONDITIONER_UNDO_TIMEOUT_VALUE);

            this.dpRscList = new Object();

            this.range = [GAUGE_DEFAULT_MINIMUM_RANGE, GAUGE_DEFAULT_MAXIMUM_RANGE]; // cooling temperature default range.
            this.graphType = 'BAR';

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

            if (this.dpRscList.cooling) {
                if (this.dpRscList.cooling.hasOwnProperty("range")) {
                    this.range[0] = this.dpRscList.cooling.range[0];
                    this.range[1] = this.dpRscList.cooling.range[1];
                }
            }

            this.add();
        }

        add() {
            // Main Feature Card
            if (this.dpRscList.power) {
                this.systemAirconditionerCardView = new SystemAirconditionerCard(this.device_type, {
                    'parent': $("#heroCardArea"),
                    'bgColor': "#8173FF",
                    'range': this.range,
                    'mode': (Boolean)(this.dpRscList.mode),
                    'fanSpeed': (Boolean)(this.dpRscList.fanspeed),
                    'fanOscil': (Boolean)(this.dpRscList.fanOscil)
                });
                this.systemAirconditionerCardView.init();

                this.systemAirconditionerCardView.setEvent("off", this.setPower.bind(this, "off"));
                this.systemAirconditionerCardView.setEvent("on", this.setPower.bind(this, "on"));
                this.systemAirconditionerCardView.setEvent("temperature", this.setTemperature.bind(this));

                if ((Boolean)(this.dpRscList.mode)) {
                    this.systemAirconditionerCardView.initList($('#mainPage'), 'mode', this.dpRscList.mode);
                    this.systemAirconditionerCardView.setEvent("mode", this.setMode.bind(this));
                }

                if ((Boolean)(this.dpRscList.fanspeed)) {
                    this.systemAirconditionerCardView.initList($('#mainPage'), 'fanSpeed', this.dpRscList.fanspeed);
                    this.systemAirconditionerCardView.setEvent("fanSpeed", this.setFanSpeed.bind(this));
                }

                if ((Boolean)(this.dpRscList.fanOscil)) {
                    this.systemAirconditionerCardView.initList($('#mainPage'), 'fanOscil', this.dpRscList.fanOscil);
                    this.systemAirconditionerCardView.setEvent("fanOscil", this.setFanOscil.bind(this));
                }
            }

            // CS Card
            this.CSInforCardView = new CSCard(this.device_type + "_CSCard", {
                'parent': $("#heroCardArea"),
                'provider': window.provider
            });
            this.CSInforCardView.init();

            // Current Temperature Card
            let range = {from:0, to:50};
            if (this.dpRscList.measure.range && Array.isArray(this.dpRscList.measure.range) && this.dpRscList.measure.range.length>1) {
                range.from = this.dpRscList.measure.range[0];
                range.to = this.dpRscList.measure.range[1];
            }
            this.currentMeasurementCardView = new CurrentMeasurementCard(this.device_type + "_currentMeasuerment", {
                'title': C_('CURRENT_TEMPERATURE'),
                'parent': $("#heroCardArea"),
                'expand': true,
                'unit': this.temperatureMeasurementUnit,
                'range': range,
                'graph': {
                    'grpahType': 'BAR',
                    'float': true,
                    'descrete': false,
                    'dpRsc': this.dpRscList.measure,
                    'homeInsight': new HomeInsight(this.device, this.dpRscList.measure),
                    'getCurrentFN': () => {
                        return this.value.measure;
                    }
                }
            });
            this.currentMeasurementCardView.init();

            // Bibxy Card
            this.bixbyCardView = new BixbyCard(this.device_type + "_bixby", {
                'parent': $("#heroCardArea"),
                'message':C_('AIRCONDITIONER_BIXBY'),
            });
            this.bixbyCardView.init();

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

            $("#heroCardArea").append(this.wrapper);
        }

        getValue() {
            return this.value;
        }

        update(_uri_, _val_) {
            LoggerI("update!!! : " + _uri_);
            LoggerI(">>> Received: " + JSON.stringify(_val_));
            LoggerI("<<< Old Value: "+ JSON.stringify(this.value));

            if (this.dpRscList.power && (this.dpRscList.power.uri === _uri_)) {
                LoggerI("update power");
                var property = this.dpRscList.power.property;
                this.value[property] = _val_[property];

                switch (_val_[property]) {
                    case "on":  // heating
                        this.systemAirconditionerCardView.on();
                        break;
                    case "off": // outing
                        this.systemAirconditionerCardView.off();
                        break;
                    default:
                        LoggerE("[Error] Unsupported Power Mode : " + _val_[property]);
                }
            } else if (this.dpRscList.mode && (this.dpRscList.mode.uri === _uri_)) {
                LoggerI("update mode");
                var property = this.dpRscList.mode.property;
                this.value[property] = _val_[property];
                this.systemAirconditionerCardView.setMode(capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.mode.alternatives[_val_[property][0]])));
            } else if (this.dpRscList.measure && (this.dpRscList.measure.uri === _uri_)) {
                LoggerI("update measure temperature");
                // update UI
                var property = this.dpRscList.measure.property;
                this.value.measure = parseInt(_val_[property]);

                this.currentMeasurementCardView.setCurrent(this.value.measure, _val_['unit']);
                if (_val_['unit']) {
                    this.temperatureMeasurementUnit = _val_['unit'];
                }
            } else if (this.dpRscList.cooling && (this.dpRscList.cooling.uri === _uri_)) {
                LoggerI("update coolingAirconditioner temperature");
                var property = this.dpRscList.cooling.property;
                this.value[property] = _val_[property]; //update value

                if (_val_[property] >= this.range[0] && _val_[property] <= this.range[1]) {
                    // SET TEMPERATURE
                    this.systemAirconditionerCardView.setTemperature(_val_[property]);
                } else {
                    LoggerE("Out of range Exception!!");
                }

            } else if (this.dpRscList.fanspeed && (this.dpRscList.fanspeed.uri === _uri_)) {
                LoggerI("update Fan Speed");
                // update UI
                var property = this.dpRscList.fanspeed.property;
                this.value.fanSpeed = parseInt(_val_[property]);
                LoggerI((capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.fanspeed.alternatives[_val_[property]]))));
                this.systemAirconditionerCardView.setSpeed(capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.fanspeed.alternatives[_val_[property]])));
            } else if (this.dpRscList.fanOscil && (this.dpRscList.fanOscil.uri === _uri_)) {
                LoggerI("update Swing Mode");
                // update UI
                var property = this.dpRscList.fanOscil.property;
                this.value[property] = _val_[property];
                LoggerI((capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.fanOscil.alternatives[_val_[property]]))));
                this.systemAirconditionerCardView.setOscil(capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.fanOscil.alternatives[_val_[property]])));
            }

        }

        onSubscribe(_uri, _val) {
            LoggerI("--- onSubscribe ---");
            if (this.undoCtrl.done(_uri, _val)) {
                this.update(_uri, _val);
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

        onDone() {
            LoggerI("----- Request Success -----");
            // this.systemAirconditionerCardView.setPending(false);
        }

        onUndo(_uri_, _val_) {
            LoggerW("----- Request Fail. Try Undo -----");
            this.update(_uri_, _val_); // undo
            // this.systemAirconditionerCardView.setPending(false);
        }

        setPower(_value_) {
            LoggerI("[AirConditioner] send value:" + _value_);
            if (this.value && this.value.hasOwnProperty(this.dpRscList.power.property)) {
                var _curVal = this.value[this.dpRscList.power.property];
                LoggerI("[AirConditioner] current value:" + _curVal);
                if (_value_ !== _curVal) {
                    var previousPowerValue = cloneObject(this.value);
                    var newPowerValue = {};

                    if (_curVal === "on") {
                        newPowerValue[this.dpRscList.power.property] = "off";
                    } else {
                        newPowerValue[this.dpRscList.power.property] = "on";
                    }

                    this.undoCtrl.start(this.dpRscList.power.uri,
                        this.onDone.bind(this),
                        this.onUndo.bind(this),
                        previousPowerValue, newPowerValue);

                    LoggerI("[AirConditioner] Send Power :" + JSON.stringify(_value_));
                    if (newPowerValue.hasOwnProperty(this.dpRscList.power.property)) {
                        this.device.setRemoteRepresentation(this.dpRscList.power.uri, newPowerValue, this.onReceive.bind(this));
                    }

                    this.value[this.dpRscList.power.property] = _value_; //set value.
                }
            }
        }

        setMode(_value_) {
            LoggerI("[AirConditioner] send mode value:" + _value_);
            if (this.value.hasOwnProperty(this.dpRscList.mode.property)) {
                LoggerI("Current Mode :" + this.value[this.dpRscList.mode.property]);
                var previousModeValue = {};
                previousModeValue[this.dpRscList.mode.property] = this.value[this.dpRscList.mode.property];
                var newModeValue = {};
                newModeValue[this.dpRscList.mode.property] = [_value_];

                this.undoCtrl.start(this.dpRscList.mode.uri,
                    this.onDone.bind(this),
                    this.onUndo.bind(this),
                    previousModeValue, newModeValue);

                LoggerI("[AirConditioner] Send Mode :" + JSON.stringify(newModeValue));
                if (newModeValue.hasOwnProperty(this.dpRscList.mode.property)) {
                    this.value[this.dpRscList.mode.property] = newModeValue[this.dpRscList.mode.property]; //set value.
                    this.device.setRemoteRepresentation(this.dpRscList.mode.uri, newModeValue, this.onReceive.bind(this));
                }
            }
        }

        setTemperature(_temperature_) {
            LoggerI("[AirConditioner] set Temperature," + _temperature_);
            if (this.value.hasOwnProperty(this.dpRscList.cooling.property)) {
                LoggerI("Current Temperature :" + this.value[this.dpRscList.cooling.property]);
                var previousTempValue = {};
                previousTempValue[this.dpRscList.cooling.property] = this.value[this.dpRscList.cooling.property]
                var newTempValue = {};
                newTempValue[this.dpRscList.cooling.property] = _temperature_;

                this.undoCtrl.start(this.dpRscList.cooling.uri,
                    this.onDone.bind(this),
                    this.onUndo.bind(this),
                    previousTempValue, newTempValue);

                LoggerI("[AirConditioner] Send Temperature :" + JSON.stringify(newTempValue));
                if (newTempValue.hasOwnProperty(this.dpRscList.cooling.property)) {
                    this.value[this.dpRscList.cooling.property] = newTempValue[this.dpRscList.cooling.property]; //set value.
                    this.device.setRemoteRepresentation(this.dpRscList.cooling.uri, newTempValue, this.onReceive.bind(this));
                } else {
                    LoggerE("Fail set value, Invalid value.");
                    return;
                }
            }
        }

        setFanSpeed(_value_) {
            LoggerI("[AirConditioner] send Fan Speed value:" + _value_);
            if (this.value.hasOwnProperty(this.dpRscList.fanspeed.property)) {
                LoggerI("Current Speed :" + this.value[this.dpRscList.fanspeed.property]);
                var previousFanSpeed = {};
                previousFanSpeed[this.dpRscList.fanspeed.property] = this.value[this.dpRscList.fanspeed.property];
                var newFanSpeed = {};
                newFanSpeed[this.dpRscList.fanspeed.property] = [_value_];

                this.undoCtrl.start(this.dpRscList.fanspeed.uri,
                    this.onDone.bind(this),
                    this.onUndo.bind(this),
                    previousFanSpeed, newFanSpeed);

                LoggerI("[AirConditioner] Send Speed :" + JSON.stringify(newFanSpeed));
                if (newFanSpeed.hasOwnProperty(this.dpRscList.fanspeed.property)) {
                    this.value[this.dpRscList.fanspeed.property] = newFanSpeed[this.dpRscList.fanspeed.property]; //set value.
                    this.device.setRemoteRepresentation(this.dpRscList.fanspeed.uri, newFanSpeed, this.onReceive.bind(this));
                }
            }
        }

        setFanOscil(_value_) {
            LoggerI("[AirConditioner] send Fan Oscillation value:" + _value_);
            if (this.value.hasOwnProperty(this.dpRscList.fanOscil.property)) {
                LoggerI("Current Oscillation :" + this.value[this.dpRscList.fanOscil.property]);
                var previousFanOscil = {};
                previousFanOscil[this.dpRscList.fanOscil.property] = this.value[this.dpRscList.fanOscil.property];
                var newFanOscil = {};
                newFanOscil[this.dpRscList.fanOscil.property] = _value_;

                this.undoCtrl.start(this.dpRscList.fanOscil.uri,
                    this.onDone.bind(this),
                    this.onUndo.bind(this),
                    previousFanOscil, newFanOscil);

                LoggerI("[AirConditioner] Send Oscillation :" + JSON.stringify(newFanOscil));
                if (newFanOscil.hasOwnProperty(this.dpRscList.fanOscil.property)) {
                    this.value[this.dpRscList.fanOscil.property] = newFanOscil[this.dpRscList.fanOscil.property]; //set value.
                    this.device.setRemoteRepresentation(this.dpRscList.fanOscil.uri, newFanOscil, this.onReceive.bind(this));
                }
            }
        }

        refreshActivityCard() {
            LoggerI("Refresh Activity Card");
            if (this.activityCardView && this.activityDatas) {
                this.activityDatas.getActivities(4)
                .then((r) => {
                    this.activityCardView.updateList(r);
                });
            }
        }

        resize() {
            if (this.systemAirconditionerCardView && _isFunction(this.systemAirconditionerCardView.resize)) {
                this.systemAirconditionerCardView.resize();
            }

            if (this.currentMeasurementCard) {
                this.currentMeasurementCardView.expandCard(false);
            }
        }

        onVisibilityChange(state) {
            LoggerI("state:" + state);
            if (state) {
                this.refreshActivityCard();
            }
        }

        resize_immediate() {
            if (this.currentMeasurementCardView) {
                this.currentMeasurementCardView.expandCard(false);
            }
        }

        onRefresh() {
            this.refreshActivityCard();
        }
    }

    window.deviceTemplate = new _Airconditioner();

})(window, document)
