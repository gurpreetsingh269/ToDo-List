const addTodoBtn = document.getElementById('addTodoBtn');
const inputTag = document.getElementById('todoInput');
const todoListUl = document.getElementById('todoList');
const remaining=document.getElementById('remaining-count');
// const todoCheckbox=document.getElementsByClassName('todo-checkbox');
let toDoText;// to get text from the input field by the user
let toDos = []
const todoS = localStorage.getItem('todos');
if (todoS) {
    toDos = JSON.parse(todoS);
}
const populateTodoList = () => {
    let str = ""

    for (const todo of toDos) {
        str += `<li id="todo-${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`

    }
    todoListUl.innerHTML = str;
    let deleteBtn = document.querySelectorAll('.delete-btn');

    deleteBtn.forEach((element) => {
        element.addEventListener('click', (e) => {
            const confirmation=confirm("Are you sure you want to delete this todo?")
            if(confirmation==true){
            console.log(e.target.parentNode.id)
            toDos = toDos.filter((todo) => {
                return ("todo-" + todo.id) !== (e.target.parentNode.id);
            })
            localStorage.setItem('todos', JSON.stringify(toDos));
            populateTodoList();
        }
    })
    
    })
    const todoCheckbox = document.querySelectorAll('.todo-checkbox');
    todoCheckbox.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.checked) {
                element.parentNode.classList.add("completed")
                toDos = toDos.map((todo) => {
                    console.log("todo-" + todo.id, element.parentNode.id)
                    if ("todo-" + todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: true }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML=toDos.filter((item)=>{return !item.isCompleted}).length;
                localStorage.setItem('todos', JSON.stringify(toDos));
            }
            else {
                element.parentNode.classList.remove("completed")
                toDos = toDos.map((todo) => {
                    console.log("todo-" + todo.id, element.parentNode.id)
                    if ("todo-" + todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML=toDos.filter((item)=>{return !item.isCompleted}).length;
                localStorage.setItem('todos', JSON.stringify(toDos));
            }
        })
    })


}

addTodoBtn.addEventListener('click', () => {
    toDoText = inputTag.value;
    if (toDoText.trim().length < 4) {
        alert("Please enter a valid todo.");
        return
    }
    let todo = {
        id: "todo-" + Date.now(),
        title: toDoText,
        isCompleted: false
    }
    toDos.push(todo);
    localStorage.setItem('todos', JSON.stringify(toDos));
    populateTodoList()
})

populateTodoList()
