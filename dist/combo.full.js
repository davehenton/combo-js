"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Combo.js
 *
 * Copyright 2017-present, Eric Harms.
 *
 * The MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Combo;

(function (Combo) {

	"use strict";

	// **mount**
	//
	// Mount a component to a container element.
	//

	Combo.mount = function (el, component, data) {

		// **remove**
		//
		// Remove the children of the container element.
		//
		function remove() {
			if (typeof component.el.firstChild !== "undefined") {
				while (component.el.firstChild) {
					component.el.removeChild(component.el.firstChild);
				}
			}
		}

		// **render**
		//
		// Render the component in the container element.
		//
		function render() {
			component.el.insertAdjacentHTML("beforeEnd", component.render(data));
			//	
			// Invoke the component's mounted lifecycle hook.
			//
			if (typeof component.mounted === "function") {
				component.mounted();
			}
		}

		component.el = document.getElementById(el);

		//
		// Ensure the component has a render method.
		//
		remove();
		render();
	};

	// ## Component
	//
	// Represents a component, view, or fragment.
	//
	Combo.Component = function () {
		// **constructor**
		//
		// The constructor function.
		//
		function _class() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, _class);

			//
			// Extend the properties from options.
			//
			Object.assign(this, options);

			//
			// Invoke the created lifecycle hook.
			//
			if (typeof this.created === "function") {
				this.created();
			}
		}

		// **extend**
		//
		// Return an instance of the component class.
		//


		_createClass(_class, [{
			key: "update",


			// **extend**
			//
			// Update the data and redraw the component.
			//
			value: function update() {
				var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				this.data = Object.assign({}, this.data, values);

				//
				// Invoke the updated lifecycle hook.
				//
				if (typeof this.updated === "function") {
					this.updated();
				}

				//
				// Redraw the component if it's mounted.
				//
				if (this.isMounted()) {
					Combo.render(this.el, this);
				}
			}

			// **isMounted**
			//
			// Returns a boolean value determining if the component was mounted.
			//

		}, {
			key: "isMounted",
			value: function isMounted() {
				return !!this.el;
			}
		}], [{
			key: "extend",
			value: function extend() {
				var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				return new this(options);
			}
		}]);

		return _class;
	}();
})(Combo || (Combo = {}));
