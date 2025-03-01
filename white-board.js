let storage = localStorage.getItem("tasks");
console.log(storage);
if (storage === null || storage === undefined) {
    storage = new Map();
}
let myTasks = [
    {task : "task1" , done: false},
    {task : "task2" , done: false},
    {task : "task3" , done: false},
    {task : "task4" , done: true},
]