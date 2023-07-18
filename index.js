let tasks = 0;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
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
const suffix = ["st", "nd", "rd", "th"];
const listContainerDOM = document.querySelector("#listContainer");
const tasksDOM = document.querySelector("#taskCounter");

/**
 * Executes when the DOM content has finished loading.
 */
window.addEventListener("DOMContentLoaded", function () {
  const inputBtnDOM = this.document.querySelector("#inputBtn");
  const inputBoxDOM = this.document.querySelector("#inputBox");
  this.setInterval(printDateAndTime, 1000);

  tasksDisplay();

  /**
   * Event listener for the click event on the input button.
   */
  inputBtnDOM.addEventListener("click", function () {
    addTask(inputBoxDOM.value);
  });

  /**
   * Event listener for the keyup event on the input box.
   */
  inputBoxDOM.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      addTask(inputBoxDOM.value);
    }
  });

  // Event listener for task completion and deletion
  listContainerDOM.addEventListener(
    "click",
    function (e) {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
          tasks--;
          tasksDisplay();
        } else {
          tasks++;
          tasksDisplay();
        }
        saveData();
      } else if (e.target.tagName === "SPAN") {
        if (e.target.parentElement.classList.contains("checked")) {
          e.target.parentElement.remove();
          saveData();
        } else {
          e.target.parentElement.remove();
          tasks--;
          tasksDisplay();
          saveData();
        }
      }
    },
    false
  );
});

/**
 * Displays the number of tasks pending.
 */
function tasksDisplay() {
  const tasksText = `${tasks} ${tasks === 1 ? "task" : "tasks"} pending`;
  tasksDOM.innerHTML = tasksText;
}

/**
 * Displays the date and time.
 */
function printDateAndTime() {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const textDay = days[day];
  const textMonth = months[month];
  let textDate;
  let textFullDate;

  if (date === 1 || date === 21 || date === 31) {
    textDate = `${date}${suffix[0]}`;
  } else if (date === 2 || date === 22) {
    textDate = `${date}${suffix[1]}`;
  } else if (date === 3 || date === 23) {
    textDate = `${date}${suffix[2]}`;
  } else {
    textDate = `${date}${suffix[3]}`;
  }
  textFullDate = `${textDay}, ${textMonth} ${textDate}, ${year}`;

  document.querySelector("#date").innerHTML = textFullDate;

  let textTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  document.querySelector("#time").innerHTML = textTime;
}

/**
 * Adds a new task to the task list.
 * @param {string} note     the task note.
 */
function addTask(note) {
  if (note === "") {
    alert("No message! Please type in something.");
  } else {
    let li = document.createElement("li");
    li.innerHTML = note;
    listContainerDOM.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    tasks++;
    tasksDisplay();
  }
  inputBox.value = "";
  saveData();
}

//local storage
// /**
//  * Saves the task list data to local storage.
//  */
// function saveData() {
//   localStorage.setItem("data", listContainerDOM.innerHTML);
// }

// /**
//  * Displays the stored task list from local storage.
//  */
// function showTask() {
//   listContainerDOM.innerHTML = localStorage.getItem("data");
// }
// showTask();
