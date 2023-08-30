const wrapper = document.querySelector('#wrapper')

const draggable = new Draggable()
draggable.set()

const spawnFactory = new SpawnFactory()
spawnFactory.loop()

const controls = new Controls()
controls.listen()

scatter()

const citation = new Citation()
citation.init()

const sideScrolls = new SideScrolls()
sideScrolls.setDimensions()

const mediaQuery = new MediaQuery()
mediaQuery.check()
window.addEventListener('resize', () => {
	sideScrolls.setDimensions()
	mediaQuery.check()
})