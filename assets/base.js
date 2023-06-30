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
/* harmony import */ var _utils_productRepair__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/productRepair */ "./src/scripts/utils/productRepair.js");
/* harmony import */ var _utils_header_height__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/header-height */ "./src/scripts/utils/header-height.js");
/* harmony import */ var _utils_header_height__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_utils_header_height__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_cart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/cart */ "./src/scripts/utils/cart.js");
/* harmony import */ var _utils_repairPopups__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/repairPopups */ "./src/scripts/utils/repairPopups.js");
/* harmony import */ var _utils_singleRepairPopup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/singleRepairPopup */ "./src/scripts/utils/singleRepairPopup.js");






 // import './animations/header'



alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].plugin(_alpinejs_collapse__WEBPACK_IMPORTED_MODULE_1__["default"]);
alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].data('product', _utils_product__WEBPACK_IMPORTED_MODULE_3__["default"]);
alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].data('productRepair', _utils_productRepair__WEBPACK_IMPORTED_MODULE_4__["default"]);
alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].data('repairPopups', _utils_repairPopups__WEBPACK_IMPORTED_MODULE_7__["default"]);
alpinejs__WEBPACK_IMPORTED_MODULE_0__["default"].data('singleRepairPopup', _utils_singleRepairPopup__WEBPACK_IMPORTED_MODULE_8__["default"]);
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
      })[0];

      if (newVariant !== undefined) {
        ;
        this.liner.linerInfo = linerId(newVariant.id), this.price = price(newVariant.id, this.selectedAddOnProducts, this.liner.addLiner ? this.liner.linerInfo.linerPrice : false);
        this.formData.id = newVariant.id;
        this.options = currentOptions(newVariant.id);
        this.disabled = newVariant.available ? false : true;
        this.button = newVariant.available ? 'Add to Cart' : 'Unavailable';
        var variantImage = document.querySelector("[data-variants*=\"".concat(newVariant.id, "\""));

        if (variantImage) {
          window.proudctSwiper.slideTo(parseInt(variantImage.getAttribute('data-swiper-slide-index')) + 1);
        }
      } else {
        this.disabled = true;
        this.button = 'Unavailable';
      }
    }
  };
});

/***/ }),

/***/ "./src/scripts/utils/productRepair.js":
/*!********************************************!*\
  !*** ./src/scripts/utils/productRepair.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-cart */ "./node_modules/@shopify/theme-cart/theme-cart.js");
/* harmony import */ var _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-currency */ "./node_modules/@shopify/theme-currency/currency.js");
/* harmony import */ var _utils_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/cart */ "./src/scripts/utils/cart.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @googlemaps/js-api-loader */ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js");





/* harmony default export */ __webpack_exports__["default"] = (function (product) {
  // console.log("product", product);
  var currentVariant = product.product.variants[0];
  var loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_4__.Loader({
    apiKey: 'AIzaSyCnwNJFrWDA3y5YFeYXHDRifHIvlX9QQHc',
    version: 'weekly',
    libraries: ['places']
  });
  return {
    //defaults
    price: product.price,
    submitText: 'Add to Cart',
    disabled: currentVariant.available ? false : true,
    button: currentVariant.available ? 'Add to Cart' : 'Unavailable',
    properties: {
      'Shipping Address': ''
    },
    formData: {
      id: currentVariant.id,
      qty: 1
    },
    init: function init() {
      var _this = this;

      loader.load().then(function () {
        // Create the autocomplete object
        var autocomplete = new google.maps.places.Autocomplete(_this.$refs.address, {
          types: ['geocode']
        } // Restrict the search results to addresses
        ); // When a place is selected, get its details

        autocomplete.addListener('place_changed', function () {
          var place = autocomplete.getPlace();
          console.log(place.formatted_address);
          _this.properties['Shipping Address'] = place.formatted_address;
        });
      });
    },
    onUpdate: function onUpdate(field, value) {
      this.properties[field] = value;
    },
    onSubmit: function onSubmit() {
      var _this2 = this;

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
        _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.getState().then(function (state) {
          (0,_utils_cart__WEBPACK_IMPORTED_MODULE_2__.cartUpdateAll)(state);
          _this2.button = 'Add to Cart';
          _this2.disabled = false;
          _this2.selectedAddOnProducts = [];
          window.dispatchEvent(new CustomEvent('updatecartstatus', {
            detail: {
              cartOpen: true
            }
          }));
        });
      }).catch(function (e) {
        // console.log(e)
        alert("This product is unavailable at the moment");
        _this2.button = 'Unavailable';
        _this2.disabled = true;
      });
    },
    //Image Uploader for repair
    buttonText: 'Upload Image',
    uploading: false,
    imageUrl: null,
    error: 'There has been an error uploading',
    uploadImage: function uploadImage() {
      var _this3 = this;

      this.uploading = true;
      var file = this.$refs.imageInput.files[0];

      if (file) {
        if (file.type.startsWith('image/')) {
          var formData = new FormData();
          formData.append('image', file);
          fetch('https://evening-spire-07221.herokuapp.com/upload', {
            method: 'POST',
            body: formData
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            _this3.imageUrl = data.imageUrl;
            _this3.properties['image_url'] = data.imageUrl;
            _this3.uploading = false;
          }).catch(function (error) {
            console.error(error);
            _this3.uploading = false;
            alert('Server error, please try again');
          });
        } else {
          alert('Please select an image file');
          this.uploading = false;
        }
      } else {
        alert('Please select a file');
        this.uploading = false;
      }
    },
    date: '',
    formatDate: function formatDate(value) {
      // Remove any non-numeric characters from the input value
      value = value.replace(/\D/g, ''); // Format the date value as mm/dd/yyyy

      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }

      if (value.length > 5) {
        value = value.substring(0, 5) + '/' + value.substring(5);
      } // Update the input field with the formatted date


      return value;
    }
  };
});

/***/ }),

/***/ "./src/scripts/utils/repairPopups.js":
/*!*******************************************!*\
  !*** ./src/scripts/utils/repairPopups.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-cart */ "./node_modules/@shopify/theme-cart/theme-cart.js");
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @googlemaps/js-api-loader */ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_1__.Loader({
  apiKey: "AIzaSyCnwNJFrWDA3y5YFeYXHDRifHIvlX9QQHc",
  version: "weekly",
  libraries: ["places"]
});
/* harmony default export */ __webpack_exports__["default"] = (function () {
  return {
    products: [],
    showRepair: null,
    init: function init() {
      this.updateRepairPopups();
    },
    uploadImage: function uploadImage(index) {
      var _this = this;

      // console.log(this);
      this.uploading = true;
      var file = this.$refs.imageInput.files[0];

      if (file) {
        if (file.type.startsWith("image/")) {
          var formData = new FormData();
          formData.append("image", file);
          fetch("https://evening-spire-07221.herokuapp.com/upload", {
            method: "POST",
            body: formData
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            console.log(data);
            console.log(_this.properties);
            _this.imageUrl = data.imageUrl;
            _this.newProperties = _objectSpread(_objectSpread({}, _this.newProperties), {}, {
              image_url: data.imageUrl
            });
            _this.uploading = false;
          }).catch(function (error) {
            console.error(error);
            _this.uploading = false;
            alert("Server error, please try again");
          });
        } else {
          alert("Please select an image file");
          this.uploading = false;
        }
      } else {
        alert("Please select a file");
        this.uploading = false;
      }
    },
    updateRepairPopups: function updateRepairPopups() {
      var _this2 = this;

      _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.getState().then(function (state) {
        if (state.items) {
          _this2.products = state.items.map(function (item) {
            return _objectSpread(_objectSpread({}, item), {}, {
              updatedProperties: item.properties
            });
          });

          _this2.$nextTick(function () {
            loader.load().then(function () {
              // Create the autocomplete object
              var autocomplete = new google.maps.places.Autocomplete(_this2.$refs.address, {
                types: ["geocode"]
              } // Restrict the search results to addresses
              );
              var repairEditAddresses = document.querySelectorAll(".repair-edit-address");
              repairEditAddresses === null || repairEditAddresses === void 0 ? void 0 : repairEditAddresses.forEach(function (field) {
                // When a place is selected, get its details
                autocomplete.addListener(function (field, i) {
                  var place = autocomplete.getPlace();
                  _this2.products[i].updatedProperties = _objectSpread(_objectSpread({}, _this2.products[i].updatedProperties), {}, {
                    "Shipping Address": place.formatted_address
                  });
                });
              });
            });
          });
        }
      });
    },
    updateProperty: function updateProperty(index, property, value) {}
  };
});
/*
Load products into cart container
Loop through products
    Upload image
    remove image
    cancel operation
    update properties
        Update cart

Others:
    Update popups on add to cart
    Change action of button in cart


*/

/***/ }),

/***/ "./src/scripts/utils/singleRepairPopup.js":
/*!************************************************!*\
  !*** ./src/scripts/utils/singleRepairPopup.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-cart */ "./node_modules/@shopify/theme-cart/theme-cart.js");
/* harmony import */ var _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @googlemaps/js-api-loader */ "./node_modules/@googlemaps/js-api-loader/dist/index.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = (function (product) {
  console.log('singleRepair', product);
  var loader = new _googlemaps_js_api_loader__WEBPACK_IMPORTED_MODULE_1__.Loader({
    apiKey: 'AIzaSyCnwNJFrWDA3y5YFeYXHDRifHIvlX9QQHc',
    version: 'weekly',
    libraries: ['places']
  });
  return {
    properties: product.properties,
    updatedProperties: product.properties,
    buttonText: 'Upload Image',
    uploading: false,
    imageUrl: null,
    error: 'There has been an error uploading',
    init: function init() {
      var _this = this;

      console.log('product', product);
      loader.load().then(function () {
        // Create the autocomplete object
        var autocomplete = new google.maps.places.Autocomplete(_this.$refs.address, {
          types: ['geocode']
        } // Restrict the search results to addresses
        ); // When a place is selected, get its details

        autocomplete.addListener('place_changed', function () {
          var place = autocomplete.getPlace();
          _this.updatedProperties = _objectSpread(_objectSpread({}, _this.updatedProperties), {}, {
            'Shipping Address': place.formatted_address
          });
        });
      });
    },
    updateRepair: function updateRepair() {
      _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.updateItem(key, {
        properties: updatedProperties
      }).then(function (state) {
        cartUpdateAll(state);
      });
    },
    uploadImage: function uploadImage() {
      var _this2 = this;

      // console.log(this);
      this.uploading = true;
      var file = this.$refs.imageInput.files[0];

      if (file) {
        if (file.type.startsWith('image/')) {
          var formData = new FormData();
          formData.append('image', file);
          fetch('https://evening-spire-07221.herokuapp.com/upload', {
            method: 'POST',
            body: formData
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            console.log(data);
            console.log(_this2.properties);
            _this2.imageUrl = data.imageUrl;
            _this2.newProperties = _objectSpread(_objectSpread({}, _this2.newProperties), {}, {
              image_url: data.imageUrl
            });
            _this2.uploading = false;
          }).catch(function (error) {
            console.error(error);
            _this2.uploading = false;
            alert('Server error, please try again');
          });
        } else {
          alert('Please select an image file');
          this.uploading = false;
        }
      } else {
        alert('Please select a file');
        this.uploading = false;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YXNlLmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9jYXJ0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9oZWFkZXItaGVpZ2h0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9wcm9kdWN0LmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9wcm9kdWN0UmVwYWlyLmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy91dGlscy9yZXBhaXJQb3B1cHMuanMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS8uL3NyYy9zY3JpcHRzL3V0aWxzL3NpbmdsZVJlcGFpclBvcHVwLmpzIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzcz8wOTI3Iiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lcGljc3VwcmVtZS1zaG9waWZ5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZXBpY3N1cHJlbWUtc2hvcGlmeS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbHBpbmUgZnJvbSAnYWxwaW5lanMnXG5pbXBvcnQgY29sbGFwc2UgZnJvbSAnQGFscGluZWpzL2NvbGxhcHNlJ1xuaW1wb3J0IHsgc3Vic2NyaWJlIH0gZnJvbSAna2xhdml5by1zdWJzY3JpYmUnXG5cbmltcG9ydCBwcm9kdWN0IGZyb20gJy4vdXRpbHMvcHJvZHVjdCdcbmltcG9ydCBwcm9kdWN0UmVwYWlyIGZyb20gJy4vdXRpbHMvcHJvZHVjdFJlcGFpcidcblxuaW1wb3J0ICcuL3V0aWxzL2hlYWRlci1oZWlnaHQnXG5pbXBvcnQgJy4vdXRpbHMvY2FydCdcbi8vIGltcG9ydCAnLi9hbmltYXRpb25zL2hlYWRlcidcblxuaW1wb3J0IHJlcGFpclBvcHVwcyBmcm9tICcuL3V0aWxzL3JlcGFpclBvcHVwcydcbmltcG9ydCBzaW5nbGVSZXBhaXJQb3B1cCBmcm9tICcuL3V0aWxzL3NpbmdsZVJlcGFpclBvcHVwJ1xuXG5BbHBpbmUucGx1Z2luKGNvbGxhcHNlKVxuXG5BbHBpbmUuZGF0YSgncHJvZHVjdCcsIHByb2R1Y3QpXG5BbHBpbmUuZGF0YSgncHJvZHVjdFJlcGFpcicsIHByb2R1Y3RSZXBhaXIpXG5BbHBpbmUuZGF0YSgncmVwYWlyUG9wdXBzJywgcmVwYWlyUG9wdXBzKVxuQWxwaW5lLmRhdGEoJ3NpbmdsZVJlcGFpclBvcHVwJywgc2luZ2xlUmVwYWlyUG9wdXApXG5cbndpbmRvdy5BbHBpbmUgPSBBbHBpbmVcblxuQWxwaW5lLnN0YXJ0KClcblxuY29uc3QgbG9veENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb294UmV2aWV3cycpXG5sb294Q29udGFpbmVyPy5jbGFzc0xpc3QuYWRkKCdzY3JvbGwtbXQtNDAnKVxuXG5jb25zdCBmb290ZXJTdWJzY2liZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXItc3Vic2NyaWJlJylcblxuZm9vdGVyU3Vic2NpYmUuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyLXN1YnNjcmliZS1lbWFpbCcpXG5cbiAgc3Vic2NyaWJlKCdYQUdBdkEnLCBlbWFpbC52YWx1ZSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBlbWFpbC52YWx1ZSA9ICcnXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVtYWlsLW1lc3NhZ2UnKS5pbm5lckhUTUwgPVxuICAgICAgJ1RoYW5rIHlvdSBmb3Igc2lnbmluZyB1cCEnXG4gIH0pXG59KVxuIiwiaW1wb3J0IHsgY29udmVydENvbG9yVmFyaWFibGVzIH0gZnJvbSAnQG1lcnRhc2FuL3RhaWx3aW5kY3NzLXZhcmlhYmxlcy9zcmMvaGVscGVycydcbmltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcblxuY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKHN0YXRlKTtcbiAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbn0pXG5cbmZ1bmN0aW9uIGNhcnRUb0FscGluZShzdGF0ZSkge1xuICBsZXQgcHJvZHVjdHMgPSBbXVxuICBpZiAoc3RhdGUuaXRlbXMpIHtcbiAgICBzdGF0ZS5pdGVtcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBsZXQgZiA9IGUuZmVhdHVyZWRfaW1hZ2UudXJsXG5cbiAgICAgIC8vIGlmIChlLmZlYXR1cmVkX2ltYWdlLnVybCkge1xuICAgICAgLy8gICBsZXQgZmlsZW5hbWUgPSBlLmZlYXR1cmVkX2ltYWdlLnVybFxuICAgICAgLy8gICAgIC5yZXBsYWNlKC9cXD8uKiQvLCAnJylcbiAgICAgIC8vICAgICAucmVwbGFjZSgvLipcXC8vLCAnJylcbiAgICAgIC8vICAgbGV0IG5ld0ZpbGVuYW1lID0gZmlsZW5hbWUucmVwbGFjZSgvXFwuW14vLl0rJC8sICdfMzAweC5qcGcnKVxuICAgICAgLy8gICBmID0gZS5mZWF0dXJlZF9pbWFnZS51cmwucmVwbGFjZShmaWxlbmFtZSwgbmV3RmlsZW5hbWUpXG4gICAgICAvLyB9XG5cbiAgICAgIGNvbnN0IHJlYWxQcmljZSA9IGUucHJpY2UgLyAxMDBcblxuICAgICAgY29uc3QgYWRkT25Qcm9kdWN0cyA9IHN0YXRlLml0ZW1zXG4gICAgICAgIC5tYXAoKHApID0+IHtcbiAgICAgICAgICBpZiAocC5wcm9wZXJ0aWVzPy5fY2FydFBhcmVudCA9PT0gZS5rZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHRpdGxlOiBwLnByb2R1Y3RfdGl0bGUsXG4gICAgICAgICAgICAgIGtleTogcC5rZXksXG4gICAgICAgICAgICAgIHByaWNlOiBwLnByaWNlIC8gMTAwLFxuICAgICAgICAgICAgICBpZDogcC52YXJpYW50X2lkLFxuICAgICAgICAgICAgICBvcHRpb25zOiBwLm9wdGlvbnNfd2l0aF92YWx1ZXMsXG4gICAgICAgICAgICAgIGltYWdlOiBwLmZlYXR1cmVkX2ltYWdlLnVybCxcbiAgICAgICAgICAgICAgcXR5OiBwLnF1YW50aXR5LFxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwLnByb3BlcnRpZXMsXG4gICAgICAgICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbSh0aGlzLmtleSlcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdXBkYXRlKHF0eSkge1xuICAgICAgICAgICAgICAgIGNhcnRVcGRhdGVJdGVtKHRoaXMua2V5LCBwYXJzZUludChxdHkpKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBlXG4gICAgICAgIH0pXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGFkZE9uUHJvZHVjdHMpXG5cbiAgICAgIGlmICghZS5wcm9wZXJ0aWVzPy5fY2FydFBhcmVudCkge1xuICAgICAgICBwcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogZS5wcm9kdWN0X3RpdGxlLFxuICAgICAgICAgIGtleTogZS5rZXksXG4gICAgICAgICAgcHJpY2U6IHJlYWxQcmljZSxcbiAgICAgICAgICBpZDogZS52YXJpYW50X2lkLFxuICAgICAgICAgIG9wdGlvbnM6IGUub3B0aW9uc193aXRoX3ZhbHVlcyxcbiAgICAgICAgICBwcm9wZXJ0aWVzQXJyYXk6IGUucHJvcGVydGllcyA/IE9iamVjdC5lbnRyaWVzKGUucHJvcGVydGllcykgOiBudWxsLFxuICAgICAgICAgIGltYWdlOiBmLFxuICAgICAgICAgIGFkZE9uUHJvZHVjdHM6IGFkZE9uUHJvZHVjdHMsXG4gICAgICAgICAgcXR5OiBlLnF1YW50aXR5LFxuICAgICAgICAgIHJlbW92ZSgpIHtcbiAgICAgICAgICAgIGNhcnRSZW1vdmVJdGVtKHRoaXMua2V5KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlUHJvcGVydGllcygpIHtcbiAgICAgICAgICAgIGNhcnRVcGRhdGVQcm9wZXJ0aWVzKHRoaXMua2V5LCB0aGlzLm5ld1Byb3BlcnRpZXMpXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cGRhdGUocXR5KSB7XG4gICAgICAgICAgICBjYXJ0VXBkYXRlSXRlbSh0aGlzLmtleSwgcGFyc2VJbnQocXR5KSlcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvdGFsOiBzdGF0ZS5pdGVtc19zdWJ0b3RhbF9wcmljZSAvIDEwMCxcbiAgICBwcm9kdWN0czogcHJvZHVjdHMsXG4gICAgbm90ZTogc3RhdGUubm90ZSxcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXJ0UmVtb3ZlSXRlbShrZXkpIHtcbiAgbGV0IHJlbW92ZVByb2R1Y3RzID0ge31cblxuICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhzdGF0ZSlcblxuICAgIGNvbnN0IGFkZE9uUmVtb3ZlID0gc3RhdGUuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBpdGVtLnByb3BlcnRpZXM/Ll9jYXJ0UGFyZW50ICE9IG51bGwgJiZcbiAgICAgICAga2V5ID09PSBpdGVtLnByb3BlcnRpZXM/Ll9jYXJ0UGFyZW50XG4gICAgICApIHtcbiAgICAgICAgcmVtb3ZlUHJvZHVjdHNbaXRlbS5rZXldID0gMFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBwYXJlbnRJdGVtID0gc3RhdGUuaXRlbXMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGtleSA9PT0gaXRlbS5rZXlcbiAgICB9KVxuXG4gICAgcmVtb3ZlUHJvZHVjdHNbcGFyZW50SXRlbS5rZXldID0gMFxuXG4gICAgLy8gY29uc29sZS5sb2cocmVtb3ZlUHJvZHVjdHMpXG5cbiAgICBmZXRjaCh3aW5kb3cuU2hvcGlmeS5yb3V0ZXMucm9vdCArICdjYXJ0L3VwZGF0ZS5qcycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdXBkYXRlczogcmVtb3ZlUHJvZHVjdHMsXG4gICAgICB9KSxcbiAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgfSlcbiAgfSlcblxuICAvLyBjYXJ0LnJlbW92ZUl0ZW0oa2V5KS50aGVuKChzdGF0ZSkgPT4ge1xuICAvLyAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gIC8vIH0pXG59XG5cbmZ1bmN0aW9uIGNhcnRVcGRhdGVQcm9wZXJ0aWVzKGtleSwgcHJvcGVydGllcykge1xuICBjYXJ0LnVwZGF0ZUl0ZW0oa2V5LCB7IHByb3BlcnRpZXM6IHByb3BlcnRpZXMgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5mdW5jdGlvbiBjYXJ0VXBkYXRlSXRlbShrZXksIHF0eSkge1xuICBjYXJ0LnVwZGF0ZUl0ZW0oa2V5LCB7IHF1YW50aXR5OiBxdHkgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FydFVwZGF0ZUFsbChzdGF0ZSkge1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZXByb2R1Y3RzJywge1xuICAgICAgZGV0YWlsOiB7IGNhcnQ6IGNhcnRUb0FscGluZShzdGF0ZSkgfSxcbiAgICB9KVxuICApXG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydGNvdW50Jywge1xuICAgICAgZGV0YWlsOiB7IGNhcnRUb3RhbDogc3RhdGUuaXRlbV9jb3VudCB9LFxuICAgIH0pXG4gIClcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NhcnRVcGRhdGUnLCAoZSkgPT4ge1xuICBjYXJ0LnVwZGF0ZU5vdGUoZS50YXJnZXQudmFsdWUpXG59KVxuIiwic2V0SGVhZGVySGVpZ2h0KClcblxuZnVuY3Rpb24gc2V0SGVhZGVySGVpZ2h0KCkge1xuICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykub2Zmc2V0SGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0taGVhZGVyLWhlaWdodCcsIGAke2hlYWRlckhlaWdodH1weGApXG4gIGNvbnN0IGZvb3RlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKS5vZmZzZXRIZWlnaHRcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1mb290ZXItaGVpZ2h0JywgYCR7Zm9vdGVySGVpZ2h0fXB4YClcbiAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0td2luZG93LWhlaWdodCcsIGAke3dpbmRvd0hlaWdodH1weGApXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRIZWFkZXJIZWlnaHQpXG4iLCJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnXG5pbXBvcnQgKiBhcyBjdXJyZW5jeSBmcm9tICdAc2hvcGlmeS90aGVtZS1jdXJyZW5jeSdcbmltcG9ydCB7IGNhcnRVcGRhdGVBbGwgfSBmcm9tICcuLi91dGlscy9jYXJ0J1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCdcblxuZXhwb3J0IGRlZmF1bHQgKHByb2R1Y3QpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwcm9kdWN0XCIsIHByb2R1Y3QpO1xuICBjb25zdCBjdXJyZW50VmFyaWFudCA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1swXVxuICBjb25zdCB2YXJpYW50cyA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1xuICBjb25zdCBsaW5lclN5bmMgPSBwcm9kdWN0LmxpbmVyU3luY1xuXG4gIGNvbnN0IHByaWNlID0gKHZhcmlhbnRJZCwgc2VsZWN0ZWRBZGRPblByb2R1Y3RzLCBoYXNMaW5lcikgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkQWRkT25Qcm9kdWN0cyk7XG4gICAgY29uc3QgdmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigob2JqKSA9PiBvYmouaWQgPT09IHZhcmlhbnRJZClbMF1cbiAgICBsZXQgYWRkT25QcmljZSA9IDBcbiAgICBpZiAoc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlbGVjdGVkQWRkT25Qcm9kdWN0cy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGFkZE9uUHJpY2UgPSBhZGRPblByaWNlICsgZS5wcmljZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoaGFzTGluZXIpIHtcbiAgICAgIGFkZE9uUHJpY2UgPSBhZGRPblByaWNlICsgaGFzTGluZXJcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWN0dWFsUHJpY2U6ICckJyArICh2YXJpYW50LnByaWNlICsgYWRkT25QcmljZSkgLyAxMDAsXG4gICAgICBvcmlnaW5hbFByaWNlOiB2YXJpYW50LmNvbXBhcmVfYXRfcHJpY2VcbiAgICAgICAgPyAnJCcgKyAodmFyaWFudC5jb21wYXJlX2F0X3ByaWNlICsgYWRkT25QcmljZSkgLyAxMDBcbiAgICAgICAgOiAnJyxcbiAgICAgIG1lc3NhZ2U6ICcnLFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGN1cnJlbnRPcHRpb25zID0gKHZhcmlhbnRJZCkgPT4ge1xuICAgIGNvbnN0IHZhcmlhbnQgPSB2YXJpYW50cy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkID09PSB2YXJpYW50SWQpWzBdXG4gICAgY29uc3QgY3VycmVudE9wdGlvbnMgPSBwcm9kdWN0LnByb2R1Y3Qub3B0aW9ucy5tYXAoKGUsIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGUsXG4gICAgICAgIHZhbHVlOiB2YXJpYW50Lm9wdGlvbnNbaV0sXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gY3VycmVudE9wdGlvbnNcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZUFkZE9uID0gKGlkLCBzZWxlY3RlZEFkZE9ucywgcHJpY2UpID0+IHtcbiAgICBsZXQgdXBkYXRlZEFkZE9ucyA9IHNlbGVjdGVkQWRkT25zXG4gICAgY29uc3QgY2hlY2tTdGF0dXMgPSBzZWxlY3RlZEFkZE9ucy5maWx0ZXIoKG9iaikgPT4gb2JqLmlkID09PSBpZClcbiAgICBpZiAoY2hlY2tTdGF0dXMubGVuZ3RoID4gMCkge1xuICAgICAgdXBkYXRlZEFkZE9ucyA9IHNlbGVjdGVkQWRkT25zLmZpbHRlcigob2JqKSA9PiBvYmouaWQgIT0gaWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZWRBZGRPbnMucHVzaCh7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgcXR5OiAxLFxuICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlZEFkZE9uc1xuICB9XG5cbiAgY29uc3QgbGluZXJJZCA9ICh2YXJpYW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coXCJsaW5lclwiLCBsaW5lclN5bmMpXG4gICAgLy8gY29uc29sZS5sb2coXCJ2YXJpYW50XCIsIHZhcmlhbnQpXG4gICAgY29uc3QgbGluZXJGaWx0ZXIgPSBwcm9kdWN0LmxpbmVyU3luYy5maW5kKChvYmopID0+IHtcbiAgICAgIHJldHVybiBvYmoudmFyaWFudElkID09PSB2YXJpYW50XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmxvZyhcImxpbmVyXCIsIGxpbmVyRmlsdGVyKVxuICAgIHJldHVybiBsaW5lckZpbHRlciA/IGxpbmVyRmlsdGVyIDogbnVsbFxuICAgIC8vIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4ge1xuICAgIC8vZGVmYXVsdHNcbiAgICBwcmljZTogcHJpY2UoY3VycmVudFZhcmlhbnQuaWQsIFtdLCBmYWxzZSksXG4gICAgc3VibWl0VGV4dDogJ0FkZCB0byBDYXJ0JyxcbiAgICBkaXNhYmxlZDogY3VycmVudFZhcmlhbnQuYXZhaWxhYmxlID8gZmFsc2UgOiB0cnVlLFxuICAgIGJ1dHRvbjogY3VycmVudFZhcmlhbnQuYXZhaWxhYmxlID8gJ0FkZCB0byBDYXJ0JyA6ICdVbmF2YWlsYWJsZScsXG4gICAgYWRkT25Qcm9kdWN0czogcHJvZHVjdC5hZGRPblByb2R1Y3RzLFxuICAgIHNlbGVjdGVkQWRkT25Qcm9kdWN0czogW10sXG5cbiAgICBvcHRpb25zOiBjdXJyZW50T3B0aW9ucyhjdXJyZW50VmFyaWFudC5pZCksXG4gICAgLy8gIGF2YWlsYWJsZU9wdGlvbnM6IGF2YWlsYWJsZU9wdGlvbnModGhpcy5vcHRpb25zKSxcblxuICAgIC8vU3RvcmUgZm9yIHNlbmRpbmcgdG8gYWRkIGNhcnRcbiAgICBmb3JtRGF0YToge1xuICAgICAgaWQ6IGN1cnJlbnRWYXJpYW50LmlkLFxuICAgICAgcXR5OiAxLFxuICAgIH0sXG5cbiAgICBsaW5lcjoge1xuICAgICAgbGluZXJJbmZvOiBsaW5lcklkKGN1cnJlbnRWYXJpYW50LmlkKSxcbiAgICAgIGFkZExpbmVyOiBmYWxzZSxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICAvL2Zvcm0gYWN0aW9uc1xuICAgIGNoZWNrQWRkT25zKGlkKSB7XG4gICAgICBjb25zdCBjaGVja1N0YXR1cyA9IHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZpbHRlcihcbiAgICAgICAgKG9iaikgPT4gb2JqLmlkID09PSBpZFxuICAgICAgKVxuICAgICAgaWYgKGNoZWNrU3RhdHVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0QWRkb24oaWQsIHNlbGVjdGVkQWRkT25zLCBjb3N0KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQWRkT25Qcm9kdWN0cyA9IGhhbmRsZUFkZE9uKGlkLCBzZWxlY3RlZEFkZE9ucywgY29zdClcbiAgICAgIHRoaXMucHJpY2UgPSBwcmljZShcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5pZCxcbiAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMsXG4gICAgICAgIHRoaXMubGluZXIuYWRkTGluZXIgPyB0aGlzLmxpbmVyLmxpbmVySW5mby5saW5lclByaWNlIDogZmFsc2VcbiAgICAgIClcbiAgICAgIC8vIGNvbnNvbGUubG9nKGhhbmRsZUFkZE9uKGlkLCBzZWxlY3RlZEFkZE9ucykpXG4gICAgfSxcbiAgICBpbmNyZWFzZSgpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID0gdGhpcy5mb3JtRGF0YS5xdHkgKyAxXG4gICAgfSxcbiAgICBkZWNyZWFzZSgpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEucXR5ID1cbiAgICAgICAgdGhpcy5mb3JtRGF0YS5xdHkgLSAxID09PSAwID8gMSA6IHRoaXMuZm9ybURhdGEucXR5IC0gMVxuICAgIH0sXG4gICAgdXBkYXRlTW9ub2dyYW0odmFsKSB7XG4gICAgICBjb25zb2xlLmxvZyh2YWwpXG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHtcbiAgICAgICAgICBNb25vZ3JhbTogdmFsLFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB7fVxuICAgICAgfVxuICAgIH0sXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICB0aGlzLmJ1dHRvbiA9ICdBZGRpbmcuLi4nXG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgZmV0Y2god2luZG93LlNob3BpZnkucm91dGVzLnJvb3QgKyAnY2FydC9hZGQuanMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiB0aGlzLmZvcm1EYXRhLmlkLFxuICAgICAgICAgICAgICBxdWFudGl0eTogdGhpcy5mb3JtRGF0YS5xdHksXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSksXG4gICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBjb25zdCBsYXN0Q2FydEl0ZW0gPSByZXN1bHQuaXRlbXMucG9wKClcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdsYXN0IGNhcnQgaXRlbScsIGxhc3RDYXJ0SXRlbSlcbiAgICAgICAgICBjb25zb2xlLmxvZygnbGluZScsIHRoaXMubGluZXIpXG5cbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMubGVuZ3RoIDwgMSAmJiAhdGhpcy5saW5lci5hZGRMaW5lcikge1xuICAgICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ0FkZCB0byBDYXJ0J1xuICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBbXVxuICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRzdGF0dXMnLCB7XG4gICAgICAgICAgICAgICAgICBkZXRhaWw6IHsgY2FydE9wZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhZGRPbkNhcnRQcm9kdWN0cyA9IFtdXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxpbmVyLmFkZExpbmVyKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsaW5lcicpXG4gICAgICAgICAgICAgIGFkZE9uQ2FydFByb2R1Y3RzLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmxpbmVyLmxpbmVySW5mby5saW5lcklkLFxuICAgICAgICAgICAgICAgIHF0eTogdGhpcy5mb3JtRGF0YS5xdHksXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgX2NhcnRQYXJlbnQ6IGxhc3RDYXJ0SXRlbS5rZXksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICBhZGRPbkNhcnRQcm9kdWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIGlkOiBlLmlkLFxuICAgICAgICAgICAgICAgICAgcXR5OiAxLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICBfY2FydFBhcmVudDogbGFzdENhcnRJdGVtLmtleSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgZmV0Y2god2luZG93LlNob3BpZnkucm91dGVzLnJvb3QgKyAnY2FydC9hZGQuanMnLCB7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBhZGRPbkNhcnRQcm9kdWN0cyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FydC5nZXRTdGF0ZSgpLnRoZW4oKHN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjYXJ0VXBkYXRlQWxsKHN0YXRlKVxuICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b24gPSAnQWRkIHRvIENhcnQnXG4gICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzID0gW11cbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZWNhcnRzdGF0dXMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7IGNhcnRPcGVuOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSlcbiAgICAgICAgICAgICAgICBhbGVydChgVGhpcyBwcm9kdWN0IGlzIHVuYXZhaWxhYmxlIGF0IHRoZSBtb21lbnRgKVxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gJ1VuYXZhaWxhYmxlJ1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApXG4gICAgICAgICAgdGhpcy5idXR0b24gPSAnVW5hdmFpbGFibGUnXG4gICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGFkZExpbmVyKCkge1xuICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA9ICF0aGlzLmxpbmVyLmFkZExpbmVyXG4gICAgICB0aGlzLnByaWNlID0gcHJpY2UoXG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQsXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLFxuICAgICAgICB0aGlzLmxpbmVyLmFkZExpbmVyID8gdGhpcy5saW5lci5saW5lckluZm8ubGluZXJQcmljZSA6IGZhbHNlXG4gICAgICApXG4gICAgfSxcbiAgICB1cGRhdGVWYXJpYW50KHZhbHVlLCBvcHRpb24pIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSBvcHRpb25zLm1hcCgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gZS5uYW1lID09IG9wdGlvbiA/IHZhbHVlIDogZS52YWx1ZVxuICAgICAgfSlcblxuICAgICAgY29uc3QgbmV3VmFyaWFudCA9IHZhcmlhbnRzLmZpbHRlcigodmFyaWFudCkgPT4ge1xuICAgICAgICByZXR1cm4gaXNFcXVhbCh2YXJpYW50Lm9wdGlvbnMsIG5ld09wdGlvbnMpXG4gICAgICB9KVswXVxuXG4gICAgICBpZiAobmV3VmFyaWFudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIDsodGhpcy5saW5lci5saW5lckluZm8gPSBsaW5lcklkKG5ld1ZhcmlhbnQuaWQpKSxcbiAgICAgICAgICAodGhpcy5wcmljZSA9IHByaWNlKFxuICAgICAgICAgICAgbmV3VmFyaWFudC5pZCxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRBZGRPblByb2R1Y3RzLFxuICAgICAgICAgICAgdGhpcy5saW5lci5hZGRMaW5lciA/IHRoaXMubGluZXIubGluZXJJbmZvLmxpbmVyUHJpY2UgOiBmYWxzZVxuICAgICAgICAgICkpXG4gICAgICAgIHRoaXMuZm9ybURhdGEuaWQgPSBuZXdWYXJpYW50LmlkXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGN1cnJlbnRPcHRpb25zKG5ld1ZhcmlhbnQuaWQpXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBuZXdWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZVxuICAgICAgICB0aGlzLmJ1dHRvbiA9IG5ld1ZhcmlhbnQuYXZhaWxhYmxlID8gJ0FkZCB0byBDYXJ0JyA6ICdVbmF2YWlsYWJsZSdcblxuICAgICAgICBjb25zdCB2YXJpYW50SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS12YXJpYW50cyo9XCIke25ld1ZhcmlhbnQuaWR9XCJgXG4gICAgICAgIClcbiAgICAgICAgaWYgKHZhcmlhbnRJbWFnZSkge1xuICAgICAgICAgIHdpbmRvdy5wcm91ZGN0U3dpcGVyLnNsaWRlVG8oXG4gICAgICAgICAgICBwYXJzZUludCh2YXJpYW50SW1hZ2UuZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpKSArIDFcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuYnV0dG9uID0gJ1VuYXZhaWxhYmxlJ1xuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGNhcnQgZnJvbSAnQHNob3BpZnkvdGhlbWUtY2FydCdcbmltcG9ydCAqIGFzIGN1cnJlbmN5IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWN1cnJlbmN5J1xuaW1wb3J0IHsgY2FydFVwZGF0ZUFsbCB9IGZyb20gJy4uL3V0aWxzL2NhcnQnXG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnQGdvb2dsZW1hcHMvanMtYXBpLWxvYWRlcidcblxuZXhwb3J0IGRlZmF1bHQgKHByb2R1Y3QpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwcm9kdWN0XCIsIHByb2R1Y3QpO1xuICBjb25zdCBjdXJyZW50VmFyaWFudCA9IHByb2R1Y3QucHJvZHVjdC52YXJpYW50c1swXVxuXG4gIGNvbnN0IGxvYWRlciA9IG5ldyBMb2FkZXIoe1xuICAgIGFwaUtleTogJ0FJemFTeUNud05KRnJXREEzeTVZRmVZWEhEUmlmSEl2bFg5UVFIYycsXG4gICAgdmVyc2lvbjogJ3dlZWtseScsXG4gICAgbGlicmFyaWVzOiBbJ3BsYWNlcyddLFxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgLy9kZWZhdWx0c1xuICAgIHByaWNlOiBwcm9kdWN0LnByaWNlLFxuICAgIHN1Ym1pdFRleHQ6ICdBZGQgdG8gQ2FydCcsXG4gICAgZGlzYWJsZWQ6IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICBidXR0b246IGN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/ICdBZGQgdG8gQ2FydCcgOiAnVW5hdmFpbGFibGUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICdTaGlwcGluZyBBZGRyZXNzJzogJycsXG4gICAgfSxcbiAgICBmb3JtRGF0YToge1xuICAgICAgaWQ6IGN1cnJlbnRWYXJpYW50LmlkLFxuICAgICAgcXR5OiAxLFxuICAgIH0sXG4gICAgaW5pdCgpIHtcbiAgICAgIGxvYWRlci5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgYXV0b2NvbXBsZXRlIG9iamVjdFxuICAgICAgICBjb25zdCBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShcbiAgICAgICAgICB0aGlzLiRyZWZzLmFkZHJlc3MsXG4gICAgICAgICAgeyB0eXBlczogWydnZW9jb2RlJ10gfSAvLyBSZXN0cmljdCB0aGUgc2VhcmNoIHJlc3VsdHMgdG8gYWRkcmVzc2VzXG4gICAgICAgIClcblxuICAgICAgICAvLyBXaGVuIGEgcGxhY2UgaXMgc2VsZWN0ZWQsIGdldCBpdHMgZGV0YWlsc1xuICAgICAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGxhY2UgPSBhdXRvY29tcGxldGUuZ2V0UGxhY2UoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKHBsYWNlLmZvcm1hdHRlZF9hZGRyZXNzKVxuICAgICAgICAgIHRoaXMucHJvcGVydGllc1snU2hpcHBpbmcgQWRkcmVzcyddID0gcGxhY2UuZm9ybWF0dGVkX2FkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBvblVwZGF0ZShmaWVsZCwgdmFsdWUpIHtcbiAgICAgIHRoaXMucHJvcGVydGllc1tmaWVsZF0gPSB2YWx1ZVxuICAgIH0sXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICB0aGlzLmJ1dHRvbiA9ICdBZGRpbmcuLi4nXG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgZmV0Y2god2luZG93LlNob3BpZnkucm91dGVzLnJvb3QgKyAnY2FydC9hZGQuanMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiB0aGlzLmZvcm1EYXRhLmlkLFxuICAgICAgICAgICAgICBxdWFudGl0eTogdGhpcy5mb3JtRGF0YS5xdHksXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSksXG4gICAgICB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGNhcnRVcGRhdGVBbGwoc3RhdGUpXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbiA9ICdBZGQgdG8gQ2FydCdcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEFkZE9uUHJvZHVjdHMgPSBbXVxuICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgndXBkYXRlY2FydHN0YXR1cycsIHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHsgY2FydE9wZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgIGFsZXJ0KGBUaGlzIHByb2R1Y3QgaXMgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudGApXG4gICAgICAgICAgdGhpcy5idXR0b24gPSAnVW5hdmFpbGFibGUnXG4gICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIC8vSW1hZ2UgVXBsb2FkZXIgZm9yIHJlcGFpclxuICAgIGJ1dHRvblRleHQ6ICdVcGxvYWQgSW1hZ2UnLFxuICAgIHVwbG9hZGluZzogZmFsc2UsXG4gICAgaW1hZ2VVcmw6IG51bGwsXG4gICAgZXJyb3I6ICdUaGVyZSBoYXMgYmVlbiBhbiBlcnJvciB1cGxvYWRpbmcnLFxuICAgIHVwbG9hZEltYWdlKCkge1xuICAgICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlXG4gICAgICBjb25zdCBmaWxlID0gdGhpcy4kcmVmcy5pbWFnZUlucHV0LmZpbGVzWzBdXG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS50eXBlLnN0YXJ0c1dpdGgoJ2ltYWdlLycpKSB7XG4gICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBmaWxlKVxuICAgICAgICAgIGZldGNoKCdodHRwczovL2V2ZW5pbmctc3BpcmUtMDcyMjEuaGVyb2t1YXBwLmNvbS91cGxvYWQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW1hZ2VVcmwgPSBkYXRhLmltYWdlVXJsXG4gICAgICAgICAgICAgIHRoaXMucHJvcGVydGllc1snaW1hZ2VfdXJsJ10gPSBkYXRhLmltYWdlVXJsXG4gICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgYWxlcnQoJ1NlcnZlciBlcnJvciwgcGxlYXNlIHRyeSBhZ2FpbicpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KCdQbGVhc2Ugc2VsZWN0IGFuIGltYWdlIGZpbGUnKVxuICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoJ1BsZWFzZSBzZWxlY3QgYSBmaWxlJylcbiAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgZGF0ZTogJycsXG4gICAgZm9ybWF0RGF0ZSh2YWx1ZSkge1xuICAgICAgLy8gUmVtb3ZlIGFueSBub24tbnVtZXJpYyBjaGFyYWN0ZXJzIGZyb20gdGhlIGlucHV0IHZhbHVlXG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJylcblxuICAgICAgLy8gRm9ybWF0IHRoZSBkYXRlIHZhbHVlIGFzIG1tL2RkL3l5eXlcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAyKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyaW5nKDAsIDIpICsgJy8nICsgdmFsdWUuc3Vic3RyaW5nKDIpXG4gICAgICB9XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID4gNSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygwLCA1KSArICcvJyArIHZhbHVlLnN1YnN0cmluZyg1KVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIGlucHV0IGZpZWxkIHdpdGggdGhlIGZvcm1hdHRlZCBkYXRlXG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9LFxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gXCJAc2hvcGlmeS90aGVtZS1jYXJ0XCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwiQGdvb2dsZW1hcHMvanMtYXBpLWxvYWRlclwiO1xuXG5jb25zdCBsb2FkZXIgPSBuZXcgTG9hZGVyKHtcblx0YXBpS2V5OiBcIkFJemFTeUNud05KRnJXREEzeTVZRmVZWEhEUmlmSEl2bFg5UVFIY1wiLFxuXHR2ZXJzaW9uOiBcIndlZWtseVwiLFxuXHRsaWJyYXJpZXM6IFtcInBsYWNlc1wiXSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG5cdHJldHVybiB7XG5cdFx0cHJvZHVjdHM6IFtdLFxuXHRcdHNob3dSZXBhaXI6IG51bGwsXG5cdFx0aW5pdCgpIHtcblx0XHRcdHRoaXMudXBkYXRlUmVwYWlyUG9wdXBzKCk7XG5cdFx0fSxcblx0XHR1cGxvYWRJbWFnZShpbmRleCkge1xuXHRcdFx0Ly8gY29uc29sZS5sb2codGhpcyk7XG5cdFx0XHR0aGlzLnVwbG9hZGluZyA9IHRydWU7XG5cdFx0XHRjb25zdCBmaWxlID0gdGhpcy4kcmVmcy5pbWFnZUlucHV0LmZpbGVzWzBdO1xuXHRcdFx0aWYgKGZpbGUpIHtcblx0XHRcdFx0aWYgKGZpbGUudHlwZS5zdGFydHNXaXRoKFwiaW1hZ2UvXCIpKSB7XG5cdFx0XHRcdFx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoXCJpbWFnZVwiLCBmaWxlKTtcblx0XHRcdFx0XHRmZXRjaChcImh0dHBzOi8vZXZlbmluZy1zcGlyZS0wNzIyMS5oZXJva3VhcHAuY29tL3VwbG9hZFwiLCB7XG5cdFx0XHRcdFx0XHRtZXRob2Q6IFwiUE9TVFwiLFxuXHRcdFx0XHRcdFx0Ym9keTogZm9ybURhdGEsXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdFx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucHJvcGVydGllcyk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuaW1hZ2VVcmwgPSBkYXRhLmltYWdlVXJsO1xuXHRcdFx0XHRcdFx0XHR0aGlzLm5ld1Byb3BlcnRpZXMgPSB7XG5cdFx0XHRcdFx0XHRcdFx0Li4udGhpcy5uZXdQcm9wZXJ0aWVzLFxuXHRcdFx0XHRcdFx0XHRcdGltYWdlX3VybDogZGF0YS5pbWFnZVVybCxcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0dGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnVwbG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRhbGVydChcIlNlcnZlciBlcnJvciwgcGxlYXNlIHRyeSBhZ2FpblwiKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBhbiBpbWFnZSBmaWxlXCIpO1xuXHRcdFx0XHRcdHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBhIGZpbGVcIik7XG5cdFx0XHRcdHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR1cGRhdGVSZXBhaXJQb3B1cHMoKSB7XG5cdFx0XHRjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcblx0XHRcdFx0aWYgKHN0YXRlLml0ZW1zKSB7XG5cdFx0XHRcdFx0dGhpcy5wcm9kdWN0cyA9IHN0YXRlLml0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHsgLi4uaXRlbSwgdXBkYXRlZFByb3BlcnRpZXM6IGl0ZW0ucHJvcGVydGllcyB9O1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRoaXMuJG5leHRUaWNrKCgpID0+IHtcblx0XHRcdFx0XHRcdGxvYWRlci5sb2FkKCkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8vIENyZWF0ZSB0aGUgYXV0b2NvbXBsZXRlIG9iamVjdFxuXHRcdFx0XHRcdFx0XHRjb25zdCBhdXRvY29tcGxldGUgPVxuXHRcdFx0XHRcdFx0XHRcdG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKFxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy4kcmVmcy5hZGRyZXNzLFxuXHRcdFx0XHRcdFx0XHRcdFx0eyB0eXBlczogW1wiZ2VvY29kZVwiXSB9IC8vIFJlc3RyaWN0IHRoZSBzZWFyY2ggcmVzdWx0cyB0byBhZGRyZXNzZXNcblx0XHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHJlcGFpckVkaXRBZGRyZXNzZXMgPVxuXHRcdFx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHRcdFx0XHRcdFx0XHRcIi5yZXBhaXItZWRpdC1hZGRyZXNzXCJcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRyZXBhaXJFZGl0QWRkcmVzc2VzPy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdC8vIFdoZW4gYSBwbGFjZSBpcyBzZWxlY3RlZCwgZ2V0IGl0cyBkZXRhaWxzXG5cdFx0XHRcdFx0XHRcdFx0YXV0b2NvbXBsZXRlLmFkZExpc3RlbmVyKChmaWVsZCwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgcGxhY2UgPSBhdXRvY29tcGxldGUuZ2V0UGxhY2UoKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wcm9kdWN0c1tpXS51cGRhdGVkUHJvcGVydGllcyA9IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Li4udGhpcy5wcm9kdWN0c1tpXS51cGRhdGVkUHJvcGVydGllcyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJTaGlwcGluZyBBZGRyZXNzXCI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGxhY2UuZm9ybWF0dGVkX2FkZHJlc3MsXG5cdFx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHVwZGF0ZVByb3BlcnR5KGluZGV4LCBwcm9wZXJ0eSwgdmFsdWUpIHt9LFxuXHR9O1xufTtcbi8qXG5Mb2FkIHByb2R1Y3RzIGludG8gY2FydCBjb250YWluZXJcbkxvb3AgdGhyb3VnaCBwcm9kdWN0c1xuICAgIFVwbG9hZCBpbWFnZVxuICAgIHJlbW92ZSBpbWFnZVxuICAgIGNhbmNlbCBvcGVyYXRpb25cbiAgICB1cGRhdGUgcHJvcGVydGllc1xuICAgICAgICBVcGRhdGUgY2FydFxuXG5PdGhlcnM6XG4gICAgVXBkYXRlIHBvcHVwcyBvbiBhZGQgdG8gY2FydFxuICAgIENoYW5nZSBhY3Rpb24gb2YgYnV0dG9uIGluIGNhcnRcblxuXG4qL1xuIiwiaW1wb3J0ICogYXMgY2FydCBmcm9tICdAc2hvcGlmeS90aGVtZS1jYXJ0J1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnQGdvb2dsZW1hcHMvanMtYXBpLWxvYWRlcidcblxuZXhwb3J0IGRlZmF1bHQgKHByb2R1Y3QpID0+IHtcbiAgY29uc29sZS5sb2coJ3NpbmdsZVJlcGFpcicsIHByb2R1Y3QpXG5cbiAgY29uc3QgbG9hZGVyID0gbmV3IExvYWRlcih7XG4gICAgYXBpS2V5OiAnQUl6YVN5Q253TkpGcldEQTN5NVlGZVlYSERSaWZISXZsWDlRUUhjJyxcbiAgICB2ZXJzaW9uOiAnd2Vla2x5JyxcbiAgICBsaWJyYXJpZXM6IFsncGxhY2VzJ10sXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBwcm9wZXJ0aWVzOiBwcm9kdWN0LnByb3BlcnRpZXMsXG4gICAgdXBkYXRlZFByb3BlcnRpZXM6IHByb2R1Y3QucHJvcGVydGllcyxcbiAgICBidXR0b25UZXh0OiAnVXBsb2FkIEltYWdlJyxcbiAgICB1cGxvYWRpbmc6IGZhbHNlLFxuICAgIGltYWdlVXJsOiBudWxsLFxuICAgIGVycm9yOiAnVGhlcmUgaGFzIGJlZW4gYW4gZXJyb3IgdXBsb2FkaW5nJyxcbiAgICBpbml0KCkge1xuICAgICAgY29uc29sZS5sb2coJ3Byb2R1Y3QnLCBwcm9kdWN0KVxuICAgICAgbG9hZGVyLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBhdXRvY29tcGxldGUgb2JqZWN0XG4gICAgICAgIGNvbnN0IGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKFxuICAgICAgICAgIHRoaXMuJHJlZnMuYWRkcmVzcyxcbiAgICAgICAgICB7IHR5cGVzOiBbJ2dlb2NvZGUnXSB9IC8vIFJlc3RyaWN0IHRoZSBzZWFyY2ggcmVzdWx0cyB0byBhZGRyZXNzZXNcbiAgICAgICAgKVxuXG4gICAgICAgIC8vIFdoZW4gYSBwbGFjZSBpcyBzZWxlY3RlZCwgZ2V0IGl0cyBkZXRhaWxzXG4gICAgICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBwbGFjZSA9IGF1dG9jb21wbGV0ZS5nZXRQbGFjZSgpXG5cbiAgICAgICAgICB0aGlzLnVwZGF0ZWRQcm9wZXJ0aWVzID0ge1xuICAgICAgICAgICAgLi4udGhpcy51cGRhdGVkUHJvcGVydGllcyxcbiAgICAgICAgICAgICdTaGlwcGluZyBBZGRyZXNzJzogcGxhY2UuZm9ybWF0dGVkX2FkZHJlc3MsXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LFxuICAgIHVwZGF0ZVJlcGFpcigpIHtcbiAgICAgIGNhcnQudXBkYXRlSXRlbShrZXksIHsgcHJvcGVydGllczogdXBkYXRlZFByb3BlcnRpZXMgfSkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgY2FydFVwZGF0ZUFsbChzdGF0ZSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICB1cGxvYWRJbWFnZSgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlXG4gICAgICBjb25zdCBmaWxlID0gdGhpcy4kcmVmcy5pbWFnZUlucHV0LmZpbGVzWzBdXG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICBpZiAoZmlsZS50eXBlLnN0YXJ0c1dpdGgoJ2ltYWdlLycpKSB7XG4gICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBmaWxlKVxuICAgICAgICAgIGZldGNoKCdodHRwczovL2V2ZW5pbmctc3BpcmUtMDcyMjEuaGVyb2t1YXBwLmNvbS91cGxvYWQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcGVydGllcylcbiAgICAgICAgICAgICAgdGhpcy5pbWFnZVVybCA9IGRhdGEuaW1hZ2VVcmxcbiAgICAgICAgICAgICAgdGhpcy5uZXdQcm9wZXJ0aWVzID0ge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMubmV3UHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICBpbWFnZV91cmw6IGRhdGEuaW1hZ2VVcmwsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgICBhbGVydCgnU2VydmVyIGVycm9yLCBwbGVhc2UgdHJ5IGFnYWluJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ1BsZWFzZSBzZWxlY3QgYW4gaW1hZ2UgZmlsZScpXG4gICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydCgnUGxlYXNlIHNlbGVjdCBhIGZpbGUnKVxuICAgICAgICB0aGlzLnVwbG9hZGluZyA9IGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImJhc2VcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2VwaWNzdXByZW1lX3Nob3BpZnlcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZXBpY3N1cHJlbWVfc2hvcGlmeVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvYmFzZS5qc1wiKTsgfSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzc1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiQWxwaW5lIiwiY29sbGFwc2UiLCJzdWJzY3JpYmUiLCJwcm9kdWN0IiwicHJvZHVjdFJlcGFpciIsInJlcGFpclBvcHVwcyIsInNpbmdsZVJlcGFpclBvcHVwIiwicGx1Z2luIiwiZGF0YSIsIndpbmRvdyIsInN0YXJ0IiwibG9veENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImFkZCIsImZvb3RlclN1YnNjaWJlIiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZW1haWwiLCJ2YWx1ZSIsInRoZW4iLCJyZXNwb25zZSIsImlubmVySFRNTCIsImNvbnZlcnRDb2xvclZhcmlhYmxlcyIsImNhcnQiLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2FydFVwZGF0ZUFsbCIsImNhcnRUb0FscGluZSIsInByb2R1Y3RzIiwiaXRlbXMiLCJmb3JFYWNoIiwiZiIsImZlYXR1cmVkX2ltYWdlIiwidXJsIiwicmVhbFByaWNlIiwicHJpY2UiLCJhZGRPblByb2R1Y3RzIiwibWFwIiwicCIsInByb3BlcnRpZXMiLCJfY2FydFBhcmVudCIsImtleSIsInRpdGxlIiwicHJvZHVjdF90aXRsZSIsImlkIiwidmFyaWFudF9pZCIsIm9wdGlvbnMiLCJvcHRpb25zX3dpdGhfdmFsdWVzIiwiaW1hZ2UiLCJxdHkiLCJxdWFudGl0eSIsInJlbW92ZSIsImNhcnRSZW1vdmVJdGVtIiwidXBkYXRlIiwiY2FydFVwZGF0ZUl0ZW0iLCJwYXJzZUludCIsImZpbHRlciIsInB1c2giLCJwcm9wZXJ0aWVzQXJyYXkiLCJPYmplY3QiLCJlbnRyaWVzIiwidXBkYXRlUHJvcGVydGllcyIsImNhcnRVcGRhdGVQcm9wZXJ0aWVzIiwibmV3UHJvcGVydGllcyIsInRvdGFsIiwiaXRlbXNfc3VidG90YWxfcHJpY2UiLCJub3RlIiwicmVtb3ZlUHJvZHVjdHMiLCJjb25zb2xlIiwibG9nIiwiYWRkT25SZW1vdmUiLCJpdGVtIiwicGFyZW50SXRlbSIsImZpbmQiLCJmZXRjaCIsIlNob3BpZnkiLCJyb3V0ZXMiLCJyb290IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidXBkYXRlcyIsImNhdGNoIiwidXBkYXRlSXRlbSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImNhcnRUb3RhbCIsIml0ZW1fY291bnQiLCJ1cGRhdGVOb3RlIiwidGFyZ2V0Iiwic2V0SGVhZGVySGVpZ2h0IiwiaGVhZGVySGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImZvb3RlckhlaWdodCIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0IiwiY3VycmVuY3kiLCJpc0VxdWFsIiwiY3VycmVudFZhcmlhbnQiLCJ2YXJpYW50cyIsImxpbmVyU3luYyIsInZhcmlhbnRJZCIsInNlbGVjdGVkQWRkT25Qcm9kdWN0cyIsImhhc0xpbmVyIiwidmFyaWFudCIsIm9iaiIsImFkZE9uUHJpY2UiLCJsZW5ndGgiLCJhY3R1YWxQcmljZSIsIm9yaWdpbmFsUHJpY2UiLCJjb21wYXJlX2F0X3ByaWNlIiwibWVzc2FnZSIsImN1cnJlbnRPcHRpb25zIiwiaSIsIm5hbWUiLCJoYW5kbGVBZGRPbiIsInNlbGVjdGVkQWRkT25zIiwidXBkYXRlZEFkZE9ucyIsImNoZWNrU3RhdHVzIiwibGluZXJJZCIsImxpbmVyRmlsdGVyIiwic3VibWl0VGV4dCIsImRpc2FibGVkIiwiYXZhaWxhYmxlIiwiYnV0dG9uIiwiZm9ybURhdGEiLCJsaW5lciIsImxpbmVySW5mbyIsImFkZExpbmVyIiwiY2hlY2tBZGRPbnMiLCJzZWxlY3RBZGRvbiIsImNvc3QiLCJsaW5lclByaWNlIiwiaW5jcmVhc2UiLCJkZWNyZWFzZSIsInVwZGF0ZU1vbm9ncmFtIiwidmFsIiwiTW9ub2dyYW0iLCJvblN1Ym1pdCIsImpzb24iLCJyZXN1bHQiLCJsYXN0Q2FydEl0ZW0iLCJwb3AiLCJjYXJ0T3BlbiIsImFkZE9uQ2FydFByb2R1Y3RzIiwiYWxlcnQiLCJ1cGRhdGVWYXJpYW50Iiwib3B0aW9uIiwibmV3T3B0aW9ucyIsIm5ld1ZhcmlhbnQiLCJ1bmRlZmluZWQiLCJ2YXJpYW50SW1hZ2UiLCJwcm91ZGN0U3dpcGVyIiwic2xpZGVUbyIsImdldEF0dHJpYnV0ZSIsIkxvYWRlciIsImxvYWRlciIsImFwaUtleSIsInZlcnNpb24iLCJsaWJyYXJpZXMiLCJpbml0IiwibG9hZCIsImF1dG9jb21wbGV0ZSIsImdvb2dsZSIsIm1hcHMiLCJwbGFjZXMiLCJBdXRvY29tcGxldGUiLCIkcmVmcyIsImFkZHJlc3MiLCJ0eXBlcyIsImFkZExpc3RlbmVyIiwicGxhY2UiLCJnZXRQbGFjZSIsImZvcm1hdHRlZF9hZGRyZXNzIiwib25VcGRhdGUiLCJmaWVsZCIsImJ1dHRvblRleHQiLCJ1cGxvYWRpbmciLCJpbWFnZVVybCIsImVycm9yIiwidXBsb2FkSW1hZ2UiLCJmaWxlIiwiaW1hZ2VJbnB1dCIsImZpbGVzIiwidHlwZSIsInN0YXJ0c1dpdGgiLCJGb3JtRGF0YSIsImFwcGVuZCIsImRhdGUiLCJmb3JtYXREYXRlIiwicmVwbGFjZSIsInN1YnN0cmluZyIsInNob3dSZXBhaXIiLCJ1cGRhdGVSZXBhaXJQb3B1cHMiLCJpbmRleCIsImltYWdlX3VybCIsInVwZGF0ZWRQcm9wZXJ0aWVzIiwiJG5leHRUaWNrIiwicmVwYWlyRWRpdEFkZHJlc3NlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ1cGRhdGVQcm9wZXJ0eSIsInByb3BlcnR5IiwidXBkYXRlUmVwYWlyIl0sInNvdXJjZVJvb3QiOiIifQ==