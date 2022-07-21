// import "../utils/header-height";

window.topBar = () => {
  // console.log(productJson);
  return {
    active: true,
    close() {
      this.active = false
      setTimeout(() => {
        const headerHeight = document.getElementById('header').offsetHeight
        document.body.style.setProperty('--header-height', `${headerHeight}px`)
      }, 200)
    },
  }
}
