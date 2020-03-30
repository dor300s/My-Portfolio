'use strict';

const KEY = 'theTodos';

var gTodos = _createTodos();
var gFilterBy = 'all';
var gSortBy = 'txt';


function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos;

    const todos = gTodos.filter(todo =>
        (todo.isDone && gFilterBy === 'done') ||
        (!todo.isDone && gFilterBy === 'active'))

    return todos;

}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1);
    _saveTodosToStorage()

}

function addTodo(txt) {
    const todo = _createTodo(txt);
    gTodos.unshift(todo);
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone;
    _saveTodosToStorage()
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length;
}

function _saveTodosToStorage() {
    saveToStorage(KEY, gTodos)
}


function _createTodos() {

    var todos = loadFromStorage(KEY)
    if (todos && todos.length) return todos;

    todos = [];
    todos.push(_createTodo('Wash your hands'))
    todos.push(_createTodo('Stay at home'))
    todos.push(_createTodo('Learn to code'))

    saveToStorage(KEY, todos)

    return todos;
}

function _createTodo(txt) {

    var currTime = Date.now();

    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        time: currTime,
        importance: 1
    }
}


function makeId(length = 5) {
    var id = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
}

function getImportanceIcon(importance) {
    if (importance === 1) return '<i class="far fa-star"></i>'
    else if (importance === 2) return '<i class="fas fa-star-half-alt"></i>';
    else return '<i class="fas fa-star"></i>';
}

function ChangeImportance(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId);
    if (gTodos[idx].importance !== 3) gTodos[idx].importance++;
    else gTodos[idx].importance = 1;
}

function setSortBy(value) {
    gSortBy = value;
}

function getSortBy() {
    if (!gTodos.length) return;
    // console.log('sorrrrttt', gTodos[0][sortType]);
    if (gSortBy !== 'txt') gTodos.sort(function (a, b) { return b[gSortBy] - a[gSortBy] });
    else {
        gTodos.sort(function (a, b) {
            var x = a[gSortBy].toLowerCase();
            var y = b[gSortBy].toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
    }
}