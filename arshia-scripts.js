let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");
function addTask(){

    let task = inputBox.value.trim();

    if(task === '') {
        alert("add something");
        return;
    }
    appendTaskToList(task, false);

    inputBox.value="";
    //saveData();
    addNewTaskToLocalStorage(task);
}
listContainer.addEventListener("click", function (e) {

    //console.log(e.target.tagName);
    let li = e.target.closest("li");
    let ul = li.parentElement;
    let index = Array.from(ul.children).indexOf(li);

    //console.log(index);

    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        //saveData();
        toggleTaskState(index)
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        //saveData();
        deleteTaskFromLocalStorage(index);
    }
}, false);
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);

}
function showTask(){
    listContainer.innerHTML =localStorage.getItem("data");

}

const appendTaskToList = (task , state ) => {
    let li = document.createElement("li");
    li.innerHTML = task;
    state === false ? li.classList.remove("checked") : li.classList.add("checked");
    listContainer.appendChild(li);
    let span =document.createElement('span');
    span.innerHTML = "\u00d7";
    li.appendChild(span);
}

const initAppLocalStorage = () => {
    let appLocalStorage = JSON.parse(localStorage.getItem("data")) || [] ;

    appLocalStorage.forEach((item) => {
        //console.log(item);
        appendTaskToList(item.task, item.done);
    })
}



const addNewTaskToLocalStorage = (task) => {
    let appLocalStorage = JSON.parse(localStorage.getItem("data")) || [] ;

    const newTask = {task, done : false};
    appLocalStorage.push(newTask);
    localStorage.setItem("data", JSON.stringify(appLocalStorage) );
}

const toggleTaskState = (index) => {
    let myTasks = JSON.parse(localStorage.getItem("data"));
    myTasks[index].done = !myTasks[index].done;
    localStorage.setItem("data", JSON.stringify(myTasks));
}

const deleteTaskFromLocalStorage = (index) => {
    let myTasks = JSON.parse(localStorage.getItem("data"));
    myTasks.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(myTasks));

}

initAppLocalStorage();
//showTask();