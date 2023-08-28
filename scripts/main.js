let amount = 0
let dragging = false
let consoleLogging = false
const main = Array.from(document.querySelectorAll('.main'))
const wrapper = document.querySelector('#wrapper')


const imageWrapper = document.getElementById('image-wrapper')
class Screenshot extends Spawn {
    constructor(type) {
        super(type)
        this.width = `${Math.floor(vw(Math.random() * (40 - 7.5) + 7.5))}px`
        this.height = `${vw(Math.floor(Math.random() * (40 - 7.5) + 7.5) * (2.5 / media.windowRatio()))}px`
    }
    assign() {
        html2canvas(wrapper, {
            onrendered: canvas => {
                this.hold.call(this, 'screenshot', canvas)
                canvas.toDataURL()
            },
        })
    }
}

const totalNumOfImg = 65
class Images extends Spawn {
    constructor(type) {
        super(type)
        this.imgNum = Math.round(Math.random() * (totalNumOfImg - 1) + 1)
        this.src = `images/${this.imgNum}.jpg`
        this.width = `${(vw(Math.random() * (1.25 - 0.9) + 0.9) * 20)}px`
    }
    assign() {
        this.hold.call(this, 'images', null)
    }
}


function draggableSet() {
    $('#wrapper div').draggable({
        start: () => {
            dragging = true
        },
        stop: () => {
            dragging = false
        },
        stack: '#wrapper div',
    })
};

class SideAnimation {
    constructor(elem) {
        this.elem = document.getElementById(elem)
        this.container = this.elem.parentElement
        this.height = () => {
            const top = this.elem.firstElementChild.getBoundingClientRect().top
            const bottom = this.elem.lastElementChild.getBoundingClientRect().bottom
            return bottom - top
        }
        this.top = () => 0 - this.height()
        this.bottom = () => vh()
        this.width = () => {
            const left = this.elem.firstElementChild.getBoundingClientRect().left
            const right = this.elem.lastElementChild.getBoundingClientRect().right
            return right - left
        }
        this.left = () => 0 - this.width()
        this.right = () => vw()
        this.innerHTML = this.elem.innerHTML
    }
    assign() {
        media.validate() ? this.mobileContainer() : this.desktopContainer()
    }
    desktopContainer() {
        this.elem.innerHTML = this.innerHTML
        this.container.style.height = `${this.bottom() - this.top()}px`
        this.container.style.top = `${this.top()}px`
        this.container.style.width = ''
        this.container.style.left = ''
    }
    mobileContainer() {
        this.elem.innerHTML = `<p>${this.elem.innerHTML.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '')}</p>`
        this.container.style.width = `${this.right() - this.left()}px`
        this.container.style.left = `${this.left()}px`
        this.container.style.height = ''
        this.container.style.top = ''
    }
}


class Citation {
    constructor() {
        this.spanList = Array.from(document.getElementsByClassName('inline-citation'))
        this.citationList = Array.from(document.getElementsByClassName('side-citation'))
        this.spanSpliced = this.spanList.splice(14, 2)
        this.citationSpliced = this.citationList.splice(14, 1)[0]
        this.allSpan = Array.from(document.getElementsByTagName('span'))
        this.allCitations = document.getElementById('citation-wrapper')
        this.handlers = {
            hover: ['mouseover', 'mouseout'],
        }
        this.cssStyle = {
            highlight: ['backgroundColor', 'yellow', ''],
            anm: ['animation-play-state', 'paused', 'running']
        }
    }
    initialize() {
        for (let i = 0; i < this.spanList.length; i++) {
            this.multiAssign([this.spanList[i], this.citationList[i]], 'hover', 'highlight')
        }
        this.multiAssign([...this.spanSpliced, this.citationSpliced], 'hover', 'highlight')
        this.assign([...this.allSpan, citation.elem], citation.elem, 'hover', this.cssStyle.anm)
        this.assign(intro.elem, intro.elem, 'hover', this.cssStyle.anm)
    }
    assign(attached, target, handler, ...handlerArgs) {
        if (media.validate()) {
            return
        }
        let evt = this.handlers[handler]
        for (let i = 0; i < evt.length; i++) {
            this[handler](attached, target, evt[i], ...handlerArgs)
        }
    }
    hover(attached, target, evt, css, self) {
        const cssStyle = (evt == 'mouseover') ? css[1] : css[2]
        if (!Array.isArray(attached)) {
            attached = [attached]
        }
        for (let i = 0; i < attached.length; i++) {
            const a = attached[i]
            a.addEventListener(evt, () => {
                if (self) {
                    a.style[css[0]] = cssStyle
                }
                if (Array.isArray(target)) {
                    for (let i = 0; i < target.length; i++) {
                        target[i].style[css[0]] = cssStyle
                    }
                } else {
                    target.style[css[0]] = cssStyle
                }
            })

        }
    }
    multiAssign(elem, handler, ...styleNames) {
        for (let i = 0; i < elem.length; i++) {
            const targets = [...elem]
            const attached = targets.splice(i, 1)[0]
            for (let i = 0; i < styleNames.length; i++) {
                const css = styleNames[i]
                this.assign(attached, targets, handler, this.cssStyle[css], true)
            }

        }
    }
}

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

let control
document.addEventListener('keydown', e => {
    if (control) {
        for (let i = 0; i < Object.keys(control.evt).length; i++) {
            const listener = control.evt[Object.keys(control.evt)[i]]
            if (listener == e.key) {
                control[Object.keys(control.evt)[i]]()
            }
        }
    }
})

function iterate(func) {
    for (let i = 0; i < main.length; i++) {
        const s = main[i]
        func(s, i)
    }
}

document.addEventListener('keydown', e => {
    if (e.metaKey && e.key == 'e') {
        Control.enable()
    }
})

draggableSet()
const media = new Media()
const scatter = new Scatter()
const spawn = new Spawn('spawn')
const intro = new SideAnimation('intro')
const citation = new SideAnimation('citation-wrapper')
const citationEvt = new Citation()
media.report()
media.sectionMaxHeight()
media.popUp('initial')
window.addEventListener('resize', () => {
    media.mobile.cur = media.mobile.next
    media.mobile.next = media.validate()
    media.report()
    intro.assign()
    citation.assign()
})
scatter.onload()
spawn.getTime()
intro.assign()
citation.assign()
citationEvt.initialize()