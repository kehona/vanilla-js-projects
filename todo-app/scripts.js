// Modle
class TodoClass {
  constructor() {
    this.tasks = [
      { task: "Go to Dentist", isComplete: false },
      { task: "Do Gardening", isComplete: true },
      { task: "Renew Library Account", isComplete: false },
      { task: "Library Account", isComplete: true }
    ];
  }

  getAllTodos() {
    return this.tasks;
  }

  updateTodo(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
  }
}

// view
class UI {
  constructor() {
    this.addElement = document.getElementById("todo-add");
    this.inputElement = document.getElementById("todo-input");
    this.todoListDiv = document.getElementById("todo-list");
    this.checkBoxElement = document.querySelector(".todo-checkbox");
    this.addElement.addEventListener("click", () => {
      let textInput = this.inputElement.value;
      controller.addNewTodo(textInput);
    });
  }

  renderView(todos) {
    console.log("tods", todos);
    this.todoListDiv.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
      let string = this.createNoteHTML(todos[i], i);
      this.todoListDiv.insertAdjacentHTML("beforeend", string);
    }
  }

  createNoteHTML(task, index) {
    return `<div class="todo-row">
            <input type="checkbox" name="" onchange="controller.toggleTodoStatus(${index})" class="todo-checkbox" ${task.isComplete === true ? "checked" : ""}>
            <p class="todo-text">${task.task}</p>
            <i class="icon-delete fas fa-trash-alt"></i>
        </div>`;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init() {
    let allTodos = model.getAllTodos();
    console.log("all", allTodos);
    this.view.renderView(allTodos);
  }

  toggleTodoStatus(index) {
    this.model.tasks[index].isComplete = !this.model.tasks[index].isComplete;
    this.view.renderView(this.model.tasks);
  }

  addNewTodo(todoText) {
    let newTask = {
      task: todoText,
      isComplete: false
    };
    model.tasks.push(newTask);
    this.view.renderView(model.tasks);
  }
}
let model = new TodoClass();
let view = new UI();
let controller = new Controller(model, view);
