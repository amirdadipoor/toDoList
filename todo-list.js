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
        console.error("Enter Valid Data")
        return
    }
    let li = createTodoElement(todoText);
    todolistUL.append(li);
    todoInput.value = '';

});





createTodoElement = (text) => {
    let li = document.createElement("ul");
    let span = document.createElement("span");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("Button");

    li.className = "flex justify-between items-center bg-gray-200 p-2 rounded-md";
    span.className = "flex-1";
    editBtn.className = "edit-btn bg-yellow-500 text-white px-2 py-1 rounded ml-2";
    deleteBtn.className = "delete-btn bg-red-500 text-white px-2 py-1 rounded ml-2";
    span.innerText = text;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Remove";

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

    deleteBtn.addEventListener("click" , (e) => {
        //console.log("Delete btn clicked")
        //let parent = e.target.p
        //console.log()
        e.target.parentElement.remove();
    });

    li.appendChild(span)
    li.appendChild(editBtn)
    li.appendChild(deleteBtn)

    /*li.innerHTML =
        `<span class="flex-1">${text}</span>
        <button class="edit-btn bg-yellow-500 text-white px-2 py-1 rounded ml-2">Edit</button>
        <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded ml-2">Remove</button>`*/

    // console.log(li)
    return li;
}

const initAppLocalStorage = () => {
    let appLocalStorage = localStorage.getItem('ApplicationStorage') || [];

    appLocalStorage.forEach((item) => {
        let li = createTodoElement(item.task)
    })
}


initAppLocalStorage()