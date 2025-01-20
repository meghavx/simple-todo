"use strict";

const inputBox = document.getElementById("input-box");
const todoUl = document.getElementById("todo-list");
const defaultBgColor = "#eacda3";
const colorPicker = document.getElementById("color-picker");
const changeBgColor = document.getElementById("change-bgColor");

// Add new task to todo list when "Add" button is clicked
const addTodo = () => {
  let newTodo = inputBox.value.trim();
  if (newTodo === "") return;
  const todoLi = document.createElement("LI");
  todoLi.textContent = newTodo;
  const closeSpan = document.createElement("SPAN");
  closeSpan.textContent = "\u00D7";
  closeSpan.className = "close";
  todoLi.appendChild(closeSpan);
  todoUl.appendChild(todoLi);
  clearInput();
  saveDataToLocalStorage();
}

// Clear input box when "Clear" button is clicked
const clearInput = () => { 
  inputBox.value = ""; 
}

// Event listener for toggling and closing tasks
const toggleCheck = (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  }
  else if (e.target.classList.contains("close")) {
    e.target.parentElement.remove();
  }
  saveDataToLocalStorage();
}

todoUl.addEventListener('click', toggleCheck);

// Save todo list data in the browser
const saveDataToLocalStorage = () => {
  localStorage.setItem("todoData", todoUl.innerHTML);
}

const showTodoList = () => {
  const savedTodos = localStorage.getItem("todoData") || "";
  todoUl.innerHTML = savedTodos;
  const savedColor = localStorage.getItem("bgColor") || defaultBgColor;
  document.body.style.background = savedColor;
  colorPicker.value = savedColor;
}

// Show saved todo list
showTodoList();

// Add event listener for "Enter" key press on input box
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

changeBgColor.addEventListener("click", () => {
  colorPicker.click();
});

// Change background color of the app when a color is selected
colorPicker.addEventListener("input", (e) => {
  const color = e.target.value;
  document.body.style.background = color;
  localStorage.setItem("bgColor", color);
});

// Clear todos
const clearTodos = () => {
  todoUl.innerHTML = "";
  localStorage.removeItem("todoData");
  localStorage.removeItem("bgColor");
  document.body.style.background = defaultBgColor;
}
