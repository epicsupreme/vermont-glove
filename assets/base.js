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
var looxContainer = document.querySelector("#looxReviews");
looxContainer === null || looxContainer === void 0 ? void 0 : looxContainer.classList.add("scroll-mt-40");
var footerSubscibe = document.getElementById("footer-subscribe");
footerSubscibe.addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.getElementById("footer-subscribe-email");
  (0,klaviyo_subscribe__WEBPACK_IMPORTED_MODULE_2__.subscribe)("XAGAvA", email.value).then(function (response) {
    email.value = "";
    document.querySelector(".email-message").innerHTML = "Thank you for signing up!";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EsMkRBQTJELHNEQUFzRDtVQUNqSCxxRkFBcUYsdURBQXVEO1VBQzVJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL2NhcnQuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL2hlYWRlci1oZWlnaHQuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zdHlsZXMvYmFzZS5zY3NzPzA5MjciLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFscGluZSBmcm9tICdhbHBpbmVqcydcbmltcG9ydCBjb2xsYXBzZSBmcm9tICdAYWxwaW5lanMvY29sbGFwc2UnXG5pbXBvcnQgeyBzdWJzY3JpYmUgfSBmcm9tIFwia2xhdml5by1zdWJzY3JpYmVcIjtcblxuaW1wb3J0IHByb2R1Y3QgZnJvbSAnLi91dGlscy9wcm9kdWN0J1xuXG5pbXBvcnQgJy4vdXRpbHMvaGVhZGVyLWhlaWdodCdcbmltcG9ydCAnLi91dGlscy9jYXJ0J1xuLy8gaW1wb3J0ICcuL2FuaW1hdGlvbnMvaGVhZGVyJ1xuXG5BbHBpbmUucGx1Z2luKGNvbGxhcHNlKVxuXG5BbHBpbmUuZGF0YSgncHJvZHVjdCcsIHByb2R1Y3QpXG5cbndpbmRvdy5BbHBpbmUgPSBBbHBpbmVcblxuQWxwaW5lLnN0YXJ0KClcblxuY29uc3QgbG9veENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9veFJldmlld3NcIik7XG5sb294Q29udGFpbmVyPy5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsLW10LTQwXCIpXG5cbmNvbnN0IGZvb3RlclN1YnNjaWJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb290ZXItc3Vic2NyaWJlXCIpO1xuXG5mb290ZXJTdWJzY2liZS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb290ZXItc3Vic2NyaWJlLWVtYWlsXCIpO1xuXG5cbiAgIHN1YnNjcmliZShcIlhBR0F2QVwiLCBlbWFpbC52YWx1ZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBlbWFpbC52YWx1ZSA9IFwiXCJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW1haWwtbWVzc2FnZVwiKS5pbm5lckhUTUwgPSBcIlRoYW5rIHlvdSBmb3Igc2lnbmluZyB1cCFcIlxuICAgfSk7XG59KSIsImltcG9ydCB7IGNvbnZlcnRDb2xvclZhcmlhYmxlcyB9IGZyb20gXCJAbWVydGFzYW4vdGFpbHdpbmRjc3MtdmFyaWFibGVzL3NyYy9oZWxwZXJzXCI7XG5pbXBvcnQgKiBhcyBjYXJ0IGZyb20gXCJAc2hvcGlmeS90aGVtZS1jYXJ0XCI7XG5cbmNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhzdGF0ZSlcbiAgY2FydFVwZGF0ZUFsbChzdGF0ZSk7XG59KTtcblxuZnVuY3Rpb24gY2FydFRvQWxwaW5lKHN0YXRlKSB7XG4gIGxldCBwcm9kdWN0cyA9IFtdO1xuICBpZiAoc3RhdGUuaXRlbXMpIHtcbiAgICBzdGF0ZS5pdGVtcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBsZXQgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsO1xuXG4gICAgICAvLyBpZiAoZS5mZWF0dXJlZF9pbWFnZS51cmwpIHtcbiAgICAgIC8vICAgbGV0IGZpbGVuYW1lID0gZS5mZWF0dXJlZF9pbWFnZS51cmxcbiAgICAgIC8vICAgICAucmVwbGFjZSgvXFw/LiokLywgJycpXG4gICAgICAvLyAgICAgLnJlcGxhY2UoLy4qXFwvLywgJycpXG4gICAgICAvLyAgIGxldCBuZXdGaWxlbmFtZSA9IGZpbGVuYW1lLnJlcGxhY2UoL1xcLlteLy5dKyQvLCAnXzMwMHguanBnJylcbiAgICAgIC8vICAgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsLnJlcGxhY2UoZmlsZW5hbWUsIG5ld0ZpbGVuYW1lKVxuICAgICAgLy8gfVxuXG4gICAgICBjb25zdCByZWFsUHJpY2UgPSBlLnByaWNlIC8gMTAwO1xuXG4gICAgICBjb25zdCBhZGRPblByb2R1Y3RzID0gc3RhdGUuaXRlbXMubWFwKChwKSA9PiB7XG4gICAgICAgIGlmIChwLnByb3BlcnRpZXM/LmNhcnRQYXJlbnQgPT09IGUua2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiBwLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAgICBrZXk6IHAua2V5LFxuICAgICAgICAgICAgcHJpY2U6IHAucHJpY2UgLyAxMDAsXG4gICAgICAgICAgICBpZDogcC52YXJpYW50X2lkLFxuICAgICAgICAgICAgb3B0aW9uczogcC5vcHRpb25zX3dpdGhfdmFsdWVzLFxuICAgICAgICAgICAgaW1hZ2U6IHAuZmVhdHVyZWRfaW1hZ2UudXJsLFxuICAgICAgICAgICAgcXR5OiBwLnF1YW50aXR5LFxuICAgICAgICAgICAgcHJvcGVydGllczogcC5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgcmVtb3ZlKCkge1xuICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlKHF0eSkge1xuICAgICAgICAgICAgICBjYXJ0VXBkYXRlSXRlbSh0aGlzLmtleSwgcGFyc2VJbnQocXR5KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSkuZmlsdGVyKGUgPT4ge1xuICAgICAgICByZXR1cm4gZVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGFkZE9uUHJvZHVjdHMpXG5cblxuICAgICAgaWYgKCFlLnByb3BlcnRpZXM/LmNhcnRQYXJlbnQpIHtcbiAgICAgICAgcHJvZHVjdHMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6IGUucHJvZHVjdF90aXRsZSxcbiAgICAgICAgICBrZXk6IGUua2V5LFxuICAgICAgICAgIHByaWNlOiByZWFsUHJpY2UsXG4gICAgICAgICAgaWQ6IGUudmFyaWFudF9pZCxcbiAgICAgICAgICBvcHRpb25zOiBlLm9wdGlvbnNfd2l0aF92YWx1ZXMsXG4gICAgICAgICAgaW1hZ2U6IGYsXG4gICAgICAgICAgYWRkT25Qcm9kdWN0czogYWRkT25Qcm9kdWN0cyxcbiAgICAgICAgICBxdHk6IGUucXVhbnRpdHksXG4gICAgICAgICAgcHJvcGVydGllczogZS5wcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKHRoaXMua2V5KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZShxdHkpIHtcbiAgICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG90YWw6IHN0YXRlLml0ZW1zX3N1YnRvdGFsX3ByaWNlIC8gMTAwLFxuICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcbiAgICBub3RlOiBzdGF0ZS5ub3RlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjYXJ0UmVtb3ZlSXRlbShrZXkpIHtcbiAgbGV0IHJlbW92ZVByb2R1Y3RzID0ge307XG5cbiAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgY29uc29sZS5sb2coc3RhdGUpO1xuICAgIGNvbnN0IGFkZE9uUmVtb3ZlID0gc3RhdGUuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gaXRlbS5wcm9wZXJ0aWVzLmNhcnRQYXJlbnQpIHtcbiAgICAgICAgcmVtb3ZlUHJvZHVjdHNbaXRlbS5rZXldID0gMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhcmVudEl0ZW0gPSBzdGF0ZS5pdGVtcy5maW5kKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4ga2V5ID09PSBpdGVtLmtleTtcbiAgICB9KTtcblxuICAgIHJlbW92ZVByb2R1Y3RzW3BhcmVudEl0ZW0ua2V5XSA9IDA7XG5cbiAgICBjb25zb2xlLmxvZyhyZW1vdmVQcm9kdWN0cyk7XG5cbiAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArIFwiY2FydC91cGRhdGUuanNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB1cGRhdGVzOiByZW1vdmVQcm9kdWN0cyxcbiAgICAgIH0pLFxuICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgLy8gY2FydC5yZW1vdmVJdGVtKGtleSkudGhlbigoc3RhdGUpID0+IHtcbiAgLy8gICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAvLyB9KVxufVxuXG5mdW5jdGlvbiBjYXJ0VXBkYXRlSXRlbShrZXksIHF0eSkge1xuICBjYXJ0LnVwZGF0ZUl0ZW0oa2V5LCB7IHF1YW50aXR5OiBxdHkgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJ0VXBkYXRlQWxsKHN0YXRlKSB7XG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudChcInVwZGF0ZXByb2R1Y3RzXCIsIHtcbiAgICAgIGRldGFpbDogeyBjYXJ0OiBjYXJ0VG9BbHBpbmUoc3RhdGUpIH0sXG4gICAgfSlcbiAgKTtcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgbmV3IEN1c3RvbUV2ZW50KFwidXBkYXRlY2FydGNvdW50XCIsIHtcbiAgICAgIGRldGFpbDogeyBjYXJ0VG90YWw6IHN0YXRlLml0ZW1fY291bnQgfSxcbiAgICB9KVxuICApO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNhcnRVcGRhdGVcIiwgKGUpID0+IHtcbiAgY2FydC51cGRhdGVOb3RlKGUudGFyZ2V0LnZhbHVlKTtcbn0pO1xuIiwic2V0SGVhZGVySGVpZ2h0KClcblxuZnVuY3Rpb24gc2V0SGVhZGVySGVpZ2h0KCkge1xuICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykub2Zmc2V0SGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0taGVhZGVyLWhlaWdodCcsIGAke2hlYWRlckhlaWdodH1weGApXG4gIGNvbnN0IGZvb3RlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1mb290ZXItaGVpZ2h0JywgYCR7Zm9vdGVySGVpZ2h0fXB4YClcbiAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0td2luZG93LWhlaWdodCcsIGAke3dpbmRvd0hlaWdodH1weGApXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRIZWFkZXJIZWlnaHQpXG4iLCJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG5pbXBvcnQgKiBhcyBjdXJyZW5jeSBmcm9tICdAc2hvcGlmeS90aGVtZS1jdXJyZW5jeSdcbmltcG9ydCB7IGNhcnRVcGRhdGVBbGwgfSBmcm9tICcuLi91dGlscy9jYXJ0J1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCdcblxuZXhwb3J0IGRlZmF1bHQgKHByb2R1Y3QpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwcm9kdWN0XCIsIHByb2R1Y3QpO1xuICBjb25zdCBjdXJyZW50VmFyaWFudCA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1swXVxuICBjb25zdCB2YXJpYW50cyA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1xuICBjb25zdCBsaW5lclN5bmMgPSBwcm9kdWN0LmxpbmVyU3luY1xuXG4gIGNvbnN0IHByaWNlID0gKHZhcmlhbnRJZCwgc2VsZWN0ZWRBZGRPblByb2R1Y3RzLCBoYXNMaW5lcikgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkQWRkT25Qcm9kdWN0cyk7XG4gICAgY29uc3QgdmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IHZhcmlhbnRJZClbMF1cbiAgICBsZXQgYWRkT25QcmljZSA9IDBcbiAgICBpZiAoc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlbGVjdGVkQWRkT25Qcm9kdWN0cy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGFkZE9uUHJpY2UgPSBhZGRPblByaWNlICsgZS5wcmljZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoaGFzTGluZXIpIHtcbiAgICAgIGFkZE9uUHJpY2UgPSBhZGRPblByaWNlICsgaGFzTGluZXJcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWN0dWFsUHJpY2U6ICckJyArICh2YXJpYW50LnByaWNlICsgYWRkT25QcmljZSkgLyAxMDAsXG4gICAgICBvcmlnaW5hbFByaWNlOiB2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2VcbiAgICAgICAgPyAnJCcgKyAodmFyaWFudC5jb21wYXJlX2F0X3ByaWNlICsgYWRkT25QcmljZSkgLyAxMDBcbiAgICAgICAgOiAnJyxcbiAgICAgIG1lc3NhZ2U6ICcnLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGN1cnJlbnRPcHRpb25zID0gKHZhcmlhbnRJZCkgPT4ge1xuICAgIGNvbnN0IHZhcmlhbnQgPSB2YXJpYW50cy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkID09PSB2YXJpYW50SWQpWzBdXG4gICAgY29uc3QgY3VycmVudE9wdGlvbnMgPSBwcm9kdWN0LnByb2R1Y3Qub3B0aW9ucy5tYXAoKGUsIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGUsXG4gICAgICAgIHZhbHVlOiB2YXJpYW50Lm9wdGlvbnNbaV0sXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gY3VycmVudE9wdGlvbnNcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZUFkZE9uID0gKGlkLCBzZWxlY3RlZEFkZE9ucywgcHJpY2UpID0+IHtcbiAgICBsZXQgdXBkYXRlZEFkZE9ucyA9IHNlbGVjdGVkQWRkT25zXG4gICAgY29uc3QgY2hlY2tTdGF0dXMgPSBzZWxlY3RlZEFkZE9ucy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkID09PSBpZClcbiAgICBpZiAoY2hlY2tTdGF0dXMubGVuZ3RoID4gMCkge1xuICAgICAgdXBkYXRlZEFkZE9ucyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgIT0gaWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZWRBZGRPbnMucHVzaCh7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgcXR5OiAxLFxuICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlZEFkZE9uc1xuICB9XG5cbiAgY29uc3QgbGluZXJJZCA9ICh2YXJpYW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coXCJsaW5lclwiLCBsaW5lclN5bmMpXG4gICAgLy8gY29uc29sZS5sb2coXCJ2YXJpYW50XCIsIHZhcmlhbnQpXG4gICAgY29uc3QgbGluZXJGaWx0ZXIgPSBwcm9kdWN0LmxpbmVyU3luYy5maW5kKChvYmopID0+IHtcbiAgICAgIHJldHVybiBvYmoudmFyaWFudElkID09PSB2YXJpYW50XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmxvZyhcImxpbmVyXCIsIGxpbmVyRmlsdGVyKVxuICAgIHJldHVybiBsaW5lckZpbHRlciA/IGxpbmVyRmlsdGVyIDogbnVsbFxuICAgIC8vIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4ge1xuICAgIC8vZGVmYXVsdHNcbiAgICBwcmljZTogcHJpY2UoY3VycmVudFZhcmlhbnQuaWQsIFtdLCBmYWxzZSksXG4gICAgc3VibWl0VGV4dDogJ0FkZCB0byBDYXJ0JyxcbiAgICBkaXNhYmxlZDogY3VycmVudFZhcmlhbnQuYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlLFxuICAgIGJ1dHRvbjogY3VycmVudFZhcmlhbnQuYXZhaWxhYmxlID8gJ0FkZCB0byBDYXJ0JyA6ICdVbmF2YWlsYWJsZScsXG4gICAgYWRkT25Qcm9kdWN0czogcHJvZHVjdC5hZGRPblByb2R1Y3RzLFxuICAgIHNlbGVjdGVkQWRkT25Qcm9kdWN0czogW10sXG5cbiAgICBvcHRpb25zOiBjdXJyZW50T3B0aW9ucyhjdXJyZW50VmFyaWFudC5pZCksXG4gICAgLy8gIGF2YWlsYWJsZU9wdGlvbnM6IGF2YWlsYWJsZU9wdGlvbnModGhpcy5vcHRpb25zKSxcblxuICAgIC8vU3RvcmUgZm9yIHNlbmRpbmcgdG8gYWRkIGNhcnRcbiAgICBmb3JtRGF0YToge1xuICAgICAgaWQ6IGN1cnJlbnRWYXJpYW50LmlkLFxuICAgICAgcXR5OiAxLFxuICAgIH0sXG5cbiAgICBsaW5lcjoge1xuICAgICAgbGluZXJJbmZvOiBsaW5lcklkKGN1cnJlbnRWYXJpYW50LmlkKSxcbiAgICAgIGFkZExpbmVyOiBmYWxzZSxcbiAgICB9LFxuXG4gICAgLy9mb3JtIGFjdGlvbnNcbiAgICBjaGVja0FkZE9ucyhpZCkge1xuICAgICAgY29uc3QgY2hlY2tTdGF0dXMgPSB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cy5maWx0ZXIoXG4gICAgICAgIChvYmopID0+IG9iai5pZCA9PT0gaWRcbiAgICAgIClcbiAgICAgIGlmIChjaGVja1N0YXR1cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlbGVjdEFkZG9uKGlkLCBzZWxlY3RlZEFkZE9ucywgY29zdCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBoYW5kbGVBZGRPbihpZCwgc2VsZWN0ZWRBZGRPbnMsIGNvc3QpXG4gICAgICB0aGlzLnByaWNlID0gcHJpY2UoXG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQsXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLFxuICAgICAgICB0aGlzLmxpbmVyLmFkZExpbmVyID8gdGhpcy5saW5lci5saW5lckluZm8ubGluZXJQcmljZSA6IGZhbHNlXG4gICAgICApXG4gICAgICAvLyBjb25zb2xlLmxvZyhoYW5kbGVBZGRPbihpZCwgc2VsZWN0ZWRBZGRPbnMpKVxuICAgIH0sXG4gICAgaW5jcmVhc2UoKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhLnF0eSA9IHRoaXMuZm9ybURhdGEucXR5ICsgMVxuICAgIH0sXG4gICAgZGVjcmVhc2UoKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhLnF0eSA9XG4gICAgICAgIHRoaXMuZm9ybURhdGEucXR5IC0gMSA9PT0gMCA/IDEgOiB0aGlzLmZvcm1EYXRhLnF0eSAtIDFcbiAgICB9LFxuICAgIG9uU3VibWl0KCkge1xuICAgICAgdGhpcy5idXR0b24gPSAnQWRkaW5nLi4uJ1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgIGZldGNoKHdpbmRvdy5TaG9waWZ5LnJvdXRlcy5yb290ICsgJ2NhcnQvYWRkLmpzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMuZm9ybURhdGEucXR5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICBjb25zdCBsYXN0Q2FydEl0ZW0gPSByZXN1bHQuaXRlbXMucG9wKClcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoIDwgMSAmJiB0aGlzLmxpbmVyLmFkZExpbmVyKSB7XG4gICAgICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSAnQWRkIHRvIENhcnQnXG4gICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IFtdXG4gICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydHN0YXR1cycsIHtcbiAgICAgICAgICAgICAgICAgIGRldGFpbDogeyBjYXJ0T3BlbjogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGFkZE9uQ2FydFByb2R1Y3RzID0gW11cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICBhZGRPbkNhcnRQcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogZS5pZCxcbiAgICAgICAgICAgICAgICBxdHk6IDEsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgY2FydFBhcmVudDogbGFzdENhcnRJdGVtLmtleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmVyLmFkZExpbmVyKSB7XG4gICAgICAgICAgICAgIGFkZE9uQ2FydFByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmxpbmVyLmxpbmVySW5mby5saW5lcklkLFxuICAgICAgICAgICAgICAgIHF0eTogdGhpcy5mb3JtRGF0YS5xdHksXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgY2FydFBhcmVudDogbGFzdENhcnRJdGVtLmtleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArICdjYXJ0L2FkZC5qcycsIHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGFkZE9uQ2FydFByb2R1Y3RzLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdBZGQgdG8gQ2FydCdcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBbXVxuICAgICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydHN0YXR1cycsIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgY2FydE9wZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSAnVW5hdmFpbGFibGUnXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgYWxlcnQoYFRoaXMgcHJvZHVjdCBpcyB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50YClcbiAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdVbmF2YWlsYWJsZSdcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgYWRkTGluZXIoKSB7XG4gICAgICB0aGlzLmxpbmVyLmFkZExpbmVyID0gIXRoaXMubGluZXIuYWRkTGluZXJcbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZShcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMsXG4gICAgICAgIHRoaXMubGluZXIuYWRkTGluZXIgPyB0aGlzLmxpbmVyLmxpbmVySW5mby5saW5lclByaWNlIDogZmFsc2VcbiAgICAgIClcbiAgICB9LFxuICAgIHVwZGF0ZVZhcmlhbnQodmFsdWUsIG9wdGlvbikge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgICAgY29uc3QgbmV3T3B0aW9ucyA9IG9wdGlvbnMubWFwKChlKSA9PiB7XG4gICAgICAgIHJldHVybiBlLm5hbWUgPT0gb3B0aW9uID8gdmFsdWUgOiBlLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBjb25zdCBuZXdWYXJpYW50ID0gdmFyaWFudHMuZmlsdGVyKCh2YXJpYW50KSA9PiB7XG4gICAgICAgIHJldHVybiBpc0VxdWFsKHZhcmlhbnQub3B0aW9ucywgbmV3T3B0aW9ucylcbiAgICAgIH0pWzBdXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1ZhcmlhbnQpO1xuXG4gICAgICA7KHRoaXMubGluZXIubGluZXJJbmZvID0gbGluZXJJZChuZXdWYXJpYW50LmlkKSksXG4gICAgICAgICh0aGlzLnByaWNlID0gcHJpY2UoXG4gICAgICAgICAgbmV3VmFyaWFudC5pZCxcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyxcbiAgICAgICAgICB0aGlzLmxpbmVyLmFkZExpbmVyID8gdGhpcy5saW5lci5saW5lckluZm8ubGluZXJQcmljZSA6IGZhbHNlXG4gICAgICAgICkpXG4gICAgICB0aGlzLmZvcm1EYXRhLmlkID0gbmV3VmFyaWFudC5pZFxuICAgICAgdGhpcy5kaXNhYmxlZCA9IG5ld1ZhcmlhbnQuYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlXG4gICAgICB0aGlzLmJ1dHRvbiA9IG5ld1ZhcmlhbnQuYXZhaWxhYmxlID8gJ0FkZCB0byBDYXJ0JyA6ICdVbmF2YWlsYWJsZSdcbiAgICAgIHRoaXMub3B0aW9ucyA9IGN1cnJlbnRPcHRpb25zKG5ld1ZhcmlhbnQuaWQpXG4gICAgfSxcbiAgfVxufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImJhc2VcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvYmFzZS5qc1wiKTsgfSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzc1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiQWxwaW5lIiwiY29sbGFwc2UiLCJzdWJzY3JpYmUiLCJwcm9kdWN0IiwicGx1Z2luIiwiZGF0YSIsIndpbmRvdyIsInN0YXJ0IiwibG9veENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImFkZCIsImZvb3RlclN1YnNjaWJlIiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZW1haWwiLCJ2YWx1ZSIsInRoZW4iLCJyZXNwb25zZSIsImlubmVySFRNTCIsImNvbnZlcnRDb2xvclZhcmlhYmxlcyIsImNhcnQiLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2FydFVwZGF0ZUFsbCIsImNhcnRUb0FscGluZSIsInByb2R1Y3RzIiwiaXRlbXMiLCJmb3JFYWNoIiwiZiIsImZlYXR1cmVkX2ltYWdlIiwidXJsIiwicmVhbFByaWNlIiwicHJpY2UiLCJhZGRPblByb2R1Y3RzIiwibWFwIiwicCIsInByb3BlcnRpZXMiLCJjYXJ0UGFyZW50Iiwia2V5IiwidGl0bGUiLCJwcm9kdWN0X3RpdGxlIiwiaWQiLCJ2YXJpYW50X2lkIiwib3B0aW9ucyIsIm9wdGlvbnNfd2l0aF92YWx1ZXMiLCJpbWFnZSIsInF0eSIsInF1YW50aXR5IiwicmVtb3ZlIiwiY2FydFJlbW92ZUl0ZW0iLCJ1cGRhdGUiLCJjYXJ0VXBkYXRlSXRlbSIsInBhcnNlSW50IiwiZmlsdGVyIiwicHVzaCIsInRvdGFsIiwiaXRlbXNfc3VidG90YWxfcHJpY2UiLCJub3RlIiwicmVtb3ZlUHJvZHVjdHMiLCJjb25zb2xlIiwibG9nIiwiYWRkT25SZW1vdmUiLCJpdGVtIiwicGFyZW50SXRlbSIsImZpbmQiLCJmZXRjaCIsIlNob3BpZnkiLCJyb3V0ZXMiLCJyb290IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidXBkYXRlcyIsImNhdGNoIiwidXBkYXRlSXRlbSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImNhcnRUb3RhbCIsIml0ZW1fY291bnQiLCJ1cGRhdGVOb3RlIiwidGFyZ2V0Iiwic2V0SGVhZGVySGVpZ2h0IiwiaGVhZGVySGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImZvb3RlckhlaWdodCIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0IiwiY3VycmVuY3kiLCJpc0VxdWFsIiwiY3VycmVudFZhcmlhbnQiLCJ2YXJpYW50cyIsImxpbmVyU3luYyIsInZhcmlhbnRJZCIsInNlbGVjdGVkQWRkT25Qcm9kdWN0cyIsImhhc0xpbmVyIiwidmFyaWFudCIsIm9iaiIsImFkZE9uUHJpY2UiLCJsZW5ndGgiLCJhY3R1YWxQcmljZSIsIm9yaWdpbmFsUHJpY2UiLCJjb21wYXJlX2F0X3ByaWNlIiwibWVzc2FnZSIsImN1cnJlbnRPcHRpb25zIiwiaSIsIm5hbWUiLCJoYW5kbGVBZGRPbiIsInNlbGVjdGVkQWRkT25zIiwidXBkYXRlZEFkZE9ucyIsImNoZWNrU3RhdHVzIiwibGluZXJJZCIsImxpbmVyRmlsdGVyIiwic3VibWl0VGV4dCIsImRpc2FibGVkIiwiYXZhaWxhYmxlIiwiYnV0dG9uIiwiZm9ybURhdGEiLCJsaW5lciIsImxpbmVySW5mbyIsImFkZExpbmVyIiwiY2hlY2tBZGRPbnMiLCJzZWxlY3RBZGRvbiIsImNvc3QiLCJsaW5lclByaWNlIiwiaW5jcmVhc2UiLCJkZWNyZWFzZSIsIm9uU3VibWl0IiwianNvbiIsInJlc3VsdCIsImxhc3RDYXJ0SXRlbSIsInBvcCIsImNhcnRPcGVuIiwiYWRkT25DYXJ0UHJvZHVjdHMiLCJhbGVydCIsInVwZGF0ZVZhcmlhbnQiLCJvcHRpb24iLCJuZXdPcHRpb25zIiwibmV3VmFyaWFudCJdLCJzb3VyY2VSb290IjoiIn0=