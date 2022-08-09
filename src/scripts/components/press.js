import Swiper from 'swiper'
import 'swiper/css'

const pressSwiper = new Swiper('.press-swiper.swiper', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  centeredSlides: true,
  breakpoints: {
    1024: {
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
})
