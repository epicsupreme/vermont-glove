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
  // console.log(state);
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

        if (((_p$properties = p.properties) === null || _p$properties === void 0 ? void 0 : _p$properties._cartParent) === e.key) {
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

      if (!((_e$properties = e.properties) !== null && _e$properties !== void 0 && _e$properties._cartParent)) {
        products.push({
          title: e.product_title,
          key: e.key,
          price: realPrice,
          id: e.variant_id,
          options: e.options_with_values,
          propertiesArray: e.properties ? Object.entries(e.properties) : null,
          image: f,
          addOnProducts: addOnProducts,
          qty: e.quantity,
          remove: function remove() {
            cartRemoveItem(this.key);
          },
          updateProperties: function updateProperties() {
            cartUpdateProperties(this.key, this.newProperties);
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
      var _item$properties, _item$properties2;

      if (((_item$properties = item.properties) === null || _item$properties === void 0 ? void 0 : _item$properties._cartParent) != null && key === ((_item$properties2 = item.properties) === null || _item$properties2 === void 0 ? void 0 : _item$properties2._cartParent)) {
        removeProducts[item.key] = 0;
      }
    });
    var parentItem = state.items.find(function (item) {
      return key === item.key;
    });
    removeProducts[parentItem.key] = 0; // console.log(removeProducts)

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

function cartUpdateProperties(key, properties) {
  _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_1__.updateItem(key, {
    properties: properties
  }).then(function (state) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUEsOENBQThDOztXQUU5QztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLG1DQUFtQztXQUNwRTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFbERBO1VBQ0E7VUFDQTtVQUNBLHFGQUFxRix3RUFBd0U7VUFDN0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9hZGQtdG8tY2FydC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvY2FydC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG4vLyBpbXBvcnQgKiBhcyBwcm9kdWN0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLXByb2R1Y3QnO1xuaW1wb3J0IHsgY2FydFVwZGF0ZUFsbCB9IGZyb20gJy4uL3V0aWxzL2NhcnQnXG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJ1xuXG53aW5kb3cucHJvZHVjdERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGNvbnNvbGUubG9nKHByb2R1Y3RKc29uKTtcbiAgcmV0dXJuIHtcbiAgICBwcmljZTogcHJvZHVjdEpzb24udmFyaWFudHNbMF0ucHJpY2UgLyAxMDAsXG4gICAgZGlzYWJsZWQ6IHByb2R1Y3RKc29uLnZhcmlhbnRzWzBdLmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICBidXR0b246IHByb2R1Y3RKc29uLnZhcmlhbnRzWzBdLmF2YWlsYWJsZSA/ICdBZGQgdG8gQ2FydCcgOiAnU29sZCBPdXQnLFxuICAgIG9wdGlvbnM6IHByb2R1Y3RKc29uLnZhcmlhbnRzWzBdLm9wdGlvbnMsXG4gICAgcHJvZHVjdDogcHJvZHVjdEpzb24sXG4gICAgZm9ybURhdGE6IHtcbiAgICAgIHF0eTogMSxcbiAgICAgIGlkOiBwcm9kdWN0SnNvbi52YXJpYW50c1swXS5pZCxcbiAgICB9LFxuICAgIHF0eUNoYW5nZShxdHkpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID0gcXR5XG4gICAgfSxcbiAgICBvblN1Ym1pdCgpIHtcbiAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZGluZyB0byBDYXJ0Li4uJ1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgIGNhcnRcbiAgICAgICAgLmFkZEl0ZW0odGhpcy5mb3JtRGF0YS5pZCwgeyBxdWFudGl0eTogdGhpcy5mb3JtRGF0YS5xdHkgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0c3RhdHVzJywge1xuICAgICAgICAgICAgICAgIGRldGFpbDogeyBjYXJ0T3BlbjogdHJ1ZSB9LFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgYWxlcnQoYFRoaXMgcHJvZHVjdCBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50YClcbiAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdVbmF2YWlsYWJsZSdcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgdXBkYXRlKG9wdGlvbiwgaW5kZXgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKG9wdGlvbiwgcGFyc2VJbnQoaW5kZXgpKVxuICAgICAgLy8gdGhpcy5vcHRpb25zW3BhcnNlSW50KGluZGV4KV0gPSBvcHRpb25cbiAgICAgIC8vIGNvbnN0IG9sZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIG9sZE9wdGlvbnNbcGFyc2VJbnQoaW5kZXgpXSA9IG9wdGlvblxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5vcHRpb25zKVxuICAgICAgLy8gY29uc3QgYSA9IEFycmF5LmZyb20ob2xkT3B0aW9ucylcbiAgICAgIGxldCBvcHRpb25zQXJyYXkgPSBbXVxuICAgICAgY29uc3QgcHJvZHVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZHVjdC1mb3JtJylcbiAgICAgIHByb2R1Y3RGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoYFtuYW1lKj1vcHRpb25zXWApLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFnTmFtZSA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgICBvcHRpb25zQXJyYXkucHVzaChlLnZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnNBcnJheS5wdXNoKGUudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLy8gY29uc29sZS5sb2cob3B0aW9uc0FycmF5KVxuICAgICAgY29uc3QgdmFyaWFudCA9IGdldFZhcmlhbnRGcm9tT3B0aW9uQXJyYXkoXG4gICAgICAgIHRoaXMucHJvZHVjdC52YXJpYW50cyxcbiAgICAgICAgb3B0aW9uc0FycmF5XG4gICAgICApXG4gICAgICAvLyBjb25zb2xlLmxvZyh2YXJpYW50KVxuICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdEpzb24udmFyaWFudHMpXG5cbiAgICAgIGlmICh2YXJpYW50KSB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSB2YXJpYW50LmlkXG4gICAgICAgIHRoaXMucHJpY2UgPSB2YXJpYW50LnByaWNlIC8gMTAwXG4gICAgICAgIGlmICghdmFyaWFudC5hdmFpbGFibGUpIHtcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ1NvbGQgT3V0J1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZvcm1EYXRhLmlkID0gbnVsbFxuICAgICAgICAvLyB0aGlzLnByaWNlID0gdmFyaWFudC5wcmljZSAvIDEwMFxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLmJ1dHRvbiA9ICdVbmF2YWlsYWJsZSdcbiAgICAgIH1cbiAgICB9LFxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFZhcmlhbnRGcm9tT3B0aW9uQXJyYXkocHJvZHVjdCwgb3B0cykge1xuICBjb25zb2xlLmxvZyhwcm9kdWN0KVxuXG4gIHZhciByZXN1bHQgPSBwcm9kdWN0LmZpbHRlcigodikgPT4ge1xuICAgIGNvbnNvbGUubG9nKHYub3B0aW9ucylcbiAgICBjb25zb2xlLmxvZyhvcHRzKVxuICAgIGNvbnNvbGUubG9nKGlzRXF1YWwodi5vcHRpb25zLCBvcHRzKSlcbiAgICByZXR1cm4gaXNFcXVhbCh2Lm9wdGlvbnMsIG9wdHMpXG4gIH0pXG5cbiAgLy8gY29uc29sZS5sb2cocmVzdWx0KVxuXG4gIHJldHVybiByZXN1bHRbMF0gfHwgbnVsbFxufVxuXG4vLyBmdW5jdGlvbiBhcnJheUVxdWFscyhhLCBiKSB7XG4vLyAgIHJldHVybiBBcnJheS5pc0FycmF5KGEpICYmXG4vLyAgICAgQXJyYXkuaXNBcnJheShiKSAmJlxuLy8gICAgIGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJlxuLy8gICAgIGEuZXZlcnkoKHZhbCwgaW5kZXgpID0+IHZhbCA9PT0gYltpbmRleF0pO1xuLy8gfVxuIiwiaW1wb3J0IHsgY29udmVydENvbG9yVmFyaWFibGVzIH0gZnJvbSAnQG1lcnRhc2FuL3RhaWx3aW5kY3NzLXZhcmlhYmxlcy9zcmMvaGVscGVycydcbmltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcblxuY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKHN0YXRlKTtcbiAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbn0pXG5cbmZ1bmN0aW9uIGNhcnRUb0FscGluZShzdGF0ZSkge1xuICBsZXQgcHJvZHVjdHMgPSBbXVxuICBpZiAoc3RhdGUuaXRlbXMpIHtcbiAgICBzdGF0ZS5pdGVtcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBsZXQgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsXG5cbiAgICAgIC8vIGlmIChlLmZlYXR1cmVkX2ltYWdlLnVybCkge1xuICAgICAgLy8gICBsZXQgZmlsZW5hbWUgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuICAgICAgLy8gICAgIC5yZXBsYWNlKC9cXD8uKiQvLCAnJylcbiAgICAgIC8vICAgICAucmVwbGFjZSgvLipcXC8vLCAnJylcbiAgICAgIC8vICAgbGV0IG5ld0ZpbGVuYW1lID0gZmlsZW5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICdfMzAweC5qcGcnKVxuICAgICAgLy8gICBmID0gZS5mZWF0dXJlZF9pbWFnZS51cmwucmVwbGFjZShmaWxlbmFtZSwgbmV3RmlsZW5hbWUpXG4gICAgICAvLyB9XG5cbiAgICAgIGNvbnN0IHJlYWxQcmljZSA9IGUucHJpY2UgLyAxMDBcblxuICAgICAgY29uc3QgYWRkT25Qcm9kdWN0cyA9IHN0YXRlLml0ZW1zXG4gICAgICAgIC5tYXAoKHApID0+IHtcbiAgICAgICAgICBpZiAocC5wcm9wZXJ0aWVzPy5fY2FydFBhcmVudCA9PT0gZS5rZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBwLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAgICAgIGtleTogcC5rZXksXG4gICAgICAgICAgICAgIHByaWNlOiBwLnByaWNlIC8gMTAwLFxuICAgICAgICAgICAgICBpZDogcC52YXJpYW50X2lkLFxuICAgICAgICAgICAgICBvcHRpb25zOiBwLm9wdGlvbnNfd2l0aF92YWx1ZXMsXG4gICAgICAgICAgICAgIGltYWdlOiBwLmZlYXR1cmVkX2ltYWdlLnVybCxcbiAgICAgICAgICAgICAgcXR5OiBwLnF1YW50aXR5LFxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwLnByb3BlcnRpZXMsXG4gICAgICAgICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdXBkYXRlKHF0eSkge1xuICAgICAgICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBlXG4gICAgICAgIH0pXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGFkZE9uUHJvZHVjdHMpXG5cbiAgICAgIGlmICghZS5wcm9wZXJ0aWVzPy5fY2FydFBhcmVudCkge1xuICAgICAgICBwcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogZS5wcm9kdWN0X3RpdGxlLFxuICAgICAgICAgIGtleTogZS5rZXksXG4gICAgICAgICAgcHJpY2U6IHJlYWxQcmljZSxcbiAgICAgICAgICBpZDogZS52YXJpYW50X2lkLFxuICAgICAgICAgIG9wdGlvbnM6IGUub3B0aW9uc193aXRoX3ZhbHVlcyxcbiAgICAgICAgICBwcm9wZXJ0aWVzQXJyYXk6IGUucHJvcGVydGllcyA/IE9iamVjdC5lbnRyaWVzKGUucHJvcGVydGllcykgOiBudWxsLFxuICAgICAgICAgIGltYWdlOiBmLFxuICAgICAgICAgIGFkZE9uUHJvZHVjdHM6IGFkZE9uUHJvZHVjdHMsXG4gICAgICAgICAgcXR5OiBlLnF1YW50aXR5LFxuICAgICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKHRoaXMua2V5KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlUHJvcGVydGllcygpIHtcbiAgICAgICAgICAgIGNhcnRVcGRhdGVQcm9wZXJ0aWVzKHRoaXMua2V5LCB0aGlzLm5ld1Byb3BlcnRpZXMpXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cGRhdGUocXR5KSB7XG4gICAgICAgICAgICBjYXJ0VXBkYXRlSXRlbSh0aGlzLmtleSwgcGFyc2VJbnQocXR5KSlcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsOiBzdGF0ZS5pdGVtc19zdWJ0b3RhbF9wcmljZSAvIDEwMCxcbiAgICBwcm9kdWN0czogcHJvZHVjdHMsXG4gICAgbm90ZTogc3RhdGUubm90ZSxcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXJ0UmVtb3ZlSXRlbShrZXkpIHtcbiAgbGV0IHJlbW92ZVByb2R1Y3RzID0ge31cblxuICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhzdGF0ZSlcblxuICAgIGNvbnN0IGFkZE9uUmVtb3ZlID0gc3RhdGUuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBpdGVtLnByb3BlcnRpZXM/Ll9jYXJ0UGFyZW50ICE9IG51bGwgJiZcbiAgICAgICAga2V5ID09PSBpdGVtLnByb3BlcnRpZXM/Ll9jYXJ0UGFyZW50XG4gICAgICApIHtcbiAgICAgICAgcmVtb3ZlUHJvZHVjdHNbaXRlbS5rZXldID0gMFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBwYXJlbnRJdGVtID0gc3RhdGUuaXRlbXMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGtleSA9PT0gaXRlbS5rZXlcbiAgICB9KVxuXG4gICAgcmVtb3ZlUHJvZHVjdHNbcGFyZW50SXRlbS5rZXldID0gMFxuXG4gICAgLy8gY29uc29sZS5sb2cocmVtb3ZlUHJvZHVjdHMpXG5cbiAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArICdjYXJ0L3VwZGF0ZS5qcycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdXBkYXRlczogcmVtb3ZlUHJvZHVjdHMsXG4gICAgICB9KSxcbiAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgfSlcbiAgfSlcblxuICAvLyBjYXJ0LnJlbW92ZUl0ZW0oa2V5KS50aGVuKChzdGF0ZSkgPT4ge1xuICAvLyAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIC8vIH0pXG59XG5cbmZ1bmN0aW9uIGNhcnRVcGRhdGVQcm9wZXJ0aWVzKGtleSwgcHJvcGVydGllcykge1xuICBjYXJ0LnVwZGF0ZUl0ZW0oa2V5LCB7IHByb3BlcnRpZXM6IHByb3BlcnRpZXMgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5mdW5jdGlvbiBjYXJ0VXBkYXRlSXRlbShrZXksIHF0eSkge1xuICBjYXJ0LnVwZGF0ZUl0ZW0oa2V5LCB7IHF1YW50aXR5OiBxdHkgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FydFVwZGF0ZUFsbChzdGF0ZSkge1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZXByb2R1Y3RzJywge1xuICAgICAgZGV0YWlsOiB7IGNhcnQ6IGNhcnRUb0FscGluZShzdGF0ZSkgfSxcbiAgICB9KVxuICApXG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydGNvdW50Jywge1xuICAgICAgZGV0YWlsOiB7IGNhcnRUb3RhbDogc3RhdGUuaXRlbV9jb3VudCB9LFxuICAgIH0pXG4gIClcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NhcnRVcGRhdGUnLCAoZSkgPT4ge1xuICBjYXJ0LnVwZGF0ZU5vdGUoZS50YXJnZXQudmFsdWUpXG59KVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbXBvbmVudC1hZGQtdG8tY2FydFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IGZ1bmN0aW9uKGNodW5rSWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMDsgfTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlcGljc3VwcmVtZV9zaG9waWZ5XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvYWRkLXRvLWNhcnQuanNcIik7IH0pXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbImNhcnQiLCJjYXJ0VXBkYXRlQWxsIiwiaXNFcXVhbCIsIndpbmRvdyIsInByb2R1Y3REYXRhIiwicHJpY2UiLCJwcm9kdWN0SnNvbiIsInZhcmlhbnRzIiwiZGlzYWJsZWQiLCJhdmFpbGFibGUiLCJidXR0b24iLCJvcHRpb25zIiwicHJvZHVjdCIsImZvcm1EYXRhIiwicXR5IiwiaWQiLCJxdHlDaGFuZ2UiLCJvblN1Ym1pdCIsImFkZEl0ZW0iLCJxdWFudGl0eSIsInRoZW4iLCJnZXRTdGF0ZSIsInN0YXRlIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiY2FydE9wZW4iLCJjYXRjaCIsImFsZXJ0IiwidXBkYXRlIiwib3B0aW9uIiwiaW5kZXgiLCJvcHRpb25zQXJyYXkiLCJwcm9kdWN0Rm9ybSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImUiLCJ0YWdOYW1lIiwicHVzaCIsInZhbHVlIiwiY2hlY2tlZCIsInZhcmlhbnQiLCJnZXRWYXJpYW50RnJvbU9wdGlvbkFycmF5Iiwib3B0cyIsImNvbnNvbGUiLCJsb2ciLCJyZXN1bHQiLCJmaWx0ZXIiLCJ2IiwiY29udmVydENvbG9yVmFyaWFibGVzIiwiY2FydFRvQWxwaW5lIiwicHJvZHVjdHMiLCJpdGVtcyIsImYiLCJmZWF0dXJlZF9pbWFnZSIsInVybCIsInJlYWxQcmljZSIsImFkZE9uUHJvZHVjdHMiLCJtYXAiLCJwIiwicHJvcGVydGllcyIsIl9jYXJ0UGFyZW50Iiwia2V5IiwidGl0bGUiLCJwcm9kdWN0X3RpdGxlIiwidmFyaWFudF9pZCIsIm9wdGlvbnNfd2l0aF92YWx1ZXMiLCJpbWFnZSIsInJlbW92ZSIsImNhcnRSZW1vdmVJdGVtIiwiY2FydFVwZGF0ZUl0ZW0iLCJwYXJzZUludCIsInByb3BlcnRpZXNBcnJheSIsIk9iamVjdCIsImVudHJpZXMiLCJ1cGRhdGVQcm9wZXJ0aWVzIiwiY2FydFVwZGF0ZVByb3BlcnRpZXMiLCJuZXdQcm9wZXJ0aWVzIiwidG90YWwiLCJpdGVtc19zdWJ0b3RhbF9wcmljZSIsIm5vdGUiLCJyZW1vdmVQcm9kdWN0cyIsImFkZE9uUmVtb3ZlIiwiaXRlbSIsInBhcmVudEl0ZW0iLCJmaW5kIiwiZmV0Y2giLCJTaG9waWZ5Iiwicm91dGVzIiwicm9vdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInVwZGF0ZXMiLCJ1cGRhdGVJdGVtIiwiY2FydFRvdGFsIiwiaXRlbV9jb3VudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cGRhdGVOb3RlIiwidGFyZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==