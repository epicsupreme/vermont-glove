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
        if (p.properties["cartParent"] === e.key) {
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

      if (!e.properties["cartParent"]) {
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
            _this.button = "Add to Cart";
            _this.disabled = false;
            _this.selectedAddOnProducts = [];
            window.dispatchEvent(new CustomEvent("updatecartstatus", {
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

          fetch(window.Shopify.routes.root + "cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              items: addOnCartProducts
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
            console.log(e);
            alert("This product is unavailable at the moment");
            _this.button = "Unavailable";
            _this.disabled = true;
          });
        }
      }).catch(function (e) {
        console.log(e);
        alert("This product is unavailable at the moment");
        _this.button = "Unavailable";
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
      })[0]; // console.log(newVariant);

      this.liner.linerInfo = linerId(newVariant.id), this.price = price(newVariant.id, this.selectedAddOnProducts, this.liner.addLiner ? this.liner.linerInfo.linerPrice : false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BELDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBLDhDQUE4Qzs7V0FFOUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxtQ0FBbUM7V0FDcEU7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWxEQTtVQUNBO1VBQ0E7VUFDQSwyREFBMkQsc0RBQXNEO1VBQ2pILHFGQUFxRix1REFBdUQ7VUFDNUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvYmFzZS5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvY2FydC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvaGVhZGVyLWhlaWdodC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3N0eWxlcy9iYXNlLnNjc3MiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFscGluZSBmcm9tICdhbHBpbmVqcydcbmltcG9ydCBjb2xsYXBzZSBmcm9tICdAYWxwaW5lanMvY29sbGFwc2UnXG5cbmltcG9ydCBwcm9kdWN0IGZyb20gJy4vdXRpbHMvcHJvZHVjdCdcblxuaW1wb3J0ICcuL3V0aWxzL2hlYWRlci1oZWlnaHQnXG5pbXBvcnQgJy4vdXRpbHMvY2FydCdcbi8vIGltcG9ydCAnLi9hbmltYXRpb25zL2hlYWRlcidcblxuQWxwaW5lLnBsdWdpbihjb2xsYXBzZSlcblxuQWxwaW5lLmRhdGEoJ3Byb2R1Y3QnLCBwcm9kdWN0KVxuXG53aW5kb3cuQWxwaW5lID0gQWxwaW5lXG5cbkFscGluZS5zdGFydCgpXG4iLCJpbXBvcnQgeyBjb252ZXJ0Q29sb3JWYXJpYWJsZXMgfSBmcm9tICdAbWVydGFzYW4vdGFpbHdpbmRjc3MtdmFyaWFibGVzL3NyYy9oZWxwZXJzJ1xuaW1wb3J0ICogYXMgY2FydCBmcm9tICdAc2hvcGlmeS90aGVtZS1jYXJ0J1xuXG5jYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgY29uc29sZS5sb2coc3RhdGUpXG4gIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG59KVxuXG5mdW5jdGlvbiBjYXJ0VG9BbHBpbmUoc3RhdGUpIHtcbiAgbGV0IHByb2R1Y3RzID0gW11cbiAgaWYgKHN0YXRlLml0ZW1zKSB7XG4gICAgc3RhdGUuaXRlbXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgbGV0IGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuXG4gICAgICAvLyBpZiAoZS5mZWF0dXJlZF9pbWFnZS51cmwpIHtcbiAgICAgIC8vICAgbGV0IGZpbGVuYW1lID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcbiAgICAgIC8vICAgICAucmVwbGFjZSgvXFw/LiokLywgJycpXG4gICAgICAvLyAgICAgLnJlcGxhY2UoLy4qXFwvLywgJycpXG4gICAgICAvLyAgIGxldCBuZXdGaWxlbmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnXzMwMHguanBnJylcbiAgICAgIC8vICAgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsLnJlcGxhY2UoZmlsZW5hbWUsIG5ld0ZpbGVuYW1lKVxuICAgICAgLy8gfVxuXG4gICAgICBjb25zdCByZWFsUHJpY2UgPSBlLnByaWNlIC8gMTAwXG5cbiAgICAgIGNvbnN0IGFkZE9uUHJvZHVjdHMgPSBzdGF0ZS5pdGVtcy5tYXAocCA9PiB7XG4gICAgICAgIGlmKHAucHJvcGVydGllc1tcImNhcnRQYXJlbnRcIl0gPT09IGUua2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiBwLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAgICBrZXk6IHAua2V5LFxuICAgICAgICAgICAgcHJpY2U6IHAucHJpY2UgLyAxMDAsXG4gICAgICAgICAgICBpZDogcC52YXJpYW50X2lkLFxuICAgICAgICAgICAgb3B0aW9uczogcC5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICAgICAgaW1hZ2U6IHAuZmVhdHVyZWRfaW1hZ2UudXJsLFxuICAgICAgICAgICAgcXR5OiBwLnF1YW50aXR5LFxuICAgICAgICAgICAgcHJvcGVydGllczogcC5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgcmVtb3ZlKCkge1xuICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGUocXR5KSB7XG4gICAgICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSlcblxuICAgICAgY29uc29sZS5sb2coYWRkT25Qcm9kdWN0cylcblxuICAgICAgaWYoIWUucHJvcGVydGllc1tcImNhcnRQYXJlbnRcIl0pIHtcblxuICAgICAgICBwcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogZS5wcm9kdWN0X3RpdGxlLFxuICAgICAgICAgIGtleTogZS5rZXksXG4gICAgICAgICAgcHJpY2U6IHJlYWxQcmljZSxcbiAgICAgICAgICBpZDogZS52YXJpYW50X2lkLFxuICAgICAgICAgIG9wdGlvbnM6IGUub3B0aW9uc193aXRoX3ZhbHVlcyxcbiAgICAgICAgICBpbWFnZTogZixcbiAgICAgICAgICBhZGRPblByb2R1Y3RzOiBhZGRPblByb2R1Y3RzLFxuICAgICAgICAgIHF0eTogZS5xdWFudGl0eSxcbiAgICAgICAgICBwcm9wZXJ0aWVzOiBlLnByb3BlcnRpZXMsXG4gICAgICAgICAgcmVtb3ZlKCkge1xuICAgICAgICAgICAgY2FydFJlbW92ZUl0ZW0odGhpcy5rZXkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cGRhdGUocXR5KSB7XG4gICAgICAgICAgICBjYXJ0VXBkYXRlSXRlbSh0aGlzLmtleSwgcGFyc2VJbnQocXR5KSlcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG90YWw6IHN0YXRlLml0ZW1zX3N1YnRvdGFsX3ByaWNlIC8gMTAwLFxuICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcbiAgICBub3RlOiBzdGF0ZS5ub3RlLFxuICB9XG59XG5cbmZ1bmN0aW9uIGNhcnRSZW1vdmVJdGVtKGtleSkge1xuICBjYXJ0LnJlbW92ZUl0ZW0oa2V5KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNhcnRVcGRhdGVJdGVtKGtleSwgcXR5KSB7XG4gIGNhcnQudXBkYXRlSXRlbShrZXksIHsgcXVhbnRpdHk6IHF0eSB9KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJ0VXBkYXRlQWxsKHN0YXRlKSB7XG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlcHJvZHVjdHMnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydDogY2FydFRvQWxwaW5lKHN0YXRlKSB9LFxuICAgIH0pXG4gIClcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0Y291bnQnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydFRvdGFsOiBzdGF0ZS5pdGVtX2NvdW50IH0sXG4gICAgfSlcbiAgKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2FydFVwZGF0ZScsIChlKSA9PiB7XG4gIGNhcnQudXBkYXRlTm90ZShlLnRhcmdldC52YWx1ZSlcbn0pXG4iLCJzZXRIZWFkZXJIZWlnaHQoKVxuXG5mdW5jdGlvbiBzZXRIZWFkZXJIZWlnaHQoKSB7XG4gIGNvbnN0IGhlYWRlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oZWFkZXItaGVpZ2h0JywgYCR7aGVhZGVySGVpZ2h0fXB4YClcbiAgY29uc3QgZm9vdGVySGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RlcicpLm9mZnNldEhlaWdodFxuICBkb2N1bWVudC5ib2R5LnN0eWxlLnNldFByb3BlcnR5KCctLWZvb3Rlci1oZWlnaHQnLCBgJHtmb290ZXJIZWlnaHR9cHhgKVxuICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS13aW5kb3ctaGVpZ2h0JywgYCR7d2luZG93SGVpZ2h0fXB4YClcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldEhlYWRlckhlaWdodClcbiIsImltcG9ydCAqIGFzIGNhcnQgZnJvbSBcIkBzaG9waWZ5L3RoZW1lLWNhcnRcIjtcbmltcG9ydCAqIGFzIGN1cnJlbmN5IGZyb20gXCJAc2hvcGlmeS90aGVtZS1jdXJyZW5jeVwiO1xuaW1wb3J0IHsgY2FydFVwZGF0ZUFsbCB9IGZyb20gXCIuLi91dGlscy9jYXJ0XCI7XG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgZGVmYXVsdCAocHJvZHVjdCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcInByb2R1Y3RcIiwgcHJvZHVjdCk7XG4gIGNvbnN0IGN1cnJlbnRWYXJpYW50ID0gcHJvZHVjdC5wcm9kdWN0LnZhcmlhbnRzWzBdO1xuICBjb25zdCB2YXJpYW50cyA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50cztcbiAgY29uc3QgbGluZXJTeW5jID0gcHJvZHVjdC5saW5lclN5bmM7XG5cbiAgY29uc3QgcHJpY2UgPSAodmFyaWFudElkLCBzZWxlY3RlZEFkZE9uUHJvZHVjdHMsIGhhc0xpbmVyKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coc2VsZWN0ZWRBZGRPblByb2R1Y3RzKTtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXTtcbiAgICBsZXQgYWRkT25QcmljZSA9IDA7XG4gICAgaWYgKHNlbGVjdGVkQWRkT25Qcm9kdWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBzZWxlY3RlZEFkZE9uUHJvZHVjdHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBhZGRPblByaWNlID0gYWRkT25QcmljZSArIGUucHJpY2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaGFzTGluZXIpIHtcbiAgICAgIGFkZE9uUHJpY2UgPSBhZGRPblByaWNlICsgaGFzTGluZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdHVhbFByaWNlOiBcIiRcIiArICh2YXJpYW50LnByaWNlICsgYWRkT25QcmljZSkgLyAxMDAsXG4gICAgICBvcmlnaW5hbFByaWNlOiB2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2VcbiAgICAgICAgPyBcIiRcIiArICh2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2UgKyBhZGRPblByaWNlKSAvIDEwMFxuICAgICAgICA6IFwiXCIsXG4gICAgICBtZXNzYWdlOiBcIlwiLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgY3VycmVudE9wdGlvbnMgPSAodmFyaWFudElkKSA9PiB7XG4gICAgY29uc3QgdmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IHZhcmlhbnRJZClbMF07XG4gICAgY29uc3QgY3VycmVudE9wdGlvbnMgPSBwcm9kdWN0LnByb2R1Y3Qub3B0aW9ucy5tYXAoKGUsIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGUsXG4gICAgICAgIHZhbHVlOiB2YXJpYW50Lm9wdGlvbnNbaV0sXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBjdXJyZW50T3B0aW9ucztcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRPbiA9IChpZCwgc2VsZWN0ZWRBZGRPbnMsIHByaWNlKSA9PiB7XG4gICAgbGV0IHVwZGF0ZWRBZGRPbnMgPSBzZWxlY3RlZEFkZE9ucztcbiAgICBjb25zdCBjaGVja1N0YXR1cyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IGlkKTtcbiAgICBpZiAoY2hlY2tTdGF0dXMubGVuZ3RoID4gMCkge1xuICAgICAgdXBkYXRlZEFkZE9ucyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgIT0gaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVkQWRkT25zLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHF0eTogMSxcbiAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1cGRhdGVkQWRkT25zO1xuICB9O1xuXG4gIGNvbnN0IGxpbmVySWQgPSAodmFyaWFudCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibGluZXJcIiwgbGluZXJTeW5jKVxuICAgIC8vIGNvbnNvbGUubG9nKFwidmFyaWFudFwiLCB2YXJpYW50KVxuICAgIGNvbnN0IGxpbmVyRmlsdGVyID0gcHJvZHVjdC5saW5lclN5bmMuZmluZCgob2JqKSA9PiB7XG4gICAgICByZXR1cm4gb2JqLnZhcmlhbnRJZCA9PT0gdmFyaWFudDtcbiAgICB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImxpbmVyXCIsIGxpbmVyRmlsdGVyKVxuICAgIHJldHVybiBsaW5lckZpbHRlciA/IGxpbmVyRmlsdGVyIDogbnVsbDtcbiAgICAvLyByZXR1cm4gbnVsbFxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgLy9kZWZhdWx0c1xuICAgIHByaWNlOiBwcmljZShjdXJyZW50VmFyaWFudC5pZCwgW10sIGZhbHNlKSxcbiAgICBzdWJtaXRUZXh0OiBcIkFkZCB0byBDYXJ0XCIsXG4gICAgZGlzYWJsZWQ6IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICBidXR0b246IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/IFwiQWRkIHRvIENhcnRcIiA6IFwiVW5hdmFpbGFibGVcIixcbiAgICBhZGRPblByb2R1Y3RzOiBwcm9kdWN0LmFkZE9uUHJvZHVjdHMsXG4gICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzOiBbXSxcblxuICAgIG9wdGlvbnM6IGN1cnJlbnRPcHRpb25zKGN1cnJlbnRWYXJpYW50LmlkKSxcbiAgICAvLyAgYXZhaWxhYmxlT3B0aW9uczogYXZhaWxhYmxlT3B0aW9ucyh0aGlzLm9wdGlvbnMpLFxuXG4gICAgLy9TdG9yZSBmb3Igc2VuZGluZyB0byBhZGQgY2FydFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICBpZDogY3VycmVudFZhcmlhbnQuaWQsXG4gICAgICBxdHk6IDEsXG4gICAgfSxcblxuICAgIGxpbmVyOiB7XG4gICAgICBsaW5lckluZm86IGxpbmVySWQoY3VycmVudFZhcmlhbnQuaWQpLFxuICAgICAgYWRkTGluZXI6IGZhbHNlLFxuICAgIH0sXG5cbiAgICAvL2Zvcm0gYWN0aW9uc1xuICAgIGNoZWNrQWRkT25zKGlkKSB7XG4gICAgICBjb25zdCBjaGVja1N0YXR1cyA9IHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZpbHRlcihcbiAgICAgICAgKG9iaikgPT4gb2JqLmlkID09PSBpZFxuICAgICAgKTtcbiAgICAgIGlmIChjaGVja1N0YXR1cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0QWRkb24oaWQsIHNlbGVjdGVkQWRkT25zLCBjb3N0KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IGhhbmRsZUFkZE9uKGlkLCBzZWxlY3RlZEFkZE9ucywgY29zdCk7XG4gICAgICB0aGlzLnByaWNlID0gcHJpY2UoXG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQsXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLFxuICAgICAgICB0aGlzLmxpbmVyLmFkZExpbmVyID8gdGhpcy5saW5lci5saW5lckluZm8ubGluZXJQcmljZSA6IGZhbHNlXG4gICAgICApO1xuICAgICAgLy8gY29uc29sZS5sb2coaGFuZGxlQWRkT24oaWQsIHNlbGVjdGVkQWRkT25zKSlcbiAgICB9LFxuICAgIGluY3JlYXNlKCkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPSB0aGlzLmZvcm1EYXRhLnF0eSArIDE7XG4gICAgfSxcbiAgICBkZWNyZWFzZSgpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID1cbiAgICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgLSAxID09PSAwID8gMSA6IHRoaXMuZm9ybURhdGEucXR5IC0gMTtcbiAgICB9LFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgdGhpcy5idXR0b24gPSBcIkFkZGluZy4uLlwiO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArIFwiY2FydC9hZGQuanNcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZm9ybURhdGEucXR5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgIGNvbnN0IGxhc3RDYXJ0SXRlbSA9IHJlc3VsdC5pdGVtcy5wb3AoKTtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoIDwgMSAmJiB0aGlzLmxpbmVyLmFkZExpbmVyKSB7XG4gICAgICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSk7XG4gICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gXCJBZGQgdG8gQ2FydFwiO1xuICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gW107XG4gICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChcInVwZGF0ZWNhcnRzdGF0dXNcIiwge1xuICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IGNhcnRPcGVuOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhZGRPbkNhcnRQcm9kdWN0cyA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICAgIGFkZE9uQ2FydFByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBlLmlkLFxuICAgICAgICAgICAgICAgIHF0eTogMSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICBjYXJ0UGFyZW50OiBsYXN0Q2FydEl0ZW0ua2V5LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5saW5lci5hZGRMaW5lcikge1xuICAgICAgICAgICAgICBhZGRPbkNhcnRQcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5saW5lci5saW5lckluZm8ubGluZXJJZCxcbiAgICAgICAgICAgICAgICBxdHk6IHRoaXMuZm9ybURhdGEucXR5LFxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgIGNhcnRQYXJlbnQ6IGxhc3RDYXJ0SXRlbS5rZXksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZldGNoKHdpbmRvdy5TaG9waWZ5LnJvdXRlcy5yb290ICsgXCJjYXJ0L2FkZC5qc1wiLCB7XG4gICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBhZGRPbkNhcnRQcm9kdWN0cyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gXCJBZGQgdG8gQ2FydFwiO1xuICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJ1cGRhdGVjYXJ0c3RhdHVzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgY2FydE9wZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gXCJVbmF2YWlsYWJsZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApO1xuICAgICAgICAgIHRoaXMuYnV0dG9uID0gXCJVbmF2YWlsYWJsZVwiO1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGFkZExpbmVyKCkge1xuICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA9ICF0aGlzLmxpbmVyLmFkZExpbmVyO1xuICAgICAgdGhpcy5wcmljZSA9IHByaWNlKFxuICAgICAgICB0aGlzLmZvcm1EYXRhLmlkLFxuICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyxcbiAgICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA/IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVyUHJpY2UgOiBmYWxzZVxuICAgICAgKTtcbiAgICB9LFxuICAgIHVwZGF0ZVZhcmlhbnQodmFsdWUsIG9wdGlvbikge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBvcHRpb25zLm1hcCgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS5uYW1lID09IG9wdGlvbiA/IHZhbHVlIDogZS52YWx1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBuZXdWYXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKCh2YXJpYW50KSA9PiB7XG4gICAgICAgIHJldHVybiBpc0VxdWFsKHZhcmlhbnQub3B0aW9ucywgbmV3T3B0aW9ucyk7XG4gICAgICB9KVswXTtcblxuICAgICAgLy8gY29uc29sZS5sb2cobmV3VmFyaWFudCk7XG5cbiAgICAgICh0aGlzLmxpbmVyLmxpbmVySW5mbyA9IGxpbmVySWQobmV3VmFyaWFudC5pZCkpLFxuICAgICAgICAodGhpcy5wcmljZSA9IHByaWNlKFxuICAgICAgICAgIG5ld1ZhcmlhbnQuaWQsXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMsXG4gICAgICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA/IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVyUHJpY2UgOiBmYWxzZVxuICAgICAgICApKTtcbiAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSBuZXdWYXJpYW50LmlkO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IG5ld1ZhcmlhbnQuYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlO1xuICAgICAgdGhpcy5idXR0b24gPSBuZXdWYXJpYW50LmF2YWlsYWJsZSA/IFwiQWRkIHRvIENhcnRcIiA6IFwiVW5hdmFpbGFibGVcIjtcbiAgICAgIHRoaXMub3B0aW9ucyA9IGN1cnJlbnRPcHRpb25zKG5ld1ZhcmlhbnQuaWQpO1xuICAgIH0sXG4gIH07XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImJhc2VcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvYmFzZS5qc1wiKTsgfSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzc1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiQWxwaW5lIiwiY29sbGFwc2UiLCJwcm9kdWN0IiwicGx1Z2luIiwiZGF0YSIsIndpbmRvdyIsInN0YXJ0IiwiY29udmVydENvbG9yVmFyaWFibGVzIiwiY2FydCIsImdldFN0YXRlIiwidGhlbiIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsImNhcnRVcGRhdGVBbGwiLCJjYXJ0VG9BbHBpbmUiLCJwcm9kdWN0cyIsIml0ZW1zIiwiZm9yRWFjaCIsImUiLCJmIiwiZmVhdHVyZWRfaW1hZ2UiLCJ1cmwiLCJyZWFsUHJpY2UiLCJwcmljZSIsImFkZE9uUHJvZHVjdHMiLCJtYXAiLCJwIiwicHJvcGVydGllcyIsImtleSIsInRpdGxlIiwicHJvZHVjdF90aXRsZSIsImlkIiwidmFyaWFudF9pZCIsIm9wdGlvbnMiLCJvcHRpb25zX3dpdGhfdmFsdWVzIiwiaW1hZ2UiLCJxdHkiLCJxdWFudGl0eSIsInJlbW92ZSIsImNhcnRSZW1vdmVJdGVtIiwidXBkYXRlIiwiY2FydFVwZGF0ZUl0ZW0iLCJwYXJzZUludCIsInB1c2giLCJ0b3RhbCIsIml0ZW1zX3N1YnRvdGFsX3ByaWNlIiwibm90ZSIsInJlbW92ZUl0ZW0iLCJ1cGRhdGVJdGVtIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiY2FydFRvdGFsIiwiaXRlbV9jb3VudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cGRhdGVOb3RlIiwidGFyZ2V0IiwidmFsdWUiLCJzZXRIZWFkZXJIZWlnaHQiLCJoZWFkZXJIZWlnaHQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwib2Zmc2V0SGVpZ2h0IiwiYm9keSIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJmb290ZXJIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJpbm5lckhlaWdodCIsImN1cnJlbmN5IiwiaXNFcXVhbCIsImN1cnJlbnRWYXJpYW50IiwidmFyaWFudHMiLCJsaW5lclN5bmMiLCJ2YXJpYW50SWQiLCJzZWxlY3RlZEFkZE9uUHJvZHVjdHMiLCJoYXNMaW5lciIsInZhcmlhbnQiLCJmaWx0ZXIiLCJvYmoiLCJhZGRPblByaWNlIiwibGVuZ3RoIiwiYWN0dWFsUHJpY2UiLCJvcmlnaW5hbFByaWNlIiwiY29tcGFyZV9hdF9wcmljZSIsIm1lc3NhZ2UiLCJjdXJyZW50T3B0aW9ucyIsImkiLCJuYW1lIiwiaGFuZGxlQWRkT24iLCJzZWxlY3RlZEFkZE9ucyIsInVwZGF0ZWRBZGRPbnMiLCJjaGVja1N0YXR1cyIsImxpbmVySWQiLCJsaW5lckZpbHRlciIsImZpbmQiLCJzdWJtaXRUZXh0IiwiZGlzYWJsZWQiLCJhdmFpbGFibGUiLCJidXR0b24iLCJmb3JtRGF0YSIsImxpbmVyIiwibGluZXJJbmZvIiwiYWRkTGluZXIiLCJjaGVja0FkZE9ucyIsInNlbGVjdEFkZG9uIiwiY29zdCIsImxpbmVyUHJpY2UiLCJpbmNyZWFzZSIsImRlY3JlYXNlIiwib25TdWJtaXQiLCJmZXRjaCIsIlNob3BpZnkiLCJyb3V0ZXMiLCJyb290IiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXNwb25zZSIsImpzb24iLCJyZXN1bHQiLCJsYXN0Q2FydEl0ZW0iLCJwb3AiLCJjYXJ0T3BlbiIsImFkZE9uQ2FydFByb2R1Y3RzIiwiY2FydFBhcmVudCIsImNhdGNoIiwiYWxlcnQiLCJ1cGRhdGVWYXJpYW50Iiwib3B0aW9uIiwibmV3T3B0aW9ucyIsIm5ld1ZhcmlhbnQiXSwic291cmNlUm9vdCI6IiJ9