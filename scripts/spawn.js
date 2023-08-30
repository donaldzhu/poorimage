class Spawn {
  constructor(type, id, position) {
    this.type = type
    this.id = id
    this.position = position
    this.width = undefined
    this.height = undefined

    this.spawnDomNode = undefined
    this.container = undefined
  }

  create(spawnDomNode) {
    this.spawnDomNode = spawnDomNode
    this.createContainer()
    this.placeSpawn()
  }

  createContainer() {
    const container = document.createElement('div')
    const { classList, style } = container
    classList.add('ui-widget-content', 'spawn-container')
    container.id = this.id
    const [top, left] = this.position
    Object.assign(style, {
      top: vh(top * (2 / windowRatio())) + 'px',
      left: vw(left) + 'px',
      zIndex: this.id + 7
    })

    wrapper.appendChild(container)
    this.container = container
  }

  placeSpawn() {
    let { spawnDomNode } = this
    if (this.type === 'image') {
      spawnDomNode = this.spawnDomNode = document.createElement('img')
      spawnDomNode.setAttribute('data-html2canvas-ignore', true)
      spawnDomNode.setAttribute('src', this.src)
    }

    const { style, classList } = spawnDomNode
    style.width = this.width
    style.height = this.height
    classList.add('spawn')
    this.container.appendChild(spawnDomNode)
    draggable.set()
  }
}

class Screenshot extends Spawn {
  constructor(id, position) {
    super('screenshot', id, position)
    this.width = vw(randomFloat(7.5, 40)) + 'px'
    this.height = vw(randomFloat(7.5, 40) * (2.5 / windowRatio())) + 'px'
  }

  create() {
    html2canvas(wrapper, { backgroundColor: null }).then(canvas => {
      super.create(canvas)
      canvas.toDataURL()
    })
  }
}

class Img extends Spawn {
  constructor(id, position) {
    super('image', id, position)
    this.src = `assets/images/${randomInt(IMAGE_AMOUNT) + 1}.jpg`
    this.width = vw(randomFloat(18, 25)) + 'px'
    this.height = 'auto'
  }
}
