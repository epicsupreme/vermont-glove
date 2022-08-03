import Swiper from "swiper";
import "swiper/css";

const pressSwiper = new Swiper(".press-swiper.swiper", {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  centeredSlides: true,
  breakpoints: {
    768: {
      slidesPerView: 4,
      centeredSlides: false,
    },
  },
});
