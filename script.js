let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");

function addTask(){
    let task = inputBox.value.trim();
    // validation
    //console.log(task);
    if(task === '' || task === null) {alert("add something");return;}

    appendTaskToList(task, false);

    inputBox.value="";
    addNewTaskToAppLocalStorage(task);
}
listContainer.addEventListener("click", function (e) {
    //console.log(e.target.index);
    if (e.target.tagName === "LI") {

        const li = e.target.closest('li'); // Ensure we're selecting the correct <li>
        const ul = li.parentElement;
        const index = Array.from(ul.children).indexOf(li);

        //console.log(index);

        e.target.classList.toggle("checked");
        toggleTaskState(index)

    } else if (e.target.tagName === "SPAN") {
        const li = e.target.closest('li');
        const ul = li.parentElement;
        const index = Array.from(ul.children).indexOf(li);

        //console.log(index)
        e.target.parentElement.remove();
        deleteTask(index);

    }
}, false);


const initAppLocalStorage = () => {
    let appLocalStorage = /*new Set(*/ JSON.parse(localStorage.getItem("tasks")) || [] //)
    // show old tasks from storage
    appLocalStorage.forEach((item) => {
        appendTaskToList(item.task , item.done);
    })

}

const addNewTaskToAppLocalStorage = (task) => {
    let myTasks = new Set( JSON.parse(localStorage.getItem("tasks")) || [])

    const newTask = { task, done: false };
    myTasks.add(newTask);

    localStorage.setItem("tasks", JSON.stringify([...myTasks]));
}

const appendTaskToList = (task , state = false) => {
    let li = document.createElement("li");
    li.innerHTML = task;
    state === true ? li.classList.add("checked") : li.classList.remove("checked");
    listContainer.appendChild(li);
    let span =document.createElement('span');
    span.innerHTML = "\u00d7";
    li.appendChild(span);
}

const toggleTaskState = (index) => {
    let myTasks = JSON.parse(localStorage.getItem("tasks"))
    myTasks[index].done = !myTasks[index].done
    localStorage.setItem("tasks", JSON.stringify(myTasks));
}

const deleteTask = (index) => {
    let myTasks = JSON.parse(localStorage.getItem("tasks"))
    myTasks.splice(index, 1);
    //console.log(myTasks);
    localStorage.setItem("tasks", JSON.stringify(myTasks));
}


initAppLocalStorage()
//showTask();