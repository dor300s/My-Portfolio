'use strict';

console.log('Todos Starting');

function onInit() {
    renderTodos();
}

function renderTodos() {

    getSortBy();
    
    var todos = getTodosForDisplay();
    var strHTMLs;

    if(!todos.length){
        if (gFilterBy === 'all') strHTMLs = 'No todos';
        else strHTMLs = `No ${gFilterBy} todos`;
        document.querySelector('.todo-list').innerHTML = strHTMLs
    }
    else {
    var strHTMLs = todos.map(getTodoHTML);
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    }

    // console.log('strHTMLs', strHTMLs);
    document.querySelector('.total-todos').innerText = getTotalCount();
    document.querySelector('.active-todos').innerText = getActiveCount();

}

function getTodoHTML(todo) {
    const className = (todo.isDone) ? 'done' : '';
    var importanceIcon = getImportanceIcon(todo.importance);
    var todoCreatedTime = getTodoTime(todo.time);
    return `<li class="${className}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt} <span class="todo-time">(${todoCreatedTime})</span>
            <button onclick="onRemoveTodo(event, '${todo.id}')">❌</button>
            <button onclick="onChangeImportance(event, '${todo.id}')" class="importance">${importanceIcon}</button>
        </li>`
}

function getTodoTime(todoTime){
    var taskTime = new Date(todoTime);
    var date = taskTime.getDate() + '-' + (taskTime.getMonth() + 1) + '-' + taskTime.getFullYear();
    var time = taskTime.getHours() + ":" + taskTime.getMinutes();
    var totalTime = date + ' ' + time;
    return totalTime;
}


function onChangeImportance(event, todoId){
    event.stopPropagation();
    ChangeImportance(todoId);
    renderTodos();
    _saveTodosToStorage();
}

function onRemoveTodo(event, todoId) {
    event.stopPropagation();
    if(!confirm('Are you sure?')) return;
    removeTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var txt = prompt('What todo?');
    if(!txt) return;
    addTodo(txt);
    renderTodos();
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onFilterChange(filterBy) {
    // console.log('Filtering by: ', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSortBy(value){
    setSortBy(value);
    renderTodos();
}
