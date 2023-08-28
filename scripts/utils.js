const vh = (value = 100) => window.innerHeight / 100 * value
const vw = (value = 100) => window.innerWidth / 100 * value
const windowRatio = () => vw() / vh()