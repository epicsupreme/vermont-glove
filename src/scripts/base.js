import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import { subscribe } from 'klaviyo-subscribe'

import product from './utils/product'
import productRepair from './utils/productRepair'

import './utils/header-height'
import './utils/cart'
// import './animations/header'

import repairPopups from './utils/repairPopups'
import singleRepairPopup from './utils/singleRepairPopup'

Alpine.plugin(collapse)

Alpine.data('product', product)
Alpine.data('productRepair', productRepair)
Alpine.data('repairPopups', repairPopups)
Alpine.data('singleRepairPopup', singleRepairPopup)

window.Alpine = Alpine

Alpine.start()

const looxContainer = document.querySelector('#looxReviews')
looxContainer?.classList.add('scroll-mt-40')

const footerSubscibe = document.getElementById('footer-subscribe')

footerSubscibe.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = document.getElementById('footer-subscribe-email')

  subscribe('XAGAvA', email.value).then((response) => {
    email.value = ''
    document.querySelector('.email-message').innerHTML =
      'Thank you for signing up!'
  })
})
