'use strict';

console.log('Starting up');

var gProjects = [];
createProjects();

function createProjects() {
    gProjects.push(createProject(1, 'Touch the num', 'Touch the num', 'Game - the user need to touch the numbers by order', "projects/Ex-touch-nums/index.html", '30/03/2020', ['game, timer, board']));
    gProjects.push(createProject(2, 'Calculator', 'Calculator', 'Calculator and Math actions', "projects/Ex-calculator/index.html", '30/03/2020', ['calculator, board']));
    gProjects.push(createProject(3, 'Game of life', 'Game of life', 'Game - the cells change position every few seconds', "projects/Ex-game-of-life/index.html", '30/03/2020', ['game, board']));
    gProjects.push(createProject(4, 'Ball board', 'Ball board', 'Game - the user need to collect the balls', "projects/ball-board-start-here/index.html", '30/03/2020', ['game, board']));
    gProjects.push(createProject(5, 'Pacman', 'Pacman', 'Game - the user need to eat all the dots without getting cougth by the ghosts', "projects/pacman-TODOS/index.html", '30/03/2020', ['game, board']));
    gProjects.push(createProject(6, 'Mine Sweeper', 'Mine Sweeper', 'Game - the user need to open all the num cells and mark the mines with flags', "projects/MineSweeper/index.html", '30/03/2020', ['game, timer, board']));
    gProjects.push(createProject(7, 'Todo list', 'Todo list', 'Tool - the user can make and manage list of tasks', "projects/proj-todo-mvc/index.html", '30/03/2020', ['tasks tool, board']));
    gProjects.push(createProject(8, 'Book shop', 'Book shop', 'The user can manage books for book shop', "projects/Ex.Book-shop/index.html", '30/03/2020', ['manage books shop, board']));

}

function createProject(id, name, title, desc, url, publishedAt, lables) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: publishedAt,
        lables: lables
    }
}

function getProjects(){
    return gProjects;
}