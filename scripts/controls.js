class Controls {
  constructor() {
    this.isEnabled = false
    this.eventHandlers = {
      t: [this.pause, 'Paused.'],
      e: [this.resume, 'Resumed.'],
      n: [this.next, 'Next.'],
      c: [this.clear, 'Cleared.'],
    }
  }

  listen() {
    document.addEventListener('keydown', ({ metaKey, key }) => {
      if (!this.isEnabled) {
        if (metaKey && key == 'e') this.isEnabled = true
        return
      }

      for (let i = 0, keys = Object.keys(this.eventHandlers); i < keys.length; i++)
        if (key === keys[i]) {
          this.eventHandlers[key][0].call(this)
          this.log(this.eventHandlers[key][1])
        }
    })
  }

  pause() {
    clearTimeout(spawnFactory.timeoutId)
    spawnFactory.timeoutId = undefined
  }

  resume() {
    this.pause()
    spawnFactory.loop()
  }

  next() {
    spawnFactory.populate()
  }

  clear() {
    spawnFactory.cleanup(spawnFactory.spawns.length)
    spawnFactory.nextId = 0
  }

  log(message) {
    console.log(`%c${message}`, 'font-style: italic; color: gray; padding-left: 1.5em;')
  }
}