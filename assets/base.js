/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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




 // import './animations/header'

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
      actualPrice: '$' + (variant.price + addOnPrice) / 100,
      originalPrice: variant.compare_at_price ? '$' + (variant.compare_at_price + addOnPrice) / 100 : '',
      message: ''
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
    submitText: 'Add to Cart',
    disabled: currentVariant.available ? false : true,
    button: currentVariant.available ? 'Add to Cart' : 'Unavailable',
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

      this.button = 'Adding...';
      this.disabled = true;
      fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
          _this.button = 'Add to Cart';
          _this.disabled = false;
          _this.selectedAddOnProducts = [];
          window.dispatchEvent(new CustomEvent('updatecartstatus', {
            detail: {
              cartOpen: true
            }
          }));
        });
      }).catch(function (e) {
        // console.log(e)
        alert("This product is unavailable at the moment");
        _this.button = 'Unavailable';
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
      this.button = newVariant.available ? 'Add to Cart' : 'Unavailable';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0M3QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRCw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSw4Q0FBOEM7O1dBRTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EsMkRBQTJELHNEQUFzRDtVQUNqSCxxRkFBcUYsdURBQXVEO1VBQzVJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL2NhcnQuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL2hlYWRlci1oZWlnaHQuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zdHlsZXMvYmFzZS5zY3NzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbHBpbmUgZnJvbSAnYWxwaW5lanMnXG5pbXBvcnQgY29sbGFwc2UgZnJvbSAnQGFscGluZWpzL2NvbGxhcHNlJ1xuXG5pbXBvcnQgcHJvZHVjdCBmcm9tICcuL3V0aWxzL3Byb2R1Y3QnXG5cbmltcG9ydCAnLi91dGlscy9oZWFkZXItaGVpZ2h0J1xuaW1wb3J0ICcuL3V0aWxzL2NhcnQnXG4vLyBpbXBvcnQgJy4vYW5pbWF0aW9ucy9oZWFkZXInXG5cbkFscGluZS5wbHVnaW4oY29sbGFwc2UpXG5cbkFscGluZS5kYXRhKCdwcm9kdWN0JywgcHJvZHVjdClcblxud2luZG93LkFscGluZSA9IEFscGluZVxuXG5BbHBpbmUuc3RhcnQoKVxuIiwiaW1wb3J0ICogYXMgY2FydCBmcm9tICdAc2hvcGlmeS90aGVtZS1jYXJ0J1xuXG5jYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbn0pXG5cbmZ1bmN0aW9uIGNhcnRUb0FscGluZShzdGF0ZSkge1xuICBsZXQgcHJvZHVjdHMgPSBbXVxuICBjb25zb2xlLmxvZyhzdGF0ZSlcbiAgaWYgKHN0YXRlLml0ZW1zKSB7XG4gICAgc3RhdGUuaXRlbXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgbGV0IGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuXG4gICAgICAvLyBpZiAoZS5mZWF0dXJlZF9pbWFnZS51cmwpIHtcbiAgICAgIC8vICAgbGV0IGZpbGVuYW1lID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcbiAgICAgIC8vICAgICAucmVwbGFjZSgvXFw/LiokLywgJycpXG4gICAgICAvLyAgICAgLnJlcGxhY2UoLy4qXFwvLywgJycpXG4gICAgICAvLyAgIGxldCBuZXdGaWxlbmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnXzMwMHguanBnJylcbiAgICAgIC8vICAgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsLnJlcGxhY2UoZmlsZW5hbWUsIG5ld0ZpbGVuYW1lKVxuICAgICAgLy8gfVxuXG4gICAgICBjb25zdCByZWFsUHJpY2UgPSBlLnByaWNlIC8gMTAwXG5cbiAgICAgIHByb2R1Y3RzLnB1c2goe1xuICAgICAgICB0aXRsZTogZS5wcm9kdWN0X3RpdGxlLFxuICAgICAgICBrZXk6IGUua2V5LFxuICAgICAgICBwcmljZTogcmVhbFByaWNlLFxuICAgICAgICBpZDogZS52YXJpYW50X2lkLFxuICAgICAgICBvcHRpb25zOiBlLm9wdGlvbnNfd2l0aF92YWx1ZXMsXG4gICAgICAgIGltYWdlOiBmLFxuICAgICAgICBxdHk6IGUucXVhbnRpdHksXG4gICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlKHF0eSkge1xuICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbDogc3RhdGUuaXRlbXNfc3VidG90YWxfcHJpY2UgLyAxMDAsXG4gICAgcHJvZHVjdHM6IHByb2R1Y3RzLFxuICB9XG59XG5cbmZ1bmN0aW9uIGNhcnRSZW1vdmVJdGVtKGtleSkge1xuICBjYXJ0LnJlbW92ZUl0ZW0oa2V5KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNhcnRVcGRhdGVJdGVtKGtleSwgcXR5KSB7XG4gIGNhcnQudXBkYXRlSXRlbShrZXksIHsgcXVhbnRpdHk6IHF0eSB9KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJ0VXBkYXRlQWxsKHN0YXRlKSB7XG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlcHJvZHVjdHMnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydDogY2FydFRvQWxwaW5lKHN0YXRlKSB9LFxuICAgIH0pXG4gIClcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0Y291bnQnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydFRvdGFsOiBzdGF0ZS5pdGVtX2NvdW50IH0sXG4gICAgfSlcbiAgKVxufVxuIiwic2V0SGVhZGVySGVpZ2h0KClcblxuZnVuY3Rpb24gc2V0SGVhZGVySGVpZ2h0KCkge1xuICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykub2Zmc2V0SGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0taGVhZGVyLWhlaWdodCcsIGAke2hlYWRlckhlaWdodH1weGApXG4gIGNvbnN0IGZvb3RlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1mb290ZXItaGVpZ2h0JywgYCR7Zm9vdGVySGVpZ2h0fXB4YClcbiAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0td2luZG93LWhlaWdodCcsIGAke3dpbmRvd0hlaWdodH1weGApXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRIZWFkZXJIZWlnaHQpXG4iLCJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG5pbXBvcnQgKiBhcyBjdXJyZW5jeSBmcm9tICdAc2hvcGlmeS90aGVtZS1jdXJyZW5jeSdcbmltcG9ydCB7IGNhcnRVcGRhdGVBbGwgfSBmcm9tICcuLi91dGlscy9jYXJ0J1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCdcblxuZXhwb3J0IGRlZmF1bHQgKHByb2R1Y3QpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwcm9kdWN0XCIsIHByb2R1Y3QpO1xuICBjb25zdCBjdXJyZW50VmFyaWFudCA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1swXVxuICBjb25zdCB2YXJpYW50cyA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1xuXG4gIGNvbnN0IHByaWNlID0gKHZhcmlhbnRJZCwgc2VsZWN0ZWRBZGRPblByb2R1Y3RzKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coc2VsZWN0ZWRBZGRPblByb2R1Y3RzKTtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXVxuICAgIGxldCBhZGRPblByaWNlID0gMFxuICAgIGlmIChzZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgYWRkT25QcmljZSA9IGFkZE9uUHJpY2UgKyBlLnByaWNlXG4gICAgICB9KVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhhZGRPblByaWNlKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdHVhbFByaWNlOiAnJCcgKyAodmFyaWFudC5wcmljZSArIGFkZE9uUHJpY2UpIC8gMTAwLFxuICAgICAgb3JpZ2luYWxQcmljZTogdmFyaWFudC5jb21wYXJlX2F0X3ByaWNlXG4gICAgICAgID8gJyQnICsgKHZhcmlhbnQuY29tcGFyZV9hdF9wcmljZSArIGFkZE9uUHJpY2UpIC8gMTAwXG4gICAgICAgIDogJycsXG4gICAgICBtZXNzYWdlOiAnJyxcbiAgICB9XG4gIH1cblxuICBjb25zdCBjdXJyZW50T3B0aW9ucyA9ICh2YXJpYW50SWQpID0+IHtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXVxuICAgIGNvbnN0IGN1cnJlbnRPcHRpb25zID0gcHJvZHVjdC5wcm9kdWN0Lm9wdGlvbnMubWFwKChlLCBpKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBlLFxuICAgICAgICB2YWx1ZTogdmFyaWFudC5vcHRpb25zW2ldLFxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGN1cnJlbnRPcHRpb25zXG4gIH1cblxuICBjb25zdCBoYW5kbGVBZGRPbiA9IChpZCwgc2VsZWN0ZWRBZGRPbnMsIHByaWNlKSA9PiB7XG4gICAgbGV0IHVwZGF0ZWRBZGRPbnMgPSBzZWxlY3RlZEFkZE9uc1xuICAgIGNvbnN0IGNoZWNrU3RhdHVzID0gc2VsZWN0ZWRBZGRPbnMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gaWQpXG4gICAgaWYgKGNoZWNrU3RhdHVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHVwZGF0ZWRBZGRPbnMgPSBzZWxlY3RlZEFkZE9ucy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkICE9IGlkKVxuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVkQWRkT25zLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHF0eTogMSxcbiAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZWRBZGRPbnNcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLy9kZWZhdWx0c1xuICAgIHByaWNlOiBwcmljZShjdXJyZW50VmFyaWFudC5pZCwgW10pLFxuICAgIHN1Ym1pdFRleHQ6ICdBZGQgdG8gQ2FydCcsXG4gICAgZGlzYWJsZWQ6IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICBidXR0b246IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/ICdBZGQgdG8gQ2FydCcgOiAnVW5hdmFpbGFibGUnLFxuICAgIGFkZE9uUHJvZHVjdHM6IHByb2R1Y3QuYWRkT25Qcm9kdWN0cyxcbiAgICBzZWxlY3RlZEFkZE9uUHJvZHVjdHM6IFtdLFxuXG4gICAgb3B0aW9uczogY3VycmVudE9wdGlvbnMoY3VycmVudFZhcmlhbnQuaWQpLFxuICAgIC8vICBhdmFpbGFibGVPcHRpb25zOiBhdmFpbGFibGVPcHRpb25zKHRoaXMub3B0aW9ucyksXG5cbiAgICAvL1N0b3JlIGZvciBzZW5kaW5nIHRvIGFkZCBjYXJ0XG4gICAgZm9ybURhdGE6IHtcbiAgICAgIGlkOiBjdXJyZW50VmFyaWFudC5pZCxcbiAgICAgIHF0eTogMSxcbiAgICB9LFxuXG4gICAgLy9mb3JtIGFjdGlvbnNcbiAgICBjaGVja0FkZE9ucyhpZCkge1xuICAgICAgY29uc3QgY2hlY2tTdGF0dXMgPSB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cy5maWx0ZXIoXG4gICAgICAgIChvYmopID0+IG9iai5pZCA9PT0gaWRcbiAgICAgIClcbiAgICAgIGlmIChjaGVja1N0YXR1cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlbGVjdEFkZG9uKGlkLCBzZWxlY3RlZEFkZE9ucywgY29zdCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBoYW5kbGVBZGRPbihpZCwgc2VsZWN0ZWRBZGRPbnMsIGNvc3QpXG4gICAgICB0aGlzLnByaWNlID0gcHJpY2UodGhpcy5mb3JtRGF0YS5pZCwgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMpXG4gICAgICAvLyBjb25zb2xlLmxvZyhoYW5kbGVBZGRPbihpZCwgc2VsZWN0ZWRBZGRPbnMpKVxuICAgIH0sXG4gICAgaW5jcmVhc2UoKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhLnF0eSA9IHRoaXMuZm9ybURhdGEucXR5ICsgMVxuICAgIH0sXG4gICAgZGVjcmVhc2UoKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhLnF0eSA9XG4gICAgICAgIHRoaXMuZm9ybURhdGEucXR5IC0gMSA9PT0gMCA/IDEgOiB0aGlzLmZvcm1EYXRhLnF0eSAtIDFcbiAgICB9LFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgdGhpcy5idXR0b24gPSAnQWRkaW5nLi4uJ1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgIGZldGNoKHdpbmRvdy5TaG9waWZ5LnJvdXRlcy5yb290ICsgJ2NhcnQvYWRkLmpzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZm9ybURhdGEucXR5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLmNvbmNhdCh0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyksXG4gICAgICAgIH0pLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IFtdXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0c3RhdHVzJywge1xuICAgICAgICAgICAgICAgIGRldGFpbDogeyBjYXJ0T3BlbjogdHJ1ZSB9LFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgYWxlcnQoYFRoaXMgcHJvZHVjdCBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50YClcbiAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdVbmF2YWlsYWJsZSdcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgdXBkYXRlVmFyaWFudCh2YWx1ZSwgb3B0aW9uKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXG4gICAgICBjb25zdCBuZXdPcHRpb25zID0gb3B0aW9ucy5tYXAoKGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGUubmFtZSA9PSBvcHRpb24gPyB2YWx1ZSA6IGUudmFsdWVcbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IG5ld1ZhcmlhbnQgPSB2YXJpYW50cy5maWx0ZXIoKHZhcmlhbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGlzRXF1YWwodmFyaWFudC5vcHRpb25zLCBuZXdPcHRpb25zKVxuICAgICAgfSlbMF1cblxuICAgICAgLy8gY29uc29sZS5sb2cobmV3VmFyaWFudCk7XG5cbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZShuZXdWYXJpYW50LmlkLCB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cylcbiAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSBuZXdWYXJpYW50LmlkXG4gICAgICB0aGlzLmRpc2FibGVkID0gbmV3VmFyaWFudC5hdmFpbGFibGUgPyBmYWxzZSA6IHRydWVcbiAgICAgIHRoaXMuYnV0dG9uID0gbmV3VmFyaWFudC5hdmFpbGFibGUgPyAnQWRkIHRvIENhcnQnIDogJ1VuYXZhaWxhYmxlJ1xuICAgICAgdGhpcy5vcHRpb25zID0gY3VycmVudE9wdGlvbnMobmV3VmFyaWFudC5pZClcbiAgICB9LFxuICB9XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSBmdW5jdGlvbihyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpIHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNodW5rSWRzID0gZGVmZXJyZWRbaV1bMF07XG5cdFx0dmFyIGZuID0gZGVmZXJyZWRbaV1bMV07XG5cdFx0dmFyIHByaW9yaXR5ID0gZGVmZXJyZWRbaV1bMl07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pOyB9KSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYmFzZVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IGZ1bmN0aW9uKGNodW5rSWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMDsgfTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlcGljc3VwcmVtZV9zaG9waWZ5XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9iYXNlLmpzXCIpOyB9KVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvYmFzZS5zY3NzXCIpOyB9KVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJBbHBpbmUiLCJjb2xsYXBzZSIsInByb2R1Y3QiLCJwbHVnaW4iLCJkYXRhIiwid2luZG93Iiwic3RhcnQiLCJjYXJ0IiwiZ2V0U3RhdGUiLCJ0aGVuIiwic3RhdGUiLCJjYXJ0VXBkYXRlQWxsIiwiY2FydFRvQWxwaW5lIiwicHJvZHVjdHMiLCJjb25zb2xlIiwibG9nIiwiaXRlbXMiLCJmb3JFYWNoIiwiZSIsImYiLCJmZWF0dXJlZF9pbWFnZSIsInVybCIsInJlYWxQcmljZSIsInByaWNlIiwicHVzaCIsInRpdGxlIiwicHJvZHVjdF90aXRsZSIsImtleSIsImlkIiwidmFyaWFudF9pZCIsIm9wdGlvbnMiLCJvcHRpb25zX3dpdGhfdmFsdWVzIiwiaW1hZ2UiLCJxdHkiLCJxdWFudGl0eSIsInJlbW92ZSIsImNhcnRSZW1vdmVJdGVtIiwidXBkYXRlIiwiY2FydFVwZGF0ZUl0ZW0iLCJwYXJzZUludCIsInRvdGFsIiwiaXRlbXNfc3VidG90YWxfcHJpY2UiLCJyZW1vdmVJdGVtIiwidXBkYXRlSXRlbSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImNhcnRUb3RhbCIsIml0ZW1fY291bnQiLCJzZXRIZWFkZXJIZWlnaHQiLCJoZWFkZXJIZWlnaHQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwib2Zmc2V0SGVpZ2h0IiwiYm9keSIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJmb290ZXJIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJpbm5lckhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjdXJyZW5jeSIsImlzRXF1YWwiLCJjdXJyZW50VmFyaWFudCIsInZhcmlhbnRzIiwidmFyaWFudElkIiwic2VsZWN0ZWRBZGRPblByb2R1Y3RzIiwidmFyaWFudCIsImZpbHRlciIsIm9iaiIsImFkZE9uUHJpY2UiLCJsZW5ndGgiLCJhY3R1YWxQcmljZSIsIm9yaWdpbmFsUHJpY2UiLCJjb21wYXJlX2F0X3ByaWNlIiwibWVzc2FnZSIsImN1cnJlbnRPcHRpb25zIiwibWFwIiwiaSIsIm5hbWUiLCJ2YWx1ZSIsImhhbmRsZUFkZE9uIiwic2VsZWN0ZWRBZGRPbnMiLCJ1cGRhdGVkQWRkT25zIiwiY2hlY2tTdGF0dXMiLCJzdWJtaXRUZXh0IiwiZGlzYWJsZWQiLCJhdmFpbGFibGUiLCJidXR0b24iLCJhZGRPblByb2R1Y3RzIiwiZm9ybURhdGEiLCJjaGVja0FkZE9ucyIsInNlbGVjdEFkZG9uIiwiY29zdCIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJvblN1Ym1pdCIsImZldGNoIiwiU2hvcGlmeSIsInJvdXRlcyIsInJvb3QiLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbmNhdCIsImNhcnRPcGVuIiwiY2F0Y2giLCJhbGVydCIsInVwZGF0ZVZhcmlhbnQiLCJvcHRpb24iLCJuZXdPcHRpb25zIiwibmV3VmFyaWFudCJdLCJzb3VyY2VSb290IjoiIn0=