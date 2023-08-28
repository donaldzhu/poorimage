class Media {
  constructor() {
    this.threshold = () => (vw() > 478) ? 'above' : 'below'
    this.validate = () => windowRatio() < 1 || this.threshold() == 'below'
    this.positionLog = {
      top: [0, 0, 0, 0, 0, 0],
      left: [0, 0, 0, 0, 0, 0]
    }
    this.mobile = {
      cur: null,
      next: this.validate()
    }
  }

  report() {
    if (this.validate()) {
      if (!this.mobile.cur && this.mobile.next) {
        this.desktop2mobile()
      }
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
    iterate((s, i) => {
      this.positionLog.top[i] = s.style.top
      this.positionLog.left[i] = s.style.left
    })
    iterate((s) => {
      s.style.top = ''
      s.style.left = ''
    })
  }

  mobile2desktop() {
    clearInterval(spawn.interval)
    spawn.getTime()
    if (!scatter.runned) {
      scatter.onload()
    } else {
      iterate((s, i) => {
        s.style.top = this.positionLog.top[i]
        s.style.left = this.positionLog.left[i]
      })
    }
    $('#wrapper div').draggable('enable')
  }

  popUp(func) {
    if (this.validate()) {
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
    iterate((s) => {
      const t = s.firstElementChild.getBoundingClientRect().top
      const b = s.lastElementChild.getBoundingClientRect().bottom
      const mh = b - t
      s.style.maxHeight = this.validate() ? 'none' : `${mh}px`
    })
  }

  titleBreak() {
    const title = document.getElementById('title')
    title.innerHTML = '<h1 class="first-line">In Defense of </h1><h1 class="second-line"> the Poor Image</h1>'
  }
}