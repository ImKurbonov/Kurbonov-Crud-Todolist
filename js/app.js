const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group__todo");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeEl = document.getElementById("close");
const timeEl = document.getElementById("time");
let editItemId
// Time elements
const fullDay = document.getElementById("full-day");
const hourEL = document.getElementById("hour");
const minuteEL = document.getElementById("minute");
const secondEL = document.getElementById("second");

// Months
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Show errors
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 3000);
}

// Times
function getTime() {
  let now = new Date();
let clock =
  now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
let minute =
  now.getMinutes() < 10
    ? "0" + now.getMinutes()
    : now.getMinutes();

    let second = now.getSeconds() < 10
    ? "0" + now.getSeconds()
    : now.getSeconds();
let day =
  now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
let month = now.getMonth();
let year = now.getFullYear();

fullDay.textContent = `${day},${months[month]},${year}`

hourEL.textContent = clock
minuteEL.textContent = minute
secondEL.textContent = second

 return `${clock}:${minute} - ${day},${months[month]},${year}`
}

setInterval(getTime, 1000)
// Check
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

  if(todos.length) setTodos()

// Set todos to localStorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${item.complated == true ? 'completed' : ''}">
      ${item.text}
      <div class="todo-icons">
        <span class="opacity-50 me-2">${getTime(fullDay)}</span>
        <img onclick=(editTodo(${i}))
          src="images/edit.svg"
          width="25"
          height="25"
          alt="Edit-image"
          id="edit"
        />
        <img onclick = (deleteTodo(${i})) src="images/delete.svg"
          width="25"
          height="25"
          alt="Delete-image"
          id="delete"
        />
      </div>
    </li>
    `
  });
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({
      text: todoText,
      time: getTime(),
      complated: false});
    setTodos()
    showTodos()
  } else {
    showMessage("message-create", "Please, Enter some todo...");
  }
});

// Delete function
function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i)=> {
    return i !== id
  })

  todos = deletedTodos
  setTodos()
  showTodos()
}

// Completed function
function setCompleted(id) {
  const completedTodos = todos.map((item, i)=> {
    if(id == i) {
      return {...item, complated: item.complated == true ? false : true}
    } else {
      return{...item}
    }
  })

  todos = completedTodos
  setTodos()
  showTodos()
}

// Form edit
formEdit.addEventListener('submit', (e)=> {
  e.preventDefault()

  const todoText = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (todoText.length) {
    todos.splice(editItemId, 1, {
      text: todoText,
      time: getTime(),
      complated: false});
    setTodos()
    showTodos()
    close()
  } else {
    showMessage("message-edit", "Please, Enter some todo...");
  }
})

// EditTodo function
function editTodo(id) {
  open()
  editItemId = id
}

// Open function
function open () {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

// Close function
function close () {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

overlay.addEventListener('click', close)
closeEl.addEventListener('click', close)
document.addEventListener('keydown', (e)=> {
  if(e.key === 'Escape') {
    close()
  }
})