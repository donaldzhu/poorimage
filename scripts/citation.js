class Citation {
  constructor() {
    this.spanList = Array.from(document.getElementsByClassName('inline-citation'))
    this.citationList = Array.from(document.getElementsByClassName('side-citation'))
    this.spanSpliced = this.spanList.splice(14, 2)
    this.citationSpliced = this.citationList.splice(14, 1)[0]
    this.allSpan = Array.from(document.getElementsByTagName('span'))
    this.allCitations = document.getElementById('citation-wrapper')
    this.handlers = {
      hover: ['mouseover', 'mouseout'],
    }
    this.cssStyle = {
      highlight: ['backgroundColor', 'yellow', ''],
      anm: ['animation-play-state', 'paused', 'running']
    }
  }
  initialize() {
    for (let i = 0; i < this.spanList.length; i++) {
      this.multiAssign([this.spanList[i], this.citationList[i]], 'hover', 'highlight')
    }
    this.multiAssign([...this.spanSpliced, this.citationSpliced], 'hover', 'highlight')
    this.assign([...this.allSpan, citation.elem], citation.elem, 'hover', this.cssStyle.anm)
    this.assign(intro.elem, intro.elem, 'hover', this.cssStyle.anm)
  }
  assign(attached, target, handler, ...handlerArgs) {
    if (media.isVertical()) {
      return
    }
    let evt = this.handlers[handler]
    for (let i = 0; i < evt.length; i++) {
      this[handler](attached, target, evt[i], ...handlerArgs)
    }
  }
  hover(attached, target, evt, css, self) {
    const cssStyle = (evt == 'mouseover') ? css[1] : css[2]
    if (!Array.isArray(attached)) {
      attached = [attached]
    }
    for (let i = 0; i < attached.length; i++) {
      const a = attached[i]
      a.addEventListener(evt, () => {
        if (self) {
          a.style[css[0]] = cssStyle
        }
        if (Array.isArray(target)) {
          for (let i = 0; i < target.length; i++) {
            target[i].style[css[0]] = cssStyle
          }
        } else {
          target.style[css[0]] = cssStyle
        }
      })

    }
  }
  multiAssign(elem, handler, ...styleNames) {
    for (let i = 0; i < elem.length; i++) {
      const targets = [...elem]
      const attached = targets.splice(i, 1)[0]
      for (let i = 0; i < styleNames.length; i++) {
        const css = styleNames[i]
        this.assign(attached, targets, handler, this.cssStyle[css], true)
      }

    }
  }
}