import StorageHelper from './../utils/storage-helper.js';
import Swal from 'sweetalert2'
import { EventBus } from './event-bus.js';
class ListSection {

    listElement;

    constructor() {
        EventBus.addEventListener('newItemAdded' , event => this.addNewTask(event.detail.todoText , false));
    }

    // deprecated
    createEditTaskButton() {
        let button = document.createElement("button");
        let classList = ["ml-2","text-blue-500","hover:text-blue-700"]
        button.classList.add(...classList)
        button.innerText = "✏️";
        return button;
    }

    // deprecated
    createDeleteTaskButton() {
        let button = document.createElement("button");
        let classList = ["ml-2","text-blue-500","hover:text-blue-700"]
        button.classList.add(...classList)
        button.innerText = "❌";
        return button;
    }

    createActionButton(textButton) {
        let button = document.createElement("button");
        let classList = ["ml-2","text-blue-500","hover:text-blue-700"]
        button.classList.add(...classList)
        button.innerText = textButton;
        return button;
    }

    createSpanLabelItem(taskName , taskStatus) {
        let span = document.createElement("span");
        span.className = taskStatus ? "flex-1 cursor-pointer line-through text-gray-500" : "flex-1 cursor-pointer";
        span.innerText = taskName;
        return span;
    }

    createCheckBoxElement(taskStatus) {
        let checkbox = document.createElement("input");
        checkbox.className = "mr-2";
        checkbox.type = "checkbox";
        taskStatus ? checkbox.checked = true : checkbox.checked = false;
        return checkbox;
    }

    createListItemElement(taskName , taskState) {
        let listItem = document.createElement('li');
        listItem.className = "flex items-center bg-gray-200 p-2 rounded";

        // define element
        let myCheckbox = this.createCheckBoxElement( taskState);
        let mySpan = this.createSpanLabelItem(taskName , taskState);
        let editButton = this.createActionButton("✏️");
        let deleteButton  = this.createActionButton("❌");

        // define event listeners
        myCheckbox.addEventListener("change" , (e) => this.checkBoxToggleEventListener(e , mySpan));
        editButton.addEventListener("click" , (e) => this.editButtonClickEventListener(e));
        deleteButton.addEventListener("click" , (e) => this.deleteButtonClickEventListener(e));

        // add elements to list items
        listItem.appendChild(myCheckbox);
        listItem.appendChild(mySpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    checkBoxToggleEventListener = (event , span) => {
        this.toggleTaskState(this.findTaskIndexInList(event));
        span.classList.toggle("line-through");
        span.classList.toggle("text-gray-500");
    }

    editButtonClickEventListener = (event) => {
        console.log("EditButton event", event);
    }

    deleteButtonClickEventListener = (event) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {

                event.target.parentElement.remove();
                this.deleteTask(this.findTaskIndexInList(event));

                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success",
                    timer: 3000,
                    showCloseButton: true,
                    timerProgressBar: true,
                });
            }
        });


    }

    addNewTaskToListElements = (taskName , taskState) => {
        this.listElement.appendChild(this.createListItemElement(taskName , taskState)) ;
    }

    addNewTaskToLocalStorage = (taskName ) => {
        let myTasks = StorageHelper.getTasksFromLocalStorage();
        const newTask = { task : taskName, done: false };
        myTasks.push(newTask);
        StorageHelper.saveTaskToLocalStorage(myTasks);
    }

    addNewTask = (taskName , taskState) => {
        this.addNewTaskToListElements(taskName , taskState);
        this.addNewTaskToLocalStorage(taskName);
    }

    findTaskIndexInList = (event) => {
        let li = event.target.closest('li'); // Ensure we're selecting the correct <li>
        //console.log(li);
        return Array.from(this.listElement.children).indexOf(li);
    }

    toggleTaskState = (index) => {
        let myTasks = StorageHelper.getTasksFromLocalStorage();
        myTasks[index].done = !myTasks[index].done
        StorageHelper.saveTaskToLocalStorage(myTasks)
    }

    deleteTask = (index) => {
        let myTasks = StorageHelper.getTasksFromLocalStorage();
        myTasks.splice(index, 1);
        StorageHelper.saveTaskToLocalStorage(myTasks)
    }

    render() {
        this.listElement = document.createElement("ul");
        this.listElement.id = "todo-list";
        this.listElement.classList.add("space-y-2");
        let tasksList = StorageHelper.getTasksFromLocalStorage();
        tasksList.forEach((item) => this.listElement.appendChild(this.createListItemElement(item.task , item.done)));

        console.log(tasksList)

        return this.listElement;
    }
}


export default new ListSection();