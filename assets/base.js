/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/animations/header.js":
/*!******************************************!*\
  !*** ./src/scripts/animations/header.js ***!
  \******************************************/
/***/ (function() {

window.addEventListener("scroll", function () {
  var header = document.querySelector(".header-container");
  var logo = document.querySelector(".logo");
  var logotype = document.querySelector(".logotype");
  var isScrolled = window.scrollY > window.innerHeight - 100;
  header.classList.toggle("h-40", !isScrolled);
  header.classList.toggle("h-20", isScrolled);
  logotype.classList.toggle("opacity-0", !isScrolled);
  logotype.classList.toggle("pointer-events-none", !isScrolled);
  logotype.classList.toggle("delay-100", isScrolled);
  logo.classList.toggle("opacity-0", isScrolled);
  logo.classList.toggle("pointer-events-none", isScrolled);
  logo.classList.toggle("delay-300", !isScrolled);
});

/***/ }),

/***/ "./src/scripts/base.js":
/*!*****************************!*\
  !*** ./src/scripts/base.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpinejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpinejs */ "./node_modules/alpinejs/dist/module.esm.js");
/* harmony import */ var _alpinejs_collapse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @alpinejs/collapse */ "./node_modules/@alpinejs/collapse/dist/module.esm.js");
/* harmony import */ var _utils_product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/product */ "./src/scripts/utils/product.js");
/* harmony import */ var _utils_header_height__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/header-height */ "./src/scripts/utils/header-height.js");
/* harmony import */ var _utils_header_height__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_header_height__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_cart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/cart */ "./src/scripts/utils/cart.js");
/* harmony import */ var _animations_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./animations/header */ "./src/scripts/animations/header.js");
/* harmony import */ var _animations_header__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_animations_header__WEBPACK_IMPORTED_MODULE_5__);






alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].plugin(_alpinejs_collapse__WEBPACK_IMPORTED_MODULE_1__["default"]);
alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].data('product', _utils_product__WEBPACK_IMPORTED_MODULE_2__["default"]);
window.Alpine = alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"];
alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].start();

/***/ }),

/***/ "./src/scripts/utils/cart.js":
/*!***********************************!*\
  !*** ./src/scripts/utils/cart.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cartUpdateAll": function() { return /* binding */ cartUpdateAll; }
/* harmony export */ });
/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-cart */ "./node_modules/@shopify/theme-cart/theme-cart.js");

_shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.getState().then(function (state) {
  cartUpdateAll(state);
});

function cartToAlpine(state) {
  var products = [];
  console.log(state);

  if (state.items) {
    state.items.forEach(function (e) {
      var f = e.featured_image.url; // if (e.featured_image.url) {
      //   let filename = e.featured_image.url
      //     .replace(/\?.*$/, '')
      //     .replace(/.*\//, '')
      //   let newFilename = filename.replace(/\.[^/.]+$/, '_300x.jpg')
      //   f = e.featured_image.url.replace(filename, newFilename)
      // }

      var realPrice = e.price / 100;
      products.push({
        title: e.product_title,
        key: e.key,
        price: realPrice,
        id: e.variant_id,
        options: e.options_with_values,
        image: f,
        qty: e.quantity,
        remove: function remove() {
          cartRemoveItem(this.key);
        },
        update: function update(qty) {
          cartUpdateItem(this.key, parseInt(qty));
        }
      });
    });
  }

  return {
    total: state.items_subtotal_price / 100,
    products: products
  };
}

function cartRemoveItem(key) {
  _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.removeItem(key).then(function (state) {
    cartUpdateAll(state);
  });
}

function cartUpdateItem(key, qty) {
  _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.updateItem(key, {
    quantity: qty
  }).then(function (state) {
    cartUpdateAll(state);
  });
}

function cartUpdateAll(state) {
  window.dispatchEvent(new CustomEvent('updateproducts', {
    detail: {
      cart: cartToAlpine(state)
    }
  }));
  window.dispatchEvent(new CustomEvent('updatecartcount', {
    detail: {
      cartTotal: state.item_count
    }
  }));
}

/***/ }),

/***/ "./src/scripts/utils/header-height.js":
/*!********************************************!*\
  !*** ./src/scripts/utils/header-height.js ***!
  \********************************************/
/***/ (function() {

setHeaderHeight();

function setHeaderHeight() {
  var headerHeight = document.getElementById('header').offsetHeight;
  document.body.style.setProperty('--header-height', "".concat(headerHeight, "px"));
  var footerHeight = document.getElementById('footer').offsetHeight;
  document.body.style.setProperty('--footer-height', "".concat(footerHeight, "px"));
  var windowHeight = window.innerHeight;
  document.body.style.setProperty('--window-height', "".concat(windowHeight, "px"));
}

window.addEventListener('resize', setHeaderHeight);

/***/ }),

/***/ "./src/scripts/utils/product.js":
/*!**************************************!*\
  !*** ./src/scripts/utils/product.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-cart */ "./node_modules/@shopify/theme-cart/theme-cart.js");
/* harmony import */ var _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-currency */ "./node_modules/@shopify/theme-currency/currency.js");
/* harmony import */ var _utils_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/cart */ "./src/scripts/utils/cart.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = (function (product) {
  // console.log("product", product);
  var currentVariant = product.product.variants[0];
  var variants = product.product.variants;

  var price = function price(variantId, selectedAddOnProducts) {
    // console.log(selectedAddOnProducts);
    var variant = variants.filter(function (obj) {
      return obj.id === variantId;
    })[0];
    var addOnPrice = 0;

    if (selectedAddOnProducts.length > 0) {
      selectedAddOnProducts.forEach(function (e) {
        addOnPrice = addOnPrice + e.price;
      });
    }

    console.log(addOnPrice);
    return {
      actualPrice: "$" + (variant.price + addOnPrice) / 100,
      originalPrice: variant.compare_at_price ? "$" + (variant.compare_at_price + addOnPrice) / 100 : "",
      message: ""
    };
  };

  var currentOptions = function currentOptions(variantId) {
    var variant = variants.filter(function (obj) {
      return obj.id === variantId;
    })[0];
    var currentOptions = product.product.options.map(function (e, i) {
      return {
        name: e,
        value: variant.options[i]
      };
    });
    return currentOptions;
  };

  var handleAddOn = function handleAddOn(id, selectedAddOns, price) {
    var updatedAddOns = selectedAddOns;
    var checkStatus = selectedAddOns.filter(function (obj) {
      return obj.id === id;
    });

    if (checkStatus.length > 0) {
      updatedAddOns = selectedAddOns.filter(function (obj) {
        return obj.id != id;
      });
    } else {
      updatedAddOns.push({
        id: id,
        qty: 1,
        price: price
      });
    }

    return updatedAddOns;
  };

  return {
    //defaults
    price: price(currentVariant.id, []),
    submitText: "Add to Cart",
    disabled: currentVariant.available ? false : true,
    button: currentVariant.available ? "Add to Cart" : "Unavailable",
    addOnProducts: product.addOnProducts,
    selectedAddOnProducts: [],
    options: currentOptions(currentVariant.id),
    //  availableOptions: availableOptions(this.options),
    //Store for sending to add cart
    formData: {
      id: currentVariant.id,
      qty: 1
    },
    //form actions
    checkAddOns: function checkAddOns(id) {
      var checkStatus = this.selectedAddOnProducts.filter(function (obj) {
        return obj.id === id;
      });

      if (checkStatus.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    selectAddon: function selectAddon(id, selectedAddOns, cost) {
      this.selectedAddOnProducts = handleAddOn(id, selectedAddOns, cost);
      this.price = price(this.formData.id, this.selectedAddOnProducts); // console.log(handleAddOn(id, selectedAddOns))
    },
    increase: function increase() {
      this.formData.qty = this.formData.qty + 1;
    },
    decrease: function decrease() {
      this.formData.qty = this.formData.qty - 1 === 0 ? 1 : this.formData.qty - 1;
    },
    onSubmit: function onSubmit() {
      var _this = this;

      this.button = "Adding...";
      this.disabled = true;
      fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: [{
            id: this.formData.id,
            quantity: this.formData.qty
          }].concat(this.selectedAddOnProducts)
        })
      }).then(function () {
        _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.getState().then(function (state) {
          (0,_utils_cart__WEBPACK_IMPORTED_MODULE_2__.cartUpdateAll)(state);
          _this.button = "Add to Cart";
          _this.disabled = false;
          _this.selectedAddOnProducts = [];
          window.dispatchEvent(new CustomEvent("updatecartstatus", {
            detail: {
              cartOpen: true
            }
          }));
        });
      }).catch(function (e) {
        // console.log(e)
        alert("This product is unavailable at the moment");
        _this.button = "Unavailable";
        _this.disabled = true;
      });
    },
    updateVariant: function updateVariant(value, option) {
      var options = this.options;
      var newOptions = options.map(function (e) {
        return e.name == option ? value : e.value;
      });
      var newVariant = variants.filter(function (variant) {
        return (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isEqual)(variant.options, newOptions);
      })[0]; // console.log(newVariant);

      this.price = price(newVariant.id, this.selectedAddOnProducts);
      this.formData.id = newVariant.id;
      this.disabled = newVariant.available ? false : true;
      this.button = newVariant.available ? "Add to Cart" : "Unavailable";
      this.options = currentOptions(newVariant.id);
    }
  };
});

/***/ }),

/***/ "./src/styles/base.scss":
/*!******************************!*\
  !*** ./src/styles/base.scss ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"base": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkepicsupreme_shopify"] = self["webpackChunkepicsupreme_shopify"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/scripts/base.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/styles/base.scss"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRCw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSw4Q0FBOEM7O1dBRTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EsMkRBQTJELHNEQUFzRDtVQUNqSCxxRkFBcUYsdURBQXVEO1VBQzVJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL2FuaW1hdGlvbnMvaGVhZGVyLmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy9iYXNlLmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9jYXJ0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9oZWFkZXItaGVpZ2h0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9wcm9kdWN0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc3R5bGVzL2Jhc2Uuc2NzcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlci1jb250YWluZXJcIik7XG4gICBjb25zdCBsb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2dvXCIpO1xuICAgY29uc3QgbG9nb3R5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ290eXBlXCIpO1xuICAgY29uc3QgaXNTY3JvbGxlZCA9IHdpbmRvdy5zY3JvbGxZID4gd2luZG93LmlubmVySGVpZ2h0IC0gMTAwO1xuICAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoXCJoLTQwXCIsICFpc1Njcm9sbGVkKTtcbiAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKFwiaC0yMFwiLCBpc1Njcm9sbGVkKTtcblxuICAgbG9nb3R5cGUuY2xhc3NMaXN0LnRvZ2dsZShcIm9wYWNpdHktMFwiLCAhaXNTY3JvbGxlZCk7XG4gICBsb2dvdHlwZS5jbGFzc0xpc3QudG9nZ2xlKFwicG9pbnRlci1ldmVudHMtbm9uZVwiLCAhaXNTY3JvbGxlZCk7XG4gICBsb2dvdHlwZS5jbGFzc0xpc3QudG9nZ2xlKFwiZGVsYXktMTAwXCIsIGlzU2Nyb2xsZWQpO1xuXG4gICBsb2dvLmNsYXNzTGlzdC50b2dnbGUoXCJvcGFjaXR5LTBcIiwgaXNTY3JvbGxlZCk7XG4gICBsb2dvLmNsYXNzTGlzdC50b2dnbGUoXCJwb2ludGVyLWV2ZW50cy1ub25lXCIsIGlzU2Nyb2xsZWQpO1xuICAgbG9nby5jbGFzc0xpc3QudG9nZ2xlKFwiZGVsYXktMzAwXCIsICFpc1Njcm9sbGVkKTtcbiB9KTtcbiIsImltcG9ydCBBbHBpbmUgZnJvbSBcImFscGluZWpzXCI7XG5pbXBvcnQgY29sbGFwc2UgZnJvbSAnQGFscGluZWpzL2NvbGxhcHNlJ1xuXG5cbmltcG9ydCBwcm9kdWN0IGZyb20gJy4vdXRpbHMvcHJvZHVjdCdcblxuaW1wb3J0IFwiLi91dGlscy9oZWFkZXItaGVpZ2h0XCI7XG5pbXBvcnQgXCIuL3V0aWxzL2NhcnRcIjtcbmltcG9ydCBcIi4vYW5pbWF0aW9ucy9oZWFkZXJcIjtcblxuQWxwaW5lLnBsdWdpbihjb2xsYXBzZSlcblxuQWxwaW5lLmRhdGEoJ3Byb2R1Y3QnLCBwcm9kdWN0KVxuXG53aW5kb3cuQWxwaW5lID0gQWxwaW5lO1xuXG5BbHBpbmUuc3RhcnQoKTtcblxuXG5cbiIsImltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcblxuY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG59KVxuXG5mdW5jdGlvbiBjYXJ0VG9BbHBpbmUoc3RhdGUpIHtcbiAgbGV0IHByb2R1Y3RzID0gW11cbiAgY29uc29sZS5sb2coc3RhdGUpXG4gIGlmIChzdGF0ZS5pdGVtcykge1xuICAgIHN0YXRlLml0ZW1zLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGxldCBmID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcblxuICAgICAgLy8gaWYgKGUuZmVhdHVyZWRfaW1hZ2UudXJsKSB7XG4gICAgICAvLyAgIGxldCBmaWxlbmFtZSA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsXG4gICAgICAvLyAgICAgLnJlcGxhY2UoL1xcPy4qJC8sICcnKVxuICAgICAgLy8gICAgIC5yZXBsYWNlKC8uKlxcLy8sICcnKVxuICAgICAgLy8gICBsZXQgbmV3RmlsZW5hbWUgPSBmaWxlbmFtZS5yZXBsYWNlKC9cXC5bXi8uXSskLywgJ18zMDB4LmpwZycpXG4gICAgICAvLyAgIGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybC5yZXBsYWNlKGZpbGVuYW1lLCBuZXdGaWxlbmFtZSlcbiAgICAgIC8vIH1cblxuICAgICAgY29uc3QgcmVhbFByaWNlID0gZS5wcmljZSAvIDEwMFxuXG4gICAgICBwcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgdGl0bGU6IGUucHJvZHVjdF90aXRsZSxcbiAgICAgICAga2V5OiBlLmtleSxcbiAgICAgICAgcHJpY2U6IHJlYWxQcmljZSxcbiAgICAgICAgaWQ6IGUudmFyaWFudF9pZCxcbiAgICAgICAgb3B0aW9uczogZS5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICBpbWFnZTogZixcbiAgICAgICAgcXR5OiBlLnF1YW50aXR5LFxuICAgICAgICByZW1vdmUoKSB7XG4gICAgICAgICAgY2FydFJlbW92ZUl0ZW0odGhpcy5rZXkpXG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZShxdHkpIHtcbiAgICAgICAgICBjYXJ0VXBkYXRlSXRlbSh0aGlzLmtleSwgcGFyc2VJbnQocXR5KSlcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG90YWw6IHN0YXRlLml0ZW1zX3N1YnRvdGFsX3ByaWNlIC8gMTAwLFxuICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXJ0UmVtb3ZlSXRlbShrZXkpIHtcbiAgY2FydC5yZW1vdmVJdGVtKGtleSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5mdW5jdGlvbiBjYXJ0VXBkYXRlSXRlbShrZXksIHF0eSkge1xuICBjYXJ0LnVwZGF0ZUl0ZW0oa2V5LCB7IHF1YW50aXR5OiBxdHkgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FydFVwZGF0ZUFsbChzdGF0ZSkge1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZXByb2R1Y3RzJywge1xuICAgICAgZGV0YWlsOiB7IGNhcnQ6IGNhcnRUb0FscGluZShzdGF0ZSkgfSxcbiAgICB9KVxuICApXG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydGNvdW50Jywge1xuICAgICAgZGV0YWlsOiB7IGNhcnRUb3RhbDogc3RhdGUuaXRlbV9jb3VudCB9LFxuICAgIH0pXG4gIClcbn1cbiIsInNldEhlYWRlckhlaWdodCgpXG5cbmZ1bmN0aW9uIHNldEhlYWRlckhlaWdodCgpIHtcbiAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpLm9mZnNldEhlaWdodFxuICBkb2N1bWVudC5ib2R5LnN0eWxlLnNldFByb3BlcnR5KCctLWhlYWRlci1oZWlnaHQnLCBgJHtoZWFkZXJIZWlnaHR9cHhgKVxuICBjb25zdCBmb290ZXJIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyJykub2Zmc2V0SGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0tZm9vdGVyLWhlaWdodCcsIGAke2Zvb3RlckhlaWdodH1weGApXG4gIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICBkb2N1bWVudC5ib2R5LnN0eWxlLnNldFByb3BlcnR5KCctLXdpbmRvdy1oZWlnaHQnLCBgJHt3aW5kb3dIZWlnaHR9cHhgKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2V0SGVhZGVySGVpZ2h0KVxuIiwiaW1wb3J0ICogYXMgY2FydCBmcm9tIFwiQHNob3BpZnkvdGhlbWUtY2FydFwiO1xuaW1wb3J0ICogYXMgY3VycmVuY3kgZnJvbSBcIkBzaG9waWZ5L3RoZW1lLWN1cnJlbmN5XCI7XG5pbXBvcnQgeyBjYXJ0VXBkYXRlQWxsIH0gZnJvbSBcIi4uL3V0aWxzL2NhcnRcIjtcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tIFwibG9kYXNoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChwcm9kdWN0KSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwicHJvZHVjdFwiLCBwcm9kdWN0KTtcbiAgY29uc3QgY3VycmVudFZhcmlhbnQgPSBwcm9kdWN0LnByb2R1Y3QudmFyaWFudHNbMF07XG4gIGNvbnN0IHZhcmlhbnRzID0gcHJvZHVjdC5wcm9kdWN0LnZhcmlhbnRzO1xuXG4gIGNvbnN0IHByaWNlID0gKHZhcmlhbnRJZCwgc2VsZWN0ZWRBZGRPblByb2R1Y3RzKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coc2VsZWN0ZWRBZGRPblByb2R1Y3RzKTtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXTtcbiAgICBsZXQgYWRkT25QcmljZSA9IDA7XG4gICAgaWYoc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlbGVjdGVkQWRkT25Qcm9kdWN0cy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICBhZGRPblByaWNlID0gYWRkT25QcmljZSArIGUucHJpY2VcbiAgICAgIH0pXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGFkZE9uUHJpY2UpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdHVhbFByaWNlOiBcIiRcIiArICh2YXJpYW50LnByaWNlICsgYWRkT25QcmljZSkgLyAxMDAsXG4gICAgICBvcmlnaW5hbFByaWNlOiB2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2VcbiAgICAgICAgPyBcIiRcIiArICh2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2UgKyBhZGRPblByaWNlKSAvIDEwMFxuICAgICAgICA6IFwiXCIsXG4gICAgICBtZXNzYWdlOiBcIlwiLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgY3VycmVudE9wdGlvbnMgPSAodmFyaWFudElkKSA9PiB7XG4gICAgY29uc3QgdmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IHZhcmlhbnRJZClbMF07XG4gICAgY29uc3QgY3VycmVudE9wdGlvbnMgPSBwcm9kdWN0LnByb2R1Y3Qub3B0aW9ucy5tYXAoKGUsIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGUsXG4gICAgICAgIHZhbHVlOiB2YXJpYW50Lm9wdGlvbnNbaV0sXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBjdXJyZW50T3B0aW9ucztcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRPbiA9IChpZCwgc2VsZWN0ZWRBZGRPbnMsIHByaWNlKSA9PiB7XG4gICAgbGV0IHVwZGF0ZWRBZGRPbnMgPSBzZWxlY3RlZEFkZE9ucztcbiAgICBjb25zdCBjaGVja1N0YXR1cyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IGlkKTtcbiAgICBpZiAoY2hlY2tTdGF0dXMubGVuZ3RoID4gMCkge1xuICAgICAgdXBkYXRlZEFkZE9ucyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgIT0gaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVkQWRkT25zLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHF0eTogMSxcbiAgICAgICAgcHJpY2U6IHByaWNlXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZWRBZGRPbnM7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICAvL2RlZmF1bHRzXG4gICAgcHJpY2U6IHByaWNlKGN1cnJlbnRWYXJpYW50LmlkLCBbXSksXG4gICAgc3VibWl0VGV4dDogXCJBZGQgdG8gQ2FydFwiLFxuICAgIGRpc2FibGVkOiBjdXJyZW50VmFyaWFudC5hdmFpbGFibGUgPyBmYWxzZSA6IHRydWUsXG4gICAgYnV0dG9uOiBjdXJyZW50VmFyaWFudC5hdmFpbGFibGUgPyBcIkFkZCB0byBDYXJ0XCIgOiBcIlVuYXZhaWxhYmxlXCIsXG4gICAgYWRkT25Qcm9kdWN0czogcHJvZHVjdC5hZGRPblByb2R1Y3RzLFxuICAgIHNlbGVjdGVkQWRkT25Qcm9kdWN0czogW10sXG5cbiAgICBvcHRpb25zOiBjdXJyZW50T3B0aW9ucyhjdXJyZW50VmFyaWFudC5pZCksXG4gICAgLy8gIGF2YWlsYWJsZU9wdGlvbnM6IGF2YWlsYWJsZU9wdGlvbnModGhpcy5vcHRpb25zKSxcblxuICAgIC8vU3RvcmUgZm9yIHNlbmRpbmcgdG8gYWRkIGNhcnRcbiAgICBmb3JtRGF0YToge1xuICAgICAgaWQ6IGN1cnJlbnRWYXJpYW50LmlkLFxuICAgICAgcXR5OiAxLFxuICAgIH0sXG5cbiAgICAvL2Zvcm0gYWN0aW9uc1xuICAgIGNoZWNrQWRkT25zKGlkKSB7XG4gICAgICBjb25zdCBjaGVja1N0YXR1cyA9IHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZpbHRlcihcbiAgICAgICAgKG9iaikgPT4gb2JqLmlkID09PSBpZFxuICAgICAgKTtcbiAgICAgIGlmIChjaGVja1N0YXR1cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0QWRkb24oaWQsIHNlbGVjdGVkQWRkT25zLCBjb3N0KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IGhhbmRsZUFkZE9uKGlkLCBzZWxlY3RlZEFkZE9ucywgY29zdCk7XG4gICAgICB0aGlzLnByaWNlID0gcHJpY2UodGhpcy5mb3JtRGF0YS5pZCwgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMpO1xuICAgICAgLy8gY29uc29sZS5sb2coaGFuZGxlQWRkT24oaWQsIHNlbGVjdGVkQWRkT25zKSlcbiAgICB9LFxuICAgIGluY3JlYXNlKCkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPSB0aGlzLmZvcm1EYXRhLnF0eSArIDE7XG4gICAgfSxcbiAgICBkZWNyZWFzZSgpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID1cbiAgICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgLSAxID09PSAwID8gMSA6IHRoaXMuZm9ybURhdGEucXR5IC0gMTtcbiAgICB9LFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgdGhpcy5idXR0b24gPSBcIkFkZGluZy4uLlwiO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArIFwiY2FydC9hZGQuanNcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZm9ybURhdGEucXR5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLmNvbmNhdCh0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyksXG4gICAgICAgIH0pLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbiA9IFwiQWRkIHRvIENhcnRcIjtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gW107XG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwidXBkYXRlY2FydHN0YXR1c1wiLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7IGNhcnRPcGVuOiB0cnVlIH0sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApO1xuICAgICAgICAgIHRoaXMuYnV0dG9uID0gXCJVbmF2YWlsYWJsZVwiO1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZVZhcmlhbnQodmFsdWUsIG9wdGlvbikge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBvcHRpb25zLm1hcCgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS5uYW1lID09IG9wdGlvbiA/IHZhbHVlIDogZS52YWx1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBuZXdWYXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKCh2YXJpYW50KSA9PiB7XG4gICAgICAgIHJldHVybiBpc0VxdWFsKHZhcmlhbnQub3B0aW9ucywgbmV3T3B0aW9ucyk7XG4gICAgICB9KVswXTtcblxuICAgICAgLy8gY29uc29sZS5sb2cobmV3VmFyaWFudCk7XG5cbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZShuZXdWYXJpYW50LmlkLCB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyk7XG4gICAgICB0aGlzLmZvcm1EYXRhLmlkID0gbmV3VmFyaWFudC5pZDtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBuZXdWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgIHRoaXMuYnV0dG9uID0gbmV3VmFyaWFudC5hdmFpbGFibGUgPyBcIkFkZCB0byBDYXJ0XCIgOiBcIlVuYXZhaWxhYmxlXCI7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBjdXJyZW50T3B0aW9ucyhuZXdWYXJpYW50LmlkKTtcbiAgICB9LFxuICB9O1xufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJiYXNlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlcGljc3VwcmVtZV9zaG9waWZ5XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2Jhc2UuanNcIik7IH0pXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3N0eWxlcy9iYXNlLnNjc3NcIik7IH0pXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJoZWFkZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dvIiwibG9nb3R5cGUiLCJpc1Njcm9sbGVkIiwic2Nyb2xsWSIsImlubmVySGVpZ2h0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiQWxwaW5lIiwiY29sbGFwc2UiLCJwcm9kdWN0IiwicGx1Z2luIiwiZGF0YSIsInN0YXJ0IiwiY2FydCIsImdldFN0YXRlIiwidGhlbiIsInN0YXRlIiwiY2FydFVwZGF0ZUFsbCIsImNhcnRUb0FscGluZSIsInByb2R1Y3RzIiwiY29uc29sZSIsImxvZyIsIml0ZW1zIiwiZm9yRWFjaCIsImUiLCJmIiwiZmVhdHVyZWRfaW1hZ2UiLCJ1cmwiLCJyZWFsUHJpY2UiLCJwcmljZSIsInB1c2giLCJ0aXRsZSIsInByb2R1Y3RfdGl0bGUiLCJrZXkiLCJpZCIsInZhcmlhbnRfaWQiLCJvcHRpb25zIiwib3B0aW9uc193aXRoX3ZhbHVlcyIsImltYWdlIiwicXR5IiwicXVhbnRpdHkiLCJyZW1vdmUiLCJjYXJ0UmVtb3ZlSXRlbSIsInVwZGF0ZSIsImNhcnRVcGRhdGVJdGVtIiwicGFyc2VJbnQiLCJ0b3RhbCIsIml0ZW1zX3N1YnRvdGFsX3ByaWNlIiwicmVtb3ZlSXRlbSIsInVwZGF0ZUl0ZW0iLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJjYXJ0VG90YWwiLCJpdGVtX2NvdW50Iiwic2V0SGVhZGVySGVpZ2h0IiwiaGVhZGVySGVpZ2h0IiwiZ2V0RWxlbWVudEJ5SWQiLCJvZmZzZXRIZWlnaHQiLCJib2R5Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImZvb3RlckhlaWdodCIsIndpbmRvd0hlaWdodCIsImN1cnJlbmN5IiwiaXNFcXVhbCIsImN1cnJlbnRWYXJpYW50IiwidmFyaWFudHMiLCJ2YXJpYW50SWQiLCJzZWxlY3RlZEFkZE9uUHJvZHVjdHMiLCJ2YXJpYW50IiwiZmlsdGVyIiwib2JqIiwiYWRkT25QcmljZSIsImxlbmd0aCIsImFjdHVhbFByaWNlIiwib3JpZ2luYWxQcmljZSIsImNvbXBhcmVfYXRfcHJpY2UiLCJtZXNzYWdlIiwiY3VycmVudE9wdGlvbnMiLCJtYXAiLCJpIiwibmFtZSIsInZhbHVlIiwiaGFuZGxlQWRkT24iLCJzZWxlY3RlZEFkZE9ucyIsInVwZGF0ZWRBZGRPbnMiLCJjaGVja1N0YXR1cyIsInN1Ym1pdFRleHQiLCJkaXNhYmxlZCIsImF2YWlsYWJsZSIsImJ1dHRvbiIsImFkZE9uUHJvZHVjdHMiLCJmb3JtRGF0YSIsImNoZWNrQWRkT25zIiwic2VsZWN0QWRkb24iLCJjb3N0IiwiaW5jcmVhc2UiLCJkZWNyZWFzZSIsIm9uU3VibWl0IiwiZmV0Y2giLCJTaG9waWZ5Iiwicm91dGVzIiwicm9vdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwiY29uY2F0IiwiY2FydE9wZW4iLCJjYXRjaCIsImFsZXJ0IiwidXBkYXRlVmFyaWFudCIsIm9wdGlvbiIsIm5ld09wdGlvbnMiLCJuZXdWYXJpYW50Il0sInNvdXJjZVJvb3QiOiIifQ==