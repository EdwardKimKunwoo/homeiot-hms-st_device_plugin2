/**
 * Samsung SmartThings HomeNet System by HomeIoT R&D Team.
 * Vent Device Plugin
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
    const VENT_UNDO_TIMEOUT_VALUE = 10000;

    class _Vent {
        constructor() {
            this.deviceType = "x.com.st.d.vent";
        }

        createDevice (_device_, _dpResourceList_) {
            var power = undefined;
            var fanspeed = undefined;

            for (var key in _dpResourceList_) {
                if (_dpResourceList_.hasOwnProperty(key)) {
                    switch (_dpResourceList_[key].uri) {
                        case "/capability/switch/main/0":       // x.com.st.powerswitch
                            power = _dpResourceList_[key];
                            break;
                        case "/capability/fanSpeed/main/0":     // x.com.st.fanspeed
                            fanspeed = _dpResourceList_[key];
                            break;
                        default:
                            LoggerW("[Error] Undefined uri on this device : " + _dpResourceList_[key].uri);
                    }
                }
            }

            return new Vent(_device_, { power, fanspeed });
        }
    };

    class Vent {
        constructor(_device_, { power, fanspeed } = {}) {
            LoggerI("Create Vent Widget");
            this.device = _device_; // it is device object.
            this.device_type = 'vent';

            this.value = {};
            this.undoCtrl = new UndoController(this.device, VENT_UNDO_TIMEOUT_VALUE);

            this.dpRscList = new Object();

            this.powerMode = undefined;
            this.currentFanSpeed = undefined;

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

            if (this.dpRscList.fanspeed) {
                this.range = {};
                this.range.labels = [];
                for (let key in this.dpRscList.fanspeed.alternatives) {
                    if (this.range.from === undefined) {
                        this.range.from = Number(key);
                    }
                    this.dpRscList.fanspeed.alternatives[key];
                    this.range.labels.push(GetStringByPoCode(this.dpRscList.fanspeed.alternatives[key]));
                }
                this.range.to = Number(this.range.from + Object.keys(this.dpRscList.fanspeed.alternatives).length - 1);
            }

            this.add();
        }

        add() {
            // Main Feature Card
            if (this.dpRscList.power) {
                this.ventCardView = new VentCard(this.device_type, {
                    'parent': $("#heroCardArea"),
                    'style': (this.dpRscList.fanspeed) ? 'SWITCH_WHEEL' : 'SWITCH',
                    'range': this.range,
                    'fanSpeedLabel': (this.dpRscList.fanspeed) ? GetStringByPoCode(this.dpRscList.fanspeed.label) : undefined,
                    'powerStatusText': {
                        on: capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.power.alternatives['on'])),
                        off:capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.power.alternatives['off']))
                    },
                    'dlgType': DIALOG_TYPE_SELECTION
                });
                this.ventCardView.init();
                this.ventCardView.setEvent("off", this.setVentPower.bind(this, "off"));
                this.ventCardView.setEvent("on", this.setVentPower.bind(this, "on"));
                this.ventCardView.setEvent("speed", this.setFanSpeed.bind(this));
            }

            // CS Card
            this.CSInforCardView = new CSCard(this.device_type + "_CSCard", {
                'parent': $("#heroCardArea"),
                'provider': window.provider
            });
            this.CSInforCardView.init();

            // Bibxy Card
            this.bixbyCardView = new BixbyCard(this.device_type + "_bixby", {
                'parent': $("#heroCardArea"),
                'message':C_('VENT_BIXBY'),
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
        }

        getValue() {
            return this.value;
        }

        getProperty(_uri_) {
            var dpRsc = this.dpRscList[_uri_];
            if (dpRsc && dpRsc.property) {
                return dpRsc.property;
            } else {
                throw new Error('_uri_ is INVALID');
            }
        }

        update(_uri_, _val_) {
            LoggerI("update!!! : " + _uri_);
            LoggerI(">>> Received: " + JSON.stringify(_val_))
            LoggerI("<<< Old Value: "+ JSON.stringify(this.value));

            if (this.dpRscList.power && (this.dpRscList.power.uri === _uri_)) {
                LoggerI("update power");
                var property = this.dpRscList.power.property;
                if (this.ventCardView && _isFunction(this.ventCardView.setPower)) {
                    this.ventCardView.setPower(_val_[property],
                        this.value[property] === undefined,
                        !this.undoCtrl.isWorking(this.dpRscList.fanspeed.uri) && _val_.isStateChange === true && _val_[property] === "on");
                }
                this.value[property] = _val_[property];
            } else if (this.dpRscList.fanspeed && (this.dpRscList.fanspeed.uri === _uri_)) {
                LoggerI("update Fan Speed");
                if (_val_.hasOwnProperty("isStateChange") && _val_.isStateChange === false) {
                    LoggerI("No state change, skip update UI");
                    return;
                }

                var property = this.dpRscList.fanspeed.property;
                if (this.dpRscList.fanspeed.range[0] <= parseInt(_val_[property]) && this.dpRscList.fanspeed.range[1] >= parseInt(_val_[property])) {
                    if (this.ventCardView && _isFunction(this.ventCardView.setFanSpeed)) {
                        this.ventCardView.setFanSpeed(parseInt(_val_[property]), this.value.fanSpeed === undefined);
                    }
                } else {
                    LoggerE("Out of range Exception!!");
                }

                this.value.fanSpeed = parseInt(_val_[property]);
            }
        }

        onSubscribe(_uri_, _val_) {
            LoggerI("--- onSubscribe ---");
            if (this.undoCtrl.done(_uri_, _val_)) {
                this.update(_uri_, _val_);
            } else {
                LoggerI("Invalid Subscribe, skip update device");
            }

            return;
        }

        onReceive(_result_, _deviceHandle_, _uri_, _rcs_) {
            LoggerI("--onSetValue--");
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
            setTimeout(() => {
                this.ventCardView.noEventDuringProcessing(false);
            }, 300);
        }

        onUndo(_uri_, _val_){
            LoggerW("----- Request Fail. Try Undo -----");
            setTimeout(() => {
                if (this.ventCardView) {
                    this.ventCardView.noEventDuringProcessing(false);
                }
            }, 300);
            this.update(_uri_, _val_); // undo
        }

        setVentPower(_value_) {
            LoggerI("new Power Value:" + _value_);
            let newValue = {};
            let previousValue = {};
            newValue[this.dpRscList.power.property] = _value_;
            previousValue[this.dpRscList.power.property] = this.value[this.dpRscList.power.property];

            this.undoCtrl.start(this.dpRscList.power.uri,
                this.onDone.bind(this),
                this.onUndo.bind(this),
                previousValue, newValue);

            if (_value_ === "off") {
                if (this.ventCardView && _isFunction(this.ventCardView.stopFanAnimation)) {
                    this.ventCardView.stopFanAnimation();
                }
            }

            if (newValue.hasOwnProperty(this.dpRscList.power.property)) {
                this.ventCardView.noEventDuringProcessing(true);
                this.device.setRemoteRepresentation(this.dpRscList.power.uri, newValue, this.onReceive.bind(this));
            } else {
                LoggerE("Fail set value, Invalid value.");
                return;
            }
        }

        setFanSpeed(_value_) {
            LoggerI("new Fan Speed Value:" + _value_);
            let newValue = {};
            let previousValue = {};
            previousValue[this.dpRscList.fanspeed.property] = this.value[this.dpRscList.fanspeed.property];
            newValue[this.dpRscList.fanspeed.property] = Number(_value_);

            this.undoCtrl.start(this.dpRscList.fanspeed.uri,
                this.onDone.bind(this),
                this.onUndo.bind(this),
                previousValue, newValue);

            if (newValue.hasOwnProperty(this.dpRscList.fanspeed.property)) {
                this.ventCardView.noEventDuringProcessing(true);
                this.device.setRemoteRepresentation(this.dpRscList.fanspeed.uri, newValue, this.onReceive.bind(this));
            } else {
                LoggerE("Fail set value, Invalid value.");
                return;
            }
        }

        refreshActivityCard() {
            if (this.activityCard && this.activityCardView) {
                this.activityCardView.getActivities(4)
                .then((r) => {
                    this.activityCard.updateList(r);
                });
            }
        }

        onVisibilityChange(state) {
            if (state) {
                this.refreshActivityCard();
            }
        }

        onRefresh() {
            this.refreshActivityCard();
        }

    };

    window.deviceTemplate = new _Vent();

})(window, document)
