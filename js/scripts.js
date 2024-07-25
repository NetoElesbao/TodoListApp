// Seleção de elementos ------------------------------------------------------------------------------------------------------------
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditbtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");

// Variável global pra pegar o antigo titulo da tarefa
let oldInputValue;

// Funções -------------------------------------------------------------------------------------------------------------------------
const CreateTodo = (text, done = 0, save = 1) => {
  // Cria a tarefa

  // Cria a div que irá agrupar o conteúdo de cada tarefa
  const div = document.createElement("div");
  div.classList.add("todo");

  // Cria o título e atribui o valor enviado pelo usuário
  const h3 = document.createElement("h3");
  h3.innerText = text;
  div.appendChild(h3);

  //   Essa seção cria o botão e atribui a classe ao mesmo, cria o icon e atribui a classe ao mesmo, no fim ele é atribuido ao botão
  const buttonOne = document.createElement("button");
  buttonOne.classList.add("finish-todo");
  buttonOne.innerHTML = `<i class="fa-solid fa-check"></i>`; // Faz a mesma coisa que as três linhas comentadas abaixo, porém, tudo em uma só
  div.appendChild(buttonOne);

  const buttonTwo = document.createElement("button");
  buttonTwo.classList.add("edit-todo");
  buttonTwo.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  div.appendChild(buttonTwo);

  const buttonThree = document.createElement("button");
  buttonThree.classList.add("remove-todo");
  buttonThree.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  div.appendChild(buttonThree);

  // Salvando tarefa no localStorage
  if (done) {
    div.classList.add("done");
  }

  if (save) {
    saveTodoInLocalStorage({ text, done });
  }

  // Por fim, a tarefa é acrescentada na lista de tarefas
  todoList.appendChild(div);

  todoInput.value = "";
  todoInput.focus();
};

const ToggleForms = () => {
  todoForm.classList.toggle("hide");
  editForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

// Atualiza a tarefa
const UpdateTodo = (newInputValue) => {
  // Puxa todas as tarefas
  const todoList = document.querySelectorAll(".todo");

  // Procura a tarefa em questão
  todoList.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = newInputValue;
    }
  });
};

const GetSearchTodos = (search) => {
  const todoList = document.querySelectorAll(".todo");

  // Procura a tarefa em questão
  const normalizedSearch = search.toLowerCase();
  todoList.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    // Reinicia tudo e torna a tarefa visível de novo temporariamente
    todo.style.display = "flex";

    // verifica se esta tarefa em questão não possui caracteres em comum enviados pelo usuário
    if (!todoTitle.includes(normalizedSearch)) {
      // Define como invisível a tarefa que não possui caracteres em comum
      todo.style.display = "none";
    }
  });
};

// Função que verifica o valor selecionado pelo usuário no filtro
const FilterTodos = (filterValue) => {
  const todoList = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all": // caso seja para mostrar todas as tarefas
      todoList.forEach((todo) => (todo.style.display = "flex"));
      break;
    case "done": // caso seja para mostrar todas as tarefas concluídas
      todoList.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;
    case "todo": // caso seja para mostrar todas as tarefas pendentes
      todoList.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;
    default:
      break;
  }
};

// Eventos ------------------------------------------------------------------------------------------------------------------------------
todoForm.addEventListener("submit", (event) => {
  // debugger;
  event.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    CreateTodo(inputValue);
  }
});

document.addEventListener("click", (event) => {
  const targetElement = event.target;
  const parentElement = targetElement.closest("div");

  let todoTitle;

  if (parentElement && parentElement.querySelector("h3")) {
    todoTitle = parentElement.querySelector("h3").innerText;
  }

  if (targetElement.classList.contains("finish-todo")) {
    parentElement.classList.toggle("done");
  }
  if (targetElement.classList.contains("edit-todo")) {
    ToggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
  if (targetElement.classList.contains("remove-todo")) {
    parentElement.remove("todo");
  }
});

cancelEditbtn.addEventListener("click", (event) => {
  event.preventDefault();
  ToggleForms();
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newInputValue = editInput.value;

  // Verificar se a tarefa possui título
  if (newInputValue) {
    UpdateTodo(newInputValue);
  } else {
  }
  ToggleForms();
});

// Faz a busca de tarefas
searchInput.addEventListener("keyup", (event) => {
  const search = event.target.value;

  GetSearchTodos(search);
});

// Limpa a barra de pesquisa
eraseBtn.addEventListener("click", (event) => {
  event.preventDefault();

  searchInput.value = "";
  // Dispara um evento no input
  searchInput.dispatchEvent(new Event("keyup"));
});

// Filtro
filterSelect.addEventListener("change", (event) => {
  const filterValue = event.target.value;

  // Método verificador de valor do filterSelect
  FilterTodos(filterValue);
});

// Local storage

// Pega as tarefas do localStorage e retorna
const getTodosLocalStorage = () => {
  const todosLSConverted = JSON.parse(localStorage.getItem("todos")) || [];
  console.log(todosLSConverted);

  return todosLSConverted;
};

const loadTodos = () => {
  // debugger;
  const allTodosLS = getTodosLocalStorage();

  allTodosLS.forEach((todo) => {
    CreateTodo(todo.text, todo.done, 0);
  });
};

const saveTodoInLocalStorage = (text) => {
  // Puxa as tarefas do LocalStorage
  const allTodosLS = getTodosLocalStorage();

  // Adiciona tarefa
  allTodosLS.push(text);

  // Sobe o LS com a nova tarefa adicionada
  localStorage.setItem("todos", JSON.stringify(allTodosLS));
};

loadTodos();
