"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mdns = _interopRequireWildcard(require("mdns-js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var createMdnsBrowser = function createMdnsBrowser() {
  var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'googlecast';
  return mdns.createBrowser(mdns.tcp(protocol));
};

var _default = createMdnsBrowser;
exports.default = _default;