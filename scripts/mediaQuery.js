class MediaQuery {
  constructor() {
    this.lastIsMobile = null
    this.currentIsMobile = this.isMobiles

    this.vwBreakPoint = 768
    this.blockerElem = document.querySelector('#mobile-blocker')
    this.blockerClassName = 'blocked'
  }

  check() {
    const lastIsMobile = this.lastIsMobile = this.currentIsMobile
    const currentIsMobile = this.currentIsMobile = this.isMobile

    if (currentIsMobile)
      controls.pause()
    else {
      if (lastIsMobile) controls.resume()
      scatter()
    }

    this.blockerElem.className = currentIsMobile ? this.blockerClassName : ''
  }

  get isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth <= this.vwBreakPoint
  }
}