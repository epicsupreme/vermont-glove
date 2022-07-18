import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const slides = document.querySelector("#product-images .swiper");

const proudctSwiper = new Swiper(slides, {
  modules: [Navigation],
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// slider.querySelector(".featured-slider-prev").addEventListener("click", () => {
//   featuredProductSwiper.slidePrev();
// });

// slider.querySelector(".featured-slider-next").addEventListener("click", () => {
//   featuredProductSwiper.slideNext();
// });
