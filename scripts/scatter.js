// scatters main sections onload

class Scatter {
  constructor() {
    this.runned = undefined
  }

  onload() {
    if (media.isVertical()) return
    const { top, left } = positionsData[randomInt(positionsData.length)]
    mainForEach(({ style }, i) => {
      style.top = `${vh(top[i] * (2 / windowRatio()))}px`
      style.left = `${vw(left[i])}px`
    })
    this.runned = true
  }
}