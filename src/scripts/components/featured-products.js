import Swiper from 'swiper'
import 'swiper/css'

document.querySelectorAll('.featured-slider')?.forEach((slider) => {
  const slides = slider.querySelector('.swiper')

  const featuredProductSwiper = new Swiper(slides, {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
  })

  slider
    .querySelector('.featured-slider-prev')
    .addEventListener('click', () => {
      featuredProductSwiper.slidePrev()
    })

  slider
    .querySelector('.featured-slider-next')
    .addEventListener('click', () => {
      featuredProductSwiper.slideNext()
    })
})
