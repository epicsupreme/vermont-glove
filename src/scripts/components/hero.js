import Swiper, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

const heroSwiper = new Swiper(".hero-swiper .swiper", {
  modules: [Autoplay],
  loop: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});


document.addEventListener('shopify:block:deselect', function(event) {
   new Swiper(".hero-swiper .swiper", {
      modules: [Autoplay],
      loop: true,

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
 });