import refs from './refs.js';
import { load, save } from './storage.js';

const STORAGE_KEY = 'tasks';
let currentID = 1;

function addCloseButton(target) {
  const span = document.createElement('span');
  const txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  target.appendChild(span);
}

function addNewTask() {
  const clearInput = () => (refs.myInput.value = '');
  const value = refs.myInput.value.trim();

  if (value === '') {
    alert('Введіть текст');
    clearInput();
    return;
  }

  createLi({
    text: value,
  });

  addTaskToStorage(value);
  clearInput();
}

function addNewTaskOnEnter(evt) {
  if (evt.key === 'Enter') {
    console.log(evt.code);
    addNewTask();
  }
}

function createLi({ text, isDone = false, id = currentID }) {
  const liEl = document.createElement('li');
  liEl.textContent = text;
  liEl.dataset.id = id;

  if (isDone) {
    liEl.classList.add('checked');
  }

  refs.myUL.appendChild(liEl);
  addCloseButton(liEl);
}

// function handleTaskBehavior({ target }) {
//   const currentState = load(STORAGE_KEY);

//   if (target.tagName === 'LI') {
//     target.classList.toggle('checked');
//     const taskObj = currentState.find(
//       task => Number(task.id) === Number(target.dataset.id)
//     );
//     taskObj.isDone = !taskObj.isDone;
//     console.log(taskObj);
//   } else if (target.classList.contains('close')) {
//     target.closest('li').remove();
//   }

//   const taskIndex = currentState.findIndex(
//     task => Number(task.id) === Number(target.closest('li').dataset.id)
//   );
//   currentState.splice(taskIndex, 1);
//   console.log(taskIndex);

//   save(STORAGE_KEY, currentState);
// }

function handleTaskBehavior({ target }) {
  const currentState = load(STORAGE_KEY);

  if (target.tagName === 'LI') {
    target.classList.toggle('checked');
    const taskObj = currentState.find(
      task => Number(task.id) === Number(target.dataset.id)
    );
    taskObj.isDone = !taskObj.isDone;
    console.log(taskObj);
  } else if (target.classList.contains('close')) {
    const taskIndex = currentState.findIndex(
      task => Number(task.id) === Number(target.closest('li').dataset.id)
    );
    currentState.splice(taskIndex, 1);
    console.log(taskIndex);
    target.closest('li').remove();
  }

  save(STORAGE_KEY, currentState);
}

function createTaskObj({ text, isDone = false }) {
  return {
    text,
    isDone,
    id: currentID,
  };
}

function addTaskToStorage(text) {
  const currentState = load(STORAGE_KEY);
  if (currentState === undefined) {
    save(STORAGE_KEY, [createTaskObj({ text })]);
  } else {
    currentState.push(createTaskObj({ text }));
    save(STORAGE_KEY, currentState);
  }
  currentID += 1;
}

function fillTasksList() {
  const currentState = load(STORAGE_KEY);
  if (currentState !== undefined) {
    currentState.forEach(createLi);
    currentID =
      currentState.length === 0
        ? 1
        : currentState[currentState.length - 1].id + 1;
  }
}

export { addNewTask, addNewTaskOnEnter, handleTaskBehavior, fillTasksList };
