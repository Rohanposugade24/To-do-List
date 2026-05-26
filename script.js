const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on page load
displayTasks();

// Add task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  displayTasks();

  taskInput.value = "";
});

// Save to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.text}</span>

      <div class="task-buttons">
        <button class="complete-btn" onclick="toggleComplete(${index})">
          ✔
        </button>

        <button class="delete-btn" onclick="deleteTask(${index})">
          ✖
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}