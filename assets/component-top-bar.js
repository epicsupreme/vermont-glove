/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./src/scripts/components/top-bar.js ***!
  \*******************************************/
// import "../utils/header-height";
window.topBar = function () {
  // console.log(productJson);
  return {
    active: true,
    close: function close() {
      this.active = false;
      setTimeout(function () {
        var headerHeight = document.getElementById('header').offsetHeight;
        document.body.style.setProperty('--header-height', "".concat(headerHeight, "px"));
      }, 200);
    }
  };
};
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXRvcC1iYXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUVBQSxNQUFNLENBQUNDLE1BQVAsR0FBZ0IsWUFBTTtFQUNwQjtFQUNBLE9BQU87SUFDTEMsTUFBTSxFQUFFLElBREg7SUFFTEMsS0FGSyxtQkFFRztNQUNOLEtBQUtELE1BQUwsR0FBYyxLQUFkO01BQ0FFLFVBQVUsQ0FBQyxZQUFNO1FBQ2YsSUFBTUMsWUFBWSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLFlBQXZEO1FBQ0FGLFFBQVEsQ0FBQ0csSUFBVCxDQUFjQyxLQUFkLENBQW9CQyxXQUFwQixDQUFnQyxpQkFBaEMsWUFBc0ROLFlBQXREO01BQ0QsQ0FIUyxFQUdQLEdBSE8sQ0FBVjtJQUlEO0VBUkksQ0FBUDtBQVVELENBWkQsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VwaWNzdXByZW1lLXNob3BpZnkvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RvcC1iYXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IFwiLi4vdXRpbHMvaGVhZGVyLWhlaWdodFwiO1xuXG53aW5kb3cudG9wQmFyID0gKCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0SnNvbik7XG4gIHJldHVybiB7XG4gICAgYWN0aXZlOiB0cnVlLFxuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKS5vZmZzZXRIZWlnaHRcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oZWFkZXItaGVpZ2h0JywgYCR7aGVhZGVySGVpZ2h0fXB4YClcbiAgICAgIH0sIDIwMClcbiAgICB9LFxuICB9XG59XG4iXSwibmFtZXMiOlsid2luZG93IiwidG9wQmFyIiwiYWN0aXZlIiwiY2xvc2UiLCJzZXRUaW1lb3V0IiwiaGVhZGVySGVpZ2h0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9mZnNldEhlaWdodCIsImJvZHkiLCJzdHlsZSIsInNldFByb3BlcnR5Il0sInNvdXJjZVJvb3QiOiIifQ==