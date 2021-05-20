/**
 * Samsung SmartThings HomeNet System by HomeIoT R&D Team.
 * Elevator Device Plugin
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

    const ELEVATOR_UNDO_TIMEOUT_VALUE = 10000;
    const ELEVATOR_TYPE_ONE_BUTTON = "ONE_BUTTON";
    const ELEVATOR_TYPE_TWO_BUTTON = "TWO_BUTTON";

    const ELEVATOR_STATUS_CALLED    = 0;
    const ELEVATOR_STATUS_STANDBY   = 1;
    const ELEVATOR_STATUS_UNKNOWN   = 2;

    class _Elevator {
        constructor(device) {
            this.deviceType = "x.com.st.d.elevator";
        }

        createDevice(_device_, _dpResourceList_) {
            var call = undefined;

            for (var key in _dpResourceList_) {
                if (_dpResourceList_.hasOwnProperty(key)) {
                    switch (_dpResourceList_[key].uri) {
                        case "/capability/elevatorCall/main/0":     // x.com.st.elevatorCall
                            call = _dpResourceList_[key];
                            break;
                        default:
                            LoggerW("[Error] Undefined uri on this device : " + _dpResourceList_[key].uri);
                    }
                }
            }
            return new Elevator(_device_, { call });
        }
    }

    class Elevator {
        constructor(_device_, { call } = {}) {
            LoggerI("Create Elevator Widget");
            this.device = _device_; // it is device object.
            this.device_type = 'elevator';

            this.value = {};
            this.undoCtrl = new UndoController(this.device, ELEVATOR_UNDO_TIMEOUT_VALUE);

            this.dpRscList = new Object();

            //TODO: Provider 참고해서 elevatorType 수정 가능 필요
            this.elevatorType = ELEVATOR_TYPE_ONE_BUTTON;
            LoggerI("window.elevatorDemoType:" + window.elevatorDemoType);
            if (window.elevatorDemoType !== undefined && window.elevatorDemoType === "two") {
                this.elevatorType = ELEVATOR_TYPE_TWO_BUTTON;
            }
            this.callButtonFlag = false;    // To check the calling is occurred by myself or not.
            this.upButtonFlag = false;
            this.downButtonFlag = false;

            this.animation_direction = "down";  // Default

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

        add() {
            // Main Feature Card
            if (this.dpRscList.call) {
                if (this.elevatorType === ELEVATOR_TYPE_ONE_BUTTON) {
                    this.elevatorCardView = new ElevatorCard(this.device_type, {
                        'parent': $("#heroCardArea"),
                        'bgColor': "#8173FF",
                        'label': C_('VA_ELEVATOR_CALL_BUTTON'),
                        'type' : "default"
                    });
                } else if (this.elevatorType === ELEVATOR_TYPE_TWO_BUTTON) {
                    this.elevatorCardView = new ElevatorCard(this.device_type, {
                        'parent': $("#heroCardArea"),
                        'bgColor': "#8173FF",
                        'label': C_('VA_ELEVATOR_CALL_BUTTON'),
                        'type' : "two"
                    });
                } else {
                    LoggerE("Invalid Elevator Type!!")
                }
                this.elevatorCardView.init();
                this.elevatorCardView.setEvent("click", this.setCall.bind(this));
            }

            // CS Card
            this.CSInforCardView = new CSCard(this.device_type + "_CSCard", {
                'parent': $("#heroCardArea"),
                'provider': window.provider
            });
            this.CSInforCardView.init();

            // Information Card
            this.informationCard = new DeviceInformationCard(this.device_type + "_information", {
                'parent': $("#heroCardArea"),
                'message': C_('ELEVATOR_INFORMATION'),
                'image': './res/png/device/Elevator/elevator_info_img.png'
            });
            this.informationCard.init();

            // Bibxy Card
            this.bixbyCardView = new BixbyCard(this.device_type + "_bixby", {
                'parent': $("#heroCardArea"),
                'message':C_('ELEVATOR_BIXBY'),
            });
            this.bixbyCardView.init();
        }

        getValue() {
            return this.value;
        }

        update(_uri_, _val_) {    //_val_ is json format
            // TODO: Elevator cannot read the status now. So, Skip it now.
            LoggerI("update!!! : " + _uri_);
            LoggerI(">>> Received: " + JSON.stringify(_val_));
            LoggerI("<<< Old Value: "+ JSON.stringify(this.value));

            if (this.dpRscList.call && (this.dpRscList.call.uri === _uri_)) {
                LoggerI("Update Elevator Status");

                var property = this.dpRscList.call.property;
                this.value[property] = _val_[property];

                LoggerW(this.value[property]);
                LoggerW(this.callButtonFlag)

                // update UI : Running
                if (this.value[property] === 'called' && this.callButtonFlag) {
                    this.elevatorCardView.called(1);
                    this.callButtonFlag = false;
                } else {
                    // for the case standby, unknown
                    this.elevatorCardView.standby();
                }
            } else {
                LoggerE("Fail set value, Invalid value." + this.dpRscList.call.property + " does not eixst");
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
            LoggerI("--- onReceive ---");
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
            // NOTE: Undo Process only for the elevator
            this.callButtonFlag = false;
            let deviceName = C_('ELEVATOR_LABLE');
            if (toastPopup)
                toastPopup.showToast(C_('ELEVATOR_CONNECTION_ERROR', deviceName));

            this.update(_uri_, _val_); // undo
        }

        // TODO: Elevator Command
        setCall(_index_) {
            LoggerI("[ELEVATOR] send Call: " + _index_);
            this.callButtonFlag = true;
            if (this.value && this.value.hasOwnProperty(this.dpRscList.call.property)) {
                var _curVal = this.value[this.dpRscList.call.property];
                LoggerI("[ELEVATOR] current value:" + _curVal);

                var previousStatusValue = {};
                previousStatusValue[this.dpRscList.call.property] = Object.keys(this.dpRscList.call.alternatives)[ELEVATOR_STATUS_UNKNOWN];
                var newStatusValue = {};
                newStatusValue[this.dpRscList.call.property] = Object.keys(this.dpRscList.call.alternatives)[ELEVATOR_STATUS_CALLED];
                var _value_ = Object.keys(this.dpRscList.call.alternatives)[ELEVATOR_STATUS_CALLED];

                this.undoCtrl.start(this.dpRscList.call.uri,
                    this.onDone.bind(this),
                    this.onUndo.bind(this),
                    previousStatusValue, newStatusValue, false);

                LoggerI("[ELEVATOR] Send status :" + JSON.stringify(_value_));
                // TODO: Index에 따라서 해당 버튼 Call 호출
                if (newStatusValue.hasOwnProperty(this.dpRscList.call.property)) {
                    this.value[this.dpRscList.call.property] = _value_; //set value.
                    this.device.setRemoteRepresentation(this.dpRscList.call.uri, newStatusValue, this.onReceive.bind(this));
                }
            }
        }
    }

    window.deviceTemplate = new _Elevator();

})(window, document)
