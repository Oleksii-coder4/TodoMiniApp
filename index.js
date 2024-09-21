const input = document.getElementById("todoInput");
const todoList = document.getElementById("todoTaskList");

const doneChecker = document.getElementById("doneChecker");
const totalChecker = document.getElementById("totalChecker");
const todoChecker = document.getElementById("todoChecker");

const showTasksAmount = function (total = 0, done = 0, todo = 0) {
  doneChecker.textContent = `Done: ${done} `;
  totalChecker.textContent = `Total: ${total} `;
  todoChecker.textContent = `To-do: ${todo} `;
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
      `<li id="deleteTaskButton" class="task"><p></p> <div class="buttons_container"> <button class="del_button"></button> <button class="edit_button">&#9998;</button> </div> </li>`
    );
    const taskElement = todoList.lastElementChild;
    taskElement.querySelector("p").textContent = input.value;
    saveData();
  }
  input.value = "";
}

function editTask(event) {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.classList.contains("edit_button")
  ) {
    const liElement = event.target.closest("li");
    const pElement = liElement.querySelector("p");
    if (pElement) {
      const inputElement = document.createElement("input");
      inputElement.setAttribute("type", "text");
      inputElement.setAttribute("class", "edit_input");
      inputElement.value = pElement.textContent;
      inputElement.addEventListener("blur", (event) => {
        pElement.textContent = inputElement.value;
        inputElement.replaceWith(pElement);
      });
      inputElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          pElement.textContent = inputElement.value;
          inputElement.replaceWith(pElement);
        }
      });
      pElement.replaceWith(inputElement);
      inputElement.focus();
    }
  }
}

function deleteTask(event) {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.classList.contains("del_button")
  ) {
    event.target.closest("li").remove();
    saveData();
  }
}

function checkTask(event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("task-checked");
    event.target.querySelector("p").classList.toggle("p-checked");
    saveData();
  }
}

function saveData() {
  localStorage.setItem("todoTasks", todoList.innerHTML);
  CheckAndShowTasksAmount();
}

todoList.addEventListener("click", checkTask);
todoList.addEventListener("click", editTask);
todoList.addEventListener("click", deleteTask);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask(input, todoList);
  }
});
