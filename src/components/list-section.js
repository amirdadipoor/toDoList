import StorageHelper from './../utils/storage-helper.js';
class ListSection {

    render() {
        const list = document.createElement("ul");
        list.id = "todo-list";
        list.classList.add("space-y-2");
        console.log(StorageHelper.getTasksFromLocalStorage())

        return list;
    }
}


export default new ListSection();