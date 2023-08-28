class Spawn {
  constructor(type) {
    this.type = type
    this.time = 2000
    this.maxTime = 6500
    this.minTime = 5000
    this.interval
    this.id = `${type}-${amount}`
    this.holderId = `spawn-${amount}`
    this.position = this.setPosition()
  }
  getTime() {
    if (media.validate()) {
      return
    }
    this.interval = setTimeout(() => {
      this.run()
      this.getTime()
    }, this.time)
    this.time = Math.round(Math.random() * (this.maxTime - this.minTime) + this.minTime)
    //console.log(`%c The current interval is: ${this.time / 1000} seconds`, 'color: gray; font-style: italic')
  }
  run() {
    if (dragging) {
      this.create(Images)
    } else {
      this.create(Math.random() < 0.5 ? Screenshot : Images)
    }
    amount++
    if (amount >= 50) {
      this.clear()
    }
  }
  create(type) {
    const name = type.name.toLowerCase()
    const s = new type(name)
    s.assign()
  }
  setPosition() {
    const cond = [0, 7, 21]
    const result = {
      top: [
        [43, 18.5],
        [56.5, 12.5],
        [62.5, 6.25]
      ],
      left: [
        [60, 15.6],
        [70, 7.8],
        [78, 2.5]
      ]
    }
    const validation = cond.findIndex(n => amount >= n)
    const match = para => result[para][validation]
    const top = Math.floor(Math.random() * (match('top')[0] - match('top')[1]) + match('top')[1])
    const left = Math.floor(Math.random() * (match('left')[0] - match('left')[1]) + match('left')[1])
    return [top, left]
  }
  hold(type, node) {
    const div = document.createElement('div')
    div.classList.add('ui-widget-content', 'spawn-container')
    div.id = this.holderId
    div.style.cssText = `top: ${vh(this.position[0] * (2 / windowRatio()))}px; left:${vw(this.position[1])}px; z-index: ${amount + 7}`
    document.getElementById('wrapper').appendChild(div)
    this.place(type, node, div)
  }
  place(type, node, div) {
    let dom
    if (type == 'images') {
      const img = document.createElement('img')
      img.setAttribute('data-html2canvas-ignore', 'true')
      img.setAttribute('src', this.src)
      dom = img
    } else {
      dom = node
    }
    dom.style.width = this.width
    dom.style.height = this.height || 'auto'
    dom.id = this.id
    dom.classList.add('spawn')
    div.appendChild(dom)
    if (consoleLogging) {
      console.log(`Imported (${amount}): %c${type == 'images' ? type.slice(0, -1) : type}`,
        `color: ${type == 'images' ? '#307cbf' : '#cc2929'}`)
    }
    draggableSet()
  }
  clear() {
    amount -= 20
    for (let i = 0; i < 20; i++) {
      const dom = document.getElementById(`spawn-${i}`)
      dom.remove()
    }
  }
}