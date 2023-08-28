let amount = 0
let dragging = false
let consoleLogging = false
const main = Array.from(document.querySelectorAll('.main'))
const wrapper = document.querySelector('#wrapper')
const imageWrapper = document.querySelector('#image-wrapper')

function draggableSet() {
	$('#wrapper div').draggable({
		start: () => dragging = true,
		stop: () => dragging = false,
		stack: '#wrapper div',
	})
}


let control
document.addEventListener('keydown', ({ metaKey, key }) => {
	if (control)
		for (let i = 0; i < Object.keys(control.evt).length; i++) {
			const listener = control.evt[Object.keys(control.evt)[i]]
			if (listener === key)
				control[Object.keys(control.evt)[i]]()

		}

	if (metaKey && key == 'e') Control.enable()

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
	media.mobile.next = media.isVertical()
	media.report()
	intro.assign()
	citation.assign()
})
scatter.onload()
spawn.getTime()
intro.assign()
citation.assign()
citationEvt.initialize()