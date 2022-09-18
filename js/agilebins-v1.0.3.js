/*!
 * ------------------------------------------------------------
 * ------------------------------------------------------------
 *
 *                    _
 *   /\   _  o |  _  |_) o ._   _
 *  /--\ (_| | | (/_ |_) | | | _>
 *        _|
 *
 * ------------------------------------------------------------
 * ------------------------------------------------------------
 *
 * agilebins v1.0.3
 *
 * 快速解决网站上大部分特效展示...
 * 官网: http://ab.geshai.com
 *
 * Copyright 2010-2022, Carlo,Cloud,Bonejay
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下，可应用于个人或商业用途
 *
 */
;(function ($) {
    $.fn.agilebins = function (_arg_options, _evt) {
        var _AB_FN_ = {
            "version": "1.0.3",
            "options": {
                "type": "slide",
                "direction": "left",
                "eventType": "mouseover",
                "index": 0,
                "visNum": 1,
                "scrollNum": 1,
                "sStep": 1,
                "speed": 350,
                "sSpeed": 350,
                "btnSpeed": 50,
                "triggerTime": 50,
                "delayTime": 3500,
                "mousewheelTime": 250,
                "effect": "fade",
                "sEffect": "",
                "easing": "swing",
                "scrollEl": "",
                "sPrev": "",
                "sNext": "",
                "sPrevOffClass": "off",
                "sNextOffClass": "off",
                "onClass": "on",
                "offClass": "",
                "mainEl": "",
                "mPrev": "",
                "mNext": "",
                "mPrevOffClass": "off",
                "mNextOffClass": "off",
                "mainState": "",
                "mainStateHtml": "li",
                "mainCountState": "",
                "pageState": "",
                "pageStateHtml": "li",
                "pageCountState": "",
                "play": "",
                "pause": "",
                "autoPosition": false,
                "addX": 0,
                "addY": 0,
                "iTrigger": "",
                "iTriggerFunc": "",
                "stopPropagation": false,
                "initFunc": "",
                "startFunc": "",
                "completeFunc": "",
                "endFunc": "",
                "playFunc": "",
                "pauseFunc": "",
                "loop": false,
                "pnLoop": true,
                "autoPlay": false,
                "autoMainState": false,
                "autoPage": false,
                "loadSrc": "",
                "mainCur": false,
                "curOff": false,
                "returnDefault": false,
                "defaultShow": false,
                "mouseOverStop": false,
                "scrollWithMain": true,
                "hoverIsBtn": false,
                "mousewheelIsPN": false
            }
        };
        var f_isValue = function (v) {
            if (typeof (v) == "number") {
                return true
            }
            if (typeof (v) == "string") {
                return (v.length < 1 ? false : true)
            }
            return ((typeof (v) == "undefined" || v == null || v == "") ? false : true)
        };
        var f_chkEl = function (o) {
            var r = false;
            try {
                if (o.size() >= 1) {
                    r = true
                }
            } catch (e) {
            }
            ;
            return r
        };
        var f_setClass = function (o, r, a) {
            if (!f_chkEl(o)) {
                return false
            }
            if (o.hasClass(r)) {
                o.removeClass(r)
            }
            if (!o.hasClass(a)) {
                o.addClass(a)
            }
        };
        var f_addHtml = function (o, tn, v, isAdd) {
            if (!f_chkEl(o)) {
                return false
            }
            v = (f_isValue(tn) ? ("<" + tn + ">" + v + "</" + tn + ">") : v);
            (isAdd != true ? o.html(v) : o.append(v))
        };
        var f_px = function (v) {
            return (Math.ceil(v).toString() + "px")
        };
        var f_imageLoad = function (__o, __src) {
            if (!f_chkEl(__o)) {
                return false
            }
            var __img = new Image();
            __img.onload = function () {
                __o.attr("src", __o.attr(__src)).removeAttr(__src)
            };
            __img.src = __o.attr(__src)
        };
        var f_animateStop = function (__o) {
            return (__o.stop(true, true))
        };
        var f_scrollTop = function () {
            return $(document).scrollTop()
        };
        var f_isHide = function (o) {
            if (!f_chkEl(o)) {
                return false
            }
            return (o.css("display") != "none" ? false : true)
        };
        var f_getOffset = function (o, sType, inMargin) {
            if (!f_chkEl(o)) {
                return {}
            }
            inMargin = (inMargin != true) ? false : true;
            var t = parseFloat(o.offset().top);
            var l = parseFloat(o.offset().left);
            var w = parseFloat((sType != "self") ? o.outerWidth(inMargin) : o.width());
            var h = parseFloat((sType != "self") ? o.outerHeight(inMargin) : o.height());
            return {"top": t, "left": l, "width": w, "height": h}
        };
        var f_setOffset = function (a, b, x, y) {
            if (!f_chkEl(b)) {
                return false
            }
            var __screenW = parseFloat($(window).width());
            var __screenH = parseFloat($(window).height());
            var __documentH = parseFloat($(document).height());
            var __scrollTop = f_scrollTop();
            var __titData = f_getOffset(a);
            var __boxData = f_getOffset(b);
            var __memorySpace = {
                "width": (__screenW - (__titData.left + __titData.width)),
                "height": (__screenH - (__titData.top - __scrollTop) - __titData.height)
            };
            var __style = {"position": "absolute"};
            b.css({"left": "", "right": "", "top": "", "bottom": ""});
            if ((__boxData.width <= (__memorySpace.width - x)) || (__titData <= (__memorySpace.width - x))) {
                __style.left = (0 + x) + "px"
            } else {
                __style.right = (0 + x) + "px"
            }
            if ((__boxData.height <= (__memorySpace.height - y)) || (__titData.top <= (__memorySpace.height - y))) {
                __style.top = (__titData.height + y) + "px"
            } else {
                __style.bottom = (__titData.height + y) + "px"
            }
            b.css(__style)
        };
        var f_dir = function (k) {
            var _od = {"top": "top", "bottom": "bottom", "left": "left", "right": "right"},
                _d = {"t": _od.top, "b": _od.bottom, "l": _od.left, "r": _od.right};
            if (f_isValue(k)) {
                return (k.length > 1 ? _od[k] : _d[k])
            }
        };
        var f_rtnBool = function (v) {
            return (v === true || v == "true" ? true : false)
        };
        var f_triggerEffect = function (__o, __t, __ee, __st, __eas, __cb) {
            if (!f_chkEl(__o)) {
                return false
            }
            __t = (__t != "h" ? "show" : "hide");
            switch (__ee) {
                case"fade":
                    if (__t == "hide") {
                        f_animateStop(__o).animate({"opacity": __t}, __st, __eas, __cb)
                    } else {
                        f_animateStop(__o).animate({"opacity": __t}, __st, __eas, __cb)
                    }
                    break;
                case"slideDown":
                    if (__t == "hide") {
                        f_animateStop(__o).slideUp(__st, __eas, __cb)
                    } else {
                        f_animateStop(__o).slideDown(__st, __eas, __cb)
                    }
                    break;
                default:
                    if (__t == "hide") {
                        f_animateStop(__o).hide(__st, __eas, __cb)
                    } else {
                        f_animateStop(__o).show(__st, __eas, __cb)
                    }
                    break
            }
        };
        return this.each(function () {
            var _opts = $.extend({}, _AB_FN_.options, _arg_options);
            var _mEnter = "mouseenter", _mLeave = "mouseleave", _speed = parseInt(_opts.speed),
                _sSpeed = parseInt(_opts.sSpeed), _btnSpeed = parseInt(_opts.btnSpeed),
                _triggerTime = parseInt(_opts.triggerTime), _mousewheelTime = parseInt(_opts.mousewheelTime),
                _delayTime = parseInt(_opts.delayTime), _sStep = parseFloat(_opts.sStep), _vis = parseInt(_opts.visNum),
                _scroll = parseInt(_opts.scrollNum), _defIndex = (parseInt(_opts.index) + 1),
                _addX = parseFloat(_opts.addX), _addY = parseFloat(_opts.addY), _direction = _opts.direction,
                _effect = _opts.effect, _sEffect = _opts.sEffect, _easing = _opts.easing,
                _event = (_opts.eventType != "mouseover" ? "click" : _mEnter),
                _stopPropagation = f_rtnBool(_opts.stopPropagation), _autoPlay = f_rtnBool(_opts.autoPlay),
                _loop = f_rtnBool(_opts.loop), _pnLoop = f_rtnBool(_opts.pnLoop),
                _autoMainState = f_rtnBool(_opts.autoMainState), _autoPage = f_rtnBool(_opts.autoPage),
                _mainCur = f_rtnBool(_opts.mainCur), _curOff = f_rtnBool(_opts.curOff),
                _returnDefault = f_rtnBool(_opts.returnDefault), _defaultShow = f_rtnBool(_opts.defaultShow),
                _mouseOverStop = f_rtnBool(_opts.mouseOverStop), _autoPosition = f_rtnBool(_opts.autoPosition),
                _scrollWithMain = f_rtnBool(_opts.scrollWithMain), _hoverIsBtn = f_rtnBool(_opts.hoverIsBtn),
                _mousewheelIsPN = f_rtnBool(_opts.mousewheelIsPN), _onClass = _opts.onClass, _offClass = _opts.offClass,
                _loadSrc = _opts.loadSrc;
            var __cntr = $(this);
            var _scrollEl = $(_opts.scrollEl, __cntr);
            _scrollEl = (_mainCur ? _scrollEl : _scrollEl.children());
            var _scrollBox = _scrollEl.parent();
            var _mainEl = $(_opts.mainEl, __cntr);
            _mainEl = (_mainCur ? _mainEl : _mainEl.children());
            var _mainElOrigin = _mainEl;
            var _mainBox = _mainEl.parent();
            var _mainState = $(_opts.mainState, __cntr);
            var _mainCountState = $(_opts.mainCountState, __cntr);
            var _pageState = $(_opts.pageState, __cntr);
            var _pageCountState = $(_opts.pageCountState, __cntr);
            var _sPrevBtn = $(_opts.sPrev, __cntr);
            var _sNextBtn = $(_opts.sNext, __cntr);
            var _mPrevBtn = $(_opts.mPrev, __cntr);
            var _mNextBtn = $(_opts.mNext, __cntr);
            var _iTrigger = $(_opts.iTrigger, __cntr);
            var _iTriggerFunc = _opts.iTriggerFunc;
            var _playBtn = $(_opts.play, __cntr), _pauseBtn = $(_opts.pause, __cntr);
            var _total = _scrollEl.size();
            _total = (_total < 1 ? _mainEl.size() : _total);
            var _tmpTotal = _total;
            if (_total < 1) {
                return false
            }
            var _sSize = {"s": [0, 0], "a": [0, 0]}, _mSize = {"s": [0, 0], "a": [0, 0]};
            var _index = _defIndex, _oindex, _page = 1, _opage, _pageTotal = 0, _firstClone = 0, _lastClone = 0,
                _delayTimeID, _triggerTimeID, _rtnDefTimeID, _mousewheelTimeID;
            var _recCur, _isStop = false, _isMarquee = (_sEffect == "marquee" ? true : false), _sMarquee;
            var f_rntIndex = function () {
                var __v = _index;
                if (_loop) {
                    if (__v > _total) {
                        __v = 1
                    }
                    if (__v < 1) {
                        __v = _total
                    }
                    if (f_chkEl(_scrollEl) && f_chkEl(_mainEl)) {
                        __v += _firstClone
                    }
                }
                return Math.max(__v - 1, 0)
            };
            var f_rnt_mainEl = function () {
                if (_loop) {
                    if (!f_chkEl(_scrollEl)) {
                        return _mainElOrigin
                    }
                }
                return _mainEl
            };
            var f_extFuncDo = function (__f) {
                if ($.isFunction(__f)) {
                    __f(f_rntIndex(), _total, _page, _pageTotal, _mainState, _pageState, _scrollEl, f_rnt_mainEl(), _autoPlay)
                }
            };
            var f_initFuncDo = function () {
                if ($.isFunction(_opts.initFunc)) {
                    _opts.initFunc()
                }
            };
            var f_startFuncDo = function () {
                f_extFuncDo(_opts.startFunc)
            };
            var f_completeFuncDo = function () {
                f_extFuncDo(_opts.completeFunc)
            };
            var f_endFuncDo = function () {
                f_extFuncDo(_opts.endFunc)
            };
            var f_playFuncDo = function () {
                f_extFuncDo(_opts.playFunc)
            };
            var f_pauseFuncDo = function () {
                f_extFuncDo(_opts.pauseFunc)
            };
            var f_iTriggerFuncDo = function (__o) {
                if ($.isFunction(_iTriggerFunc)) {
                    _iTriggerFunc(__o)
                }
            };
            var f_clearTime = function () {
                if (_delayTimeID) {
                    window.clearTimeout(_delayTimeID)
                }
                if (_triggerTimeID) {
                    window.clearTimeout(_triggerTimeID)
                }
                if (_rtnDefTimeID) {
                    window.clearTimeout(_rtnDefTimeID)
                }
                if (_mousewheelTimeID) {
                    window.clearTimeout(_mousewheelTimeID)
                }
            };
            var f_setStop = function (__v) {
                _isStop = (_mouseOverStop ? __v : false)
            };
            var f_continueDo = function (__o) {
                if (!f_chkEl(__o)) {
                    return false
                }
                __o.bind(_mLeave, function (e) {
                    (f_chkEl(_mainEl) ? f_slideAutoDo() : f_scrollAutoDo())
                })
            };
            var f_updateCur = function (__ind, __sCla) {
                if (_loop) {
                    __ind = (__ind > _total ? 1 : (__ind < 1 ? _total : __ind))
                }
                __ind--;
                if (f_chkEl(_scrollEl) && f_chkEl(_mainEl)) {
                    f_setClass(_scrollEl, _onClass, _opts.offClass);
                    if (!__sCla) {
                        f_setClass(_scrollEl.eq(__ind + _firstClone), _offClass, _onClass)
                    }
                }
                if (f_chkEl(_mainState)) {
                    f_setClass(_mainState, _onClass, _offClass);
                    if (!__sCla) {
                        f_setClass(_mainState.eq(__ind), _offClass, _onClass)
                    }
                }
                if (f_chkEl(_pageState)) {
                    f_setClass(_pageState, _onClass, _offClass);
                    if (!__sCla) {
                        f_setClass(_pageState.eq(_page - 1), _offClass, _onClass)
                    }
                }
                if (__sCla) {
                    return false
                }
                if (f_chkEl(_mainCountState)) {
                    f_addHtml(_mainCountState, "", "<font class=\"" + _onClass + "\">" + _index + "</font>/" + "<font>" + _total + "</font>")
                }
                if (f_chkEl(_pageCountState)) {
                    f_addHtml(_pageCountState, "", "<font class=\"" + _onClass + "\">" + _page + "</font>/" + "<font>" + _pageTotal + "</font>")
                }
                if (!_pnLoop) {
                    var ___sP = _opts.sPrevOffClass, ___sN = _opts.sNextOffClass, ___mP = _opts.mPrevOffClass,
                        ___mN = _opts.mNextOffClass;
                    (_index <= 1 ? f_setClass(_mPrevBtn, "", ___mP) : f_setClass(_mPrevBtn, ___mP));
                    (_index >= _total ? f_setClass(_mNextBtn, "", ___mN) : f_setClass(_mNextBtn, ___mN));
                    (_page <= 1 ? f_setClass(_sPrevBtn, "", ___sP) : f_setClass(_sPrevBtn, ___sP));
                    (_page >= _pageTotal ? f_setClass(_sNextBtn, "", ___sN) : f_setClass(_sNextBtn, ___sN))
                }
            };
            var f_directionInit = function () {
                if (_opts.type != "slide") {
                    return false
                }
                if (f_chkEl(_scrollEl)) {
                    if (f_dir(_direction) == f_dir("l") || f_dir(_direction) == f_dir("r")) {
                        _scrollEl.css({"float": "left"})
                    }
                    switch (_direction) {
                        case f_dir("t"):
                            _scrollBox.css("top", f_px(0 - (_firstClone * _sSize.a[1])));
                            break;
                        case f_dir("b"):
                            _scrollBox.css({"top": f_px(0 - (_sSize.a[1] * _tmpTotal) + ((_vis + _firstClone) * _sSize.a[1]))});
                            for (var i = 0; i < _tmpTotal; i++) {
                                _scrollEl.eq(_tmpTotal - i - 1).appendTo(_scrollBox)
                            }
                            break;
                        case f_dir("l"):
                            _scrollBox.css("left", f_px(0 - (_firstClone * _sSize.a[0])));
                            break;
                        case f_dir("r"):
                            _scrollBox.css({"left": f_px(0 - (_sSize.a[0] * _tmpTotal) + ((_vis + _firstClone) * _sSize.a[0]))});
                            for (var i = 0; i < _tmpTotal; i++) {
                                _scrollEl.eq(_tmpTotal - i - 1).appendTo(_scrollBox)
                            }
                            break;
                        default:
                            _scrollEl.css({"display": "none"});
                            break
                    }
                }
                if (f_chkEl(_mainEl)) {
                    if (f_dir(_effect) == f_dir("l") || f_dir(_effect) == f_dir("r")) {
                        _mainEl.css({"float": "left"})
                    }
                    switch (_effect) {
                        case f_dir("t"):
                            _mainBox.css("top", f_px(0 - (_firstClone * _mSize.a[1])));
                            break;
                        case f_dir("b"):
                            _mainBox.css({"top": f_px(0 - (_mSize.a[1] * _tmpTotal) + ((_vis + _firstClone) * _mSize.a[1]))});
                            for (var i = 0; i < _tmpTotal; i++) {
                                _mainEl.eq(_tmpTotal - i - 1).appendTo(_mainBox)
                            }
                            break;
                        case f_dir("l"):
                            _mainBox.css("left", f_px(0 - (_firstClone * _mSize.a[0])));
                            break;
                        case f_dir("r"):
                            _mainBox.css({"left": f_px(0 - (_mSize.a[0] * _tmpTotal) + ((_vis + _firstClone) * _mSize.a[0]))});
                            for (var i = 0; i < _tmpTotal; i++) {
                                _mainEl.eq(_tmpTotal - i - 1).appendTo(_mainBox)
                            }
                            break;
                        default:
                            _mainEl.css({"display": "none"});
                            break
                    }
                }
            };
            var f_mousewheel = function () {
                if (!_mousewheelIsPN) {
                    return false
                }
                var __domObj = __cntr[0];
                var __mwEvent = ((/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel");
                var __mousewheelFunc = function (__e) {
                    f_clearTime();
                    __e = __e || window.event;
                    var __d = (__e.detail ? (-__e.detail / 3) : (__e.wheelDelta / 120));
                    if (__e.preventDefault) {
                        __e.preventDefault()
                    }
                    if (__e.stopPropagation) {
                        __e.stopPropagation()
                    }
                    __e.cancelBubble = false;
                    __e.returnValue = false;
                    _mousewheelTimeID = setTimeout(function () {
                        (__d == 1 ? f_mPrevDo() : f_mNextDo())
                    }, _mousewheelTime)
                };
                if (__domObj.attachEvent) {
                    __domObj.attachEvent("on" + __mwEvent, __mousewheelFunc)
                } else if (__domObj.addEventListener) {
                    __domObj.addEventListener(__mwEvent, __mousewheelFunc, false)
                }
            };
            var f_init = function () {
                f_scrollMarqueeInit();
                if (f_isValue(_loadSrc)) {
                    __cntr.find("img[" + _loadSrc + "]").each(function (__ind, __el) {
                        f_imageLoad($(this), _loadSrc)
                    })
                }
                if (f_chkEl(_scrollEl)) {
                    _scrollEl.each(function () {
                        if ($(this).width() > _sSize.s[0]) {
                            _sSize.s[0] = $(this).width();
                            _sSize.a[0] = $(this).outerWidth(true)
                        }
                        if ($(this).height() > _sSize.s[1]) {
                            _sSize.s[1] = $(this).height();
                            _sSize.a[1] = $(this).outerHeight(true)
                        }
                    })
                }
                if (f_chkEl(_mainEl)) {
                    _mainEl.each(function () {
                        if ($(this).width() > _mSize.s[0]) {
                            _mSize.s[0] = $(this).width();
                            _mSize.a[0] = $(this).outerWidth(true)
                        }
                        if ($(this).height() > _mSize.s[1]) {
                            _mSize.s[1] = $(this).height();
                            _mSize.a[1] = $(this).outerHeight(true)
                        }
                    })
                }
                if (!_loop) {
                    _pageTotal = Math.ceil(Math.max((_total - _vis), 0) / _scroll) + 1
                } else {
                    _pageTotal = Math.ceil(_total / _scroll);
                    _lastClone = _vis;
                    if (_scroll == 1) {
                        _firstClone = 1
                    } else {
                        if (_total >= _scroll) {
                            _firstClone = _total % _scroll;
                            _firstClone = (_firstClone == 0) ? _scroll : _firstClone
                        } else {
                            _lastClone = 0
                        }
                    }
                    var __i, __j;
                    for (__i = 0; __i < _firstClone; __i++) {
                        __j = (_total - __i - 1);
                        if (f_chkEl(_scrollEl)) {
                            _scrollEl.eq(__j).clone().prependTo(_scrollBox)
                        }
                        if (f_chkEl(_mainEl)) {
                            _mainEl.eq(__j).clone().prependTo(_mainBox)
                        }
                        __j = ""
                    }
                    for (__i = 0; __i < _lastClone; __i++) {
                        if (f_chkEl(_scrollEl)) {
                            _scrollEl.eq(__i).clone().appendTo(_scrollBox)
                        }
                        if (f_chkEl(_mainEl)) {
                            _mainEl.eq(__i).clone().appendTo(_mainBox)
                        }
                    }
                    __i = "";
                    if (f_chkEl(_scrollEl)) {
                        _scrollEl = _scrollBox.children()
                    }
                    if (f_chkEl(_mainEl)) {
                        _mainEl = _mainBox.children()
                    }
                    _tmpTotal = _total + _firstClone + _lastClone
                }
                if (f_chkEl(_scrollEl)) {
                    var __tmpScrollVisS = [_sSize.a[0], _sSize.a[1]], __tmpScrollBoxS = [_sSize.a[0], _sSize.a[1]],
                        __tmpWrapS = "", __tmpScrollBoxCss = {"position": "relative"};
                    if (_direction == f_dir("l") || _direction == f_dir("r")) {
                        if (!_isMarquee) {
                            _scrollEl.css("width", f_px(_sSize.s[0]));
                            __tmpScrollVisS[0] = (_sSize.a[0] * _vis);
                            __tmpScrollBoxS[0] = (_sSize.a[0] * _tmpTotal);
                            __tmpWrapS = "width: " + f_px(__tmpScrollVisS[0]) + ";";
                            __tmpScrollBoxCss.width = f_px(__tmpScrollBoxS[0])
                        }
                    } else if (_direction == f_dir("t") || _direction == f_dir("b")) {
                        if (!_isMarquee) {
                            _scrollEl.css("height", f_px(_sSize.s[1]));
                            __tmpScrollVisS[1] = (_sSize.a[1] * _vis);
                            __tmpScrollBoxS[1] = (_sSize.a[1] * _tmpTotal);
                            __tmpWrapS = "height:" + f_px(__tmpScrollVisS[1]) + ";";
                            __tmpScrollBoxCss.height = f_px(__tmpScrollBoxS[1])
                        }
                    } else {
                        __tmpWrapS = "width: " + f_px(__tmpScrollVisS[0]) + ";";
                        __tmpScrollBoxCss.width = f_px(__tmpScrollBoxS[0]);
                        __tmpScrollBoxCss.height = f_px(__tmpScrollBoxS[1])
                    }
                    _scrollBox.wrap("<div class=\"sTempWrap\" style=\"position:relative; overflow:hidden; " + __tmpWrapS + "\"></div>");
                    _scrollBox.css(__tmpScrollBoxCss);
                    __tmpScrollVisS = __tmpScrollBoxS = __tmpWrapS = __tmpScrollBoxCss = ""
                }
                if (f_chkEl(_mainEl)) {
                    var __tmpMainVisS = [_mSize.a[0], _mSize.a[1]], __tmpMainBoxS = [_mSize.a[0], _mSize.a[1]],
                        __tmpWrapS = "", __tmpMainBoxCss = {"position": "relative"};
                    if (_effect == f_dir("l") || _effect == f_dir("r")) {
                        _mainEl.css("width", f_px(_mSize.s[0]));
                        __tmpMainBoxS[0] = (_mSize.a[0] * _tmpTotal);
                        __tmpWrapS = "position:relative; overflow:hidden; width: " + f_px(__tmpMainVisS[0]) + ";";
                        __tmpMainBoxCss.width = f_px(__tmpMainBoxS[0])
                    } else if (_effect == f_dir("t") || _effect == f_dir("b")) {
                        _mainEl.css("height", f_px(_mSize.s[1]));
                        __tmpMainBoxS[1] = (_mSize.a[1] * _tmpTotal);
                        __tmpWrapS = "position:relative; overflow:hidden; height:" + f_px(__tmpMainVisS[1]) + ";";
                        __tmpMainBoxCss.height = f_px(__tmpMainBoxS[1])
                    } else if (_effect == "fold") {
                        _mainEl.css({"position": "absolute", "top": "0px", "left": "0px", "width": f_px(_mSize.s[0])});
                        __tmpMainBoxCss.width = f_px(__tmpMainBoxS[0]);
                        __tmpMainBoxCss.height = f_px(__tmpMainBoxS[1])
                    } else {
                        __tmpWrapS = "";
                        __tmpMainBoxCss = ""
                    }
                    if (f_isValue(__tmpWrapS)) {
                        _mainBox.wrap("<div class=\"mTempWrap\" style=\"" + __tmpWrapS + "\"></div>")
                    }
                    if (f_isValue(__tmpMainBoxCss)) {
                        _mainBox.css(__tmpMainBoxCss)
                    }
                    __tmpMainVisS = __tmpMainBoxS = __tmpWrapS = __tmpMainBoxCss = ""
                }
                if (f_chkEl(_scrollEl) && f_chkEl(_mainEl)) {
                    _scrollEl.bind(_event, function (__e) {
                        f_clearTime();
                        var __tCur = $(this), __i = _scrollEl.index(__tCur);
                        triggerTimeID = window.setTimeout(function () {
                            var __tmpi = __i + 1 - _firstClone;
                            if (__tmpi > _index) {
                                _index = (__tmpi - 1);
                                f_mNextDo()
                            } else {
                                _index = (__tmpi + 1);
                                f_mPrevDo()
                            }
                            f_setStop(_mouseOverStop);
                            f_continueDo(__tCur)
                        }, _triggerTime)
                    })
                }
                if (f_chkEl(_mainState)) {
                    var __i;
                    if (_autoMainState) {
                        for (__i = 0; __i < _total; __i++) {
                            f_addHtml(_mainState, _opts.mainStateHtml, (__i + 1), true)
                        }
                        __i = "";
                        _mainState = _mainState.children()
                    }
                    _mainState.bind(_event, function (__e) {
                        f_clearTime();
                        var __tCur = $(this);
                        __i = _mainState.index($(this));
                        triggerTimeID = window.setTimeout(function () {
                            f_slideDo(__i + 1);
                            f_setStop(_mouseOverStop);
                            f_continueDo(__tCur)
                        }, _triggerTime)
                    })
                }
                if (f_chkEl(_pageState) && !_isMarquee) {
                    var __p;
                    if (_autoPage) {
                        for (__p = 0; __p < _pageTotal; __p++) {
                            f_addHtml(_pageState, _opts.pageStateHtml, (__p + 1), true)
                        }
                        __p = ""
                    }
                    _pageState = _pageState.children();
                    _pageState.bind(_event, function (__e) {
                        f_clearTime();
                        var __tCur = $(this);
                        __p = _pageState.index($(this));
                        triggerTimeID = window.setTimeout(function () {
                            f_scrollDo(__p + 1);
                            f_setStop(_mouseOverStop);
                            f_continueDo(__tCur)
                        }, _triggerTime)
                    })
                }
                if (f_chkEl(_mPrevBtn)) {
                    _mPrevBtn.click(function (__e) {
                        f_mPrevDo()
                    })
                }
                if (f_chkEl(_mNextBtn)) {
                    _mNextBtn.click(function (__e) {
                        f_mNextDo()
                    })
                }
                if (f_chkEl(_sPrevBtn)) {
                    if (!_isMarquee) {
                        _sPrevBtn.click(function (__e) {
                            f_sPrevDo()
                        })
                    } else {
                        _sPrevBtn.mousedown(function () {
                            var __sdir;
                            switch (_direction) {
                                case f_dir("t"):
                                    __sdir = f_dir("b");
                                    break;
                                case f_dir("b"):
                                    __sdir = f_dir("t");
                                    break;
                                case f_dir("l"):
                                    __sdir = f_dir("r");
                                    break;
                                case f_dir("r"):
                                    __sdir = f_dir("l");
                                    break
                            }
                            f_setStop(false);
                            f_scrollMarquee(false, __sdir, (_delayTime / 2))
                        });
                        _sPrevBtn.mouseup(function () {
                            f_setStop(_mouseOverStop);
                            f_scrollMarquee(false, _direction, _delayTime)
                        })
                    }
                }
                if (f_chkEl(_sNextBtn)) {
                    if (!_isMarquee) {
                        _sNextBtn.click(function (__e) {
                            f_sNextDo()
                        })
                    } else {
                        _sNextBtn.mousedown(function () {
                            f_setStop(false);
                            f_scrollMarquee(false, _direction, (_delayTime / 2))
                        });
                        _sNextBtn.mouseup(function () {
                            f_setStop(_mouseOverStop);
                            f_scrollMarquee(false, _direction, _delayTime)
                        })
                    }
                }
                if (f_chkEl(_playBtn)) {
                    _playBtn.click(function () {
                        f_clearTime();
                        _autoPlay = true;
                        _playBtn.hide();
                        if (f_chkEl(_pauseBtn)) {
                            _pauseBtn.show()
                        }
                        (f_chkEl(_mainEl) ? f_slideAutoDo() : f_scrollAutoDo());
                        f_playFuncDo()
                    })
                }
                if (f_chkEl(_pauseBtn)) {
                    _pauseBtn.click(function () {
                        f_clearTime();
                        _autoPlay = false;
                        _pauseBtn.hide();
                        if (f_chkEl(_playBtn)) {
                            _playBtn.show()
                        }
                        f_pauseFuncDo()
                    })
                }
                if (_autoPlay) {
                    if (f_chkEl(_playBtn)) {
                        _playBtn.hide()
                    }
                    if (f_chkEl(_pauseBtn)) {
                        _pauseBtn.show()
                    }
                } else {
                    if (f_chkEl(_playBtn)) {
                        _playBtn.show()
                    }
                    if (f_chkEl(_pauseBtn)) {
                        _pauseBtn.hide()
                    }
                }
                if (_mouseOverStop || _hoverIsBtn) {
                    __cntr.bind(_mEnter, function (__e) {
                        if (_mouseOverStop) {
                            f_clearTime();
                            f_setStop(true)
                        } else {
                            if (_hoverIsBtn) {
                                if (f_chkEl(_mPrevBtn)) {
                                    f_animateStop(_mPrevBtn).fadeIn(_btnSpeed)
                                }
                                if (f_chkEl(_mNextBtn)) {
                                    f_animateStop(_mNextBtn).fadeIn(_btnSpeed)
                                }
                                if (f_chkEl(_sPrevBtn)) {
                                    f_animateStop(_sPrevBtn).fadeIn(_btnSpeed)
                                }
                                if (f_chkEl(_sNextBtn)) {
                                    f_animateStop(_sNextBtn).fadeIn(_btnSpeed)
                                }
                            }
                        }
                    });
                    __cntr.bind(_mLeave, function (__e) {
                        if (_mouseOverStop) {
                            f_setStop(false);
                            (f_chkEl(_mainEl) ? f_slideAutoDo() : f_scrollAutoDo())
                        } else {
                            if (_hoverIsBtn) {
                                if (f_chkEl(_mPrevBtn)) {
                                    f_animateStop(_mPrevBtn).fadeOut(_btnSpeed)
                                }
                                if (f_chkEl(_mNextBtn)) {
                                    f_animateStop(_mNextBtn).fadeOut(_btnSpeed)
                                }
                                if (f_chkEl(_sPrevBtn)) {
                                    f_animateStop(_sPrevBtn).fadeOut(_btnSpeed)
                                }
                                if (f_chkEl(_sNextBtn)) {
                                    f_animateStop(_sNextBtn).fadeOut(_btnSpeed)
                                }
                            }
                        }
                    })
                }
                f_mousewheel();
                f_directionInit()
            };
            var f_slideEffectDo = function () {
                var __oind = _oindex, __ind = _index, __init = (!_oindex ? true : false);
                __oind += _firstClone;
                __ind += _firstClone;
                _oindex = _index;
                if (__oind != __ind) {
                    f_updateCur(_index);
                    f_startFuncDo();
                    f_slideEffectComm(__init, __ind)
                } else {
                    if (_curOff) {
                        var __SorH = f_isHide(_mainEl.eq(__ind - 1));
                        f_updateCur(_index, (!__SorH ? true : false));
                        f_slideEffectComm(__init, __ind, "", "", (!__SorH ? "hide" : "show"))
                    }
                }
                if (_autoPlay) {
                    f_slideAutoDo()
                }
            };
            var f_slideEffectComm = function (__init, __ind, __st, __ef, __SorH) {
                if (!f_chkEl(_mainEl)) {
                    return false
                }
                var __dv = "";
                __st = (!f_isValue(__st) ? _speed : __st);
                __ef = (__ef == "n" ? false : true);
                __SorH = (f_isValue(__SorH)) ? __SorH : "show";
                __ind--;
                switch (_effect) {
                    case"fade":
                        f_animateStop(_mainEl).not(":eq(" + __ind + ")").hide();
                        _mainEl.eq(__ind).animate({"opacity": __SorH}, __st, _easing, (function () {
                            (__ef ? f_completeFuncDo() : false)
                        }));
                        break;
                    case"fold":
                        f_animateStop(_mainEl).not(":eq(" + __ind + ")").animate({"opacity": "hide"}, __st, _easing);
                        _mainEl.eq(__ind).animate({"opacity": __SorH}, __st, _easing, (function () {
                            (__ef ? f_completeFuncDo() : false)
                        }));
                        break;
                    case"slideDown":
                        f_animateStop(_mainEl).not(":eq(" + __ind + ")").slideUp(__st, _easing);
                        if (__SorH == "show") {
                            _mainEl.eq(__ind).slideDown(__st, _easing, (function () {
                                (__ef ? f_completeFuncDo() : false)
                            }))
                        } else {
                            _mainEl.eq(__ind).slideUp(__st, _easing, (function () {
                                (__ef ? f_completeFuncDo() : false)
                            }))
                        }
                        break;
                    case f_dir("t"):
                        __dv = 0 - (__ind * _mSize.a[1]);
                        if (__init) {
                            f_animateStop(_mainBox).css("top", f_px(__dv));
                            f_completeFuncDo()
                        } else {
                            f_animateStop(_mainBox).animate({"top": f_px(__dv)}, __st, _easing, (function () {
                                (__ef ? f_completeFuncDo() : false)
                            }))
                        }
                        break;
                    case f_dir("b"):
                        __dv = 0 - (_mSize.a[1] * _tmpTotal) + ((__ind + 1) * _mSize.a[1]);
                        if (__init) {
                            f_animateStop(_mainBox).css({"top": f_px(__dv)});
                            f_completeFuncDo()
                        } else {
                            f_animateStop(_mainBox).animate({"top": f_px(__dv)}, __st, _easing, (function () {
                                (__ef ? f_completeFuncDo() : false)
                            }))
                        }
                        break;
                    case f_dir("l"):
                        __dv = 0 - (__ind * _mSize.a[0]);
                        if (__init) {
                            f_animateStop(_mainBox).css("left", f_px(__dv));
                            f_completeFuncDo()
                        } else {
                            f_animateStop(_mainBox).animate({"left": f_px(__dv)}, __st, _easing, (function () {
                                (__ef ? f_completeFuncDo() : false)
                            }))
                        }
                        break;
                    case f_dir("r"):
                        __dv = 0 - (_mSize.a[0] * _tmpTotal) + ((__ind + 1) * _mSize.a[0]);
                        if (__init) {
                            f_animateStop(_mainBox).css({"left": f_px(__dv)});
                            f_completeFuncDo()
                        } else {
                            f_animateStop(_mainBox).animate({"left": f_px(__dv)}, __st, _easing, (function () {
                                (__ef ? f_completeFuncDo() : false)
                            }))
                        }
                        break;
                    default:
                        f_animateStop(_mainEl).not(":eq(" + __ind + ")").hide(__st, _easing);
                        if (__SorH == "show") {
                            _mainEl.eq(__ind).show(__st, _easing, (function () {
                                (__ef ? f_completeFuncDo() : false)
                            }))
                        } else {
                            _mainEl.eq(__ind).hide(__st, _easing, (function () {
                                (__ef ? f_completeFuncDo() : false)
                            }))
                        }
                        break
                }
            };
            var f_slideDo = function (__ind, __init) {
                f_clearTime();
                _index = __ind;
                if (f_chkEl(_mainEl)) {
                    f_slideEffectDo()
                } else {
                    (!_isMarquee ? f_scrollDo() : f_scrollMarquee(__init))
                }
            };
            var f_slideAutoDo = function () {
                f_clearTime();
                if (_autoPlay && !_isStop) {
                    _delayTimeID = window.setTimeout(f_mNextDo, _delayTime)
                }
            };
            var f_mPrevDo = function () {
                var __ind = _index - 1;
                var __pind = Math.ceil(__ind / _scroll);
                var __sN = 0;
                if (!_pnLoop) {
                    if (__ind < 1) {
                        return false
                    }
                }
                if (!_loop) {
                    if (__ind < 1) {
                        __ind = _total;
                        __pind = _pageTotal;
                        __sN = (_pageTotal - 1) * _scroll
                    } else {
                        __sN = (__pind - 1) * _scroll
                    }
                } else {
                    if (__ind < 1) {
                        __ind = _total;
                        __pind = _pageTotal;
                        __sN = _total - _firstClone;
                        f_slideEffectComm(true, (_tmpTotal - _lastClone + 1), 0, "n");
                        f_scrollEffectDo(_total, 0, "n")
                    } else {
                        __sN = (__pind - 1) * _scroll
                    }
                }
                if (_opage != __pind) {
                    _opage = _page = __pind;
                    f_scrollEffectDo(__sN, _speed, "n")
                }
                f_slideDo(__ind)
            };
            var f_mNextDo = function () {
                var __ind = _index + 1;
                var __pind = Math.min(Math.ceil(__ind / _scroll), _pageTotal);
                var __sN = 0;
                if (!_pnLoop) {
                    if (__ind > _total) {
                        return false
                    }
                }
                if (!_loop) {
                    if (__ind > _total) {
                        __ind = 1;
                        __pind = 1
                    } else {
                        __sN = (__pind - 1) * _scroll
                    }
                } else {
                    if (__ind > _total) {
                        __ind = 1;
                        __pind = 1;
                        f_slideEffectComm(true, _firstClone, 0, "n");
                        f_scrollEffectDo(-_firstClone, 0, "n")
                    } else {
                        __sN = (__pind - 1) * _scroll
                    }
                }
                if (_opage != __pind) {
                    _opage = _page = __pind;
                    f_scrollEffectDo(__sN, _speed, "n")
                }
                f_slideDo(__ind)
            };
            var f_sPrevDo = function () {
                var __ind = 0;
                var __pind = (_page - 1);
                var __sN = 0;
                if (!_pnLoop) {
                    if (__pind < 1) {
                        return false
                    }
                }
                if (!_loop) {
                    if (__pind < 1) {
                        _page = _pageTotal + 1;
                        __sN = (_pageTotal - 1) * _scroll;
                        __ind = _total - (_scroll - 1) + 1
                    } else {
                        __sN = (__pind - 1) * _scroll;
                        __ind = (__pind * _scroll) - (_scroll - 1) + 1
                    }
                } else {
                    if (__pind < 1) {
                        _page = _pageTotal + 1;
                        __sN = _total - _firstClone;
                        __ind = (_pageTotal * _scroll) - (_scroll - 1) + 1;
                        f_scrollEffectDo(_total, 0, "n");
                        if (_scrollWithMain) {
                            f_slideEffectComm(true, (_tmpTotal - _lastClone + 1), 0, "n")
                        }
                    } else {
                        __sN = (__pind - 1) * _scroll;
                        __ind = (__pind * _scroll) - (_scroll - 1) + 1
                    }
                }
                _page = _page - 1;
                if (!f_chkEl(_mainEl) || !_scrollWithMain) {
                    f_scrollDo(_page, __sN)
                } else {
                    _index = __ind;
                    f_mPrevDo()
                }
            };
            var f_sNextDo = function () {
                var __ind = 0;
                var __pind = (_page + 1);
                var __sN = 0;
                if (!_pnLoop) {
                    if (__pind > _pageTotal) {
                        return false
                    }
                }
                if (!_loop) {
                    if (__pind > _pageTotal) {
                        _page = 0
                    } else {
                        __sN = (__pind - 1) * _scroll;
                        __ind = __sN
                    }
                } else {
                    if (__pind > _pageTotal) {
                        _page = 0;
                        f_scrollEffectDo(-_firstClone, 0, "n");
                        if (_scrollWithMain) {
                            f_slideEffectComm(true, 1, 0, "n")
                        }
                    } else {
                        __sN = (__pind - 1) * _scroll;
                        __ind = __sN
                    }
                }
                _page = _page + 1;
                if (!f_chkEl(_mainEl) || !_scrollWithMain) {
                    f_scrollDo(_page, __sN)
                } else {
                    _index = __ind;
                    f_mNextDo()
                }
            };
            var f_scrollEffectDo = function (__sN, __st, __ef) {
                if (!f_chkEl(_scrollBox)) {
                    return false
                }
                __st = (!f_isValue(__st) ? _speed : __st);
                __ef = (__ef == "n" ? false : true);
                var __dv = "";
                switch (_direction) {
                    case f_dir("t"):
                        __dv = 0 - ((__sN + _firstClone) * _sSize.a[1]);
                        __dv = {"top": f_px(__dv)};
                        break;
                    case f_dir("b"):
                        __dv = 0 - ((_tmpTotal - _vis) * _sSize.a[1]) + ((__sN + _firstClone) * _sSize.a[1]);
                        __dv = {"top": f_px(__dv)};
                        break;
                    case f_dir("l"):
                        __dv = 0 - ((__sN + _firstClone) * _sSize.a[0]);
                        __dv = {"left": f_px(__dv)};
                        break;
                    case f_dir("r"):
                        __dv = 0 - ((_tmpTotal - _vis) * _sSize.a[0]) + ((__sN + _firstClone) * _sSize.a[0]);
                        __dv = {"left": f_px(__dv)};
                        break
                }
                f_animateStop(_scrollBox).animate(__dv, _sSpeed, _easing, (function () {
                    (__ef ? f_completeFuncDo() : false)
                }))
            };
            var f_scrollDo = function (__pind, __sN) {
                f_clearTime();
                _page = (__pind ? __pind : _page);
                __sN = (f_isValue(__sN) ? __sN : (_page - 1) * _scroll);
                f_updateCur(_index);
                f_startFuncDo();
                f_scrollEffectDo(__sN);
                if (_autoPlay && !f_chkEl(_mainEl)) {
                    f_scrollAutoDo()
                }
            };
            var f_scrollAutoDo = function () {
                f_clearTime();
                if (_autoPlay && !_isStop) {
                    if (!_isMarquee) {
                        _delayTimeID = window.setTimeout(f_sNextDo, _delayTime)
                    } else {
                        f_scrollMarquee()
                    }
                }
            };
            var f_scrollMarqueeInit = function () {
                if (!_isMarquee) {
                    return false
                }
                _vis = 1;
                _loop = false
            };
            var f_scrollMarqueeDo = function (__sdir) {
                var __tW = (_tmpTotal * _sSize.a[0]), __tH = (_tmpTotal * _sSize.a[1]);
                __tW = (!_isMarquee ? __tW : _scrollBox.outerWidth(true));
                __tH = (!_isMarquee ? __tH : _scrollBox.outerHeight(true));
                switch (__sdir ? __sdir : _direction) {
                    case f_dir("t"):
                        if (__tH - _sMarquee.scrollTop() <= 0) {
                            _sMarquee.scrollTop(_sMarquee.scrollTop() - __tH + _sStep)
                        } else {
                            _sMarquee.scrollTop(_sMarquee.scrollTop() + _sStep)
                        }
                        break;
                    case f_dir("b"):
                        if (__tH - _sMarquee.scrollTop() >= __tH) {
                            _sMarquee.scrollTop(_sMarquee.scrollTop() + __tH - _sStep)
                        } else {
                            _sMarquee.scrollTop(_sMarquee.scrollTop() - _sStep)
                        }
                        break;
                    case f_dir("l"):
                        if (__tW - _sMarquee.scrollLeft() <= 0) {
                            _sMarquee.scrollLeft(_sMarquee.scrollLeft() - __tW + _sStep)
                        } else {
                            _sMarquee.scrollLeft(_sMarquee.scrollLeft() + _sStep)
                        }
                        break;
                    case f_dir("r"):
                        if (__tW - _sMarquee.scrollLeft() >= __tW) {
                            _sMarquee.scrollLeft(_sMarquee.scrollLeft() + __tW - _sStep)
                        } else {
                            _sMarquee.scrollLeft(_sMarquee.scrollLeft() - _sStep)
                        }
                        break
                }
            };
            var f_scrollMarquee = function (__init, __sdir, __dtime) {
                f_clearTime();
                if (!f_chkEl(_scrollEl) || _total < _vis) {
                    return false
                }
                if (__init) {
                    var __tvs = (_direction == f_dir("l") || _direction == f_dir("r") ? ["width", "left"] : ["height", ""]);
                    _sMarquee = _scrollBox.parent(".sTempWrap");
                    _sMarquee.wrapInner("<div class=\"sTempWrapInner\" style=\"" + __tvs[0] + ": 100000%;\"></div>");
                    if ("" != __tvs[1]) {
                        _scrollBox.css("float", __tvs[1]);
                        _sMarquee.width("100%");
                        _sMarquee.children().css("width", f_px(_scrollBox.outerWidth(true) * 2.5));
                        if (_scrollBox.outerWidth(true) <= _sMarquee.outerWidth()) {
                            _autoPlay = false;
                            return false
                        }
                    } else {
                        _sMarquee.height("100%");
                        _sMarquee.children().css("height", f_px(_scrollBox.outerHeight(true) * 2.5));
                        if (_scrollBox.outerHeight(true) <= _sMarquee.outerHeight()) {
                            _autoPlay = false;
                            return false
                        }
                    }
                    if (_direction == f_dir("r")) {
                        var __sBoxTempLeft = 0 - (_scrollBox.outerWidth(true) - _sMarquee.outerWidth());
                        _scrollBox.css(f_dir("l"), f_px(__sBoxTempLeft))
                    }
                    if (_direction == f_dir("b")) {
                        var __sBoxTempTop = 0 - (_scrollBox.outerHeight(true) - _sMarquee.outerHeight());
                        _scrollBox.css(f_dir("t"), f_px(__sBoxTempTop))
                    }
                    _scrollBox.clone().appendTo(_sMarquee.children())
                }
                if (_autoPlay && !_isStop) {
                    _delayTimeID = setInterval(function () {
                        f_scrollMarqueeDo(__sdir)
                    }, (__dtime ? __dtime : _delayTime))
                }
            };
            var f_iTriggerDo = function () {
                if (!f_chkEl(_iTrigger)) {
                    return false
                }
                _iTrigger.bind("click", "", function () {
                    f_clearTime();
                    var __curSelf = $(this);
                    $(window.document).unbind("click");
                    try {
                        setTimeout(function () {
                            f_iTriggerFuncDo(__curSelf)
                        }, 0)
                    } catch (__catch) {
                    }
                    f_setClass(_recCur[0], _onClass, _offClass);
                    f_triggerEffect(_recCur[1], "h", _effect, _speed, _easing, (function () {
                        f_endFuncDo()
                    }))
                })
            };
            var f_boxDo = function () {
                _mainState.bind(_event, function (__e) {
                    f_clearTime();
                    var __curThis = $(this), __cInd = _mainState.index(__curThis), __cParent = __curThis.parent(),
                        __cTarget = __cParent.find(_opts.mainEl);
                    var __isCurHide = (!f_isHide(__cTarget) ? (_curOff ? true : false) : false);
                    _triggerTimeID = window.setTimeout(function () {
                        _index = (__cInd + 1);
                        if (!__isCurHide) {
                            if (f_isHide(__cTarget)) {
                                if (_recCur) {
                                    f_setClass(_recCur[0], _onClass, _offClass);
                                    f_triggerEffect(_recCur[1], "h", _effect, 0, _easing, (function () {
                                        f_endFuncDo()
                                    }))
                                }
                                _recCur = [__cParent, __cTarget, __curThis];
                                f_setClass(__cParent, _offClass, _onClass);
                                f_startFuncDo();
                                if (_autoPosition) {
                                    f_setOffset(__curThis, __cTarget, _addX, _addY)
                                }
                                f_triggerEffect(__cTarget, "s", _effect, _speed, _easing, (function () {
                                    f_completeFuncDo()
                                }));
                                $(window.document).bind("click", function (__e) {
                                    if (!_recCur) {
                                        return 1
                                    }
                                    var __src = $(__e.target || __e.srcElement, __cParent)[0];
                                    do {
                                        if (__src == _recCur[2][0] || __src == _recCur[1][0]) {
                                            return 1
                                        }
                                        __src = __src.parentNode
                                    } while (__src.parentNode);
                                    $(this).unbind("click");
                                    f_setClass(_recCur[0], _onClass, _offClass);
                                    f_triggerEffect(_recCur[1], "h", _effect, _speed, _easing, (function () {
                                        f_endFuncDo()
                                    }))
                                })
                            }
                        } else {
                            f_setClass(__cParent, _onClass, _offClass);
                            f_triggerEffect(__cTarget, "h", _effect, _speed, _easing, (function () {
                                f_endFuncDo()
                            }))
                        }
                    }, _triggerTime)
                });
                if (_event == _mEnter) {
                    _mainState.bind(_mLeave, function (__e) {
                        f_clearTime()
                    })
                }
                f_iTriggerDo()
            };
            var f_menuDo = function () {
                f_menuDefDo();
                _mainState.bind(_event, function (__e) {
                    f_clearTime();
                    var __curThis = $(this), __cInd = _mainState.index(__curThis),
                        __cTarget = f_animateStop(__curThis.find(_opts.mainEl));
                    _triggerTimeID = window.setTimeout(function () {
                        _index = __cInd + 1;
                        if (_oindex != _index && _recCur) {
                            f_setClass(_recCur[0], _onClass, _offClass);
                            f_triggerEffect(_recCur[1], "h", _effect, _speed, _easing, (function () {
                                f_endFuncDo()
                            }))
                        }
                        _oindex = _index;
                        _recCur = [__curThis, __cTarget];
                        f_setClass(__curThis, _offClass, _onClass);
                        f_startFuncDo();
                        if (_autoPosition) {
                            f_setOffset(__curThis, __cTarget, _addX, _addY)
                        }
                        f_triggerEffect(__cTarget, "s", _effect, _speed, _easing, (function () {
                            f_completeFuncDo()
                        }))
                    }, _triggerTime);
                    if (_stopPropagation) {
                        __e.stopPropagation();
                        return false
                    }
                });
                _mainState.bind(_mLeave, function (__e) {
                    f_clearTime();
                    f_animateStop($(this).find(_opts.mainEl));
                    _triggerTimeID = window.setTimeout(function () {
                        var __rdef = true, __rCur = true;
                        if (_recCur) {
                            if (_returnDefault) {
                                if (_defIndex == _oindex) {
                                    __rdef = false;
                                    if (_defaultShow) {
                                        __rCur = false
                                    }
                                }
                            }
                            if (__rdef) {
                                f_setClass(_recCur[0], _onClass, _offClass)
                            }
                            if (__rCur) {
                                f_triggerEffect(_recCur[1], "h", _effect, _speed, _easing, (function () {
                                    f_endFuncDo()
                                }))
                            }
                        }
                    }, _triggerTime);
                    if (_stopPropagation) {
                        __e.stopPropagation();
                        return false
                    }
                });
                if (_returnDefault) {
                    __cntr.bind(_mEnter, function (__e) {
                        if (_rtnDefTimeID) {
                            window.clearTimeout(_rtnDefTimeID)
                        }
                    });
                    __cntr.bind(_mLeave, function (__e) {
                        _rtnDefTimeID = window.setTimeout((function () {
                            f_menuDefDo()
                        }), _speed)
                    })
                }
                f_iTriggerDo()
            };
            var f_menuDefDo = function () {
                var __rdef = false, __dshow = false;
                if (_returnDefault) {
                    __rdef = true;
                    if (_defaultShow) {
                        __dshow = true
                    }
                } else {
                    if (_defaultShow) {
                        __rdef = __dshow = true
                    }
                }
                if (__rdef || __dshow) {
                    _oindex = _index = _defIndex;
                    _recCur = [_mainState.eq(_index - 1)];
                    _recCur[1] = _recCur[0].find(_opts.mainEl)
                }
                if (__rdef) {
                    f_setClass(_recCur[0], _offClass, _onClass)
                }
                if (__rdef || __dshow) {
                    f_startFuncDo()
                }
                if (__dshow) {
                    if (_autoPosition) {
                        f_setOffset(_recCur[0], _recCur[1], _addX, _addY)
                    }
                    f_triggerEffect(_recCur[1], "s", _effect, _speed, _easing, (function () {
                        f_completeFuncDo()
                    }))
                }
            };
            var f_appCreate = function () {
                try {
                    f_initFuncDo()
                } catch (__e) {
                    alert(__e.message)
                }
                switch (_opts.type) {
                    case"slide":
                        f_init();
                        f_slideDo(_index, true);
                        break;
                    case"menu":
                        f_menuDo();
                        break;
                    case"box":
                        f_boxDo();
                        break;
                    default:
                        alert("Error in type. type:[slide, box, menu]");
                        break
                }
            };
            f_appCreate()
        })
    }
})(jQuery);