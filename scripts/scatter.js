let scattered = false
const scatter = () => {
  if (scattered) return
  const { top, left } = positionsData[randomInt(positionsData.length)]
  mainForEach(({ style }, i) => {
    style.top = `${vh(top[i] * (2 / windowRatio()))}px`
    style.left = `${vw(left[i])}px`
  })
  scattered = true
}