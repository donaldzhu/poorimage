class Media {
  constructor() {
    this.threshold = () => (vw() > 478) ? 'above' : 'below'
    this.isVertical = () => {
      windowRatio() < 1 || this.threshold() == 'below'
      return false
    }

    const defaultPositions = Array(6).fill(0)
    this.positionLog = {
      top: [...defaultPositions],
      left: [...defaultPositions]
    }
    this.mobile = {
      cur: null,
      next: this.isVertical()
    }
  }

  report() {
    if (this.isVertical()) {
      if (!this.mobile.cur && this.mobile.next)
        this.desktop2mobile()
      $('#wrapper div').draggable('disable')
      clearInterval(spawn.interval)
    } else if (this.mobile.cur && !this.mobile.next) {
      this.mobile2desktop()
    }
    this.sectionMaxHeight()
    this.popUp()
    this.titleBreak()
  }

  desktop2mobile() {
    mainForEach(({ style }, i) => {
      this.positionLog.top[i] = style.top
      this.positionLog.left[i] = style.left
      style.top = ''
      style.left = ''
    })
  }

  mobile2desktop() {
    clearInterval(spawn.interval)
    spawn.getTime()
    if (!scatter.runned) scatter.onload()
    else mainForEach(({ style }, i) => {
      style.top = this.positionLog.top[i]
      style.left = this.positionLog.left[i]
    })

    $('#wrapper div').draggable('enable')
  }

  popUp(func) {
    if (this.isVertical()) {
      if (func == 'initial') {
        document.getElementById('pop-up').style.display = 'flex'
        document.getElementById('shade').style.display = 'block'
        document.addEventListener('keydown', (e) => {
          if (e.key == 'Enter') {
            this.popUp('confirm')
          }
        })
      } else if (func == 'confirm') {
        document.getElementById('pop-up').style.display = 'none'
        document.getElementById('shade').style.display = 'none'
      }
    } else {
      document.getElementById('pop-up').style.display = 'none'
      document.getElementById('shade').style.display = 'none'
    }
  }

  sectionMaxHeight() {
    mainForEach(({ firstElementChild, lastElementChild, style }) => {
      const { top } = firstElementChild.getBoundingClientRect()
      const { bottom } = lastElementChild.getBoundingClientRect()
      style.maxHeight = this.isVertical() ? 'none' : `${bottom - top}px`
    })
  }

  titleBreak() {
    const title = document.getElementById('title')
    title.innerHTML = '<h1 class="first-line">In Defense of </h1><h1 class="second-line"> the Poor Image</h1>'
  }
}