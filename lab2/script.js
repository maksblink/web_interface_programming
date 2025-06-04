"use strict";

let lists = {};
let lastDeleted = null;
let deleteTarget = null;

function showAddListModal() {
  document.getElementById("addListModal").classList.remove("hidden");
  document.getElementById("overlay").classList.remove("hidden");
}

function hideAddListModal() {
  document.getElementById("addListModal").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
}

function createList() {
  const name = document.getElementById("newListName").value.trim();
  if (!name) return;

  const listId = `list-${Date.now()}`;
  lists[listId] = [];

  const listEl = document.createElement("div");
  listEl.innerHTML = `
    <details open>
      <summary><strong>${name}</strong></summary>
      <input placeholder="Dodaj zadanie..." onkeypress="if(event.key==='Enter'){addTask('${listId}', this.value); this.value=''; return false;}">
      <ul id="${listId}"></ul>
    </details>
  `;

  document.getElementById("lists").appendChild(listEl);
  hideAddListModal();
}

function addTask(listId, text) {
  if (!text.trim()) return;
  const task = { text, done: false, date: null };
  lists[listId].push(task);
  renderTasks(listId);
}

function renderTasks(listId) {
  const ul = document.getElementById(listId);
  ul.innerHTML = "";
  const search = document.getElementById("search").value;
  const caseInsensitive = document.getElementById("caseInsensitive").checked;

  lists[listId].forEach((task, index) => {
    let textToSearch = caseInsensitive ? task.text.toLowerCase() : task.text;
    let query = caseInsensitive ? search.toLowerCase() : search;
    if (!textToSearch.includes(query)) return;

    const li = document.createElement("li");
    li.className = "task";

    const content = document.createElement("span");
    content.textContent = task.text + (task.done ? ` [${task.date}]` : "");
    content.className = task.done ? "completed" : "task-name";
    content.onclick = () => {
      task.done = !task.done;
      task.date = task.done ? new Date().toLocaleString() : null;
      renderTasks(listId);
    };

    const del = document.createElement("button");
    del.textContent = "X";
    del.onclick = () => {
      deleteTarget = { listId, index, task };
      showModal(task.text);
    };

    li.appendChild(content);
    li.appendChild(del);
    ul.appendChild(li);
  });
}

function showModal(taskText) {
  document.getElementById("modalText").textContent = `Czy na pewno chcesz usunąć zadanie: \"${taskText}\"?`;
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("overlay").classList.remove("hidden");
}

function hideModal() {
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
}

function confirmDelete() {
  const { listId, index, task } = deleteTarget;
  lastDeleted = { listId, index, task };
  lists[listId].splice(index, 1);
  renderTasks(listId);
  document.getElementById("undo").classList.remove("hidden");
  hideModal();
}

function undoDelete() {
  if (!lastDeleted) return;
  const { listId, index, task } = lastDeleted;
  lists[listId].splice(index, 0, task);
  renderTasks(listId);
  lastDeleted = null;
  document.getElementById("undo").classList.add("hidden");
}

document.getElementById("search").addEventListener("input", () => {
  Object.keys(lists).forEach(renderTasks);
});
