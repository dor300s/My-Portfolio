'use strict';


var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '💧';

var gBoard;
var gGamerPos;


var gAddBallInterval = setInterval(addBall, 3000);
var gAddGlueInterval = setInterval(addGlue, 5000);

var gCollectedBalls = 0;
var gTotalBallsNumber = 2;
var gPointSound = new Audio('sound/pointEarned.wav');
var canMove = true;

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
}


function buildBoard() {
	// Create the Matrix
	// var board = createMat(10, 12)
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[0][5].type = FLOOR;
	board[9][5].type = FLOOR;
	board[5][0].type = FLOOR;
	board[5][11].type = FLOOR;
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })//cell-0-0 wall

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			//cellClass= (currCell.type === FLOOR)?' floor':(currCell.type === WALL)?' wall':'';

			//TODO - Change To ES6 template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to short if statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			} else if (currCell.gameElement === GLUE) {
				strHTML += GLUE_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	if (i === 5 & j === -1) j = 11;
	if (i === 5 & j === 12) j = 0;
	if (i === -1 && j === 5) i = 9;
	if (i === 10 && j === 5) i = 0;

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL || !canMove) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	//var iAbsDiff = Math.abs(i - gGamerPos.i);
	//var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	//if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

	if (targetCell.gameElement === BALL) {
		console.log('Collecting!');
		gCollectedBalls++;
		gPointSound.play();
		var elBallsCounter = document.querySelector('.ballsCounter');
		elBallsCounter.innerText = `You collect ${gCollectedBalls} balls`;
		if (gCollectedBalls === gTotalBallsNumber) victory();
	}

	if (targetCell.gameElement === GLUE){
		canMove = false;
		setTimeout (function(){
			canMove = true;
		}, 3000);
	}


	// MOVING from current position
	// Model:
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
	// Dom:
	renderCell(gGamerPos, '');

	// MOVING to selected position
	// Model:
	gGamerPos.i = i;
	gGamerPos.j = j;
	gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	// DOM:
	renderCell(gGamerPos, GAMER_IMG);

	//} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)//'.cell-0-0'
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	console.log(event);
	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function addBall() {
	var ballAdded = false;
	if (gTotalBallsNumber - gCollectedBalls > 50) {
		clearInterval(gAddBallInterval);
		alert("You lost - too much balls!");
	}
	while (!ballAdded) {
		var currCell = { i: getRandomInt(0, 10), j: getRandomInt(0, 12) };
		if (!gBoard[currCell.i][currCell.j].gameElement && gBoard[currCell.i][currCell.j].type === FLOOR) {
			gBoard[currCell.i][currCell.j].gameElement = BALL;
			ballAdded = true;
			gTotalBallsNumber++;
			renderBoard(gBoard);

		}
	}
}

function victory() {
	clearInterval(gAddBallInterval);
	clearInterval(gAddGlueInterval);
	toggleVicotyElement()
}

function toggleVicotyElement() {
	var elResetGame = document.querySelectorAll('.victory');
	for (var i = 0; i < elResetGame.length; i++) {
		elResetGame[i].classList.toggle('hideElement');
	}
}

function resetGame() {
	gCollectedBalls = 0;
	gTotalBallsNumber = 2;
	gAddBallInterval = setInterval(addBall, 3000);
	gAddGlueInterval = setInterval(addGlue, 5000);
	toggleVicotyElement()
	initGame();
}

function addGlue() {
	var glueAdded = false;
	while(!glueAdded){
		var currCell = { i: getRandomInt(0, 10), j: getRandomInt(0, 12) };
		if (!gBoard[currCell.i][currCell.j].gameElement && gBoard[currCell.i][currCell.j].type === FLOOR) {
			gBoard[currCell.i][currCell.j].gameElement = GLUE;
			renderBoard(gBoard);
			setTimeout(function () {
				if(gBoard[currCell.i][currCell.j].gameElement === GAMER){
					gBoard[currCell.i][currCell.j].gameElement = GAMER;
				} else gBoard[currCell.i][currCell.j].gameElement = null;
				renderBoard(gBoard);
			}, 3000);
			glueAdded = true;
		}
	}
}