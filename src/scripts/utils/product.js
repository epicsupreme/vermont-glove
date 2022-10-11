import * as cart from '@shopify/theme-cart'
import * as currency from '@shopify/theme-currency'
import { cartUpdateAll } from '../utils/cart'
import { isEqual } from 'lodash'

export default (product) => {
  // console.log("product", product);
  const currentVariant = product.product.variants[0]
  const variants = product.product.variants
  const linerSync = product.linerSync

  const price = (variantId, selectedAddOnProducts, hasLiner) => {
    // console.log(selectedAddOnProducts);
    const variant = variants.filter((obj) => obj.id === variantId)[0]
    let addOnPrice = 0
    if (selectedAddOnProducts.length > 0) {
      selectedAddOnProducts.forEach((e) => {
        addOnPrice = addOnPrice + e.price
      })
    }

    if (hasLiner) {
      addOnPrice = addOnPrice + hasLiner
    }

    return {
      actualPrice: '$' + (variant.price + addOnPrice) / 100,
      originalPrice: variant.compare_at_price
        ? '$' + (variant.compare_at_price + addOnPrice) / 100
        : '',
      message: '',
    }
  }

  const currentOptions = (variantId) => {
    const variant = variants.filter((obj) => obj.id === variantId)[0]
    const currentOptions = product.product.options.map((e, i) => {
      return {
        name: e,
        value: variant.options[i],
      }
    })
    return currentOptions
  }

  const handleAddOn = (id, selectedAddOns, price) => {
    let updatedAddOns = selectedAddOns
    const checkStatus = selectedAddOns.filter((obj) => obj.id === id)
    if (checkStatus.length > 0) {
      updatedAddOns = selectedAddOns.filter((obj) => obj.id != id)
    } else {
      updatedAddOns.push({
        id: id,
        qty: 1,
        price: price,
      })
    }
    return updatedAddOns
  }

  const linerId = (variant) => {
    // console.log("liner", linerSync)
    // console.log("variant", variant)
    const linerFilter = product.linerSync.find((obj) => {
      return obj.variantId === variant
    })
    // console.log("liner", linerFilter)
    return linerFilter ? linerFilter : null
    // return null
  }

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
      qty: 1,
    },

    liner: {
      linerInfo: linerId(currentVariant.id),
      addLiner: false,
    },

    properties: {},

    //form actions
    checkAddOns(id) {
      const checkStatus = this.selectedAddOnProducts.filter(
        (obj) => obj.id === id
      )
      if (checkStatus.length > 0) {
        return true
      } else {
        return false
      }
    },
    selectAddon(id, selectedAddOns, cost) {
      this.selectedAddOnProducts = handleAddOn(id, selectedAddOns, cost)
      this.price = price(
        this.formData.id,
        this.selectedAddOnProducts,
        this.liner.addLiner ? this.liner.linerInfo.linerPrice : false
      )
      // console.log(handleAddOn(id, selectedAddOns))
    },
    increase() {
      this.formData.qty = this.formData.qty + 1
    },
    decrease() {
      this.formData.qty =
        this.formData.qty - 1 === 0 ? 1 : this.formData.qty - 1
    },
    updateMonogram(val) {
      console.log(val)
      if (val) {
        this.properties = {
          Monogram: val,
        }
      } else {
        this.properties = {}
      }
    },
    onSubmit() {
      this.button = 'Adding...'
      this.disabled = true
      fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: this.formData.id,
              quantity: this.formData.qty,
              properties: this.properties,
            },
          ],
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          const lastCartItem = result.items.pop()

          console.log('last cart item', lastCartItem)
          console.log('line', this.liner)

          if (this.selectedAddOnProducts.length < 1 && !this.liner.addLiner) {
            cart.getState().then((state) => {
              cartUpdateAll(state)
              this.button = 'Add to Cart'
              this.disabled = false
              this.selectedAddOnProducts = []
              window.dispatchEvent(
                new CustomEvent('updatecartstatus', {
                  detail: { cartOpen: true },
                })
              )
            })
          } else {
            const addOnCartProducts = []

            if (this.liner.addLiner) {
              console.log('liner')
              addOnCartProducts.push({
                id: this.liner.linerInfo.linerId,
                qty: this.formData.qty,
                properties: {
                  _cartParent: lastCartItem.key,
                },
              })
            }

            if (this.selectedAddOnProducts.length > 0)
              this.selectedAddOnProducts.forEach((e) => {
                addOnCartProducts.push({
                  id: e.id,
                  qty: 1,
                  properties: {
                    _cartParent: lastCartItem.key,
                  },
                })
              })

            fetch(window.Shopify.routes.root + 'cart/add.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                items: addOnCartProducts,
              }),
            })
              .then(() => {
                cart.getState().then((state) => {
                  cartUpdateAll(state)
                  this.button = 'Add to Cart'
                  this.disabled = false
                  this.selectedAddOnProducts = []
                  window.dispatchEvent(
                    new CustomEvent('updatecartstatus', {
                      detail: { cartOpen: true },
                    })
                  )
                })
              })
              .catch((e) => {
                // console.log(e)
                alert(`This product is unavailable at the moment`)
                this.button = 'Unavailable'
                this.disabled = true
              })
          }
        })
        .catch((e) => {
          // console.log(e)
          alert(`This product is unavailable at the moment`)
          this.button = 'Unavailable'
          this.disabled = true
        })
    },
    addLiner() {
      this.liner.addLiner = !this.liner.addLiner
      this.price = price(
        this.formData.id,
        this.selectedAddOnProducts,
        this.liner.addLiner ? this.liner.linerInfo.linerPrice : false
      )
    },
    updateVariant(value, option) {
      const options = this.options
      const newOptions = options.map((e) => {
        return e.name == option ? value : e.value
      })

      const newVariant = variants.filter((variant) => {
        return isEqual(variant.options, newOptions)
      })[0]

      // console.log(newVariant);

      ;(this.liner.linerInfo = linerId(newVariant.id)),
        (this.price = price(
          newVariant.id,
          this.selectedAddOnProducts,
          this.liner.addLiner ? this.liner.linerInfo.linerPrice : false
        ))
      this.formData.id = newVariant.id
      this.disabled = newVariant.available ? false : true
      this.button = newVariant.available ? 'Add to Cart' : 'Unavailable'
      this.options = currentOptions(newVariant.id)
    },
  }
}
