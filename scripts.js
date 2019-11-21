/**
 * @type {HTMLElement}
 */
const wrap = document.querySelector("#wrap");
/**
 * @type {HTMLElement}
 */
const ui = document.querySelector("#ui");
/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const height = canvas.height = canvas.offsetHeight;
const width = canvas.width = canvas.offsetWidth;

const cellSize = 20; // in pixels

const offsetX = Math.floor((width % cellSize) / 2);
const offsetY = Math.floor((height % cellSize) / 2);

const board = {
	width: Math.floor(width / cellSize),
	height: Math.floor(height / cellSize),
	render: ()=>{
		/* tu trzeba narysować ramkę i zamalować planszę */	
	}
}

const snake = {
	sections:[],
	direction:'right',
	addHead:(x,y)=>{
		/* tu trzeba dodać głowę! */
	},
	removeTail(){
		/* tu trzeba usunąć ogon */
	},
	render:()=>{
		/* tu trzeba narysować wszystkie moduły  */
	}
}
function Section(x,y) {
	return {
		x,
		y,
		head:true
	}
}
function renderSection(section){
	/* tu trzeba narysowac moduł */ 
}
function move(directionOverwrite) {
	let {x,y} = snake.sections[0];
	const finalDirection = directionOverwrite || snake.direction;
	// ustalić położenie głowy
	// dodać głowę
	// usunąć ogon
}

const stats = {
	speed: 1, // cells per second
	points: 0
}

let timeoutID = 0;
function step(){
	// przesunąć wonsza
	// narysować planszę
	// narysować wonsza
	// zrobic timeout
}

function init(){
	// narysować początkowego wonsza
	// narysować planszę
	// narysowac wonsza
}

init();