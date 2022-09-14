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
      var addOnProducts = state.items.map(function (p) {
        if (p.properties['cartParent'] === e.key) {
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
      });
      console.log(addOnProducts);

      if (!e.properties['cartParent']) {
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
  var linerSync = product.linerSync;

  var price = function price(variantId, selectedAddOnProducts, hasLiner) {
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

    if (hasLiner) {
      addOnPrice = addOnPrice + hasLiner;
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

  var linerId = function linerId(variant) {
    // console.log("liner", linerSync)
    // console.log("variant", variant)
    var linerFilter = product.linerSync.find(function (obj) {
      return obj.variantId === variant;
    }); // console.log("liner", linerFilter)

    return linerFilter ? linerFilter : null; // return null
  };

  return {
    //defaults
    price: price(currentVariant.id, [], false),
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
    liner: {
      linerInfo: linerId(currentVariant.id),
      addLiner: false
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
      this.price = price(this.formData.id, this.selectedAddOnProducts, this.liner.addLiner ? this.liner.linerInfo.linerPrice : false); // console.log(handleAddOn(id, selectedAddOns))
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
          }]
        })
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        console.log(result);
        var lastCartItem = result.items.pop();

        if (_this.selectedAddOnProducts.length < 1 && _this.liner.addLiner) {
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
        } else {
          var addOnCartProducts = [];

          _this.selectedAddOnProducts.forEach(function (e) {
            addOnCartProducts.push({
              id: e.id,
              qty: 1,
              properties: {
                cartParent: lastCartItem.key
              }
            });
          });

          if (_this.liner.addLiner) {
            addOnCartProducts.push({
              id: _this.liner.linerInfo.linerId,
              qty: _this.formData.qty,
              properties: {
                cartParent: lastCartItem.key
              }
            });
          }

          fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              items: addOnCartProducts
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
            console.log(e);
            alert("This product is unavailable at the moment");
            _this.button = 'Unavailable';
            _this.disabled = true;
          });
        }
      }).catch(function (e) {
        console.log(e);
        alert("This product is unavailable at the moment");
        _this.button = 'Unavailable';
        _this.disabled = true;
      });
    },
    addLiner: function addLiner() {
      this.liner.addLiner = !this.liner.addLiner;
      this.price = price(this.formData.id, this.selectedAddOnProducts, this.liner.addLiner ? this.liner.linerInfo.linerPrice : false);
    },
    updateVariant: function updateVariant(value, option) {
      var options = this.options;
      var newOptions = options.map(function (e) {
        return e.name == option ? value : e.value;
      });
      var newVariant = variants.filter(function (variant) {
        return (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isEqual)(variant.options, newOptions);
      })[0] // console.log(newVariant);
      ;
      this.liner.linerInfo = linerId(newVariant.id), this.price = price(newVariant.id, this.selectedAddOnProducts, this.liner.addLiner ? this.liner.linerInfo.linerPrice : false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BELDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBLDhDQUE4Qzs7V0FFOUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxtQ0FBbUM7V0FDcEU7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWxEQTtVQUNBO1VBQ0E7VUFDQSwyREFBMkQsc0RBQXNEO1VBQ2pILHFGQUFxRix1REFBdUQ7VUFDNUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvYmFzZS5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvY2FydC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvaGVhZGVyLWhlaWdodC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3N0eWxlcy9iYXNlLnNjc3M/MDkyNyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWxwaW5lIGZyb20gJ2FscGluZWpzJ1xuaW1wb3J0IGNvbGxhcHNlIGZyb20gJ0BhbHBpbmVqcy9jb2xsYXBzZSdcblxuaW1wb3J0IHByb2R1Y3QgZnJvbSAnLi91dGlscy9wcm9kdWN0J1xuXG5pbXBvcnQgJy4vdXRpbHMvaGVhZGVyLWhlaWdodCdcbmltcG9ydCAnLi91dGlscy9jYXJ0J1xuLy8gaW1wb3J0ICcuL2FuaW1hdGlvbnMvaGVhZGVyJ1xuXG5BbHBpbmUucGx1Z2luKGNvbGxhcHNlKVxuXG5BbHBpbmUuZGF0YSgncHJvZHVjdCcsIHByb2R1Y3QpXG5cbndpbmRvdy5BbHBpbmUgPSBBbHBpbmVcblxuQWxwaW5lLnN0YXJ0KClcbiIsImltcG9ydCB7IGNvbnZlcnRDb2xvclZhcmlhYmxlcyB9IGZyb20gJ0BtZXJ0YXNhbi90YWlsd2luZGNzcy12YXJpYWJsZXMvc3JjL2hlbHBlcnMnXG5pbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG5cbmNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICBjb25zb2xlLmxvZyhzdGF0ZSlcbiAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbn0pXG5cbmZ1bmN0aW9uIGNhcnRUb0FscGluZShzdGF0ZSkge1xuICBsZXQgcHJvZHVjdHMgPSBbXVxuICBpZiAoc3RhdGUuaXRlbXMpIHtcbiAgICBzdGF0ZS5pdGVtcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBsZXQgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsXG5cbiAgICAgIC8vIGlmIChlLmZlYXR1cmVkX2ltYWdlLnVybCkge1xuICAgICAgLy8gICBsZXQgZmlsZW5hbWUgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuICAgICAgLy8gICAgIC5yZXBsYWNlKC9cXD8uKiQvLCAnJylcbiAgICAgIC8vICAgICAucmVwbGFjZSgvLipcXC8vLCAnJylcbiAgICAgIC8vICAgbGV0IG5ld0ZpbGVuYW1lID0gZmlsZW5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICdfMzAweC5qcGcnKVxuICAgICAgLy8gICBmID0gZS5mZWF0dXJlZF9pbWFnZS51cmwucmVwbGFjZShmaWxlbmFtZSwgbmV3RmlsZW5hbWUpXG4gICAgICAvLyB9XG5cbiAgICAgIGNvbnN0IHJlYWxQcmljZSA9IGUucHJpY2UgLyAxMDBcblxuICAgICAgY29uc3QgYWRkT25Qcm9kdWN0cyA9IHN0YXRlLml0ZW1zLm1hcCgocCkgPT4ge1xuICAgICAgICBpZiAocC5wcm9wZXJ0aWVzWydjYXJ0UGFyZW50J10gPT09IGUua2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiBwLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAgICBrZXk6IHAua2V5LFxuICAgICAgICAgICAgcHJpY2U6IHAucHJpY2UgLyAxMDAsXG4gICAgICAgICAgICBpZDogcC52YXJpYW50X2lkLFxuICAgICAgICAgICAgb3B0aW9uczogcC5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICAgICAgaW1hZ2U6IHAuZmVhdHVyZWRfaW1hZ2UudXJsLFxuICAgICAgICAgICAgcXR5OiBwLnF1YW50aXR5LFxuICAgICAgICAgICAgcHJvcGVydGllczogcC5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgcmVtb3ZlKCkge1xuICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGUocXR5KSB7XG4gICAgICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9KVxuXG4gICAgICBjb25zb2xlLmxvZyhhZGRPblByb2R1Y3RzKVxuXG4gICAgICBpZiAoIWUucHJvcGVydGllc1snY2FydFBhcmVudCddKSB7XG4gICAgICAgIHByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBlLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAga2V5OiBlLmtleSxcbiAgICAgICAgICBwcmljZTogcmVhbFByaWNlLFxuICAgICAgICAgIGlkOiBlLnZhcmlhbnRfaWQsXG4gICAgICAgICAgb3B0aW9uczogZS5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICAgIGltYWdlOiBmLFxuICAgICAgICAgIGFkZE9uUHJvZHVjdHM6IGFkZE9uUHJvZHVjdHMsXG4gICAgICAgICAgcXR5OiBlLnF1YW50aXR5LFxuICAgICAgICAgIHByb3BlcnRpZXM6IGUucHJvcGVydGllcyxcbiAgICAgICAgICByZW1vdmUoKSB7XG4gICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZShxdHkpIHtcbiAgICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG90YWw6IHN0YXRlLml0ZW1zX3N1YnRvdGFsX3ByaWNlIC8gMTAwLFxuICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcbiAgICBub3RlOiBzdGF0ZS5ub3RlLFxuICB9XG59XG5cbmZ1bmN0aW9uIGNhcnRSZW1vdmVJdGVtKGtleSkge1xuICBjYXJ0LnJlbW92ZUl0ZW0oa2V5KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNhcnRVcGRhdGVJdGVtKGtleSwgcXR5KSB7XG4gIGNhcnQudXBkYXRlSXRlbShrZXksIHsgcXVhbnRpdHk6IHF0eSB9KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJ0VXBkYXRlQWxsKHN0YXRlKSB7XG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlcHJvZHVjdHMnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydDogY2FydFRvQWxwaW5lKHN0YXRlKSB9LFxuICAgIH0pXG4gIClcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0Y291bnQnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydFRvdGFsOiBzdGF0ZS5pdGVtX2NvdW50IH0sXG4gICAgfSlcbiAgKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2FydFVwZGF0ZScsIChlKSA9PiB7XG4gIGNhcnQudXBkYXRlTm90ZShlLnRhcmdldC52YWx1ZSlcbn0pXG4iLCJzZXRIZWFkZXJIZWlnaHQoKVxuXG5mdW5jdGlvbiBzZXRIZWFkZXJIZWlnaHQoKSB7XG4gIGNvbnN0IGhlYWRlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oZWFkZXItaGVpZ2h0JywgYCR7aGVhZGVySGVpZ2h0fXB4YClcbiAgY29uc3QgZm9vdGVySGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RlcicpLm9mZnNldEhlaWdodFxuICBkb2N1bWVudC5ib2R5LnN0eWxlLnNldFByb3BlcnR5KCctLWZvb3Rlci1oZWlnaHQnLCBgJHtmb290ZXJIZWlnaHR9cHhgKVxuICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS13aW5kb3ctaGVpZ2h0JywgYCR7d2luZG93SGVpZ2h0fXB4YClcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldEhlYWRlckhlaWdodClcbiIsImltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcbmltcG9ydCAqIGFzIGN1cnJlbmN5IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWN1cnJlbmN5J1xuaW1wb3J0IHsgY2FydFVwZGF0ZUFsbCB9IGZyb20gJy4uL3V0aWxzL2NhcnQnXG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJ1xuXG5leHBvcnQgZGVmYXVsdCAocHJvZHVjdCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcInByb2R1Y3RcIiwgcHJvZHVjdCk7XG4gIGNvbnN0IGN1cnJlbnRWYXJpYW50ID0gcHJvZHVjdC5wcm9kdWN0LnZhcmlhbnRzWzBdXG4gIGNvbnN0IHZhcmlhbnRzID0gcHJvZHVjdC5wcm9kdWN0LnZhcmlhbnRzXG4gIGNvbnN0IGxpbmVyU3luYyA9IHByb2R1Y3QubGluZXJTeW5jXG5cbiAgY29uc3QgcHJpY2UgPSAodmFyaWFudElkLCBzZWxlY3RlZEFkZE9uUHJvZHVjdHMsIGhhc0xpbmVyKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coc2VsZWN0ZWRBZGRPblByb2R1Y3RzKTtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXVxuICAgIGxldCBhZGRPblByaWNlID0gMFxuICAgIGlmIChzZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgYWRkT25QcmljZSA9IGFkZE9uUHJpY2UgKyBlLnByaWNlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChoYXNMaW5lcikge1xuICAgICAgYWRkT25QcmljZSA9IGFkZE9uUHJpY2UgKyBoYXNMaW5lclxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhY3R1YWxQcmljZTogJyQnICsgKHZhcmlhbnQucHJpY2UgKyBhZGRPblByaWNlKSAvIDEwMCxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IHZhcmlhbnQuY29tcGFyZV9hdF9wcmljZVxuICAgICAgICA/ICckJyArICh2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2UgKyBhZGRPblByaWNlKSAvIDEwMFxuICAgICAgICA6ICcnLFxuICAgICAgbWVzc2FnZTogJycsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY3VycmVudE9wdGlvbnMgPSAodmFyaWFudElkKSA9PiB7XG4gICAgY29uc3QgdmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IHZhcmlhbnRJZClbMF1cbiAgICBjb25zdCBjdXJyZW50T3B0aW9ucyA9IHByb2R1Y3QucHJvZHVjdC5vcHRpb25zLm1hcCgoZSwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogZSxcbiAgICAgICAgdmFsdWU6IHZhcmlhbnQub3B0aW9uc1tpXSxcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBjdXJyZW50T3B0aW9uc1xuICB9XG5cbiAgY29uc3QgaGFuZGxlQWRkT24gPSAoaWQsIHNlbGVjdGVkQWRkT25zLCBwcmljZSkgPT4ge1xuICAgIGxldCB1cGRhdGVkQWRkT25zID0gc2VsZWN0ZWRBZGRPbnNcbiAgICBjb25zdCBjaGVja1N0YXR1cyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IGlkKVxuICAgIGlmIChjaGVja1N0YXR1cy5sZW5ndGggPiAwKSB7XG4gICAgICB1cGRhdGVkQWRkT25zID0gc2VsZWN0ZWRBZGRPbnMuZmlsdGVyKChvYmopID0+IG9iai5pZCAhPSBpZClcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlZEFkZE9ucy5wdXNoKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBxdHk6IDEsXG4gICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB1cGRhdGVkQWRkT25zXG4gIH1cblxuICBjb25zdCBsaW5lcklkID0gKHZhcmlhbnQpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImxpbmVyXCIsIGxpbmVyU3luYylcbiAgICAvLyBjb25zb2xlLmxvZyhcInZhcmlhbnRcIiwgdmFyaWFudClcbiAgICBjb25zdCBsaW5lckZpbHRlciA9IHByb2R1Y3QubGluZXJTeW5jLmZpbmQoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIG9iai52YXJpYW50SWQgPT09IHZhcmlhbnRcbiAgICB9KVxuICAgIC8vIGNvbnNvbGUubG9nKFwibGluZXJcIiwgbGluZXJGaWx0ZXIpXG4gICAgcmV0dXJuIGxpbmVyRmlsdGVyID8gbGluZXJGaWx0ZXIgOiBudWxsXG4gICAgLy8gcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLy9kZWZhdWx0c1xuICAgIHByaWNlOiBwcmljZShjdXJyZW50VmFyaWFudC5pZCwgW10sIGZhbHNlKSxcbiAgICBzdWJtaXRUZXh0OiAnQWRkIHRvIENhcnQnLFxuICAgIGRpc2FibGVkOiBjdXJyZW50VmFyaWFudC5hdmFpbGFibGUgPyBmYWxzZSA6IHRydWUsXG4gICAgYnV0dG9uOiBjdXJyZW50VmFyaWFudC5hdmFpbGFibGUgPyAnQWRkIHRvIENhcnQnIDogJ1VuYXZhaWxhYmxlJyxcbiAgICBhZGRPblByb2R1Y3RzOiBwcm9kdWN0LmFkZE9uUHJvZHVjdHMsXG4gICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzOiBbXSxcblxuICAgIG9wdGlvbnM6IGN1cnJlbnRPcHRpb25zKGN1cnJlbnRWYXJpYW50LmlkKSxcbiAgICAvLyAgYXZhaWxhYmxlT3B0aW9uczogYXZhaWxhYmxlT3B0aW9ucyh0aGlzLm9wdGlvbnMpLFxuXG4gICAgLy9TdG9yZSBmb3Igc2VuZGluZyB0byBhZGQgY2FydFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICBpZDogY3VycmVudFZhcmlhbnQuaWQsXG4gICAgICBxdHk6IDEsXG4gICAgfSxcblxuICAgIGxpbmVyOiB7XG4gICAgICBsaW5lckluZm86IGxpbmVySWQoY3VycmVudFZhcmlhbnQuaWQpLFxuICAgICAgYWRkTGluZXI6IGZhbHNlLFxuICAgIH0sXG5cbiAgICAvL2Zvcm0gYWN0aW9uc1xuICAgIGNoZWNrQWRkT25zKGlkKSB7XG4gICAgICBjb25zdCBjaGVja1N0YXR1cyA9IHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZpbHRlcihcbiAgICAgICAgKG9iaikgPT4gb2JqLmlkID09PSBpZFxuICAgICAgKVxuICAgICAgaWYgKGNoZWNrU3RhdHVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0QWRkb24oaWQsIHNlbGVjdGVkQWRkT25zLCBjb3N0KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IGhhbmRsZUFkZE9uKGlkLCBzZWxlY3RlZEFkZE9ucywgY29zdClcbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZShcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMsXG4gICAgICAgIHRoaXMubGluZXIuYWRkTGluZXIgPyB0aGlzLmxpbmVyLmxpbmVySW5mby5saW5lclByaWNlIDogZmFsc2VcbiAgICAgIClcbiAgICAgIC8vIGNvbnNvbGUubG9nKGhhbmRsZUFkZE9uKGlkLCBzZWxlY3RlZEFkZE9ucykpXG4gICAgfSxcbiAgICBpbmNyZWFzZSgpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID0gdGhpcy5mb3JtRGF0YS5xdHkgKyAxXG4gICAgfSxcbiAgICBkZWNyZWFzZSgpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID1cbiAgICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgLSAxID09PSAwID8gMSA6IHRoaXMuZm9ybURhdGEucXR5IC0gMVxuICAgIH0sXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICB0aGlzLmJ1dHRvbiA9ICdBZGRpbmcuLi4nXG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgZmV0Y2god2luZG93LlNob3BpZnkucm91dGVzLnJvb3QgKyAnY2FydC9hZGQuanMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiB0aGlzLmZvcm1EYXRhLmlkLFxuICAgICAgICAgICAgICBxdWFudGl0eTogdGhpcy5mb3JtRGF0YS5xdHksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICAgIGNvbnN0IGxhc3RDYXJ0SXRlbSA9IHJlc3VsdC5pdGVtcy5wb3AoKVxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cy5sZW5ndGggPCAxICYmIHRoaXMubGluZXIuYWRkTGluZXIpIHtcbiAgICAgICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdBZGQgdG8gQ2FydCdcbiAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gW11cbiAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0c3RhdHVzJywge1xuICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IGNhcnRPcGVuOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYWRkT25DYXJ0UHJvZHVjdHMgPSBbXVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICAgIGFkZE9uQ2FydFByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBlLmlkLFxuICAgICAgICAgICAgICAgIHF0eTogMSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICBjYXJ0UGFyZW50OiBsYXN0Q2FydEl0ZW0ua2V5LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaWYgKHRoaXMubGluZXIuYWRkTGluZXIpIHtcbiAgICAgICAgICAgICAgYWRkT25DYXJ0UHJvZHVjdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVySWQsXG4gICAgICAgICAgICAgICAgcXR5OiB0aGlzLmZvcm1EYXRhLnF0eSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICBjYXJ0UGFyZW50OiBsYXN0Q2FydEl0ZW0ua2V5LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZldGNoKHdpbmRvdy5TaG9waWZ5LnJvdXRlcy5yb290ICsgJ2NhcnQvYWRkLmpzJywge1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBpdGVtczogYWRkT25DYXJ0UHJvZHVjdHMsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IFtdXG4gICAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0c3RhdHVzJywge1xuICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDogeyBjYXJ0T3BlbjogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgICAgICAgYWxlcnQoYFRoaXMgcHJvZHVjdCBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50YClcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdVbmF2YWlsYWJsZSdcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgICBhbGVydChgVGhpcyBwcm9kdWN0IGlzIHVuYXZhaWxhYmxlIGF0IHRoZSBtb21lbnRgKVxuICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ1VuYXZhaWxhYmxlJ1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBhZGRMaW5lcigpIHtcbiAgICAgIHRoaXMubGluZXIuYWRkTGluZXIgPSAhdGhpcy5saW5lci5hZGRMaW5lclxuICAgICAgdGhpcy5wcmljZSA9IHByaWNlKFxuICAgICAgICB0aGlzLmZvcm1EYXRhLmlkLFxuICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyxcbiAgICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA/IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVyUHJpY2UgOiBmYWxzZVxuICAgICAgKVxuICAgIH0sXG4gICAgdXBkYXRlVmFyaWFudCh2YWx1ZSwgb3B0aW9uKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zXG4gICAgICBjb25zdCBuZXdPcHRpb25zID0gb3B0aW9ucy5tYXAoKGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGUubmFtZSA9PSBvcHRpb24gPyB2YWx1ZSA6IGUudmFsdWVcbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IG5ld1ZhcmlhbnQgPSB2YXJpYW50cy5maWx0ZXIoKHZhcmlhbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGlzRXF1YWwodmFyaWFudC5vcHRpb25zLCBuZXdPcHRpb25zKVxuICAgICAgfSlbMF1cblxuICAgICAgLy8gY29uc29sZS5sb2cobmV3VmFyaWFudCk7XG5cbiAgICAgIDsodGhpcy5saW5lci5saW5lckluZm8gPSBsaW5lcklkKG5ld1ZhcmlhbnQuaWQpKSxcbiAgICAgICAgKHRoaXMucHJpY2UgPSBwcmljZShcbiAgICAgICAgICBuZXdWYXJpYW50LmlkLFxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLFxuICAgICAgICAgIHRoaXMubGluZXIuYWRkTGluZXIgPyB0aGlzLmxpbmVyLmxpbmVySW5mby5saW5lclByaWNlIDogZmFsc2VcbiAgICAgICAgKSlcbiAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSBuZXdWYXJpYW50LmlkXG4gICAgICB0aGlzLmRpc2FibGVkID0gbmV3VmFyaWFudC5hdmFpbGFibGUgPyBmYWxzZSA6IHRydWVcbiAgICAgIHRoaXMuYnV0dG9uID0gbmV3VmFyaWFudC5hdmFpbGFibGUgPyAnQWRkIHRvIENhcnQnIDogJ1VuYXZhaWxhYmxlJ1xuICAgICAgdGhpcy5vcHRpb25zID0gY3VycmVudE9wdGlvbnMobmV3VmFyaWFudC5pZClcbiAgICB9LFxuICB9XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSBmdW5jdGlvbihyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpIHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNodW5rSWRzID0gZGVmZXJyZWRbaV1bMF07XG5cdFx0dmFyIGZuID0gZGVmZXJyZWRbaV1bMV07XG5cdFx0dmFyIHByaW9yaXR5ID0gZGVmZXJyZWRbaV1bMl07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pOyB9KSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYmFzZVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IGZ1bmN0aW9uKGNodW5rSWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMDsgfTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlcGljc3VwcmVtZV9zaG9waWZ5XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9iYXNlLmpzXCIpOyB9KVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvYmFzZS5zY3NzXCIpOyB9KVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJBbHBpbmUiLCJjb2xsYXBzZSIsInByb2R1Y3QiLCJwbHVnaW4iLCJkYXRhIiwid2luZG93Iiwic3RhcnQiLCJjb252ZXJ0Q29sb3JWYXJpYWJsZXMiLCJjYXJ0IiwiZ2V0U3RhdGUiLCJ0aGVuIiwic3RhdGUiLCJjb25zb2xlIiwibG9nIiwiY2FydFVwZGF0ZUFsbCIsImNhcnRUb0FscGluZSIsInByb2R1Y3RzIiwiaXRlbXMiLCJmb3JFYWNoIiwiZSIsImYiLCJmZWF0dXJlZF9pbWFnZSIsInVybCIsInJlYWxQcmljZSIsInByaWNlIiwiYWRkT25Qcm9kdWN0cyIsIm1hcCIsInAiLCJwcm9wZXJ0aWVzIiwia2V5IiwidGl0bGUiLCJwcm9kdWN0X3RpdGxlIiwiaWQiLCJ2YXJpYW50X2lkIiwib3B0aW9ucyIsIm9wdGlvbnNfd2l0aF92YWx1ZXMiLCJpbWFnZSIsInF0eSIsInF1YW50aXR5IiwicmVtb3ZlIiwiY2FydFJlbW92ZUl0ZW0iLCJ1cGRhdGUiLCJjYXJ0VXBkYXRlSXRlbSIsInBhcnNlSW50IiwicHVzaCIsInRvdGFsIiwiaXRlbXNfc3VidG90YWxfcHJpY2UiLCJub3RlIiwicmVtb3ZlSXRlbSIsInVwZGF0ZUl0ZW0iLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJjYXJ0VG90YWwiLCJpdGVtX2NvdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInVwZGF0ZU5vdGUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInNldEhlYWRlckhlaWdodCIsImhlYWRlckhlaWdodCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvZmZzZXRIZWlnaHQiLCJib2R5Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImZvb3RlckhlaWdodCIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0IiwiY3VycmVuY3kiLCJpc0VxdWFsIiwiY3VycmVudFZhcmlhbnQiLCJ2YXJpYW50cyIsImxpbmVyU3luYyIsInZhcmlhbnRJZCIsInNlbGVjdGVkQWRkT25Qcm9kdWN0cyIsImhhc0xpbmVyIiwidmFyaWFudCIsImZpbHRlciIsIm9iaiIsImFkZE9uUHJpY2UiLCJsZW5ndGgiLCJhY3R1YWxQcmljZSIsIm9yaWdpbmFsUHJpY2UiLCJjb21wYXJlX2F0X3ByaWNlIiwibWVzc2FnZSIsImN1cnJlbnRPcHRpb25zIiwiaSIsIm5hbWUiLCJoYW5kbGVBZGRPbiIsInNlbGVjdGVkQWRkT25zIiwidXBkYXRlZEFkZE9ucyIsImNoZWNrU3RhdHVzIiwibGluZXJJZCIsImxpbmVyRmlsdGVyIiwiZmluZCIsInN1Ym1pdFRleHQiLCJkaXNhYmxlZCIsImF2YWlsYWJsZSIsImJ1dHRvbiIsImZvcm1EYXRhIiwibGluZXIiLCJsaW5lckluZm8iLCJhZGRMaW5lciIsImNoZWNrQWRkT25zIiwic2VsZWN0QWRkb24iLCJjb3N0IiwibGluZXJQcmljZSIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJvblN1Ym1pdCIsImZldGNoIiwiU2hvcGlmeSIsInJvdXRlcyIsInJvb3QiLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwianNvbiIsInJlc3VsdCIsImxhc3RDYXJ0SXRlbSIsInBvcCIsImNhcnRPcGVuIiwiYWRkT25DYXJ0UHJvZHVjdHMiLCJjYXJ0UGFyZW50IiwiY2F0Y2giLCJhbGVydCIsInVwZGF0ZVZhcmlhbnQiLCJvcHRpb24iLCJuZXdPcHRpb25zIiwibmV3VmFyaWFudCJdLCJzb3VyY2VSb290IjoiIn0=