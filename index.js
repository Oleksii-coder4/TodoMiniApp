const input = document.getElementById("todoInput");
const todoList = document.getElementById("todoTaskList");

function addTask(input, todoList) {
  if (input.value.trim() === "") {
    alert("You must write something");
  } else {
    todoList.insertAdjacentHTML(
      "beforeend",
      `<li id="deleteTaskButton" class="task"><p></p><button class="del_button"></button></li>`
    );
    const taskElement = todoList.lastElementChild;
    taskElement.querySelector("p").textContent = input.value;
    saveData();
  }
  input.value = "";
}

function deleteTask(event) {
  if (event.target.tagName === "BUTTON") {
    event.target.parentElement.remove();
    saveData();
  }
}

function checkTask(event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("task-checked");
    saveData();
  }
}

function saveData() {
  localStorage.setItem("todoTasks", todoList.innerHTML);
}

function showTasks() {
  todoList.innerHTML = localStorage.getItem("todoTasks");
}

showTasks();

todoList.addEventListener("click", checkTask);
todoList.addEventListener("click", deleteTask);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask(input, todoList);
  }
});
