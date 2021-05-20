/**
 * Samsung SmartThings HomeNet System by HomeIoT R&D Team.
 * Thermostat Device Plugin
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

    const THERMOSTAT_UNDO_TIMEOUT_VALUE = 10000;

    // Variable for Drawing Gauge
    const GAUGE_DEFAULT_MINIMUM_RANGE = 5;    // 5℃
    const GAUGE_DEFAULT_MAXIMUM_RANGE = 35;   // 35℃

    class _Thermostat {
        constructor() {
            this.deviceType = "oic.d.thermostat";
        }

        createDevice (_device_, _dpResourceList_) {
            // var powerDPResource = undefined;
            var mode = undefined;
            var measure = undefined;
            var heating = undefined;

            for (var key in _dpResourceList_) {
                if (_dpResourceList_.hasOwnProperty(key)) {
                    switch (_dpResourceList_[key].uri) {
                        case "/capability/thermostatMode/main/0":               // x.com.st.mode.thermostat
                            mode = _dpResourceList_[key];
                            break;
                        case "/capability/temperatureMeasurement/main/0":       // x.com.st.temperature.measured
                            measure = _dpResourceList_[key];
                            break;
                        case "/capability/thermostatHeatingSetpoint/main/0":    // x.com.st.temperature.heating
                            heating = _dpResourceList_[key];
                            break;
                        default:
                            LoggerW("[Error] Undefined uri on this device : " + _dpResourceList_[key].uri);
                    }
                }
            }

            return new Thermostat(_device_, { mode, measure, heating });
        }
    };

    class Thermostat {
        constructor(_device_, { mode, measure, heating } = {}) {
            LoggerI("Create Thermostat Widget");
            this.device = _device_; // it is device object.
            this.device_type = 'thermostat';

            this.value = {};
            this.undoCtrl = new UndoController(this.device, THERMOSTAT_UNDO_TIMEOUT_VALUE);

            this.dpRscList = new Object();

            this.range = [GAUGE_DEFAULT_MINIMUM_RANGE, GAUGE_DEFAULT_MAXIMUM_RANGE]; // heating temperature default range.
            this.temperatureMeasurementUnit = "C"; //default.
            this.beforeDegree = undefined;
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

            if (this.dpRscList.heating) {
                if (this.dpRscList.heating.hasOwnProperty("range")) {
                    this.range[0] = this.dpRscList.heating.range[0];
                    this.range[1] = this.dpRscList.heating.range[1];
                }
            }

            this.add();
        }

        add() {
            // Main Feature Card
            if (this.dpRscList.mode && this.dpRscList.heating) {
                this.thermostatCardView = new TemperatureControlCard(this.device_type, {
                    'parent': $("#heroCardArea"),
                    'bgColor' : "#FF6927",
                    'range' : this.range,
                    'update' : (_value_) => {this.setTemperature(_value_)},
                    'dlgType': DIALOG_TYPE_VALUE
                });
                this.thermostatCardView.init();
                this.thermostatCardView.initList($('#mainPage'), 'mode', this.dpRscList.mode);
                this.thermostatCardView.setEvent("mode", this.setMode.bind(this));
                this.thermostatCardView.setEvent("temperature", this.setTemperature.bind(this));
            }

            // CS Card
            this.CSInforCardView = new CSCard(this.device_type + "_CSCard", {
                'parent': $("#heroCardArea"),
                'provider': window.provider
            });
            this.CSInforCardView.init();

            // Current Temperature Card
            if (this.dpRscList.measure) {
                let range = {
                    from: 0,
                    to: 50
                };
                if (this.dpRscList.measure.range && Array.isArray(this.dpRscList.measure.range) && this.dpRscList.measure.range.length > 1) {
                    range.from = this.dpRscList.measure.range[0];
                    range.to = this.dpRscList.measure.range[1];
                }
                this.currentMeasurementCardView = new CurrentMeasurementCard("currentMeasuerment", {
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
            }

            // Bibxy Card
            this.bixbyCardView = new BixbyCard(this.device_type + "_bixby", {
                'parent': $("#heroCardArea"),
                'message':C_('THERMOSTAT_BIXBY'),
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

        update(_uri_, _val_){
            LoggerI("update!!! : " + _uri_);
            LoggerI(">>> Received: " + JSON.stringify(_val_));
            LoggerI("<<< Old Value: "+ JSON.stringify(this.value));

            if (this.dpRscList.mode && (this.dpRscList.mode.uri === _uri_)) {
                LoggerI("update mode");
                var property = this.dpRscList.mode.property;
                this.value[property] = _val_[property];

                this.thermostatCardView.setMode(this.value[property][0], capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.mode.alternatives[_val_[property][0]])));
            } else if (this.dpRscList.heating && (this.dpRscList.heating.uri === _uri_)) {
                LoggerI("update heatingThermostat");
                var property = this.dpRscList.heating.property;

                if (_val_.hasOwnProperty("units")) {
                    this.thermostatCardView.setUnit(_val_["units"]);
                }
                this.value[property] = _val_[property]; //update value
                if (_val_[property] >= this.range[0] && _val_[property] <= this.range[1]) {
                    // SET TEMPERATURE
                    this.thermostatCardView.setTemperature(_val_[property]);
                } else {
                    LoggerE("Out of range Exception!!");
                }
            } else if (this.dpRscList.measure && (this.dpRscList.measure.uri === _uri_)) {
                LoggerI("update measure temperature");
                // update UI
                var property = this.dpRscList.measure.property;
                this.value.measure = parseInt(_val_[property]);

                this.currentMeasurementCardView.setCurrent(this.value.measure, _val_['unit']);
                if (_val_['unit']) {
                    this.temperatureMeasurementUnit = _val_['unit'];
                }
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
            // this.thermostatCardView.setPending(false);
        }

        onUndo(_uri_, _val_) {
            LoggerW("----- Request Fail. Try Undo -----");
            this.update(_uri_, _val_); // undo
            // this.thermostatCardView.setPending(false);
        }

        setMode(_value_) {
            LoggerI("[Thermostat] send mode value : " + _value_);
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

                LoggerI("[Thermostat] Send Mode :" + JSON.stringify(newModeValue));
                if (newModeValue.hasOwnProperty(this.dpRscList.mode.property)) {
                    this.value[this.dpRscList.mode.property] = newModeValue[this.dpRscList.mode.property]; //set value.
                    this.device.setRemoteRepresentation(this.dpRscList.mode.uri, newModeValue, this.onReceive.bind(this));
                }
            }
        }

        setTemperature(_temperature_) {
            LoggerI("[Thermostat] set Temperature : " + _temperature_);
            if (this.value.hasOwnProperty(this.dpRscList.heating.property)) {
                LoggerI("Current Temperature :" + this.value[this.dpRscList.heating.property]);
                var previousTempValue = {};
                previousTempValue[this.dpRscList.heating.property] = this.value[this.dpRscList.heating.property]
                var newTempValue = {};
                newTempValue[this.dpRscList.heating.property] = _temperature_;

                this.undoCtrl.start(this.dpRscList.heating.uri,
                    this.onDone.bind(this),
                    this.onUndo.bind(this),
                    previousTempValue, newTempValue);

                LoggerI("[Thermostat] Send Temperature :" + JSON.stringify(newTempValue));
                if (newTempValue.hasOwnProperty(this.dpRscList.heating.property)) {
                    this.device.setRemoteRepresentation(this.dpRscList.heating.uri, newTempValue, this.onReceive.bind(this));
                } else {
                    LoggerE("Fail set value, Invalid value.");
                    return;
                }
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
            }
        }

        resize_immediate() {

            if (this.thermostatCardView && _isFunction(this.thermostatCardView.resize_immediate)) {
                this.thermostatCardView.resize_immediate();
            }

            if (this.currentMeasurementCardView) {
                this.currentMeasurementCardView.expandCard(false);
            }
        }

        onRotate() {
            if (this.thermostatCardView && _isFunction(this.thermostatCardView.onRotate)) {
                this.thermostatCardView.onRotate();
            }
        }

        onRefresh() {
            this.refreshActivityCard();
        }
    };

    window.deviceTemplate = new _Thermostat();

})(window, document)
