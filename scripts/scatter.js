class Scatter {
  constructor() {
    this.composition = {
      version_1: {
        top: [-1, 16, -3, 22, 3, 6],
        left: [12.5, 24.25, 64.85, 53, 44.5, 34.25]
      },
      version_2: {
        top: [-2, 13, 22, 15, 3, -1],
        left: [49.6, 64.85, 56, 13.3, 22.7, 34.25]
      },
      version_3: {
        top: [24, 5, -14, 14, 29, -1],
        left: [39, 52, 11, 23, 61, 30]
      },
      version_4: {
        top: [10, 24, -10, 3, -5, 13],
        left: [43.75, 35, 62, 54.7, 27, 14.8]
      },
      version_5: {
        top: [1, 17, -16, 25, 8, 0],
        left: [61, 53, 43, 24, 31, 15.25]
      },
      version_6: {
        top: [0, 11, 13, 23, -8, 3],
        left: [39, 24, 66, 56, 50, 11]
      },
      version_7: {
        top: [-1, 8, -3, 2, 22, 20],
        left: [43, 34, 15, 62, 53, 26]
      },
      version_8: {
        top: [13, 24, 5, 0, 6, -3],
        left: [31, 41, 12, 66, 51, 22]
      },
      version_9: {
        top: [3, 14, -11, 8, -6, 18],
        left: [29, 44, 66, 58, 18, 12]
      }
    }
    this.version = Math.round(Math.random() * (9 - 1) + 1)
  }
  onload() {
    if (media.validate()) {
      return
    }
    const comp = this.composition[`version_${this.version}`]
    iterate((s, i) => {
      s.style.top = `${vh(comp.top[i] * (2 / windowRatio()))}px`
      s.style.left = `${vw(comp.left[i])}px`
    })
    this.runned = true
  }
}