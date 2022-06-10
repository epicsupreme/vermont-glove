import * as cart from '@shopify/theme-cart'
// import * as product from '@shopify/theme-product';
import { cartUpdateAll } from '../utils/cart'
import { isEqual } from 'lodash'

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
      id: productJson.variants[0].id,
    },
    qtyChange(qty) {
      this.formData.qty = qty
    },
    onSubmit() {
      this.button = 'Adding to Cart...'
      this.disabled = true
      cart
        .addItem(this.formData.id, { quantity: this.formData.qty })
        .then(() => {
          cart.getState().then((state) => {
            cartUpdateAll(state)
            this.button = 'Add to Cart'
            this.disabled = false
            window.dispatchEvent(
              new CustomEvent('updatecartstatus', {
                detail: { cartOpen: true },
              })
            )
          })
        })
        .catch(() => {
          alert(`This product is unavailable at the moment`)
          this.button = 'Unavailable'
          this.disabled = true
        })
    },
    update(option, index) {
      // console.log(option, parseInt(index))
      // this.options[parseInt(index)] = option
      // const oldOptions = this.options
      // oldOptions[parseInt(index)] = option
      // console.log(this.options)
      // const a = Array.from(oldOptions)
      let optionsArray = []
      const productForm = document.getElementById('product-form')
      productForm.querySelectorAll(`[name*=options]`).forEach((e) => {
        if (e.tagName === 'SELECT') {
          optionsArray.push(e.value)
        } else {
          if (e.checked) {
            optionsArray.push(e.value)
          }
        }
      })
      // console.log(optionsArray)
      const variant = getVariantFromOptionArray(
        this.product.variants,
        optionsArray
      )
      // console.log(variant)
      // console.log(productJson.variants)

      if (variant) {
        this.formData.id = variant.id
        this.price = variant.price / 100
        if (!variant.available) {
          this.disabled = true
          this.button = 'Sold Out'
        } else {
          this.disabled = false
          this.button = 'Add to Cart'
        }
      } else {
        this.formData.id = null
        // this.price = variant.price / 100
        this.disabled = true
        this.button = 'Unavailable'
      }
    },
  }
}

function getVariantFromOptionArray(product, opts) {
  console.log(product)

  var result = product.filter((v) => {
    console.log(v.options)
    console.log(opts)
    console.log(isEqual(v.options, opts))
    return isEqual(v.options, opts)
  })

  // console.log(result)

  return result[0] || null
}

// function arrayEquals(a, b) {
//   return Array.isArray(a) &&
//     Array.isArray(b) &&
//     a.length === b.length &&
//     a.every((val, index) => val === b[index]);
// }
