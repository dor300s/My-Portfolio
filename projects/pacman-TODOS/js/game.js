'use strict';

var gBoard;
var WALL = '⬜';
var FOOD = '.';
var SUPER_FOOD = '🔹';
var CHERRY = '🍒';
var gGame = {
    score: 0,
    isOn: false
}

var gIsSuper = false;
var gFoodCnt = -1;
var gCollectedFood = 0;
var isVictory = false;
var gAddCherry = setInterval(cherryMaker, 15000);

function init() {
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    renderBoard(gBoard, '.board');
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            } else if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 || i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = SUPER_FOOD;
            } else if (!board[i][j]) {
                board[i][j] = FOOD;
                gFoodCnt++;
            }
        }
    }
    return board;
}


function updateScore(score) {
    //TODO: UPDATE GAMES SCORE
    //model
    gGame.score += score;
    //dom
    document.querySelector('h3 span').innerText = gGame.score;
}

function checkVictory() {
    if (gFoodCnt === gCollectedFood) {
        isVictory = true;
        victory();
    }
}

function victory() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    victoryToggle();
}

function gameOver() {
    //TODO: GAME OVER
    gGame.isOn = false;
    clearInterval(gAddCherry);
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    gameOverToggle();
}


function gameOverToggle() {
    var elGameOver = document.querySelectorAll('.gameOver , .reset');
    for (var i = 0; i < elGameOver.length; i++) {
        elGameOver[i].classList.toggle('hideElement');
    }
}

function victoryToggle() {
    var elVictory = document.querySelectorAll('.victory , .reset');
    for (var i = 0; i < elVictory.length; i++) {
        elVictory[i].classList.toggle('hideElement');
    }
}

function resetGame() {
    gGame.isOn = true;
    gGame.score = 0;
    gFoodCnt = -1;
    gCollectedFood = 0;
    updateScore(0);
    if (isVictory) victoryToggle()
    else gameOverToggle();
    isVictory = false;
    init();
}

function superPower() {
    gIsSuper = true;
    ghostsColorToggle()
    setTimeout(function () {
        gIsSuper = false;
        ghostsColorToggle();
        ghostsReborn();
    }, 5000);
}

function ghostsReborn() {
    gLastCellContent = gBoard[3][3];
    if (gLastCellContent === GHOST) gLastCellContent = gGhosts[findGhostIdx(3, 3)].currCellContent;
    else if (gLastCellContent === PACMAN) gLastCellContent = ' ';

    for (var idx = 0; idx < gDeadGhosts.length; idx++) {
        createGhost(gBoard);
        renderBoard(gBoard, '.board');
    }
    gDeadGhosts = [];
}

function ghostsColorToggle() {
    var ghostHTML;
    for (var i = 0; i < gGhosts.length; i++){
        var currGhost = gGhosts[i];
        if(gIsSuper) ghostHTML = getBlueGhostHTML();
        else ghostHTML = getGhostHTML(currGhost);
        renderCell(currGhost.location, ghostHTML);
    }
}

function cherryMaker() {
    var emptyCells = [];
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[i].length - 1; j++) {
            if (gBoard[i][j] === ' ') emptyCells.push({ i: i, j: j });
        }
    }
    var rndCherryInx = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)];
    gBoard[rndCherryInx.i][rndCherryInx.j] = CHERRY;
    renderCell(rndCherryInx, CHERRY);
}