// Modle
class TodoClass {
  constructor() {
    this.todos = [
      { task: "Go to Dentist", isComplete: false },
      { task: "Do Gardening", isComplete: true },
      { task: "Renew Library Account", isComplete: false },
      { task: "Library Account", isComplete: true }
    ];
  }

  getAllTodos() {
    return this.todos;
  }

  updateTodo(index) {
    this.todos[index].isComplete = !this.todos[index].isComplete;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }
}

// view
class UI {
  constructor() {
    this.addElement = document.getElementById("todo-add");
    this.inputElement = document.getElementById("todo-input");
    this.todoListDiv = document.getElementById("todo-list");
    this.checkBoxElement = document.querySelector(".todo-checkbox");
  }

  renderView(todos) {
    console.log("tods", todos);
   
    // remove existing content in div
    this.todoListDiv.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
      let string = this.createNoteHTML(todos[i], i);
      this.todoListDiv.insertAdjacentHTML("beforeend", string);
    }
   
  }

  createNoteHTML(todo, index) {
    let strikeStyle = todo.isComplete === true ? `strike` : "";
    return `<div class="todo-row">
            <input type="checkbox" id=${index} class="todo-checkbox" ${todo.isComplete === true ? "checked" : ""}>
            <p class="todo-text ${strikeStyle}" >${todo.task}</p>
            <i class="icon-delete fas fa-trash-alt"></i>
        </div>`;
  }
}

class Controller {
  constructor(modelController, viewController) {
    this.model = modelController;
    this.view = viewController;
  }

  init() {
    let allTodos = model.getAllTodos();
    // add event listener to the add button
    this.view.addElement.addEventListener("click", () => {
      let textInput = view.inputElement.value;
      if (textInput) {
        this.addNewTodo(textInput);
      }
    });
    // add event listener to the checkboxes using bubbling concept
    this.view.todoListDiv.addEventListener("click", e => {
      if (e.target.type === "checkbox") {
        this.toggleTodoStatus(e.target.id);
      }
    });
    this.view.renderView(allTodos);
  }

  toggleTodoStatus(index) {
    this.model.todos[index].isComplete = !this.model.todos[index].isComplete;
    this.view.renderView(this.model.todos);
  }

  addNewTodo(todoText) {
    let todo = {
      task: todoText,
      isComplete: false
    };
    this.model.todos.push(todo);
    this.view.renderView(model.todos);
  }
}
let model = new TodoClass();
let view = new UI();
let controller = new Controller(model, view);
controller.init();
