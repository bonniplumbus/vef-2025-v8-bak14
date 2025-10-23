import { updateStats, createTodoItem, clearList, toggleFinished, checkListState } from "./lib/todo.js";
// ^ make sure the export in todo.js is named `toggleFinished` (lowercase t)

function initialize(todolist) {
  const form = todolist.querySelector(".form");
  if (!form) {
    console.error("form fannst ekki, hætti");
    return;
  }

  // Submit: create one item
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = todolist.querySelector("input");
    if (!input) {
      console.error("input fannst ekki");
      return;
    }

    const value = input.value.trim();
    if (!value) return; // staðfesta að value er OK

    createTodoItem(todolist, value);
    updateStats(todolist);
    input.value = "";
  });

  // Clear-all button
  const clearButton = todolist.querySelector(".clear-all");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      clearList(todolist);
      updateStats(todolist);
    });
  }

  const toggleBtn = todolist.querySelector(".toggle-finished");
  if(toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const shown = toggleFinished(todolist);
      console.log("Kláruð atriði sýnileg?", shown);

      updateStats(todolist);
      checkListState(todolist);
    })
  }
};

// Finnum todo lista og setjum allt upp
const todoList = document.querySelector(".todo-list");
if (todoList && todoList instanceof HTMLElement) {
  initialize(todoList);
} else {
  console.error("no todo list found");
}

