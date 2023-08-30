class Draggable {
  constructor() {
    this.isDragging = false
  }

  set() {
    const stack = '#wrapper div'
    $(stack).draggable({
      start: () => this.isDragging = true,
      stop: () => { this.isDragging = false },
      stack
    })
  }
}