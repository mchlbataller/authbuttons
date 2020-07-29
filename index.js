"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthButtons = void 0;

var _firebase = require("providers/firebase");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _facebook_ = _interopRequireDefault(require("assets/images/facebook_58.png"));

var _google = _interopRequireDefault(require("assets/images/google.png"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Ripple = require("components/buttons/AuthButtons/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\t", "\n\n\t&:focus {\n\t\toutline: none;\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SignInWithGoogle = _styledComponents["default"].button(_templateObject(), function (props) {
  return props.touched && "\n\t\tbackground-color: rgba(169, 169, 169, 0.3);\n\t\tbox-shadow: 0 10px 15px 10px rgba(29, 29, 29, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)\n\t\ttransform: translateY(1px);\n\t\ttransition: 2s;\n\t";
});

var AuthButton = function AuthButton(props) {
  var ripple = _react["default"].useRef();

  (0, _Ripple.useRipple)(ripple, 400);
  return /*#__PURE__*/_react["default"].createElement(SignInWithGoogle, {
    ref: ripple,
    onClick: function onClick(e) {
      return props.onClick // Check if onClick is present
      ? (props.onClick("Clicked."), props.setLoadingState(true)) : null;
    },
    onTouchStart: function onTouchStart(e) {
      return props.onTouchStart // Check if onTouchStart is present
      ? (props.onTouchStart(true), e.stopPropagation()) : null;
    },
    onTouchMove: function onTouchMove(e) {
      return props.onTouchMove ? (e.stopPropagation(), props.onTouchMove(false)) : null;
    },
    onTouchEnd: function onTouchEnd(e) {
      return props.onTouchEnd ? function () {
        return props.onTouchEnd(false);
      } : null;
    } // Append the className with the user-defined background-color and text-color.
    ,
    className: (0, _classnames["default"])("w-64 border rounded-lg p-1 flex bg-white items-center mb-2 text-sm select-none transition-all", props.backgroundColor, props.textColor),
    touched: props.touched
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: props.image,
    alt: "Logo",
    className: "w-8 mr-8 ml-1 pointer-events-none"
  }), props.label);
};

var AuthButtons = function AuthButtons(props) {
  // This state handles the trigger to put CSS styles for hovers
  // See the styled-component above.
  var _React$useState = _react["default"].useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      touched = _React$useState2[0],
      setTouchState = _React$useState2[1];

  var handleTouch = function handleTouch(value) {
    return setTouchState(value);
  };

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(AuthButton, {
    image: _google["default"],
    label: props.googleLabel,
    backgroundColor: "bg-white",
    textColor: "text-gray-700",
    touched: touched,
    onTouchStart: handleTouch,
    onTouchEnd: handleTouch,
    onTouchMove: handleTouch,
    onClick: function onClick(value) {
      return (0, _firebase.googleAuth)();
    },
    setLoadingState: props.setLoadingState
  }), /*#__PURE__*/_react["default"].createElement(AuthButton, {
    image: _facebook_["default"],
    label: props.facebookLabel,
    backgroundColor: "bg-blue-600",
    textColor: "text-white",
    onClick: function onClick(value) {
      return (0, _firebase.facebookAuth)();
    },
    setLoadingState: props.setLoadingState
  }));
};

exports.AuthButtons = AuthButtons;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRipple = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var react = _react["default"];

var _document$querySelect;

var RIPPLE_SIZE = 100;
var style = document.createElement("style");
style.type = "text/css";
var keyframes = "\n  @keyframes use-ripple-animation {\n    from {\n      opacity: 1;\n      transform: scale(0);\n    }\n    to {\n      opacity: 0;\n      transform: scale(10);\n    }\n  }\n  ";
style.innerHTML = keyframes;
(_document$querySelect = document.querySelector("head")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.appendChild(style);

var createRipple = function createRipple(element, animationLength) {
  return function (e) {
    var _element$getBoundingC = element.getBoundingClientRect(),
        height = _element$getBoundingC.height,
        width = _element$getBoundingC.width,
        top = _element$getBoundingC.top,
        left = _element$getBoundingC.left;

    var x = e.clientX - left;
    var y = e.clientY - top;
    var rippleSize = Math.min(height, width, RIPPLE_SIZE);
    var positionTop = e.clientX ? y - rippleSize / 2 : rippleSize / 2 - height / 2;
    var positionLeft = e.clientY ? x - rippleSize / 2 : width / 2 - rippleSize / 2;
    var span = document.createElement("span");
    span.style.cssText = "\n    top: " + positionTop + "px;\n    left: " + positionLeft + "px;\n    position: absolute;\n    border-radius: 50%;\n    background-color: rgba(0, 0, 0, 0.3);\n    pointer-events: none;\n    width: " + rippleSize + "px;\n    height: " + rippleSize + "px;\n\n    animation: use-ripple-animation " + animationLength + "ms ease-in;\n  ";
    element.appendChild(span);
    span.addEventListener("animationend", function () {
      element.removeChild(span);
    });
  };
};

var useRipple = function useRipple(ref) {
  var animationLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 700;
  react.useEffect(function () {
    if (!ref.current) {
      return;
    }

    var element = ref.current;
    var elementPosition = getComputedStyle(element).getPropertyValue("position");
    element.style.position = elementPosition === "static" || !elementPosition ? "relative" : elementPosition;
    element.style.overflow = "hidden";
    var ripple = createRipple(element, animationLength);
    element.addEventListener("touchend", ripple);
    return function () {
      return element.removeEventListener("touchend", ripple);
    };
  });
};

exports.useRipple = useRipple;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AuthButtons", {
  enumerable: true,
  get: function get() {
    return _AuthButton.AuthButtons;
  }
});

var _AuthButton = require("./AuthButton");
