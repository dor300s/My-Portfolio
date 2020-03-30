'use strict';

console.log("Game of life");

// Game of life in  HTML

var SIZE = 8;
var gSymbol = "🤡";
var gGameBoard = creatBoard(SIZE, '');
var gGameIsOn = true;
firstSetup(gGameBoard);


function firstSetup(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (Math.random() < 0.4) board[i][j] = gSymbol;
        }
    }
}


var gGameInterval = setInterval(init, 2000);

function init() {
    gGameBoard = nextGeneration(gGameBoard);
    renderGameBoard(gGameBoard);
}

function nextGeneration(board) {
    var nextGenBoadrd = [];
    var cnt = 0;
    for (var i = 0; i < board.length; i++) {
        nextGenBoadrd[i] = [];
        for (var j = 0; j < board[i].length; j++) {

            for (var k = i - 1; k <= i + 1; k++) {
                if (k < 0 || k >= board.length) continue;
                for (var m = j - 1; m <= j + 1; m++) {
                    if (m < 0 || m >= board[i].length) continue;
                    if (k === i && m === j) continue;
                    if (board[k][m] === gSymbol) cnt++;
                }
            }
            if (cnt < 3 || cnt > 5) nextGenBoadrd[i][j] = '';
            else nextGenBoadrd[i][j] = gSymbol;
            cnt = 0;
        }
    }
    return nextGenBoadrd;
}


function renderGameBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[i].length; j++){
            strHTML += `<td onclick="superLife(this)" class="cell">${board[i][j]}</td>`;
        }
        strHTML += '</tr>';
    }
    elBoard.innerHTML = strHTML;
}

function superLife(elCell){
    if(elCell.innerHTML) elCell.innerText = '🤩';
}

function pasueGame(elButton){
    if(gGameIsOn){
        clearInterval(gGameInterval);
        elButton.innerText = 'Continue';
        gGameIsOn =!gGameIsOn;
    } else {
        gGameInterval = setInterval(init, 2000);
        elButton.innerText = 'Pause';
        gGameIsOn =!gGameIsOn;
    }
}
