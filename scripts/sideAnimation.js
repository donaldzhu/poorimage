class SideAnimation {
  constructor(elem) {
    this.elem = document.getElementById(elem)
    this.container = this.elem.parentElement
    this.height = () => {
      const top = this.elem.firstElementChild.getBoundingClientRect().top
      const bottom = this.elem.lastElementChild.getBoundingClientRect().bottom
      return bottom - top
    }
    this.top = () => 0 - this.height()
    this.bottom = () => vh()
    this.width = () => {
      const left = this.elem.firstElementChild.getBoundingClientRect().left
      const right = this.elem.lastElementChild.getBoundingClientRect().right
      return right - left
    }
    this.left = () => 0 - this.width()
    this.right = () => vw()
    this.innerHTML = this.elem.innerHTML
  }
  assign() {
    media.isVertical() ? this.mobileContainer() : this.desktopContainer()
  }
  desktopContainer() {
    this.elem.innerHTML = this.innerHTML
    this.container.style.height = `${this.bottom() - this.top()}px`
    this.container.style.top = `${this.top()}px`
    this.container.style.width = ''
    this.container.style.left = ''
  }
  mobileContainer() {
    this.elem.innerHTML = `<p>${this.elem.innerHTML.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '')}</p>`
    this.container.style.width = `${this.right() - this.left()}px`
    this.container.style.left = `${this.left()}px`
    this.container.style.height = ''
    this.container.style.top = ''
  }
}