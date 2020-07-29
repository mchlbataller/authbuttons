import React from "react";
const react = React;

var _document$querySelect;
var RIPPLE_SIZE = 100;
var style = document.createElement("style");
style.type = "text/css";
var keyframes =
	"\n  @keyframes use-ripple-animation {\n    from {\n      opacity: 1;\n      transform: scale(0);\n    }\n    to {\n      opacity: 0;\n      transform: scale(10);\n    }\n  }\n  ";
style.innerHTML = keyframes;
(_document$querySelect = document.querySelector("head")) === null ||
_document$querySelect === void 0
	? void 0
	: _document$querySelect.appendChild(style);

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
		var positionTop = e.clientX
			? y - rippleSize / 2
			: rippleSize / 2 - height / 2;
		var positionLeft = e.clientY
			? x - rippleSize / 2
			: width / 2 - rippleSize / 2;
		var span = document.createElement("span");
		span.style.cssText =
			"\n    top: " +
			positionTop +
			"px;\n    left: " +
			positionLeft +
			"px;\n    position: absolute;\n    border-radius: 50%;\n    background-color: rgba(0, 0, 0, 0.3);\n    pointer-events: none;\n    width: " +
			rippleSize +
			"px;\n    height: " +
			rippleSize +
			"px;\n\n    animation: use-ripple-animation " +
			animationLength +
			"ms ease-in;\n  ";
		element.appendChild(span);
		span.addEventListener("animationend", function () {
			element.removeChild(span);
		});
	};
};

export var useRipple = function useRipple(ref, animationLength = 700) {
	react.useEffect(function () {
		if (!ref.current) {
			return;
		}

		var element = ref.current;
		var elementPosition = getComputedStyle(element).getPropertyValue(
			"position"
		);
		element.style.position =
			elementPosition === "static" || !elementPosition
				? "relative"
				: elementPosition;
		element.style.overflow = "hidden";
		var ripple = createRipple(element, animationLength);
		element.addEventListener("touchend", ripple);
		return function () {
			return element.removeEventListener("touchend", ripple);
		};
	});
};

//# sourceMappingURL=index.js.map
