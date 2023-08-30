class SpawnFactory {
  constructor() {
    this.spawns = []
    this.nextId = 0
    this.interval = undefined
    this.timeoutId = undefined

    this.setTime()
  }

  setTime() {
    this.interval = randomInt(MIN_INTERVAL, MAX_INTERVAL)
  }

  loop() {
    this.timeoutId = setTimeout(() => {
      this.populate()
      this.setTime()
      this.loop()
    }, this.interval)
  }

  populate() {
    const SpawnType = (draggable.isDragging || Math.random() >= 0.5) ? Img : Screenshot
    const spawnInstance = new SpawnType(this.nextId, this.getProgressivePosition())
    spawnInstance.create()
    this.spawns.push(spawnInstance)
    this.nextId++
    if (this.spawns.length >= MAX_SPAWN_COUNT) this.cleanup()
  }

  getProgressivePosition() {
    const { MAX_AMOUNT, STARTING_POSITIONS, ACCUMULATOR } = PROGRESSIVE_POSITION
    return STARTING_POSITIONS.map(bounds =>
      randomFloat(
        bounds.map((bound, i) =>
          bound + ACCUMULATOR[i] * Math.min(MAX_AMOUNT, this.spawns.length))
      )
    )
  }

  cleanup(amount = CLEAR_SPAWN_COUNT) {
    for (let i = 0; i < amount; i++) {
      const removedSpawn = this.spawns.shift()
      document.getElementById(removedSpawn.id).remove()
    }
  }
}