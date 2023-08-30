const vh = (value = 100) => window.innerHeight / 100 * value
const vw = (value = 100) => window.innerWidth / 100 * value
const windowRatio = () => vw() / vh()

const parseRandomArgs = (a, b) => {
  if (Array.isArray(a)) {
    if (a.length === 2) return a
    else if (a.length === 1) return [0, a[0]]
  }
  else if (!b && b !== 0) return [0, !a && a !== 0 ? 1 : a]
  else return [a, b]
}

const randomFloat = (a, b) => {
  let args = parseRandomArgs(a, b) // [min, max]
  return Math.random() * (args[1] - args[0]) + args[0]
}

// [min, max)
const randomInt = (a, b) => {
  let args = parseRandomArgs(a, b) // [min, max]
  args[0] = Math.ceil(args[0])
  args[1] = Math.floor(args[1])
  return Math.floor(Math.random() * (args[1] - args[0]) + args[0])
}

const mainForEach = callback => {
  const main = Array.from(document.querySelectorAll('.main'))
  for (let index = 0; index < main.length; index++)
    callback(main[index], index)
}

const selectDomArray = query => Array.from(document.querySelectorAll(query))

const arrayify = possibleArray => Array.isArray(possibleArray) ? possibleArray : [possibleArray]