
const automationInstance = [];

// ### Automation
class Automation {
    constructor(name, automationId, locationId, pluginDeviceId, customTag, enabled) {
        this._class = 'Automation';

        if (typeof name === 'object') { // tricky
            this._body = {};
            this.import(name);
        } else {
            this._body = {
                name,
                automationId,
                locationId,
                hidden: false,
                pluginDeviceId,
                customTag,
                enabled,
                timeCondition: {},
                deviceConditions: [],
                deviceActions: []
            };
        }
    }

    import(obj) {
        for (const key in obj) {
            this._body[key] = obj[key];
        }

        return this;
    }

    setTimeCondition(timeCondition) {
        this._body.timeCondition = timeCondition.toObj();

        return this;
    }

    addDeviceConditions(deviceCondition) {
        this._body.deviceConditions.push(deviceCondition.toObj());

        return this;
    }

    addDeviceActions(deviceCondition) {
        this._body.deviceActions.push(deviceCondition.toObj());

        return this;
    }

    get body() {
        if (this._body.name === null) {
            delete this._body.name;
        }

        if (this._body.automationId === null) {
            delete this._body.automationId;
        }

        if (this._body.deviceConditions !== undefined && this._body.deviceConditions.length === 0) {
            delete this._body.deviceConditions;
        }

        return this._body;
    }

    get name() {
        return this.body.name;
    }

    get automationId() {
        return this.body.automationId;
    }

    get locationId() {
        return this.body.locationId;
    }

    get hidden() {
        return this.body.hidden;
    }

    get pluginDeviceId() {
        return this.body.pluginDeviceId;
    }

    get customTag() {
        return this.body.customTag;
    }

    get enabled() {
        return this.body.enabled;
    }

    get timeCondition() {
        return this.body.timeCondition;
    }

    get deviceConditions() {
        return this.body.deviceConditions;
    }

    get deviceActions() {
        return this.body.deviceActions;
    }

    set name(name) {
        this.body.name = name;
    }

    set automationId(automationId) {
        this.body.automationId = automationId;
    }

    set locationId(locationId) {
        this.body.locationId = locationId;
    }

    set hidden(hidden) {
        this.body.hidden = hidden;
    }

    set pluginDeviceId(pluginDeviceId) {
        this.body.pluginDeviceId = pluginDeviceId;
    }

    set customTag(customTag) {
        this.body.customTag = customTag;
    }

    set enabled(enabled) {
        this.body.enabled = enabled;
    }

    async delete() {
        if (!_isString(this.locationId)) {
            throw new Error('TypeMismatchError', 'locationId is not string');
        }

        if (!_isString(this.automationId)) {
            throw new Error('TypeMismatchError', 'ruleId is not string');
        }

        return new Promise((resolve, reject) => {
            LoggerD(`automationManager.deleteAutomation >>> ruleId ['${this.automationId}'] locationId ['${this.locationId}']`);
            window.scplugin.automationManager.deleteAutomation(this.automationId, this.locationId, (res) => {
                LoggerD('automationManager.deleteAutomation <<<');
                resolve(res);
            }, e => reject(new Error(e.message)));
        });
    }

    async update() {
        if (!_isString(this.locationId)) {
            throw new Error('TypeMismatchError', 'locationId is not string');
        }

        if (!_isString(this.automationId)) {
            throw new Error('TypeMismatchError', 'ruleId is not string');
        }

        if (!_isObject(this.body)) {
            throw new Error('typeMismatchError', 'requestBody is not object');
        }

        const editAutomation = (ruleId, locationId, requestBody) => {
            return new Promise((resolve, reject) => {
                LoggerD(`automationManager.editAutomation >>> ruleId ['${ruleId}'] requestBody ['${JSON.stringify(requestBody)}']`);
                window.scplugin.automationManager.editAutomation(ruleId, locationId, requestBody, automation => {
                    LoggerD(`automationManager.editAutomation<<< automation ['${automation}']`);

                    if (!automation) {
                        reject(new Error('AUTOMATION REQUEST FAILED'));
                    }

                    resolve(automation);
                }, e => reject(new Error(e.message)));
            });
        }

        const result = await editAutomation(this.automationId, this.locationId, this.body);
        return this.import(result);
    }

    async sync() {
        if (!_isString(this.locationId)) {
            throw new Error('TypeMismatchError', 'locationId is not string');
        }

        if (!_isString(this.automationId)) {
            throw new Error('TypeMismatchError', 'ruleId is not string');
        }

        const getAutomation = (ruleId, locationId) => {
            return new Promise((resolve, reject) => {
                LoggerD(`automationManager.getAutomation >>> ruleId ['${ruleId}'] locationId ['${locationId}']`);
                window.scplugin.automationManager.getAutomation(ruleId, locationId, automation => {
                    LoggerD(`automationManager.getAutomation<<< automation ['${automation}']`);

                    if (!automation) {
                        reject(new Error('AUTOMATION REQUEST FAILED'));
                    }

                    resolve(automation);
                }, e => reject(new Error(e.message)));
            });
        }

        const result = await getAutomation(this.automationId, this.locationId);
        return this.import(result);
    }

    async enable(value) {
        if (!_isString(this.locationId)) {
            throw new Error('TypeMismatchError', 'locationId is not string');
        }

        if (!_isString(this.automationId)) {
            throw new Error('TypeMismatchError', 'ruleId is not string');
        }

        if (value) {
            const enableAutomation = (locationId, ruleId) => {
                return new Promise((resolve, reject) => {
                    LoggerD(`automationManager.enableAutomation >>> ruleId ['${ruleId}'] locationId ['${locationId}']`);
                    window.scplugin.automationManager.enableAutomation(ruleId, locationId, () => {
                        LoggerD(`automationManager.enableAutomation<<<`);
                        resolve();
                    }, e => reject(new Error(e.message)));
                });
            }
            await enableAutomation(this.locationId, this.automationId);

        } else {

            const disableAutomation = (locationId, ruleId) => {
                return new Promise((resolve, reject) => {
                    LoggerD(`automationManager.disableAutomation >>> ruleId ['${ruleId}'] locationId ['${locationId}']`);
                    window.scplugin.automationManager.disableAutomation(ruleId, locationId, () => {
                        LoggerD(`automationManager.disableAutomation<<<`);
                        resolve();
                    }, e => reject(new Error(e.message)));
                });
            }
            await disableAutomation(this.locationId, this.automationId);
        }

        return this;
    }
}

class Condition {
    constructor(name) {
        this._class = 'Condition';

        if (typeof name === 'object') { // tricky
            name = name.n; // order is important!
        }

        (name != null) && (this._name = name);
    }

    import(obj) {
        this._name = obj.n != null ? obj.n : undefined;

        return this;
    }

    toObj() {
        return {
            n: this.name
        };
    }

    get name() {
        return this._name;
    }
}


class TimeCondition extends Condition {
    constructor(name, time, days) {
        super(name);

        this._class = 'TimeCondition';

        this._time = time;
        this._days = days;
    }

    import(obj) {
        super.import(obj);

        this._time = obj.time;
        this._days = obj.days;

        return this;
    }

    toObj() {
        const obj = super.toObj();

        obj.time = this.time;
        obj.days = this.days;

        return obj;
    }

    get time() {
        return this._time;
    }

    get days() {
        return this._days;
    }

    set time(time) {
        this._time = time;
    }

    set days(days) {
        this._days = days;
    }
}

class DeviceCondition extends Condition {
    constructor(name, rt, did, valueType, href, property, operand, type, operator) {
        super(name);

        this._class = 'DeviceCondition';

        this._rt = rt;
        this._did = did;
        this._valueType = valueType;
        this._href = href;
        this._propery = property;
        this._operand = operand || undefined;
        this._type = type;
        this._operator = operator;
    }

    import(obj) {
        super.import(obj);

        this._rt = obj.rt;
        this._did = obj.did;
        this._valueType = obj.valueType;
        this._href = obj.href;
        this._propery = obj.property;
        this._operand = obj.operand || undefined;
        this._type = obj.type;
        this._operator = obj.operator;

        return this;
    }

    toObj() {
        const obj = super.toObj();

        obj.rt = this.rt;
        obj.did = this.did;
        obj.href = this.href;
        obj.property = this.property;
        obj.operand = this.operand;
        obj.valueType = this.valueType;

        return obj;
    }

    get rt() {
        return this._rt;
    }

    get did() {
        return this._did;
    }

    get href() {
        return this._href;
    }

    get property() {
        return this._propery;
    }

    get operand() {
        return this._operand;
    }

    get type() {
        return this._type;
    }

    get operator() {
        return this._operator;
    }

    get valueType() {
        return this._valueType;
    }

    set rt(rt) {
        this._rt = rt;
    }

    set did(did) {
        this._did = did;
    }

    set href(href) {
        this._href = href;
    }

    set property(property) {
        this._property = property;
    }

    set operand(operand) {
        this._operand = operand;
    }

    set type(type) {
        this._type = type;
    }

    set operator(operator) {
        this._operator = operator;
    }

    set valueType(valueType) {
        this._valueType = valueType;
    }
}

class Action {
    constructor(name) {
        this._class = 'Action';

        if (typeof name === 'object') { // tricky
            name = name.n; // order is important!
        }

        (name != null) && (this._name = name);
    }

    import(obj) {
        this._name = obj.n != null ? obj.n : undefined;

        return this;
    }

    toObj() {
        return {
            n: this.name
        };
    }

    get name() {
        return this._name;
    }
}

class DeviceAction extends Action {
    constructor(name, rt, did, href, property, value, valueType) {
        super(name);

        this._class = 'DeviceAction';

        this._rt = rt;
        this._did = did;
        this._href = href;
        this._property = property;
        this._value = value;
        this._valueType = valueType;
    }

    import(obj) {
        super.import(obj);

        this._rt = obj.rt;
        this._did = obj.did;
        this._href = obj.href;
        this._property = obj.property;
        this._value = obj.value;
        this._valueType = obj.valueType;

        return this;
    }

    toObj() {
        const obj = super.toObj();

        obj.rt = this.rt;
        obj.did = this.did;
        obj.href = this.href;
        obj.property = this.property;
        obj.operand = this.operand;
        obj.value = this.value;
        obj.valueType = this.valueType;

        return obj;
    }

    get rt() {
        return this._rt;
    }

    get did() {
        return this._did;
    }

    get href() {
        return this._href;
    }

    get property() {
        return this._property;
    }

    get value() {
        return this._value;
    }

    get valueType() {
        return this._valueType;
    }

    set rt(rt) {
        this._rt = rt;
    }

    set did(did) {
        this._did = did;
    }

    set href(href) {
        this._href = href;
    }

    set property(property) {
        this._property = property;
    }

    set value(value) {
        this._value = value;
    }

    set valueType(valueType) {
        this._valueType = valueType;
    }
}

class AutomationManager {
    constructor(locationId, uri, deviceId) {
        if (locationId === undefined) {
            throw new Error('NO_LOCATION_ID');
        }

        if (automationInstance[locationId]) {
            return automationInstance[locationId];
        }

        automationInstance[locationId] = this;

        this._class = 'AutomationManager';
        this._locationId = locationId;
        this._uri = uri;
        this._deviceId = deviceId;
        this._listeners = {};

        return this;
    }

    async createAutomation(automation) {
        if (!_isString(this.locationId)) {
            throw new Error('TypeMismatchError', 'locationId is not string');
        }

        if (!_isObject(automation)) {
            throw new Error('TypeMismatchError', 'automation is not object');
        }

        const addRule = (locationId, requestBody) => {
            return new Promise((resolve, reject) => {
                LoggerD(`automationManager.createAutomation >>> locationId ['${locationId}'] requestBody ['${JSON.stringify(requestBody)}']`);
                window.scplugin.automationManager.createAutomation(locationId, requestBody, automation => {
                    LoggerD(`automationManager.createAutomation<<< automation ['${JSON.stringify(automation)}']`);

                    if (!automation) {
                        reject(new Error('AUTOMATION REQUEST FAILED'));
                    }

                    resolve(automation);
                }, e => reject(new Error(e.message)));
            });
        }

        const result = await addRule(this.locationId, automation.body);
        return new Automation(result);
    }

    async updateAutomation(automationId, automation) {
        if (!_isString(automationId)) {
            throw new Error('TypeMismatchError', 'ruleId is not string');
        }

        if (!_isObject(automation)) {
            throw new Error('typeMismatchError', 'automation is not object');
        }

        const updateRule = (locationId, ruleId, requestBody) => {
            return new Promise((resolve, reject) => {
                LoggerD(`automationManager.editAutomation >>> ruleId ['${ruleId}'] requestBody ['${JSON.stringify(requestBody)}']`);
                window.scplugin.automationManager.editAutomation(ruleId, locationId, requestBody, automation => {
                    LoggerD(`automationManager.editAutomation<<< automation ['${JSON.stringify(automation)}']`);

                    if (!automation) {
                        reject(new Error('AUTOMATION REQUEST FAILED'));
                    }

                    resolve(automation);
                }, e => reject(new Error(e.message)));
            });
        }

        const result = await updateRule(this.locationId, automationId, automation.body);
        return new Automation(result);
    }

    async deleteAutomation(automationId) {

        if (!_isString(automationId)) {
            throw new Error('TypeMismatchError', 'ruleId is not string');
        }

        return new Promise((resolve, reject) => {
            LoggerD(`automationManager.deleteAutomation >>> ruleId ['${automationId}'] locationId ['${this.locationId}']`);
            window.scplugin.automationManager.deleteAutomation(automationId, this.locationId, (res) => {
                LoggerD('automationManager.deleteAutomation <<<');
                resolve(res);
            }, e => reject(new Error(e.message)));
        });
    }


    async getAutomation(automationId) {

        if (!_isString(automationId)) {
            throw new Error('TypeMismatchError', 'ruleId is not string');
        }

        const getAutomation = (locationId, ruleId) => {
            return new Promise((resolve, reject) => {
                LoggerD(`automationManager.getAutomation >>> ruleId ['${ruleId}'] locationId ['${locationId}']`);
                window.scplugin.automationManager.getAutomation(ruleId, locationId, automation => {
                    LoggerD(`automationManager.getAutomation<<< automation ['${automation}']`);

                    if (!automation) {
                        reject(new Error('AUTOMATION REQUEST FAILED'));
                    }

                    resolve(automation);
                }, e => reject(new Error(e.message)));
            });
        }

        const result = await getAutomation(this.locationId, automationId);
        return new Automation(result);
    }

    async getAutomationList(customTag) {
        if (!_isString(customTag)) {
            throw new Error('TypeMismatchError', 'customTag is not string');
        }

        const getRuleList = (locationId, customTag) => {
            return new Promise((resolve, reject) => {
                LoggerD(`automationManager.getAutomationList >>> customTag ['${customTag}'] locationId ['${locationId}']`);
                window.scplugin.automationManager.getAutomationList(locationId, automationList => {
                    LoggerD(`automationManager.getAutomationList<<< automationList ['${JSON.stringify(automationList)}']`);

                    if (!automationList || !Array.isArray(automationList)) {
                        reject(new Error('AUTOMATION REQUEST FAILED'));
                    }

                    resolve(automationList);
                }, e => reject(new Error(e.message)), {
                    customTag
                });
            });
        }

        const result = await getRuleList(this.locationId, customTag);
        return result.map(automation => new Automation(automation));
    }

    async toggleAutomationStatus(enable, automationId) {
        if (!_isString(automationId)) {
            throw new Error('TypeMismatchError', 'ruleId is not string');
        }

       if (enable) {
            const enableAutomation = (locationId, ruleId) => {
                return new Promise((resolve, reject) => {
                    LoggerD(`automationManager.enableAutomation >>> ruleId ['${ruleId}'] locationId ['${locationId}']`);
                    window.scplugin.automationManager.enableAutomation(ruleId, locationId, () => {
                        LoggerD(`automationManager.enableAutomation<<<`);
                        resolve();
                    }, e => reject(new Error(e.message)));
                });
            }

            return await enableAutomation(this.locationId, automationId);
        } else {
            const disableAutomation = (locationId, ruleId) => {
                return new Promise((resolve, reject) => {
                    LoggerD(`automationManager.disableAutomation >>> ruleId ['${ruleId}'] locationId ['${locationId}']`);
                    window.scplugin.automationManager.disableAutomation(ruleId, locationId, () => {
                        LoggerD(`automationManager.disableAutomation<<<`);
                        resolve();
                    }, e => reject(new Error(e.message)));
                });
            }
            return await disableAutomation(this.locationId, automationId);
        }
    }

    addAutomationEventListener(automationId, listener) {
        automationId = automationId || 'all';

        if (!Object.keys(this._listeners).length) {
            //ScApi.Automation.registerObserveRuleEvent(this.locationId, this._onAutomationEventReceived.bind(this));
            let callback = this._onAutomationEventReceived.bind(this);
            LoggerD(`automationManager.setAutomationStateListener +++`);
            window.scplugin.automationManager.setAutomationStateListener((ruleId, state, automation) => {
                LoggerD(`automationManager.setAutomationStateListener <<< callback automationId [${ruleId}] state[${state}] automation[${automation}]`);
                callback(ruleId, (state || '').toUpperCase(), automation);
            }, e => true /* ignore error callback */);

        }

        if (!this._listeners[automationId]) {
            this._listeners[automationId] = new Set();
        }

        this._listeners[automationId].add(listener);
    }

    removeAutomationEventListener(automationId, listener) {
        automationId = automationId || 'all';

        if (!this._listeners[automationId]) {
            return;
        }

        this._listeners[automationId].delete(listener);
        if (!this._listeners[automationId].size) {
            delete this._listeners[automationId];
        }

        if (!Object.keys(this._listeners).length) {
            LoggerD('automationManager.unsetAutomationStateListener---');
            window.scplugin.automationManager.unsetAutomationStateListener();
        }
    }

	generateCustomTag(type) {
		const customTag = `${this.uri}/${this.deviceId}/${type}`;
        return customTag;
	}

    _onAutomationEventReceived(automationId, event, automation) {
        if (automationId) {
            if (this._listeners[automationId]) {
                this._listeners[automationId].forEach(listener => listener(event, automationId, automation));

                if (event === 'DELETE') {
                    this._listeners[automationId] = new Set();
                }
            }

            if (this._listeners.all) {
                this._listeners.all.forEach(listener => listener(event, automationId, automation));
            }
        }
    }

	get locationId() {
        return this._locationId;
    }

    get uri() {
        return this._uri;
    }

    get deviceId() {
        return this._deviceId;
    }
}
