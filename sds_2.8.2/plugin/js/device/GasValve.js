/**
 * Samsung SmartThings HomeNet System by HomeIoT R&D Team.
 * Gas Valve Device Plugin
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

    const GASVALVE_UNDO_TIMEOUT_VALUE = 10000;

    const GASVALVE_STATUS_STANDBY = 0;
    const GASVALVE_STATUS_LOADING = 1;

    class _GasValve {
        constructor() {
            this.deviceType = "x.com.st.d.gasvalve";
        }

        createDevice(_device_, _dpResourceList_) {
            var valve = undefined;
            for (var key in _dpResourceList_) {
                if (_dpResourceList_.hasOwnProperty(key)) {
                    switch (_dpResourceList_[key].uri) {
                        case "/capability/valve/main/0":           // x.com.st.valve
                            valve = _dpResourceList_[key];
                            break;
                        default:
                            LoggerW("[Error] Undefined uri on this device : " + _dpResourceList_[key].uri);
                    }
                }
            }
            return new GasValve(_device_, { valve } );
        }
    }

    class GasValve {
        constructor(_device_, { valve } = {}) {
            LoggerI("Create GasValve Widget");
            this.device = _device_; // it is device object.
            this.device_type = 'gas_valve';

            this.value = {};
            this.undoCtrl = new UndoController(this.device, GASVALVE_UNDO_TIMEOUT_VALUE);

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
            this.device_status = undefined;

            // For the safety issue, opening operation is not recommended.
            this.reopen = false;

            this.add();

            // Error Dialog for Gas Valve Closing Operation
            this.operationErrorDlg = new Dialog("gasValveErrDlg_01", {
                parent: $("body"),
                title: C_('OPERATION_FAIL_TITLE'),
                description: C_('GASVALVE_OPERATION_FAIL'), btnArr:{
                    [C_("DIALOG_BUTTON_OK")] (dlg) {
                        dlg.hide();
                    }
                }});
            this.operationErrorDlg.init();
        }

        add() {
            // Main Feature Card
            if (this.dpRscList.valve) {
                this.valveCardView = new ValveCard(this.device_type, {
                    'parent': $("#heroCardArea"),
                    'bgColor': "#4376FF",
                    'valveStatusText': {
                        open: capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.valve.alternatives['true'])),
                        close:capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.valve.alternatives['false']))
                    },
                    'open': this.reopen && (this.dpRscList.valve.controllable || false),
                    'close': this.dpRscList.valve.controllable || false
                    // 'drawing_valve': true
                });
                this.valveCardView.init();
                if (this.dpRscList.valve.controllable) {
                    this.valveCardView.setEvent("off", this.setValve.bind(this, false));
                    this.valveCardView.setEvent("on", this.setValve.bind(this, true));
                }
            }

            // CS Card
            this.CSInforCardView = new CSCard(this.device_type + "_CSCard", {
                'parent': $("#heroCardArea"),
                'provider': window.provider
            });
            this.CSInforCardView.init();

            // Caution Card
            this.cautionCardView = new CautionCard(this.device_type + "_caution", {
                'parent': $("#heroCardArea"),
                'message': this.dpRscList.valve.controllable ?
                    C_('GASVALVE_WARN_MESSAGE_CLOSE_ONLY') : C_('GASVALVE_WARN_MESSAGE_NO_CONTROL'),
            });
            this.cautionCardView.init();

            // Bibxy Card
            this.bixbyCardView = new BixbyCard(this.device_type + "_bixby", {
                'parent': $("#heroCardArea"),
                'message': this.dpRscList.valve.controllable ?
                    C_('GASVALVE_BIXBY') : C_('GASVALVE_BIXBY_NO_CONTROL'),
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

        update(_uri_, _val_) {    //_val_ is json format
            LoggerI("update!!! : " + _uri_);
            LoggerI(">>> Received: " + JSON.stringify(_val_));
            LoggerI("<<< Old Value: "+ JSON.stringify(this.value));

            if (this.device_status != GASVALVE_STATUS_LOADING) {
                this.device_status = GASVALVE_STATUS_STANDBY;
            }
            if (this.dpRscList.valve && (this.dpRscList.valve.uri === _uri_)) {
                LoggerI("update valve");
                var property = this.dpRscList.valve.property;
                this.value[property] = _val_[property];
                LoggerI(_val_[property]);

                if (_val_[property]) {
                    this.valveCardView.on();
                } else {
                    this.valveCardView.off();
                }
            }
        }

        onSubscribe(_uri_, _val_) {
            LoggerI("--- onSubscribe ---");
            if (this.undoCtrl.done(_uri_, _val_)) {
                this.update(_uri_, _val_);
            } else {
                LoggerI("Invalid Subscribe, skip update device!");
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

        onUndo(_uri_, _val_){
            LoggerW("----- Request Fail. Try Undo -----");
            // NOTE: Undo Process only for the GasValve
            this.operationErrorDlg.show();
            this.update(_uri_, _val_); // undo
        }

        setValve(_value_) {
            LoggerI("[GasValve] Send Gas value : " + _value_);
            if (this.value && this.value.hasOwnProperty(this.dpRscList.valve.property)) {
                var _curVal = this.value[this.dpRscList.valve.property];
                LoggerI("[GasValve] current value : " + _curVal);

                if (_value_ !== _curVal) {
                    if (_value_ == true && !this.reopen) {
                        LoggerI("[GasValve] Do NOT Turn ON for safety issue.");
                        return;
                    }
                    var previousValveValue = cloneObject(this.value);
                    var newValveValue = {};

                    if (_curVal === true) {
                        newValveValue[this.dpRscList.valve.property] = false;
                    } else {
                        newValveValue[this.dpRscList.valve.property] = true;
                    }

                    this.undoCtrl.start(this.dpRscList.valve.uri,
                        this.onDone.bind(this),
                        this.onUndo.bind(this),
                        previousValveValue, newValveValue, false);
                    LoggerI("[GasValve] Send Valve :" + JSON.stringify(newValveValue));
                    if (newValveValue.hasOwnProperty(this.dpRscList.valve.property)) {
                        this.device.setRemoteRepresentation(this.dpRscList.valve.uri, newValveValue, this.onReceive.bind(this));
                    }
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

        onRefresh() {
            this.refreshActivityCard();
        }
    }

    window.deviceTemplate = new _GasValve();

})(window, document)
