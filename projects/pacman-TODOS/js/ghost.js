'use strict';

var GHOST = '⩄';
var gGhosts = [];
var gDeadGhosts = [];
var gIntervalGhosts;
var gLastCellContent;

function createGhost(board) {
    //TODO: GHOST OBJ
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: gLastCellContent,
        color: `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)})`
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}
function createGhosts(board) {
    gGhosts = [];
    //TODO: CREATE GHOSTS
    gLastCellContent = gBoard[3][3];
    createGhost(board);
    createGhost(board);
    createGhost(board);

    gIntervalGhosts = setInterval(moveGhosts, 2000);
}

function moveGhosts() {
    //TODO: MOVE GHOSTS

    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        var moveDiff = getMoveDiff();

        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }

        if (gBoard[nextLocation.i][nextLocation.j] === WALL) return;
        if (gBoard[nextLocation.i][nextLocation.j] === GHOST) return;
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
            if (!gIsSuper) {
                gameOver();
                return;
            } else {
                gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
                renderCell(ghost.location, ghost.currCellContent);
                ghost.location = nextLocation;
                gBoard[nextLocation.i][nextLocation.j] = PACMAN;
                renderCell(nextLocation , PACMAN);
                gDeadGhosts.push(gGhosts.splice(i,1));
            }
        } else {
            
            //model
            gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
            //dom
            renderCell(ghost.location, ghost.currCellContent);
            
            ghost.location = nextLocation;
            ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];
            
            gBoard[ghost.location.i][ghost.location.j] = GHOST;
            if(!gIsSuper) renderCell(ghost.location, getGhostHTML(ghost));
            else renderCell(ghost.location, getBlueGhostHTML());
            // renderCell(ghost.location, getGhostHTML());
        }
    }
}

function getGhostHTML(ghost) {
    return `<span style = "color:${ghost.color}">${GHOST}</span>`;
}
function getBlueGhostHTML() {
    return `<span style = "color: rgb(0, 0, 185)">${GHOST}</span>`;
}

function getMoveDiff() {
    //TODO: RANDOM GHOST MOVEMENT


    var rndNum = getRandomIntInclusive(0, 100);

    if (rndNum < 25) {
        return { i: -1, j: 0 }
    } else if (rndNum < 50) {
        return { i: 1, j: 0 }
    } else if (rndNum < 75) {
        return { i: 0, j: 1 }
    } else return { i: 0, j: -1 }
}
