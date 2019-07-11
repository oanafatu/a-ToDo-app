/* eslint no-unused-vars: 2 */

let tasksArr = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
let num = localStorage.num ? localStorage.num : 0;

function append(task, list) {
  const toDoItem = document.createElement('div');
  toDoItem.className = 'todo-item';
  toDoItem.classList.add('grid-item');
  toDoItem.setAttribute('position', task.no);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.setAttribute('onclick', 'markDone(event,pageShow)');

  if (list.className.indexOf('todo-list') !== -1) {
    checkbox.setAttribute('onclick', 'markDone(event,pageShow)');
  } else {
    checkbox.setAttribute('onclick', 'markToDo(event,pageShow)');
    checkbox.setAttribute('checked', 'checked');
  }

  const toDoTitle = document.createElement('p');
  toDoTitle.className = 'item-title';
  toDoTitle.textContent = task.title;

  const toDoDescription = document.createElement('p');
  toDoDescription.className = 'item-description';
  toDoDescription.textContent = task.description;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.setAttribute('onclick', 'removeItem(event)');

  removeBtn.textContent = 'X';

  if (list.className.indexOf('todo-list') !== -1) {
    removeBtn.classList.add('ishidden');
  } else {
    removeBtn.classList.remove('ishidden');
  }

  toDoItem.append(checkbox);
  toDoItem.append(toDoTitle);
  toDoItem.append(toDoDescription);
  toDoItem.append(removeBtn);

  list.append(toDoItem);
}

function pageShow(array) {
  const toDoList = document.querySelector('.todo-list');
  const doneList = document.querySelector('.done-list');
  while (toDoList.firstChild) toDoList.firstChild.remove();
  while (doneList.firstChild) doneList.firstChild.remove();

  for (let i = 0; i < array.length; i += 1) {
    if (array[i].done === false) {
      append(array[i], toDoList);
    } else append(array[i], doneList);
  }
}

pageShow(tasksArr);

function addTask(title, description) {
  tasksArr = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
  num = localStorage.num ? localStorage.num : 0;
  num = parseInt(num, 10) + 1;

  tasksArr.push({
    no: num,
    title,
    description,
    done: false,
  });

  localStorage.setItem('tasks', JSON.stringify(tasksArr));
  localStorage.setItem('num', num);
  pageShow(tasksArr);
}

function alert(message) {
  const form = document.querySelector('form');
  let alertElement = document.querySelector('.alert');
  if (!alertElement) {
    alertElement = document.createElement('span');
    alertElement.className = 'alert';
    alertElement.textContent = message;
    form.append(alertElement);
    setTimeout(() => alertElement.classList.add('ishidden'), 2000);
    return;
  }
  if (message !== alertElement.textContent) {
    alertElement.textContent = message;
  }
  alertElement.classList.remove('ishidden');
  setTimeout(() => alertElement.classList.add('ishidden'), 2000);
}

const addBtn = document.querySelector('.btn-add');
addBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const inputTitle = document.querySelector('.input-title');
  const inputDescription = document.querySelector('.input-description');

  if (!inputTitle.value.trim()) {
    alert('Title must not be left empty');
    return;
  }
  if (!inputDescription.value.trim()) {
    alert('Might be helpful to have a description of the task also.');
    return;
  }

  addTask(inputTitle.value, inputDescription.value);

  inputTitle.value = '';
  inputDescription.value = '';
});

function markDone(event, callback) {
  const taskNo = event.target.parentNode.getAttribute('position');
  tasksArr = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];

  tasksArr.forEach((e) => {
    if (e.no === parseInt(taskNo, 10)) {
      e.done = true;
    }
  });

  callback(tasksArr);
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
}


function markToDo(event, callback) {
  const taskNo = event.target.parentNode.getAttribute('position');
  tasksArr = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];

  tasksArr.forEach((e) => {
    if (e.no === parseInt(taskNo, 10)) {
      e.done = false;
    }
  });

  callback(tasksArr);
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
}


function removeItem(event) {
  const taskNo = event.target.parentNode.getAttribute('position');

  tasksArr = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
  const result = tasksArr.filter(e => e.no !== parseInt(taskNo, 10));
  pageShow(result);
  localStorage.setItem('tasks', JSON.stringify(result));
}

