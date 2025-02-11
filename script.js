const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function loadTasks() {
    taskList.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => addTaskToDOM(task, index));
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function addTaskToDOM(task, index) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task}</span>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
}

function addTask() {
    const task = taskInput.value.trim();
    if (task === "") {
        alert("Task cannot be empty!");
        return;
    }
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    saveTasks(tasks);
    addTaskToDOM(task, tasks.length - 1);
    taskInput.value = "";
}


function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = prompt("Edit task:", tasks[index]);
    if (newTask !== null && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        saveTasks(tasks);
        loadTasks();
    }
}


function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}


addTaskBtn.addEventListener("click", addTask);
window.addEventListener("load", loadTasks);