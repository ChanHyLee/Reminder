const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const getName = document.querySelector(".js-getName");
const changeName = document.querySelector(".js-changeName");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function delCurrentUser() {
    changeName.classList.remove(SHOWING_CN);
    greeting.innerText = "";
    localStorage.removeItem(USER_LS);
    loadName();
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmitName(event) {
    event.preventDefault();
    const currentValue = input.value;
    if (currentValue !== "") {
        paintGreeting(currentValue);
        saveName(currentValue);
        input.value = "";
    } else {
        alert("Type your name.");
    }
}

function askForName() {
    form.classList.add(SHOWING_CN);
    getName.classList.add(SHOWING_CN);
    greeting.classList.remove(SHOWING_CN);
    form.addEventListener("submit", handleSubmitName);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    getName.classList.remove(SHOWING_CN);
    changeName.classList.add(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}!`;
    const changeBtn = document.querySelector(".changeBtn");
    changeBtn.addEventListener("click", delCurrentUser);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else if (currentUser === "") {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}
init();