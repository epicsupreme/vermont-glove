import { convertColorVariables } from '@mertasan/tailwindcss-variables/src/helpers'
import * as cart from '@shopify/theme-cart'

cart.getState().then((state) => {
  console.log(state)
  cartUpdateAll(state)
})

function cartToAlpine(state) {
  let products = []
  if (state.items) {
    state.items.forEach((e) => {
      let f = e.featured_image.url

      // if (e.featured_image.url) {
      //   let filename = e.featured_image.url
      //     .replace(/\?.*$/, '')
      //     .replace(/.*\//, '')
      //   let newFilename = filename.replace(/\.[^/.]+$/, '_300x.jpg')
      //   f = e.featured_image.url.replace(filename, newFilename)
      // }

      const realPrice = e.price / 100

      const addOnProducts = state.items.map(p => {
        if(p.properties["cartParent"] === e.key) {
          return {
            title: p.product_title,
            key: p.key,
            price: p.price / 100,
            id: p.variant_id,
            options: p.options_with_values,
            image: p.featured_image.url,
            qty: p.quantity,
            properties: p.properties,
            remove() {
              cartRemoveItem(this.key)
            },
            update(qty) {
              cartUpdateItem(this.key, parseInt(qty))
            },
          }
        }
        return false;
      })

      console.log(addOnProducts)

      if(!e.properties["cartParent"]) {

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
          remove() {
            cartRemoveItem(this.key)
          },
          update(qty) {
            cartUpdateItem(this.key, parseInt(qty))
          },
        })

      }
    })
  }

  return {
    total: state.items_subtotal_price / 100,
    products: products,
    note: state.note,
  }
}

function cartRemoveItem(key) {
  cart.removeItem(key).then((state) => {
    cartUpdateAll(state)
  })
}

function cartUpdateItem(key, qty) {
  cart.updateItem(key, { quantity: qty }).then((state) => {
    cartUpdateAll(state)
  })
}

export function cartUpdateAll(state) {
  window.dispatchEvent(
    new CustomEvent('updateproducts', {
      detail: { cart: cartToAlpine(state) },
    })
  )
  window.dispatchEvent(
    new CustomEvent('updatecartcount', {
      detail: { cartTotal: state.item_count },
    })
  )
}

window.addEventListener('cartUpdate', (e) => {
  cart.updateNote(e.target.value)
})
