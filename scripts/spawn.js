class Spawn {
  constructor(type) {
    this.type = type
    this.time = 2000
    this.interval = undefined
    this.id = `${type}-${amount}`
    this.containerId = `spawn-${amount}`
    this.position = this.getProgressivePosition()
  }

  getTime() {
    if (media.isVertical()) return
    this.interval = setTimeout(() => {
      this.run()
      this.getTime()
    }, this.time)
    this.time = randomInt(MIN_INTERVAL, MAX_INTERVAL)
  }

  run() {
    const Type = (dragging || Math.random() >= 0.5) ? Images : Screenshot
    const name = Type.name.toLowerCase()
    const instance = new Type(name)
    instance.render()
    if (++amount >= MAX_SPAWN_COUNT) this.clear()
  }

  getProgressivePosition() {
    const { MAX_AMOUNT, STARTING_POSITIONS, ACCUMULATOR } = PROGRESSIVE_POSITION
    return STARTING_POSITIONS.map(bounds =>
      randomFloat(
        bounds.map((bound, i) =>
          bound + ACCUMULATOR[i] * Math.min(MAX_AMOUNT, amount))
      )
    )
  }

  createContainer(type, node) {
    const div = document.createElement('div')
    div.classList.add('ui-widget-content', 'spawn-container')
    div.id = this.containerId
    const [top, left] = this.position
    div.style.cssText = `
      top: ${vh(top * (2 / windowRatio()))}px;
      left:${vw(left)}px; 
      z-index: ${amount + 7}`
    wrapper.appendChild(div)
    this.place(type, node, div)
  }

  place(type, node, div) {
    let dom
    if (type === 'images') {
      const img = document.createElement('img')
      img.setAttribute('data-html2canvas-ignore', 'true')
      img.setAttribute('src', this.src)
      dom = img
    } else dom = node

    dom.style.width = this.width
    dom.style.height = this.height || 'auto'
    dom.id = this.id
    dom.classList.add('spawn')
    div.appendChild(dom)
    if (consoleLogging)
      console.log(`Imported (${amount}): %c${type == 'images' ? type.slice(0, -1) : type}`,
        `color: ${type == 'images' ? '#307cbf' : '#cc2929'}`)

    draggableSet()
  }

  clear() {
    amount -= CLEAR_SPAWN_COUNT
    for (let i = 0; i < CLEAR_SPAWN_COUNT; i++)
      document.getElementById(`spawn-${i}`).remove()
  }
}

class Screenshot extends Spawn {
  constructor(type) {
    super(type)
    this.width = vw(randomFloat(7.5, 40)) + 'px'
    this.height = vw(randomFloat(7.5, 40) * (2.5 / windowRatio())) + 'px' // ??
  }

  render() {
    html2canvas(wrapper, {
      onrendered: canvas => {
        this.createContainer.call(this, 'screenshot', canvas)
        canvas.toDataURL()
      },
    })
  }
}

class Images extends Spawn {
  constructor(type) {
    super(type)
    this.src = `assets/images/${randomInt(IMAGE_AMOUNT) + 1}.jpg`
    this.width = vw(randomFloat(18, 25)) + 'px'
  }

  render() {
    this.createContainer.call(this, 'images', null)
  }
}
