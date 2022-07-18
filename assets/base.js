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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRCw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSw4Q0FBOEM7O1dBRTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EsMkRBQTJELHNEQUFzRDtVQUNqSCxxRkFBcUYsdURBQXVEO1VBQzVJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL2FuaW1hdGlvbnMvaGVhZGVyLmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy9iYXNlLmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9jYXJ0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9oZWFkZXItaGVpZ2h0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9wcm9kdWN0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzcz8wOTI3Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyLWNvbnRhaW5lclwiKTtcbiAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ29cIik7XG4gICBjb25zdCBsb2dvdHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9nb3R5cGVcIik7XG4gICBjb25zdCBpc1Njcm9sbGVkID0gd2luZG93LnNjcm9sbFkgPiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDA7XG4gICBoZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZShcImgtNDBcIiwgIWlzU2Nyb2xsZWQpO1xuICAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoXCJoLTIwXCIsIGlzU2Nyb2xsZWQpO1xuXG4gICBsb2dvdHlwZS5jbGFzc0xpc3QudG9nZ2xlKFwib3BhY2l0eS0wXCIsICFpc1Njcm9sbGVkKTtcbiAgIGxvZ290eXBlLmNsYXNzTGlzdC50b2dnbGUoXCJwb2ludGVyLWV2ZW50cy1ub25lXCIsICFpc1Njcm9sbGVkKTtcbiAgIGxvZ290eXBlLmNsYXNzTGlzdC50b2dnbGUoXCJkZWxheS0xMDBcIiwgaXNTY3JvbGxlZCk7XG5cbiAgIGxvZ28uY2xhc3NMaXN0LnRvZ2dsZShcIm9wYWNpdHktMFwiLCBpc1Njcm9sbGVkKTtcbiAgIGxvZ28uY2xhc3NMaXN0LnRvZ2dsZShcInBvaW50ZXItZXZlbnRzLW5vbmVcIiwgaXNTY3JvbGxlZCk7XG4gICBsb2dvLmNsYXNzTGlzdC50b2dnbGUoXCJkZWxheS0zMDBcIiwgIWlzU2Nyb2xsZWQpO1xuIH0pO1xuIiwiaW1wb3J0IEFscGluZSBmcm9tIFwiYWxwaW5lanNcIjtcbmltcG9ydCBjb2xsYXBzZSBmcm9tICdAYWxwaW5lanMvY29sbGFwc2UnXG5cblxuaW1wb3J0IHByb2R1Y3QgZnJvbSAnLi91dGlscy9wcm9kdWN0J1xuXG5pbXBvcnQgXCIuL3V0aWxzL2hlYWRlci1oZWlnaHRcIjtcbmltcG9ydCBcIi4vdXRpbHMvY2FydFwiO1xuaW1wb3J0IFwiLi9hbmltYXRpb25zL2hlYWRlclwiO1xuXG5BbHBpbmUucGx1Z2luKGNvbGxhcHNlKVxuXG5BbHBpbmUuZGF0YSgncHJvZHVjdCcsIHByb2R1Y3QpXG5cbndpbmRvdy5BbHBpbmUgPSBBbHBpbmU7XG5cbkFscGluZS5zdGFydCgpO1xuXG5cblxuIiwiaW1wb3J0ICogYXMgY2FydCBmcm9tICdAc2hvcGlmeS90aGVtZS1jYXJ0J1xuXG5jYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbn0pXG5cbmZ1bmN0aW9uIGNhcnRUb0FscGluZShzdGF0ZSkge1xuICBsZXQgcHJvZHVjdHMgPSBbXVxuICBjb25zb2xlLmxvZyhzdGF0ZSlcbiAgaWYgKHN0YXRlLml0ZW1zKSB7XG4gICAgc3RhdGUuaXRlbXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgbGV0IGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuXG4gICAgICAvLyBpZiAoZS5mZWF0dXJlZF9pbWFnZS51cmwpIHtcbiAgICAgIC8vICAgbGV0IGZpbGVuYW1lID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcbiAgICAgIC8vICAgICAucmVwbGFjZSgvXFw/LiokLywgJycpXG4gICAgICAvLyAgICAgLnJlcGxhY2UoLy4qXFwvLywgJycpXG4gICAgICAvLyAgIGxldCBuZXdGaWxlbmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnXzMwMHguanBnJylcbiAgICAgIC8vICAgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsLnJlcGxhY2UoZmlsZW5hbWUsIG5ld0ZpbGVuYW1lKVxuICAgICAgLy8gfVxuXG4gICAgICBjb25zdCByZWFsUHJpY2UgPSBlLnByaWNlIC8gMTAwXG5cbiAgICAgIHByb2R1Y3RzLnB1c2goe1xuICAgICAgICB0aXRsZTogZS5wcm9kdWN0X3RpdGxlLFxuICAgICAgICBrZXk6IGUua2V5LFxuICAgICAgICBwcmljZTogcmVhbFByaWNlLFxuICAgICAgICBpZDogZS52YXJpYW50X2lkLFxuICAgICAgICBvcHRpb25zOiBlLm9wdGlvbnNfd2l0aF92YWx1ZXMsXG4gICAgICAgIGltYWdlOiBmLFxuICAgICAgICBxdHk6IGUucXVhbnRpdHksXG4gICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlKHF0eSkge1xuICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbDogc3RhdGUuaXRlbXNfc3VidG90YWxfcHJpY2UgLyAxMDAsXG4gICAgcHJvZHVjdHM6IHByb2R1Y3RzLFxuICB9XG59XG5cbmZ1bmN0aW9uIGNhcnRSZW1vdmVJdGVtKGtleSkge1xuICBjYXJ0LnJlbW92ZUl0ZW0oa2V5KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNhcnRVcGRhdGVJdGVtKGtleSwgcXR5KSB7XG4gIGNhcnQudXBkYXRlSXRlbShrZXksIHsgcXVhbnRpdHk6IHF0eSB9KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJ0VXBkYXRlQWxsKHN0YXRlKSB7XG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlcHJvZHVjdHMnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydDogY2FydFRvQWxwaW5lKHN0YXRlKSB9LFxuICAgIH0pXG4gIClcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0Y291bnQnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydFRvdGFsOiBzdGF0ZS5pdGVtX2NvdW50IH0sXG4gICAgfSlcbiAgKVxufVxuIiwic2V0SGVhZGVySGVpZ2h0KClcblxuZnVuY3Rpb24gc2V0SGVhZGVySGVpZ2h0KCkge1xuICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykub2Zmc2V0SGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0taGVhZGVyLWhlaWdodCcsIGAke2hlYWRlckhlaWdodH1weGApXG4gIGNvbnN0IGZvb3RlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1mb290ZXItaGVpZ2h0JywgYCR7Zm9vdGVySGVpZ2h0fXB4YClcbiAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0td2luZG93LWhlaWdodCcsIGAke3dpbmRvd0hlaWdodH1weGApXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRIZWFkZXJIZWlnaHQpXG4iLCJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gXCJAc2hvcGlmeS90aGVtZS1jYXJ0XCI7XG5pbXBvcnQgKiBhcyBjdXJyZW5jeSBmcm9tIFwiQHNob3BpZnkvdGhlbWUtY3VycmVuY3lcIjtcbmltcG9ydCB7IGNhcnRVcGRhdGVBbGwgfSBmcm9tIFwiLi4vdXRpbHMvY2FydFwiO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gXCJsb2Rhc2hcIjtcblxuZXhwb3J0IGRlZmF1bHQgKHByb2R1Y3QpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwcm9kdWN0XCIsIHByb2R1Y3QpO1xuICBjb25zdCBjdXJyZW50VmFyaWFudCA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1swXTtcbiAgY29uc3QgdmFyaWFudHMgPSBwcm9kdWN0LnByb2R1Y3QudmFyaWFudHM7XG5cbiAgY29uc3QgcHJpY2UgPSAodmFyaWFudElkLCBzZWxlY3RlZEFkZE9uUHJvZHVjdHMpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhzZWxlY3RlZEFkZE9uUHJvZHVjdHMpO1xuICAgIGNvbnN0IHZhcmlhbnQgPSB2YXJpYW50cy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkID09PSB2YXJpYW50SWQpWzBdO1xuICAgIGxldCBhZGRPblByaWNlID0gMDtcbiAgICBpZihzZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZvckVhY2goZSA9PiB7XG4gICAgICAgIGFkZE9uUHJpY2UgPSBhZGRPblByaWNlICsgZS5wcmljZVxuICAgICAgfSlcbiAgICB9XG4gICAgY29uc29sZS5sb2coYWRkT25QcmljZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWN0dWFsUHJpY2U6IFwiJFwiICsgKHZhcmlhbnQucHJpY2UgKyBhZGRPblByaWNlKSAvIDEwMCxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IHZhcmlhbnQuY29tcGFyZV9hdF9wcmljZVxuICAgICAgICA/IFwiJFwiICsgKHZhcmlhbnQuY29tcGFyZV9hdF9wcmljZSArIGFkZE9uUHJpY2UpIC8gMTAwXG4gICAgICAgIDogXCJcIixcbiAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBjdXJyZW50T3B0aW9ucyA9ICh2YXJpYW50SWQpID0+IHtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXTtcbiAgICBjb25zdCBjdXJyZW50T3B0aW9ucyA9IHByb2R1Y3QucHJvZHVjdC5vcHRpb25zLm1hcCgoZSwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogZSxcbiAgICAgICAgdmFsdWU6IHZhcmlhbnQub3B0aW9uc1tpXSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGN1cnJlbnRPcHRpb25zO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZE9uID0gKGlkLCBzZWxlY3RlZEFkZE9ucywgcHJpY2UpID0+IHtcbiAgICBsZXQgdXBkYXRlZEFkZE9ucyA9IHNlbGVjdGVkQWRkT25zO1xuICAgIGNvbnN0IGNoZWNrU3RhdHVzID0gc2VsZWN0ZWRBZGRPbnMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gaWQpO1xuICAgIGlmIChjaGVja1N0YXR1cy5sZW5ndGggPiAwKSB7XG4gICAgICB1cGRhdGVkQWRkT25zID0gc2VsZWN0ZWRBZGRPbnMuZmlsdGVyKChvYmopID0+IG9iai5pZCAhPSBpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZWRBZGRPbnMucHVzaCh7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgcXR5OiAxLFxuICAgICAgICBwcmljZTogcHJpY2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlZEFkZE9ucztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIC8vZGVmYXVsdHNcbiAgICBwcmljZTogcHJpY2UoY3VycmVudFZhcmlhbnQuaWQsIFtdKSxcbiAgICBzdWJtaXRUZXh0OiBcIkFkZCB0byBDYXJ0XCIsXG4gICAgZGlzYWJsZWQ6IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICBidXR0b246IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/IFwiQWRkIHRvIENhcnRcIiA6IFwiVW5hdmFpbGFibGVcIixcbiAgICBhZGRPblByb2R1Y3RzOiBwcm9kdWN0LmFkZE9uUHJvZHVjdHMsXG4gICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzOiBbXSxcblxuICAgIG9wdGlvbnM6IGN1cnJlbnRPcHRpb25zKGN1cnJlbnRWYXJpYW50LmlkKSxcbiAgICAvLyAgYXZhaWxhYmxlT3B0aW9uczogYXZhaWxhYmxlT3B0aW9ucyh0aGlzLm9wdGlvbnMpLFxuXG4gICAgLy9TdG9yZSBmb3Igc2VuZGluZyB0byBhZGQgY2FydFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICBpZDogY3VycmVudFZhcmlhbnQuaWQsXG4gICAgICBxdHk6IDEsXG4gICAgfSxcblxuICAgIC8vZm9ybSBhY3Rpb25zXG4gICAgY2hlY2tBZGRPbnMoaWQpIHtcbiAgICAgIGNvbnN0IGNoZWNrU3RhdHVzID0gdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMuZmlsdGVyKFxuICAgICAgICAob2JqKSA9PiBvYmouaWQgPT09IGlkXG4gICAgICApO1xuICAgICAgaWYgKGNoZWNrU3RhdHVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3RBZGRvbihpZCwgc2VsZWN0ZWRBZGRPbnMsIGNvc3QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gaGFuZGxlQWRkT24oaWQsIHNlbGVjdGVkQWRkT25zLCBjb3N0KTtcbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZSh0aGlzLmZvcm1EYXRhLmlkLCB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhoYW5kbGVBZGRPbihpZCwgc2VsZWN0ZWRBZGRPbnMpKVxuICAgIH0sXG4gICAgaW5jcmVhc2UoKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhLnF0eSA9IHRoaXMuZm9ybURhdGEucXR5ICsgMTtcbiAgICB9LFxuICAgIGRlY3JlYXNlKCkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPVxuICAgICAgICB0aGlzLmZvcm1EYXRhLnF0eSAtIDEgPT09IDAgPyAxIDogdGhpcy5mb3JtRGF0YS5xdHkgLSAxO1xuICAgIH0sXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICB0aGlzLmJ1dHRvbiA9IFwiQWRkaW5nLi4uXCI7XG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGZldGNoKHdpbmRvdy5TaG9waWZ5LnJvdXRlcy5yb290ICsgXCJjYXJ0L2FkZC5qc1wiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiB0aGlzLmZvcm1EYXRhLmlkLFxuICAgICAgICAgICAgICBxdWFudGl0eTogdGhpcy5mb3JtRGF0YS5xdHksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0uY29uY2F0KHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzKSxcbiAgICAgICAgfSksXG4gICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gXCJBZGQgdG8gQ2FydFwiO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBbXTtcbiAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJ1cGRhdGVjYXJ0c3RhdHVzXCIsIHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHsgY2FydE9wZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgYWxlcnQoYFRoaXMgcHJvZHVjdCBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50YCk7XG4gICAgICAgICAgdGhpcy5idXR0b24gPSBcIlVuYXZhaWxhYmxlXCI7XG4gICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlVmFyaWFudCh2YWx1ZSwgb3B0aW9uKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgY29uc3QgbmV3T3B0aW9ucyA9IG9wdGlvbnMubWFwKChlKSA9PiB7XG4gICAgICAgIHJldHVybiBlLm5hbWUgPT0gb3B0aW9uID8gdmFsdWUgOiBlLnZhbHVlO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG5ld1ZhcmlhbnQgPSB2YXJpYW50cy5maWx0ZXIoKHZhcmlhbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGlzRXF1YWwodmFyaWFudC5vcHRpb25zLCBuZXdPcHRpb25zKTtcbiAgICAgIH0pWzBdO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhuZXdWYXJpYW50KTtcblxuICAgICAgdGhpcy5wcmljZSA9IHByaWNlKG5ld1ZhcmlhbnQuaWQsIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzKTtcbiAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSBuZXdWYXJpYW50LmlkO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IG5ld1ZhcmlhbnQuYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlO1xuICAgICAgdGhpcy5idXR0b24gPSBuZXdWYXJpYW50LmF2YWlsYWJsZSA/IFwiQWRkIHRvIENhcnRcIiA6IFwiVW5hdmFpbGFibGVcIjtcbiAgICAgIHRoaXMub3B0aW9ucyA9IGN1cnJlbnRPcHRpb25zKG5ld1ZhcmlhbnQuaWQpO1xuICAgIH0sXG4gIH07XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImJhc2VcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvYmFzZS5qc1wiKTsgfSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzc1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhlYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxvZ28iLCJsb2dvdHlwZSIsImlzU2Nyb2xsZWQiLCJzY3JvbGxZIiwiaW5uZXJIZWlnaHQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJBbHBpbmUiLCJjb2xsYXBzZSIsInByb2R1Y3QiLCJwbHVnaW4iLCJkYXRhIiwic3RhcnQiLCJjYXJ0IiwiZ2V0U3RhdGUiLCJ0aGVuIiwic3RhdGUiLCJjYXJ0VXBkYXRlQWxsIiwiY2FydFRvQWxwaW5lIiwicHJvZHVjdHMiLCJjb25zb2xlIiwibG9nIiwiaXRlbXMiLCJmb3JFYWNoIiwiZSIsImYiLCJmZWF0dXJlZF9pbWFnZSIsInVybCIsInJlYWxQcmljZSIsInByaWNlIiwicHVzaCIsInRpdGxlIiwicHJvZHVjdF90aXRsZSIsImtleSIsImlkIiwidmFyaWFudF9pZCIsIm9wdGlvbnMiLCJvcHRpb25zX3dpdGhfdmFsdWVzIiwiaW1hZ2UiLCJxdHkiLCJxdWFudGl0eSIsInJlbW92ZSIsImNhcnRSZW1vdmVJdGVtIiwidXBkYXRlIiwiY2FydFVwZGF0ZUl0ZW0iLCJwYXJzZUludCIsInRvdGFsIiwiaXRlbXNfc3VidG90YWxfcHJpY2UiLCJyZW1vdmVJdGVtIiwidXBkYXRlSXRlbSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImNhcnRUb3RhbCIsIml0ZW1fY291bnQiLCJzZXRIZWFkZXJIZWlnaHQiLCJoZWFkZXJIZWlnaHQiLCJnZXRFbGVtZW50QnlJZCIsIm9mZnNldEhlaWdodCIsImJvZHkiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiZm9vdGVySGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwiY3VycmVuY3kiLCJpc0VxdWFsIiwiY3VycmVudFZhcmlhbnQiLCJ2YXJpYW50cyIsInZhcmlhbnRJZCIsInNlbGVjdGVkQWRkT25Qcm9kdWN0cyIsInZhcmlhbnQiLCJmaWx0ZXIiLCJvYmoiLCJhZGRPblByaWNlIiwibGVuZ3RoIiwiYWN0dWFsUHJpY2UiLCJvcmlnaW5hbFByaWNlIiwiY29tcGFyZV9hdF9wcmljZSIsIm1lc3NhZ2UiLCJjdXJyZW50T3B0aW9ucyIsIm1hcCIsImkiLCJuYW1lIiwidmFsdWUiLCJoYW5kbGVBZGRPbiIsInNlbGVjdGVkQWRkT25zIiwidXBkYXRlZEFkZE9ucyIsImNoZWNrU3RhdHVzIiwic3VibWl0VGV4dCIsImRpc2FibGVkIiwiYXZhaWxhYmxlIiwiYnV0dG9uIiwiYWRkT25Qcm9kdWN0cyIsImZvcm1EYXRhIiwiY2hlY2tBZGRPbnMiLCJzZWxlY3RBZGRvbiIsImNvc3QiLCJpbmNyZWFzZSIsImRlY3JlYXNlIiwib25TdWJtaXQiLCJmZXRjaCIsIlNob3BpZnkiLCJyb3V0ZXMiLCJyb290IiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb25jYXQiLCJjYXJ0T3BlbiIsImNhdGNoIiwiYWxlcnQiLCJ1cGRhdGVWYXJpYW50Iiwib3B0aW9uIiwibmV3T3B0aW9ucyIsIm5ld1ZhcmlhbnQiXSwic291cmNlUm9vdCI6IiJ9