// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"bezier.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BezierMaker =
/*#__PURE__*/
function () {
  function BezierMaker(ctx, bezierCtrlNodesArr, num) {
    _classCallCheck(this, BezierMaker);

    this.ctx = ctx;
    console.log(bezierCtrlNodesArr);
    this.bezierCtrlNodesArr = bezierCtrlNodesArr ? bezierCtrlNodesArr : [];
    this.bezierArr = [];
    this.initBezier(num);
  }

  _createClass(BezierMaker, [{
    key: "bezier",
    value: function bezier(t) {
      var _this = this;

      //贝塞尔公式调用
      var x = 0,
          y = 0,
          bezierCtrlNodesArr = this.bezierCtrlNodesArr,
          n = bezierCtrlNodesArr.length - 1;
      bezierCtrlNodesArr.forEach(function (item, index) {
        if (!index) {
          x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index);
          y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index);
        } else {
          x += _this.factorial(n) / _this.factorial(index) / _this.factorial(n - index) * item.x * Math.pow(1 - t, n - index) * Math.pow(t, index);
          y += _this.factorial(n) / _this.factorial(index) / _this.factorial(n - index) * item.y * Math.pow(1 - t, n - index) * Math.pow(t, index);
        }
      });
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "initBezier",
    value: function initBezier(num) {
      //通过控制点算出实时xy值渲染到canvas
      var nodeArr = this.bezierCtrlNodesArr;

      if (nodeArr.length === 2) {
        console.warn("Control nodes should be more then two!");
        var startNode = nodeArr[0],
            endNode = nodeArr[1];
        this.ctx.moveTo(startNode.x, startNode.y);
        this.ctx.lineTo(endNode.x, endNode.y);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      } else {
        for (var i = 0; i < 1; i += 1 / num) {
          this.bezierArr.push(this.bezier(i));
        }
      }
    }
  }, {
    key: "factorial",
    value: function factorial(num) {
      //递归阶乘
      if (num <= 1) {
        return 1;
      } else {
        return num * this.factorial(num - 1);
      }
    }
  }, {
    key: "showCtrlNodes",
    value: function showCtrlNodes(ctx) {
      var _this2 = this;

      this.ctx = this.ctx || ctx;
      this.bezierCtrlNodesArr.forEach(function (n) {
        _this2.ctx.beginPath();

        _this2.ctx.arc(n.x, n.y, 2, 0, 2 * Math.PI);

        _this2.ctx.closePath();

        _this2.ctx.save();

        _this2.ctx.fillStyle = _this2.color;

        _this2.ctx.fill();

        _this2.ctx.restore();
      });
    }
  }, {
    key: "showBezierArr",
    value: function showBezierArr() {
      var _this3 = this;

      this.bezierArr.forEach(function (b) {
        _this3.ctx.beginPath();

        _this3.ctx.arc(b.x, b.y, 2, 0, 2 * Math.PI);

        _this3.ctx.closePath();

        _this3.ctx.fill();
      });
    }
  }, {
    key: "animateBezier",
    value: function animateBezier() {
      var _this4 = this;

      this.bezierArr.forEach(function (b, index) {
        setTimeout(function () {
          _this4.ctx.beginPath();

          _this4.ctx.arc(b.x, b.y, 2, 0, 2 * Math.PI);

          _this4.ctx.closePath();

          _this4.ctx.fill();
        }, 20 * index);
      });
    }
  }]);

  return BezierMaker;
}();

exports.default = BezierMaker;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _bezier = _interopRequireDefault(require("./bezier.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// console.log(bezier)
// ctx.fillRect(0, 0, 100, 100);
// ctx.drawImage(heart, 200, 200, 20, 20);
function rnd() {
  var flag = Math.random() > 0.5 ? 1 : -1;
  return 80 * Math.random() * flag;
}

var FlyHeart =
/*#__PURE__*/
function () {
  function FlyHeart(ctx, img) {
    _classCallCheck(this, FlyHeart);

    this.ctx = ctx;
    this.img = heart;
    this.bezierArr = new _bezier.default(ctx, [{
      x: 187,
      y: 245
    }, {
      x: 170 + rnd(),
      y: 200
    }, {
      x: 200 + rnd(),
      y: 120
    }, {
      x: 140 + rnd(),
      y: 60
    }], 90).bezierArr;
  }

  _createClass(FlyHeart, [{
    key: "draw",
    value: function draw() {
      var position = this.bezierArr.shift();
      this.clear();

      if (position) {
        this.ctx.save();
        this.ctx.globalAlpha = this.bezierArr.length / 30;
        this.ctx.drawImage(this.img, position.x, position.y, 20, 20);
        this.ctx.restore();
        this.prevPosition = position;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.prevPosition) {
        this.ctx.clearRect(this.prevPosition.x, this.prevPosition.y, 20, 20);
      }
    }
  }]);

  return FlyHeart;
}();

function main() {
  var heartArr = [];
  var cvs = document.getElementById('cvs');
  var ctx = cvs.getContext('2d');
  var heart = document.getElementById('heart');
  var boy = document.getElementById('boy');
  var girl = document.getElementById('girl'); // ctx.drawImage(boy, 120, 250, 200, 200 * 384 / 928);
  // ctx.drawImage(girl, 120, 250, 200, 200 * 384 / 928);

  function draw() {
    if (heartArr.length) {
      for (var _i = 0; _i < heartArr.length; _i++) {
        var _heart = heartArr[_i];

        _heart.draw();

        if (_heart.bezierArr.length === 0) {
          _heart.clear();

          var index = heartArr.indexOf(_heart);
          heartArr.splice(index, 1);
        }
      }
    }

    requestAnimationFrame(draw);
  }

  [boy, girl].forEach(function (el) {
    el.addEventListener('animationend', function () {
      el.classList.remove('kiss');
    });
  });
  document.body.addEventListener('click', function () {
    heartArr.push(new FlyHeart(ctx, heart));
    boy.classList.add('kiss');
    girl.classList.add('kiss');
  });
  draw();
}

main();
},{"./bezier.js":"bezier.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49660" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/bezier.e31bb0bc.map