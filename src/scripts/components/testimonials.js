import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation"

const pressSwiper = new Swiper(".testimonial-swiper.swiper", {
   modules: [Navigation],
  loop: true,
  navigation: {
   nextEl: '.swiper-button-next',
   prevEl: '.swiper-button-prev',
 },
});
