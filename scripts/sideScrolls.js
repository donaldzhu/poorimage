class SideScrolls {
  constructor() {
    this.sideNodes = selectDomArray('.side')
  }

  setDimensions() {
    for (let i = 0; i < this.sideNodes.length; i++) {
      const sideNode = this.sideNodes[i]
      const height = this.getHeight(sideNode)
      Object.assign(sideNode.parentElement.style, {
        height: (vh() + height) + 'px',
        top: -height + 'px',
        width: '',
        left: ''
      })
    }
  }

  getHeight(sideNode) {
    const { firstElementChild, lastElementChild } = sideNode
    return lastElementChild.getBoundingClientRect().bottom -
      firstElementChild.getBoundingClientRect().top
  }
}