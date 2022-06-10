setHeaderHeight()

function setHeaderHeight() {
  const headerHeight = document.getElementById('header').offsetHeight
  document.body.style.setProperty('--header-height', `${headerHeight}px`)
  const footerHeight = document.getElementById('footer').offsetHeight
  document.body.style.setProperty('--footer-height', `${footerHeight}px`)
  const windowHeight = window.innerHeight
  document.body.style.setProperty('--window-height', `${windowHeight}px`)
}

window.addEventListener('resize', setHeaderHeight)
