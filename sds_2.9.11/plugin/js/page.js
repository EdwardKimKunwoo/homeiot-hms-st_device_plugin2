/*
Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information").
You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.
SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

// ### Page
class Page {
    constructor(id) {
        this._class = 'Page';
		this._id = id;
		this._ele = {};
		this._listeners = {};
    }

    get class() {
        return this._class;
    }

    get id() {
        return this._id;
    }

    get page() {
        return this._page;
	}

	get ele() {
		return this._ele;
	}

	get container() {
        return this._ele._container;
	}

    get backButton() {
        return this._ele._backButton;
    }

    get title() {
        return this._ele._title;
    }

    get description() {
        return this._ele._desciption;
    }

    get moreButton() {
        return this._ele._moreButton;
    }

	setTitle(text) {
		if (this._ele._title) {
			this._ele._title.text(text);
		}
	}

    setZindex(index) {
        if (this._page && this._page[0] instanceof HTMLElement) {
            this._page[0].dataset.page = index;
        }
    }

    getZindex() {
        if (this._page && this._page[0] instanceof HTMLElement) {
            return this._page[0].dataset.page;
        }

        return 0;
    }

	setTop() {
		if (this._page && this._page[0] instanceof HTMLElement) {
            this._page[0].dataset.top = "true";
		}
	}

	unsetTop() {
		if (this._page && this._page[0] instanceof HTMLElement) {
            this._page[0].dataset.top = "false";
		}
	}

	setLocation(text) {
		if(!this._ele._location) {
			this._ele._location = $(Dom.div({ className: 'plugin-page__action-bar__location__text roboto-regular' }));
			if (this._ele._title) {
				this._ele._location.insertAfter(this._ele._title);
			}
		}

		this._ele._location.text(text);
	}

	init() {
		if (this._page == null) {
			$('body').append(this._page = $(Dom.div({classList: 'plugin-page effect hide', id: this.id})));
		}

		//create action bar
		if (this._ele._actionBar == null) {
			this._ele._actionBar = $(Dom.div({ className: 'plugin-page__action-bar'},
				this._ele._backButton = $(Dom.div({ className: 'plugin-page__action-bar__back', role: 'button'})),
				Dom.div({ className: 'plugin-page__action-bar__title' },
					Dom.div({ className: 'plugin-page__action-bar__title__wrapper' },
						this._ele._title = $(Dom.div({ className: 'plugin-page__action-bar__title__text roboto-medium', role: 'heading'}))
					)
				),
                this._ele._moreButton = $(Dom.div({ className: 'plugin-page__action-bar__more hide', role: 'button'})))
			);
			this._page.prepend(this._ele._actionBar);
		}

		// VA
		this._ele._backButton.attr("aria-label", C_('___PO_CODE_NAVIGATE_UP'));
		this._ele._backButton.attr("role", 'button');

		this._ele._moreButton.attr("aria-label", C_('___PO_CODE_MORE_OPTIONS'));
		this._ele._moreButton.attr("role", 'button');

		if (this._ele._container == null) {
			this._page.append(this._ele._container = $(Dom.div({classList: 'plugin-page__container'})));
		}

		if (this._ele._backButton) {
			this._ele._backButton.click(() => {
				this.onBack();
			});
			this._ele._backButton.setRipple('circle');
		}

		if (this._ele._moreButton) {
			this._ele._moreButton.click(() =>{
				if (!this._ele._moreButton.hasClass('hide')) {
					this.onMore();
				}
			});
			this._ele._moreButton.setRipple('circle');
		}

		appendSvg(this._ele._backButton, 'ic_function_back', {attr: {'aria-hidden':'true'}});
	}

	show() {
		if (this._page instanceof jQuery) {
			return new Promise( resolve => {
				setTimeout(() => {
					if (this._page.hasClass('hide')) {
						this._page.removeClass('hide');
					}
					if (this._page.hasClass('show')) {
						resolve();
					}

					if (!this._page.hasClass('effect')) {
						this._page.addClass('show');
						resolve();
					}

					const callback = () => {
						resolve();
					};

					this._page.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", callback);
					setTimeout(() => {
						if (this._page) {
							this._page.addClass('show');
						}
					}, 30);  // why timeout ??
				}, 0);
			});
		} else {
			return Promise.resolve();
		}
	}

	hide(effect = true) {
		if (this._page instanceof jQuery) {
			if (!this._page.hasClass('show')) {
				return Promise.resolve();
			}

			if (!effect || !this._page.hasClass('effect')) {
				this._page.removeClass('show');
				this._page.addClass('hide');
				return Promise.resolve();
			}

			return new Promise(resolve => {
				const callback = e => {
					if (e.target !== this._page[0]) {
						return;
					}
					e.preventDefault();
					if (!this._page.hasClass('show')) {
						this._page.addClass('hide');
					}
					resolve();
				};
				this._page.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", callback);
				setTimeout(() => {this._page.removeClass('show');}, 30);
			});
		} else {
			return Promise.resolve();
		}
	}

	setOrientation(orientation) {
        LoggerD('[' + this._id +' Page orientation] >>> orientation : ' + orientation);
		this._orientation = orientation;
		if (_isFunction(this._listeners['orientation'])) {
			this._listeners['orientation'](this._orientation);
		}
	}

	destroy() {
		this._page.remove();
		this._page = null;
	}

	/* DO NOT OVERRIDE */
	addEvent(type, callback) {
		if (_isFunction(callback)) {
			this._listeners[type] = callback;
		}
	}

	onBack(result) {
		if (_isFunction(this._listeners['back'])) {
			this._listeners['back'](result);
		}
	}

	onMore() {
		if (_isFunction(this._listeners['more'])) {
			this._listeners['more']();
		}
	}
}

// ### Page Controller
class PageController {
    constructor() {
        this._class = 'PageController';
        this._pages = [];
    }

    get length() {
        return this._pages.length;
	}

	get pages() {
		return this._pages;
	}

	getTopPage() {
        if (this._pages.length > 0) {
            return this._pages[this._pages.length - 1];
        } else {
            throw `[${this._class}] EmptyArray`;
        }
    }

	async pushDlg(dlg, show = true) {

		if (dlg && dlg.class && dlg.class.indexOf("Dialog") >= 0) {
			LoggerI("[PageCtrl] PUSH >>> pageID = " + dlg.id + " (using pushDlg)");
			this._pages.push(dlg);

			window.location.hash = dlg.id;
			return true;
		} else {
			LoggerE("[PageCtrl] It is not Dialog!!");
			return false;
		}

	}

	async popDlg(dlg) {
		const topDlg = this.getTopPage(); // page and dialog, they are same.
		LoggerI("[PageCtrl] POP Dialog <<< pageID = " + dlg.id + " Top Dlg id = " + topDlg.id);

		if (topDlg && topDlg._class && topDlg._class.indexOf("Dialog") >= 0) {
			if (topDlg.id && dlg.id === topDlg.id) {
				history.back();
			} else {
				LoggerE("[PageCtrl] Does not match topDlg ID");
			}
		}
	}

	async closeTopDlg(id) {
		try {
			// Prevent doubled 'history back' event.
			const topDlg = this.getTopPage(); // Page and Dialog, they are same.
			if (topDlg && topDlg._class && topDlg._class.indexOf("Dialog") >= 0 && !topDlg.modal) {
				LoggerI("[PageCtrl] POP Top Dialog <<< pageID = " + topDlg.id);
				if (id && topDlg.id && id !== topDlg.id) {
					LoggerE("[PageCtrl] Does not match topDlg ID");
					return;
				}
				history.back();
			} else {
				LoggerD("[PageCtrl] There is no open dialog.");
			}
		} catch (e) {
			LoggerW('[PageCtrl] No item to pop....', e);
		}
	}

	async push(page, show = true, duplicated = true) {
        if (!duplicated) {
            let order = 1;
            this._pages = this._pages.filter(item => {
                if (item.class === page.class) {
                    item.destroy();
                    return false;
                } else {
                    item.setZindex(order);
                    order++;
                    return true;
                }
            });
		}

        try {
            const topPage = this.getTopPage();
            topPage.unsetTop();
            page.setZindex(Number(topPage.getZindex()) + 1);
        } catch (e) {
            page.setZindex(1);
        }

		LoggerI("[PageCtrl] PUSH >>> pageID = " + page.id);
		this._pages.push(page);

        if (show) {
			await page.show();
		}

		window.location.hash = page.id;
        return true;
    }

    async pop(id, withAllOver) {
        try {
			const topPage = this.getTopPage();
			LoggerI("[PageCtrl] POP <<< pageID = " + topPage.id);
            if (id && topPage.id !== id) {
                for (let i = this._pages.length - 1; i >= 0; i--) {
                    const page = this._pages[i];
                    const currentId = page.id;
                    if (currentId === id || withAllOver) {
						LoggerI("[PageCtrl] Destroy " + id);

						this._pages.splice(i, 1);
						await page.hide();
						if (_isFunction(page.destroy)) {
							page.destroy();
						}
                    }

                    if (currentId === id) {
                        break;
                    }
                }
            } else {
				this._pages.pop();
                try {
                    this.getTopPage().setTop();
                } catch (e) {
                    //
				}

				if (topPage && topPage._class && topPage._class.indexOf("Dialog") >= 0) {
					if (_isFunction(topPage.isVisible) && topPage.isVisible()) {
						LoggerD("dialog hide without history.back")
						topPage.hide({skipHistoryBack:true});
					}
				} else {
					await topPage.hide();
					if (_isFunction(topPage.destroy)) {
						topPage.destroy();
					}
				}
            }
        } catch (e) {
			LoggerW('[PageCtrl] no item to pop....');
			console.log(e);
        }
	}

	onHistoryBack(){
		LoggerD("onHistoryBack, length=" + this._pages.length);
		if (this._pages.length > 1) {
			LoggerI("[PageCtrl] Back to " + hashHistory[hashHistory.length - 1] + " (length : " + hashHistory.length + ")");
			this.pop();
		} else {
			LoggerI("Exit Plugin");
			exitPluginPage();
		}
	}
}

class MainPage extends Page {
	constructor(id) {
        super(id);
		this._class = 'MainPage';
	}

	init() {
		//set elements
		this._page = $("#mainPage");
		this._ele._actionBar = $("#actionBarArea");
		this._ele._container = $("#contentsContainer");
		this._ele._backButton = $("#actionBarBack");
		this._ele._title = $("#actionBarDeviceName");
		this._ele._location = $("#actionBarLocation");
		this._ele._moreButton = $("#actionBarOption");
		this._ele._mainPanel = $("#mainPanel");
		this._ele._notiArea = $("#notificationArea");
		super.init();

		appendSvg(this._ele._moreButton, 'ic_function_more',{attr: {'aria-hidden':'true'}});

		//for feedback.
		this._ele._feedbackArea = $("#boundary-feedback-area");
		this._ele._feedbackCircle = $("#feedback_circle");
		this._ele._scroll = this._ele._mainPanel;

		this.scroll.on('scroll', e => {
			this._scrollPer = (this.scroll.prop('scrollTop') / Math.abs(this.scroll.prop('scrollHeight') - this.scroll.prop('clientHeight'))) * 100;
			if (!this._boundaryEffectFlag && !this._boundaryEffectPreventFlag) {
				//console.log("scrollPer=" + this._scrollPer + ",  _scrollPerWhenEnd=" + this._scrollPerWhenEnd);
				if (this._scrollPer < 1 && this._scrollPerWhenEnd > 5) {
					this.runBoundaryEffect(true);
				} else if (this._scrollPer >= 98 && this._scrollPerWhenEnd < 95) {
					this.runBoundaryEffect(false);
				}
			}
		});

		this.scroll[0].addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
		this.scroll[0].addEventListener('touchend', this.onTouchEnd.bind(this));
		this.scroll[0].addEventListener('touchmove', this.onTouchMove.bind(this));

	}
	get scroll() {
		return this._ele._scroll;
	}

	onTouchStart(e) {
		e.stopPropagation();
		//set boundary feedback effect value.
		this._ele._feedbackCircle.attr("r", (this._ele._mainPanel.width() * 2));
		this._ele._feedbackCircle.attr("cx", (this._ele._mainPanel.width() / 2));
		this._ele._feedbackCircle.attr("cy", -(this._ele._mainPanel.width()*2));

		this._startY = e.changedTouches[0].clientY;
		this._scrollPerWhenStart = this._scrollPer;
		this._boundaryEffectFlag = false;
		if(this._boundaryEffectPreventHandle) {
			clearTimeout(this._boundaryEffectPreventHandle);
			this._boundaryEffectPreventHandle = 0;
		}
		this._boundaryEffectPreventFlag = false;
	}

	onTouchMove(e) {
		e.stopPropagation();
		this._endY = e.changedTouches[0].clientY;
		const per = ((this._endY - this._startY) / $(this.scroll).prop('clientHeight')) * 100;

		//console.log("per:" + per + ", start:" + this._startY + ", scroll per:" + this._scrollPer + ", boundary:" + this._boundaryEffectFlag);
		if (!this._boundaryEffectFlag) {
			if (per < -1 && this._scrollPer >= 98) {
				this.runBoundaryEffect(false);
			} else if (per > 1 && this._scrollPerWhenStart > 1 && this._scrollPer <= 1) {
				this.runBoundaryEffect(true);
			}
		}
	}

	onTouchEnd(e) {
		this._boundaryEffectFlag = false;
		this._scrollPerWhenEnd = this._scrollPer;

		this._boundaryEffectPreventHandle = setTimeout(() => {
			this._boundaryEffectPreventFlag = true;
		}, 1000);
	}

	runBoundaryEffect(direction) { // true is top effect false is bottom effects
		this._boundaryEffectFlag = true;
		if (isItIOS())
			return;
		if (direction) { //top
			let initY = -(this._ele._mainPanel.width()*2);
			let targetY = (this._ele._mainPanel.width()/2) * -3.866; //tan(75.5)
			this._ele._feedbackArea.removeClass("hide");
			this._ele._feedbackCircle.attr("cy", initY);

			if (this.feedbackIntervalHandle) {
				clearInterval(this.feedbackIntervalHandle);
				this.feedbackIntervalHandle = 0;
			}

			let distance = targetY - initY;
			let count = 20;
			let mid = count/2;
			let step = distance / mid;

			this.feedbackIntervalHandle = setInterval(() => {
				if (count > mid) {
					this._ele._feedbackCircle.attr("cy", targetY - (step * (count-mid)));
				} else if (count <= mid) {
					this._ele._feedbackCircle.attr("cy", initY + (step * count));
				}

				if (count == 0) {
					clearInterval(this.feedbackIntervalHandle);
					this._ele._feedbackArea.addClass("hide");
				}
				count--;
			}, 15);
		} else { //bottom
			let initY = this._ele._mainPanel.height() + this._ele._mainPanel.width() * 2;
			let targetY = initY - (this._ele._mainPanel.width() * 2 - ((this._ele._mainPanel.width()/2) * 3.866)); //tan(75.5)
			//console.log("initY=" + initY + ", targetY=" + targetY);

			this._ele._feedbackArea.removeClass("hide");
			this._ele._feedbackCircle.attr("cy", initY);

			if (this.feedbackIntervalHandle) {
				clearInterval(this.feedbackIntervalHandle);
				this.feedbackIntervalHandle = 0;
			}

			let distance = targetY - initY;
			let count = 20;
			let mid = count/2;
			let step = Math.abs(distance / mid);

			this.feedbackIntervalHandle = setInterval(() => {
				if (count > mid) {
					this._ele._feedbackCircle.attr("cy", (targetY + (step * (count-mid))));
				} else if (count <= mid) {
					this._ele._feedbackCircle.attr("cy", (initY - (step * count)));
				}

				if (count == 0) {
					clearInterval(this.feedbackIntervalHandle);
					this._ele._feedbackArea.addClass("hide");
				}
				count--;
			}, 15);
		}
	}

	onCreate(bundle) {
		let deviceName = bundle['deviceName'];
		let deviceLocation = bundle['deviceLocation'];

		if (this._ele._title) {
			this._ele._title.html(deviceName.replace(/ /g, '&nbsp;'));
		}

		if (this._ele._location) {
			this._ele._location.html(deviceLocation.replace(/ /g, '&nbsp;'));
		}
		try {
			this._refresh = new PullToRefresh(this._ele._container, this.onRefreshing.bind(this), {
				watchTarget: this._ele._mainPanel,
				paddingTarget: this._ele._notiArea
			});
		} catch(e) {
			LoggerE(e);
		}
	}

	onRefreshing(obj) {
        (async () => {
			LoggerI("on Refreshing!!");
			obj.startRefresh();
			await HNCtrl.refresh();
            obj.finishRefresh();
        })();
    }
}

class InformationPage extends Page {
	constructor(id) {
        super(id);
		this._class = 'InformationPage';
		this.timeoutHandle = undefined;
		this.clickCount = 0;
		this.preventDbClickFlag = false;
	}

	get icon() {
		return this.ele._icon;
	}

	get deviceName() {
		return this.ele._deviceName;
	}

	getAboutIcon(_deviceType_) {
        let iconID = 'accessory_color';
        switch (_deviceType_) {
            case "x.com.st.d.gasvalve":
				iconID = 'gas_valve_color';
				break;
			case "oic.d.light" :
				iconID = 'light_bulb_color';
				break;
            case "oic.d.thermostat" :
				iconID = 'thermostat_color';
				break;
			case "oic.d.airconditioner" :
				iconID = 'system_ac_color';
				break;
			case "x.com.st.d.vent" :
            case "oic.d.vent" :
				iconID = 'vent_color';
				break;
			case "x.com.st.d.elevator" :
				iconID = 'elevator_color'
				break;
			case "oic.d.switch" :
				iconID = 'switch_color';
				break;
			case "oic.d.blind" :
				iconID = 'shade_color';
				break;
			case "oic.d.smartlock" :
				iconID = 'lock_color';
				break;
			case "oic.d.smartplug" :
				iconID = 'outlet_color';
				break;
			case "x.com.st.d.doorbell" :
				iconID = 'doorbell_color';
				break;
			default:
				LoggerW("Not Defined icon for device : " + _deviceType_);
		}

		return iconID;
    }

	init() {
		super.init();
		super.setTitle(C_('INFORMATION'));

		Dom.build( el => {
			const page = el.div({ className: 'ux2-page-information', },
				el.div({ className: 'ux2-page-information__essential' },
					this.ele._icon = $(el.div({ className: 'ux2-page-information__icon'})),
					el.div({ className: 'ux2-page-information__device' },
						this.ele._deviceName = $(el.div({ className: 'ux2-page-information__device__name roboto-light' }))
					),
					el.div({ className: 'ux2-page-information__version__controller' },
						el.div({ className: 'ux2-page-information__version__controller__name roboto-regular' }, C_('CONTROLLER_VERSION')),
						this.ele._controllerVersion = $(el.div({ className: 'ux2-page-information__version__controller__version roboto-regular' }))
					),
					el.div({ className: 'ux2-page-information__version__controller' },
						this.ele._providerName = $(el.div({ className: 'ux2-page-information__version__controller__name roboto-regular' })),
						this.ele._providerContact = $(el.div({ className: 'ux2-page-information__version__controller__version roboto-regular' }))
					)
				),
				el.div( {className: 'ux2-page-information__essential roboto-regular'},
				this.ele._license = $(el.div({ className: 'ux2-page-information__license'},
						el.span({},C_('OPEN_SOURCE_LICENSE')))),
				this.ele._message = $(el.div({ className: 'ux2-page-information__message'}, '　'))
				)
			);
			this.container.append(page);

			// VA
			if (this.ele._license) {
				this.ele._license.attr('role', 'button');
			}
		});

		if (this.ele._icon) {
			this.ele._icon.on("click", () => {
				if (this.timeoutHandle) {
					this.clickCount++;
					if (this.clickCount >= 10) {
						LoggerI("Enable Test Mode");
						if (window.testMode && !window.testMode.isTestMode()) {
							window.testMode.enableTestMode();
							toastPopup.showToast("Enable Test Mode!!");
						} else {
							toastPopup.showToast("Already Enable Test Mode");
						}
						clearTimeout(this.timeoutHandle);
						this.timeoutHandle = 0;
						this.clickCount = 0;
					}
				} else {
					this.timeoutHandle = setTimeout(() => {this.timeoutHandle = 0;  this.clickCount = 0;}, 3000);
					this.clickCount++;
				}
			});
		}

		if (this._ele._license) {
			this.ele._license.on("click", () => {
				if (this.preventDbClickFlag === false) {
					if (_isFunction(this._listeners['license'])) {
						this._listeners['license']();
					}
					this.preventDbClickFlag = true;
					setTimeout(()=>{
						this.preventDbClickFlag = false;
					}, 1000);
				} else {
					LoggerI("Ignore Double Click");
				}
			});
			this.ele._license.setRipple('round-rect');
		}
	}

	onCreate(bundle) {
        let deviceType = bundle['deviceType'];
		let deviceName = bundle['deviceName'];
        let version = bundle['version'];
		let providerName = bundle['providerName'];
		let providerContact = bundle['providerContact'];

        if (deviceType) {
			setSvg(this.ele._icon, this.getAboutIcon(deviceType), {
				'subdir' 	: 'device_icon',
				'className'	: 'ux2-page-information__icon_svg'
			});
		}

		if (this.ele._deviceName && deviceName) {
			this.ele._deviceName.html(deviceName.replace(/ /g, '&nbsp;'));
		}

		if (this.ele._controllerVersion && version) {
			this.ele._controllerVersion.text("(" + version + ")");
		}

		if (this.ele._providerName && providerName) {
			this.ele._providerName.text(providerName);
		}

		if (this.ele._providerContact && providerContact) {
			this.ele._providerContact.text(C_('VENDOR_CONTACT') + " " + providerContact);
		}

	}
}

class ActivityPage extends Page {
	constructor(id, replaceKeywords) {
        super(id);
		this._class = 'ActivityPage';
		this._replaceKeywords = replaceKeywords;
	}

	get scroll() {
		return this._ele._scroll;
	}

	init() {
		super.init();
		Dom.build(el => {
			this._ele._pageInnerContainer = $(el.div({ id: 'activity_page', className: 'plugin-page__container__scrollable activity-history' },
				this._ele._cardContainer = $(el.div({className: 'ux2-page-activity'}))
			));
            this.container.append(this._ele._cardContainer);
		});

		this.activityCard = new ActivityListCard("activityPageId", {'parent': this._ele._cardContainer, 'fullscreen': true, replaceKeywords: this._replaceKeywords});
		this.deviceActivitys = new DeviceActivities(HNCtrl.device);
		this.deviceActivitys.getActivities(40).then((items)=>{
			this.activityCard.updateList(items);
		});

		this._ele._scroll = this.activityCard.contents;

		this.scroll.on('scroll', e => {
			this._scrollPer = ($(this.scroll).prop('scrollTop') / Math.abs($(this.scroll).prop('scrollHeight') - $(this.scroll).prop('clientHeight'))) * 100;
		});

		this.scroll[0].addEventListener('touchstart', e => {
            e.stopPropagation();
            this._startY = e.changedTouches[0].clientY;
        }, { passive: true });

        this.scroll[0].addEventListener('touchend', e => {
            e.stopPropagation();
			this._endY = e.changedTouches[0].clientY;
            const per = (Math.abs(this._endY - this._startY) / $(this.scroll).prop('clientHeight')) * 100;
            if (per > 20 && this._scrollPer >= 100) {
                this.getNextItem();
            }
		});

		this.addEvent("orientation", (orientation)=> {
			LoggerD("Activity Card is rotated :" + orientation);
			if (this.activityCard && _isFunction(this.activityCard.resize)) {
				this.activityCard.resize();
			}
		} );
	}

	onCreate(bundle) {
		super.setTitle(C_('ACTIVITY_LOG_HISTORY'));
	}

	async getNextItem() {
		LoggerD("get Next Item!!!");
		try {
			const activities = await this.deviceActivitys.getNextActivities(40);
			LoggerD("Success !! " + Object.keys(activities).length);
			if (Object.keys(activities).length > 0) {
				this.activityCard.updateList(activities);
			} else {
				LoggerI('There is no activity history data any more');
			}
		} catch (e) {
			LoggerE("[getActivities] failed :", e);
		}
    }
}

class LicensePage extends Page {
	constructor(id) {
        super(id);
		this._class = 'LicensePage';
		this._ele.pageContents = undefined;
	}

	init() {
		super.init();
		Dom.build( el => {
			this._ele.pageContents = $(el.div({ className: 'ux2-page-license'}));
			this.container.append(this._ele.pageContents);
		});

		this.licenseCard = new LicenseCard("licensePageId", {'parent': this._ele.pageContents, 'fullscreen': true});
	}

	onCreate(bundle) {
		super.setTitle(C_('OPEN_SOURCE_LICENSE'));
	}
}

class StatisticPage extends Page {
	constructor(id) {
        super(id);
		this._class = 'StatisticPage';
	}

	init() {
		super.init();
	}

	loadElapsedTimeLog(deviceHandle, onLoadFunc) {
		var onPluginData = (key, value) => {
			console.log("===== key: " + key + " value: " + value  + " typeof: " + typeof value);
			try {
				if (value === "" || !value) {
					value = "{}";
				} else {
					value = value.replace(/\'/g, '"');
				}
				window.elapsedTimeLog = JSON.parse(value);
			} catch (e) {
				window.elapsedTimeLog = undefined;
			   LoggerE("get Elapsed Time Log is failed...!!");
			}

			if (typeof onLoadFunc === "function") {
				onLoadFunc();
			}
		};

		scplugin.manager.getPluginData(deviceHandle, ELAPSED_TIME_KEY, onPluginData);
	}

	clearElapsedTimeLog(deviceHandle, contents) {
		if (window.elapsedTimeLog) {
			window.elapsedTimeLog = {};
			saveElapsedTimeLog(deviceHandle);
			//remove html
			this.renderElapsedTimeLog(contents);
		}
	}

	renderElapsedTimeLog(contents) {
		//console.log(contents);
		if (contents) {
			//delte previous screen
			contents.html("");
			let contentsDiv = $("<div class='elapsed_time_log'></div>");
			let items = $("<ul></ul>");
			let keys = Object.keys(window.elapsedTimeLog);
			if (keys.length > 0) {
				for (let key in window.elapsedTimeLog) {
					if (window.elapsedTimeLog.hasOwnProperty(key)) {
						let capabilityItem = $("<li></li>");
						capabilityItem.text(key);
						items.append(capabilityItem);
						if (window.elapsedTimeLog[key].length > 0) {
							let logs = window.elapsedTimeLog[key];
							let count = 0;
							let worstVal = 0;
							let bestVal = 1000000000;
							let sumVal = 0;
							let logsWrapper = $("<ol></ol>");
							capabilityItem.append(logsWrapper);
							logs.forEach(_val_ => {
								let logItem = $("<li class='item'></li>");
								let words = _val_.split(', ');
								logItem.text(_val_ + "ms");
								logsWrapper.append(logItem);

								if (words[0].indexOf("(No Subcribe)") < 0  && words[0].indexOf("(Fail)") < 0) {
									if (words[1]) {
										let elapsedTime = Number(words[1]);
										if (elapsedTime > 0) {
											if (bestVal > elapsedTime) {
												bestVal = elapsedTime;
											}
											if (worstVal < elapsedTime) {
												worstVal = elapsedTime;
											}
											sumVal += elapsedTime;
											count ++;
										}
									}
								}
							});

							if (count > 0) {
								let statisticsItem = $("<li class='statistics_item'></li>");
								statisticsItem.append($("<span class='best'>" + "Best: " + bestVal +"ms</span>"));
								statisticsItem.append($("<span class='worst'>" + "Worst: " + worstVal +"ms</span>"));
								statisticsItem.append($("<span class='average'>" + "Average: " + Math.floor(sumVal/count) +"ms</span>"));
								items.append(statisticsItem);
							}
						}
					}
				}
				contentsDiv.append(items);
				contents.append(contentsDiv);
			} else {
				contents.append($("<div class='empty_log'>Empty Log</div>"));
			}
		}
	}

	onCreate(bundle) {
		super.setTitle(C_('STATISTICS'));
		this._ele._moreButton.removeClass("hide");
		this._ele._moreButton.html("<img src='./res/png/trash_icon.png' class='act_icon' id='icon_back'/>");
		this._ele._moreButton.on('click', () => {
			this.clearElapsedTimeLog(HNCtrl.device.deviceHandle, this.container);
		});

        var onLoadFunc = () => {
            if (typeof this.renderElapsedTimeLog === "function") {
                this.renderElapsedTimeLog(this.container);
            }

        };
        //for Statistics
        try {
            if (window.testMode && window.testMode.isStatisticsMode() && HNCtrl.device.deviceHandle) {
                this.loadElapsedTimeLog(HNCtrl.device.deviceHandle, onLoadFunc);
            }
        } catch (e) {
            LoggerE("statistics data loading failed...", e);
        }

	}
}

class AutomationSettingPage extends Page {
	constructor(id) {
        super(id);
		this._class = 'TimerSettingPage';
		this._ele._pageContents = undefined;

		this._hour = 0;
		this._min = 1;

		this._name = null;
        this._title = null;
        this._locationId = null;
        this._deviceId = null;
        this._property = null;
        this._uri = null;
        this._rt = null;
        this._automation = null;
        this._manager = null;
		this._buttonLocked = false;

        this.SETTING_ID_TIMER = 0;
        this.SETTING_ID_POWER_ON = 1;
		this.SETTING_ID_POWER_OFF = 2;

		this.SETTING_ID_CUSTOM_SETTING = 3;
	}

	init() {
		super.init();

		this.container.addClass("automation-setting-page");
		Dom.build( el => {
			this._ele._pageContents = $(el.div({ className: 'ux2-list scrollable'}));
			this.container.append(this._ele._pageContents);
		});

		if (this._index === this.SETTING_ID_TIMER) {
			this.powerSettingCard = new RadioButtonCard(`${this.id}_powerOnOff`, {'parent': this._ele._pageContents,
				buttons: [C_('automation_power_on'), C_('automation_power_off')]});
			this.timeSettingCard = new RadioButtonCard(`${this.id}_timeSelect`, {'parent': this._ele._pageContents,
				buttons: [C_('automation_after_pd_minutes', 10), C_('automation_after_pd_minutes', 30), C_('automation_after_pd_minutes', 60), C_('automation_custom')]});
			this.timePickerCard = new TimePickerCard(`${this.id}_TimePicker`, {'parent': this._ele._pageContents,
					is24HourFormat: true, normalOrder: this.__getTimePickerOrder(), hour: this._hour, min: this._min
				});
			this.timeSettingCard.setOnButtonClickedListener(this.onTimerRadioButtonClicked.bind(this));
		} else if (this._index === this.SETTING_ID_POWER_ON || this._index === this.SETTING_ID_POWER_OFF) {
			this.timePickerCard = new TimePickerCard(`${this.id}_TimePicker`, {'parent': this._ele._pageContents,
				is24HourFormat: this._is24HFormat, normalOrder: this.__getTimePickerOrder(),  hour: this._hour, min: this._min});
			this.dayPickerCard = new DayPickerCard(`${this.id}_DaySelect`, {'parent': this._ele._pageContents});

			this.timePickerCard.container.toggleClass('hide', false);
		}

		this.createButton();
	}

    setPending(value) {
        if (!this._pending) {
            this._pending = new Barrier(this.container, { });
        }

        if (value) {
            this._pending.activate(true, {/*transparent: true*/ });
        } else {
            this._pending.deactivate();
        }
    }

	onCreate(bundle) {
		this._index = bundle.index;
		this._automation = bundle.automation;
        this._automationTitle = bundle.title;
		this._is24HFormat = bundle.is24HFormat;

		if (this._index === this.SETTING_ID_POWER_ON || this._index === this.SETTING_ID_POWER_OFF) {
            if (bundle.time) {
                const array = bundle.time.split(' ');
                this._min = array[0];
                this._hour = array[1];
            } else {
                this._min = new Date().getMinutes();
                this._hour = new Date().getHours();
            }
        }

		this.init()
		super.setTitle(C_('automation_timer'));

		this._name = bundle.name;
		this._locationId = bundle.capability.device.locationId;
        this._deviceId = bundle.capability.device.id;
        this._property = bundle.capability.property.name;
        this._uri = bundle.capability.uri;
        this._rt = bundle.capability.rt;
        this._value = bundle.capability.value;
		this._capability = bundle.capability;
		this._manager = new AutomationManager(this._locationId !== undefined ? this._locationId : '', this._uri, this._deviceId);

		if (this._index === this.SETTING_ID_TIMER) {
			if (bundle.capability) {
				let value = bundle.capability.value[bundle.capability.property.name];
				const power = (value === true || value === 'on') ? true : false;
				this.powerSettingCard.setSelectedButton(power === true ? 1 : 0);
			}
        }

		if (this._index === this.SETTING_ID_POWER_ON || this._index === this.SETTING_ID_POWER_OFF) {
            this.dayPickerCard.update(bundle.days);
        }
	}

	createButton() {
		Dom.build(c => {
            this._ele._buttonWrapper = $(c.div({ className: 'ux2-iot-button__wrapper'},
                this._ele._cancelButton = $(c.div({ className: 'ux2-iot-button'})),
                this._ele._okButton = $(c.div({ className: 'ux2-iot-button'}))
            ));
		});

		this._ele._cancelButton.text(C_("DIALOG_BUTTON_CANCEL"));
		this._ele._cancelButton.setRipple('rect');
		this._ele._cancelButton.click(() => {

			const result = {
				res: false,
				index: this._index
			};

			this.onBack(result);
		});

		this._ele._okButton.text(C_("DIALOG_BUTTON_OK"));
		this._ele._okButton.setRipple('rect');
		this._ele._okButton.click(async () => {
			this.setPending(true);
			if (this._buttonLocked === false) {
				this._buttonLocked = true;
			}

			try {
				if (this._automation === null) {
					await this.createAutomation();
				} else {
					await this.updateAutomation(this._automation);
				}
			} catch (e) {
				LoggerE(`[${this._class}] automation failed : ${e.message}`);
			}

			this.setPending(false);

			const result = {
				res: true,
				index: this._index
			};

			this._buttonLocked = false;
			if (_isFunction(this._listeners['ok'])) {
				this._listeners['ok'](result);
			}
		});

		this._page.append(this._ele._buttonWrapper);
	}

	onTimerRadioButtonClicked(id) {
		if (id === this.SETTING_ID_CUSTOM_SETTING) {
			this.timePickerCard.container.toggleClass('hide', false);
 		} else {
			this.timePickerCard.container.toggleClass('hide', true);
        }
	}

	getSwitchValue(switchState) {
        let res = null;

        if (switchState === true) {
            if (typeof this._value === 'boolean') {
                res = true;
            } else {
                res = 'on';
            }
        } else if (switchState === false) {
            if (typeof this._value === 'boolean') {
                res = false;
            } else {
                res = 'off';
            }
        }

        return `${res}`;
	}

	getValueType(value) {
        return typeof value;
	}

	__getTimePickerOrder() {
        const locale = LocaleCode;
        if (locale.indexOf('ko') > -1) {
            return false;
        } else {
            return true;
        }
	}

	is24HourFormat() {
        return this._is24HoursFormat;
    }

	__getOffsetTimeByRadioButton(index) {
        let offset = 0;

        switch (index) {
        case '0':
            offset = 1000 * 60 * 10; // after 10 minutes
            break;
        case '1':
            offset = 1000 * 60 * 30; // after 30 minutes
            break;
        case '2':
            offset = 1000 * 60 * 60; // after 60 minutes
            break;
        case '3': // custom
            offset = this.timePickerCard.getOffsetTime();
            break;
        default:
            break;
        }

        return offset;
	}

	async createAutomation() {
        try {
            let min = '';
            let hour = '';

            if (this._index === this.SETTING_ID_TIMER) {
                const offset = this.__getOffsetTimeByRadioButton(this.timeSettingCard.getSelectedButton());
                const timestamp = new Date().getTime() + offset;
                min = new Date(timestamp).getMinutes();
                hour = new Date(timestamp).getHours();
            } else if (this._index === this.SETTING_ID_POWER_ON || this._index === this.SETTING_ID_POWER_OFF) {
                min = this.timePickerCard.getMinutes();
                hour = this.timePickerCard.getHours(this.is24HourFormat());
            }

            const time = `${min} ${hour}`;
            let power = null;
            let days = '';
            if (this._index === this.SETTING_ID_TIMER) {
                power = this.powerSettingCard.getSelectedButton() === '0' ? this.getSwitchValue(true) : this.getSwitchValue(false);
            } else if (this._index === this.SETTING_ID_POWER_ON) {
                power = this.getSwitchValue(true);
                days = this.dayPickerCard.getDays();
            } else if (this._index === this.SETTING_ID_POWER_OFF) {
                power = this.getSwitchValue(false);
                days = this.dayPickerCard.getDays();
            }

			const automation = new Automation(this._automationTitle, null, this._locationId, this._deviceId, this._manager.generateCustomTag(this._name), true);

            const timeCondition = new TimeCondition('Time', time, days);
            const deviceAction = new DeviceAction('Timer', this._rt, this._deviceId, this._uri, this._property, power, this.getValueType(this._value));

            automation.setTimeCondition(timeCondition);
            automation.addDeviceActions(deviceAction);

            LoggerD(`[${this._class} createAutomation] automation : ${JSON.stringify(automation)}`);

            return this._manager.createAutomation(automation);
        } catch (e) {
			LoggerD(`[${this._class}] createAutomation exception : [${e.name}][${e.message}]`);
			return undefined;
		}
	}

	async updateAutomation(automation) {
        try {
            const min = this.timePickerCard.getMinutes();
            const hour = this.timePickerCard.getHours(this.is24HourFormat());

            const time = `${min} ${hour}`;
            const days = this.dayPickerCard.getDays();

            automation.timeCondition.time = time;
            automation.timeCondition.days = days;

            return automation.update();
        } catch (e) {
			Log.e(`[${this._class}] updateAutomation exception : [${e.name}][${e.message}]`);
		}

		return;
    }


}