/**
 * Samsung SmartThings HomeNet System by HomeIoT R&D Team.
 * Smart Doorlock Device Plugin
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

    const SMARTLOCK_UNDO_TIMEOUT_VALUE = 10000;

    const SMARTLOCK_STATUS_LOCKED = 'locked';

    class _SmartLock {
        constructor() {
            this.deviceType = "oic.d.smartlock";
        }

        createDevice(_device_, _dpResourceList_) {
            var lock = undefined;

            for (var key in _dpResourceList_) {
                if (_dpResourceList_.hasOwnProperty(key)) {
                    switch (_dpResourceList_[key].uri) {
                        case "/capability/lock/main/0":           // x.com.st.lock
                            lock = _dpResourceList_[key];
                            break;
                        default:
                            LoggerW("[Error] Undefined uri on this device : " + _dpResourceList_[key].uri);
                    }
                }
            }

            return new SmartLock(_device_, { lock });
        }
    }

    class SmartLock {
        constructor(_device_, { lock } = {}) {
            LoggerI("Create SmartLock Widget");
            this.device = _device_; // it is device object.
            this.device_type = 'doorlock';

            this.value = {};
            this.undoCtrl = new UndoController(this.device, SMARTLOCK_UNDO_TIMEOUT_VALUE);

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

            this.supportLock = true;
            /*
            //Check lock is supported or not from UIMeta.
            for (var i in this.dpRscList.lock.alternatives) {
                if (this.dpRscList.lock.alternatives[i].key === SMARTLOCK_STATUS_LOCKED && this.dpRscList.lock.alternatives[i].disabled === false ) {
                    this.supportClose = true;
                }
            }
            */
            this.add();
        }

        add() {
            // Main Feature Card
            if (this.dpRscList.lock) {
                this.lockCardView = new DoorLockCard(this.device_type, {
                    'parent': $("#heroCardArea"),
                    'bgColor': "#4498DD",
                    'lockSupport': this.supportLock,
                    'lockStatusText': {
                        lock: capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.lock.alternatives['locked'])),
                        unlock: capitalizeFirstLetter(GetStringByPoCode(this.dpRscList.lock.alternatives['unlocked']))
                    }
                });
                this.lockCardView.init();
                this.lockCardView.setEvent("lock", this.setLock.bind(this, 'lock'));
                this.lockCardView.setEvent("unlock", this.setLock.bind(this, 'unlock'));
            }

            // CS Card
            this.CSInforCardView = new DeviceInformationCard(this.device_type + "_CSCard", {
                'parent': $("#heroCardArea"),
                'message': C_('CS_CARD_DESCRIPTION', window.provider.name, window.provider.name, window.provider.contact)
            });
            this.CSInforCardView.init();

            // Bibxy Card
            this.bixbyCardView = new BixbyCard(this.device_type + "_bixby", {
                'parent': $("#heroCardArea"),
                'message':C_('SMARTLOCK_BIXBY'),
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

            if (this.dpRscList.lock && (this.dpRscList.lock.uri === _uri_)) {
                LoggerI("update lock");
                var property = this.dpRscList.lock.property;
                this.value[property] = _val_[property];
                LoggerI(_val_[property]);

                if (_val_[property] == 'locked' ) {
                    this.lockCardView.lock();
                } else {
                    this.lockCardView.unlock();
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
            this.update(_uri_, _val_); // undo
        }

        setLock(_value_) {
            LoggerI("[SmartLock] Send Lock value : " + _value_);
            if (this.value && this.value.hasOwnProperty(this.dpRscList.lock.property)) {
                var _curVal = this.value[this.dpRscList.lock.property];
                LoggerI("[SmartLock] current value : " + _curVal);

                if (_value_ !== _curVal) {
                    if (_value_ == 'locked' && !this.supportLock) {
                        LoggerI("[SmartLock] Can not lock");
                        return;
                    }
                    var previousLockValue = cloneObject(this.value);
                    var newLockValue = {};

                    if (_curVal === 'locked') {
                        newLockValue[this.dpRscList.lock.property] = 'unlocked';
                    } else {
                        newLockValue[this.dpRscList.lock.property] = 'locked';
                    }

                    this.undoCtrl.start(this.dpRscList.lock.uri,
                        this.onDone.bind(this),
                        this.onUndo.bind(this),
                        previousLockValue, newLockValue);

                    LoggerI("[SmartLock] Send Lock :" + JSON.stringify(_value_));
                    if (newLockValue.hasOwnProperty(this.dpRscList.lock.property)) {
                        this.device.setRemoteRepresentation(this.dpRscList.lock.uri, newLockValue, this.onReceive.bind(this));
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

        resize() {
            if (this.lockCardView && _isFunction(this.lockCardView.resize)) {
                this.lockCardView.resize();
            }
        }

        onRefresh() {
            this.refreshActivityCard();
        }
    }

    window.deviceTemplate = new _SmartLock();

})(window, document)