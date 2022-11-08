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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzdCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BELDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBLDhDQUE4Qzs7V0FFOUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxtQ0FBbUM7V0FDcEU7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWxEQTtVQUNBO1VBQ0E7VUFDQSwyREFBMkQsc0RBQXNEO1VBQ2pILHFGQUFxRix1REFBdUQ7VUFDNUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvYmFzZS5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvY2FydC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvaGVhZGVyLWhlaWdodC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3NjcmlwdHMvdXRpbHMvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5Ly4vc3JjL3N0eWxlcy9iYXNlLnNjc3M/MDkyNyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWxwaW5lIGZyb20gJ2FscGluZWpzJ1xuaW1wb3J0IGNvbGxhcHNlIGZyb20gJ0BhbHBpbmVqcy9jb2xsYXBzZSdcbmltcG9ydCB7IHN1YnNjcmliZSB9IGZyb20gJ2tsYXZpeW8tc3Vic2NyaWJlJ1xuXG5pbXBvcnQgcHJvZHVjdCBmcm9tICcuL3V0aWxzL3Byb2R1Y3QnXG5cbmltcG9ydCAnLi91dGlscy9oZWFkZXItaGVpZ2h0J1xuaW1wb3J0ICcuL3V0aWxzL2NhcnQnXG4vLyBpbXBvcnQgJy4vYW5pbWF0aW9ucy9oZWFkZXInXG5cbkFscGluZS5wbHVnaW4oY29sbGFwc2UpXG5cbkFscGluZS5kYXRhKCdwcm9kdWN0JywgcHJvZHVjdClcblxud2luZG93LkFscGluZSA9IEFscGluZVxuXG5BbHBpbmUuc3RhcnQoKVxuXG5jb25zdCBsb294Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvb3hSZXZpZXdzJylcbmxvb3hDb250YWluZXI/LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbC1tdC00MCcpXG5cbmNvbnN0IGZvb3RlclN1YnNjaWJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3Rlci1zdWJzY3JpYmUnKVxuXG5mb290ZXJTdWJzY2liZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KClcblxuICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXItc3Vic2NyaWJlLWVtYWlsJylcblxuICBzdWJzY3JpYmUoJ1hBR0F2QScsIGVtYWlsLnZhbHVlKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGVtYWlsLnZhbHVlID0gJydcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW1haWwtbWVzc2FnZScpLmlubmVySFRNTCA9XG4gICAgICAnVGhhbmsgeW91IGZvciBzaWduaW5nIHVwISdcbiAgfSlcbn0pXG4iLCJpbXBvcnQgeyBjb252ZXJ0Q29sb3JWYXJpYWJsZXMgfSBmcm9tICdAbWVydGFzYW4vdGFpbHdpbmRjc3MtdmFyaWFibGVzL3NyYy9oZWxwZXJzJ1xuaW1wb3J0ICogYXMgY2FydCBmcm9tICdAc2hvcGlmeS90aGVtZS1jYXJ0J1xuXG5jYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgY29uc29sZS5sb2coc3RhdGUpXG4gIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG59KVxuXG5mdW5jdGlvbiBjYXJ0VG9BbHBpbmUoc3RhdGUpIHtcbiAgbGV0IHByb2R1Y3RzID0gW11cbiAgaWYgKHN0YXRlLml0ZW1zKSB7XG4gICAgc3RhdGUuaXRlbXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgbGV0IGYgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuXG4gICAgICAvLyBpZiAoZS5mZWF0dXJlZF9pbWFnZS51cmwpIHtcbiAgICAgIC8vICAgbGV0IGZpbGVuYW1lID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcbiAgICAgIC8vICAgICAucmVwbGFjZSgvXFw/LiokLywgJycpXG4gICAgICAvLyAgICAgLnJlcGxhY2UoLy4qXFwvLywgJycpXG4gICAgICAvLyAgIGxldCBuZXdGaWxlbmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnXzMwMHguanBnJylcbiAgICAgIC8vICAgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsLnJlcGxhY2UoZmlsZW5hbWUsIG5ld0ZpbGVuYW1lKVxuICAgICAgLy8gfVxuXG4gICAgICBjb25zdCByZWFsUHJpY2UgPSBlLnByaWNlIC8gMTAwXG5cbiAgICAgIGNvbnN0IGFkZE9uUHJvZHVjdHMgPSBzdGF0ZS5pdGVtc1xuICAgICAgICAubWFwKChwKSA9PiB7XG4gICAgICAgICAgaWYgKHAucHJvcGVydGllcz8uX2NhcnRQYXJlbnQgPT09IGUua2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0aXRsZTogcC5wcm9kdWN0X3RpdGxlLFxuICAgICAgICAgICAgICBrZXk6IHAua2V5LFxuICAgICAgICAgICAgICBwcmljZTogcC5wcmljZSAvIDEwMCxcbiAgICAgICAgICAgICAgaWQ6IHAudmFyaWFudF9pZCxcbiAgICAgICAgICAgICAgb3B0aW9uczogcC5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICAgICAgICBpbWFnZTogcC5mZWF0dXJlZF9pbWFnZS51cmwsXG4gICAgICAgICAgICAgIHF0eTogcC5xdWFudGl0eSxcbiAgICAgICAgICAgICAgcHJvcGVydGllczogcC5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICByZW1vdmUoKSB7XG4gICAgICAgICAgICAgICAgY2FydFJlbW92ZUl0ZW0odGhpcy5rZXkpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHVwZGF0ZShxdHkpIHtcbiAgICAgICAgICAgICAgICBjYXJ0VXBkYXRlSXRlbSh0aGlzLmtleSwgcGFyc2VJbnQocXR5KSlcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoKGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gZVxuICAgICAgICB9KVxuXG4gICAgICAvLyBjb25zb2xlLmxvZyhhZGRPblByb2R1Y3RzKVxuXG4gICAgICBpZiAoIWUucHJvcGVydGllcz8uX2NhcnRQYXJlbnQpIHtcbiAgICAgICAgcHJvZHVjdHMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6IGUucHJvZHVjdF90aXRsZSxcbiAgICAgICAgICBrZXk6IGUua2V5LFxuICAgICAgICAgIHByaWNlOiByZWFsUHJpY2UsXG4gICAgICAgICAgaWQ6IGUudmFyaWFudF9pZCxcbiAgICAgICAgICBvcHRpb25zOiBlLm9wdGlvbnNfd2l0aF92YWx1ZXMsXG4gICAgICAgICAgaW1hZ2U6IGYsXG4gICAgICAgICAgYWRkT25Qcm9kdWN0czogYWRkT25Qcm9kdWN0cyxcbiAgICAgICAgICBxdHk6IGUucXVhbnRpdHksXG4gICAgICAgICAgcHJvcGVydGllczogZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKHRoaXMua2V5KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlKHF0eSkge1xuICAgICAgICAgICAgY2FydFVwZGF0ZUl0ZW0odGhpcy5rZXksIHBhcnNlSW50KHF0eSkpXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3RhbDogc3RhdGUuaXRlbXNfc3VidG90YWxfcHJpY2UgLyAxMDAsXG4gICAgcHJvZHVjdHM6IHByb2R1Y3RzLFxuICAgIG5vdGU6IHN0YXRlLm5vdGUsXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FydFJlbW92ZUl0ZW0oa2V5KSB7XG4gIGxldCByZW1vdmVQcm9kdWN0cyA9IHt9XG5cbiAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgY29uc29sZS5sb2coc3RhdGUpXG5cbiAgICBjb25zdCBhZGRPblJlbW92ZSA9IHN0YXRlLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgaXRlbS5wcm9wZXJ0aWVzPy5fY2FydFBhcmVudCAhPSBudWxsICYmXG4gICAgICAgIGtleSA9PT0gaXRlbS5wcm9wZXJ0aWVzPy5fY2FydFBhcmVudFxuICAgICAgKSB7XG4gICAgICAgIHJlbW92ZVByb2R1Y3RzW2l0ZW0ua2V5XSA9IDBcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcGFyZW50SXRlbSA9IHN0YXRlLml0ZW1zLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBrZXkgPT09IGl0ZW0ua2V5XG4gICAgfSlcblxuICAgIHJlbW92ZVByb2R1Y3RzW3BhcmVudEl0ZW0ua2V5XSA9IDBcblxuICAgIC8vIGNvbnNvbGUubG9nKHJlbW92ZVByb2R1Y3RzKVxuXG4gICAgZmV0Y2god2luZG93LlNob3BpZnkucm91dGVzLnJvb3QgKyAnY2FydC91cGRhdGUuanMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHVwZGF0ZXM6IHJlbW92ZVByb2R1Y3RzLFxuICAgICAgfSksXG4gICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIH0pXG4gIH0pXG5cbiAgLy8gY2FydC5yZW1vdmVJdGVtKGtleSkudGhlbigoc3RhdGUpID0+IHtcbiAgLy8gICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAvLyB9KVxufVxuXG5mdW5jdGlvbiBjYXJ0VXBkYXRlSXRlbShrZXksIHF0eSkge1xuICBjYXJ0LnVwZGF0ZUl0ZW0oa2V5LCB7IHF1YW50aXR5OiBxdHkgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FydFVwZGF0ZUFsbChzdGF0ZSkge1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZXByb2R1Y3RzJywge1xuICAgICAgZGV0YWlsOiB7IGNhcnQ6IGNhcnRUb0FscGluZShzdGF0ZSkgfSxcbiAgICB9KVxuICApXG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydGNvdW50Jywge1xuICAgICAgZGV0YWlsOiB7IGNhcnRUb3RhbDogc3RhdGUuaXRlbV9jb3VudCB9LFxuICAgIH0pXG4gIClcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NhcnRVcGRhdGUnLCAoZSkgPT4ge1xuICBjYXJ0LnVwZGF0ZU5vdGUoZS50YXJnZXQudmFsdWUpXG59KVxuIiwic2V0SGVhZGVySGVpZ2h0KClcblxuZnVuY3Rpb24gc2V0SGVhZGVySGVpZ2h0KCkge1xuICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykub2Zmc2V0SGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0taGVhZGVyLWhlaWdodCcsIGAke2hlYWRlckhlaWdodH1weGApXG4gIGNvbnN0IGZvb3RlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1mb290ZXItaGVpZ2h0JywgYCR7Zm9vdGVySGVpZ2h0fXB4YClcbiAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0td2luZG93LWhlaWdodCcsIGAke3dpbmRvd0hlaWdodH1weGApXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRIZWFkZXJIZWlnaHQpXG4iLCJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG5pbXBvcnQgKiBhcyBjdXJyZW5jeSBmcm9tICdAc2hvcGlmeS90aGVtZS1jdXJyZW5jeSdcbmltcG9ydCB7IGNhcnRVcGRhdGVBbGwgfSBmcm9tICcuLi91dGlscy9jYXJ0J1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCdcblxuZXhwb3J0IGRlZmF1bHQgKHByb2R1Y3QpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwcm9kdWN0XCIsIHByb2R1Y3QpO1xuICBjb25zdCBjdXJyZW50VmFyaWFudCA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1swXVxuICBjb25zdCB2YXJpYW50cyA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1xuICBjb25zdCBsaW5lclN5bmMgPSBwcm9kdWN0LmxpbmVyU3luY1xuXG4gIGNvbnN0IHByaWNlID0gKHZhcmlhbnRJZCwgc2VsZWN0ZWRBZGRPblByb2R1Y3RzLCBoYXNMaW5lcikgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkQWRkT25Qcm9kdWN0cyk7XG4gICAgY29uc3QgdmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IHZhcmlhbnRJZClbMF1cbiAgICBsZXQgYWRkT25QcmljZSA9IDBcbiAgICBpZiAoc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlbGVjdGVkQWRkT25Qcm9kdWN0cy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGFkZE9uUHJpY2UgPSBhZGRPblByaWNlICsgZS5wcmljZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoaGFzTGluZXIpIHtcbiAgICAgIGFkZE9uUHJpY2UgPSBhZGRPblByaWNlICsgaGFzTGluZXJcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWN0dWFsUHJpY2U6ICckJyArICh2YXJpYW50LnByaWNlICsgYWRkT25QcmljZSkgLyAxMDAsXG4gICAgICBvcmlnaW5hbFByaWNlOiB2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2VcbiAgICAgICAgPyAnJCcgKyAodmFyaWFudC5jb21wYXJlX2F0X3ByaWNlICsgYWRkT25QcmljZSkgLyAxMDBcbiAgICAgICAgOiAnJyxcbiAgICAgIG1lc3NhZ2U6ICcnLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGN1cnJlbnRPcHRpb25zID0gKHZhcmlhbnRJZCkgPT4ge1xuICAgIGNvbnN0IHZhcmlhbnQgPSB2YXJpYW50cy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkID09PSB2YXJpYW50SWQpWzBdXG4gICAgY29uc3QgY3VycmVudE9wdGlvbnMgPSBwcm9kdWN0LnByb2R1Y3Qub3B0aW9ucy5tYXAoKGUsIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGUsXG4gICAgICAgIHZhbHVlOiB2YXJpYW50Lm9wdGlvbnNbaV0sXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gY3VycmVudE9wdGlvbnNcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZUFkZE9uID0gKGlkLCBzZWxlY3RlZEFkZE9ucywgcHJpY2UpID0+IHtcbiAgICBsZXQgdXBkYXRlZEFkZE9ucyA9IHNlbGVjdGVkQWRkT25zXG4gICAgY29uc3QgY2hlY2tTdGF0dXMgPSBzZWxlY3RlZEFkZE9ucy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkID09PSBpZClcbiAgICBpZiAoY2hlY2tTdGF0dXMubGVuZ3RoID4gMCkge1xuICAgICAgdXBkYXRlZEFkZE9ucyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgIT0gaWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZWRBZGRPbnMucHVzaCh7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgcXR5OiAxLFxuICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlZEFkZE9uc1xuICB9XG5cbiAgY29uc3QgbGluZXJJZCA9ICh2YXJpYW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coXCJsaW5lclwiLCBsaW5lclN5bmMpXG4gICAgLy8gY29uc29sZS5sb2coXCJ2YXJpYW50XCIsIHZhcmlhbnQpXG4gICAgY29uc3QgbGluZXJGaWx0ZXIgPSBwcm9kdWN0LmxpbmVyU3luYy5maW5kKChvYmopID0+IHtcbiAgICAgIHJldHVybiBvYmoudmFyaWFudElkID09PSB2YXJpYW50XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmxvZyhcImxpbmVyXCIsIGxpbmVyRmlsdGVyKVxuICAgIHJldHVybiBsaW5lckZpbHRlciA/IGxpbmVyRmlsdGVyIDogbnVsbFxuICAgIC8vIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4ge1xuICAgIC8vZGVmYXVsdHNcbiAgICBwcmljZTogcHJpY2UoY3VycmVudFZhcmlhbnQuaWQsIFtdLCBmYWxzZSksXG4gICAgc3VibWl0VGV4dDogJ0FkZCB0byBDYXJ0JyxcbiAgICBkaXNhYmxlZDogY3VycmVudFZhcmlhbnQuYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlLFxuICAgIGJ1dHRvbjogY3VycmVudFZhcmlhbnQuYXZhaWxhYmxlID8gJ0FkZCB0byBDYXJ0JyA6ICdVbmF2YWlsYWJsZScsXG4gICAgYWRkT25Qcm9kdWN0czogcHJvZHVjdC5hZGRPblByb2R1Y3RzLFxuICAgIHNlbGVjdGVkQWRkT25Qcm9kdWN0czogW10sXG5cbiAgICBvcHRpb25zOiBjdXJyZW50T3B0aW9ucyhjdXJyZW50VmFyaWFudC5pZCksXG4gICAgLy8gIGF2YWlsYWJsZU9wdGlvbnM6IGF2YWlsYWJsZU9wdGlvbnModGhpcy5vcHRpb25zKSxcblxuICAgIC8vU3RvcmUgZm9yIHNlbmRpbmcgdG8gYWRkIGNhcnRcbiAgICBmb3JtRGF0YToge1xuICAgICAgaWQ6IGN1cnJlbnRWYXJpYW50LmlkLFxuICAgICAgcXR5OiAxLFxuICAgIH0sXG5cbiAgICBsaW5lcjoge1xuICAgICAgbGluZXJJbmZvOiBsaW5lcklkKGN1cnJlbnRWYXJpYW50LmlkKSxcbiAgICAgIGFkZExpbmVyOiBmYWxzZSxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICAvL2Zvcm0gYWN0aW9uc1xuICAgIGNoZWNrQWRkT25zKGlkKSB7XG4gICAgICBjb25zdCBjaGVja1N0YXR1cyA9IHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZpbHRlcihcbiAgICAgICAgKG9iaikgPT4gb2JqLmlkID09PSBpZFxuICAgICAgKVxuICAgICAgaWYgKGNoZWNrU3RhdHVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0QWRkb24oaWQsIHNlbGVjdGVkQWRkT25zLCBjb3N0KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IGhhbmRsZUFkZE9uKGlkLCBzZWxlY3RlZEFkZE9ucywgY29zdClcbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZShcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMsXG4gICAgICAgIHRoaXMubGluZXIuYWRkTGluZXIgPyB0aGlzLmxpbmVyLmxpbmVySW5mby5saW5lclByaWNlIDogZmFsc2VcbiAgICAgIClcbiAgICAgIC8vIGNvbnNvbGUubG9nKGhhbmRsZUFkZE9uKGlkLCBzZWxlY3RlZEFkZE9ucykpXG4gICAgfSxcbiAgICBpbmNyZWFzZSgpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID0gdGhpcy5mb3JtRGF0YS5xdHkgKyAxXG4gICAgfSxcbiAgICBkZWNyZWFzZSgpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID1cbiAgICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgLSAxID09PSAwID8gMSA6IHRoaXMuZm9ybURhdGEucXR5IC0gMVxuICAgIH0sXG4gICAgdXBkYXRlTW9ub2dyYW0odmFsKSB7XG4gICAgICBjb25zb2xlLmxvZyh2YWwpXG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHtcbiAgICAgICAgICBNb25vZ3JhbTogdmFsLFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB7fVxuICAgICAgfVxuICAgIH0sXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICB0aGlzLmJ1dHRvbiA9ICdBZGRpbmcuLi4nXG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgZmV0Y2god2luZG93LlNob3BpZnkucm91dGVzLnJvb3QgKyAnY2FydC9hZGQuanMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiB0aGlzLmZvcm1EYXRhLmlkLFxuICAgICAgICAgICAgICBxdWFudGl0eTogdGhpcy5mb3JtRGF0YS5xdHksXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSksXG4gICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBjb25zdCBsYXN0Q2FydEl0ZW0gPSByZXN1bHQuaXRlbXMucG9wKClcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdsYXN0IGNhcnQgaXRlbScsIGxhc3RDYXJ0SXRlbSlcbiAgICAgICAgICBjb25zb2xlLmxvZygnbGluZScsIHRoaXMubGluZXIpXG5cbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoIDwgMSAmJiAhdGhpcy5saW5lci5hZGRMaW5lcikge1xuICAgICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBbXVxuICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRzdGF0dXMnLCB7XG4gICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgY2FydE9wZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhZGRPbkNhcnRQcm9kdWN0cyA9IFtdXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmVyLmFkZExpbmVyKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaW5lcicpXG4gICAgICAgICAgICAgIGFkZE9uQ2FydFByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmxpbmVyLmxpbmVySW5mby5saW5lcklkLFxuICAgICAgICAgICAgICAgIHF0eTogdGhpcy5mb3JtRGF0YS5xdHksXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgX2NhcnRQYXJlbnQ6IGxhc3RDYXJ0SXRlbS5rZXksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICBhZGRPbkNhcnRQcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIGlkOiBlLmlkLFxuICAgICAgICAgICAgICAgICAgcXR5OiAxLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICBfY2FydFBhcmVudDogbGFzdENhcnRJdGVtLmtleSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgZmV0Y2god2luZG93LlNob3BpZnkucm91dGVzLnJvb3QgKyAnY2FydC9hZGQuanMnLCB7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBhZGRPbkNhcnRQcm9kdWN0cyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSAnQWRkIHRvIENhcnQnXG4gICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gW11cbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRzdGF0dXMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IGNhcnRPcGVuOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSlcbiAgICAgICAgICAgICAgICBhbGVydChgVGhpcyBwcm9kdWN0IGlzIHVuYXZhaWxhYmxlIGF0IHRoZSBtb21lbnRgKVxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ1VuYXZhaWxhYmxlJ1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApXG4gICAgICAgICAgdGhpcy5idXR0b24gPSAnVW5hdmFpbGFibGUnXG4gICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGFkZExpbmVyKCkge1xuICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA9ICF0aGlzLmxpbmVyLmFkZExpbmVyXG4gICAgICB0aGlzLnByaWNlID0gcHJpY2UoXG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQsXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLFxuICAgICAgICB0aGlzLmxpbmVyLmFkZExpbmVyID8gdGhpcy5saW5lci5saW5lckluZm8ubGluZXJQcmljZSA6IGZhbHNlXG4gICAgICApXG4gICAgfSxcbiAgICB1cGRhdGVWYXJpYW50KHZhbHVlLCBvcHRpb24pIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBvcHRpb25zLm1hcCgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS5uYW1lID09IG9wdGlvbiA/IHZhbHVlIDogZS52YWx1ZVxuICAgICAgfSlcblxuICAgICAgY29uc3QgbmV3VmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigodmFyaWFudCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNFcXVhbCh2YXJpYW50Lm9wdGlvbnMsIG5ld09wdGlvbnMpXG4gICAgICB9KVswXVxuXG4gICAgICAvLyBjb25zb2xlLmxvZyhuZXdWYXJpYW50KTtcblxuICAgICAgOyh0aGlzLmxpbmVyLmxpbmVySW5mbyA9IGxpbmVySWQobmV3VmFyaWFudC5pZCkpLFxuICAgICAgICAodGhpcy5wcmljZSA9IHByaWNlKFxuICAgICAgICAgIG5ld1ZhcmlhbnQuaWQsXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMsXG4gICAgICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA/IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVyUHJpY2UgOiBmYWxzZVxuICAgICAgICApKVxuICAgICAgdGhpcy5mb3JtRGF0YS5pZCA9IG5ld1ZhcmlhbnQuaWRcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBuZXdWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZVxuICAgICAgdGhpcy5idXR0b24gPSBuZXdWYXJpYW50LmF2YWlsYWJsZSA/ICdBZGQgdG8gQ2FydCcgOiAnVW5hdmFpbGFibGUnXG4gICAgICB0aGlzLm9wdGlvbnMgPSBjdXJyZW50T3B0aW9ucyhuZXdWYXJpYW50LmlkKVxuICAgIH0sXG4gIH1cbn1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJiYXNlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlcGljc3VwcmVtZV9zaG9waWZ5XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2Jhc2UuanNcIik7IH0pXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3N0eWxlcy9iYXNlLnNjc3NcIik7IH0pXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbIkFscGluZSIsImNvbGxhcHNlIiwic3Vic2NyaWJlIiwicHJvZHVjdCIsInBsdWdpbiIsImRhdGEiLCJ3aW5kb3ciLCJzdGFydCIsImxvb3hDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJmb290ZXJTdWJzY2liZSIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVtYWlsIiwidmFsdWUiLCJ0aGVuIiwicmVzcG9uc2UiLCJpbm5lckhUTUwiLCJjb252ZXJ0Q29sb3JWYXJpYWJsZXMiLCJjYXJ0IiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJjYXJ0VXBkYXRlQWxsIiwiY2FydFRvQWxwaW5lIiwicHJvZHVjdHMiLCJpdGVtcyIsImZvckVhY2giLCJmIiwiZmVhdHVyZWRfaW1hZ2UiLCJ1cmwiLCJyZWFsUHJpY2UiLCJwcmljZSIsImFkZE9uUHJvZHVjdHMiLCJtYXAiLCJwIiwicHJvcGVydGllcyIsIl9jYXJ0UGFyZW50Iiwia2V5IiwidGl0bGUiLCJwcm9kdWN0X3RpdGxlIiwiaWQiLCJ2YXJpYW50X2lkIiwib3B0aW9ucyIsIm9wdGlvbnNfd2l0aF92YWx1ZXMiLCJpbWFnZSIsInF0eSIsInF1YW50aXR5IiwicmVtb3ZlIiwiY2FydFJlbW92ZUl0ZW0iLCJ1cGRhdGUiLCJjYXJ0VXBkYXRlSXRlbSIsInBhcnNlSW50IiwiZmlsdGVyIiwicHVzaCIsInRvdGFsIiwiaXRlbXNfc3VidG90YWxfcHJpY2UiLCJub3RlIiwicmVtb3ZlUHJvZHVjdHMiLCJhZGRPblJlbW92ZSIsIml0ZW0iLCJwYXJlbnRJdGVtIiwiZmluZCIsImZldGNoIiwiU2hvcGlmeSIsInJvdXRlcyIsInJvb3QiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1cGRhdGVzIiwiY2F0Y2giLCJ1cGRhdGVJdGVtIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiY2FydFRvdGFsIiwiaXRlbV9jb3VudCIsInVwZGF0ZU5vdGUiLCJ0YXJnZXQiLCJzZXRIZWFkZXJIZWlnaHQiLCJoZWFkZXJIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiZm9vdGVySGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjdXJyZW5jeSIsImlzRXF1YWwiLCJjdXJyZW50VmFyaWFudCIsInZhcmlhbnRzIiwibGluZXJTeW5jIiwidmFyaWFudElkIiwic2VsZWN0ZWRBZGRPblByb2R1Y3RzIiwiaGFzTGluZXIiLCJ2YXJpYW50Iiwib2JqIiwiYWRkT25QcmljZSIsImxlbmd0aCIsImFjdHVhbFByaWNlIiwib3JpZ2luYWxQcmljZSIsImNvbXBhcmVfYXRfcHJpY2UiLCJtZXNzYWdlIiwiY3VycmVudE9wdGlvbnMiLCJpIiwibmFtZSIsImhhbmRsZUFkZE9uIiwic2VsZWN0ZWRBZGRPbnMiLCJ1cGRhdGVkQWRkT25zIiwiY2hlY2tTdGF0dXMiLCJsaW5lcklkIiwibGluZXJGaWx0ZXIiLCJzdWJtaXRUZXh0IiwiZGlzYWJsZWQiLCJhdmFpbGFibGUiLCJidXR0b24iLCJmb3JtRGF0YSIsImxpbmVyIiwibGluZXJJbmZvIiwiYWRkTGluZXIiLCJjaGVja0FkZE9ucyIsInNlbGVjdEFkZG9uIiwiY29zdCIsImxpbmVyUHJpY2UiLCJpbmNyZWFzZSIsImRlY3JlYXNlIiwidXBkYXRlTW9ub2dyYW0iLCJ2YWwiLCJNb25vZ3JhbSIsIm9uU3VibWl0IiwianNvbiIsInJlc3VsdCIsImxhc3RDYXJ0SXRlbSIsInBvcCIsImNhcnRPcGVuIiwiYWRkT25DYXJ0UHJvZHVjdHMiLCJhbGVydCIsInVwZGF0ZVZhcmlhbnQiLCJvcHRpb24iLCJuZXdPcHRpb25zIiwibmV3VmFyaWFudCJdLCJzb3VyY2VSb290IjoiIn0=