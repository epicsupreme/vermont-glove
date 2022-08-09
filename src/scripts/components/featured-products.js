import Swiper, { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

document.querySelectorAll('.featured-slider')?.forEach((slider) => {
  const slides = slider.querySelector('.swiper')

  const featuredProductSwiper = new Swiper(slides, {
    modules: [Pagination],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  })
})
