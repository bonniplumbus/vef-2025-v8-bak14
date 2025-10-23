/* TODO hugsanlega importa el, empty úr ./elements.js */
import { empty} from "./elements.js";

// Leyfilegt að breyta skilgreiningum á föllum og bæta við fleiri föllum.

/* TODO merkja viðeigandi föll með `export` */

/**
 * Breytir stöðu atriðis í lista. Ef kláruð atriði eru sýnd er það sýnt, annars er það falið um leið og það er klárað.
 * @param {HTMLElement} item
 * @param {boolean} isShown `true` ef kláruð atriði eru sýnileg, annars `false`.
 * @returns {void}
 */
export function toggleTodoItemStatus(item, isShown = true) {
  const checkbox = item.querySelector('input[type="checkbox"]');
  if (!checkbox) return;

  if (checkbox.checked) {
    item.classList.add("finished");

    if (!isShown) {
      item.style.display = "none";
    }
  } else {
    item.classList.remove("finished");
    item.style.display = "";
  }
}

/**
 * Fjarlægja atriði (sem DOM element) úr lista.
 * @param {HTMLElement} item
 * @returns {void}
 */
function removeTodoItem(item) {
  console.log("EYÐA", item);
  const spanEl = item.querySelector("span.item");

  let text = "<unknown item>";
  if (!spanEl) {
    console.warn("cannot find spanEl");
  } else {
    text = spanEl.textContent;
  }

  if (confirm(`Viltu eyða „${text}“?`)) {
    item.remove();
  }
}

/**
 * Breytir sýnileika kláraðra atriða í lista.
 * @param {HTMLElement} todolist
 * @return {boolean} `true` if finished items are shown, `false` if hidden
 */
export function toggleFinished(todolist) {
  const list = todolist.querySelector(".list");
  if(!list) {
    return true;
  }
  const showFinished = todolist.dataset.showFinished !== "false";
  
  const newShowFinished = !showFinished;
  todolist.dataset.showFinished = newShowFinished ? "true" : "false";

  list.querySelectorAll("li.finished").forEach((el) => {
    const item = /** @type {HTMLElement} */ (el);
    item.style.display = newShowFinished ? "" : "none"
  });
  return newShowFinished;
}

/**
 * Hreinsar allan lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function clearList(todolist) {
  const list = todolist.querySelector(".list");
  if(!list) {
    return;
  }
  if(confirm ("ertu viss?")) {
    empty(list)
  }
  checkListState(todolist);
}

/**
 * Uppfærir upplýsingar um fjölda kláraðra og ókláraðra atriða í lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function updateStats(todolist) {
  const finishedEl = todolist.querySelector(".stats .finished");
  const unfinishedEl = todolist.querySelector(".stats .unfinished");

  if (!finishedEl || !unfinishedEl) {
    console.warn("could not find finished/unfinished nodes");
    return;
  }

  const allItems = todolist.querySelectorAll(".list li");
  const allFinishedItems = todolist.querySelectorAll(".list li.finished");

  if (!allItems || !allFinishedItems) {
    return;
  }

  const finishedCount = allFinishedItems.length;
  const unfinishedCount = allItems.length - finishedCount;

  finishedEl.textContent = finishedCount.toString();
  unfinishedEl.textContent = unfinishedCount.toString();
}

/**
 * Býr til nýtt atriði í lista með texta `text`.
 * @param {HTMLElement} todolist
 * @param {string} text
 * @return {void}
 */
export function createTodoItem(todolist, text) {
  const li = document.createElement("li");

  const button = document.createElement("button");
  button.textContent = "🗑️";
  button.addEventListener("click", () => {
    removeTodoItem(li);
    updateStats(todolist);
  });

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "finished");
  input.addEventListener("change", () => {
    console.log("input", input.checked);
  });

  input.addEventListener("change", () => {
  if (input.checked) {
    li.classList.add("finished");   
  } else {
    li.classList.remove("finished"); 
  }

  updateStats(todolist); 
  checkListState(todolist);
});

  const span = document.createElement("span");
  span.classList.add("item");
  span.textContent = text;

  const label = document.createElement("label");

  label.appendChild(input);
  label.appendChild(span);
  li.appendChild(label);
  li.appendChild(button);

  const list = todolist.querySelector("ul.list");
  list?.appendChild(li);

}

/**
 * Athugar hvort listinn sé tómur og sýnir eða felur skilaboð um tóman lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function checkListState(todolist) {
  const list = todolist.querySelector(".list");
  const emptyMessage = todolist.querySelector(".empty");


  if (!list || !emptyMessage) {
  return;
  }

  const items = list.querySelectorAll("li");

  if (!emptyMessage) {
  return;
  }

  if(items.length === 0) {
    emptyMessage.classList.remove("hidden");
  }
  else {
    emptyMessage.classList.add("hidden");
  }

  const visibleItems = Array.from(list.querySelectorAll("li")).filter(
  (item) => item.style.display !== "none"
  );

  if(visibleItems.length === 0) {
    emptyMessage.classList.remove("hidden");
  }
  else {
    emptyMessage.classList.add("hidden");
  }
}
