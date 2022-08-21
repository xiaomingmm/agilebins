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
;(function($){
	$.fn.agilebins=function(_arg_options, _evt){
		var _AB_FN_ = {
			/* ================= 参数选项 ================= */
			"options": {
				"type": "slide", /* 效果类型: slide, menu, box */
				"direction": "left", /* 滚动方向: left, right, top, bottom */
				"eventType": "mouseover", /* 事件类型: mouseover, click */
				
				"index": 0, /* 默认指定索引: 从0开始 */
				"visNum": 1, /* 滚动模式,可视化个数 */
				"scrollNum": 1, /* 滚动模式, 单次滚动数量 */
				"sStep": 1, /* 步长, sEffect: marquee 生效 */
				
				"speed": 350, /* 效果过滤速度 */
				"sSpeed": 350, /* 滚动模式, 过滤速度 */
				"btnSpeed": 50, /* 按钮效果过滤速度 */
				"triggerTime": 50, /* 事件响应延迟时间 */
				"delayTime": 3500, /* 动画间隔时间 */
				"mousewheelTime": 250, /* 鼠标轮滚延迟响应时间 */
				
				"effect": "fade", /* 效果过滤类型: fade, fold, left, right, top, bottom */
				"sEffect": "", /* 滚动模式, 若为: marquee 则无缝隙滚动 */
				"easing": "swing", /* 缓动效果类型, 更多引用 jQeury.easing */
				
				"scrollEl": "", /* 滚动模式, 元素 */
				"sPrev": "", /* 滚动模式, 按钮上 */
				"sNext": "", /* 滚动模式, 按钮下 */
				"sPrevOffClass": "off", /* 滚动模式, 按钮上不可用时状态class名 */
				"sNextOffClass": "off", /* 滚动模式, 按钮下不可用时状态class名 */
				"onClass": "on", /* 开启状态class名 */
				"offClass": "", /* 默认状态class名 */
				
				"mainEl": "", /* 数据元素 */
				"mPrev": "", /* 按钮上 */
				"mNext": "", /* 按钮上 */
				"mPrevOffClass": "off", /* 按钮上不可用时状态class名 */
				"mNextOffClass": "off", /* 按钮下不可用时状态class名 */
				"mainState": "", /* 导航动态元素 */
				"mainStateHtml": "li", /* 导航动态元素填充标签 */
				"mainCountState": "", /* 统计状态元素 */
				
				"pageState": "", /* 分页元素 */
				"pageStateHtml": "li", /* 分页元素填充标签 */
				"pageCountState": "", /* 分页统计元素 */
				
				"play": "", /* 播放按钮 */
				"pause": "", /* 暂停按钮 */
				
				"autoPosition": false, /* box|menu 自动定位模式 */
				"addX": 0, /* box|menu, 水平方向偏移像素 */
				"addY": 0, /* box|menu, 垂直方向偏移像素 */
				"iTrigger": "", /* menu, 激活菜单子元素,响应事件时可关闭 */
				"iTriggerFunc": "", /* menu, 激活菜单子元素响应事件回调函数 */
				
				"initFunc": "", /* 初始化扩展函数 */
				"startFunc": "", /* 动画起始扩展函数执行 */
				"completeFunc": "", /* 动画完毕扩展函数执行 */
				"endFunc": "", /* 效果结束扩展函数执行 */
				"playFunc": "", /* 效果播放按钮扩展函数执行 */
				"pauseFunc": "", /* 效果暂停扩展函数执行 */
				
				"loop": false, /* 循环模式 */
				"pnLoop": true, /* 上下按钮循环模式 */
				"autoPlay": false, /* 自动播放开关 */
				
				"autoMainState": false, /* 自动填充 mainState 属性值 */
				"autoPage": false, /* 自动分页 */
				
				"loadSrc": "", /* 图片加载原图 */
				"mainCur": false, /* 当前元素模式, 以为着不必查找子元素作为列表 */
				"curOff": false, /* 若当前已显示, 可关闭。手风琴效果|box类型 */
				"returnDefault": false, /* 返回默认指定要显示元素, 用于menu类型 */
				"defaultShow": false, /* 是否默认显示 */
				"mouseOverStop": false, /* 鼠标悬浮容器, 停止自动播放 */
				"scrollWithMain": true, /* 当mainEl和scrollEl同时存在时, 是否同步执行 */
				"hoverIsBtn": false, /* 是否开启当鼠标悬浮容器, 显示上下按钮, 离开则不显示按钮 */
				"mousewheelIsPN": false /* 是否开启当鼠标上下轮滚事件, 针对上下按钮操作 */
			}
		};
		
		/**
		 * 检测一个值是否为空
		 * @param {var} v
		 */
		var f_isValue = function (v) {
			if(typeof(v) == "number"){
				return true;
			}
			if(typeof(v) == "string"){
				return (v.length < 1 ? false : true);
			}
			
			return ((typeof(v) == "undefined" || v == null || v == "") ? false : true);
		};
		
		/**
		 * 检测 HTML 元素对象是否存在
		 * @param {Object} o
		 */
		var f_chkEl = function (o) {
			var r = false;
			
			try{
				if(o.size() >= 1){ r = true; }
			}catch(e){};
			
			return r;
		};
		
		/**
		 * 设置元素 class
		 * @param {Object} o HTML元素对象
		 * @param {String} r 移除class名
		 * @param {String} a 添加class名
		 */
		var f_setClass = function (o, r, a) {
			if(!f_chkEl(o)){ return false; }
			
			if(o.hasClass(r)){ o.removeClass(r); }
			if(!o.hasClass(a)){ o.addClass(a); }
		};
		
		/**
		 * 在HTML元素内填充内容(或HTML标签)
		 * @param {Object} o HTML元素对象
		 * @param {String} tn 标签名
		 * @param {String} v 向标签内填充的内容
		 * @param {Boolean} isAdd (true=追加, false=替换原有内容)
		 */
		var f_addHtml = function (o, tn, v ,isAdd) {
			if(!f_chkEl(o)){ return false; }
			
			v = (f_isValue(tn) ? ("<" + tn + ">" + v + "</" + tn + ">") : v);
			(isAdd != true ? o.html(v) : o.append(v));
		};
		
		/**
		 * 组合像素单位 px 值
		 * @param {Number} v 像素值
		 */
		var f_px = function(v){
			return (v + "px");
		};
		
		/**
		 * 图片加载
		 * @param {Object} __o 图片元素对象
		 * @param {String} __src 图片源
		 */
		var f_imageLoad = function (__o, __src) {
			if(!f_chkEl(__o)){ return false; }
			
			var __img = new Image();
				__img.onload = function() {
					__o.attr("src", __o.attr(__src)).removeAttr(__src);
				};
				__img.src = __o.attr(__src);
		};
		
		/**
		 * 停止动画
		 * @param {Object} __o
		 */
		var f_animateStop = function (__o) {
			return (__o.stop(true, true));
		};
		
		/**
		 * 取得滚动条 top 值
		 */
		var f_scrollTop = function () {
			return $(document).scrollTop();
		};
		
		/**
		 * 检测HTML元素对象 display:none
		 * @param {Object} o HTML元素对象
		 */
		var f_isHide = function(o){
			if(!f_chkEl(o)){ return false; }
			
			return (o.css("display") != "none" ? false : true);
		};
		
		/**
		 * 获取HTML元素对象 坐标及大小
		 * @param {Object} o HTML元素对象
		 * @param {String} sType 获取大小模式(为 self 只获取width和height, 则获取包括padding,margin,border)
		 * @param {Boolean} inMargin 是否获取margin值
		 * @return {Object}
		 */
		var f_getOffset = function (o, sType, inMargin) {
			if(!f_chkEl(o)){ return {}; }
			
			inMargin = (inMargin != true) ? false : true;
			
			var t = parseFloat(o.offset().top);
			var l = parseFloat(o.offset().left);
			var w = parseFloat((sType != "self") ? o.outerWidth(inMargin) : o.width());
			var h = parseFloat((sType != "self") ? o.outerHeight(inMargin) : o.height());
			
			return {"top": t, "left": l, "width": w, "height": h};
		};
		
		/**
		 * 设置HTML元素对象 position 的位置
		 * @param {Object} a 获取参照值, HTML元素对象
		 * @param {Object} b 设置HTML元素对象
		 * @param {Number} x left值
		 * @param {Number} y top值
		 */
		var f_setOffset = function (a, b, x, y) {
			if(!f_chkEl(b)){ return false; }
			
			/* 屏幕大小和滚动条距顶部值 */
			var __screenW = parseFloat($(window).width());
			var __screenH = parseFloat($(window).height());
			var __documentH = parseFloat($(document).height());
			var __scrollTop = f_scrollTop();
			
			/* 元素参数 */
			var __titData = f_getOffset(a);
			var __boxData = f_getOffset(b);
			
			/* 自动定位,计算菜单存储空间是否大于等于,菜单内容元素的大小 */
			var __memorySpace = { "width": (__screenW - (__titData.left + __titData.width)), "height": (__screenH - (__titData.top - __scrollTop) - __titData.height) };
			
			/* 设置坐标初始化 */
			var __style = {"position": "absolute"};
				b.css({"left": "", "right": "", "top": "", "bottom": ""});
			
			/* 计算坐标 */
			if((__boxData.width <= (__memorySpace.width - x)) || (__titData <= (__memorySpace.width - x))) {
				__style.left = (0 + x) + "px";
			}else{
				__style.right = (0 + x) + "px";
			}
			if((__boxData.height <= (__memorySpace.height - y)) || (__titData.top <= (__memorySpace.height - y))) {
				__style.top = (__titData.height + y) + "px";
			}else{
				__style.bottom = (__titData.height + y) + "px";
			}
			
			b.css(__style);
		};
		
		/**
		 * 获取 direction 方向值
		 * @param {String} k 参数名
		 */
		var f_dir = function(k){
			var _od = {"top": "top", "bottom": "bottom", "left": "left", "right":"right"},
				_d = {"t": _od.top, "b": _od.bottom, "l": _od.left, "r": _od.right};
				
			if(f_isValue(k)){
				return (k.length > 1 ? _od[k] : _d[k]);
			}
		};
		
		/**
		 * 一个参数值转换为 Boolean
		 * @param {Boolean} v 参数值
		 */
		var f_rtnBool = function(v){
			return (v === true || v == "true" ? true : false);
		};
		
		/**
		 * 效果触发类型
		 * @param {Object} __o HTML元素对象
		 * @param {String} __t 显示和隐藏 
		 * @param {String} __ee 过度效果类型
		 * @param {Number} __st 过度时间
		 * @param {String} __eas 过渡效果方法
		 * @param {Function} __cb 过度效果执行完毕后,回调函数
		 */
		var f_triggerEffect = function(__o, __t, __ee, __st, __eas, __cb){
			if(!f_chkEl(__o)){ return false; }
			
			__t = (__t != "h" ? "show" : "hide");
			
			switch(__ee){
				case "fade":
					if(__t == "hide"){
						f_animateStop(__o).animate({"opacity": __t}, __st, __eas, __cb);
					}else{
						f_animateStop(__o).animate({"opacity": __t}, __st, __eas, __cb);
					}
				break;
				case "slideDown":
					if(__t == "hide"){
						f_animateStop(__o).slideUp(__st, __eas, __cb);
					}else{
						f_animateStop(__o).slideDown(__st, __eas, __cb);
					}
				break;
				default:
					if(__t == "hide"){
						f_animateStop(__o).hide(__st, __eas, __cb);
					}else{
						f_animateStop(__o).show(__st, __eas, __cb);
					}
				break;
			}
		};
		
		return this.each(function() {	
			var _opts = $.extend({}, _AB_FN_.options, _arg_options);
			
			var _mEnter = "mouseenter",
				_mLeave = "mouseleave",
			
				_speed = parseInt(_opts.speed),
				_sSpeed = parseInt(_opts.sSpeed),
				_btnSpeed = parseInt(_opts.btnSpeed),
				_triggerTime = parseInt(_opts.triggerTime),
				_mousewheelTime = parseInt(_opts.mousewheelTime),
				_delayTime = parseInt(_opts.delayTime),
				
				_sStep = parseFloat(_opts.sStep),
				_vis = parseInt(_opts.visNum),
				_scroll = parseInt(_opts.scrollNum),
				_defIndex = (parseInt(_opts.index) + 1),
				
				_addX = parseFloat(_opts.addX),
				_addY = parseFloat(_opts.addY),
			
				_direction = _opts.direction,
				_effect = _opts.effect,
				_sEffect = _opts.sEffect,
				_easing = _opts.easing,
				_event = (_opts.eventType != "mouseover" ? "click" : _mEnter),
			
				_autoPlay = f_rtnBool(_opts.autoPlay),
				_loop = f_rtnBool(_opts.loop),
				_pnLoop = f_rtnBool(_opts.pnLoop),
				_autoMainState = f_rtnBool(_opts.autoMainState),
				_autoPage = f_rtnBool(_opts.autoPage),
				_mainCur = f_rtnBool(_opts.mainCur),
				_curOff = f_rtnBool(_opts.curOff),
				_returnDefault = f_rtnBool(_opts.returnDefault),
				_defaultShow = f_rtnBool(_opts.defaultShow),
				_mouseOverStop = f_rtnBool(_opts.mouseOverStop),
				_autoPosition = f_rtnBool(_opts.autoPosition),
				_scrollWithMain = f_rtnBool(_opts.scrollWithMain),
				_hoverIsBtn = f_rtnBool(_opts.hoverIsBtn),
				_mousewheelIsPN = f_rtnBool(_opts.mousewheelIsPN),
				
				_onClass = _opts.onClass,
				_offClass = _opts.offClass,
				_loadSrc = _opts.loadSrc;
			
			/* 容器元素 */
			var __cntr = $(this);
			/*滚动*/
			var _scrollEl = $(_opts.scrollEl, __cntr);
				_scrollEl = (_mainCur ? _scrollEl : _scrollEl.children());
			/*滚动包裹层*/
			var _scrollBox = _scrollEl.parent();
			/*内容*/
			var _mainEl = $(_opts.mainEl, __cntr);
				_mainEl = (_mainCur ? _mainEl : _mainEl.children());
			var _mainElOrigin = _mainEl;
			/*内容包裹层*/
			var _mainBox = _mainEl.parent();
			/*导航*/
			var _mainState = $(_opts.mainState, __cntr);
			/*导航状态*/
			var _mainCountState = $(_opts.mainCountState, __cntr);
			/*页码*/
			var _pageState = $(_opts.pageState, __cntr);
			/*页码状态*/
			var _pageCountState = $(_opts.pageCountState, __cntr);
			/*上翻按钮*/
			var _sPrevBtn = $(_opts.sPrev, __cntr);
			/*下翻按钮*/
			var _sNextBtn = $(_opts.sNext, __cntr);
			/*内容上一个*/
			var _mPrevBtn = $(_opts.mPrev, __cntr);
			/*内容下一个*/
			var _mNextBtn = $(_opts.mNext, __cntr);
			/* 激活菜单子元素 */
			var _iTrigger = $(_opts.iTrigger, __cntr);
			var _iTriggerFunc = _opts.iTriggerFunc;
			
			/*播放/暂停*/
			var _playBtn = $(_opts.play, __cntr),
				_pauseBtn = $(_opts.pause, __cntr);
			
			var _total = _scrollEl.size();
				_total = (_total < 1 ? _mainEl.size() : _total);
			var _tmpTotal = _total;
			if(_total < 1){ return false; }
			
			/*滚动单个尺寸*/
			var _sSize = {"s": [0, 0], "a": [0, 0]},
			/*内容单个尺寸*/
				_mSize = {"s": [0, 0], "a": [0, 0]};
			
			var _index = _defIndex,
				_oindex,
				_page = 1,
				_opage,
				_pageTotal = 0,
			
				_firstClone = 0,
				_lastClone = 0,
				
				_delayTimeID, _triggerTimeID, _rtnDefTimeID, _mousewheelTimeID;
				
			var _recCur,
				_isStop = false,
				_isMarquee = (_sEffect == "marquee" ? true : false),
				_sMarquee;
			
			/**
			 * 获取索引号
			 */
			var f_rntIndex = function(){
				var __v = _index;
				if(_loop){
					if(__v  > _total){ __v  = 1; }
					if(__v < 1){ __v  = _total; }
					if(f_chkEl(_scrollEl) && f_chkEl(_mainEl)){
						__v += _firstClone;
					}
				}
				return Math.max(__v - 1, 0);
			};
			
			/**
			 * 返回  mainEl 元素对象
			 */
			var f_rnt_mainEl = function() {
				if(_loop) {
					if(!f_chkEl(_scrollEl)) {
						return _mainElOrigin;
					}
				}
				return _mainEl;
			};
			
			/**
			 * 扩展函数执行
			 * @param {Function} __f 函数名 
			 */
			var f_extFuncDo = function(__f) {
				if($.isFunction(__f)){
					__f(f_rntIndex(), _total, _page, _pageTotal, _mainState, _pageState, _scrollEl, f_rnt_mainEl(), _autoPlay);
				}
			};
			
			/**
			 * initFunc 扩展函数
			 */
			var f_initFuncDo = function() {
				if($.isFunction(_opts.initFunc)) {
					_opts.initFunc();
				}
			};
			
			/**
			 * startFunc 扩展函数
			 */
			var f_startFuncDo = function() {
				f_extFuncDo(_opts.startFunc);
			};
			
			/**
			 * completeFunc 扩展函数
			 */
			var f_completeFuncDo = function(){
				f_extFuncDo(_opts.completeFunc);
			};
			
			/**
			 * endFunc 扩展函数
			 */
			var f_endFuncDo = function(){
				f_extFuncDo(_opts.endFunc);
			};
			
			/**
			 * 动画播放触发
			 */
			var f_playFuncDo = function(){
				f_extFuncDo(_opts.playFunc);
			};
			
			/**
			 * 动画暂停触发
			 */
			var f_pauseFuncDo = function(){
				f_extFuncDo(_opts.pauseFunc);
			};
			
			/**
			 * 单个索引事件触发
			 * @param {Object} __o HTML元素对象
			 */
			var f_iTriggerFuncDo = function(__o){
				if($.isFunction(_iTriggerFunc)){
					_iTriggerFunc(__o);
				}
			};
			
			/**
			 * clearTimeout
			 */
			var f_clearTime = function(){
				if(_delayTimeID){ window.clearTimeout(_delayTimeID); }
				if(_triggerTimeID){ window.clearTimeout(_triggerTimeID); }
				if(_rtnDefTimeID){ window.clearTimeout(_rtnDefTimeID); }
				if(_mousewheelTimeID) { window.clearTimeout(_mousewheelTimeID); }
			};
			
			/**
			 * 鼠标在容器元素上时, 是否停止播放
			 * @param {Boolean} __v
			 */
			var f_setStop = function(__v){
				_isStop = (_mouseOverStop ? __v : false);
			};
			
			/**
			 * 继续播放触发
			 * @param {Object} __o HTML元素对象
			 */
			var f_continueDo = function(__o){
				if(!f_chkEl(__o)){ return false; }
				
				__o.bind(_mLeave, function(e){
					(f_chkEl(_mainEl) ? f_slideAutoDo() : f_scrollAutoDo());
				});
			};
			
			/**
			 * 更新当前元素的状态
			 * @param {Number} __ind 索引号
			 * @param {Boolean} __sCla 是否需要更新Class
			 */
			var f_updateCur = function(__ind, __sCla){
				/*选中当前*/
				if(_loop){ __ind = (__ind > _total ? 1 : (__ind < 1 ? _total : __ind)); }
				__ind--;
				
				if(f_chkEl(_scrollEl) && f_chkEl(_mainEl)){
					f_setClass(_scrollEl, _onClass, _opts.offClass);
					if(!__sCla){ f_setClass(_scrollEl.eq(__ind + _firstClone), _offClass, _onClass); }
				}
				if(f_chkEl(_mainState)){
					f_setClass(_mainState, _onClass, _offClass);
					if(!__sCla){ f_setClass(_mainState.eq(__ind), _offClass, _onClass); }
				}
				if(f_chkEl(_pageState)){
					f_setClass(_pageState, _onClass, _offClass);
					if(!__sCla){ f_setClass(_pageState.eq(_page - 1), _offClass, _onClass); }
				}
				if(__sCla){ return false; }
				
				/*状态*/
				if(f_chkEl(_mainCountState)){
					f_addHtml(_mainCountState, "", "<font class=\"" + _onClass + "\">" + _index + "</font>/" + "<font>" + _total + "</font>");
				}
				if(f_chkEl(_pageCountState)){
					f_addHtml(_pageCountState, "", "<font class=\"" + _onClass + "\">" + _page + "</font>/" + "<font>" + _pageTotal + "</font>");
				}
				
				/*按钮停止*/
				if(!_pnLoop){
					var ___sP = _opts.sPrevOffClass,
						___sN = _opts.sNextOffClass,
						___mP = _opts.mPrevOffClass,
						___mN = _opts.mNextOffClass;
						
					/*内容按钮*/
					(_index <= 1 ? f_setClass(_mPrevBtn, "", ___mP) : f_setClass(_mPrevBtn, ___mP));
					(_index >= _total ? f_setClass(_mNextBtn, "", ___mN) : f_setClass(_mNextBtn, ___mN));
					/*分页按钮*/
					(_page <= 1 ? f_setClass(_sPrevBtn, "", ___sP) : f_setClass(_sPrevBtn, ___sP));
					(_page >= _pageTotal ? f_setClass(_sNextBtn, "", ___sN) : f_setClass(_sNextBtn, ___sN));
				}
			};
			
			/**
			 * 初始化方向
			 */
			var f_directionInit = function(){
				if(_opts.type != "slide"){ return false; }
				
				/*滚动方向*/
				if(f_chkEl(_scrollEl)){
					if(f_dir(_direction) == f_dir("l") || f_dir(_direction) == f_dir("r")){
						_scrollEl.css({"float": "left"});
					}
					switch(_direction){
						case f_dir("t"):
							_scrollBox.css("top", f_px(0 - (_firstClone * _sSize.a[1])));
						break;
						case f_dir("b"):
							_scrollBox.css({"top": f_px(0 - (_sSize.a[1] * _tmpTotal) + ((_vis + _firstClone) * _sSize.a[1]))});
							/*reverse*/
							for(var i = 0; i < _tmpTotal; i++){
								_scrollEl.eq(_tmpTotal - i - 1).appendTo(_scrollBox);
							}
						break;
						case f_dir("l"):
							_scrollBox.css("left", f_px(0 - (_firstClone * _sSize.a[0])));
						break;
						case f_dir("r"):
							_scrollBox.css({"left": f_px(0 - (_sSize.a[0] * _tmpTotal) + ((_vis + _firstClone) * _sSize.a[0]))});
							/*reverse*/
							for(var i = 0; i < _tmpTotal; i++){
								_scrollEl.eq(_tmpTotal - i - 1).appendTo(_scrollBox);
							}
						break;
						default:
							_scrollEl.css({"display": "none"});
						break;
					}
				}
				
				/* 内容 */
				if(f_chkEl(_mainEl)){
					if(f_dir(_effect) == f_dir("l") || f_dir(_effect) == f_dir("r")){
						_mainEl.css({"float": "left"});
					}
					switch(_effect){
						case f_dir("t"):
							_mainBox.css("top", f_px(0 - (_firstClone * _mSize.a[1])));
						break;
						case f_dir("b"):
							_mainBox.css({"top": f_px(0 - (_mSize.a[1] * _tmpTotal) + ((_vis + _firstClone) * _mSize.a[1]))});
							/*reverse*/
							for(var i = 0; i < _tmpTotal; i++){ 
								_mainEl.eq(_tmpTotal - i - 1).appendTo(_mainBox);
							}
						break;
						case f_dir("l"):
							_mainBox.css("left", f_px(0 - (_firstClone * _mSize.a[0])));
						break;
						case f_dir("r"):
							_mainBox.css({"left": f_px(0 - (_mSize.a[0] * _tmpTotal) + ((_vis + _firstClone) * _mSize.a[0]))});
							/*reverse*/
							for(var i = 0; i < _tmpTotal; i++){ 
								_mainEl.eq(_tmpTotal - i - 1).appendTo(_mainBox);
							}
						break;
						default:
							_mainEl.css({"display": "none"});
						break;
					}
				}
			};
			
			/**
			 * 鼠标轮滚事件
			 */
			var f_mousewheel = function(){
				if(!_mousewheelIsPN) {
					return false;
				}
				var __domObj = __cntr[0];
				var __mwEvent = ((/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll": "mousewheel");
				
				var __mousewheelFunc = function(__e){
					f_clearTime();
					
					__e = __e || window.event;
					var __d = (__e.detail ? (-__e.detail / 3): (__e.wheelDelta / 120));
					if(__e.preventDefault) { __e.preventDefault(); }
					if(__e.stopPropagation){ __e.stopPropagation(); }
					__e.cancelBubble = false;
					__e.returnValue = false;
					
					_mousewheelTimeID = setTimeout(function(){
						(__d == 1 ? f_mPrevDo() : f_mNextDo());
					}, _mousewheelTime);
				};
				
				if(__domObj.attachEvent) {
					__domObj.attachEvent("on" + __mwEvent, __mousewheelFunc);
				}else if(__domObj.addEventListener) {
					__domObj.addEventListener(__mwEvent, __mousewheelFunc, false);
				}
			};
			
			/**
			 * slide初始化
			 */
			var f_init = function() {
				/*如存在loadSrc,则加载图片*/
				if(f_isValue(_loadSrc)){
					__cntr.find("img[" + _loadSrc + "]").each(function(__ind, __el){
						f_imageLoad($(this), _loadSrc);
					});
				}
				
				/*导航元素,取最大值*/
				if(f_chkEl(_scrollEl)){
					_scrollEl.each(function(){
						if($(this).width() > _sSize.s[0]){
							_sSize.s[0] = $(this).width();
							_sSize.a[0] = $(this).outerWidth(true);
						}
						if($(this).height() > _sSize.s[1]){
							_sSize.s[1] = $(this).height();
							_sSize.a[1] = $(this).outerHeight(true);
						}
					});
				}
				
				/*内容元素,取最大值*/
				if(f_chkEl(_mainEl)){
					_mainEl.each(function(){
						if($(this).width() > _mSize.s[0]){
							_mSize.s[0] = $(this).width();
							_mSize.a[0] = $(this).outerWidth(true);
						}
						if($(this).height() > _mSize.s[1]){
							_mSize.s[1] = $(this).height();
							_mSize.a[1] = $(this).outerHeight(true);
						}
					});
				}
				
				/*计算分页*/
				if(!_loop){
					_pageTotal = Math.ceil(Math.max((_total - _vis), 0) / _scroll) + 1;
				}else{
					_pageTotal = Math.ceil(_total / _scroll);
					_lastClone = _vis;
					
					if(_scroll == 1){
						_firstClone = 1;
					}else{
						if(_total >= _scroll){
							_firstClone = _total % _scroll;
							_firstClone = (_firstClone == 0) ? _scroll : _firstClone;
						}else{
							_lastClone = 0;
						}
					}
					
					/*复制元素准备无限循环*/
					var __i, __j;
					for(__i = 0; __i < _firstClone; __i++){
						__j = (_total - __i - 1);
						if(f_chkEl(_scrollEl)){
							_scrollEl.eq(__j).clone().prependTo(_scrollBox);
						}
						if(f_chkEl(_mainEl)){
							_mainEl.eq(__j).clone().prependTo(_mainBox);
						}
						__j = "";
					}
					
					for(__i = 0; __i < _lastClone; __i++){
						if(f_chkEl(_scrollEl)){
							_scrollEl.eq(__i).clone().appendTo(_scrollBox);
						}
						if(f_chkEl(_mainEl)){
							_mainEl.eq(__i).clone().appendTo(_mainBox);
						}
					}
					__i = "";
					/*重置元素*/
					if(f_chkEl(_scrollEl)){ _scrollEl = _scrollBox.children(); }
					if(f_chkEl(_mainEl)){ _mainEl = _mainBox.children(); }
					
					_tmpTotal = _total + _firstClone + _lastClone;
				}
				
				/*scroll创建包裹层*/
				if(f_chkEl(_scrollEl)){
					var __tmpScrollVisS = [_sSize.a[0], _sSize.a[1]],
						__tmpScrollBoxS = [_sSize.a[0], _sSize.a[1]],
						__tmpWrapS = "",
						__tmpScrollBoxCss = {"position": "relative", "overflow": "hidden", "padding": f_px(0), "margin": f_px(0)};
					
					if(_direction == f_dir("l") || _direction == f_dir("r")){
						_scrollEl.css("width", f_px(_sSize.s[0]));
						
						__tmpScrollVisS[0] = (_sSize.a[0] * _vis);
						__tmpScrollBoxS[0] = (_sSize.a[0] * _tmpTotal);
						__tmpWrapS = "width: " + f_px(__tmpScrollVisS[0]) + ";";
						__tmpScrollBoxCss.width = f_px(__tmpScrollBoxS[0]);
					}else if(_direction == f_dir("t") || _direction == f_dir("b")){
						_scrollEl.css("height", f_px(_sSize.s[1]));
						
						__tmpScrollVisS[1] = (_sSize.a[1] * _vis);
						__tmpScrollBoxS[1] = (_sSize.a[1] * _tmpTotal);
						__tmpWrapS = "height:" + f_px(__tmpScrollVisS[1]) + ";";
						__tmpScrollBoxCss.height = f_px(__tmpScrollBoxS[1]);
					}else{
						__tmpWrapS = "width: " + f_px(__tmpScrollVisS[0]) + ";";
						__tmpScrollBoxCss.width = f_px(__tmpScrollBoxS[0]);
						__tmpScrollBoxCss.height = f_px(__tmpScrollBoxS[1]);
					}
					/*滚动临时包裹层*/
					_scrollBox.wrap("<div class=\"sTempWrap\" style=\"position:relative; overflow:hidden; " + __tmpWrapS + "\"></div>");
					/*滚动盒子大小*/
					_scrollBox.css(__tmpScrollBoxCss);
					/*清空值*/
					__tmpScrollVisS = __tmpScrollBoxS = __tmpWrapS = __tmpScrollBoxCss = "";
				}
				
				/*为main创建包裹层*/
				if(f_chkEl(_mainEl)){
					var __tmpMainVisS = [_mSize.a[0], _mSize.a[1]],
						__tmpMainBoxS = [_mSize.a[0], _mSize.a[1]],
						__tmpWrapS = "",
						__tmpMainBoxCss = {"position": "relative", "overflow":"hidden", "padding": f_px(0), "margin": f_px(0)};
						
					if(_effect == f_dir("l") || _effect == f_dir("r")){
						_mainEl.css("width", f_px(_mSize.s[0]));
						
						__tmpMainBoxS[0] = (_mSize.a[0] * _tmpTotal);
						__tmpWrapS = "position:relative; overflow:hidden; width: " + f_px(__tmpMainVisS[0]) + ";";
						__tmpMainBoxCss.width = f_px(__tmpMainBoxS[0]);
					}else if(_effect == f_dir("t") || _effect == f_dir("b")){
						_mainEl.css("height", f_px(_mSize.s[1]));
						
						__tmpMainBoxS[1] = (_mSize.a[1] * _tmpTotal);
						__tmpWrapS = "position:relative; overflow:hidden; height:" + f_px(__tmpMainVisS[1]) + ";";
						__tmpMainBoxCss.height = f_px(__tmpMainBoxS[1]);
					}else if(_effect ==  "fold"){
						_mainEl.css({"position": "absolute", "top": "0px", "left": "0px", "width": f_px(_mSize.s[0])});
						
						__tmpMainBoxCss.overflow = "";
						__tmpMainBoxCss.width = f_px(__tmpMainBoxS[0]);
						__tmpMainBoxCss.height = f_px(__tmpMainBoxS[1]);
					}else{
						__tmpWrapS = "";
						__tmpMainBoxCss = "";
					}
					
					/*内容临时包裹层*/
					if(f_isValue(__tmpWrapS)){
						_mainBox.wrap("<div class=\"mTempWrap\" style=\"" + __tmpWrapS + "\"></div>");
					}
					
					/*内容盒子大小*/
					if(f_isValue(__tmpMainBoxCss)){ _mainBox.css(__tmpMainBoxCss); }
					__tmpMainVisS = __tmpMainBoxS = __tmpWrapS = __tmpMainBoxCss = "";
				}
				
				/*绑定滚动事件*/
				if(f_chkEl(_scrollEl) && f_chkEl(_mainEl)){
					_scrollEl.bind(_event, function(__e){
						f_clearTime();
						
						var __tCur = $(this),
							__i = _scrollEl.index(__tCur);
							
						triggerTimeID = window.setTimeout(function(){
							var __tmpi = __i + 1 - _firstClone;
							if(__tmpi > _index){
								_index = (__tmpi - 1);
								f_mNextDo();
							}else{
								_index = (__tmpi + 1);
								f_mPrevDo();
							}
							
							/*鼠标离开是否继续自动执行*/
							f_setStop(_mouseOverStop);
							f_continueDo(__tCur);
						}, _triggerTime);
					});
				}
				
				/*绑定内容事件*/
				if(f_chkEl(_mainState)){
					var __i;
					
					if(_autoMainState){
						for(__i = 0; __i < _total; __i++){
							f_addHtml(_mainState, _opts.mainStateHtml, (__i + 1), true);
						}
						__i = "";
						_mainState = _mainState.children();
					}
					
					_mainState.bind(_event, function(__e){
						f_clearTime();
						var __tCur = $(this);
						__i = _mainState.index($(this));
						
						triggerTimeID = window.setTimeout(function(){
							f_slideDo(__i + 1);
							
							/*鼠标离开是否继续自动执行*/
							f_setStop(_mouseOverStop);
							f_continueDo(__tCur);
						}, _triggerTime);
					});
				}
				
				/*分页导航*/
				if(f_chkEl(_pageState) && !_isMarquee){
					var __p;
					
					if(_autoPage){
						for(__p = 0; __p < _pageTotal; __p++){
							f_addHtml(_pageState, _opts.pageStateHtml, (__p + 1), true);
						}
						__p = "";
					}
					_pageState = _pageState.children();
					
					_pageState.bind(_event, function(__e){
						f_clearTime();
						
						var __tCur = $(this);
						__p = _pageState.index($(this));
						
						triggerTimeID = window.setTimeout(function(){
							f_scrollDo(__p + 1);
							/*鼠标离开是否继续自动执行*/
							f_setStop(_mouseOverStop);
							f_continueDo(__tCur);
						}, _triggerTime);
					});
				}
				
				/*内容按钮*/
				if(f_chkEl(_mPrevBtn)){ _mPrevBtn.click(function(__e){ f_mPrevDo(); }); }
				if(f_chkEl(_mNextBtn)){ _mNextBtn.click(function(__e){ f_mNextDo(); }); }
				
				/*滚动按钮*/
				if(f_chkEl(_sPrevBtn)){
					if(!_isMarquee){
						_sPrevBtn.click(function(__e){ f_sPrevDo(); });
					}else{
						_sPrevBtn.mousedown(function(){
							var __sdir;
							switch(_direction){
								case f_dir("t"): __sdir = f_dir("b"); break;
								case f_dir("b"): __sdir = f_dir("t"); break;
								case f_dir("l"): __sdir = f_dir("r"); break;
								case f_dir("r"): __sdir = f_dir("l"); break;
							}
							f_setStop(false);
							f_scrollMarquee(false, __sdir, (_delayTime / 2));
						});
						_sPrevBtn.mouseup(function(){
							f_setStop(_mouseOverStop);
							f_scrollMarquee(false, _direction, _delayTime);
						});
					}
				}
				
				if(f_chkEl(_sNextBtn)){
					if(!_isMarquee){
						_sNextBtn.click(function(__e){ f_sNextDo(); });
					}else{
						_sNextBtn.mousedown(function(){
							f_setStop(false);
							f_scrollMarquee(false, _direction, (_delayTime / 2));
						});
						_sNextBtn.mouseup(function(){
							f_setStop(_mouseOverStop);
							f_scrollMarquee(false, _direction, _delayTime);
						});
					}
				}
				
				/*播放/暂停按钮*/
				if(f_chkEl(_playBtn)){
					_playBtn.click(function(){
						f_clearTime();
						_autoPlay = true;
						_playBtn.hide();
						if(f_chkEl(_pauseBtn)){ _pauseBtn.show(); }
						(f_chkEl(_mainEl) ? f_slideAutoDo() : f_scrollAutoDo());
						
						/* 播放扩展函数 */
						f_playFuncDo();
					});
				}
				
				if(f_chkEl(_pauseBtn)){
					_pauseBtn.click(function(){
						f_clearTime();
						_autoPlay = false;
						_pauseBtn.hide();
						if(f_chkEl(_playBtn)){ _playBtn.show(); }
						
						/* 暂停扩展函数 */
						f_pauseFuncDo();
					});
				}
				
				if(_autoPlay){
					if(f_chkEl(_playBtn)){ _playBtn.hide(); }
					if(f_chkEl(_pauseBtn)){ _pauseBtn.show(); }
				}else{
					if(f_chkEl(_playBtn)){ _playBtn.show(); }
					if(f_chkEl(_pauseBtn)){ _pauseBtn.hide(); }
				}
				
				/*鼠标悬浮在容器上是否停止播放*/
				if(_mouseOverStop || _hoverIsBtn){
					__cntr.bind(_mEnter, function(__e){
						if(_mouseOverStop) {
							f_clearTime();
							f_setStop(true);
						}else{
							if(_hoverIsBtn) {
								if(f_chkEl(_mPrevBtn)){ f_animateStop(_mPrevBtn).fadeIn(_btnSpeed); }
								if(f_chkEl(_mNextBtn)){ f_animateStop(_mNextBtn).fadeIn(_btnSpeed); }
								
								if(f_chkEl(_sPrevBtn)){ f_animateStop(_sPrevBtn).fadeIn(_btnSpeed); }
								if(f_chkEl(_sNextBtn)){ f_animateStop(_sNextBtn).fadeIn(_btnSpeed); }
							}
						}
					});
					
					__cntr.bind(_mLeave, function(__e){
						if(_mouseOverStop) {
							f_setStop(false);
							(f_chkEl(_mainEl) ? f_slideAutoDo() :  f_scrollAutoDo());
						}else{
							if(_hoverIsBtn){
								if(f_chkEl(_mPrevBtn)){ f_animateStop(_mPrevBtn).fadeOut(_btnSpeed); }
								if(f_chkEl(_mNextBtn)){ f_animateStop(_mNextBtn).fadeOut(_btnSpeed); }
								
								if(f_chkEl(_sPrevBtn)){ f_animateStop(_sPrevBtn).fadeOut(_btnSpeed); }
								if(f_chkEl(_sNextBtn)){ f_animateStop(_sNextBtn).fadeOut(_btnSpeed); }
							}
						}
					});
				}
				
				/* 鼠标轮滑 */
				f_mousewheel();
				
				/*方向*/
				f_directionInit();
			};
			
			/**
			 * slide 效果执行
			 */
			var f_slideEffectDo = function() {
				var __oind = _oindex, __ind = _index,
					__init = (!_oindex ? true : false);
				__oind += _firstClone;
				__ind += _firstClone;
				
				_oindex = _index;
				
				if(__oind != __ind){
					f_updateCur(_index);
					/*start function*/
					f_startFuncDo();
					f_slideEffectComm(__init, __ind);
				}else{
					if(_curOff){
						var __SorH = f_isHide(_mainEl.eq(__ind - 1));
						f_updateCur(_index, (!__SorH ? true : false));
						f_slideEffectComm(__init, __ind, "", "", (!__SorH ? "hide" : "show"));
					}
				}
				
				if(_autoPlay){
					f_slideAutoDo();
				}
			};
			
			/**
			 * 内容效果执行
			 * @param {Boolean} __init 是否为初始化
			 * @param {Number} __ind 索引号
			 * @param {Number} __st 过度效果时间
			 * @param {Boolean} __ef 是否允许回调
			 * @param {String} __SorH 显示与否
			 */
			var f_slideEffectComm = function(__init, __ind, __st, __ef, __SorH){
				if(!f_chkEl(_mainEl)){
					return false;
				}
				var __dv = "";
				__st = (!f_isValue(__st) ? _speed : __st);
				__ef = (__ef == "n" ? false : true);
				__SorH = (f_isValue(__SorH)) ? __SorH : "show";
				__ind--;
				
				switch(_effect){
					case "fade":
						f_animateStop(_mainEl).not(":eq(" + __ind + ")").hide();
						_mainEl.eq(__ind).animate({"opacity": __SorH}, __st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
					break;
					case "fold":
						f_animateStop(_mainEl).not(":eq(" + __ind + ")").animate({"opacity": "hide"}, __st, _easing);
						_mainEl.eq(__ind).animate({"opacity": __SorH}, __st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
					break;
					case "slideDown":
						/* 解决盒子元素,padding值时出现闪动 */
						f_animateStop(_mainEl).not(":eq(" + __ind + ")").slideUp(__st, _easing);
						if(__SorH == "show") {
							_mainEl.eq(__ind).slideDown(__st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
						} else {
							_mainEl.eq(__ind).slideUp(__st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
						}
					break;
					case f_dir("t"):
						__dv = 0 - (__ind * _mSize.a[1]);
						if(__init){
							f_animateStop(_mainBox).css("top", f_px(__dv));
							f_completeFuncDo();
						}else{
							f_animateStop(_mainBox).animate({"top": f_px(__dv)}, __st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
						}
					break;
					case f_dir("b"):
						__dv = 0 - (_mSize.a[1] * _tmpTotal) + ((__ind + 1) * _mSize.a[1]);
						if(__init){
							f_animateStop(_mainBox).css({"top": f_px(__dv)});
							f_completeFuncDo();
						}else{
							f_animateStop(_mainBox).animate({"top": f_px(__dv)}, __st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
						}
					break;
					case f_dir("l"):
						__dv = 0 - (__ind * _mSize.a[0]);
						if(__init){
							f_animateStop(_mainBox).css("left",f_px(__dv));
							f_completeFuncDo();
						}else{
							f_animateStop(_mainBox).animate({"left": f_px(__dv)}, __st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
						}
					break;
					case f_dir("r"):
						__dv = 0 - (_mSize.a[0] * _tmpTotal) + ((__ind + 1) * _mSize.a[0]);
						if(__init){
							f_animateStop(_mainBox).css({"left": f_px(__dv)});
							f_completeFuncDo();
						}else{
							f_animateStop(_mainBox).animate({"left": f_px(__dv)}, __st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
						}
					break;
					default:
						/* 新版本 */
						f_animateStop(_mainEl).not(":eq(" + __ind + ")").hide(__st, _easing);
						if(__SorH == "show") {
							_mainEl.eq(__ind).show(__st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
						} else {
							_mainEl.eq(__ind).hide(__st, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
						}
					break;
				}
			};
			
			/**
			 * slide 调用
			 * @param {Number} __ind 索引号
			 * @param {Boolean} __init 是否初始化marquee
			 */
			var f_slideDo = function(__ind, __init){
				f_clearTime();
				
				_index = __ind;
				if(f_chkEl(_mainEl)){
					f_slideEffectDo();
				}else{
					(!_isMarquee ? f_scrollDo() : f_scrollMarquee(__init));
				}
			};
			
			/**
			 * 触发slide自动运行
			 */
			var f_slideAutoDo = function(){
				f_clearTime();
				if(_autoPlay && !_isStop){
					_delayTimeID = window.setTimeout(f_mNextDo, _delayTime);
				}
			};
			
			/**
			 * slide 上一个
			 */
			var f_mPrevDo = function(){
				var __ind = _index - 1;
				var __pind = Math.ceil(__ind / _scroll);
				var __sN = 0;
				
				if(!_pnLoop){
					if(__ind < 1){
						return false;
					}
				}
				
				if(!_loop){
					if(__ind < 1){
						__ind = _total;
						__pind = _pageTotal;
						__sN = (_pageTotal - 1) * _scroll;
					}else{
						__sN = (__pind - 1) * _scroll;
					}
				}else{
					if(__ind < 1){
						__ind = _total;
						__pind = _pageTotal;
						__sN = _total - _firstClone;
						
						f_slideEffectComm(true, (_tmpTotal - _lastClone + 1), 0, "n");
						f_scrollEffectDo(_total, 0, "n");
					}else{
						__sN = (__pind - 1) * _scroll;
					}
				}
				
				if(_opage != __pind){
					_opage = _page = __pind;
					f_scrollEffectDo(__sN, _speed, "n");
				}
				f_slideDo(__ind);
			};
			
			/**
			 * slide 下一个
			 */
			var f_mNextDo = function(){
				var __ind = _index + 1;
				var __pind = Math.min(Math.ceil(__ind / _scroll), _pageTotal);
				var __sN = 0;
				
				if(!_pnLoop){
					if(__ind > _total){
						return false;
					}
				}
				
				if(!_loop){
					if(__ind > _total){
						__ind = 1;
						__pind = 1;
					}else{
						__sN = (__pind - 1) * _scroll;
					}
				}else{
					if(__ind > _total){
						__ind = 1;
						__pind = 1;
						
						f_slideEffectComm(true, _firstClone, 0, "n");
						f_scrollEffectDo(-_firstClone, 0, "n");
					}else{
						__sN = (__pind - 1) * _scroll;
					}
				}
				
				if(_opage != __pind){
					_opage = _page = __pind;
					f_scrollEffectDo(__sN, _speed, "n");
				}
				f_slideDo(__ind);
			};
			
			/**
			 * scroll 上一组
			 */
			var f_sPrevDo = function(){
				var __ind = 0;
				var __pind = (_page - 1);
				var __sN = 0;
				
				if(!_pnLoop){
					if(__pind < 1){
						return false;
					}
				}
				
				if(!_loop){
					if(__pind < 1){
						_page = _pageTotal + 1;
						__sN = (_pageTotal - 1) * _scroll;
						__ind = _total - (_scroll - 1) + 1;
					}else{
						__sN = (__pind - 1) * _scroll;
						__ind = (__pind * _scroll) - (_scroll - 1) + 1;
					}
				}else{
					if(__pind < 1){
						_page = _pageTotal + 1;
						__sN = _total - _firstClone;
						__ind = (_pageTotal * _scroll) - (_scroll - 1) + 1;
						
						f_scrollEffectDo(_total, 0, "n");
						if(_scrollWithMain){
							f_slideEffectComm(true, (_tmpTotal - _lastClone + 1), 0, "n");
						}
					}else{
						__sN = (__pind - 1) * _scroll;
						__ind = (__pind * _scroll) - (_scroll - 1) + 1;
					}
				}
				_page = _page - 1;
				
				if(!f_chkEl(_mainEl) || !_scrollWithMain){
					f_scrollDo(_page, __sN);
				}else{
					_index = __ind;
					f_mPrevDo();
				}
			};
			
			/**
			 * scroll 下一组
			 */
			var f_sNextDo = function(){
				var __ind = 0;
				var __pind = (_page + 1);
				var __sN = 0;
				
				if(!_pnLoop){
					if(__pind > _pageTotal){
						return false;
					}
				}
				
				if(!_loop){
					if(__pind > _pageTotal){
						_page = 0;
					}else{
						__sN = (__pind - 1) * _scroll;
						__ind = __sN;
					}
				}else{
					if(__pind > _pageTotal){
						_page = 0;
						
						f_scrollEffectDo(-_firstClone, 0, "n");
						if(_scrollWithMain){
							f_slideEffectComm(true, 1, 0, "n");
						}
					}else{
						__sN = (__pind - 1) * _scroll;
						__ind = __sN;
					}
				}
				_page = _page + 1;
				
				if(!f_chkEl(_mainEl) || !_scrollWithMain){
					f_scrollDo(_page, __sN);
				}else{
					_index = __ind;
					f_mNextDo();
				}
			};
			
			/**
			 * 滚动效果
			 * @param {Number} __sN 当前滚动个数
			 * @param {Number} __st 过度时间
			 * @param {Boolean} __ef 是否允许回调
			 */
			var f_scrollEffectDo = function(__sN, __st, __ef){
				if(!f_chkEl(_scrollBox)){ return false; }
				
				__st = (!f_isValue(__st) ? _speed : __st);
				__ef = (__ef == "n" ? false : true);
				
				var __dv = "";
				switch(_direction){
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
					break;
				}
				f_animateStop(_scrollBox).animate(__dv, _sSpeed, _easing, (function(){ (__ef ? f_completeFuncDo() : false); }));
			};
			
			/**
			 * scroll 滚动调用
			 * @param {Number} __pind 页码
			 * @param {Number} __sN 滚动个数
			 */
			var f_scrollDo = function(__pind, __sN){
				f_clearTime();
				_page = (__pind ? __pind : _page);
				__sN = (f_isValue(__sN) ? __sN : (_page - 1) * _scroll);
				
				f_updateCur(_index);
				
				/*start function*/
				f_startFuncDo();
				f_scrollEffectDo(__sN);
				
				if(_autoPlay && !f_chkEl(_mainEl)){
					f_scrollAutoDo();
				}
			};
			
			/**
			 * 滚动自动运行
			 */
			var f_scrollAutoDo = function(){
				f_clearTime();
				if(_autoPlay && !_isStop){
					if(!_isMarquee){
						_delayTimeID = window.setTimeout(f_sNextDo, _delayTime);
					}else{
						f_scrollMarquee();
					}
				}
			};
			
			/**
			 * marquee 方向
			 * @param {String} __sdir 方向
			 */
			var f_scrollMarqueeDo = function(__sdir){
				var __tW = (_tmpTotal * _sSize.a[0]),
					__tH = (_tmpTotal * _sSize.a[1]);
					
				switch(__sdir ? __sdir : _direction){
					case f_dir("t"):
						if(__tH - _sMarquee.scrollTop() <= 0){
							_sMarquee.scrollTop(_sMarquee.scrollTop() - __tH + _sStep);
						}else{
							_sMarquee.scrollTop(_sMarquee.scrollTop() + _sStep);
						}
					break;
					case f_dir("b"):
						if(__tH - _sMarquee.scrollTop() >= __tH){
							_sMarquee.scrollTop(_sMarquee.scrollTop() + __tH + _sStep);
						}else{
							_sMarquee.scrollTop(_sMarquee.scrollTop() - _sStep);
						}
					break;
					case f_dir("l"):
						if(__tW - _sMarquee.scrollLeft() <= 0){
							_sMarquee.scrollLeft(_sMarquee.scrollLeft() - __tW + _sStep);
						}else{
							_sMarquee.scrollLeft(_sMarquee.scrollLeft() + _sStep);
						}
					break;
					case f_dir("r"):
						if(__tW - _sMarquee.scrollLeft() >= __tW){
							_sMarquee.scrollLeft(_sMarquee.scrollLeft() + __tW + _sStep);
						}else{
							_sMarquee.scrollLeft(_sMarquee.scrollLeft() - _sStep);
						}
					break;
				}
			};
			
			/**
			 * marquee 初始化
			 * @param {Boolean} __init 是否初始化
			 * @param {String} __sdir 方向
			 * @param {Number} __dtime 过度时间
			 */
			var f_scrollMarquee = function(__init, __sdir, __dtime){
				f_clearTime();
				if(!f_chkEl(_scrollEl) || _total < _vis){ return false; }
				if(__init){
					var __tvs = (_direction == f_dir("l") || _direction == f_dir("r") ? ["width", "left"] : ["height", ""]);
					_sMarquee = _scrollEl.parents(".sTempWrap");
					_scrollEl.parent().css("float", __tvs[1]).clone().appendTo(_sMarquee);
					_sMarquee.wrapInner("<div class=\"sTempWrapInner\" style=\"" + __tvs[0] + ": 100000%;\"></div>");
					__tvs = "";
				}
				if(_autoPlay && !_isStop){
					_delayTimeID = setInterval(function(){ f_scrollMarqueeDo(__sdir); }, (__dtime ? __dtime : _delayTime));
				}
			};
			
			/**
			 * 单个元素事件触发
			 */
			var f_iTriggerDo = function(){
				if(!f_chkEl(_iTrigger)){ return false; }
				
				_iTrigger.bind("click", "", function(){
					f_clearTime();
					var __curSelf = $(this);
					
					$(window.document).unbind("click");
					
					/* 响应回调函数 */
					try{
						setTimeout(function(){
						f_iTriggerFuncDo(__curSelf);
						}, 0);
					}catch(__catch){  }
					
					/* 关闭菜单盒子 */
					f_setClass(_recCur[0], _onClass, _offClass);
					f_triggerEffect(_recCur[1], "h", _effect, _speed, _easing, (function(){ f_endFuncDo(); }));
				});
			};
			
			/**
			 * box 类型
			 */
			var f_boxDo = function(){
				_mainState.bind(_event, function(__e){
					f_clearTime();
					
					var __curThis = $(this),
						__cInd = _mainState.index(__curThis),
						__cParent = __curThis.parent(),
						__cTarget	 = __cParent.find(_opts.mainEl);
					var __isCurHide = (!f_isHide(__cTarget) ? (_curOff ? true : false) : false);
					
					_triggerTimeID = window.setTimeout(function(){
						_index = (__cInd + 1);
						
						if(!__isCurHide){
							if(f_isHide(__cTarget)){
								if(_recCur){
									/*Reset class*/
									f_setClass(_recCur[0], _onClass, _offClass);
									/*The removal of an event*/
									f_triggerEffect(_recCur[1], "h", _effect, 0, _easing, (function(){ f_endFuncDo(); }));
								}
								/*Record the current*/
								_recCur = [__cParent, __cTarget, __curThis];
								
								f_setClass(__cParent, _offClass, _onClass);
								/*start function*/
								f_startFuncDo();
								/*自动定位*/
								if(_autoPosition){ f_setOffset(__curThis, __cTarget, _addX, _addY); }
								
								f_triggerEffect(__cTarget, "s", _effect, _speed, _easing, (function(){ f_completeFuncDo(); }));
								
								$(window.document).bind("click", function(__e){
								  	if(!_recCur){ return 1;}
									
									var __src = $(__e.target || __e.srcElement, __cParent)[0];
								  	do{
										if(__src == _recCur[2][0] || __src == _recCur[1][0]){
											return 1;
										}
									  	__src = __src.parentNode;
									}while(__src.parentNode);
									
									$(this).unbind("click");
									f_setClass(_recCur[0], _onClass, _offClass);
									f_triggerEffect(_recCur[1], "h", _effect, _speed, _easing, (function(){ f_endFuncDo(); }));
							  });
							}
						}else{
							f_setClass(__cParent, _onClass, _offClass);
							f_triggerEffect(__cTarget, "h", _effect, _speed, _easing, (function(){ f_endFuncDo(); }));
						}
					}, _triggerTime);
				});
				
				if(_event == _mEnter){
					_mainState.bind(_mLeave, function(__e){
						f_clearTime();
					});
				}
				
				/* 激活菜单子元素 */
				f_iTriggerDo();
			};
			
			/**
			 * menu 类型
			 */
			var f_menuDo = function(){
				f_menuDefDo();
				
				/* 鼠标悬浮 */
				_mainState.bind(_event, function(__e) {
					f_clearTime();
					
					var __curThis = $(this),
						__cInd = _mainState.index(__curThis),
						__cTarget = f_animateStop(__curThis.find(_opts.mainEl));
					
					// trigger
					_triggerTimeID = window.setTimeout(function(){
						_index = __cInd + 1;
						
						if(_oindex != _index && _recCur){
							f_setClass(_recCur[0], _onClass, _offClass);
							f_triggerEffect(_recCur[1], "h", _effect, _speed, _easing, (function(){ f_endFuncDo(); }));
						}
						
						_oindex = _index;
						_recCur = [__curThis, __cTarget];
						
						// set class
						f_setClass(__curThis, _offClass, _onClass);
						
						/*start function*/
						f_startFuncDo();
						
						/*自动定位*/
						if(_autoPosition){ f_setOffset(__curThis, __cTarget, _addX, _addY); }
						
						// effect
						f_triggerEffect(__cTarget, "s", _effect, _speed, _easing, (function(){ f_completeFuncDo(); }));
					}, _triggerTime);
					
					__e.stopPropagation();
					return false;
				});
				
				/* 鼠标离开 */
				_mainState.bind(_mLeave, function(__e){
					f_clearTime();
					
					// stop
					f_animateStop($(this).find(_opts.mainEl));
					
					// trigger
					_triggerTimeID = window.setTimeout(function(){
						var __rdef = true,
							__rCur = true;
						
						if(_recCur){
							if(_returnDefault){
								if(_defIndex == _oindex){
									__rdef = false;
									if(_defaultShow){ __rCur = false; }
								}
							}
							
							// def
							if(__rdef){
								f_setClass(_recCur[0], _onClass, _offClass);
							}
							
							// cur
							if(__rCur){
								f_triggerEffect(_recCur[1], "h", _effect, _speed, _easing, (function(){ f_endFuncDo(); }));
							}
						}
					}, _triggerTime);
					
					__e.stopPropagation();
					return false;
				});
				
				/* 返回默认 */
				if(_returnDefault){
					__cntr.bind(_mEnter, function(__e){
						if(_rtnDefTimeID){ window.clearTimeout(_rtnDefTimeID); }
					});
					__cntr.bind(_mLeave, function(__e){
						_rtnDefTimeID = window.setTimeout((function(){ f_menuDefDo(); }), _speed);
					});
				}
				
				/* 激活菜单子元素 */
				f_iTriggerDo();
			};
			
			/**
			 * menu 类型默认设置
			 */
			var f_menuDefDo = function() {
				var __rdef = false,
					__dshow = false;
					
				if(_returnDefault){
					__rdef = true;
					if(_defaultShow){ __dshow = true; }
				}else{
					if(_defaultShow){ __rdef = __dshow = true; }
				}
				
				if(__rdef || __dshow){
					_oindex = _index =  _defIndex;
					_recCur = [_mainState.eq(_index - 1)];
					_recCur[1] = _recCur[0].find(_opts.mainEl);
				}
				
				if(__rdef){
					f_setClass(_recCur[0], _offClass, _onClass);
				}
				
				if(__rdef || __dshow){
					/*start function*/
					f_startFuncDo();
				}
				
				if(__dshow){
					/*自动定位*/
					if(_autoPosition){ f_setOffset(_recCur[0], _recCur[1], _addX, _addY); }
					
					f_triggerEffect(_recCur[1], "s", _effect, _speed, _easing, (function(){ f_completeFuncDo(); }));
				}
			};
			
			/**
			 * 创建效果应用
			 */
			var f_appCreate = function() {
				/* initFunc */
				try{
					f_initFuncDo();
				}catch(__e){
					alert(__e.message);
				}
				
				/* 选择类型 */
				switch (_opts.type) {
					case "slide":
						f_init();
						f_slideDo(_index, true);
						break;
					case "menu":
						f_menuDo();
						break;
					case "box":
						f_boxDo();
						break;
					default:
						alert("Error in type. type:[slide, box, menu]");
						break;
				};
			};
			
			/* 创建效果应用开始 */
			f_appCreate();
		});
	};
})(jQuery);