const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edi");
const listGroupTodo = document.getElementById("list-group-todo");
const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");

// Time elements
const fullDay = document.getElementById("full-day");
const hourEL = document.getElementById("hour");
const minuteEL = document.getElementById("minute");
const secondEL = document.getElementById("second");

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
console.log(todos);

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();

  if(todoText.legth) {
    console.log(todoText)
  } else {
    messageCreate.textContent = `Please, enter some text..`

    setTimeout(()=> {
        messageCreate.textContent = ''
    }, 3000)
  }
});
