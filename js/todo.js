const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const nothingToDos = document.querySelector(".js-nothingToDos"); //My work

const TODOS_LS = "toDos"

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(
        function(toDo) {
            return toDo.id !== parseInt(li.id);
        }
    );
    toDos = cleanToDos;
    saveToDos();
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos === "[]") {
        nothingToDos.classList.add(SHOWING_CN);
    } else {
        nothingToDos.classList.remove(SHOWING_CN);
    }
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
    nothingToDos.classList.remove(SHOWING_CN);
}

function handleSubmitToDo(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    if (currentValue !== "") {
        paintToDo(currentValue);
        toDoInput.value = "";
    } else {
        alert("You didn't type anything!");
    }
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos === "[]") {
        nothingToDos.classList.add(SHOWING_CN);
    }
    else if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(
            function(toDo) {
                paintToDo(toDo.text);
            }
        );
    } else {
        nothingToDos.classList.add(SHOWING_CN);
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", function(event) {
        const currentUser = localStorage.getItem(USER_LS);
        if (currentUser !== null) {
            handleSubmitToDo(event);
        } else {
            alert("Type your name first.");
        }
    });
}
init();
