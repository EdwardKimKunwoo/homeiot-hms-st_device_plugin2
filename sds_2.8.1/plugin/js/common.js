/*
Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information").
You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.
SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/***** Common Functions *****/
function resetBodyScrollTop() {
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 0);
}

function round(value, step, roundOff = true) {
    const round = roundOff ? (step / 2) : 0; // round off or round down
    return Number((parseInt((value + round) / step) * step).toFixed(2));
}

function SetToCenter(wrapper, offsetX, offsetY) {
	if (wrapper && wrapper instanceof jQuery) {

		console.log("wrapper.parent().width()==" + wrapper.parent().width());
		console.log("wrapper.width()==" + wrapper.width());

		console.log("wrapper.parent().height()==" + wrapper.parent().height());
		console.log("wrapper.height()==" + wrapper.height());

		wrapper.css("position", "absolute");
		wrapper.css('left', (wrapper.parent().width() - wrapper.width()) / 2  + offsetX + 'px');
		wrapper.css('top', (wrapper.parent().height() - wrapper.height()) / 2 + offsetY + 'px');
	}
}

function addColorMaskImage(_parent_, _pngURI_, _color_) {
	if (_parent_ && _parent_ instanceof jQuery) {
		var imgDiv = $('<div></div>');
		setTimeout(() => {
			imgDiv.css('position',"relative");
			imgDiv.css('width', _parent_.width());
			imgDiv.css('height', _parent_.height());
			if (_color_) {
				imgDiv.css("background-color", _color_);
			}
			imgDiv.css('-webkit-mask-box-image', 'url(' + _pngURI_ + ')');
			imgDiv.css('-webkit-mask-image', 'url(' + _pngURI_ + ')');
			imgDiv.css('-webkit-mask-size', 'contain');
			imgDiv.css('-o-mask-image:', 'url(' + _pngURI_ + ')');
			imgDiv.css('-o-mask-size', 'contain');
			imgDiv.css('-moz-mask-image', 'url(' + _pngURI_ + ')');
			imgDiv.css('-moz-mask-size', 'contain');
			imgDiv.css('mask-image', 'url(' + _pngURI_ + ')');
			imgDiv.css('mask-size', 'contain');
		}, 30);
		_parent_.append(imgDiv);
		return imgDiv;
	} else {
		LoggerE("Error : Wrong Parent for Mask Image");
		return undefined;
	}
}

function setMaskColor(_imgDiv_, _color_) {
	try {
		setTimeout(() => {
			if (_imgDiv_ && _color_) {
				_imgDiv_.css("background-color", _color_);
			}
		}, 30);
	} catch (e) {
		LoggerE("Error: set mask color", e);
	}
}

function GetMainAreaDimensions() {
	return { "width" :$('#contentsContainer').width(), "height" : $('#contentsContainer').height() };
}

function isEnableAutomationDevice(deviceType) {
	let types = ['oic.d.light', 'oic.d.smartplug', 'oic.d.switch'];
	return types.find(current => current === deviceType);
}

/***** For Loading Process : Spinner, DotLoader, Barrier *****/
/** Spinner */
class Spinner {
	constructor(_parentDiv_, _id_, _status_, {size, colorClass, offset, aglin, strokeWidth, autoHide} = {}) {
		var _this = this;
		this.type = 'spinner';
		this.eventList = {
			start: function() {},
			stop: function() {}
		}
		this.ele = {
			wrapper: $("<div id='"+ _id_ +"' class='iot_spinner'></div>").addClass("wrapper"),
			canvas: $("<div class='iot_spinner'></div>").addClass("canvas"),
		};

		let pos = '30'; // center of viewBox
		let circleColorClass = '';
		if (colorClass) {
			circleColorClass = colorClass;
		}
		if (isItIOS()) {
			pos = 30.4; //I don't know why.
		}

		var strSvgHtml = "<svg class='iot_spinner svg' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 60 60'>";
		strSvgHtml +=    `	<circle class='iot_spinner circle ${circleColorClass}' cx='${pos}' cy='${pos}' r='25'></circle>`;
		strSvgHtml +=    `	<circle class='iot_spinner circle mirror ${circleColorClass}_mirror' cx='${pos}' cy='${pos}' r='25' \
								transform='rotate(180.1, ${pos}, ${pos})'></circle>`;
		strSvgHtml +=    "<svg>";

		this.ele.canvas.html(strSvgHtml);
		this.ele.wrapper.append(this.ele.canvas);
		_parentDiv_.append(this.ele.wrapper);

		if (strokeWidth) {
			this.strokeWidth = strokeWidth;
		}

		if (autoHide) {
			this.ele.wrapper.addClass("hide"); // init value.
			this.autoHide = autoHide;
		}

		if (size) {
			this.size(size);
		}

		if (size === "small_title") {
			this.ele.wrapper.addClass("small_title");
		} else if (size === "medium") {
			this.ele.wrapper.addClass("medium");
		} else if (size === "large") {
			this.ele.wrapper.addClass("large");
		}

		if (offset !== undefined) {
			this.moveTo(offset);
		}

		if (_status_) {
			this.start();
		}

		if (aglin) { //default : center
			this.aglin = aglin;
			if (this.aglin === "vertical") {
				this.ele.wrapper.css({"margin":"auto 0"});
			} else if (this.aglin === "horizon") {
				this.ele.wrapper.css({"margin": "0 auto"});
			}
		}

		return this;
	}

	start() {
		this.ele.wrapper.addClass('on');
		if (this.autoHide) {
			this.ele.wrapper.removeClass("hide");
		}
	}

	stop() {
		this.ele.wrapper.removeClass('on');
		if (this.autoHide) {
			this.ele.wrapper.addClass("hide");
		}
	}

	size(_size_) {
		this.ele.wrapper.removeClass('large');
        this.ele.wrapper.removeClass('medium');
        this.ele.wrapper.removeClass('small_title');

        if (typeof _size_ === 'number' && _size_) {
            this.ele.wrapper.css("width", _size_);
			this.ele.wrapper.css("height", _size_);
			if (this.strokeWidth) {
				if (typeof this.strokeWidth === 'number')
					this.ele.wrapper.find("circle").css("stroke-width", this.strokeWidth + 'px');
				else if (typeof this.strokeWidth === 'string')
					this.ele.wrapper.find("circle").css("stroke-width", this.strokeWidth);
			}
        } else if (typeof _size_ === 'string' && _size_ !== 'small') {
            this.ele.wrapper.addClass(_size_);
        }
        return this;
	}

	setCircleColor(_color_) {
		var circle = s.ele.canvas.find("circle");
		if (circle) {
			circle.css('stroke', _color_);
		}
	}

	moveTo(_offset_) {
		if (_offset_){
			this.offset = _offset_;
			this.ele.wrapper.css('left', this.offset.x + 'px');
			this.ele.wrapper.css('top', this.offset.y + 'px');
		}
	}

	setCenterStyle(_val_) {
		if (this.ele.wrapper) {
			if (_val_) {
				this.ele.wrapper.addClass('center');
			} else {
				this.ele.wrapper.removeClass('center');
			}
		}
	}
}

/** Dot Loader */
class DotLoader {
	constructor(_id_, _parent_, {dotColor, time, dotGap, dotSize} = {}) {
		this._id = _id_;
		this._parent = _parent_;
		this._ele = {};

		this._ele.dotted = Dom.div({id: this._id, classList:'iot_dot-loader'},
			Dom.div({classList:'iot_dot-loader_dot'}),
			Dom.div({classList:'iot_dot-loader_dot'}),
			Dom.div({classList:'iot_dot-loader_dot'})
		);

		this._parent.append(this._ele.dotted);

		if (dotGap) {
			$(".iot_dot-loader_dot").css("margin", "0 " + dotGap);
		}

		if (dotSize) {
			$(".iot_dot-loader_dot").css("width", dotSize);
			$(".iot_dot-loader_dot").css("height", dotSize);
			$(".iot_dot-loader_dot").css("border-radius", dotSize);
		}

		if (dotColor) {
			$(".iot_dot-loader_dot").css("background-color", dotColor);
		}
	}

	start() {
		$(".iot_dot-loader_dot").addClass("running");
	}

	stop() {
		$(".iot_dot-loader_dot").removeClass("running");
	}
}

/** Barrier */
class Barrier {
	constructor(_wrapper_, {loaderStyle, loaderSize, loaderGap, loaderColor, offset, outerSpinner, loaderAglin, topMost} = {}) {
		this.wrapper = undefined;
		var _this = this;
		this.type = 'barrier';
		this.parentWrapper = _wrapper_;

		this.ele = {
			wrapper: undefined
		};

		this.spinner = undefined;
		this.tHandle = undefined;
		this.loaderStyle = "spinner";

		if (loaderStyle) {
			this.loaderStyle = loaderStyle;
		}

		if (this.loaderStyle === "spinner") {
			if (loaderSize) {
				this.spinnerCircleSize = loaderSize;
			} else {
				this.spinnerCircleSize = "small"; //default.
			}

			if (loaderColor) {
				this.spinnerCircleColor = loaderColor;
			}

		} else if (this.loaderStyle === "dotLoader") {
			this.dotSize = "8px";
			this.dotColor = "";
			this.dotGap = "3px";

			if (loaderSize) {
				this.dotSize = loaderSize;
			}

			if (loaderColor) {
				this.dotColor = loaderColor;
			}

			if (loaderGap) {
				this.dotGap = dotGap;
			}
		}

		if (outerSpinner) {
			this.outerSpinner = outerSpinner;
		}

		if (loaderAglin) {
			this.loaderAglin = loaderAglin;
		}

		if(offset) {
			this.offset = offset;
		} else {
			this.offset = undefined;
		}

		if (topMost) {
			this.topMost = topMost;
		}
	}

	activate(_withLoader_, {transparent, timeout, timeoutFunc} = {}) {
		if (this.ele.wrapper === undefined) {
			this.ele.wrapper = $(Dom.div({className:'iot_barrier wrapper', datasetTopMost: 'true'}));
			if (this.parentWrapper) {
				this.parentWrapper.append(this.ele.wrapper);
			}
		}

		setTimeout(() => {
			this.ele.wrapper.css('line-height', this.parentWrapper.height() + 'px');
			this.ele.wrapper.css('height', this.parentWrapper.height() + 'px');
		}, 0);
		this.ele.wrapper.addClass('active');
		if (transparent) {
			this.ele.wrapper.css('background', 'rgba(0,0,0,0)');
		}

		if (timeout) {
			if (this.tHandle) {
				clearTimeout(this.tHandle);
				this.tHandle = undefined;
			}

			this.tHandle = setTimeout(() => {
				this.tHandle = undefined;
				this.deactivate();
				if (timeoutFunc && _isFunction(timeoutFunc)) {
					timeoutFunc();
				}
			}, timeout);
		}

		if (_withLoader_) {
			if (this.outerSpinner) {
				this.spinner = this.outerSpinner;
				if (_isFunction(this.spinner.start)) {
					this.spinner.start();
				}
			} else {
				if (this.loaderStyle === "spinner"){
					if (this.spinner === undefined) {
						this.spinner = new Spinner(this.ele.wrapper, "barrier_spinner01", true, {colorClass: this.spinnerCircleColor ,size:this.spinnerCircleSize, offset:this.offset, aglin:this.loaderAglin});
					} else {
						this.spinner.start();
					}
				} else if (this.loaderStyle === "dotLoader") {
					if (!this.dotLoader) {
						this.dotLoader = new DotLoader("dotLoader", this.ele.wrapper, {dotGap:this.dotGap, dotSize:this.dotSize, dotColor:this.dotColor})
					}
					this.dotLoader.start();
				}
			}
		}

		return this;
	}

	deactivate() {
		if (this.tHandle) {
			clearTimeout(this.tHandle);
			this.tHandle = undefined;
		}

		if (this.ele.wrapper) {
			this.ele.wrapper.removeClass('active');
		}
		if (this.spinner) {
			this.spinner.stop();
		}
		if (this.dotLoader) {
			this.dotLoader.stop()
		}
	}

	moveTo(_offset_) {
		if (_offset_) {
			this.offset = _offset_;
			if (this.spinner) {
				this.spinner.moveTo(_offset_);
			}
		}
	}

	isActivate() {
		if (this.ele.wrapper)
			return this.ele.wrapper.hasClass('active');
		else
			return false;
	}
}

/***** COMPONENTS *****/
/** Switch Button */
class SwitchButton {
	/**
	 * Create a Switch Button.
	 * @param {Object}	_parent_	- The target to append.
	 * @param {Object}	_id_	 	- The ID of this Switch Button.
	 * @param {boolean}	_value_	 	- The Preset of the Button Value. Default False
	 * @param {boolean}	_status_ 	- The Preset of the Button Status. Default False
	 * @param {label}	_label_ 	- The Preset of the Button label. Default Empty String
	 */
	constructor(_parent_, _id_, _value_, _status_, enableFN, disableFN) {
		this._parent = _parent_;
		this._id = _id_;
		this._type = 'SwitchButton';
		this._eventList = {
			click: function() { }
		};
		this._value = _value_;
		this._status = _status_;

		this._enableFN = enableFN ? enableFN : undefined;
		this._disableFN = disableFN ? disableFN : undefined;

		this._ele = {};

		this.init();
	}

    get wrapper() {
		return this._ele._wrapper;
   	}

	init() {
		Dom.build(c => {
			this._ele._wrapper = $(c.div( { id: this._id, className: 'iot_SwitchButton wrapper', 'role':'switch'},
				this._ele._track = $(c.div( { className: 'iot_SwitchButton track'})),
				this._ele._button = $(c.div( { className: 'iot_SwitchButton button'}))
			));
			this._parent.append(this._ele._wrapper);
		});

		this.value(this._value);
		this.status(this._status);
		// For the First Time
		this._value ? this._enableFN() : this._disableFN();

		this._ele._wrapper.bind('click', _e_ => {
			if (this.getStatus()) {
				this.toggle();
			}
		});

		this._ele._button.setRipple('circle', {size: 27});
		this._ele._switchPendingWrapper = new Barrier(this._ele._button, { loaderSize: 15 });
	}

	/**
	 * Toggle the Switch Button.
	 * @return {boolean} The final value of the Switch Button.
	 */
	toggle() {
		this.value(!this.getValue());
		return this._value;
	}

	getStatus() {
		return this._status;
	}

	getValue() {
		return this._value;
	}

	activate() {
		this._ele._wrapper.addClass('no_event');
		if (this._ele._switchPendingWrapper) {
			this._ele._switchPendingWrapper.activate(true, { transparent: true });
		}
	}

	deactivate() {
		this._ele._wrapper.removeClass('no_event');
		if (this._ele._switchPendingWrapper) {
			this._ele._switchPendingWrapper.deactivate();
		}
	}

	/**
	 * Set the Status of the Switch Button to enable or disable
	 * @param {boolean} _value_ - True means to set the status to Enable and False means to set the status to Disable.
	 * @return {boolean} The final status of the Switch Button.
	 */
	status(_status_ = true) {
		if (_status_) {
			LoggerI("[SwitchButton] " + this._id + " : Enable");
			this._ele._wrapper.children().removeClass('disable');
			this._status = true;
			// VA
			this._ele._wrapper.attr('aria-pressed', 'true');
		} else {
			LoggerI("[SwitchButton] " + this._id + " : Enable");
			this._ele._wrapper.children().addClass('disable');
			this._status = false;
			// VA
			this._ele._wrapper.attr('aria-pressed', 'false');
		}
		return this._status;
	}

	/**
	 * Set the Value of the Switch Button to enable or disable
	 * @param {boolean} _value_ - Setting Value of this Switch Button
	 * @return {boolean} The final value of the Switch Button.
	 */
	value(_value_ = true) {
		if (_value_) {
			LoggerI("[SwitchButton] " + this._id + " : True");
			this._ele._wrapper.children().removeClass('false');
			if (this._enableFN && !this._value) {
				this._enableFN()
			}
			this._value = true;
		} else {
			LoggerI("[SwitchButton] " + this._id + " : False");
			this._ele._wrapper.children().addClass('false');
			if (this._disableFN && this._value) {
				this._disableFN()
			}
			this._value = false;
		}
		return this._value;
	}
}

/** Linear Slider */
class LinearSlider {
	/**
	 * Create a Linear Slider.
	 * @param {Object}	_parent_	- The target to append.
	 * @param {String}	_id_	 	- The ID of this Linear Slider.
	 * @param {Integer}	_start_	 	- Minimum range of the slider.
	 * @param {Integer}	_end_ 		- Maximum range of the slider.
	 * @param {Integer}	current 	- (optional) Current Value for the first loading. Default Minimum value
	 * @param {String}	unit 		- (optional) Unit of the Value. It'll be shown above the arrow
	 * @param {Integer}	step 		- (optional) Step of the Value. Defalut 1
	 * @param {Object}	updateFN	- (optional) The update function that calls the current value as an argument.
	 * @param {Object}	dlgType		- (optional) Dialog Type.
	 * @param {String}	dlgTitle	- (optional) Dialog Title
	 */
	constructor(_parent_, _id_, _start_, _end_, { current, unit, step, updateFN, dlgType, dlgTitle } = {}) {
		this._parent = _parent_;
		this._id = _id_;
		this._type = 'LinearSlider';
		this._eventList = {
			click: function() { }
		};
		this._start = _start_;
		this._end = _end_;
		this._current = current || this._start;
		this._unit = unit || "";
		this._updateFN = updateFN || undefined;
		this._step = step || 1;
		this._dlgType = dlgType || undefined;
		this._dlgTitle = dlgTitle || undefined;

		this._prev = this._current;

		this._ele = {};
		this.init();
	}

	init() {
		Dom.build(c => {
			this._ele._wrapper = $(c.div( { id: this._id, className: 'iot_LinearSlider wrapper'},
				this._ele._slider_wrapper = $(c.div( { className: 'iot_LinearSlider slider_wrapper', 'role':'slider'},
					this._ele._slider = $(c.div( { className: 'iot_LinearSlider slider'})),
					this._ele._handlerWrapper = $(c.div( { id: 'handlerWrapper', className: 'iot_LinearSlider handler_wrapper'},
						this._ele._handlerGauge = $(c.div( { id: 'handlerGauge', className: 'iot_LinearSlider handler_gauge'})),
						this._ele._handler = $(c.div( { id: 'handler', className: 'iot_LinearSlider handler'},
							this._ele._handlerValueWrapper = $(c.div({ id: 'handler', className: 'iot_LinearSlider handler_value_wrapper'},
								this._ele._text = $(c.div( { className: 'iot_LinearSlider text roboto-medium'})),
								this._ele._arrow = $(c.div( { className: 'iot_LinearSlider arrow'}))
							)),
							this._ele._handlerCircle = $(c.div( { id: 'handler', className: 'iot_LinearSlider handler_circle'}))
						))
					))
				))
			));
			this._parent.append(this._ele._wrapper);
		});

		// VA
		this._ele._slider_wrapper.attr('aria-valuemin',this._start);
		this._ele._slider_wrapper.attr('aria-valuemax',this._end);

		appendSvg(this._ele._arrow, 'device_ic_color_temperature_arrow', { color: '#252525', attr:{'aria-hidden':'true'}});

		(async () => {
			await appendSvg(this._ele._handlerCircle, 'handler_small')
			.then(() => {
				this._updatePosition(this._current);

			}).catch((e) => {
				LoggerE(e.name + " : " + e.message);
			});
		})();

		this._ele._handlerCircle.bind('touchstart', this._onHandleTouchStart.bind(this));
		this._ele._handlerCircle.bind('touchmove', this._onHandleTouchMove.bind(this));
		this._ele._handlerCircle.bind('touchend', this._onHandleTouchEnd.bind(this));
		this._ele._handlerCircle.setRipple('circle', {size: 20});


		this._ele._slider.on('click', this._onSliderClick.bind(this));
		this._ele._handlerWrapper.on('click',this._onSliderClick.bind(this));
		if (this._dlgType) {
			this._ele._handlerValueWrapper.on('click', this._onClickValue.bind(this));
			this._ele._handlerValueWrapper.setRipple('circle', {size: 40});
		}

		this._ele._sliderPendingWrapper = new Barrier(this._ele._handler, { loaderSize: 15 });
	}

	activate() {
		this._ele._wrapper.addClass('no_event');
		this._ele._sliderPendingWrapper.activate(true, { transparent: true });
	}

	deactivate() {
		this._ele._wrapper.removeClass('no_event');
		this._ele._sliderPendingWrapper.deactivate();
	}

	isActivate() {
		return this._ele._sliderPendingWrapper.isActivate();
	}

	/**
	 * Get current value of the linear slider.
	 * @return {Integer} The value of current value
	 */
	getCurrent() {
		return this._current;
	}

	setCurrent(roundedValue, value = undefined) {
		this._current = roundedValue;
		this._ele._slider_wrapper.attr('aria-valuetext', this._current + this._unit);
		this._updatePosition(value !== undefined ? value : roundedValue);
		return this._current;
	}

	_onHandleTouchStart(_e_) {
		LoggerI("[LinearSlider] Touch Start!");
		this._ele._slider_wrapper.addClass("press");
		window.skipRefresh(true);
		this._moveBasicHandle(_e_.touches[0].clientX, _e_.touches[0].clientY);
		this._prev = this._current;
	}

	_onHandleTouchMove(_e_) {
		// LoggerI("[LinearSlider] Touch move... : " + _e_.touches[0].clientX);
		this._moveBasicHandle(_e_.touches[0].clientX, _e_.touches[0].clientY);
	}

	_onHandleTouchEnd(_e_) {
		LoggerI("[LinearSlider] Touch End!");
		window.skipRefresh(false);
		this._ele._slider_wrapper.removeClass("press");

		this._updatePosition(this._current);
		if (this._updateFN && (this._current != this._prev)) {
            this._updateFN(this._current);
		}
	}

	_onSliderClick(_e_) {
		LoggerI("[LinearSlider] Click Slider");
		_e_.stopPropagation();
		this._prev = this._current;
		this._moveBasicHandle(_e_.clientX, _e_.clientY);
		this._updatePosition(this._current);
		LoggerD(`slider click = ${this._current}, ${this._prev}`);
		if (this._updateFN && (this._current != this._prev)) {
            this._updateFN(this._current);
		}

	}

	_moveBasicHandle(_x_, _y_) {
		const pos = getBoundingPosition(getHTMLElementFromJQuery(this._ele._slider_wrapper), _x_, _y_);
		const ratio = pos.x / (getHTMLElementFromJQuery(this._ele._slider_wrapper).getBoundingClientRect().width);
		let _roundedValue = this._start + round((this._end - this._start) * ratio, this._step);
		let _value = this._start + (this._end - this._start) * ratio;

		if (_roundedValue < this._start) {
			_roundedValue = this._start;
		}

		if (_value < this._start) {
			_value = this._start;
		}

		// console.log(`move = ${_roundedValue}, ${_value}`);

		this.setCurrent(_roundedValue, _value);
	}

	_updatePosition(value) {
		if (value == null) {
            value = this._current;
        }

		if (value < this._start) {
            value = this._start;
        }
        if (value > this._end) {
            value = this._end;
        }

		const ratio = 100 * (value - this._start) / (this._end - this._start);
		getHTMLElementFromJQuery(this._ele._handlerGauge).style.width = `${ratio}%`;
		// LoggerD("gauge ratio : " + ratio);
		this._ele._text.text(`${this._current}${this._unit}`);
	}

	_onClickValue() {
        LoggerI("[LinearSlider] Open the Set Dialog");
        if (this._dlgType && this._dlgType === DIALOG_TYPE_VALUE) {
            if (!this._setValueDlg) {
                var _that = this;
                let btnArr = {
                    [C_("DIALOG_BUTTON_CANCEL")](dlg) {
                        LoggerD("Press Cancel Button");
                        dlg.hide();
                    },
                    [C_("DIALOG_BUTTON_DONE")](dlg, value) {
                        LoggerD("Press Done Button, value:" + value);
                        dlg.hide();
                        if (_that._current !== value) {
							_that.setCurrent(Number(value));
							if (_that._updateFN) {
								_that._updateFN(_that._current);
							}
                        }
                    }
				};

                var _attr = {
                    range: {
                        from: this._start,
                        to: this._end
                    },
                    step: this._step,
                    unit: this._unit
                };

                this._setValueDlg = new SetValueDialog(this._id + "_SetValue", this.getCurrent(), {
                    parent: $("body"),
                    title: this._dlgTitle,
                    range: _attr.range,
                    step: _attr.step,
                    btnArr: btnArr,
                    unit: _attr.unit,
                    done: C_("DIALOG_BUTTON_DONE")
                });
            } else {
                this._setValueDlg.setValue(this.getCurrent());
            }
            this._setValueDlg.show();
        }
    }
}


/** Temperature Slider */
class CanvasTemperatureSlider {
	constructor(_parent_, _id_, {range, current} = {}) {
		this._parent = _parent_;
		this._id = _id_;
		this._type = 'CanvasTemperatureSlider';

		if (range) {
			this._range = {
				min : range[0],
				max : range[1]
			};
		}

		this._current = current ? current : this._range.min;
		this._prev = this._current;
		this._ele = {};

		this.onChangeFunc = function() {};
		this.onUpdateFunc = function() {};

		this._gradationStep = 5; //default.
		this._orientation = getScreenOrientation();
		this._anim = {};
		this._anim.noMaskHole = false;
		this._anim.gradationCanv = undefined;
		this._anim.gradationTopMargin  = 24;
		this._anim.gradationLeftMargin  = 28;
		this._anim.gradationGap = 0;
		this._anim.knobSize = 46;
		this._anim.knobXPos = 0;
		this._anim.pixelRatio = undefined;
		this._anim.reqAnimFrame = false;
		this._anim.canvasWidth = undefined;
		this._anim.updateHandle = 0;
		this._anim.updatePos = 0;

		this._gradationRange = {
			min: (this._range.min - (this._range.min % this._gradationStep)),
			max: this._range.max % this._gradationStep === 0 ?
				this._range.max : (this._range.max + ( this._gradationStep - this._range.max % this._gradationStep))
		}

		this.buildLayout();
	}

	buildLayout() {
		Dom.build(c => {
			this._ele.wrapper = $(c.div({ className: 'iot_TemperatureCtrlCard gaugeWrapper', 'role':'slider'},
				this._ele.canvas = $(c.canvas({className: 'iot_Canvas'}))
			));

			this._parent.append(this._ele.wrapper);
		});

		this._ele.wrapper.bind('touchstart', this._onGaugeTouchStart.bind(this));
        this._ele.wrapper.bind('touchmove', this._onGaugeTouchMove.bind(this));
		this._ele.wrapper.bind('touchend', this._onGaugeTouchEnd.bind(this));
		window.addEventListener("orientationchange", this._onRatate.bind(this));

		this._ele.sliderPendingWrapper = new Barrier(this._ele.wrapper, {loaderSize: "small_title", loaderAglin:"vertical"});

		//calc initial value.
		this._anim.gradationGap = (this._ele.wrapper.innerWidth() - (this._anim.gradationLeftMargin * 2)) / ( this._gradationRange.max - this._gradationRange.min);

		this._setAnimationFlag(false);
		this._draw();
	}

	setEvent(type, func) {
		if (type === 'change') {
			this.onChangeFunc = func;
		} else if (type === 'update') {
			this.onUpdateFunc = func;
		}
	}

	getValue() {
		this._current;
	}

	async setValue(_value_, _immediate_) {
		if (_value_ !== this._current)
		{
			if (this._anim.updateHandle) {
				//just change value.
				this._anim.updatePos = this._valueToPos(_value_, true);
			} else {
				const currentKnobXPos = this._valueToPos(this._current, true);
				this._anim.updatePos = this._valueToPos(_value_, true);
				this._anim.knobXPos = currentKnobXPos;

				this._setAnimationFlag(true);
				this._draw();
				await new Promise(resolve => {
					if (_immediate_) {
						this._anim.knobXPos = this._valueToPos(_value_, true);
						resolve();
					} else {
						let cnt = 0.0;
						this._anim.updateHandle = setInterval(() => {
							const bezier = Bezier.linear(cnt);
							this._anim.knobXPos = currentKnobXPos + bezier.y*(this._anim.updatePos - currentKnobXPos);
							cnt+= 0.1;
							if (cnt > 1) {
								clearInterval(this._anim.updateHandle);
								this._anim.updateHandle = 0;
								resolve();
							}
						}, 33); // duration 330ms
					}
				});

				this._current = this._posToValue(this._anim.knobXPos);
				this._setAnimationFlag(false);
			}
		}
		return;
	}


	/**
	 * Activate the Spinner
	 */
	activate() {
		this._anim.noMaskHole = true;
		this._draw(); // for hole mask.
		this._ele.sliderPendingWrapper.moveTo( { x: this._valueToPos(this._current) + 15.5, y: -23 } );
		this._ele.sliderPendingWrapper.activate(true, {transparent: true});
	}
	/**
	 * Deactivate the Spinner
	 */
	deactivate() {
		this._anim.noMaskHole = false;
		this._draw(); // for hole mask.
		this._ele.sliderPendingWrapper.deactivate();
	}

	/**
	 * Set the temperature slider dim.
	 * If it's dimmed, the slider will be locked.
	 * @param {boolean} _dim_ - The value to dim
	 */
	setDim(_dim_) {
		if(_dim_) {
			this._ele.wrapper.addClass('no_event');
		} else {
			this._ele.wrapper.removeClass('no_event');
		}
	}

	_setAnimationFlag(_value_) {
		this._anim.reqAnimFrame = _value_;
	}

	_posToValue(_pos_) {
		return this._gradationRange.min + (Math.floor((_pos_ - this._anim.gradationLeftMargin) / this._anim.gradationGap));
	}

	_valueToPos(_value_, event) {
		 if (event) {
		 	return this._anim.gradationLeftMargin + (_value_ - this._gradationRange.min) * this._anim.gradationGap + 1; // 1 is line width.
		 } else {
		 	return (this._anim.gradationLeftMargin + (_value_ - this._gradationRange.min) * this._anim.gradationGap - this._anim.knobSize / 2);
		 }
	}

	_getXPosOnSlider(_x) {
		_x -= 12; // card left margin.
		let minPos = (this._range.min - this._gradationRange.min) * this._anim.gradationGap + this._anim.gradationLeftMargin;
		if (this._range.min - this._gradationRange.min > 0) {
			minPos += 1; // 1 is gradation line width
		}

		let maxPos = ((this._range.max - this._gradationRange.min) * this._anim.gradationGap) + this._anim.gradationLeftMargin;
		maxPos += 1; // 1 is gradation line width

		if (_x < minPos) {
			_x = minPos;
		} else if (_x > maxPos) {
			_x = maxPos;
		}

		return _x;
	}

	_updateValue(value) {
		if (this._current !== value) {
			this._current = value;
			this.onChangeFunc(value);
		}
	}

	_onGaugeTouchStart(_e_) {
		LoggerI("[TemperatureSlider] Touch Start!");
		window.skipRefresh(true);
		this._setAnimationFlag(true);
		this._draw();
		var _x = _e_.touches[0].clientX;
		this._prev = this._current;
		this._anim.knobXPos = this._getXPosOnSlider(_x);
		this._updateValue(this._posToValue(this._anim.knobXPos));
	}

	_onGaugeTouchMove(_e_) {
		var _x = _e_.touches[0].clientX;
		this._anim.knobXPos = this._getXPosOnSlider(_x);
		this._updateValue(this._posToValue(this._anim.knobXPos));
	}

	_onGaugeTouchEnd(_e_) {
		window.skipRefresh(false);
		this._setAnimationFlag(false);

		if (this._prev !== this._current) {
			this.onUpdateFunc(this._current);
			this._prev = this._current;
		}
	}

	async _draw() {
        if (!this._anim.knobImg) {
            this._anim.knobImg = await loadImage("./res/png/device/Thermostat/devic_thermostat_controller_bg.png");
		}

		let nextFrame = () => {
			let canvWidth = this._ele.wrapper.innerWidth();
			let canvHeight = this._ele.wrapper.innerHeight();
			const htmlElementCanvas = getHTMLElementFromJQuery(this._ele.canvas);

			const ctx = htmlElementCanvas.getContext('2d');
			this._anim.canvasWidth = canvWidth;

			// get pixel ratio
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

				if (isItIOS() && this._anim.pixelRatio > 2) {
					this._anim.pixelRatio = 2; // pixel ratio internal crash it iOS 12.
				}
			}

			htmlElementCanvas.width = canvWidth * this._anim.pixelRatio;
			htmlElementCanvas.height = canvHeight * this._anim.pixelRatio;
			htmlElementCanvas.style.width = canvWidth;
			htmlElementCanvas.style.height = canvHeight;
			htmlElementCanvas.getContext('2d').scale(this._anim.pixelRatio, this._anim.pixelRatio);

			ctx.clearRect(0, 0, canvWidth, canvHeight);
			ctx.fillStyle = '#FAFAFA';
			ctx.fillRect(0, this._anim.gradationTopMargin, canvWidth, canvHeight);

			// draw gradation
			const remainder = (this._gradationRange.max - this._gradationRange.min) % this._gradationStep;
			const gradationCnt = (this._gradationRange.max - this._gradationRange.min + remainder) / this._gradationStep + 1;
			const gradationWidth = canvWidth - this._anim.gradationLeftMargin * 2; // 28 is margin.
			const gradationStepGap = gradationWidth / (gradationCnt - 1);
			this._anim.gradationGap = (canvWidth - (this._anim.gradationLeftMargin * 2)) / ( this._gradationRange.max - this._gradationRange.min);

			for (var i = 0; i <= gradationCnt; i++) {
				const xPos = this._anim.gradationLeftMargin + (gradationStepGap * i);
				ctx.beginPath();
				ctx.strokeStyle = '#CACACA';
				//gradCtx.fillRect(xPos, this._anim.gradationTopMargin + 14, 1, 6);
				ctx.moveTo(xPos,this._anim.gradationTopMargin + 14);
				ctx.lineTo(xPos,this._anim.gradationTopMargin + 14 + 6);
				ctx.lineWidth = 1;
				ctx.closePath();
				ctx.stroke();

				ctx.fillStyle = '#B5B5B5';
				ctx.textAlign = 'center';
				ctx.font = 'normal small-caps normal 11px sans-serif';
				ctx.fillText(this._gradationRange.min + (i*this._gradationStep), xPos, this._anim.gradationTopMargin + 14 + 14 + 8) ;
			}

			let knobXPos = 0;
			if (this._anim.reqAnimFrame) {
				knobXPos = this._anim.knobXPos - this._anim.knobSize / 2;
			}
			else {
				knobXPos = this._anim.gradationLeftMargin + (this._current - this._gradationRange.min) * this._anim.gradationGap - this._anim.knobSize / 2;
			}

			//draw knob
			ctx.drawImage(this._anim.knobImg, 0, 0, this._anim.knobImg.width, this._anim.knobImg.height,
				knobXPos, 0, this._anim.knobSize, this._anim.knobSize);

			//mask hole
			if (!this._anim.noMaskHole) {
				ctx.globalCompositeOperation = "destination-out";
				ctx.fillStyle = '#FFFFFF';
				ctx.arc(knobXPos + this._anim.knobSize / 2, this._anim.knobSize / 2 + 1, 7, 0, 2 * Math.PI);
				ctx.fill();
			}

			if (this._anim.reqAnimFrame)
			{
				window.requestAnimationFrame(nextFrame);
			}
		}

		return nextFrame();
	}

	_onRatate() {
		const tDrawHandle = setInterval(() => {
			const canvWidth = this._ele.wrapper.innerWidth();
			if (this._anim.canvasWidth !== canvWidth) {
				// this._anim.canvasWidth is updated in _draw function.
				this._draw();
				if (this._ele.sliderPendingWrapper.isActivate()) {
					this._ele.sliderPendingWrapper.moveTo( { x: this._valueToPos(this._current) + 15.5, y: -23 } );
				}
				clearInterval(tDrawHandle);
			}
		}, 33); //30fps
	}
}

/** Temperature Slider */
class TemperatureSlider {
	/**
	 * Create a Temperature Slider.
	 * @param {Object}	_parent_	- The target to append.
	 * @param {String}	_id_	 	- The ID of this Linear Slider.
	 * @param {Array}	_range_	 	- Minimum and Maximum range of the slider.
	 * @param {Integer}	current 	- (optional) Current Value for the first loading. Default Minimum value
	 * @param {String}	updateFN 	- (optional) The update function that calls the current value as an argument.
	 * @param {Object}	moveFN 		- (optional) The callback function called after the handle moves.
	 */
	constructor(_parent_, _id_, _range_, { current, updateFN, moveFN } = {}) {
		this._parent = _parent_;
		this._id = _id_;
		this._type = 'TemperatureSlider';

        this._range = {
			min : _range_[0],
			max : _range_[1]
		};

		this._current = current ? current : this._range.min;
		this._updateFN = updateFN ? updateFN : undefined;
		this._moveFN = moveFN ? moveFN : undefined;

		this._prev = this._current;

		this._ele = {};
		this._drawing_attr = {
			width: screen.width,
			height: screen.height,
			current_width: screen.width,
			slider_offsetX: undefined,			// Offset of the slider based on the canvas.
			slider_width: undefined,			// Width of the slider. It's for rotation.
			gradation_height: undefined,		// Height of the gradation area inside of the slider.
			gradation_margin : 28,				// Left and Right margin of the gradation refer to the UI Guide
			major_scale: 5,						// The major scale of the gradation refer to the UI Guide
			major_scale_interval: undefined,	// The interval between major scale
			handle_y: 14,						// Y-axis position of the handle on the slider refer to the UI Guide
			handle_size: 52						// Size of the Handle image file refer to the UI Guide
		};

		// In case of ipad, width and height is fixed regardless the orientation state.
		if (isItIOS() && isTablet()) {
			LoggerD("This is iPad. (w:" + screen.width + " x h:" + screen.height + "), " + getScreenOrientation());
			if (getScreenOrientation() === SCREEN_ORIENTATION_LANDSCAPE) {
				this._drawing_attr.current_width = Math.max(this._drawing_attr.height, this._drawing_attr.width);
			} else {
				this._drawing_attr.current_width = Math.min(this._drawing_attr.height, this._drawing_attr.width);
			}
		}

		this.init();
	}

	init() {
		Dom.build(c => {
			this._ele._wrapper = $(c.div( { className: 'iot_TemperatureCtrlCard gaugeWrapper', 'role':'slider'},
                    this._ele._bgRect = $(c.div( { className: 'iot_TemperatureCtrlCard handle_bg'})),
                    this._ele._gauge = $(c.div( { className: 'iot_TemperatureCtrlCard gauge'}))
                ))
			this._parent.append(this._ele._wrapper);
		});
		this._get_drawing_attr();
		this._drawSlider();

		this.setValue(this._current);

		window.addEventListener("orientationchange", this._onRatate.bind(this));

		// VA
		if (this._range) {
			this._ele._wrapper.attr('aria-valuemin', this._range.min);
            this._ele._wrapper.attr('aria-valuemax', this._range.max);
		}
	}

	/**
	 * Get current value of the temperature slider.
	 * @return {Integer} The value of current value
	 */
	getValue() {
		return this._current;
	}

	/**
	 * Set value of the temperature slider.
	 * @param {Integer} _value_ - The value to set
	 * @return {Integer} The value of current value after set
	 */
	setValue(_value_) {
		LoggerI("[TemperatureSlider] Set : " + _value_);
        this._current = _value_;
		this._moveHandle(this._valueToPos(this._current));

		//VA
		this._ele._wrapper.attr('aria-valuenow', this._current);

		return this._current;
	}

	/**
	 * Activate the Spinner
	 */
	activate() {
		$("#" + this._id + "_hole").hide();
		this._ele._sliderPendingWrapper.moveTo( { x: this._valueToPos(this._current) - 8 } );
		this._ele._sliderPendingWrapper.activate(true, { transparent: true });
	}
	/**
	 * Deactivate the Spinner
	 */
	deactivate() {
		$("#" + this._id + "_hole").show();
		this._ele._sliderPendingWrapper.deactivate();
	}

	/**
	 * Add transaction animation effect to the handle movement
	 * It has to be disable again for the Touch event,
	 * or it would look like to have latency.
	 */
	addHandleAnimation() {
		$('#' + this._id + '_grad_area').addClass('iot_TemperatureCtrlCard_handle_animation');
	}

	/**
	 * Set the temperature slider dim.
	 * If it's dimmed, the slider will be locked.
	 * @param {boolean} _dim_ - The value to dim
	 */
	setDim(_dim_) {
		if(_dim_) {
			this._ele._wrapper.addClass('no_event');
		} else {
			this._ele._wrapper.removeClass('no_event');
		}
	}

	_get_drawing_attr() {
		this._drawing_attr.slider_offsetX = this._ele._wrapper.offset().left;
		if (isTablet()) {
			let longer = window.screen.width > window.screen.height ? window.screen.width : window.screen.height;
			this._drawing_attr.slider_width = longer - (this._drawing_attr.slider_offsetX * 2);
		} else {
			this._drawing_attr.slider_width = this._drawing_attr.current_width - (this._drawing_attr.slider_offsetX * 2);
		}

		this._drawing_attr.gradation_height = this._ele._gauge.height();
		this._drawing_attr.major_scale_interval = (this._drawing_attr.slider_width - (this._drawing_attr.gradation_margin * 2)) / ((this._range.max - this._range.min)/this._drawing_attr.major_scale);
	}

	_drawSlider() {
        var idx = 0;
		var x_pos = this._drawing_attr.gradation_margin;

		// Drawing Slider
		var svg_degree = "<svg viewBox='0 0 " + this._drawing_attr.slider_width + " " + this._drawing_attr.gradation_height + "'>";
		// 1. Drawing Gradation
        while ((this._range.min + (idx * this._drawing_attr.major_scale)) <= this._range.max) {
            svg_degree += "<g id='" + this._id + "_grad" + idx + "'>";
                svg_degree += "<line x1='" + x_pos + "' y1='0' x2='" + x_pos + "' y2='6' stroke='#B5B5B5'></line>";
                svg_degree += "<text x='" + x_pos + "' y='27' class='iot_TemperatureCtrlCard on gradient'>"+ (this._range.min + (idx * this._drawing_attr.major_scale)) + "</text>";
            svg_degree += "</g>";
            LoggerD("----- idx : " + idx + " ("+ (this._range.min + (idx * this._drawing_attr.major_scale)) + "), x_pos : " + x_pos);
            x_pos += this._drawing_attr.major_scale_interval;
            idx++;
        }
        this._ele._gauge.html(svg_degree);

		// 2. Drawing Handle Area
        var svg_bgRect = "<svg id='" + this._id + "_grad_area' width='" + (this._drawing_attr.slider_width * 2 + this._drawing_attr.handle_size) + "' height='" + (this._drawing_attr.handle_y * 2 + 2) +"'>";
		svg_bgRect +=
		// 2-1. Drawing Controller Handle
            "<defs>\
                <mask id='" + this._id + "_bg_hole'>\
                    <rect x='" + this._drawing_attr.slider_width + "' y='" + this._drawing_attr.handle_y + "' width='52' height='52' fill='#FFFFFF'/>\
                    <circle id='" + this._id + "_bg_hole_circle' cx='50%' cy='50%' r='9'/>\
                </mask>\
                <mask id='" + this._id + "_hole'>\
                    <rect width='100%' height='100%' fill='white'/>\
                    <circle cx='50%' cy='50%' r='7'/>\
                </mask>\
			</defs>";
		// 2-2. Drawing background of the Handle
		svg_bgRect +=
            "<rect x='0' y='" + this._drawing_attr.handle_y + "' width='" + (this._drawing_attr.slider_width + 1) + "' height='100%' fill='#FAFAFA'/>\
            <rect x='" + this._drawing_attr.slider_width + "' y='"+ this._drawing_attr.handle_y + "' width='52' height='52'\
                fill='#FAFAFA' mask='url(#" + this._id + "_bg_hole)'/>\
            <rect x='" + (this._drawing_attr.slider_width + this._drawing_attr.handle_size - 1) + "' y='" + this._drawing_attr.handle_y + "' width='" + this._drawing_attr.slider_width + "' height='100%' fill='#FAFAFA'/>\
			<image id='" + this._id + "_grad_handle' x='" + this._drawing_attr.slider_width + "' y='"+ (-this._drawing_attr.handle_y + 1)
				+ "' width='52' height='52' xlink:href='./res/png/device/Thermostat/devic_thermostat_controller_bg.png' mask='url(#" + this._id + "_hole)'/>";
		svg_bgRect += "</svg>";
		this._ele._bgRect.html(svg_bgRect);

        $('#' + this._id + '_grad_handle').bind('touchstart', this._onGaugeTouchStart.bind(this));
        $('#' + this._id + '_grad_handle').bind('touchmove', this._onGaugeTouchMove.bind(this));
		$('#' + this._id + '_grad_handle').bind('touchend', this._onGaugeTouchEnd.bind(this));

		this._ele._wrapper.bind('click', this._onSliderClick.bind(this));

		this._ele._sliderPendingWrapper = new Barrier(this._ele._bgRect, {loaderSize: "small_title", loaderAglin:"vertical"});
    }

    _moveHandle(_pos_) {
		$('#' + this._id + '_grad_area').css('transform', ("translateX(" + (_pos_ - ($('#' + this._id + '_grad_area').width() / 2)) + "px)"));
		if (this._moveFN && _isFunction(this._moveFN)) {
			this._moveFN(Math.round(this._posToValue(_pos_)));
		}
	}

	_posToValue(_pos_) {
		return ((_pos_ - this._drawing_attr.gradation_margin) /
			(this._drawing_attr.major_scale_interval / this._drawing_attr.major_scale) + this._range.min);
    }

    _valueToPos(_value_) {
		return (this._drawing_attr.gradation_margin +
			((_value_ - this._range.min) *
			(this._drawing_attr.major_scale_interval / this._drawing_attr.major_scale)));
    }

    _onGaugeTouchStart(_e_) {
		LoggerI("[TemperatureSlider] Touch Start!");
		window.skipRefresh(true);
        this.dragStart = true;

        // Remove Animation Effect for Drag Action
        if ($('#' + this._id + '_grad_area').hasClass('iot_TemperatureCtrlCard_handle_animation')) {
            $('#' + this._id + '_grad_area').removeClass('iot_TemperatureCtrlCard_handle_animation');
        }
    }

    _onGaugeTouchMove(_e_) {
		var _x = _e_.touches[0].clientX;
        if (this.dragStart && _x >= this._drawing_attr.gradation_margin && _x <= this._drawing_attr.slider_width - this._drawing_attr.gradation_margin) {
			var value = Math.round(this._posToValue(_x));
			this._moveHandle(_x);
			this._current = value;

			// VA
			this._ele._wrapper.attr('aria-valuenow', this._current);
        }
    }

    _onGaugeTouchEnd(_e_) {
		LoggerI("[TemperatureSlider] Touch End! : " + this._current);
		window.skipRefresh(false);
        this.dragStart = false;
		this._moveHandle(this._valueToPos(this._current));
		if (this._updateFN && _isFunction(this._updateFN)) {
			this._updateFN(this._current);
		}
		if ($('#' + this._id + '_grad_area').hasClass('iot_TemperatureCtrlCard_handle_animation')) {
            $('#' + this._id + '_grad_area').removeClass('iot_TemperatureCtrlCard_handle_animation');
        }
	}

	_onSliderClick(_e_) {
		LoggerI("[TemperatureSlider] Click Slider");
		this._current = Math.round(this._posToValue(_e_.clientX));
		if (this._current > this._range.max) {
			this._current = this._range.max;
		} else if (this._current < this._range.min) {
			this._current = this._range.min;
		}

		this._moveHandle(this._valueToPos(this._current));
		if (this._updateFN && _isFunction(this._updateFN)) {
			this._updateFN(this._current);
		}
		if ($('#' + this._id + '_grad_area').hasClass('iot_TemperatureCtrlCard_handle_animation')) {
            $('#' + this._id + '_grad_area').removeClass('iot_TemperatureCtrlCard_handle_animation');
        }
	}

	_onRatate() {
		// Guess the canvas width before rotation animation done.
		if (this._drawing_attr.current_width == this._drawing_attr.width) {
			this._drawing_attr.current_width = this._drawing_attr.height;
		} else {
			this._drawing_attr.current_width = this._drawing_attr.width;
		}

		this._drawing_attr.slider_width = this._drawing_attr.current_width - (this._drawing_attr.slider_offsetX * 2);
		this._drawing_attr.major_scale_interval = (this._drawing_attr.slider_width - (this._drawing_attr.gradation_margin * 2)) / ((this._range.max - this._range.min)/this._drawing_attr.major_scale);

		this._drawSlider();
		this._moveHandle(this._valueToPos(this._current));
	}
}

/** List_DevicePlugin */
class List_DevicePlugin {
	/**
	 * Create a Switch Button.
	 * @param {Object}	_parent_	- The target to append.
	 * @param {Object}	_id_	 	- The ID of this Switch Button.
	 * @param {boolean}	_value_	 	- The Preset of the Button Value. Default False
	 * @param {boolean}	_status_ 	- The Preset of the Button Status. Default False
	 */
	constructor(_parent_, _main_txt_, _sub_txt_) {
		this._type = 'ListDevicePlugin';

		this._parent = _parent_;
		this._main_text = _main_txt_;
		this._sub_text = _sub_txt_;


		this._ele = {};

		this.init();
	}

	init() {
		Dom.build(c => {
			this._ele._wrapper = $(c.div( { id: this._id, className: 'iot_List_DevicePlugin wrapper'},
				this._ele._icon = $(c.div( { className : 'iot_List_DevicePlugin__icon' } )),
				this._ele._text_wrapper = $(c.div( { className : 'iot_List_DevicePlugin__text_wrapper' },
					this._ele._main_text = $(c.div( {className: 'iot_List_DevicePlugin__main_text roboto-regular'}, this._main_text )),
					this._ele._sub_text = $(c.div( {className: 'iot_List_DevicePlugin__sub_text roboto-regular'}, this._sub_text ))
				))

			));
			this._parent.append(this._ele._wrapper);
		});
	}

	set_icon(_path_) {
		appendSvg(this._ele._icon, _path_)
		.then(() => {
			getHTMLElementFromJQuery(this._ele._icon.children()).setAttribute('width', this._ele._text_wrapper.height());
			getHTMLElementFromJQuery(this._ele._icon.children()).setAttribute('height', this._ele._text_wrapper.height());
		});
	}

	set_text(_txt_, target = 'main') {
		if (target === 'main') {
			this._ele._main_text.text(_txt_);
		} else if (target === 'sub') {
			this._ele._sub_text.text(_txt_);
		} else {
			LoggerE("Cannot Find Image for Grouped Device");
		}

	}
}

class Dialog {
	constructor(id, {parent, btnArr, title, description, done, modal = false, exit = false}) {
		this._id = id;
		this._class = 'Dialog';
		this._ele = {};
		this._ele.buttons = {};
		this._parent = parent;
		this._btnArr = btnArr;
		this._title = title;
		this._description = description;
		this._done = done;
		this._modal = modal;
		this._exit = exit;
		this._preventDbBackHandle = 0;
	}

	get id() {
        return this._id;
	}

	get class(){
		return this._class;
	}

	get background() {
		return this._ele.background;
	}

	get wrapper() {
		return this._ele.wrapper;
	}

	get contents() {
		return this._ele.contents;
	}

	get parent() {
		return this._parent;
	}

	get modal() {
		return this._modal;
	}

	get exit() {
		return this._exit;
	}

	set exit(value) {
		this._exit = value;
	}

	init() {
		Dom.build(c => {
			this._ele.background = $(c.div({ id: this._id, className: 'iot_dialog background', role:'dialog'},
					this._ele.wrapper = $(c.div({ className: 'iot_dialog wrapper'},
						this._ele.title = $(c.div({ className:'iot_dialog title roboto-medium'})),
						this._ele.contents = $(c.div({ className: 'iot_dialog contents roboto-regular'})),
						this._ele.button_wrapper = $(c.div({ className: 'iot_dialog contents button_wrapper', role:'button'}))
					))
				));

			this.parent.append(this._ele.background);
			this.setZindex(11);		// 11 is dialog default z-index.
		});

		//title
		if (this._title === undefined || this._title == null || !this._title) {
			this._ele.title.css("display", 'none');
		} else {
			this._ele.title.html(this._title);
		}

		//description
		if (this._description && _isString(this._description)) {
			this._ele.contents.html(this._description);
		}

		// create button.
		if (this._btnArr === undefined) {
			this._ele.button_wrapper.css('display','none');
		} else {
			for (var i in this._btnArr) {
				if (this._btnArr.hasOwnProperty(i)) {
					if (this._ele.button_wrapper[0].childElementCount != 0 ) {
						this._ele.button_wrapper.append($(Dom.div({className: 'iot_dialog button_divider'})));
					}
					this._ele.buttons[i] = $(Dom.div({className: 'iot_dialog button roboto-medium'}));
					this._ele.buttons[i].text(i);
					if (i.toUpperCase() === "OK") {
						this._ele.buttons[i].addClass('OK');
					}
					this._ele.button_wrapper.append(this._ele.buttons[i]);
					this._ele.buttons[i].func = this._btnArr[i];
					this._ele.buttons[i].setRipple('round-rect');
					var _that = this;
					this._ele.buttons[i].on("click", function(_e_) {
						_e_.stopPropagation();
						_e_.preventDefault();

						var key = $(this).text();
						if (_that._ele.buttons[key].hasClass('disable')) {
							return;
						}
						_that._ele.buttons[key].func(_that, _that._value);
					});

					if (this._done && this._done === i) {
						this._done = i;
					}
				}
			}
		}
	}

	_disableDialog(block) {
		if (this._ele.buttons[this._done]) {
			if (block) {
				this._ele.buttons[this._done].addClass('disable');
			} else {
				this._ele.buttons[this._done].removeClass('disable');
			}
		}
	}

	setZindex(index) {
        if (this._ele.background && this._ele.background[0] instanceof HTMLElement) {
            this._ele.background[0].dataset.page = index;
        }
	}

	get Zindex() {
		if (this._ele.background && this._ele.background[0] instanceof HTMLElement) {
            return this._ele.background[0].dataset.page;
		}

		return undefined;
	}

	async show(immediate) {
		LoggerD("Show Dialog, " + this.id);
		this._ele.background.removeClass("hide");
		if (!this._ele.background.hasClass("show")) {
			/*
			if (!this._preventDbClickHandle) {
				this._preventDbClickHandle = setTimeout(() => {
					this._preventDbClickHandle = 0;
				}, 1000); // Wait 1000 ms for the page effect to be finish.

				HNView.pageCtrl.pushDlg(this);
			}
			*/
			HNView.pageCtrl.pushDlg(this);

			await PromiseTransitionEnd(getHTMLElementFromJQuery(this._ele.background), {
				propertyName: "all",
				triggerFunc: () => {
					this._ele.background.addClass("show");
				},
				immediate: immediate
			});
		} else {
			LoggerI("This dialog is already visible.");
		}
	}

	async hide({skipHistoryBack} = {}) {
		LoggerD("Hide Dialog, " + this.id);
		if (this._ele.background.hasClass("show")) {
			await PromiseTransitionEnd(getHTMLElementFromJQuery(this._ele.background), {
				propertyName: "all",
				triggerFunc: () => {
					this._ele.background.removeClass("show");
				}
			});
			this._ele.background.addClass("hide");

			if (!skipHistoryBack) {
				/*
				if (!this._preventDbClickHandle) {
					this._preventDbClickHandle = setTimeout(() => {
						this._preventDbClickHandle = 0;
					}, 1000); // Wait 1000 ms for the page effect to be finish.

					history.back();
				}
				*/
				history.back();
			}
		} else {
			LoggerI("This dialog is already invisible.");
		}
	}

	async finalize() {
		if (this._ele.background.hasClass("show")) {
			await PromiseTransitionEnd(getHTMLElementFromJQuery(this._ele.background), {
				triggerFunc: () => {
					this._ele.background.removeClass("show");
				}
			});
		}
        this._ele.background.remove();
	}

	//visible
	isVisible() {
		if (this._ele.background.hasClass('show')) {
			return true;
		} else {
			return false;
		}
	}
}

/** Selection List Popup */
class SelectionListPopup extends Dialog {
	/**
	 * Create a Selection List Popup.
	 * @param {Object}	_parent_	- The target to append.
	 * @param {Object}	_id_	 	- The ID of this Switch Button.
	 * @param {Array}	_options_ 	- Array to show on the List
	 * @param {String}	_type_ 		- The Type of the Selection List Popup
	 * 		'center' / 'type01' 				: Mode Type 01 such as the System Ariconditioner
	 * 		'lefttop' / 'topleft' / 'type02' 	: Mode Type 02 such as the Thermostat
	 */
	constructor(_id_, {parent, target, options, type, display_zone, customPos}) {
		super(_id_, {parent});
		this._eventList = {
			ok: function() {},
			cancel: function() {}
		}
		this._parent = parent;
		this._target = target;
		this._ele.options = [];
		this._options = options;
		this._type = type;
		this._display_zone = (display_zone) ? display_zone : undefined;
		this._customPos = customPos;
		this._waitTimeoutHandle = undefined;

		this.buildLayout();
	}

	buildLayout() {
		super.init();

		this.background.addClass("selection_list");
		this.wrapper.addClass("selection_list");
		this.contents.addClass("hide");
		Dom.build(c => {
			this._ele.list = $(c.div( { className: 'iot_selection_list list', role:'listbox'}))
			this.wrapper.append(this._ele.list);
		});
		for (var _i in this._options) {
			if (this._options.hasOwnProperty(_i)) {
				this._addItem(_i, this._options[_i]);
			}
		}

		let cardHeight = this._parent.height();
		let contentsHeight = this._ele.list.height();
		let offsetY = getHTMLElementFromJQuery(this._ele.list).offsetTop;
		let margin_bottom = 8;

		if (cardHeight < contentsHeight) {
			this._ele.list.css('overflow-y', 'scroll');
			this._ele.list.css('overflow-x', 'hidden');
			this._ele.list.css('height', (cardHeight - offsetY - margin_bottom) + 'px');
		}

		switch (this._type) {
			case 'center':
			case '1':
			case 'type01':
			case 'Thermostat':
				this._ele.wrapper.addClass('center');
				break;
			case 'lefttop':
			case 'topleft':
			case '2':
			case 'type02':
			case 'SystemAirconditioner':
				this._ele.wrapper.addClass('lefttop');
				break;
			default:
				LoggerW("[ERROR] Undefined Type (" + this._type + ")");
				this._ele.wrapper.addClass('center');
		}
	}
	_addItem(_i, _option_) {
		var option = {
			wrapper: $(Dom.div( { className: 'iot_selection_list option_wrapper'})),
			label: $(Dom.div( { className: 'iot_selection_list option_label roboto-regular', 'role':'option'}))
		}

		option.wrapper.append(option.label);
		option.key = this._options[_i].key;
		option.label.text(this._options[_i].label);

		this._ele.options[_i] = option;
		this._ele.options[_i]._eventList = {
			click: function() {}
		}
		option.wrapper.on('click', this._onClickOption.bind(this, _i, option.key));

		if (this._options[_i]['event']) {
			for (var _j in this._options[_i]['event']) {
				this._ele.options[_i]['_eventList'][_j] = this._options[_i]['event'][_j]
			}
		}
		option.wrapper.setRipple('list');

		this._ele.list.append(this._ele.options[_i].wrapper);
	}

	_onClickOption(_index_, _key_, _e_) {
		_e_.preventDefault();
		_e_.stopPropagation();
		LoggerI("[SelectionListPopup] Selected : " + _key_);
		if (this.isVisible()) {
			this._ele.options[_index_]._eventList.click(_key_);
		}
	}

	_set_offset() {
		let top = this._target.offset().top;
		let left = this._target.offset().left;
		const MINIMUM_TOP_BOTTOM_MARGIN = 8;

		if (this._display_zone) {
			if (top < this._display_zone.offset().top) {
				top = this._display_zone.offset().top
					+ ((this._ele.wrapper.hasClass('center')) ? MINIMUM_TOP_BOTTOM_MARGIN : 0);
			}
		}
		if (screen) {
			if (top > screen.height - this._ele.wrapper.height()) {
				top = screen.height - this._ele.wrapper.height() - MINIMUM_TOP_BOTTOM_MARGIN;
			}
		}

		if (this._customPos) {
			top += this._customPos.top;
			left += this._customPos.left;
		}

		this._ele.wrapper.css( {
			top: top
		});
		if (this._ele.wrapper.hasClass('lefttop')) {
			this._ele.wrapper.css( {
				left : left
			});
		}
	}

	_onClickBackground(_e_) {

		if (this.isVisible()) {
			_e_.stopPropagation();
			_e_.preventDefault();
			this.hide();
		} else {
			LoggerW("Click Too Fast or Wrong Actions !!!");
		}
	}

	/**
	 * Show the selection list popup
	 * @return {Object} The object of this selection list popup .
	 */
	async show() {
		LoggerD('[SelectionListPopup] show');
		if (!this._waitTimeoutHandle) {
			this._waitTimeoutHandle = setTimeout(() => {
				this._waitTimeoutHandle = 0;
			}, 400); // 400 ms is duration of transition.

			this._set_offset();
			await super.show(true);
			await PromiseTransitionEnd(getHTMLElementFromJQuery(this.wrapper), {
				triggerFunc: () => {
					this.wrapper.addClass("selection_list_show_animation");
				}
			});

			this._ele.background.on('click', this._onClickBackground.bind(this));

		} else {
			LoggerW("Wait for the show effect to finish.");
		}
	}

	/**
	 * Hide the selection list popup
	 * @return {Object} The object of this selection list popup .
	 */
	async hide(opt) {
		LoggerD('[SelectionListPopup] hide');
		if (!this._waitTimeoutHandle) {
			this._waitTimeoutHandle = setTimeout(() => {
				this._waitTimeoutHandle = 0;
			}, 400); // 400 ms is duration of transition.

			this._ele.background.off('click');

			await PromiseTransitionEnd(getHTMLElementFromJQuery(this.wrapper), {
				triggerFunc: () => {
					this.wrapper.removeClass("selection_list_show_animation");
				}
			});

			await super.hide(opt);
		} else {
			LoggerW("Wait for the hide effect to finish.");
		}
	}

	/**
	 * Highlight the current label
	 * @param {String} _current_ - Current text to hightlight
	 */
	highlight(_current_) {
		for (var _i in this._ele.options) {
			if (_current_ == this._ele.options[_i].label.text()) {
				this._ele.options[_i].label.addClass('highlight');
				// VA
				this._ele.options[_i].label.attr('aria-selected', 'true');
			} else if (_current_ != this._ele.options[_i].label.text() && this._ele.options[_i].label.hasClass('highlight')) {
				this._ele.options[_i].label.removeClass('highlight');
				// VA
				this._ele.options[_i].label.attr('aria-selected', 'false');
			}
		}
	}
}

// ### SetValueDialog
class SetValueDialog extends Dialog {
    constructor(id, value, {parent, title, range, unit, step, btnArr, done} = {}) {
		super(id, {parent, btnArr, title, done});
		this._id = "SetValueDialog";
		this._listeners = {
			ok : function() {},
			cancel : function() {}
		};
		this._attr = {
			range: range,
			unit: unit || "",
			step: step || 1,
			maxLength: 3,
			round: false
		};

		this._value = value;

		// For checking SIP
		this._isFocus = false;
		this._originalSize = $(window).height() + $(window).width();
		this._isTouched = false;
		this._isWorkingTransition = false;
		this._waitTimeoutHandle = undefined;

		this.buildLayout();
	}

	setListener(_type_, _func_) {
		this._listeners[_type_] = _func_;
	}

	setZindex(index) {
        if (this._ele.background && this._ele.background[0] instanceof HTMLElement) {
            this._ele.background[0].dataset.page = index;
        }
    }

	buildLayout() {
		super.init();

		this.background.addClass("slideup");
		this.wrapper.addClass("slideup");

		Dom.build(c => {
			this._ele.setValueWrapper = c.div({className: 'iot_SetValueContents wrapper'},
					this._ele.rangeText = $(c.div({className: 'iot_SetValueContents range roboto-regular'})),
					this._ele.rangeContent = $(c.div({className: 'iot_SetValueContents content'}))
			)
			this.contents.append(this._ele.setValueWrapper);
		});

		//contents
		this._ele.rangeText.text(this._attr.range.from + " ~ " + this._attr.range.to + (this._attr.unit?this._attr.unit:""));

		this._ele.decreaseWrapper = $(Dom.div({className: 'iot_SetValueContents button'}));
		this._ele.decreaseIcon = addColorMaskImage(this._ele.decreaseWrapper, "./res/png/set_point_ic_minus.png", "#3695dd");
		this._ele.increaseWrapper = $(Dom.div({className: 'iot_SetValueContents button'}));
		this._ele.increaseIcon = addColorMaskImage(this._ele.increaseWrapper, "./res/png/set_point_ic_plus.png", "#3695dd");

		this._ele.decreaseWrapper.setRipple('circle');
		this._ele.increaseWrapper.setRipple('circle');

		this._ele.controls = $(Dom.div({className: 'iot_SetValueContents controls'},
			this._ele.input = $(Dom.input({className: 'iot_setValueDialog input iot_inputField roboto-regular'}))
		));

		this._ele.input.attr("inputmode", "numeric");
		this._ele.input.attr("type", "number");
		this._ele.input.attr("pattern", "[0-9]*");
		this._ele.input.attr("min", this._attr.range.from);
		this._ele.input.attr("max", this._attr.range.to);
		this._ele.input.attr("size", 3);
		this._ele.input.attr("maxlength", 3);
		this._ele.input.attr('contenteditable', 'true');
		this._ele.input.attr('role', 'textbox');

		// Prevent Touch Long Press Event
		this._ele.input.contextmenu(function() {
			LoggerW("Text Context Menu is Prevented");
			return false;
		});
		this._ele.input.on("selectstart", function (e) {
			LoggerW("Select is Prevented.");
			return false;
		});
		this._ele.input.on("dragstart", function (e) {
			LoggerW("Drag is Prevented.");
			return false;
		});

		this.setValue(this._value);
		setTimeout(() => {
			// With Unit Case
			if (this._attr.unit && this._attr.unit !== "") {
				this._ele.unit = $(Dom.div({className: 'iot_setValueDialog iot_inputField_unit roboto-regular'}));
				this._ele.controls.append(this._ele.unit);
				this._ele.unit.text(this._attr.unit);

				this._ele.input.addClass('with_unit');

				this._ele.input.css("width", this._ele.controls.width() / 2);
				this._ele.unit.css("width", this._ele.controls.width() / 2);
			} else {
				this._ele.input.css("width", this._ele.controls.width());
			}
		}, 30);

		// For Long Pressing the '+' and '-' Button
		var interval_time = 500;	// Interval Time is 0.5sec
		var longpress_timer = undefined;

		this._ele.decreaseWrapper.bind('touchstart', (_e_) => {
			_e_.stopPropagation();
			_e_.preventDefault();
			if (!this._isTouched) {
				this._isTouched = true;
				this._checkSIP();	// Check the SIP is shown or not
				this._stepDown();	// At first touch, it works immediately.
				longpress_timer = setInterval(() => {
					this._stepDown();
				}, interval_time);
			}
		});

		this._ele.decreaseWrapper.bind('touchend', (_e_) => {
			_e_.stopPropagation();
			_e_.preventDefault();
			clearInterval(longpress_timer);
			this._isTouched = false;
		});

		this._ele.increaseWrapper.bind('touchstart', (_e_) => {
			_e_.stopPropagation();
			_e_.preventDefault();
			if (!this._isTouched) {
				this._isTouched = true;
				this._checkSIP();	// Check the SIP is shown or not
				this._stepUp();		// At first touch, it works immediately.
				longpress_timer = setInterval(() => {
					this._stepUp();
				}, interval_time);
			}
		});

		this._ele.increaseWrapper.bind('touchend', (_e_) => {
			_e_.stopPropagation();
			_e_.preventDefault();
			clearInterval(longpress_timer);
			this._isTouched = false;
		});

		this._ele.input.on("focusout", () => {
			resetBodyScrollTop();
			if (this._isFocus) {
				this._ele.input.focus();
			}
		});

		this._ele.input.on("input", (val) => {
			this._updateControl(this._ele.input.val());
			this._value = this._ele.input.val();
		});

		this._ele.input.on("keypress", e => {
			const code = e.keyCode || e.which;
			switch (code) {
				case 8:		/* backspace */
				case 9: 	/* tab */
				case 13: 	/* enter */
				case 46:	/* delete */
					break;
				default:
					if (this._attr.maxLength && (e.target.value.length >= this._attr.maxLength)) {
						return false;
					}
			}
			return true;
		});

		this._ele.rangeContent.append(this._ele.decreaseWrapper);
		this._ele.rangeContent.append(this._ele.controls);
		this._ele.rangeContent.append(this._ele.increaseWrapper);

	}

	_onClickBackground(_e_) {

		// this.id is background area of this component.
		LoggerD("click background");
		if (_e_.target.id === this._id) {
			_e_.stopPropagation();
			_e_.preventDefault();

			if (this.isVisible()) {
				if (this.cancel) {
					this.cancel();
				}

				this.hide();
			} else {
				LoggerW("Click Too Fast or Wrong Actions !!!");
			}
		}
	}

	_inputValue() {
		let value = this._ele.input.val();
        return Number(value);
	}

	_stepUp() {
		if (this._ele.increaseWrapper.hasClass("disable")) {
			if (this._isFocus) {
				this._ele.input.focus();
			}
			return;
		}
		const value = round(this._inputValue(), this._attr.step, this._attr.round) + this._attr.step;
		this.setValue(this._attr.range && value > this._attr.range.to ? this._attr.range.to : value);
		if (this._isFocus) {
			this._ele.input.focus();
		}
	}

	_stepDown() {
		if (this._ele.decreaseWrapper.hasClass("disable")) {
			if (this._isFocus) {
				this._ele.input.focus();
			}
			return;
		}
		const origin = this._inputValue();
		const value = round(origin, this._attr.step, this._attr.round);
        if (origin > value) {
            this.setValue(this._attr.range && value < this._attr.range.from ? this._attr.range.from : value);
        } else {
            this.setValue(this._attr.range && (value - this._attr.step) < this._attr.range.from ? this._attr.range.from : (value - this._attr.step));
		}
		if (this._isFocus) {
			this._ele.input.focus();
		}
	}

	setValue(_value_) {
		this._value = Number(_value_);
		let strVal = this._value;

        this._ele.input.val(strVal);
        this._updateControl(this._value);
	}

	_updateControl(value) {
		if (value == null) {
            value = this._value = this._inputValue() ? round(this._inputValue(), this._attr.step, this._attr.round) : NaN;
		}

		if (!isNaN(value)) {
			if (this._attr.range.from >= value) {
				this._ele.decreaseWrapper.addClass("disable");
			} else {
				this._ele.decreaseWrapper.removeClass("disable");
			}

			if (this._attr.range.to <= value) {
				this._ele.increaseWrapper.addClass("disable");
			} else {
				this._ele.increaseWrapper.removeClass("disable");
			}
		}
		/*
		 * Done Button will be disabled In the following cases:
		 * 1. It's Not Value
		 * 2. It's Not Integer
		 * 3. Out of range
		 * 4. Value does not fit the step
		 */
		const blocked =
			isNaN(value) ||
			(value % 1) ||
			(this._attr.range && (value < this._attr.range.from || value > this._attr.range.to)) ||
			(value % this._attr.step);
		LoggerD("Block Dialog:" + blocked);
		this._disableDialog(blocked);
	}

	_checkSIP() {
		var _currentSize = $(window).height() + $(window).width();
		if (_currentSize < this._originalSize) {
			this._isFocus = true;
			return true;
		} else {
			this._isFocus = false;
			return false;
		}
	}

	async show() {
		LoggerD('[SetValueDialog] show');
		if (!this._waitTimeoutHandle) {
			this._waitTimeoutHandle = setTimeout(() => {
				this._waitTimeoutHandle = 0;
			}, 400); // 400 ms is duration of transition.

			await super.show(true);
			await PromiseTransitionEnd(getHTMLElementFromJQuery(this.wrapper), {
				triggerFunc: () => {
					this.wrapper.addClass("slideup_animation");
				}
			});

			this._ele.background.on('click', this._onClickBackground.bind(this));

		} else {
			LoggerW("Wait for the show effect to finish.");
		}
	}

	async hide(opt) {
		LoggerD('[SetValueDialog] hide');
		if (!this._waitTimeoutHandle) {
			this._waitTimeoutHandle = setTimeout(() => {
				this._waitTimeoutHandle = 0;
			}, 400); // 400 ms is duration of transition.

			this._ele.background.off('click');

			await PromiseTransitionEnd(getHTMLElementFromJQuery(this.wrapper), {
				triggerFunc: () => {
					this.wrapper.removeClass("slideup_animation");
				}
			});

			await super.hide(opt);
		} else {
			LoggerW("Wait for the hide effect to finish.");
		}
	}
}


var Splash = function(_parentDiv_, _id_, _text_) {
	var _this = this;
	this.type = 'splash';
	this.eventList = {
		hide: function() {}
	};
	this.spinner = undefined;
	this.parentDiv = _parentDiv_;
	this.originBGColor = undefined;

	this.ele = {
		wrapper : $("<div id='"+ _id_ +"' class='iot_splash'></div>").addClass("wrapper"),
		background: $("<div class='iot_splash'></div>").addClass("background"),
		contents_wrapper : $("<div id='"+ _id_ +"' class='iot_splash'></div>").addClass("contents_wrapper"),
		spinner_wrapper : $("<div id='"+ _id_ +"' class='iot_splash'></div>").addClass("spinner_wrapper"),
		label : $("<div id='"+ _id_ +"' class='iot_splash'></div>").addClass("label").addClass("roboto-regular")
	}

	this.parentDiv.append(this.ele.wrapper);
	this.ele.wrapper.append(this.ele.background)
	this.ele.background.append(this.ele.contents_wrapper);
	this.ele.contents_wrapper.append(this.ele.spinner_wrapper);
	this.ele.contents_wrapper.append(this.ele.label);

	this.ele.wrapper.css('line-height', this.ele.wrapper.height() + 'px');
	this.ele.background.css('height', this.ele.wrapper.height() + 'px');
	this.ele.label.text(_text_);

	this.spinner = new Spinner(this.ele.spinner_wrapper, "Spinner" + _id_ , false, {size:'medium'});
	return this;
}

Splash.prototype = {
	show: function(_bgColorTransparencyFlag_) {
		this.parentDiv.removeClass('hide');
		this.ele.wrapper.addClass('show');
		if (this.spinner) {
			this.spinner.start();
		}

		if (_bgColorTransparencyFlag_) {
			this.originBGColor = this.ele.background.css("background-color");
			this.ele.background.css('background-color', this.originBGColor.replace('rgb', 'rgba').replace(')', ', 0.8)')); // 70%
		}

		this.ele.wrapper.css('line-height', ($('body').height() - 48) + 'px');
		if (this.parentDiv) {
			var parentTop = this.parentDiv.css("top").replace("px","");
			var centerPos = ((this.parentDiv.height() - this.ele.contents_wrapper.height()) / 2) - parentTop;
			this.ele.contents_wrapper.css("padding-top" , centerPos + 'px');
		}
		return this;
	},
	hide: function() {
		this.parentDiv.addClass('hide');
		this.ele.wrapper.removeClass('show');
		if (this.spinner) {
			this.spinner.stop();
		}
		this.ele.background.css('background-color', this.originBGColor);
		return this;
	}
}

var UndoController = function(_device_, _timeout_) {
	this.timeoutList = {};
	this.device = null;
	if (_device_) {
		this.device = _device_;
	}
	this.timeout = UNDO_TIMEOUT_VALUE;
	if (_timeout_) {
		this.timeout = _timeout_;
	}

	return this;
};

UndoController.prototype = {
	isWorking: function(_id_) {
		return this.timeoutList[_id_] ? true : false;
	},
	start: function(_id_, _doneFunc_, _undoFunc_, _previousVal_, _newVal_, _neterr_ = true) {
		this._neterr = _neterr_;
		LoggerD("UndoController start " + _id_ + " " + this.timeout);
		if (this.timeoutList[_id_] && this.timeoutList[_id_].tHandle) {
			clearTimeout(this.timeoutList[_id_].tHandle); //cancel previous timeout function
			this.timeoutList[_id_].tHandle = 0;
		}

		this.timeoutList[_id_] = { id: _id_, doneFunc: _doneFunc_, undoFunc: _undoFunc_, val: _previousVal_, newVal: _newVal_};
		this.timeoutList[_id_].tHandle = setTimeout(() => {
			LoggerD("it is expired: " + _id_);
			this.undo(_id_);
		}, this.timeout);
		this.timeoutList[_id_].state = 1; // timeout state 1: started, 2 : done, 3 : undo
		//it's for performance test
		let currentDate = new Date();
		this.timeoutList[_id_].startTime = currentDate.getTime();
	},
	mark: function (_id_) {
		if (this.timeoutList[_id_]) {
			this.timeoutList[_id_].markTime = new Date().getTime();
		}
	},
	done: function(_id_, _val_) {
		LoggerD("[ undoController done, " + _id_ + "]");
		if (this.timeoutList[_id_] && this.timeoutList[_id_].state === 1) {
			console.log("newVal:");
			console.log(JSON.stringify(this.timeoutList[_id_].newVal));
			console.log("_val_:" + JSON.stringify(_val_));
			/*
			this.timeoutList[_id_].state = 2; //done.
			*/
			if (this.timeoutList[_id_].newVal && _val_) {
				console.log("check new value");
				let keys = Object.keys(this.timeoutList[_id_].newVal);
				let skipFlag = false;
				if (keys.length > 0) {
					keys.forEach((v) => {
						let value = undefined;

						if (_isObject(_val_)) {
							if (Array.isArray(_val_[v])) {
								value = _val_[v][0];
							} else {
								value = _val_[v];
							}
						} else if (Array.isArray(_val_)) {
							if (!_val_[v]) {
								LoggerI("skip done function!, '" + v + "' is not key!");
								skipFlag = true;
							}

							value = _val_[v];
						}

						if (!_isUndefined(value)) {
							if (_isObject(value)) {
								for (const [key, val] of Object.entries(value)) {
									if (this.timeoutList[_id_].newVal[v].hasOwnProperty(key) && this.timeoutList[_id_].newVal[v][key] != val) {
										LoggerI("skip done function!, '" + key + "' value doesn't match! (" +
											this.timeoutList[_id_].newVal[v][key] + " : " + val);
										skipFlag = true;
									}
								}
							} else if (this.timeoutList[_id_].newVal[v] != value) {
								LoggerI("skip done function!, '" + v + "' value doesn't match!");
								skipFlag = true;
							}
						} else {
							LoggerE("Invalid Value Error !!");
							skipFlag = true;
						}
					});
				}

				if (skipFlag) {
					LoggerD("Exit 'done' function!");
					return false;
				}
			}

			if (this.timeoutList[_id_].tHandle) {
				clearTimeout(this.timeoutList[_id_].tHandle);
			}
			if (this.timeoutList[_id_].doneFunc) {
				this.timeoutList[_id_].doneFunc(_id_, this.timeoutList[_id_].val);
			}
			//it's for performance test
			var elapsedTime = new Date().getTime() - this.timeoutList[_id_].startTime;

			if (this.device) {
				LoggerI("HomeNet_Elapsed_time : " + this.device.deviceType + ", " + _id_ + ", " + elapsedTime + "ms");
				if (window.testMode && window.testMode.isStatisticsMode() && typeof addElapsedTimeLog === "function") {
					addElapsedTimeLog("SUCCESS", this.device.deviceHandle, _id_, this.timeoutList[_id_].startTime, new Date().getTime(), this.timeoutList[_id_].markTime);
				}
			} else {
				LoggerI("HomeNet_Elapsed_time : " + _id_ + ", " + elapsedTime + "ms");
			}

			delete this.timeoutList[_id_];
			return true;
		} else {
			LoggerW("The Undo Controller is not idle ");
			return true;
		}
	},
	undo: function(_id_) {
		LoggerD("[undoController undo, " + _id_ + "]");
		if (this.timeoutList[_id_] && this.timeoutList[_id_].state === 1) {
			if (this.timeoutList[_id_].tHandle) {
				clearTimeout(this.timeoutList[_id_].tHandle);
			}
			this.timeoutList[_id_].state = 3; //undo

			if (this.timeoutList[_id_].undoFunc) {
				let getRemoteVal = new Promise((resolve, reject) => {
					if (this.device) {
						try {
							this.device.getRemoteRepresentation(_id_, (r, h, u, v) => {
								if ( r  === "OCF_OK" ) {
									LoggerD("successfully,the remote value received.");
									resolve(v);
								} else {
									reject(new Error("getRemoteRepresentation return value is invalid!!, " + r));
								}
							}); //for update.
						} catch (e) {
							reject(e);
						}
					} else {
						reject(new Error("Empty device!!"));
					}
				});

				let remoteValTimeout = new Promise((resolve, reject) => {
					this.timeoutList[_id_].tHandle = setTimeout(() => {
						reject(new Error("Can't get getRemoteRepresentation result!!, Timmer Expired!!"));
					}, RETRY_TIMEOUT_VALUE);
				});

				Promise.race([getRemoteVal, remoteValTimeout]).then((result) => {
					if (window.testMode && window.testMode.isStatisticsMode() && typeof addElapsedTimeLog === "function") {
						addElapsedTimeLog("NO_SUB", this.device.deviceHandle, _id_, this.timeoutList[_id_].startTime, new Date().getTime(), this.timeoutList[_id_].markTime);
					}
					if (this.timeoutList[_id_] && this.timeoutList[_id_].tHandle) {
						clearTimeout(this.timeoutList[_id_].tHandle);
					}

					if (result && this.timeoutList[_id_]) {
						this.timeoutList[_id_].undoFunc(_id_, result);
					}
					delete this.timeoutList[_id_];
				}).catch((e) => {
					if (window.testMode && window.testMode.isStatisticsMode() && typeof addElapsedTimeLog === "function") {
						addElapsedTimeLog("FAIL", this.device.deviceHandle, _id_, this.timeoutList[_id_].startTime, new Date().getTime(), this.timeoutList[_id_].markTime);
					}

					if (this.timeoutList[_id_] && this.timeoutList[_id_].tHandle) {
						clearTimeout(this.timeoutList[_id_].tHandle);
					}
					LoggerE(e);
					LoggerI("Can't get device value from ST Cloud, so then, rollback to the previous value.");
					//show Network Error Dialog
					if (this._neterr) {
						window.HNView.showNetworkErrDlg(ST_API_DOES_NOT_WORK,false);
						if (window.HNCtrl.deviceConnectionState === DEVICE_INACTIVE) {
							toastPopup.showToast(C_('DEVICE_INACTIVE_TITLE'));
						} else if (window.HNCtrl.deviceConnectionState === DEVICE_DISCONNECTED) {
							toastPopup.showToast(C_('DEVICE_DISCONNECTED_TITLE'));
						}
					}

					this.timeoutList[_id_].undoFunc(_id_, this.timeoutList[_id_].val);
					delete this.timeoutList[_id_];
				});
			}
		} else {
			LoggerW("The Undo Controller is not idle");
		}
	}
}

//moreOptionDialog
var moreOptionDialog = function(_parent_, _id_, _items_) {
	var _this = this;
	this.parent = _parent_;
	this.type = "moreOptDlg";
	this.clickFlag = false;
	this._id = _id_;

	this.ele = {
		wrapper: $("<div id='"+ _id_ +"' class='iot_more_opt_dlg'></div>").addClass("wrapper"),
		contents_wrapper: $("<div id='"+ _id_ +"' class='iot_more_opt_dlg'></div>").addClass("contents_wrapper"),
		dropshadow1: $("<div id='"+ _id_ +"' class='iot_more_opt_dlg'></div>").addClass("dropshadow1")
	};

	this.parent.append(this.ele.wrapper);
	this.ele.wrapper.append(this.ele.contents_wrapper);
	this.ele.contents_wrapper.append(this.ele.dropshadow1);
	this.ele.wrapper.bind("touchstart", function(_e_) {
		if (_e_) {	// _e_ jQuery Event
			_e_.preventDefault();
		}
		_this.hide();
	});

	// VA
	this.ele.wrapper.attr('role','listbox');

	for (var i in _items_) {
		if (_items_.hasOwnProperty(i)) {
			this.addItem(i, _items_[i]);
		}
	}

	return this;
}

moreOptionDialog.prototype = {
	show: function() {
		this.ele.wrapper.css("display", "block");
		setTimeout(() => {
			this.ele.wrapper.addClass("show");
		}, 1);
	},
	hide: function() {
		this.ele.wrapper.removeClass("show");
		PromiseTransitionEnd(this.ele.contents_wrapper[0], {}).then(()=> {
			this.ele.wrapper.css("display", "none");
		});
	},
	addItem(i,_item) {
		let item = $("<div id='"+ this._id + i +"' class='iot_more_opt_dlg'></div>").addClass("item roboto-regular");
		this.ele['moreOptitem_' + i] = item;
		this.ele.dropshadow1.append(item);
		item.html('<span>' + i + '</span>');
		item.itemName = i;
		item.clickEvent = _item;
		item.setRipple('list');
		item.on("click", _e_ => {
			_e_.stopPropagation();
			if (this.clickFlag == false) {
				this.clickFlag = true;
				setTimeout(()=> { this.clickFlag = false }, 300);
				item.clickEvent();
			} else {
				LoggerI("Prevent double click!!");
			}
		});

		// VA
		this.ele['moreOptitem_' + i].attr('role','option');
	}
};

/***** TextButton *****/
var TextButton = function(_parent_, _id_, _text_) {
	var _this = this;
	this.type = "textButton";

	this.eventList = {
		click: function() {}
	};

	this.ele = {
		wrapper: $("<div id='"+ _id_ +"' class='iot_button'></div>").addClass("wrapper"),
		marginLeft: $("<div class='iot_button'></div>").addClass("margin_left"),
		text: $("<div class='iot_button'></div>").addClass("text").addClass("roboto-regular"),
		marginRight: $("<div class='iot_button'></div>").addClass("margin_right"),
	}

	this.ele.wrapper.append(this.ele.marginLeft);
	this.ele.wrapper.append(this.ele.text);
	this.ele.wrapper.append(this.ele.marginRight);
	_parent_.append(this.ele.wrapper);

	if (_text_) {
		this.ele.text.text(_text_);
	}

	this.ele.wrapper.bind("touchstart", function(_e_) {
		_e_.stopPropagation();
		_this.ele.wrapper.addClass('selected');
	});
	this.ele.wrapper.bind("touchend", function(_e_) {
		_e_.stopPropagation();
		_this.ele.wrapper.removeClass('selected');
	});
	this.ele.wrapper.on("click", function(_e_) {
		_e_.stopPropagation();
		_this.eventList.click();
	});

	return this;
}

TextButton.prototype = {
	setText : function(_text_) {
		if (_text_) {
			this.ele.text.text(_text_);
		}
	},
	setClickEvent: function(_func_) {
		if (_isFunction(_func_)) {
			this.eventList.click = _func_;
		}
	},
	setDim: function(_val_) {
		if (_val_) {
			this.ele.text.addClass("dim");
		} else {
			this.ele.text.removeClass("dim");
		}
	}
}

/***** Combo Button *****/
/* @param {String} _type_ : Type of FlatButton
 */
class FlatButton {
	constructor(_parent_, _id_, _label_, _type_) {
		this._parent = _parent_;
		this._id = _id_;
		this._type = 'flatButton';
		this._eventList = {
			click: function () { },
		};
		this._attr = {
			label: _label_
		};
		this._ele = {};

		this.init();
	}

	init() {
		Dom.build(c => {
			this._ele._wrapper = $(c.div( { id: this._id, className: 'iot_flatButton wrapper'},
				this._ele._marginLeft = $(c.div( { className: 'iot_flatButton margin_left'} )),
				this._ele._text = $(c.div( { className: 'iot_flatButton text roboto-medium'} )),
				this._ele._marginRight = $(c.div( { className: 'iot_flatButton margin_right'} ))
			));
			this._parent.prepend(this._ele._wrapper);
		});

		this._ele._text.html(this._attr.label);
		this._ele._wrapper.bind("click", _e_ => {
			if (this._eventList.click) {
				this._eventList.click();
			}
		});
	}

	get label() {
		return this._ele._text.text();
	}

	setLabel(_label_) {
		this._ele._text.text(_label_);
	}

	setDim(_val_) {
		if (_val_) {
			this._ele._wrapper.addClass("dim");
		} else {
			this._ele._wrapper.removeClass("dim");
		}
	}

	setDimUsable(_val_) {
		if (_val_) {
			this._ele._wrapper.addClass("dim_usable");
		} else {
			this._ele._wrapper.removeClass("dim_usable");
		}
	}

	setClickEvent(_func_) {
		if (_isFunction(_func_)) {
			this._eventList.click = _func_;
		}
	}

	getPress() {
		if (this._ele._wrapper.hasClass('pressed')) {
			return true;
		} else {
			return false;
		}
	}

	removePress() {
		if (this._ele._wrapper.hasClass('pressed')) {
			this._ele._wrapper.removeClass('pressed');
		}
	}

	get wrapper() {
		return this._ele._wrapper;
	}

	hideText(_value_) {
		if (_value_ && !this._ele._text.hasClass('hideText')) {
			this._ele._text.addClass('hideText');
		} else if (!_value_ && this._ele._text.hasClass('hideText')){
			this._ele._text.removeClass('hideText');
		}
	}
}

/////// Number Swiper
class numberSwiper {
    constructor(_id_, _parent_, _start_, _end_, {_title_, _current_, _update_, _unit_, _setBG_, _enableValueDlg_} = {}) {
		this._id = _id_;
		this._parent = _parent_;
		this._type = 'numberSwiper';
		this._range = [_start_, _end_];
		if (_title_) {
			this._title = _title_
		} else {
			this._title = undefined;
		}
		if (_current_) {
			this._current = _current_;
		} else {
			this._current_ = undefined;
		}
		this._prev = undefined;
		if (_update_) {
			this._update = _update_;
		} else {
			this._update = undefined;
		}
		if (_unit_) {
			this._unit = _unit_;
		} else {
			this._unit = undefined;
		}
		if (_setBG_) {
			this._setBG = _setBG_;
		} else {
			this._setBG = undefined;
		}
		if (_enableValueDlg_) {
			this._enableValueDlg = true;
		} else {
			this._enableValueDlg = false;
		}

		this._ele = {};

		this._touches = {
			start_X: undefined,		// Start Touch Point
			cur_X: undefined		// Current Touch Point (During Dragging)
		}
		this._pos_X = 0;			// Current Wrapper Position
		this._diff_X = 0;			// Moving Distance

		this._left_margin = 0;		// Active Number's Left Position in the Visible area

		// For Rotation
        this._screen = {
            height: screen.height,
            current_width: undefined,
			orientation: getScreenOrientation()
        }

		this._number = [{			// Contain the style value. [0] is normal(small), [1] is current(big)
			width: undefined,
			opacity: undefined,
			font_size: undefined,
			line_height: undefined,
			top_margin: undefined,
			side_margin: undefined,
			area: undefined,
			unit_font: undefined,
			unit_top_margin: undefined
		}, {} ];
		this._cur_number = undefined;

		this._isTouched = false;
		this._isMoved = false;
		this._clickFlag = false;
		this._rotationCheckHandle = undefined;
		this._rotationCheckCnt = 0;

		this.init();
	}

	get container() {
		return this._ele._swiper_container;
	}

	init() {
		Dom.build(c => {
			this._ele._swiper_container = $(c.div( { id: this._id + '_container', className: 'swiper-container'},
				this._ele._swiper_wrapper = $(c.div( { id: this._id + '_wrapper', className: 'swiper-wrapper swiper-effect'}
				))
			));
		});

		this._parent.append(this._ele._swiper_container);
		// this._ele._swiper_container.width(this._parent.width());
		// Init Number Items for Swiper
		for (var i = this._range[0] ; i <= this._range[1] ; i++){
			this._ele._number_wrapper = $(Dom.div( { id: 'number_wrapper_' + i, className: 'swiper-slide'}));
			this._ele._swiper_wrapper.append(this._ele._number_wrapper);
			this._ele._number = $(Dom.div( { id: 'number_' + i, className: 'swiper-number', innerText: String(i) }));
			this._ele._number_wrapper.append(this._ele._number);
			if (this._unit) {
				this._ele._unit = $(Dom.div( { id: 'degree_for_' + i, className: 'swiper-unit', innerText: this._unit}));
				this._ele._number_wrapper.append(this._ele._unit);
				this._ele._unit.hide();
			}
		}
        this._ele._swiper_wrapper.bind('touchstart', this._onNumberTouchStart.bind(this));
        this._ele._swiper_wrapper.bind('touchmove', this._onNumberTouchMove.bind(this));
		this._ele._swiper_wrapper.bind('touchend', this._onNumberTouchEnd.bind(this));

		this._number[0].width = parseFloat($('#number_wrapper_' + this._current).css('width'));
		this._number[0].opacity = parseFloat($('#number_wrapper_' + this._current).css('opacity'));
		this._number[0].font_size = parseFloat($('#number_' + this._current).css('font-size'));
		this._number[0].line_height = parseFloat($('#number_' + this._current).css('line-height'));
		this._number[0].top_margin = parseFloat($('#number_wrapper_' + this._current).css('margin-top'));
		this._number[0].side_margin = parseFloat($('#number_wrapper_' + this._current).css('margin-left'));
		this._number[0].area = this._number[0].width + (this._number[0].side_margin * 2);

		// Pre-set to get the attribute value
		$('#number_wrapper_' + this._current).addClass('active');
		$('#number_' + this._current).addClass('active');
		$('#degree_for_' + this._current).show();

		this._number[1].width = parseFloat($('#number_wrapper_' + this._current).css('width'));
		this._number[1].opacity = parseFloat($('#number_wrapper_' + this._current).css('opacity'));
		this._number[1].font_size = parseFloat($('#number_' + this._current).css('font-size'));
		this._number[1].line_height = parseFloat($('#number_' + this._current).css('line-height'));
		this._number[1].top_margin = parseFloat($('#number_wrapper_' + this._current).css('margin-top'));
		this._number[1].side_margin = parseFloat($('#number_wrapper_' + this._current).css('margin-left'));
		this._number[1].area = this._number[1].width + (this._number[1].side_margin * 2);

		this._screen.current_width = this.container.width();
		this._left_margin = this._getLeftMargin();

		if (this._unit) {
			this._number[1].unit_font = parseFloat($('#degree_for_' + this._current).css('font-size'));
			this._number[1].unit_top_margin = parseFloat( $('#degree_for_' + this._current).css('margin-top'));
			// hard coding......
			this._number[0].unit_font = this._number[1].unit_font * 0.35;
			this._number[0].unit_top_margin = this._number[1].unit_top_margin * 0.35;
		}

		this._setNumber(this._current, false);
		this._cur_number = this._current;
		this._prev = this._current;

		document.addEventListener("visibilitychange", this._undo.bind(this));
		window.addEventListener("orientationchange", this._onRotate.bind(this));
	}

	// TODO: Consider whether to move this function to the common to access from main.js.
	// Return to the original value when the number swiper operates abnormally.
	_undo() {
		if (document.hidden !== undefined) {
            if (document.hidden) {
				LoggerW("Error During Swiping. Return to original value " + this._current);
				this._setNumber(this._current);
            }
        }
	}

	_onRotate() {
		if (this._rotationCheckHandle) {
			clearInterval(this._rotationCheckHandle);
			this._rotationCheckHandle = 0;
		}

		this._rotationCheckHandle = setInterval(()=> {
				if ( this._screen.current_width !== this.container.width()) {
					clearInterval(this._rotationCheckHandle);
					this._rotationCheckHandle = 0;

					this._screen.current_width = this.container.width();
					this._left_margin = this._getLeftMargin();
					this._setNumber(this._current, false);
				} else {
					this._rotationCheckCnt += 1;
					if (this._rotationCheckCnt > 10) {
						clearInterval(this._rotationCheckHandle);
						this._rotationCheckHandle = 0;
					}
				}
			}, 100); // 100ms * 10
    }

	_getLeftMargin() {
		return parseFloat((this._screen.current_width) - this._number[1].width) / 2 - this._number[1].side_margin;
	}

	_getCurrent() {
		return this._current;
	}

	_swiper_effect(_val_) {
		if (_val_) {
			this._ele._swiper_wrapper.addClass("swiper-effect");
		} else {
			this._ele._swiper_wrapper.removeClass("swiper-effect");
		}

	}

    _onNumberTouchStart(_e_) {
		_e_.preventDefault();	// Duplicated Event Preventation
		window.skipRefresh(true); 	// prevent plugin refresh action.

		this._isTouched = true;
		this._isMoved = false;
		this._prev = this._current;

		this._touches.start_X = _e_.touches[0].clientX;
		this._swiper_effect(false);
		LoggerI("[SWIPER] Touch Start (" + this._touches.start_X + ")");
    }

    _onNumberTouchMove(_e_) {
		// LoggerI("[SWIPER] Touch Move");
		this._isTouched = true;
		// isMoved will be checked at the _moveWrapper() for tolerant
		// this._isMoved = false;

		// Check Touch point
		var cur_X = _e_.touches[0].clientX;
		this._touches.cur_X = cur_X;

		// Calculate movement distance
		this._diff_X = cur_X - this._touches.start_X;
		// Move the wrapper
		this._moveWrapper(this._pos_X + this._diff_X);
    }

    _onNumberTouchEnd(_e_) {
		LoggerI("[SWIPER] Touch End");
		if (_e_) {	// _e_ jQuery Event
			_e_.preventDefault();
		}
		if (!this._isMoved) {
			LoggerI("[SWIPER] CLICK EVENT");

			this._resetNumberItem(this._current - 1);
			this._resetNumberItem(this._current + 1);
			this._setNumber(this._current, true);

			if (_e_.target.innerText == this._current || _e_.target.innerText == this._unit) {
				LoggerI("[SWIPER] Open Dialog");
				if (this._enableValueDlg) {
					if (!this._setValueDlg) {
						var _that = this;
						let btnArr = {
							[C_("DIALOG_BUTTON_CANCEL")] (dlg) {
								LoggerD("Press Cancel Button");
								dlg.hide();
							},
							[C_("DIALOG_BUTTON_DONE")] (dlg, value) {
								LoggerD("Press Done Button, value:" + value);
								dlg.hide();

								if (_that._current !== value) {
									_that._setNumber(Number(value), true);
								}
							}
						};

						var _attr = {
							range: {
								from: this._range[0],
								to: this._range[1]
							},
							step: 1,
							unit: this._unit
						};

						this._setValueDlg = new SetValueDialog(this._id + "_SetValue", this._current, {
							parent: $("body"),
							title: this._title,
							range: _attr.range,
							step: _attr.step,
							btnArr: btnArr,
							unit: _attr.unit,
							done: C_("DIALOG_BUTTON_DONE")
						});
					} else {
						this._setValueDlg.setValue(this._current);
					}
					this._setValueDlg.show();
				}
			}
			else if (_e_.target.innerText >= this._range[0] && _e_.target.innerText <= this._range[1])
			{
				LoggerI("[SWIPER] Click on " + _e_.target.innerText);
				this._swiper_effect(true);
				this._setNumber(_e_.target.innerText, true);

			} else {
				LoggerI("[SWIPER] Ignore...");

			}
		} else {
			LoggerI("[SWIPER] DRAG EVENT");
			this._diff_X = Math.round(this._diff_X / this._number[0].area) * this._number[0].area;

			if (this._cur_number <= this._range[0]) {
				this._current = this._range[0];
			} else if (this._cur_number >= this._range[1]) {
				this._current = this._range[1];
			} else {
				this._current = this._cur_number;
			}

			this._resetNumberAll();

			$('#number_wrapper_' + this._current).removeAttr("style");
			$('#number_' + this._current).removeAttr("style");
			$('#number_wrapper_' + this._current).addClass("active");
			$('#number_' + this._current).addClass("active");
			$('#degree_for_' + this._current).show();

			this._setNumber(this._current, true);
		}

		this._isTouched = false;
		this._isMoved = false;

		window.skipRefresh(false); //allow plugin refresh action again
		this._swiper_effect(true);
	}

	_moveWrapper(_pos_) {
		this._ele._swiper_wrapper.css('transform', ("translateX(" + _pos_ + "px)"));

		// Percentage for Transfer
		var move_percent = (Math.abs(this._diff_X) / this._number[0].area);
		move_percent = move_percent - Math.floor(move_percent);

		// For Tolerant of the touch
		if (move_percent >= .1) {
			this._isMoved = true;
		}

		this._cur_number = this._current - parseInt(this._diff_X / this._number[0].area);

		this._resetNumberAll();

		$('#number_wrapper_' + this._cur_number).removeAttr("style");
		$('#number_' + this._cur_number).removeAttr("style");
		$('#number_wrapper_' + this._cur_number).addClass("active");
		$('#number_' + this._cur_number).addClass("active");
		$('#degree_for_' + this._cur_number).show();


		// Reset Size
		$('#number_wrapper_' + this._cur_number).css('width', (this._number[1].width + (this._number[0].width - this._number[1].width) * move_percent) + 'px');
		$('#number_wrapper_' + this._cur_number).css('opacity', (this._number[1].opacity + (this._number[0].opacity - this._number[1].opacity) * move_percent));
		$('#number_' + this._cur_number).css('font-size', (this._number[1].font_size + (this._number[0].font_size - this._number[1].font_size) * move_percent) + 'px');
		$('#number_' + this._cur_number).css('line-height', (this._number[1].line_height + (this._number[0].line_height - this._number[1].line_height) * move_percent) + 'px');
		$('#number_wrapper_' + this._cur_number).css('margin-top', (this._number[1].top_margin + (this._number[0].top_margin - this._number[1].top_margin) * move_percent) + 'px');
		$('#number_wrapper_' + this._cur_number).css('margin-left', (this._number[1].side_margin + (this._number[0].side_margin - this._number[1].side_margin) * move_percent) + 'px');
		$('#number_wrapper_' + this._cur_number).css('margin-right', (this._number[1].side_margin + (this._number[0].side_margin - this._number[1].side_margin) * move_percent) + 'px');

		$('#degree_for_' + this._cur_number).css('font-size', (this._number[1].unit_font  + (this._number[0].unit_font - this._number[1].unit_font) * move_percent) + 'px');
		$('#degree_for_' + this._cur_number).css('margin-top', (this._number[1].unit_top_margin + (this._number[0].unit_top_margin - this._number[1].unit_top_margin) * move_percent) + 'px');

		// Move Left and next number become bigger
		if (this._diff_X < 0) {
			$('#number_wrapper_' + (this._cur_number + 1)).css('width', (this._number[0].width + (this._number[1].width - this._number[0].width) * move_percent) + 'px');
			$('#number_wrapper_' + (this._cur_number + 1)).css('opacity', (this._number[0].opacity + (this._number[1].opacity - this._number[0].opacity) * move_percent));
			$('#number_' + (this._cur_number + 1)).css('font-size', (this._number[0].font_size + (this._number[1].font_size - this._number[0].font_size) * move_percent) + 'px');
			$('#number_' + (this._cur_number + 1)).css('line-height', (this._number[0].line_height + (this._number[1].line_height - this._number[0].line_height) * move_percent) + 'px');
			$('#number_wrapper_' + (this._cur_number + 1)).css('margin-top', (this._number[0].top_margin + (this._number[1].top_margin - this._number[0].top_margin) * move_percent) + 'px');
			$('#number_wrapper_' + (this._cur_number + 1)).css('margin-left', (this._number[0].side_margin + (this._number[1].side_margin - this._number[0].side_margin) * move_percent) + 'px');
			$('#number_wrapper_' + (this._cur_number + 1)).css('margin-right', (this._number[0].side_margin + (this._number[1].side_margin - this._number[0].side_margin) * move_percent) + 'px');

			$('#degree_for_' + (this._cur_number + 1)).show();
			$('#degree_for_' + (this._cur_number + 1)).css('font-size', (this._number[0].unit_font  + (this._number[1].unit_font - this._number[0].unit_font) * move_percent) + 'px');
			$('#degree_for_' + (this._cur_number + 1)).css('margin-top', (this._number[0].unit_top_margin + (this._number[1].unit_top_margin - this._number[0].unit_top_margin) * move_percent) + 'px');
		}
		// Move Right and previous number become bigger
		else if (this._diff_X > 0) {
			$('#number_wrapper_' + (this._cur_number - 1)).css('width', (this._number[0].width + (this._number[1].width - this._number[0].width) * move_percent) + 'px');
			$('#number_wrapper_' + (this._cur_number - 1)).css('opacity', (this._number[0].opacity + (this._number[1].opacity - this._number[0].opacity) * move_percent));
			$('#number_' + (this._cur_number - 1)).css('font-size', (this._number[0].font_size + (this._number[1].font_size - this._number[0].font_size) * move_percent) + 'px');
			$('#number_' + (this._cur_number - 1)).css('line-height', (this._number[0].line_height + (this._number[1].line_height - this._number[0].line_height) * move_percent) + 'px');
			$('#number_wrapper_' + (this._cur_number - 1)).css('margin-top', (this._number[0].top_margin + (this._number[1].top_margin - this._number[0].top_margin) * move_percent) + 'px');
			$('#number_wrapper_' + (this._cur_number - 1)).css('margin-left', (this._number[0].side_margin + (this._number[1].side_margin - this._number[0].side_margin) * move_percent) + 'px');
			$('#number_wrapper_' + (this._cur_number - 1)).css('margin-right', (this._number[0].side_margin + (this._number[1].side_margin - this._number[0].side_margin) * move_percent) + 'px');

			$('#degree_for_' + (this._cur_number - 1)).show();
			$('#degree_for_' + (this._cur_number - 1)).css('font-size', (this._number[0].unit_font  + (this._number[1].unit_font - this._number[0].unit_font) * move_percent) + 'px');
			$('#degree_for_' + (this._cur_number - 1)).css('margin-top', (this._number[0].unit_top_margin + (this._number[1].unit_top_margin - this._number[0].unit_top_margin) * move_percent) + 'px');
		}


		if (this._diff_X > 0 && move_percent >= 0.5) {	// Decrease Number
			this._cur_number--;
		} else if (this._diff_X < 0 && move_percent >= 0.5) {	// Increase Number
			this._cur_number++;
		}
		// LoggerD("[SWIPER] Diff : " + this._diff_X + "px (" + move_percent.toFixed(3) + "%) | Current : " + this._cur_number);
		this._setBG(this._cur_number, true);
	}

	_setNumber(_number_, _update_) {
		LoggerI("[SWIPER] Move to " + _number_);

		if (_number_ < this._range[0] || _number_ > this._range[1]) {
			LoggerE("[ERROR] Out of Range : " + this._range[0] + " ~ " + this._range[1]);
			return Error;
		}

		this._resetNumberItem(this._current);
		if (this._unit) {
			$('#degree_for_' + this._current).hide();
		}
		this._current = _number_;

		$('#number_' + this._current).removeAttr("style");
		$('#number_wrapper_' + this._current).addClass('active');
		$('#number_' + this._current).addClass('active');
		if (this._unit) {
			$('#degree_for_' + this._current).removeAttr("style");
			$('#degree_for_' + this._current).show();
		}

		this._pos_X = this._left_margin - ((this._current - this._range[0]) * this._number[0].area);

		this._ele._swiper_wrapper.css('transform', ("translateX(" + this._pos_X + "px)"));

		if (this._update && _update_ && (this._current != this._prev)) {
            this._update(this._current);
		}

		this._setBG(this._current, true);


		return this._current;
	}

	_resetNumberItem(_number_) {
		$('#number_wrapper_' + (_number_)).removeAttr("style");
		$('#number_' + (_number_)).removeAttr("style");
		$('#number_wrapper_' + (_number_)).removeClass("active");
		$('#number_' + (_number_)).removeClass("active");
		$('#degree_for_' + (_number_)).hide();
	}

	_resetNumberAll() {
		for (var i = this._range[0] ; i <= this._range[1] ; i++) {
			this._resetNumberItem(i);
		}
	}

	_getCenter() {
		var width = this._ele._swiper_container.width();
		// console.log(width);
		LoggerI("[SWIPER] Center is " + parseInt(width / 2));
		return parseInt(width / 2);
	}

	faint(_value_) {
		if (_value_) {
			$('#number_wrapper_' + this._current).addClass('faint');
		} else {
			$('#number_wrapper_' + this._current).removeClass('faint');
		}
	}

}

/***** SlideUpMenu *****/
class SlideUpMenu extends Dialog {
	constructor(id, {parent, btnArr, title, items}) {
		super(id, {parent, btnArr, title});
		this._class = "SlideUpMenuDialog";
		this._items = items;
		this._ele.items = [];
		this.eventList = {
			ok: function() {},
			cancel: function() {}
		}
		this._waitTimeoutHandle = undefined;
		this.buildLayout();
	}

	buildLayout() {
		super.init();

		this.background.addClass("slideup");
		this.wrapper.addClass("slideup iot_slideup list_wrapper");
		this.contents.addClass("slideup");

		for (var _i in this._items) {
			if (this._items.hasOwnProperty(_i)) {
				var obj = {
					wrapper: $("<div id='slideup_item' class='iot_slideup item_wrapper'></div>"),
					label: $("<div id='slideup_item' class='iot_slideup item_label'></div>").addClass("roboto-regular")
				}
				obj.key = this._items[_i].key;
				obj.wrapper.append(obj.label);
				obj.label.text(this._items[_i].label);
				obj.wrapper.on('click', function (idx, key, _e_) {
					_e_.stopPropagation();
					_e_.preventDefault();
					LoggerI("[SlideUpMenu] Selected : " + key);
					if (this.isVisible()) {
						if (this._ele.items[idx] && this._ele.items[idx].eventList && _isFunction(this._ele.items[idx].eventList.click)) {
							this._ele.items[idx].eventList.click(key);
						}
					}
				}.bind(this, _i, obj.key));

				obj.wrapper.setRipple('list');

				this._ele.items[_i] = obj;
				this._ele.items[_i].eventList = {
					click: function () {}
				}

				if (this._items[_i]['event']) {
					for (var _j in this._items[_i]['event']) {
						this._ele.items[_i]['eventList'][_j] = this._items[_i]['event'][_j]
					}
				}

				this.contents.append(obj.wrapper);
			}
		}
	}

	highlight(_current_) {
		for (var _i in this._ele.items) {
			if (_current_ == this._ele.items[_i].label.text()) {
				this._ele.items[_i].label.addClass('highlight');
			} else if (_current_ != this._ele.items[_i].label.text() && this._ele.items[_i].label.hasClass('highlight')) {
				this._ele.items[_i].label.removeClass('highlight');
			}
		}
	}

	_onClickBackground(_e_) {

		LoggerD("'[SlideUpMenu] click Background !!!!")
		if (this.isVisible()) {
			_e_.stopPropagation();
			_e_.preventDefault();
			this.hide();
		} else {
			LoggerW("Click Too Fast or Wrong Actions !!!");
		}
	}

	async show() {
		LoggerD('[SlideUpMenu] show');
		if (!this._waitTimeoutHandle) {
			this._waitTimeoutHandle = setTimeout(() => {
				this._waitTimeoutHandle = 0;
			}, 400); // 400 ms is duration of transition.

			await super.show(true);
			await PromiseTransitionEnd(getHTMLElementFromJQuery(this.wrapper), {
				triggerFunc: () => {
					this.wrapper.addClass("slideup_animation");
				}
			});

			this._ele.background.on('click', this._onClickBackground.bind(this));

		} else {
			LoggerW("Wait for the show effect to finish.");
		}
	}

	async hide(opt) {
		LoggerD('[SlideUpMenu] hide');

		if (!this._waitTimeoutHandle) {
			this._waitTimeoutHandle = setTimeout(() => {
				this._waitTimeoutHandle = 0;
			}, 400); // 400 ms is duration of transition.

			this._ele.background.off('click');
			await PromiseTransitionEnd(getHTMLElementFromJQuery(this.wrapper), {
				triggerFunc: () => {
					this.wrapper.removeClass("slideup_animation");
				}
			});

			await super.hide(opt);

		} else {
			LoggerW("Wait for the show effect to finish.");
		}
	}
}

// ### Activitys ###
class DeviceActivities {
	constructor(device) {
		this._class = 'DeviceActivities';
		this._listeners = {};
		this._activities = {};
		this._links = null;
		this._device = device;
		this._items = null;
		this._nextRequestBody = {
            before: null,
            beforeHash: null
        };
	}

	get activies() {
        return this._activities;
	}

	get today() {
        return new Date().toDateString();
    }

	get items() {
        return this._items;
	}

	get nextRequstUri() {
        if (this._links) {
            if (this._links.next) {
                return this._links.next.href;
            }
        }
        return null;
	}

	get device() {
		return this._device;
	}

	getDate(date) {
        if (date.toDateString() === this.today) {
            return C_('ACTIVITY_LOG_TODAY');
        }

		const options = {
				month: 'numeric',
				day: '2-digit',
				weekday: 'long'
        	};

		return date.toLocaleDateString(navigator.language, options);
	}

	getTime(epoch) {
        const time = new Date(epoch);
        const options = {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        };

        return time.toLocaleTimeString(navigator.language, options);
    }

	_onActivitiy(response) {
		LoggerI("Received Activity Data");
		if (response) {
			if (typeof response === 'string') {
				response = JSON.parse(response);
            }
		}

		this._items = response.items;
		LoggerI("Received Data Length:" + this._items.length);
		for (const item of this._items) {
			const day = this.getDate(new Date(parseInt(item.epoch)));
			const activity = {
				time: this.getTime(item.epoch),
				text: item.text,
				epoch: item.epoch
			};

			/* check duplication !!
			let duplicationFlag = false;
			let savedActivitys = this._activities[day];
			if (savedActivitys) {
				savedActivitys.forEach((acti) => {
					if (acti.epoch === activity.epoch) {
						LoggerI("epoch collision !!!");
						duplicationFlag = true;
					}
				});
			}

			if (duplicationFlag) {
				continue;
			}
			*/
			if (this._activities[day] === undefined) {
				this._activities[day] = new Array(activity);
			} else {
				this._activities[day].push(activity);
			}
		}

		if (this.items.length > 0) {
			const length = this.items.length - 1;
			this._nextRequestBody.before = this.items[length].epoch;
			this._nextRequestBody.beforeHash = this.items[length].hash;
		}

		this._links = response._links;
		return new Promise(resolve => {
			resolve(this._activities);
		});
	}

    getActivities(limit) {
        return this._getDeviceActivities(limit);
    }

    getNextActivities(limit) {
        if (this.nextRequstUri != null) {
            return this._getDeviceActivities(limit, this.nextRequstUri);
        } else {
            return Promise.reject(new Error('no activity history data'));
        }
	}

	_getDeviceActivities(limit, next_uri) {
		//this._activities = {}; //remove previous data.
        const requestBody = {
            limit,
            oldestFirst: false
        };

        if (next_uri) {
            //const nextRequestBody = getUrlParams(next_uri);
            requestBody.before = this._nextRequestBody.before;
            requestBody.beforeHash = this._nextRequestBody.beforeHash;
		} else {
			this._activities = {};
		}

		LoggerI("getActivities:" + JSON.stringify(requestBody));

		return promiseWithTimeout(
			new Promise((resolve, reject) => {
				if (this.device) {
					try {
						LoggerI("Request Activity Data");
						if (_isFunction(this.device.getActivityHistory)) {
							this.device.getActivityHistory (response => resolve(response), e => reject(e) , requestBody);
						} else {
							reject(new Error("Invalid Activity Function"));
						}
					} catch (e) {
						reject(e);
					}
				} else {
					reject(new Error("Empty device!!"));
				}
			})
			.then(this._onActivitiy.bind(this))
			.catch((e)=> { LoggerE("getActivityHistory failed...", e) })
			,25000);
	}
}

// ### HomeInsight
const Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
class HomeInsight {
    constructor(device, DPRsc, {component} = {}) {
		this._class = 'HomeInsight';
		if (!device || !DPRsc) {
            throw new Error('CAPABILITY IS REQUIRED');
		}

		if (DPRsc.uri) {
			const token = DPRsc.uri.split("/");
			if (token && token.length > 4 && token[1] === "capability") {
				this._capabilities = [token[2]];
			}
		}

        this._components = component ? component : 'main'; //default
        this._device = device;
        this._attribute = DPRsc.property;
	}

	async requestStatistics({ startTime, endTime, aggregate, count, attribute, options} = {}) {
        aggregate = aggregate || 'HOURLY';
        const endDate = new Date(endTime || undefined);
		let tick = 60 * 1000; // base 1 minute

		// start time
		if (!startTime) {
			count = count || 21;
			const startDate = new Date(endTime);
			switch (aggregate) {
			case 'FIVE_MINUTES':
				startTime = startDate.setMinutes(startDate.getMinutes() - count * 5, 0, 0);
				break;
			case 'HOURLY':
				startTime = startDate.setHours(startDate.getHours() - count, 0, 0, 0);
				break;
			case 'DAILY':
				startDate.setDate(startDate.getDate() - count);
				startTime = startDate.setHours(0, 0, 0, 0);
				break;
			default:
				break;
			}
		}

		const requestBody = {
            capabilities: this._capabilities,
			startTime: (!isFHub()) ? startTime : startTime.toString(),
			endTime: (!isFHub()) ? endTime : endTime.toString(),
            aggregate,
            timezone: (!isFHub()) ? Timezone : undefined,
            test: options
		};

		LoggerD("  [HomeInsight] body:" + JSON.stringify(requestBody));

		try {
			if (this._device) {
				const getHomeInsightInfo = (device, requestBody) => {
					return new Promise((resolve, reject) => {
						device.getDeviceStatistics(requestBody, representation => {
							if (representation && representation !== 'null') {
								resolve(representation);
							} else {
								reject(new Error('SCPluginApi REQUEST FAILED'));
							}
						}, () => {
							reject(new Error('SCPluginApi REQUEST FAILED'));
						});
					});
				}

				const result = await getHomeInsightInfo(this._device, requestBody);
				if (result && result.length) {
					const attr = this._attribute || attribute;
					//work around - adjusting timestamp
					if (requestBody.aggregate === 'DAILY' && result.length === 1) {
						let lastData = result[result.length -1];
						if (lastData.endTime > (new Date()).getTime()) {
							LoggerW("   [HomeInsight] This is data from the future. !!!");
							lastData.endTime = (new Date()).setHours(0,0,0,0);
							endTime = lastData.endTime;
						}
					}

					const interpolate = (array, lastItem, endTime) => {
						while (lastItem && lastItem.endTime < endTime) {
							const interpolated = JSON.parse(JSON.stringify(lastItem)); // clone
							interpolated.startTime = lastItem.endTime;
							interpolated.endTime = lastItem.endTime + (lastItem.endTime - lastItem.startTime);
							interpolated.interpolated = true;

							array.push(interpolated);
							lastItem = interpolated;
							LoggerI("   [HomeInsight] interpolated :" + JSON.stringify(interpolated));
						}
						return lastItem;
					};
					let lastItem = null;
					const dataset = result.reduce((array, statistic) => {
						if (attr && !statistic[attr]) {
							return array;
						}

						if (options && options.unit !== undefined) {
							if (options.unit.toLowerCase() === 'c' && statistic[attr].unit.toLowerCase() === 'f') {
								statistic[attr].avg = this.__f2c(statistic[attr].avg);
								statistic[attr].min = this.__f2c(statistic[attr].min);
								statistic[attr].max = this.__f2c(statistic[attr].max);
							} else if (options.unit.toLowerCase() === 'f' && statistic[attr].unit.toLowerCase() === 'c') {
								statistic[attr].avg = this.__c2f(statistic[attr].avg);
								statistic[attr].min = this.__c2f(statistic[attr].min);
								statistic[attr].max = this.__c2f(statistic[attr].max);
							}
						}

						interpolate(array, lastItem, statistic.startTime);
						lastItem = statistic;

						array.push(statistic);
						return array;
					},[]);

					interpolate(dataset, lastItem, endTime);

					const offset = 60 * 60 * 1000 * (new Date().getTimezoneOffset() / 60);
					const diff = new Date(dataset[0].endTime).getHours();
					if (aggregate === 'DAILY' && diff !== 0) {
						LoggerE(   '[HomeInsight] timezone mismatched');
						for (let item of dataset) {
							item.endTime = item.endTime + offset;
							item.startTime = item.startTime + offset;
						}
					}
					return dataset;
				}
			}
		} catch (e) {
            LoggerE("   [HomeInsight] exception : ", e);
        }

        return [];
	}

	async getStatistics(period, options, { type } = {}) {
		const NUMBER_OF_DATA_DEFAULT = 21;
		const NUMBER_OF_DATA_BAR_MINUTE = 12;
		const NUMBER_OF_DATA_BAR_HOURLY = 24;
		const NUMBER_OF_DATA_BAR_DAILY = 30;

		let cnt = NUMBER_OF_DATA_DEFAULT;
		if (type && type === 'BAR') {
			switch (period) {
				case 'FIVE_MINUTES':
					cnt = NUMBER_OF_DATA_BAR_MINUTE;
					break;
				case 'HOURLY':
					cnt = NUMBER_OF_DATA_BAR_HOURLY;
					break;
				case 'DAILY':
					cnt = NUMBER_OF_DATA_BAR_DAILY;
					break;
				default:
					break;
			}
		}
		return this.requestStatistics({
			endTime: Date.now(),
			count: cnt,
			aggregate: period,
			options
		});
	}

	__c2f(celcious) {
        return Number((celcious * 1.8 + 32).toFixed(2));
    }

    __f2c(fahrenheit) {
        return Number(((fahrenheit - 32) / 1.8).toFixed(2));
    }
}

function connectObjects(origObject, ...connectedObjects) {
    return new Proxy(origObject, {
        get(target, property, receiver) {
            const value = Reflect.get(target, property);

            if (typeof value === 'object') {
                if (!Reflect.has(target, `proxy_${property}`)) {
                    Reflect.defineProperty(target, `proxy_${property}`, {
                        value: connectObjects(value, ...connectedObjects.map(obj => Reflect.get(obj, property))),
                        writable: false
                    });
                }

                return Reflect.get(target, `proxy_${property}`);
            } else if (typeof value === 'function') {
                return function () {
                    // original call
                    const result = Reflect.apply(value, target, arguments);

                    // call same method of all connected objects
                    connectedObjects.forEach(obj => Reflect.apply(obj[property], obj, arguments));

                    return result;
                };
            } else {
                return value;
            }
        },
        set(target, property, value, receiver) {
            // original setter
            const result = Reflect.set(target, property, value);

            // setter of original object was succeeded, set to all connected objects
            if (result) {
                connectedObjects.forEach(obj => Reflect.set(obj, property, value));
            }

            return result;
        }
    });
}

function connectCanvases(origCanvas, ...connectedCanvases) {
    // connect context proxy first
    const contextProxy = connectObjects(origCanvas.getContext('2d'), ...connectedCanvases.map(canvas => canvas.getContext('2d')));

    const result = new Proxy(origCanvas, {
        get(target, property, receiver) {
            if (property === 'parentNode') {
                // workaround for Chart.js.
                // this library requires canvas as Element but this instance is Proxy
                // so avoid checking it. and it works well.
                return undefined;
            }

            const value = Reflect.get(target, property);

            if (typeof value === 'object') {
                if (!Reflect.has(target, `proxy_${property}`)) {
                    Reflect.defineProperty(target, `proxy_${property}`, {
                        value: connectObjects(value, ...connectedCanvases.map(canvas => Reflect.get(canvas, property))),
                        writable: false
                    });
                }

                return Reflect.get(target, `proxy_${property}`);
            } else if (typeof value === 'function') {
                return function () {
                    // return context proxy instead of raw context.
                    if (property === 'getContext' && arguments[0] === '2d') {
                        return contextProxy;
                    }

                    // original call
                    const result = Reflect.apply(value, target, arguments);

                    // call same method of all connected canvases
                    connectedCanvases.forEach(canvas => Reflect.apply(canvas[property], canvas, arguments));

                    return result;
                };
            } else {
                // original value
                return value;
            }
        },
        set(target, property, value, receiver) {
            // original setter
            const result = Reflect.set(target, property, value);

            // setter of original canvas was succeeded, set to all connected canvases
            if (result) {
                connectedCanvases.forEach(canvas => Reflect.set(canvas, property, value));
            }

            return result;
        }
    });

    Reflect.defineProperty(contextProxy, 'proxy_canvas', { value: result, writable: false }); // update canvas to proxy instance

    return result;
}

function getNextTick(aggregate, timestamp, nth = 1) {
    const date = new Date(timestamp);

    switch (aggregate) {
	case 'FIVE_MINUTES':
		date.setMinutes(date.getMinutes(), 0, 0);

		if (timestamp === date.getTime()) {
			nth--;
		}

		if (nth > 0) {
			date.setMinutes(date.getMinutes() + nth * 5);   //five minutes
		}
		break;
    case 'HOURLY':
        date.setHours(date.getHours(), 0, 0, 0);

        if (timestamp === date.getTime()) {
            nth--;
        }

        if (nth > 0) {
            date.setHours(date.getHours() + nth);
        }
		break;
    case 'DAILY':
        date.setHours(0, 0, 0, 0);

        if (timestamp === date.getTime()) {
            nth--;
        }

        if (nth > 0) {
            date.setDate(date.getDate() + nth);
		}
		break;
	}
	return date.getTime();
}

function getPrevTick(aggregate, timestamp, nth = 1) {
    const date = new Date(timestamp);
    nth--;

    switch (aggregate) {
	case 'FIVE_MINUTES':
		date.setMinutes(date.getMinutes(), 0, 0);

		if (timestamp === date.getTime()) {
			nth++;
		}

		if (nth > 0) {
			date.setMinutes(date.getMinutes() - nth * 5);
		}

		break;
    case 'HOURLY':
        date.setHours(date.getHours(), 0, 0, 0);

        if (timestamp === date.getTime()) {
            nth++;
        }

        if (nth > 0) {
            date.setHours(date.getHours() - nth);
        }

        break;

    case 'DAILY':
        date.setHours(0, 0, 0, 0);

        if (timestamp === date.getTime()) {
            nth++;
        }

        if (nth > 0) {
            date.setDate(date.getDate() - nth);
        }

        break;
	}
	return date.getTime();
}

// constant
const PointRadius = 4; // 8px
const PointHoverRadius = 5; // 10px
const NowLabelPadding = 12;
const NowLabelFontSize = 12;
const TooltipMargin = 4;
const PrimaryColor = '#3695dd';
const HighlightLineColor = 'rgb(156,156,156,0.4)';
let hasNegativeValue = false;

const TicksPositionPlugin = {
    beforeDraw: function(chart) {
        var ctx = chart.ctx;
        var yAxis = chart.scales['y-axis-0'];
        let tickGap = [];
        let gap = 0;

        tickGap[0] = yAxis.getPixelForTick(1) - yAxis.getPixelForTick(0);
        tickGap[1] = yAxis.getPixelForTick(2) - yAxis.getPixelForTick(1);

        if (tickGap[0] !== 0 && tickGap[0] < 12) {
            gap = 12;
        } else if (tickGap[1] !== 0 && tickGap[1] < 12) {
            gap = -12;
        }

        chart.scales['y-axis-0'].options.ticks.fontColor = 'transparent'; // hide original tick
        chart.scales['y-axis-0'].options.ticks.major.fontColor = 'transparent'; // hide original tick
        chart.scales['y-axis-0'].options.ticks.minor.fontColor = 'transparent'; // hide original tick
        // loop through ticks array
        Chart.helpers.each(yAxis.ticks, function(tick, index) {
            // if (index === yAxis.ticks.length - 1) return;
            var xPos = yAxis.right;
            var yPos = yAxis.getPixelForTick(index);
            var xPadding = -8;
            // draw tick
            ctx.save();
            ctx.font = "12px 'Helvetica Neue', Helvetica, Arial, sans-serif";
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'right';
			ctx.fillStyle = '#979797';
            ctx.fillText(tick, xPos - xPadding, yPos + (index === 1 ? gap : 0));
            ctx.restore();
        });
    }
 }

const LineVerticalLinePlugin = {
	getLinePosition(chart) {
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        return data[data.length - 1]._model.x;
    },
    renderVerticalLine(chartInstance) {
        const lineLeftOffset = this.getLinePosition(chartInstance);
        const scale = chartInstance.scales['y-axis-0'];
        const context = chartInstance.chart.ctx;

        context.save();

        // render vertical line
        context.beginPath();
        context.setLineDash([2]);
        context.strokeStyle = PrimaryColor;
        context.lineWidth = 1,
        context.moveTo(lineLeftOffset, 24);
        context.lineTo(lineLeftOffset, scale.bottom);
        context.stroke();
        context.setLineDash([]);
        context.closePath();

        // write label
        context.fillStyle = PrimaryColor;
        context.textAlign = 'center';
        context.textBaseline = 'hanging';
        context.font = context.font.replace(/\d+px/, `${NowLabelFontSize}px`).replace(/bold/, '');
        context.fillText(C_('GRAPH_LABEL_NOW'), lineLeftOffset - 1, 10);

        context.restore();
    },
    afterDatasetsDraw: function (chart) {
        this.renderVerticalLine(chart);
    }
};

const BarVerticalLinePlugin = {
    getLinePosition(chart) {
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        return data[data.length - 2]._model.x;
    },
    renderVerticalLine(chartInstance) {
        const lineLeftOffset = this.getLinePosition(chartInstance);
        const scale = chartInstance.scales['y-axis-0'];
        const context = chartInstance.chart.ctx;

        context.save();

        // render vertical line
        context.beginPath();
        context.strokeStyle = HighlightLineColor;
        context.lineWidth = 7,
        context.moveTo(lineLeftOffset, 21);
        context.lineTo(lineLeftOffset, scale.bottom);
        context.stroke();
        context.closePath();

        context.restore();
    },
    afterDatasetsDraw: function (chart) {
        this.renderVerticalLine(chart);
    }
};

function initChartJS() {
	// draws a rectangle with a rounded top
	Chart.helpers.drawRoundedTopRectangle = function (ctx, x, y, width, height, radius, negative) {
		if (negative === false) {
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			// top right corner
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			// bottom right	corner
			ctx.lineTo(x + width, y + height);
			// bottom left corner
			ctx.lineTo(x, y + height);
			// top left
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();
		} else {
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			// top right corner
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y - radius);
			// bottom right	corner
			ctx.lineTo(x + width, y + height);
			// bottom left corner
			ctx.lineTo(x, y + height);
			// top left
			ctx.lineTo(x, y - radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();
		}
	};

	Chart.elements.RoundedTopRectangle = Chart.elements.Rectangle.extend({
		draw: function () {
			const ctx = this._chart.ctx;
			const vm = this._view;
			let left, right, top, bottom, signX, signY, borderSkipped;
			let borderWidth = vm.borderWidth;

			if (!vm.horizontal) {
			// bar
				left = vm.x - vm.width / 2;
				right = vm.x + vm.width / 2;
				top = vm.y;
				bottom = hasNegativeValue === true ? vm.base : this._yScale.bottom;
				signX = 1;
				signY = bottom > top ? 1 : -1;
				borderSkipped = vm.borderSkipped || 'bottom';
			} else {
			// horizontal bar
				left = vm.base;
				right = vm.x;
				top = vm.y - vm.height / 2;
				bottom = vm.y + vm.height / 2;
				signX = right > left ? 1 : -1;
				signY = 1;
				borderSkipped = vm.borderSkipped || 'left';
			}

			// Canvas doesn't allow us to stroke inside the width so we can
			// adjust the sizes to fit if we're setting a stroke on the line
			if (borderWidth) {
			// borderWidth shold be less than bar width and bar height.
				const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
				borderWidth = borderWidth > barSize ? barSize : borderWidth;
				const halfStroke = borderWidth / 2;
				// Adjust borderWidth when bar top position is near vm.base(zero).
				const borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
				const borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
				const borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
				const borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
				// not become a vertical line?
				if (borderLeft !== borderRight) {
					top = borderTop;
					bottom = borderBottom;
				}
				// not become a horizontal line?
				if (borderTop !== borderBottom) {
					left = borderLeft;
					right = borderRight;
				}
			}

			// calculate the bar width and roundess
			const barWidth = Math.abs(left - right);
			const roundness = this._chart.config.options.barRoundness || 0.5;
			const radius = barWidth * roundness * 0.5;

			// keep track of the original top of the bar
			const prevTop = top;

			// move the top down so there is room to draw the rounded top
			top = prevTop + radius;
			const barRadius = top - prevTop;

			ctx.beginPath();
			ctx.fillStyle = vm.backgroundColor;
			ctx.strokeStyle = vm.borderColor;
			ctx.lineWidth = borderWidth;

			// draw the rounded top rectangle
			let negative = false;
			if (this._chart.config.data.datasets[0].data[this._index].y < 0) {
				negative = true;
			}
			Chart.helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop, barRadius, negative);

			ctx.fill();
			if (borderWidth) {
				ctx.stroke();
			}

			// restore the original top value so tooltips and scales still work
			top = prevTop;
		}
	});

	Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);

	Chart.controllers.roundedBar = Chart.controllers.bar.extend({
		dataElementType: Chart.elements.RoundedTopRectangle
	});
}

class LineGraph {
    constructor(id, attribute, period, { fractionDigits } = {}) {
		this._id = id;
        this._attribute = attribute;
        this._eventList = {
			'period' : function() {}
		};

        this._xAxisTickWidth = 46;
		this._fractionDigits = fractionDigits || 1; // 1 fraction digit by default

		// layout
		this._container = Dom.div({ className: 'ux2-card__graph hide' },
            this._tabContainer = Dom.div({ className: 'ux2-card-graph__tab__container' }),
            this._canvasWrapper = Dom.div({ className: 'ux2-card-graph__canvas__wrapper' },
                this._yAxisWrapper = Dom.div({ className: 'ux2-card-graph__canvas__y-axis__wrapper' },
                    this._yAxisCanvas = Dom.canvas({ id: `${id}_Canvas_${attribute}_YAxis`, width: 0, height: 190 })
                ),
                this._canvasGraphWrapper = Dom.div({ className: 'ux2-card-graph__canvas__graph__wrapper' },
                    this._canvasGraphCropWrapper = Dom.div({ className: 'ux2-card-graph__canvas__graph__crop__wrapper' },
                        this._canvas = Dom.canvas({ id: `${id}_Canvas_${attribute}`, width: 1080, height: 190 })
                    )
                )
            )
		);

		this._connectedCanvas = connectCanvases(this._canvas, this._yAxisCanvas);

		// tab
		this._tabItems = {};

		this._period = period[0];
		const periodList = {
            FIVE_MINUTES: {
                label: C_('GRAPH_BUTTON_MINUTE'),
                checked: false
            },
            HOURLY: {
                label: C_('GRAPH_BUTTON_HOUR'),
                checked: false
            },
            DAILY: {
                label: C_('GRAPH_BUTTON_DAY'),
                checked: false
            }
		};

		let supportedPeriod = {};

		for (const item of period) {
			if (periodList[item] !== undefined) {
				supportedPeriod[item] = periodList[item];
			}
		}

		supportedPeriod[period[0]].checked = true;


		for (const key in supportedPeriod) {
            if (this._tabContainer.firstChild) {
				this._tabContainer.appendChild(Dom.div({ className: 'ux2-card-graph__tab__divider' }));
            }

			const button = Dom.div({ id: key, className: 'ux2-card-graph__tab__wrapper' }, supportedPeriod[key].label);
			$(button).toggleClass('clicked', supportedPeriod[key].checked)
			$(button).click(()=>{
				this.toggleTab(key);
				this._period = key;
				if (this._eventList.period) {
					this._eventList.period(this._attribute, key);
				}
			});
			$(button).setRipple('circle');
            this._tabItems[key] = button;
            this._tabContainer.appendChild(button);
        }
	}

	setOnPeriodTabClickedListener(listener) {
		this._eventList['period'] = listener;
	}

	get container() {
        return this._container;
    }

    get attribute() {
        return this._attribute;
    }

    get period() {
        return this._period;
	}

	toggleTab(checked) {
        for (const key in this._tabItems) {
			if (this._tabItems.hasOwnProperty(key)) {
				$(this._tabItems[key]).toggleClass('clicked', checked === key);
			}
        }
	}

	_getContainerWidth() {
        if ($(this._container).hasClass('hide')) {
			$(this._container).removeClass('hide');
            this._container.offsetHeight;
            const result = this._container.offsetWidth;
			$(this._container).addClass('hide');
			console.log("!!! milkelf:: getContainerWidth:");
            console.log(result);
            return result;
        } else {
			console.log("!!! milkelf:: getContainerWidth2");
            console.log(this._container.offsetWidth);
            this._container.offsetHeight;
            return this._container.offsetWidth;
        }
    }

	show(visible) {
        $(this._container).toggleClass('hide', !visible);

        if (visible) {
            // reflow
			(() => this._container.offsetHeight)();
			this.resize();
        }
	}

	resize() {
		if (this._chart) {
            this._canvasGraphWrapper.scrollLeft = this._canvasGraphWrapper.scrollWidth;
        }
	}
	draw(data, { min, max, unit, negativeNumber } = {}) {
        if (!data) {
            return;
        }

        if (this._chart != null) {
            this._chart.clear();
            this._chart.destroy();
        }

        // draw
        const hidden = $(this._container).hasClass('hide');
        if (hidden) {
           $(this._container).hasClass('hide');
        }

        console.log("!!!! draw  Line Chart !!!!");

        const ctx = this._connectedCanvas.getContext('2d');
        const width = this._getContainerWidth();
        this._connectedCanvas.width = Math.max(data.length * this._xAxisTickWidth, width);

        const BackgroundGradation = ctx.createLinearGradient(0, 21, 0, 148);
        BackgroundGradation.addColorStop(0, 'rgba(60, 171, 255, .3)');
        BackgroundGradation.addColorStop(1, 'rgba(229, 244, 255, .3)');

        // info
        this._yAxisWidth = 0;
        this._drawn = false;

        const firstItem = data[0];
        const lastItem = data[data.length - 1];

        const timeConfig = {
            displayFormats: {},
            stepSize: 1
        };

        // x-scale min/max
        if (firstItem === lastItem) {
            timeConfig.min = getPrevTick(this._period, firstItem.t);
        } else {
            timeConfig.min = getNextTick(this._period, firstItem.t); // because we draw point at the end of tick
        }

        if (data.length < 7) {
            timeConfig.max = getNextTick(this._period, lastItem.t, 7 - data.length + 1); // at least 7 ticks
        } else {
            timeConfig.max = getNextTick(this._period, lastItem.t);
        }

        const origMax = max;

        // adding buffer space to avoid chopping of data points
        let extra = (max - min) / 5;
        max += extra;

        // calculating interval
        let interval = (max - min) / 4;

        // fixing max to 1 decimal point
        max = Math.ceil(max * 10) / 10;
        // fixing interval to 1 decimal point
        interval = Math.ceil(interval * 10) / 10;

        // handling min==max case
        if (extra === 0) {
            max = max += 1;
            interval = .5;
        }

        // handling negative limitation to avoid showing negative values when data received is positive
        if (min >= 0) {
            if ((max - 4 * interval) < 0) {
                extra = Math.abs((max - 4 * interval));
                max += extra;
                max = Math.ceil(max * 10) / 10;
            }
        }

        // handling positive limitation to avoid showing positive values when data received is negative
        if (origMax < 0) {
            if (max > 0) {
                max = 0;
            }
        }

        // 4 steps and 1 space
        min = max - 4 * interval;
        const step = interval;
        // const delta = 4 * interval;

        switch (this._period) {
        case 'HOURLY':
            timeConfig.unit = 'hour';
            timeConfig.displayFormats.hour = 'k';
            break;

        case 'DAILY':
            timeConfig.unit = 'day';
            timeConfig.displayFormats.day = 'D';
            break;
        }

        this._chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        data: data.filter(item => item.y != null)
                    }
                ]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                spanGaps: true,
                elements: {
                    point: {
                        backgroundColor: PrimaryColor,
                        radius: PointRadius,
                        hoverRadius: PointHoverRadius,
                        hitRadius: 15 // wide touch area
                    },
                    line: {
                        tension: 0,
                        backgroundColor: BackgroundGradation,
                        borderWidth: 1,
                        borderColor: PrimaryColor
                    }
                },
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-0',
                            display: true,
                            type: 'linear',
                            gridLines: {
                                drawBorder: false,
                                lineWidth: .5,
                                color: '#cfcfcf',
                                zeroLineWidth: 1,
                                zeroLineColor: '#cfcfcf'
                            },
                            ticks: {
                                padding: NowLabelPadding,
                                fontSize: 12,
                                fontColor: '#979797',
                                stepSize: step,
                                min,
                                max,
                                callback: value => value.toLocaleString(undefined, { minimumFractionDigits: this._fractionDigits, maximumFractionDigits: this._fractionDigits || 20 })
                            },
                            position: 'left',
                            afterBuildTicks: scale => {
                                scale.ticks = [scale.max, scale.max - step, scale.max - step * 2, scale.max - step * 3, scale.max - step * 4, scale.min];
                            },
                            afterFit: scale => {
                                this._yAxisWidth = Math.ceil(scale.longestLabelWidth + 15); // label max width + label padding (default 12)

                                this._yAxisWrapper.style.width = `${this._yAxisWidth}px`;
                                this._canvasGraphCropWrapper.style.width = `${parseInt(this._canvas.style.width) - this._yAxisWidth}px`;
                            }
                        }
                    ],
                    xAxes: [
                        {
                            id: 'x-axis-0',
                            display: true,
                            gridLines: {
                                display: false
                            },
                            type: 'time',
                            time: timeConfig
                        }
                    ]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'nearest',
                    bodyFontSize: 12,
                    bodyFontColor: '#fafafa',
                    backgroundColor: PrimaryColor,
                    cornerRadius: 0,
                    xAlign: 'left',
                    yAlign: 'center',
                    xPadding: 8,
                    yPadding: isItIOS() ? 2 : 4, // for vertical align
                    caretSize: 4,
                    caretPadding: 0,
                    displayColors: false,
                    position: 'nearest',
                    footerFontSize: 4,
                    footerMarginTop: 0,
                    footerFontColor: PrimaryColor,
                    custom: tooltip => {
                        if (!tooltip || !tooltip.dataPoints) {
                            return;
                        }

                        const point = tooltip.dataPoints[0];

                        // workaround for caret and body
                        const workaround = tooltip.caretSize + PointHoverRadius + TooltipMargin;
                        if ((point.x + tooltip.width + workaround - this._yAxisWidth) > this._canvasGraphWrapper.scrollLeft + this._canvasGraphWrapper.clientWidth) {
                            tooltip.xAlign = 'right';
                            tooltip.x = point.x - (tooltip.width + workaround);
                        } else {
                            tooltip.x = point.x + workaround;
                        }
                        tooltip.caretX = tooltip.x + tooltip.caretSize;
                    },
                    callbacks: {
                        title: function () {
                            return '';
                        },
                        label: item => ((item.yLabel != null) ? item.yLabel.toLocaleString(undefined, { minimumFractionDigits: this._fractionDigits, maximumFractionDigits: this._fractionDigits || 20 }) : null),
                        footer: function () {
                            return isItIOS() ? ' ' : null; // for vertical align
                        }
                    }
                },
                animation: {
                    // delay: 200,
                    duration: 300,
                    easing: 'easeInOutSine'
                },
                hover: {
                    animationDuration: 0
                },
                layout: {
                    padding: {
                        top: 21,
                        right: 12
                    }
                }
            },
            plugins: [LineVerticalLinePlugin]
        });

        if (hidden) {
            $(this._container).addClass('hide');
        }
    }

}

class BarGraph {
	constructor(id, attribute, period, { fractionDigits } = {}) {
		this._id = id;
        this._attribute = attribute;
		this._listeners = {};

		this._xAxisTickWidth = 9;
		this._fractionDigits = fractionDigits || 1; // 1 fraction digit by default

		// layout
		this._container = Dom.div({ className: 'ux2-card__graph hide' },
			this._tabContainer = Dom.div({ className: 'ux2-card-graph__tab__container' }),
			this._canvasWrapper = Dom.div({ className: 'ux2-card-graph__canvas__wrapper' },
				this._canvas = Dom.canvas({ id: `${id}_Canvas_${attribute}`, width: 360, height: 190 })
			)
		);

		// tab
        this._tabItems = {};
		this._period = period[0];

		const periodList = {
            FIVE_MINUTES: {
                label: C_('GRAPH_BUTTON_MINUTE'),
                checked: false
            },
            HOURLY: {
                label: C_('GRAPH_BUTTON_HOUR'),
                checked: false
            },
            DAILY: {
                label: C_('GRAPH_BUTTON_DAY'),
                checked: false
            }
		};

		let supportedPeriod = {};

        for (const item of period) {
            if (periodList[item] !== undefined) {
                supportedPeriod[item] = periodList[item];
            }
        }

		supportedPeriod[period[0]].checked = true;

		for (const key in supportedPeriod) {
			if (this._tabContainer.firstChild) {
                this._tabContainer.appendChild(Dom.div({ className: 'ux2-card-graph__tab__divider' }));
            }

			const button = Dom.div({ id: key, className: 'ux2-card-graph__tab__wrapper' }, supportedPeriod[key].label);
			$(button).toggleClass('clicked', supportedPeriod[key].checked);
			$(button).click(()=>{
				this.toggleTab(key);
				this._period = key;
				if (this._listeners.onPeriodTabClicked) {
					this._listeners.onPeriodTabClicked(this._attribute, key);
				}
			});
			$(button).setRipple('circle');

			this._tabItems[key] = button;
            this._tabContainer.appendChild(button);
		}
	}

	get container() {
        return this._container;
    }

    get attribute() {
        return this._attribute;
    }

    get period() {
        return this._period;
    }

    setOnPeriodTabClickedListener(listener) {
        this._listeners.onPeriodTabClicked = listener;
	}

	show(visible) {
        $(this._container).toggleClass('hide', !visible);

        if (visible) {
            // reflow
			(() => this._container.offsetHeight)();

			this.resize();
        }
	}

	toggleTab(checked) {
        for (const key in this._tabItems) {
			if (this._tabItems.hasOwnProperty(key)) {
				$(this._tabItems[key]).toggleClass('clicked', checked === key);
			}
        }
	}

	_getContainerWidth() {
        if ($(this._container).hasClass('hide')) {
			$(this._container).removeClass('hide');
            this._container.offsetHeight;
            const result = this._container.offsetWidth;
            $(this._container).addClass('hide');
            return result;
        } else {
            this._container.offsetHeight;
            return this._container.offsetWidth;
        }
	}

	resize() {
        if (this._chart) {
            this._canvasWrapper.scrollLeft = this._canvasWrapper.scrollWidth;
        }
	}

	draw(data, { min, max, unit, negativeNumber } = {}) {
        if (!data) {
            return;
		}

		if (this._chart != null) {
            this._chart.clear();
            this._chart.destroy();
		}

		const hidden = $(this._container).hasClass('hide');
		if (hidden) {
            $(this._container).removeClass('hide');
		}

		let len = 0;
        let buffer = 0;
		hasNegativeValue = false;

		switch (this._period) {
            case 'FIVE_MINUTES':
                len = 13;
                buffer = 1000 * 60 * 5;
				break;
			case 'HOURLY':
				len = 27;
				buffer = 1000 * 60 * 60;
				break;
			case 'DAILY':
				len = 33;
				buffer = 1000 * 60 * 60 * 24;
				break;
			default:
				break;
		}

		for (const item of data) {
            if (item.y < 0) {
                hasNegativeValue = true;
                break;
            }
		}

		data.unshift({
            t: data[0].t - buffer,
            y: null
        });
        data.push({
            t: data[data.length - 1].t + buffer,
            y: null
		});

		if (this._period === 'FIVE_MINUTES') {
            this.firstMin = new Date(data[1].t).getMinutes() % 10;
		}

        const ctx = this._canvas.getContext('2d');
        const width = this._getContainerWidth();
		this._canvas.width = Math.max(data.length * this._xAxisTickWidth, width);

		const BackgroundGradation = ctx.createLinearGradient(0, 21, 0, 148);
        BackgroundGradation.addColorStop(0, 'rgba(60, 171, 255, .3)');
        BackgroundGradation.addColorStop(1, 'rgba(229, 244, 255, .3)');

		// info
        this._yAxisWidth = 0;
        this._drawn = false;

        const firstItem = data[0];
        const lastItem = data[data.length - 1];

        const timeConfig = {
            displayFormats: {},
            stepSize: 1
        };

        max = parseFloat(Math.ceil(max).toFixed(1));
        min = parseFloat(Math.floor(min).toFixed(1));

        this.realMax = max;
        this.realMin = min;

        this.marginMax = max;
        this.marginMin = min == 0 ? 0 : min - (max - min) / 4;

        if (min === max) {
            if (min > 0) {
                this.marginMin = 0;
            } else if (min < 0) {
                //TODO: UX for bar type graph & negative value case will be released
                this.realMax = 0;
                this.marginMax = 0;
                this.marginMin *= 1.25;
            }
        }

        this._minValue = min;

        // x-scale min/max
        if (firstItem === lastItem) {
            timeConfig.min = getPrevTick(this._period, firstItem.t);
        } else {
			timeConfig.min = getNextTick(this._period, firstItem.t); // because we draw point at the end of tick
        }

        if (data.length < len) {
            timeConfig.max = getNextTick(this._period, lastItem.t, len - data.length + 1); // at least 7 ticks
        } else {
            timeConfig.max = getNextTick(this._period, lastItem.t);
        }

        this.origMax = max;

        // adding buffer space to avoid chopping of data points
        let extra = (max - min) / 5;
        // max += extra;

        // calculating interval
        let interval = (max - min) / 4;

        // fixing max to 1 decimal point
        max = Math.ceil(max * 10) / 10;
        // fixing interval to 1 decimal point
        interval = Math.ceil(interval * 10) / 10;

        // handling min==max case
        // if (extra === 0) {
        //     max = max += 1;
        //     interval = .5;
        // }

        // handling negative limitation to avoid showing negative values when data received is positive
        if (min >= 0) {
            if ((max - 4 * interval) < 0) {
                extra = Math.abs((max - 4 * interval));
                max += extra;
                max = Math.ceil(max * 10) / 10;
            }
        }

        // handling positive limitation to avoid showing positive values when data received is negative
        if (this.origMax < 0) {
            if (max > 0) {
                max = 0;
            }
        }

        // 4 steps and 1 space
        min = max - 4 * interval;
        const step = interval;
        // const delta = 4 * interval;

        switch (this._period) {
        case 'FIVE_MINUTES':
            timeConfig.unit = 'minute';
            timeConfig.displayFormats.minute = 'h:mm';
            break;

        case 'HOURLY':
            timeConfig.unit = 'hour';
            timeConfig.displayFormats.hour = 'k';
            break;

        case 'DAILY':
            timeConfig.unit = 'day';
            timeConfig.displayFormats.day = 'M D';
            break;
        }

		this._chart = new Chart(ctx, {
            type: 'roundedBar',
            data: {
                datasets: [
                    {
                        // data: data.filter(item => item.y != null),
                        data,
                        backgroundColor: '#3695DD',
                        borderColor: '#3695DD',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                barRoundness: 1,
                responsive: false,
                maintainAspectRatio: false,
                spanGaps: true,
                /*
                elements: {
                    point: {
                        backgroundColor: PrimaryColor,
                        radius: PointRadius,
                        hoverRadius: PointHoverRadius,
                        hitRadius: 15 // wide touch area
                    },
                    line: {
                        tension: 0,
                        backgroundColor: BackgroundGradation,
                        borderWidth: 1,
                        borderColor: PrimaryColor
                    }
                },
                */
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-0',
                            display: true,
                            type: 'linear',
                            gridLines: {
                                drawBorder: false,
                                lineWidth: .5,
                                color: '#cfcfcf',
                                zeroLineWidth: 1,
                                zeroLineColor: '#cfcfcf'
                            },
                            ticks: {
                                suggestedMin: this.marginMin,
                                suggestedMax: this.marginMax,
                                beginAtZero: true,
                                padding: 4,
                                fontSize: 12,
                                fontColor: '#979797',
                                stepSize: step,
                                min: this.marginMin,
                                max: this.marginMax,
                                callback: value => value.toLocaleString(undefined, { minimumFractionDigits: this._fractionDigits, maximumFractionDigits: this._fractionDigits || 20 })
                            },
                            position: 'right',
                            afterBuildTicks: scale => {
                                scale.ticks = this.realMin == 0 ? [this.realMax] : [this.realMax, this.realMin];
                            },
                            afterFit: scale => {
                                /*
                                this._yAxisWidth = Math.ceil(scale.longestLabelWidth + 15); // label max width + label padding (default 12)

                                this._yAxisWrapper.style.width = `${this._yAxisWidth}px`;
                                this._canvasGraphCropWrapper.style.width = `${parseInt(this._canvas.style.width) - this._yAxisWidth}px`;
                                */
                                scale.width = 30;
                            }
                        }
                    ],
                    xAxes: [
                        {
                            offset: true,
                            id: 'x-axis-0',
                            display: true,
                            gridLines: {
                                display: false
                            },
                            type: 'time',
                            time: timeConfig,
                            barThickness: 6,
                            ticks: {
                                callback: (value, index, values) => {
                                    if (this._period === 'HOURLY') {
                                        return value % 6 === 0 ? value : '';
                                    } else if (this._period === 'DAILY') {
                                        let result = '';
                                        const str = value.split(' ');
                                        if (index === 0) {
                                            return '';
                                        }

                                        if (index % 10 === 1) {
                                            result = `${str[1]}`;
                                            if (this.mStr != str[0]) {
                                                result = `${str[0]}/${result}`;
                                            }
                                            this.mStr = str[0];
                                        }

                                        return result;
                                    } else if (this._period === 'FIVE_MINUTES') {
                                        if (index !== 0 && index !== values.length - 1 && (value.split(':')[1][1] == this.firstMin)) {
                                            return value;
                                        } else {
                                            return '';
                                        }
                                    } else {
                                        return value;
                                    }
                                },
                                maxRotation: 0,
                                fontSize: 10,
                                autoSkip: false
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    bodyFontSize: 12,
                    bodyFontColor: '#fafafa',
                    backgroundColor: PrimaryColor,
                    cornerRadius: 0,
                    xAlign: 'left',
                    yAlign: 'center',
                    xPadding: 8,
                    yPadding: isItIOS() ? 2 : 4, // for vertical align
                    caretSize: 4,
                    caretPadding: 0,
                    displayColors: false,
                    position: 'nearest',
                    footerFontSize: 4,
                    footerMarginTop: 0,
                    footerFontColor: PrimaryColor,
                    custom: tooltip => {

                        if (!tooltip || !tooltip.dataPoints || !tooltip.dataPoints.length) {
							tooltip.opacity = 0;
                            return;
						}

						const point = tooltip.dataPoints[0];
                        // workaround for caret and body
						const workaround = tooltip.caretSize + PointHoverRadius + TooltipMargin;
                        if ((point.x + tooltip.width + workaround - this._yAxisWidth) > this._canvasWrapper.scrollLeft + this._canvasWrapper.clientWidth) {
                            tooltip.xAlign = 'right';
                            tooltip.x = point.x - (tooltip.width + workaround / 2);
                        } else {
                            tooltip.x = point.x + workaround / 2;
                        }
                        tooltip.caretX = tooltip.x + tooltip.caretSize;
                    },
                    filter: function (tooltipItem, data) {
                        let datapointValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                        if (datapointValue.y == null) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    callbacks: {
                        title: function () {
                            return '';
                        },
                        label: item => ((item.yLabel != null) ? item.yLabel.toLocaleString(undefined, { minimumFractionDigits: this._fractionDigits, maximumFractionDigits: this._fractionDigits || 20 }) : null),
                        footer: function () {
                            return isItIOS() ? ' ' : null; // for vertical align
                        }
                    }
                },
                animation: {
                    // delay: 200,
                    duration: 300,
                    easing: 'easeInOutSine'
                },
                hover: {
                    animationDuration: 0
                },
                layout: {
                    padding: {
                        top: 21,
                        right: 12
                    }
                }
            },
            plugins: [BarVerticalLinePlugin, TicksPositionPlugin]
        });

        if (hidden) {
            $(this._container).addClass('hide');
        }
	}
}

// ### Refresh ###
class Bezier {
    static _t(t, depth) {
        const r = { t: { 1: t }, nt: { 1: 1 - t } };

        for (let i = 2; i <= depth; i++) {
            r.t[i] = r.t[i - 1] * t;
            r.nt[i] = r.nt[i - 1] * r.nt[1];
        }

        return r;
    }

    static _cubicBezier(t, p0, p1, p2, p3) {
        return p0 * t.nt[3] + 3 * p1 * t.t[1] * t.nt[2] + 3 * p2 * t.t[2] * t.nt[1] + p3 * t.t[3];
    }

    static _cubicBezier2(t, p1, p2) {
        return 3 * p1 * t.t[1] * t.nt[2] + 3 * p2 * t.t[2] * t.nt[1] + t.t[3];
    }

    static cubicBezier(t, x1, y1, x2, y2) {
        const _t = Bezier._t(t, 3);
        return {
            x: Bezier._cubicBezier2(_t, x1, x2),
            y: Bezier._cubicBezier2(_t, y1, y2)
        };
	}

	//{"ease":".25,.1,.25,1","linear":"0,0,1,1","ease-in":".42,0,1,1","ease-out":"0,0,.58,1","ease-in-out":".42,0,.58,1"}
	static ease(t) {
		const _t = Bezier._t(t, 3);
		return {
			x: Bezier._cubicBezier2(_t, 0.25, 0.25),
			y: Bezier._cubicBezier2(_t, 0.1, 0.1)
		}
	}

	static linear(t) {
		const _t = Bezier._t(t, 3);
		return {
			x: Bezier._cubicBezier2(_t, 0, 1),
			y: Bezier._cubicBezier2(_t, 0, 1)
		}
	}

	static ease_in(t) {
		const _t = Bezier._t(t, 3);
		return {
			x: Bezier._cubicBezier2(_t, 0.42, 1),
			y: Bezier._cubicBezier2(_t, 0, 1)
		}
	}

	static ease_out(t) {
		const _t = Bezier._t(t, 3);
		return {
			x: Bezier._cubicBezier2(_t, 0, 0.58),
			y: Bezier._cubicBezier2(_t, 0, 1)
		}
	}

	static ease_in_out(t) {
		const _t = Bezier._t(t, 3);
		return {
			x: Bezier._cubicBezier2(_t, 0.42, 0.58),
			y: Bezier._cubicBezier2(_t, 0, 1)
		}
	}
}

class PullToRefresh {
    constructor(parent, onRefreshing, { distance, watchTarget, paddingTarget } = {}) {
        if (!parent) {
            throw new TypeError('InvalidElement');
        }

        this._parent = parent;
        this._listeners = {
            onRefreshing
        };
        this._attr = {
            distance: distance || 114
        };
		this._skipFlag = false;

        this._parent.addClass('pull-to-refresh');
		this._watchTarget = watchTarget ? watchTarget[0] : this._parent.ele;
		this._paddingTarget = paddingTarget;

        this._watchTarget.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: true });
        this._watchTarget.addEventListener('touchmove', this._onTouchMove.bind(this), { passive: false });
		this._watchTarget.addEventListener('touchend', this._onTouchEnd.bind(this));

		window.skipRefresh = this.skipRefresh.bind(this);

        // load svg prior to use
        Svg.loadSvg('sharp-refresh-24px');
    }

    _onTouchStart(event) {
		if (this._skipFlag)
			return;

        if (this._context) {
            return;
        }

        if (!event.currentTarget.scrollTop && event.touches.length === 1) {
			this._context = {
				startY: event.touches[0].clientY
			};
        }
    }

    _onTouchMove(event) {
		if (this._skipFlag)
			return;

        if (!this._context) {
            return;
        }

        if (this._context.working == null) {
            this._context.working = (event.touches[0].clientY - this._context.startY) > 0;
            this._parent.toggleClass('dragging', this._context.working);

            if (this._context.working) {
                event.preventDefault();

                // create circle
                this._context.refreshCircle = $(Dom.div({className: 'refresh-circle'}));
                Svg.appendSvg(this._context.refreshCircle[0], 'sharp-refresh-24px', { className: 'circle-arrow', organize: true })
                    .then(svg => {
                        this._context.refreshArrow = svg;
                    });


				var strSvgHtml = "<svg class='circle-progress' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 66 66'>";
				strSvgHtml +=    "	<circle class='circle-progress__circle' cx='50%' cy='50%' r='30'></circle>";
				strSvgHtml +=    "<svg>";

				this._context.refreshCircle.html(strSvgHtml);
				this._parent.append(this._context.refreshCircle);
            }
        }

        if (this._context.working && !this._context.refreshCircle.hasClass('in-progress')) {
            event.preventDefault();

            const delta = Math.max(event.touches[0].clientY - this._context.startY, 0);
            if (delta !== this._context.delta) {
                this._context.delta = delta;
                const bezier = Bezier.cubicBezier(this._context.delta / this._parent.height(), .075, .82, .165, 1);
                const adjusted = this._attr.distance * bezier.y;
				// this._parent.ele.style.paddingTop = `${adjusted}px`;
				//console.log("adjusted:" + adjusted);

                this._context.refreshCircle.css("top", `${adjusted - 40}px`);
                if (this._context.refreshArrow) {
                    this._context.refreshArrow.style.transform = `rotate(${bezier.y * 360}deg)`;
                    this._context.refreshArrow.style.opacity = Math.min(bezier.y * 1.5, 1);
				}

				if (this._paddingTarget) {
					this._paddingTarget.css('padding-top', `${adjusted}px`);
				}
            }
		}
    }

    _onTouchEnd(event) {
		if (this._skipFlag)
			return;

        if (!this._context) {
            return;
		}

        if (this._context.working) {
            if (this._context.refreshCircle.hasClass('in-progress')) {
                return;
            }

            this._parent.removeClass('dragging');

            if (this._context.delta >= this._attr.distance)  {
                // start spinning
				this._context.refreshCircle.addClass('in-progress');
				(() => this._context.refreshCircle.height())(); //reflow
				const refreshMargin = ((this._attr.distance - this._context.refreshCircle.height()) / 2) - 22;
                this._context.refreshCircle.css('top', refreshMargin + "px");

				if (this._paddingTarget) {
					this._paddingTarget.addClass('in-progress');
					(() => this._paddingTarget.height())(); //reflow
					this._paddingTarget.css('padding-top', refreshMargin + this._context.refreshCircle.height() + "px");
				}

                // call listener
                if (this._listeners.onRefreshing) {
                    this._listeners.onRefreshing(this);
                }
            } else {
                this.finishRefresh();
            }
        } else {
            delete this._context;
		}
	}

	skipRefresh(_val_) {
		if (this.tSkipHandle) {
			clearTimeout(this.tSkipHandle);
			this.tSkipHandle = undefined;
		}
		this._skipFlag = _val_;
	}

	startRefresh() {
		this._parent.addClass('no_event');
	}

    async finishRefresh() {
		this._skipFlag = true;
		this.tSkipHandle = setTimeout(() => {
			this._skipFlag = false;
			this.tSkipHandle = undefined;
		}, 1000);
		if (this._context) {
			if (this._paddingTarget){
				this._paddingTarget.css('padding-top', 0 + "px");
				this._paddingTarget.removeClass('in-progress');
			}

			await PromiseTransitionEnd(this._context.refreshCircle[0],
				{
					triggerFunc: () => {
						this._context.refreshCircle.css('transform', 'scale(0)');
					}
				}
			);
			this._parent[0].removeChild(this._context.refreshCircle[0]);
		}
		this._parent.removeClass('no_event');
		delete this._context;
    }
}

function saveElapsedTimeLog(deviceHandle) {
	if (deviceHandle) {
		try {
			if (isFHub())
				scplugin.manager.deletePluginData(deviceHandle, ELAPSED_TIME_KEY);
			scplugin.manager.setPluginData(deviceHandle, ELAPSED_TIME_KEY, JSON.stringify(window.elapsedTimeLog).replace(/\"/g, "'"));
		} catch (e) {
			LoggerE("save Elapsed Time Log is failed...!!");
		}
	} else {
		LoggerE("Invalid Device Handle")
	}
}

function addElapsedTimeLog (result, deviceHandle, id, startTime, endTime, midTime) {
	if (window.elapsedTimeLog) {
		if (window.elapsedTimeLog[id] && Array.isArray(window.elapsedTimeLog[id])) {
			if (window.elapsedTimeLog[id].length >= 10) {
				window.elapsedTimeLog[id].reverse();
				//remove oldest log
				window.elapsedTimeLog[id].pop();
				window.elapsedTimeLog[id].reverse();
			}
		} else {
			window.elapsedTimeLog[id] = [];
		}

		if (typeof startTime === "object") {
			startTime = startTime.getTime();
		}

		if (typeof endTime === "object") {
			endTime = endTime.getTime();
		}

		if (typeof midTime === "object") {
			midTime = midTime.getTime();
		}

		let strMark = "";
		if (midTime) {
			strMark = " ("+ String(midTime - startTime) + "ms)";
		}

		if (result === "NO_SUB") {
			strMark = " (No Subcribe)";
		} else if (result === "FAIL") {
			strMark = " (Fail)";
		}

		window.elapsedTimeLog[id].push(getTimeString(startTime) + strMark + ',  ' + String(endTime-startTime));
		//save log.
		saveElapsedTimeLog(deviceHandle);
	}
}

// ### Resource
class ResourceJs {
    constructor() {
        this._class = 'ResourceJs';

        this._modules = {};
    }

    _loadModule(module) {
        if (!this._modules[module]) {
            this._modules[module] = {};
            this._modules[module].promise = new Promise((resolve, reject) => {
                const script = document.createElement('script');

                this._modules[module].resolve = resolve;
                this._modules[module].reject = reject;

                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', `${module}.js`);

                document.head.appendChild(script);
            });
        }

        return this._modules[module].promise;
    }

    _resolveModules(modules) {
        const result = modules.filter((module => this._modules[module] && this._modules[module].instance));
        if (result.length === modules.length) {
            return Promise.resolve(modules.map(module => this._modules[module].instance));
        } else {
            return Promise.all(modules.map(this._loadModule.bind(this)));
        }
    }

    get() {
        let modules = null;
        let func = null;

        if (arguments.length < 1) {
            return Promise.reject(new Error('[Resource.get] need at least a function'));
        }

        func = arguments[arguments.length - 1];
        if (typeof func !== 'function') {
            return Promise.reject(new Error('[Resource.get] last parameter is not a function'));
        }

        if (arguments.length > 1) {
            modules = arguments[arguments.length - 2];
            if (!Array.isArray(modules)) {
                Promise.reject(new Error('[Resource.get] requirement is not an array'));
            }

            modules = modules.map(module => module.replace(/\.js$/, ''));
        }

        //console.log('----------------------------------------!!!');

        if (modules != null && modules.length > 0) {
            return this._resolveModules(modules).then(resolved => func(...resolved));
        } else {
            return Promise.resolve(func());
        }
    }

    set() {
        let moduleName = null;
        let modules = null;
        let func = null;

        if (arguments.length < 1) {
            return Promise.reject(new Error('[Resource.set] need at least a function'));
        }

        func = arguments[arguments.length - 1];
        if (typeof func !== 'function') {
            return Promise.reject(new Error('[Resource.set] last parameter is not a function'));
        }

        if (arguments.length > 1) {
            modules = arguments[arguments.length - 2];
            if (!Array.isArray(modules)) {
                return Promise.reject(new Error('[Resource.set] requirement is not an array'));
            }

            modules = modules.map(module => module.replace(/\.js$/, ''));
        }

        if (arguments.length > 2) {
            moduleName = arguments[arguments.length - 3];
            if (typeof moduleName !== 'string') {
                return Promise.reject(new Error('[Resource.set] module name is not a string'));
            }
        } else {
            moduleName = document.currentScript.attributes.src.nodeValue;
        }

        moduleName = moduleName.replace(/\.js$/, '');

        if (!this._modules[moduleName]) {
            // loading from static <script> or inline module
            this._modules[moduleName] = {};
        } else if (this._modules[moduleName].instance) {
            // already defined??
            return Promise.reject(new Error('[Resource.set] already defined module'));
        }

        if (modules != null && modules.length > 0) {
            const promise = this._resolveModules(modules)
                .then(resolved => {
                    const result = func(...resolved);
                    this._modules[moduleName].instance = result;

                    if (this._modules[moduleName].resolve) {
                        const resolve = this._modules[moduleName].resolve;

                        this._modules[moduleName].resolve = undefined;
                        this._modules[moduleName].reject = undefined;

                        resolve(result); // trigger!!
                    }

                    return result;
                });

            if (!this._modules[moduleName].promise) {
                this._modules[moduleName].promise = promise;
            }
        } else {
            const result = func();
            this._modules[moduleName].instance = result;

            if (!this._modules[moduleName].promise) {
                this._modules[moduleName].promise = Promise.resolve(result);
            } else if (this._modules[moduleName].resolve) {
                const resolve = this._modules[moduleName].resolve;

                this._modules[moduleName].resolve = undefined;
                this._modules[moduleName].reject = undefined;

                resolve(result); // trigger!!
            }
        }

        return this._modules[moduleName].promise;
    }
}

window.Resource = new ResourceJs();

// ### Ripple - parent must be jQuery object.
class Ripple {
	constructor(parent, params, { size } = {}) {
		this._parent = parent;
		this._ripple = null;
		const style = {
			color: 'black',
			shape: 'circle'
		};

		if (params) {
			if (typeof params === 'string') {
				style.shape = params;
			} else if (typeof params === 'object') {
				Object.assign(style, params);
			}
		}
		this._style = style;
		this._size = size ? size : undefined;

		this._parent.bind('touchstart', _e => {
			_e.stopPropagation();
			if (this._ripple === null && !this._parent.hasClass('press')) {
				this.start();
			}
		});

		this._parent.bind('touchend', _e => {
			_e.stopPropagation();
			if (this._ripple && this._parent.hasClass('press')) {
				this.finalize();
			}
		});
	}

	start() {
		let _p_height = this._parent.innerHeight();
		let _p_width = this._parent.innerWidth();

		if (this._parent.hasClass('disable'))
			return;
		this._parent.addClass('press');
		this._ripple = $(Dom.div({ className: 'ripple' }));
		this._ripple.attr('data-background', this._style.color);
		this._ripple.attr('data-shape', this._style.shape);

		let _ripple_width = _p_width;
		let _ripple_height = _p_height;
		let _ripple_top = 0;
		let _ripple_left = 0;

		switch (this._style.shape) {
			case 'circle':
				if (this._size) {
					_ripple_width = _ripple_height = this._size;
				} else {
					_ripple_width = _ripple_height = _p_height > _p_width ? _p_width : _p_height;
				}

				if (this._size) {
					_ripple_top = (_p_height - this._size) / 2;
					_ripple_left = (_p_width - this._size) / 2;
				} else if (_p_height < _p_width) {
					_ripple_left = (_p_width - _p_height) / 2;
				}
				break;
			case 'list':
				// iOS has overflowed animation issue.
				if (isItIOS()) {
					this._ripple.addClass('ios');
					if (this._parent.is(':first-child')) {
						this._ripple.addClass('top');
					} else if (this._parent.is(':last-child')) {
						this._ripple.addClass('bottom');
					}
				} else {
					_ripple_width = _ripple_height = Math.ceil(Math.sqrt(Math.pow((_p_height / 2), 2) + Math.pow((_p_width / 2), 2))) * 2;

					_ripple_top = (_p_height - _ripple_width) / 2;
					_ripple_left = (_p_width - _ripple_height) / 2;
				}
				break;
			case 'round-rect':
			default:
		}

		this._ripple.width(_ripple_width);
		this._ripple.height(_ripple_height);
		this._ripple.css('top', _ripple_top + 'px');
		this._ripple.css('left', _ripple_left + 'px');

		this._parent.append(this._ripple);

		// reflow
		(() => this._ripple.height())();

		this._animation = PromiseTransitionEnd(getHTMLElementFromJQuery(this._ripple), {
			propertyName: 'opacity',
			triggerFunc: () => {
				this._ripple.addClass('pong')
			}
		});
	}

	async finalize() {
		const animation = this._animation;
		this._animation = null;
		if (animation) {
			await animation;
			await PromiseTransitionEnd(getHTMLElementFromJQuery(this._ripple), {
				propertyName: 'opacity',
				triggerFunc: () => {
					this._ripple.addClass('gone');
				}
			}).then(() => {
				if (this._ripple.parent().get(0) === this._parent.get(0)) {
					this._ripple.remove();
				}
				this._ripple = null;
				this._parent.removeClass('press');
			});
		} else {
			this._parent.removeClass('press');
		}
	}
}

if (jQuery) {
	jQuery.prototype.setRipple = function(params, { size } = {}) {
		return new Ripple(this, params, { size });
	}
}

// ### Toast
class Toast {
    constructor() {
        this._defaultTimeout = 3000;
    }

    showToast(message, timeout = this._defaultTimeout, append = false) {
		this._timeout = timeout;
        if (!message) {
            return;
        }

        if (!this._container) {
            Dom.build(c => {
                this._container = $(c.div({ className: 'toast bottom notClick' },
                    this._text = $(c.div({ id:'toast', className: 'toast text roboto-regular' }))
				));
                $('body').append(this._container);
            });
        }

        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = undefined;

            if (append) {
				this._text.html(this._text.html() + '<br>' + message);
            } else {
				this._text.html(message);
            }
        } else {
            this._text.html(message);
        }

		setTimeout(() => {
			this._text.addClass('show');
			this._timer = setTimeout(() => {
				this.hideToast();
			}, this._timeout);
        }, 10);
	}

	hideToast() {
		if (this.isShown()) {
			clearTimeout(this._timer);
			this._text.removeClass('show');
			this._timer = undefined;
		}
	}

	isShown() {
		return (this._text && this._text.hasClass('show'));
	}
}

window.toastPopup = new Toast();

// ### WinSet
class WinSet {
	constructor(id) {
		this._id = id;
		this._ele = {};
	}

	get id() {
		return this._id;
	}

	get disabled() {
		return this._ele._wrapper.attr('aria-disabled') === 'true';
	}

	set disabled(value) {
		this._ele._wrapper.attr('aria-disabled', value || '');
	}

	get checked() {
		return this._ele._wrapper.attr('aria-checked') === 'true';
	}

	set checked(value) {
		this._ele._wrapper.attr('aria-checked', value || '');
		this.eventList.change(value);
	}

	get busy() {
		return this._ele._wrapper.attr('aria-busy') === 'true';
	  }

	set busy(value) {
		this._ele._wrapper.attr('aria-busy', value || '');
	}

	addEvent(_eventType_, _func_) {
		if (this.eventList[_eventType_]) {
			this.eventList[_eventType_] = _func_;
		}
	}
}

// ### List View
class ListView extends WinSet {
	constructor(id, parent, { style } = {}) {
		super(id);
        this._parent = parent;
        this._class = 'ListView';

        this._listeners = {};
		this._items = [];

		this._contents = $(Dom.ul({id:`${this.id}_listview`, className: `ux2-list-view ${style || ''}`}));
		this._parent.append(this._contents);
	}

    get contents() {
        return this._contents;
	}

	getItem(index) {
        if (index < 0 || index >= this._items.length) {
            throw new Error('ListView : out of range');
        }
        return this._items[index];
	}

	getItemById(id) {
        return this._items.find(current => current.id === id);
	}

	findItem(item) {
        return this._items.findIndex(current => current === item);
	}

	appendItem(item) {
        if (this.findItem(item) < 0) {
            item.setOnClickedListener(this._onItemClicked.bind(this));
            this.contents.append(item.container); // append item contents..
            this._items.push(item);
        }
    }

	removeAllItems() {
		this.contents.children().remove();
        this._items = [];
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

class ListItem extends WinSet {
    constructor(id, { style } = {}) {
		super(id);
        this._class = 'ListItem';

		this._listeners = {};

		this._container = $(Dom.li({id:`${this.id}_listitemContents`, className: `ux2-list-item flex ${style || ''}`}));
		this._contents = $(Dom.div({id:`${this.id}_listitem`, className: `ux2-list-item-contents`}));

		//this.addClass('flex');
		//this.append(this._contents);
		this._container.append(this._contents);
	}

    get contents() {
        return this._contents;
	}

	get container() {
		return this._container;
	}

	setVisibility(value) {
        this.container.toggleClass('hide', !value);
	}

	isVisible() {
        return !this.container.hasClass('hide');
    }

	setOnClickedListener(listener, role) {
        this._listeners.onClicked = listener;

        this._enableClickHandler(listener, role);
	}

	setActive(value) {
        this._active = value;
        this.container.toggleClass('active', value);
    }

    /* static */
    static setIcon(parent, url) {
		/*
        if (parent && url) {
            parent.addSvg(url, parent, result => {
                parent.ele.innerHTML = result.data;
            });
		}
		*/
    }

	_enableClickHandler(value, role) {
		//set ripple.
		this._container.setRipple('rect');
        if (value) {
            this.container.on('click', this._onClickCallback.bind(this));
            // a11y
            if (role) {
                this.container.attr('role', role);
            } else {
                this.container.attr('role', 'button');
            }
        } else {
            this.container.off('click');
            // a11y
            this.container.remoteAttr('role');
        }
	}

	/* private */
	_onClickCallback(event) {
		if (this._listeners.onClicked) {
			this._listeners.onClicked(this.id, event);
		}
	}
}

class List2LineTextItem extends ListItem {
    constructor(id, title, { style, icons, description, contents, state }) {
        super(id, {style:'text'});

        if (style) {
            style.split(' ').forEach(value => this.container.addClass(value));
        }

        if (!this._textWrapper) {
            this._textWrapper = $(Dom.div({className:'ux2-list-item__text'}));
            this.contents.append(this._textWrapper);
        }

        if (!this._title) {
            this._title = $(Dom.div({className:'ux2-list-item__text__title'}));
            this._textWrapper.append(this._title);
        }

        if (icons) {
            if (icons.left != null) {
                this.setLeftIcon(icons.left);
            }
            if (icons.right != null) {
                this.setRightIcon(icons.right);
            }
        }

        if (title) {
            this.setTitle(title);
        }

        if (description) {
            this.setDescription(description);
        }

		if (contents) {
            if (contents.left != null) {
                this.setLeftText(contents.left);
            }
            if (contents.right != null) {
                this.setRightText(contents.right);
            }
		}

        if (state != null) {
            this.setActive(state);
        }
    }

    get title() {
        return this._title;
    }

    get description() {

        if (!this._description) {
            const descriptionWrapper = $(Dom.div({className:'ux2-list-item__text__description_wrapper'}));
            this._description = $(Dom.div({className: 'ux2-list-item__text__description'}));
            descriptionWrapper.append(this._description);

            this._textWrapper.append(descriptionWrapper);
        }

		return this._description;
    }

    get leftIcon() {
        if (!this._leftIcon) {
			this._leftIcon = $(Dom.div({className: 'ux2-list-item__left-icon'}));
			this._leftIcon.insertBefore(this._contents);
        }

        return this._leftIcon;
	}

	get rightIcon() {
        if (!this._rightIcon) {
            this._rightIcon = $(Dom.div({className:'ux2-list-item__right-icon'}));
            this._contents.append(this._rightIcon);
        }

        return this._rightIcon;
    }

    setTitle(title) {
        this.title.html((title != null) ? title : '');
        return this;
    }

    setDescription(description) {
        this.description.html((description != null) ? description : '');
        return this;
    }

    setLeftIcon(id) {
		appendSvg(this.leftIcon, id);
		return this;
    }

    showLeftIcon(show) {
        this.leftIcon.toggleClass('hide', !show);
    }

    setRightIcon(id) {
		appendSvg(this.rightIcon, id);
        return this;
    }

    showRightIcon(show) {
        this.rightIcon.toggleClass('hide', !show);
    }
}

class List1LineTextItem extends ListItem {
    constructor(id, description, { style, icons, contents, state } = {}) {
        super(id, 'text');

        if (style) {
            style.split(' ').forEach(value => this.addClass(value));
        }

        if (icons) {
            if (icons.left != null) {
                this.setLeftIcon(icons.left);
            }
            if (icons.right != null) {
                this.setRightIcon(icons.right);
            }
        }

        if (description) {
            this.setDescription(description);
        }

        if (contents) {
            if (contents.left != null) {
                this.setLeftText(contents.left);
            }
            if (contents.right != null) {
                this.setRightText(contents.right);
            }
        }

        if (state != null) {
            this.setActive(state);
        }
    }

    get leftIcon() {
        if (!this._leftIcon) {
			this._leftIcon = $(Dom.div({className: 'ux2-iot-list-item__left-icon'}));
			this._leftIcon.insertBefore(this._contents);
        }

        return this._leftIcon;
    }

    get rightIcon() {
        if (!this._rightIcon) {
            this._rightIcon = $(Dom.div({className: 'ux2-iot-list-item__right-icon'}));
            this._contents.append(this._rightIcon);
        }

        return this._rightIcon;
    }

    get textWrapper() {
        if (!this._textWrapper) {
            this._textWrapper = $(Dom.div({className: 'ux2-iot-list-item__text__notitle'}));
            this._contents.append(this._textWrapper);
        }

        return this._textWrapper;
    }

    get leftText() {
        if (!this._leftText) {
            this._leftText = $(Dom.div({className: 'ux2-iot-list-item__left-text'}));
			this._leftText.insertBefore(this._contents);
        }

        return this._leftText;
    }

    get rightText() {
        if (!this._rightText) {
            this._rightText = $(Dom.div({className: 'ux2-iot-list-item__right-text'}));
            this._contents.append(this._rightText);
        }

        return this._rightText;
    }

    setLeftIcon(url) {
		appendSvg(this.leftIcon, url);
        return this;
    }

    setRightIcon(url) {
        appendSvg(this.rightIcon, url);
        return this;
    }

    showLeftIcon(show) {
        this.leftIcon.toggleClass('hide', !show);
    }

    showRightIcon(show) {
        this.rightIcon.toggleClass('hide', !show);
    }


    setDescription(text) {
        this.textWrapper.html((text != null) ? text : '');
        return this;
    }

    setLeftText(content) {
        if (content && typeof content === 'string') {
            this.leftText.html(content);
        }
    }

    setRightText(content) {
        if (content && typeof content === 'string') {
            this.rightText.html(content);
        }
    }
}

class List1LineTextRadioButtonItem extends List1LineTextItem {
    constructor(id, description, { style, icon, rightText, state, radioGroup } = {}) {
        super(id, description, { style, icon, rightText, state });

        this._radioGroup = radioGroup;

        if (this._textWrapper) {
            this._textWrapper.addClass('radio');
        }
    }

    addButton() {
		this._button = new RadioButton(this.leftIcon, `${this.id}_radioButton`, { radioGroup: this._radioGroup });
        return this._button;
    }

    get button() {
        return this._button;
    }
}

class List2LineTextAndSwitchItem extends List2LineTextItem {
    constructor(id, title, { style, icons, description, state } = {}) {
        super(id, title, { style, icons, description, state });
    }

	addSwitch(state) {
		this._divider = $(Dom.div({className:'ux2-iot-list-item__text__divider'}));
		this._divider.insertBefore(this.rightIcon);
		this.showDivider(false);

		this._switch = new ToggleSwitch(this.rightIcon, `${this.id}_SwitchObj`);
		this._switch.click( state => {
				console.log("click List2LineTextAndSwitchItem:" + state);
				if (this._listeners.onSwitchClicked) {
					this._listeners.onSwitchClicked(this.id, state);
				}
			}
		);

		this.setSwitchState(state);
		return this.id;
	}

	showDivider(show) {
        this._divider.toggleClass('hide', !show);
    }

	setSwitchState(value) {
        if (value) {
            this._switch.on();
            this.container.attr('aria-checked', 'true');
        } else {
            this._switch.off();
            this.container.attr('aria-checked', 'false');
        }
    }

	getSwitchState() {
        return this._switch.value();
    }

	get switch() {
        return this._switch;
	}

	get pending() {
		if (!this._pending) {
			this._pending = new Barrier(this.container, {loaderSize: "small_title"});
		}

		return this._pending;
	}

	setPending(value) {
		if (value) {
			this.pending.activate(false, {transparent: true});
		} else {
			this.pending.deactivate();
		}
    }

    setOnItemSwitchListener(listener) {
        this._listeners.onSwitchClicked = listener;
	}

    setSwitchPending(state) {
        if (this._switch) {
            this._switch.pending(state);
        }
    }
}

// COMPONENTS :: Radio Group
class RadioGroup {
	constructor(id, buttons) {
	  this._id = id;
	  this._type = 'RadioGroup';
	  this._buttons = new Set(buttons);
	  this._listeners = {
		change: new Set()
	  };
	}

	get id() {
	  return this._id;
	}

	get checked() {
	  return [...this._buttons].findIndex(button => button.checked);
	}

	get selected() {
	  return this.checked;
	}

	check(index) {
	  this._buttons.forEach((button, idx) => button.checked = index === idx);

	  return this;
	}

	checkById(id) {
	  this._buttons.forEach(button => button.checked = button.id === id);

	  return this;
	}

	uncheck() {
	  return this.check(-1);
	}

	select(index) {
	  return this.check(index);
	}

	deselectAll() {
	  return this.uncheck();
	}

	addEvent(event, listener, options) {
	  if (this._listeners[event]) {
		this._listeners[event].add(listener);
	  }

	  return this;
	}

	removeEvent(event, listener) {
	  if (this._listeners[event]) {
		this._listeners[event].delete(listener);
	  }

	  return this;
	}

	append(button) {
	  this._buttons.add(button);

	  if (!button._groupListener) {
		var listener = checked => {
		  if (!checked) {
			return;
		  }

		  var index = -1;
		  var changed = false;

		  this._buttons.forEach((item, idx) => {
			if (button === item) {
			  index = idx;
			} else {
			  if (item.checked) {
				changed = true;
			  }

			  item.checked = false;
			}
		  });

		  if (changed) {
			this._listeners.change.forEach(listener => listener(index, button));
		  }
		};

		button.addEvent('change', listener);
		button._groupListener = listener;
	  }

	  return this;
	}

	remove(button) {
	  this._buttons.delete(button);

	  if (button._groupListener) {
		button.removeEvent('change', button._groupListener);
		delete button._groupListener;
	  }

	  return this;
	}
} // COMPONENTS :: Radio Button

class RadioButton extends WinSet {
	constructor(parent, id, { radioGroup } = {}) {
		super(id);
		this._type = 'RadioButton';

		this.eventList = {
			click: function () {},
			change: function () {}
		};

		this._parent = parent;

		Dom.build(c => {
			this._ele._wrapper = $(c.div( { id: this._id, className: 'iot_radioButton wrapper', 'role':'radio'},
				this._ele._radio_on = $(c.div( { className: 'iot_radioButton radio_on'})),
				this._ele._radio_off = $(c.div( { className: 'iot_radioButton radio_off'}))
			));
			this._parent.append(this._ele._wrapper);
		});

		appendSvg(this._ele._radio_on, 'btn_component_radio_on', {attr:{'aria-hidden':'true'}});
		appendSvg(this._ele._radio_off, 'btn_component_radio_off', {attr:{'aria-hidden':'true'}});

		this._ele._wrapper.on('click', () => {
            if (this.disabled) {
				LoggerD("this  item is disabled");
                return;
           	}

			LoggerI("Click Item :" + this._id + ", value :" + this.checked);
            if (_isFunction(this.eventList.click)) {
                this.eventList.click(this._id, this.checked);
			}
		});

		if (radioGroup) {
			radioGroup.append(this);
		}
	}

	get id() {
		return this._id;
	}

	get checked() {
		return super.checked;
	}

	/* override */
	set checked(value) {
		super.checked = value;

		if (value) {
			if (_isFunction(this.eventList.change)) {
				this.eventList.change(value);
			}
		}
	}
}

class ToggleSwitch extends WinSet {
	constructor(parent, id, status) {
		super(id);
		this._type = 'ToggleSwitch';
		this.eventList  = {
            on: function () {},
            off: function () {},
			pending: function () {},
			click: function() {},
			change: function() {}
		};

		this._status = status;
		this._parent = parent;

		Dom.build(c => {
			this._ele._wrapper = $(c.div( { id: this._id, className: 'iot_ToggleSwitch wrapper', 'role':'switch'},
				this._ele._background = $(c.div( { className: 'iot_ToggleSwitch background'})),
				this._ele._circle = $(c.div( { className: 'iot_ToggleSwitch circle'})),
				this._ele._pending_wrapper = $(c.div({className: 'pending_wrapper'}))
			));
			this._parent.append(this._ele._wrapper);
		});

		this._ele._pending = new Barrier(this._ele._pending_wrapper, {loaderSize: "small_title"});

		this._ele._wrapper.on('click', () => {
            if (this.disabled) {
				LoggerD("this item is disabled");
                return;
           	}

			LoggerI("Click Item " + this._id);
            if (this.eventList.click) {
				console.log("this.value():" + this.value());
                this.eventList.click(!this.value());
			}
		});

		this.toggle(status);
	}

	click(_func_) {
        if (_func_) {
            this.eventList.click = _func_;
        }
	}

	value() {
		return this.checked;
	}

	on(_func_) {
		if(_func_) {
			this.eventList.on = _func_;
		} else {
			if (this.disabled) {
				return this;
			}

			this.checked = true;
            this.eventList.on();
		}

		return this;
	}

	off(_func_) {
		if (_func_) {
            this.eventList.off = _func_;
        } else {
            if (this.disabled) {
                return this;
            }
            this.checked = false;
            this.eventList.off();
        }

        return this;
	}

    show() {
        this._ele._wrapper.removeClass('hide');
        return this;
    }

    hide() {
        this._ele._wrapper.addClass('hide');
        return this;
    }

    toggle(_onFunc_, _offFunc_) {
        if (_onFunc_) {
            this.eventList.on = _onFunc_;
        }
        if (_offFunc_) {
            this.eventList.off = _offFunc_;
        }
        if (_onFunc_ || _offFunc_) {
            return this;
        }
        if (this.disabled) {
            return this;
		}

        this.checked ? this.off() : this.on();

        return this;
    }

	pending(_pendingBool_, _pendingFunc_) {
        if (_pendingBool_ === undefined || _pendingBool_) {
            this.startPending();
        } else {
            this.stopPending();
        }
        if (_pendingFunc_ !== undefined) {
            this.eventList.pending = _pendingFunc_;
        }

        return this;
    }

    startPending() {
        this.busy = true;
        this._ele._pending.activate(true);
        this._ele._wrapper.addClass('pending');
        this.eventList.pending(this);
	}

	stopPending() {
        this._ele._pending.deactivate();
        this._ele._wrapper.removeClass('pending');
        this.busy = false;
	}
}

// ### SVG
const SVG_PATH = 'res/svg';
const SVG_JS_EXTENSION = '.svg.js';
const SVG_EXTENSION = '.svg';
const svgs = {};

function basename(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

async function loadSvg(svg, { subdir } = {}) {
	const id = basename(svg).replace(SVG_JS_EXTENSION, '').replace(SVG_EXTENSION, '');
    if (!id) {
        Promise.reject(new Error(`[SVG.loadSvg] invalid svg : ${svg}`));
	}

	const SUB_DIRECTORY = subdir ? '/' + subdir : '';

    if (svgs[id]) {
        return svgs[id];
    } else {
        return svgs[id] = Resource.get([`${SVG_PATH}${SUB_DIRECTORY}/${id}${SVG_JS_EXTENSION}`], svg => {
            const div = document.createElement('div');
            div.innerHTML = svg;

            return div.getElementsByTagName('svg')[0];
        });
    }
}

function organizeSvgElement(element) {
    if (!element) {
        return;
    }

    for (const child of element.childNodes) {
        if (child.hasAttribute && child.tagName !== 'mask') {
            if (child.hasAttribute('fill') && child.getAttribute('fill') !== 'none') {
                child.dataset.hasFill = true;
                child.removeAttribute('fill');
            }

            if (child.hasAttribute('stroke') && child.getAttribute('stroke') !== 'none') {
                child.dataset.hasStroke = true;
                child.removeAttribute('stroke');
            }
        }

        organizeSvgElement(child);
    }
}

async function svg(svgId, { color, opacity, className, organize, subdir, attr} = {}) {
    if (!svgId) {
        throw new Error('[SVG.svg] invalid parameters');
    }

    const svg = await loadSvg(svgId, { subdir });
	const cloned = svg.cloneNode(true);

    if (className) {
        cloned.classList.add(className);
    }

    if (organize) {
        organizeSvgElement(cloned);
	}

	if (color) {
		changeColorSvg(cloned, color);
	}

	if (attr) {
		setAttributeSvg(cloned, attr);
	}

    return cloned;
}

function setAttributeSvg(element, attr) {
	if (element) {
		let keys = Object.keys(attr);
		keys.forEach((v) => {
			element.setAttribute(v, attr[v]);
		});
	}
}

function changeColorSvg(element, color) {
	for (const child of element.childNodes) {
		if (child.hasAttribute && child.tagName !== 'mask') {
			if (child.hasAttribute('fill') && child.getAttribute('fill') !== 'none') {
				child.dataset.hasFill = true;
				child.setAttribute('fill', color);
			}

			if (child.hasAttribute('stroke') && child.getAttribute('stroke') !== 'none') {
				child.dataset.hasStroke = true;
				child.setAttribute('stroke', color);
			}
		}
		changeColorSvg(child, color);
	}
}

async function appendSvg(target, svgId, { color, opacity, className, organize, subdir, attr } = {}) {
    if (!target || !svgId) {
        throw new Error('[SVG.appendSvg] invalid parameters');
	}

	if (_isJQuery(target)) {
		target = getHTMLElementFromJQuery(target);
	}

    const result = await svg(svgId, { color, opacity, className, organize, subdir, attr });
	target.appendChild(result);

    return result;
}

async function setSvg(target, svgId, { color, opacity, className, organize, subdir, attr } = {}) {
    if (!target || !svgId) {
        throw new Error('[SVG.setSvg] invalid parameters');
	}

	if (_isJQuery(target)) {
		target = getHTMLElementFromJQuery(target);
	}

	const result = await svg(svgId, { color, opacity, className, organize, subdir, attr });
    target.innerHTML = result.outerHTML;

    return result;
}

const Svg = {
    loadSvg,
    svg,
    appendSvg,
    setSvg,
    organizeSvgElement
};

function appendBorderRadiusClipPathSvg(parent) {
	if (!document.getElementById('svgBorderRadiusClipPath')) {
		if (parent && _isJQuery(parent)) {
			let svg = "<svg id='svgBorderRadiusClipPath' viewBox='0 0 52 52' height='0' width='0'>";
			svg += '<defs>';
			svg += "<clipPath id='borderRadiusClip'>";
			svg += "<path d='M0 0 L26 0 Q 0 0, 0 26 L0 26 Z'/>";
			svg += "</clipPath>";
			svg += '</defs>';
			svg += '</svg>';

			parent.append(svg);
		} else {
			LoggerE("Object is undefined or not jQuery object");
		}
	} else {
		LoggerI("border clip path is existed, already");
	}
}

function loadImage(src) {
	return new Promise((resolve,reject) => {
		let img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}
