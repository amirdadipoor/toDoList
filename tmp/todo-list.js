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
    createAndAddTodoElement(todoText , false);
    addNewTaskToAppLocalStorage(todoText)
    todoInput.value = '';

});





createAndAddTodoElement = (taskText, taskState) => {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    let span = document.createElement("span");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("Button");

    li.className = "flex items-center bg-gray-200 p-2 rounded";

    checkbox.className = "mr-2";
    checkbox.type = "checkbox";

    taskState ? checkbox.checked = true : checkbox.checked = false;

    span.className = taskState ? "flex-1 cursor-pointer line-through text-gray-500" : "flex-1 cursor-pointer";
    span.textContent = taskText;

    editBtn.className = "ml-2 text-blue-500 hover:text-blue-700";
    editBtn.textContent = "✏️";

    deleteBtn.className = "ml-2 text-red-500 hover:text-red-700";
    deleteBtn.textContent = "❌";


    editBtn.addEventListener("click" , (e) => {
        //let span = e.target.closest("span");
        console.log(span);
        let newTaskText = prompt("Please enter new Task : " , span.textContent).trim();

        //console.log(span);
        if (typeof newTaskText === "string" && newTaskText.length === 0 || newTaskText === null )  {
            // show error to user Enter valid data
            console.error("Enter Valid Data")
            //alert("Hello! I am an alert box!!");
            return
        }
        if (span.textContent !== newTaskText) {

            const li = e.target.closest('li'); // Ensure we're selecting the correct <li>
            const ul = li.parentElement;
            const index = Array.from(ul.children).indexOf(li);

            modifyTaskName(newTaskText , index)
            span.textContent = newTaskText
        } else {
            alert("equal text old text");
            console.log("equal text old text");
        }

        //console.log("Edit btn clicked")
    });

    checkbox.addEventListener("change" , (e) => {
        //console.log(checkbox.checked);

        const li = e.target.closest('li'); // Ensure we're selecting the correct <li>
        const ul = li.parentElement;
        const index = Array.from(ul.children).indexOf(li);

        toggleTaskState(index);

        span.classList.toggle("line-through");
        span.classList.toggle("text-gray-500");

    })

    deleteBtn.addEventListener("click" , (e) => {
        //console.log("Delete btn clicked")
        //let parent = e.target.p
        //console.log()

        const li = e.target.closest('li'); // Ensure we're selecting the correct <li>
        const ul = li.parentElement;
        const index = Array.from(ul.children).indexOf(li);

        deleteTask(index);
        e.target.parentElement.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span)
    li.appendChild(editBtn)
    li.appendChild(deleteBtn)


    todolistUL.append(li);
    return true;
}

const initAppLocalStorage = () => {
    //console.log("aaaaa");
    let appLocalStorage = loadLocalStorage();
    //console.log(appLocalStorage);

    appLocalStorage.forEach((item) => {
        createAndAddTodoElement(item.task , item.done)
    })
}


const addNewTaskToAppLocalStorage = (task) => {
    let myTasks = loadLocalStorage();

    const newTask = { task, done: false };
    myTasks.push(newTask);

    saveLocalStorage(myTasks);
}

const toggleTaskState = (index) => {
    let myTasks = loadLocalStorage();
    myTasks[index].done = !myTasks[index].done
    saveLocalStorage(myTasks);
}

const modifyTaskName = (taskName , index) => {
    let myTasks = loadLocalStorage();
    myTasks[index].task = taskName
    saveLocalStorage(myTasks);
}

const deleteTask = (index) => {
    let myTasks = loadLocalStorage();
    myTasks.splice(index, 1);
    //console.log(myTasks);
    saveLocalStorage(myTasks);
}

const loadLocalStorage = () => {
    return JSON.parse(localStorage.getItem("ApplicationStorage")) || [] ;
}

const saveLocalStorage = (data = []) => {
    return localStorage.setItem("ApplicationStorage", JSON.stringify(data));

}

initAppLocalStorage()