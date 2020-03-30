'use strict';

console.log('Touch the numbers');

/* • User sees a board with 16 cells, containing numbers 1..16, in a random order
o Hint: use an HTML table
o Hint: Nice technique for building the board:
place the 16 numbers in a simple array, shuffle it, then build the <table> by
popping a number from the nums array.
o Note: there is no need to use as matrix in this exercise
• User should click the buttons in a sequence (1, 2, 3,… 16)
• When user clicks the a button - call a function cellClicked(clickedNum)
o If right – the button changes its color
o When user clicks the wrong button noting happen
• When user clicks the first number, game time starts and presented (3 digits after the
dot, like in: 12.086)
• Add difficulties (larger boards: 25, 36) */


const SIZE = +prompt("Enter difficult level");
var gBoardGame = creatBoard(SIZE, '');
var gRndNums = [];
var gCurrNumber = 1;
var gTimer;
var gStartTimer;

function setArrayNumbers() {
    for (var i = 1; i <= SIZE ** 2; i++) {
        gRndNums.push(i);
    }
}


function init() {
    setArrayNumbers()
    setBoard(gBoardGame);
    renderBoard(gBoardGame);
    nextNumber()
}

function setBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var rndNum = gRndNums.splice(getRandomInt(0, gRndNums.length), 1)
            board[i][j] = rndNum[0];
        }
    }
    return board;
}


function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += `<tr>`;
        for (var j = 0; j < board[i].length; j++) {
            strHtml += `<td onclick="checkNumber(this)">${board[i][j]}</td>`;
        }
        strHtml += `</tr>`;
    }
    elBoard.innerHTML = strHtml;
}

function nextNumber(){
    var elNextNumber = document.querySelector('.nextNumber');
    elNextNumber.innerHTML = `<h2>The next number is: ${gCurrNumber}`;
}

function checkNumber(elCell) {
    if (parseInt(elCell.innerText) === gCurrNumber) {
        if (parseInt(elCell.innerText) === 1) {
            gStartTimer = Date.now();
            gTimer = setInterval(renderTimer, 50);
        }
        elCell.style.background = 'rgb(0, 255, 42)';
        if (gCurrNumber === SIZE ** 2) {
            clearInterval(gTimer);
            gameWon();
        }
        else{
            gCurrNumber++;
            nextNumber();
        } 
            
    }

}

function renderTimer() {
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = 'Your time: ' + ((Date.now() - gStartTimer) / 1000) + 's';

}

function gameWon() {
    var elWonTxt = document.querySelector('.won');
    elWonTxt.classList.toggle('hideElement');
}