/*
Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information").
You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.
SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/*
 *  Samsung SmartThings HomeNet System by Home IoT R&D Team.
 *  View Card for Device Plugin
 */
class Card {
    constructor(id, {title, icon_header, layout} = {}) {
        this._class = 'Card';
        this._id = id;
        this._title = title;
        this._icon_header = icon_header ? icon_header : undefined;
        this._layout = layout ? layout : 1;       // Card Basic Layout. Default Type01

        // For Rotation
        this._screen = {
            width: screen.width,
            height: screen.height,
            current_width: screen.width
        }
        // In case of ipad, width and height is fixed regardless the orientation state.
		if (isItIOS() && isTablet()) {
			// LoggerD("This is iPad. (w:" + screen.width + " x h:" + screen.height + "), " + getScreenOrientation());
			if (getScreenOrientation() === SCREEN_ORIENTATION_LANDSCAPE) {
				this._screen.current_width = Math.max(this._screen.height, this._screen.width);
			} else {
				this._screen.current_width = Math.min(this._screen.height, this._screen.width);
			}
		}
    }

    init() {
        if (!this._ele._container) {
            this._ele._container = $(Dom.div({ className: 'iot_Card_Container' },
                this._ele._card = $(Dom.div({ className: 'iot_Card' },
                    this._ele._header = $(Dom.div({ className: 'iot_Card_Header' },
                        this._ele._header_text = $(Dom.div({id: this._id + "_title", className: 'iot_Card_Header__text roboto-regular' }, this._title))
                    )),
                    this._ele._contents = $(Dom.div({ className:'iot_Card__contents'}))
                ))
            ));
            if (this._icon_header) {
                if (this._layout === 2) {
                    this._ele._icon_header = $(Dom.div( { className: 'iot_Card_Header__icon layout_type02'}));
                    this._ele._header.append(this._ele._icon_header);
                } else {
                    this._ele._icon_header = $(Dom.div( { className: 'iot_Card_Header__icon'}));
                    this._ele._header.prepend(this._ele._icon_header);
                }
            }

            if (this._layout === 2) {
                this._ele._header.addClass('layout_type02');
                this._ele._header_text.addClass('layout_type02');
            }
        }

        if (!this.title && this.header) {
            this.header.addClass('hide');
        }

        window.addEventListener("orientationchange", this._onRotate.bind(this));
    }

    get class() {
        return this._class;
    }

    get id() {
        return this._id;
    }

    get title() {
         return this._title;
    }

    set title(txt) {
        if (this._ele._header_text) {
            this._ele._header_text.text(txt);
        }
        this._title = txt;
    }

    get container() {
        return this._ele._container;
    }

    get contents() {
        return this._ele._contents;
    }

    get card() {
        return this._ele._card;
    }

    get header() {
        return this._ele._header;
    }

    get icon() {
        return this._ele._icon_header;
    }

    // To Do: Add and check animatable later
    get animatable() {
        return this.container.hasClass('animatable');
    }

    set dimmed(value) {
        this.setDimmed(value);
    }

    get dimmed() {
        return this.isDimmed();
    }

    setDimmed(value) {
        this._dimmed = value;
        this._ele._container.toggleClass('dimmed');
    }

    isDimmed() {
        return Boolean(this._dimmed);
    }

    setBgColor(color) {
        if (color) {
            this.card.css('background-color', color);
        }
    }

    setBackground(value) {
        if (value) {
            this.card.css('background', value);
        }
    }

    _getOffsetHeight(restoreValue) {
        const lastHeight = this.container.height();
        // calc height
        this.container.css('height','auto');
        // reflow and get height
        const height = this.container.height();
        if (restoreValue != null) {
            this.container.css('height', restoreValue + "px");
            // reflow, restore complete
            (() => this.container.height())();
        } else {
            // restore
            this.container.css('height', lastHeight);
            if (lastHeight !==  height + 'px') {
                // reflow, restore complete
                (() => this.container.height())();
            }
        }

        return height;
    }

    async show(value, immediate) {
        if (Boolean(value) === this.container.hasClass('show')) {
            return;
        }

        immediate = immediate || !this.container.hasClass('animatable');
        if (value) {
            /* show */
            this.container.removeClass('hide');
            // reflow
            (() => this.container.height())();

            // calc height
            const height = this._getOffsetHeight(0); // resize to height 0

            await PromiseTransitionEnd(this.container[0], {
                propertyName: 'height',
                triggerFunc: () => {
                    this.container.css('height',height + 'px');
                    this.container.addClass('show', value);
                }
                , immediate});

        } else {
            // animation!
            await PromiseTransitionEnd(this.container[0], {
                propertyName: 'height',
                triggerFunc: () => {
                    this.container.css('height','0');
                    this.container.removeClass('show', value);
                }
                , immediate});

            /* hide */
            this.container.addClass('hide');
            this.container.css('height', '');
        }
    }

    async resize(immediate) {
        if (!this.animatable) {
            return new Promise(resolve => {
                setTimeout(() => {
                    const height = this._getOffsetHeight(); /*+ Number(this.container.css('padding-top').replace('px',''))*/
                    this.container.height(`${height}px`);
                    resolve();
                }, immediate);
             });
        } else {
            const height = this._getOffsetHeight();
            immediate = immediate || !this.container.hasClass('animatable');
            // start resize animation
            return PromiseTransitionEnd(this.container[0], {
                propertyName: 'height',
                triggerFunc: () => this.container.height(`${height}px`),
                immediate
            });
        }
    }

    // Block the interaction event when the processing circle is enabled.
    noEventDuringProcessing(_value_) {
        if (_value_) {
            this._ele._contents.addClass('no_event');
        } else {
            this._ele._contents.removeClass('no_event');
        }
    }

    _onRotate() {
        // Guess the canvas width before rotation animation done.
        if (this._screen.current_width == this._screen.width) {
            this._screen.current_width = this._screen.height;
        } else {
            this._screen.current_width = this._screen.width;
        }
    }
}

/*
 * Default Card
 * Base of the Capability Card
 */
class CapabilityCard extends Card {
    constructor(id, {parent, title, bgColor}) {
        super(id, {title});
        this._class = 'CapabilityCard';
        // this._id = id;

        this._ele = {};
        this._ele._parentDiv = parent;
        this._ele._activityListItem = [];
        this._bgColor = bgColor;

        this._title = title;

        this._currentStyle = undefined;
        this._pendingWrapper = undefined;
    }

    init() {
        //create card
        super.init();

        Dom.build(c => {
            this._ele._card_animation = $(c.div({ className: 'iot_CapabilityCard animation'})),
            this.card.prepend(this._ele._card_animation);
        });

        if (this._title === undefined) {
            this.header.remove();
        }

        if (_isJQuery(this._ele._parentDiv)) {
            this._ele._parentDiv.append(this.container);
        }

        if (this._bgColor)
            this.setBgColor(this._bgColor);
    }

    get contents() {
        return this._ele._contents;
    }

    get bgAnimation() {
        return this._ele._card_animation;
    }

    setBgAnimation(style) {
        if (style) {
            this._ele._card_animation.addClass(style);
            this._currentStyle = style;
        } else {
            this._ele._card_animation.removeClass(this._currentStyle);
        }
    }

    get card() {
        return this._ele._card;
    }

    setBgColor(color) {
        if (color) {
            this.card[0].style.background = color;
        }
    }

    // Barrier for Loading Screen
    addPendingWrapper(id, {parent, size, offset, transparent} = {}) {
        this._id = id;
        this._transparent = transparent;
        if (!this._pendingWrapper) {
            if (parent && _isJQuery(parent)) {
                this._parent = parent;
            } else {
                this._parent = this.card;
            }
            this._pendingWrapper = new Barrier(this._parent, {loaderSize:size, offset:offset});
        }
        return this._pendingWrapper;
    }

    get pendingWrapper() {
        return this._pendingWrapper;
    }

    setPending(_value_) {
        if (!this._pendingWrapper) {
            console.log("[Error] No PendingWrapper!!!");
            return;
        }

        if (_value_) {
            this._pendingWrapper.activate(true, {transparent:this._transparent});
        } else {
            this._pendingWrapper.deactivate(false);
        }
    }

    movePendingWrapperSpinner(_offset_) {
        if (this._pendingWrapper) {
            this._pendingWrapper.moveTo(_offset_);
        }
    }
}

const DIALOG_TYPE_VALUE = "VALUE_DIALOG";
const DIALOG_TYPE_ITEM = "ITEM_DIALOG";
const DIALOG_TYPE_SELECTION = "SELECTION_DIALOG";

class SwitchWheelCard extends Card {
    constructor(id, {parent, title, range, step, unit, style, powerStatusText, wheelTitle, dlgType} = {}) {
        super(id, {title});
        this._class = 'SwitchWheelCard';
        this._parent = parent;
        this._eventList = {
            on: function () { },
            off: function () { },
            wheel: function() { },
            tick: function() { }
        };

        this._style = style; // SWITCH : switch only, SWITCH_WHEEL : switch + wheel
        this._power = undefined; // true: power on, false: power off
        this._ele = {};
        this._attr = {
            range: { from:1, to:10 },  // 1 ~ 10 is default
            step: 1,
            unit: "%"
        };

        this._wheelAni = {};
        this._wheelAni.wheelImg = undefined;
        this._wheelAni.wheelSize = 450; // 450 px;
        this._wheelAni.pixelRatio = undefined;
        this._wheelAni.wheelImgCanv = undefined;
        this._wheelAni.gradationCanv = undefined;
        this._wheelAni.gradationTopMargin = 10;

        if (step) {
            this._attr.step = step;
        }

        if (range) {
            this._attr.range = range;

            if (range.labels && Array.isArray(range.labels)) {
                let labels = {};
                let i = range.from;
                range.labels.forEach((v)=>{
                    labels[i] = v;
                    i += this._attr.step;
                });

                this._attr.range.labels = labels;
            }
        }

        if (wheelTitle) {
            this._wheelTitle = wheelTitle;
        } else {
            this._wheelTitle = "";
        }

        if (unit)
            this._attr.unit = unit;

        this._dlgType = undefined;
        if(dlgType) {
            this._dlgType = dlgType;
        }

        this._maskColor = {
            selected: '#3695DD',
            normal: '#505050'
        }

        this._onBGColor = "#3695DD"; //default background color
        this._offBGColor = "#E5E5E5";

        this.KNOB_ONE_SIDE_ANGLE = 35;  // LEFT : -35°, RIGHT : 35°
        this.KNOB_TOTAL_ANGLE = (this.KNOB_ONE_SIDE_ANGLE * 2); // 70°
        this.GRADATION_CNT = (this._attr.range.to-this._attr.range.from)/this._attr.step;
        this.GRADATION_STEP = this.KNOB_TOTAL_ANGLE/this.GRADATION_CNT;
        this._objDlg = undefined;

        this._dragStart = false;
        this._wheelDegree = -this.KNOB_ONE_SIDE_ANGLE;
        this._wheelValue = undefined;
        this._prevWheelValue = 0;
        this._gradationBarRotation = {};

        if (powerStatusText && powerStatusText.hasOwnProperty("on")) {
            this.PWR_ON_TEXT = powerStatusText.on;
        } else {
            this.PWR_ON_TEXT = "ON";
        }

        if (powerStatusText && powerStatusText.hasOwnProperty("off")) {
            this.PWR_OFF_TEXT = powerStatusText.off;
        } else {
            this.PWR_OFF_TEXT = "OFF";
        }
    }

    setEvent(_type_, _func_) {
		this._eventList[_type_] = _func_;
    }

    get OFFBGColor() {
        return this._offBGColor;
    }

    set OFFBGColor(color) {
        this._offBGColor = color;
    }

    get ONBGColor() {
        return this._onBGColor;
    }

    set ONBGColor(color) {
        this._onBGColor = color;
    }

    init() {
        super.init();
        this.card.addClass('overflowHidden');
        Dom.build(c => {
            this._ele.animationWrapper = $(c.div({className: 'iot_Card__animation-wrapper'}));

            this._ele.buttonSection = $(c.div({className: 'iot_Card__section wrapper'},
                this._ele.buttonWrapper = $(c.div({className: 'iot_Card__power-button-wrapper'},
                    this._ele.button = $(c.div({className:'iot_Card__power-button', role:'button'},
                        //this._ele.buttonBorder = $(c.div({className:'iot_Card__power-button round-button edge'})),
                        this._ele.buttonBorder = $(c.div({"aria-hidden": "true"})),
                        this._ele.powerButton = $(c.div({"aria-hidden": "true"}))
                    ))
                ))
            ));
            this._ele.button.setRipple('circle');
            this._ele.statusSection = $(c.div({className: 'iot_Card__section flex_wrapper'},
                this._ele.onStatusText = $(c.div({ className: 'iot_Card-switch-status__text roboto-light on fade_out'}, this.PWR_ON_TEXT)),
                this._ele.offStatusText = $(c.div({ className: 'iot_Card-switch-status__text hidden-layer roboto-light'}, this.PWR_OFF_TEXT))
            ));

            if (this._style === "SWITCH_WHEEL") {
                this._ele.statusSection.addClass("hide");
                this._ele.wheelStatusSection = $(c.div({className: 'iot_Card__section flex_wrapper', style: {height:'161px'}},
                    // this._ele.OffLabelWrapper = $(c.div({className: 'iot_SwitchWheelCard__label-wrapper'},
                    //     this._ele.OffLabel = $(c.div({ className: 'iot_SwitchWheelCard__off-label roboto-light'}, this.PWR_OFF_TEXT))
                    // )),
                    this._ele.wheelStatusWrapper = $(c.div({className: 'iot_SwitchWheelCard__wheel_status_wrapper on'},
                        this._ele.wheelLabel = $(c.div({ className: 'iot_SwitchWheelCard__wheel_label roboto-light'}, this._wheelTitle)),
                        this._ele.wheelValue = $(c.div({ className: 'iot_SwitchWheelCard__wheel_value roboto-light'}, "0"))
                    ))
                ));

                let wheelSectionSize = 334;
                this._ele.wheelSection = $(c.div({className: 'iot_Card__section wrapper',
                        style: {'height':'88px', 'width':wheelSectionSize}, role:'slider'},
                    this._ele.wheel = $(c.canvas({className:'iot_SwitchWheelCard__wheel_canvas'}))

                ));

                setTimeout(() => {
                    if (this.contents.width() < wheelSectionSize) {
                        let margin = "auto " + ((this.contents.width() - wheelSectionSize)/2) + "px";
                        this._ele.wheelSection.css("margin", margin);
                    } else {
                        this._ele.wheelSection.css("margin", "auto");
                    }
                }, 0);
            }
        });

        this._ele.buttonPendingWrapper = new Barrier(this._ele.button, {loaderSize:"small"});
        if (this._ele.animationWrapper) {
            this.contents.append(this._ele.animationWrapper);
        }
        this.contents.append(this._ele.buttonSection);
        this.contents.append(this._ele.statusSection);
        // Ignore Default Padding for Wheel Spinning
        this.contents.addClass('no_padding');

        appendSvg(this._ele.powerButton, 'device_ic_control');

        //button event
        this._ele.button.on('click', this._onClickSwitch.bind(this));

        if (this._style === "SWITCH_WHEEL") {
            this.contents.append(this._ele.wheelStatusSection);
            this.contents.append(this._ele.wheelSection);
            this._ele.buttonWrapper.addClass("wheel");

            //draw wheel
            this._drawWheel();

            // VA
            this._ele.wheelSection.attr('aria-valuemin', this._attr.range.from);
            this._ele.wheelSection.attr('aria-valuemax', this._attr.range.to);

            this._ele.wheel.bind('touchstart', this._onKnobTouchStart.bind(this));
            this._ele.wheel.bind('touchmove', this._onKnobTouchMove.bind(this));
            this._ele.wheel.bind('touchend', this._onKnobTouchEnd.bind(this));
            this._ele.wheelValue.on('click', this._onClickValue.bind(this));

            this._ele.spinnerWrapper = $(Dom.div({className:'iot_SwitchWheelCard__wheel hide'}));
            const spinnerContainer = $(Dom.div({className:'iot_SwitchWheelCard__wheel_spinner'}));
            this._ele.spinnerWrapper.append(spinnerContainer);
            this._ele.spinnerWrapper.insertAfter(this._ele.wheel);

            this._ele.wheelSpinner = new Spinner(spinnerContainer, 'ligtcard_wheelSpinner', false, {size:12, strokeWidth:7.5, autoHide:true});
            this._ele.wheelPendingWrapper = new Barrier(this._ele.wheelSection, {outerSpinner: this._ele.wheelSpinner});
        }

        this._parent.append(this.container);
        if (this._offBGColor) {
            this.setBgColor(this._offBGColor);
        }

        this.card.addClass("bg_color_transition");

        if (this._class === "SwitchWheelCard") {
            this.resize(true);
        }
    }

    _onClickSwitch() {
        LoggerI("Click Button");
        if (this._power) {
            this.off({withPending:true});
            if (this._eventList.off) {
                this._eventList.off();
            }
        } else {
            this.on({withPending:true});
            if (this._eventList.on) {
                this._eventList.on();
            }
        }
    }

    _onClickValue(_e_) {
        LoggerI("Click Wheel Value");
        if (this._power) {
            if (this._dlgType === DIALOG_TYPE_VALUE) {
                if (!this._objDlg) {
                    var _that = this;
                    let btnArr = {
                        [C_("DIALOG_BUTTON_CANCEL")] (dlg) {
                            LoggerD("Press Cancel Button");
                            if (dlg._ele.input) {
                                dlg._ele.input.focusout();
                            }
                            dlg.hide();
                        },
                        [C_("DIALOG_BUTTON_DONE")] (dlg, value) {
                            LoggerD("Press Done Button, value:" + value);
                            dlg.hide();
                            _that.setWheel(value, {withPending: _that._wheelValue !== value});
                            if (_that._eventList.wheel && _that._wheelValue !== value) {
                                _that._eventList.wheel(value);
                            }
                        }
                    };

                    this._objDlg = new SetValueDialog(this._id + "_SetValue", this._wheelValue, {
                        parent: $("body"),
                        title:this._wheelTitle,
                        range: this._attr.range,
			            unit:this._attr.unit,
                        step: this._attr.step,
                        btnArr: btnArr,
                        done: C_("DIALOG_BUTTON_DONE")
                    });
                } else {
                    this._objDlg.setValue(this._wheelValue);
                }
            } else if (this._dlgType === DIALOG_TYPE_ITEM) {

                if (!this._objDlg) {
                    var items = new Array();
                    for (let i = this._attr.range.from; i <= this._attr.range.to; i+=this._attr.step) {
                        let label = this._attr.range.labels && this._attr.range.labels[i] ? String(this._attr.range.labels[i]) : String(i);

                        var obj = new Object();
                        obj.key = i;
                        obj.label = label;
                        obj.event = {
                            click: () => {this._onChangeWheelByValueDlg(i);}
                        };

                        items.push(obj);
                    }

                    this._objDlg = new SlideUpMenu($('#mainPage'), this._id + "_item", undefined, items, undefined, undefined);
                }
                let current = this._attr.range.labels && this._attr.range.labels[this._wheelValue] ? String(this._attr.range.labels[this._wheelValue]) : String(this._wheelValue);
                this._objDlg.highlight(current);
            } else if (this._dlgType === DIALOG_TYPE_SELECTION) {

                if (!this._objDlg) {
                    var items = new Array();
                    for (let i = this._attr.range.from; i <= this._attr.range.to; i+=this._attr.step) {
                        let label = this._attr.range.labels && this._attr.range.labels[i] ? String(this._attr.range.labels[i]) : String(i);

                        var obj = new Object();
                        obj.key = i;
                        obj.label = label;
                        obj.event = {
                            click: () => {this._onChangeWheelByValueDlg(i);}
                        };

                        items.push(obj);
                    }
                    this._objDlg = new SelectionListPopup(this._id + "_item", {parent:$("#mainPage"), target: $(_e_.currentTarget), options:items, type:'center', customPos:{top:-50,left:0}});
                }

                let current = this._attr.range.labels && this._attr.range.labels[this._wheelValue] ? String(this._attr.range.labels[this._wheelValue]) : String(this._wheelValue);
                this._objDlg.highlight(current);
            }

            this._objDlg.show();
        }
    }

    _onChangeWheelByValueDlg(_value_) {
        if (_value_ !== this._wheelValue) {
            this.setWheel(_value_, {withPending:true});
            if (this._eventList.wheel) {
                this._eventList.wheel(_value_);
            }
            if (this._objDlg._ele.input)
                this._objDlg._ele.input.focusout();
            setTimeout(() => {
                this._objDlg.hide();
            }, 0);
        }
    }

    resize(immediate)
    {
        super.resize();
    }

    async _drawWheel() {
        if (!this._wheelDegree) {
            return;
        }

        let canvWidth = this._ele.wheelSection.innerWidth();
        let canvHeight = this._ele.wheelSection.innerHeight();
        const wheelCanvas = getHTMLElementFromJQuery(this._ele.wheel);
        const ctx = wheelCanvas.getContext('2d');

        // get pixel ratio
        if (!this._wheelAni.pixelRatio) {
            this._wheelAni.pixelRatio = (function () {
                    let dpr = window.devicePixelRatio || 1;
                    let bsr = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;
                return dpr / bsr;
            })();
            if (isItIOS() && this._wheelAni.pixelRatio > 2) {
                this._wheelAni.pixelRatio = 2; // pixel ratio internal crash it iOS 12.
            }
        }

        wheelCanvas.width = canvWidth * this._wheelAni.pixelRatio;
		wheelCanvas.height = canvHeight * this._wheelAni.pixelRatio;
		wheelCanvas.style.width = canvWidth;
		wheelCanvas.style.height = canvHeight;
        wheelCanvas.getContext('2d').scale(this._wheelAni.pixelRatio, this._wheelAni.pixelRatio);

        if (!this._wheelAni.wheelImg) {
            this._wheelAni.wheelImg = await loadImage("./res/png/common/Controller.png");
        }

        if (!this._wheelAni.wheelImgCanv) {
            this._wheelAni.wheelImgCanv = Dom.canvas({className: 'iot_SwitchWheelCard__wheel_canvas'});
            this._wheelAni.wheelImgCanv.width = this._wheelAni.wheelSize * this._wheelAni.pixelRatio;
            this._wheelAni.wheelImgCanv.height = this._wheelAni.wheelSize * this._wheelAni.pixelRatio;
            this._wheelAni.wheelImgCanv.style.width = this._wheelAni.wheelSize;
            this._wheelAni.wheelImgCanv.style.height = this._wheelAni.wheelSize;
            this._wheelAni.wheelImgCanv.getContext('2d').scale(this._wheelAni.pixelRatio, this._wheelAni.pixelRatio);
        }

        if (!this._wheelAni.gradationCanv) {
            this._wheelAni.gradationCanv = Dom.canvas({className: 'iot_SwitchWheelCard__wheel_canvas'});
            this._wheelAni.gradationCanv.width = this._wheelAni.wheelSize * this._wheelAni.pixelRatio;
            this._wheelAni.gradationCanv.height = this._wheelAni.wheelSize * this._wheelAni.pixelRatio;
            this._wheelAni.gradationCanv.style.width = this._wheelAni.wheelSize;
            this._wheelAni.gradationCanv.style.height = this._wheelAni.wheelSize;
            this._wheelAni.gradationCanv.getContext('2d').scale(this._wheelAni.pixelRatio, this._wheelAni.pixelRatio);

            //draw gradation.
            const gradationCtx = this._wheelAni.gradationCanv.getContext('2d');
            for (let i = this._attr.range.from; i <= this._attr.range.to; i+=this._attr.step) {
                let deg = (-this.KNOB_ONE_SIDE_ANGLE + (((i-this._attr.range.from)/this._attr.step)*this.GRADATION_STEP));
                let label = this._attr.range.labels && this._attr.range.labels[i] ? String(this._attr.range.labels[i]) : String(i);

                this._gradationBarRotation[i] = deg;
                gradationCtx.save();
                gradationCtx.translate(this._wheelAni.wheelSize/2, this._wheelAni.wheelSize/2);
                gradationCtx.rotate(deg * Math.PI / 180);
                gradationCtx.translate(-(this._wheelAni.wheelSize/2), -(this._wheelAni.wheelSize/2));

                gradationCtx.beginPath();
                gradationCtx.strokeStyle = '#D4D4D4';
                gradationCtx.moveTo(this._wheelAni.wheelSize/2, this._wheelAni.gradationTopMargin + 13.5);
                gradationCtx.lineTo(this._wheelAni.wheelSize/2, this._wheelAni.gradationTopMargin + 13.5 + 5);
                gradationCtx.lineWidth = 1;
			    gradationCtx.closePath();
                gradationCtx.stroke();

                gradationCtx.fillStyle = '#B5B5B5';
			    gradationCtx.textAlign = 'center';
                gradationCtx.font = 'normal normal normal 11px sans-serif';
                gradationCtx.fillText(label, this._wheelAni.wheelSize/2, this._wheelAni.gradationTopMargin + 13.5 + 5 + 14);
                gradationCtx.restore();
            }
        }

        const wheelImgCtx = this._wheelAni.wheelImgCanv.getContext('2d');
        wheelImgCtx.save();
        wheelImgCtx.clearRect(0, 0, this._wheelAni.wheelSize, this._wheelAni.wheelSize);
        wheelImgCtx.translate(this._wheelAni.wheelSize/2, this._wheelAni.wheelSize/2);
        wheelImgCtx.rotate(this._wheelDegree * Math.PI / 180);
        wheelImgCtx.translate(-(this._wheelAni.wheelSize/2), -(this._wheelAni.wheelSize/2));
        wheelImgCtx.drawImage(this._wheelAni.wheelImg, 0, 0, this._wheelAni.wheelImg.width, this._wheelAni.wheelImg.height,
            0, 0, this._wheelAni.wheelSize, this._wheelAni.wheelSize);
        wheelImgCtx.restore();

        const leftMargin = ( canvWidth - this._wheelAni.wheelSize ) / 2;

        ctx.clearRect(0, 0, canvWidth , canvHeight );
        ctx.drawImage(this._wheelAni.gradationCanv, 0, 0,
            this._wheelAni.wheelSize * this._wheelAni.pixelRatio, canvHeight * this._wheelAni.pixelRatio,
            leftMargin, 0, this._wheelAni.wheelSize, canvHeight);
        ctx.globalCompositeOperation = "destination-atop";
        ctx.drawImage(this._wheelAni.wheelImgCanv, 0, 0,
            this._wheelAni.wheelSize * this._wheelAni.pixelRatio , canvHeight * this._wheelAni.pixelRatio,
            leftMargin, 0, this._wheelAni.wheelSize, canvHeight);

        return;
    }

    _onKnobTouchStart(_e_) {
        if (!this._power)
            return;
        _e_.preventDefault();
        window.skipRefresh(true); //prevent plugin refresh action.

        LoggerI("Knob Touch Start!");
        this._dragStart = true;
        var _x = (_e_.touches[0].clientX - this._ele.wheelSection.offset().left - this._ele.wheelSection.width() / 2);
        var _y = this._ele.wheelSection.offset().top + this._wheelAni.wheelSize / 2 - _e_.touches[0].clientY;

        var degree = 0;
        if (_x > 0 ) {
            degree = 90 - (Math.atan(_y / _x) * (180 / Math.PI));
            if (degree > this.KNOB_ONE_SIDE_ANGLE) {
                degree = this.KNOB_ONE_SIDE_ANGLE;
            }
        } else if (_x == 0) {
            degree = 0;
        } else if (_x < 0) {
            degree = (90 + (Math.atan(_y / _x) * (180 / Math.PI)))*-1;
            if (degree < -this.KNOB_ONE_SIDE_ANGLE) {
                degree = -this.KNOB_ONE_SIDE_ANGLE;
            }
        }

        this._prevWheelValue = this._wheelValue;
        this._updateWheel(degree);
    }

    _onKnobTouchMove(_e_) {
        if (!this._power)
            return;
        _e_.preventDefault();

        var _x = (_e_.touches[0].clientX - this._ele.wheelSection.offset().left - this._ele.wheelSection.width() / 2);
        var _y = this._ele.wheelSection.offset().top + this._wheelAni.wheelSize / 2 - _e_.touches[0].clientY;
        var degree = 0;
        if (_x > 0 ) {
            degree = 90 - (Math.atan(_y / _x) * (180 / Math.PI));
            if (degree > this.KNOB_ONE_SIDE_ANGLE) {
                degree = this.KNOB_ONE_SIDE_ANGLE;
            }
        } else if (_x == 0) {
            degree = 0;
        } else if (_x < 0) {
            degree = (90 + (Math.atan(_y / _x) * (180 / Math.PI)))*-1;
            if (degree < -this.KNOB_ONE_SIDE_ANGLE) {
                degree = -this.KNOB_ONE_SIDE_ANGLE;
            }
        }

        this._updateWheel(degree);
    }

    _onKnobTouchEnd(_e_) {
        //_e_.preventDefault(); ==> [Intervention] Ignored attempt to cancel a touchend
        if (!this._power)
            return;
        window.skipRefresh(false); //prevent plugin refresh action.

        LoggerI("Knob Touch End!");
        this._dragStart = false;

        //adjusting degree
        let degree = this._wheelDegree;
        //get closest dimming value.
        let closestValue = 0;
        let minDistance = this.KNOB_ONE_SIDE_ANGLE*2; //init value is max.
        for (let i = this._attr.range.from; i <= this._attr.range.to; i+=this._attr.step) {
            let c = Math.round(Math.abs(this._gradationBarRotation[i] - degree));
            if (minDistance >= c) {
                minDistance = c;
                closestValue = i;
            }
        }

        this.setWheel(closestValue, {withPending:this._prevWheelValue !== closestValue});
        if (this._eventList.wheel && this._prevWheelValue !== closestValue) {
            this._eventList.wheel(closestValue);
        }
    }

    _getWheelValFromDegree(_degree_) {
        return Math.round(Number((_degree_ + this.KNOB_ONE_SIDE_ANGLE) / this.GRADATION_STEP)) * this._attr.step;
    }

    _getWheelDegreeFromValue(_val_) {
        if (_val_) {
            return ((_val_-this._attr.range.from)/this._attr.step * this.GRADATION_STEP)-this.KNOB_ONE_SIDE_ANGLE;
        } else {
            return -this.KNOB_ONE_SIDE_ANGLE;
        }
    }

    _updateWheel(_degree_) {
        let currentWheelVal = this._getWheelValFromDegree(_degree_) + this._attr.range.from;

        if (this._wheelValue != currentWheelVal) {
            if (this._ele.wheelValue) {
                let idx = currentWheelVal;
                let label = undefined;
                if (this._attr.range.labels) {
                    label = this._attr.range.labels[idx] ? String(this._attr.range.labels[idx]) : String(idx);
                } else {
                    if (this._attr.unit === "level") {
                        label = C_('DIMMER_LEVEL', currentWheelVal);
                    } else {
                        label = currentWheelVal + "<span>" + this._attr.unit + "</span>";
                    }
                }
                this._ele.wheelValue.html(label);
                // VA
                this._ele.wheelSection.attr("aria-valuenow", currentWheelVal);

                let currentLabel = this._attr.range.labels && this._attr.range.labels[currentWheelVal]
                    ? String(this._attr.range.labels[currentWheelVal]) : this._attr.unit
                        ? String(currentWheelVal) + this._attr.unit : String(currentWheelVal);
                this._ele.wheelSection.attr("aria-valuetext", currentLabel);
            }
            if (this._eventList.tick) {
                this._eventList.tick(currentWheelVal);
            }
        }

        //update spinner wrapper
         if (this._ele.spinnerWrapper) {
            this._ele.spinnerWrapper.css('transform', 'rotate(' + _degree_ + 'deg)');
        }

        this._wheelDegree = _degree_;
        this._drawWheel();
        this._wheelValue = currentWheelVal;
    }

    async on({withPending, immediate} = {}) {
        LoggerI("[ON] :" + this._id);

        if (immediate) {
            this.card.addClass("immediate");
        } else {
            this.card.removeClass("immediate");
        }

        if (this._onBGColor) {
            this.setBgColor(this._onBGColor);
        }

        if (this.contentsBG) {
            this.contents.css("background", "radial-gradient(circle at 50% 25%, rgb(123, 212, 251) 0%, rgba(54, 149, 221, 0) 100%)");
        }

        if (this._ele.buttonBorder) {
            let svg = "<svg viewBox='0 0 61 61'><circle cx='30.5' cy='30.5' r='30.5' stroke='#717171' stroke-width='0' fill='#fafafa'></circle></svg>";
            this._ele.buttonBorder.html(svg);
        }

        if (this._ele.powerButton) {
            setSvg(this._ele.powerButton, 'device_ic_control', { color: this._maskColor.selected });
        }

        if (withPending) {
            this._ele.buttonPendingWrapper.activate(true, {transparent:true});
            if (this._ele.powerButton) {
                this._ele.powerButton.hide();
            }
        } else {
            this._ele.buttonPendingWrapper.deactivate();
            if (this._ele.powerButton) {
                this._ele.powerButton.show();
            }
        }

        if (this._power !== true) { //change ui
            this._power = true;
            if (this._ele.wheelStatusSection) { //wheel
                // this._ele.wheelStatusWrapper.removeClass("hide");
                // setTimeout(() => {
                //     this._ele.wheelStatusWrapper.removeClass("fade_out");
                // }, 0);

                // await PromiseTransitionEnd(getFirstElementFromJQuery(this._ele.OffLabel), {
                //     triggerFunc: () => {
                //         setTimeout(() => {
                //             this._ele.OffLabel.addClass("fade_out");
                //         }, 0);
                //     },
                //     immediate
                // });
                // this._ele.OffLabel.addClass("hide");
                this._ele.wheelLabel.removeClass("disable_text");
                this._ele.wheelValue.removeClass("disable_text");
            } else {
                this._ele.onStatusText.removeClass("fade_out");
                await PromiseTransitionEnd(getHTMLElementFromJQuery(this._ele.offStatusText), {
                    triggerFunc: () => {
                        setTimeout(() => {
                            this._ele.offStatusText.addClass("fade_out");
                        }, 0);
                    },
                    immediate
                });
            }
        }

        // VA
        if (this._ele.button) {
            this._ele.button.attr("aria-pressed", "true");
        }
    }

    async off({withPending, immediate} = {}) {
        LoggerI("[OFF] :" + this._id);

        if (immediate) {
            this.card.addClass("immediate");
        } else {
            this.card.removeClass("immediate");
        }

        if (this._offBGColor) {
            this.setBgColor(this._offBGColor);
        }

        if (this.contentsBG) {
            this.contents.css("background", "");
        }

        if (this._ele.buttonBorder) {
            let svg = "<svg viewBox='0 0 61 61'><circle cx='30.5' cy='30.5' r='30' stroke='#717171' stroke-width='0.5' fill='#fafafa'></circle></svg>";
            this._ele.buttonBorder.html(svg);
        }
        if (this._ele.powerButton) {
            setSvg(this._ele.powerButton, 'device_ic_control', { color: this._maskColor.normal });
        }

        if (withPending) {
            this._ele.buttonPendingWrapper.activate(true, {transparent:true});
            if (this._ele.powerButton) {
                this._ele.powerButton.hide();
            }
        } else {
            this._ele.buttonPendingWrapper.deactivate();
            if (this._ele.powerButton) {
                this._ele.powerButton.show();
            }
        }

        if (this._power !== false) { //change ui
            this._power = false;

            if (this._ele.wheelSection) { //wheel
                // this._ele.OffLabel.removeClass("hide");
                // setTimeout(() => {
                //     this._ele.OffLabel.removeClass("fade_out");
                // }, 0);
                // if (!this._ele.wheelStatusWrapper.hasClass("hide")) {
                //     await PromiseTransitionEnd(getFirstElementFromJQuery(this._ele.wheelStatusWrapper), {
                //         triggerFunc: () => {
                //             setTimeout(() => {
                //                 this._ele.wheelStatusWrapper.addClass("fade_out");
                //             }, 0);
                //         },
                //         immediate
                //     });
                //     this._ele.wheelStatusWrapper.addClass("hide");
                // }
                this._ele.wheelLabel.addClass("disable_text");
                this._ele.wheelValue.addClass("disable_text");
            } else {
                this._ele.onStatusText.addClass("fade_out");
                await PromiseTransitionEnd(getHTMLElementFromJQuery(this._ele.offStatusText), {
                    triggerFunc: () => {
                        setTimeout(() => {
                            this._ele.offStatusText.removeClass("fade_out");
                        }, 0);
                    },
                    immediate
                });
            }
        }

        // VA
        if (this._ele.button) {
            this._ele.button.attr("aria-pressed", "false");
        }

        if (this._objDlg && this._objDlg.isVisible()) {
            if (this._objDlg._ele.input)
                this._objDlg._ele.input.focusout();
            setTimeout(() => {
                this._objDlg.hide();
            }, 0);
        }
    }

    async setWheel(_val_, {withPending, immediate} = {}) {
        let degree = this._getWheelDegreeFromValue(_val_);
        const distance = degree - this._wheelDegree;
        let prevDegree = this._wheelDegree;

        if (withPending) {
            if (this._ele.wheelPendingWrapper) {
                if (!this._ele.wheelPendingWrapper.isActivate()) {
                    this._ele.wheelPendingWrapper.activate(true, {transparent:true});
                } else {
                    return;
                }
            }
            if (this._ele.spinnerWrapper) {
                this._ele.spinnerWrapper.removeClass('hide');
            }
        } else {
            if (this._ele.wheelPendingWrapper) {
                this._ele.wheelPendingWrapper.deactivate();
            }
            if (this._ele.spinnerWrapper) {
                this._ele.spinnerWrapper.addClass('hide');
            }
        }

        await new Promise(resolve => {
            if (immediate) {
                this._updateWheel(degree);
                resolve();
            } else {
                let cnt = 0.0;
                const tHandle = setInterval(() => {
                    const bezier = Bezier.cubicBezier(cnt, .075, .82, .165, 1);
                    this._updateWheel(prevDegree + bezier.y*distance);
                    cnt+= 0.1;
                    if (cnt > 1) {
                        clearInterval(tHandle);
                        resolve();
                    }
                }, 33);
            }
        });
    }

    onRotate() {

        if (this._objDlg && this._objDlg.isVisible()) {
            if (this._objDlg._ele.input)
                this._objDlg._ele.input.focusout();
            setTimeout(() => {
                this._objDlg.hide();
            }, 0);
        }
    }
}

class VentCard extends SwitchWheelCard {
    constructor(id, {parent, title, range, style, powerStatusText, fanSpeedLabel, dlgType} = {}) {
        super(id, {parent, title, range, style, powerStatusText, "wheelTitle": fanSpeedLabel , dlgType});
        this._class = 'VentCard';
        this._speed = undefined;
        this.contentsBG = "radial-gradient(circle at 55% 30%, rgb(123, 212, 251) 0%, rgba(0, 0, 0, 0) 100%";
        //fan animation
        this._anim = {};
        this._anim.FAN_SPEED_LOW = 4000; //  1 rotation per 4 sec.
        this._anim.FAN_SPEED_MEDIUM = 2000; //  1 rotation per 2 sec.
        this._anim.FAN_SPEED_HIGH = 1330; //  1 rotation per 1.33 sec.
        this._anim.FAN_SPEED_MAX = 1000; //  1 rotation per 1 sec.
        this._anim.fanSpeed = 0;         // 0 is off/
        this._anim.fanImg = undefined;
        this._anim.fanMaskImg = undefined;
        this._anim.prevTime = 0;
        this._anim.fanRadian = 0;
        this._anim.isWorking = false; // false is idle mode, true is working mode
    }

    init() {
        super.init();
        if (this._ele.animationWrapper) {
            this._ele.canv = $(Dom.canvas({className: 'iot_VentCard_canvas'}));
            this._ele.animationWrapper.append(this._ele.canv);
            this.ctx = this._ele.canv[0].getContext('2d');
        }

        this.contents.css("width", "100%");
        if (this._class === "VentCard") {
            this.resize();
        }
    }

    resize() {
        super.resize();
        setTimeout(() => {
            let cardWidth = 0;
            let circleTop = 0;
            let circleSize = 0;
            if (!this.header.hasClass('hide')) {
                circleTop += this.header.innerHeight();
            }

            cardWidth += this.contents.width();
            circleSize = cardWidth > 350 ? 350 : cardWidth;   // 350 is max circle size !!
            circleTop += circleSize/6;
        }, 0);
    }

    setEvent(_type_, _func_) {
        if (_type_ === "speed") {
            _type_ = "wheel";
        }
		this._eventList[_type_] = _func_;
    }

    _animationFan(_speed) {
        this._anim.fanSpeed = _speed;
        let nextFrame = async () => {
            let canWidth = this._ele.animationWrapper.innerWidth();
            let canHeight = this._ele.animationWrapper.innerHeight();
            this._ele.canv[0].width = canWidth;
            this._ele.canv[0].height = canHeight;

            if (this._anim.fanSpeed > 0) {
                if (!this._anim.fanImg) {
                    this._anim.fanImg = await loadImage("./res/png/device/Vent/ventilator_wheel.png");
                }

                if (!this._anim.fanMaskImg) {
                    this._anim.fanMaskImg = await loadImage("./res/png/common/Controller.png");
                }

                if (this._anim.prevTime === 0) {
                    this._anim.fanRadian = 0;
                } else {
                    const diff = (new Date()).getTime() - this._anim.prevTime;
                    this._anim.fanRadian += (2*Math.PI/this._anim.fanSpeed)*diff;
                }

                this.ctx.save();
                this.ctx.clearRect(0,0,canWidth, canHeight);

                this.ctx.translate(canWidth/2, canHeight/2);
                this.ctx.rotate(this._anim.fanRadian);
                this.ctx.translate(-(canWidth/2), -(canHeight/2));

                this.ctx.drawImage(this._anim.fanImg,
                    canWidth/2 - (this._anim.fanImg.width/4)/2,
                    canHeight/2 - (this._anim.fanImg.height/4)/2,
                    this._anim.fanImg.width/4, this._anim.fanImg.height/4);
                this.ctx.restore();

                //mask.
                /*
                this.ctx.globalCompositeOperation = "destination-out";
                this.ctx.translate(canWidth/2, canHeight+(this._ele.wheelKnob.innerHeight()/2-88)); //88 is wheel section height.
                this.ctx.rotate(this._wheelDegree * Math.PI / 180);
                this.ctx.translate(-(canWidth/2), -(canHeight+(this._ele.wheelKnob.innerHeight()/2-88)));

                this.ctx.drawImage(this._anim.fanMaskImg, 0, 0,
                    this._anim.fanMaskImg.width, this._anim.fanMaskImg.height,
                    (canWidth - this._ele.wheelKnob.innerWidth())/4 - 29, canHeight-88,
                    this._ele.wheelKnob.innerWidth(), this._ele.wheelKnob.innerHeight());
                */
                this._anim.prevTime = (new Date()).getTime();
                this._anim.isWorking = true;
                window.requestAnimationFrame(nextFrame);
            } else {
                this._anim.prevTime = 0;
                this._anim.fanRadian = 0;
                this.ctx.save();
                this.ctx.clearRect(0,0,canWidth, canHeight);
                this.ctx.restore();
                this._anim.isWorking = false;
            }
        }

        if (!this._anim.isWorking)
            return nextFrame();

        return;
    }

    setPower(_power_, immediate, withFanSpeed) {
        if (_power_ === "on") {
            this.on({immediate});
            if (this._speed !== undefined && withFanSpeed) { // off -> on
                this.setFanSpeed(this._speed, true);
            }
        } else if (_power_ === "off") {
            this.stopFanAnimation();
            this.off({immediate});
            //this._prevPower = "off";
        } else {
            LoggerE("Invalid Value:" + _power_);
        }
    }

    setFanSpeed(_speed_, immediate) {
        LoggerI("speed:" + _speed_);
        LoggerI("power:" + this._power);
        LoggerI("current fan speed:" + this._speed);

        this._speed = _speed_;
        let fanSpeed = 0;
        switch (_speed_) {
            case 1:
                fanSpeed = this._anim.FAN_SPEED_LOW;
                break;
            case 2:
                fanSpeed = this._anim.FAN_SPEED_MEDIUM;
                break;
            case 3:
                fanSpeed = this._anim.FAN_SPEED_HIGH;
                break;
            case 4:
                fanSpeed = this._anim.FAN_SPEED_MAX;
                break;
            default:
                fanSpeed = this._anim.FAN_SPEED_LOW;
        }

        if (this._power) {
            this._animationFan(fanSpeed); // start animation.
        }

        if (this.setWheel && _isFunction(this.setWheel)) {
            this.setWheel(_speed_, {immediate});
        }

    }

    stopFanAnimation() {
        this._anim.fanSpeed = 0;
    }
}

class LightCard extends SwitchWheelCard {
    constructor(id, {parent, title, range, step, unit, style, dimmerTitle, powerStatusText, dlgType}  = {}) {
        super(id, {parent, title, range, step, style, unit, "wheelTitle": dimmerTitle, powerStatusText, dlgType});
        this._class = 'LightCard';

        this.onEventFunc = undefined;
        this.offEventFunc = undefined;

        //animation time.
        this._anim = {};
        this._anim.power = undefined; // true: power on, false: power off
        this._anim.startTime = undefined;
        this._anim.circleSize = 0;
        this._anim.tmpCircleSize = 0;
        this._anim.circleSizeGap = 0;
        this._anim.nextCircleSize = 0;
        this._anim.radialGradientSize = 212; // 424px
        this._anim.radialGradientScale = 1.2; // 120%
        this._anim.powerOnPeriod = 1600; // 1600 ms
        this._anim.powerOffPeriod = 500; // 500 ms
        this._anim.bouncePeriod = 1000; // 1600 ms
        this._anim.dimmerPeriod = 333; // 1600 ms
        this._anim.bounceDirection = false; // true : turn up, false : turn down.
        this.ctx = undefined;

        this.drawFlag = false;
    }

    init() {
        super.init();
        if (this._ele.animationWrapper) {
            this._ele.canv = $(Dom.canvas({className: 'iot_LightCard_canvas'}));
            this._ele.animationWrapper.append(this._ele.canv);
           this.ctx = this._ele.canv[0].getContext('2d');
        }

        this.contents.addClass('full_width');
        if (isItIOS()) {
            appendBorderRadiusClipPathSvg($(document.body));
            this.card.append(Dom.div({className:'iot_borderRadius__cover TopLeft'}));
            this.card.append(Dom.div({className:'iot_borderRadius__cover TopRight'}));
            this.card.append(Dom.div({className:'iot_borderRadius__cover BottomLeft'}));
            this.card.append(Dom.div({className:'iot_borderRadius__cover BottomRight'}));
        }

        this.setEvent("tick" , this._onTickEvent.bind(this));

        if (this._class === "LightCard") {
            this.resize();
        }

        //Voice Assistant
        this._ele.button.attr('aria-label', C_('VA_POWER_SWITCH_NAME'));
    }

    setEvent(_type_, _func_) {
        if (_type_ === "dimmer") {
            _type_ = "wheel";
        }

        if (_type_ === "on" || _type_ === "off") {
            if (_type_ === "on") {
                this.onEventFunc = _func_;
                this._eventList[_type_] = this._eventPowerOn.bind(this);
            }

            if (_type_ === "off") {
                this.offEventFunc = _func_;
                this._eventList[_type_] = this._eventPowerOff.bind(this);
            }
        } else {
            this._eventList[_type_] = _func_;
        }
    }

    resize() {
        console.log("LightCard resize.!!");
        super.resize();
    }

    setPower(_power_, immediate) {
        if (_power_ && (_power_ === "on" || _power_ === "off")) {
            if (_power_ === "on") {
                this.on({immediate});
            } else if (_power_ === "off") {
                this.off({immediate});
            }

            this._runPowerAnimation(_power_);
        } else {
            LoggerE("Invalid Value:" + _power_);
        }
    }

    setDimmer(_val_, immediate) {
        LoggerD("[LightCard] dimmer value:" + _val_);
        if (this.setWheel && _isFunction(this.setWheel) && _val_ != undefined) {
            this.setWheel(_val_, {immediate});
        }
    }

    _onTickEvent(_val_) {
        //console.log("_val_:" + _val_);
    }

    _getBrightnessFromValue(_val_) {
        if (_val_) {
            return 0.3 + (1.2-0.3)*((_val_-this._attr.range.from)/(this._attr.range.to - this._attr.range.from));
        } else {
            return 0.3;
        }
    }

    _eventPowerOn() {
        if (_isFunction(this.onEventFunc)) {
            this.onEventFunc();
        }
    }

    _eventPowerOff() {
        this._runPowerAnimation("off");
        if (_isFunction(this.offEventFunc)) {
            this.offEventFunc();
        }
    }

    _animationPowerOn(callback) {
        this._anim.startTime = (new Date()).getTime();
        let nextFrame = () => {
            let canWidth = this._ele.animationWrapper.innerWidth();
            let canHeight = this._ele.animationWrapper.innerHeight();
            this._ele.canv[0].width = canWidth;
            this._ele.canv[0].height = canHeight;

            let diff = (new Date()).getTime() - this._anim.startTime;
            let circleRadius = 0;
            let rate = (Bezier.ease_in_out(diff/this._anim.powerOnPeriod)).y;

            if (this._style === "SWITCH") {
                if (diff < this._anim.powerOnPeriod) {
                    circleRadius = (this._anim.radialGradientSize * this._anim.radialGradientScale) * rate;
                } else {
                    circleRadius = this._anim.radialGradientSize * this._anim.radialGradientScale;
                }
            } else {
                if (this._wheelValue === undefined) {
                    circleRadius = 0;
                    this._anim.startTime = (new Date()).getTime(); // wait dimmer data.
                } else {
                    if (diff < this._anim.powerOnPeriod) {
                        circleRadius = (this._anim.radialGradientSize * this._getBrightnessFromValue(this._wheelValue)) * rate;
                    } else {
                        circleRadius = this._anim.radialGradientSize * this._getBrightnessFromValue(this._wheelValue);
                    }
                }
            }

            try {
                this._anim.circleSize = circleRadius;
                this.ctx.clearRect(0, 0, canWidth, canHeight);
                let grad = this.ctx.createRadialGradient(canWidth/2, 0, 0, canWidth/2, 0, circleRadius);
                grad.addColorStop(0, "rgba(165, 245, 221, 1)");
                grad.addColorStop(1, "rgba(54, 149, 221, 0)");

                this.ctx.fillStyle = grad;
                this.ctx.fillRect(0, 0, canWidth, canHeight);

            } catch(e) {
                LoggerI('draw canvas failed...', e);
            }

            if (diff < this._anim.powerOnPeriod && this._anim.power) {
                window.requestAnimationFrame(nextFrame);
            } else {
                callback();
            }
        }

        return nextFrame();
    }

    _animationPowerOff(callback) {
        this._anim.startTime = (new Date()).getTime();
        let nextFrame = () => {
            let canWidth = this._ele.animationWrapper.innerWidth();
            let canHeight = this._ele.animationWrapper.innerHeight();
            this._ele.canv[0].width = canWidth;
            this._ele.canv[0].height = canHeight;

            let diff = (new Date()).getTime() - this._anim.startTime;
            let rate = (Bezier.ease_in_out(diff/this._anim.powerOffPeriod)).y;

            try {
                this.ctx.clearRect(0, 0, canWidth, canHeight);
                if (0.99 < rate) {
                    rate = 1;
                }
                this.ctx.globalAlpha = 1 - rate;
                let grad = this.ctx.createRadialGradient(canWidth/2, 0, 0, canWidth/2, 0, this._anim.circleSize);
                grad.addColorStop(0, "rgba(165, 245, 221, 1)");
                grad.addColorStop(1, "rgba(54, 149, 221, 0)");

                this.ctx.fillStyle = grad;
                this.ctx.fillRect(0, 0, canWidth, canHeight);
            } catch(e) {
                LoggerI('draw canvas failed...', e);
            }

            if (diff < this._anim.powerOffPeriod) {
                window.requestAnimationFrame(nextFrame);
            } else {
                callback();
            }
        }

        return nextFrame();
    }

    _animationBounce(bounceDirection) {
        this._anim.startTime = (new Date()).getTime();
        console.log("bounceDirection=" + bounceDirection);
        if (bounceDirection !== undefined) {
            this._anim.bounceDirection = bounceDirection;
        }

        let nextFrame = () => {
            let canWidth = this._ele.animationWrapper.innerWidth();
            let canHeight = this._ele.animationWrapper.innerHeight();
            this._ele.canv[0].width = canWidth;
            this._ele.canv[0].height = canHeight;

            let diff = (new Date()).getTime() - this._anim.startTime;
            let rate = (Bezier.ease_in_out(diff/this._anim.bouncePeriod)).y;
            if (rate > 0.99) {
                rate = 1;
            }
            let circleRadius = this._anim.radialGradientSize * this._anim.radialGradientScale; // init value.
            let amplitude = circleRadius - this._anim.radialGradientSize;

            if (this._anim.bounceDirection) {  // bigger
                circleRadius = this._anim.radialGradientSize + (amplitude * rate);
            } else {    // smaller
                circleRadius = this._anim.radialGradientSize + amplitude - (amplitude*rate);
            }

            if (this._anim.bouncePeriod < diff) {
                this._anim.startTime = (new Date()).getTime();
                this._anim.bounceDirection = this._anim.bounceDirection ? false : true;
            }

            try {
                this._anim.circleSize = circleRadius;
                this.ctx.clearRect(0, 0, canWidth, canHeight);
                let grad = this.ctx.createRadialGradient(canWidth/2, 0, 0, canWidth/2, 0, circleRadius);
                grad.addColorStop(0, "rgba(165, 245, 221, 1)");
                grad.addColorStop(1, "rgba(54, 149, 221, 0)");

                this.ctx.fillStyle = grad;
                this.ctx.fillRect(0, 0, canWidth, canHeight);

            } catch(e) {
                LoggerI('draw canvas failed...', e);
            }

            if (this._anim.power)
                window.requestAnimationFrame(nextFrame);
        }

        return nextFrame();
    }

    _animationDimmer() {
        this._anim.circleSizeGap = 0;
        this._anim.nextCircleSize = this._anim.circleSize;
        let nextFrame = () => {
            let circleRadius = undefined;
            const newCircleSize = this._anim.radialGradientSize * this._getBrightnessFromValue(this._wheelValue);
            if (Math.floor(this._anim.nextCircleSize) !== Math.floor(newCircleSize)) {
                this._anim.startTime = (new Date()).getTime();
                this._anim.nextCircleSize = newCircleSize;
                this._anim.circleSizeGap = this._anim.nextCircleSize - this._anim.circleSize;
                this._anim.tmpCircleSize = this._anim.circleSize;
            }

            if (this._anim.circleSizeGap !== 0) {
                let diff = (new Date()).getTime() - this._anim.startTime;
                let rate = 0;
                if (diff < this._anim.dimmerPeriod) {
                    rate = (Bezier.ease_in_out(diff/this._anim.dimmerPeriod)).y;
                    circleRadius = this._anim.tmpCircleSize + (this._anim.circleSizeGap * rate);
                } else {
                    rate = 1;
                    this._anim.circleSizeGap = 0;
                    circleRadius = newCircleSize;
                }

            } else {
                circleRadius = newCircleSize;
            }

            let canWidth = this._ele.animationWrapper.innerWidth();
            let canHeight = this._ele.animationWrapper.innerHeight();
            this._ele.canv[0].width = canWidth;
            this._ele.canv[0].height = canHeight;

            try {
                this._anim.circleSize = circleRadius;
                this.ctx.clearRect(0, 0, canWidth, canHeight);
                let grad = this.ctx.createRadialGradient(canWidth/2, 0, 0, canWidth/2, 0, circleRadius);
                grad.addColorStop(0, "rgba(165, 245, 221, 1)");
                grad.addColorStop(1, "rgba(54, 149, 221, 0)");

                this.ctx.fillStyle = grad;
                this.ctx.fillRect(0, 0, canWidth, canHeight);
            } catch(e) {
                LoggerI('draw canvas failed...', e);
            }

            if (this._anim.power)
                window.requestAnimationFrame(nextFrame);
        };

        return nextFrame();
    }

    _runPowerAnimation(_power_) {
        console.log("runPowerAnimation=" + _power_);
        if (_power_ === "on") {
            if (!this._anim.power) {
                this._anim.power = true;
                window.requestAnimationFrame(this._animationPowerOn.bind(this, () => {
                    if (this._style === "SWITCH" && this._anim.power) {
                        window.requestAnimationFrame(this._animationBounce.bind(this, false)); //bounce
                    } else {
                        window.requestAnimationFrame(this._animationDimmer.bind(this)); //dimmer
                    }
                }));
            }
        } else if (_power_ === "off") {
            if (this._anim.power === true) {
                this._anim.power = false;
                window.requestAnimationFrame(this._animationPowerOff.bind(this, () => {
                    console.log("power off animation done.")
                }));
            }
        }
    }
}

class MultiButtonCard extends Card {
    constructor(id, {parent, title, style, buttons} = {}) {
        super(id, {title});
        this._class = 'SwitchWheelCard';
        this._parent = parent;
        this._eventList = {
        };
        this._ele = {};

        this._style = style;
        this._buttons = buttons;
        this._buttonItems =[];
    }

    init() {
        super.init();
        Dom.build(c => {
            this._ele.animationWrapper = $(c.div({className: 'iot_Card__animation-wrapper'}));

            this._ele.buttonSection = $(c.div({className: 'iot_Card__section wrapper'},
                this._ele.buttonWrapper = $(c.div({className: 'ux2-card-multi-button'}))
            ));
            if (this._style && _isString(this._style) && this._style !== "") {
                this._ele.buttonWrapper.addClass(this._style)
            }
        });

        if (this._ele.animationWrapper) {
            this.contents.append(this._ele.animationWrapper);
        }

        if (this._buttons) {
            this.appendButtons(this._buttons);
        }

        this.contents.append(this._ele.emptySection);
        this.contents.append(this._ele.buttonSection);
        this._parent.append(this.container);
    }

    appendButtons(buttons) {
        for (const button of buttons) {
            this.appendButton(button);
        }
    }

    appendButton({id, icon, iconColor, description, size, noBorder, color, clickFunc} = {}) {
        let buttonElement = {};
        const item = $(Dom.div({id, className: 'ux2-card-multi-button__item' }));
        this._ele.buttonWrapper.append(item);

        buttonElement["id"] = id;
        item.attr('role', 'button');
        const button = $(Dom.div({ className: 'ux2-card-multi-button__item__button round-button'}));
        buttonElement["button"] = button;
        if (size) {
            button.css("width", button);
            button.css("height", button);
        }
        if (this._style && _isString(this._style) && this._style !== "") {
            button.addClass(this._style);
        }

        if (!noBorder) {
            button.addClass("gray_border");
        }

        if (color) {
            button.css("background", color);
        }

        if (icon) {
            //buttonElement["icon"] = $(Dom.img({id, src: icon}));
            let maskColor = iconColor ? iconColor : "#717171";
            buttonElement["icon"] = addColorMaskImage(button, icon, maskColor);
            button.append(buttonElement["icon"]);
        }

        item.append(button);
        buttonElement["wrapper"] = item;

        if (description) {
            if (this.contents.hasClass('no-description')) {
                item.attr('aria-label', description);
            } else {
                const text = $(Dom.div({ className: 'ux2-card-multi-button__item__text' },
                    Dom.div({}, description)));
                    if (this._style && _isString(this._style) && this._style !== "") {
                        text.addClass(this._style);
                    }
                item.append(text);
            }
        }

        if (_isFunction(clickFunc)) {
            button.on('click', () => {
                    clickFunc(buttonElement);
            });
        }

        this._ele.buttonWrapper.append(item);
        this._buttonItems.push(buttonElement);
        this._ele.buttonWrapper.attr("data-item-count",this._buttonItems.length);
    }
}

class WindowShadeCard extends MultiButtonCard {
    constructor(id, {parent, title, modes} = {}) {
        super(id, {parent, title, style:"window_shade"});
        this._class = 'WindowShadeCard';
        this._state = 'closed'; // open, pause, closed
        this._modes = modes;
        this._prevSelectedButton = undefined;

        //gui
        this._iconColor = "#fafafa";
        this._iconSelectedColor = "#3695dd";

        //animation
        this._animationDuration = 6000;
        this._animationRunning = false;
        this._animationStartTimming = 0;
        this._animationRemainTimming = 0;
        this._tOpenAnimationHandle = undefined;
        this._tCloseAnimationHandle = undefined;
        this._pauseFlag = false;
        // !important : The 'translateY' values must be for the 'pause animation' to operate normally.
        /*
        this._animationDistance = {"blade_1":-37, "blade_2":-46, "blade_3":-55,
                                    "blade_4":-64, "blade_5":-73, "blade_6":-82, "blade_7":-88};
        */
        this._animationDistance = {"blade_1":-40, "blade_2":-40, "blade_3":-40,
                                    "blade_4":-40, "blade_5":-40, "blade_6":-40, "blade_7":-40};
    }

    init() {
        super.init();
        this.card.addClass("overflowHidden");
        this.contents.addClass('full_width');
        if (this._ele.animationWrapper) {
            this._ele.animationWrapper.append(Dom.div({className:'iot_WindowShadeCard__shade_top'}));
            this._ele.shade = $(Dom.div({className: 'iot_WindowShadeCard__shade'},
                Dom.div({id:"blade_1", className:'iot_WindowShadeCard__blade'}),
                Dom.div({id:"blade_2", className:'iot_WindowShadeCard__blade'}),
                Dom.div({id:"blade_3", className:'iot_WindowShadeCard__blade'}),
                Dom.div({id:"blade_4", className:'iot_WindowShadeCard__blade'}),
                Dom.div({id:"blade_5", className:'iot_WindowShadeCard__blade'}),
                Dom.div({id:"blade_6", className:'iot_WindowShadeCard__blade'}),
                Dom.div({id:"blade_7", className:'iot_WindowShadeCard__blade'})
            ));
            this._ele.animationWrapper.append(this._ele.shade);
        }
        this.setBackground('linear-gradient(0deg, #198CE4, #87DDF6)');

        if (this.contents) {
            this.contents.css("width", "100%");
        }

        if (this._ele.buttonWrapper) {
            this._ele.emptySection = $(Dom.div({className: 'iot_Card__section wrapper'}));
            this._ele.emptySection.css("height","200px");
            this._ele.emptySection.insertAfter(this._ele.animationWrapper);
        }

        let buttons = [];
        for (const mode of this._modes) {
            let iconName = mode.id;
            if (mode.id === "closed") {
                iconName = "close";
            }
            buttons.push({id: mode.id, icon:"./res/png/device/WindowShade/device_window_ic_" + iconName + "_off.png",
                description:mode.label, noBorder: true, color:"#76C3F1", iconColor: "#fafafa", clickFunc:this._onButtonClick.bind(this)});
        }

        //this._buttons = buttons;
        this.appendButtons(buttons);
    }

    get state() {
        return this._state;
    }

    open() {
        this._stopAnimation();
        this._buttonDeactive();
        this._state = "open";
        this._ele.shade.addClass("opened");
        $(".iot_WindowShadeCard__blade").css("transform", "");
    }

    closed() {
        this._stopAnimation();
        this._buttonDeactive();
        this._state = "closed";
        this._ele.shade.removeClass("opened");
        $(".iot_WindowShadeCard__blade").css("transform", "");
    }

    pause() {
        this._pauseFlag = true;
        this._pauseAnimation();
        this._buttonDeactive();
    }

    partiallyOpen() {
        if (this._tCloseAnimationHandle || this._tOpenAnimationHandle) {
            LoggerI("ignore partially open while open animation.")
            return;
        }

        this._stopAnimation();
        this._state = "partially open";
        this._buttonDeactive();
        // move blade to center.
        const rate = 0.5;
        for( let idx = 1; idx <= 8; idx++) {
            $("#blade_" + idx).css("transform", "translateY(" + this._animationDistance['blade_' + idx]*rate + "px)");
        }
    }

    _changeState(_state_) {
        this._state = _state_;

        //button color
        for (const button of this._buttonItems) {
            if (button) {
                setMaskColor(button["icon"], this._iconColor);
                button["button"].removeClass("button_selected_color");
            }

            if (button['id'] === this._state) {
                if (button['id'] === "open" || button['id'] === "closed") {
                    setMaskColor(button["icon"], this._iconColor);
                } else {
                    setMaskColor(button["icon"], this._iconSelectedColor);
                }
                button["button"].addClass("button_selected_color");
            }
        }
    }

    _buttonDeactive() {
        if (this.openButtonBarrier) {
            this.openButtonBarrier.deactivate();
        }

        if (this.closeButtonBarrier) {
            this.closeButtonBarrier.deactivate();
        }

        for (const button of this._buttonItems) {
            if (button) {
                button["button"].removeClass("button_selected_color");
                setMaskColor(button["icon"], this._iconColor);
            }
        }
    }

    _onButtonClick(_button_) {
        if (_button_) {
            console.log("this._state=" + this._state);
            console.log("_button_['id']" + _button_["id"]);
            if (_button_["button"] && _button_["id"] && this._state !== _button_["id"]) {
                console.log("button Click:" + _button_["id"]);

                this._buttonDeactive();
                if (_button_["id"] === "open") {
                    this._stopAnimation();
                    this._runOpenAnimation();

                    if (!this.openButtonBarrier) {
                        this.openButtonBarrier = new Barrier(_button_["button"], {loaderStyle:"dotLoader", loaderSize:"3px"});
                    }
                    this.openButtonBarrier.activate(true, {transparent:true});
                    this._pauseFlag = false;
                } else if (_button_["id"] === "pause") {
                    if (this._tCloseAnimationHandle || this._tOpenAnimationHandle) {
                        this._pauseAnimation();
                    }
                    this._pauseFlag = true;
                } else if (_button_["id"] === "closed") {
                    this._stopAnimation();
                    this._runCloseAnimation();

                    if (!this.closeButtonBarrier) {
                        this.closeButtonBarrier = new Barrier(_button_["button"], {loaderStyle:"dotLoader", loaderSize:"3px"});
                    }
                    this.closeButtonBarrier.activate(true, {transparent:true});
                    this._pauseFlag = false;
                }

                this._changeState(_button_["id"]);
            }
        }

        for (const mode of this._modes) {
            if (mode && mode.id === _button_["id"]) {
                if (_isFunction(mode.func)) {
                    mode.func();
                }
            }
        }
    }

    _stopAnimation() {
        this._ele.shade.removeClass("shade_open");
        clearInterval(this._tOpenAnimationHandle);
        this._tOpenAnimationHandle = 0;

        this._ele.shade.removeClass("shade_close");
        clearInterval(this._tCloseAnimationHandle);
        this._tCloseAnimationHandle = 0;
    }

    _pauseAnimation() {
        //save current position.
        if (!this._animationStartTimming) {
            this._animationStartTimming = Date.now();
        }
        let timeDiff = Date.now() - this._animationStartTimming;
        //console.log("timeDiff=" + timeDiff);
        this._animationRemainTimming = (this._animationDuration - timeDiff)/1000;
        const rate = timeDiff/this._animationDuration;

        //console.log("reat=" + rate);
        //console.log("_animationRemainTimming=" + this._animationRemainTimming);

        for( let idx = 1; idx <= 8; idx++) {
            if (this._tOpenAnimationHandle) {
                $("#blade_" + idx).css("transform", "translateY(" + this._animationDistance['blade_' + idx]*rate + "px)");
            } else if (this._tCloseAnimationHandle) {
                $("#blade_" + idx).css("transform", "translateY(" + this._animationDistance['blade_' + idx]*(1 - rate) + "px)");
            }
        }

        this._stopAnimation();
    }

    _runOpenAnimation() {
        //reset pause
        if (this._pauseFlag) {
            $(".iot_WindowShadeCard__blade").css("transform", "");
            $(".iot_WindowShadeCard__blade").css("transition-duration", this._animationRemainTimming + "s");
            this._ele.shade.addClass("shade_open");
            this._tOpenAnimationHandle = setInterval(() => {
                $(".iot_WindowShadeCard__blade").css("transition-duration", ''); // reset
                this._ele.shade.removeClass("shade_open")
                setTimeout(() => {
                    this._runOpenAnimation();
                }, 100);
                clearInterval(this._tOpenAnimationHandle);
                this._tOpenAnimationHandle = 0;
            }, this._animationRemainTimming * 1000);
            this._animationStartTimming = Date.now() - (this._animationDuration - (this._animationRemainTimming * 1000));
            return;
        }

        if (!this._ele.shade.hasClass("shade_open")) {
            this._ele.shade.addClass("shade_open");
            this._animationStartTimming = Date.now();
        }

        if (this._tOpenAnimationHandle) {
            clearInterval(this._tOpenAnimationHandle);
            this._tOpenAnimationHandle = 0;
        }

        this._tOpenAnimationHandle = setInterval( () => {
            this._ele.shade.removeClass("shade_open");

            setTimeout(() => {
                this._ele.shade.addClass("shade_open");
                this._animationStartTimming = Date.now();
            }, 100);
        }, this._animationDuration);
    }

    _runCloseAnimation() {
        if (this._pauseFlag) {
            $(".iot_WindowShadeCard__blade").css("transform", "");
            $(".iot_WindowShadeCard__blade").css("transition-duration", this._animationRemainTimming + "s");
            this._ele.shade.addClass("shade_close");
            this._tCloseAnimationHandle = setInterval(() => {
                $(".iot_WindowShadeCard__blade").css("transition-duration", ''); // reset
                this._ele.shade.removeClass("shade_close")
                setTimeout(() => {
                    this._runCloseAnimation();
                }, 100);
                clearInterval(this._tCloseAnimationHandle);
                this._tCloseAnimationHandle = 0;
            }, this._animationRemainTimming * 1000);
            this._animationStartTimming = Date.now() - (this._animationDuration - (this._animationRemainTimming * 1000));
            return;
        }

        if (!this._ele.shade.hasClass("shade_close")) {
            this._ele.shade.addClass("opened");
            setTimeout(() => {
                this._ele.shade.removeClass("opened");
                this._ele.shade.addClass("shade_close");
                this._animationStartTimming = Date.now();
            }, 100);
        }

        if (this._tCloseAnimationHandle) {
            clearInterval(this._tCloseAnimationHandle);
            this._tCloseAnimationHandle = 0;
        }

        this._tCloseAnimationHandle = setInterval( () => {
            this._ele.shade.removeClass("shade_close");
            this._ele.shade.addClass("opened"); //reset blade position.

            setTimeout(() => {
                this._ele.shade.removeClass("opened");
                this._ele.shade.addClass("shade_close");
                this._animationStartTimming = Date.now();
            }, 100);

        }, this._animationDuration);
    }
}

/*
 * Button Card
 * View Card with One button in the center
 */
class ButtonCard extends CapabilityCard {
    constructor(id, {parent, title, bgColor, label } = {}) {
        super(id, {parent, title, bgColor});

        this._class = 'ButtonCard';
        this._title = title;
        this._ele._button = undefined;
        this._label = label;

        this._attr = {
            button: undefined
        }

        this._eventList = {
            on: function () { },
            off: function () { }
        };

        this.maskColor = {
            selected: '#3695DD',
            normal: '#505050'
        }

        this._onBGColor = "#3695DD";
        this._offBGColor = "#E5E5E5";
        if (bgColor) {
            this._onBGColor = bgColor;
        }

        this._animationStyle = undefined;
        this._animationStyleAddon = undefined;
    }

    init() {
        super.init();

        Dom.build(c => {
            this._ele._buttonwrapper = $(c.div({ className: 'iot_buttonCard buttonWrapper' },
                this._ele._button = $(c.div({ className: 'iot_buttonCard button', 'role':'button'},
                    this._ele._powerButton = $(c.div({ className: 'iot_buttonCard button' })),
                    this._ele._button_border = $(c.div({ className: 'iot_buttonCard button gray_border' }))

                ))
            ));
            this._ele._text_wrapper = $(c.div({ className: 'iot_buttonCard text_wrapper' },
                this._ele._text_on = $(c.div({ className: 'iot_buttonCard text on roboto-light', innerText: C_('ON') })),
                this._ele._text_off = $(c.div({ className: 'iot_buttonCard text off layered roboto-light', innerText: C_('OFF') }))
            ));

            this.contents.append(this._ele._buttonwrapper);
            this.contents.append(this._ele._text_wrapper);
            this._ele._button.setRipple('circle');
        });
        // TODO: Remove Following. It's used at Elevator Card.
        this.card.addClass('iot_buttonCard_card');

        appendSvg(this._ele._powerButton, 'device_ic_control', {attr:{'aria-hidden':'true'}});
        this.button.on('click', this._onClickButton.bind(this));
        this._ele._buttonPendingWrapper = new Barrier(this._ele._button, { loaderSize: "small" });

        if (this._animationStyle === "light_background_animation") {
            if (isItIOS()) {
                appendBorderRadiusClipPathSvg($(document.body));
                this.card.append(Dom.div({className:'iot_borderRadius__cover TopLeft'}));
                this.card.append(Dom.div({className:'iot_borderRadius__cover TopRight'}));
                this.card.append(Dom.div({className:'iot_borderRadius__cover BottomLeft'}));
                this.card.append(Dom.div({className:'iot_borderRadius__cover BottomRight'}));

                if (this._ele._card_animation) {
                    this._ele._card_animation.addClass("ios");
                }
            }
        }

        //VA
        this._ele._button.attr("role", "button");
        this._ele._button.attr("aria-label", this._label);
        this.resize(10);

        this._screen._text_width = (this._screen.current_width - this._ele._text_wrapper.width());
    }

    setEvent(_type_, _func_) {
		this._eventList[_type_] = _func_;
    }

    _setText(_ele_, _txt_) {
        let area_margin = 5;    // Margin Value for the area to reduce the font size

        _ele_.text(_txt_);
        if (getHTMLElementFromJQuery(_ele_).scrollWidth > this._screen.current_width - this._screen._text_width + area_margin) {
            _ele_.addClass('longtext');
        } else if (_ele_.hasClass('longtext')) {
            _ele_.removeClass('longtext');
        }
    }

    _onClickButton() {
        this._ele._buttonPendingWrapper.activate(true, { transparent: true });
        this.noEventDuringProcessing(true);
        // ON -> OFF
        if (this._attr.button === "on") {
            console.log("[ButtonCard] Turn OFF");
            this.setOff();
            if(this._eventList.off) {
                this._eventList.off();
            }
        }
        // Off -> ON
        else  if (this._attr.button === "off") {
            console.log("[ButtonCard] Turn ON");
            this.setOn();
            if(this._eventList.on) {
                this._eventList.on();
            }
        }

        if (this._ele._powerButton) {
            this._ele._powerButton.hide();
        }
    }

    setOn(_type_ = 'light') {
        if (_type_ == 'light') {
            this.setBgColor(this._onBGColor);
            if (this._ele._buttonPendingWrapper && !this._ele._buttonPendingWrapper.isActivate()) {
                this.callBgAnimation();
            }
        }

        // For the First Loading Case, animation would not run.
        if (this._attr.button == undefined) {
            this._ele._button_border.hide();
            this._ele._text_on.show();
            this._ele._text_off.hide();
            // this.callBgAnimation();
        } else {
            this._ele._button_border.fadeOut(300);
            this._ele._text_off.fadeOut(500);
            this._ele._text_on.delay(160).fadeIn(400);
        }

        if (this._ele._powerButton) {
            this._ele._powerButton.show();
            setSvg(this._ele._powerButton, 'device_ic_control', { color: this.maskColor.selected });
        }
    }

    setOff(_type_ = 'light') {
        // Close Opened Menu when the device is set to off.
        //HNView.pageCtrl.closeTopDlg();
        if (this._objDlg && this._objDlg.isVisible()) {
            this._objDlg.hide();
        }

        this.card[0].style = "";
        this.setBgColor(this._offBGColor);

        // For the First Loading Case, animation would not run.
        if (this._attr.button == undefined) {
            this._ele._button_border.show();
            this._ele._text_off.show();
            this._ele._text_on.hide();
        } else {
            this._ele._button_border.fadeIn(300);
            this._ele._text_on.fadeOut(400);
            this._ele._text_off.fadeIn(500);
        }

        if (this._ele._powerButton) {
            this._ele._powerButton.show();
            setSvg(this._ele._powerButton, 'device_ic_control', { color: this.maskColor.normal });
        }
        if (_type_ == 'light') {
            this.setBgAnimation();
        };
    }

    async on(_type_ = 'light') {
        LoggerI("[ButtonCard] : ON");
        this._ele._buttonPendingWrapper.deactivate();
        this.noEventDuringProcessing(false);
        this.setOn();
        this._attr.button = "on";

        // VA
        this._ele._button.attr('aria-pressed', 'true');
    }

    async off() {
        LoggerI("[ButtonCard] : OFF");
        this._ele._buttonPendingWrapper.deactivate();
        this.noEventDuringProcessing(false);
        this.setOff();
        this._attr.button = "off";

        // VA
        this._ele._button.attr('aria-pressed', 'false');
    }


    setButtonBG(_path_) {
        this._ele._button.css('background-image', "url(" +_path_ +")");
    }

    callBgAnimation() {
        if (this._animationStyle) {
            this.setBgAnimation(this._animationStyle);
            if (this._animationStyleAddon) {
                this._ele._card_animation.on("animationend", ()=> {
                    this.setBgAnimation(this._animationStyleAddon);
                });
            }
        }
    }

    get textDiv() {
        return this._ele._text;
    }

    setTextColor(color) {
        if (color) {
            this._ele._text.css('color', color);
        }
    }

    get button() {
        return this._ele._button;
    }

    get buttonwrapper() {
        return this._ele._buttonwrapper;
    }
}

class LightButtonCard extends ButtonCard {
    constructor(id, { parent, title, bgColor, label } = {}) {
        super(id, { parent, title, bgColor });

        this._class = 'Light';
        this._label = label;

        this._animationStyle = 'light_background_animation';
        this._animationStyleAddon = 'light_background_animation bounce';
    }

    init() {
        super.init();
        this.card.addClass('overflowHidden');
        this.card.addClass('bg_transition');
    }
}

class ValveCard extends ButtonCard {
    constructor(id, { parent, title, bgColor, label, valveStatusText, open, close, drawing_valve } = {}) {
        super(id, { parent, title, bgColor });

        this._class = 'Valve';
        this._title = title;
        this._ele._button = undefined;
        this._label = label;

        if (valveStatusText && valveStatusText.hasOwnProperty("open")) {
            this.VALVE_OPEN_TEXT = valveStatusText.open;
        } else {
            this.VALVE_OPEN_TEXT = C_('GASVALVE_OPEN');
        }

        if (valveStatusText && valveStatusText.hasOwnProperty("close")) {
            this.VALVE_CLOSE_TEXT = valveStatusText.close;
        } else {
            this.VALVE_CLOSE_TEXT = C_('GASVALVE_CLOSE');
        }

        this._controllable = {
            open: open || false,
            close: close || false
        }

        // If the valve is uncontrollable, the valve will not be drawn and shos text only.
        // Even if drawing_valve is false, the valve will be drawn if it can be operated.
        this._drawing_valve =
            (this._controllable.open || this._controllable.close) || drawing_valve || false;

        this._eventList = {
            on: function () { },
            off: function () { }
        };

        this._onAnimation = false;

        this._animationStyle = 'iot_gas_valve background_animation';
    }

    init() {
        super.init();
        this.card.addClass('overflowHidden');
        this._ele._powerButton.remove();
        this.button.off('click');
        this.button.on('click', this._onClickValve.bind(this));
        this.button.addClass('valve_wrapper');

        this._ele._buttonOn = $(Dom.div( { className: 'iot_buttonCard layeredButton' } ));
        this._ele._buttonOff = $(Dom.div( { className: 'iot_buttonCard layeredButton' } ));
        appendSvg(this._ele._buttonOn, 'device_valve_btn_on', {attr:{'aria-hidden':'true'}});
        appendSvg(this._ele._buttonOff, 'device_valve_btn_off', {attr:{'aria-hidden':'true'}});

        this.button.append(this._ele._buttonOn);
        this.button.append(this._ele._buttonOff);
        this._ele._button_border.addClass('hide');

        this._ele._text = $(Dom.div({ className: 'iot_buttonCard text on roboto-light' }));
        this._ele._text_on.remove();
        this._ele._text_off.remove();
        this._ele._text_wrapper.append(this._ele._text);

        if (!this._drawing_valve) {
            this._ele._buttonwrapper.remove();
            this._ele._text_wrapper.addClass("uncontrollable");
        }

        // VA
        this.button.attr('aria-label', C_('GASVALVE_NAME'));
    }

    _onClickValve() {
        if (!this._drawing_valve) {
            toastPopup.showToast(C_("GASVALVE_CONTROL_DENY"));
        }
        // Valve ON -> OFF or Keep On
        if (this._attr.button) {
            if (this._controllable.close) {
                this._ele._buttonPendingWrapper.activate(true, { transparent: true });
                this._attr.button = false;
                this._closeAnimation();
                if(this._eventList.off) {
                    this._eventList.off();
                }
            } else {
                if (this.button.hasClass('iot_gas_valve opening')) {
                    LoggerI("[Valve] The click event is ignored, because animation is running.")
                    return;
                }
                LoggerI("[Valve] Valve is opened, Run knob bounce animation.!");
                promiseAnimationEnd(this.button, 'iot_gas_valve opened_bouncing')
                    .then( () =>
                        {
                            this.button.removeClass('iot_gas_valve opened_bouncing');
                        });
            }
        }
        // Valve Off -> ON or Keep Off
        else {
            if (this._controllable.open) {
                this._ele._buttonPendingWrapper.activate(true, { transparent: true });
                this._attr.button = true;
                this._openAnimation();
                if (this._eventList.on) {
                    this._eventList.on();
                }
            } else {
                if (this.button.hasClass('iot_gas_valve closing')) {
                    LoggerI("[Valve] The click event is ignored, because animation is running.")
                    return;
                }
                LoggerI("[Valve] Valve is closed, Run knob bounce animation.!");
                promiseAnimationEnd(this.button, 'iot_gas_valve closed_bouncing')
                    .then( () =>
                        {
                            this.button.removeClass('iot_gas_valve closed_bouncing');
                            this.button.addClass('iot_gas_valve closed');
                        });
            }
        }
    }

    _closeAnimation( {valveOnly} = {} ) {
        if (valveOnly == undefined || valveOnly == false) {
            if (this._onAnimation) {
                LoggerW("[Valve] Ignore animation request. Check again after animation done.");
                return;
            }
            LoggerD("[Valve] Start Close Animation");
            this._onAnimation = true;
            var valve_promise = new Promise((resolve, reject) => {
                if (!this.button.hasClass('closed') && this._drawing_valve) {
                    this._ele._buttonOff.fadeIn( 1800 );
                    promiseAnimationEnd(this.button, 'iot_gas_valve closing')
                    .then(() => {
                        this.button.removeClass('iot_gas_valve closing');
                        this.button.addClass('iot_gas_valve closed');
                        resolve();
                    });
                } else {
                    resolve();
                }
            });

            if (!this.card.hasClass('iot_gas_valve change_background')) {
                this.card.addClass('iot_gas_valve change_background');
            }

            var text_promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.card[0].style = "";
                    this.setBgColor(this._offBGColor);
                    this._ele._text.removeClass("on");
                    this._ele._text.addClass("off");
                    this.changeText( this._ele._buttonPendingWrapper.isActivate() ? C_('PROCESSING') : this.VALVE_CLOSE_TEXT)
                        .then(resolve());
                }, 860);
            });

            var gradation_promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    promiseAnimationEnd(this._ele._card_animation, 'gradation_smaller')
                        .then(() => this.setBgAnimation())
                        .then(() => resolve());
                }, 160);
            });

            Promise.all([valve_promise, text_promise, gradation_promise]).then(() => {
                LoggerD("[Valve] End Close Animation");
                this._onAnimation = false;
                if (this._attr.button) {
                    LoggerW("[Valve] Open again during closing animation (" + this._attr.button + ")");
                    this._openAnimation();
                }
            });
        } else {
            this.button.addClass('iot_gas_valve closed');
        }
    }

    _openAnimation ( animation = true ) {
        if (animation == undefined || animation == true) {
            if (this._onAnimation) {
                LoggerW("[Valve] Ignore animation request. Check again after animation done.");
                return;
            }
            LoggerD("[Valve] Start Open Animation");
            this._onAnimation = true;
            var valve_promise = new Promise((resolve, reject) => {
                if (this.button.hasClass('closed') && this._drawing_valve) {
                    this._ele._buttonOff.fadeOut( 1800 );
                    promiseAnimationEnd(this.button, 'iot_gas_valve opening')
                    .then(() => {
                        this.button.removeClass('iot_gas_valve opening');
                        this.button.removeClass('iot_gas_valve closed');
                        resolve();
                    });
                } else {
                    resolve();
                }
            });

            if (!this.card.hasClass('iot_gas_valve change_background')) {
                this.card.addClass('iot_gas_valve change_background');
            }

            var text_promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.setBgColor(this._onBGColor);
                    this._ele._text.removeClass("off");
                    this._ele._text.addClass("on");
                    this.changeText( this._ele._buttonPendingWrapper.isActivate() ? C_('PROCESSING') : this.VALVE_OPEN_TEXT)
                        .then(resolve());
                }, 860);
            });

            var gradation_promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.callBgAnimation();
                    promiseAnimationEnd(this._ele._card_animation, 'gradation_bigger')
                        .then(() => resolve());
                }, 160);
            });

            Promise.all([valve_promise, text_promise, gradation_promise]).then(() => {
                LoggerD("[Valve] End Open Animation");
                this._onAnimation = false;
                if (!this._attr.button) {
                    LoggerW("[Valve] Close again during Opening animation (" + this._attr.button + ")");
                    this._closeAnimation();
                }
            });
        } else {
            this.button.removeClass('iot_gas_valve closed');
            this.callBgAnimation();
            promiseAnimationEnd(this._ele._card_animation, 'gradation_bigger');
        }
    }

    changeText(_txt_) {
        return new Promise((resolve, reject) => {
            if (this._ele._text.text() === _txt_) {
                resolve();
            }
            if (!this._ele._text.hasClass('text_fade_out')) {
                promiseAnimationEnd(this._ele._text, 'iot_gas_valve text_fade_out_animation')
                .then(() => this._ele._text.addClass('iot_gas_valve text_fade_out'))
                .then(() => this._setText(this._ele._text, _txt_))
                .then(() => promiseAnimationEnd(this._ele._text, 'iot_gas_valve text_fade_in_animation'))
                .then(() => this._ele._text.removeClass('iot_gas_valve text_fade_out'))
                .then(() => resolve());
            } else {
                this._setText(this._ele._text, _txt_);
                resolve();
            }
        });
    }

    async on() {
        LoggerI("[Valve] : ON");
        if (this._attr.button == undefined) {
            // For the First Loading
            this.setBgColor(this._onBGColor);
            this._ele._text.addClass("on");
            this._setText(this._ele._text, this.VALVE_OPEN_TEXT);
            this._openAnimation(false);
            this._ele._buttonOff.hide();
        } else if (this._attr.button === true) {
            LoggerD("[Valve] Already On");
        } else if (this._ele._text.hasClass("off")) {
            // For the Update Case without Valve Click
            LoggerD("[Valve] update without Click")
            this._openAnimation();
        }
        this._attr.button = true;
        if (this._ele._buttonPendingWrapper.isActivate()) {
            this._ele._buttonPendingWrapper.deactivate();
            this.changeText(this.VALVE_OPEN_TEXT);
        }

        // VA
        this._ele._button.attr('aria-pressed','true');
    }

    async off() {
        LoggerI("[Valve] : OFF");
        if (this._attr.button == undefined) {
            // For the First Loading
            this.card[0].style = "";
            this.setBgColor(this._offBGColor);
            this._ele._text.addClass("off");
            this._setText(this._ele._text, this.VALVE_CLOSE_TEXT);
            this._closeAnimation( { valveOnly: true });
        } else if (this._attr.button === false) {
            LoggerD("[Valve] Already Off");
        } else if (this._ele._text.hasClass("on")) {
            // For the Update Case without Valve Click
            LoggerD("[Valve] Update without Click");
            this._closeAnimation();
        }
        this._attr.button = false;
        if (this._ele._buttonPendingWrapper.isActivate()) {
            this._ele._buttonPendingWrapper.deactivate();
            this.changeText(this.VALVE_CLOSE_TEXT);
        }

        // VA
        this._ele._button.attr('aria-pressed','false');
    }
}

class DoorLockCard extends ButtonCard {
    constructor(id, { parent, title, bgColor, label, lockSupport, lockStatusText } = {}) {
        super(id, { parent, title, bgColor });

        this._class = 'DoorLock';
        this._title = title;
        this._ele._button = undefined;
        this._label = label;
        this._lockSupport = lockSupport || false;

        if (lockStatusText && lockStatusText.hasOwnProperty("lock")) {
            this.SMARTLOCK_LOCK_TEXT = lockStatusText.lock;
        } else {
            this.SMARTLOCK_LOCK_TEXT = C_('SMARTLOCK_LOCK');
        }

        if (lockStatusText && lockStatusText.hasOwnProperty("unlock")) {
            this.SMARTLOCK_UNLOCK_TEXT = lockStatusText.unlock;
        } else {
            this.SMARTLOCK_UNLOCK_TEXT = C_('SMARTLOCK_UNLOCK');
        }

        this._eventList = {
            unlock: function () { },
            lock: function () { }
        };

        this.image = {};
        this._needsAnimation = false;
        this._animationStyle = 'door_lock_background_animation';

        this._anim = {};
        this._anim.lockPeriod = 2930;
        this._anim.frameStep = 24; // zero-base
    }

    init() {
        super.init();
        this.card.addClass('overflowHidden');
        Dom.build(c => {
            this._ele._animationWrapper = $(c.div( { className: 'iot_Card__door_animation-wrapper' },
                this._ele.doorLeftWingWrapper = $(c.div( { className: 'iot_Card__door-left_wrapper' },
                    this._ele._doorLeftSpacer = $(c.div( { className: 'iot_Card__door-left_spacer' })),
                    this._ele._doorLeftWing = $(c.div({className: 'iot_Card__door-left_wing'}))
                )),
                this._ele.doorRightWingWrapper = $(c.div( { className: 'iot_Card__door-right_wrapper' },
                    this._ele._doorRightWing = $(c.div( { className: 'iot_Card__door-right_wing' })),
                    this._ele._doorRightSpacer = $(c.div( { className: 'iot_Card__door-right_spacer' }))
                ))
            ));

            this._ele._card_animation.append( this._ele._animationWrapper);
            this._ele._lockIconWrapper = $(c.div( { className: 'iot_lockIcon__wrapper' },
                this._ele.canv = $(c.canvas({className: 'iot_lockIcon_canv'}))
            ));
            this._ele._button.append(this._ele._lockIconWrapper);
            this._ele._powerButton.remove();

            this.ctx = this._ele.canv[0].getContext('2d');
        });

        this._setText(this._ele._text_on, this.SMARTLOCK_LOCK_TEXT);
        this._setText(this._ele._text_off, this.SMARTLOCK_UNLOCK_TEXT);
        this._ele._text_off.removeClass('off');
        this._ele._text_off.addClass('on');
        this._ele._button_border.remove();

        let cardWidth =  this._ele._card_animation.width();
        let cardHalfXPos = cardWidth/2;

        let leftWingWrapper = cardHalfXPos + 166 + 1; // 166 is animation start poistion, 1 is animation margin.
        this._ele.doorLeftWingWrapper.width(leftWingWrapper + 'px'); // 10px is animation margin.
        this._ele._doorLeftSpacer.width(leftWingWrapper - this._ele._doorLeftWing.width() + 'px');

        let rightWingWrapper = cardWidth - cardHalfXPos - 166 + this._ele._doorRightWing.width();
        if (rightWingWrapper < 0) {
            rightWingWrapper = 0;
        }
        this._ele.doorRightWingWrapper.width(rightWingWrapper + 'px');
        this._ele._doorRightSpacer.width(rightWingWrapper - this._ele._doorRightWing.width() + 1 + 'px'); // 1 is margin.

        this.button.off('click');
        this.button.on('click', this._onClickButton.bind(this));
    }

    _onClickButton() {
        // Door Control lock -> unlock
        if (this._attr.lockState) {
            this.showUnlockConfirmationDlg();
        }
        // Door Control open -> close
        else {
            if (this._lockSupport) {
                this._ele._buttonPendingWrapper.activate(true, { transparent: true });
                this.noEventDuringProcessing(true);
                this._ele._lockIconWrapper.addClass("hide");
                if (this._eventList.lock) {
                    this._eventList.lock();
                }
            } else {
                toastPopup.showToast(C_("SMARTLOCK_WARN_TOAST_MESSAGE"));
            }
        }
    }

    showUnlockConfirmationDlg() {
        LoggerI("showUnlockConfirmationDlg");

        if (!this.unlockConfirmDlg) {
            let contents = C_("SMARTLOCK_UNLOCK_CONFIRMAITON_MESSAGE");
            var _that = this;
            let btnArr = {
                [C_("DIALOG_BUTTON_CANCEL")] (dlg) {
                    LoggerD("Press Cancel Button");
                    dlg.hide();
                },
                [C_("DIALOG_BUTTON_OK")] (dlg) {
                    LoggerD("Press Done Button");
                    dlg.hide();
                    _that._ele._buttonPendingWrapper.activate(true, { transparent: true });
                    _that.noEventDuringProcessing(true);
                    _that._ele._lockIconWrapper.addClass("hide");
                    if(_that._eventList.unlock) {
                        _that._eventList.unlock();
                    }
                }
            };

            this.unlockConfirmDlg = new Dialog("unlockConfirm_01", {
                parent:$("body"),
                title:C_("SMARTLOCK_UNLOCK_TITLE"),
                description:contents,
                btnArr:btnArr
            });
            this.unlockConfirmDlg.init();
        }
        this.unlockConfirmDlg.show();
    }

    async lock() {
        LoggerI("[DoorLock] : LOCK");
        /*
         * Don't run the animation at the first loading.
         * When the device is changed on device side directly,
         * the animation needs to run on refresh.
         */

        if (this._attr.lockState === false) {
            this._needsAnimation = true;
        } else {
            this._needsAnimation = false;
        }
        this._attr.lockState = true;
        // super.setOn();
        if (this._needsAnimation) {
            this._ele._text_off.fadeOut(500);
            this._ele._text_on.delay(160).fadeIn(410);
        } else {
            this._ele._text_off.hide();
            this._ele._text_on.show();
        }
        this._ele._buttonPendingWrapper.deactivate();
        this.noEventDuringProcessing(false);
        this._ele._lockIconWrapper.removeClass("hide");
        if (this._ele.doorRightWingWrapper.hasClass("open")) {
            promiseAnimationEnd(this._ele._doorLeftWing, 'close')
                .then(()=>{
                    this._ele._doorLeftWing.removeClass('close');
                });
            promiseAnimationEnd(this._ele.doorLeftWingWrapper, 'slide_close')
            .then(() => {
                this._ele.doorLeftWingWrapper.removeClass('slide_close');
            });
            this._ele._doorLeftWing.removeClass('open');

            this._animation({stat:"lock", noAnim:this._needsAnimation === false});
        } else {
            if (this._needsAnimation === false) {
                this._animation({stat:"lock", noAnim:true});
            }
        }
        this._ele.doorLeftWingWrapper.removeClass("open");
        this._ele.doorRightWingWrapper.removeClass("open");
    }

    async unlock() {
        LoggerI("[DoorLock] : UNLOCK");
        if (this._attr.lockState === true) {
            this._needsAnimation = true;
        } else {
            this._needsAnimation = false;
        }
        this._attr.lockState = false;
        // super.setOn();
        if (this._needsAnimation) {
            this._ele._text_on.fadeOut(500);
            this._ele._text_off.delay(160).fadeIn(410);
        } else {
            this._ele._text_on.hide();
            this._ele._text_off.show();
        }
        this._ele._buttonPendingWrapper.deactivate();
        this.noEventDuringProcessing(false);

        this._ele._lockIconWrapper.removeClass("hide");

        if (this._needsAnimation) {
            promiseAnimationEnd(this._ele.doorLeftWingWrapper, 'slide_open')
            .then(() => {
                this._ele.doorLeftWingWrapper.removeClass('slide_open');
            });
        } else {
            this._ele.doorLeftWingWrapper.addClass("hide");
            this._ele.doorRightWingWrapper.addClass("hide");
            setTimeout(() => {
                this._ele.doorLeftWingWrapper.removeClass("hide");
                this._ele.doorRightWingWrapper.removeClass("hide");
            }, 2900); //2900 is animation duration
        }

        this._ele.doorLeftWingWrapper.addClass("open");
        this._ele.doorRightWingWrapper.addClass("open");
        this._ele._doorLeftWing.addClass('open');

        this._animation({stat:"unlock", noAnim:this._needsAnimation === false});
    }

    _animation({stat, noAnim}={}) {
        let frameSize = undefined;
        let nextFrame = () => {
            let canWidth = this._ele._lockIconWrapper.innerWidth();
            let canHeight = this._ele._lockIconWrapper.innerHeight();
            this._ele.canv[0].width = canWidth;
            this._ele.canv[0].height = canHeight;

            let diff = (new Date()).getTime() - this._anim.startTime;
            let step = parseInt(diff/(this._anim.lockPeriod/this._anim.frameStep));
            if (noAnim) {
                step = this._anim.frameStep;
            }

            //console.log("step=" + step + ", x pos=" + step*frameSize);
            this.ctx.clearRect(0, 0, canWidth, canHeight);
            this.ctx.drawImage(img, step*frameSize, 0, frameSize, frameSize, 0, 0, canWidth, canHeight);

            if (step < this._anim.frameStep) {
                window.requestAnimationFrame(nextFrame);
            } else {
                return;
            }
        }

        //animation image size is 6100*244 total frame 25.
        let img = new Image();
        let imgWidth = 0;
        let imgHeight = 0;
        img.onload = () => {
            imgWidth = img.width;
            imgHeight = img.height;
            frameSize = parseInt(img.width/parseInt(img.width/img.height));
            this._anim.startTime = (new Date()).getTime();
            nextFrame();
        };
        if (stat === "lock") {
            img.src = './res/png/device/SmartLock/Lock_closed_ani.png';
        } else {
            img.src = './res/png/device/SmartLock/Lock_open_ani.png';
        }
    }

    resize() {
        if (this._class === "DoorLock") {
            setTimeout(() => {
                let cardWidth =  this._ele._card_animation.width();
                let cardHalfXPos = cardWidth/2;

                let rightWingWrapper = cardWidth - cardHalfXPos - 166 + this._ele._doorRightWing.width();
                if (rightWingWrapper < this._ele._doorRightWing.width()) {
                    rightWingWrapper = this._ele._doorRightWing.width();
                }

                let leftWingWrapper = cardHalfXPos + 166 + 1; // 166 is animation start poistion, 1 is animation margin.
                if (leftWingWrapper + rightWingWrapper > cardWidth) {
                    leftWingWrapper = cardWidth - rightWingWrapper + 25; // 25 px is animation spacer
                }

                this._ele.doorLeftWingWrapper.width(leftWingWrapper + 'px');
                this._ele._doorLeftSpacer.width(leftWingWrapper - this._ele._doorLeftWing.width() + 'px');

                this._ele.doorRightWingWrapper.width(rightWingWrapper + 'px');
                this._ele._doorRightSpacer.width(rightWingWrapper - this._ele._doorRightWing.width() + 1 + 'px'); // 1 is margin.
            }, 300);
        }
    }

    _onRotate() {
        super._onRotate();
        this.resize();
        this._setText(this._ele._text_on, this.SMARTLOCK_LOCK_TEXT);
        this._setText(this._ele._text_off, this.SMARTLOCK_UNLOCK_TEXT);
    }
}

class ElevatorCard extends ButtonCard {
    constructor(id, { parent, title, bgColor, label, type } = {}) {
        super(id, { parent, title, bgColor });

        this._class = 'Elevator';
        this._title = title;
        this._ele._button = undefined;
        this._label = label;

        // "default" : One Button with Up-down Arrow
        // "two" : Two Buttons with Up and Down Arrow
        // "up" : One Button with Up Arrow Only
        // "down" : One Button with Down Arrow Only
        this._type = "default";
        if (type) {
            this._type = type;
        }

        this._eventList = {
            click: function () { },   // For One Button or Up Button in Two Button Case
            click_2: function () { }    // For Down Button in Two Button Case
        };

        this.image = {
            up_on: './res/png/device/Elevator/device_ic_active_up_on.png',
            up_off: './res/png/device/Elevator/device_ic_active_up_off.png',
            up_sel: './res/png/device/Elevator/device_ic_active_up_sel.png',
            down_on: './res/png/device/Elevator/device_ic_active_down_on.png',
            down_off: './res/png/device/Elevator/device_ic_active_down_off.png',
            down_sel: './res/png/device/Elevator/device_ic_active_down_sel.png',
            default_on: './res/png/device/Elevator/device_ic_active_default_on.png',
            defalut_off: './res/png/device/Elevator/device_ic_active_default_off.png'
        }

        this._onBGColor = "#8173FF";
        this._offBGColor = "#E5E5E5";
        if (bgColor) {
            this._runBGColor = bgColor;
        }
        this._animationPromise = undefined;

        this._animationStyle = 'elevator_call_animation';
    }

    init() {
        super.init();
        this.card.addClass('overflowHidden');
        this._ele._text_wrapper.remove();
        this._ele._powerButton.remove();

        this.setBgColor(this._offBGColor);
        this.buttonwrapper.addClass('elevator');

        this.button.off('click');
        this.button.on('click', this._onClickButton.bind(this, 1));
        this.Button1Barrier = new Barrier(this.button, {loaderStyle:"dotLoader", loaderSize:"4px"});


        if (this._type === 'two') {
            this.button.addClass('elevator_up');
            this._ele._button2 = $(Dom.div({ className: 'iot_buttonCard button elevator_down' }));
            this.buttonwrapper.append(this._ele._button2);
            this._ele._button2_border = $(Dom.div({ className: 'iot_buttonCard button gray_border' }));
            this._ele._button2.append(this._ele._button2_border);

            this.button2.on('click', this._onClickButton.bind(this, 2));
            this.Button2Barrier = new Barrier(this.button2, {loaderStyle:"dotLoader", loaderSize:"4px"});
        } else {
            this.button.addClass('elevator_one');
            this.card.addClass("elevator_onebutton");
        }

        // Elevator don't need pull-to-refresh.
        window.skipRefresh(true);
    }

    _onClickButton(_index_) {
        LoggerI("[Elevator] : Click Call Button (" + _index_ + ")");
        this.setButtonBG('');
        this.Button1Barrier.activate(true, {transparent:true});
        this.noEventDuringProcessing(true);

        // For One Button or Up Button in Two Button Case
        if (this._eventList.click) {
            this._eventList.click(_index_);
        }
    }

    _runAnimation(_dir_) {
        let start_animation = 'start';
        let looping_animation = 'looping';
        let end_animation = 'end';

        if (_dir_ === "up") {
            start_animation = 'end reverse';
            looping_animation = 'looping reverse';
            end_animation = 'start reverse';
        }

        this._animationPromise = promiseAnimationEnd(this.bgAnimation, start_animation)
            .then( () => promiseAnimationEnd(this.bgAnimation, looping_animation) )
            .then( () => promiseAnimationEnd(this.bgAnimation, end_animation) )
            .then( () => {
                this.standby();
            })
            .catch( (err) =>
                {
                    LoggerE("Canceled by " + err);
                });

    }

    async called(_index_) {
        LoggerI("[Elevator] : startAnimation : " + _index_);

        if (_index_ == 1) {
            this.setButtonBG('');

            if (this._type === "two") {
                this.setButton2BG(this.image.down_sel);
            }

            this._runAnimation("up");
        }
        // For Down Button in Two Button Case
        else if (_index_ == 2) {
            this.setButton2BG('');

            this.setButtonBG(this.image.up_sel);

            this._runAnimation("down");
        }

        // VA
        if (this._ele._button) {
            this._ele._button.attr('aria-pressed','true');
        }
    }

    async standby() {
        LoggerI("[Elevator] : STANDBY");

        // If the animation is still running, it needs to stop.
        if (this.Button1Barrier.isActivate) {
            this.Button1Barrier.deactivate();
        }
        if (this.Button2Barrier && this.Button2Barrier.isActivate) {
            this.Button2Barrier.deactivate();
        }

        this.noEventDuringProcessing(false);

        this.setBgColor(this._onBGColor);
        this._ele._button_border.hide();
        this.setBgAnimation(this._animationStyle + " set");

        switch(this._type) {
            case "default":
                this.setButtonBG(this.image.default_on);
                break;
            case "up":
                this.setButtonBG(this.image.up_on);
                break;
            case "down":
                this.setButtonBG(this.image.down_on);
                break;
            case "two":
                this.setButtonBG(this.image.up_on);
                this.setButton2BG(this.image.down_on);
                this._ele._button2_border.hide();
                break;
            default:
                LoggerE("[Error] Undefined type : " + this._type);
        }

        // VA
        if (this._ele._button) {
            this._ele._button.attr('aria-pressed','false');
        }
    }

    // TODO: Can not get the on/off status of the elevator now. It's dummy function refer to the GUI guide.
    async off() {
        LoggerI("[Elevator] : OFF");

        this.noEventDuringProcessing(true);

        this._ele._button_border.show();
        this.setBgColor(this._offBGColor);
        this.setBgAnimation();

        switch(this._type) {
            case "default":
                this.setButtonBG(this.image.defalut_off);
                break;
            case "up":
                this.setButtonBG(this.image.up_off);
                break;
            case "down":
                this.setButtonBG(this.image.down_off);
                break;
            case "two":
                this._ele._button2_border.show();

                this.setButtonBG(this.image.up_off);
                this.setButton2BG(this.image.down_off);
                break;
            default:
                LoggerE("[Error] Undefined type : " + this._type);
        }
    }

    get button2() {
        if (this._ele._button2) {
            return this._ele._button2;
        } else {
            LoggerE("[Error] Cannot Find Button 2");
            return undefined;
        }
    }

    setButton2BG(_path_) {
        this._ele._button2.css('background-image', "url(" +_path_ +")");
    }
}

class StandbyPowerCard extends ButtonCard {
    constructor(id, { parent, title, bgColor, label } = {}) {
        super(id, { parent, title, bgColor });

        this._class = 'Standby';
        this._title = title;
        this._ele._button = undefined;
        this._label = label;

        this._eventList = {
            on: function () { },
            off: function () { }
        };

        this.canvas = {
            height: undefined,
            width: undefined
        }

        //animation
        this._anim = {};
        this._anim.sleep = true;
        this._anim.isWorking = false;
        this._anim.DOT_SIZE = 6;
        this._anim.LINE_GAP = 5.87;
        // pattern repeat count. longest line length is 388.5, longest device width is 1366, 1366/388.5 = 3.5 + 1 (animation distance)
        this._anim.REPEAT_COUNT = 5;
        this._anim.pattern = [];
        this._anim.patternSeq = [1, 2, 3, 1, 2, 3, 1, 2, 4, 5, 2, 3, 1, 3, 5, 4, 5, 1];
        this._anim.patternVelocity = [  {duration:19500, distance:342},
                                        {duration:41500, distance:357},
                                        {duration:29000, distance:364.5},
                                        {duration:62000, distance:364.5},
                                        {duration:19000, distance:357} ]; // by GUI guide.
        this._anim.patternStartTime = [];
        this._anim.interpolatePos = [];

        this._anim.patternDatas = [
            {   // P1 : 49 Particles
                scale: [ .5,  1, .5,  0,  1,  1, .5,  1, .5,  1,
                        1,  1, .5,  0,  1,  1,  1,  1,  1,  0,
                        1,  1,  1,  1, .5,  1,  0,  1, .5,  1,
                        1, .5,  0,  1,  1, .5,  1,  1,  1,  1,
                        .5,  0, .5,  1, .5,  1,  1, .5, .5 ],
                gap: 1.5,
                alpha: .5,
                width: 366
            },
            {   // P2 : 31 Particles
                scale: [ .5,  1,  1,  1,  1,  0,  1, .5,  1,  1,
                        .5,  1,  1,  1, .5,  0,  1, .5,  1, .5,
                        1, .5,  1, .5,  1,  1,  1,  1,  0, .5,
                        1 ],
                gap: 6.5,
                alpha: .5,
                width: 381
            },
            {   // P3 : 35 Particles
                scale: [  1,  1,  1,  1,  1, .5,  1, .5, .5,  1,
                        1,  1,  1, .5, .5,  1,  1,  1,  1,  1,
                        1, .5, .5,  1,  1, .5, .5,  1,  1,  1,
                        .5, .5,  1, .5, .5 ],
                gap: 5.25,
                alpha: 1,
                width: 388.5
            },
            {   // P4 : 35 Particles
                scale: [ .5, .5, .5,  1, .5, .5,  1,  1,  1, .5,
                    .5,  1,  1, .5, .5,  1,  1,  1,  1,  1,
                    1, .5, .5,  1,  1,  1,  1, .5, .5,  1,
                    .5,  1,  1,  1,  1 ],
                gap: 5.25,
                alpha: 1,
                width: 388.5
            },
            {   // P5 : 49 Particles
                scale: [ .5, .5,  1, .5, .5, .5,  1,  1,  1,  1,
                    0, .5,  1, .5, .5,  0, .5, .5,  1,  1,
                    .5,  1, .5,  0, .5,  1,  1,  1,  1, .5,
                    1,  1,  0, .5,  1,  1, .5,  1,  0,  1,
                    .5,  1,  1,  1,  1,  0,  1,  1,  1 ],
                gap: 1.5,
                alpha: 1,
                width: 366
            },
        ];
    }

    init() {
        super.init();
        this.card.addClass('overflowHidden');
        this._ele._background = $(Dom.div( { className: 'iot_StandbyPowerCard background__gradient' }));
        this.card.prepend(this._ele._background);

        // Prepare the Canvas
        this._ele._card_animation.addClass('iot_StandbyPowerCard canvas_wrapper');
        this._ele.canvas = $(Dom.canvas( { className: 'iot_StandbyPowerCard canvas' }));
        this._ele._card_animation.append(this._ele.canvas);
    }

    _createPattern() {
        let patterns = [];

        //create dot canvas.
        const dotCanv = Dom.canvas({className: 'iot_StandbyPowerCard canvas'});
        dotCanv.width = this._anim.DOT_SIZE;
        dotCanv.height = this._anim.DOT_SIZE;
        const dotCtx = dotCanv.getContext('2d');
        // circle
        dotCtx.beginPath();
        dotCtx.globalAlpha = 1;
        dotCtx.filter = 'blur(2px)';
        dotCtx.fillStyle = "#FFFFFF";
        dotCtx.arc(this._anim.DOT_SIZE/2, this._anim.DOT_SIZE/2, this._anim.DOT_SIZE/4 , 0, 2 * Math.PI);
        dotCtx.fill();
        // out glow
        dotCtx.filter = `drop-shadow(0px 0px ${this._anim.DOT_SIZE/8}px #FFFFFF)`
        dotCtx.fillStyle = "#FFFFFF";
        dotCtx.arc(this._anim.DOT_SIZE/2, this._anim.DOT_SIZE/2, this._anim.DOT_SIZE/4 , 0, 2 * Math.PI);
        dotCtx.fill();
        dotCtx.closePath();

        let maxWidth = 0;
        this._anim.patternDatas.forEach((v) => {
            if (v.width > maxWidth) {
                maxWidth = v.width;
            }
        });

        const lineCount = this._anim.patternSeq.length;
        let idxs = Object.keys(this._anim.patternDatas);
        idxs.forEach((idx) => {
            const pattern = this._anim.patternDatas[idx];
            const patternCanv = Dom.canvas({className: 'iot_StandbyPowerCard canvas'});
            patternCanv.width = maxWidth*this._anim.REPEAT_COUNT;
            patternCanv.height = lineCount * this._anim.DOT_SIZE + ((lineCount-1) * this._anim.LINE_GAP);

            //recalc velocity.
            const duration = this._anim.patternVelocity[idx].duration;
            const distance = this._anim.patternVelocity[idx].distance;
            this._anim.patternVelocity[idx].duration = duration * (pattern.width) / distance;
            //must insert a gap between the patterns.
            this._anim.patternVelocity[idx].distance = pattern.width + pattern.gap;

            //draw dot...
            const lineCanv = Dom.canvas({className: 'iot_StandbyPowerCard canvas'});
            lineCanv.width = pattern.width*this._anim.REPEAT_COUNT;
            lineCanv.height = this._anim.DOT_SIZE;

            const lineCtx = lineCanv.getContext('2d');
            lineCtx.globalAlpha = pattern.alpha;
            let x = 0;
            const scales = pattern.scale;
            scales.forEach((scale, i) => {
                if (scale !== 0) {
                    for( let repeat = 0; repeat < this._anim.REPEAT_COUNT; repeat++) {
                        lineCtx.drawImage(dotCanv,
                            x + pattern.width*repeat + (repeat ? pattern.gap*repeat : 0) + ((this._anim.DOT_SIZE - (this._anim.DOT_SIZE*scale))/2),
                            (this._anim.DOT_SIZE - (this._anim.DOT_SIZE*scale))/2,
                                this._anim.DOT_SIZE*scale, this._anim.DOT_SIZE*scale);
                    }
                }
                x += this._anim.DOT_SIZE + pattern.gap;
            });

            const patternCtx = patternCanv.getContext('2d');
            this._anim.patternSeq.forEach((patternNo, seq) => {
                if ( Number(idx) === patternNo - 1) {
                    patternCtx.drawImage(lineCanv, 0, seq*(this._anim.DOT_SIZE + this._anim.LINE_GAP));
                }
            });

            patterns.push(patternCanv);
        });

        return patterns;
    }

    async _runAnimation() {

        if (this._anim.pattern.length === 0) {
            this._anim.pattern = this._createPattern();
        }

        if (this._anim.isWorking === false) {
            //remove old data.
            this._anim.patternStartTime.splice(0, this._anim.patternStartTime.length);
            this._anim.interpolatePos.splice(0, this._anim.interpolatePos.length);
            for(let i = 0; i < this._anim.pattern.length; i++) {
                this._anim.patternStartTime.push(0);
                this._anim.interpolatePos.push(0);
            }
            LoggerD("[StandbyPower] animtaion Awake");
            this._anim.sleep = false;
        }

        if (!this._anim.maskImg) {
            this._anim.maskImg = await loadImage("./res/png/device/SmartPlug/Dot_Animation_Mask.png");
        }

        let nextFrame = () => {

            const ctx = getHTMLElementFromJQuery(this._ele.canvas).getContext('2d');
            if (!this._anim.pixelRatio) {
				this._anim.pixelRatio = (function () {
						let dpr = window.devicePixelRatio || 1;
						let bsr = ctx.webkitBackingStorePixelRatio ||
							  ctx.mozBackingStorePixelRatio ||
							  ctx.msBackingStorePixelRatio ||
							  ctx.oBackingStorePixelRatio ||
							  ctx.backingStorePixelRatio || 1;
					return dpr / bsr;
				})();
			}

            let canWidth = this._ele._card_animation.innerWidth();
            let canHeight = this._ele._card_animation.innerHeight();
            getHTMLElementFromJQuery(this._ele.canvas).width = canWidth * this._anim.pixelRatio;
            getHTMLElementFromJQuery(this._ele.canvas).height = canHeight * this._anim.pixelRatio;
            getHTMLElementFromJQuery(this._ele.canvas).style.width = canWidth;
            getHTMLElementFromJQuery(this._ele.canvas).style.height = canHeight;
            getHTMLElementFromJQuery(this._ele.canvas).getContext('2d').scale(this._anim.pixelRatio, this._anim.pixelRatio);

            let currentTime = new Date().getTime();
            this._anim.pattern.forEach((pattern, idx)=> {
                let velocity = this._anim.patternVelocity[idx];
                if (this._anim.patternStartTime[idx] === 0) {
                    //console.log(` ===> this._anim.interpolatePos[${idx}]= ${this._anim.interpolatePos[idx]}`);
                    this._anim.patternStartTime[idx] = currentTime;
                }

                let ratio = (currentTime - this._anim.patternStartTime[idx]) / velocity.duration;
                // check background -> forground case.
                // 33 = 1000/30fps
                if (ratio > 1 && (this._anim.patternStartTime[idx] + velocity.duration + 33) < currentTime) {
                    ratio = 1;
                    this._anim.interpolatePos[idx] = 0;
                }

                let currentDistance = (velocity.distance * ratio)
                let xPos = -(currentDistance + this._anim.interpolatePos[idx]);

                if (velocity.distance <= currentDistance) {
                    this._anim.interpolatePos[idx] = this._anim.interpolatePos[idx] + (currentDistance - velocity.distance);
                    if (this._anim.interpolatePos[idx] > velocity.distance) {
                        this._anim.interpolatePos[idx] = this._anim.interpolatePos[idx] - velocity.distance;
                    }
                    this._anim.patternStartTime[idx] = 0;
                }

                ctx.drawImage(pattern, xPos, 0);
            });

            ctx.globalCompositeOperation = "source-in";
            let imgWidth = this._anim.maskImg.width;
            let imgHeight = this._anim.maskImg.height - ((this.container.innerHeight() - canHeight) * (imgWidth / canWidth));

            ctx.drawImage(this._anim.maskImg, 0, 0, imgWidth, imgHeight, 0, 0, canWidth, canHeight);

            if (!this._anim.sleep) {
                this._anim.isWorking = true;
                window.requestAnimationFrame(nextFrame);
            } else {
                LoggerD("[StandbyPower] animtaion go to sleep!!");
                this._anim.isWorking = false;
            }
        }

        if (!this._anim.isWorking)
            return nextFrame();
        else
            return;
    }

    _stopAnimation() {
        LoggerD("[StandbyPower] Stop Animation");
        this._anim.sleep = true;
        //if background.
        if (document.hidden !== undefined && document.hidden ) {
            LoggerI("[StandbyPower] Set flag for animation awake");
            this._anim.isWorking = false;
        }
    }

    setOn() {
        LoggerI("[StandbyPower] ON");
        super.setOn('standby');
        // For the First Loading Case, animation would not run.
        if (this._attr.button == undefined) {
            this._ele.canvas.show();
            this._runAnimation();
            this._ele._background.show();
        } else {
            this._ele._background.fadeIn(500);
            this._ele.canvas.fadeIn(500);
            this._runAnimation();
        }
    }

    setOff() {
        LoggerI("[StandbyPower] OFF");
        super.setOff('standby');
        // For the First Loading Case, animation would not run.
        if (this._attr.button == undefined) {
            this._stopAnimation();
            this._ele._background.hide();
        } else {
            this._ele.canvas.fadeOut(500);
            this._stopAnimation();
            this._ele._background.fadeOut(500);
        }
    }

    _onRotate() {
        super._onRotate();
    }
}

class TemperatureControlCard extends CapabilityCard {
    constructor(id, {parent, title, bgColor, range, update, dlgType} = {}) {
        super(id, {parent, title, bgColor});

        this._class = 'TemperatureControlCard';
        this._title = title;
        this._ele._button = undefined;

        this._dragStart = false;
        this._unit = "C";                   /* Default Degree Unit */

        this._update = undefined;

        // Value for Gradation
        this._cur_degree = 25;              /* Current Degree Value */
        this._range = [5, 35];              /* Range of Degree. [0] : Minimum, [1] : Maximum */
        this._gradationMain = 5;            /* Main Gradation Gap Degree Value */
        this._gradationMainGap = undefined; /* Main Gradation Gap Distance */
        this._canvas_margin = 28;           /* Left and Right Margin of Gradation */

        this._prev = this._cur_degree;

        this._canvas_outMargin = 0;

        this._attr = {
            mode: undefined,
            temperature: undefined
        }

        if (range) {
            this._range[0] = range[0];
            this._range[1] = range[1];
        }

        if (update) {
            this._update = update;
        }

        if (dlgType) {
            this._dlgType = dlgType;
        } else {
            this._dlgType = undefined;
        }
        this._clickFlag = false;

        this.eventList = {
            on: function () { },
            off: function () { }
        };

        this._handle = {    // Base of Handle point
			x: undefined,
            y: undefined,
            r: undefined,   // Radius of the handle
            x_margin: undefined,    // margin to avoid the void
            y_margin: undefined
        }

        this._onBGColor = "#FF6927";
        this._offBGColor = "#E5E5E5";

        this._offText = undefined;
    }

    init() {
        super.init();
        this.card.addClass('overflowHidden');
        Dom.build(c => {
            this._ele._wrapper = $(c.div( { className: 'iot_TemperatureCtrlCard' },
                this._ele._onoffWrapper = $(c.div( { className: 'iot_TemperatureCtrlCard on_off_wrapper' },
                    this._ele._onWrapper = $(c.div( { className: 'iot_TemperatureCtrlCard main_wrapper'},
                        this._ele._infoText = $(c.div( { className: 'iot_TemperatureCtrlCard infoText on roboto-regular'} )),
                        this._ele._degree = $(c.div( { className: 'iot_TemperatureCtrlCard degree on roboto-light'} )),
                        this._ele._degreeUnit = $(c.div( { className: 'iot_TemperatureCtrlCard degreeUnit on'} ))
                    // )),
                    // this._ele._offWrapper = $(c.div( { className: 'iot_TemperatureCtrlCard main_wrapper overlay' },
                    //     this._ele._offText = $(c.div( { className: 'iot_TemperatureCtrlCard statusText off roboto-light'}))
                    ))
                ))
            ));

            this._ele._modeButton = new FlatButton(this._ele._wrapper, "thermo_butt01", "Heat");
            this._ele._modeButton.wrapper.setRipple('round-rect');
            // VA
            this._ele._modeButton.wrapper.attr('role','button');
            this._ele._modeButton.wrapper.attr('aria-haspopup','true');
            this._ele._modeButton.wrapper.attr('aria-label',C_('THERMOSTAT_MODE'));

            this.contents.append(this._ele._wrapper);

            this._ele._modePendingWrapper = new Barrier(this._ele._modeButton.wrapper, { loaderSize: "small" });

            if (isItIOS() || isFHub()) {
                appendBorderRadiusClipPathSvg($(document.body));
                this.card.append(Dom.div({className:'iot_borderRadius__cover TopLeft'}));
                this.card.append(Dom.div({className:'iot_borderRadius__cover TopRight'}));
                this.card.append(Dom.div({className:'iot_borderRadius__cover BottomLeft'}));
                this.card.append(Dom.div({className:'iot_borderRadius__cover BottomRight'}));
            }
        });

        this.contents.addClass('full_width');

        this._ele._infoText.text(C_('SET_TO'));

        this._ele._degree.text(this._cur_degree);
        this._ele._degreeUnit.text("°" + this._unit);

        this._ele._modeButton.wrapper.on('click', this._onClickMode.bind(this));
        this._ele._degree.on('click', this._onClickValue.bind(this));

        /*
        this.temperatureSlider = new TemperatureSlider(this._ele._wrapper, "thermostat", this._range, {
            current: this._cur_degree,
            moveFN: this.setDegree.bind(this),
            updateFN: this._setTemperature.bind(this)
        });
        */
        this.temperatureSlider = new CanvasTemperatureSlider(this._ele._wrapper, "thermostat",
                {range: this._range, current: this._cur_degree});
        this.temperatureSlider.setEvent('change', this.setDegree.bind(this));
        this.temperatureSlider.setEvent('update', this._setTemperature.bind(this));
    }

    setEvent(_type_, _func_) {
        this.eventList[_type_] = _func_;
    }

    initList(_parent_, _type_, _DPRsc_) {
        let buttonAttr = new Object();
        var items = new Array();
        var slideUp = undefined;
        var event_fn = undefined;

        switch (_type_) { // For expandability
            case 'mode':
                event_fn = this._setMode;
                break;
            default:
                LoggerE('Not Defined List ' + _type_);
                return;
        }

        if (_DPRsc_) {
            for (var i in _DPRsc_.alternatives) {
                if (_DPRsc_.alternatives.hasOwnProperty(i)) {
                    var obj = new Object();
                    obj.key = i;
                    obj.label = capitalizeFirstLetter(GetStringByPoCode(_DPRsc_.alternatives[i]));

                    if (obj.key === "off") {
                        this._offText = obj.label;
                        // this._ele._offText.text(obj.label);
                    }

                    obj.event = {
                        click: event_fn.bind(this)
                    };
                    items.push(obj);
                }
            }
        }

        slideUp = new SelectionListPopup(this._id + "_" + _type_, {parent:$("#mainPage"), target:this.card, options:items, type:'center'});
        switch (_type_) {
            case 'mode':
                this._modeSlideUp = slideUp;
                break;
            default:
                LoggerE('Not Defined List ' + _type_);
                return;
        }

        return;
    }

    _set_bg(_value_) {
        let _degree_ = parseInt(_value_);

        let _min = this._range[0];
        let _max = this._range[1];
        let _minBG = "#FFD02C";
        let _maxBG = "#FF6E27";
        let _ret = undefined;

        if (_degree_ < _min) {
            _ret = _minBG;
        } else if (_degree_ > _max) {
            _ret = _maxBG;
        } else {
            let _red = Math.round((((_value_ - _min) * ((parseInt(_maxBG.substring(1, 3), 16)) - (parseInt(_minBG.substring(1, 3), 16)))) / (_max - _min)) + (parseInt(_minBG.substring(1, 3), 16))).toString(16);
            let _green = Math.round((((_value_ - _min) * ((parseInt(_maxBG.substring(3, 5), 16)) - (parseInt(_minBG.substring(3, 5), 16)))) / (_max - _min)) + (parseInt(_minBG.substring(3, 5), 16))).toString(16);
            let _blue = Math.round((((_value_ - _min) * ((parseInt(_maxBG.substring(5, 7), 16)) - (parseInt(_minBG.substring(5, 7), 16)))) / (_max - _min)) + (parseInt(_minBG.substring(5, 7), 16))).toString(16);

            _ret = "#"
                + (_red.length == 1 ? "0" + _red : _red)
                + (_green.length == 1 ? "0" + _green : _green)
                + (_blue.length == 1 ? "0" + _blue : _blue);
        }
        this._onBGColor = _ret;
        // For updating the background Color during offline
        if (this._attr.mode === "off" || !this._ele._wrapper.hasClass('on')) {
            return;
        }
        this.setBgColor(_ret);
    }

    _onClickMode(_idx_) {
        // if (this.modeButton.label === C_('THERMOSTAT_MODE')) {
        //     this._modeSlideUp.highlight(this._offText);
        // } else {
        //     this._modeSlideUp.highlight(this.modeButton.label);
        // }
        this._modeSlideUp.highlight(this.modeButton.label);

        this._modeSlideUp.show();
    }

    _setMode(_idx_) {
        LoggerI("[Thermostat] Mode : " + _idx_);
        console.log("hash:" + window.location.hash);
        //HNView.pageCtrl.popDlg(this._modeSlideUp.id);
        this._modeSlideUp.hide();

        this.modeButton.removePress();
        this.modeButton.hideText(true);
        this.noEventDuringProcessing(true);
        this._ele._modePendingWrapper.activate(true, { transparent: true });

        if (_idx_ == 'off') {
            this.off();
        } else if (this._attr.mode == 'off' && _idx_ != 'off') {
            this.on();
        }

        if (this.eventList.mode) {
            this.eventList.mode(_idx_);
        }
    }

    _setTemperature(_value_, _animation_) {
        if (this._prev == _value_) {
            return this._prev;
        }
        this.noEventDuringProcessing(true);
        this.temperatureSlider.activate();

        if (this.eventList.temperature) {
            this.eventList.temperature(_value_);
        }
        this._prev = _value_;
        return this._prev;
    }

    _onClickValue() {
        LoggerI("[Thermostat] Open the Temperature Set Dialog");
        if (this._ele._wrapper.hasClass('on')) {
            if (this._dlgType && this._dlgType === DIALOG_TYPE_VALUE) {
                if (!this._setValueDlg) {
                    var _that = this;
                    let btnArr = {
                        [C_("DIALOG_BUTTON_CANCEL")](dlg) {
                            LoggerD("Press Cancel Button");
                            if (dlg._ele.input)
                                dlg._ele.input.focusout();
                            setTimeout(() => {
                                dlg.hide();
                            }, 0);
                        },
                        [C_("DIALOG_BUTTON_DONE")](dlg, value) {
                            LoggerD("Press Done Button, value:" + value);
                            if (dlg._ele.input)
                                dlg._ele.input.focusout();
                            setTimeout(() => {
                                dlg.hide();
                            }, 0);
                            if (_that._current !== value) {
                                _that._setTemperature(value, true);
                            }
                        }
                    };

                    var _attr = {
                        range: {
                            from: this._range[0],
                            to: this._range[1]
                        },
                        step: 1,
                        unit: "°" + this._unit
                    };

                    this._setValueDlg = new SetValueDialog(this._id + "_SetValue", this.Degree, {
                        parent: $("body"),
                        title: C_('SET_TEMPERATURE'),
                        range: _attr.range,
                        step: _attr.step,
                        btnArr: btnArr,
                        unit: _attr.unit,
                        done: C_("DIALOG_BUTTON_DONE")
                    });
                } else {
                    this._setValueDlg.setValue(this.Degree);
                }
                this._setValueDlg.show();
            }
        }
    }

    get Degree() {
        return this._cur_degree;
    }

    setDegree(_value_) {
        this._ele._degree.text(_value_);
        this._cur_degree = _value_;
        this._set_bg(_value_);
    }

    get unit() {
        return this._unit;
    }

    setUnit(_value_) {
        this._unit = _value_;
        this._ele._degreeUnit.text("°" + this._unit);
    }

    get modeButton() {
        if (this._ele._modeButton) {
             return this._ele._modeButton;
        } else {
            LoggerE("Cannot Find Mode Button");
            return undefined;
        }
    }

    on() {
        LoggerI("[Thermostat] : ON");
        if (this._attr.mode === 'on' || this._attr.mode === 'heat') {
            LoggerD("[Thermostat] : Already ON")
            return;
        }
        if (!this._ele._wrapper.hasClass('on')) {
            if (this._modeSlideUp && this._modeSlideUp.isVisible()) {
                this._modeSlideUp.hide();
            }

            if (this._setValueDlg && this._setValueDlg.isVisible()) {
                if (this._setValueDlg._ele.input)
                    this._setValueDlg._ele.input.focusout();
                setTimeout(() => {
                    this._setValueDlg.hide();
                }, 0);
            }
            //HNView.pageCtrl.closeTopDlg();
        }

        if (!((this._attr.mode === undefined) || this.card.hasClass('iot_TemperatureCtrlCard_background_transition'))) {
            this.card.addClass('iot_TemperatureCtrlCard_background_transition');
        }
        this.setBgColor(this._onBGColor);
        this.modeButton.setDimUsable(false);
        this.temperatureSlider.setDim(false);

        this._ele._wrapper.removeClass('off');
        this._ele._wrapper.addClass('on');

        // At the first loading, VI shooud be disabled.
        // if (this._attr.mode === undefined) {
        //     this._ele._onWrapper.show();
        //     this._ele._offWrapper.hide();
        // } else {
        //     this._ele._offWrapper.fadeOut(330);
        //     this._ele._onWrapper.fadeIn(330);
        // }
        this._ele._onWrapper.children().removeClass('disable_text');
        this.setBgAnimation("iot_TemperatureCtrlCard_background_animation");
    }

    off() {
        LoggerI("[Thermostat] : OFF");
        if (this._attr.mode === 'off' || this._attr.mode === 'outing') {
            LoggerD("[Thermostat] : Already OFF")
            return;
        }
        if (!this._ele._wrapper.hasClass('off')) {
            //HNView.pageCtrl.closeTopDlg();
            if (this._modeSlideUp && this._modeSlideUp.isVisible()) {
                this._modeSlideUp.hide();
            }

            if (this._setValueDlg && this._setValueDlg.isVisible()) {
                if (this._setValueDlg._ele.input)
                    this._setValueDlg._ele.input.focusout();
                setTimeout(() => {
                    this._setValueDlg.hide();
                }, 0);
            }
        }
        if (!((this._attr.mode === undefined) || this.card.hasClass('iot_TemperatureCtrlCard_background_transition'))) {
            this.card.addClass('iot_TemperatureCtrlCard_background_transition');
        }
        this.setBgColor(this._offBGColor);
        this.modeButton.setDimUsable(true);
        this.temperatureSlider.setDim(true);
        this._ele._wrapper.removeClass('on');
        this._ele._wrapper.addClass('off');

        // At the first loading, VI shooud be disabled.
        // if (this._attr.mode === undefined) {
        //     this._ele._offWrapper.show();
        //     this._ele._onWrapper.hide();
        // } else {
        //     this._ele._onWrapper.fadeOut(330);
        //     this._ele._offWrapper.fadeIn(330);
        // }
        this._ele._onWrapper.children().addClass('disable_text');
        this.setBgAnimation();
    }

    async setMode(_value_, _label_) {
        LoggerI("[Thermostat] : Set Mode to " + _label_);

        if (_value_ == 'off') {
            this.off();
        } else{
            this.on();
        }

        this._attr.mode = _value_;
        this.noEventDuringProcessing(false);
        this.modeButton.hideText(false);
        // if (_value_ === 'off') {
        //     this.modeButton.setLabel(C_('THERMOSTAT_MODE'));

        // } else {
        //     this.modeButton.setLabel(_label_);
        // }
        this.modeButton.setLabel(_label_);
        this._ele._modePendingWrapper.deactivate();
    }

    async setTemperature(_value_) {
        LoggerI("[Thermostat] : Set Temperature to " + _value_);
        const immediateUpdate = this._attr.temperature === undefined ? true : false;
        this._attr.temperature = _value_;
        this._ele._degree.text(_value_);
        this._cur_degree = _value_;
        this._prev = this._cur_degree;

        // Don't need to show animation at the off state
        if (this._attr.mode === "on" && !this.card.hasClass('iot_TemperatureCtrlCard_background_transition')) {
            this.card.addClass('iot_TemperatureCtrlCard_background_transition');
        }

        this._set_bg(_value_);
        this.temperatureSlider.setValue(_value_, immediateUpdate);
        this.noEventDuringProcessing(false);

        this.temperatureSlider.deactivate();
    }

    onRotate() {

        if (this._setValueDlg && this._setValueDlg._ele && this._setValueDlg._ele.input) {
            this._setValueDlg._ele.input.blur();
        }
    }
}

class SystemAirconditionerCard extends CapabilityCard {
    constructor(id, { parent, title, bgColor, range, mode = true, fanSpeed = true, fanOscil = true } = {}) {
        super(id, {parent, title, bgColor});
        this._class = 'SystemAirconditionerCard';
        this._title = title;
        this._ele._button = undefined;

        this._dragStart = false;
        this._unit = "C";                   /* Default Degree Unit */

        this._support = {
            mode,
            fanSpeed,
            fanOscil
        }

        // Value for Gradation
        this._cur_degree = 25;              /* Current Degree Value */
        this._range = [5, 35];              /* Range of Degree. [0] : Minimum, [1] : Maximum */
        this._gradationMain = 5;            /* Main Gradation Gap Degree Value */
        this._gradationMainGap = undefined; /* Main Gradation Gap Distance */
        this._canvas_margin = 28;           /* Left and Right Margin of Gradation */

        this._attr = {
            power: undefined,
            mode: undefined,
            temperature: undefined,
            fanSpeed: undefined,
            fanOscillation: undefined
        }
        this._fanSpeed = undefined;
        this._fanOscillation = undefined;

        this._modeSlideUp = undefined;      /* List of Mode */
        this._speedSlideUp = undefined;
        this._oscilSlideUp = undefined;

        if (range) {
            this._range[0] = range[0];
            this._range[1] = range[1];
        }

        this.eventList = {
            on: function () { },
            off: function () { },
            mode: function () { },
            temperature: function () { },
            fanSpeed: function () { },
            fanOscil: function() { }
        };

        this._onBGColor = "#3695dd";
        this._offBGColor = "#E5E5E5";

        this._maskColor = {
            selected: '#3695DD',
            normal: '#505050'
        }
    }

    init() {
        super.init();
        this.card.addClass('overflowHidden');
        Dom.build(c => {
            this._ele._wrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard' },
                this._ele._topWrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard top_wrapper' },
                    this._ele._powerButtonWrapper = $(c.div({className: 'iot_AirconditionerCtrlCard power_button'},
                        this._ele._powerButton = $(c.div( ))
                    ))
                )),
                this._ele._onoffWrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard on_off_wrapper' },
                    this._ele._onWrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard main_wrapper' },
                        this._ele._infoText = $(c.div( { className: 'iot_AirconditionerCtrlCard infoText on roboto-regular'} ))
                    // )),
                    // this._ele._offWrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard main_wrapper overlay' },
                    //     this._ele._offText = $(c.div( { className: 'iot_AirconditionerCtrlCard statusText off dim roboto-light'}))
                    ))
                ))
            ));

            this._ele._powerButtonWrapper.setRipple('circle');
            appendSvg(this._ele._powerButton, 'device_sac_ic');
            this._ele._powerPendingWrapper = new Barrier(this._ele._powerButtonWrapper, { loaderSize: "small"});
            this._ele._powerButtonWrapper.on('click', this._onClickPower.bind(this));

            if (this._support.mode) {
                this._ele._modeButton = new FlatButton(this._ele._topWrapper, "aircon_mode", "Cool");
                this._ele._modeButton.wrapper.addClass('iot_AirconditionerCtrlCard mode_button');
                this._ele._modeButton.wrapper.setRipple('round-rect');
                this._ele._modePendingWrapper = new Barrier(this._ele._modeButton.wrapper, { loaderSize: "small", loaderColor: "white_spinner"});
                this._ele._modeButton.wrapper.on('click', this._onClickMode.bind(this));
            }

            if (this._support.fanSpeed || this._support.fanOscil) {
                this._ele._wrapper.append(
                    this._ele._bottomWrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard bottom_wrapper'}))
                );

                if (this._support.fanSpeed) {
                    this._ele._bottomWrapper.append(
                        this._ele._fanSpeedWrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard func_wrapper' },
                            this._ele._fanSpeedHeader = $(c.div( { className: 'iot_AirconditionerCtrlCard func_header' })),
                            this._ele._fanSpeedFunc_wrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard func_main_wrapper' },
                                this._ele._fanSpeedFunc = $(c.div( { className: 'iot_AirconditionerCtrlCard func_main' }))
                            ))
                        ))
                    );
                    this._ele._speedPendingWrapper = new Barrier(this._ele._fanSpeedFunc_wrapper, { loaderSize: "small", loaderColor: "white_spinner"});
                    this._ele._fanSpeedHeader.text(C_('FAN_SPEED'));
                    this._ele._fanSpeedWrapper.css('min-width', '79px');
                    this._ele._fanSpeedWrapper.on('click', this._onClickSpeed.bind(this));
                }

                if (this._support.fanOscil) {
                    this._ele._bottomWrapper.append(
                        this._ele._fanOscillationWrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard func_wrapper' },
                            this._ele._fanOscillationHeader = $(c.div( { className: 'iot_AirconditionerCtrlCard func_header' })),
                            this._ele._fanOscillationFunc_wrapper = $(c.div( { className: 'iot_AirconditionerCtrlCard func_main_wrapper' },
                                this._ele._fanOscillationFunc = $(c.div( { className: 'iot_AirconditionerCtrlCard func_main' }))
                            ))
                        ))
                    );
                    this._ele._oscilPendingWrapper = new Barrier(this._ele._fanOscillationFunc_wrapper, { loaderSize: "small", loaderColor: "white_spinner"});
                    this._ele._fanOscillationHeader.text(C_('FAN_OSCILLATION'));
                    this._ele._fanOscillationWrapper.css('min-width', '104px');
                    this._ele._fanOscillationWrapper.on('click', this._onClickOscil.bind(this));
                }
            }

            this.contents.append(this._ele._wrapper);

            if (isItIOS()) {
                appendBorderRadiusClipPathSvg($(document.body));
                this.card.append(Dom.div({className:'iot_borderRadius__cover TopRight'}));
            }

            // To keep the width for Rotation Case
            this.contents.addClass('full_width');
        });

        this._ele._infoText.text(C_('SET_TO'));
        // this._ele._offText.text(C_('OFF'));

        // For Number Swiper
        this._ele._temperatureDegree =
            new numberSwiper('temperature', this._ele._onWrapper, this._range[0], this._range[1], {
                _title_: C_('SET_TEMPERATURE'),
                _current_: this._cur_degree,
                _update_: this._setTemperature.bind(this),
                _setBG_: this.airconditioner_bg.bind(this),
                _unit_: ("°" + this._unit),
                _enableValueDlg_: true
            });
        this._ele._temperaturePendingWrapper = new Barrier(this._ele._temperatureDegree._ele._swiper_container, { loaderSize: "small", loaderColor:"white_spinner" });  // As the UX Guide, the Spinner has to be located at the center of the 'CARD'.
    }

    setEvent(_type_, _func_) {
        this.eventList[_type_] = _func_;
    }

    initList(_parent_, _type_, _DPRsc_) {
        var items = new Array();
        var event_fn = undefined;

        if (_DPRsc_ == undefined) {
            LoggerW("[SystemAirconditioner] : " + _type_ + " is not defined");
            switch (_type_) {
                case 'mode':
                    this._ele._modeButton.remove();
                    break;
                case 'fanSpeed':
                    this._ele._fanSpeedWrapper.remove();
                    break;
                case 'fanOscil':
                    this._ele._fanOscillationWrapper.remove();
                    break;
                default:
                    break;
            }
            return;
        }

        switch (_type_) {
            case 'mode':
                event_fn = this._setMode;
                break;
            case 'fanSpeed':
                event_fn = this._setSpeed;
                break;
            case 'fanOscil':
                event_fn = this._setOscil;
                break;
            default:
                LoggerE('Not Defined List ' + _type_);
                return;
        }

        if (_DPRsc_) {
            for (var i in _DPRsc_.alternatives) {
                if (_DPRsc_.alternatives.hasOwnProperty(i)) {
                    var obj = new Object();
                    obj.key = i;
                    obj.label = capitalizeFirstLetter(GetStringByPoCode(_DPRsc_.alternatives[i]));
                    obj.event = {
                        click: event_fn.bind(this)
                    };
                    items.push(obj);
                }
            }
        }

        switch (_type_) {
            case 'mode':
                this._modeSlideUp = new SelectionListPopup(this._id + "_" + _type_, {parent:$("#mainPage"), target:this.card, options:items, type:'lefttop', display_zone: $('#contentsContainer')});
                break;
            case 'fanSpeed':
                this._speedSlideUp = new SlideUpMenu(this._id + "_" + _type_, {parent:_parent_, items:items});
                break;
            case 'fanOscil':
                this._oscilSlideUp = new SlideUpMenu(this._id + "_" + _type_, {parent:_parent_, items:items});
                break;
            default:
                LoggerE('Not Defined List ' + _type_);
                return;
        }
    }

    get modeList() {
        return this._modeSlideUp;
    }

    get unit() {
        return this._unit;
    }

    setUnit(_value_) {
        this._unit = _value_;
        this._ele._degreeUnit.text("°" + this._unit);
    }

    get modeButton() {
        if (this._ele._modeButton) {
            return this._ele._modeButton;
        } else {
            LoggerW('[SystemAirconditioner] : Mode button is not defined.');
            return undefined;
        }
    }

    get powerButton() {
        if (this._ele._powerButtonWrapper) {
            return this._ele._powerButtonWrapper;
        } else {
            LoggerW('[SystemAirconditioner] : Power button is not defined.');
            return undefined;
        }
    }

    get fanSpeedCard() {
        if (this._ele._fanSpeedWrapper) {
            return this._ele._fanSpeedWrapper;
        } else {
            LoggerW('[SystemAirconditioner] : FanSpeed is not defined.');
            return undefined;
        }
    }

    get fanOscilCard() {
        if (this._ele._fanOscillationWrapper) {
            return this._ele._fanOscillationWrapper;
        } else {
            LoggerW('[SystemAirconditioner] : FanOscillation is not defined.');
            return undefined;
        }
    }

    airconditioner_bg(_value_, _transition_ = false) {
        if (!this._attr.power) {
            return;
        }
        let _degree_ = parseInt(_value_);

        if (_transition_) {
            this.card.addClass('iot_AirconditionerCtrlCard_background_transition');
        } else {
            this.card.removeClass('iot_AirconditionerCtrlCard_background_transition');
        }

        switch (_degree_) {
            case 17:    this.setBgColor('#002E96'); break;
            case 18:    this.setBgColor('#02339C'); break;
            case 19:    this.setBgColor('#043BA7'); break;
            case 20:    this.setBgColor('#0745B3'); break;
            case 21:    this.setBgColor('#0A50C1'); break;
            case 22:    this.setBgColor('#0F5CCD'); break;
            case 23:    this.setBgColor('#1368D8'); break;
            case 24:    this.setBgColor('#1876E1'); break;
            case 25:    this.setBgColor('#1F86E9'); break;
            case 26:    this.setBgColor('#2798F1'); break;
            case 27:    this.setBgColor('#2EA7F7'); break;
            case 28:    this.setBgColor('#33B4FC'); break;
            case 29:    this.setBgColor('#36BBFF'); break;
            default:
                if (_degree_ < 17) {
                    this.setBgColor('#002E96');
                } else if (_degree_ > 29) {
                    this.setBgColor('#36BBFF');
                } else {
                    LoggerE("[ERROR] Cannot detect the Temperature : " + _degree_);
                }
        }
    }

    _onClickPower() {
        if (this._attr.power) {
            // power off
            this.off();
            if (this.eventList.off) {
                this.eventList.off();
            }
        } else {
            this.on(true);
            if (this.eventList.on) {
                this.eventList.on();
            }
        }

        this._ele._powerPendingWrapper.activate(true, { transparent: true });
        this.noEventDuringProcessing(true);

        this._ele._powerButton.hide();
    }

    _onClickMode(_idx_) {
        this._modeSlideUp.highlight(this.modeButton.label);
        this._modeSlideUp.show();
        /*
        if (HNView && HNView.pageCtrl) {
            HNView.pageCtrl.pushDlg(this._modeSlideUp, false);
        }
        */
    }

    _onClickSpeed(_idx_) {
        this._speedSlideUp.highlight(this._ele._fanSpeedFunc.text());
        this._speedSlideUp.show();
        /*
        if (HNView && HNView.pageCtrl) {
            HNView.pageCtrl.pushDlg(this._speedSlideUp, false);
        }
        */
    }

    _onClickOscil(_idx_) {
        this._oscilSlideUp.highlight(this._ele._fanOscillationFunc.text());
        this._oscilSlideUp.show();
        /*
        if (HNView && HNView.pageCtrl) {
            HNView.pageCtrl.pushDlg(this._oscilSlideUp, false);
        }
        */
    }

    _setMode(_idx_) {
        LoggerI("[SystemAirconditioner] Mode : " + _idx_);
        this._modeSlideUp.hide();
        //HNView.pageCtrl.popDlg(this._modeSlideUp.id);

        this.modeButton.removePress();
        this.modeButton.hideText(true);
        this.noEventDuringProcessing(true);
        this._ele._modePendingWrapper.activate(true, { transparent: true });

        if (this.eventList.mode) {
            this.eventList.mode(_idx_);
        }
    }

    _setTemperature(_value_) {
        LoggerI("[SystemAirconditioner] Set Temperature : " + _value_);
        this.noEventDuringProcessing(true);
        this._ele._temperatureDegree.faint(true);
        this._ele._temperaturePendingWrapper.activate(true, { transparent: true });

        if (this.eventList.temperature) {
            this.eventList.temperature(_value_);
        }
    }

    _setSpeed(_idx_) {
        LoggerI("[SystemAirconditioner] Fan Speed : " + _idx_);
         this._speedSlideUp.hide();
        //HNView.pageCtrl.popDlg(this._speedSlideUp.id);
        this.noEventDuringProcessing(true);
        this._ele._speedPendingWrapper.activate(true, { transparent: true });
        this._ele._fanSpeedFunc.addClass('hideText');

        if (this.eventList.fanSpeed) {
            this.eventList.fanSpeed(_idx_);
        }
    }

    _setOscil(_idx_) {
        LoggerI("[SystemAirconditioner] Fan Oscillation : " + _idx_);
         this._oscilSlideUp.hide();
        //HNView.pageCtrl.popDlg(this._oscilSlideUp.id);
        this.noEventDuringProcessing(true);
        this._ele._oscilPendingWrapper.activate(true, { transparent: true });
        this._ele._fanOscillationFunc.addClass('hideText');

        if (this.eventList.fanOscil) {
            this.eventList.fanOscil(_idx_);
        }
    }

    async on() {
        LoggerI("[SystemAirconditioner] : ON");
        this._attr.power = true;

        this.airconditioner_bg(this._ele._temperatureDegree._getCurrent(), true);

        this._ele._powerPendingWrapper.deactivate();
        this.noEventDuringProcessing(false);

        setSvg(this._ele._powerButton, 'device_sac_ic', { color: this._maskColor.selected });
        this._ele._powerButton.show();

        if (this.modeButton) {
            this.modeButton.setDim(false);
            this.modeButton.wrapper.removeClass('no_event');
        }

        if (this._ele._temperatureDegree) {
            this._ele._temperatureDegree.container.removeClass('no_event');
        }

        this._ele._powerButtonWrapper.removeClass('off');

        this._ele._wrapper.removeClass('off');
        this._ele._wrapper.addClass('on');

        // At the first loading, VI shooud be disabled.
        // if (this._attr.mode === undefined) {
        //     this._ele._onWrapper.show();
        //     this._ele._offWrapper.hide();
        // } else {
        //     this._ele._offWrapper.fadeOut(330);
        //     this._ele._onWrapper.fadeIn(330);
        // }
        this._ele._infoText.removeClass('disable_text');
        this._ele._onWrapper.removeClass('disable_text');

        if (this._ele._bottomWrapper) {
            this._ele._bottomWrapper.removeClass('off no_event');
        }

        this.setBgAnimation("iot_Airconditioner_background_animation");
    }

    async off() {
        LoggerI("[SystemAirconditioner] : OFF");

        if (this._attr.power === true) {
            this._attr.power = false;
            this.card.addClass('iot_AirconditionerCtrlCard_background_transition');
        }

        HNView.pageCtrl.closeTopDlg();
        this.setBgColor(this._offBGColor);

        this._ele._powerPendingWrapper.deactivate();
        this.noEventDuringProcessing(false);

        setSvg(this._ele._powerButton, 'device_sac_ic', { color: this._maskColor.normal });
        this._ele._powerButton.show();

        if (this.modeButton) {
            this.modeButton.setDim(true);
            this.modeButton.wrapper.addClass('no_event');
        }

        if (this._ele._temperatureDegree) {
            this._ele._temperatureDegree.container.addClass('no_event');
        }

        this._ele._powerButtonWrapper.addClass('off');

        this._ele._wrapper.removeClass('on');
        this._ele._wrapper.addClass('off');

        // At the first loading, VI shooud be disabled.
        // if (this._attr.mode === undefined) {
        //     this._ele._offWrapper.show();
        //     this._ele._onWrapper.hide();
        // } else {
        //     this._ele._onWrapper.fadeOut(330);
        //     this._ele._offWrapper.fadeIn(330);
        // }
        this._ele._infoText.addClass('disable_text');
        this._ele._onWrapper.addClass('disable_text');

        if (this._ele._bottomWrapper) {
            this._ele._bottomWrapper.addClass('off no_event');
        }

        this.setBgAnimation();
    }

    async setMode(_label_) {
        LoggerI("[SystemAirconditioner] : Set Mode to " + _label_);
        this._attr.mode = _label_;
        this.noEventDuringProcessing(false);
        this.modeButton.hideText(false);
        this.modeButton.setLabel(_label_);
        this._ele._modePendingWrapper.deactivate();
    }

    async setTemperature(_value_) {
        LoggerI("[SystemAirconditioner] : Set Temperature to " + _value_);
        this._attr.temperature = _value_;
        this.noEventDuringProcessing(false);
        if (this._attr.temperature != this._ele._temperatureDegree._getCurrent()) {
            this._ele._temperatureDegree._setNumber(this._attr.temperature);
        }
        this._ele._temperatureDegree.faint(false);
        this._ele._temperaturePendingWrapper.deactivate();
    }

    async setSpeed(_label_) {
        LoggerI("[SystemAirconditioner] : Set Speed to " + _label_);
        this._attr.fanSpeed = _label_;
        this.noEventDuringProcessing(false);
        this._ele._fanSpeedFunc.removeClass('hideText');
        this._ele._speedPendingWrapper.deactivate();
        if (_isString(_label_)) {
            this._ele._fanSpeedFunc.text(_label_);
        }
    }

    async setOscil(_label_) {
        LoggerI("[SystemAirconditioner] : Set Oscilation to " + _label_);
        this._attr.fanOscillation = _label_;
        this.noEventDuringProcessing(false);
        this._ele._fanOscillationFunc.removeClass('hideText');
        this._ele._oscilPendingWrapper.deactivate();
        if (_isString(_label_)) {
            this._ele._fanOscillationFunc.text(_label_);
        }
    }

    resize(){
        LoggerI("[SystemAirconditioner] : resize");
        super.resize();

    }

    _onRotate() {
        super._onRotate();
        HNView.pageCtrl.closeTopDlg();
    }
}

class ColorTemperatureCard extends Card {
    constructor(id, {parent, title, style, colorCodes, dimmedColorCodes} = {}) {
        super(id, {title});
        this._class = 'ColorTemperatureCard';
        this._parent = parent;
        this._ele = {};
        this._style = style;
        this._colorCodes = colorCodes;
        this._dimmedColorCodes = dimmedColorCodes;
        this._paletteItems = [];
        this._value = undefined;
        this._eventList = {
            "colorTemperature": function () { }
        };
        this._ele.colorTemperaturePendingWrapper = undefined;
    }

    init() {
        super.init();
        this._ele._contents.append(
            Dom.div({ className: 'iot-ColorTemperature__wrapper', 'role':'note'},
                this._ele.palette = $(Dom.div({ className: 'iot-ColorTemperature__palette-wrapper', 'role':'listbox'})),
                    Dom.div({ className: 'iot-ColorTemperature__indicator-wrapper'},
                        $(Dom.div({ className: 'iot-ColorTemperature__indicator-text roboto-medium'},
                            this._ele.indicatorText = $(Dom.span({className: '' }, "4000K"))
                        )),
                        Dom.div({ className: 'iot-ColorTemperature__anchor'},
                            this._ele.anchor = $(Dom.div({className:''}))
                        )
                    ),
                this._ele.legend = $(Dom.div({className:'iot-ColorTemperature__legend table'}))
            )
        );

        // this._ele.anchorImg = addColorMaskImage(this._ele.anchor, './res/png/light/device_ic_color_temperature_arrow.svg', '#252525');
        appendSvg(this._ele.anchor, 'device_ic_color_temperature_arrow', { color: '#252525', attr:{'aria-hidden':'true'}});

        let idx = 1;

        for (const code of this._colorCodes) {
            let color = $(Dom.div({id:"colorTempPaletteColor_" + idx ,
                className: 'iot-ColorTemperature__palette-color', 'role':'option', 'aria-label':C_('VA_COLOR_TEMP_LEVEL') + idx}));
            color.on("click", this.onClickPalette.bind(this, idx));
            color.css("background", code);
            this._ele.palette.append(color);

            this._paletteItems.push(color);

            //Legend !!
            let legendText = " ";
            if (idx === 1 || idx === this._colorCodes.length) {
                legendText = String(idx);
                // VA
                this._ele.legend.attr('aria-label', legendText);
            }
            let legendItem = $(Dom.span({className: '', 'aria-hidden':'true'}, legendText));
            this._ele.legend.append(legendItem);
            idx++;
        }


        this._ele.colorTemperaturePendingWrapper = new Barrier(this._ele._contents, {loaderSize:"small"});
        this._parent.append(this.container);
    }

    onClickPalette(idx) {
        if (this._value && this._value === idx) {
            LoggerD("click same palette color!");
            return;
        }

        this.setColorTemperature(idx);
        this._ele.colorTemperaturePendingWrapper.activate(true);

        if (_isFunction(this._eventList["colorTemperature"])) {
            this._eventList["colorTemperature"](idx);
        }
    }

    setColorTemperature(_val_) {
        this._updateAnchorPosition(_val_);
        if (this._value !== _val_){
            this._value = _val_;
        }
    }

    setEvent(_type_, _func_) {
		this._eventList[_type_] = _func_;
    }

    _updateAnchorPosition(_val_) {
        LoggerD("update anchorPosition : " + _val_);
        if (this._ele.colorTemperaturePendingWrapper) {
            this._ele.colorTemperaturePendingWrapper.deactivate();
        }

        if (this._value === _val_) {
            return;
        }

        if (this._style === "palette") {
            let idx = _val_;
            let selectedPaletteColorObj = $("#colorTempPaletteColor_" + idx);
            if (selectedPaletteColorObj.length) {
                //border
                $(".iot-ColorTemperature__palette-color").removeClass("selected");
                // VA
                $(".iot-ColorTemperature__palette-color").attr("aria-selected","false");

                selectedPaletteColorObj.addClass("selected");
                // VA
                selectedPaletteColorObj.attr("aria-selected","true");
                if (this._dimmed) {
                    selectedPaletteColorObj.addClass("dim");
                }

                //anchor
                let selectedPaletteColorPosition = selectedPaletteColorObj.position();
                let paletteColorWidth = selectedPaletteColorObj.width() + 4; // 4px is border width
                this._ele.anchor.css("left", (selectedPaletteColorPosition.left + (paletteColorWidth/2)) - (this._ele.anchor.width() / 2) + "px");

                //text
                this._ele.indicatorText.text(String(_val_));
                setTimeout(() => {
                    let indicatorWidth = this._ele.indicatorText.width();
                    let delta = (paletteColorWidth - indicatorWidth)/2 + selectedPaletteColorPosition.left;
                    this._ele.indicatorText.css("left", delta + "px");
                }, 10);
            }
        }
    }

    setDimmed(value) {
        this._dimmed = value;
        if (value) {
            //change palette color to dimmed color
            this._paletteItems.forEach((v, k) => {
                let code = this._dimmedColorCodes[k];
                if (code)
                    v.css("background", code);

                if (v.hasClass('selected')) {
                    v.addClass('dim');
                }
            });
            this._ele.legend.addClass("dim");
            this._ele.indicatorText.addClass("dim");
        } else {
            this._paletteItems.forEach((v, k) => {
                let code = this._colorCodes[k];
                if (code)
                    v.css("background", code);

                if (v.hasClass('selected')) {
                    v.removeClass('dim');
                }
            });
            this._ele.legend.removeClass("dim");
            this._ele.indicatorText.removeClass("dim");
        }
    }
}

class StandbyPowerAutoShutCard extends Card {
    constructor(id, { parent, range, unit, step, dlgType } = {}) {
        super(id, {
            title: C_('SMARTPLUG_AUTOSHOT_TITLE'),
            icon_header: true,
            layout: 2
        });
        this._class = 'StandbyPowerAutoShutCard';
        this._ele = {};
        this._parent = parent;
        this._range = range;
        this._step = step ? step : 1;
        this._unit = unit || 'W';

        this._dlgType = dlgType ? dlgType : undefined;

        this._eventList = {
            enable: function () { },
            disable: function () { },
            setThreshold: function () { }
        };

        this._attr = {
            maxAllow: undefined,
            mode: undefined,
        }
    }

    init() {
        super.init();

        this._ele._contents.append(
            this._ele._message = $(Dom.div({ className: 'iot_StandbyPowerAutoShutCard__message'},
                this._ele._message_text = $(Dom.div({ className: 'iot_StandbyPowerAutoShutCard__message__text roboto-regular'}))
            )),
            this._ele._control_wrapper = $(Dom.div({ className: 'iot_StandbyPowerAutoShutCard__control'}))
        );

        this._ele._slider = new LinearSlider(this._ele._control_wrapper, 'AutoShut_Slider', this._range[0], this._range[1], {
            current: 20,
            unit: this._unit,
            step: this._step,
            updateFN: this.update.bind(this),
            dlgType: this._dlgType,
            dlgTitle: C_('SET_THRESHOLD')
        });
        this._ele._message_text.text(C_('SMARTPLUG_AUTOSHOT_INFORMATION'));

        this._ele._contents.addClass("iot_StandbyPowerAutoShutCard");

        this._ele._switchWrapper = $(Dom.div({ }));
        this._ele._switch = new SwitchButton(this._ele._switchWrapper, 'AutoShut', true, true, this.enable.bind(this), this.disable.bind(this));
        this.icon.addClass('switchButton');     // To Align the Button on the header
        this.icon.append(this._ele._switchWrapper);

        this._parent.append(this.container);

        this._ele._switchWrapper.on('click', this._onClickSwitch.bind(this));

        // VA
        this._ele._switch.wrapper.attr('aria-label', this.title);
    }

    setEvent(_type_, _func_) {
		this._eventList[_type_] = _func_;
    }

    _onClickSwitch() {
        LoggerI("[StandbyPowerAutoShutCard] Click Switch");

        this._ele._switch.activate();
        this.noEventDuringProcessing(true);

        if (this._attr.mode) {
            if (this._eventList.disable) {
                this._eventList.disable();
            }

        } else {
            if (this._eventList.enable) {
                this._eventList.enable();
            }
        }
    }

    enable() {
        LoggerI("[StandbyPowerAutoShutCard] Enable");
        this._ele._control_wrapper.slideDown();
        // Re-position the handle
        this._ele._slider.setCurrent(this._ele._slider.getCurrent());
    }

    disable() {
        LoggerI("[StandbyPowerAutoShutCard] Disable");
        this._ele._control_wrapper.slideUp();

    }

    update(_value_) {
        this._ele._slider.activate();
        this.noEventDuringProcessing(true);

        LoggerI("[StandbyPowerAutoShutCard] Update to " + _value_);
        if (this._eventList.setThreshold) {
            this._eventList.setThreshold(_value_);
        }
        return _value_;
    }

    async setValue(_value_) {
        LoggerI("[StandbyPowerAutoShutCard] Set to " + _value_);
        this._attr.maxAllow = _value_;
        this._ele._slider.setCurrent(_value_);

        this._ele._slider.deactivate();
        this.noEventDuringProcessing(false);
    }

    async setMode(_mode_) {
        LoggerI("[StandbyPowerAutoShutCard] setMode : " + _mode_);
        this._attr.mode = _mode_;
        this._ele._switch.value(_mode_);

        this._ele._switch.deactivate();
        this.noEventDuringProcessing(false);
    }
}

/*
 * Activity Card
 */
class ActivityListCard extends Card {
    constructor(id, {parent, title, fullscreen, replaceKeywords} = {}) {
        super(id, {title});
        this._class = 'ActivityListCard';
        this._fullscreen = fullscreen || false;
        this._activityLogList = [];

        this._ele = {};
        this._ele._parentDiv = parent;
        this._ele._moreButton = undefined;
        this._ele._activityListItem = [];
        this._clickFlag = false;
        this._replaceKeywords = replaceKeywords;
        this.init();
    }

    get ele() {
        return this._ele;
    }

    get contents() {
        return this._ele._contents;
    }

    get header() {
        return this._ele._header;
    }

    get moreButton() {
        return this._ele._moreButton;
    }

    set moreButton(ele) {
        this._ele._moreButton = ele;
    }

    init() {
        super.init();

        if(this._ele._contents) {
            this._ele._contents.addClass('activity-history scrollable');
        }

        if (this._fullscreen) {
            this.ele._card.addClass('full_screen');
            this.container.addClass('full_screen');
            this.contents.attr("data-scroll-direction","vertical");
        }

        if (_isJQuery(this._ele._parentDiv)) {
            this._ele._parentDiv.append(this._ele._container);
        }
    }

    updateList(activities) {
        if (activities) {
            //remove previous list.
            this.contents.children().remove();
            this._ele._activityListItem = [];

            this._activityLogList = activities;
            let count = 0;

            const date = Object.keys(this._activityLogList);
            /** sort in chronological order of date
             * take any item from the array for the date and compare with the other array item
             * arrary items are already sorted */
            date.sort((a, b) => this._activityLogList[b][0].epoch - this._activityLogList[a][0].epoch);
            date.forEach((key, index) => {
                count += this._activityLogList[key].length;
            });

            LoggerI("Total Activity Log:" + count);

            if (!this._activityLogList) {
                return;
            }

            if (count === 0) {
                this.showEmptyList();
                return;
            }

            let idx = 0;
            for (const activity of Object.keys(this._activityLogList)) {
                if (!this._ele._activityListItem[activity]) {
                    let section = $(Dom.div({ className: 'iot_ActivityList_section_header'},
                        Dom.div({ className: 'iot_ActivityList_section_header__text roboto-medium'}, activity)
                        // Dom.div({ className: 'iot_ActivityList_section_header__divider'})
                    ));
                    this.contents.append(section);

                    this._ele._activityListItem[activity] = $(Dom.ul({ className: 'iot_ActivityList_list'}));
                    this.contents.append(this._ele._activityListItem[activity]);
                }

                let items = this._activityLogList[activity];
                let keys = Object.keys(items);
                keys.forEach((v) => {
                    if (idx > 3 && this._fullscreen === false) {
                        return;
                    }
                    let item = {};
                    let strTime = items[v].time;
                    let strDesc = items[v].text;

                    if (this._replaceKeywords) {
                        for (var key in this._replaceKeywords) {
                            if (this._replaceKeywords[key]) {
                                strDesc = strDesc.replace(this._replaceKeywords[key].searchValue, this._replaceKeywords[key].newValue)
                            }
                        }



                        /*
                        let keywords = Object.keys(this._replaceKeywords);
                        keywords.forEach((keyword) => {
                            strDesc = strDesc.replace(keyword, this._replaceKeywords[keyword])
                        });
                        */

                    }

                    Dom.build(c => {
                        item._wrapper = $(c.li({ className: 'iot_ActivityList_list_item flex' },
                            item._icon = $(c.div({ className: 'iot_ActivityList_list_item__left-icon'})),
                            item._text = $(c.div({ className: 'iot_ActivityList_list_item__text roboto-regular'}, strDesc)),
                            item._time = $(c.div({ className: 'iot_ActivityList_list_item__right-text roboto-regular'}, strTime))
                        ));
                        setSvg(item._icon, 'ic_function_list', { color: '#252525', attr:{'aria-hidden':'true'}});
                        this._ele._activityListItem[activity].append(item._wrapper);
                    });
                    idx++;
                });

                if (idx > 3 && this._fullscreen === false) {
                    break;
                }
            }

            if (this._fullscreen === false && count > 3 && this.moreButton === undefined) {
                let divider = $(Dom.div({ className: 'iot_ActivityList_list_divider' }));
                let more = $(Dom.li({ className: 'iot_ActivityList_list_item flex button' },
                    Dom.div({className: 'iot_ActivityList_list_item__text more roboto-medium', 'role':'button'}, C_('ACTIVITY_LOG_MORE'))
                ));
                more.on("click", ()=> {
                    if (!this._clickFlag) {
                        HNView.showActivityPage(this._replaceKeywords);
                        setTimeout(() => {
                            //prevent double click
                            this._clickFlag = false;
                        }, 1000);
                        this._clickFlag = true;
                    }
                } );
                more.setRipple('list');
                this.card.append(divider);
                this.card.append(more);

                this.moreButton = more;
            }
        }

        //this.resize();
    }

    showEmptyList() {
        if (this._fullscreen === false) {
            let noList = $(Dom.li({className: 'iot_ActivityList_list_item flex'},
                Dom.div({className: 'ux2-card-list__no-item show'}, C_('ACTIVITY_NO_ACTIVITY'))
            ));
            this.contents.append(noList);
        }

        //this.resize();
    }

    resize() {
        //if (this._fullscreen === false) {
        //    super.resize();
        //}
    }
}

class LicenseCard extends Card {
    constructor(id, {parent, title, fullscreen} = {}) {
        super(id, {title});
        this._class = 'LicenseCard';
        this._fullscreen = fullscreen || false;

        this._ele = {};
        this._ele._parentDiv = parent;
        this._ele._activityListItem = [];
        this.init();
    }

    get ele() {
        return this._ele;
    }

    get contents() {
        return this._ele._contents;
    }

    get header() {
        return this._ele._header;
    }

    init() {
        super.init();

        if(this._ele._contents) {
            this._ele._contents.addClass('scrollable');
        }

        if (this._fullscreen) {
            this.ele._card.addClass('full_screen');
            this.container.addClass('full_screen');
            this.contents.attr("data-scroll-direction","vertical");
        }

        if (_isJQuery(this._ele._parentDiv)) {
            this._ele._parentDiv.append(this._ele._container);
        }
        if (document.licenseContents) {
            this.contents.html(document.licenseContents);
        } else {
            createScript("./res/LICENSE.js")
            .then(()=>{
                this.contents.html(document.licenseContents);
            });
        }
    }
}

class NotificationCard extends Card {
    constructor(id, { title, message } = {}) {
        super(id, {title});

        this._class = 'NotificationCardView';
        this._ele = {};
        this._message = message;
        this._title = title;
    }

    get message() {
        return this._message;
    }

    setMessage(message) {
        this._ele._message.html(message != null ? message : '');
    }

    get title() {
        return this._title;
    }

    setTitle(title) {
        this._ele._title.html(title != null ? title : '');
    }

    init() {
        Dom.build(c => {
            this._ele._container = $(c.div({ className: 'ux2-card-notification animatable' },
                c.div({ className: 'ux2-card-notification__wrapper' },
                    this._ele._title = $(c.div({ className: 'ux2-card-notification__title' })),
                    c.div({ className: 'ux2-card-notification__message' },
                        this._ele._message = $(c.div({ className: 'ux2-card-notification__message__text' }))
                    )
                )
            ));
        });

        super.init();
        if (this._title != null) {
            this.setTitle(this._title);
        }
        if (this._message != null) {
            this.setMessage(this._message);
        }
    }
}

class CurrentMeasurementCard extends Card {
    constructor(id, {title, parent, unit, expand, range, graph} = {}) {
        super(id, {
            'title': title,
            'icon_header': true,
            'layout': 2
        });
        this._class = 'CurrentMeasurementCard';
        this._ele = {};
        this._unit = unit ? unit : "°C";
        this._prefix_unit = "";
        this._parent = parent;
        this._expand = expand;
        this._range = range ? range : { from:0, to:50 };

        /*
         * this._graph_option = {
         *   'grpahType'     // 'BAR' or 'LINE'
         *   'float'         // allowance of floating point
         *   'descrete'      // false : continuous, .1 : 10% loss, .6 : 60% loss
         *   'dpRsc'         // DPResource to refer
         *   'homeInsight'   // Object to request the Statistics
         *   'getCurrentFN'  // Function to get the current value
         * }
         */
        this._graph_option = graph ? graph : undefined;
        this._graphType = graph ? (this._graph_option.graphType || 'BAR') : undefined;
        //Home Insight
        this._homeInsight = graph ? this._graph_option.homeInsight : undefined;

        this._eventList = {
            expand: function () {},
            period: function() {},
            refresh: function() {}
        };
    }

    init() {
        super.init();

        Dom.build(c => {
			this._ele._wrapper = $(c.div( { className: 'iot_CurrentMeasurementCard_wrapper'},
                this._ele._value = $(c.div( { className: 'iot_CurrentMeasurementCard_value roboto-regular'}))
            ))
            this._ele._contents.append(this._ele._wrapper);
		});

        if (this._expand && this._graph_option) {
            this.icon.on("click", () => {
                LoggerI("[CurrentMeasurementCard] this._expanded = " + this.expanded);
                this._onClickExpand(!this.expanded);
            });
            this.icon.addClass('ux2-card__header__button');
            this.icon.setRipple('circle', {size: 32});

            if (!this._graph_option) {
                LoggerD('[CurrentMeasurementCard] No Graph Type');
            }
            else if (this._graphType === "BAR") {
                LoggerD('[CurrentMeasurementCard] Bar Graph Type');
                setSvg(this.icon, 'ic_function_graph', { color: '#252525', attr:{'aria-hidden':'true'}});
            } else {
                LoggerD('[CurrentMeasurementCard] Line Graph Type');
                // Fixme: Line Graph Icon is Removed at GUI v0.64
                setSvg(this.icon, 'ic_function_graph', { color: '#252525', attr:{'aria-hidden':'true'}});
            }

        }

        // VA
        this.icon.attr('role','button');
        this.icon.attr('aria-label',C_('VA_GRAPH_LABEL'));

        this._ele.contentsPendingWrapper = new Barrier(this._ele._contents, {loaderSize:"small", topMost:true});
        this._parent.append(this.container);

        if (this._unit === 'C' || this._unit === 'F') {
            this._prefix_unit = "˚";
        } else if (this._unit === 'W') {
            this._prefix_unit = " ";
        }

    }

    setCurrent(_val_) {
        this._ele._value.text(_val_ + this._prefix_unit + this._unit);

        if (_val_ > this._range.to) {
            _val_ = this._range.to;
        } else if (_val_ < this._range.from) {
            _val_ = this._range.from;
        }
    }

    setEvent(_type_, _func_) {
		this._eventList[_type_] = _func_;
    }

    setPending(_val_) {
        if (this._ele.contentsPendingWrapper) {
            if (_val_) {
                this._ele.contentsPendingWrapper.activate(true);
            } else {
                this._ele.contentsPendingWrapper.deactivate(false);
            }
        }
    }

    setRightIcon(icon) {
        this._ele.rightIcon = $(Dom.div({ className: 'ux2-list-item__right-icon'}));
        if (icon) {
            appendSvg(this._ele.rightIcon, icon);
        }
        this._ele._wrapper.append(this._ele.rightIcon);

        return this._ele.rightIcon;
    }

    addRefreshButton() {
        let rightIcon = this.setRightIcon('ic_refresh');
        rightIcon.addClass('refresh_button');
        rightIcon.on('click', () => {
            if (this._eventList.refresh) {
                this._eventList.refresh();
            }
        });
    }

    getRightIcon() {
        return this._ele.rightIcon;
    }

    get expanded() {
        return this.container.hasClass('expanded');
    }

    expandCard(expanded) {
        LoggerI("[CurrentMeasurementCard] expandCard : " + expanded);
        if (!this._graph) {
            LoggerW("[CurrentMeasurementCard] No Graph to expand");
        } else {
            this._graph.show(expanded);
            this.container.toggleClass('expanded', expanded);
            this.resize();
        }
    }

    async generateGraph(attribute, data, { min, max, unit, negativeNumber }) {
        const createGraph = (id, type, attr) => {
            if (!this._graph) {
                if (type === 'LINE') {
                    this._graph = new LineGraph(id, attr, ['HOURLY', 'DAILY']);
                } else if (type === 'BAR') {
                    this._graph = new BarGraph(id, attr, ['FIVE_MINUTES', 'HOURLY', 'DAILY']);
                }
                this._graph.setOnPeriodTabClickedListener(this._onClickPeriod.bind(this));
                this.contents.append(this._graph.container);
            }

            this._graph.draw(data, { min, max, unit, negativeNumber, cardWidth:this.card.width()});
        };

        return new Promise((resolve, reject) => {
            try {
                if (Chart) {
                    createLineGraph(this.id, attribute);
                    resolve();
                }
            } catch(e) {
                createScript("lib/Chart.bundle.min.js")
                .then(()=>{
                    if (this._graphType === 'BAR') {
                        initChartJS();
                    }
                    createGraph(this.id, this._graphType, attribute);
                    resolve();
                });
            }
        });
    }

    _getGraphPeriod() {
        if (this._graph){
            return this._graph.period;
        }

        if (this._graphType === 'BAR') {
            return "FIVE_MINUTES";
        } else {
            return "HOURLY";
        }
    }

    resize(immediate) {
        super.resize(immediate);

        if (this._graph && this._graph.resize) {
            this._graph.resize();
        }
    }

    _onClickPeriod(attribute, period) {
        LoggerI("[CurrentMeasurementCard] click Period :" + period);
        this._drawGraph(period);
    }

    _onClickExpand(expanded) {
        if (expanded) {
            (async () => {
                await this._drawGraph(this._getGraphPeriod());
                this.expandCard(true);
            })();
        } else {
            this.expandCard(false);
        }
    }

    async _drawGraph(period) {
        const options = {
            min: this._range[0],
            max: this._range[1],
            fp: this._graph_option.float,           // allowance of floating point
            descrete: this._graph_option.descrete,  // false : continuous, .1 : 10% loss, .6 : 60% loss
            unit: this._unit,
            attribute: this._graph_option.dpRsc.property
        };

        this.setPending(true);
        try {
            let data = await this._homeInsight.getStatistics(period, options, { type: this._graphType });
            LoggerI("[CurrentMeasurementCard] Statistics Length:" + data.length);
            await this.drawGraph(this._graph_option.dpRsc.property, data, period, this._graph_option.getCurrentFN());
        } catch (e) {
            LoggerE("get statistics failed...", e);
            this.setPending(false);
        }

        this.setPending(false);
    }

    async drawGraph(property, data, period, currentValue) {
        // migrate to graph data format
        let min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER;
        let unit = undefined;
        data = data.reduce((array, item) => {
            const value = item[property];
            if (!value) {
                return array;
            }

            if (value.min < min) {
                min = value.min;
            }
            if (value.max > max) {
                max = value.max;
            }

            array.push({
                t: item.endTime,
                y: item.interpolated ? null : value.avg
            });

            return array;
        }, []);

        // now item
        let currentTime = 0;
        if (this._graphType === 'BAR') {
            const time = new Date();
            switch (period) {
                case 'FIVE_MINUTES':
                    let minute = time.getMinutes();
                    if (minute % 10 >= 0 && minute % 10 < 5) {
                        minute = Math.floor(minute / 10) * 10;
                    } else if (minute % 10 >= 5 && minute % 10 < 10) {
                        minute = Math.floor(minute / 10) * 10 + 5;
                    }

                    currentTime = time.setHours(time.getHours(), minute, 0, 0);
                    break;
                case 'HOURLY':
                    currentTime = time.setHours(time.getHours(), 0, 0, 0);
                    break;
                case 'DAILY':
                    currentTime = time.setHours(0, 0, 0, 0);
                    break;
                default:
                    break;
            }
        } else {
            currentTime = Date.now();
        }

        if (this._graphType === 'BAR') {
            if (data.length === 0 || data[data.length - 1].t < currentTime) {
                if (data.length === 0) {
                    min = max = 0;
                }
                data.push({
                    t: currentTime,
                    y: null
                });
            }
        } else if (this._graphType === 'LINE') {
            if (currentValue < min) {
                min = currentValue;
            }
            if (currentValue > max) {
                max = currentValue;
            }

            data.push({
                t: currentTime,
                y: currentValue
            });
        }

        if (!unit) {
            // unit = this._graph_option.dpRsc.unit;
            unit = this._unit;
        }

        const negativeNumber = this._range && this._range[0] < 0;
        return this.generateGraph(this._graph_option.dpRsc, data, { min, max, unit, negativeNumber });
    }
}

/** InformationCard */
class InformationCard extends Card {
    /**
	 * Create a Additional Information Card.
	 * @param {String}	id	 	    - The ID of this Card.
	 * @param {Object}	parent	 	- (optional) The Parent Element which this card will be appended
     * @param {String}	message	 	- (optional) The message of this card
     * @param {Boolean}	header	 	- (optional) Whether there is a header area. Default True
     * @param {String}	title	 	- (optional) The title of this card.
	 */
    constructor(id, { parent, message, header = true, title } = {}) {
        super(id, { title : title || C_("INFORMATION_CARD_TITLE") });
        this._class = 'InformationCardView';
        this._ele = {};

        this._parent = parent;
        this._message = message;
        this._header = header;
    }

    get message() {
        return this._message;
    }

    set message(msg) {
        if (_isString(msg)) {
            this._message = msg;
            if (this._ele._message_text) {
                this._ele._message_text.html(this._message);
            }
        }
    }

    init() {
        super.init();
        this._ele._contents.addClass("information");
        this._ele._contents.append(
            this._ele._message = Dom.div({ className: 'ux2-card-information__message'},
                this._ele._message_text = $(Dom.div({ className: 'ux2-card-information__message__text roboto-regular'}))
        ));

        if (this._message) {
            this.message = this._message;
        }

        if (!this._header) {
            this._ele._header.remove();
        }

        this._parent.append(this.container);
    }
}

/** CautionCard */
class CautionCard extends InformationCard {
    /**
	 * Create a Caution Card.
	 * @param {String}	id	 	    - The ID of this Card.
	 * @param {Object}	parent	 	- (optional) The Parent Element which this card will be appended
     * @param {String}	message	 	- (optional) The message of this card
	 */
    constructor(id, { parent, message } = {}) {
        super(id, { parent, message, header:false });
        this._class = 'CautionCardView';
    }

    init() {
        super.init();

        // About Content
        this._ele._contents.addClass("caution");
        this._ele._message.prepend(
            this._ele._caution_icon = Dom.div({ className: 'ux2-card-information__message__text caution__icon', 'role':'img'})
        );
        appendSvg(this._ele._caution_icon, 'device_ic_info_alert_red', {attr:{'aria-hidden':'true'}});

        if (this._ele._message_text) {
            this._ele._message_text.addClass('caution__text');
        }

        // VA
        $(this._ele._caution_icon).attr('aria-label', C_('VA_CAUTION_ICON_LABEL'));
    }
}

/** DeviceInformationCard */
class DeviceInformationCard extends InformationCard {
    /**
	 * Create a Device Information Card.
	 * @param {String}	id	 	    - The ID of this Card.
	 * @param {Object}	parent	 	- (optional) The Parent Element which this card will be appended
     * @param {String}	message	 	- (optional) The message of this card
     * @param {Object}	image	 	- (optional) The path of the image if the card includes the image information.
	 */
    constructor(id, { parent, message, image } = {}) {
        super(id, { parent, message, header:false });
        this._class = 'DeviceInformationCardView';
        this._image = image || undefined;
    }

    init() {
        super.init();

        if (this._image) {
            this._ele._message.append(
                Dom.div({ className: 'ux2-card-information__image', 'role':'img', 'aria-label': C_("INFORMATION_CARD_TITLE")},
                    Dom.img({ src: this._image }))
                );
        }
    }
}

class CSCard extends InformationCard {
    /**
	 * Create a Device Information Card.
	 * @param {String}	id	 	    - The ID of this Card.
	 * @param {Object}	parent	 	- The Parent Element which this card will be appended
     * @param {String}	provider	- The data of this provider
	 */
    constructor(id, { parent, provider, image } = {}) {
        let name = undefined;
        let contact = undefined;

        if (provider) {
            if (provider.locale) {
                let localeDatas = provider.locale[LocaleCode];
                if (localeDatas && localeDatas.language) {
                    if (localeDatas.language['name']) {
                        name = localeDatas.language['name'];
                    }
                }

                if (name === undefined && window.provider.name) {
                    name = window.provider.name;
                }

            } else {
                name = window.provider.name;
            }
            contact = provider.contact;
        }

        let message = C_('CS_CARD_DESCRIPTION', name, name, contact);

        super(id, { parent, message, header:false });
        this._class = 'CSCardView';
    }

    init() {
        super.init();
    }
}

/** BixbyCard */
class BixbyCard extends InformationCard {
    /**
	 * Create a Bixby Card.
	 * @param {String}	id	 	    - The ID of this Card.
	 * @param {Object}	parent	 	- (optional) The Parent Element which this card will be appended
     * @param {String}	message	 	- (optional) The message of this card
	 */
    constructor(id, { parent, message } = {}) {
        super(id, { parent, message, title:C_("BIXBY_CARD_TITLE") });
        this._class = 'BixbyCardView';
    }

    init() {
        super.init();
        this._ele._contents.removeClass("information");

        // About Header
        this._ele._header_icon = Dom.div({ className: 'iot_Card_Header__icon', role:'img'});
        appendSvg(this._ele._header_icon, 'ic_info_bixby', { attr:{'aria-hidden':'true'}});
        this.header.prepend(this._ele._header_icon);

        // VA
        $(this._ele._header_icon).attr('aria-label',C_('VA_BIXBY_ICON_LABEL'));
    }
}

/** GroupedDevicesCard */
class GroupedDevicesCard extends InformationCard {
    constructor(id, { parent, type = 'list' } = {}) {
        super(id, { parent, title:C_("CONNECTED_DEVICE_CARD_TITLE") });
        this._class = 'GroupCardView';
        this._type = type;

        this._device_list = [];

        this._icon = {
            light: 'ic_device_light_on_56x56',
            gasvalve: 'ic_device_gas_valve_on_56x56'
        }
    }

    init() {
        super.init();
        this._ele._contents.removeClass("information");

        this._ele._message.remove();

        if (this._type === 'list') {
            this.contents.addClass('no_padding');
            this._ele._device_list_wrapper = $(Dom.div({className: 'ux2-card-grouped-devices__list_contents'}));
            this._ele._contents.append(this._ele._device_list_wrapper);
        } else { // Icon Type
            this._ele._device_list_wrapper = $(Dom.div({className: 'ux2-card-grouped-devices__icon_contents'}));
            this._ele._contents.append(this._ele._device_list_wrapper);
        }
        this._parent.append(this.container);
    }

    addDevice(deviceType, deviceName, location) {
        this._device_list.push({
            type: deviceType,
            name: deviceName,
            location : location
        });

        if (this._type === 'list') {
            if (this._device_list.length > 1) {
                this._ele._divider = Dom.div({className: 'ux2-card-grouped-devices__divider'});
                this._ele._device_list_wrapper.append(this._ele._divider);
            }
            let item = new List_DevicePlugin(this._ele._device_list_wrapper, deviceName, location);

            switch (deviceType) {
                case "light" :
                    item.set_icon(this._icon.light);
                    break;
                case "valve" :
                case "gas" :
                    item.set_icon(this._icon.gasvalve);
                    break;
                default :
                    LoggerE("Cannot Find Image for Grouped Device");
            }
        } else { // Icon Type
            this._ele._device_list_wrapper.append(
                Dom.div({className: 'grouped-devices__item', 'role':'note', 'aria-label': deviceName},
                    Dom.div({className: 'grouped-devices__item-image'},
                        this._ele._icon = Dom.div({ })
                    ),
                    Dom.div({className: 'grouped-devices__item-text'}, deviceName)
                )
            );

            this._ele._device_list_wrapper.css('column-count', this._device_list.length);
            this._ele._device_list_wrapper.css('column-rule', '1px solid #D6D6D6');

            switch (deviceType) {
                case "light" :
                    appendSvg(this._ele._icon, this._icon.light);
                    break;
                case "valve" :
                case "gas" :
                    appendSvg(this._ele._icon, this._icon.gasvalve);
                    break;
                default :
                    LoggerE("Cannot Find Image for Grouped Device");
            }
        }
    }
}

class TimerAndScheduleAutomationCard extends Card {
    constructor(id, {parent, title, style, automations = [], locationId, capabilityUri, deviceId, propertyName, rt, value} = {}) {
        super(id, {title});
        this._class = 'AutomationCard';
        this._parent = parent;
        this._style = style;

        this._ele = {};
        this._eventList = {
        };

        this._is24HFormat = undefined;

        this._automations = automations;
        this._automationItems = [];

        this._capability = {};
        this._capability.device = {id: deviceId, locationId: locationId};
        this._capability.property = {name:propertyName};
        this._capability.uri = capabilityUri;
        this._capability.rt = rt;
        this._capability.value = value;

        this._manager = new AutomationManager(locationId, capabilityUri, deviceId);
        this._listItems = [];

        this._exampleString = [C_('automation_timer_example_text'), C_('automation_example_text'), C_('automation_example_text2')];
        this._titleString = [C_('automation_timer'), C_('automation_power_on'), C_('automation_power_off')];

        this._buttonClicked = false; //prevent dobule click

        if (this._automations.length > 0) {
            let index = 0;
            for (const automation of this._automations) {
                const item = {
                    id: index,
                    name : automation,
                    title: this._titleString[index],
                    description: this._exampleString[index],
                    status: false,
                    automationId: null,
                    customTag: this._manager.generateCustomTag(automation),
                    automation: null,
                    switchClicked: false
                };
                this._automationItems.push(item);
                index++;
            }

            // add automation event lister for all automation id
            this._manager.addAutomationEventListener(null, this.onAutomationDataUpdated.bind(this));
        }

        this.buildLayout();

        this.update();
    }

    buildLayout() {
        super.init();

        this._list = new ListView(`${this.id}`, this.contents);
        this._list.setOnItemClickedListener(this.onItemClicked.bind(this));

       let index = 0;
        for (const item of this._automationItems) {
            //this._view.appendSwitch(item);
            const listItem = new List2LineTextAndSwitchItem(index, item.title,
                {
                    style: 'text',
                    description: item.description
                }
            );

            listItem.addSwitch(item.status);
            listItem.setOnItemSwitchListener(this.onSwitchClicked.bind(this, item));

            this.appendItem(listItem);
            this._listItems[index] = listItem;
            index++;
        }

        this._pending = new Barrier(this.contents, { });

        this.contents.addClass('no_padding');
        if (this._parent)
            this._parent.append(this.container);
    }

    appendItem(item) {
        this._list.appendItem(item);
    }

    setPending(value) {
        if (value) {
            this._pending.activate(false,{transparent: true});
        } else {
            this._pending.deactivate();
        }
    }

    /* called by view */
    async onItemClicked(id) {
        //this._pending.activate(false,{transparent: true});
        const state = this._listItems[id].getSwitchState();
        if (this._is24HFormat === undefined) {
            this._is24HFormat = await is24HoursFormat();
        }

        LoggerI(`TimerAndScheduleAutomationCard.onItemClicked] id : ${id}, previous switch state : ${state}`);
        if (this._automationItems[id].customTag === this._manager.generateCustomTag('Timer')) {

            if (this._automationItems[id].automationId != null) {
                LoggerD("switch off case");
                this._listItems[id].setSwitchState(false);
                if (this._listItems[id]) {
                    this._listItems[id].setSwitchPending(true);

                    try {
                        await this._automationItems[id].automation.delete();
                    } catch (e) {
                        LoggerE(`[${this._class}.onItemClicked] Automation.delete() failed : ${e.message}`);
                    }

                    this._listItems[id].setSwitchPending(false);
                }
            } else {
                LoggerD("show Timmer Setting Page");
                let timerPage = new AutomationSettingPage("timerSetting");
                timerPage.onCreate({
                        index: id,
                        name: 'Timer',
                        title: this._automationItems[id].title,
                        automation: null,
                        is24HFormat: this._is24HFormat,
                        capability: this._capability
                    });

                timerPage.addEvent('back', (result) => {
                    if (result && result.res === false) {
                        // revert toggle button state
                        if (this._automationItems[result.index].automationId == null) {
                            this._automationItems[result.index].state = false;
                            this.render();
                        }
                    }
                    history.back();
                });

                timerPage.addEvent('ok', (result) => {
                    if (result.res === false) {
                        // revert toggle button state
                        if (this._automationItems[result.index].automationId == null) {
                            this._automationItems[result.index].state = false;
                            this.render();
                        }
                    }

                    history.back();
                });

                HNView.pageCtrl.push(timerPage);
            }

            this._buttonClicked = false;
        } else if (this._automationItems[id].customTag === this._manager.generateCustomTag('PowerOn')) {
            if (this._automationItems[id].automationId == null || this._automationItems[id].switchClicked === false) {
                // if automationId is null => go to AutomationSettingPage for create automation
                // if switchClicked is false => go to AutomationSettingPage for edit automation

                let powerOnPage = new AutomationSettingPage("PowerOn");
                powerOnPage.onCreate({
                        index: id,
                        name: 'PowerOn',
                        title: this._automationItems[id].title,
                        time: this._automationItems[id].automationId != null ? this._automationItems[id].automation.timeCondition.time : null,
                        days: this._automationItems[id].automationId != null ? this._automationItems[id].automation.timeCondition.days : null,
                        automation: this._automationItems[id].automation,
                        is24HFormat:this._is24HFormat,
                        capability: this._capability
                    });

                powerOnPage.addEvent('back', () => {
                    history.back();
                });

                powerOnPage.addEvent('ok', (result) => {
                    if (result.res === false) {
                        // revert toggle button state
                        if (this._automationItems[result.index].automationId == null) {
                            this._automationItems[result.index].state = false;
                            this.render();
                        }
                    }
                    history.back();
                });

                HNView.pageCtrl.push(powerOnPage);
            }
        } else if (this._automationItems[id].customTag === this._manager.generateCustomTag('PowerOff')) {
            if (this._automationItems[id].automationId == null || this._automationItems[id].switchClicked === false) {
                let powerOffPage = new AutomationSettingPage("PowerOff");
                powerOffPage.onCreate({
                        index: id,
                        name: 'PowerOff',
                        title: this._automationItems[id].title,
                        time: this._automationItems[id].automationId != null ? this._automationItems[id].automation.timeCondition.time : null,
                        days: this._automationItems[id].automationId != null ? this._automationItems[id].automation.timeCondition.days : null,
                        automation: this._automationItems[id].automation,
                        is24HFormat:this._is24HFormat,
                        capability: this._capability
                    });

                powerOffPage.addEvent('back', () => {
                    history.back();
                });

                powerOffPage.addEvent('ok', (result) => {
                    if (result.res === false) {
                        // revert toggle button state
                        if (this._automationItems[result.index].automationId == null) {
                            this._automationItems[result.index].state = false;
                            this.render();
                        }
                    }
                    history.back();
                });

                HNView.pageCtrl.push(powerOffPage);
            }
        }

        this._automationItems[id].switchClicked = false;
    }

    async onSwitchClicked(item, id, state) {
        LoggerD(`[TimerAndScheduleAutomationCard.onSwitchClicked] id: ${id} Switch Clicked! state: ${state}`);

        this._automationItems[id].switchClicked = true;

        if (this._automationItems[id].customTag === this._manager.generateCustomTag('Timer')) {
            this._buttonClicked = true;
            // do nothing...
        } else {
            // scheduler case
            if (this._automationItems[id].automationId !== null) {
                this._listItems[id].setSwitchState(state);
                if (state === false) {
                    // switch off case
                    this._listItems[id].setSwitchPending(true);
                    try {
                        await this._automationItems[id].automation.enable(false);
                    } catch (e) {
                        LoggerE(`[${this._class}.onSwitchClicked] Automation.enable(false) failed : ${e.message}`);
                    }

                    this._listItems[id].setSwitchPending(false);

                } else {
                    // switch on case
                    this._listItems[id].setSwitchPending(true);
                    try {
                        await this._automationItems[id].automation.enable(true);
                    } catch (e) {
                        LoggerE(`[${this._class}.onSwitchClicked] Automation.enable(true) failed : ${e.message}`);
                    }

                    this._listItems[id].setSwitchPending(false);

                }
            }
        }
    }

    /* called by AutomationManager */
    onAutomationDataUpdated(event, automationId, automation) {
        LoggerI(`[${this._class}.onAutomationDataUpdated] event : ${event}, automationId : ${automationId}, automation : ${JSON.stringify(automation)}`);

        const item = this._automationItems.find(item => item.automationId === automationId);
        if (event !== 'ADD' && !item) {
            // no interest...
            LoggerE("Impossible Case??");
            return;
        }

        if (event === 'ADD') {
            const item = this._automationItems.find(item => item.customTag === automation.customTag);
            if (item) {
                item.status = automation.enabled;
                item.automationId = automation.automationId;
                item.description = this.getTimeDescription(automation);
                item.automation = new Automation(automation);
                this.render();
            }
        } else if (event === 'UPDATE') {
            item.status = automation.enabled;
            item.automationId = automation.automationId;
            item.description = this.getTimeDescription(automation);
            item.automation = new Automation(automation);
        } else if (event === 'DELETE') {
            item.status = false;
            item.automationId = null;
            item.description = this._exampleString[item.id],
            item.automation = null;
        }

        this.render();
    }

    getTimeDescription(automation) {
        let description = null;

        description = automation.timeCondition.n;

        if (automation.customTag && automation.customTag.includes('Timer')) {
            const power = (automation.deviceActions[0].value === 'true' || automation.deviceActions[0].value === 'on') ? C_('automation_power_on') : C_('automation_power_off');
            description += (`, ${power}`);
        }

        return description;
    }

    async update() {
        this.setPending(true, true);

        for (let i = 0; i < this._automationItems.length; i++) {
            try {
                const result = await this.manager.getAutomationList(this._automationItems[i].customTag);
                if (result.length > 0) {
                    this._automationItems[i].status = result[0].enabled;
                    this._automationItems[i].automationId = result[0].automationId;
                    this._automationItems[i].description = this.getTimeDescription(result[0]);
                    this._automationItems[i].automation = result[0];
                }
            } catch (e) {
                LoggerE(`[${this._class}.getAutomationList] failed : ${e.message}`);
            }
        }

        this.render();
        this.setPending(false);
    }

    render() {
        for (const item of this._automationItems) {
            this._listItems[item.id].setDescription(item.description);
            this._listItems[item.id].setSwitchState(item.status);

            if (item.id !== 0 && item.automationId !== null) {
                this._listItems[item.id].showDivider(true);
            } else {
                this._listItems[item.id].showDivider(false);
            }
        }
    }

    get manager() {
        return this._manager;
    }
}

class RadioButtonCard extends Card {
    constructor(id, {parent, title, buttons = []}) {
        super(id);
        this._class = 'RadioButtonCard';
        this._ele = {};
        this._parent = parent;
        this._listItems = [];

        this._buttons = [];
        this._eventList = {
            click: function() {}
        };

        for (const button of buttons) {
            const item = {
                id: buttons.indexOf(button),
                title: button,
                description: button
            };

            this._buttons.push(item);
        }

        this.init()
    }

    init() {
        super.init();

        setDataAttr(this.contents, 'datasetContentsType', 'list');
        setDataAttr(this.contents, 'datasetItemCount', 0);
        this._list = new ListView(`${this.id}`, this.contents);
        this._radioGroup = new RadioGroup(`${this.id_}_RadioGroup`);

        //add button.
        for (const item of this._buttons) {
            const listItem = new List1LineTextRadioButtonItem(item.id, item.title, {radioGroup:this._radioGroup});
            listItem.addButton();
            this.appendItem(listItem);
            this._listItems[item.id] = listItem;

            listItem.button.addEvent("click", this.onButtonClicked.bind(this));
        }
        this.setSelectedButton(this._buttons[0].id); // set default button
        this._list.setOnItemClickedListener(this.onItemClicked.bind(this));
        this._parent.append(this.container);
    }

    set itemCount(count) {
        setDataAttr(this.contents, 'datasetItemCount', count);
    }

    appendItem(item) {
        this._list.appendItem(item);
    }

    setSelectedButton(id) {
        this._radioGroup.checkById(`${id}_radioButton`);
    }

    getSelectedButton() {
        return `${this._radioGroup.selected}`;
    }

    /* called by view */
    async onItemClicked(id) {
        LoggerD(`[####] Click ${id} Item of ${this._id}`);
        this.setSelectedButton(id);
        if (_isFunction(this._eventList.click)) {
            this._eventList.click(id);
        }
    }

    async onButtonClicked(id, checked) {
        LoggerD(`[####] Click ${id} Radio Button of ${this._id}`);
    }

    setOnButtonClickedListener(func) {
        if (_isFunction(func)) {
            this._eventList.click = func;
        }
    }
}

class DayPickerCard extends Card {
    constructor(id, {parent}) {
        super(id);
        this._class = 'DayPickerCard';
        this._ele = {};
        this._parent = parent;

        this._listeners = {};
        this._items = [];

        this._days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN,MON,TUE,WED,THU,FRI,SAT'];
        this._dayOfWeek = [
            C_('automation_sunday'),
            C_('automation_monday'),
            C_('automation_tuesday'),
            C_('automation_wednesday'),
            C_('automation_thursday'),
            C_('automation_friday'),
            C_('automation_saturday')
        ];
        this._items = [];

        this.buildLayout();
    }

    buildLayout() {
        super.init();
        setDataAttr(this.contents, 'datasetContentsType', 'list');

        let i = 0;
        for (const day of this._dayOfWeek) {
            const item = {
                index: i++,
                dayOfWeek: day,
                selected: false
            };
            this._items.push(item);
        }

        this._ele.pickerContainer = $(Dom.div({id: `${this._id}_container`, className:'ux2-iot-day-picker__container'}));
        this._ele.title_wrapper = $(Dom.div({id: `${this._id}_title`, className:'ux2-iot-day-picker__title__wrapper'}));
        this._ele.title = $(Dom.div({id: `${this._id}_title`, className:'ux2-iot-day-picker__title'}));
        this._ele.repeat = $(Dom.div({id: `${this._id}_title`, className:'ux2-iot-day-picker__repeat'}));
        this._ele.item_wrapper = $(Dom.div({id: `${this._id}_item_wrapper`, className:'ux2-iot-day-picker__item__wrapper'}));
        this._ele.item = [];

        this._parent.append(this.container);

        this.contents.append(this._ele.pickerContainer);

        this._ele.title_wrapper.append(this._ele.title);
        this._ele.title_wrapper.append(this._ele.repeat);
        this._ele.pickerContainer.append(this._ele.title_wrapper);
        this._ele.pickerContainer.append(this._ele.item_wrapper);
        this._ele.title.html(C_('automation_repeat'));

        for (const item of this._items) {
            const day = $(Dom.div({id: `${this._id}_item`, className:'ux2-iot-day-picker__day__item'}));
            day.html(item.dayOfWeek);
            this._ele.item_wrapper.append(day);
            this._ele.item.push(day);

            day.on('click', () => {
                day.toggleClass('clicked', !day.hasClass('clicked'));
                item.selected = day.hasClass('clicked');
                this._onItemClicked(item.index);
            });
        }
    }

    getDaysIndex() {
        let days = [];
        let everyday = true;

        for (const item of this._items) {
            if (item.selected === true) {
                days.push(item.index);
            } else {
                everyday = false;
            }
        }

        if (everyday === true) {
            days = [];
            days.push(7);
        }

        return days;
    }

    select(day) {
        if (day === 7) { // all day case
            for (let i = 0; i < 7; i++) {
                const element = this._ele.item[i];

                element.toggleClass('clicked', !element.hasClass('clicked'));
                this._items[i].selected = element.hasClass('clicked');
            }
        } else {
            const element = this._ele.item[day];

            element.toggleClass('clicked', !element.hasClass('clicked'));
            this._items[day].selected = element.hasClass('clicked');
        }
    }

    setRepeatType(repeat) {
        this._ele.title.html(repeat);
    }

    updateRepeatType() {
        let repeatType = '';
        let day = '';
        let count = 0;

        const fullDayOfWeek = [
            C_('automation_sunday_full'),
            C_('automation_monday_full'),
            C_('automation_tuesday_full'),
            C_('automation_wednesday_full'),
            C_('automation_thursday_full'),
            C_('automation_friday_full'),
            C_('automation_saturday_full')
        ];

        for (const item of this._items) {
            if (item.selected === true) {
                day = fullDayOfWeek[item.index];
                count++;
            }
        }

        if (count === 0) {
            repeatType = C_('automation_once');
        } else if (count === 1) {
            repeatType = C_(day);
        } else if (count === 7) {
            repeatType = C_('automation_every_day');
        } else if (count === 2 && (this._items[0].selected && this._items[6].selected) === true) {
            repeatType = C_('automation_weekends');
        } else if (count === 5 && (!this._items[0].selected && !this._items[6].selected) === true) {
            repeatType = C_('automation_weekdays');
        } else {
            repeatType = C_('');
        }

        this._ele.repeat.html(repeatType);
    }

    getDays() {
        let result = '';
        const selected = this.getDaysIndex();

        if (selected.length !== 0) {
            if (selected.length === 1 && selected[0] === 7) {
                result = 'SUN,MON,TUE,WED,THU,FRI,SAT';
            } else {
                for (const item of selected) {
                    result += this._days[item];
                    if (selected.indexOf(item) < selected.length - 1) {
                        result += ',';
                    }
                }
            }
        }

        return result;
    }

    update(data) {
        if (data) {
            const array = data.split(',');

            for (const item of array) {
                const index = this._days.indexOf(item);
                if (index > -1) {
                    this.select(index);
                }
            }
        }
        this.updateRepeatType();
    }

    _onItemClicked(id) {
        LoggerI(`[${this._class}] OnItemClicked : ${id}`);
        LoggerI(`[${this._class}] selected days : ${this.getDays()}`);

        this.updateRepeatType();

        if (this._listeners.onClicked) {
            this._listeners.onClicked(id);
        }
    }

    setOnItemClickedListener(listener) {
        this._listeners.onClicked = listener;
    }
}

class TimePickerCard extends Card {
    constructor(id, {parent, title, hour, min, is24HourFormat, normalOrder }) {
        super(id);
        this._class = 'TimePickerCard';
        this._ele = {};
        this._parent = parent;

        this._listeners = {};
        this._items = [];

        this._hour = hour !== undefined ? hour : 0;
        this._min = min !== undefined ? min : 0;

        this._previousScrolled = 0;
        this._is24HourFormat = is24HourFormat;
        this._normalOrder = normalOrder;
        this._previousHour = this.getTwelveHour(this._hour);

        this.buildLayout();
        this.container.toggleClass("hide", true);
    }

    buildLayout() {
        super.init();

        this._ele.pickerContainer = $(Dom.div({id: `${this._id}_picker_container`, className: 'ux2-iot-time-picker__container'}));

        this._ele.hour = {
            wrapper : $(Dom.div({id: `${this._id}_content__wrapper__hour`, className: 'ux2-iot-time-picker__content__wrapper'})),
            content : $(Dom.div({id: `${this._id}_content__hour`, className: 'ux2-iot-time-picker__content'})),
            table : $(Dom.div({id: `${this._id}_table__hour`, className: 'ux2-iot-time-picker__table'})),
            masking_top : $(Dom.div({id: `${this._id}_masking_top__hour`, className: 'ux2-iot-time-picker__masking'})),
            masking_bottom : $(Dom.div({id: `${this._id}_masking_bottom__hour`, className: 'ux2-iot-time-picker__masking'})),
            hourList: [],
            momentumScrollStopped: false,
            lastScroll: 0,
            currVal: 0,
            prevVal: 0
        }

        this._ele.colon = {
            wrapper: $(Dom.div({id: `${this._id}_content__colon__wrapper`, className: 'ux2-iot-time-picker__content__colon__wrapper'})),
            content: $(Dom.div({id: `${this._id}_content__colon`, className: 'ux2-iot-time-picker__content__colon'}))
        }

        this._ele.min = {
            wrapper: $(Dom.div({id: `${this._id}_content__wrapper__min`, className: 'ux2-iot-time-picker__content__wrapper'})),
            content: $(Dom.div({id: `${this._id}_content__min`, className: 'ux2-iot-time-picker__content'})),
            table: $(Dom.div({id: `${this._id}_table__min`, className: 'ux2-iot-time-picker__table'})),
            masking_top : $(Dom.div({id: `${this._id}_masking_top__min`, className: 'ux2-iot-time-picker__masking'})),
            masking_bottom : $(Dom.div({id: `${this._id}_masking_bottom__min`, className: 'ux2-iot-time-picker__masking'})),
            minList: [],
            momentumScrollStopped: false,
            lastScroll: 0,
            currVal: 0,
            prevVal: 0
        }

        this._ele.amPm = {
            wrapper: $(Dom.div({id: `${this._id}_content__wrapper__am__pm`, className: 'ux2-iot-time-picker__content__wrapper'})),
            content: $(Dom.div({id: `${this._id}_content__am__pm`, className: 'ux2-iot-time-picker__content'})),
            table: $(Dom.div({id: `${this._id}_table__am__pm`, className: 'ux2-iot-time-picker__table'})),
            masking_top : $(Dom.div({id: `${this._id}_masking_top__min`, className: 'ux2-iot-time-picker__masking'})),
            masking_bottom : $(Dom.div({id: `${this._id}_masking_bottom__min`, className: 'ux2-iot-time-picker__masking'})),
            amPmList: []
        }

        this._blockStart = null;
        this._diff = 0;
        this._height = 54; // TODO:

        this._parent.append(this.container);
        this.contents.append(this._ele.pickerContainer);

        this._ele.pickerContainer.append(this._ele.hour.wrapper);
        this._ele.hour.wrapper.append(this._ele.hour.content);

        this._ele.hour.masking_top.css('top', '20px');
        this._ele.hour.masking_bottom.css('top', '128px');

        this._ele.hour.wrapper.append(this._ele.hour.masking_top);
        this._ele.hour.wrapper.append(this._ele.hour.masking_bottom);

        this._ele.hour.content.append(this._ele.hour.table);

        this._ele.colon.content.html(':');
        this._ele.colon.wrapper.append(this._ele.colon.content);
        this._ele.pickerContainer.append(this._ele.colon.wrapper);

        this._ele.pickerContainer.append(this._ele.min.wrapper);

        this._ele.min.wrapper.append(this._ele.min.content);

        this._ele.min.masking_top.css('top', '20px');
        this._ele.min.masking_bottom.css('top', '128px');

        this._ele.min.wrapper.append(this._ele.min.masking_top);
        this._ele.min.wrapper.append(this._ele.min.masking_bottom);

        this._ele.min.content.append(this._ele.min.table);

        if (this._is24HourFormat === false) {
            this._ele.amPm.wrapper.append(this._ele.amPm.content);
            this._ele.amPm.masking_top.css('top', '20px');
            this._ele.amPm.masking_bottom.css('top', '128px');
            this._ele.amPm.wrapper.append(this._ele.amPm.masking_top);
            this._ele.amPm.wrapper.append(this._ele.amPm.masking_bottom);

            this._ele.amPm.content.append(this._ele.amPm.table);
            if (this._normalOrder === true) {
                this._ele.pickerContainer.append(this._ele.amPm.wrapper);
            } else {
                this._ele.amPm.wrapper.insertBefore(this._ele.hour.wrapper);
            }
            this._ele.amPm.table.css('top', '0px');

            this._ele.hour.content.addClass('amPm');
            this._ele.min.content.addClass('amPm');
            this._ele.amPm.content.addClass('amPm');

            this._ele.hour.masking_top.addClass('amPm');
            this._ele.hour.masking_bottom.addClass('amPm');
            this._ele.min.masking_top.addClass('amPm');
            this._ele.min.masking_bottom.addClass('amPm');
            this._ele.amPm.masking_top.addClass('amPm');
            this._ele.amPm.masking_bottom.addClass('amPm');
        }

        this._ele.min.table.css('top', `${-(this._height * 2)}px`);
        this._ele.hour.table.css('top', `${-(this._height * 2)}px`);

        this._scrollable = true;

        const timestamp = new Date(new Date().setHours(this._hour, this._min, 0, 0)).getTime();
        this.N = 8;
        this.mid = Math.floor((this.N - 1) / 2);
        this.midT = this.mid - 1;
        this.midB = this.mid + 1;

        for (let i = 0; i < this.N; i++) {
            this._ele.min.minList.push(
                {
                    element: $(Dom.input({id:`${this._id}_min_row_${i}`, className:'ux2-iot-time-picker__table__row'})),
                    timestamp: timestamp + (1000 * 60 * (i - ((this.N / 2) - 1)))
                }
            );
            const minute = new Date(timestamp + (1000 * 60 * (i - ((this.N / 2) - 1)))).getMinutes();
            this.setdefaultAttributes(this._ele.min.minList[i].element, this.getTwoDigitTime(minute));
            this._ele.min.table.append(this._ele.min.minList[i].element);
        }
        this._ele.min.prevVal = this._ele.min.currVal = this._ele.min.minList[this.mid].element.val();

        for (let i = 0; i < this.N; i++) {
            this._ele.hour.hourList.push(
                {
                    element: $(Dom.input({id:`${this._id}_hour_row_${i}`, className:'ux2-iot-time-picker__table__row'})),
                    timestamp: timestamp + (1000 * 60 * 60 * (i - ((this.N / 2) - 1)))
                }
            );
            this.setdefaultAttributes(this._ele.hour.hourList[i].element,
                this.getTwelveHour(new Date(timestamp + (1000 * 60 * 60 * (i - ((this.N / 2) - 1)))).getHours()));
            this._ele.hour.table.append(this._ele.hour.hourList[i].element);
        }
        this._ele.hour.prevVal = this._ele.hour.currVal = this._ele.hour.hourList[this.mid].element.val();

        if (this._is24HourFormat === false) {
            for (let i = 0; i < 4; i++) {
                this._ele.amPm.amPmList.push(
                        {
                            element: $(Dom.div({id:`${this._id}_ampm_row_${i}`, className:'ux2-iot-time-picker__table__row'})),
                            index: i
                        }
                    );

                let str = '';
                if (i === 1) {
                    str = C_('automation_am');
                } else if (i === 2) {
                    str = C_('automation_pm');
                }

                this._ele.amPm.amPmList[i].element.html(str);
                this._ele.amPm.amPmList[i].element.addClass('amPm');
                this._ele.amPm.table.append(this._ele.amPm.amPmList[i].element);
            }

            if (this._hour >= 12 && this._hour < 24 && this._hour !== 0) {
                this.changeAmPm('pm');
            } else {
               this.changeAmPm('am');
            }
        }

        this.startPoint = this._ele.min.content.scrollTop();
        this.setFocusEvents();

        this._ele.min.content.on('click', _e_ => {
            const top = Number(this._ele.min.content.offset().top);
            const y = Number(_e_.clientY);
            const diff = Number(y - top);

            if (diff > 0 && diff <= this._height) {
                this.appendTop(this._ele.min);
                this._ele.min.table.css('top', `${-(this._height * 2)}px`);
            } else if (diff > this._height && diff <= this._height * 2) {
                this._ele.min.minList[this.mid].element.prop("readonly", false);
                this._ele.min.minList[this.mid].element.focus();
                this._ele.min.minList[this.mid].element.select();
            } else if (diff > this._height * 2 && diff <= this._height * 3) {
                this.appendBottom(this._ele.min);
                this._startY -= 54;
                if (this._ele.min.content.scrollTop() > 0) {
                    this._ele.min.content.scrollTop(0, 162);
                } else {
                    this._ele.min.content.scrollTop(0, 0);
                }
            }
        });

        getHTMLElementFromJQuery(this._ele.min.table).addEventListener('touchstart',
            _e_ => {
                if (!this._scrollable) {
                    return false;
                }

                this._touchStart = _e_.touches[0].clientY;
                this._startY = this._ele.min.content.scrollTop() + _e_.touches[0].clientY;
                this._moved = false;
                this._ele.min.momentumScrollStopped = false;

                this._lastMoveStart = _e_.touches[0].clientY;
                this._lastMoveEnd = _e_.touches[0].clientY;
                this._lastMoveTime = _e_.timeStamp || Date.now();
                return true;
            },
            { passive: true }
        );

        getHTMLElementFromJQuery(this._ele.min.table).addEventListener('touchmove',
            _e_ => {
                if (!this._scrollable) {
                    return false;
                }
                this.updateScroller(_e_, this._ele.min);
                return true;
            },
            { passive: false }
        );

        getHTMLElementFromJQuery(this._ele.min.table).addEventListener('touchend',
            _e_ => {
                this._touchEnd = true;
                if (!this._scrollable) {
                    return false;
                }

                if (!this._moved) {
                    this._ele.min.table.addClass('transition');
                    return;
                }
                this.finilizeScroll(_e_, this._ele.min);
                return true;
            },
            { passive: true }
        );

        // hour
        this._ele.hour.content.on('click', _e_ => {
            const top = Number(this._ele.hour.content.offset().top);
            const y = Number(_e_.clientY);
            const diff = Number(y - top);

            if (diff > 0 && diff <= this._height) {
                this.appendTop(this._ele.hour, true);
                this._ele.hour.table.css('top', `${-(this._height * 2)}px`);
            } else if (diff > this._height && diff <= this._height * 2) {
                this._ele.hour.hourList[this.mid].element.prop("readonly", false);
                this._ele.hour.hourList[this.mid].element.select();
            } else if (diff > this._height * 2 && diff <= this._height * 3) {
                this.appendBottom(this._ele.hour, true);
                this._startY -= 54;

                if (this._ele.hour.content.scrollTop() > 0) {
                    this._ele.hour.content.scrollTop(0, 162);
                } else {
                    this._ele.hour.content.scrollTop(0, 0);
                }
            }
        });

        getHTMLElementFromJQuery(this._ele.hour.table).addEventListener('touchstart',
            _e_ => {
                if (!this._scrollable) {
                    return false;
                }

                this._touchStart = _e_.touches[0].clientY;
                this._startY = this._ele.hour.content.scrollTop() + _e_.touches[0].clientY;
                this._moved = false;
                this._ele.hour.momentumScrollStopped = false;

                this._lastMoveStart = _e_.touches[0].clientY;
                this._lastMoveEnd = _e_.touches[0].clientY;
                this._lastMoveTime = _e_.timeStamp || Date.now();

                return true;
            },
            { passive: true }
        );

        getHTMLElementFromJQuery(this._ele.hour.table).addEventListener('touchmove',
            _e_ => {
                if (!this._scrollable) {
                    return false;
                }
                this.updateScroller(_e_, this._ele.hour, true);
                return true;
            },
            { passive: false }
        );

        getHTMLElementFromJQuery(this._ele.hour.table).addEventListener('touchend',
            _e_ => {
                this._touchEnd = true;
                if (!this._scrollable) {
                    return false;
                }

                if (!this._moved) {
                    this._ele.hour.table.addClass('transition');
                    return;
                }
                this.finilizeScroll(_e_, this._ele.hour, true);
                return true;
            },
            { passive: true }
        );

        // ampm
        this._ele.amPm.content.on('click', _e_ => {
            const top = Number(this._ele.amPm.content.offset().top);
            const y = Number(_e_.clientY);
            const diff = Number(y - top);

            if (diff > 0 && diff <= this._height) {
                this._ele.amPm.table.css('top', '0px');
            } else if (diff > this._height * 2 && diff <= this._height * 3) {
                this._ele.amPm.table.css('top', `${-(this._height)}px`);
            }
        });


        getHTMLElementFromJQuery(this._ele.amPm.table).addEventListener('touchstart',
            _e_ => {
                this._touchStart = _e_.touches[0].clientY;
                this._startY = _e_.touches[0].clientY;
                this._moved = false;
            },
            { passive: true }
        );

        getHTMLElementFromJQuery(this._ele.amPm.table).addEventListener('touchmove',
            _e_ => {
                _e_.stopPropagation();
                _e_.preventDefault();

                this._moved = true;

                const scroll = Number(this._startY - _e_.touches[0].clientY);
                const top = parseInt(this._ele.amPm.table.css('top'));
                if (top <= 0 && top >= -54) {
                    if (scroll < 0) {
                        this._ele.amPm.table.css('top', `${(-54 - scroll)}px`);
                    } else {
                        this._ele.amPm.table.css('top', `${(-scroll)}px`);
                    }
                }
            },
            { passive: false }
        );

        getHTMLElementFromJQuery(this._ele.amPm.table).addEventListener('touchend',
            _e_ => {
                const top = parseInt(this._ele.amPm.table.css('top'));
                if (top > -26) {
                    this._ele.amPm.table.css('top', '0px');
                } else {
                    this._ele.amPm.table.css('top', `${-(this._height)}px`);
                }
            },
            { passive: true }
        );
    }

    getTwelveHour(hours) {
        if (this._is24HourFormat === false) {
            let result = 0;

            result = hours % 12;
            result = result ? result : 12; // the hour '0' should be '12'

            return result;
        } else {
            return hours;
        }
    }

    getTwoDigitTime(time) {
        return (time < 10 ? '0' : '') + time;
    }

    setdefaultAttributes(element, value) {
        element.attr('type', 'number');
        element.attr('inputmode', 'numeric');
        element.attr('pattern', '[0-9]*');
        element.prop("readonly",true);
        element.val(value);
    }

    changeAmPm(ampm) {
        this._timeout = setTimeout(() => {
            if (ampm.toLowerCase() === 'am') {
                this._ele.amPm.table.css('top', '0px');
            } else if (ampm.toLowerCase() === 'pm') {
                this._ele.amPm.table.css('top', `${-(this._height)}px`);
            }
        }, 100);
    }

    getAmPm() {
        const top = parseInt(this._ele.amPm.table.css('top'));
        if (top === -54) {
            return 'pm';
        } else if (top === 0) {
            return 'am';
        }

        return '';
    }

    updateAmPm() {
        const current = this.getTwelveHour(new Date(this._ele.hour.hourList[3].timestamp).getHours());
        if ((this._previousHour === 11 && current === 12) || (this._previousHour === 12 && current === 11)) {
            this.toggleAmPm();
        }
        this._previousHour = current;
    }

    toggleAmPm() {
        this._timeout = setTimeout(() => {
            const top = parseInt(this._ele.amPm.table.css('top'));
            if (top === 0) {
                this._ele.amPm.table.css('top',`${-(this._height)}px`);
            } else if (top === -54) {
                this._ele.amPm.table.css('top', '0px');
            }
        }, 100);
    }

    setFocusEvents() {
        //min
        this._ele.min.minList[this.mid].element.on('focusin', () => {
            this.freezeScroller();
        });

        this._ele.min.minList[this.mid].element.on('focusout', () => {
            const val = this._ele.min.minList[this.mid].element.val();
            if (!val) {
                this._ele.min.minList[this.mid].element.val(this._ele.min.prevVal);
            }
            if (val.length === 1) {
                this._ele.min.minList[this.mid].element.val(`0${val}`);
            }
            this.unfreezeScroller();
        });

        //hour
        this._ele.hour.hourList[this.mid].element.on('focusin', () => {
            this.freezeScroller();
        });
        this._ele.hour.hourList[this.mid].element.on('focusout', () => {
            const val = this._ele.hour.hourList[this.mid].element.val();
            if (!val) {
                this._ele.hour.hourList[this.mid].element.val(this._ele.hour.prevVal);
            } else if (Number.parseInt(val) === 0 && this._is24HourFormat === false) {
                this._ele.hour.hourList[this.mid].element.val(12);
            }
        });

        this._ele.min.minList[this.mid].element.on('keyup', _e_ => {
            this.updateMin(_e_.key);
        });
        this._ele.hour.hourList[this.mid].element.on('keyup', _e_ => {
            this.updateHour(_e_.key);
        });
    }

    appendTop(ele, isHour = false) {
        if (isHour) {
            let id = ele.hourList[this.N - 1].element.attr('id');
            ele.hourList[this.N - 1].element.remove();
            ele.hourList.pop();
            ele.hourList.unshift(
                {
                    element: $(Dom.input({id:`${id}`, className:'ux2-iot-time-picker__table__row'})),
                    timestamp: ele.hourList[0].timestamp - 1000 * 60 * 60
                }
            );

            this.setdefaultAttributes(ele.hourList[0].element, this.getTwelveHour(new Date(ele.hourList[0].timestamp).getHours()));
            ele.hourList[0].element.insertBefore(ele.hourList[1].element);
            if (this._is24HourFormat === false) {
                this.updateAmPm();
            }
        } else {
            let id = ele.minList[this.N - 1].element.attr('id');
            ele.minList[this.N - 1].element.remove();
            ele.minList.pop();
            ele.minList.unshift(
                {
                    element: $(Dom.input({id:`${id}`, className:'ux2-iot-time-picker__table__row'})),
                    timestamp: ele.minList[0].timestamp - 1000 * 60
                }
            );
            const minute = new Date(ele.minList[0].timestamp).getMinutes();
            this.setdefaultAttributes(ele.minList[0].element, this.getTwoDigitTime(minute));
            ele.minList[0].element.insertBefore(ele.minList[1].element);
        }
        this.setFocusEvents();
    }

    appendBottom(ele, isHour = false) { // ele=this._ele.min for minute
        if (isHour) {
            let id = ele.hourList[0].element.attr('id');
            ele.hourList[0].element.remove();
            ele.hourList.shift();
            ele.hourList.push(
                {
                    element: $(Dom.input({id:`${id}`, className:'ux2-iot-time-picker__table__row'})),
                    timestamp: ele.hourList[this.N - 2].timestamp + 1000 * 60 * 60
                }
            );
            this.setdefaultAttributes(ele.hourList[this.N - 1].element, this.getTwelveHour(new Date(ele.hourList[this.N - 1].timestamp).getHours()));
            ele.table.append(ele.hourList[this.N - 1].element);
            if (this._is24HourFormat === false) {
                this.updateAmPm();
            }
        } else {
            //const scroll = Number(ele.content.scrollTop());
            //ele.table.css('top', `${(-108 - scroll)}px`);

            let id = ele.minList[0].element.attr('id');
            ele.minList[0].element.remove();
            ele.minList.shift();
            ele.minList.push(
                {
                    element: $(Dom.input({id:`${id}`, className:'ux2-iot-time-picker__table__row'})),
                    timestamp: ele.minList[this.N - 2].timestamp + 1000 * 60
                }
            );
            const minute = new Date(ele.minList[this.N - 1].timestamp).getMinutes();
            this.setdefaultAttributes(ele.minList[this.N - 1].element, this.getTwoDigitTime(minute));
            ele.table.append(ele.minList[this.N - 1].element);
        }
        this.setFocusEvents();
    }

    updateScroller(_e_, scrollEle, isHour, momentum, isScroll) {
        if (_e_ !== null) {
            this._blockStart = this._touchStart;
            const move = _e_.touches[0].clientY;
            const diff = move - this._blockStart;
            if (diff >= 54 || diff <= -54) {
                this._blockStart = 0;
            }

            _e_.stopPropagation();
            _e_.preventDefault();

            this._moved = true;

            const scroll = Number(this._startY - _e_.touches[0].clientY);
            scrollEle.lastScroll = scroll;
            if (scroll >= 54) {
                this.appendBottom(scrollEle, isHour);
                this._startY -= 54;
                scrollEle.table.css('top', `${-(this._height * 2)}px`);
            } else {
                const top = parseInt(scrollEle.table.css('top'));
                scrollEle.table.css('top', `${(-108 - scroll)}px`);
                if (top >= -54) {
                    this.appendTop(scrollEle, isHour);
                    scrollEle.table.css('top', `${-(this._height * 2)}px`);
                    this._startY += 54;
                }
            }
            this._lastMoveEnd = _e_.touches[0].clientY;
        } else {
            if (isScroll === false) { // moving down with momentum => 59=>58=>57.......
                scrollEle.table.css('top', `${parseInt(scrollEle.table.css('top')) + 2}px`);
                const top = parseInt(scrollEle.table.css('top'));
                if (top >= -81) {
                    this.appendTop(scrollEle, isHour);
                    scrollEle.table.css('top', `${-(this._height * 2)}px`);
                }
                if (momentum > 0) {
                    setTimeout(() => {
                        this.updateScroller(null, scrollEle, isHour, --momentum, false);
                    }, 1);
                } else {
                    const top = parseInt(scrollEle.table.css('top'));
                    scrollEle.table.css('top', `${-(this._height * 2)}px`);
                    if (top > -81 && top <= -27) {
                        this.appendTop(scrollEle, isHour);
                    }
                }
            } else if (isScroll === true) { // moving up with momentum => 56=>57=>58.......
                scrollEle.table.css('top', `${parseInt(scrollEle.table.css('top')) - 2}px`);
                const top = parseInt(scrollEle.table.css('top'));
                if (top <= -135) {
                    this.appendBottom(scrollEle, isHour);
                    scrollEle.table.css('top', `${-(this._height * 2)}px`);
                }

                if (momentum > 0) {
                    setTimeout(() => {
                        this.updateScroller(null, scrollEle, isHour, --momentum, true);
                    }, 1);
                } else {
                    const top = parseInt(scrollEle.table.css('top'));
                    scrollEle.table.css('top', `${-(this._height * 2)}px`);
                    if (top > -162 && top <= -135) {
                        this.appendBottom(scrollEle, isHour);
                    }
                }
            }
        }
    }

    finilizeScroll(_e_, ele, isHour = false) {
        const scroll = Number(ele.content.scrollTop());
        if (scroll > 0) {
            if (scroll > 27) {
                this.appendBottom(ele, isHour);
                this._startY -= 54;
                ele.content.scrollTop(0);
                if (isHour && this._is24HourFormat === false) {
                    this.updateAmPm();
                }
            } else {
                ele.content.scrollTop(0);
            }
        } else {
            const top = parseInt(ele.table.css('top'));
            ele.table.css('top', `${-(this._height * 2)}px`);
            if (top > -81 && top <= -27) {
                this.appendTop(ele, isHour);
            } else if (top > -162 && top <= -135) {
                this.appendBottom(ele, isHour);
            }
        }

        //this.getOffsetTime(); // ??

        const nowTime = _e_.timeStamp || Date.now();
        const speed = (this._lastMoveEnd - this._lastMoveStart) / (nowTime - this._lastMoveTime);
        if (Math.abs(speed) > 0.5) {
            this.updateScroller(null, ele, isHour, 100, ele.lastScroll > 0 ? true : false);
        }
    }

    freezeScroller() {
        this._scrollable = false;
        this._ele.min.minList[this.midT].element.addClass('invisible');
        this._ele.min.minList[this.midB].element.addClass('invisible');
        this._ele.hour.hourList[this.midT].element.addClass('invisible');
        this._ele.hour.hourList[this.midB].element.addClass('invisible');
    }

    unfreezeScroller() {
        this._scrollable = true;
        this._ele.min.minList[this.midT].element.removeClass('invisible');
        this._ele.min.minList[this.midB].element.removeClass('invisible');
        this._ele.hour.hourList[this.midT].element.removeClass('invisible');
        this._ele.hour.hourList[this.midB].element.removeClass('invisible');
        this.fillScrollerData();
    }

    fillScrollerData() {
        this._hour = this._ele.hour.hourList[this.mid].element.val();
        this._min = this._ele.min.minList[this.mid].element.val();

        const date = new Date();
        date.setHours(this._hour, this._min, 0, 0);
        const timestamp = date.getTime();

        for (let i = 0; i < this.N; i++) {
            this._ele.min.minList[i].timestamp = timestamp + (1000 * 60 * (i - ((this.N / 2) - 1)));
            date.setTime(this._ele.min.minList[i].timestamp);
            this._ele.min.minList[i].element.val(this.getTwoDigitTime(date.getMinutes()));
        }
        this._ele.min.prevVal = this._ele.min.currVal = this._ele.min.minList[this.mid].element.val();

        for (let i = 0; i < this.N; i++) {
            this._ele.hour.hourList[i].timestamp = timestamp + (1000 * 60 * 60 * (i - ((this.N / 2) - 1)));
            date.setTime(this._ele.hour.hourList[i].timestamp);
            this._ele.hour.hourList[i].element.ele.val(this.getTwelveHour(date.getHours()));
        }
        this._ele.hour.prevVal = this._ele.hour.currVal = this._ele.hour.hourList[this.mid].element.val();

        if (this._is24HourFormat === false) {
            this.updateAmPm();
        }
    }

    updateHour(eventKey) {
        const val = this._ele.hour.hourList[this.mid].element.val();
        if (!val) {
            return;
        }

        let maxHourValue;
        let exceedOneDigitHourValue;
        if (this._is24HourFormat) {
            maxHourValue = 24;
            exceedOneDigitHourValue = 2;
        } else {
            maxHourValue = 12;
            exceedOneDigitHourValue = 1;
        }

        if (val > maxHourValue) {
            this._ele.hour.hourList[this.mid].element.val(Number.parseInt(val / 10));
        } else {
            this._ele.hour.hourList[this.mid].element.val(Number.parseInt(val));
            if (val.length >= 2 || val > exceedOneDigitHourValue || eventKey === 'Enter') {
                this._ele.min.minList[this.mid].element.prop('readonly', false);
                this._ele.min.minList[this.mid].element.focus();
                this._ele.min.minList[this.mid].element.select();
            }
        }
        this._ele.hour.prevVal = this._ele.hour.currVal;
        this._ele.hour.currVal = this._ele.hour.hourList[this.mid].element.val();
    }

    updateMin(eventKey) {
        let val = this._ele.min.minList[this.mid].element.val();

        if (eventKey === 'Enter') {
            this._ele.min.minList[this.mid].element.blur();
            return;
        }

        if (val.length === 1 && val > 0 && val <= 5) {
            return;
        }

        if (val > 5 && val < 10) {
            this._ele.min.minList[this.mid].element.val(`0${Number.parseInt(val)}`);
        }

        val = this._ele.min.minList[this.mid].element.val();
        if (val.length >= 2) {
            this._ele.min.minList[this.mid].element.select();
        }
    }

    setScroll(scroll) {
        this._ele.min.content.scrollTop(scroll);
    }

    getCurrentHourIndex() {
        let index = 0;
        index = this._ele.hour.table.css('top') === `${-(this._height * 2)}px` ? 3 : 2;
        return index;
    }

    getCurrentMinIndex() {
        let index = 0;
        index = this._ele.min.table.css('top') === `${-(this._height * 2)}px` ? 3 : 2;
        return index;
    }

    getOffsetTime() {
        const hourIndex = this.getCurrentHourIndex();
        const minIndex = this.getCurrentMinIndex();

        const hour = new Date(this._ele.hour.hourList[hourIndex].timestamp).getHours();
        const min = new Date(this._ele.min.minList[minIndex].timestamp).getMinutes();
        const offset = (hour * 60 + min) * 1000 * 60;

        return offset;
    }

    getMinutes() {
        const index = this.getCurrentMinIndex();
        return new Date(this._ele.min.minList[index].timestamp).getMinutes();
    }

    getHours(is24h) {
        const index = this.getCurrentHourIndex();
        let hours = this.getTwelveHour(new Date(this._ele.hour.hourList[index].timestamp).getHours());

        if (is24h !== true) {
            if (this.getAmPm() === 'am' && hours === 12) {
                hours = 0;
            } else if (this.getAmPm() === 'pm' && hours === 12) {
                hours = 12;
            } else if (this.getAmPm() === 'pm') {
                hours += 12;
            }
        }

        return hours;
    }

    _onItemClicked(id) {
        if (this._listeners.onClicked) {
            this._listeners.onClicked(id);
        }
    }

    setOnItemClickedListener(listener) {
        this._listeners.onClicked = listener;
    }
}