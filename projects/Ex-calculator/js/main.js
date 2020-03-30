'use strict';

console.log('Ex Calculator');

/* Ex Calculator */

var gNum1 = null;
var gNum2 = null;
var gOp = null;
var gDisplay = document.querySelector('.display');
var gMemoryNum = 0;

function addDigit(digit) {
    var elDigit = digit.innerText;
    if (!gOp) {
        if (gNum1) gNum1 = gNum1 + elDigit;
        else gNum1 = elDigit;
        gDisplay.innerText = gNum1;
        console.log('num1:', gNum1);
    } else {
        if (gNum2) gNum2 = gNum2 + elDigit;
        else gNum2 = elDigit;
        gDisplay.innerText = gNum2;
        console.log('num2:', gNum2);
    }

}

function setOp(op) {
    if (gNum1 && gNum2) result();
    gOp = op.innerText;
    console.log('op:', gOp);
}

function changeSign() {
    if (!gNum2 && gNum1) {
        gNum1 = parseFloat(gNum1) * (-1);
        gDisplay.innerText = gNum1;
    } else if (gNum2) {
        gNum2 = parseFloat(gNum2) * (-1);
        gDisplay.innerText = gNum2;
    }
}

function sqrt() {
    if (!gNum2) {
        gNum1 = Math.sqrt(parseFloat(gNum1));
        gDisplay.innerText = gNum1;
    } else if (gNum2) {
        gNum2 = Math.sqrt(parseFloat(gNum2));
        gDisplay.innerText = gNum2;
    }
}

function backSpace() {
    if (!gNum2 && !gOp) {
        gNum1 = gNum1.substring(0, gNum1.length - 1);
        gDisplay.innerText = gNum1;
    } else if (gNum2) {
        gNum2 = gNum2.substring(0, gNum2.length - 1);
        gDisplay.innerText = gNum2;
    }
}

function clearAll() {
    gNum1 = null;
    gNum2 = null;
    gOp = null;
    gDisplay.innerText = 0;
}

function clearCurrentNum() {
    if (!gNum2 && !gOp) {
        gNum1 = null;
        gDisplay.innerText = 0;
    } else {
        gNum2 = null;
        gDisplay.innerText = 0;
    }
}

function result() {
    var res;
    switch (gOp) {
        case '+':
            res = parseFloat(gNum1) + parseFloat(gNum2);
            gNum1 = res;
            gNum2 = null;
            gOp = null;
            break;
        case '-':
            res = parseFloat(gNum1) - parseFloat(gNum2);
            gNum1 = res;
            gNum2 = null;
            gOp = null;
            break;
        case '*':
            res = parseFloat(gNum1) * parseFloat(gNum2);
            gNum1 = res;
            gNum2 = null;
            gOp = null;
            break;
        case '/':
            res = parseFloat(gNum1) / parseFloat(gNum2);
            gNum1 = res;
            gNum2 = null;
            gOp = null;
            break;
        case '%':
            res = parseFloat(gNum1) % parseFloat(gNum2);
            gNum1 = res;
            gNum2 = null;
            gOp = null;
            break;
        case '^':
            res = parseFloat(gNum1) ** parseFloat(gNum2);
            gNum1 = res;
            gNum2 = null;
            gOp = null;
            break;

    }
    gDisplay.innerText = res;
    console.log('res:', res);
}

function memoryClear() {
    gMemoryNum = 0;
}

function memoryRecall() {
    if (!gNum1) {
        gNum1 = gMemoryNum;
        gDisplay.innerText = gNum1;
    } else {
        gNum2 = gMemoryNum;
        gDisplay.innerText = gNum2;
    }
}

function memoryStore(){
    if (!gNum2) gMemoryNum = gNum1;
    else gMemoryNum = gNum2
}

function addToMemory(){
    if (!gNum2 && gNum1) {
        gMemoryNum = parseFloat(gMemoryNum) + parseFloat(gNum1);
    } else if (gNum2) gMemoryNum = parseFloat(gMemoryNum) + parseFloat(gNum2);
}

function decFromMemory(){
    if (!gNum2 && gNum1) {
        gMemoryNum = parseFloat(gMemoryNum) - parseFloat(gNum1);
    } else if (gNum2) gMemoryNum = parseFloat(gMemoryNum) - parseFloat(gNum2);
}