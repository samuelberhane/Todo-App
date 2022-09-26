const form = document.getElementById("form");
const input = document.querySelector(".input");
const todos = document.querySelector(".todos");
const clearBtn = document.querySelector(".clear");

window.addEventListener("DOMContentLoaded", () => {
  let valueFromLocal = JSON.parse(localStorage.getItem("todolist"));
  if (valueFromLocal) {
    valueFromLocal.forEach((value) => {
      addTodo(value);
    });
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(objValue) {
  let inputValue = input.value;
  input.value = "";
  let listContainer = document.createElement("div");
  listContainer.classList.add("list-container");
  listContainer.innerHTML = `
      <div class="left">
          <i class="fa-regular fa-circle-check"></i>
          <li>${inputValue}</li>
      </div>
      <i class="fa-solid fa-xmark"></i>
      `;
  todos.appendChild(listContainer);

  let lists = todos.querySelectorAll(".list-container");

  lists.forEach((list) => {
    list.addEventListener("mouseover", (e) => {
      e.currentTarget.classList.add("display");
    });
  });

  lists.forEach((list) => {
    list.addEventListener("mouseleave", (e) => {
      e.currentTarget.classList.remove("display");
    });
  });

  const close = listContainer.querySelector(".fa-solid");
  close.addEventListener("click", () => {
    listContainer.remove();
    updateTodoLocal();
  });

  const mark = listContainer.querySelector(".fa-regular");
  const lis = listContainer.querySelector("li");
  mark.addEventListener("click", () => {
    lis.classList.toggle("marked");
    updateTodoLocal();
  });
  if (objValue) {
    lis.textContent = objValue.text;
    if (objValue.ismarked) {
      lis.classList.add("marked");
    } else {
      lis.classList.remove("marked");
    }
  }
  updateTodoLocal();

  clearBtn.addEventListener("click", () => {
    listContainer.remove();
    updateTodoLocal();
  });
}

function updateTodoLocal() {
  const allLi = document.querySelectorAll("li");
  let liArr = [];
  allLi.forEach((li) => {
    liArr.push({
      text: li.innerText,
      ismarked: li.classList.contains("marked"),
    });
  });
  localStorage.setItem("todolist", JSON.stringify(liArr));
}
