import Swiper, { Navigation, Pagination } from 'swiper'
import hcSticky from 'hc-sticky'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = document.querySelector('#product-images .swiper')

const proudctSwiper = new Swiper(slides, {
  modules: [Navigation, Pagination],
  loop: true,

  pagination: {
    el: '.swiper-pagination',
  },

})

var Sticky = new hcSticky('.product-images', {
  stickTo: '.product-container',
  top: 176,
  responsive: {
    768: {
      disable: true,
    },
  },
})

// slider.querySelector(".featured-slider-prev").addEventListener("click", () => {
//   featuredProductSwiper.slidePrev();
// });

// slider.querySelector(".featured-slider-next").addEventListener("click", () => {
//   featuredProductSwiper.slideNext();
// });
