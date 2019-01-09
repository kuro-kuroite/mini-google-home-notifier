"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleHome = void 0;

require("@babel/polyfill");

var _bluebird = _interopRequireDefault(require("bluebird"));

var _castv2Client = require("castv2-client");

var _mdns = require("../../atoms/mdns");

var _googleTtsApi = _interopRequireDefault(require("google-tts-api"));

var _isIp = _interopRequireDefault(require("is-ip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GoogleHome =
/*#__PURE__*/
function () {
  function GoogleHome(deviceIdentifier) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, GoogleHome);

    this.device = {};

    if ((0, _isIp.default)(deviceIdentifier)) {
      this.device.ip = deviceIdentifier;
    } else {
      this.device.name = deviceIdentifier.replace(' ', '-');
    }

    this.device.identifier = deviceIdentifier;
    this.options = _objectSpread({
      accent: 'en',
      language: 'en',
      timeout: 5000
    }, options);
  }

  _createClass(GoogleHome, [{
    key: "searchDevice",
    value: function searchDevice() {
      var _this = this;

      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.device.name;
      name = name.replace(' ', '-');
      return new _bluebird.default(function (resolve, reject) {
        var browser = (0, _mdns.createMdnsBrowser)();
        browser.start();
        browser.on('serviceUp', function (service) {
          browser.stop(); // Only use the first IP addresses in the array

          var address = service.addresses[0];
          console.log("Device ".concat(service.name, " at ").concat(address, ":").concat(service.port, " found"));

          if (service.name.includes(name)) {
            resolve(address);
          } else {
            reject("can't search ".concat(name, " of device in same network"));
          }
        });
        browser.on('error', function (err) {
          browser.stop();
          reject(err);
        });
        setTimeout(function () {
          browser.stop();
          reject(".searchDevice(): search timeout");
        }, _this.options.timeout);
      });
    }
  }, {
    key: "speak",
    value: function () {
      var _speak = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(message, language) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (message) {
                  _context.next = 3;
                  break;
                }

                console.error(".speak(); The text to speak can't be empty");
                return _context.abrupt("return", false);

              case 3:
                return _context.abrupt("return", new _bluebird.default(function (resolve, reject) {
                  (0, _googleTtsApi.default)(message, language ? language : _this2.options.language, 1, 3000, _this2.options.accent).then(function (url) {
                    _this2.push(url).then(resolve).catch(reject);
                  }).catch(reject);
                }).catch(function (reject) {
                  console.log(reject);
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function speak(_x, _x2) {
        return _speak.apply(this, arguments);
      }

      return speak;
    }()
  }, {
    key: "push",
    value: function push(url) {
      var _this3 = this;

      return new _bluebird.default(
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var client;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(_this3.device.ip === undefined || !(0, _isIp.default)(_this3.device.ip))) {
                    _context2.next = 10;
                    break;
                  }

                  _context2.prev = 1;
                  _context2.next = 4;
                  return _this3.searchDevice();

                case 4:
                  _this3.device.ip = _context2.sent;
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2["catch"](1);
                  return _context2.abrupt("return", reject(_context2.t0));

                case 10:
                  client = new _castv2Client.Client();
                  client.connect(_this3.device.ip, function () {
                    client.launch(_castv2Client.DefaultMediaReceiver, function (err, player) {
                      var media = {
                        contentId: url,
                        contentType: 'audio/mp3',
                        streamType: 'BUFFERED'
                      };
                      player.load(media, {
                        autoplay: true
                      }, function (err, status) {
                        client.close();
                        console.log("Pushed to device at ".concat(_this3.device.ip));
                      });
                    });
                  });
                  client.on('error', function (err) {
                    reject("Google Cast Client error:\n".concat(err));
                  });

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[1, 7]]);
        }));

        return function (_x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);

  return GoogleHome;
}();

exports.GoogleHome = GoogleHome;