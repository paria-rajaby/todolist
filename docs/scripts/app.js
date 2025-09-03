const themeBtns = document.querySelectorAll("#theme button");
const input = document.querySelector("#input");
const addBtn = document.querySelector("#add-btn");
const todoWrapper = document.querySelector("#todo-wrapper");
const doneTaskBtn = document.querySelector(".done-task");
const undoneTaskBtn = document.querySelector(".undone-task");
const allTasksBtn = document.querySelector(".all-task");
const toastBox = document.querySelector(".toast-box");
const processBar = document.querySelector(".process-bar");
const toastMessage = document.querySelector(".toast-message");
const todos = JSON.parse(localStorage.getItem("todos")) || [];

let inputValue = "";
const applyTheme = (primary, secondary) => {
  document.documentElement.style.setProperty("--color-primary", primary);
  document.documentElement.style.setProperty("--color-secondary", secondary);
};
const changeTheme = () => {
  themeBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const themeValue = event.target.dataset.theme;
      let primary, secondary;
      switch (themeValue) {
        case "theme2":
          primary = "#AA076B";
          secondary = "#61045F";

          break;

        case "theme3":
          primary = "#16A085";
          secondary = "#F4D03F";
          break;

        case "theme1":
          primary = "#9796f0";
          secondary = "#fbc7d4";
          break;
      }
      applyTheme(primary, secondary);
      localStorage.setItem("primaryColor", primary);
      localStorage.setItem("secondaryColor", secondary);
    });
  });
};
const getInputValue = (event) => {
  inputValue = event.target.value;
};
const renderTodos = () => {
  todoWrapper.innerHTML = "";
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo, index) => {
    todoWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <div class="flex items-center justify-between border-b border-b-white pb-2 rtl pr-2">
                <div class="flex items-center gap-3">
                    <input type="checkbox" class="todo-checkbox w-5 h-5 rounded appearance-none border border-white checked:bg-secondary" ${
                      todo.completed ? "checked" : ""
                    } data-index="${index}">
                    <p class="${todo.completed ? "line-through" : ""}">${
        todo.text
      }</p>
                </div>
                <button class="bg-primary py-1 px-2 rounded-xl font-VazirLight transition duration-200" onclick = "removeTodo(${index})">حذف</button>
            </div>
   `
    );
  });
  const checkboxes = document.querySelectorAll(".todo-checkbox");
  checkboxes.forEach((checkboxe) => {
    checkboxe.addEventListener("change", (event) => {
      const idx = event.target.dataset.index;

      todos[idx].completed = event.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });
  });
};
const addTodo = () => {
  if (inputValue.trim() === "") return;

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.push({ text: inputValue, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  input.value = "";
  inputValue = "";

  renderTodos();
  showToastBar("تسک با موفقیت اضافه شد");
};
const removeTodo = (index) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
  showToastBar("تسک با موفقیت حذف شد");
};
const showDoneTask = () => {
  const doneTodos = todos.filter((todo) => todo.completed === true);

  todoWrapper.innerHTML = "";
  doneTodos.forEach((todo, index) => {
    todoWrapper.insertAdjacentHTML(
      "beforeend",
      `
            <div class="flex items-center justify-between border-b border-b-white pb-2 rtl pr-2">
               <div class="flex items-center gap-3">
                   <input type="checkbox" class="todo-checkbox w-5 h-5 rounded appearance-none border border-white checked:bg-secondary" ${
                     todo.completed ? "checked" : ""
                   } data-index="${index}">
                   <p class="${todo.completed ? "line-through" : ""}">${
        todo.text
      }</p>
               </div>
               <button class="bg-primary py-1 px-2 rounded-xl font-VazirLight transition duration-200" onclick = "removeTodo(${index})">حذف</button>
           </div>
      `
    );
  });
};
const showUndoneTask = () => {
  const undoneTodos = todos.filter((todo) => todo.completed === false);

  todoWrapper.innerHTML = "";
  undoneTodos.forEach((todo, index) => {
    todoWrapper.insertAdjacentHTML(
      "beforeend",
      `
            <div class="flex items-center justify-between border-b border-b-white pb-2 rtl pr-2">
               <div class="flex items-center gap-3">
                   <input type="checkbox" class="todo-checkbox w-5 h-5 rounded appearance-none border border-white checked:bg-secondary" ${
                     todo.completed ? "checked" : ""
                   } data-index="${index}">
                   <p class="${todo.completed ? "line-through" : ""}">${
        todo.text
      }</p>
               </div>
               <button class="bg-primary py-1 px-2 rounded-xl font-VazirLight transition duration-200" onclick = "removeTodo(${index})">حذف</button>
           </div>
      `
    );
  });
};
const showToastBar = (message) => {
  toastBox.classList.remove("hidden");
  toastMessage.innerHTML = message;
  let progressSteps = 0;

  const timer = setInterval(function () {
    progressSteps++;
    processBar.style.width = `${progressSteps}%`;
    if (progressSteps > 100) {
      processBar.style.width = `0%`;
      toastBox.classList.add("hidden");
      clearInterval(timer);
    }
  }, 20);
};
input.addEventListener("keyup", getInputValue);
addBtn.addEventListener("click", addTodo);
doneTaskBtn.addEventListener("click", showDoneTask);
undoneTaskBtn.addEventListener("click", showUndoneTask);
allTasksBtn.addEventListener("click", renderTodos);
window.addEventListener("load", () => {
  const savedPrimary = localStorage.getItem("primaryColor");
  const savedSecondary = localStorage.getItem("secondaryColor");
  if ((savedPrimary, savedSecondary)) {
    applyTheme(savedPrimary, savedSecondary);
  }
  renderTodos();
  changeTheme();
});
