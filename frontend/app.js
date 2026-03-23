const addTodoBtn = document.getElementById('addTodoBtn');
const inputTag = document.getElementById('todoInput');
const todoListUl = document.getElementById('todoList');
const remaining = document.getElementById('remaining-count');
const clearComplete = document.getElementById('clearCompletedBtn');
const all = document.getElementById('allBtn');
const active = document.getElementById('activeBtn');
const completed = document.getElementById('completedBtn');

const userId = localStorage.getItem("userId");  //(get logged-in user)

//  redirect if not logged in
if (!userId) {
    window.location.href = "login.html";
}

let toDos = [];
let currentFilter = "all"; // (for filter fix)


//  FUNCTION (load todos from backend instead of localStorage)
function loadTodos() {
    fetch(`http://localhost:5000/api/todos/${userId}`)
        .then(res => res.json())
        .then(data => {
            toDos = data;
            populateTodoList();
        });
}


// 🔹 DISPLAY TODOS
function populateTodoList() {
    let str = "";

    let filteredTodos = toDos; 

    //  (filter logic without deleting original data)
    if (currentFilter === "active") {
        filteredTodos = toDos.filter(todo => !todo.isCompleted);
    }
    else if (currentFilter === "completed") {
        filteredTodos = toDos.filter(todo => todo.isCompleted);
    }

    for (const todo of filteredTodos) {
        str += `<li id="${todo._id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`;
    }

    todoListUl.innerHTML = str;

    //  UPDATED (count from backend data)
    remaining.innerHTML = toDos.filter(item => !item.isCompleted).length;

    //   (DELETE using backend)
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.parentNode.id;

            fetch(`http://localhost:5000/api/todos/${id}`, {
                method: "DELETE"
            })
            .then(() => loadTodos()); //  reload after delete
        });
    });

    //  NEW (TOGGLE COMPLETE using backend)
    document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
        checkbox.addEventListener("click", (e) => {
            const id = e.target.parentNode.id;

            fetch(`http://localhost:5000/api/todos/${id}`, {
                method: "PUT"
            })
            .then(() => loadTodos()); //  reload after update
        });
    });
}


// UPDATED (ADD TODO using backend)
addTodoBtn.addEventListener('click', () => {
    const toDoText = inputTag.value;

    if (toDoText.trim().length < 1) {
        alert("Enter valid todo");
        return;
    }

    fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: toDoText,
            isCompleted: false,
            userId: userId //  NEW (link todo to user)
        })
    })
    .then(() => {
        inputTag.value = "";
        loadTodos(); //  reload after adding
    });
});


//  UPDATED FILTERS (no data deletion now)
all.addEventListener('click', () => {
    currentFilter = "all"; // 
    populateTodoList();
});

active.addEventListener('click', () => {
    currentFilter = "active"; // 
    populateTodoList();
});

completed.addEventListener('click', () => {
    currentFilter = "completed"; // 
    populateTodoList();
});


//  UPDATED (clear completed using backend)
clearComplete.addEventListener('click', () => {
    const completedTodos = toDos.filter(todo => todo.isCompleted);

    Promise.all(
        completedTodos.map(todo =>
            fetch(`http://localhost:5000/api/todos/${todo._id}`, {
                method: "DELETE"
            })
        )
    ).then(() => loadTodos()); // 🔥 reload
});


//  (logout function)
function logout() {
    localStorage.removeItem("userId");
    window.location.href = "login.html";
}


//  (initial load from backend)
loadTodos();
