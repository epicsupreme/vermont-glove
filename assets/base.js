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
/* harmony import */ var klaviyo_subscribe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! klaviyo-subscribe */ "./node_modules/klaviyo-subscribe/dist/klaviyo-subscribe.es.js");
/* harmony import */ var _utils_product__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/product */ "./src/scripts/utils/product.js");
/* harmony import */ var _utils_header_height__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/header-height */ "./src/scripts/utils/header-height.js");
/* harmony import */ var _utils_header_height__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utils_header_height__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_cart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/cart */ "./src/scripts/utils/cart.js");





 // import './animations/header'

alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].plugin(_alpinejs_collapse__WEBPACK_IMPORTED_MODULE_1__["default"]);
alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].data('product', _utils_product__WEBPACK_IMPORTED_MODULE_3__["default"]);
window.Alpine = alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"];
alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].start();
var looxContainer = document.querySelector('#looxReviews');
looxContainer === null || looxContainer === void 0 ? void 0 : looxContainer.classList.add('scroll-mt-40');
var footerSubscibe = document.getElementById('footer-subscribe');
footerSubscibe.addEventListener('submit', function (e) {
  e.preventDefault();
  var email = document.getElementById('footer-subscribe-email');
  (0,klaviyo_subscribe__WEBPACK_IMPORTED_MODULE_2__.subscribe)('XAGAvA', email.value).then(function (response) {
    email.value = '';
    document.querySelector('.email-message').innerHTML = 'Thank you for signing up!';
  });
});

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
        // console.log(result)
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
            // console.log(e)
            alert("This product is unavailable at the moment");
            _this.button = 'Unavailable';
            _this.disabled = true;
          });
        }
      }).catch(function (e) {
        // console.log(e)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFbERBO1VBQ0E7VUFDQTtVQUNBLDJEQUEyRCxzREFBc0Q7VUFDakgscUZBQXFGLHVEQUF1RDtVQUM1SSIsInNvdXJjZXMiOlsid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy9iYXNlLmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9jYXJ0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9oZWFkZXItaGVpZ2h0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9wcm9kdWN0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzcz8wOTI3Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbHBpbmUgZnJvbSAnYWxwaW5lanMnXG5pbXBvcnQgY29sbGFwc2UgZnJvbSAnQGFscGluZWpzL2NvbGxhcHNlJ1xuaW1wb3J0IHsgc3Vic2NyaWJlIH0gZnJvbSAna2xhdml5by1zdWJzY3JpYmUnXG5cbmltcG9ydCBwcm9kdWN0IGZyb20gJy4vdXRpbHMvcHJvZHVjdCdcblxuaW1wb3J0ICcuL3V0aWxzL2hlYWRlci1oZWlnaHQnXG5pbXBvcnQgJy4vdXRpbHMvY2FydCdcbi8vIGltcG9ydCAnLi9hbmltYXRpb25zL2hlYWRlcidcblxuQWxwaW5lLnBsdWdpbihjb2xsYXBzZSlcblxuQWxwaW5lLmRhdGEoJ3Byb2R1Y3QnLCBwcm9kdWN0KVxuXG53aW5kb3cuQWxwaW5lID0gQWxwaW5lXG5cbkFscGluZS5zdGFydCgpXG5cbmNvbnN0IGxvb3hDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9veFJldmlld3MnKVxubG9veENvbnRhaW5lcj8uY2xhc3NMaXN0LmFkZCgnc2Nyb2xsLW10LTQwJylcblxuY29uc3QgZm9vdGVyU3Vic2NpYmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyLXN1YnNjcmliZScpXG5cbmZvb3RlclN1YnNjaWJlLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuXG4gIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3Rlci1zdWJzY3JpYmUtZW1haWwnKVxuXG4gIHN1YnNjcmliZSgnWEFHQXZBJywgZW1haWwudmFsdWUpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgZW1haWwudmFsdWUgPSAnJ1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbWFpbC1tZXNzYWdlJykuaW5uZXJIVE1MID1cbiAgICAgICdUaGFuayB5b3UgZm9yIHNpZ25pbmcgdXAhJ1xuICB9KVxufSlcbiIsImltcG9ydCB7IGNvbnZlcnRDb2xvclZhcmlhYmxlcyB9IGZyb20gJ0BtZXJ0YXNhbi90YWlsd2luZGNzcy12YXJpYWJsZXMvc3JjL2hlbHBlcnMnXG5pbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG5cbmNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhzdGF0ZSlcbiAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbn0pXG5cbmZ1bmN0aW9uIGNhcnRUb0FscGluZShzdGF0ZSkge1xuICBsZXQgcHJvZHVjdHMgPSBbXVxuICBpZiAoc3RhdGUuaXRlbXMpIHtcbiAgICBzdGF0ZS5pdGVtcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBsZXQgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsXG5cbiAgICAgIC8vIGlmIChlLmZlYXR1cmVkX2ltYWdlLnVybCkge1xuICAgICAgLy8gICBsZXQgZmlsZW5hbWUgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuICAgICAgLy8gICAgIC5yZXBsYWNlKC9cXD8uKiQvLCAnJylcbiAgICAgIC8vICAgICAucmVwbGFjZSgvLipcXC8vLCAnJylcbiAgICAgIC8vICAgbGV0IG5ld0ZpbGVuYW1lID0gZmlsZW5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICdfMzAweC5qcGcnKVxuICAgICAgLy8gICBmID0gZS5mZWF0dXJlZF9pbWFnZS51cmwucmVwbGFjZShmaWxlbmFtZSwgbmV3RmlsZW5hbWUpXG4gICAgICAvLyB9XG5cbiAgICAgIGNvbnN0IHJlYWxQcmljZSA9IGUucHJpY2UgLyAxMDBcblxuICAgICAgY29uc3QgYWRkT25Qcm9kdWN0cyA9IHN0YXRlLml0ZW1zXG4gICAgICAgIC5tYXAoKHApID0+IHtcbiAgICAgICAgICBpZiAocC5wcm9wZXJ0aWVzPy5jYXJ0UGFyZW50ID09PSBlLmtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdGl0bGU6IHAucHJvZHVjdF90aXRsZSxcbiAgICAgICAgICAgICAga2V5OiBwLmtleSxcbiAgICAgICAgICAgICAgcHJpY2U6IHAucHJpY2UgLyAxMDAsXG4gICAgICAgICAgICAgIGlkOiBwLnZhcmlhbnRfaWQsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHAub3B0aW9uc193aXRoX3ZhbHVlcyxcbiAgICAgICAgICAgICAgaW1hZ2U6IHAuZmVhdHVyZWRfaW1hZ2UudXJsLFxuICAgICAgICAgICAgICBxdHk6IHAucXVhbnRpdHksXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IHAucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgcmVtb3ZlKCkge1xuICAgICAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKHRoaXMua2V5KVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB1cGRhdGUocXR5KSB7XG4gICAgICAgICAgICAgICAgY2FydFVwZGF0ZUl0ZW0odGhpcy5rZXksIHBhcnNlSW50KHF0eSkpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKChlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGVcbiAgICAgICAgfSlcblxuICAgICAgLy8gY29uc29sZS5sb2coYWRkT25Qcm9kdWN0cylcblxuICAgICAgaWYgKCFlLnByb3BlcnRpZXM/LmNhcnRQYXJlbnQpIHtcbiAgICAgICAgcHJvZHVjdHMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6IGUucHJvZHVjdF90aXRsZSxcbiAgICAgICAgICBrZXk6IGUua2V5LFxuICAgICAgICAgIHByaWNlOiByZWFsUHJpY2UsXG4gICAgICAgICAgaWQ6IGUudmFyaWFudF9pZCxcbiAgICAgICAgICBvcHRpb25zOiBlLm9wdGlvbnNfd2l0aF92YWx1ZXMsXG4gICAgICAgICAgaW1hZ2U6IGYsXG4gICAgICAgICAgYWRkT25Qcm9kdWN0czogYWRkT25Qcm9kdWN0cyxcbiAgICAgICAgICBxdHk6IGUucXVhbnRpdHksXG4gICAgICAgICAgcHJvcGVydGllczogZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKHRoaXMua2V5KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlKHF0eSkge1xuICAgICAgICAgICAgY2FydFVwZGF0ZUl0ZW0odGhpcy5rZXksIHBhcnNlSW50KHF0eSkpXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbDogc3RhdGUuaXRlbXNfc3VidG90YWxfcHJpY2UgLyAxMDAsXG4gICAgcHJvZHVjdHM6IHByb2R1Y3RzLFxuICAgIG5vdGU6IHN0YXRlLm5vdGUsXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FydFJlbW92ZUl0ZW0oa2V5KSB7XG4gIGxldCByZW1vdmVQcm9kdWN0cyA9IHt9XG5cbiAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgY29uc29sZS5sb2coc3RhdGUpXG4gICAgY29uc3QgYWRkT25SZW1vdmUgPSBzdGF0ZS5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSBpdGVtLnByb3BlcnRpZXMuY2FydFBhcmVudCkge1xuICAgICAgICByZW1vdmVQcm9kdWN0c1tpdGVtLmtleV0gPSAwXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHBhcmVudEl0ZW0gPSBzdGF0ZS5pdGVtcy5maW5kKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4ga2V5ID09PSBpdGVtLmtleVxuICAgIH0pXG5cbiAgICByZW1vdmVQcm9kdWN0c1twYXJlbnRJdGVtLmtleV0gPSAwXG5cbiAgICBjb25zb2xlLmxvZyhyZW1vdmVQcm9kdWN0cylcblxuICAgIGZldGNoKHdpbmRvdy5TaG9waWZ5LnJvdXRlcy5yb290ICsgJ2NhcnQvdXBkYXRlLmpzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB1cGRhdGVzOiByZW1vdmVQcm9kdWN0cyxcbiAgICAgIH0pLFxuICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICB9KVxuICB9KVxuXG4gIC8vIGNhcnQucmVtb3ZlSXRlbShrZXkpLnRoZW4oKHN0YXRlKSA9PiB7XG4gIC8vICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgLy8gfSlcbn1cblxuZnVuY3Rpb24gY2FydFVwZGF0ZUl0ZW0oa2V5LCBxdHkpIHtcbiAgY2FydC51cGRhdGVJdGVtKGtleSwgeyBxdWFudGl0eTogcXR5IH0pLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhcnRVcGRhdGVBbGwoc3RhdGUpIHtcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVwcm9kdWN0cycsIHtcbiAgICAgIGRldGFpbDogeyBjYXJ0OiBjYXJ0VG9BbHBpbmUoc3RhdGUpIH0sXG4gICAgfSlcbiAgKVxuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRjb3VudCcsIHtcbiAgICAgIGRldGFpbDogeyBjYXJ0VG90YWw6IHN0YXRlLml0ZW1fY291bnQgfSxcbiAgICB9KVxuICApXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjYXJ0VXBkYXRlJywgKGUpID0+IHtcbiAgY2FydC51cGRhdGVOb3RlKGUudGFyZ2V0LnZhbHVlKVxufSlcbiIsInNldEhlYWRlckhlaWdodCgpXG5cbmZ1bmN0aW9uIHNldEhlYWRlckhlaWdodCgpIHtcbiAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpLm9mZnNldEhlaWdodFxuICBkb2N1bWVudC5ib2R5LnN0eWxlLnNldFByb3BlcnR5KCctLWhlYWRlci1oZWlnaHQnLCBgJHtoZWFkZXJIZWlnaHR9cHhgKVxuICBjb25zdCBmb290ZXJIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyJykub2Zmc2V0SGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0tZm9vdGVyLWhlaWdodCcsIGAke2Zvb3RlckhlaWdodH1weGApXG4gIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICBkb2N1bWVudC5ib2R5LnN0eWxlLnNldFByb3BlcnR5KCctLXdpbmRvdy1oZWlnaHQnLCBgJHt3aW5kb3dIZWlnaHR9cHhgKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2V0SGVhZGVySGVpZ2h0KVxuIiwiaW1wb3J0ICogYXMgY2FydCBmcm9tICdAc2hvcGlmeS90aGVtZS1jYXJ0J1xuaW1wb3J0ICogYXMgY3VycmVuY3kgZnJvbSAnQHNob3BpZnkvdGhlbWUtY3VycmVuY3knXG5pbXBvcnQgeyBjYXJ0VXBkYXRlQWxsIH0gZnJvbSAnLi4vdXRpbHMvY2FydCdcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnXG5cbmV4cG9ydCBkZWZhdWx0IChwcm9kdWN0KSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwicHJvZHVjdFwiLCBwcm9kdWN0KTtcbiAgY29uc3QgY3VycmVudFZhcmlhbnQgPSBwcm9kdWN0LnByb2R1Y3QudmFyaWFudHNbMF1cbiAgY29uc3QgdmFyaWFudHMgPSBwcm9kdWN0LnByb2R1Y3QudmFyaWFudHNcbiAgY29uc3QgbGluZXJTeW5jID0gcHJvZHVjdC5saW5lclN5bmNcblxuICBjb25zdCBwcmljZSA9ICh2YXJpYW50SWQsIHNlbGVjdGVkQWRkT25Qcm9kdWN0cywgaGFzTGluZXIpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhzZWxlY3RlZEFkZE9uUHJvZHVjdHMpO1xuICAgIGNvbnN0IHZhcmlhbnQgPSB2YXJpYW50cy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkID09PSB2YXJpYW50SWQpWzBdXG4gICAgbGV0IGFkZE9uUHJpY2UgPSAwXG4gICAgaWYgKHNlbGVjdGVkQWRkT25Qcm9kdWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBzZWxlY3RlZEFkZE9uUHJvZHVjdHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBhZGRPblByaWNlID0gYWRkT25QcmljZSArIGUucHJpY2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGhhc0xpbmVyKSB7XG4gICAgICBhZGRPblByaWNlID0gYWRkT25QcmljZSArIGhhc0xpbmVyXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdHVhbFByaWNlOiAnJCcgKyAodmFyaWFudC5wcmljZSArIGFkZE9uUHJpY2UpIC8gMTAwLFxuICAgICAgb3JpZ2luYWxQcmljZTogdmFyaWFudC5jb21wYXJlX2F0X3ByaWNlXG4gICAgICAgID8gJyQnICsgKHZhcmlhbnQuY29tcGFyZV9hdF9wcmljZSArIGFkZE9uUHJpY2UpIC8gMTAwXG4gICAgICAgIDogJycsXG4gICAgICBtZXNzYWdlOiAnJyxcbiAgICB9XG4gIH1cblxuICBjb25zdCBjdXJyZW50T3B0aW9ucyA9ICh2YXJpYW50SWQpID0+IHtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXVxuICAgIGNvbnN0IGN1cnJlbnRPcHRpb25zID0gcHJvZHVjdC5wcm9kdWN0Lm9wdGlvbnMubWFwKChlLCBpKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBlLFxuICAgICAgICB2YWx1ZTogdmFyaWFudC5vcHRpb25zW2ldLFxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGN1cnJlbnRPcHRpb25zXG4gIH1cblxuICBjb25zdCBoYW5kbGVBZGRPbiA9IChpZCwgc2VsZWN0ZWRBZGRPbnMsIHByaWNlKSA9PiB7XG4gICAgbGV0IHVwZGF0ZWRBZGRPbnMgPSBzZWxlY3RlZEFkZE9uc1xuICAgIGNvbnN0IGNoZWNrU3RhdHVzID0gc2VsZWN0ZWRBZGRPbnMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gaWQpXG4gICAgaWYgKGNoZWNrU3RhdHVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHVwZGF0ZWRBZGRPbnMgPSBzZWxlY3RlZEFkZE9ucy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkICE9IGlkKVxuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVkQWRkT25zLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHF0eTogMSxcbiAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZWRBZGRPbnNcbiAgfVxuXG4gIGNvbnN0IGxpbmVySWQgPSAodmFyaWFudCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibGluZXJcIiwgbGluZXJTeW5jKVxuICAgIC8vIGNvbnNvbGUubG9nKFwidmFyaWFudFwiLCB2YXJpYW50KVxuICAgIGNvbnN0IGxpbmVyRmlsdGVyID0gcHJvZHVjdC5saW5lclN5bmMuZmluZCgob2JqKSA9PiB7XG4gICAgICByZXR1cm4gb2JqLnZhcmlhbnRJZCA9PT0gdmFyaWFudFxuICAgIH0pXG4gICAgLy8gY29uc29sZS5sb2coXCJsaW5lclwiLCBsaW5lckZpbHRlcilcbiAgICByZXR1cm4gbGluZXJGaWx0ZXIgPyBsaW5lckZpbHRlciA6IG51bGxcbiAgICAvLyByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAvL2RlZmF1bHRzXG4gICAgcHJpY2U6IHByaWNlKGN1cnJlbnRWYXJpYW50LmlkLCBbXSwgZmFsc2UpLFxuICAgIHN1Ym1pdFRleHQ6ICdBZGQgdG8gQ2FydCcsXG4gICAgZGlzYWJsZWQ6IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICBidXR0b246IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/ICdBZGQgdG8gQ2FydCcgOiAnVW5hdmFpbGFibGUnLFxuICAgIGFkZE9uUHJvZHVjdHM6IHByb2R1Y3QuYWRkT25Qcm9kdWN0cyxcbiAgICBzZWxlY3RlZEFkZE9uUHJvZHVjdHM6IFtdLFxuXG4gICAgb3B0aW9uczogY3VycmVudE9wdGlvbnMoY3VycmVudFZhcmlhbnQuaWQpLFxuICAgIC8vICBhdmFpbGFibGVPcHRpb25zOiBhdmFpbGFibGVPcHRpb25zKHRoaXMub3B0aW9ucyksXG5cbiAgICAvL1N0b3JlIGZvciBzZW5kaW5nIHRvIGFkZCBjYXJ0XG4gICAgZm9ybURhdGE6IHtcbiAgICAgIGlkOiBjdXJyZW50VmFyaWFudC5pZCxcbiAgICAgIHF0eTogMSxcbiAgICB9LFxuXG4gICAgbGluZXI6IHtcbiAgICAgIGxpbmVySW5mbzogbGluZXJJZChjdXJyZW50VmFyaWFudC5pZCksXG4gICAgICBhZGRMaW5lcjogZmFsc2UsXG4gICAgfSxcblxuICAgIC8vZm9ybSBhY3Rpb25zXG4gICAgY2hlY2tBZGRPbnMoaWQpIHtcbiAgICAgIGNvbnN0IGNoZWNrU3RhdHVzID0gdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMuZmlsdGVyKFxuICAgICAgICAob2JqKSA9PiBvYmouaWQgPT09IGlkXG4gICAgICApXG4gICAgICBpZiAoY2hlY2tTdGF0dXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3RBZGRvbihpZCwgc2VsZWN0ZWRBZGRPbnMsIGNvc3QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gaGFuZGxlQWRkT24oaWQsIHNlbGVjdGVkQWRkT25zLCBjb3N0KVxuICAgICAgdGhpcy5wcmljZSA9IHByaWNlKFxuICAgICAgICB0aGlzLmZvcm1EYXRhLmlkLFxuICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyxcbiAgICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA/IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVyUHJpY2UgOiBmYWxzZVxuICAgICAgKVxuICAgICAgLy8gY29uc29sZS5sb2coaGFuZGxlQWRkT24oaWQsIHNlbGVjdGVkQWRkT25zKSlcbiAgICB9LFxuICAgIGluY3JlYXNlKCkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPSB0aGlzLmZvcm1EYXRhLnF0eSArIDFcbiAgICB9LFxuICAgIGRlY3JlYXNlKCkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPVxuICAgICAgICB0aGlzLmZvcm1EYXRhLnF0eSAtIDEgPT09IDAgPyAxIDogdGhpcy5mb3JtRGF0YS5xdHkgLSAxXG4gICAgfSxcbiAgICBvblN1Ym1pdCgpIHtcbiAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZGluZy4uLidcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArICdjYXJ0L2FkZC5qcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IHRoaXMuZm9ybURhdGEuaWQsXG4gICAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLmZvcm1EYXRhLnF0eSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSksXG4gICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpXG4gICAgICAgICAgY29uc3QgbGFzdENhcnRJdGVtID0gcmVzdWx0Lml0ZW1zLnBvcCgpXG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmxlbmd0aCA8IDEgJiYgdGhpcy5saW5lci5hZGRMaW5lcikge1xuICAgICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBbXVxuICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRzdGF0dXMnLCB7XG4gICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgY2FydE9wZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhZGRPbkNhcnRQcm9kdWN0cyA9IFtdXG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgICAgYWRkT25DYXJ0UHJvZHVjdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGUuaWQsXG4gICAgICAgICAgICAgICAgcXR5OiAxLFxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgIGNhcnRQYXJlbnQ6IGxhc3RDYXJ0SXRlbS5rZXksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAodGhpcy5saW5lci5hZGRMaW5lcikge1xuICAgICAgICAgICAgICBhZGRPbkNhcnRQcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5saW5lci5saW5lckluZm8ubGluZXJJZCxcbiAgICAgICAgICAgICAgICBxdHk6IHRoaXMuZm9ybURhdGEucXR5LFxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgIGNhcnRQYXJlbnQ6IGxhc3RDYXJ0SXRlbS5rZXksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmV0Y2god2luZG93LlNob3BpZnkucm91dGVzLnJvb3QgKyAnY2FydC9hZGQuanMnLCB7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBhZGRPbkNhcnRQcm9kdWN0cyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSAnQWRkIHRvIENhcnQnXG4gICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gW11cbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRzdGF0dXMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IGNhcnRPcGVuOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSlcbiAgICAgICAgICAgICAgICBhbGVydChgVGhpcyBwcm9kdWN0IGlzIHVuYXZhaWxhYmxlIGF0IHRoZSBtb21lbnRgKVxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ1VuYXZhaWxhYmxlJ1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApXG4gICAgICAgICAgdGhpcy5idXR0b24gPSAnVW5hdmFpbGFibGUnXG4gICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGFkZExpbmVyKCkge1xuICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA9ICF0aGlzLmxpbmVyLmFkZExpbmVyXG4gICAgICB0aGlzLnByaWNlID0gcHJpY2UoXG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQsXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLFxuICAgICAgICB0aGlzLmxpbmVyLmFkZExpbmVyID8gdGhpcy5saW5lci5saW5lckluZm8ubGluZXJQcmljZSA6IGZhbHNlXG4gICAgICApXG4gICAgfSxcbiAgICB1cGRhdGVWYXJpYW50KHZhbHVlLCBvcHRpb24pIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBvcHRpb25zLm1hcCgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS5uYW1lID09IG9wdGlvbiA/IHZhbHVlIDogZS52YWx1ZVxuICAgICAgfSlcblxuICAgICAgY29uc3QgbmV3VmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigodmFyaWFudCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNFcXVhbCh2YXJpYW50Lm9wdGlvbnMsIG5ld09wdGlvbnMpXG4gICAgICB9KVswXVxuXG4gICAgICAvLyBjb25zb2xlLmxvZyhuZXdWYXJpYW50KTtcblxuICAgICAgOyh0aGlzLmxpbmVyLmxpbmVySW5mbyA9IGxpbmVySWQobmV3VmFyaWFudC5pZCkpLFxuICAgICAgICAodGhpcy5wcmljZSA9IHByaWNlKFxuICAgICAgICAgIG5ld1ZhcmlhbnQuaWQsXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMsXG4gICAgICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA/IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVyUHJpY2UgOiBmYWxzZVxuICAgICAgICApKVxuICAgICAgdGhpcy5mb3JtRGF0YS5pZCA9IG5ld1ZhcmlhbnQuaWRcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBuZXdWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZVxuICAgICAgdGhpcy5idXR0b24gPSBuZXdWYXJpYW50LmF2YWlsYWJsZSA/ICdBZGQgdG8gQ2FydCcgOiAnVW5hdmFpbGFibGUnXG4gICAgICB0aGlzLm9wdGlvbnMgPSBjdXJyZW50T3B0aW9ucyhuZXdWYXJpYW50LmlkKVxuICAgIH0sXG4gIH1cbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJiYXNlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlcGljc3VwcmVtZV9zaG9waWZ5XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2Jhc2UuanNcIik7IH0pXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3N0eWxlcy9iYXNlLnNjc3NcIik7IH0pXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbIkFscGluZSIsImNvbGxhcHNlIiwic3Vic2NyaWJlIiwicHJvZHVjdCIsInBsdWdpbiIsImRhdGEiLCJ3aW5kb3ciLCJzdGFydCIsImxvb3hDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJmb290ZXJTdWJzY2liZSIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVtYWlsIiwidmFsdWUiLCJ0aGVuIiwicmVzcG9uc2UiLCJpbm5lckhUTUwiLCJjb252ZXJ0Q29sb3JWYXJpYWJsZXMiLCJjYXJ0IiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImNhcnRVcGRhdGVBbGwiLCJjYXJ0VG9BbHBpbmUiLCJwcm9kdWN0cyIsIml0ZW1zIiwiZm9yRWFjaCIsImYiLCJmZWF0dXJlZF9pbWFnZSIsInVybCIsInJlYWxQcmljZSIsInByaWNlIiwiYWRkT25Qcm9kdWN0cyIsIm1hcCIsInAiLCJwcm9wZXJ0aWVzIiwiY2FydFBhcmVudCIsImtleSIsInRpdGxlIiwicHJvZHVjdF90aXRsZSIsImlkIiwidmFyaWFudF9pZCIsIm9wdGlvbnMiLCJvcHRpb25zX3dpdGhfdmFsdWVzIiwiaW1hZ2UiLCJxdHkiLCJxdWFudGl0eSIsInJlbW92ZSIsImNhcnRSZW1vdmVJdGVtIiwidXBkYXRlIiwiY2FydFVwZGF0ZUl0ZW0iLCJwYXJzZUludCIsImZpbHRlciIsInB1c2giLCJ0b3RhbCIsIml0ZW1zX3N1YnRvdGFsX3ByaWNlIiwibm90ZSIsInJlbW92ZVByb2R1Y3RzIiwiY29uc29sZSIsImxvZyIsImFkZE9uUmVtb3ZlIiwiaXRlbSIsInBhcmVudEl0ZW0iLCJmaW5kIiwiZmV0Y2giLCJTaG9waWZ5Iiwicm91dGVzIiwicm9vdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInVwZGF0ZXMiLCJjYXRjaCIsInVwZGF0ZUl0ZW0iLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJjYXJ0VG90YWwiLCJpdGVtX2NvdW50IiwidXBkYXRlTm90ZSIsInRhcmdldCIsInNldEhlYWRlckhlaWdodCIsImhlYWRlckhlaWdodCIsIm9mZnNldEhlaWdodCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJmb290ZXJIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJpbm5lckhlaWdodCIsImN1cnJlbmN5IiwiaXNFcXVhbCIsImN1cnJlbnRWYXJpYW50IiwidmFyaWFudHMiLCJsaW5lclN5bmMiLCJ2YXJpYW50SWQiLCJzZWxlY3RlZEFkZE9uUHJvZHVjdHMiLCJoYXNMaW5lciIsInZhcmlhbnQiLCJvYmoiLCJhZGRPblByaWNlIiwibGVuZ3RoIiwiYWN0dWFsUHJpY2UiLCJvcmlnaW5hbFByaWNlIiwiY29tcGFyZV9hdF9wcmljZSIsIm1lc3NhZ2UiLCJjdXJyZW50T3B0aW9ucyIsImkiLCJuYW1lIiwiaGFuZGxlQWRkT24iLCJzZWxlY3RlZEFkZE9ucyIsInVwZGF0ZWRBZGRPbnMiLCJjaGVja1N0YXR1cyIsImxpbmVySWQiLCJsaW5lckZpbHRlciIsInN1Ym1pdFRleHQiLCJkaXNhYmxlZCIsImF2YWlsYWJsZSIsImJ1dHRvbiIsImZvcm1EYXRhIiwibGluZXIiLCJsaW5lckluZm8iLCJhZGRMaW5lciIsImNoZWNrQWRkT25zIiwic2VsZWN0QWRkb24iLCJjb3N0IiwibGluZXJQcmljZSIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJvblN1Ym1pdCIsImpzb24iLCJyZXN1bHQiLCJsYXN0Q2FydEl0ZW0iLCJwb3AiLCJjYXJ0T3BlbiIsImFkZE9uQ2FydFByb2R1Y3RzIiwiYWxlcnQiLCJ1cGRhdGVWYXJpYW50Iiwib3B0aW9uIiwibmV3T3B0aW9ucyIsIm5ld1ZhcmlhbnQiXSwic291cmNlUm9vdCI6IiJ9