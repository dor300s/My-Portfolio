'use strict';

var PACMAN = '👆';//:)
var gPacman;

function createPacman(board) {
    //TODO: CREATE PACMAN
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    //TODO: MOVE PACMAN
    if (!gGame.isOn) return;

    var nextLocation = getNextLocation(ev);

    if (!nextLocation) return;
    if (gBoard[nextLocation.i][nextLocation.j] === WALL) return;
    if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
        if (!gIsSuper) {
            gameOver();
            return;
        } else {
            var currGhostIdx = findGhostIdx(nextLocation.i, nextLocation.j);
            if (gGhosts[currGhostIdx].currCellContent === FOOD) {
                gCollectedFood++;
                updateScore(1);
                checkVictory();
            }
            gDeadGhosts.push(gGhosts.splice(currGhostIdx, 1)[0]);
        }
    } else if (gBoard[nextLocation.i][nextLocation.j] === FOOD) {
        gCollectedFood++;
        updateScore(1);
        checkVictory();
    } else if (gBoard[nextLocation.i][nextLocation.j] === SUPER_FOOD) {
        superPower();
    } else if (gBoard[nextLocation.i][nextLocation.j] === CHERRY) {
        updateScore(10);
    }

    //model
    gBoard[gPacman.location.i][gPacman.location.j] = ' ';
    //DOM (HTML ELEMNTS)
    renderCell(gPacman.location, ' ');

    gPacman.location = nextLocation;

    //MODEL (js vars)
    gBoard[nextLocation.i][nextLocation.j] = PACMAN;

    //DOM (HTML ELEMNTS)
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    //TODO: GET NEXT LOCATION FROM KEYBOARD
    var nextLoc = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.key) {
        case 'ArrowRight': nextLoc.j++;
            PACMAN = '👉';
            break;
        case 'ArrowLeft': nextLoc.j--;
            PACMAN = '👈';
            break;

        case 'ArrowUp': nextLoc.i--;
            PACMAN = '👆';
            break;

        case 'ArrowDown': nextLoc.i++;
            PACMAN = '👇';
            break;

        default: nextLoc = null;
            break;
    }

    return nextLoc;

}

function findGhostIdx(i, j) {
    for (var idx = 0; idx < gGhosts.length; idx++) {
        if (gGhosts[idx].location.i === i && gGhosts[idx].location.j === j) return idx;
    }
}