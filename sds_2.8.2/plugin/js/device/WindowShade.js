/**
 * Samsung SmartThings HomeNet System by HomeIoT R&D Team.
 * Windowshade Device Plugin
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
    const WINDOWSHADE_UNDO_TIMEOUT_VALUE = 6000 * 3; // animation duration 6 secs * 3 times.

    const CURTAIN_STATE_CLOSE = 0;
    const CURTAIN_STATE_OPEN = 1;
    const CURTAIN_STATE_PAUSE = 2;

    class _Windowshade {
        constructor() {
            this.deviceType = "oic.d.blind";
        }

        createDevice (_device_, _dpResourceList_) {
            var windowshade = undefined;

            for (var key in _dpResourceList_) {
                if (_dpResourceList_.hasOwnProperty(key)) {
                    switch (_dpResourceList_[key].uri) {
                        case "/capability/windowShade/main/0":           // x.com.st.windowshade
                            windowshade = _dpResourceList_[key];
                            break;
                        default:
                            LoggerW("[Error] Undefined uri on this device : " + _dpResourceList_[key].uri);
                    }
                }
            }

            return new Windowshade(_device_, { windowshade });
        }
    };

    class Windowshade {
        constructor(_device_, { windowshade } = {}) {
            LoggerI("Create Windowshade Widget");
            this.device = _device_; // it is device object.
            this.device_type = 'windowShade';

            this.value = {};
            this.undoCtrl = new UndoController(this.device, WINDOWSHADE_UNDO_TIMEOUT_VALUE);

            this.dpRscList = new Object();

            this.status = undefined;

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
            if (this.dpRscList.windowshade) {
                let modes = [];
                modes.push({
                    id: "open",
                    func: this.onOpen.bind(this),
                    label: "Open"
                });
                if (this.dpRscList.windowshade && this.dpRscList.windowshade.alternative_type && this.dpRscList.windowshade.alternative_type.hasOwnProperty('pause')) {
                    modes.push({
                        id: "pause",
                        func: this.onPause.bind(this),
                        label: "Pause"
                    });
                }
                modes.push({
                    id: "closed",
                    func: this.onClose.bind(this),
                    label: "Close"
                });

                this.windowShadeCardView = new WindowShadeCard(this.device_type, {
                    parent: $("#heroCardArea"),
                    modes: modes
                });
                this.windowShadeCardView.init();
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
                'message':C_('WINDOWSHADE_BIXBY'),
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

        update(_uri_, _val_) {
            LoggerI("update!!! : " + _uri_);
            LoggerI(">>> Received: " + JSON.stringify(_val_));
            LoggerI("<<< Old Value: "+ JSON.stringify(this.value));

            if (this.dpRscList.windowshade && (this.dpRscList.windowshade.uri === _uri_)) {
                // update UI
                var property = this.dpRscList.windowshade.property;
                this.value[property] = _val_[property];
                LoggerI("update windowShade Status : " + _val_[property]);
                var newValue = _val_[property];
                if (newValue === "open") {
                    this.windowShadeCardView.open();
                } else if (newValue === "closed") {
                    this.windowShadeCardView.closed();
                } else if (newValue === "partially open") {
                    this.windowShadeCardView.partiallyOpen();
                }
            }
        }

        onSubscribe(_uri_, _val_) {
            LoggerI("--- onSubscribe ---");
            if (this.undoCtrl.done(_uri_)) {
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

        onUndo(_uri_, _val_){
            LoggerW("----- Request Fail. Try Undo -----");
            this.update(_uri_, _val_); // undo
        }

        onOpen(_val_) {
            LoggerI("[WindowShade] open!!!");
            this.setStatus(CURTAIN_STATE_OPEN);
        }

        onPause(_val_) {
            LoggerI("[WindowShade] pause!!!");
            this.setStatus(CURTAIN_STATE_PAUSE);
        }

        onClose(_val_) {
            LoggerI("[WindowShade] close!!!");
            this.setStatus(CURTAIN_STATE_CLOSE);
        }

        setStatus(_value_) {
            LoggerI("[WindowShade] set Windowshade status," + _value_);
            if (this.value.hasOwnProperty(this.dpRscList.windowshade.property)) {
                LoggerI("Current Windowshade status : " + this.value[this.dpRscList.windowshade.property]);
                var previousStatus = {};

                previousStatus[this.dpRscList.windowshade.property] = this.value[this.dpRscList.windowshade.property]
                var newStatus = {};

                if (_value_ == CURTAIN_STATE_OPEN) {
                    newStatus[this.dpRscList.windowshade.property] = "open";
                } else if (_value_ == CURTAIN_STATE_CLOSE) {
                    newStatus[this.dpRscList.windowshade.property] = "closed";
                } else if (_value_ == CURTAIN_STATE_PAUSE) {
                    // PAUSE is not supported yet
                    LoggerW("\"pause\" is not suportted yet.")
                    newStatus[this.dpRscList.windowshade.property] = "pause";
                } else {
                    LoggerE("Unsupported Value!!!");
                }

                this.undoCtrl.start(this.dpRscList.windowshade.uri,
                    this.onDone.bind(this),
                    this.onUndo.bind(this),
                    previousStatus, newStatus);

                LoggerI("[WindowShade] Send Windowshade status :" + JSON.stringify(newStatus));
                if (newStatus.hasOwnProperty(this.dpRscList.windowshade.property)) {
                    this.value[this.dpRscList.windowshade.property] = newStatus[this.dpRscList.windowshade.property]; //set value.
                    this.device.setRemoteRepresentation(this.dpRscList.windowshade.uri, newStatus, this.onReceive.bind(this));
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

        onRefresh() {
            this.refreshActivityCard();
        }
    }

    window.deviceTemplate = new _Windowshade();

})(window, document)
