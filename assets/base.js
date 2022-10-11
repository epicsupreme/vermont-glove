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
  console.log(state);
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
      if (item.properties._cartParent != null && key === item.properties._cartParent) {
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
    properties: {},
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
    updateMonogram: function updateMonogram(val) {
      console.log(val);

      if (val) {
        this.properties = {
          Monogram: val
        };
      } else {
        this.properties = {};
      }
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
            quantity: this.formData.qty,
            properties: this.properties
          }]
        })
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        var lastCartItem = result.items.pop();
        console.log('last cart item', lastCartItem);
        console.log('line', _this.liner);

        if (_this.selectedAddOnProducts.length < 1 && !_this.liner.addLiner) {
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

          if (_this.liner.addLiner) {
            console.log('liner');
            addOnCartProducts.push({
              id: _this.liner.linerInfo.linerId,
              qty: _this.formData.qty,
              properties: {
                _cartParent: lastCartItem.key
              }
            });
          }

          if (_this.selectedAddOnProducts.length > 0) _this.selectedAddOnProducts.forEach(function (e) {
            addOnCartProducts.push({
              id: e.id,
              qty: 1,
              properties: {
                _cartParent: lastCartItem.key
              }
            });
          });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0NBRUE7O0FBRUFBLHVEQUFBLENBQWNDLDBEQUFkO0FBRUFELHFEQUFBLENBQVksU0FBWixFQUF1Qkcsc0RBQXZCO0FBRUFHLE1BQU0sQ0FBQ04sTUFBUCxHQUFnQkEsZ0RBQWhCO0FBRUFBLHNEQUFBO0FBRUEsSUFBTVEsYUFBYSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBdEI7QUFDQUYsYUFBYSxTQUFiLElBQUFBLGFBQWEsV0FBYixZQUFBQSxhQUFhLENBQUVHLFNBQWYsQ0FBeUJDLEdBQXpCLENBQTZCLGNBQTdCO0FBRUEsSUFBTUMsY0FBYyxHQUFHSixRQUFRLENBQUNLLGNBQVQsQ0FBd0Isa0JBQXhCLENBQXZCO0FBRUFELGNBQWMsQ0FBQ0UsZ0JBQWYsQ0FBZ0MsUUFBaEMsRUFBMEMsVUFBQ0MsQ0FBRCxFQUFPO0VBQy9DQSxDQUFDLENBQUNDLGNBQUY7RUFFQSxJQUFNQyxLQUFLLEdBQUdULFFBQVEsQ0FBQ0ssY0FBVCxDQUF3Qix3QkFBeEIsQ0FBZDtFQUVBWiw0REFBUyxDQUFDLFFBQUQsRUFBV2dCLEtBQUssQ0FBQ0MsS0FBakIsQ0FBVCxDQUFpQ0MsSUFBakMsQ0FBc0MsVUFBQ0MsUUFBRCxFQUFjO0lBQ2xESCxLQUFLLENBQUNDLEtBQU4sR0FBYyxFQUFkO0lBQ0FWLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixnQkFBdkIsRUFBeUNZLFNBQXpDLEdBQ0UsMkJBREY7RUFFRCxDQUpEO0FBS0QsQ0FWRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUVBRSx5REFBQSxHQUFnQkosSUFBaEIsQ0FBcUIsVUFBQ00sS0FBRCxFQUFXO0VBQzlCQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjtFQUNBRyxhQUFhLENBQUNILEtBQUQsQ0FBYjtBQUNELENBSEQ7O0FBS0EsU0FBU0ksWUFBVCxDQUFzQkosS0FBdEIsRUFBNkI7RUFDM0IsSUFBSUssUUFBUSxHQUFHLEVBQWY7O0VBQ0EsSUFBSUwsS0FBSyxDQUFDTSxLQUFWLEVBQWlCO0lBQ2ZOLEtBQUssQ0FBQ00sS0FBTixDQUFZQyxPQUFaLENBQW9CLFVBQUNqQixDQUFELEVBQU87TUFBQTs7TUFDekIsSUFBSWtCLENBQUMsR0FBR2xCLENBQUMsQ0FBQ21CLGNBQUYsQ0FBaUJDLEdBQXpCLENBRHlCLENBR3pCO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBOztNQUVBLElBQU1DLFNBQVMsR0FBR3JCLENBQUMsQ0FBQ3NCLEtBQUYsR0FBVSxHQUE1QjtNQUVBLElBQU1DLGFBQWEsR0FBR2IsS0FBSyxDQUFDTSxLQUFOLENBQ25CUSxHQURtQixDQUNmLFVBQUNDLENBQUQsRUFBTztRQUFBOztRQUNWLElBQUksa0JBQUFBLENBQUMsQ0FBQ0MsVUFBRixnRUFBY0MsV0FBZCxNQUE4QjNCLENBQUMsQ0FBQzRCLEdBQXBDLEVBQXlDO1VBQ3ZDLE9BQU87WUFDTEMsS0FBSyxFQUFFSixDQUFDLENBQUNLLGFBREo7WUFFTEYsR0FBRyxFQUFFSCxDQUFDLENBQUNHLEdBRkY7WUFHTE4sS0FBSyxFQUFFRyxDQUFDLENBQUNILEtBQUYsR0FBVSxHQUhaO1lBSUxTLEVBQUUsRUFBRU4sQ0FBQyxDQUFDTyxVQUpEO1lBS0xDLE9BQU8sRUFBRVIsQ0FBQyxDQUFDUyxtQkFMTjtZQU1MQyxLQUFLLEVBQUVWLENBQUMsQ0FBQ04sY0FBRixDQUFpQkMsR0FObkI7WUFPTGdCLEdBQUcsRUFBRVgsQ0FBQyxDQUFDWSxRQVBGO1lBUUxYLFVBQVUsRUFBRUQsQ0FBQyxDQUFDQyxVQVJUO1lBU0xZLE1BVEssb0JBU0k7Y0FDUEMsY0FBYyxDQUFDLEtBQUtYLEdBQU4sQ0FBZDtZQUNELENBWEk7WUFZTFksTUFaSyxrQkFZRUosR0FaRixFQVlPO2NBQ1ZLLGNBQWMsQ0FBQyxLQUFLYixHQUFOLEVBQVdjLFFBQVEsQ0FBQ04sR0FBRCxDQUFuQixDQUFkO1lBQ0Q7VUFkSSxDQUFQO1FBZ0JEOztRQUNELE9BQU8sS0FBUDtNQUNELENBckJtQixFQXNCbkJPLE1BdEJtQixDQXNCWixVQUFDM0MsQ0FBRCxFQUFPO1FBQ2IsT0FBT0EsQ0FBUDtNQUNELENBeEJtQixDQUF0QixDQWJ5QixDQXVDekI7O01BRUEsSUFBSSxtQkFBQ0EsQ0FBQyxDQUFDMEIsVUFBSCwwQ0FBQyxjQUFjQyxXQUFmLENBQUosRUFBZ0M7UUFDOUJaLFFBQVEsQ0FBQzZCLElBQVQsQ0FBYztVQUNaZixLQUFLLEVBQUU3QixDQUFDLENBQUM4QixhQURHO1VBRVpGLEdBQUcsRUFBRTVCLENBQUMsQ0FBQzRCLEdBRks7VUFHWk4sS0FBSyxFQUFFRCxTQUhLO1VBSVpVLEVBQUUsRUFBRS9CLENBQUMsQ0FBQ2dDLFVBSk07VUFLWkMsT0FBTyxFQUFFakMsQ0FBQyxDQUFDa0MsbUJBTEM7VUFNWkMsS0FBSyxFQUFFakIsQ0FOSztVQU9aSyxhQUFhLEVBQUVBLGFBUEg7VUFRWmEsR0FBRyxFQUFFcEMsQ0FBQyxDQUFDcUMsUUFSSztVQVNaWCxVQUFVLEVBQUUxQixDQUFDLENBQUMwQixVQVRGO1VBVVpZLE1BVlksb0JBVUg7WUFDUEMsY0FBYyxDQUFDLEtBQUtYLEdBQU4sQ0FBZDtVQUNELENBWlc7VUFhWlksTUFiWSxrQkFhTEosR0FiSyxFQWFBO1lBQ1ZLLGNBQWMsQ0FBQyxLQUFLYixHQUFOLEVBQVdjLFFBQVEsQ0FBQ04sR0FBRCxDQUFuQixDQUFkO1VBQ0Q7UUFmVyxDQUFkO01BaUJEO0lBQ0YsQ0E1REQ7RUE2REQ7O0VBRUQsT0FBTztJQUNMUyxLQUFLLEVBQUVuQyxLQUFLLENBQUNvQyxvQkFBTixHQUE2QixHQUQvQjtJQUVML0IsUUFBUSxFQUFFQSxRQUZMO0lBR0xnQyxJQUFJLEVBQUVyQyxLQUFLLENBQUNxQztFQUhQLENBQVA7QUFLRDs7QUFFRCxTQUFTUixjQUFULENBQXdCWCxHQUF4QixFQUE2QjtFQUMzQixJQUFJb0IsY0FBYyxHQUFHLEVBQXJCO0VBRUF4Qyx5REFBQSxHQUFnQkosSUFBaEIsQ0FBcUIsVUFBQ00sS0FBRCxFQUFXO0lBQzlCQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjtJQUVBLElBQU11QyxXQUFXLEdBQUd2QyxLQUFLLENBQUNNLEtBQU4sQ0FBWUMsT0FBWixDQUFvQixVQUFDaUMsSUFBRCxFQUFVO01BQ2hELElBQ0VBLElBQUksQ0FBQ3hCLFVBQUwsQ0FBZ0JDLFdBQWhCLElBQStCLElBQS9CLElBQ0FDLEdBQUcsS0FBS3NCLElBQUksQ0FBQ3hCLFVBQUwsQ0FBZ0JDLFdBRjFCLEVBR0U7UUFDQXFCLGNBQWMsQ0FBQ0UsSUFBSSxDQUFDdEIsR0FBTixDQUFkLEdBQTJCLENBQTNCO01BQ0Q7SUFDRixDQVBtQixDQUFwQjtJQVNBLElBQU11QixVQUFVLEdBQUd6QyxLQUFLLENBQUNNLEtBQU4sQ0FBWW9DLElBQVosQ0FBaUIsVUFBQ0YsSUFBRCxFQUFVO01BQzVDLE9BQU90QixHQUFHLEtBQUtzQixJQUFJLENBQUN0QixHQUFwQjtJQUNELENBRmtCLENBQW5CO0lBSUFvQixjQUFjLENBQUNHLFVBQVUsQ0FBQ3ZCLEdBQVosQ0FBZCxHQUFpQyxDQUFqQyxDQWhCOEIsQ0FrQjlCOztJQUVBeUIsS0FBSyxDQUFDL0QsTUFBTSxDQUFDZ0UsT0FBUCxDQUFlQyxNQUFmLENBQXNCQyxJQUF0QixHQUE2QixnQkFBOUIsRUFBZ0Q7TUFDbkRDLE1BQU0sRUFBRSxNQUQyQztNQUVuREMsT0FBTyxFQUFFO1FBQ1AsZ0JBQWdCO01BRFQsQ0FGMEM7TUFLbkRDLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7UUFDbkJDLE9BQU8sRUFBRWQ7TUFEVSxDQUFmO0lBTDZDLENBQWhELENBQUwsQ0FTRzVDLElBVEgsQ0FTUSxZQUFNO01BQ1ZJLHlEQUFBLEdBQWdCSixJQUFoQixDQUFxQixVQUFDTSxLQUFELEVBQVc7UUFDOUJHLGFBQWEsQ0FBQ0gsS0FBRCxDQUFiO01BQ0QsQ0FGRDtJQUdELENBYkgsRUFjR3FELEtBZEgsQ0FjUyxVQUFDL0QsQ0FBRCxFQUFPO01BQ1pXLE9BQU8sQ0FBQ0MsR0FBUixDQUFZWixDQUFaO0lBQ0QsQ0FoQkg7RUFpQkQsQ0FyQ0QsRUFIMkIsQ0EwQzNCO0VBQ0E7RUFDQTtBQUNEOztBQUVELFNBQVN5QyxjQUFULENBQXdCYixHQUF4QixFQUE2QlEsR0FBN0IsRUFBa0M7RUFDaEM1QiwyREFBQSxDQUFnQm9CLEdBQWhCLEVBQXFCO0lBQUVTLFFBQVEsRUFBRUQ7RUFBWixDQUFyQixFQUF3Q2hDLElBQXhDLENBQTZDLFVBQUNNLEtBQUQsRUFBVztJQUN0REcsYUFBYSxDQUFDSCxLQUFELENBQWI7RUFDRCxDQUZEO0FBR0Q7O0FBRU0sU0FBU0csYUFBVCxDQUF1QkgsS0FBdkIsRUFBOEI7RUFDbkNwQixNQUFNLENBQUMyRSxhQUFQLENBQ0UsSUFBSUMsV0FBSixDQUFnQixnQkFBaEIsRUFBa0M7SUFDaENDLE1BQU0sRUFBRTtNQUFFM0QsSUFBSSxFQUFFTSxZQUFZLENBQUNKLEtBQUQ7SUFBcEI7RUFEd0IsQ0FBbEMsQ0FERjtFQUtBcEIsTUFBTSxDQUFDMkUsYUFBUCxDQUNFLElBQUlDLFdBQUosQ0FBZ0IsaUJBQWhCLEVBQW1DO0lBQ2pDQyxNQUFNLEVBQUU7TUFBRUMsU0FBUyxFQUFFMUQsS0FBSyxDQUFDMkQ7SUFBbkI7RUFEeUIsQ0FBbkMsQ0FERjtBQUtEO0FBRUQvRSxNQUFNLENBQUNTLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLFVBQUNDLENBQUQsRUFBTztFQUMzQ1EsMkRBQUEsQ0FBZ0JSLENBQUMsQ0FBQ3VFLE1BQUYsQ0FBU3BFLEtBQXpCO0FBQ0QsQ0FGRDs7Ozs7Ozs7OztBQ25KQXFFLGVBQWU7O0FBRWYsU0FBU0EsZUFBVCxHQUEyQjtFQUN6QixJQUFNQyxZQUFZLEdBQUdoRixRQUFRLENBQUNLLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0M0RSxZQUF2RDtFQUNBakYsUUFBUSxDQUFDa0UsSUFBVCxDQUFjZ0IsS0FBZCxDQUFvQkMsV0FBcEIsQ0FBZ0MsaUJBQWhDLFlBQXNESCxZQUF0RDtFQUNBLElBQU1JLFlBQVksR0FBR3BGLFFBQVEsQ0FBQ0ssY0FBVCxDQUF3QixRQUF4QixFQUFrQzRFLFlBQXZEO0VBQ0FqRixRQUFRLENBQUNrRSxJQUFULENBQWNnQixLQUFkLENBQW9CQyxXQUFwQixDQUFnQyxpQkFBaEMsWUFBc0RDLFlBQXREO0VBQ0EsSUFBTUMsWUFBWSxHQUFHeEYsTUFBTSxDQUFDeUYsV0FBNUI7RUFDQXRGLFFBQVEsQ0FBQ2tFLElBQVQsQ0FBY2dCLEtBQWQsQ0FBb0JDLFdBQXBCLENBQWdDLGlCQUFoQyxZQUFzREUsWUFBdEQ7QUFDRDs7QUFFRHhGLE1BQU0sQ0FBQ1MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0N5RSxlQUFsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLCtEQUFlLFVBQUNyRixPQUFELEVBQWE7RUFDMUI7RUFDQSxJQUFNK0YsY0FBYyxHQUFHL0YsT0FBTyxDQUFDQSxPQUFSLENBQWdCZ0csUUFBaEIsQ0FBeUIsQ0FBekIsQ0FBdkI7RUFDQSxJQUFNQSxRQUFRLEdBQUdoRyxPQUFPLENBQUNBLE9BQVIsQ0FBZ0JnRyxRQUFqQztFQUNBLElBQU1DLFNBQVMsR0FBR2pHLE9BQU8sQ0FBQ2lHLFNBQTFCOztFQUVBLElBQU05RCxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFDK0QsU0FBRCxFQUFZQyxxQkFBWixFQUFtQ0MsUUFBbkMsRUFBZ0Q7SUFDNUQ7SUFDQSxJQUFNQyxPQUFPLEdBQUdMLFFBQVEsQ0FBQ3hDLE1BQVQsQ0FBZ0IsVUFBQzhDLEdBQUQ7TUFBQSxPQUFTQSxHQUFHLENBQUMxRCxFQUFKLEtBQVdzRCxTQUFwQjtJQUFBLENBQWhCLEVBQStDLENBQS9DLENBQWhCO0lBQ0EsSUFBSUssVUFBVSxHQUFHLENBQWpCOztJQUNBLElBQUlKLHFCQUFxQixDQUFDSyxNQUF0QixHQUErQixDQUFuQyxFQUFzQztNQUNwQ0wscUJBQXFCLENBQUNyRSxPQUF0QixDQUE4QixVQUFDakIsQ0FBRCxFQUFPO1FBQ25DMEYsVUFBVSxHQUFHQSxVQUFVLEdBQUcxRixDQUFDLENBQUNzQixLQUE1QjtNQUNELENBRkQ7SUFHRDs7SUFFRCxJQUFJaUUsUUFBSixFQUFjO01BQ1pHLFVBQVUsR0FBR0EsVUFBVSxHQUFHSCxRQUExQjtJQUNEOztJQUVELE9BQU87TUFDTEssV0FBVyxFQUFFLE1BQU0sQ0FBQ0osT0FBTyxDQUFDbEUsS0FBUixHQUFnQm9FLFVBQWpCLElBQStCLEdBRDdDO01BRUxHLGFBQWEsRUFBRUwsT0FBTyxDQUFDTSxnQkFBUixHQUNYLE1BQU0sQ0FBQ04sT0FBTyxDQUFDTSxnQkFBUixHQUEyQkosVUFBNUIsSUFBMEMsR0FEckMsR0FFWCxFQUpDO01BS0xLLE9BQU8sRUFBRTtJQUxKLENBQVA7RUFPRCxDQXJCRDs7RUF1QkEsSUFBTUMsY0FBYyxHQUFHLHdCQUFDWCxTQUFELEVBQWU7SUFDcEMsSUFBTUcsT0FBTyxHQUFHTCxRQUFRLENBQUN4QyxNQUFULENBQWdCLFVBQUM4QyxHQUFEO01BQUEsT0FBU0EsR0FBRyxDQUFDMUQsRUFBSixLQUFXc0QsU0FBcEI7SUFBQSxDQUFoQixFQUErQyxDQUEvQyxDQUFoQjtJQUNBLElBQU1XLGNBQWMsR0FBRzdHLE9BQU8sQ0FBQ0EsT0FBUixDQUFnQjhDLE9BQWhCLENBQXdCVCxHQUF4QixDQUE0QixVQUFDeEIsQ0FBRCxFQUFJaUcsQ0FBSixFQUFVO01BQzNELE9BQU87UUFDTEMsSUFBSSxFQUFFbEcsQ0FERDtRQUVMRyxLQUFLLEVBQUVxRixPQUFPLENBQUN2RCxPQUFSLENBQWdCZ0UsQ0FBaEI7TUFGRixDQUFQO0lBSUQsQ0FMc0IsQ0FBdkI7SUFNQSxPQUFPRCxjQUFQO0VBQ0QsQ0FURDs7RUFXQSxJQUFNRyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDcEUsRUFBRCxFQUFLcUUsY0FBTCxFQUFxQjlFLEtBQXJCLEVBQStCO0lBQ2pELElBQUkrRSxhQUFhLEdBQUdELGNBQXBCO0lBQ0EsSUFBTUUsV0FBVyxHQUFHRixjQUFjLENBQUN6RCxNQUFmLENBQXNCLFVBQUM4QyxHQUFEO01BQUEsT0FBU0EsR0FBRyxDQUFDMUQsRUFBSixLQUFXQSxFQUFwQjtJQUFBLENBQXRCLENBQXBCOztJQUNBLElBQUl1RSxXQUFXLENBQUNYLE1BQVosR0FBcUIsQ0FBekIsRUFBNEI7TUFDMUJVLGFBQWEsR0FBR0QsY0FBYyxDQUFDekQsTUFBZixDQUFzQixVQUFDOEMsR0FBRDtRQUFBLE9BQVNBLEdBQUcsQ0FBQzFELEVBQUosSUFBVUEsRUFBbkI7TUFBQSxDQUF0QixDQUFoQjtJQUNELENBRkQsTUFFTztNQUNMc0UsYUFBYSxDQUFDekQsSUFBZCxDQUFtQjtRQUNqQmIsRUFBRSxFQUFFQSxFQURhO1FBRWpCSyxHQUFHLEVBQUUsQ0FGWTtRQUdqQmQsS0FBSyxFQUFFQTtNQUhVLENBQW5CO0lBS0Q7O0lBQ0QsT0FBTytFLGFBQVA7RUFDRCxDQWJEOztFQWVBLElBQU1FLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNmLE9BQUQsRUFBYTtJQUMzQjtJQUNBO0lBQ0EsSUFBTWdCLFdBQVcsR0FBR3JILE9BQU8sQ0FBQ2lHLFNBQVIsQ0FBa0JoQyxJQUFsQixDQUF1QixVQUFDcUMsR0FBRCxFQUFTO01BQ2xELE9BQU9BLEdBQUcsQ0FBQ0osU0FBSixLQUFrQkcsT0FBekI7SUFDRCxDQUZtQixDQUFwQixDQUgyQixDQU0zQjs7SUFDQSxPQUFPZ0IsV0FBVyxHQUFHQSxXQUFILEdBQWlCLElBQW5DLENBUDJCLENBUTNCO0VBQ0QsQ0FURDs7RUFXQSxPQUFPO0lBQ0w7SUFDQWxGLEtBQUssRUFBRUEsS0FBSyxDQUFDNEQsY0FBYyxDQUFDbkQsRUFBaEIsRUFBb0IsRUFBcEIsRUFBd0IsS0FBeEIsQ0FGUDtJQUdMMEUsVUFBVSxFQUFFLGFBSFA7SUFJTEMsUUFBUSxFQUFFeEIsY0FBYyxDQUFDeUIsU0FBZixHQUEyQixLQUEzQixHQUFtQyxJQUp4QztJQUtMQyxNQUFNLEVBQUUxQixjQUFjLENBQUN5QixTQUFmLEdBQTJCLGFBQTNCLEdBQTJDLGFBTDlDO0lBTUxwRixhQUFhLEVBQUVwQyxPQUFPLENBQUNvQyxhQU5sQjtJQU9MK0QscUJBQXFCLEVBQUUsRUFQbEI7SUFTTHJELE9BQU8sRUFBRStELGNBQWMsQ0FBQ2QsY0FBYyxDQUFDbkQsRUFBaEIsQ0FUbEI7SUFVTDtJQUVBO0lBQ0E4RSxRQUFRLEVBQUU7TUFDUjlFLEVBQUUsRUFBRW1ELGNBQWMsQ0FBQ25ELEVBRFg7TUFFUkssR0FBRyxFQUFFO0lBRkcsQ0FiTDtJQWtCTDBFLEtBQUssRUFBRTtNQUNMQyxTQUFTLEVBQUVSLE9BQU8sQ0FBQ3JCLGNBQWMsQ0FBQ25ELEVBQWhCLENBRGI7TUFFTGlGLFFBQVEsRUFBRTtJQUZMLENBbEJGO0lBdUJMdEYsVUFBVSxFQUFFLEVBdkJQO0lBeUJMO0lBQ0F1RixXQTFCSyx1QkEwQk9sRixFQTFCUCxFQTBCVztNQUNkLElBQU11RSxXQUFXLEdBQUcsS0FBS2hCLHFCQUFMLENBQTJCM0MsTUFBM0IsQ0FDbEIsVUFBQzhDLEdBQUQ7UUFBQSxPQUFTQSxHQUFHLENBQUMxRCxFQUFKLEtBQVdBLEVBQXBCO01BQUEsQ0FEa0IsQ0FBcEI7O01BR0EsSUFBSXVFLFdBQVcsQ0FBQ1gsTUFBWixHQUFxQixDQUF6QixFQUE0QjtRQUMxQixPQUFPLElBQVA7TUFDRCxDQUZELE1BRU87UUFDTCxPQUFPLEtBQVA7TUFDRDtJQUNGLENBbkNJO0lBb0NMdUIsV0FwQ0ssdUJBb0NPbkYsRUFwQ1AsRUFvQ1dxRSxjQXBDWCxFQW9DMkJlLElBcEMzQixFQW9DaUM7TUFDcEMsS0FBSzdCLHFCQUFMLEdBQTZCYSxXQUFXLENBQUNwRSxFQUFELEVBQUtxRSxjQUFMLEVBQXFCZSxJQUFyQixDQUF4QztNQUNBLEtBQUs3RixLQUFMLEdBQWFBLEtBQUssQ0FDaEIsS0FBS3VGLFFBQUwsQ0FBYzlFLEVBREUsRUFFaEIsS0FBS3VELHFCQUZXLEVBR2hCLEtBQUt3QixLQUFMLENBQVdFLFFBQVgsR0FBc0IsS0FBS0YsS0FBTCxDQUFXQyxTQUFYLENBQXFCSyxVQUEzQyxHQUF3RCxLQUh4QyxDQUFsQixDQUZvQyxDQU9wQztJQUNELENBNUNJO0lBNkNMQyxRQTdDSyxzQkE2Q007TUFDVCxLQUFLUixRQUFMLENBQWN6RSxHQUFkLEdBQW9CLEtBQUt5RSxRQUFMLENBQWN6RSxHQUFkLEdBQW9CLENBQXhDO0lBQ0QsQ0EvQ0k7SUFnRExrRixRQWhESyxzQkFnRE07TUFDVCxLQUFLVCxRQUFMLENBQWN6RSxHQUFkLEdBQ0UsS0FBS3lFLFFBQUwsQ0FBY3pFLEdBQWQsR0FBb0IsQ0FBcEIsS0FBMEIsQ0FBMUIsR0FBOEIsQ0FBOUIsR0FBa0MsS0FBS3lFLFFBQUwsQ0FBY3pFLEdBQWQsR0FBb0IsQ0FEeEQ7SUFFRCxDQW5ESTtJQW9ETG1GLGNBcERLLDBCQW9EVUMsR0FwRFYsRUFvRGU7TUFDbEI3RyxPQUFPLENBQUNDLEdBQVIsQ0FBWTRHLEdBQVo7O01BQ0EsSUFBSUEsR0FBSixFQUFTO1FBQ1AsS0FBSzlGLFVBQUwsR0FBa0I7VUFDaEIrRixRQUFRLEVBQUVEO1FBRE0sQ0FBbEI7TUFHRCxDQUpELE1BSU87UUFDTCxLQUFLOUYsVUFBTCxHQUFrQixFQUFsQjtNQUNEO0lBQ0YsQ0E3REk7SUE4RExnRyxRQTlESyxzQkE4RE07TUFBQTs7TUFDVCxLQUFLZCxNQUFMLEdBQWMsV0FBZDtNQUNBLEtBQUtGLFFBQUwsR0FBZ0IsSUFBaEI7TUFDQXJELEtBQUssQ0FBQy9ELE1BQU0sQ0FBQ2dFLE9BQVAsQ0FBZUMsTUFBZixDQUFzQkMsSUFBdEIsR0FBNkIsYUFBOUIsRUFBNkM7UUFDaERDLE1BQU0sRUFBRSxNQUR3QztRQUVoREMsT0FBTyxFQUFFO1VBQ1AsZ0JBQWdCO1FBRFQsQ0FGdUM7UUFLaERDLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7VUFDbkI3QyxLQUFLLEVBQUUsQ0FDTDtZQUNFZSxFQUFFLEVBQUUsS0FBSzhFLFFBQUwsQ0FBYzlFLEVBRHBCO1lBRUVNLFFBQVEsRUFBRSxLQUFLd0UsUUFBTCxDQUFjekUsR0FGMUI7WUFHRVYsVUFBVSxFQUFFLEtBQUtBO1VBSG5CLENBREs7UUFEWSxDQUFmO01BTDBDLENBQTdDLENBQUwsQ0FlR3RCLElBZkgsQ0FlUSxVQUFDQyxRQUFELEVBQWM7UUFDbEIsT0FBT0EsUUFBUSxDQUFDc0gsSUFBVCxFQUFQO01BQ0QsQ0FqQkgsRUFrQkd2SCxJQWxCSCxDQWtCUSxVQUFDd0gsTUFBRCxFQUFZO1FBQ2hCLElBQU1DLFlBQVksR0FBR0QsTUFBTSxDQUFDNUcsS0FBUCxDQUFhOEcsR0FBYixFQUFyQjtRQUVBbkgsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVosRUFBOEJpSCxZQUE5QjtRQUNBbEgsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWixFQUFvQixLQUFJLENBQUNrRyxLQUF6Qjs7UUFFQSxJQUFJLEtBQUksQ0FBQ3hCLHFCQUFMLENBQTJCSyxNQUEzQixHQUFvQyxDQUFwQyxJQUF5QyxDQUFDLEtBQUksQ0FBQ21CLEtBQUwsQ0FBV0UsUUFBekQsRUFBbUU7VUFDakV4Ryx5REFBQSxHQUFnQkosSUFBaEIsQ0FBcUIsVUFBQ00sS0FBRCxFQUFXO1lBQzlCRywwREFBYSxDQUFDSCxLQUFELENBQWI7WUFDQSxLQUFJLENBQUNrRyxNQUFMLEdBQWMsYUFBZDtZQUNBLEtBQUksQ0FBQ0YsUUFBTCxHQUFnQixLQUFoQjtZQUNBLEtBQUksQ0FBQ3BCLHFCQUFMLEdBQTZCLEVBQTdCO1lBQ0FoRyxNQUFNLENBQUMyRSxhQUFQLENBQ0UsSUFBSUMsV0FBSixDQUFnQixrQkFBaEIsRUFBb0M7Y0FDbENDLE1BQU0sRUFBRTtnQkFBRTRELFFBQVEsRUFBRTtjQUFaO1lBRDBCLENBQXBDLENBREY7VUFLRCxDQVZEO1FBV0QsQ0FaRCxNQVlPO1VBQ0wsSUFBTUMsaUJBQWlCLEdBQUcsRUFBMUI7O1VBRUEsSUFBSSxLQUFJLENBQUNsQixLQUFMLENBQVdFLFFBQWYsRUFBeUI7WUFDdkJyRyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaO1lBQ0FvSCxpQkFBaUIsQ0FBQ3BGLElBQWxCLENBQXVCO2NBQ3JCYixFQUFFLEVBQUUsS0FBSSxDQUFDK0UsS0FBTCxDQUFXQyxTQUFYLENBQXFCUixPQURKO2NBRXJCbkUsR0FBRyxFQUFFLEtBQUksQ0FBQ3lFLFFBQUwsQ0FBY3pFLEdBRkU7Y0FHckJWLFVBQVUsRUFBRTtnQkFDVkMsV0FBVyxFQUFFa0csWUFBWSxDQUFDakc7Y0FEaEI7WUFIUyxDQUF2QjtVQU9EOztVQUVELElBQUksS0FBSSxDQUFDMEQscUJBQUwsQ0FBMkJLLE1BQTNCLEdBQW9DLENBQXhDLEVBQ0UsS0FBSSxDQUFDTCxxQkFBTCxDQUEyQnJFLE9BQTNCLENBQW1DLFVBQUNqQixDQUFELEVBQU87WUFDeENnSSxpQkFBaUIsQ0FBQ3BGLElBQWxCLENBQXVCO2NBQ3JCYixFQUFFLEVBQUUvQixDQUFDLENBQUMrQixFQURlO2NBRXJCSyxHQUFHLEVBQUUsQ0FGZ0I7Y0FHckJWLFVBQVUsRUFBRTtnQkFDVkMsV0FBVyxFQUFFa0csWUFBWSxDQUFDakc7Y0FEaEI7WUFIUyxDQUF2QjtVQU9ELENBUkQ7VUFVRnlCLEtBQUssQ0FBQy9ELE1BQU0sQ0FBQ2dFLE9BQVAsQ0FBZUMsTUFBZixDQUFzQkMsSUFBdEIsR0FBNkIsYUFBOUIsRUFBNkM7WUFDaERDLE1BQU0sRUFBRSxNQUR3QztZQUVoREMsT0FBTyxFQUFFO2NBQ1AsZ0JBQWdCO1lBRFQsQ0FGdUM7WUFLaERDLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7Y0FDbkI3QyxLQUFLLEVBQUVnSDtZQURZLENBQWY7VUFMMEMsQ0FBN0MsQ0FBTCxDQVNHNUgsSUFUSCxDQVNRLFlBQU07WUFDVkkseURBQUEsR0FBZ0JKLElBQWhCLENBQXFCLFVBQUNNLEtBQUQsRUFBVztjQUM5QkcsMERBQWEsQ0FBQ0gsS0FBRCxDQUFiO2NBQ0EsS0FBSSxDQUFDa0csTUFBTCxHQUFjLGFBQWQ7Y0FDQSxLQUFJLENBQUNGLFFBQUwsR0FBZ0IsS0FBaEI7Y0FDQSxLQUFJLENBQUNwQixxQkFBTCxHQUE2QixFQUE3QjtjQUNBaEcsTUFBTSxDQUFDMkUsYUFBUCxDQUNFLElBQUlDLFdBQUosQ0FBZ0Isa0JBQWhCLEVBQW9DO2dCQUNsQ0MsTUFBTSxFQUFFO2tCQUFFNEQsUUFBUSxFQUFFO2dCQUFaO2NBRDBCLENBQXBDLENBREY7WUFLRCxDQVZEO1VBV0QsQ0FyQkgsRUFzQkdoRSxLQXRCSCxDQXNCUyxVQUFDL0QsQ0FBRCxFQUFPO1lBQ1o7WUFDQWlJLEtBQUssNkNBQUw7WUFDQSxLQUFJLENBQUNyQixNQUFMLEdBQWMsYUFBZDtZQUNBLEtBQUksQ0FBQ0YsUUFBTCxHQUFnQixJQUFoQjtVQUNELENBM0JIO1FBNEJEO01BQ0YsQ0ExRkgsRUEyRkczQyxLQTNGSCxDQTJGUyxVQUFDL0QsQ0FBRCxFQUFPO1FBQ1o7UUFDQWlJLEtBQUssNkNBQUw7UUFDQSxLQUFJLENBQUNyQixNQUFMLEdBQWMsYUFBZDtRQUNBLEtBQUksQ0FBQ0YsUUFBTCxHQUFnQixJQUFoQjtNQUNELENBaEdIO0lBaUdELENBbEtJO0lBbUtMTSxRQW5LSyxzQkFtS007TUFDVCxLQUFLRixLQUFMLENBQVdFLFFBQVgsR0FBc0IsQ0FBQyxLQUFLRixLQUFMLENBQVdFLFFBQWxDO01BQ0EsS0FBSzFGLEtBQUwsR0FBYUEsS0FBSyxDQUNoQixLQUFLdUYsUUFBTCxDQUFjOUUsRUFERSxFQUVoQixLQUFLdUQscUJBRlcsRUFHaEIsS0FBS3dCLEtBQUwsQ0FBV0UsUUFBWCxHQUFzQixLQUFLRixLQUFMLENBQVdDLFNBQVgsQ0FBcUJLLFVBQTNDLEdBQXdELEtBSHhDLENBQWxCO0lBS0QsQ0ExS0k7SUEyS0xjLGFBM0tLLHlCQTJLUy9ILEtBM0tULEVBMktnQmdJLE1BM0toQixFQTJLd0I7TUFDM0IsSUFBTWxHLE9BQU8sR0FBRyxLQUFLQSxPQUFyQjtNQUNBLElBQU1tRyxVQUFVLEdBQUduRyxPQUFPLENBQUNULEdBQVIsQ0FBWSxVQUFDeEIsQ0FBRCxFQUFPO1FBQ3BDLE9BQU9BLENBQUMsQ0FBQ2tHLElBQUYsSUFBVWlDLE1BQVYsR0FBbUJoSSxLQUFuQixHQUEyQkgsQ0FBQyxDQUFDRyxLQUFwQztNQUNELENBRmtCLENBQW5CO01BSUEsSUFBTWtJLFVBQVUsR0FBR2xELFFBQVEsQ0FBQ3hDLE1BQVQsQ0FBZ0IsVUFBQzZDLE9BQUQsRUFBYTtRQUM5QyxPQUFPUCwrQ0FBTyxDQUFDTyxPQUFPLENBQUN2RCxPQUFULEVBQWtCbUcsVUFBbEIsQ0FBZDtNQUNELENBRmtCLEVBRWhCLENBRmdCLENBQW5CLENBSUE7TUFKQTtNQU1FLEtBQUt0QixLQUFMLENBQVdDLFNBQVgsR0FBdUJSLE9BQU8sQ0FBQzhCLFVBQVUsQ0FBQ3RHLEVBQVosQ0FBL0IsRUFDRSxLQUFLVCxLQUFMLEdBQWFBLEtBQUssQ0FDakIrRyxVQUFVLENBQUN0RyxFQURNLEVBRWpCLEtBQUt1RCxxQkFGWSxFQUdqQixLQUFLd0IsS0FBTCxDQUFXRSxRQUFYLEdBQXNCLEtBQUtGLEtBQUwsQ0FBV0MsU0FBWCxDQUFxQkssVUFBM0MsR0FBd0QsS0FIdkMsQ0FEcEI7TUFNRCxLQUFLUCxRQUFMLENBQWM5RSxFQUFkLEdBQW1Cc0csVUFBVSxDQUFDdEcsRUFBOUI7TUFDQSxLQUFLMkUsUUFBTCxHQUFnQjJCLFVBQVUsQ0FBQzFCLFNBQVgsR0FBdUIsS0FBdkIsR0FBK0IsSUFBL0M7TUFDQSxLQUFLQyxNQUFMLEdBQWN5QixVQUFVLENBQUMxQixTQUFYLEdBQXVCLGFBQXZCLEdBQXVDLGFBQXJEO01BQ0EsS0FBSzFFLE9BQUwsR0FBZStELGNBQWMsQ0FBQ3FDLFVBQVUsQ0FBQ3RHLEVBQVosQ0FBN0I7SUFDRDtFQWpNSSxDQUFQO0FBbU1ELENBclFEOzs7Ozs7Ozs7Ozs7QUNMQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QyxvSEFBb0gsaURBQWlEO1dBQ3JLO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0M3QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRCw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSw4Q0FBOEM7O1dBRTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EsMkRBQTJELHNEQUFzRDtVQUNqSCxxRkFBcUYsdURBQXVEO1VBQzVJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL2NhcnQuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL2hlYWRlci1oZWlnaHQuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zdHlsZXMvYmFzZS5zY3NzPzA5MjciLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFscGluZSBmcm9tICdhbHBpbmVqcydcbmltcG9ydCBjb2xsYXBzZSBmcm9tICdAYWxwaW5lanMvY29sbGFwc2UnXG5pbXBvcnQgeyBzdWJzY3JpYmUgfSBmcm9tICdrbGF2aXlvLXN1YnNjcmliZSdcblxuaW1wb3J0IHByb2R1Y3QgZnJvbSAnLi91dGlscy9wcm9kdWN0J1xuXG5pbXBvcnQgJy4vdXRpbHMvaGVhZGVyLWhlaWdodCdcbmltcG9ydCAnLi91dGlscy9jYXJ0J1xuLy8gaW1wb3J0ICcuL2FuaW1hdGlvbnMvaGVhZGVyJ1xuXG5BbHBpbmUucGx1Z2luKGNvbGxhcHNlKVxuXG5BbHBpbmUuZGF0YSgncHJvZHVjdCcsIHByb2R1Y3QpXG5cbndpbmRvdy5BbHBpbmUgPSBBbHBpbmVcblxuQWxwaW5lLnN0YXJ0KClcblxuY29uc3QgbG9veENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb294UmV2aWV3cycpXG5sb294Q29udGFpbmVyPy5jbGFzc0xpc3QuYWRkKCdzY3JvbGwtbXQtNDAnKVxuXG5jb25zdCBmb290ZXJTdWJzY2liZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXItc3Vic2NyaWJlJylcblxuZm9vdGVyU3Vic2NpYmUuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyLXN1YnNjcmliZS1lbWFpbCcpXG5cbiAgc3Vic2NyaWJlKCdYQUdBdkEnLCBlbWFpbC52YWx1ZSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBlbWFpbC52YWx1ZSA9ICcnXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVtYWlsLW1lc3NhZ2UnKS5pbm5lckhUTUwgPVxuICAgICAgJ1RoYW5rIHlvdSBmb3Igc2lnbmluZyB1cCEnXG4gIH0pXG59KVxuIiwiaW1wb3J0IHsgY29udmVydENvbG9yVmFyaWFibGVzIH0gZnJvbSAnQG1lcnRhc2FuL3RhaWx3aW5kY3NzLXZhcmlhYmxlcy9zcmMvaGVscGVycydcbmltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcblxuY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gIGNvbnNvbGUubG9nKHN0YXRlKVxuICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxufSlcblxuZnVuY3Rpb24gY2FydFRvQWxwaW5lKHN0YXRlKSB7XG4gIGxldCBwcm9kdWN0cyA9IFtdXG4gIGlmIChzdGF0ZS5pdGVtcykge1xuICAgIHN0YXRlLml0ZW1zLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGxldCBmID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcblxuICAgICAgLy8gaWYgKGUuZmVhdHVyZWRfaW1hZ2UudXJsKSB7XG4gICAgICAvLyAgIGxldCBmaWxlbmFtZSA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsXG4gICAgICAvLyAgICAgLnJlcGxhY2UoL1xcPy4qJC8sICcnKVxuICAgICAgLy8gICAgIC5yZXBsYWNlKC8uKlxcLy8sICcnKVxuICAgICAgLy8gICBsZXQgbmV3RmlsZW5hbWUgPSBmaWxlbmFtZS5yZXBsYWNlKC9cXC5bXi8uXSskLywgJ18zMDB4LmpwZycpXG4gICAgICAvLyAgIGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybC5yZXBsYWNlKGZpbGVuYW1lLCBuZXdGaWxlbmFtZSlcbiAgICAgIC8vIH1cblxuICAgICAgY29uc3QgcmVhbFByaWNlID0gZS5wcmljZSAvIDEwMFxuXG4gICAgICBjb25zdCBhZGRPblByb2R1Y3RzID0gc3RhdGUuaXRlbXNcbiAgICAgICAgLm1hcCgocCkgPT4ge1xuICAgICAgICAgIGlmIChwLnByb3BlcnRpZXM/Ll9jYXJ0UGFyZW50ID09PSBlLmtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdGl0bGU6IHAucHJvZHVjdF90aXRsZSxcbiAgICAgICAgICAgICAga2V5OiBwLmtleSxcbiAgICAgICAgICAgICAgcHJpY2U6IHAucHJpY2UgLyAxMDAsXG4gICAgICAgICAgICAgIGlkOiBwLnZhcmlhbnRfaWQsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHAub3B0aW9uc193aXRoX3ZhbHVlcyxcbiAgICAgICAgICAgICAgaW1hZ2U6IHAuZmVhdHVyZWRfaW1hZ2UudXJsLFxuICAgICAgICAgICAgICBxdHk6IHAucXVhbnRpdHksXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IHAucHJvcGVydGllcyxcbiAgICAgICAgICAgICAgcmVtb3ZlKCkge1xuICAgICAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKHRoaXMua2V5KVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB1cGRhdGUocXR5KSB7XG4gICAgICAgICAgICAgICAgY2FydFVwZGF0ZUl0ZW0odGhpcy5rZXksIHBhcnNlSW50KHF0eSkpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKChlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGVcbiAgICAgICAgfSlcblxuICAgICAgLy8gY29uc29sZS5sb2coYWRkT25Qcm9kdWN0cylcblxuICAgICAgaWYgKCFlLnByb3BlcnRpZXM/Ll9jYXJ0UGFyZW50KSB7XG4gICAgICAgIHByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBlLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAga2V5OiBlLmtleSxcbiAgICAgICAgICBwcmljZTogcmVhbFByaWNlLFxuICAgICAgICAgIGlkOiBlLnZhcmlhbnRfaWQsXG4gICAgICAgICAgb3B0aW9uczogZS5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICAgIGltYWdlOiBmLFxuICAgICAgICAgIGFkZE9uUHJvZHVjdHM6IGFkZE9uUHJvZHVjdHMsXG4gICAgICAgICAgcXR5OiBlLnF1YW50aXR5LFxuICAgICAgICAgIHByb3BlcnRpZXM6IGUucHJvcGVydGllcyxcbiAgICAgICAgICByZW1vdmUoKSB7XG4gICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZShxdHkpIHtcbiAgICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG90YWw6IHN0YXRlLml0ZW1zX3N1YnRvdGFsX3ByaWNlIC8gMTAwLFxuICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcbiAgICBub3RlOiBzdGF0ZS5ub3RlLFxuICB9XG59XG5cbmZ1bmN0aW9uIGNhcnRSZW1vdmVJdGVtKGtleSkge1xuICBsZXQgcmVtb3ZlUHJvZHVjdHMgPSB7fVxuXG4gIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHN0YXRlKVxuXG4gICAgY29uc3QgYWRkT25SZW1vdmUgPSBzdGF0ZS5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGl0ZW0ucHJvcGVydGllcy5fY2FydFBhcmVudCAhPSBudWxsICYmXG4gICAgICAgIGtleSA9PT0gaXRlbS5wcm9wZXJ0aWVzLl9jYXJ0UGFyZW50XG4gICAgICApIHtcbiAgICAgICAgcmVtb3ZlUHJvZHVjdHNbaXRlbS5rZXldID0gMFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBwYXJlbnRJdGVtID0gc3RhdGUuaXRlbXMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGtleSA9PT0gaXRlbS5rZXlcbiAgICB9KVxuXG4gICAgcmVtb3ZlUHJvZHVjdHNbcGFyZW50SXRlbS5rZXldID0gMFxuXG4gICAgLy8gY29uc29sZS5sb2cocmVtb3ZlUHJvZHVjdHMpXG5cbiAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArICdjYXJ0L3VwZGF0ZS5qcycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdXBkYXRlczogcmVtb3ZlUHJvZHVjdHMsXG4gICAgICB9KSxcbiAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgfSlcbiAgfSlcblxuICAvLyBjYXJ0LnJlbW92ZUl0ZW0oa2V5KS50aGVuKChzdGF0ZSkgPT4ge1xuICAvLyAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIC8vIH0pXG59XG5cbmZ1bmN0aW9uIGNhcnRVcGRhdGVJdGVtKGtleSwgcXR5KSB7XG4gIGNhcnQudXBkYXRlSXRlbShrZXksIHsgcXVhbnRpdHk6IHF0eSB9KS50aGVuKChzdGF0ZSkgPT4ge1xuICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJ0VXBkYXRlQWxsKHN0YXRlKSB7XG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlcHJvZHVjdHMnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydDogY2FydFRvQWxwaW5lKHN0YXRlKSB9LFxuICAgIH0pXG4gIClcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGVjYXJ0Y291bnQnLCB7XG4gICAgICBkZXRhaWw6IHsgY2FydFRvdGFsOiBzdGF0ZS5pdGVtX2NvdW50IH0sXG4gICAgfSlcbiAgKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2FydFVwZGF0ZScsIChlKSA9PiB7XG4gIGNhcnQudXBkYXRlTm90ZShlLnRhcmdldC52YWx1ZSlcbn0pXG4iLCJzZXRIZWFkZXJIZWlnaHQoKVxuXG5mdW5jdGlvbiBzZXRIZWFkZXJIZWlnaHQoKSB7XG4gIGNvbnN0IGhlYWRlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oZWFkZXItaGVpZ2h0JywgYCR7aGVhZGVySGVpZ2h0fXB4YClcbiAgY29uc3QgZm9vdGVySGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RlcicpLm9mZnNldEhlaWdodFxuICBkb2N1bWVudC5ib2R5LnN0eWxlLnNldFByb3BlcnR5KCctLWZvb3Rlci1oZWlnaHQnLCBgJHtmb290ZXJIZWlnaHR9cHhgKVxuICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS13aW5kb3ctaGVpZ2h0JywgYCR7d2luZG93SGVpZ2h0fXB4YClcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldEhlYWRlckhlaWdodClcbiIsImltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcbmltcG9ydCAqIGFzIGN1cnJlbmN5IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWN1cnJlbmN5J1xuaW1wb3J0IHsgY2FydFVwZGF0ZUFsbCB9IGZyb20gJy4uL3V0aWxzL2NhcnQnXG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJ1xuXG5leHBvcnQgZGVmYXVsdCAocHJvZHVjdCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcInByb2R1Y3RcIiwgcHJvZHVjdCk7XG4gIGNvbnN0IGN1cnJlbnRWYXJpYW50ID0gcHJvZHVjdC5wcm9kdWN0LnZhcmlhbnRzWzBdXG4gIGNvbnN0IHZhcmlhbnRzID0gcHJvZHVjdC5wcm9kdWN0LnZhcmlhbnRzXG4gIGNvbnN0IGxpbmVyU3luYyA9IHByb2R1Y3QubGluZXJTeW5jXG5cbiAgY29uc3QgcHJpY2UgPSAodmFyaWFudElkLCBzZWxlY3RlZEFkZE9uUHJvZHVjdHMsIGhhc0xpbmVyKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coc2VsZWN0ZWRBZGRPblByb2R1Y3RzKTtcbiAgICBjb25zdCB2YXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKChvYmopID0+IG9iai5pZCA9PT0gdmFyaWFudElkKVswXVxuICAgIGxldCBhZGRPblByaWNlID0gMFxuICAgIGlmIChzZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgYWRkT25QcmljZSA9IGFkZE9uUHJpY2UgKyBlLnByaWNlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChoYXNMaW5lcikge1xuICAgICAgYWRkT25QcmljZSA9IGFkZE9uUHJpY2UgKyBoYXNMaW5lclxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhY3R1YWxQcmljZTogJyQnICsgKHZhcmlhbnQucHJpY2UgKyBhZGRPblByaWNlKSAvIDEwMCxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IHZhcmlhbnQuY29tcGFyZV9hdF9wcmljZVxuICAgICAgICA/ICckJyArICh2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2UgKyBhZGRPblByaWNlKSAvIDEwMFxuICAgICAgICA6ICcnLFxuICAgICAgbWVzc2FnZTogJycsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY3VycmVudE9wdGlvbnMgPSAodmFyaWFudElkKSA9PiB7XG4gICAgY29uc3QgdmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IHZhcmlhbnRJZClbMF1cbiAgICBjb25zdCBjdXJyZW50T3B0aW9ucyA9IHByb2R1Y3QucHJvZHVjdC5vcHRpb25zLm1hcCgoZSwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogZSxcbiAgICAgICAgdmFsdWU6IHZhcmlhbnQub3B0aW9uc1tpXSxcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBjdXJyZW50T3B0aW9uc1xuICB9XG5cbiAgY29uc3QgaGFuZGxlQWRkT24gPSAoaWQsIHNlbGVjdGVkQWRkT25zLCBwcmljZSkgPT4ge1xuICAgIGxldCB1cGRhdGVkQWRkT25zID0gc2VsZWN0ZWRBZGRPbnNcbiAgICBjb25zdCBjaGVja1N0YXR1cyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IGlkKVxuICAgIGlmIChjaGVja1N0YXR1cy5sZW5ndGggPiAwKSB7XG4gICAgICB1cGRhdGVkQWRkT25zID0gc2VsZWN0ZWRBZGRPbnMuZmlsdGVyKChvYmopID0+IG9iai5pZCAhPSBpZClcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlZEFkZE9ucy5wdXNoKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBxdHk6IDEsXG4gICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB1cGRhdGVkQWRkT25zXG4gIH1cblxuICBjb25zdCBsaW5lcklkID0gKHZhcmlhbnQpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcImxpbmVyXCIsIGxpbmVyU3luYylcbiAgICAvLyBjb25zb2xlLmxvZyhcInZhcmlhbnRcIiwgdmFyaWFudClcbiAgICBjb25zdCBsaW5lckZpbHRlciA9IHByb2R1Y3QubGluZXJTeW5jLmZpbmQoKG9iaikgPT4ge1xuICAgICAgcmV0dXJuIG9iai52YXJpYW50SWQgPT09IHZhcmlhbnRcbiAgICB9KVxuICAgIC8vIGNvbnNvbGUubG9nKFwibGluZXJcIiwgbGluZXJGaWx0ZXIpXG4gICAgcmV0dXJuIGxpbmVyRmlsdGVyID8gbGluZXJGaWx0ZXIgOiBudWxsXG4gICAgLy8gcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLy9kZWZhdWx0c1xuICAgIHByaWNlOiBwcmljZShjdXJyZW50VmFyaWFudC5pZCwgW10sIGZhbHNlKSxcbiAgICBzdWJtaXRUZXh0OiAnQWRkIHRvIENhcnQnLFxuICAgIGRpc2FibGVkOiBjdXJyZW50VmFyaWFudC5hdmFpbGFibGUgPyBmYWxzZSA6IHRydWUsXG4gICAgYnV0dG9uOiBjdXJyZW50VmFyaWFudC5hdmFpbGFibGUgPyAnQWRkIHRvIENhcnQnIDogJ1VuYXZhaWxhYmxlJyxcbiAgICBhZGRPblByb2R1Y3RzOiBwcm9kdWN0LmFkZE9uUHJvZHVjdHMsXG4gICAgc2VsZWN0ZWRBZGRPblByb2R1Y3RzOiBbXSxcblxuICAgIG9wdGlvbnM6IGN1cnJlbnRPcHRpb25zKGN1cnJlbnRWYXJpYW50LmlkKSxcbiAgICAvLyAgYXZhaWxhYmxlT3B0aW9uczogYXZhaWxhYmxlT3B0aW9ucyh0aGlzLm9wdGlvbnMpLFxuXG4gICAgLy9TdG9yZSBmb3Igc2VuZGluZyB0byBhZGQgY2FydFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICBpZDogY3VycmVudFZhcmlhbnQuaWQsXG4gICAgICBxdHk6IDEsXG4gICAgfSxcblxuICAgIGxpbmVyOiB7XG4gICAgICBsaW5lckluZm86IGxpbmVySWQoY3VycmVudFZhcmlhbnQuaWQpLFxuICAgICAgYWRkTGluZXI6IGZhbHNlLFxuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIC8vZm9ybSBhY3Rpb25zXG4gICAgY2hlY2tBZGRPbnMoaWQpIHtcbiAgICAgIGNvbnN0IGNoZWNrU3RhdHVzID0gdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMuZmlsdGVyKFxuICAgICAgICAob2JqKSA9PiBvYmouaWQgPT09IGlkXG4gICAgICApXG4gICAgICBpZiAoY2hlY2tTdGF0dXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3RBZGRvbihpZCwgc2VsZWN0ZWRBZGRPbnMsIGNvc3QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gaGFuZGxlQWRkT24oaWQsIHNlbGVjdGVkQWRkT25zLCBjb3N0KVxuICAgICAgdGhpcy5wcmljZSA9IHByaWNlKFxuICAgICAgICB0aGlzLmZvcm1EYXRhLmlkLFxuICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyxcbiAgICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA/IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVyUHJpY2UgOiBmYWxzZVxuICAgICAgKVxuICAgICAgLy8gY29uc29sZS5sb2coaGFuZGxlQWRkT24oaWQsIHNlbGVjdGVkQWRkT25zKSlcbiAgICB9LFxuICAgIGluY3JlYXNlKCkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPSB0aGlzLmZvcm1EYXRhLnF0eSArIDFcbiAgICB9LFxuICAgIGRlY3JlYXNlKCkge1xuICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgPVxuICAgICAgICB0aGlzLmZvcm1EYXRhLnF0eSAtIDEgPT09IDAgPyAxIDogdGhpcy5mb3JtRGF0YS5xdHkgLSAxXG4gICAgfSxcbiAgICB1cGRhdGVNb25vZ3JhbSh2YWwpIHtcbiAgICAgIGNvbnNvbGUubG9nKHZhbClcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0ge1xuICAgICAgICAgIE1vbm9ncmFtOiB2YWwsXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHt9XG4gICAgICB9XG4gICAgfSxcbiAgICBvblN1Ym1pdCgpIHtcbiAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZGluZy4uLidcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArICdjYXJ0L2FkZC5qcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWQ6IHRoaXMuZm9ybURhdGEuaWQsXG4gICAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLmZvcm1EYXRhLnF0eSxcbiAgICAgICAgICAgICAgcHJvcGVydGllczogdGhpcy5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxhc3RDYXJ0SXRlbSA9IHJlc3VsdC5pdGVtcy5wb3AoKVxuXG4gICAgICAgICAgY29uc29sZS5sb2coJ2xhc3QgY2FydCBpdGVtJywgbGFzdENhcnRJdGVtKVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdsaW5lJywgdGhpcy5saW5lcilcblxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cy5sZW5ndGggPCAxICYmICF0aGlzLmxpbmVyLmFkZExpbmVyKSB7XG4gICAgICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSAnQWRkIHRvIENhcnQnXG4gICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IFtdXG4gICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydHN0YXR1cycsIHtcbiAgICAgICAgICAgICAgICAgIGRldGFpbDogeyBjYXJ0T3BlbjogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGFkZE9uQ2FydFByb2R1Y3RzID0gW11cblxuICAgICAgICAgICAgaWYgKHRoaXMubGluZXIuYWRkTGluZXIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xpbmVyJylcbiAgICAgICAgICAgICAgYWRkT25DYXJ0UHJvZHVjdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVySWQsXG4gICAgICAgICAgICAgICAgcXR5OiB0aGlzLmZvcm1EYXRhLnF0eSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICBfY2FydFBhcmVudDogbGFzdENhcnRJdGVtLmtleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGFkZE9uQ2FydFByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgaWQ6IGUuaWQsXG4gICAgICAgICAgICAgICAgICBxdHk6IDEsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIF9jYXJ0UGFyZW50OiBsYXN0Q2FydEl0ZW0ua2V5LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArICdjYXJ0L2FkZC5qcycsIHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGFkZE9uQ2FydFByb2R1Y3RzLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdBZGQgdG8gQ2FydCdcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBbXVxuICAgICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydHN0YXR1cycsIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgY2FydE9wZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSAnVW5hdmFpbGFibGUnXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgYWxlcnQoYFRoaXMgcHJvZHVjdCBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50YClcbiAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdVbmF2YWlsYWJsZSdcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgYWRkTGluZXIoKSB7XG4gICAgICB0aGlzLmxpbmVyLmFkZExpbmVyID0gIXRoaXMubGluZXIuYWRkTGluZXJcbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZShcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMsXG4gICAgICAgIHRoaXMubGluZXIuYWRkTGluZXIgPyB0aGlzLmxpbmVyLmxpbmVySW5mby5saW5lclByaWNlIDogZmFsc2VcbiAgICAgIClcbiAgICB9LFxuICAgIHVwZGF0ZVZhcmlhbnQodmFsdWUsIG9wdGlvbikge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgICAgY29uc3QgbmV3T3B0aW9ucyA9IG9wdGlvbnMubWFwKChlKSA9PiB7XG4gICAgICAgIHJldHVybiBlLm5hbWUgPT0gb3B0aW9uID8gdmFsdWUgOiBlLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBjb25zdCBuZXdWYXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKCh2YXJpYW50KSA9PiB7XG4gICAgICAgIHJldHVybiBpc0VxdWFsKHZhcmlhbnQub3B0aW9ucywgbmV3T3B0aW9ucylcbiAgICAgIH0pWzBdXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1ZhcmlhbnQpO1xuXG4gICAgICA7KHRoaXMubGluZXIubGluZXJJbmZvID0gbGluZXJJZChuZXdWYXJpYW50LmlkKSksXG4gICAgICAgICh0aGlzLnByaWNlID0gcHJpY2UoXG4gICAgICAgICAgbmV3VmFyaWFudC5pZCxcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyxcbiAgICAgICAgICB0aGlzLmxpbmVyLmFkZExpbmVyID8gdGhpcy5saW5lci5saW5lckluZm8ubGluZXJQcmljZSA6IGZhbHNlXG4gICAgICAgICkpXG4gICAgICB0aGlzLmZvcm1EYXRhLmlkID0gbmV3VmFyaWFudC5pZFxuICAgICAgdGhpcy5kaXNhYmxlZCA9IG5ld1ZhcmlhbnQuYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlXG4gICAgICB0aGlzLmJ1dHRvbiA9IG5ld1ZhcmlhbnQuYXZhaWxhYmxlID8gJ0FkZCB0byBDYXJ0JyA6ICdVbmF2YWlsYWJsZSdcbiAgICAgIHRoaXMub3B0aW9ucyA9IGN1cnJlbnRPcHRpb25zKG5ld1ZhcmlhbnQuaWQpXG4gICAgfSxcbiAgfVxufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImJhc2VcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvYmFzZS5qc1wiKTsgfSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzc1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiQWxwaW5lIiwiY29sbGFwc2UiLCJzdWJzY3JpYmUiLCJwcm9kdWN0IiwicGx1Z2luIiwiZGF0YSIsIndpbmRvdyIsInN0YXJ0IiwibG9veENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImFkZCIsImZvb3RlclN1YnNjaWJlIiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZW1haWwiLCJ2YWx1ZSIsInRoZW4iLCJyZXNwb25zZSIsImlubmVySFRNTCIsImNvbnZlcnRDb2xvclZhcmlhYmxlcyIsImNhcnQiLCJnZXRTdGF0ZSIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsImNhcnRVcGRhdGVBbGwiLCJjYXJ0VG9BbHBpbmUiLCJwcm9kdWN0cyIsIml0ZW1zIiwiZm9yRWFjaCIsImYiLCJmZWF0dXJlZF9pbWFnZSIsInVybCIsInJlYWxQcmljZSIsInByaWNlIiwiYWRkT25Qcm9kdWN0cyIsIm1hcCIsInAiLCJwcm9wZXJ0aWVzIiwiX2NhcnRQYXJlbnQiLCJrZXkiLCJ0aXRsZSIsInByb2R1Y3RfdGl0bGUiLCJpZCIsInZhcmlhbnRfaWQiLCJvcHRpb25zIiwib3B0aW9uc193aXRoX3ZhbHVlcyIsImltYWdlIiwicXR5IiwicXVhbnRpdHkiLCJyZW1vdmUiLCJjYXJ0UmVtb3ZlSXRlbSIsInVwZGF0ZSIsImNhcnRVcGRhdGVJdGVtIiwicGFyc2VJbnQiLCJmaWx0ZXIiLCJwdXNoIiwidG90YWwiLCJpdGVtc19zdWJ0b3RhbF9wcmljZSIsIm5vdGUiLCJyZW1vdmVQcm9kdWN0cyIsImFkZE9uUmVtb3ZlIiwiaXRlbSIsInBhcmVudEl0ZW0iLCJmaW5kIiwiZmV0Y2giLCJTaG9waWZ5Iiwicm91dGVzIiwicm9vdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInVwZGF0ZXMiLCJjYXRjaCIsInVwZGF0ZUl0ZW0iLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJjYXJ0VG90YWwiLCJpdGVtX2NvdW50IiwidXBkYXRlTm90ZSIsInRhcmdldCIsInNldEhlYWRlckhlaWdodCIsImhlYWRlckhlaWdodCIsIm9mZnNldEhlaWdodCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJmb290ZXJIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJpbm5lckhlaWdodCIsImN1cnJlbmN5IiwiaXNFcXVhbCIsImN1cnJlbnRWYXJpYW50IiwidmFyaWFudHMiLCJsaW5lclN5bmMiLCJ2YXJpYW50SWQiLCJzZWxlY3RlZEFkZE9uUHJvZHVjdHMiLCJoYXNMaW5lciIsInZhcmlhbnQiLCJvYmoiLCJhZGRPblByaWNlIiwibGVuZ3RoIiwiYWN0dWFsUHJpY2UiLCJvcmlnaW5hbFByaWNlIiwiY29tcGFyZV9hdF9wcmljZSIsIm1lc3NhZ2UiLCJjdXJyZW50T3B0aW9ucyIsImkiLCJuYW1lIiwiaGFuZGxlQWRkT24iLCJzZWxlY3RlZEFkZE9ucyIsInVwZGF0ZWRBZGRPbnMiLCJjaGVja1N0YXR1cyIsImxpbmVySWQiLCJsaW5lckZpbHRlciIsInN1Ym1pdFRleHQiLCJkaXNhYmxlZCIsImF2YWlsYWJsZSIsImJ1dHRvbiIsImZvcm1EYXRhIiwibGluZXIiLCJsaW5lckluZm8iLCJhZGRMaW5lciIsImNoZWNrQWRkT25zIiwic2VsZWN0QWRkb24iLCJjb3N0IiwibGluZXJQcmljZSIsImluY3JlYXNlIiwiZGVjcmVhc2UiLCJ1cGRhdGVNb25vZ3JhbSIsInZhbCIsIk1vbm9ncmFtIiwib25TdWJtaXQiLCJqc29uIiwicmVzdWx0IiwibGFzdENhcnRJdGVtIiwicG9wIiwiY2FydE9wZW4iLCJhZGRPbkNhcnRQcm9kdWN0cyIsImFsZXJ0IiwidXBkYXRlVmFyaWFudCIsIm9wdGlvbiIsIm5ld09wdGlvbnMiLCJuZXdWYXJpYW50Il0sInNvdXJjZVJvb3QiOiIifQ==