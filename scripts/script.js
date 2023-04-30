import refs from './refs.js';
import { addNewTask, handleTaskBehavior } from './functions.js';

refs.addBtn.addEventListener('click', addNewTask);
refs.myUL.addEventListener('click', handleTaskBehavior);
