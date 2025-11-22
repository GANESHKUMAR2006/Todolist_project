document.addEventListener("DOMContentLoaded", () => {
  const todo_input = document.getElementById("todoinput");
  const add_todo = document.getElementById("addtodo");
  const todo_list = document.getElementById("todolist");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function savetodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    todo_list.innerHTML = "";

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className =
        "flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm my-2";

      li.innerHTML = `
        <div class="flex items-center gap-2">
          <input type="checkbox" class="todo-check h-5 w-5 text-red-500" data-index="${index}" ${
        todo.completed ? "checked" : ""
      }>
          
          <span class="todo-text ${
            todo.completed ? "line-through text-gray-400" : "text-gray-700"
          }">${todo.text}</span>
        </div>
        <div class="space-x-2">
          <button class="edit-btn text-blue-700">Edit</button>
          <button class="delete-btn text-red-600">Delete</button>
        </div>
      `;
      li.querySelector(".delete-btn").addEventListener("click", () => {
        todos.splice(index, 1);
        savetodos();
        renderTodos();
      });
      li.querySelector(".todo-check").addEventListener("change", (e) => {
        todos[index].completed = e.target.checked;
        savetodos();
        renderTodos();
      });
      li.querySelector(".edit-btn").addEventListener("click", () => {
        const newText = prompt("Edit todo:", todo.text);
        if (newText && newText.trim() !== "") {
          todos[index].text = newText;
          savetodos();
          renderTodos();
        }
      });

      todo_list.appendChild(li);
    });
  }
  add_todo.addEventListener("click", () => {
    const text = todo_input.value.trim();
    if (text === "") return;

    todos.push({ text, completed: false });
    savetodos();
    renderTodos();
    todo_input.value = "";
  });
  todo_input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") add_todo.click();
  });

  // Initial Load
  renderTodos();
});
