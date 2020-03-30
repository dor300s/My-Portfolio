'use stricr';

console.log('Mine Sweeper');

var gBoards = [];
var SIZE = 4;
var gNumOfMines = 2;
var gIsGameOn = true;
var gNumsCellsLeft = SIZE ** 2 - gNumOfMines;
var MINE = '💣';
var FLAG = '🚩';
var gFlagsLeft = gNumOfMines;
var gFirstClick = true;
var gTimer;
var gFirstTime;
var gCurrTimer;
var gLives = 3;
var gHintIsOn = false;
var gHintNum = 3;
var gSafeClicks = 3;
var gIsManualMode = false;


function initGame() {
    gBoards = creatBoard(SIZE);
    if (!gIsManualMode) renderBoard(gBoards);
    getBestScore();
    clearTimer();
}

function creatBoard(size) {
    var boards = [];
    for (var i = 0; i < size; i++) {
        boards[i] = [];
        for (var j = 0; j < size; j++) {
            boards[i][j] = {
                value: '',
                display: false,
                flaged: false
            };
        }
    }
    return boards;
}

function renderFirstClick(iPos, jPos) {
    setMines(gBoards, iPos, jPos);
    setBoardsNums(gBoards);
    renderBoard(gBoards);
    gFirstClick = false;
}

function chooseLevel(level) {
    switch (level) {
        case 'easy':
            SIZE = 4;
            gNumOfMines = 2;
            break;
        case 'medium':
            SIZE = 8;
            gNumOfMines = 12;
            break;
        case 'hard':
            SIZE = 12;
            gNumOfMines = 30;
    }
    resetGame();
}

function setMines(board, iPos, jPos) {
    var minesToSet = gNumOfMines;
    while (minesToSet !== 0) {
        var getRndCell = { i: getRandomInt(0, board.length), j: getRandomInt(0, board.length) };
        if (getRndCell.i === iPos && getRndCell.j === jPos) continue;
        if (board[getRndCell.i][getRndCell.j].value !== MINE) {
            minesToSet--;
            board[getRndCell.i][getRndCell.j].value = MINE;
        }
    }
}

function setMinesManually(i, j) {
    gBoards[i][j].value = MINE;
    gBoards[i][j].display = true;
    gFlagsLeft++;
    gNumsCellsLeft = SIZE ** 2 - gFlagsLeft;
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.innerText = MINE;
    gBoards[i][j].display = false;
}

function setBoardsNums(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].value) {
                var numOfNegsBombs = checkNegs(i, j, board);
                if (numOfNegsBombs) board[i][j].value = numOfNegsBombs;
            }
        }
    }
}

function checkNegs(iPos, jPos, board) {
    var cnt = 0;
    for (var i = iPos - 1; i <= iPos + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = jPos - 1; j <= jPos + 1; j++) {
            if (j < 0 || j >= board.length) continue;
            if (i === iPos && j === jPos) continue;
            if (board[i][j].value === MINE) cnt++;
        }
    }
    return cnt;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board[i].length; j++) {
            var currCell = gBoards[i][j];
            if (currCell.flaged) strHTML += `<td class="cell cell-${i}-${j}" onmousedown="cellClicked(${i},${j},event)">${FLAG}</td>`;
            else if (currCell.display === true && currCell.value !== MINE) strHTML += `<td class="cell cell-${i}-${j} number" onmousedown="cellClicked(${i},${j},event)">${currCell.value}</td>`;
            else if (currCell.display === true && currCell.value === MINE) strHTML += `<td class="cell cell-${i}-${j} mine" onmousedown="cellClicked(${i},${j},event)">${currCell.value}</td>`;
            else strHTML += `<td class="cell cell-${i}-${j}" onmousedown="cellClicked(${i},${j},event)"></td>`;
        }
        strHTML += `</tr>`;
    }
    document.querySelector('.board').innerHTML = strHTML;
}

function cellClicked(iPos, jPos, event) {
    if (gIsManualMode) {
        setMinesManually(iPos, jPos);
        return;
    }
    if (gHintIsOn && gHintNum) {
        showHintArea(iPos, jPos);
        return;
    }
    if (event.which === 3 && gFirstClick) return;
    else if (event.which === 3) {
        flegCell(iPos, jPos);
        return;
    }
    else if (event.which === 1 && gFirstClick) {
        renderFirstClick(iPos, jPos);
        startTimer();
    }

    if (gIsGameOn) {
        var currCell = gBoards[iPos][jPos];
        if (currCell.flaged) return;
        if (currCell.value === MINE) {
            gLives--;
            renderLives();
            if (gLives > 0)
                mineWarning(iPos, jPos);
            else {
                showAllBombs(gBoards);
                gameOver();
            }
        } else if (currCell.value) {
            currCell.display = true;
            gNumsCellsLeft--;
            renderBoard(gBoards);
        } else {
            showArea(iPos, jPos, gBoards);
            renderBoard(gBoards);
        }
        checkVictory()

    }
}

function showAllBombs(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].value === MINE) {
                if (board[i][j].flaged) board[i][j].flaged = false;
                board[i][j].display = true;
            }
        }
    }
    renderBoard(gBoards);
}

function showArea(iPos, jPos, board) {
    var cnt = 0;
    for (var i = iPos - 1; i <= iPos + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = jPos - 1; j <= jPos + 1; j++) {
            if (j < 0 || j >= board.length) continue;
            if (board[i][j].value && board[i][j].display === false) {
                board[i][j].display = true;
                gNumsCellsLeft--;
                cnt++;
            } else if (board[i][j].display === false) {
                board[i][j].display = true;
                gNumsCellsLeft--;
                cnt++;
                if (cnt > 0) showArea(i, j, board);

            }
        }
    }
}

function flegCell(i, j) {
    if (gIsGameOn) {
        if (gBoards[i][j].display) return;
        if (!gBoards[i][j].flaged) {
            gBoards[i][j].flaged = true;
            gFlagsLeft--;
        } else {
            gBoards[i][j].flaged = false;
            gFlagsLeft++;
        }
        renderBoard(gBoards);
        checkVictory();
    }
}

function checkVictory() {
    if (gNumsCellsLeft === 0 && gFlagsLeft === 0) victory();

}

function victory() {
    clearInterval(gTimer);
    checkScore();
    gIsGameOn = false;
    var elResetBtn = document.querySelector('.reset');
    elResetBtn.innerText = '😎';
    var elVictory = document.querySelector('.gameover');
    elVictory.innerText = 'Victory! 😁';
    GameOverToggle();
}

function gameOver() {
    clearInterval(gTimer);
    gIsGameOn = false;
    var elResetBtn = document.querySelector('.reset');
    elResetBtn.innerText = '😔';
    var elGameOver = document.querySelector('.gameover');
    elGameOver.innerText = 'Game Over! 😭';
    GameOverToggle();
}

function GameOverToggle() {
    var elGameOver = document.querySelector('.gameover');
    elGameOver.classList.toggle('hide-element');
}

function resetGame() {
    clearInterval(gTimer);
    var elResetBtn = document.querySelector('.reset');
    elResetBtn.innerText = '😀';
    var elGameOver = document.querySelector('.gameover');
    elGameOver.classList.add('hide-element');
    gNumsCellsLeft = SIZE ** 2 - gNumOfMines;
    gFlagsLeft = gNumOfMines;
    gIsGameOn = true;
    gFirstClick = true;
    gLives = 3;
    renderLives();
    gHintNum = 3;
    renderHintsNum();
    gSafeClicks = 3;
    renderSafeClicks();
    gIsManualMode = false;
    gStepsMemorys = [];
    initGame();
}

function startTimer() {
    gFirstTime = Date.now();
    var elTimer = document.querySelector('.timer');
    gTimer = setInterval(function () {
        gCurrTimer = (Date.now() - gFirstTime) / 1000
        elTimer.innerText = `Your Time: ${gCurrTimer}s`;
    }, 55);
}

function checkScore() {
    var currBestScore = localStorage.getItem(`BestScore${SIZE}`);
    if (gCurrTimer < currBestScore || !currBestScore) localStorage.setItem(`BestScore${SIZE}`, gCurrTimer);
}

function getBestScore() {
    var currBestScore = localStorage.getItem(`BestScore${SIZE}`);
    var elScore = document.querySelector('.score');
    if (currBestScore) elScore.innerText = `Best Score: ${currBestScore}s`;
    else elScore.innerText = '';
}

function clearTimer() {
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = `Your Time: 0s`;
}

function renderLives() {
    var strHTML = '';
    for (var i = 0; i < gLives; i++) {
        strHTML += '💖';
    }
    var elLives = document.querySelector('.lives');
    elLives.innerText = strHTML;
}

function mineWarning(i, j) {
    gBoards[i][j].display = true;
    renderBoard(gBoards);
    setTimeout(function () {
        gBoards[i][j].display = false;
        renderBoard(gBoards);
    }, 500);
}

function toggleHint() {
    if (!gFirstClick && gHintNum) {
        gHintIsOn = !gHintIsOn;
        var elBoard = document.querySelector('.board');
        elBoard.classList.toggle('hinted');
    }
}

function renderHintsNum() {
    var elHints = document.querySelector('.hints');
    var strHTML = '';
    for (var i = 0; i < gHintNum; i++) {
        strHTML += '💡';
    }
    elHints.innerText = strHTML;
}

function showHintArea(iPos, jPos) {
    var hintCells = [];
    for (var i = iPos - 1; i <= iPos + 1; i++) {
        if (i < 0 || i >= gBoards.length) continue;
        for (var j = jPos - 1; j <= jPos + 1; j++) {
            if (j < 0 || j >= gBoards[i].length) continue;
            if (gBoards[i][j].display) continue;
            hintCells.push({ i: i, j: j });
        }
    }

    for (var idx = 0; idx < hintCells.length; idx++) {
        gBoards[hintCells[idx].i][hintCells[idx].j].display = true;
    }
    renderBoard(gBoards);

    for (var idx = 0; idx < hintCells.length; idx++) {
        var currCell = hintCells[idx];
        gBoards[currCell.i][currCell.j].display = false;
    }
    setTimeout(function () {
        renderBoard(gBoards);
    }, 1000);

    toggleHint();
    gHintNum--;
    renderHintsNum();
}

function revealSafeCell() {
    if (!gFirstClick && gNumsCellsLeft && gSafeClicks) {
        var cellFound = false;
        while (!cellFound) {
            var getRndCell = { i: getRandomInt(0, gBoards.length), j: getRandomInt(0, gBoards.length) };
            if (gBoards[getRndCell.i][getRndCell.j].value !== MINE && !gBoards[getRndCell.i][getRndCell.j].display) {
                var elCell = document.querySelector(`.cell-${getRndCell.i}-${getRndCell.j}`);
                elCell.classList.toggle('mark');
                console.log(elCell);
                cellFound = true;
            }
        }
        setTimeout(function () {
            elCell.classList.toggle('mark');
        }, 2000);
        gSafeClicks--;
        renderSafeClicks();
    }
}

function renderSafeClicks() {
    var elSafeBtn = document.querySelector('.safe-click');
    var strHTML = '';
    for (var i = 0; i < gSafeClicks; i++) {
        strHTML += '🎁';
    }
    elSafeBtn.innerText = strHTML;
}

function toggleManualMode(btn) {
    var elBtn = btn;
    if (!gIsManualMode) {
        gIsManualMode = !gIsManualMode;
        gNumOfMines = 0;
        gFlagsLeft = 0;
        elBtn.classList.toggle('mark');
    } else if (gIsManualMode) {
        gIsManualMode = !gIsManualMode;
        elBtn.classList.toggle('mark');
        renderBoard(gBoards);
    }
}
