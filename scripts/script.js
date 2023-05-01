import refs from './refs.js';
import {
  addNewTask,
  addNewTaskOnEnter,
  handleTaskBehavior,
  fillTasksList,
} from './functions.js';

refs.addBtn.addEventListener('click', addNewTask);
refs.myInput.addEventListener('keydown', addNewTaskOnEnter);

refs.myUL.addEventListener('click', handleTaskBehavior);

window.addEventListener('DOMContentLoaded', fillTasksList);
