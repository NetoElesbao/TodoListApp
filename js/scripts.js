// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditbtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;
// console.log(cancelEditbtn);

// Funções
const CreateTodo = (inputValue) => {
  // Cria as tarefa

  // Cria a div que irá agrupar o conteúdo de cada tarefa
  const div = document.createElement("div");
  div.classList.add("todo");

  // Cria o título e atribui o valor enviado pelo usuário
  const h3 = document.createElement("h3");
  h3.innerText = inputValue;
  div.appendChild(h3);

  //   Essa seção cria o botão e atribui a classe ao mesmo, cria o icon e atribui a classe ao mesmo, no fim ele é atribuido ao botão
  const buttonOne = document.createElement("button");
  buttonOne.classList.add("finish-todo");
  buttonOne.innerHTML = `<i class="fa-solid fa-check"></i>`; // Faz a mesma coisa que as três linhas comentadas abaixo, porém, tudo em uma só
  div.appendChild(buttonOne);
  //   const iconOne = document.createElement("i");
  //   iconOne.classList.add("fa-solid", "fa-check");
  //   buttonOne.appendChild(iconOne);

  const buttonTwo = document.createElement("button");
  buttonTwo.classList.add("edit-todo");
  buttonTwo.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  div.appendChild(buttonTwo);

  const buttonThree = document.createElement("button");
  buttonThree.classList.add("remove-todo");
  buttonThree.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  div.appendChild(buttonThree);

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
    if (todo.querySelector("h3").innerText == oldInputValue) {
      todo.querySelector("h3").innerText = newInputValue;
    }
  });
};

// Eventos
todoForm.addEventListener("submit", (event) => {
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
    // console.log("tem um pai e um h3");
    todoTitle = parentElement.querySelector("h3").innerText;
    // console.log(todoTitle);
  }

  if (targetElement.classList.contains("finish-todo")) {
    // console.log("Clicou no finish");
    parentElement.classList.toggle("done");
  }
  if (targetElement.classList.contains("edit-todo")) {
    // console.log("Clicou no edit");
    ToggleForms();
    editInput.value = todoTitle;
    oldInputValue = editInput.value;
    // debugger;
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
  //   console.log("Entrou no btn edit");
  const newInputValue = editInput.value;
  debugger;

  // Verificar se a tarefa possui título
  if (newInputValue) {
    // console.log("Tem valor");
    UpdateTodo(newInputValue);
  } else {
    // console.log("Não em valor");
  }
  ToggleForms();
});
