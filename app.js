const addTodoBtn =document.getElementById('addTodoBtn');
const inputTag = document.getElementById('todoInput');
const todoListUl = document.getElementById('todoList');
// const todoCheckbox=document.getElementsByClassName('todo-checkbox');
let toDoText;// to get text from the input field by the user
let toDos=[]
const todoS=localStorage.getItem('todos');
if(todoS){
    toDos=JSON.parse(todoS);
}
const populateTodoList=()=>{
    let str=""
    for(const todo of toDos){
        str+=`<li class="todo-item ${todo.isCompleted?"completed":""}">
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted?"checked":""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`
    }
    todoListUl.innerHTML=todoListUl.innerHTML+str;
}

addTodoBtn.addEventListener('click',()=>{
    toDoText=inputTag.value;
    let todo={
        title:toDoText,
        isCompleted:false
    }
    toDos.push(todo);
    localStorage.setItem('todos',JSON.stringify(toDos));
})

populateTodoList()
const todoCheckbox=document.querySelectorAll('.todo-checkbox');
todoCheckbox.forEach((element) => {
  element.addEventListener("click", (e)=>{ 
        if(e.target.checked){
            element.parentNode.classList.add("completed")
        }
        else{
            element.parentNode.classList.remove("completed")
        }
    })
})