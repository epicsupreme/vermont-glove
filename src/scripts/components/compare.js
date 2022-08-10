import Swiper, { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

document.querySelectorAll('.compare.swiper')?.forEach((slider) => {
  const compareSwiper = new Swiper(slider, {
    modules: [FreeMode],
    slidesPerView: 1.5,
    spaceBetween: 20,
    freeMode: true,
    centeredSlides: true,
    breakpoints: {
      768: {
        freeMode: false,
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: false,
      },
    },
  })
})
