const submit = document.querySelector("#submit");
const toDoNameInput = document.querySelector("#todo_name_input");
const toDoContainer = document.querySelector("#todo_container");
const doneContainer = document.querySelector("#done_container");

submit.addEventListener("click", subMitToDo);

function subMitToDo() {
  const li = document.createElement("li");
  const uniqueId = self.crypto.randomUUID(); // unikt id
  li.dataset.id = uniqueId;

  // Tilføjelse af checkbox, tekst og slet-knap
  li.innerHTML = `<input type="checkbox"><h3>${toDoNameInput.value}</h3><button class="delete_btn">×</button>`;

  toDoContainer.appendChild(li);

  // Checkbox event
  const checkbox = li.querySelector("input");
  checkbox.addEventListener("change", handleToggle);

  // Slet-knap event
  const deleteBtn = li.querySelector(".delete_btn");
  deleteBtn.addEventListener("click", function () {
    li.parentElement.removeChild(li);
  });

  toDoNameInput.value = "";

  function handleToggle() {
    if (li.parentElement.id === "todo_container") {
      toDoContainer.removeChild(li);
      doneContainer.appendChild(li);
    } else {
      doneContainer.removeChild(li);
      toDoContainer.appendChild(li);
    }
  }
}
