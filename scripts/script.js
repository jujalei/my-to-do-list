import refs from './refs.js';
import { addNewTask, handleTaskBehavior, fillTasksList } from './functions.js';

refs.addBtn.addEventListener('click', addNewTask);
refs.myUL.addEventListener('click', handleTaskBehavior);

window.addEventListener('DOMContentLoaded', fillTasksList);
