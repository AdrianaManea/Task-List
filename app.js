// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();


// Load all event listeners 
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task events
  clearBtn.addEventListener('click', clearTasks);
  // Filter task events
  filter.addEventListener('keyup', filterTasks);
};


//Get Tasks from Local Storage
function getTasks() {
  /* Initialize tasks
  Check to see if there is anything there
  If there isn't set it to an empty array
  If there is, set it to whatever is there. */
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };

  /* Loop through the tasks that are there with a forEach loop
  Inside the forEach() we basically want to create the DOM Element
  So just like we did with the add task
  So this is going to happen for each task */
  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create a new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  })
};
/* So now it stays there because it's being persisted to Local Storage and then when the page loads, when the DOM loads it's coming from Local Storage */


// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  };

  /* So what do we want when we actually add a task?
  We want to create a List item. So we're going to create it from scratch. */

  // Create li element
  const li = document.createElement('li');

  // Add class
  /* We give it this name because in Materialize if you want your li's to look good:
   - your ul should have a class of collection which we already did 
   - and each li should have a class of collection-item 
  */
  li.className = 'collection-item';

  // Create text node and append to li
  /* (taskInput.value) - so in here we want whatever is past into the input to be text node */
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  /* Because we're going to have that x link, delete link, that icon */
  const link = document.createElement('a');

  // Add class
  /* In Materialize if you want something to the right of an li you have to have a .secondary-content */
  link.className = 'delete-item secondary-content';

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to the li
  li.appendChild(link);

  // Append li to ul
  /* taskList being the parent ul with the .collection */
  taskList.appendChild(li);


  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  // console.log(li);

  e.preventDefault();
};


// Store Task 
function storeTaskInLocalStorage(task) {
  let tasks;

  // Check Local Storage to see if there is any tasks in there
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
    /* Means that there is nothing in there So that tasks variable we're going to set it to an empty array */
  } else {
    /* Else we want to set tasks = to whatever is in LS.
    But remember LS can only store strings; So we parse it as Json when it comes out. */
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };

  // And then we want to push on that variable
  tasks.push(task);

  /* Set back to Local Storage.
  Stored as a string. JSON.stringify(tasks) */
  localStorage.setItem('tasks', JSON.stringify(tasks));
};


// Remove Task
function removeTask(e) {
  // We're getting the i tag but we want the a tag
  if (e.target.parentElement.classList.contains('delete-item')) {
    // console.log(e.target);
    /* So now if we click x then we get the console.log() of the target
    But when we click this x we want the entire li to remove - which is the parent of the parent
    We also want to wrap it into a confirmation */
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    };
  };
};


// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  // Check Local Storage, put it into a variable
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };

  // Then loop through it
  tasks.forEach(function (task, index) {
    /* We're checking to see if the taskItem.textContent === with the current task in the iteration
    If it does, we know that is the one we want to delete */
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    };
  });

  // Set Local Storage Again
  localStorage.setItem('tasks', JSON.stringify(tasks));
};


// Clear Tasks
function clearTasks() {
  // Option 1
  // taskList.innerHTML = '';

  // Option 2 - Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  };

  // Clear Tasks from Local Storage
  clearTasksFromLocalStorage();
};


// Clear Tasks From Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
};


// Filter Tasks
function filterTasks(e) {
  // This will give us whatever is typed in
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    /* We can use a forEach() because querySelectorAll returns a nodeList. 
    If we would use getElementsByClassName gives us an HTMLCollection which we would have to convert to an array in order to use forEach() */

    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      // if there is no match is going to equal to -1

      // So that it shows
      task.style.display = 'block';
    } else {
      // Means that there is no match so we want to hide it
      task.style.display = 'none';
    };
  });

  // console.log(text);
};