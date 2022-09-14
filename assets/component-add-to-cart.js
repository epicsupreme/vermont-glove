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
    fetch(window.Shopify.routes.root + "cart/update.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
  window.dispatchEvent(new CustomEvent("updateproducts", {
    detail: {
      cart: cartToAlpine(state)
    }
  }));
  window.dispatchEvent(new CustomEvent("updatecartcount", {
    detail: {
      cartTotal: state.item_count
    }
  }));
}
window.addEventListener("cartUpdate", function (e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2FkZC10by1jYXJ0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9jYXJ0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcbi8vIGltcG9ydCAqIGFzIHByb2R1Y3QgZnJvbSAnQHNob3BpZnkvdGhlbWUtcHJvZHVjdCc7XG5pbXBvcnQgeyBjYXJ0VXBkYXRlQWxsIH0gZnJvbSAnLi4vdXRpbHMvY2FydCdcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnXG5cbndpbmRvdy5wcm9kdWN0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gY29uc29sZS5sb2cocHJvZHVjdEpzb24pO1xuICByZXR1cm4ge1xuICAgIHByaWNlOiBwcm9kdWN0SnNvbi52YXJpYW50c1swXS5wcmljZSAvIDEwMCxcbiAgICBkaXNhYmxlZDogcHJvZHVjdEpzb24udmFyaWFudHNbMF0uYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlLFxuICAgIGJ1dHRvbjogcHJvZHVjdEpzb24udmFyaWFudHNbMF0uYXZhaWxhYmxlID8gJ0FkZCB0byBDYXJ0JyA6ICdTb2xkIE91dCcsXG4gICAgb3B0aW9uczogcHJvZHVjdEpzb24udmFyaWFudHNbMF0ub3B0aW9ucyxcbiAgICBwcm9kdWN0OiBwcm9kdWN0SnNvbixcbiAgICBmb3JtRGF0YToge1xuICAgICAgcXR5OiAxLFxuICAgICAgaWQ6IHByb2R1Y3RKc29uLnZhcmlhbnRzWzBdLmlkLFxuICAgIH0sXG4gICAgcXR5Q2hhbmdlKHF0eSkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPSBxdHlcbiAgICB9LFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgdGhpcy5idXR0b24gPSAnQWRkaW5nIHRvIENhcnQuLi4nXG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgY2FydFxuICAgICAgICAuYWRkSXRlbSh0aGlzLmZvcm1EYXRhLmlkLCB7IHF1YW50aXR5OiB0aGlzLmZvcm1EYXRhLnF0eSB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICAgICAgdGhpcy5idXR0b24gPSAnQWRkIHRvIENhcnQnXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRzdGF0dXMnLCB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7IGNhcnRPcGVuOiB0cnVlIH0sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICBhbGVydChgVGhpcyBwcm9kdWN0IGlzIHVuYXZhaWxhYmxlIGF0IHRoZSBtb21lbnRgKVxuICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ1VuYXZhaWxhYmxlJ1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICB1cGRhdGUob3B0aW9uLCBpbmRleCkge1xuICAgICAgLy8gY29uc29sZS5sb2cob3B0aW9uLCBwYXJzZUludChpbmRleCkpXG4gICAgICAvLyB0aGlzLm9wdGlvbnNbcGFyc2VJbnQoaW5kZXgpXSA9IG9wdGlvblxuICAgICAgLy8gY29uc3Qgb2xkT3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgICAgLy8gb2xkT3B0aW9uc1twYXJzZUludChpbmRleCldID0gb3B0aW9uXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnMpXG4gICAgICAvLyBjb25zdCBhID0gQXJyYXkuZnJvbShvbGRPcHRpb25zKVxuICAgICAgbGV0IG9wdGlvbnNBcnJheSA9IFtdXG4gICAgICBjb25zdCBwcm9kdWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9kdWN0LWZvcm0nKVxuICAgICAgcHJvZHVjdEZvcm0ucXVlcnlTZWxlY3RvckFsbChgW25hbWUqPW9wdGlvbnNdYCkuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YWdOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICAgIG9wdGlvbnNBcnJheS5wdXNoKGUudmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGUuY2hlY2tlZCkge1xuICAgICAgICAgICAgb3B0aW9uc0FycmF5LnB1c2goZS52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyBjb25zb2xlLmxvZyhvcHRpb25zQXJyYXkpXG4gICAgICBjb25zdCB2YXJpYW50ID0gZ2V0VmFyaWFudEZyb21PcHRpb25BcnJheShcbiAgICAgICAgdGhpcy5wcm9kdWN0LnZhcmlhbnRzLFxuICAgICAgICBvcHRpb25zQXJyYXlcbiAgICAgIClcbiAgICAgIC8vIGNvbnNvbGUubG9nKHZhcmlhbnQpXG4gICAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0SnNvbi52YXJpYW50cylcblxuICAgICAgaWYgKHZhcmlhbnQpIHtcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5pZCA9IHZhcmlhbnQuaWRcbiAgICAgICAgdGhpcy5wcmljZSA9IHZhcmlhbnQucHJpY2UgLyAxMDBcbiAgICAgICAgaWYgKCF2YXJpYW50LmF2YWlsYWJsZSkge1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgdGhpcy5idXR0b24gPSAnU29sZCBPdXQnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5idXR0b24gPSAnQWRkIHRvIENhcnQnXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSBudWxsXG4gICAgICAgIC8vIHRoaXMucHJpY2UgPSB2YXJpYW50LnByaWNlIC8gMTAwXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuYnV0dG9uID0gJ1VuYXZhaWxhYmxlJ1xuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VmFyaWFudEZyb21PcHRpb25BcnJheShwcm9kdWN0LCBvcHRzKSB7XG4gIGNvbnNvbGUubG9nKHByb2R1Y3QpXG5cbiAgdmFyIHJlc3VsdCA9IHByb2R1Y3QuZmlsdGVyKCh2KSA9PiB7XG4gICAgY29uc29sZS5sb2codi5vcHRpb25zKVxuICAgIGNvbnNvbGUubG9nKG9wdHMpXG4gICAgY29uc29sZS5sb2coaXNFcXVhbCh2Lm9wdGlvbnMsIG9wdHMpKVxuICAgIHJldHVybiBpc0VxdWFsKHYub3B0aW9ucywgb3B0cylcbiAgfSlcblxuICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpXG5cbiAgcmV0dXJuIHJlc3VsdFswXSB8fCBudWxsXG59XG5cbi8vIGZ1bmN0aW9uIGFycmF5RXF1YWxzKGEsIGIpIHtcbi8vICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSkgJiZcbi8vICAgICBBcnJheS5pc0FycmF5KGIpICYmXG4vLyAgICAgYS5sZW5ndGggPT09IGIubGVuZ3RoICYmXG4vLyAgICAgYS5ldmVyeSgodmFsLCBpbmRleCkgPT4gdmFsID09PSBiW2luZGV4XSk7XG4vLyB9XG4iLCJpbXBvcnQgeyBjb252ZXJ0Q29sb3JWYXJpYWJsZXMgfSBmcm9tIFwiQG1lcnRhc2FuL3RhaWx3aW5kY3NzLXZhcmlhYmxlcy9zcmMvaGVscGVyc1wiO1xuaW1wb3J0ICogYXMgY2FydCBmcm9tIFwiQHNob3BpZnkvdGhlbWUtY2FydFwiO1xuXG5jYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgLy8gY29uc29sZS5sb2coc3RhdGUpXG4gIGNhcnRVcGRhdGVBbGwoc3RhdGUpO1xufSk7XG5cbmZ1bmN0aW9uIGNhcnRUb0FscGluZShzdGF0ZSkge1xuICBsZXQgcHJvZHVjdHMgPSBbXTtcbiAgaWYgKHN0YXRlLml0ZW1zKSB7XG4gICAgc3RhdGUuaXRlbXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgbGV0IGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybDtcblxuICAgICAgLy8gaWYgKGUuZmVhdHVyZWRfaW1hZ2UudXJsKSB7XG4gICAgICAvLyAgIGxldCBmaWxlbmFtZSA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsXG4gICAgICAvLyAgICAgLnJlcGxhY2UoL1xcPy4qJC8sICcnKVxuICAgICAgLy8gICAgIC5yZXBsYWNlKC8uKlxcLy8sICcnKVxuICAgICAgLy8gICBsZXQgbmV3RmlsZW5hbWUgPSBmaWxlbmFtZS5yZXBsYWNlKC9cXC5bXi8uXSskLywgJ18zMDB4LmpwZycpXG4gICAgICAvLyAgIGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybC5yZXBsYWNlKGZpbGVuYW1lLCBuZXdGaWxlbmFtZSlcbiAgICAgIC8vIH1cblxuICAgICAgY29uc3QgcmVhbFByaWNlID0gZS5wcmljZSAvIDEwMDtcblxuICAgICAgY29uc3QgYWRkT25Qcm9kdWN0cyA9IHN0YXRlLml0ZW1zLm1hcCgocCkgPT4ge1xuICAgICAgICBpZiAocC5wcm9wZXJ0aWVzPy5jYXJ0UGFyZW50ID09PSBlLmtleSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogcC5wcm9kdWN0X3RpdGxlLFxuICAgICAgICAgICAga2V5OiBwLmtleSxcbiAgICAgICAgICAgIHByaWNlOiBwLnByaWNlIC8gMTAwLFxuICAgICAgICAgICAgaWQ6IHAudmFyaWFudF9pZCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHAub3B0aW9uc193aXRoX3ZhbHVlcyxcbiAgICAgICAgICAgIGltYWdlOiBwLmZlYXR1cmVkX2ltYWdlLnVybCxcbiAgICAgICAgICAgIHF0eTogcC5xdWFudGl0eSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHAucHJvcGVydGllcyxcbiAgICAgICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICAgICAgY2FydFJlbW92ZUl0ZW0odGhpcy5rZXkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZShxdHkpIHtcbiAgICAgICAgICAgICAgY2FydFVwZGF0ZUl0ZW0odGhpcy5rZXksIHBhcnNlSW50KHF0eSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pLmZpbHRlcihlID0+IHtcbiAgICAgICAgcmV0dXJuIGVcbiAgICAgIH0pO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhhZGRPblByb2R1Y3RzKVxuXG5cbiAgICAgIGlmICghZS5wcm9wZXJ0aWVzPy5jYXJ0UGFyZW50KSB7XG4gICAgICAgIHByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBlLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAga2V5OiBlLmtleSxcbiAgICAgICAgICBwcmljZTogcmVhbFByaWNlLFxuICAgICAgICAgIGlkOiBlLnZhcmlhbnRfaWQsXG4gICAgICAgICAgb3B0aW9uczogZS5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICAgIGltYWdlOiBmLFxuICAgICAgICAgIGFkZE9uUHJvZHVjdHM6IGFkZE9uUHJvZHVjdHMsXG4gICAgICAgICAgcXR5OiBlLnF1YW50aXR5LFxuICAgICAgICAgIHByb3BlcnRpZXM6IGUucHJvcGVydGllcyxcbiAgICAgICAgICByZW1vdmUoKSB7XG4gICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cGRhdGUocXR5KSB7XG4gICAgICAgICAgICBjYXJ0VXBkYXRlSXRlbSh0aGlzLmtleSwgcGFyc2VJbnQocXR5KSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsOiBzdGF0ZS5pdGVtc19zdWJ0b3RhbF9wcmljZSAvIDEwMCxcbiAgICBwcm9kdWN0czogcHJvZHVjdHMsXG4gICAgbm90ZTogc3RhdGUubm90ZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2FydFJlbW92ZUl0ZW0oa2V5KSB7XG4gIGxldCByZW1vdmVQcm9kdWN0cyA9IHt9O1xuXG4gIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHN0YXRlKTtcbiAgICBjb25zdCBhZGRPblJlbW92ZSA9IHN0YXRlLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChrZXkgPT09IGl0ZW0ucHJvcGVydGllcy5jYXJ0UGFyZW50KSB7XG4gICAgICAgIHJlbW92ZVByb2R1Y3RzW2l0ZW0ua2V5XSA9IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXJlbnRJdGVtID0gc3RhdGUuaXRlbXMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGtleSA9PT0gaXRlbS5rZXk7XG4gICAgfSk7XG5cbiAgICByZW1vdmVQcm9kdWN0c1twYXJlbnRJdGVtLmtleV0gPSAwO1xuXG4gICAgY29uc29sZS5sb2cocmVtb3ZlUHJvZHVjdHMpO1xuXG4gICAgZmV0Y2god2luZG93LlNob3BpZnkucm91dGVzLnJvb3QgKyBcImNhcnQvdXBkYXRlLmpzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdXBkYXRlczogcmVtb3ZlUHJvZHVjdHMsXG4gICAgICB9KSxcbiAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIC8vIGNhcnQucmVtb3ZlSXRlbShrZXkpLnRoZW4oKHN0YXRlKSA9PiB7XG4gIC8vICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgLy8gfSlcbn1cblxuZnVuY3Rpb24gY2FydFVwZGF0ZUl0ZW0oa2V5LCBxdHkpIHtcbiAgY2FydC51cGRhdGVJdGVtKGtleSwgeyBxdWFudGl0eTogcXR5IH0pLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgY2FydFVwZGF0ZUFsbChzdGF0ZSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FydFVwZGF0ZUFsbChzdGF0ZSkge1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQoXCJ1cGRhdGVwcm9kdWN0c1wiLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydDogY2FydFRvQWxwaW5lKHN0YXRlKSB9LFxuICAgIH0pXG4gICk7XG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudChcInVwZGF0ZWNhcnRjb3VudFwiLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydFRvdGFsOiBzdGF0ZS5pdGVtX2NvdW50IH0sXG4gICAgfSlcbiAgKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjYXJ0VXBkYXRlXCIsIChlKSA9PiB7XG4gIGNhcnQudXBkYXRlTm90ZShlLnRhcmdldC52YWx1ZSk7XG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb21wb25lbnQtYWRkLXRvLWNhcnRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2FkZC10by1jYXJ0LmpzXCIpOyB9KVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJjYXJ0IiwiY2FydFVwZGF0ZUFsbCIsImlzRXF1YWwiLCJ3aW5kb3ciLCJwcm9kdWN0RGF0YSIsInByaWNlIiwicHJvZHVjdEpzb24iLCJ2YXJpYW50cyIsImRpc2FibGVkIiwiYXZhaWxhYmxlIiwiYnV0dG9uIiwib3B0aW9ucyIsInByb2R1Y3QiLCJmb3JtRGF0YSIsInF0eSIsImlkIiwicXR5Q2hhbmdlIiwib25TdWJtaXQiLCJhZGRJdGVtIiwicXVhbnRpdHkiLCJ0aGVuIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImNhcnRPcGVuIiwiY2F0Y2giLCJhbGVydCIsInVwZGF0ZSIsIm9wdGlvbiIsImluZGV4Iiwib3B0aW9uc0FycmF5IiwicHJvZHVjdEZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlIiwidGFnTmFtZSIsInB1c2giLCJ2YWx1ZSIsImNoZWNrZWQiLCJ2YXJpYW50IiwiZ2V0VmFyaWFudEZyb21PcHRpb25BcnJheSIsIm9wdHMiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0IiwiZmlsdGVyIiwidiIsImNvbnZlcnRDb2xvclZhcmlhYmxlcyIsImNhcnRUb0FscGluZSIsInByb2R1Y3RzIiwiaXRlbXMiLCJmIiwiZmVhdHVyZWRfaW1hZ2UiLCJ1cmwiLCJyZWFsUHJpY2UiLCJhZGRPblByb2R1Y3RzIiwibWFwIiwicCIsInByb3BlcnRpZXMiLCJjYXJ0UGFyZW50Iiwia2V5IiwidGl0bGUiLCJwcm9kdWN0X3RpdGxlIiwidmFyaWFudF9pZCIsIm9wdGlvbnNfd2l0aF92YWx1ZXMiLCJpbWFnZSIsInJlbW92ZSIsImNhcnRSZW1vdmVJdGVtIiwiY2FydFVwZGF0ZUl0ZW0iLCJwYXJzZUludCIsInRvdGFsIiwiaXRlbXNfc3VidG90YWxfcHJpY2UiLCJub3RlIiwicmVtb3ZlUHJvZHVjdHMiLCJhZGRPblJlbW92ZSIsIml0ZW0iLCJwYXJlbnRJdGVtIiwiZmluZCIsImZldGNoIiwiU2hvcGlmeSIsInJvdXRlcyIsInJvb3QiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1cGRhdGVzIiwidXBkYXRlSXRlbSIsImNhcnRUb3RhbCIsIml0ZW1fY291bnQiLCJhZGRFdmVudExpc3RlbmVyIiwidXBkYXRlTm90ZSIsInRhcmdldCJdLCJzb3VyY2VSb290IjoiIn0=