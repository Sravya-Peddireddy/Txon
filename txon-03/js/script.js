const newItemInput = document.querySelector("#new-item");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector("#todo-list");
let todoItems = [];

const createTodoItem = (text, completed) => {
  const li = document.createElement("li");
  const toggle = document.createElement("button");
  const span = document.createElement("span");
  const deleteButton = document.createElement("button");

  toggle.classList.add("toggle");
  span.textContent = text;
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");

  if (completed) {
    li.classList.add("completed");
    toggle.classList.add("completed");
  }

  toggle.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggle.classList.toggle("completed");
    updateLocalStorage();
  });

  deleteButton.addEventListener("click", () => {
    li.remove();
    todoItems = todoItems.filter((item) => item.text !== text);
    updateLocalStorage();
  });

  li.appendChild(toggle);
  li.appendChild(span);
  li.appendChild(deleteButton);

  return li;
};

const loadTodoItems = () => {
  const storedItems = JSON.parse(localStorage.getItem("todoItems"));

  if (storedItems) {
    todoItems = storedItems;
    todoItems.forEach((item) => {
      const todoItem = createTodoItem(item.text, item.completed);
      todoList.appendChild(todoItem);
    });
  }
};

const updateLocalStorage = () => {
  const itemsToStore = todoList.querySelectorAll("li");

  todoItems = [];

  itemsToStore.forEach((item) => {
    const text = item.querySelector("span").textContent;
    const completed = item.classList.contains("completed");
    todoItems.push({ text, completed });
  });

  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

addButton.addEventListener("click", () => {
  const text = newItemInput.value.trim();

  if (text) {
    const todoItem = createTodoItem(text, false);
    todoList.appendChild(todoItem);
    todoItems.push({ text, completed: false });
    updateLocalStorage();
    newItemInput.value = "";
  }
});

loadTodoItems();
