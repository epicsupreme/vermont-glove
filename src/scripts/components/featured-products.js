import Swiper from 'swiper'
import 'swiper/css'

document.querySelectorAll('.featured-slider')?.forEach((slider) => {
  const slides = slider.querySelector('.swiper')

  const featuredProductSwiper = new Swiper(slides, {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  })
})
