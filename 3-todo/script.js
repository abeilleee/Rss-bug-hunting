const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 0;

function addTask() {
  const text = input.value.trim();

  if (!text) {
    errorEl.hidden = false;
    errorEl.textContent = "Введите текст задачи";

    return;
  }

  errorEl.hidden = true;
  tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  tasks = getActiveTasks();
  render();
}

function getActiveTasks() {
  return tasks.filter((t) => !t.done);
}

function filterTasks() {
  switch (currentFilter) {
    case "active":
      return getActiveTasks();

    case "done":
      return tasks.filter((t) => t.done);

    case "all":
      return tasks;

    default:
      return tasks;
  }
}

function updateCounter() {
  const activeTasks = getActiveTasks();
  counter.textContent = "Активных задач: " + activeTasks.length;
}

function render() {
  const visible = filterTasks();
  list.replaceChildren();

  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];

    if (task) {
      const li = document.createElement("li");
      li.className = "task";

      if (task.done) {
        li.classList.add("done");
      }

      const span = document.createElement("span");
      span.className = "task__text";
      span.textContent = task.text;
      span.addEventListener("click", () => toggleTask(task.id));

      const del = document.createElement("button");
      del.className = "task__del";
      del.textContent = "✕";
      del.addEventListener("click", () => deleteTask(task.id));

      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);
    }
  }

  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
