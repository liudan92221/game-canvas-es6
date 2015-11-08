/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _canvasJs = __webpack_require__(1);
	
	var Main = (function () {
	  function Main() {
	    _classCallCheck(this, Main);
	  }
	
	  Main.prototype.init = function init() {
	    window.G = _canvasJs.Canvas;
	  };
	
	  return Main;
	})();
	
	new Main().init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _eventJs = __webpack_require__(2);
	
	var _drawJs = __webpack_require__(3);
	
	var Canvas = (function () {
	  function Canvas(canvas) {
	    _classCallCheck(this, Canvas);
	
	    this.canvas = canvas;
	    this.context = canvas.getContext('2d');
	
	    this.Draw = _drawJs.Draw;
	
	    this.context.globalAlpha = 1;
	
	    this.w = canvas.width;
	    this.h = canvas.height;
	
	    var client = canvas.getBoundingClientRect();
	    this.client = {
	      x: client.left * (canvas.width / client.width),
	      y: client.top * (canvas.height / client.height)
	    };
	
	    this.data = null;
	    this.init();
	  }
	
	  Canvas.prototype.init = function init() {
	    this.addEvent();
	  };
	
	  Canvas.prototype.addEvent = function addEvent() {
	    var _this = this;
	    _eventJs.Events.forEach(function (event) {
	      _this.on(event.type, function (e) {
	        event.cb.call(_this, e);
	      });
	    });
	  };
	
	  Canvas.prototype.getPosition = function getPosition() {
	    var canvas = this.canvas;
	    var client = canvas.getBoundingClientRect();
	    return {
	      x: client.left * (canvas.width / client.width),
	      y: client.top * (canvas.height / client.height)
	    };
	  };
	
	  Canvas.prototype.clientX = function clientX() {
	    return this.getPosition().x;
	  };
	
	  Canvas.prototype.clientY = function clientY() {
	    return this.getPosition().y;
	  };
	
	  Canvas.prototype.createDraw = function createDraw() {
	    return new this.Draw(this.canvas, this.context);
	  };
	
	  Canvas.prototype.clear = function clear() {
	    this.context.clearRect(0, 0, this.w, this.h);
	    return this;
	  };
	
	  Canvas.prototype.resetDraw = function resetDraw() {
	    var Draws = this.Draw.getDraws();
	
	    this.clear();
	    for (var i = 0; i < Draws.length; i++) {
	      Draws[i].resetDraw();
	    }
	  };
	
	  Canvas.prototype.putData = function putData(imageData) {
	    this.context.putImageData(imageData, 0, 0);
	    return this;
	  };
	
	  Canvas.prototype.getData = function getData() {
	    return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
	  };
	
	  Canvas.prototype.saveData = function saveData() {
	    this.data = this.getData();
	    return this;
	  };
	
	  Canvas.prototype.restoreData = function restoreData() {
	    if (this.data) {
	      this.putData(this.data);
	    }
	    return this;
	  };
	
	  Canvas.prototype.on = function on(type, cb) {
	    var _this = this;
	    this.canvas.addEventListener(type, function (e) {
	      e.preventDefault();
	      cb.call(_this, e);
	    }, false);
	  };
	
	  return Canvas;
	})();

	exports.Canvas = Canvas;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var fns = [{
	  type: 'mousedown',
	  cb: function cb(e) {
	    var _this = this;
	    var Draws = this.Draw.getDraws();
	    Draws.forEach(function (item) {
	      if (item.event && item.event['mousedown'] && item.event['mousedown'].length) {
	        var client = _this.getPosition();
	        var x = e.clientX - client.x;
	        var y = e.clientY - client.y;
	
	        if (item.isPointInPath(x, y)) {
	          item.event['mousedown'].forEach(function (cb) {
	            cb.call(item, e);
	          });
	        }
	      }
	    });
	  }
	}, {
	  type: 'mouseup',
	  cb: function cb() {}
	}, {
	  type: 'mousemove',
	  cb: function cb() {}
	}, {
	  type: 'mouseover',
	  cb: function cb() {}
	}, {
	  type: 'mouseenter',
	  cb: function cb() {}
	}];
	var Events = fns;
	exports.Events = Events;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _utilJs = __webpack_require__(4);
	
	var _baseJs = __webpack_require__(5);
	
	var isObject = _utilJs.Util.isObject;
	var isArray = _utilJs.Util.isArray;
	var isNumber = _utilJs.Util.isNumber;
	var isString = _utilJs.Util.isString;
	var isFunction = _utilJs.Util.isFunction;
	var isNode = _utilJs.Util.isNode;
	
	var Draws = [];
	
	var Draw = (function () {
	  function Draw(canvas, context) {
	    _classCallCheck(this, Draw);
	
	    this.canvas = canvas;
	    this.context = context;
	    this.base = new _baseJs.Base(this.context);
	
	    this.draws = [];
	    this.path = [];
	    this.event = null;
	
	    Draws.push(this);
	  }
	
	  Draw.getDraws = function getDraws() {
	    return Draws;
	  };
	
	  Draw.getUUID = function getUUID() {
	    var s = '';
	    var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
	    for (var i = 0; i < 36; i++) {
	      s += hexDigits.charAt(Math.floor(Math.random() * 36));
	    }
	    return s;
	  };
	
	  Draw.prototype.clear = function clear() {
	    this.draws = [];
	
	    return this;
	  };
	
	  Draw.prototype.set = function set(type, obj, path, uuid) {
	    var draws = this.draws;
	    if (uuid) {
	      var item = null;
	      for (var i = 0; i < draws.length; i++) {
	        item = draws[i];
	        if (item.id === uuid) {
	          item.type = type;
	          item.obj = obj;
	          item.path = path;
	          item.name = obj.name || null;
	          break;
	        }
	      }
	    } else {
	      uuid = Draw.getUUID();
	      this.draws.push({
	        id: uuid,
	        type: type,
	        obj: obj,
	        path: path,
	        name: obj.name || null
	      });
	    }
	    return this;
	  };
	
	  //判断点是否在该对象上
	
	  Draw.prototype.isPointInPath = function isPointInPath(x, y) {
	    var context = this.context;
	    var base = this.base;
	    var draws = this.draws;
	    var item = null;
	
	    context.save();
	    context.beginPath();
	
	    for (var i = 0; i < draws.length; i++) {
	      item = draws[i];
	      base[item.type].apply(base, item.path);
	    }
	
	    context.closePath();
	    context.restore();
	    return context.isPointInPath(x, y);
	  };
	
	  //判断点是否在该对象上的一部分上
	
	  Draw.prototype.isPointInPathByName = function isPointInPathByName(name, x, y) {
	    var context = this.context;
	    var base = this.base;
	    var draws = this.draws;
	    var item = null;
	
	    context.save();
	    context.beginPath();
	
	    for (var i = 0; i < draws.length; i++) {
	      item = draws[i];
	      if (item.name === name) {
	        base[item.type].apply(base, item.path);
	      }
	    }
	
	    context.closePath();
	    context.restore();
	    return context.isPointInPath(x, y);
	  };
	
	  /**
	   *  画圆
	   *  @param position {object}
	   *      - left: {number}  向左移动
	   *      - right: {number}  向右移动
	   *      - top: {number}  向上移动
	   *      - bottom: {number}  向下移动
	   */
	
	  Draw.prototype.move = function move(position) {
	    if (!isObject(position)) {
	      throw 'move param is error';
	    }
	    var draws = this.draws;
	    var item = null;
	    var point = null;
	
	    var left = position.left || 0;
	    var right = position.right || 0;
	    var top = position.top || 0;
	    var bottom = position.bottom || 0;
	    var x = right - left;
	    var y = bottom - top;
	
	    if (!x && !y) {
	      return this;
	    }
	
	    for (var i = 0; i < draws.length; i++) {
	      item = draws[i].obj;
	      point = item.point;
	      if (isArray(point)) {
	        for (var j = 0; j < point.length; i++) {
	          point[j].x += x;
	          point[j].y += y;
	        }
	      } else {
	        point.x += x;
	        point.y += y;
	      }
	
	      if (item.controlPoints && isArray(item.controlPoints)) {
	        var controlPoints = item.controlPoints;
	        for (var j = 0; j < controlPoints.length; i++) {
	          controlPoints[j].x += x;
	          controlPoints[j].y += y;
	        }
	      }
	    }
	
	    return this;
	  };
	
	  Draw.prototype.setDraw = function setDraw(name, obj) {
	    var draws = this.draws;
	    var item = null;
	
	    for (var i = 0; i < draws.length; i++) {
	      item = draws[i];
	      if (item.name === name) {
	        for (var key in obj) {
	          if (hasOwnProperty.call(obj, key)) {
	            item.obj[key] = obj[key];
	          }
	        }
	      }
	    }
	
	    return this;
	  };
	
	  //重绘
	
	  Draw.prototype.resetDraw = function resetDraw() {
	    var draws = this.draws;
	    for (var i = 0; i < draws.length; i++) {
	      this[draws[i].type](draws[i].obj, draws[i].id);
	    }
	
	    return this;
	  };
	
	  /**
	   *  画矩形
	   *  @param obj {object}
	   *      - point: {x: 0, y: 0} 必传
	   *      - width: {number} 必传
	   *      - height: {number} 必传
	   *      - type: 'stroke|fill'
	   *  @param uuid {string} 绘画id
	   */
	
	  Draw.prototype.rect = function rect(obj, uuid) {
	    if (!isObject(obj) || !isObject(obj.point) || !isNumber(obj.width) || !isNumber(obj.height)) {
	      throw 'rect param is error';
	    }
	    var base = this.base;
	    var context = this.context;
	    var x = obj.point.x;
	    var y = obj.point.y;
	    var w = obj.width;
	    var h = obj.height;
	    var paramArr = [x, y, w, h, obj.transform];
	
	    context.save();
	
	    //        this.clip('rect', paramArr);
	    context.globalCompositeOperation = obj.globalCompositeOperation || 'source-over';
	    //        context.globalCompositeOperation = 'source-atop';
	    context.beginPath();
	
	    base._setStyle(obj.style, obj.shadow);
	
	    base.rect(x, y, w, h, obj.transform);
	
	    base._draw(obj);
	
	    context.restore();
	    this.set('rect', obj, paramArr, uuid);
	    return this;
	  };
	
	  /**
	   *  画圆
	   *  @param obj {object}
	   *      - point: {x: 0, y: 0} 必传
	   *      - radius: {number} 必传
	   *      - width: {number}
	   *      - radian: {start: 0, end: Math.PI},
	   *      - type: 'stroke|fill',
	   *      - clockwise: {boolean} false顺时针，true逆时针
	   *  @param uuid {string} 绘画id
	   */
	
	  Draw.prototype.arc = function arc(obj, uuid) {
	    if (!isObject(obj) || !isObject(obj.point) || !isNumber(obj.radius)) {
	      throw 'arc param is error';
	    }
	    var base = this.base;
	    var context = this.context;
	    var x = obj.point.x;
	    var y = obj.point.y;
	    var r = obj.radius;
	    var startPI = obj.radian && obj.radian.start ? obj.radian.start : 0;
	    var endPI = obj.radian && obj.radian.end ? obj.radian.end : Math.PI * 2;
	
	    context.save();
	    context.beginPath();
	
	    base._setStyle(obj.style, obj.shadow);
	
	    base.arc(x, y, r, startPI, endPI, !!obj.clockwise, obj.transform);
	
	    base._draw(obj);
	
	    context.restore();
	    this.set('arc', obj, [x, y, r, startPI, endPI, !!obj.clockwise, obj.transform], uuid);
	    return this;
	  };
	
	  /**
	   *  画圆角矩形
	   *  @param obj {object}
	   *      - point: {x: 0, y: 0} 必传
	   *      - width: {number} 必传
	   *      - height: {number} 必传
	   *      - radius: [0,0,0,0] | 0,
	   *      - type: 'stroke|fill'
	   *  @param uuid {string} 绘画id
	   */
	
	  Draw.prototype.roundRect = function roundRect(obj, uuid) {
	    if (!isObject(obj) || !isObject(obj.point) || !isNumber(obj.width) || !isNumber(obj.height)) {
	      throw 'roundRect param is error';
	    }
	    var base = this.base;
	    var context = this.context;
	    var x = obj.point.x;
	    var y = obj.point.y;
	    var w = obj.width;
	    var h = obj.height;
	    var w2 = w / 2;
	    var h2 = h / 2;
	    var r = isNumber(obj.radius) ? [obj.radius, obj.radius, obj.radius, obj.radius] : isArray(obj.radius) ? obj.radius : [0, 0, 0, 0];
	
	    for (var i = 0; i < 4; i++) {
	      r[i] = Math.min(w2, h2, r[i]);
	    }
	
	    context.save();
	    context.beginPath();
	
	    base._setStyle(obj.style, obj.shadow);
	
	    base.roundRect(x, y, w, h, r, obj.transform);
	
	    base._draw(obj);
	
	    context.restore();
	    this.set('roundRect', obj, [x, y, w, h, r, obj.transform], uuid);
	    return this;
	  };
	
	  /**
	   *  画线框
	   *  @param obj {object}
	   *      - point: [    必传
	   *          {x:0,y:0}
	   *      ]
	   *      - type: 'stroke|fill',
	   *      - closePath: {boolean} 是否闭合路径
	   *  @param uuid {string} 绘画id
	   */
	
	  Draw.prototype.lineFrame = function lineFrame(obj, uuid) {
	    if (!isArray(obj.point) || !obj.point.length) {
	      throw 'lineFrame param is error';
	    }
	    var base = this.base;
	    var context = this.context;
	    var point = obj.point;
	
	    context.save();
	    context.beginPath();
	
	    base._setStyle(obj.style, obj.shadow);
	
	    base.lineFrame(point, obj.transform);
	
	    base._draw(obj);
	
	    context.restore();
	    this.set('lineFrame', obj, [point, obj.transform], uuid);
	    return this;
	  };
	
	  /**
	   *  画多边形
	   *  @param obj {object}
	   *      - point: {x: 0, y: 0} 必传
	   *      - radius: {number} 必传
	   *      - sides: {number}
	   *      - startAngle: 0 | Math.PI
	   *      - type: 'stroke|fill'
	   *  @param uuid {string} 绘画id
	   */
	
	  Draw.prototype.polygon = function polygon(obj, uuid) {
	    if (!isObject(obj) || !isObject(obj.point) || !isNumber(obj.radius)) {
	      throw 'polygon param is error';
	    }
	    var base = this.base;
	    var context = this.context;
	    var centerX = obj.point.x;
	    var centerY = obj.point.y;
	    var radius = obj.radius;
	    var points = [];
	    var sides = isNumber(obj.sides) && obj.sides > 2 ? obj.sides : 3;
	    var angle = obj.startAngle || 0;
	    var itemAngle = 2 * Math.PI / sides;
	
	    for (var i = 0; i < sides; i++) {
	      points.push({
	        x: centerX + radius * Math.sin(angle),
	        y: centerY - radius * Math.cos(angle)
	      });
	      angle += itemAngle;
	    }
	    obj.closePath = true;
	
	    context.save();
	    context.beginPath();
	
	    base._setStyle(obj.style, obj.shadow);
	
	    base.polygon(points, obj.transform);
	
	    base._draw(obj);
	
	    context.restore();
	    this.set('polygon', obj, [points, obj.transform], uuid);
	    return this;
	  };
	
	  /**
	   *  画线段
	   *  @param obj {object}
	   *      - point: [
	   *          {x:0,y:0},
	   *          {x:0,y:0}
	   *      ]
	   *
	   *  @param uuid {string} 绘画id
	   */
	
	  Draw.prototype.line = function line(obj, uuid) {
	    if (!isArray(obj.point) || obj.point.length < 2) {
	      throw 'line param is error';
	    }
	    var base = this.base;
	    var context = this.context;
	    var point = [{ x: obj.point[0].x, y: obj.point[0].y }, { x: obj.point[1].x, y: obj.point[1].y }];
	
	    context.save();
	    context.beginPath();
	
	    base._setStyle(obj.style, obj.shadow);
	
	    base.line(point, obj.transform);
	
	    base._draw(obj);
	
	    context.restore();
	    this.set('line', obj, [point, obj.transform], uuid);
	    return this;
	  };
	
	  /**
	   *  画虚线
	   *  @param obj {object}
	   *      - point: [
	   *          {x:0,y:0},
	   *          {x:0,y:0}
	   *      ]
	   *      - gap: {number}
	   *  @param uuid {string} 绘画id
	   */
	
	  Draw.prototype.dashedLine = function dashedLine(obj, uuid) {
	    if (!isArray(obj.point) || obj.point.length < 2) {
	      throw 'dashedLine param is error';
	    }
	    var base = this.base;
	    var context = this.context;
	    var gap = isNumber(obj.gap) ? obj.gap : 10;
	
	    var startX = obj.point[0].x;
	    var startY = obj.point[0].y;
	    var endX = obj.point[1].x;
	    var endY = obj.point[1].y;
	
	    var deltaX = endX - startX;
	    var deltaY = endY - startY;
	
	    var dasheNum = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / gap);
	    var itemX = deltaX / dasheNum;
	    var itemY = deltaY / dasheNum;
	
	    var points = [];
	
	    for (var i = 0; i < dasheNum; i++) {
	      points.push({
	        type: i % 2 === 0 ? 'moveTo' : 'lineTo',
	        x: startX + itemX * i,
	        y: startY + itemY * i
	      });
	    }
	    points.push({
	      type: 'lineTo',
	      x: endX,
	      y: endY
	    });
	
	    context.save();
	    context.beginPath();
	
	    base._setStyle(obj.style, obj.shadow);
	
	    base.dashedLine(points, obj.transform);
	
	    context.stroke();
	    context.restore();
	    this.set('dashedLine', obj, [points, obj.transform], uuid);
	    return this;
	  };
	
	  /**
	   *  画贝塞尔曲线
	   *  @param obj {object}
	   *      - point: [
	   *          {x:0,y:0},
	   *          {x:0,y:0}
	   *      ]
	   *      - controlPoints: {array}, 必传
	   *         [
	   *           {x:0,y:0}
	   *         ]
	   *  @param uuid {string} 绘画id
	   */
	
	  Draw.prototype.bezier = function bezier(obj, uuid) {
	    if (!isArray(obj.point) || obj.point.length < 2 || !isArray(obj.controlPoints) || !obj.controlPoints.length) {
	      throw 'bezier param is error';
	    }
	    var base = this.base;
	    var context = this.context;
	
	    context.save();
	    context.beginPath();
	
	    base._setStyle(obj.style, obj.shadow);
	
	    base.bezier(obj.point[0].x, obj.point[0].y, obj.point[1].x, obj.point[1].y, obj.controlPoints, obj.transform);
	
	    base._draw(obj);
	
	    context.restore();
	    this.set('bezier', obj, [obj.point[0].x, obj.point[0].y, obj.point[1].x, obj.point[1].y, obj.controlPoints, obj.transform], uuid);
	    return this;
	  };
	
	  /**
	   *  画图片
	   *  @param obj {object}
	   *      - image: {node},
	   *      - point: {x:0,y:0},
	   *      - width: {number},
	   *      - height: {number},
	   *  @param uuid {string} 绘画id
	   */
	
	  Draw.prototype.image = function image(obj, uuid) {
	    if (!isObject(obj) || !obj.image || !isObject(obj.point)) {
	      throw 'image param is error';
	    }
	    var _this = this;
	    var base = this.base;
	    var context = this.context;
	    var x = obj.point.x;
	    var y = obj.point.y;
	    var w = obj.width;
	    var h = obj.height;
	    var paramArr = [x, y, w, h, obj.transform];
	
	    var image = null;
	    if (isString(obj.image)) {
	      image = new Image();
	      image.src = obj.image;
	      image.onload = function () {
	        drawImage(image);
	      };
	    } else if (isNode(obj.image)) {
	      image = obj.image;
	      drawImage(image);
	    } else {
	      throw 'image param is error';
	    }
	
	    function drawImage(image) {
	      context.save();
	
	      context.beginPath();
	
	      base._setStyle(obj.style, obj.shadow);
	      base._transform(obj.transform);
	
	      if (w && h) {
	        context.drawImage(image, x, y, w, h);
	      } else {
	        context.drawImage(image, x, y);
	      }
	
	      context.restore();
	      _this.set('image', obj, paramArr, uuid);
	    }
	
	    return this;
	  };
	
	  /**
	   *  裁减
	   *  @param type {string}
	   *  @param path {array}
	   */
	
	  Draw.prototype.clip = function clip(type, path) {
	    var context = this.context;
	    var base = this.base;
	
	    if (isFunction(base[type])) {
	      //            context.save();
	      context.beginPath();
	      base[type].apply(base, path);
	
	      context.closePath();
	      context.clip();
	
	      //            context.restore();
	    }
	  };
	
	  Draw.prototype.on = function on(type, cb) {
	    this.event = this.event ? this.event : {};
	
	    if (this.event[type] && isArray(this.event[type])) {
	      this.event[type].push(cb);
	    } else {
	      this.event[type] = [cb];
	    }
	
	    return this;
	  };
	
	  return Draw;
	})();

	exports.Draw = Draw;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function isType(type) {
	  return function (value) {
	    return Object.prototype.toString.call(value) === '[object ' + type + ']';
	  };
	}
	
	function merge(defaults) {
	  var _obj = {};
	  for (var key in defaults) {
	    if (module.exports.isObject(defaults[key])) {
	      _obj[key] = merge(defaults[key]);
	    } else {
	      _obj[key] = defaults[key];
	    }
	  }
	  return _obj;
	}
	var Util = {
	  isObject: isType('Object'),
	  isNumber: isType('Number'),
	  isString: isType('String'),
	  isArray: Array.isArray ? Array.isArray : isType('Array'),
	  isFunction: isType('Function'),
	
	  isNode: function isNode(node) {
	    return node.nodeType;
	  },
	
	  merge: merge
	};
	exports.Util = Util;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _utilJs = __webpack_require__(4);
	
	var isObject = _utilJs.Util.isObject;
	var isArray = _utilJs.Util.isArray;
	
	var Base = (function () {
	  function Base(context) {
	    _classCallCheck(this, Base);
	
	    this.context = context;
	  }
	
	  Base.prototype._transform = function _transform(transform) {
	    var context = this.context;
	
	    if (!transform) {
	      return;
	    }
	
	    if (transform.rotate) {
	      context.rotate(transform.rotate);
	    }
	
	    if (transform.scale) {
	      context.scale(transform.scale.x, transform.scale.y);
	    }
	
	    if (transform.translate) {
	      context.translate(transform.translate.x, transform.translate.y);
	    }
	
	    if (isArray(transform.transform)) {
	      context.transform.apply(context, transform.transform);
	    }
	
	    if (isArray(transform.setTransform)) {
	      context.setTransform.apply(context, transform.setTransform);
	    }
	  };
	
	  /**
	   *  画矩形
	   */
	
	  Base.prototype.rect = function rect(x, y, w, h, transform) {
	    this._transform(transform);
	    this.context.rect(x, y, w, h);
	  };
	
	  /**
	   *  画圆
	   */
	
	  Base.prototype.arc = function arc(x, y, r, startPI, endPI, clockwise, transform) {
	    this._transform(transform);
	    this.context.arc(x, y, r, startPI, endPI, clockwise);
	  };
	
	  /**
	   *  画圆角矩形
	   */
	
	  Base.prototype.roundRect = function roundRect(x, y, w, h, r, transform) {
	    var context = this.context;
	
	    this._transform(transform);
	    context.moveTo(x, y + r[0]);
	    context.arcTo(x, y, x + r[0], y, r[0]);
	    context.arcTo(x + w, y, x + w, y + r[1], r[1]);
	    context.arcTo(x + w, y + h, x + w - r[2], y + h, r[2]);
	    context.arcTo(x, y + h, x, y + h - r[3], r[3]);
	    context.lineTo(x, y + r[0]);
	  };
	
	  /**
	   *  画线框
	   */
	
	  Base.prototype.lineFrame = function lineFrame(points, transform) {
	    var context = this.context;
	
	    this._transform(transform);
	    context.moveTo(points[0].x, points[0].y);
	    for (var i = 1; i < points.length; i++) {
	      context.lineTo(points[i].x, points[i].y);
	    }
	  };
	
	  /**
	   *  画多边形
	   */
	
	  Base.prototype.polygon = function polygon(points, transform) {
	    this.lineFrame(points, transform);
	  };
	
	  /**
	   *  画线段
	   */
	
	  Base.prototype.line = function line(points, transform) {
	    this.lineFrame(points, transform);
	  };
	
	  /**
	   *  画虚线
	   */
	
	  Base.prototype.dashedLine = function dashedLine(points, transform) {
	    var context = this.context;
	
	    this._transform(transform);
	    for (var i = 0; i < points.length; i++) {
	      context[points[i].type](points[i].x, points[i].y);
	    }
	  };
	
	  /**
	   *  画贝塞尔曲线
	   */
	
	  Base.prototype.bezier = function bezier(startX, startY, endX, endY, controlPoints, transform) {
	    var context = this.context;
	
	    this._transform(transform);
	    context.moveTo(startX, startY);
	    if (controlPoints.length === 1) {
	      context.quadraticCurveTo(controlPoints[0].x, controlPoints[0].y, endX, endY);
	    } else {
	      context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, endX, endY);
	    }
	  };
	
	  /**
	   *  画图像
	   */
	
	  Base.prototype.image = function image(x, y, w, h, transform) {
	    this.rect(x, y, w, h, transform);
	  };
	
	  /**
	   *  画阴影
	   *  @param shadow {object}
	   *      - color: {string}
	   *      - offsetX: {number}
	   *      - offsetY: {number}
	   *      - blur: {number}
	   */
	
	  Base.prototype._shadow = function _shadow(shadow) {
	    if (isObject(shadow)) {
	      var context = this.context;
	      context.shadowColor = shadow.color;
	      context.shadowOffsetX = shadow.offsetX || 0;
	      context.shadowOffsetY = shadow.offsetY || 0;
	      context.shadowBlur = shadow.blur || 0;
	    }
	  };
	
	  /**
	   *  设置样式
	   *  @param style {object}
	   *      - color: '', '#00000',
	   *      - lineWidth: {number}
	   *      - gradient: {}
	   *  @param shadow {object}
	   */
	
	  Base.prototype._setStyle = function _setStyle(style, shadow) {
	    var context = this.context;
	    style = isObject(style) ? style : {};
	
	    context.lineWidth = style.lineWidth || 0.5;
	    context.strokeStyle = style.color ? style.color : '';
	    context.fillStyle = style.color ? style.color : '';
	
	    this._shadow(shadow);
	  };
	
	  Base.prototype._draw = function _draw(obj) {
	    var context = this.context;
	    if (obj.type === 'fill') {
	      context.closePath();
	      context.fill();
	    } else if (obj.type === 'all') {
	      context.closePath();
	      context.fill();
	      context.stroke();
	    } else {
	      if (obj.closePath) context.closePath();
	      context.stroke();
	    }
	  };
	
	  return Base;
	})();

	exports.Base = Base;

/***/ }
/******/ ]);
//# sourceMappingURL=game-canvas-es6.js.map