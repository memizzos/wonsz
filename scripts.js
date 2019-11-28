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
	render: () => {
		ctx.fillStyle="black";
		ctx.fillRect(0,0,width,height);
		ctx.fillStyle="white";
		ctx.fillRect(offsetX,offsetY,cellSize*board.width,cellSize*board.height);
	}
}

const snake = {
	sections: [],
	direction: 'right',
	addHead: (x, y) => {
		snake.sections = [Section(x,y)].concat(snake.sections);
		if(snake.sections.length > 1) snake.sections[1].head = false;
	},
	removeTail() {
		if(snake.sections.length>1) snake.sections.pop();
	},
	render: () => {
		snake.sections.forEach(renderSection);
	}
}
function Section(x, y) {
	return {
		x,
		y,
		head: true
	}
}
function renderSection(section) {
	/* tu trzeba narysowac moduł */
	ctx.fillStyle = section.head ? "red" : "black";
	ctx.fillRect(	offsetX+section.x*cellSize,
						offsetY+section.y*cellSize,
						cellSize,
						cellSize );
}
function move() {
	let { x, y } = snake.sections[0];
	if(snake.direction === 'right') x++;
	if(snake.direction === 'left') x--;
	
	if(snake.direction === 'down') y++;
	if(snake.direction === 'up') y--;
	
	// dodać głowę
	for (const el of snake.sections) {
		if(el.x === x && el.y === y) gameover();
	}
	if(x < 0) gameover();
	snake.addHead(x,y);
	
	snake.removeTail();
}


const stats = {
	speed: 1, // cells per second
	points: 0
}

let timeoutID = 0;
function step() {
	// przesunąć wonsza
	move()
	// narysować planszę
	board.render()
	// narysować wonsza
	snake.render()
	// zrobic timeout
	if(gameOngoing) timeoutID = setTimeout(step,1000*(1/stats.speed));
}

function init() {
	let x = Math.floor(board.width/2);
	let y = Math.floor(board.height/2)
	snake.addHead(x-4,y);
	snake.addHead(x-3,y);
	snake.addHead(x-2,y);
	snake.addHead(x-1,y);
	snake.addHead(x,y);
	board.render();
	snake.render();
	// narysować początkowego wonsza
	// narysować planszę
	// narysowac wonsza
}

init();
function arrow(direction) {
if(event.code === 'ArrowUp' && snake.direction !== "down")
snake.direction = "up";
if(event.code === 'ArrowDown' && snake.direction !== "up")
snake.direction = "down";
if(event.code === 'ArrowLeft' && snake.direction !== "right")
snake.direction = "left";
if(event.code === 'ArrowRight' && snake.direction !== "left")
snake.direction = "right";
clearTimeout(timeoutID);
step();
}
let gameOngoing = false;
window.addEventListener("keydown", function(event){
if(event.code === "Space" && !gameOngoing){
gameOngoing = true;
step();
}
if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.code))
arrow(event.code);
this.console.log(event.code);
})

function gameover() {
	clearTimeout(timeoutID);
	const iframe = '<iframe width="560" height="315" src="https://youtu.be/BhB2ZcXWJDk">'
	const el = document.createElement("div");
	el.id = "game";
	el.innerHTML = iframe;
	document.querySelector("#wrap").appendChild(el);
}
