let storage = localStorage.getItem("tasks");
console.log(storage);
if (storage === null || storage === undefined) {
    storage = new Map();
}
