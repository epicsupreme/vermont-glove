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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBLHFGQUFxRix3RUFBd0U7VUFDN0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9hZGQtdG8tY2FydC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvY2FydC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG4vLyBpbXBvcnQgKiBhcyBwcm9kdWN0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLXByb2R1Y3QnO1xuaW1wb3J0IHsgY2FydFVwZGF0ZUFsbCB9IGZyb20gJy4uL3V0aWxzL2NhcnQnXG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJ1xuXG53aW5kb3cucHJvZHVjdERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGNvbnNvbGUubG9nKHByb2R1Y3RKc29uKTtcbiAgcmV0dXJuIHtcbiAgICBwcmljZTogcHJvZHVjdEpzb24udmFyaWFudHNbMF0ucHJpY2UgLyAxMDAsXG4gICAgZGlzYWJsZWQ6IHByb2R1Y3RKc29uLnZhcmlhbnRzWzBdLmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICBidXR0b246IHByb2R1Y3RKc29uLnZhcmlhbnRzWzBdLmF2YWlsYWJsZSA/ICdBZGQgdG8gQ2FydCcgOiAnU29sZCBPdXQnLFxuICAgIG9wdGlvbnM6IHByb2R1Y3RKc29uLnZhcmlhbnRzWzBdLm9wdGlvbnMsXG4gICAgcHJvZHVjdDogcHJvZHVjdEpzb24sXG4gICAgZm9ybURhdGE6IHtcbiAgICAgIHF0eTogMSxcbiAgICAgIGlkOiBwcm9kdWN0SnNvbi52YXJpYW50c1swXS5pZCxcbiAgICB9LFxuICAgIHF0eUNoYW5nZShxdHkpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID0gcXR5XG4gICAgfSxcbiAgICBvblN1Ym1pdCgpIHtcbiAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZGluZyB0byBDYXJ0Li4uJ1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgIGNhcnRcbiAgICAgICAgLmFkZEl0ZW0odGhpcy5mb3JtRGF0YS5pZCwgeyBxdWFudGl0eTogdGhpcy5mb3JtRGF0YS5xdHkgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0c3RhdHVzJywge1xuICAgICAgICAgICAgICAgIGRldGFpbDogeyBjYXJ0T3BlbjogdHJ1ZSB9LFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgYWxlcnQoYFRoaXMgcHJvZHVjdCBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50YClcbiAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdVbmF2YWlsYWJsZSdcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgdXBkYXRlKG9wdGlvbiwgaW5kZXgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKG9wdGlvbiwgcGFyc2VJbnQoaW5kZXgpKVxuICAgICAgLy8gdGhpcy5vcHRpb25zW3BhcnNlSW50KGluZGV4KV0gPSBvcHRpb25cbiAgICAgIC8vIGNvbnN0IG9sZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIG9sZE9wdGlvbnNbcGFyc2VJbnQoaW5kZXgpXSA9IG9wdGlvblxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5vcHRpb25zKVxuICAgICAgLy8gY29uc3QgYSA9IEFycmF5LmZyb20ob2xkT3B0aW9ucylcbiAgICAgIGxldCBvcHRpb25zQXJyYXkgPSBbXVxuICAgICAgY29uc3QgcHJvZHVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZHVjdC1mb3JtJylcbiAgICAgIHByb2R1Y3RGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoYFtuYW1lKj1vcHRpb25zXWApLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFnTmFtZSA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgICBvcHRpb25zQXJyYXkucHVzaChlLnZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnNBcnJheS5wdXNoKGUudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLy8gY29uc29sZS5sb2cob3B0aW9uc0FycmF5KVxuICAgICAgY29uc3QgdmFyaWFudCA9IGdldFZhcmlhbnRGcm9tT3B0aW9uQXJyYXkoXG4gICAgICAgIHRoaXMucHJvZHVjdC52YXJpYW50cyxcbiAgICAgICAgb3B0aW9uc0FycmF5XG4gICAgICApXG4gICAgICAvLyBjb25zb2xlLmxvZyh2YXJpYW50KVxuICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdEpzb24udmFyaWFudHMpXG5cbiAgICAgIGlmICh2YXJpYW50KSB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSB2YXJpYW50LmlkXG4gICAgICAgIHRoaXMucHJpY2UgPSB2YXJpYW50LnByaWNlIC8gMTAwXG4gICAgICAgIGlmICghdmFyaWFudC5hdmFpbGFibGUpIHtcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ1NvbGQgT3V0J1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLmlkID0gbnVsbFxuICAgICAgICAvLyB0aGlzLnByaWNlID0gdmFyaWFudC5wcmljZSAvIDEwMFxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLmJ1dHRvbiA9ICdVbmF2YWlsYWJsZSdcbiAgICAgIH1cbiAgICB9LFxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFZhcmlhbnRGcm9tT3B0aW9uQXJyYXkocHJvZHVjdCwgb3B0cykge1xuICBjb25zb2xlLmxvZyhwcm9kdWN0KVxuXG4gIHZhciByZXN1bHQgPSBwcm9kdWN0LmZpbHRlcigodikgPT4ge1xuICAgIGNvbnNvbGUubG9nKHYub3B0aW9ucylcbiAgICBjb25zb2xlLmxvZyhvcHRzKVxuICAgIGNvbnNvbGUubG9nKGlzRXF1YWwodi5vcHRpb25zLCBvcHRzKSlcbiAgICByZXR1cm4gaXNFcXVhbCh2Lm9wdGlvbnMsIG9wdHMpXG4gIH0pXG5cbiAgLy8gY29uc29sZS5sb2cocmVzdWx0KVxuXG4gIHJldHVybiByZXN1bHRbMF0gfHwgbnVsbFxufVxuXG4vLyBmdW5jdGlvbiBhcnJheUVxdWFscyhhLCBiKSB7XG4vLyAgIHJldHVybiBBcnJheS5pc0FycmF5KGEpICYmXG4vLyAgICAgQXJyYXkuaXNBcnJheShiKSAmJlxuLy8gICAgIGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJlxuLy8gICAgIGEuZXZlcnkoKHZhbCwgaW5kZXgpID0+IHZhbCA9PT0gYltpbmRleF0pO1xuLy8gfVxuIiwiaW1wb3J0IHsgY29udmVydENvbG9yVmFyaWFibGVzIH0gZnJvbSAnQG1lcnRhc2FuL3RhaWx3aW5kY3NzLXZhcmlhYmxlcy9zcmMvaGVscGVycydcbmltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcblxuY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gIGNvbnNvbGUubG9nKHN0YXRlKVxuICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxufSlcblxuZnVuY3Rpb24gY2FydFRvQWxwaW5lKHN0YXRlKSB7XG4gIGxldCBwcm9kdWN0cyA9IFtdXG4gIGlmIChzdGF0ZS5pdGVtcykge1xuICAgIHN0YXRlLml0ZW1zLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGxldCBmID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcblxuICAgICAgLy8gaWYgKGUuZmVhdHVyZWRfaW1hZ2UudXJsKSB7XG4gICAgICAvLyAgIGxldCBmaWxlbmFtZSA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsXG4gICAgICAvLyAgICAgLnJlcGxhY2UoL1xcPy4qJC8sICcnKVxuICAgICAgLy8gICAgIC5yZXBsYWNlKC8uKlxcLy8sICcnKVxuICAgICAgLy8gICBsZXQgbmV3RmlsZW5hbWUgPSBmaWxlbmFtZS5yZXBsYWNlKC9cXC5bXi8uXSskLywgJ18zMDB4LmpwZycpXG4gICAgICAvLyAgIGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybC5yZXBsYWNlKGZpbGVuYW1lLCBuZXdGaWxlbmFtZSlcbiAgICAgIC8vIH1cblxuICAgICAgY29uc3QgcmVhbFByaWNlID0gZS5wcmljZSAvIDEwMFxuXG4gICAgICBwcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgdGl0bGU6IGUucHJvZHVjdF90aXRsZSxcbiAgICAgICAga2V5OiBlLmtleSxcbiAgICAgICAgcHJpY2U6IHJlYWxQcmljZSxcbiAgICAgICAgaWQ6IGUudmFyaWFudF9pZCxcbiAgICAgICAgb3B0aW9uczogZS5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICBpbWFnZTogZixcbiAgICAgICAgcXR5OiBlLnF1YW50aXR5LFxuICAgICAgICByZW1vdmUoKSB7XG4gICAgICAgICAgY2FydFJlbW92ZUl0ZW0odGhpcy5rZXkpXG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZShxdHkpIHtcbiAgICAgICAgICBjYXJ0VXBkYXRlSXRlbSh0aGlzLmtleSwgcGFyc2VJbnQocXR5KSlcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG90YWw6IHN0YXRlLml0ZW1zX3N1YnRvdGFsX3ByaWNlIC8gMTAwLFxuICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcbiAgICBub3RlOiBzdGF0ZS5ub3RlXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FydFJlbW92ZUl0ZW0oa2V5KSB7XG4gIGNhcnQucmVtb3ZlSXRlbShrZXkpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY2FydFVwZGF0ZUl0ZW0oa2V5LCBxdHkpIHtcbiAgY2FydC51cGRhdGVJdGVtKGtleSwgeyBxdWFudGl0eTogcXR5IH0pLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhcnRVcGRhdGVBbGwoc3RhdGUpIHtcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVwcm9kdWN0cycsIHtcbiAgICAgIGRldGFpbDogeyBjYXJ0OiBjYXJ0VG9BbHBpbmUoc3RhdGUpIH0sXG4gICAgfSlcbiAgKVxuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRjb3VudCcsIHtcbiAgICAgIGRldGFpbDogeyBjYXJ0VG90YWw6IHN0YXRlLml0ZW1fY291bnQgfSxcbiAgICB9KVxuICApXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2FydFVwZGF0ZVwiLCAoZSkgPT4ge1xuICBjYXJ0LnVwZGF0ZU5vdGUoZS50YXJnZXQudmFsdWUpXG59KSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb21wb25lbnQtYWRkLXRvLWNhcnRcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2FkZC10by1jYXJ0LmpzXCIpOyB9KVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJjYXJ0IiwiY2FydFVwZGF0ZUFsbCIsImlzRXF1YWwiLCJ3aW5kb3ciLCJwcm9kdWN0RGF0YSIsInByaWNlIiwicHJvZHVjdEpzb24iLCJ2YXJpYW50cyIsImRpc2FibGVkIiwiYXZhaWxhYmxlIiwiYnV0dG9uIiwib3B0aW9ucyIsInByb2R1Y3QiLCJmb3JtRGF0YSIsInF0eSIsImlkIiwicXR5Q2hhbmdlIiwib25TdWJtaXQiLCJhZGRJdGVtIiwicXVhbnRpdHkiLCJ0aGVuIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImNhcnRPcGVuIiwiY2F0Y2giLCJhbGVydCIsInVwZGF0ZSIsIm9wdGlvbiIsImluZGV4Iiwib3B0aW9uc0FycmF5IiwicHJvZHVjdEZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlIiwidGFnTmFtZSIsInB1c2giLCJ2YWx1ZSIsImNoZWNrZWQiLCJ2YXJpYW50IiwiZ2V0VmFyaWFudEZyb21PcHRpb25BcnJheSIsIm9wdHMiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0IiwiZmlsdGVyIiwidiIsImNvbnZlcnRDb2xvclZhcmlhYmxlcyIsImNhcnRUb0FscGluZSIsInByb2R1Y3RzIiwiaXRlbXMiLCJmIiwiZmVhdHVyZWRfaW1hZ2UiLCJ1cmwiLCJyZWFsUHJpY2UiLCJ0aXRsZSIsInByb2R1Y3RfdGl0bGUiLCJrZXkiLCJ2YXJpYW50X2lkIiwib3B0aW9uc193aXRoX3ZhbHVlcyIsImltYWdlIiwicmVtb3ZlIiwiY2FydFJlbW92ZUl0ZW0iLCJjYXJ0VXBkYXRlSXRlbSIsInBhcnNlSW50IiwidG90YWwiLCJpdGVtc19zdWJ0b3RhbF9wcmljZSIsIm5vdGUiLCJyZW1vdmVJdGVtIiwidXBkYXRlSXRlbSIsImNhcnRUb3RhbCIsIml0ZW1fY291bnQiLCJhZGRFdmVudExpc3RlbmVyIiwidXBkYXRlTm90ZSIsInRhcmdldCJdLCJzb3VyY2VSb290IjoiIn0=