class Citation {
  constructor() {
    this.inlineCitations = selectDomArray('.inline-citation')
    this.sideCitations = selectDomArray('.side-citation')

    this.inlineCitation15 = this.inlineCitations.splice(14, 2) // [15a, 15b]
    this.sideCitation15 = this.sideCitations.splice(14, 1)[0] // 15

    this.toggleStyles = {
      highlight: ['backgroundColor', 'yellow', ''],
      animation: ['animation-play-state', 'paused', 'running']
    }
  }

  init() {
    const citationWrapper = document.querySelector('#citation-wrapper')
    const intro = document.querySelector('#intro')

    for (let i = 0; i < this.inlineCitations.length; i++)
      this.initHighlightListeners(this.inlineCitations[i], this.sideCitations[i])
    this.initHighlightListeners(...this.inlineCitation15, this.sideCitation15)

    this.initListener([...this.inlineCitations, ...this.inlineCitation15, citationWrapper], citationWrapper, this.toggleStyles.animation)
    this.initListener(intro, intro, this.toggleStyles.animation)
  }

  initListener(listenedNodes, callbackTargets, ...handlerArgs) {
    const events = ['mouseover', 'mouseout']
    for (let i = 0; i < events.length; i++)
      this.registerHoverListener(listenedNodes, callbackTargets, events[i], ...handlerArgs)
  }

  registerHoverListener(listenedNodes, callbackTargets, event, toggleStyle) {
    listenedNodes = arrayify(listenedNodes)
    callbackTargets = arrayify(callbackTargets)
    const [styleName, mouseOverStyle, mouseOutStyle] = toggleStyle

    const style = event === 'mouseover' ? mouseOverStyle : mouseOutStyle
    for (let i = 0; i < listenedNodes.length; i++)
      listenedNodes[i].addEventListener(event, () => {
        for (let i = 0; i < callbackTargets.length; i++)
          callbackTargets[i].style[styleName] = style
      })
  }

  initHighlightListeners(...highlightElemGroup) {
    for (let i = 0; i < highlightElemGroup.length; i++)
      this.initListener(
        highlightElemGroup[i],
        highlightElemGroup,
        this.toggleStyles.highlight
      )
  }
}