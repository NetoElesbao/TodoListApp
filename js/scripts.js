// Chamadas-------------------------------------------------------------------------------------------------------------------------------------------
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editTodo = document.querySelector("#edit-todo");
const cancelBtn = document.querySelector("#cancel-btn");
const editInput = document.querySelector("#edit-input");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-btn");
const filterSelect = document.querySelector("#filter-select");

// Variável global--------------------------------------------------
let oldTitle;

// Testes-------------------------------------------------------------------------------------------------------------------------------------------

// Funções-------------------------------------------------------------------------------------------------------------------------------------------

// Cria a tarefa
const CreateTodo = (title, done = false, save = true) => {
  const div = document.createElement("div");
  div.classList.add("todo");

  const h3 = document.createElement("h3");
  h3.innerText = title;
  div.appendChild(h3);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("done-todo");
  doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  div.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  div.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  div.appendChild(removeBtn);

  // Cria no localStorage
  // debugger;
  if (done) {
    div.classList.add("done");
  }

  if (save) {
    // debugger;
    SaveLocalStorage({ title, done });
  }

  todoList.appendChild(div);
  // debugger;
  todoInput.value = "";
  todoInput.focus();
};

// Troca os forms
const ToggleForms = () => {
  todoForm.classList.toggle("hide");
  editForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

// Atualiza o título
const UpdateTodo = (newTitle) => {
  // Consulta todas as tarefas
  const todoList = document.querySelectorAll(".todo");

  todoList.forEach((todo) => {
    // Pega respectivamente o título da tarefa em questão
    let todoTitle = todo.querySelector("h3");

    // Busca a tarefa com o título que será atualizado
    if (todoTitle.innerText === oldTitle) {
      todoTitle.innerText = newTitle;
    }
  });
};

const GetSearchTodos = (search) => {
  const normalizedSearch = search.toLowerCase();

  console.log(normalizedSearch);

  // Pega todos as tarefas
  const todos = todoList.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const title = todo.querySelector("h3").innerText.toLowerCase();

    todo.style.display = "flex";

    if (!title.includes(normalizedSearch)) {
      todo.style.display = "none";
    }
  });
};

// Filtro de pesquisa (Função)
const FilterSearch = (filterValue) => {
  // Pega todos as tarefas
  const todos = todoList.querySelectorAll(".todo");

  switch (filterValue) {
    case "done":
      todos.forEach((todo) => {
        todo.style.display = "flex";
        if (!todo.classList.contains("done")) {
          todo.style.display = "none";
        }
      });
      break;
    case "todo":
      todos.forEach((todo) => {
        todo.style.display = "flex";
        if (todo.classList.contains("done")) {
          todo.style.display = "none";
        }
      });
      break;
    case "all":
      todos.forEach((todo) => {
        todo.style.display = "flex";
        // if (todo.classList.contains("done")) todo.style.display = "none";
      });
      break;

    default:
      break;
  }
};

// Eventos---------------------------------------------------------------------------------------------------------------------------------------------

// Adiciona a tarefa
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    // debugger;
    CreateTodo(inputValue);
  }
});

// Detecta qual foi o botão clicado pelo usuário e define o fluxo específico com base nessa escolha.
document.addEventListener("click", (event) => {
  // debugger;
  const targetElement = event.target;
  const parentElement = event.target.closest("div");

  let todoTitle;

  if (parentElement && parentElement.querySelector("h3")) {
    todoTitle = parentElement.querySelector("h3").innerText;
  }

  if (targetElement.classList.contains("done-todo")) {
    parentElement.classList.toggle("done");
  }
  if (targetElement.classList.contains("edit-todo")) {
    ToggleForms();
    // debugger;
    editInput.value = todoTitle;
    oldTitle = todoTitle;
  }
  if (targetElement.classList.contains("remove-todo")) {
    parentElement.remove("todo");
  }
});

// Cancela a edição de tarefa
cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  ToggleForms();
});

// Atualiza tarefa
editForm.addEventListener("submit", (event) => {
  // debugger;
  event.preventDefault();

  const newTitle = editInput.value;

  if (newTitle) {
    UpdateTodo(newTitle);
  }
  ToggleForms();
});

// Pesquisa as tarefas
searchInput.addEventListener("keyup", (event) => {
  // debugger;

  const search = event.target.value;

  GetSearchTodos(search);
});

// Limpa a barra de pesquisa
eraseBtn.addEventListener("click", (event) => {
  event.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));

  console.clear();
});

// Filtro de pesquisa (Evento)
filterSelect.addEventListener("change", (event) => {
  console.log(event.target.value);

  const filterValue = event.target.value;
  // debugger;

  FilterSearch(filterValue);
});

// LOCAL STORAGE----------------------------------------------------------------------------------------------------------------------------------------

// Puxa as tarefas do localStorage
const GetLocalStorage = () => {
  const todosLS = JSON.parse(localStorage.getItem("todos")) || [];

  return todosLS;
};

// Salva uma tarefa no localStorage
const SaveLocalStorage = (text) => {
  const todosLS = GetLocalStorage();

  todosLS.push(text);

  localStorage.setItem("todos", JSON.stringify(todosLS));
};



// Carrega as tarefas do localStorage e as exibe na tela
const LoadTodos = () => {
  const todosLS = GetLocalStorage();

  todosLS.forEach((todo) => {
    CreateTodo(todo.title, todo.done, false);
  });
};

LoadTodos();


