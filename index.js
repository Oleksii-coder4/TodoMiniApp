const input = document.getElementById("todoInput");
const todoList = document.getElementById("todoTaskList");

const doneChecker = document.getElementById("doneChecker");
const totalChecker = document.getElementById("totalChecker");
const todoChecker = document.getElementById("todoChecker");

const showTasksAmount = function (total = 0, done = 0, todo = 0) {
  doneChecker.textContent = `Done: ${done}`;
  totalChecker.textContent = `Total: ${total}`;
  todoChecker.textContent = `To-do: ${todo}`;
};

const CheckAndShowTasksAmount = function () {
  const total = todoList.childElementCount;
  const done = document.querySelectorAll("li.task-checked").length;
  const todo = total - done;
  showTasksAmount(total, done, todo);
};

function showTasks() {
  todoList.innerHTML = localStorage.getItem("todoTasks");
}
showTasks();
CheckAndShowTasksAmount();

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
  CheckAndShowTasksAmount();
}

todoList.addEventListener("click", checkTask);
todoList.addEventListener("click", deleteTask);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask(input, todoList);
  }
});
