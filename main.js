const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const form = $("form")
const input = $("input")
const todos = $(".todos")
const count = $(".number")
const clearCompleted = $(".clear-completed")
const clearAll = $(".clear-all")
class todoMain {
  constructor() {
    this.init();
    this.countTodos();
  }
  handleTodos(data) {
    let todoItem = document.createElement("li")
    todoItem.classList.add('uncompleted')
    todoItem.innerHTML = `
      <input class="check" type="checkbox">
      <input class="item-text" type="text" readonly>
      <i class="d-none pr-12 op-0 fa-solid fa-check"></i>
      <i class="pr-12 op-0 fa-solid fa-pen-to-square"></i>
      <i class="op-0 icon-delete fas fa-trash"></i>
    `
    let iconEdit = todoItem.querySelector('.fa-pen-to-square')
    let iconSave = todoItem.querySelector('.fa-check')
    let task = todoItem.querySelector('.item-text')
    task.value = data.text

    if(data.status === "completed"){
      todoItem.setAttribute("class", "completed");
    };
    if(data.checked === true){
      todoItem.querySelector(".check").setAttribute("checked", "");
    };
    // change status task
    todoItem.querySelector(".check").addEventListener("click", (e) => {
      todoItem.classList.toggle('uncompleted');
      todoItem.classList.toggle("completed");
      e.target.toggleAttribute("checked");
      this.saveTodoList();
    });
    // delete task
    todoItem.querySelector(".icon-delete").addEventListener("click", (e) => {
      e.target.parentElement.remove();
      input.focus();
      this.saveTodoList();
    });
    // edit task
    iconEdit.addEventListener("click", (e) => {
      iconSave.classList.toggle("d-none")
      iconEdit.classList.toggle("d-none")
      task.removeAttribute("readonly");
      task.style.opacity = 0.4;
			task.focus();
      this.saveTodoList();
    });
    iconSave.addEventListener("click", (e) => {
      iconSave.classList.toggle("d-none")
      iconEdit.classList.toggle("d-none")
      task.setAttribute("readonly", "readonly");
      task.style.opacity = 1;
      this.saveTodoList();
    });
    todos.appendChild(todoItem);
  }

  countTodos() {
    let listItem = $$(".uncompleted");
    count.innerHTML = `${listItem.length}`;
  }

  clearCompleted() {
    let listItemChecked = $$("[checked]");
    if (listItemChecked.length > 0) {
      listItemChecked.forEach((e) => {
        e.parentElement.remove()
      })
    }
    else {
      alert("Please select tasks");
    }
    this.saveTodoList();
  }

  clearAll() {
    todos.innerHTML = "";
    this.saveTodoList();
  }

  saveTodoList() {
    let todoList = $$("li");
    let todoStorage = [];

    todoList.forEach(item => {
      let text = item.querySelector(".item-text").value;
      let status = item.getAttribute("class");
      let checked = item.querySelector("input").checked;

      todoStorage.push({
        text,
        status,
        checked
      })
    })
    localStorage.setItem("todoList", JSON.stringify(todoStorage));

    this.countTodos();
  }

  init() {
    if (localStorage.length > 0) {
      let data = JSON.parse(localStorage.getItem("todoList"));
      data.forEach((item) => {
        this.handleTodos(item);
      })
    }
  }
}
const todoObj = new todoMain()

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(input.value){
    todoObj.handleTodos({
      text: input.value.trim()
    })
    todoObj.saveTodoList()
  };
  input.value = "";
})

clearCompleted.addEventListener('click', () => {
  todoObj.clearCompleted();
})
clearAll.addEventListener('click', () => {
  todoObj.clearAll();
})

// change color
const body = $("body")
const app = $(".app")
const footer = $(".footer")
const sun = $(".fa-sun")
const moon = $(".fa-moon")
function colorMode() {
  sun.classList.toggle("d-none");
  moon.classList.toggle("d-none");
  body.classList.toggle("active");
  app.classList.toggle("active");
  footer.classList.toggle("active");
  form.classList.toggle("active");
  todos.classList.toggle("active");
  input.classList.toggle("active");
}
moon.addEventListener('click', () => {
  colorMode()
})
sun.addEventListener('click', () => {
  colorMode()
})