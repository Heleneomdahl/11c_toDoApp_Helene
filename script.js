const submit = document.querySelector("#submit");
const toDoNameInput = document.querySelector("#todo_name_input");
const toDoContainer = document.querySelector("#todo_container");
const doneContainer = document.querySelector("#done_container");

// Henter gemte opgaver fra localStorage
let toDoArr = JSON.parse(localStorage.getItem("toDoArr")) || [];

// Funktion til at skrive opgaver på siden
function renderTasks() {
  // Ryder containers
  toDoContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  toDoArr.forEach(function (task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.innerHTML = `<input type="checkbox" ${task.done ? "checked" : ""}><h3>${task.name}</h3><button class="delete_btn">×</button>`;

    // Checkbox
    const checkbox = li.querySelector("input");
    checkbox.addEventListener("change", function () {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    // Delete-knap
    const deleteBtn = li.querySelector(".delete_btn");
    deleteBtn.addEventListener("click", function () {
      toDoArr = toDoArr.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    // Append til korrekt container
    if (task.done) {
      doneContainer.appendChild(li);
    } else {
      toDoContainer.appendChild(li);
    }
  });
}

// Gem opgaver i localStorage
function saveTasks() {
  localStorage.setItem("toDoArr", JSON.stringify(toDoArr));
}

// Tilføj ny opgave
submit.addEventListener("click", function () {
  if (toDoNameInput.value.trim() === "") return;

  const task = {
    id: crypto.randomUUID(),
    name: toDoNameInput.value,
    done: false,
  };

  toDoArr.push(task);
  saveTasks();
  renderTasks();
  toDoNameInput.value = "";
});

// Render opgaver ved load
renderTasks();
