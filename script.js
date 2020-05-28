let amount = 0,
    dragging = false,
    consoleLogging = false;
const vh = () => window.innerHeight / 100,
    vw = () => window.innerWidth / 100;
draggableSet('#wrapper div');

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
        };
        this.version = Math.round(Math.random() * (9 - 1) + 1);
        this.windowRatio = vw() / vh();
    }
    onload() {
        const main = Array.from(document.getElementsByClassName('main'));
        const comp = this.composition[`version_${this.version}`];
        for (let i = 0; i < main.length; i++) {
            const section = main[i];
            section.style.top = `${comp.top[i] * vh() * (2/this.windowRatio)}px`;
            section.style.left = `${comp.left[i] * vw()}px`;
        }
    }
}
const scatter = new Scatter();
scatter.onload();

class Spawn {
    constructor(type) {
        this.type = type;
        this.time = 2000;
        this.maxTime = 6500;
        this.minTime = 5000;
        this.interval;
        this.id = `${type}-${amount}`
        this.holderId = `spawn-${amount}`;
        this.position = this.setPosition();
        //this.list = {};
        //this.nodeList = {};
    }
    getTime() {
        this.interval = setTimeout(() => {
            this.run();
            this.getTime()
        }, this.time);
        this.time = Math.round(Math.random() * (this.maxTime - this.minTime) + this.minTime);
        //console.log(`%c The current interval is: ${this.time / 1000} seconds`, 'color: gray; font-style: italic')
    }
    run() {
        if (dragging) {
            this.create(Images);
        } else {
            this.create(Math.random() < 0.5 ? Screenshot : Images)
        }
        amount++;
        if (amount >= 100) {
            this.clear()
        }
    }
    create(type) {
        const name = type.name.toLowerCase();
        const s = new type(name);
        s.assign();
    }
    setPosition() {
        const cond = [0, 7, 21];
        const result = {
            top: [
                [43, 18.5],
                [56.5, 12.5],
                [62.5, 6.25]
            ],
            left: [
                [60, 15.6],
                [70, 7.8],
                [78, 2.5]
            ]
        }
        const validation = cond.findIndex(n => amount >= n);
        const match = para => result[para][validation]
        const top = Math.floor(Math.random() * (match('top')[0] - match('top')[1]) + match('top')[1]);
        const left = Math.floor(Math.random() * (match('left')[0] - match('left')[1]) + match('left')[1]);
        return [top, left];
    }
    place(type, node) {
        const div = document.createElement('div');
        div.classList.add('ui-widget-content', 'spawn-container');
        div.id = this.holderId;
        div.style.cssText = `top: ${this.position[0] * vh() * (2/scatter.windowRatio)}px; left:${this.position[1] * vw()}px; z-index: ${amount + 7}`
        let dom;
        document.getElementById('wrapper').appendChild(div);    
        if (type == 'images') {
            const img = document.createElement('img')
            img.setAttribute('data-html2canvas-ignore', 'true')
            img.setAttribute('src', this.src);
            dom = img;
        } else {
            dom = node
        }
        dom.style.width = this.width;
        dom.style.height = this.height || 'auto';
        dom.id = this.id;
        dom.classList.add('spawn');
        div.appendChild(dom);
        if (consoleLogging) {
            console.log(`Imported (${amount}): %c${type == 'images' ? type.slice(0, -1) : type}`,
                `color: ${type == 'images' ? '#307cbf' : '#cc2929'}`)
        }
        draggableSet('#wrapper div');
    }
    clear() {
        amount -= 20;
        for (let i = 0; i < 20; i++) {
            const dom = document.getElementById(`spawn-${i}`);
            dom.remove();
        }
    }
}
const imageWrapper = document.getElementById('image-wrapper')
const spawn = new Spawn('spawn');
class Screenshot extends Spawn {
    constructor(type) {
        super(type)
        this.width = `${Math.floor(Math.random() * (40 - 7.5) + 7.5) * vw()}px`;
        this.height = `${Math.floor(Math.random() * (40 - 7.5) + 7.5) * vw()}px`;
    }
    assign() {
        html2canvas(document.querySelector('#wrapper'), {
            onrendered: canvas => {
                this.place.call(this, 'screenshot', canvas);
                canvas.toDataURL();
            },
            /*ignoreElements: imageWrapper => false*/
        })
    }
}

const totalNumOfImg = 72;
class Images extends Spawn {
    constructor(type) {
        super(type)
        this.imgNum = Math.round(Math.random() * (totalNumOfImg - 1) + 1);
        this.src = `1/${this.imgNum}.jpg`
        this.width = `${(Math.random() * (1.15 - 0.75) + 0.75) * 20 * vw()}px`;
    }
    assign() {
        this.place.call(this, 'images', null);
    }
}

spawn.getTime();
function draggableSet(node) {
    $(node).draggable({
        start: () => {
            dragging = true;
        },
        stop: () => {
            dragging = false;
        },
        stack: node,
    });
};

class SideAnimation {
    constructor(elem) {
        this.elem = document.getElementById(elem);
        this.container = this.elem.parentElement;
        this.height = () => {
            //parseFloat(getComputedStyle(this.elem).height)
            const top = this.elem.firstElementChild.getBoundingClientRect().top;
            const bottom = this.elem.lastElementChild.getBoundingClientRect().bottom;
            return bottom - top;
        }
        this.top = () => 0 - this.height();
        this.bottom = () => 100 * vh();
    }
    setContainer() {
        this.container.style.height = `${this.bottom() - this.top()}px`;
        this.container.style.top = `${this.top()}px`;
    }
}
const intro = new SideAnimation('intro');
const citation = new SideAnimation('citation-wrapper');
intro.setContainer();
citation.setContainer();
window.addEventListener('resize', () => {
    intro.setContainer();
    citation.setContainer();
});

class Citation {
    constructor() {
        this.spanList = Array.from(document.getElementsByClassName('inline-citation'));
        this.citationList = Array.from(document.getElementsByClassName('side-citation'));
        this.spanSpliced = this.spanList.splice(14, 2);
        this.citationSpliced = this.citationList.splice(14, 1)[0];
        this.allSpan = Array.from(document.getElementsByTagName('span'));
        this.allCitations = document.getElementById('citation-wrapper');
        this.handlers = {
            hover: ['mouseover', 'mouseout'],
        };
        this.cssStyle = {
            highlight: ['backgroundColor', 'yellow', ''],
            anm: ['animation-play-state', 'paused', 'running']
        };
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
        let evt = this.handlers[handler];
        for (let i = 0; i < evt.length; i++) {
            this[handler](attached, target, evt[i], ...handlerArgs);
        }
    }
    hover(attached, target, evt, css, self) {
        const cssStyle = (evt == 'mouseover') ? css[1] : css[2];
        if (!Array.isArray(attached)) {
            attached = [attached]
        }
        for (let i = 0; i < attached.length; i++) {
            const a = attached[i];
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
            const targets = [...elem];
            const attached = targets.splice(i, 1)[0];
            for (let i = 0; i < styleNames.length; i++) {
                const css = styleNames[i];
                this.assign(attached, targets, handler, this.cssStyle[css], true)
            }

        }
    }
}
const citationEvt = new Citation();
citationEvt.initialize();

class Control {
    constructor() {
        this.evt = {
            terminate: 't',
            resurrect: 'e',
            next: 'n',
            clear: 'c',
            toggle_animation: 'p'
        }
    }
    terminate() {
        control.log('Terminated');
        clearInterval(spawn.interval);
        alert('Terminated');
    }
    resurrect() {
        control.log('Resurrected')
        spawn.getTime();
        alert('Resurrected');

    }
    next() {
        control.log('Next');
        spawn.run();
    }
    clear() {
        control.log('Cleared.');
        const arr = document.getElementsByClassName('spawn-container');
        for (let i = 0, n = arr.length; i < n; i++) {
            arr[0].remove();
        }
        amount = 0;
    }
    log(message) {
        console.log(`%c${message}`, 'font-style: italic; color: gray; padding-left: 1.5em;')
    }
}
const control = new Control();
document.addEventListener('keydown', e => {
    for (let i = 0; i < Object.keys(control.evt).length; i++) {
        const listener = control.evt[Object.keys(control.evt)[i]];
        if (listener == e.key) {
            control[Object.keys(control.evt)[i]]();
        }

    }
})

function sectionMaxHeight() {
    const main = document.getElementsByClassName('main');
    for (let i = 0; i < main.length; i++) {
        const section = main[i];
        const t = section.firstElementChild.getBoundingClientRect().top;
        const b = section.lastElementChild.getBoundingClientRect().bottom;
        const mh = b - t;
        section.style.maxHeight = `${mh}px`;
    }
}
sectionMaxHeight();
window.addEventListener('resize', () => {
    sectionMaxHeight();
})

const touchTO
function touchDrag() {
    $('#wrapper div').draggable('enable');
    alert('congrats')
}