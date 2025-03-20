const taskInput = document.getElementById("task");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearTasks");

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

clearBtn.addEventListener("click", () => {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);

    saveTask(taskText);
    taskInput.value = "";
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateTaskStatus(taskText, li.classList.contains("completed"));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        removeTask(taskText);
    });

    li.appendChild(deleteBtn);
    return li;
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map(task => 
        task.text === taskText ? { ...task, completed } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text);
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskList.appendChild(taskItem);
    });
}