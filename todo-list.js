// define buttons
let addTodoBtn = document.getElementById('add-btn');
let inputTodoText = document.getElementById('todo-input');
let todolistUL = document.getElementById('todo-list');
let todoInput = document.getElementById('todo-input');

// let load from storage


// add event listener
addTodoBtn.addEventListener("click" , (e) => {
    let todoText = inputTodoText.value.trim() ;
    if (typeof todoText === "string" && todoText.length === 0 || todoText === null )  {
        // show error to user Enter valid data
        alert("Enter Valid Data");
        console.error("Enter Valid Data")
        //return false;
    }
    let li = createTodoElement(todoText , false);
    todolistUL.append(li);
    todoInput.value = '';

});





createTodoElement = (taskText, taskState) => {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    let span = document.createElement("span");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("Button");

    li.className = "flex items-center bg-gray-200 p-2 rounded";

    checkbox.className = "mr-2";
    checkbox.type = "checkbox";

    span.className = taskState ? "flex-1 cursor-pointer line-through text-gray-500" : "flex-1 cursor-pointer";
    span.textContent = taskText;

    editBtn.className = "ml-2 text-blue-500 hover:text-blue-700";
    editBtn.textContent = "✏️";

    deleteBtn.className = "ml-2 text-red-500 hover:text-red-700";
    deleteBtn.textContent = "❌";


    editBtn.addEventListener("click" , (e) => {
        let span = e.target.parentElement.firstChild;
        let newTaskText = prompt("Please enter new Task : " , span.innerText).trim();

        //console.log(span);
        if (typeof newTaskText === "string" && newTaskText.length === 0 || newTaskText === null )  {
            // show error to user Enter valid data
            console.error("Enter Valid Data")
            //alert("Hello! I am an alert box!!");
            return
        }
        if (span.innerText !== newTaskText) span.innerText = newTaskText ;
        else console.log("equal text old text");


        //console.log("Edit btn clicked")
    });

    checkbox.addEventListener("change" , (e) => {
        //console.log(checkbox.checked);
        span.classList.toggle("line-through");
        span.classList.toggle("text-gray-500");
    })

    deleteBtn.addEventListener("click" , (e) => {
        //console.log("Delete btn clicked")
        //let parent = e.target.p
        //console.log()
        e.target.parentElement.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span)
    li.appendChild(editBtn)
    li.appendChild(deleteBtn)


    return li;
}

const initAppLocalStorage = () => {
    let appLocalStorage = localStorage.getItem('ApplicationStorage') || [];

    appLocalStorage.forEach((item) => {
        let li = createTodoElement(item.task)
    })
}


//initAppLocalStorage()