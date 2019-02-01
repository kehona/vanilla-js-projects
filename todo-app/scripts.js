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

  removeTodo(index) {
    let todos = this.todos;
    let removed = todos.splice(index, 1);
    this.todos = todos;
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
    return `<div class="todo-row" id=${index}>
            <input type="checkbox" class="todo-checkbox" ${todo.isComplete === true ? "checked" : ""}>
            <p class="todo-text ${strikeStyle}" >${todo.task}</p>
            <div class="delete">
               <i class="fas fa-trash-alt"></i>
            </div>
            
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
        let id = e.target.parentElement.id;
        this.toggleTodoStatus(id);
      }
      // add event listener to delete icon
      if (e.target.parentElement.className ==="delete") {
        let id = e.target.parentElement.parentElement.id;
        this.deleteTodo(id);
      }
    });
    this.view.renderView(this.model.getAllTodos());
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
  deleteTodo(index) {
    this.model.removeTodo(index);
    this.view.renderView(this.model.getAllTodos());
  }
}
let model = new TodoClass();
let view = new UI();
let controller = new Controller(model, view);
controller.init();
