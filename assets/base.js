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
window.addEventListener("cartUpdate", function (e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c3JjL3NjcmlwdHMvYmFzZS5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvY2FydC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvaGVhZGVyLWhlaWdodC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3N0eWxlcy9iYXNlLnNjc3MiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFscGluZSBmcm9tICdhbHBpbmVqcydcbmltcG9ydCBjb2xsYXBzZSBmcm9tICdAYWxwaW5lanMvY29sbGFwc2UnXG5cbmltcG9ydCBwcm9kdWN0IGZyb20gJy4vdXRpbHMvcHJvZHVjdCdcblxuaW1wb3J0ICcuL3V0aWxzL2hlYWRlci1oZWlnaHQnXG5pbXBvcnQgJy4vdXRpbHMvY2FydCdcbi8vIGltcG9ydCAnLi9hbmltYXRpb25zL2hlYWRlcidcblxuQWxwaW5lLnBsdWdpbihjb2xsYXBzZSlcblxuQWxwaW5lLmRhdGEoJ3Byb2R1Y3QnLCBwcm9kdWN0KVxuXG53aW5kb3cuQWxwaW5lID0gQWxwaW5lXG5cbkFscGluZS5zdGFydCgpXG4iLCJpbXBvcnQgeyBjb252ZXJ0Q29sb3JWYXJpYWJsZXMgfSBmcm9tICdAbWVydGFzYW4vdGFpbHdpbmRjc3MtdmFyaWFibGVzL3NyYy9oZWxwZXJzJ1xuaW1wb3J0ICogYXMgY2FydCBmcm9tICdAc2hvcGlmeS90aGVtZS1jYXJ0J1xuXG5jYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgY29uc29sZS5sb2coc3RhdGUpXG4gIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG59KVxuXG5mdW5jdGlvbiBjYXJ0VG9BbHBpbmUoc3RhdGUpIHtcbiAgbGV0IHByb2R1Y3RzID0gW11cbiAgaWYgKHN0YXRlLml0ZW1zKSB7XG4gICAgc3RhdGUuaXRlbXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgbGV0IGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuXG4gICAgICAvLyBpZiAoZS5mZWF0dXJlZF9pbWFnZS51cmwpIHtcbiAgICAgIC8vICAgbGV0IGZpbGVuYW1lID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcbiAgICAgIC8vICAgICAucmVwbGFjZSgvXFw/LiokLywgJycpXG4gICAgICAvLyAgICAgLnJlcGxhY2UoLy4qXFwvLywgJycpXG4gICAgICAvLyAgIGxldCBuZXdGaWxlbmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnXzMwMHguanBnJylcbiAgICAgIC8vICAgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsLnJlcGxhY2UoZmlsZW5hbWUsIG5ld0ZpbGVuYW1lKVxuICAgICAgLy8gfVxuXG4gICAgICBjb25zdCByZWFsUHJpY2UgPSBlLnByaWNlIC8gMTAwXG5cbiAgICAgIHByb2R1Y3RzLnB1c2goe1xuICAgICAgICB0aXRsZTogZS5wcm9kdWN0X3RpdGxlLFxuICAgICAgICBrZXk6IGUua2V5LFxuICAgICAgICBwcmljZTogcmVhbFByaWNlLFxuICAgICAgICBpZDogZS52YXJpYW50X2lkLFxuICAgICAgICBvcHRpb25zOiBlLm9wdGlvbnNfd2l0aF92YWx1ZXMsXG4gICAgICAgIGltYWdlOiBmLFxuICAgICAgICBxdHk6IGUucXVhbnRpdHksXG4gICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlKHF0eSkge1xuICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbDogc3RhdGUuaXRlbXNfc3VidG90YWxfcHJpY2UgLyAxMDAsXG4gICAgcHJvZHVjdHM6IHByb2R1Y3RzLFxuICAgIG5vdGU6IHN0YXRlLm5vdGVcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXJ0UmVtb3ZlSXRlbShrZXkpIHtcbiAgY2FydC5yZW1vdmVJdGVtKGtleSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5mdW5jdGlvbiBjYXJ0VXBkYXRlSXRlbShrZXksIHF0eSkge1xuICBjYXJ0LnVwZGF0ZUl0ZW0oa2V5LCB7IHF1YW50aXR5OiBxdHkgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FydFVwZGF0ZUFsbChzdGF0ZSkge1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZXByb2R1Y3RzJywge1xuICAgICAgZGV0YWlsOiB7IGNhcnQ6IGNhcnRUb0FscGluZShzdGF0ZSkgfSxcbiAgICB9KVxuICApXG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydGNvdW50Jywge1xuICAgICAgZGV0YWlsOiB7IGNhcnRUb3RhbDogc3RhdGUuaXRlbV9jb3VudCB9LFxuICAgIH0pXG4gIClcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjYXJ0VXBkYXRlXCIsIChlKSA9PiB7XG4gIGNhcnQudXBkYXRlTm90ZShlLnRhcmdldC52YWx1ZSlcbn0pIiwic2V0SGVhZGVySGVpZ2h0KClcblxuZnVuY3Rpb24gc2V0SGVhZGVySGVpZ2h0KCkge1xuICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykub2Zmc2V0SGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0taGVhZGVyLWhlaWdodCcsIGAke2hlYWRlckhlaWdodH1weGApXG4gIGNvbnN0IGZvb3RlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1mb290ZXItaGVpZ2h0JywgYCR7Zm9vdGVySGVpZ2h0fXB4YClcbiAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0td2luZG93LWhlaWdodCcsIGAke3dpbmRvd0hlaWdodH1weGApXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRIZWFkZXJIZWlnaHQpXG4iLCJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG5pbXBvcnQgKiBhcyBjdXJyZW5jeSBmcm9tICdAc2hvcGlmeS90aGVtZS1jdXJyZW5jeSdcbmltcG9ydCB7IGNhcnRVcGRhdGVBbGwgfSBmcm9tICcuLi91dGlscy9jYXJ0J1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCdcblxuZXhwb3J0IGRlZmF1bHQgKHByb2R1Y3QpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwcm9kdWN0XCIsIHByb2R1Y3QpO1xuICBjb25zdCBjdXJyZW50VmFyaWFudCA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1swXVxuICBjb25zdCB2YXJpYW50cyA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1xuXG4gIGNvbnN0IHByaWNlID0gKHZhcmlhbnRJZCwgc2VsZWN0ZWRBZGRPblByb2R1Y3RzKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coc2VsZWN0ZWRBZGRPblByb2R1Y3RzKTtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXVxuICAgIGxldCBhZGRPblByaWNlID0gMFxuICAgIGlmIChzZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgYWRkT25QcmljZSA9IGFkZE9uUHJpY2UgKyBlLnByaWNlXG4gICAgICB9KVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhhZGRPblByaWNlKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdHVhbFByaWNlOiAnJCcgKyAodmFyaWFudC5wcmljZSArIGFkZE9uUHJpY2UpIC8gMTAwLFxuICAgICAgb3JpZ2luYWxQcmljZTogdmFyaWFudC5jb21wYXJlX2F0X3ByaWNlXG4gICAgICAgID8gJyQnICsgKHZhcmlhbnQuY29tcGFyZV9hdF9wcmljZSArIGFkZE9uUHJpY2UpIC8gMTAwXG4gICAgICAgIDogJycsXG4gICAgICBtZXNzYWdlOiAnJyxcbiAgICB9XG4gIH1cblxuICBjb25zdCBjdXJyZW50T3B0aW9ucyA9ICh2YXJpYW50SWQpID0+IHtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXVxuICAgIGNvbnN0IGN1cnJlbnRPcHRpb25zID0gcHJvZHVjdC5wcm9kdWN0Lm9wdGlvbnMubWFwKChlLCBpKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBlLFxuICAgICAgICB2YWx1ZTogdmFyaWFudC5vcHRpb25zW2ldLFxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGN1cnJlbnRPcHRpb25zXG4gIH1cblxuICBjb25zdCBoYW5kbGVBZGRPbiA9IChpZCwgc2VsZWN0ZWRBZGRPbnMsIHByaWNlKSA9PiB7XG4gICAgbGV0IHVwZGF0ZWRBZGRPbnMgPSBzZWxlY3RlZEFkZE9uc1xuICAgIGNvbnN0IGNoZWNrU3RhdHVzID0gc2VsZWN0ZWRBZGRPbnMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gaWQpXG4gICAgaWYgKGNoZWNrU3RhdHVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHVwZGF0ZWRBZGRPbnMgPSBzZWxlY3RlZEFkZE9ucy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkICE9IGlkKVxuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVkQWRkT25zLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHF0eTogMSxcbiAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZWRBZGRPbnNcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLy9kZWZhdWx0c1xuICAgIHByaWNlOiBwcmljZShjdXJyZW50VmFyaWFudC5pZCwgW10pLFxuICAgIHN1Ym1pdFRleHQ6ICdBZGQgdG8gQ2FydCcsXG4gICAgZGlzYWJsZWQ6IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICBidXR0b246IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/ICdBZGQgdG8gQ2FydCcgOiAnVW5hdmFpbGFibGUnLFxuICAgIGFkZE9uUHJvZHVjdHM6IHByb2R1Y3QuYWRkT25Qcm9kdWN0cyxcbiAgICBzZWxlY3RlZEFkZE9uUHJvZHVjdHM6IFtdLFxuXG4gICAgb3B0aW9uczogY3VycmVudE9wdGlvbnMoY3VycmVudFZhcmlhbnQuaWQpLFxuICAgIC8vICBhdmFpbGFibGVPcHRpb25zOiBhdmFpbGFibGVPcHRpb25zKHRoaXMub3B0aW9ucyksXG5cbiAgICAvL1N0b3JlIGZvciBzZW5kaW5nIHRvIGFkZCBjYXJ0XG4gICAgZm9ybURhdGE6IHtcbiAgICAgIGlkOiBjdXJyZW50VmFyaWFudC5pZCxcbiAgICAgIHF0eTogMSxcbiAgICB9LFxuXG4gICAgLy9mb3JtIGFjdGlvbnNcbiAgICBjaGVja0FkZE9ucyhpZCkge1xuICAgICAgY29uc3QgY2hlY2tTdGF0dXMgPSB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cy5maWx0ZXIoXG4gICAgICAgIChvYmopID0+IG9iai5pZCA9PT0gaWRcbiAgICAgIClcbiAgICAgIGlmIChjaGVja1N0YXR1cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlbGVjdEFkZG9uKGlkLCBzZWxlY3RlZEFkZE9ucywgY29zdCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBoYW5kbGVBZGRPbihpZCwgc2VsZWN0ZWRBZGRPbnMsIGNvc3QpXG4gICAgICB0aGlzLnByaWNlID0gcHJpY2UodGhpcy5mb3JtRGF0YS5pZCwgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMpXG4gICAgICAvLyBjb25zb2xlLmxvZyhoYW5kbGVBZGRPbihpZCwgc2VsZWN0ZWRBZGRPbnMpKVxuICAgIH0sXG4gICAgaW5jcmVhc2UoKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhLnF0eSA9IHRoaXMuZm9ybURhdGEucXR5ICsgMVxuICAgIH0sXG4gICAgZGVjcmVhc2UoKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhLnF0eSA9XG4gICAgICAgIHRoaXMuZm9ybURhdGEucXR5IC0gMSA9PT0gMCA/IDEgOiB0aGlzLmZvcm1EYXRhLnF0eSAtIDFcbiAgICB9LFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgdGhpcy5idXR0b24gPSAnQWRkaW5nLi4uJ1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgIGZldGNoKHdpbmRvdy5TaG9waWZ5LnJvdXRlcy5yb290ICsgJ2NhcnQvYWRkLmpzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZm9ybURhdGEucXR5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLmNvbmNhdCh0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyksXG4gICAgICAgIH0pLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IFtdXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0c3RhdHVzJywge1xuICAgICAgICAgICAgICAgIGRldGFpbDogeyBjYXJ0T3BlbjogdHJ1ZSB9LFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgYWxlcnQoYFRoaXMgcHJvZHVjdCBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50YClcbiAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdVbmF2YWlsYWJsZSdcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgdXBkYXRlVmFyaWFudCh2YWx1ZSwgb3B0aW9uKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXG4gICAgICBjb25zdCBuZXdPcHRpb25zID0gb3B0aW9ucy5tYXAoKGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGUubmFtZSA9PSBvcHRpb24gPyB2YWx1ZSA6IGUudmFsdWVcbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IG5ld1ZhcmlhbnQgPSB2YXJpYW50cy5maWx0ZXIoKHZhcmlhbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGlzRXF1YWwodmFyaWFudC5vcHRpb25zLCBuZXdPcHRpb25zKVxuICAgICAgfSlbMF1cblxuICAgICAgLy8gY29uc29sZS5sb2cobmV3VmFyaWFudCk7XG5cbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZShuZXdWYXJpYW50LmlkLCB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cylcbiAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSBuZXdWYXJpYW50LmlkXG4gICAgICB0aGlzLmRpc2FibGVkID0gbmV3VmFyaWFudC5hdmFpbGFibGUgPyBmYWxzZSA6IHRydWVcbiAgICAgIHRoaXMuYnV0dG9uID0gbmV3VmFyaWFudC5hdmFpbGFibGUgPyAnQWRkIHRvIENhcnQnIDogJ1VuYXZhaWxhYmxlJ1xuICAgICAgdGhpcy5vcHRpb25zID0gY3VycmVudE9wdGlvbnMobmV3VmFyaWFudC5pZClcbiAgICB9LFxuICB9XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSBmdW5jdGlvbihyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpIHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNodW5rSWRzID0gZGVmZXJyZWRbaV1bMF07XG5cdFx0dmFyIGZuID0gZGVmZXJyZWRbaV1bMV07XG5cdFx0dmFyIHByaW9yaXR5ID0gZGVmZXJyZWRbaV1bMl07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pOyB9KSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYmFzZVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IGZ1bmN0aW9uKGNodW5rSWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMDsgfTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlcGljc3VwcmVtZV9zaG9waWZ5XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9iYXNlLmpzXCIpOyB9KVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvYmFzZS5zY3NzXCIpOyB9KVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJBbHBpbmUiLCJjb2xsYXBzZSIsInByb2R1Y3QiLCJwbHVnaW4iLCJkYXRhIiwid2luZG93Iiwic3RhcnQiLCJjb252ZXJ0Q29sb3JWYXJpYWJsZXMiLCJjYXJ0IiwiZ2V0U3RhdGUiLCJ0aGVuIiwic3RhdGUiLCJjb25zb2xlIiwibG9nIiwiY2FydFVwZGF0ZUFsbCIsImNhcnRUb0FscGluZSIsInByb2R1Y3RzIiwiaXRlbXMiLCJmb3JFYWNoIiwiZSIsImYiLCJmZWF0dXJlZF9pbWFnZSIsInVybCIsInJlYWxQcmljZSIsInByaWNlIiwicHVzaCIsInRpdGxlIiwicHJvZHVjdF90aXRsZSIsImtleSIsImlkIiwidmFyaWFudF9pZCIsIm9wdGlvbnMiLCJvcHRpb25zX3dpdGhfdmFsdWVzIiwiaW1hZ2UiLCJxdHkiLCJxdWFudGl0eSIsInJlbW92ZSIsImNhcnRSZW1vdmVJdGVtIiwidXBkYXRlIiwiY2FydFVwZGF0ZUl0ZW0iLCJwYXJzZUludCIsInRvdGFsIiwiaXRlbXNfc3VidG90YWxfcHJpY2UiLCJub3RlIiwicmVtb3ZlSXRlbSIsInVwZGF0ZUl0ZW0iLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJjYXJ0VG90YWwiLCJpdGVtX2NvdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInVwZGF0ZU5vdGUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNldEhlYWRlckhlaWdodCIsImhlYWRlckhlaWdodCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvZmZzZXRIZWlnaHQiLCJib2R5Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImZvb3RlckhlaWdodCIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0IiwiY3VycmVuY3kiLCJpc0VxdWFsIiwiY3VycmVudFZhcmlhbnQiLCJ2YXJpYW50cyIsInZhcmlhbnRJZCIsInNlbGVjdGVkQWRkT25Qcm9kdWN0cyIsInZhcmlhbnQiLCJmaWx0ZXIiLCJvYmoiLCJhZGRPblByaWNlIiwibGVuZ3RoIiwiYWN0dWFsUHJpY2UiLCJvcmlnaW5hbFByaWNlIiwiY29tcGFyZV9hdF9wcmljZSIsIm1lc3NhZ2UiLCJjdXJyZW50T3B0aW9ucyIsIm1hcCIsImkiLCJuYW1lIiwiaGFuZGxlQWRkT24iLCJzZWxlY3RlZEFkZE9ucyIsInVwZGF0ZWRBZGRPbnMiLCJjaGVja1N0YXR1cyIsInN1Ym1pdFRleHQiLCJkaXNhYmxlZCIsImF2YWlsYWJsZSIsImJ1dHRvbiIsImFkZE9uUHJvZHVjdHMiLCJmb3JtRGF0YSIsImNoZWNrQWRkT25zIiwic2VsZWN0QWRkb24iLCJjb3N0IiwiaW5jcmVhc2UiLCJkZWNyZWFzZSIsIm9uU3VibWl0IiwiZmV0Y2giLCJTaG9waWZ5Iiwicm91dGVzIiwicm9vdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwiY29uY2F0IiwiY2FydE9wZW4iLCJjYXRjaCIsImFsZXJ0IiwidXBkYXRlVmFyaWFudCIsIm9wdGlvbiIsIm5ld09wdGlvbnMiLCJuZXdWYXJpYW50Il0sInNvdXJjZVJvb3QiOiIifQ==