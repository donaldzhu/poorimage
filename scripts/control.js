class Control {
  constructor() {
    this.evt = {
      terminate: 't',
      resurrect: 'e',
      next: 'n',
      clear: 'c',
    }
  }
  terminate() {
    this.log('Terminated')
    clearInterval(spawn.interval)
    alert('Terminated')
  }
  resurrect() {
    this.log('Resurrected')
    spawn.getTime()
    alert('Resurrected')
  }
  next() {
    this.log('Next')
    spawn.run()
  }
  clear() {
    this.log('Cleared.')
    const arr = document.getElementsByClassName('spawn-container')
    for (let i = 0, n = arr.length; i < n; i++) {
      arr[0].remove()
    }
    amount = 0
  }
  log(message) {
    console.log(`%c${message}`, 'font-style: italic; color: gray; padding-left: 1.5em;')
  }
  static enable() {
    control = new Control()
    Control.enable = function () {}
  }
}