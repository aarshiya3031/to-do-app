const input = document.getElementById("input");
const btn = document.getElementById("btn");
const list = document.getElementById("list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addTasks(task) {
  let li = document.createElement("li");
  li.innerText = task.text;
  let container = document.createElement("div");
  container.appendChild(li);
  const removebtn = document.createElement("button");
  removebtn.innerText = "Remove";
  container.appendChild(removebtn);
  removebtn.addEventListener("click", () => {
    container.remove();
    tasks = tasks.filter((item) => {
      return item.id != task.id;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
    } else li.style.textDecoration = "none";
  });
  container.appendChild(checkbox);
  let editbtn = document.createElement("button");
  editbtn.innerText = "Edit";
  container.appendChild(editbtn);
  editbtn.addEventListener("click", () => {
    let promptText = prompt("Edit your to do list here ");
    if (promptText != null) {
      li.innerText = promptText;
      tasks.forEach((item) => {
        if (item.id === task.id) {
          item.text = promptText;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  list.appendChild(container);
}
function addFromLocalStorage() {
  if (tasks.length === 0) return;
  else {
    tasks.forEach((i) => {
      addTasks(i);
    });
  }
}
btn.addEventListener("click", function () {
  if (input.value == "" || input.value == " ") alert("Please enter some text");
  let task = {
    text: input.value,
    id: Date.now(),
  };
  console.log(tasks);
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTasks(task);
});
input.addEventListener("keypress", (e) => {
  const task = {
    text: input.value,
    id: Date.now(),
  };
  if (e.key === "Enter") {
    addTasks(task);
  }
});
addFromLocalStorage();
