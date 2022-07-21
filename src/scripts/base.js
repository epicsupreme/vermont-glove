import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'

import product from './utils/product'

import './utils/header-height'
import './utils/cart'
import './animations/header'

Alpine.plugin(collapse)

Alpine.data('product', product)

window.Alpine = Alpine

Alpine.start()
