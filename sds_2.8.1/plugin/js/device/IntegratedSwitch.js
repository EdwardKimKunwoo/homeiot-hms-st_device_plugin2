/**
 * Samsung SmartThings HomeNet System by HomeIoT R&D Team.
 * Integrated Switch Device Plugin
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

    class _IntegratedSwitch {
        constructor(device) {
            this.deviceType = "oic.d.switch";
        }

        createDevice(_device_, _dpResourceList_) { //"oic.d.switch"
            var power = undefined;

            for (var key in _dpResourceList_) {
                if (_dpResourceList_.hasOwnProperty(key)) {
                    switch (_dpResourceList_[key].uri) {
                        case "/capability/switch/main/0":           // x.com.st.powerswitch
                            power = _dpResourceList_[key];
                            break;
                        default:
                            LoggerW("[Error] Undefined uri on this device : " + _dpResourceList_[key].uri);
                    }
                }
            }

            return new IntegratedSwitch(_device_, { power });
        }
    }

    class IntegratedSwitch {
        constructor(_device_, { power } = {}) {
            LoggerI("Create Integrated Switch Device");
            this.device = _device_; // it is device object.
            this.device_type = 'integrated_switch';

            this.value = {};
            this.undoCtrl = new UndoController(this.device, LIGHT_UNDO_TIMEOUT_VALUE);

            this.dpRscList = new Object();

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

            this.add();
        }

        async add() {
            // Main Feature Card
            if (this.dpRscList.power) {
                this.integratedSwitchCardView = new LightButtonCard(this.device_type, {
                    'parent': $("#heroCardArea"),
                    'label': GetStringByPoCode(this.dpRscList.power.label)
                });
                this.integratedSwitchCardView.init();
                this.integratedSwitchCardView.setEvent("off", this.setSwitch.bind(this, "off"));
                this.integratedSwitchCardView.setEvent("on", this.setSwitch.bind(this, "on"));
            }

            // CS Card
            this.CSInforCardView = new CSCard(this.device_type + "_CSCard", {
                'parent': $("#heroCardArea"),
                'provider': window.provider
            });
            this.CSInforCardView.init();

            const latestContainer = $("#heroCardArea .iot_Card_Container").last(); //for automation card.

            // Bibxy Card
            this.bixbyCardView = new BixbyCard(this.device_type + "_bixby", {
                'parent': $("#heroCardArea"),
                'message':C_('INTEGRATED_SWITCH_BIXBY'),
            });
            this.bixbyCardView.init();

            // Information Card
            this.informationCard = new DeviceInformationCard(this.device_type + "_information", {
                'parent': $("#heroCardArea"),
                'message': C_('INTEGRATED_SWITCH_INFORMATION'),
                'image': './res/png/device/IntegratedSwitch/integrated_switch_info_img.png'
            });
            this.informationCard.init();

            // Grouped Device Card
            this.groupedDevicesCard = new GroupedDevicesCard("integrated_light_grouped", {
                'parent': $("#heroCardArea"),
                'type': 'icon'
            });
            this.groupedDevicesCard.init();
            this.groupedDevicesCard.addDevice("light", C_('BUILT_IN_LIGHT'),
                navigator.language == 'ko-KR' ? '거실' : 'Living Room');
            // this.groupedDevicesCard.addDevice("valve", C_('GASVALVE_NAME'),
            //     navigator.language == 'ko-KR' ? '주방' : 'Kitchen');

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
                LoggerI("Update Light");

                var property = this.dpRscList.power.property;
                this.value[property] = _val_[property];
                LoggerI(_val_[property]);

                if (_val_[property] === "on") {
                    this.integratedSwitchCardView.on();
                } else {
                    this.integratedSwitchCardView.off();
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
        }

        onUndo(_uri_, _val_) {
            LoggerW("----- Request Fail. Try Undo -----");
            this.update(_uri_, _val_); // undo
        }

        setSwitch(_value_) {
            LoggerI("[IntegratedSwitch] send value:" + _value_);
            if (this.value && this.value.hasOwnProperty(this.dpRscList.power.property)) {
                var _curVal = this.value[this.dpRscList.power.property];
                LoggerI("[IntegratedSwitch] current value:" + _curVal);
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

                    LoggerI("[IntegratedSwitch] Send Power :" + JSON.stringify(_value_));
                    if (newLightValue.hasOwnProperty(this.dpRscList.power.property)) {
                        this.device.setRemoteRepresentation(this.dpRscList.power.uri, newLightValue, this.onReceive.bind(this));
                    }

                    this.value[this.dpRscList.power.property] = _value_; //set value.
                }
            }
        }

        refreshactivityCard() {
            if (this.activityCardView && this.activityDatas) {
                this.activityDatas.getActivities(4)
                .then((r) => {
                    this.activityCardView.updateList(r);
                });
            }
        }

        onVisibilityChange(state) {
            if (state) {
                this.refreshactivityCard();
            }
        }

        resize() {
            LoggerI("IntegratedSwitch Card Resize.");
        }

        onRefresh() {
            this.refreshActivityCard();
        }
    };

    window.deviceTemplate = new _IntegratedSwitch();

})(window, document)
