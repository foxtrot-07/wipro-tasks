document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Add task to the list
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please enter a task!');
  createTaskElement(taskText, false);
  saveTask(taskText, false);
  taskInput.value = '';
}

// Create a new task element
function createTaskElement(text, completed) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  li.innerHTML = `
    <span onclick="toggleTask(this)">${text}</span>
    <button class="remove-btn" onclick="removeTask(this)">Remove</button>
  `;
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from the list and localStorage
function removeTask(button) {
  const li = button.parentElement;
  const text = li.querySelector('span').innerText;
  li.remove();

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Toggle task completion
function toggleTask(span) {
  const li = span.parentElement;
  const text = span.innerText;
  li.classList.toggle('completed');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(task => task.text === text);
  task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
