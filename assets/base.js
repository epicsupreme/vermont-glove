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
/* harmony import */ var _mertasan_tailwindcss_variables_src_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mertasan/tailwindcss-variables/src/helpers */ "./node_modules/@mertasan/tailwindcss-variables/src/helpers.js");
/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-cart */ "./node_modules/@shopify/theme-cart/theme-cart.js");


_shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__.getState().then(function (state) {
  console.log(state);
  cartUpdateAll(state);
});

function cartToAlpine(state) {
  var products = [];

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
    products: products,
    note: state.note
  };
}

function cartRemoveItem(key) {
  _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__.removeItem(key).then(function (state) {
    cartUpdateAll(state);
  });
}

function cartUpdateItem(key, qty) {
  _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__.updateItem(key, {
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
window.addEventListener('cartUpdate', function (e) {
  _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__.updateNote(e.target.value);
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDLG9IQUFvSCxpREFBaUQ7V0FDcks7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzdCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BELDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBLDhDQUE4Qzs7V0FFOUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxtQ0FBbUM7V0FDcEU7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWxEQTtVQUNBO1VBQ0E7VUFDQSwyREFBMkQsc0RBQXNEO1VBQ2pILHFGQUFxRix1REFBdUQ7VUFDNUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvYmFzZS5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvY2FydC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvaGVhZGVyLWhlaWdodC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3N0eWxlcy9iYXNlLnNjc3M/MDkyNyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWxwaW5lIGZyb20gJ2FscGluZWpzJ1xuaW1wb3J0IGNvbGxhcHNlIGZyb20gJ0BhbHBpbmVqcy9jb2xsYXBzZSdcblxuaW1wb3J0IHByb2R1Y3QgZnJvbSAnLi91dGlscy9wcm9kdWN0J1xuXG5pbXBvcnQgJy4vdXRpbHMvaGVhZGVyLWhlaWdodCdcbmltcG9ydCAnLi91dGlscy9jYXJ0J1xuLy8gaW1wb3J0ICcuL2FuaW1hdGlvbnMvaGVhZGVyJ1xuXG5BbHBpbmUucGx1Z2luKGNvbGxhcHNlKVxuXG5BbHBpbmUuZGF0YSgncHJvZHVjdCcsIHByb2R1Y3QpXG5cbndpbmRvdy5BbHBpbmUgPSBBbHBpbmVcblxuQWxwaW5lLnN0YXJ0KClcbiIsImltcG9ydCB7IGNvbnZlcnRDb2xvclZhcmlhYmxlcyB9IGZyb20gJ0BtZXJ0YXNhbi90YWlsd2luZGNzcy12YXJpYWJsZXMvc3JjL2hlbHBlcnMnXG5pbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG5cbmNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICBjb25zb2xlLmxvZyhzdGF0ZSlcbiAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbn0pXG5cbmZ1bmN0aW9uIGNhcnRUb0FscGluZShzdGF0ZSkge1xuICBsZXQgcHJvZHVjdHMgPSBbXVxuICBpZiAoc3RhdGUuaXRlbXMpIHtcbiAgICBzdGF0ZS5pdGVtcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBsZXQgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsXG5cbiAgICAgIC8vIGlmIChlLmZlYXR1cmVkX2ltYWdlLnVybCkge1xuICAgICAgLy8gICBsZXQgZmlsZW5hbWUgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuICAgICAgLy8gICAgIC5yZXBsYWNlKC9cXD8uKiQvLCAnJylcbiAgICAgIC8vICAgICAucmVwbGFjZSgvLipcXC8vLCAnJylcbiAgICAgIC8vICAgbGV0IG5ld0ZpbGVuYW1lID0gZmlsZW5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICdfMzAweC5qcGcnKVxuICAgICAgLy8gICBmID0gZS5mZWF0dXJlZF9pbWFnZS51cmwucmVwbGFjZShmaWxlbmFtZSwgbmV3RmlsZW5hbWUpXG4gICAgICAvLyB9XG5cbiAgICAgIGNvbnN0IHJlYWxQcmljZSA9IGUucHJpY2UgLyAxMDBcblxuICAgICAgcHJvZHVjdHMucHVzaCh7XG4gICAgICAgIHRpdGxlOiBlLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgIGtleTogZS5rZXksXG4gICAgICAgIHByaWNlOiByZWFsUHJpY2UsXG4gICAgICAgIGlkOiBlLnZhcmlhbnRfaWQsXG4gICAgICAgIG9wdGlvbnM6IGUub3B0aW9uc193aXRoX3ZhbHVlcyxcbiAgICAgICAgaW1hZ2U6IGYsXG4gICAgICAgIHF0eTogZS5xdWFudGl0eSxcbiAgICAgICAgcmVtb3ZlKCkge1xuICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKHRoaXMua2V5KVxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGUocXR5KSB7XG4gICAgICAgICAgY2FydFVwZGF0ZUl0ZW0odGhpcy5rZXksIHBhcnNlSW50KHF0eSkpXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsOiBzdGF0ZS5pdGVtc19zdWJ0b3RhbF9wcmljZSAvIDEwMCxcbiAgICBwcm9kdWN0czogcHJvZHVjdHMsXG4gICAgbm90ZTogc3RhdGUubm90ZSxcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXJ0UmVtb3ZlSXRlbShrZXkpIHtcbiAgY2FydC5yZW1vdmVJdGVtKGtleSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5mdW5jdGlvbiBjYXJ0VXBkYXRlSXRlbShrZXksIHF0eSkge1xuICBjYXJ0LnVwZGF0ZUl0ZW0oa2V5LCB7IHF1YW50aXR5OiBxdHkgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FydFVwZGF0ZUFsbChzdGF0ZSkge1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZXByb2R1Y3RzJywge1xuICAgICAgZGV0YWlsOiB7IGNhcnQ6IGNhcnRUb0FscGluZShzdGF0ZSkgfSxcbiAgICB9KVxuICApXG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydGNvdW50Jywge1xuICAgICAgZGV0YWlsOiB7IGNhcnRUb3RhbDogc3RhdGUuaXRlbV9jb3VudCB9LFxuICAgIH0pXG4gIClcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NhcnRVcGRhdGUnLCAoZSkgPT4ge1xuICBjYXJ0LnVwZGF0ZU5vdGUoZS50YXJnZXQudmFsdWUpXG59KVxuIiwic2V0SGVhZGVySGVpZ2h0KClcblxuZnVuY3Rpb24gc2V0SGVhZGVySGVpZ2h0KCkge1xuICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykub2Zmc2V0SGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0taGVhZGVyLWhlaWdodCcsIGAke2hlYWRlckhlaWdodH1weGApXG4gIGNvbnN0IGZvb3RlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1mb290ZXItaGVpZ2h0JywgYCR7Zm9vdGVySGVpZ2h0fXB4YClcbiAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0td2luZG93LWhlaWdodCcsIGAke3dpbmRvd0hlaWdodH1weGApXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRIZWFkZXJIZWlnaHQpXG4iLCJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG5pbXBvcnQgKiBhcyBjdXJyZW5jeSBmcm9tICdAc2hvcGlmeS90aGVtZS1jdXJyZW5jeSdcbmltcG9ydCB7IGNhcnRVcGRhdGVBbGwgfSBmcm9tICcuLi91dGlscy9jYXJ0J1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCdcblxuZXhwb3J0IGRlZmF1bHQgKHByb2R1Y3QpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwcm9kdWN0XCIsIHByb2R1Y3QpO1xuICBjb25zdCBjdXJyZW50VmFyaWFudCA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1swXVxuICBjb25zdCB2YXJpYW50cyA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1xuXG4gIGNvbnN0IHByaWNlID0gKHZhcmlhbnRJZCwgc2VsZWN0ZWRBZGRPblByb2R1Y3RzKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coc2VsZWN0ZWRBZGRPblByb2R1Y3RzKTtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXVxuICAgIGxldCBhZGRPblByaWNlID0gMFxuICAgIGlmIChzZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgYWRkT25QcmljZSA9IGFkZE9uUHJpY2UgKyBlLnByaWNlXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhY3R1YWxQcmljZTogJyQnICsgKHZhcmlhbnQucHJpY2UgKyBhZGRPblByaWNlKSAvIDEwMCxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IHZhcmlhbnQuY29tcGFyZV9hdF9wcmljZVxuICAgICAgICA/ICckJyArICh2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2UgKyBhZGRPblByaWNlKSAvIDEwMFxuICAgICAgICA6ICcnLFxuICAgICAgbWVzc2FnZTogJycsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY3VycmVudE9wdGlvbnMgPSAodmFyaWFudElkKSA9PiB7XG4gICAgY29uc3QgdmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IHZhcmlhbnRJZClbMF1cbiAgICBjb25zdCBjdXJyZW50T3B0aW9ucyA9IHByb2R1Y3QucHJvZHVjdC5vcHRpb25zLm1hcCgoZSwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogZSxcbiAgICAgICAgdmFsdWU6IHZhcmlhbnQub3B0aW9uc1tpXSxcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBjdXJyZW50T3B0aW9uc1xuICB9XG5cbiAgY29uc3QgaGFuZGxlQWRkT24gPSAoaWQsIHNlbGVjdGVkQWRkT25zLCBwcmljZSkgPT4ge1xuICAgIGxldCB1cGRhdGVkQWRkT25zID0gc2VsZWN0ZWRBZGRPbnNcbiAgICBjb25zdCBjaGVja1N0YXR1cyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IGlkKVxuICAgIGlmIChjaGVja1N0YXR1cy5sZW5ndGggPiAwKSB7XG4gICAgICB1cGRhdGVkQWRkT25zID0gc2VsZWN0ZWRBZGRPbnMuZmlsdGVyKChvYmopID0+IG9iai5pZCAhPSBpZClcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlZEFkZE9ucy5wdXNoKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBxdHk6IDEsXG4gICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB1cGRhdGVkQWRkT25zXG4gIH1cblxuICByZXR1cm4ge1xuICAgIC8vZGVmYXVsdHNcbiAgICBwcmljZTogcHJpY2UoY3VycmVudFZhcmlhbnQuaWQsIFtdKSxcbiAgICBzdWJtaXRUZXh0OiAnQWRkIHRvIENhcnQnLFxuICAgIGRpc2FibGVkOiBjdXJyZW50VmFyaWFudC5hdmFpbGFibGUgPyBmYWxzZSA6IHRydWUsXG4gICAgYnV0dG9uOiBjdXJyZW50VmFyaWFudC5hdmFpbGFibGUgPyAnQWRkIHRvIENhcnQnIDogJ1VuYXZhaWxhYmxlJyxcbiAgICBhZGRPblByb2R1Y3RzOiBwcm9kdWN0LmFkZE9uUHJvZHVjdHMsXG4gICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzOiBbXSxcblxuICAgIG9wdGlvbnM6IGN1cnJlbnRPcHRpb25zKGN1cnJlbnRWYXJpYW50LmlkKSxcbiAgICAvLyAgYXZhaWxhYmxlT3B0aW9uczogYXZhaWxhYmxlT3B0aW9ucyh0aGlzLm9wdGlvbnMpLFxuXG4gICAgLy9TdG9yZSBmb3Igc2VuZGluZyB0byBhZGQgY2FydFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICBpZDogY3VycmVudFZhcmlhbnQuaWQsXG4gICAgICBxdHk6IDEsXG4gICAgfSxcblxuICAgIC8vZm9ybSBhY3Rpb25zXG4gICAgY2hlY2tBZGRPbnMoaWQpIHtcbiAgICAgIGNvbnN0IGNoZWNrU3RhdHVzID0gdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMuZmlsdGVyKFxuICAgICAgICAob2JqKSA9PiBvYmouaWQgPT09IGlkXG4gICAgICApXG4gICAgICBpZiAoY2hlY2tTdGF0dXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3RBZGRvbihpZCwgc2VsZWN0ZWRBZGRPbnMsIGNvc3QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gaGFuZGxlQWRkT24oaWQsIHNlbGVjdGVkQWRkT25zLCBjb3N0KVxuICAgICAgdGhpcy5wcmljZSA9IHByaWNlKHRoaXMuZm9ybURhdGEuaWQsIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzKVxuICAgICAgLy8gY29uc29sZS5sb2coaGFuZGxlQWRkT24oaWQsIHNlbGVjdGVkQWRkT25zKSlcbiAgICB9LFxuICAgIGluY3JlYXNlKCkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPSB0aGlzLmZvcm1EYXRhLnF0eSArIDFcbiAgICB9LFxuICAgIGRlY3JlYXNlKCkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPVxuICAgICAgICB0aGlzLmZvcm1EYXRhLnF0eSAtIDEgPT09IDAgPyAxIDogdGhpcy5mb3JtRGF0YS5xdHkgLSAxXG4gICAgfSxcbiAgICBvblN1Ym1pdCgpIHtcbiAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZGluZy4uLidcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArICdjYXJ0L2FkZC5qcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IHRoaXMuZm9ybURhdGEuaWQsXG4gICAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLmZvcm1EYXRhLnF0eSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXS5jb25jYXQodGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMpLFxuICAgICAgICB9KSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdBZGQgdG8gQ2FydCdcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBbXVxuICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydHN0YXR1cycsIHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHsgY2FydE9wZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApXG4gICAgICAgICAgdGhpcy5idXR0b24gPSAnVW5hdmFpbGFibGUnXG4gICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHVwZGF0ZVZhcmlhbnQodmFsdWUsIG9wdGlvbikge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgICAgY29uc3QgbmV3T3B0aW9ucyA9IG9wdGlvbnMubWFwKChlKSA9PiB7XG4gICAgICAgIHJldHVybiBlLm5hbWUgPT0gb3B0aW9uID8gdmFsdWUgOiBlLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBjb25zdCBuZXdWYXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKCh2YXJpYW50KSA9PiB7XG4gICAgICAgIHJldHVybiBpc0VxdWFsKHZhcmlhbnQub3B0aW9ucywgbmV3T3B0aW9ucylcbiAgICAgIH0pWzBdXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1ZhcmlhbnQpO1xuXG4gICAgICB0aGlzLnByaWNlID0gcHJpY2UobmV3VmFyaWFudC5pZCwgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMpXG4gICAgICB0aGlzLmZvcm1EYXRhLmlkID0gbmV3VmFyaWFudC5pZFxuICAgICAgdGhpcy5kaXNhYmxlZCA9IG5ld1ZhcmlhbnQuYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlXG4gICAgICB0aGlzLmJ1dHRvbiA9IG5ld1ZhcmlhbnQuYXZhaWxhYmxlID8gJ0FkZCB0byBDYXJ0JyA6ICdVbmF2YWlsYWJsZSdcbiAgICAgIHRoaXMub3B0aW9ucyA9IGN1cnJlbnRPcHRpb25zKG5ld1ZhcmlhbnQuaWQpXG4gICAgfSxcbiAgfVxufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImJhc2VcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvYmFzZS5qc1wiKTsgfSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzc1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiQWxwaW5lIiwiY29sbGFwc2UiLCJwcm9kdWN0IiwicGx1Z2luIiwiZGF0YSIsIndpbmRvdyIsInN0YXJ0IiwiY29udmVydENvbG9yVmFyaWFibGVzIiwiY2FydCIsImdldFN0YXRlIiwidGhlbiIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsImNhcnRVcGRhdGVBbGwiLCJjYXJ0VG9BbHBpbmUiLCJwcm9kdWN0cyIsIml0ZW1zIiwiZm9yRWFjaCIsImUiLCJmIiwiZmVhdHVyZWRfaW1hZ2UiLCJ1cmwiLCJyZWFsUHJpY2UiLCJwcmljZSIsInB1c2giLCJ0aXRsZSIsInByb2R1Y3RfdGl0bGUiLCJrZXkiLCJpZCIsInZhcmlhbnRfaWQiLCJvcHRpb25zIiwib3B0aW9uc193aXRoX3ZhbHVlcyIsImltYWdlIiwicXR5IiwicXVhbnRpdHkiLCJyZW1vdmUiLCJjYXJ0UmVtb3ZlSXRlbSIsInVwZGF0ZSIsImNhcnRVcGRhdGVJdGVtIiwicGFyc2VJbnQiLCJ0b3RhbCIsIml0ZW1zX3N1YnRvdGFsX3ByaWNlIiwibm90ZSIsInJlbW92ZUl0ZW0iLCJ1cGRhdGVJdGVtIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiY2FydFRvdGFsIiwiaXRlbV9jb3VudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cGRhdGVOb3RlIiwidGFyZ2V0IiwidmFsdWUiLCJzZXRIZWFkZXJIZWlnaHQiLCJoZWFkZXJIZWlnaHQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwib2Zmc2V0SGVpZ2h0IiwiYm9keSIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJmb290ZXJIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJpbm5lckhlaWdodCIsImN1cnJlbmN5IiwiaXNFcXVhbCIsImN1cnJlbnRWYXJpYW50IiwidmFyaWFudHMiLCJ2YXJpYW50SWQiLCJzZWxlY3RlZEFkZE9uUHJvZHVjdHMiLCJ2YXJpYW50IiwiZmlsdGVyIiwib2JqIiwiYWRkT25QcmljZSIsImxlbmd0aCIsImFjdHVhbFByaWNlIiwib3JpZ2luYWxQcmljZSIsImNvbXBhcmVfYXRfcHJpY2UiLCJtZXNzYWdlIiwiY3VycmVudE9wdGlvbnMiLCJtYXAiLCJpIiwibmFtZSIsImhhbmRsZUFkZE9uIiwic2VsZWN0ZWRBZGRPbnMiLCJ1cGRhdGVkQWRkT25zIiwiY2hlY2tTdGF0dXMiLCJzdWJtaXRUZXh0IiwiZGlzYWJsZWQiLCJhdmFpbGFibGUiLCJidXR0b24iLCJhZGRPblByb2R1Y3RzIiwiZm9ybURhdGEiLCJjaGVja0FkZE9ucyIsInNlbGVjdEFkZG9uIiwiY29zdCIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJvblN1Ym1pdCIsImZldGNoIiwiU2hvcGlmeSIsInJvdXRlcyIsInJvb3QiLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbmNhdCIsImNhcnRPcGVuIiwiY2F0Y2giLCJhbGVydCIsInVwZGF0ZVZhcmlhbnQiLCJvcHRpb24iLCJuZXdPcHRpb25zIiwibmV3VmFyaWFudCJdLCJzb3VyY2VSb290IjoiIn0=