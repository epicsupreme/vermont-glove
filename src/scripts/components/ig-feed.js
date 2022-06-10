import Swiper from "swiper";
import "swiper/css";

const igFeed = document.querySelector(".ig-feed-tmp > div");

const igObserver = new MutationObserver((entries) => {
  if (entries) {
    console.log(entries);
    igObserver.disconnect();

    //   const feed = entries[0].addedNodes[0];
    setTimeout(() => {
      igFeed
        .querySelectorAll(".eapps-instagram-feed-posts-item-image")
        .forEach((e) => {
          igFeed.remove();
          const feed = document.querySelector(".ig-feed .swiper-wrapper");
          const slideElement = document.createElement("div");
          const igElement = document.createElement("div");
          const igImage = new Image();
          igImage.src = e.src;
          igImage.classList.add("w-full");
          igElement.appendChild(igImage);
          slideElement.classList.add("swiper-slide");
          slideElement.appendChild(igElement);
          feed.appendChild(slideElement);
        });
      new Swiper(".ig-feed .swiper", {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 20,
      });
    }, 300);
  }
});

igObserver.observe(igFeed, { childList: true });