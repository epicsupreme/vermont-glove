/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/add-to-cart.js":
/*!***********************************************!*\
  !*** ./src/scripts/components/add-to-cart.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-cart */ "./node_modules/@shopify/theme-cart/theme-cart.js");
/* harmony import */ var _utils_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/cart */ "./src/scripts/utils/cart.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
 // import * as product from '@shopify/theme-product';




window.productData = function () {
  // console.log(productJson);
  return {
    price: productJson.variants[0].price / 100,
    disabled: productJson.variants[0].available ? false : true,
    button: productJson.variants[0].available ? 'Add to Cart' : 'Sold Out',
    options: productJson.variants[0].options,
    product: productJson,
    formData: {
      qty: 1,
      id: productJson.variants[0].id
    },
    qtyChange: function qtyChange(qty) {
      this.formData.qty = qty;
    },
    onSubmit: function onSubmit() {
      var _this = this;

      this.button = 'Adding to Cart...';
      this.disabled = true;
      _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.addItem(this.formData.id, {
        quantity: this.formData.qty
      }).then(function () {
        _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.getState().then(function (state) {
          (0,_utils_cart__WEBPACK_IMPORTED_MODULE_1__.cartUpdateAll)(state);
          _this.button = 'Add to Cart';
          _this.disabled = false;
          window.dispatchEvent(new CustomEvent('updatecartstatus', {
            detail: {
              cartOpen: true
            }
          }));
        });
      }).catch(function () {
        alert("This product is unavailable at the moment");
        _this.button = 'Unavailable';
        _this.disabled = true;
      });
    },
    update: function update(option, index) {
      // console.log(option, parseInt(index))
      // this.options[parseInt(index)] = option
      // const oldOptions = this.options
      // oldOptions[parseInt(index)] = option
      // console.log(this.options)
      // const a = Array.from(oldOptions)
      var optionsArray = [];
      var productForm = document.getElementById('product-form');
      productForm.querySelectorAll("[name*=options]").forEach(function (e) {
        if (e.tagName === 'SELECT') {
          optionsArray.push(e.value);
        } else {
          if (e.checked) {
            optionsArray.push(e.value);
          }
        }
      }); // console.log(optionsArray)

      var variant = getVariantFromOptionArray(this.product.variants, optionsArray); // console.log(variant)
      // console.log(productJson.variants)

      if (variant) {
        this.formData.id = variant.id;
        this.price = variant.price / 100;

        if (!variant.available) {
          this.disabled = true;
          this.button = 'Sold Out';
        } else {
          this.disabled = false;
          this.button = 'Add to Cart';
        }
      } else {
        this.formData.id = null; // this.price = variant.price / 100

        this.disabled = true;
        this.button = 'Unavailable';
      }
    }
  };
};

function getVariantFromOptionArray(product, opts) {
  console.log(product);
  var result = product.filter(function (v) {
    console.log(v.options);
    console.log(opts);
    console.log((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(v.options, opts));
    return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(v.options, opts);
  }); // console.log(result)

  return result[0] || null;
} // function arrayEquals(a, b) {
//   return Array.isArray(a) &&
//     Array.isArray(b) &&
//     a.length === b.length &&
//     a.every((val, index) => val === b[index]);
// }

/***/ }),

/***/ "./src/scripts/utils/cart.js":
/*!***********************************!*\
  !*** ./src/scripts/utils/cart.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cartUpdateAll": function() { return /* binding */ cartUpdateAll; }
/* harmony export */ });
/* harmony import */ var _mertasan_tailwindcss_variables_src_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mertasan/tailwindcss-variables/src/helpers */ "./node_modules/@mertasan/tailwindcss-variables/src/helpers.js");
/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-cart */ "./node_modules/@shopify/theme-cart/theme-cart.js");


_shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__.getState().then(function (state) {
  // console.log(state)
  cartUpdateAll(state);
});

function cartToAlpine(state) {
  var products = [];

  if (state.items) {
    state.items.forEach(function (e) {
      var _e$properties;

      var f = e.featured_image.url; // if (e.featured_image.url) {
      //   let filename = e.featured_image.url
      //     .replace(/\?.*$/, '')
      //     .replace(/.*\//, '')
      //   let newFilename = filename.replace(/\.[^/.]+$/, '_300x.jpg')
      //   f = e.featured_image.url.replace(filename, newFilename)
      // }

      var realPrice = e.price / 100;
      var addOnProducts = state.items.map(function (p) {
        var _p$properties;

        if (((_p$properties = p.properties) === null || _p$properties === void 0 ? void 0 : _p$properties.cartParent) === e.key) {
          return {
            title: p.product_title,
            key: p.key,
            price: p.price / 100,
            id: p.variant_id,
            options: p.options_with_values,
            image: p.featured_image.url,
            qty: p.quantity,
            properties: p.properties,
            remove: function remove() {
              cartRemoveItem(this.key);
            },
            update: function update(qty) {
              cartUpdateItem(this.key, parseInt(qty));
            }
          };
        }

        return false;
      }).filter(function (e) {
        return e;
      }); // console.log(addOnProducts)

      if (!((_e$properties = e.properties) !== null && _e$properties !== void 0 && _e$properties.cartParent)) {
        products.push({
          title: e.product_title,
          key: e.key,
          price: realPrice,
          id: e.variant_id,
          options: e.options_with_values,
          image: f,
          addOnProducts: addOnProducts,
          qty: e.quantity,
          properties: e.properties,
          remove: function remove() {
            cartRemoveItem(this.key);
          },
          update: function update(qty) {
            cartUpdateItem(this.key, parseInt(qty));
          }
        });
      }
    });
  }

  return {
    total: state.items_subtotal_price / 100,
    products: products,
    note: state.note
  };
}

function cartRemoveItem(key) {
  var removeProducts = {};
  _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__.getState().then(function (state) {
    console.log(state);
    var addOnRemove = state.items.forEach(function (item) {
      if (key === item.properties.cartParent) {
        removeProducts[item.key] = 0;
      }
    });
    var parentItem = state.items.find(function (item) {
      return key === item.key;
    });
    removeProducts[parentItem.key] = 0;
    console.log(removeProducts);
    fetch(window.Shopify.routes.root + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: removeProducts
      })
    }).then(function () {
      _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__.getState().then(function (state) {
        cartUpdateAll(state);
      });
    }).catch(function (e) {
      console.log(e);
    });
  }); // cart.removeItem(key).then((state) => {
  //   cartUpdateAll(state)
  // })
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
/******/ 			"component-add-to-cart": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/scripts/components/add-to-cart.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2FkZC10by1jYXJ0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9jYXJ0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcbi8vIGltcG9ydCAqIGFzIHByb2R1Y3QgZnJvbSAnQHNob3BpZnkvdGhlbWUtcHJvZHVjdCc7XG5pbXBvcnQgeyBjYXJ0VXBkYXRlQWxsIH0gZnJvbSAnLi4vdXRpbHMvY2FydCdcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnXG5cbndpbmRvdy5wcm9kdWN0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gY29uc29sZS5sb2cocHJvZHVjdEpzb24pO1xuICByZXR1cm4ge1xuICAgIHByaWNlOiBwcm9kdWN0SnNvbi52YXJpYW50c1swXS5wcmljZSAvIDEwMCxcbiAgICBkaXNhYmxlZDogcHJvZHVjdEpzb24udmFyaWFudHNbMF0uYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlLFxuICAgIGJ1dHRvbjogcHJvZHVjdEpzb24udmFyaWFudHNbMF0uYXZhaWxhYmxlID8gJ0FkZCB0byBDYXJ0JyA6ICdTb2xkIE91dCcsXG4gICAgb3B0aW9uczogcHJvZHVjdEpzb24udmFyaWFudHNbMF0ub3B0aW9ucyxcbiAgICBwcm9kdWN0OiBwcm9kdWN0SnNvbixcbiAgICBmb3JtRGF0YToge1xuICAgICAgcXR5OiAxLFxuICAgICAgaWQ6IHByb2R1Y3RKc29uLnZhcmlhbnRzWzBdLmlkLFxuICAgIH0sXG4gICAgcXR5Q2hhbmdlKHF0eSkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPSBxdHlcbiAgICB9LFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgdGhpcy5idXR0b24gPSAnQWRkaW5nIHRvIENhcnQuLi4nXG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgY2FydFxuICAgICAgICAuYWRkSXRlbSh0aGlzLmZvcm1EYXRhLmlkLCB7IHF1YW50aXR5OiB0aGlzLmZvcm1EYXRhLnF0eSB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICAgICAgdGhpcy5idXR0b24gPSAnQWRkIHRvIENhcnQnXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRzdGF0dXMnLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7IGNhcnRPcGVuOiB0cnVlIH0sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICBhbGVydChgVGhpcyBwcm9kdWN0IGlzIHVuYXZhaWxhYmxlIGF0IHRoZSBtb21lbnRgKVxuICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ1VuYXZhaWxhYmxlJ1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICB1cGRhdGUob3B0aW9uLCBpbmRleCkge1xuICAgICAgLy8gY29uc29sZS5sb2cob3B0aW9uLCBwYXJzZUludChpbmRleCkpXG4gICAgICAvLyB0aGlzLm9wdGlvbnNbcGFyc2VJbnQoaW5kZXgpXSA9IG9wdGlvblxuICAgICAgLy8gY29uc3Qgb2xkT3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgICAgLy8gb2xkT3B0aW9uc1twYXJzZUludChpbmRleCldID0gb3B0aW9uXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnMpXG4gICAgICAvLyBjb25zdCBhID0gQXJyYXkuZnJvbShvbGRPcHRpb25zKVxuICAgICAgbGV0IG9wdGlvbnNBcnJheSA9IFtdXG4gICAgICBjb25zdCBwcm9kdWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9kdWN0LWZvcm0nKVxuICAgICAgcHJvZHVjdEZvcm0ucXVlcnlTZWxlY3RvckFsbChgW25hbWUqPW9wdGlvbnNdYCkuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YWdOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICAgIG9wdGlvbnNBcnJheS5wdXNoKGUudmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGUuY2hlY2tlZCkge1xuICAgICAgICAgICAgb3B0aW9uc0FycmF5LnB1c2goZS52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyBjb25zb2xlLmxvZyhvcHRpb25zQXJyYXkpXG4gICAgICBjb25zdCB2YXJpYW50ID0gZ2V0VmFyaWFudEZyb21PcHRpb25BcnJheShcbiAgICAgICAgdGhpcy5wcm9kdWN0LnZhcmlhbnRzLFxuICAgICAgICBvcHRpb25zQXJyYXlcbiAgICAgIClcbiAgICAgIC8vIGNvbnNvbGUubG9nKHZhcmlhbnQpXG4gICAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0SnNvbi52YXJpYW50cylcblxuICAgICAgaWYgKHZhcmlhbnQpIHtcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5pZCA9IHZhcmlhbnQuaWRcbiAgICAgICAgdGhpcy5wcmljZSA9IHZhcmlhbnQucHJpY2UgLyAxMDBcbiAgICAgICAgaWYgKCF2YXJpYW50LmF2YWlsYWJsZSkge1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgdGhpcy5idXR0b24gPSAnU29sZCBPdXQnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5idXR0b24gPSAnQWRkIHRvIENhcnQnXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSBudWxsXG4gICAgICAgIC8vIHRoaXMucHJpY2UgPSB2YXJpYW50LnByaWNlIC8gMTAwXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuYnV0dG9uID0gJ1VuYXZhaWxhYmxlJ1xuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VmFyaWFudEZyb21PcHRpb25BcnJheShwcm9kdWN0LCBvcHRzKSB7XG4gIGNvbnNvbGUubG9nKHByb2R1Y3QpXG5cbiAgdmFyIHJlc3VsdCA9IHByb2R1Y3QuZmlsdGVyKCh2KSA9PiB7XG4gICAgY29uc29sZS5sb2codi5vcHRpb25zKVxuICAgIGNvbnNvbGUubG9nKG9wdHMpXG4gICAgY29uc29sZS5sb2coaXNFcXVhbCh2Lm9wdGlvbnMsIG9wdHMpKVxuICAgIHJldHVybiBpc0VxdWFsKHYub3B0aW9ucywgb3B0cylcbiAgfSlcblxuICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpXG5cbiAgcmV0dXJuIHJlc3VsdFswXSB8fCBudWxsXG59XG5cbi8vIGZ1bmN0aW9uIGFycmF5RXF1YWxzKGEsIGIpIHtcbi8vICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSkgJiZcbi8vICAgICBBcnJheS5pc0FycmF5KGIpICYmXG4vLyAgICAgYS5sZW5ndGggPT09IGIubGVuZ3RoICYmXG4vLyAgICAgYS5ldmVyeSgodmFsLCBpbmRleCkgPT4gdmFsID09PSBiW2luZGV4XSk7XG4vLyB9XG4iLCJpbXBvcnQgeyBjb252ZXJ0Q29sb3JWYXJpYWJsZXMgfSBmcm9tICdAbWVydGFzYW4vdGFpbHdpbmRjc3MtdmFyaWFibGVzL3NyYy9oZWxwZXJzJ1xuaW1wb3J0ICogYXMgY2FydCBmcm9tICdAc2hvcGlmeS90aGVtZS1jYXJ0J1xuXG5jYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgLy8gY29uc29sZS5sb2coc3RhdGUpXG4gIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG59KVxuXG5mdW5jdGlvbiBjYXJ0VG9BbHBpbmUoc3RhdGUpIHtcbiAgbGV0IHByb2R1Y3RzID0gW11cbiAgaWYgKHN0YXRlLml0ZW1zKSB7XG4gICAgc3RhdGUuaXRlbXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgbGV0IGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuXG4gICAgICAvLyBpZiAoZS5mZWF0dXJlZF9pbWFnZS51cmwpIHtcbiAgICAgIC8vICAgbGV0IGZpbGVuYW1lID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcbiAgICAgIC8vICAgICAucmVwbGFjZSgvXFw/LiokLywgJycpXG4gICAgICAvLyAgICAgLnJlcGxhY2UoLy4qXFwvLywgJycpXG4gICAgICAvLyAgIGxldCBuZXdGaWxlbmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnXzMwMHguanBnJylcbiAgICAgIC8vICAgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsLnJlcGxhY2UoZmlsZW5hbWUsIG5ld0ZpbGVuYW1lKVxuICAgICAgLy8gfVxuXG4gICAgICBjb25zdCByZWFsUHJpY2UgPSBlLnByaWNlIC8gMTAwXG5cbiAgICAgIGNvbnN0IGFkZE9uUHJvZHVjdHMgPSBzdGF0ZS5pdGVtc1xuICAgICAgICAubWFwKChwKSA9PiB7XG4gICAgICAgICAgaWYgKHAucHJvcGVydGllcz8uY2FydFBhcmVudCA9PT0gZS5rZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBwLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAgICAgIGtleTogcC5rZXksXG4gICAgICAgICAgICAgIHByaWNlOiBwLnByaWNlIC8gMTAwLFxuICAgICAgICAgICAgICBpZDogcC52YXJpYW50X2lkLFxuICAgICAgICAgICAgICBvcHRpb25zOiBwLm9wdGlvbnNfd2l0aF92YWx1ZXMsXG4gICAgICAgICAgICAgIGltYWdlOiBwLmZlYXR1cmVkX2ltYWdlLnVybCxcbiAgICAgICAgICAgICAgcXR5OiBwLnF1YW50aXR5LFxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwLnByb3BlcnRpZXMsXG4gICAgICAgICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdXBkYXRlKHF0eSkge1xuICAgICAgICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBlXG4gICAgICAgIH0pXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGFkZE9uUHJvZHVjdHMpXG5cbiAgICAgIGlmICghZS5wcm9wZXJ0aWVzPy5jYXJ0UGFyZW50KSB7XG4gICAgICAgIHByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBlLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAga2V5OiBlLmtleSxcbiAgICAgICAgICBwcmljZTogcmVhbFByaWNlLFxuICAgICAgICAgIGlkOiBlLnZhcmlhbnRfaWQsXG4gICAgICAgICAgb3B0aW9uczogZS5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICAgIGltYWdlOiBmLFxuICAgICAgICAgIGFkZE9uUHJvZHVjdHM6IGFkZE9uUHJvZHVjdHMsXG4gICAgICAgICAgcXR5OiBlLnF1YW50aXR5LFxuICAgICAgICAgIHByb3BlcnRpZXM6IGUucHJvcGVydGllcyxcbiAgICAgICAgICByZW1vdmUoKSB7XG4gICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZShxdHkpIHtcbiAgICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG90YWw6IHN0YXRlLml0ZW1zX3N1YnRvdGFsX3ByaWNlIC8gMTAwLFxuICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcbiAgICBub3RlOiBzdGF0ZS5ub3RlLFxuICB9XG59XG5cbmZ1bmN0aW9uIGNhcnRSZW1vdmVJdGVtKGtleSkge1xuICBsZXQgcmVtb3ZlUHJvZHVjdHMgPSB7fVxuXG4gIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHN0YXRlKVxuICAgIGNvbnN0IGFkZE9uUmVtb3ZlID0gc3RhdGUuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gaXRlbS5wcm9wZXJ0aWVzLmNhcnRQYXJlbnQpIHtcbiAgICAgICAgcmVtb3ZlUHJvZHVjdHNbaXRlbS5rZXldID0gMFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBwYXJlbnRJdGVtID0gc3RhdGUuaXRlbXMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGtleSA9PT0gaXRlbS5rZXlcbiAgICB9KVxuXG4gICAgcmVtb3ZlUHJvZHVjdHNbcGFyZW50SXRlbS5rZXldID0gMFxuXG4gICAgY29uc29sZS5sb2cocmVtb3ZlUHJvZHVjdHMpXG5cbiAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArICdjYXJ0L3VwZGF0ZS5qcycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdXBkYXRlczogcmVtb3ZlUHJvZHVjdHMsXG4gICAgICB9KSxcbiAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgfSlcbiAgfSlcblxuICAvLyBjYXJ0LnJlbW92ZUl0ZW0oa2V5KS50aGVuKChzdGF0ZSkgPT4ge1xuICAvLyAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIC8vIH0pXG59XG5cbmZ1bmN0aW9uIGNhcnRVcGRhdGVJdGVtKGtleSwgcXR5KSB7XG4gIGNhcnQudXBkYXRlSXRlbShrZXksIHsgcXVhbnRpdHk6IHF0eSB9KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJ0VXBkYXRlQWxsKHN0YXRlKSB7XG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlcHJvZHVjdHMnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydDogY2FydFRvQWxwaW5lKHN0YXRlKSB9LFxuICAgIH0pXG4gIClcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0Y291bnQnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydFRvdGFsOiBzdGF0ZS5pdGVtX2NvdW50IH0sXG4gICAgfSlcbiAgKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2FydFVwZGF0ZScsIChlKSA9PiB7XG4gIGNhcnQudXBkYXRlTm90ZShlLnRhcmdldC52YWx1ZSlcbn0pXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSBmdW5jdGlvbihyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpIHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNodW5rSWRzID0gZGVmZXJyZWRbaV1bMF07XG5cdFx0dmFyIGZuID0gZGVmZXJyZWRbaV1bMV07XG5cdFx0dmFyIHByaW9yaXR5ID0gZGVmZXJyZWRbaV1bMl07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pOyB9KSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiY29tcG9uZW50LWFkZC10by1jYXJ0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlcGljc3VwcmVtZV9zaG9waWZ5XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9hZGQtdG8tY2FydC5qc1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiY2FydCIsImNhcnRVcGRhdGVBbGwiLCJpc0VxdWFsIiwid2luZG93IiwicHJvZHVjdERhdGEiLCJwcmljZSIsInByb2R1Y3RKc29uIiwidmFyaWFudHMiLCJkaXNhYmxlZCIsImF2YWlsYWJsZSIsImJ1dHRvbiIsIm9wdGlvbnMiLCJwcm9kdWN0IiwiZm9ybURhdGEiLCJxdHkiLCJpZCIsInF0eUNoYW5nZSIsIm9uU3VibWl0IiwiYWRkSXRlbSIsInF1YW50aXR5IiwidGhlbiIsImdldFN0YXRlIiwic3RhdGUiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJjYXJ0T3BlbiIsImNhdGNoIiwiYWxlcnQiLCJ1cGRhdGUiLCJvcHRpb24iLCJpbmRleCIsIm9wdGlvbnNBcnJheSIsInByb2R1Y3RGb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZSIsInRhZ05hbWUiLCJwdXNoIiwidmFsdWUiLCJjaGVja2VkIiwidmFyaWFudCIsImdldFZhcmlhbnRGcm9tT3B0aW9uQXJyYXkiLCJvcHRzIiwiY29uc29sZSIsImxvZyIsInJlc3VsdCIsImZpbHRlciIsInYiLCJjb252ZXJ0Q29sb3JWYXJpYWJsZXMiLCJjYXJ0VG9BbHBpbmUiLCJwcm9kdWN0cyIsIml0ZW1zIiwiZiIsImZlYXR1cmVkX2ltYWdlIiwidXJsIiwicmVhbFByaWNlIiwiYWRkT25Qcm9kdWN0cyIsIm1hcCIsInAiLCJwcm9wZXJ0aWVzIiwiY2FydFBhcmVudCIsImtleSIsInRpdGxlIiwicHJvZHVjdF90aXRsZSIsInZhcmlhbnRfaWQiLCJvcHRpb25zX3dpdGhfdmFsdWVzIiwiaW1hZ2UiLCJyZW1vdmUiLCJjYXJ0UmVtb3ZlSXRlbSIsImNhcnRVcGRhdGVJdGVtIiwicGFyc2VJbnQiLCJ0b3RhbCIsIml0ZW1zX3N1YnRvdGFsX3ByaWNlIiwibm90ZSIsInJlbW92ZVByb2R1Y3RzIiwiYWRkT25SZW1vdmUiLCJpdGVtIiwicGFyZW50SXRlbSIsImZpbmQiLCJmZXRjaCIsIlNob3BpZnkiLCJyb3V0ZXMiLCJyb290IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidXBkYXRlcyIsInVwZGF0ZUl0ZW0iLCJjYXJ0VG90YWwiLCJpdGVtX2NvdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInVwZGF0ZU5vdGUiLCJ0YXJnZXQiXSwic291cmNlUm9vdCI6IiJ9